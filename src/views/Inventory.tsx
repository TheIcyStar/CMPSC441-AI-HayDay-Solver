import { useState } from "react";
import type { InventoryCounts, Section } from "../typedefs/GameTypes";
import InventoryGrid from "../components/InventoryGrid";

type InventoryProps = {
  inventory: InventoryCounts;
  updateItem: (section: Section, itemId: string, delta: number) => void;
};

export default function Inventory({ inventory, updateItem }: InventoryProps) {
  const [activeSection, setActiveSection] = useState<Section>("silo");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSection("silo")}
            className={`
              font-hayday text-lg py-2 px-4 rounded-lg font-semibold transition-colors
              ${activeSection === "silo"
                ? "bg-amber-500 text-white"
                : "bg-amber-900 text-amber-100 hover:bg-amber-600"
              }
            `}
          >
            Silo
          </button>
          <button
            onClick={() => setActiveSection("barn")}
            className={`
              font-hayday text-lg py-2 px-4 rounded-lg font-semibold transition-colors
              ${activeSection === "barn"
                ? "bg-amber-500 text-white"
                : "bg-amber-900 text-amber-100 hover:bg-amber-600"
              }
            `}
          >
            Barn
          </button>
        </div>

        {/* Edit / Save button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`
            font-hayday text-lg py-2 px-4 rounded-lg font-semibold transition-colors
            ${isEditing
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "bg-blue-400 text-white hover:bg-blue-500"
            }
          `}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-4">
        <InventoryGrid
          section={activeSection}
          isEditing={isEditing}
          inventory={inventory}
          updateItem={updateItem}
        />
      </div>
    </div>
  );
}