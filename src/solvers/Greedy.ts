import type { SolutionStep } from "../typedefs/SolverTypes"
import type { GameState, Order } from "../typedefs/GameTypes"
import { buildPrerequisiteTree, canStartProduction, collectAllReadyItems, modifyStoredItemCount, type ItemStackNode } from "./SolverUtils"
import { AnimalInfo, CropInfo, FruitOrBerryInfo, isAnimalProduct, isCrop, isFruitOrBerry, isProduct, RecipeInfo, type Product } from "../typedefs/GameData"


export function solve(startState: GameState): SolutionStep[] {
  const curGameState: GameState = JSON.parse(JSON.stringify(startState))
  let curGameTime = 0
  const solutionSteps: SolutionStep[] = []

  //Prepare incomplete orders
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

  //Main solution loop
  while(incompleteOrders.length > 0){
    const newSolutionStep: SolutionStep = {
      newQueueItems: [],
      newProducedItems: [],
      ordersComplete: [],
      nextActionDelayMinutes: 0
    }

    // Collect any ready items
    newSolutionStep.newProducedItems = collectAllReadyItems(curGameState, curGameTime)

    // Start work on worders
    for(const [incompleteOrderId, order] of incompleteOrders.entries()){

      //Check if we can complete this order
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
        break //because we spliced we need to start the for..of loop over
      }

      // Traverse the order's forest to all of the leaf nodes
      for(const treeRoot of order.trees){
        const dfsStack = [treeRoot]
        while(dfsStack.length > 0){
          const thisNode = dfsStack.pop()!

          //move on from non-leaf nodes
          if(thisNode.prereqs.length > 0){
            dfsStack.push(thisNode)
            for(const prereq of thisNode.prereqs){
              dfsStack.push(prereq)
            }
            continue
          }

          // we're at a leaf node, see if we can satisfy it
          const numItemsStarted = canStartProduction(curGameState, thisNode.itemStack)
          if(numItemsStarted == 0){
            //Can't satisfy, skip to next tree
            break

          } else if(numItemsStarted < thisNode.itemStack.count){
            //node partially satisfied
            thisNode.itemStack.count -= numItemsStarted

          } else if(numItemsStarted == thisNode.itemStack.count) {
            //node satisfied fully, remove it if it's in a parent's prereqs
            if(thisNode.parent){
              let thisNodeIndex = thisNode.parent.prereqs.findIndex(x => x == thisNode)
              thisNode.parent.prereqs.splice(thisNodeIndex, 1)
            }
            //left off: the root node of a recipe tree isn't being removed
            //ex: bread
          }


          // Consume items, start production
          let timeCost: number | null = null

          if(isCrop(thisNode.itemStack.name)){
            timeCost = CropInfo[thisNode.itemStack.name]
            for(let i=0; i<numItemsStarted; i++){
              curGameState.cropFields.fields.push({
                name: thisNode.itemStack.name,
                startTime: curGameTime,
                completeTime: curGameTime + timeCost
              })
            }
            modifyStoredItemCount(curGameState, "silo", thisNode.itemStack.name, -numItemsStarted)

          } else if(isFruitOrBerry(thisNode.itemStack.name)){
            timeCost = FruitOrBerryInfo[thisNode.itemStack.name]
            //todo: bushes/berries :)
            modifyStoredItemCount(curGameState, "silo", thisNode.itemStack.name, numItemsStarted)

          } else if(isAnimalProduct(thisNode.itemStack.name)){
            timeCost = AnimalInfo[thisNode.itemStack.name]
            let animalContainer, animalFeed
            if(thisNode.itemStack.name == "Egg"){
              animalContainer = curGameState.animals.chickens
              animalFeed = "ChickenFeed"
            } else if(thisNode.itemStack.name == "Milk"){
              animalContainer = curGameState.animals.cows
              animalFeed = "CowFeed"
            } else if(thisNode.itemStack.name == "Bacon"){
              animalContainer = curGameState.animals.pigs
              animalFeed = "PigFeed"
            } else {
              animalContainer = curGameState.animals.sheep
              animalFeed = "SheepFeed"
            }
            animalContainer.push({
              name: thisNode.itemStack.name,
              startTime: curGameTime,
              completeTime: curGameTime + timeCost
            })
            modifyStoredItemCount(curGameState, "barn", animalFeed, -numItemsStarted)


          } else if(isProduct(thisNode.itemStack.name)){
            timeCost = RecipeInfo[thisNode.itemStack.name].timeCost
            let buildingName = RecipeInfo[thisNode.itemStack.name].building
            let building = curGameState.productionBuildings.find((x) => x.name == buildingName)
            if(!building){
              throw new Error(`Solver: Failed to find building ${buildingName} for item: ${thisNode.itemStack.name} `)
            }
            //todo: handle multiple queues
            building.productionQueues[0].queue.push({
              name: thisNode.itemStack.name,
              startTime: curGameTime,
              completeTime: curGameTime + timeCost
            })
            for(const prereq of RecipeInfo[thisNode.itemStack.name].ingredients){
              if(isCrop(prereq.item) || isFruitOrBerry(prereq.item)){
                modifyStoredItemCount(curGameState, "silo", prereq.item, -prereq.count)
              } else {
                modifyStoredItemCount(curGameState, "barn", prereq.item, -prereq.count)
              }
            }
          }


          //note the production in this solution step
          newSolutionStep.newQueueItems.push(thisNode.itemStack)
          newSolutionStep.nextActionDelayMinutes = Math.max(
            newSolutionStep.nextActionDelayMinutes || 0,
            timeCost || 0
          )
        }
      }
    }

    solutionSteps.push(newSolutionStep)
    curGameTime += newSolutionStep.nextActionDelayMinutes!
  }

  return solutionSteps
}