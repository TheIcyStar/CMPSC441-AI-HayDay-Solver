import type { GameState, Section, InventoryItemConfig } from "../typedefs/GameTypes";
import InventoryItemCard from "./InventoryItemCard";

// id = inventory key, section = where item is stored, label = text under the icon
const INVENTORY_ITEMS: InventoryItemConfig[] = [
  // Silo - crops
  { id: "Wheat", section: "silo", label: "Wheat" },
  { id: "Corn", section: "silo", label: "Corn" },
  { id: "Soybean", section: "silo", label: "Soybean" },
  { id: "Sugarcane", section: "silo", label: "Sugarcane" },
  { id: "Carrot", section: "silo", label: "Carrot" },
  { id: "Indigo", section: "silo", label: "Indigo" },
  { id: "Pumpkin", section: "silo", label: "Pumpkin" },
  { id: "Cotton", section: "silo", label: "Cotton" },
  { id: "ChiliPepper", section: "silo", label: "Chili Pepper" },
  { id: "Tomato", section: "silo", label: "Tomato" },
  // Silo - fruits and berries
  { id: "Apple", section: "silo", label: "Apple" },
  { id: "Raspberry", section: "silo", label: "Raspberry" },
  { id: "Cherry", section: "silo", label: "Cherry" },
  { id: "Blackberry", section: "silo", label: "Blackberry" },
  { id: "Blueberry", section: "silo", label: "Blueberry" },
  // Barn - animal products
  { id: "Egg", section: "barn", label: "Egg" },
  { id: "Milk", section: "barn", label: "Milk" },
  { id: "Bacon", section: "barn", label: "Bacon" },
  { id: "Wool", section: "barn", label: "Wool" },
  // Barn - products
  { id: "Bread", section: "barn", label: "Bread" },
  { id: "ChickenFeed", section: "barn", label: "Chicken Feed" },
  { id: "CowFeed", section: "barn", label: "Cow Feed" },
  { id: "Cream", section: "barn", label: "Cream" },
  { id: "CornBread", section: "barn", label: "Corn Bread" },
  { id: "BrownSugar", section: "barn", label: "Brown Sugar" },
  { id: "Popcorn", section: "barn", label: "Popcorn" },
  { id: "Butter", section: "barn", label: "Butter" },
  { id: "Pancake", section: "barn", label: "Pancake" },
  { id: "PigFeed", section: "barn",  label: "Pig Feed" },
  { id: "Cookie", section: "barn", label: "Cookie" },
  { id: "BaconAndEggs", section: "barn", label: "Bacon and Eggs" },
  { id: "Cheese", section: "barn", label: "Cheese" },
  { id: "WhiteSugar", section: "barn", label: "White Sugar" },
  { id: "CarrotPie", section: "barn", label: "Carrot Pie" },
  { id: "PumpkinPie", section: "barn", label: "Pumpkin Pie" },
  { id: "SheepFeed", section: "barn", label: "Sheep Feed" },
  { id: "ButteredPopcorn", section: "barn", label: "Buttered Popcorn" },
  { id: "Sweater", section: "barn", label: "Sweater" },
  { id: "BaconPie", section: "barn", label: "Bacon Pie" },
  { id: "Syrup", section: "barn", label: "Syrup" },
  { id: "CottonFabric", section: "barn", label: "Cotton Fabric" },
  { id: "Hamburger", section: "barn", label: "Hamburger" },
  { id: "RaspberryMuffin", section: "barn", label: "Raspberry Muffin" },
  { id: "BlueWoolyHat", section: "barn", label: "Blue Wooly Hat" },
  { id: "CottonShirt", section: "barn", label: "Cotton Shirt" },
  { id: "BlueSweater", section: "barn", label: "Blue Sweater" },
  { id: "CarrotCake", section: "barn", label: "Carrot Cake" },
  { id: "WoolyChaps", section: "barn", label: "Wooly Chaps" },
  { id: "CreamCake", section: "barn", label: "Cream Cake" },
  { id: "RedBerryCake", section: "barn", label: "Red Berry Cake" },
  { id: "CheeseCake", section: "barn", label: "Cheesecake" },
  { id: "ChiliPopcorn", section: "barn", label: "Chili Popcorn" },
  { id: "VioletDress", section: "barn", label: "Violet Dress" },
  { id: "BlackberryMuffin", section: "barn", label: "Blackberry Muffin" },
  { id: "CarrotJuice", section: "barn", label: "Carrot Juice" },
  { id: "ApplePie", section: "barn", label: "Apple Pie" },
  { id: "AppleJuice", section: "barn", label: "Apple Juice" },
  { id: "VanillaIceCream", section: "barn", label: "Vanilla Ice Cream" },
  { id: "RoastedTomatoes", section: "barn", label: "Roasted Tomatoes" },
  { id: "CherryJuice", section: "barn", label: "Cherry Juice" },
];

type InventoryGridProps = {
  section: Section;
  isEditing: boolean;
  gameState: GameState;
  updateItem: (section: Section, itemId: string, delta: number) => void;
};

export default function InventoryGrid({ section, isEditing, gameState, updateItem }: InventoryGridProps) {
  const filteredItems = INVENTORY_ITEMS.filter((item) => item.section === section);

  function getCount(itemId: string): number {
    const stack = gameState[section].storage.find((s) => s.name === itemId);
    return stack?.count ?? 0;
  }

  return (
    <div className="grid grid-cols-7 gap-6">
      {filteredItems.map((item) => {
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