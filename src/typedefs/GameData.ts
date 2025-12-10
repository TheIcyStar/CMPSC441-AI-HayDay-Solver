import type { InventoryItemConfig } from "../typedefs/GameTypes";

// Crops, Products, buildings, and animals cut off at level 30

//
// Helper types
export type ProductRecipe = {
  building: ProductionBuilding,
  timeCost: number //minutes
  ingredients: {
    item: Crop | FruitOrBerry | AnimalProduct | Product
    count: number
  }[]
}

//
// Individual item enums
export type Crop =
  "Wheat" |
  "Corn" |
  "Soybean" |
  "Sugarcane" |
  "Carrot" |
  "Indigo" |
  "Pumpkin" |
  "Cotton" |
  "ChiliPepper" |
  "Tomato"

export type FruitOrBerry =
  "Apple" |
  "Raspberry" |
  "Cherry" |
  "Blackberry" |
  "Blueberry"

export type AnimalProduct =
  "Egg" |
  "Milk" |
  "Bacon" |
  "Wool"

export type Product =
  "Bread" |
  "ChickenFeed" |
  "CowFeed" |
  "Cream" |
  "CornBread" |
  "BrownSugar" |
  "Popcorn" |
  "Butter" |
  "Pancake" |
  "PigFeed" |
  "Cookie" |
  "BaconAndEggs" |
  "Cheese" |
  "WhiteSugar" |
  "CarrotPie" |
  "PumpkinPie" |
  "SheepFeed" |
  "ButteredPopcorn" |
  "Sweater" |
  "BaconPie" |
  "Syrup" |
  "CottonFabric" |
  "Hamburger" |
  "RaspberryMuffin" |
  "BlueWoolyHat" |
  "CottonShirt" |
  "BlueSweater" |
  "CarrotCake" |
  "WoolyChaps" |
  "CreamCake" |
  "RedBerryCake" |
  "CheeseCake" |
  "ChiliPopcorn" |
  "VioletDress" |
  "BlackberryMuffin" |
  "CarrotJuice" |
  "ApplePie" |
  "AppleJuice" |
  "VanillaIceCream" |
  "RoastedTomatoes" |
  "CherryJuice"

export type AnimalFeed =
  "ChickenFeed" |
  "CowFeed" |
  "PigFeed" |
  "SheepFeed"

export type ProductionBuilding =
  "Bakery" |
  "FeedMill" |
  "Dairy" |
  "SugarMill" |
  "PopcornPot" |
  "BBQGrill" |
  "PieOven" |
  "Loom" |
  "SewingMachine" |
  "CakeOven" |
  "JuicePress" |
  "IceCreamMaker"

//
// Type narrowing functions

export function isProduct(itemName: string): itemName is Product {
  return Object.keys(RecipeInfo).includes(itemName)
}

export function isCrop(itemName: string): itemName is Crop {
  return Object.keys(CropInfo).includes(itemName)
}

export function isFruitOrBerry(itemName: string): itemName is FruitOrBerry {
  return Object.keys(FruitOrBerryInfo).includes(itemName)
}

export function isAnimalProduct(itemName: string): itemName is AnimalProduct {
  return Object.keys(AnimalInfo).includes(itemName)
}

//
// Item details

// Crop name keys, time to grow (minutes) values
export const CropInfo: Record<Crop, number>  = {
  Wheat: 2,
  Corn: 5,
  Soybean: 20,
  Sugarcane: 30,
  Carrot: 10,
  Indigo: 2*60,
  Pumpkin: 3*60,
  Cotton: 2.5*60,
  ChiliPepper: 4*60,
  Tomato: 6*60,
}

export const FruitOrBerryInfo: Record<FruitOrBerry, number> = {
  Apple: 16*60,
  Raspberry: 18*60,
  Cherry: 28*60, //1d 4h
  Blackberry: 32*60, //1d 8h
  Blueberry: 35*60 //1d 11h
}

export const AnimalInfo: Record<AnimalProduct, number> = {
  Egg: 20,
  Milk: 60,
  Bacon: 4*60,
  Wool: 6*60
}

export const AnimalFeedInfo: Record<AnimalProduct, AnimalFeed> = {
  Egg: "ChickenFeed",
  Milk: "CowFeed",
  Bacon: "PigFeed",
  Wool: "SheepFeed"
}

// Inventory item configuration
// id = inventory key, section = where item is stored, label = text under the icon
export const INVENTORY_ITEMS: InventoryItemConfig[] = [
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

// building labels for farm view
export const BUILDING_LABELS: Record<ProductionBuilding, string> = {
  Bakery: "Bakery",
  FeedMill: "Feed Mill",
  Dairy: "Dairy",
  SugarMill: "Sugar Mill",
  PopcornPot: "Popcorn Pot",
  BBQGrill: "BBQ Grill",
  PieOven: "Pie Oven",
  Loom: "Loom",
  SewingMachine: "Sewing Machine",
  CakeOven: "Cake Oven",
  JuicePress: "Juice Press",
  IceCreamMaker: "Ice Cream Maker",
};

export const RecipeInfo: Record<Product, ProductRecipe> = {
  Bread: {
    building: "Bakery",
    timeCost: 5,
    ingredients: [
      { item: "Wheat", count: 3 }
    ]
  },
  ChickenFeed: {
    building: "FeedMill",
    timeCost: 5,
    ingredients: [
      { item: "Wheat", count: 2 },
      { item: "Corn", count: 1 }
    ]
  },
  CowFeed: {
    building: "FeedMill",
    timeCost: 10,
    ingredients: [
      { item: "Soybean", count: 2 },
      { item: "Corn", count: 1 }
    ]
  },
  Cream: {
    building: "Dairy",
    timeCost: 20,
    ingredients: [
      { item: "Milk", count: 1 }
    ]
  },
  CornBread: {
    building: "Bakery",
    timeCost: 30,
    ingredients: [
      { item: "Corn", count: 1 },
      { item: "Egg", count: 2 },
    ]
  },
  BrownSugar: {
    building: "SugarMill",
    timeCost: 20,
    ingredients: [
      { item: "Sugarcane", count: 1 }
    ]
  },
  Popcorn: {
    building: "PopcornPot",
    timeCost: 30,
    ingredients: [
      { item: "Corn", count: 2 }
    ]
  },
  Butter: {
    building: "Dairy",
    timeCost: 30,
    ingredients: [
      { item: "Milk", count: 2 }
    ]
  },
  Pancake: {
    building: "BBQGrill",
    timeCost: 30,
    ingredients: [
      { item: "Egg", count: 3 },
      { item: "BrownSugar", count: 1 }
    ]
  },
  PigFeed: {
    building: "FeedMill",
    timeCost: 20,
    ingredients: [
      { item: "Carrot", count: 2 },
      { item: "Soybean", count: 1 }
    ]
  },
  Cookie: {
    building: "Bakery",
    timeCost: 60,
    ingredients: [
      { item: "Wheat", count: 2 },
      { item: "Egg", count: 2 },
      { item: "BrownSugar", count: 1 },
    ]
  },
  BaconAndEggs: {
    building: "BBQGrill",
    timeCost: 60,
    ingredients: [
      { item: "Egg", count: 4 },
      { item: "Bacon", count: 2 }
    ]
  },
  Cheese: {
    building: "Dairy",
    timeCost: 60,
    ingredients: [
      { item: "Milk", count: 3 }
    ]
  },
  WhiteSugar: {
    building: "SugarMill",
    timeCost: 40,
    ingredients: [
      { item: "Sugarcane", count: 2 }
    ]
  },
  CarrotPie: {
    building: "PieOven",
    timeCost: 60,
    ingredients: [
      { item: "Carrot", count: 3 },
      { item: "Wheat", count: 2 },
      { item: "Egg", count: 1 }
    ]
  },
  PumpkinPie: {
    building: "PieOven",
    timeCost: 2*60,
    ingredients: [
      { item: "Pumpkin", count: 3 },
      { item: "Wheat", count: 2 },
      { item: "Egg", count: 1 }
    ]
  },
  SheepFeed: {
    building: "FeedMill",
    timeCost: 30,
    ingredients: [
      { item: "Wheat", count: 3 },
      { item: "Soybean", count: 1 }
    ]
  },
  ButteredPopcorn: {
    building: "PopcornPot",
    timeCost: 60,
    ingredients: [
      { item: "Corn", count: 2 },
      { item: "Butter", count: 1 }
    ]
  },
  Sweater: {
    building: "Loom",
    timeCost: 2*60,
    ingredients: [
      { item: "Wool", count: 2 }
    ]
  },
  BaconPie: {
    building: "PieOven",
    timeCost: 3*60,
    ingredients: [
      { item: "Bacon", count: 3 },
      { item: "Egg", count: 1 },
      { item: "Wheat", count: 2 }
    ]
  },
  Syrup: {
    building: "SugarMill",
    timeCost: 1.5*60,
    ingredients: [
      { item: "Sugarcane", count: 4 }
    ]
  },
  CottonFabric: {
    building: "Loom",
    timeCost: 30,
    ingredients: [
      { item: "Cotton", count: 3 }
    ]
  },
  Hamburger: {
    building: "BBQGrill",
    timeCost: 2*60,
    ingredients: [
      { item: "Bread", count: 2 },
      { item: "Bacon", count: 2 }
    ]
  },
  RaspberryMuffin: {
    building: "Bakery",
    timeCost: 45,
    ingredients: [
      { item: "Wheat", count: 2 },
      { item: "Egg", count: 1 },
      { item: "Raspberry", count: 2 }
    ]
  },
  BlueWoolyHat: {
    building: "Loom",
    timeCost: 60,
    ingredients: [
      { item: "Wool", count: 1 },
      { item: "Indigo", count: 1 }
    ]
  },
  CottonShirt: {
    building: "SewingMachine",
    timeCost: 45,
    ingredients: [
      { item: "CottonFabric", count: 2 }
    ]
  },
  BlueSweater: {
    building: "Loom",
    timeCost: 3*60,
    ingredients: [
      { item: "Wool", count: 2 },
      { item: "Indigo", count: 2 }
    ]
  },
  CarrotCake: {
    building: "CakeOven",
    timeCost: 1.5*60,
    ingredients: [
      { item: "Carrot", count: 2 },
      { item: "Butter", count: 1 },
      { item: "BrownSugar", count: 1 }
    ]
  },
  WoolyChaps: {
    building: "SewingMachine",
    timeCost: 1.5*60,
    ingredients: [
      { item: "CottonFabric", count: 1 },
      { item: "Wool", count: 3 }
    ]
  },
  CreamCake: {
    building: "CakeOven",
    timeCost: 3*60,
    ingredients: [
      { item: "Wheat", count: 5 },
      { item: "Cream", count: 1 },
      { item: "WhiteSugar", count: 1 }
    ]
  },
  RedBerryCake: {
    building: "CakeOven",
    timeCost: 60,
    ingredients: [
      { item: "Raspberry", count: 1 },
      { item: "Cherry", count: 2 },
      { item: "Milk", count: 1 },
      { item: "Egg", count: 1 }
    ]
  },
  CheeseCake: {
    building: "CakeOven",
    timeCost: 4*60,
    ingredients: [
      { item: "Cheese", count: 1 },
      { item: "Cookie", count: 1 }
    ]
  },
  ChiliPopcorn: {
    building: "PopcornPot",
    timeCost: 2*60,
    ingredients: [
      { item: "Corn", count: 2 },
      { item: "ChiliPepper", count: 2 }
    ]
  },
  VioletDress: {
    building: "SewingMachine",
    timeCost: 2.25*60,
    ingredients: [
      { item: "CottonFabric", count: 2 },
      { item: "Raspberry", count: 1 },
      { item: "Indigo", count: 1 }
    ]
  },
  BlackberryMuffin: {
    building: "Bakery",
    timeCost: 45,
    ingredients: [
      { item: "Wheat", count: 1 },
      { item: "Egg", count: 2 },
      { item: "Blackberry", count: 2 }
    ]
  },
  CarrotJuice: {
    building: "JuicePress",
    timeCost: 30,
    ingredients: [
      { item: "Carrot", count: 3 }
    ]
  },
  ApplePie: {
    building: "PieOven",
    timeCost: 2.5*60,
    ingredients: [
      { item: "Apple", count: 3 },
      { item: "Wheat", count: 2 },
      { item: "Egg", count: 1 },
      { item: "Syrup", count: 1 }
    ]
  },
  AppleJuice: {
    building: "JuicePress",
    timeCost: 2*60,
    ingredients: [
      { item: "Apple", count: 2 }
    ]
  },
  VanillaIceCream: {
    building: "IceCreamMaker",
    timeCost: 2*60,
    ingredients: [
      { item: "Milk", count: 1 },
      { item: "Cream", count: 1 },
      { item: "WhiteSugar", count: 1 }
    ]
  },
  RoastedTomatoes: {
    building: "BBQGrill",
    timeCost: 1.5*60,
    ingredients: [
      { item: "Tomato", count: 2 }
    ]
  },
  CherryJuice: {
    building: "JuicePress",
    timeCost: 2.5*60,
    ingredients: [
      { item: "Cherry", count: 2 }
    ]
  }
}