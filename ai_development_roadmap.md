# AI-Agentic Game Development Roadmap & Guide

Welcome, David! This guide outlines how you and your AI coding agents will build your game step-by-step. 

Since you have no formal game development training, we are using an **Agentic-First Web-Based 3D Stack** (TypeScript + Three.js + Rapier Physics). This is the best approach because it relies on writing code rather than clicking buttons in complex visual software (like Unity or Unreal). AI agents are incredibly powerful at writing code, compiling it, and fixing their own mistakes!

---

## 1. What is Doable vs. Not Doable for AI Agents

To set you up for success, here is a realistic breakdown of what AI agents can handle completely, and where you will need to guide them or use external assets.

### 🟢 What is Highly Doable for AI
* **Game Logic & Mechanics**: Writing character controls, gravity, dash mechanics, spells, and health systems.
* **Network Synchronization**: Setting up the multiplayer code, lobby matchmaking, and state syncing (using Colyseus.js).
* **UI & HUD Design**: Building visual interfaces, menus, and overlays (using HTML and CSS over the 3D canvas).
* **Visual Effects (Shaders)**: Generating mathematical anime-style visual effects (like Fireballs, Ice Walls, and energy shields) using WebGL shader code.
* **Testing & Self-Correction**: Running browser simulation tests to check if player movement works and self-correcting code if there's an error.

### 🔴 What is Hard for AI (Requires Sourcing or Guidance)
* **High-Fidelity 3D Assets**: While AI can generate basic 3D models (using tools like Meshy or Tripo3D), they often look messy or need manual cleanup. Sourcing pre-made models from free sites is often faster and looks better.
* **Animation Rigging**: Making a character walk, run, or jump realistically. We will use free tools like **Adobe Mixamo** to auto-rig and animate models.
* **Level Design**: Deciding exactly where trees, hills, and castles should go to make the game "fun" and visually pleasing. You will guide the AI on where to place objects.
* **"The Fun Factor"**: AI can build the mechanics, but you have to play-test it and tell the AI, "The dash feels too slow," or "The fireball reload time is too fast."

---

## 2. What We Need (Assets, Packages & Models)

To build this game, the AI agent will use a combination of software packages and asset generators:

### 📦 Code Packages (Libraries)
All of these are already set up in your repository:
* **Three.js**: The rendering library. It handles cameras, lighting, rendering 3D shapes, and applying textures.
* **Rapier.js**: The physics engine. It runs in the background to calculate gravity, collisions, and character movement bounds.
* **Colyseus.js**: The multiplayer networking engine. It manages rooms, coordinates client connections, and syncs player data.
* **Vite & TypeScript**: Tooling that compiles the code and reports bugs before running the game.

### 🤖 Sourcing 3D Models & Animations
You will not need to paint or model from scratch. We recommend:
1. **Characters & Animations**: 
   - Download free 3D characters from [Mixamo](https://www.mixamo.com/).
   - Mixamo automatically applies animations (run, idle, attack, jump) to characters. The AI can load these directly into Three.js.
2. **Environment & Prop Models**:
   - Use [Sketchfab](https://sketchfab.com/) or [itch.io](https://itch.io/) to find free anime-style assets (swords, pillars, houses).
   - Use AI 3D Generators like [Meshy.ai](https://www.meshy.ai/) or [Tripo3D](https://www.tripo3d.ai/) for specific custom items (like a specific grimoire book cover).

---

## 3. Step-by-Step Development Plan

Here is the step-by-step roadmap that you can ask your AI coding agent to execute:

### Step 1: The Virtual Arena (Current Phase)
* **Goal**: Get a 3D window running with a player capsule, basic ground, camera following, and lighting.
* **Status**: Completed! The base scene is running in `client/src/main.ts`.

### Step 2: Keyboard Inputs & Physics Integration
* **Goal**: Enable WASD keys to move the player around, Space to jump, and Shift to dash.
* **How it works**: The AI will load Rapier.js physics, wrap the player capsule in a physical body, and write code to translate keyboard inputs into physical movement vectors.

### Step 3: Magic Spells & Projectiles
* **Goal**: Press Left-Click to shoot a Fireball, or Right-Click to conjure an Ice Spear.
* **How it works**: The AI will write custom particle shaders (glow effects) and spawn them with a forward physics velocity. If the projectile collides with a pillar or enemy, it trigger an explosion and mesh-breaking effect.

### Step 4: UI, Character Customization & Grimoire Ceremony
* **Goal**: Create the interactive menu where players customize colors and roll for a 3-leaf, 4-leaf, or 5-leaf Grimoire.
* **How it works**: The AI will build a standard HTML overlay with custom CSS buttons. When a user rolls, a random generator runs, giving a 4-leaf or 5-leaf grimoire with statistical boosts (like double health or magic power).

### Step 5: Multiplayer Sync (Lobby & Movement)
* **Goal**: Connect two separate browser windows so players can see each other move in real time.
* **How it works**: The AI will connect the Three.js client to the Colyseus.js server. When Player A moves, the coordinates are sent to the server, which rebroadcasts them to Player B.

### Step 6: Simple Quests & Basic Enemies (Bandits)
* **Goal**: Spawn simple enemy capsule shapes that chase the player. Implement a health bar and a mission success screen when all enemies are defeated.
* **How it works**: The AI will write basic chase AI rules (look-at player, move-towards player) and manage a simple state machine (Alive, Chasing, Attacking, Dead).

---

## 4. How to Prompt the AI Agent (For David)

When you want to build the next feature, use these prompting tips to get the best code from your AI:

1. **Be Specific about Inputs & Outputs**:
   - *Good*: "AI, add a dash skill. When the player presses `Shift`, apply a high velocity in the direction they are facing for 0.2 seconds. Give the dash a 3-second cooldown and display a countdown timer in the UI."
   - *Too vague*: "AI, make the player move faster."
2. **One Feature at a Time**:
   - Don't ask the AI to build the entire magic list at once. Ask for "Fireball" first. Test it. Then ask for "Flame Pillar".
3. **Ask the AI to Explain**:
   - If you don't understand how a piece of code works, ask: "Can you explain how the collision detection in `player.ts` works in simple terms?"
