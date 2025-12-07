import type { SolutionStep } from "../typedefs/SolverTypes"
import type { GameState } from "../typedefs/GameTypes"

/* A "Greedy" algorithm that optimizes items with this priority:
  1. A constant stock of X crops
  2. A constant stock of Y animal products
  3. A constant stock of Z common intermediate products:
    - Diary products
    - Sugar mill products
  4. Items in truck orders
*/

export function solve(startState: GameState): SolutionStep[] {
  let solutionSteps: SolutionStep[] = []

  for(let i=0; i<3; i++){
    let newStep: SolutionStep = {
      newQueueItems: [
        {itemName: "Wheat", count: i*2},
        {itemName: "Corn", count: i*2},
        {itemName: "ChickenFeed", count: i},
      ],

      newProducedItems: [],
      ordersComplete: [],
      nextActionDelayMinutes: 2
    }

    solutionSteps.push(newStep);
  }

  return solutionSteps
}