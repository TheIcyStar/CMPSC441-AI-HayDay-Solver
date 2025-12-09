import type { InventoryCounts } from "../typedefs/GameTypes";
import OrderSlotCard, {type OrderSlot} from "../components/OrderSlotCard";
import ItemSelector from "../components/ItemSelector";
import { useState } from "react";


type OrdersProps = {
  inventory: InventoryCounts;
};

export default function Orders({ inventory }: OrdersProps) {
  const [slots, setSlots] = useState<OrderSlot[]>(
    Array.from({length:9 }, (_, i) => ({
      id: i+1,
      items:[],
      reward:0,
      isGenerated:false
    }))
  );

  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [showItemSelector, setShowItemSelector] = useState(false);
  const selectedSlot = slots.find(s => s.id === selectedSlotId);

  const handleAddItem = (itemName: string, count: number) => {
      if(selectedSlotId === null) return;

      setSlots(prev => prev.map(slot => {
        if (slot.id === selectedSlotId) {
          return {
            ...slot,
            items: [...slot.items, {name: itemName, count}]
          };
        }
        return slot;
      }));
    };

  const handleGenerateOrder = () => {
    if (selectedSlotId === null) return;

    setSlots(prev =>prev.map(slot => {
      if (slot.id === selectedSlotId && slot.items.length > 0){
        const reward = Math.floor(Math.random() * 100) + 100;

        return {
          ...slot,
          reward,
          isGenerated: true
        };
      }
      return slot;
    }));
  };  

  const handleClearSlot = () =>{
    if (selectedSlotId === null) return;

    setSlots(prev => prev.map(slot => {
      if (slot.id === selectedSlotId){
        return {
          ...slot,
          items: [],
          reward: 0,
          isGenerated: false
        };
      }
      return slot;
    }));
  };


  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b text-lg font-semibold">
        <h1 className = "text-xl font-bold mb-2"> Orders </h1>
        <p className = "text-sm text-gray-600"> Select a slot, add items, then generate the order</p>
      </div>

      {/*9x9 Grid Layout*/}
      <div className = "flex-1 p-4 overflow-y-auto">
        <div className ="grid grid-cols-3 grid-rows-3 gap-4 mb-4">
          {slots.map((slot) => (
            <OrderSlotCard
              key = {slot.id}
              slot = {slot}
              isSelected = {selectedSlotId === slot.id}
              onClick={ () => setSelectedSlotId(slot.id)}
              />
          ))}
        </div>

        {/*AddButton and controls*/}
        {selectedSlotId && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-300">
            <h3 className="font-semibold mb-3">
              Editing Slot {selectedSlotId}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowItemSelector(true)}
                disabled={selectedSlot?.isGenerated}
                className={`
                  px-4 py-2 rounded-lg font-semibold transition-colors
                  ${selectedSlot?.isGenerated
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                  }
                `}
              >
                + Add Item
              </button>
              <button
                onClick={handleGenerateOrder}
                disabled={!selectedSlot || selectedSlot.items.length === 0 || selectedSlot.isGenerated}
                className={`
                  px-4 py-2 rounded-lg font-semibold transition-colors
                  ${selectedSlot && selectedSlot.items.length > 0 && !selectedSlot.isGenerated
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                Generate Order
              </button>
              <button
                onClick={handleClearSlot}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-colors"
              >
                Clear Slot
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Item Selector Modal */}
      {showItemSelector && (
        <ItemSelector
          onSelectItem={handleAddItem}
          onClose={() => setShowItemSelector(false)}
        />
      )}
      
    </div>
  );
}