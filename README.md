# Star Defender

Star Defender is a fast-paced 2D browser space shooter built with plain HTML, CSS, and JavaScript. The game drops the player into a neon-styled deep-space battlefield where survival depends on sharp movement, quick reactions, and accurate shooting. You pilot a compact starfighter, destroy incoming enemy ships, survive escalating waves, and push for a higher score each run.

This project was designed as a lightweight arcade game that runs directly in the browser without any frameworks, build tools, or external dependencies beyond a web font. Everything is contained in three simple front-end files, making it easy to understand, customize, and expand.

## Game Overview

In Star Defender, the player controls a single spaceship at the bottom of the screen while enemies descend from above in unpredictable positions and movement patterns. The goal is to protect the sector by destroying enemies before they collide with the player or slip past the defense line.

The challenge increases over time through a wave system. Every time the player reaches the score threshold for the next phase, the game raises the wave number, increases enemy speed, and reduces the interval between enemy spawns. This creates a steady difficulty curve that keeps each session engaging.

The game is intentionally arcade-like:

- Simple to start
- Easy to learn
- Harder to master over time
- Ideal for quick browser play sessions

## Core Features

- Canvas-based space shooter gameplay
- Smooth left and right player movement
- Keyboard shooting controls
- Score tracking system
- Three-life survival mechanic
- Increasing wave difficulty
- Animated starfield background
- HUD showing score, lives, and current wave
- Overlay screens for start, continue, and restart states
- Responsive layout that works on desktop and smaller screens

## Controls

- `Left Arrow`: Move ship left
- `Right Arrow`: Move ship right
- `A`: Move ship left
- `D`: Move ship right
- `Space`: Fire weapon
- `Enter`: Start game, continue to the next wave, or restart after game over

## How The Game Works

### Player

The player controls a triangular spaceship positioned near the bottom of the canvas. Movement is restricted to the horizontal axis, which keeps the gameplay focused and arcade-friendly. The ship can fire projectiles upward to destroy enemies before they reach the bottom of the screen.

### Enemies

Enemies spawn from the top of the play area and drift downward with a slight wobble effect. This movement makes their path less predictable and gives the action a more dynamic feel than simple straight-line falling targets.

### Scoring

Each enemy destroyed awards points. As the score increases, the game becomes harder. The score is displayed live in the top HUD.

### Lives

The player begins with 3 lives. A life is lost when:

- An enemy touches the player ship
- An enemy escapes past the bottom of the screen

When all lives are lost, the game ends and the player is shown a restart prompt.

### Waves

The game uses a wave progression system to increase intensity:

- Higher wave number
- Faster enemies
- Shorter spawn intervals

This progression gives the game a natural rhythm, with short breaks between difficulty spikes.

## Visual Style

Star Defender uses a sci-fi arcade presentation with:

- A dark cosmic gradient background
- Layered starfield effects
- Cyan, gold, and red neon-style accents
- Glassmorphism-inspired HUD cards
- A glowing overlay interface for start and restart states

The visual style aims to feel energetic and modern while still keeping the codebase simple and beginner-friendly.

## Project Structure

```text
space/
|-- index.html
|-- style.css
|-- script.js
|-- README.md
```

### File Breakdown

#### `index.html`

Contains the game layout, including:

- Main game title
- Heads-up display for stats
- Canvas element used for gameplay rendering
- Overlay card for instructions and restart flow

#### `style.css`

Defines the presentation layer, including:

- Full-page background styling
- HUD layout and stat cards
- Responsive behavior
- Canvas container design
- Overlay and button styling
- Decorative animation effects

#### `script.js`

Contains the entire gameplay system, including:

- Game state management
- Player movement
- Bullet shooting
- Enemy spawning and updating
- Collision detection
- Score and life updates
- Wave progression
- Particle burst effects
- Main animation loop

## How To Run

1. Open the project folder.
2. Double-click `index.html`, or open it in any modern web browser.
3. Click `Start Mission` or press `Enter` to begin.

No installation is required.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- HTML5 Canvas API

## Why This Project Is Useful

This project is a good fit for:

- Beginners learning browser game development
- Students practicing JavaScript logic and animation
- Developers who want a small game prototype without frameworks
- Anyone looking for a customizable arcade template

Because the code is small and direct, it is also a great base for experimenting with new mechanics.

## Ideas For Future Improvements

- Sound effects and background music
- Power-ups such as rapid fire or shields
- Multiple enemy types
- Boss battles
- Mobile touch controls
- High score saving with local storage
- Pause menu
- Weapon upgrades
- Animated explosions and screen shake

## Short Description

Star Defender is a browser-based arcade space shooter where players pilot a starfighter, blast incoming enemies, survive escalating waves, and chase the highest score possible.

## Extended Description

Star Defender is a visually polished 2D space shooter built entirely with vanilla HTML, CSS, and JavaScript. The player controls a sleek combat ship and must defend the play area from incoming enemy craft that descend in continuous waves. As enemies are destroyed, the score rises and the game grows more intense through faster movement and more frequent spawns.

The project blends simple controls with satisfying arcade pressure, making it easy for anyone to jump in while still offering a challenge as the pace increases. Its clean structure also makes it a strong starting point for further game development, whether the next step is adding audio, advanced enemy patterns, boss fights, or persistent scoring.

## License

This project is free to use and modify for personal or educational purposes.
