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

export type ProductionBuilding =
"CropField" |
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

export const BerryOrFruitInfo: Record<FruitOrBerry, number> = {
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