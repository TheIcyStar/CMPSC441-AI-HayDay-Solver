import type { GameState } from "../typedefs/GameTypes";
import { BUILDING_LABELS } from "../typedefs/GameData";
import type { ProductionBuilding } from "../typedefs/GameData";

type FarmProps = {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
};

const ANIMAL_INFO = [
  { key: "numChickens" as const, label: "Chicken", plural: "Chickens" },
  { key: "numCows" as const, label: "Cow", plural: "Cows" },
  { key: "numPigs" as const, label: "Pig", plural: "Pigs" },
  { key: "numSheep" as const, label: "Sheep", plural: "Sheep" },
];

export default function Farm({ gameState, setGameState }: FarmProps) {
  function updateCapacity(section: "silo" | "barn", delta: number) {
    setGameState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        capacity: Math.max(0, prev[section].capacity + delta),
      },
    }));
  }

  function updateCropFieldsMax(delta: number) {
    setGameState((prev) => ({
      ...prev,
      cropFields: {
        ...prev.cropFields,
        maxCount: Math.max(0, prev.cropFields.maxCount + delta),
      },
    }));
  }

  function updateBushesAndTreesMax(delta: number) {
    setGameState((prev) => ({
      ...prev,
      bushesAndTrees: {
        ...prev.bushesAndTrees,
        maxCount: Math.max(0, prev.bushesAndTrees.maxCount + delta),
      },
    }));
  }

  function updateAnimalCount(
    animal: "numChickens" | "numCows" | "numPigs" | "numSheep",
    delta: number
  ) {
    setGameState((prev) => ({
      ...prev,
      animals: {
        ...prev.animals,
        [animal]: Math.max(0, prev.animals[animal] + delta),
      },
    }));
  }

  function updateBuildingCount(buildingName: ProductionBuilding, delta: number) {
    setGameState((prev) => ({
      ...prev,
      productionBuildings: prev.productionBuildings.map((b) =>
        b.name === buildingName ? { ...b, count: Math.max(0, b.count + delta) } : b
      ),
    }));
  }

  function updateBuildingQueueSize(buildingName: ProductionBuilding, delta: number) {
    setGameState((prev) => ({
      ...prev,
      productionBuildings: prev.productionBuildings.map((b) =>
        b.name === buildingName
          ? {
              ...b,
              productionQueues: b.productionQueues.map((q) => ({
                ...q,
                maxQueueSize: Math.max(1, q.maxQueueSize + delta),
              })),
            }
          : b
      ),
    }));
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b min-h-[77px]">
        <div className="flex items-center text-sm text-gray-800">
          <span className="font-hayday text-2xl">Initial Game State</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Silo */}
        <section className="bg-amber-100 rounded-xl p-4">
          <h2 className="font-hayday text-lg text-gray-800 mb-2">Silo</h2>
          <p className="text-sm text-black mb-3">Silo storage is shown in the Inventory tab</p>
          <div className="flex items-center gap-3">
            <span className="text-black w-20">Capacity:</span>
            <button
              onClick={() => updateCapacity("silo", -1)}
              className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
            >
              −
            </button>
            <span className="w-16 text-center font-medium">{gameState.silo.capacity}</span>
            <button
              onClick={() => updateCapacity("silo", 1)}
              className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
            >
              +
            </button>
          </div>
        </section>

        {/* Barn */}
        <section className="bg-amber-100 rounded-xl p-4">
          <h2 className="font-hayday text-lg text-gray-800 mb-2">Barn</h2>
          <p className="text-sm text-black mb-3">Barn storage is shown in the Inventory tab</p>
          <div className="flex items-center gap-3">
            <span className="text-black w-20">Capacity:</span>
            <button
              onClick={() => updateCapacity("barn", -1)}
              className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
            >
              −
            </button>
            <span className="w-16 text-center font-medium">{gameState.barn.capacity}</span>
            <button
              onClick={() => updateCapacity("barn", 1)}
              className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
            >
              +
            </button>
          </div>
        </section>

        {/* Orders */}
        <section className="bg-amber-100 rounded-xl p-4">
          <h2 className="font-hayday text-lg text-gray-800 mb-2">Orders</h2>
          <p className="text-sm text-black">Orders are managed in the Orders tab</p>
        </section>

        {/* Crop Fields */}
        <section className="bg-amber-100 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="./assets/miscellaneous/CropField.png"
              alt="Crop Field"
              className="w-18 h-18 object-contain"
            />
            <h2 className="font-hayday text-lg text-gray-800">Crop Fields</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-black w-24">Max Count:</span>
            <button
              onClick={() => updateCropFieldsMax(-1)}
              className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
            >
              ➖
            </button>
            <span className="w-16 text-center font-medium">{gameState.cropFields.maxCount}</span>
            <button
              onClick={() => updateCropFieldsMax(1)}
              className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
            >
              ➕
            </button>
          </div>
        </section>

        {/* Bushes and Trees */}
        <section className="bg-amber-100 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="./assets/miscellaneous/Tree.png"
              alt="Tree"
              className="w-18 h-18 object-contain"
            />
            <h2 className="font-hayday text-lg text-gray-800">Bushes & Trees</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-black w-24">Max Count:</span>
            <button
              onClick={() => updateBushesAndTreesMax(-1)}
              className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
            >
              −
            </button>
            <span className="w-16 text-center font-medium">
              {gameState.bushesAndTrees.maxCount}
            </span>
            <button
              onClick={() => updateBushesAndTreesMax(1)}
              className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
            >
              +
            </button>
          </div>
        </section>

        {/* Animals */}
        <section className="bg-amber-100 rounded-xl p-4">
          <h2 className="font-hayday text-lg text-gray-800 mb-4">Animals</h2>
          <div className="grid grid-cols-4 gap-4">
            {ANIMAL_INFO.map(({ key, label, plural }) => {
              const count = gameState.animals[key];
              return (
                <div
                  key={key}
                  className="flex flex-col items-center bg-white rounded-lg p-3"
                >
                  <img
                    src={`./assets/animals/${label}.png`}
                    alt={label}
                    className="w-30 h-30 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-700 mt-1">{plural}</span>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateAnimalCount(key, -1)}
                      className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 font-bold text-sm"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-medium">{count}</span>
                    <button
                      onClick={() => updateAnimalCount(key, 1)}
                      className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Production Buildings */}
        <section className="bg-amber-100 rounded-xl p-4">
          <h2 className="font-hayday text-lg text-gray-800 mb-4">Production Buildings</h2>
          <div className="grid grid-cols-6 gap-3">
            {gameState.productionBuildings.map((building) => (
              <div
                key={building.name}
                className="flex flex-col items-center bg-white rounded-lg p-3"
              >
                <img
                  src={`./assets/buildings/${building.name}.png`}
                  alt={BUILDING_LABELS[building.name]}
                  className="w-30 h-30 object-contain"
                />
                <span className="text-sm font-medium text-gray-700 mt-1 text-center leading-tight">
                  {BUILDING_LABELS[building.name]}
                </span>

                {/* Count */}
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-sm text-gray-500">Count:</span>
                  <button
                    onClick={() => updateBuildingCount(building.name, -1)}
                    className="w-5 h-5 bg-gray-200 rounded hover:bg-gray-300 font-bold text-xs"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm">{building.count}</span>
                  <button
                    onClick={() => updateBuildingCount(building.name, 1)}
                    className="w-5 h-5 bg-gray-200 rounded hover:bg-gray-300 font-bold text-xs"
                  >
                    +
                  </button>
                </div>

                {/* Queue Size */}
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm text-gray-500">Queue:</span>
                  <button
                    onClick={() => updateBuildingQueueSize(building.name, -1)}
                    className="w-5 h-5 bg-gray-200 rounded hover:bg-gray-300 font-bold text-xs"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm">
                    {building.productionQueues[0]?.maxQueueSize ?? 1}
                  </span>
                  <button
                    onClick={() => updateBuildingQueueSize(building.name, 1)}
                    className="w-5 h-5 bg-gray-200 rounded hover:bg-gray-300 font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}