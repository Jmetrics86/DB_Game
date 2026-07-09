# David's Magic RPG: Agentic Web-First 3D Game

Welcome to the project repository for David's Black Clover-inspired Open-World Action RPG game. This project is built using a **Code-First, Web-Based 3D Stack (TypeScript + Three.js + Rapier Physics)** optimized for maximum agentic development and automated testing.

---

## Technical Stack & Architecture

To allow AI agents to write 100% of the codebase and test it automatically without relying on complex visual GUI editors (like Unity or Unreal), the game uses:
- **Client (Frontend)**: [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Three.js](https://threejs.org/) for 3D rendering.
- **Physics**: [Rapier.js](https://rapier.rs/) for high-performance 3D collision and movement.
- **Server (Multiplayer Backend)**: [Node.js](https://nodejs.org/) + [Colyseus.js](https://colyseus.io/) for multiplayer state synchronization.
- **Testing**: [Playwright](https://playwright.dev/) for headless browser integration testing of game loops and mechanics.

---

## Game Design Document (GDD)

### 1. Genre & Inspirations
- **Genre**: Open-World Action RPG (Web-based 3D)
- **Combat Feel**: *Genshin Impact* style real-time combat
- **Character Creation**: *Dragon Ball Xenoverse* style deep customization
- **Exploration**: *Elden Ring* style open-world exploration
- **Magic Battles**: *Naruto Storm* style arena magic battles

### 2. Character Creation & Customization
Players customize their character's visual appearance and starting parameters:
- **Appearance Options**: Hair, Face, Skin, Outfit (controlled via CSS overlay + custom 3D shader parameters)
- **Magic Attribute**: Selected during character creation.
- **Kingdom**: Selected during character creation.
- **Grimoire Ceremony**: After character creation, the player receives a Grimoires during an in-game ceremony:
  - **3-Leaf Grimoire**: Normal stats.
  - **4-Leaf Grimoire**: Double magic power, unlocks rare spells.
  - **5-Leaf Grimoire**: Double HP, unlocks Devil abilities and a secret storyline.

### 3. Magic Attributes & Spells
Every magic type has a set of actions: **Basic Attack**, **Heavy Attack**, **Dash Skill**, **Ultimate**, and **Combo Spell**.

#### Fire Magic
- **Basic**: Fireball
- **Skill**: Flame Pillar
- **Ultimate**: Crimson Inferno

#### Ice Magic
- **Basic**: Ice Spears
- **Skill**: Ice Wall
- **Ultimate**: Frozen Kingdom

#### Portal Magic
- **Basic**: Portal Shot
- **Skill**: Teleport
- **Ultimate**: Infinite Portal Barrage

#### Beast Magic
- **Basic**: Claw Slash
- **Skill**: Beast Rush
- **Ultimate**: Giant Beast Form

#### Devil Nullify Magic
- **Basic**: Anti-Magic Slash
- **Skill**: Nullify Spell
- **Ultimate**: Devil Union

### 4. Combat Mechanics
- Real-time action combat.
- Light attacks and Heavy attacks.
- Magic spells and Ultimates.
- **Perfect Dodge**: Precision evasion reward.
- **Air Combat**: Flying and mid-air battles.
- **Combo System**: Magic combos and team-based combo spells.

### 5. Story Progression
1. **Commoner Beginnings**: Player starts as a commoner.
2. **Grimoire Ceremony**: Receive their Grimoire.
3. **Magic Knight Squads**: Join one of the Magic Knight Squads.
4. **Missions**: Fight bandits, explore dungeons, and fight Devils.
5. **End Goal**: Eventually rise to become the Wizard King.

### 6. Multiplayer Features
- **4-Player Co-op**: Play missions together with friends.
- **Guilds**: Team up and coordinate.
- **PvP Arena**: Ranked battles and player-vs-player matchmaking.
- **Raid Bosses & World Events**: Fight massive threats as a community.

### 7. Bosses & Enemies
- **Bandits**: Regular enemies found in the world.
- **Bosses**:
  - Giant Ogre
  - Diamond Kingdom Captain
  - Devil Generals
  - Ancient Dragon
  - Demon King (Final Boss)

### 8. Progression & Unlocks
- **Level Up Activities**: Complete missions, defeat bosses, play PvP, clear dungeons.
- **Unlocks**: New spells, new outfits, better Grimoires, and powerful transformations.

### 9. Graphics & Visuals
- Anime-style 3D art direction (cel-shaded rendering).
- Large, flashing magical explosions.
- Flying combat capabilities.
- Dynamic weather systems.
- Day/Night cycle.
- **Destructible Environments**: Buildings and environments react to large spells.

---

## Detailed Project Plan
For details on the proposed tools, timeline phases, and cost breakdowns, please refer to the [Implementation Plan](file:///C:/Users/jason.brewster/.gemini/antigravity/brain/57551937-d7e2-460e-86c8-e76554d8e961/implementation_plan.md).
