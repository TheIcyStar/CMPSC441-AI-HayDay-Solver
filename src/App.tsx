import { useState, useEffect } from "react";
import type { InventoryCounts, Section } from "./typedefs/GameTypes";
import MainLayout from "./layouts/MainLayout";
import Inventory from "./views/Inventory";
import Orders from "./views/Orders";
import Plan from "./views/Plan";

const defaultInventory: InventoryCounts = {
  silo: {
    Wheat: 1,
    Corn: 2,
    Carrot: 3,
    Soybean: 4,
    Sugarcane: 5,
  },
  barn: {
    Egg: 1,
    Milk: 2,
    Bacon: 3,
    Bread: 4,
    Cream: 5,
  },
};

// load inventory from localStorage
// if none stored return default inventory
function loadInventory(): InventoryCounts {
  const saved = localStorage.getItem("farmInventory");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultInventory;
    }
  }
  return defaultInventory;
}

export default function App() {
  const [currentView, setCurrentView] = useState<"inventory" | "orders" | "plan">("inventory");
  const [inventory, setInventory] = useState<InventoryCounts>(loadInventory);

  useEffect(() => {
    localStorage.setItem("farmInventory", JSON.stringify(inventory));
  }, [inventory]);

  function updateItem(section: Section, itemId: string, delta: number) {
    setInventory((prev) => {
      const currentCount = prev[section][itemId] ?? 0;
      const newCount = Math.max(0, currentCount + delta);
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [itemId]: newCount,
        },
      };
    });
  }

  let content;
  if (currentView === "inventory") {
    content = <Inventory inventory={inventory} updateItem={updateItem} />;
  } else if (currentView === "orders") {
    content = <Orders inventory={inventory} />;
  } else {
    content = <Plan inventory={inventory} />;
  }

  return (
    <MainLayout currentView={currentView} onChangeView={setCurrentView}>
      {content}
    </MainLayout>
  );
}