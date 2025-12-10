import type { SolutionStep } from "../typedefs/SolverTypes"
import type { GameState, ItemStack, Order } from "../typedefs/GameTypes"
import { buildPrerequisiteTree, canStartProduction, type ItemStackNode } from "./SolverUtils"
import { isCrop } from "../typedefs/GameData"

/* A "Greedy" algorithm that optimizes items with this priority:
  1. A constant stock of X crops
  2. A constant stock of Y animal products
  3. A constant stock of Z common intermediate products:
    - Diary products
    - Sugar mill products
  4. Items in truck orders
*/


export function solve(startState: GameState): SolutionStep[] {
  let curGameState: GameState = JSON.parse(JSON.stringify(startState))
  let solutionSteps: SolutionStep[] = []

  let incompleteOrders: {trees: ItemStackNode[], order: Order}[] = []
  for(const order of curGameState.orders){
    if(order){
      incompleteOrders.push({
        trees: buildPrerequisiteTree(order),
        order: order
      })
    }
  }

  while(incompleteOrders.length > 0){
    let newSolutionStep: SolutionStep = {
      newQueueItems: [],
      newProducedItems: [],
      ordersComplete: [],
      nextActionDelayMinutes: -1
    }

    //collect any ready items


    //finish orders

    // start new productions
    // Traverse the forest to all of the leaf nodes
    for(const order of incompleteOrders){
      for(const treeRoot of order.trees){
        let dfsStack = [treeRoot]

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
              const thisNodeIndex = thisNode.parent.prereqs.findIndex((x) => x == thisNode)
              thisNode.parent.prereqs.splice(thisNodeIndex, 1)
            }

            solutionSteps.push()

          }
        }

      }
    }

    //set a wait time
  }

  return solutionSteps
}