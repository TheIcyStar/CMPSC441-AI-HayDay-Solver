import type { ItemStack } from "../typedefs/GameTypes";

// OrderSlot data structure (consider moving to GameTypes.ts)
type OrderSlot = {
    id: number;          // Slot number (1-9)
    items: ItemStack[];  // Items in this order
    reward: number;      // Gold reward amount
    isGenerated: boolean;// True if order is finalized
}

// Props passed from parent component
type OrderSlotCardProps = {
    slot: OrderSlot;      // Order data to display
    isSelected: boolean;  // Is this slot selected?
    onClick: () => void;  // Function to call on click
}

// Component: Displays a single order slot card
export default function OrderSlotCard({ slot, isSelected, onClick }: OrderSlotCardProps) {
    // Check if slot has no items and is not generated
    const isEmpty = slot.items.length === 0 && slot.isGenerated === false;

    return(
        // Main card container - clickable with dynamic styling
        <div onClick={onClick} 
            className = {`border-2 rounded-lg p-4 cursor-pointer transition-all min-h-[200px]
            ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
            ${isEmpty ? "bg-gray-50" : "bg-white"}
            ${slot.isGenerated ? "bg-green-50 border-green-500" : ""}
        `}>
            {/* Header: Slot ID and status badge */}
            <div className = "flex justify-between items-start mb-2">
                {/* Slot number */}
                <span className = "text-sm font-semibold text-gray-600">
                    Slot {slot.id}
                </span>
                {/* Show "Generated" badge if order is complete */}
                {slot.isGenerated && (
                    <span className = "text-xs bg-green-500 text-white px-2 py-1 rounded">
                        Generated
                    </span>
                )}
            </div>

            {/* Content: Show empty message or item list */}
            {isEmpty ? (
                // Empty state
                <div className = "flex items-center justify-center h-24 text-gray-400 text-sm">
                    Empty Slot
                </div>
            ) : ( 
                // Filled state with items and reward
                <>
                    {/* Item list */}
                    <div className = "space-y-1 mb-3">
                        {slot.items.map((item, idx) => (
                            <div key = {idx} className = "flex justify-between text-sm">
                                {/* Item name */}
                                <span className = "text-gray-700"> {item.name} </span>
                                {/* Item quantity */}
                                <span className = "font-semibold text-gray-900"> x{item.count} </span>
                            </div>
                        ))}
                    </div>
                    {/* Reward display (only if reward > 0) */}
                    {slot.reward > 0 && (
                        <div className = "text-sm font-bold text-yellow-600 mt-2">
                            💰 {slot.reward} coins
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

// Export types for other components
export type {OrderSlot, OrderSlotCardProps};