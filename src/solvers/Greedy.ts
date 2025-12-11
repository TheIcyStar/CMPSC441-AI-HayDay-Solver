import type { SolutionStep } from "../typedefs/SolverTypes"
import type { GameState, Order } from "../typedefs/GameTypes"
import { buildPrerequisiteTree, canStartProduction, collectAllReadyItems, modifyStoredItemCount, type ItemStackNode } from "./SolverUtils"
import { AnimalInfo, CropInfo, FruitOrBerryInfo, isAnimalProduct, isCrop, isFruitOrBerry, isProduct, RecipeInfo, type Product } from "../typedefs/GameData"


export function solve(startState: GameState): SolutionStep[] {
  const curGameState: GameState = JSON.parse(JSON.stringify(startState))
  let curGameTime = 0
  const solutionSteps: SolutionStep[] = []

  const incompleteOrders: {trees: ItemStackNode[], order: Order, orderId: number}[] = []
  for(const [orderId, order] of curGameState.orders.entries()){
    if(order){
      incompleteOrders.push({
        trees: buildPrerequisiteTree(order),
        order: order,
        orderId: orderId
      })
    }
  }

  while(incompleteOrders.length > 0){
    const newSolutionStep: SolutionStep = {
      newQueueItems: [],
      newProducedItems: [],
      ordersComplete: [],
      nextActionDelayMinutes: null
    }

    //collect any ready items
    newSolutionStep.newProducedItems = collectAllReadyItems(curGameState, curGameTime)

    // Traverse the forest to all of the leaf nodes
    for(const [incompleteOrderId, order] of incompleteOrders.entries()){
      for(const treeRoot of order.trees){
        const dfsStack = [treeRoot]

        // start new productions to satisfy the root
        while(dfsStack.length > 0){
          const thisNode = dfsStack.pop()!

          for(const [index, prereq] of thisNode.prereqs.entries()){
            //move on from non-leaf node prereqs
            if(prereq.prereqs.length > 0){
              dfsStack.push(prereq)
              continue
            }

            // --------
            // we're at a leaf node, see if we can satisfy it
            const numItemsStarted = canStartProduction(curGameState, prereq.itemStack)
            if(numItemsStarted == 0){
              //Can't satisfy, skip
              continue

            } else if(numItemsStarted < prereq.itemStack.count){
              //node partially satisfied
              thisNode.itemStack.count -= numItemsStarted

            } else if(numItemsStarted == prereq.itemStack.count) {
              //node satisfied fully, remove it if it's in a parent's prereqs
              thisNode.prereqs.splice(index, 1)
            }


            // Consume items, start production
            let prereqTimeCost: number | null = null
            let storageContainer


            if(isCrop(prereq.itemStack.name)){
              storageContainer = curGameState.silo.storage
              prereqTimeCost = CropInfo[prereq.itemStack.name]
              curGameState.cropFields.fields.push({
                name: prereq.itemStack.name,
                startTime: curGameTime,
                completeTime: curGameTime + prereqTimeCost
              })

            } else if(isFruitOrBerry(prereq.itemStack.name)){
              storageContainer = curGameState.silo.storage
              prereqTimeCost = FruitOrBerryInfo[prereq.itemStack.name]
              //todo: bushes/berries :)
              modifyStoredItemCount(curGameState, "silo", prereq.itemStack.name, 4)

            } else if(isAnimalProduct(prereq.itemStack.name)){
              storageContainer = curGameState.barn.storage
              prereqTimeCost = AnimalInfo[prereq.itemStack.name]
              let animalContainer
              if(prereq.itemStack.name == "Egg"){
                animalContainer = curGameState.animals.chickens
              } else if(prereq.itemStack.name == "Milk"){
                animalContainer = curGameState.animals.cows
              } else if(prereq.itemStack.name == "Bacon"){
                animalContainer = curGameState.animals.pigs
              } else {
                animalContainer = curGameState.animals.sheep
              }
              animalContainer.push({
                name: prereq.itemStack.name,
                startTime: curGameTime,
                completeTime: curGameTime + prereqTimeCost
              })

            } else if(isProduct(prereq.itemStack.name)){
              storageContainer = curGameState.barn.storage
              prereqTimeCost = RecipeInfo[prereq.itemStack.name].timeCost
              let buildingName = RecipeInfo[prereq.itemStack.name].building
              let building = curGameState.productionBuildings.find((x) => x.name == buildingName)
              if(!building){
                throw new Error(`Solver: Failed to find building ${buildingName} for item: ${prereq.itemStack.name} `)
              }
              //todo: handle multiple queues
              building.productionQueues[0].queue.push({
                name: prereq.itemStack.name,
                startTime: curGameTime,
                completeTime: curGameTime + prereqTimeCost
              })
            }


            if(!storageContainer){
              throw new Error(`Solver: Failed to find a storage container for item: ${prereq.itemStack.name} `)
            }

            let storedItem = storageContainer.find((x) => x.name == prereq.itemStack.name)
            if(!storedItem){
              throw new Error(`Solver: ${prereq.itemStack.name} is missing from barn or silo, but it is being consumed to produce ${thisNode.itemStack.name}`)
            }



            //note the production in this solution step
            newSolutionStep.newQueueItems.push(prereq.itemStack)
            newSolutionStep.nextActionDelayMinutes = Math.max(
              newSolutionStep.nextActionDelayMinutes || 0,
              prereqTimeCost || 0
            )
          }
        }

        solutionSteps.push(newSolutionStep)
        curGameTime += newSolutionStep.nextActionDelayMinutes!
      }

      //Check if we can complete this order, after fulfilling the recipe trees
      let orderCompletable = true
      for(const orderItem of order.order.items){
        let targetStorage
        if(isCrop(orderItem.name) || isFruitOrBerry(orderItem.name)){
          targetStorage = curGameState.silo.storage
        } else {
          targetStorage = curGameState.barn.storage
        }
        const itemCount = targetStorage.find((x) => x.name == orderItem.name)?.count

        if(!itemCount || itemCount < orderItem.count){
          orderCompletable = false
          break
        }
      }

      if(orderCompletable){
          newSolutionStep.ordersComplete.push(order.orderId)
          incompleteOrders.splice(incompleteOrderId, 1)
          curGameState.orders[order.orderId] = null
      }

    }
  }

  return solutionSteps
}