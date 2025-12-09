import type { GameState } from "../typedefs/GameTypes"
import type { SolutionStep } from "../typedefs/SolverTypes"


/**
 * Returns a game state with layered actions
 */
export function getLayeredGameState(initial: GameState, layers: SolutionStep[]): GameState {
  let _stateData: GameState = JSON.parse(JSON.stringify(initial))

  for (const step of layers) {
    for (const _subtractingItem of step.newQueueItems) {

    }
  }

  return initial
}