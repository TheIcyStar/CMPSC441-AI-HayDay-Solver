#set text(
  size: 12pt,
  font: "Times New Roman",
)
// #set par(first-line-indent: (amount: 4em, all: true))

/*Project Submission guidelines:
Your project submission should include the following components:
1. Project Title and Group Members: Write down the title of your project and list all
members participating.
2. Background and Context: Provide a concise overview of the problem domain, its
relevance, and the motivation behind your project.
3. Methodology: Present a detailed description of the AI techniques, algorithms, and
approaches employed in your work.
4. Results and Demonstrations: Summarize the outcomes of your project and include
any visualizations, performance metrics, or demonstrations that support your
findings.
5. Conclusion: Highlight the key insights and contributions of your project.
6. Source Code: Include all relevant Python or Java files as part of your submission*/
//title and group members in the middle of the page

#align(center)[
  #text(size: 32pt)[*AI Hay Day Solver*]

  #v(-2em)
  #text(size: 24pt)[_CMPSC 441_]

  #v(40%)

  #text(size: 16pt)[
    *Group Members*

    Adam Che Nazahatuhisamudin\
    Alexander Petrov\
    Alex Chmielowski\
    Joseph Cooper\
    Cheney Tai
  ]
]

#pagebreak()
== Project Background and Context
Hay Day is a popular mobile farming game by Supercell that involves resource management, production planning, and order fulfillment. Players must manage their farm's inventory, produce goods through complex recipe chains, and complete customer orders to earn gold and progress in the game.

=== Relevance and Motivation
The game presents a complex optimization problem involving:
- Multi-stage production chains with time constraints
- Limited storage capacity (silo for crops, barn for products)
- Production building queues and capacity limits
- Resource allocation decisions
- Order prioritization strategies

This problem is relevant to real-world applications in:
- Supply chain management
- Production scheduling
- Resource optimization
- Manufacturing planning

=== Project Goals
1. Create a web application
2. Production scheduling across multiple buildings
3. Resource allocation and inventory management
4. Minimize bottlenecks


== Methodology

=== System Architecture
Before deciding on an architecture and the technology stack to use for this project, we needed to carefully consider how the application would be distributed and how it would be used. We also needed to ensure our technology stack enabled simple development and deployment. As the application requires a lot of input from the user before any solution solving could take place, we decided to implement the project as a website. To avoid the need to run any webservers, we aimed to build the project with all of its components as a static web application and deploy to GitHub Pages.

In initial stages of planning, it became clear that the application will require a large amount of game data for user input, display, and solution logic. We decided to use extensive TypeScript type declarations for all of our data. This enabled us to catch errors at build time and provide a better developer experience while consuming large amounts of game data while building the application. This paired well with our React, which was built with Vite.

Our initial idea for approaching the order fulfillment problem was to use the farm's "state" and select the next best "state" to go to. Unfortunately, approaching the problem as traversing a state graph appeared to be an overwhelming technical challenge. Keeping track of a large amount of complex states would be too costly, so we decided to approach the problem by looking at the recipes for all of the game's products to create a solution step-by-step.

In summary, our tech stack consists of:
- Frontend: React + TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS
- State Management: React hooks (useState, useEffect)
- Type Safety: TypeScript with custom type definitions
- Deployment: GitHub Pages and GitHub Actions

=== AI Technique and Algorithm
In Hay Day, the production of crops and products takes a certain amount of time to complete. This can range from a couple of minutes to several hours. The solving algorithm takes into account production times by creating a solution as a series of production steps. Each production step consists of a list of enqueued items, a list of newly produced items, completed order IDs, and an amount to delay.

#align(center)[#block(
  fill: rgb(220,220,230),
  inset: 1em,
  radius: 1em,
  width: 80%,
  [
    ```ts
    export type SolutionStep = {
        newQueueItems: ItemStack[]
        newProducedItems: ItemStack[]
        ordersComplete: number[]
        nextActionDelayMinutes: number | null
    }
    ```
  Where `ItemStack` represents an item with a quantity.
])]


First, the algorithm recursively builds a recipe forest out of available orders. Each tree in the forest represents an ordered product as the root node and all of its prerequisites as its children. Afterward, the solver starts its `SolutionStep` building loop while there are still incomplete orders.

Each `SolutionStep` iteration is comprised of four steps: collecting finished products, submitting completable orders, determining which products to produce next, and determining how long to wait until the next solution step. We will cover the last two steps here, as the first two are simple and straightforward.

To determine which products to produce at the current game state, the recipe trees need to be fulfilled from the bottom-up (that is, from the leaves to the root). Depth-first search is used here to find and act upon leaf nodes. From there, the algorithm greedily picks what leaf nodes to start production for. If production has been fully satisfied, the leaf node is deleted and the algorithm continues with its DFS stack.

One upside to this DFS + Greedy approach is that while recursing up the recipe tree, multiple prerequisites at different depths can be enqueued if there is sufficient stock. For example, a game state with 10 wheat can plant 3 wheat AND produce one piece of bread (which costs 3 wheat) in one step. The downside of this algorithm is that it does not explore more leaf node fulfillment orders, which may be more optimal for future solution steps.


== Results & Demonstration
#show link: underline
#text(blue)[#link("https://theicystar.github.io/CMPSC441-AI-HayDay-Solver/")[Hay Day Solver Demo Link]]

=== Farm
#image("../public/assets/project-report/Farm.png", width: 300pt)
The Farm view is used to configure the structural constraints of the player’s farm, effectively defining the “hardware” limits under which the AI solver operates. This includes setting maximum storage capacities for the silo and barn, the max count of crop fields or trees, specifying the number of available production buildings, and configuring livestock counts for animals like chickens and pigs.

The Farm view establishes the fixed boundaries of the problem space, ensuring that all generated production plans are feasible within the player’s actual farm setup.

=== Inventory
#image("../public/assets/project-report/Inventory.png", width: 300pt)

The Inventory module serves as the central data source for the AI solver, tracking the current state of farm resources. The system categorizes items into two distinct storage types:

- Silo: Stores crops, fruits, and berries
- Barn: Stores animal products and processed products

The interface utilizes a tabbed navigation system, allowing users to switch views and modify item quantities. To enhance usability, a visual state indicator is implemented: items with a quantity of zero are displayed in grayscale. This allows users to instantly identify missing resources without needing to parse numerical values.

=== Orders
#image("../public/assets/project-report/Orders.png", width: 300pt)
The Orders view defines the target objectives for the AI solver by allowing users to input truck orders that need to be fulfilled. The interface mirrors the real Hay Day game by providing nine order slots, creating a familiar and intuitive setup for players. Orders can be entered manually to mirror real in-game scenarios or generated randomly to test the planning algorithm. Users can modify an order by searching for items and specifying custom amounts. If needed, the users can also delete old or unwanted orders. Each order has color-coded indicators to show whether the current inventory is sufficient to satisfy the order. For now, we do not have accurate rewards based on game data so each item adds 32 gold to the total gold payout of the order.

#pagebreak()
== Conclusion
=== Challenges
Several significant challenges were addressed during development:
1. Data modeling
2. Acquiring game assets
3. Managing large game data
4. Efficiency of solving algorithms
5. Time constraints and split focuses

=== Future Improvements
1. Algorithm Enhancements
  - Implement additional solving algorithms (A\* Search, constraint satisfaction, genetic algorithms) for comparison
  - Develop more sophisticated greedy heuristics that consider time-to-completion and gold-per-minute metrics
  - Add backtracking capabilities for globally optimal solutions
2. Game Feature Expansion
  - Increase the level cap, meaning more recipes, resources, and orders to add and calculate
  - Add support for fishing and mining, which involve different mechanics and resources
  - Add time-limited orders, like boat orders, which have different constraints and rewards
3. User Experience
  - Visual timeline representation of production schedules
  - Interactive step-by step execution of production plans
  - Performance metrics and statistics tracking
  - Export/ Import functionality for sharing game states and solutions
4. Analysis Tools
  - Performance benchmarking on various order scenarios
  - Comparative analysis between different solver algorithms
  - Bottleneck identification and visualization
  - Profitability analysis and order prioritization recommendations

=== Key Insights

From working on this solver for a mobile game, all group members were able to experience a new aspect of creating practically-applicable applications. Whether that experience was developing a good-looking frontend application using React, modeling data handling after an existing process, deploying an app using GitHub's CI/CD process, collaborating on a project with other developers, or, more relevantly to this course, creating an AI solution algorithm to solve a practical problem, this project proved invaluable to all group members.


=== Contributions
This application contributes to the Hay Day game's user experience by providing a tool users can use to optimize their production and time usage for the orders they have. Perhaps the user does not understand the production tree of some items, or want to figure out how to be more efficient on their farm. The Hay Day Solver app can be used to help exactly this.

For the exact same purposes, this app contributes to the world at large by being a _solver_ for production tree optimization problems. It can be generalized in the future to function with real-world resources, production paths, and production orders. Other, more realistic constraints like monetary cost of steps could be added in the future. Overall, this solver is a great proof of concept and introductory application to many real-world solutions.

Some techniques developed in this project have direct applications to manufacturing production scheduling, supply chain optimization,
resource allocation in constrained environments, project management with interdependent tasks and inventory management systems.

=== Source Code
See the project's GitHub page for source code:
#text(blue)[#link("https://github.com/TheIcyStar/CMPSC441-AI-HayDay-Solver")[Hay Day Solver GitHub]]


