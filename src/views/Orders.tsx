import { useState } from "react";
import type { GameState, Order, ItemStack } from "../typedefs/GameTypes";
import { INVENTORY_ITEMS } from "../typedefs/GameData";
import OrderSlotCard from "../components/OrderSlotCard";

type OrdersProps = {
  gameState: GameState;
  updateOrder: (slotIndex: number, order: Order | null) => void;
};

const ALL_ITEMS = INVENTORY_ITEMS.map((item) => item.id);

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

export default function Orders({ gameState, updateOrder }: OrdersProps) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [draftItems, setDraftItems] = useState<ItemStack[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  function handleSlotClick(index: number) {
    if (selectedSlot === index) return;
    setSelectedSlot(index);
    const existingOrder = gameState.orders[index];
    setDraftItems(existingOrder ? [...existingOrder.items] : []);
  }

  function openAddPopup() {
    setEditingIndex(null);
    setSelectedItem(null);
    setQuantity(1);
    setSearchQuery("");
    setShowPopup(true);
  }

  function openEditPopup(index: number) {
    const item = draftItems[index];
    setEditingIndex(index);
    setSelectedItem(item.name);
    setQuantity(item.count);
    setSearchQuery("");
    setShowPopup(true);
  }

  function handlePopupConfirm() {
    if (!selectedItem || quantity < 1) return;
    
    if (editingIndex !== null) {
      setDraftItems((prev) =>
        prev.map((item, i) =>
          i === editingIndex ? { name: selectedItem, count: quantity } : item
        )
      );
    } else {
      const existingIdx = draftItems.findIndex((d) => d.name === selectedItem);
      if (existingIdx >= 0) {
        setDraftItems((prev) =>
          prev.map((item, i) =>
            i === existingIdx ? { ...item, count: item.count + quantity } : item
          )
        );
      } else {
        setDraftItems((prev) => [...prev, { name: selectedItem, count: quantity }]);
      }
    }
    setShowPopup(false);
  }

  function handlePopupRemove() {
    if (editingIndex !== null) {
      setDraftItems((prev) => prev.filter((_, i) => i !== editingIndex));
    }
    setShowPopup(false);
  }

  function handleRandomOrder() {
    if (selectedSlot === null) return;
    const numItems = Math.floor(Math.random() * 4) + 2;
    const shuffled = [...ALL_ITEMS].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, numItems);
    const newItems: ItemStack[] = picked.map((name) => ({
      name,
      count: Math.floor(Math.random() * 10) + 1,
    }));
    setDraftItems(newItems);
  }

  function handleDeleteOrder() {
    if (selectedSlot === null) return;
    setDraftItems([]);
    updateOrder(selectedSlot, null);
  }

  function handleConfirmOrder() {
    if (selectedSlot === null || draftItems.length === 0) return;
    const totalItems = draftItems.reduce((sum, item) => sum + item.count, 0);
    const goldPayout = totalItems * 32;
    updateOrder(selectedSlot, { items: [...draftItems], goldPayout });
  }

  const filteredItems = ALL_ITEMS.filter((id) => {
    const label = getItemLabel(id).toLowerCase();
    return label.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b  min-h-[77px]">
        <div className="flex items-center text-sm text-gray-800">
          <span className="font-hayday text-2xl">Truck Orders</span>
          <img src="/assets/miscellaneous/truck.png" alt="Truck" className="w-12 h-12 ml-3" />
        </div>
      </div>

          <div className="flex h-full overflow-hidden">
      {/* Left side - 3x3 grid */}
      <div className="w-2/3 p-4 border-r border-gray-200">
        <div className="grid grid-cols-3 gap-4 h-full">
          {gameState.orders.map((order, index) => (
            <OrderSlotCard
              key={index}
              slotIndex={index}
              order={order}
              isSelected={selectedSlot === index}
              onClick={() => handleSlotClick(index)}
              gameState={gameState}
            />
          ))}
        </div>
      </div>

      {/* Right side - Modify panel */}
      <div className="w-1/3 p-4 flex flex-col">
        {selectedSlot === null ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select an order from the left
          </div>
        ) : (
          <>
            <h2 className="font-hayday text-lg font-semibold text-gray-800 mb-4 text-center">
              Modify Slot {selectedSlot + 1}
            </h2>

            {/* Items grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-3 gap-2">
                {draftItems.map((item, idx) => {
                  const have = getInventoryCount(gameState, item.name);
                  const colorClass = getQuantityColor(have, item.count);
                  return (
                    <button
                      key={idx}
                      onClick={() => openEditPopup(idx)}
                      className="flex flex-col items-center p-2 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 transition-colors h-28"
                    >
                      <img
                        src={`/assets/items/${item.name}.png`}
                        alt={getItemLabel(item.name)}
                        className="w-10 h-10 object-contain"
                      />
                      <span className="text-xs text-gray-700">{getItemLabel(item.name)}</span>
                      <span className={`text-xs font-medium ${colorClass}`}>
                        {have}/{item.count}
                      </span>
                    </button>
                  );
                })}

                {/* Add button */}
                <button
                  onClick={openAddPopup}
                  className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-amber-400 hover:bg-amber-50 transition-colors h-28"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-500 transition-colors">
                    ➕
                  </div>
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
              <button
                onClick={handleRandomOrder}
                className="flex-1 py-3 rounded-xl bg-yellow-100 hover:bg-yellow-200 flex flex-col items-center justify-center transition-colors"
                title="Random Order"
              >
                <img src="/assets/miscellaneous/randomize.png" alt="Randomize" className="w-8 h-8" />
                <span className="text-sm font-medium text-yellow-700">Randomize</span>
                <span className="text-sm font-medium text-yellow-700">Order</span>
              </button>
              <button
                onClick={handleDeleteOrder}
                className="flex-1 py-3 rounded-xl bg-red-100 hover:bg-red-200 flex flex-col items-center justify-center transition-colors"
                title="Delete Order"
              >
                <img src="/assets/miscellaneous/trashcan.png" alt="Trashcan" className="w-8 h-8" />
                <span className="text-sm font-medium text-red-700">Delete</span>
                <span className="text-sm font-medium text-red-700">Order</span>
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 py-3 rounded-xl bg-green-100 hover:bg-green-200 flex flex-col items-center justify-center transition-colors"
                title="Confirm Order"
              >
                <img src="/assets/miscellaneous/truck.png" alt="Truck" className="w-10 h-10" />
                <span className="text-sm font-medium text-green-700">Confirm</span>
                <span className="text-sm font-medium text-green-700">Order</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-96 max-h-[80vh] flex flex-col shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-hayday text-lg font-semibold">
                {editingIndex !== null ? "Edit Item" : "Add Item"}
              </h3>
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-4 gap-2">
                {filteredItems.map((id) => (
                  <button
                    key={id}
                    onClick={() => setSelectedItem(id)}
                    className={`flex flex-col items-center p-2 rounded-lg border-2 transition-colors ${
                      selectedItem === id
                        ? "border-amber-500 bg-amber-50"
                        : "border-transparent hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={`/assets/items/${id}.png`}
                      alt={getItemLabel(id)}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="text-xs text-gray-600 mt-1 text-center leading-tight">
                      {getItemLabel(id)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-sm font-medium text-gray-600">Quantity</span>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>

              <div className="flex gap-2">
                {editingIndex !== null && (
                  <button
                    onClick={handlePopupRemove}
                    className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                  >
                    Remove
                  </button>
                )}
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePopupConfirm}
                  disabled={!selectedItem}
                  className="flex-1 py-2 px-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}