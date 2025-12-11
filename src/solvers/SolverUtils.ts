import type { GameState, ItemStack, Order } from "../typedefs/GameTypes"
import { AnimalFeedInfo, isAnimalProduct, isCrop, isFruitOrBerry, isProduct, RecipeInfo } from "../typedefs/GameData"

export type ItemStackNode = {
  itemStack: ItemStack,
  prereqs: ItemStackNode[] //children
  parent: ItemStackNode | null
}

/**
 * Returns a forest of recipe trees for the order, with crops/fruit/etc at the leaves
 */
export function buildPrerequisiteTree(order: Order): ItemStackNode[]{
  const forest: ItemStackNode[] = []

  //Build recipe trees with dfs
  for(const item of order.items){
    const root: ItemStackNode = {
      itemStack: item,
      prereqs: [],
      parent: null
    }
    const queue: ItemStackNode[] = [root]


    while(queue.length > 0){
      const thisNode = queue.pop()!
      const thisItem = thisNode.itemStack

      if(isCrop(thisItem.name) || isFruitOrBerry(thisItem.name)){
        continue //(Crops and berries/fruit are base products)
      }

      if(isAnimalProduct(thisItem.name)){
        const newNode: ItemStackNode = {
          itemStack: {
            name: AnimalFeedInfo[thisItem.name],
            count: thisItem.count, // 1:1
          },
          prereqs: [],
          parent: thisNode
        }
        thisNode.prereqs.push(newNode)
        queue.push(newNode)
      }

      if(isProduct(thisItem.name)){
        for(const prereqItem of RecipeInfo[thisItem.name].ingredients){
          const newNode: ItemStackNode = {
            itemStack: {
              name: prereqItem.item,
              count: prereqItem.count * thisItem.count
            },
            prereqs: [],
            parent: thisNode
          }
          thisNode.prereqs.push(newNode)
          queue.push(newNode)
        }
      }
    }

    forest.push(root)
  }

  return forest
}

/**
 * Returns the maximum number of items that can be produced given `gameState`.
 * Returned number will be less than or equal to the requested amount (`itemStack.count`)
 * Products will ALWAYS return 1 (currently implemented as such, can be improved later)
 */
export function canStartProduction(gameState: GameState, itemStack: ItemStack): number {
  if(isCrop(itemStack.name)){
    const fieldsAvailable = gameState.cropFields.maxCount - gameState.cropFields.fields.length
    const currentStock = gameState.silo.storage.find((siloItem) => siloItem.name == itemStack.name)?.count

    return Math.min(fieldsAvailable, currentStock || 0, itemStack.count)
  }

  if(isFruitOrBerry(itemStack.name)){
    //todo :)
  }

  if(isAnimalProduct(itemStack.name)){
    let availableAnimals = 0
    let maxFeed = 0
    if(itemStack.name == 'Egg'){
      availableAnimals = gameState.animals.numChickens - gameState.animals.chickens.length
      maxFeed = gameState.barn.storage.find(x => x.name == "ChickenFeed")?.count || 0
    } else if(itemStack.name == 'Milk'){
      availableAnimals = gameState.animals.numCows - gameState.animals.cows.length
      maxFeed = gameState.barn.storage.find(x => x.name == "CowFeed")?.count || 0
    } else if(itemStack.name == 'Bacon'){
      availableAnimals = gameState.animals.numPigs - gameState.animals.pigs.length
      maxFeed = gameState.barn.storage.find(x => x.name == "PigFeed")?.count || 0
    } else if(itemStack.name == 'Wool'){
      availableAnimals = gameState.animals.numSheep - gameState.animals.sheep.length
      maxFeed = gameState.barn.storage.find(x => x.name == "SheepFeed")?.count || 0
    }

    return Math.min(availableAnimals, maxFeed, itemStack.count)
  }

  if(isProduct(itemStack.name)){
    for(const prereq of RecipeInfo[itemStack.name].ingredients){
      const maybeSiloItem = gameState.silo.storage.find((item) => item.name == prereq.item)
      if(maybeSiloItem && maybeSiloItem.count > prereq.count){
        continue
      }

      const maybeBarnItem = gameState.barn.storage.find((item) => item.name == prereq.item)
      if(maybeBarnItem && maybeBarnItem.count > prereq.count){
        continue
      }

      return 0 //don't have one of the prerequisite ingredients
    }

    return 1 //we have all the prerequisite ingredients
  }

  return 0
}

/**
 * Modify gameState to:
 * - Collect items with a finishTime < gameTime,
 * - Add those items to storage
 * @returns A list of collected items
 */
export function collectAllReadyItems(gameState: GameState, gameTime: number): ItemStack[] {
  const collected: ItemStack[] = []

  //Collect products
  for(const productionBuilding of gameState.productionBuildings){
    for(const queue of productionBuilding.productionQueues){
      for(const item of queue.queue){
        if(item.completeTime > gameTime){
          continue
        }

        modifyStoredItemCount(gameState, "barn", item.name, 1)

        const collectionItem = collected.find((x) => x.name == item.name)
        if(collectionItem){
          collectionItem.count += 1
        } else {
          collected.push({
            name: item.name,
            count: 1
          })
        }
      }
    }
  }

  //collect crops
  const cropSplices = []
  for(const [index, queuedCrop] of gameState.cropFields.fields.entries()){
    if(queuedCrop.completeTime > gameTime){ continue }
    collected.push({ name: queuedCrop.name, count: 2 })
    modifyStoredItemCount(gameState, "silo", queuedCrop.name, 2)
    cropSplices.push(index)
  }
  cropSplices.forEach(i => gameState.cropFields.fields.splice(i, 1))

  //collect animals
  let animalSplices = []
  for(const [index, animalProduct] of gameState.animals.chickens.entries()){
    if(animalProduct.completeTime > gameTime){ continue }
    collected.push({ name: animalProduct.name, count: 1 })
    modifyStoredItemCount(gameState, "barn", animalProduct.name, 1)
    animalSplices.push(index)
  }
  animalSplices.forEach(i => gameState.animals.chickens.splice(i, 1))
  animalSplices.length = 0
  for(const [index, animalProduct] of gameState.animals.cows.entries()){
    if(animalProduct.completeTime > gameTime){ continue }
    collected.push({ name: animalProduct.name, count: 1 })
    modifyStoredItemCount(gameState, "barn", animalProduct.name, 1)
    animalSplices.push(index)
  }
  animalSplices.forEach(i => gameState.animals.cows.splice(i, 1))
  animalSplices.length = 0
  for(const [index, animalProduct] of gameState.animals.pigs.entries()){
    if(animalProduct.completeTime > gameTime){ continue }
    collected.push({ name: animalProduct.name, count: 1 })
    modifyStoredItemCount(gameState, "barn", animalProduct.name, 1)
    animalSplices.push(index)
  }
  animalSplices.forEach(i => gameState.animals.pigs.splice(i, 1))
  animalSplices.length = 0
  for(const [index, animalProduct] of gameState.animals.sheep.entries()){
    if(animalProduct.completeTime > gameTime){ continue }
    collected.push({ name: animalProduct.name, count: 1 })
    modifyStoredItemCount(gameState, "barn", animalProduct.name, 1)
    animalSplices.push(index)
  }
  animalSplices.forEach(i => gameState.animals.sheep.splice(i, 1))


  //collect bushes/trees
  // todo :)


  return collected
}

export function modifyStoredItemCount(gameState: GameState, type: "barn" | "silo", itemName: string, amount: number){
  const container = type == "barn" ? gameState.barn.storage : gameState.silo.storage
  let storageItem = container.find((x) => x.name == itemName)

  if(storageItem){
    storageItem.count += amount
  } else {
    storageItem = {
      name: itemName,
      count: amount
    }
    container.push(storageItem)
  }

  if(storageItem.count < 0){
    throw new Error("modifyStoredItemCOunt: Some function subtracted more items than exist!")
  }
}