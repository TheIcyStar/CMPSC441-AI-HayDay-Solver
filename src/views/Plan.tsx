import type { GameState } from "../typedefs/GameTypes"
import type { SolutionStep } from "../typedefs/SolverTypes"
import { useState } from "react";
import { solve as greedySolve } from "../solvers/Greedy"
import PlanItemCard from "../components/PlanStepRecipe";

type PlanProps = {
  gameState: GameState;
}

type SolverType = "Greedy" | "None"

const solvers: {type: SolverType, solver: any}[] = [
  { type: "None", solver: (() => []) },
  { type: "Greedy", solver: greedySolve },
]


export default function Plan({ gameState }: PlanProps) {
  const [solverType, setSolverType] = useState<SolverType>("Greedy")
  const [solution, setSolution] = useState<SolutionStep[]>([])


  return (
    <div className="flex flex-col h-full">
      {/* Header with solver type switches */}
      <div className="p-4 border-b text-lg font-semibold">
        <p className="inline-block">Plan</p>

        {
          solvers.map((solver) => (
            <button
              onClick={() => {
                setSolverType(solver.type)
                setSolution(solver.solver(gameState))
                console.log(`The solution is`, solution)
              }}
              className={`
                font-hayday text-lg py-2 px-4 mx-2 rounded-lg font-semibold transition-colors
                ${solverType === solver.type
                  ? "bg-amber-500 text-white"
                  : "bg-amber-900 text-amber-100 hover:bg-amber-600"
                }
              `}
              key={solver.type}
            >
              {solver.type}
            </button>
          ))
        }
      </div>


      <div className="flex-1 p-4 overflow-y-auto text-gray-500">
        {JSON.stringify(solution)}
      </div>

      {/* <div>
        <PlanItemCard
          key={"Wheat"}
          iconName={"Wheat"}
          label={"Wheat"}
          count={1}
        >
        </PlanItemCard>
      </div> */}

      <div className="flex gap-10">
        {
          solution.map((step) => (
            <div className="flex">
              {step["newQueueItems"].map((item) => (
                // item.count > 0 
                // ?
                <PlanItemCard
                  iconName={item.itemName}
                  label={item.itemName}
                  count={item.count}
                >
                </PlanItemCard>
                // : <div>None</div>
              ))}

              <br/>
              
            </div>
          ))
        }
      </div>

      <button
        onClick={() => {
          console.log("hello there")
        }}
      >Push me loser</button>

    </div>
  );
}