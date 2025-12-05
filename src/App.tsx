import { useState, useEffect } from "react";
import type { GameState, Section } from "./typedefs/GameTypes";
import MainLayout from "./layouts/MainLayout";
import Inventory from "./views/Inventory";
import Orders from "./views/Orders";
import Plan from "./views/Plan";

const defaultGameState: GameState = {
  silo: {
    storage: [
      { name: "Wheat", count: 1 },
      { name: "Corn", count: 1 },
      { name: "Soybean", count: 1},
    ],
    capacity: 500,
  },
  barn: {
    storage: [
      { name: "Egg", count: 1 },
      { name: "Milk", count: 1 },
      { name: "Bacon", count: 1},
    ],
    capacity: 500,
  },
  cropFields: {
    fields: [],
    maxCount: 10,
  },
  bushesAndTrees: {
    planted: [],
    maxCount: 10,
  },
  animals: {
    chickens: [],
    numChickens: 0,
    cows: [],
    numCows: 0,
    pigs: [],
    numPigs: 0,
    sheep: [],
    numSheep: 0,
  },
  productionBuildings: [],
};

// load game state from localStorage
// if none stored return default game state
function loadGameState(): GameState {
  const saved = localStorage.getItem("farmGameState");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultGameState;
    }
  }
  return defaultGameState;
}

// owns farm game state + current view,
// and passes GameState + updateItem down into the three views
export default function App() {
  const [currentView, setCurrentView] = useState<"inventory" | "orders" | "plan">("inventory");
  const [gameState, setGameState] = useState<GameState>(loadGameState);

  useEffect(() => {
    localStorage.setItem("farmGameState", JSON.stringify(gameState));
  }, [gameState]);

  function updateItem(section: Section, itemId: string, delta: number) {
    setGameState((prev) => {
      const storage = prev[section].storage;
      const existingIndex = storage.findIndex((item) => item.name === itemId);

      let newStorage;
      if (existingIndex >= 0) {
        // item exists, update count
        const newCount = Math.max(0, storage[existingIndex].count + delta);
        newStorage = storage.map((item, i) =>
          i === existingIndex ? { ...item, count: newCount } : item
        );
      } else if (delta > 0) {
        // item doesn't exist and we're adding, create new entry
        newStorage = [...storage, { name: itemId, count: delta }];
      } else {
        // item doesn't exist and we're subtracting, do nothing
        newStorage = storage;
      }

      return {
        ...prev,
        [section]: {
          ...prev[section],
          storage: newStorage,
        },
      };
    });
  }

  let content;
  if (currentView === "inventory") {
    content = <Inventory gameState={gameState} updateItem={updateItem} />;
  } else if (currentView === "orders") {
    content = <Orders gameState={gameState} />;
  } else {
    content = <Plan gameState={gameState} />;
  }

  return (
    <MainLayout currentView={currentView} onChangeView={setCurrentView}>
      {content}
    </MainLayout>
  );
}