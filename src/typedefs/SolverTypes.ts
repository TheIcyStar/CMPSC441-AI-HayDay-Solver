import type { AnimalProduct, Crop, FruitOrBerry, Product,  } from "./GameData"
import type { ItemStack } from "./GameTypes"

export type SolutionStep = {
    // crops planted, productions started, etc
    newQueueItems: {
      itemName: AnimalProduct | Crop | FruitOrBerry | Product
      count: number
    }[]

    // Items collected from crop fields, production buildings, etc
    newProducedItems: ItemStack[]

    // IDs of truck orders to complete (0-8)
    // This type is too narrow to handle other order types like the boat, town, etc,
    // So this could be extended in the future to include an order type and id
    ordersComplete: number[]

    // time to wait
    nextActionDelayMinutes: number //zero if last action
}