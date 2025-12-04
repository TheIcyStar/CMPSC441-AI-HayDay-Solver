import type { ItemStack } from "../typedefs/GameTypes";

{/* add into gametype.ts ? */}
type OrderSlot = {
    id: number;
    items: ItemStack[];
    reward: number;
    isGenerated: boolean;
}
type OrderSlotCardProps = {
    slot: OrderSlot;
    isSelected: boolean;
    onClick: () => void;
}


export default function OrderSlotCard({ slot, isSelected, onClick }: OrderSlotCardProps) {
    const isEmpty = slot.items.length === 0 && slot.isGenerated === false;

    return(

        <div onClick={onClick} className = "cursor-pointer"></div>

    );
}