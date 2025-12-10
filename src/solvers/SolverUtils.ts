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
  let forest: ItemStackNode[] = []

  //Build recipe trees with dfs
  for(const item of order.items){
    const root: ItemStackNode = {
      itemStack: item,
      prereqs: [],
      parent: null
    }
    let queue: ItemStackNode[] = [root]


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

    return Math.min(fieldsAvailable, currentStock || 0)
  }

  if(isFruitOrBerry(itemStack.name)){
    //todo :)
  }

  if(isAnimalProduct(itemStack.name)){
    let availableAnimals = 0
    if(itemStack.name == 'Egg'){
      availableAnimals = gameState.animals.numChickens
    } else if(itemStack.name == 'Milk'){
      availableAnimals = gameState.animals.numCows
    } else if(itemStack.name == 'Bacon'){
      availableAnimals = gameState.animals.numPigs
    } else if(itemStack.name == 'Wool'){
      availableAnimals = gameState.animals.numSheep
    }

    return Math.min(availableAnimals, itemStack.count)
  }

  if(isProduct(itemStack.name)){
    for(const prereq of RecipeInfo[itemStack.name].ingredients){
      let maybeSiloItem = gameState.silo.storage.find((item) => item.name == prereq.item)
      if(maybeSiloItem && maybeSiloItem.count > prereq.count){
        continue
      }

      let maybeBarnItem = gameState.barn.storage.find((item) => item.name == prereq.item)
      if(maybeBarnItem && maybeBarnItem.count > prereq.count){
        continue
      }

      return 0 //don't have one of the prerequisite ingredients
    }

    return 1 //we have all the prerequisite ingredients
  }

  return 0
}