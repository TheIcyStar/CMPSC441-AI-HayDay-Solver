import type { SolutionStep } from "../typedefs/SolverTypes"
import type { GameState, Order } from "../typedefs/GameTypes"
import { buildPrerequisiteTree, canStartProduction, collectAllReadyItems, type ItemStackNode } from "./SolverUtils"


export function solve(startState: GameState): SolutionStep[] {
  const curGameState: GameState = JSON.parse(JSON.stringify(startState))
  const curGameTime = 0
  const solutionSteps: SolutionStep[] = []

  const incompleteOrders: {trees: ItemStackNode[], order: Order}[] = []
  for(const order of curGameState.orders){
    if(order){
      incompleteOrders.push({
        trees: buildPrerequisiteTree(order),
        order: order
      })
    }
  }

  while(incompleteOrders.length > 0){
    const newSolutionStep: SolutionStep = {
      newQueueItems: [],
      newProducedItems: [],
      ordersComplete: [],
      nextActionDelayMinutes: -1
    }

    //collect any ready items
    newSolutionStep.newProducedItems = collectAllReadyItems(curGameState, curGameTime)

    // Traverse the forest to all of the leaf nodes
    for(const order of incompleteOrders){
      for(const treeRoot of order.trees){
        const dfsStack = [treeRoot]

        // start new productions to satisfy the root
        while(dfsStack.length > 0){
          const thisNode = dfsStack.pop()!

          for(const [index, prereq] of thisNode.prereqs.entries()){
            //move on from non-leaf nodes
            if(prereq.prereqs.length > 0){
              dfsStack.push(prereq)
              continue
            }

            //we're at e leaf node, see if we can satisfy it
            const numItemsStarted = canStartProduction(curGameState, prereq.itemStack)
            if(numItemsStarted == 0){
              //Can't satisfy, skip
              continue

            } else if(numItemsStarted < prereq.itemStack.count){
              //node partially satisfied
              thisNode.itemStack.count -= numItemsStarted

            } else if(numItemsStarted == prereq.itemStack.count && thisNode.parent) {
              //node satisfied fully, remove it if it's in a parent's prereqs
              thisNode.parent.prereqs.splice(index, 1)
            }

            solutionSteps.push()

          }
        }
      }

      //Check if we can complete this order, after fulfilling the recipe trees




    }

    //set a wait time
  }

  return solutionSteps
}