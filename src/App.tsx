import { useState, useEffect } from "react";
import type { GameState, Section, Order } from "./typedefs/GameTypes";
import MainLayout from "./layouts/MainLayout";
import Farm from "./views/Farm";
import Inventory from "./views/Inventory";
import Orders from "./views/Orders";
import Plan from "./views/Plan";

const defaultGameState: GameState = {
  silo: {
    storage: [
      { name: "Wheat", count: 10 },
      { name: "Corn", count: 10 },
      { name: "Soybean", count: 10 },
      { name: "Sugarcane", count: 10 },
      { name: "Carrot", count: 10 },
      { name: "Indigo", count: 10 },
      { name: "Pumpkin", count: 10 },
      { name: "Cotton", count: 10 },
      { name: "ChilliPepper", count: 10 },
      { name: "Tomato", count: 10 },
    ],
    capacity: 500,
  },
  barn: {
    storage: [
      { name: "Egg", count: 1 },
      { name: "Milk", count: 2 },
      { name: "Bacon", count: 1 },
    ],
    capacity: 500,
  },
  orders: Array(9).fill(null),
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
    numChickens: 18,
    cows: [],
    numCows: 15,
    pigs: [],
    numPigs: 15,
    sheep: [],
    numSheep: 15,
  },
  productionBuildings: [
    {
      name: "Bakery",
      count: 1,
      productionQueues: [{ queue: [], maxQueueSize: 1 }],
    },
    {
      name: "FeedMill",
      count: 2,
      productionQueues: [{ queue: [], maxQueueSize: 1 }],
    },
    {
      name: "Dairy",
      count: 1,
      productionQueues: [{ queue: [], maxQueueSize: 1 }],
    },
    {
      name: "SugarMill",
      count: 1,
      productionQueues: [{ queue: [], maxQueueSize: 1 }],
    },
    {
      name: "PopcornPot",
      count: 1,
      productionQueues: [{ queue: [], maxQueueSize: 1 }],
    },
    {
      name: "BBQGrill",
      count: 1,
      productionQueues: [{ queue: [], maxQueueSize: 1 }],
    },
    {
      name: "PieOven",
      count: 1,
      productionQueues: [{ queue: [], maxQueueSize: 1 }],
    },
    {
      name: "Loom",
      count: 1,
      productionQueues: [{ queue: [], maxQueueSize: 1 }],
    },
    {
      name: "SewingMachine",
      count: 1,
      productionQueues: [{ queue: [], maxQueueSize: 1 }],
    },
    {
      name: "CakeOven",
      count: 1,
      productionQueues: [{ queue: [], maxQueueSize: 1 }],
    },
    {
      name: "JuicePress",
      count: 1,
      productionQueues: [{ queue: [], maxQueueSize: 1 }],
    },
    {
      name: "IceCreamMaker",
      count: 1,
      productionQueues: [{ queue: [], maxQueueSize: 1 }],
    },
  ],
};

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
  const [currentView, setCurrentView] = useState<"farm" | "inventory" | "orders" | "plan">("inventory");
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

  function updateOrder(slotIndex: number, order: Order | null) {
    setGameState((prev) => {
      const newOrders = [...prev.orders];
      newOrders[slotIndex] = order;
      return { ...prev, orders: newOrders };
    });
  }

  let content;
  if (currentView === "farm") {
    content = <Farm gameState={gameState} setGameState={setGameState} />;
  } else if (currentView === "inventory") {
    content = <Inventory gameState={gameState} updateItem={updateItem} />;
  } else if (currentView === "orders") {
    content = <Orders gameState={gameState} updateOrder={updateOrder} />;
  } else {
    content = <Plan gameState={gameState} />;
  }

  return (
    <MainLayout currentView={currentView} onChangeView={setCurrentView}>
      {content}
    </MainLayout>
  );
}