#set text(
  size: 12pt,
  font: "Times New Roman"

)

#set par(first-line-indent: 5em)  

#align(center)[
  #text(size: 16pt, strong("AI Hay Day Solver"))
]

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
#align(center + horizon)[
*Group Members*

student-name-1 : Adam Che Nazahatuhisamudin

student-name-2 : Alex Chmielowski

student-name-3 : Joseph Cooper

student-name-4 : Alexander Petrov

student-name-5 : Cheney Tai
]

#pagebreak()

== 1. Project Background and Context
Hay Day is a popular mobile farming game by Supercell that involves resource management, production planning, and order fulfillment. Players must manage their farm's inventory, produce goods through complex recipe chains, and complete customer orders to earn gold and progress in the game.

=== Relevance and Motivation
The game presents a complex optimization problem involving:
- Multi-stage production chains with time constraints
- Limited storage capacity (silo for crops, barn for products)
- Production building queues and capacity limits
- Resource allocation decisions
- Order prioritization strategies

This problem is relevant to real-world applications in :
- Supply chain management
- Production scheduling
- Resource optimization
- Manufacturing planning

=== Project Goals
1. Create a web application
2. Production scheduling accross multiple buildings
3. Resource allocation and inventory management
4. Minimize bottlenecks 

== 2. Methodology

=== AI Technique and Algorithm

=== System Architecture
  === DFS + Greedy 
- Build a reci

=== Technical Implementation
*Technology Stack:*
- Frontend: React + TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS
- State Management: React hooks (useState, useEffect)
- Type Safety: TypeScript with custom type definitions


#pagebreak()
== 4. Results & Demonstration
#show link: underline
#link("https://github.com/TheIcyStar/CMPSC441-AI-HayDay-Solver")["Hay Day Demo Link"]

#pagebreak()
== Conclusion 
=== Challenges
1. Efficiency of solving algorithms
2. Managing large game data
3. Data Modeling

=== Future Improvements
#[

  #set par(first-line-indent: 3em)  
Several enhancements are planned to expand the scope and depth of this project. The level cap will be increased to allow for more progression and gameplay variety. Additional game systems such as fishing and mining will be incorporated to create a richer simulation environment. The order mechanics will also be expanded to include more complex scenarios like time-limited boat orders. Beyond content additions, the project will explore different solving algorithms and conduct a comparison analysis between them to evaluate their relative performance and efficiency.]
== References 

1. 
2. 


