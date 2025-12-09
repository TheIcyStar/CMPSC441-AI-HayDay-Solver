import type { Order, GameState } from "../typedefs/GameTypes";
import { INVENTORY_ITEMS } from "../typedefs/GameData";

type OrderSlotCardProps = {
  slotIndex: number;
  order: Order | null;
  isSelected: boolean;
  onClick: () => void;
  gameState: GameState;
};

function getInventoryCount(gameState: GameState, itemName: string): number {
  const siloItem = gameState.silo.storage.find((s) => s.name === itemName);
  if (siloItem) return siloItem.count;
  const barnItem = gameState.barn.storage.find((s) => s.name === itemName);
  if (barnItem) return barnItem.count;
  return 0;
}

function getItemLabel(itemId: string): string {
  const config = INVENTORY_ITEMS.find((i) => i.id === itemId);
  return config?.label ?? itemId;
}

function getQuantityColor(have: number, need: number): string {
  if (have === 0) return "text-red-500";
  if (have < need) return "text-yellow-500";
  return "text-green-500";
}

export default function OrderSlotCard({ slotIndex, order, isSelected, onClick, gameState }: OrderSlotCardProps) {
  const isEmpty = !order || order.items.length === 0;

  return (
    <button
    onClick={onClick}
    className={`
        relative w-full h-54 rounded-xl border-2 p-3 transition-all
        flex flex-col
        ${isEmpty
        ? "border-gray-200 bg-gray-50 opacity-60"
        : isSelected
            ? "border-amber-500 bg-amber-200 shadow-lg"
            : "border-gray-200 bg-amber-50 hover:border-amber-300 hover:bg-amber-100"
        }
    `}
    >
      <div className="text-base font-hayday text-gray-800 mb-2">Slot {slotIndex + 1}</div>
      
      {isEmpty ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Empty Order</span>
        </div>
      ) : (
        <>
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <div className="flex flex-col gap-1 overflow-y-auto max-h-[120px] pr-2">
            {order.items.map((item, idx) => {
                const have = getInventoryCount(gameState, item.name);
                const colorClass = getQuantityColor(have, item.count);
                return (
                <div key={idx} className="flex items-center w-full text-xs">
                    <img
                    src={`/assets/items/${item.name}.png`}
                    alt={getItemLabel(item.name)}
                    className="w-5 h-5 object-contain flex-shrink-0"
                    />
                    <span className="ml-1 text-gray-700 truncate">{getItemLabel(item.name)}</span>
                    <span className={`ml-auto flex-shrink-0 ${colorClass}`}>{have}/{item.count}</span>
                </div>
                );
            })}
            </div>
        </div>
        <div className="mt-2 pt-1 border-t border-gray-800 flex items-center justify-end gap-1">
            <img src="./assets/miscellaneous/gold.png" alt="Gold" className="w-4 h-4" />
            <span className="text-sm font-semibold text-gray-700">{order.goldPayout}</span>
        </div>
        </>
      )}
    </button>
  );
}