import type { GameState } from "../typedefs/GameTypes"
import type { SolutionStep } from "../typedefs/SolverTypes"
import { useState } from "react";
import { solve as greedySolve } from "../solvers/Greedy"
import { INVENTORY_ITEMS } from "../typedefs/GameData"

type PlanProps = {
  gameState: GameState;
}

function getItemLabel(itemId: string): string {
  const config = INVENTORY_ITEMS.find((i) => i.id === itemId);
  return config?.label ?? itemId;
}

function StepCard({ step, stepIndex }: { step: SolutionStep; stepIndex: number }) {
  return (
    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
      <h3 className="font-hayday text-lg text-gray-800 mb-3">Step {stepIndex + 1}</h3>

      {/* Queued Items */}
      {step.newQueueItems.length > 0 && (
        <div className="mb-3">
          <span className="text-sm font-semibold text-gray-600">Queue:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {step.newQueueItems.map((item, idx) => (
              <div key={idx} className="flex items-center bg-white rounded-lg px-2 py-1 border border-gray-200">
                <img
                  src={`./assets/items/${item.name}.png`}
                  alt={getItemLabel(item.name)}
                  className="w-6 h-6 object-contain"
                />
                <span className="ml-1 text-sm text-gray-700">{getItemLabel(item.name)}</span>
                <span className="ml-1 text-sm font-medium text-amber-600">×{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Produced Items */}
      {step.newProducedItems.length > 0 && (
        <div className="mb-3">
          <span className="text-sm font-semibold text-gray-600">Collect:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {step.newProducedItems.map((item, idx) => (
              <div key={idx} className="flex items-center bg-white rounded-lg px-2 py-1 border border-gray-200">
                <img
                  src={`./assets/items/${item.name}.png`}
                  alt={getItemLabel(item.name)}
                  className="w-6 h-6 object-contain"
                />
                <span className="ml-1 text-sm text-gray-700">{getItemLabel(item.name)}</span>
                <span className="ml-1 text-sm font-medium text-green-600">×{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Complete */}
      {step.ordersComplete.length > 0 && (
        <div>
          <span className="text-sm font-semibold text-gray-600">Complete Orders:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {step.ordersComplete.map((orderId, idx) => (
              <div key={idx} className="flex items-center bg-green-100 rounded-lg px-2 py-1 border border-green-300">
                <img
                  src="./assets/miscellaneous/truck.png"
                  alt="Truck"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-1 text-sm font-medium text-green-700">Slot {orderId + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StepArrow({ minutes }: { minutes: number | null }) {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <img
        src="./assets/miscellaneous/arrow_down.png"
        alt="Arrow"
        className="w-16 h-16 object-contain"
      />
      {minutes !== null && (
        <span className="text-sm font-medium text-gray-500">
          Time: {minutes} min
        </span>
      )}
    </div>
  );
}

export default function Plan({ gameState }: PlanProps) {
  const [solution, setSolution] = useState<SolutionStep[]>([]);

  function handleSolve() {
    //Any other new solvers can be added here...
    setSolution(greedySolve(gameState));
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b min-h-[77px]">
        <div className="flex items-center">
          <span className="font-hayday text-2xl text-gray-800">Plan</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSolve}
            className="font-hayday text-lg py-2 px-4 rounded-lg font-semibold transition-colors bg-amber-500 text-white hover:bg-amber-600"
          >
            Solve
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {solution.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Click "Solve" to generate a plan
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {solution.map((step, index) => (
              <div key={index}>
                <StepCard step={step} stepIndex={index} />
                {index < solution.length - 1 && (
                  <StepArrow minutes={step.nextActionDelayMinutes} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}