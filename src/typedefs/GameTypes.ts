import type { AnimalProduct, Crop, FruitOrBerry, Product, ProductionBuilding } from "./GameData"

//
// Farm state types (for App.tsx)
export type Section = "silo" | "barn";

export type InventoryCounts = {
  silo: Record<string, number>;
  barn: Record<string, number>;
};

export type InventoryItemConfig = {
  id: string;
  section: Section;
  label: string;
};


export type OrderSlot = {
  id: number;
  items: ItemStack[];
  reward: number;
  isGenerated: boolean;
};

export type ProductionStep = { id: number; /* TODO */ };

//
// Basic primatives
export type ItemStack = {
  name: string,
  count: number
}

export type Order = {
  items: ItemStack,
  goldPayout: number
  //No XP handling at this time
}

export type QueuedItem = {
  name: Crop | FruitOrBerry | Product | AnimalProduct,
  startTime: number, // this can be in the future if the item is later in the queue
  completeTime: number // for convinience
}

//
// Game data
export type ProductionBuildingData = {
  name: ProductionBuilding
  count: number, // Usually 1, but you can have 2 buildings like feed mills
  productionQueues: {
    queue: QueuedItem[],
    maxQueueSize: number
  }[]
}

export type bushOrTreeData = {
  product: FruitOrBerry,
  numHarvests: 0 | 1 | 2 | 3 | 4, // wilts at 4
  startTime: number, // when a growth stage begins
  completeTime: number
}

export type GameState = {
  silo: {
    storage: ItemStack[],
    capacity: number
  },
  barn: {
    storage: ItemStack[],
    capacity: number
  },

  cropFields: {
    fields: QueuedItem[],
    maxCount: number
  },

  bushesAndTrees: {
    planted: bushOrTreeData[],
    maxCount: number
  },

  animals: {
    chickens: QueuedItem[],
    numChickens: number,

    cows: QueuedItem[],
    numCows: number,

    pigs: QueuedItem[],
    numPigs: number,

    sheep: QueuedItem[],
    numSheep: number
  },

  productionBuildings: ProductionBuildingData[]
}