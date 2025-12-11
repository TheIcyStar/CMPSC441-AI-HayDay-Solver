import type { SolutionStep } from "../typedefs/SolverTypes"
import type { GameState, Order } from "../typedefs/GameTypes"

export function solve(_startState: GameState, order: Order | null): SolutionStep[] {
  if (!order || order.items.length === 0) {
    return []
  }

  let solutionSteps: SolutionStep[] = []

  for (let i = 1; i < 3; i++) {
    let newStep: SolutionStep = {
      newQueueItems: [
        { name: "Wheat", count: i * 2 },
        { name: "Corn", count: i * 2 },
        { name: "ChickenFeed", count: i },
      ],

      newProducedItems: [
        { name: "Bread", count: i}
      ],
      ordersComplete: [],
      nextActionDelayMinutes: 2
    }

    solutionSteps.push(newStep);
  }

  return solutionSteps
}