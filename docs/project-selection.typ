#set text(
  size: 12pt
)

// = Group Members


= Project Overview
*Title*: AI Hay Day Solver

We propose a resource management AI for Supercell's mobile game, _Hay Day_. The game consists of fulfilling orders of various products made by the player's farm, which often require lengthy recipe trees and long production times. The goal of the AI agent would be to maximize the amount of gold made from fulfilling orders in the shortest amount of time.

To give an example of what problem the agent will be solving, assume we have two orders:
- 2 Cookies
- 1 Cream Cake

and some initial state of the farm with some amount of starting materials and empty production buildings.

The recipe trees for the products in the order and their prerequisite ingredients' production times would be:

- *1 Cookie* - 1 hour
  - 2 Wheat - 2 minutes each
  - 2 Eggs - 20 minutes each
    - 2 Chicken Feed - 5 minutes each
      - 2 Wheat
      - 1 Corn - 5 minutes each
  - 1 Brown Sugar - 20 minutes each
    - 1 Sugar Cane - 30 minutes each

- *1 Cream Cake* - 3 hours
  - 5 Wheat
  - 1 Cream - 20 minutes each
    - 1 Milk - 1 hour
      - Cow feed - 10 minutes
        - 2 Soybean - 20 minutes
        - 1 Corn
  - 1 White Sugar - 40 minutes each
    - 2 Sugar Cane

The agent would then determine the best order to start production of each item to fulfill each order.

Note that while crops like wheat and animal products like eggs can be grown in parallel, products like cream, animal feed, and sugar are made *one at a time* in specialized production buildings. In this order example, the agent will not be able to create chicken feed and cow feed at the same time. These bottlenecks can block production further up the recipe tree.

The agent must also take into account their stock of crops. One crop can be planted to yield two in return, but that crop must exist in order to plant. For example, if the agent starts with 10 wheat and plants all of it, they will receive 20 back. But if the agent only has 5 wheat, it will need to plant its entire supply twice to reach 20.