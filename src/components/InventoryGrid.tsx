import type { GameState, Section, InventoryItemConfig } from "../typedefs/GameTypes";
import { INVENTORY_ITEMS } from "../typedefs/GameData";
import InventoryItemCard from "./InventoryItemCard";

type InventoryGridProps = {
  section: Section;
  isEditing: boolean;
  gameState: GameState;
  updateItem: (section: Section, itemId: string, delta: number) => void;
};

export default function InventoryGrid({ section, isEditing, gameState, updateItem }: InventoryGridProps) {
  const filteredItems = INVENTORY_ITEMS.filter((item: InventoryItemConfig) => item.section === section);

  function getCount(itemId: string): number {
    const stack = gameState[section].storage.find((s) => s.name === itemId);
    return stack?.count ?? 0;
  }

  return (
    <div className="grid grid-cols-7 gap-6">
      {filteredItems.map((item: InventoryItemConfig) => {
        const count = getCount(item.id);
        return (
          <InventoryItemCard
            key={item.id}
            iconName={item.id}
            label={item.label}
            count={count}
            isEditing={isEditing}
            onIncrement={() => updateItem(section, item.id, 1)}
            onDecrement={() => updateItem(section, item.id, -1)}
          />
        );
      })}
    </div>
  );
}