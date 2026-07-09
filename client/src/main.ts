import * as THREE from 'three';

// ==========================================
// Web Audio API Sound Synthesizer
// ==========================================
class SoundSynth {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  playSwing() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playHit() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(40, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playHurt() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playDeath() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  playSpawnWarning() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [220, 293, 349];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      gain.gain.setValueAtTime(0.1, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.12 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.2);
    });
  }

  playGameOver() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [300, 250, 200, 150];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.2);
      gain.gain.setValueAtTime(0.2, now + idx * 0.2);
      gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.2 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.2);
      osc.stop(now + idx * 0.2 + 0.3);
    });
  }
}

const sounds = new SoundSynth();

// ==========================================
// Particle Systems & Damage Text
// ==========================================
interface FloatingText {
  element: HTMLDivElement;
  x: number;
  y: number;
  z: number;
  life: number;
  maxLife: number;
}

interface Particle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

// ==========================================
// Character Visuals (Cubist Styles)
// ==========================================
class CubistCharacter {
  meshGroup: THREE.Group;
  head: THREE.Mesh;
  body: THREE.Mesh;
  leftArm: THREE.Mesh;
  rightArm: THREE.Mesh;
  leftLeg: THREE.Mesh;
  rightLeg: THREE.Mesh;
  sword: THREE.Mesh | null = null;

  constructor(isPlayer: boolean) {
    this.meshGroup = new THREE.Group();

    // Standard Minecraft box proportions
    const materials = {
      skin: new THREE.MeshStandardMaterial({ color: isPlayer ? 0xffdbac : 0x76b041, roughness: 0.9 }),
      shirt: new THREE.MeshStandardMaterial({ color: isPlayer ? 0x2e8bc0 : 0x4a5d4e, roughness: 0.9 }),
      pants: new THREE.MeshStandardMaterial({ color: isPlayer ? 0x1f2833 : 0x3d3027, roughness: 0.9 }),
      hair: new THREE.MeshStandardMaterial({ color: isPlayer ? 0xd4a373 : 0x111111, roughness: 0.9 }),
      eyes: new THREE.MeshStandardMaterial({ color: isPlayer ? 0x000000 : 0xff0000, roughness: 0.1, emissive: isPlayer ? 0x000000 : 0x550000 }),
    };

    // Scale down goblins slightly
    const scale = isPlayer ? 1.0 : 0.7;

    // Body (8x12x4 units)
    const bodyGeo = new THREE.BoxGeometry(0.8 * scale, 1.2 * scale, 0.4 * scale);
    this.body = new THREE.Mesh(bodyGeo, materials.shirt);
    this.body.position.y = 1.0 * scale;
    this.body.castShadow = true;
    this.body.receiveShadow = true;
    this.meshGroup.add(this.body);

    // Head (8x8x8 units)
    const headGeo = new THREE.BoxGeometry(0.8 * scale, 0.8 * scale, 0.8 * scale);
    this.head = new THREE.Mesh(headGeo, materials.skin);
    this.head.position.y = 2.0 * scale;
    this.head.castShadow = true;
    this.head.receiveShadow = true;
    this.meshGroup.add(this.head);

    // Eyes
    const eyeGeo = new THREE.BoxGeometry(0.15 * scale, 0.08 * scale, 0.08 * scale);
    const leftEye = new THREE.Mesh(eyeGeo, materials.eyes);
    leftEye.position.set(-0.2 * scale, 2.0 * scale, 0.4 * scale);
    const rightEye = leftEye.clone();
    rightEye.position.x = 0.2 * scale;
    this.meshGroup.add(leftEye);
    this.meshGroup.add(rightEye);

    // Hair/Helmet
    if (isPlayer) {
      const hairGeo = new THREE.BoxGeometry(0.85, 0.2, 0.85);
      const hair = new THREE.Mesh(hairGeo, materials.hair);
      hair.position.set(0, 2.4, 0);
      this.meshGroup.add(hair);
    } else {
      // Goblin Ears
      const earGeo = new THREE.BoxGeometry(0.3 * scale, 0.1 * scale, 0.1 * scale);
      const leftEar = new THREE.Mesh(earGeo, materials.skin);
      leftEar.position.set(-0.5 * scale, 2.0 * scale, 0);
      leftEar.rotation.z = -0.2;
      const rightEar = leftEar.clone();
      rightEar.position.x = 0.5 * scale;
      rightEar.rotation.z = 0.2;
      this.meshGroup.add(leftEar);
      this.meshGroup.add(rightEar);
    }

    // Legs (4x12x4 units)
    const legGeo = new THREE.BoxGeometry(0.35 * scale, 1.0 * scale, 0.35 * scale);
    this.leftLeg = new THREE.Mesh(legGeo, materials.pants);
    this.leftLeg.position.set(-0.22 * scale, 0.5 * scale, 0);
    this.leftLeg.castShadow = true;
    this.meshGroup.add(this.leftLeg);

    this.rightLeg = this.leftLeg.clone();
    this.rightLeg.position.x = 0.22 * scale;
    this.meshGroup.add(this.rightLeg);

    // Arms (4x12x4 units)
    const armGeo = new THREE.BoxGeometry(0.35 * scale, 1.0 * scale, 0.35 * scale);
    this.leftArm = new THREE.Mesh(armGeo, materials.shirt);
    this.leftArm.position.set(-0.6 * scale, 1.1 * scale, 0);
    this.leftArm.castShadow = true;
    this.meshGroup.add(this.leftArm);

    this.rightArm = this.leftArm.clone();
    this.rightArm.position.x = 0.6 * scale;
    this.meshGroup.add(this.rightArm);

    // Sword (Only for Player)
    if (isPlayer) {
      const swordGroup = new THREE.Group();
      
      // Blade
      const bladeGeo = new THREE.BoxGeometry(0.12, 1.2, 0.05);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x40e0d0, metalness: 0.8, roughness: 0.2 });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.position.y = 0.6;
      blade.castShadow = true;
      swordGroup.add(blade);

      // Hilt
      const hiltGeo = new THREE.BoxGeometry(0.4, 0.08, 0.08);
      const hiltMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.5 });
      const hilt = new THREE.Mesh(hiltGeo, hiltMat);
      hilt.position.y = 0.05;
      swordGroup.add(hilt);

      // Handle
      const handleGeo = new THREE.BoxGeometry(0.08, 0.3, 0.08);
      const handleMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.8 });
      const handle = new THREE.Mesh(handleGeo, handleMat);
      handle.position.y = -0.15;
      swordGroup.add(handle);

      this.sword = swordGroup as any;
      // Position sword in right arm
      this.sword!.position.set(0, -0.4, 0.2);
      this.sword!.rotation.x = Math.PI / 3;
      this.rightArm.add(this.sword!);
    }
  }

  animateWalk(speed: number, time: number) {
    const factor = Math.min(speed * 4, 1);
    const angle = Math.sin(time * 12) * 0.6 * factor;

    this.leftLeg.rotation.x = angle;
    this.rightLeg.rotation.x = -angle;

    // Swing arms opposite to legs
    this.leftArm.rotation.x = -angle * 0.8;
    this.rightArm.rotation.x = angle * 0.8;
  }
}

// ==========================================
// Goblin Class
// ==========================================
class Goblin {
  character: CubistCharacter;
  health: number = 100;
  maxHealth: number = 100;
  isDead: boolean = false;
  position: THREE.Vector3 = new THREE.Vector3();
  flashTimer: number = 0;
  attackCooldown: number = 0;
  knockback: THREE.Vector3 = new THREE.Vector3();

  constructor(spawnPos: THREE.Vector3) {
    this.character = new CubistCharacter(false);
    this.position.copy(spawnPos);
    this.character.meshGroup.position.copy(spawnPos);
  }

  takeDamage(amount: number, dir: THREE.Vector3) {
    if (this.isDead) return;
    this.health = Math.max(0, this.health - amount);
    this.flashTimer = 0.15; // Flash red for 150ms
    this.knockback.copy(dir).multiplyScalar(8); // Apply backward impulse

    // Flash visual material update
    this.setMaterialColor(0xff3333);
    sounds.playHit();

    if (this.health <= 0) {
      this.die();
    }
  }

  private setMaterialColor(colorHex: number) {
    this.character.meshGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m: any) => m.emissive?.setHex(colorHex));
        } else {
          (child.material as any).emissive?.setHex(colorHex);
        }
      }
    });
  }

  private resetMaterialColor() {
    this.character.meshGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as any;
        if (mat.emissive) {
          mat.emissive.setHex(child.name === 'eyes' ? 0x550000 : 0x000000);
        }
      }
    });
  }

  update(dt: number, playerPos: THREE.Vector3) {
    if (this.isDead) {
      // Death rotation/fade animation
      this.character.meshGroup.rotation.z += 5 * dt;
      this.character.meshGroup.position.y -= 2 * dt;
      return;
    }

    // Flash timer
    if (this.flashTimer > 0) {
      this.flashTimer -= dt;
      if (this.flashTimer <= 0) {
        this.resetMaterialColor();
      }
    }

    // Cooldown
    if (this.attackCooldown > 0) {
      this.attackCooldown -= dt;
    }

    // Knockback dampening
    this.position.addScaledVector(this.knockback, dt);
    this.knockback.multiplyScalar(Math.exp(-10 * dt));

    // Pathfinding towards player
    const toPlayer = new THREE.Vector3().subVectors(playerPos, this.position);
    toPlayer.y = 0; // Keep on flat ground
    const distance = toPlayer.length();

    if (distance > 0.8) {
      toPlayer.normalize();
      // Face the player
      const targetAngle = Math.atan2(toPlayer.x, toPlayer.z);
      this.character.meshGroup.rotation.y = targetAngle;

      // Move forward
      const moveSpeed = 2.0;
      this.position.addScaledVector(toPlayer, moveSpeed * dt);
      this.character.animateWalk(moveSpeed, Date.now() * 0.001);
    } else {
      // Close range: Attack!
      this.character.animateWalk(0, 0);
      if (this.attackCooldown <= 0) {
        this.attackPlayer();
      }
    }

    // Sync mesh position
    this.character.meshGroup.position.copy(this.position);
  }

  attackPlayer() {
    this.attackCooldown = 1.5; // Cooldown 1.5s
    // Swing arms forward briefly (visual logic trigger)
    this.character.leftArm.rotation.x = -Math.PI / 2;
    this.character.rightArm.rotation.x = -Math.PI / 2;

    setTimeout(() => {
      if (!this.isDead) {
        this.character.leftArm.rotation.x = 0;
        this.character.rightArm.rotation.x = 0;
      }
    }, 200);

    // Damage registration is handled by Game main update loop
    const event = new CustomEvent('goblinAttack', { detail: { goblin: this } });
    window.dispatchEvent(event);
  }

  die() {
    this.isDead = true;
    this.setMaterialColor(0xaa0000);
    sounds.playDeath();
  }
}

// ==========================================
// Demo Game Class
// ==========================================
class DemoGame {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  // Entities
  private player!: CubistCharacter;
  private playerPos = new THREE.Vector3(0, 0, 0);
  private playerHealth = 100;
  private playerMaxHealth = 100;
  private score = 0;
  private highscore = 0;

  private goblins: Goblin[] = [];

  // Physics/Controls
  private keys: Record<string, boolean> = {};
  private verticalVelocity = 0;
  private isJumping = false;
  private gravity = -20;
  private jumpForce = 8;
  private boundaries = 23; // Size of arena
  private cameraAngle = 0;

  // Combat State
  private isAttacking = false;
  private attackDuration = 0.2; // 200ms swing duration
  private attackTimer = 0;
  private baseAttackRange = 2.0;

  // Wave Management
  private goblinsToSpawnNext = 1;
  private spawnCountdown = 0;
  private activeWave = 1;

  // Particles & Floating numbers
  private floatingTexts: FloatingText[] = [];
  private particles: Particle[] = [];

  // Clock
  private clock = new THREE.Clock();

  constructor() {
    this.initScene();
    this.initLights();
    this.initEnvironment();
    this.initPlayer();
    this.initInput();
    this.initUI();
    this.spawnWave();

    // Start loops
    this.animate();
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c0f12);
    // Fog to make it look moody and hide edges
    this.scene.fog = new THREE.FogExp2(0x0c0f12, 0.03);

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const container = document.getElementById('game-container')!;
    container.innerHTML = ''; // Clean old canvases

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private initLights() {
    const ambientLight = new THREE.AmbientLight(0xdff0ff, 0.3);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 0.9);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 100;
    const d = 30;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    this.scene.add(dirLight);

    // Decorative torch-like pointlights for mood
    const colors = [0xff7700, 0x00aaff];
    for (let i = 0; i < 4; i++) {
      const light = new THREE.PointLight(colors[i % 2], 2, 15);
      const angle = (i * Math.PI) / 2;
      light.position.set(Math.cos(angle) * 15, 2, Math.sin(angle) * 15);
      light.castShadow = true;
      this.scene.add(light);

      // Light posts
      const postGeo = new THREE.BoxGeometry(0.4, 3, 0.4);
      const postMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
      const post = new THREE.Mesh(postGeo, postMat);
      post.position.copy(light.position);
      post.position.y = 1.5;
      this.scene.add(post);
    }
  }

  private initEnvironment() {
    // Large grid floor (Cubist Ground - Grass)
    const floorSize = 50;
    const floorGeo = new THREE.PlaneGeometry(floorSize, floorSize);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x7cb342, // Light Green Grass
      roughness: 0.9,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Outer boundary walls (Minecraft Castle Walls)
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x3e4a56,
      roughness: 0.9,
    });

    const blockWidth = 2;
    for (let i = -floorSize / 2; i <= floorSize / 2; i += blockWidth) {
      // North Wall
      const blockN = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, Math.random() * 2 + 3, blockWidth), wallMat);
      blockN.position.set(i, blockN.geometry.parameters.height / 2, -floorSize / 2);
      blockN.castShadow = true;
      blockN.receiveShadow = true;
      this.scene.add(blockN);

      // South Wall
      const blockS = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, Math.random() * 2 + 3, blockWidth), wallMat);
      blockS.position.set(i, blockS.geometry.parameters.height / 2, floorSize / 2);
      blockS.castShadow = true;
      blockS.receiveShadow = true;
      this.scene.add(blockS);

      // West Wall
      const blockW = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, Math.random() * 2 + 3, blockWidth), wallMat);
      blockW.position.set(-floorSize / 2, blockW.geometry.parameters.height / 2, i);
      blockW.castShadow = true;
      blockW.receiveShadow = true;
      this.scene.add(blockW);

      // East Wall
      const blockE = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, Math.random() * 2 + 3, blockWidth), wallMat);
      blockE.position.set(floorSize / 2, blockE.geometry.parameters.height / 2, i);
      blockE.castShadow = true;
      blockE.receiveShadow = true;
      this.scene.add(blockE);
    }

    // Cubist Trees (brown trunk, dark green conical top)
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x143d16, roughness: 0.9 });

    for (let i = 0; i < 15; i++) {
      const treeGroup = new THREE.Group();

      // Trunk (brown bark)
      const trunkHeight = Math.random() * 1.5 + 2.0;
      const trunkGeo = new THREE.BoxGeometry(0.4, trunkHeight, 0.4);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = trunkHeight / 2;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      treeGroup.add(trunk);

      // Foliage (conical dark green top - low-poly pyramid)
      const foliageHeight = Math.random() * 1.5 + 2.0;
      const foliageGeo = new THREE.ConeGeometry(1.2, foliageHeight, 4);
      const foliage = new THREE.Mesh(foliageGeo, foliageMat);
      foliage.position.y = trunkHeight + foliageHeight / 2 - 0.2;
      foliage.castShadow = true;
      foliage.receiveShadow = true;
      treeGroup.add(foliage);

      // Place tree randomly
      treeGroup.position.set(
        Math.random() * 36 - 18,
        0,
        Math.random() * 36 - 18
      );

      // Avoid spawn zone (center)
      if (treeGroup.position.length() > 5) {
        this.scene.add(treeGroup);
      }
    }
  }

  private initPlayer() {
    this.player = new CubistCharacter(true);
    this.player.meshGroup.position.set(0, 0, 0);
    this.scene.add(this.player.meshGroup);

    // Initial Camera position
    this.camera.position.set(0, 8, 12);
  }

  private initInput() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      if (e.key === ' ' && !this.isJumping) {
        this.verticalVelocity = this.jumpForce;
        this.isJumping = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    window.addEventListener('mousedown', (e) => {
      if (e.button === 0 && !this.isAttacking && this.playerHealth > 0) {
        this.attack();
      }
    });

    // Capture Goblin attack event
    window.addEventListener('goblinAttack', (e: any) => {
      const goblin = e.detail.goblin as Goblin;
      this.handlePlayerHurt(goblin);
    });
  }

  private initUI() {
    // Setup clean vanilla CSS layout
    const uiLayer = document.getElementById('ui-layer')!;
    uiLayer.innerHTML = `
      <div class="hud-panel" id="player-hud" style="pointer-events: auto;">
        <h1>WIZARD KNIGHT (AI Demo)</h1>
        <div>Health: <span id="health-val">100</span> / 100</div>
        <div class="health-bar-container">
          <div class="health-bar" id="player-health" style="width: 100%"></div>
        </div>
        <div style="margin-top: 10px;">Goblins Slain: <span id="score-val" style="color: #f9d423; font-weight: bold;">0</span></div>
        <div>High Score: <span id="highscore-val" style="color: #f9d423; font-weight: bold;">0</span></div>
        <div>Active Goblins: <span id="goblins-active-val" style="color: #76b041;">0</span></div>
        <div>Wave: <span id="wave-val" style="color: #ff4b2b;">1</span></div>
      </div>
      <div id="spawner-countdown" style="display: none; align-self: center; background: rgba(0,0,0,0.8); border: 2px solid #ff4b2b; padding: 15px 30px; border-radius: 10px; text-align: center; box-shadow: 0 0 20px rgba(255,75,43,0.5);">
        <h2 style="margin: 0; color: #ff4b2b; font-size: 1.8rem; letter-spacing: 2px;">GOBLINS DOUBLING!</h2>
        <p style="margin: 5px 0 0 0; font-size: 1.2rem;">Next wave spawning in <span id="timer-val" style="font-weight: bold; color: #fff;">5.0</span>s</p>
      </div>
      <div id="game-over-overlay" style="display: none; position: absolute; top:0; left:0; width:100vw; height:100vh; background: rgba(12, 15, 18, 0.85); backdrop-filter: blur(15px); flex-direction: column; justify-content: center; align-items: center; pointer-events: auto; z-index: 99;">
        <h1 style="font-size: 4rem; margin: 0 0 10px 0; background: linear-gradient(45deg, #ff416c, #ff4b2b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 0 30px rgba(255,65,108,0.5);">DEFEATED</h1>
        <p style="font-size: 1.5rem; margin: 0 0 30px 0; color: #a8b2c1;">You cleared Wave <span id="final-wave-val">1</span> with <span id="final-score-val">0</span> kills</p>
        <button id="restart-btn" style="background: linear-gradient(45deg, #ff4b2b, #ff416c); border: none; color: #fff; padding: 15px 40px; font-size: 1.2rem; border-radius: 30px; cursor: pointer; font-weight: bold; box-shadow: 0 5px 20px rgba(255,75,43,0.4); transition: transform 0.2s;">RESPAWN</button>
      </div>
    `;

    document.getElementById('restart-btn')!.addEventListener('click', () => {
      this.resetGame();
    });
  }

  private spawnWave() {
    this.spawnCountdown = 0;
    document.getElementById('spawner-countdown')!.style.display = 'none';

    sounds.playSpawnWarning();

    // Spawn N Goblins
    const count = this.goblinsToSpawnNext;
    console.log(`Spawning ${count} Goblins!`);
    for (let i = 0; i < count; i++) {
      // Spawn on a radius from player
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8 + 12; // spawn between 12 and 20 units away
      const spawnPos = new THREE.Vector3(
        this.playerPos.x + Math.cos(angle) * radius,
        0,
        this.playerPos.z + Math.sin(angle) * radius
      );

      // Clamp position within arena
      spawnPos.x = Math.max(-this.boundaries + 2, Math.min(this.boundaries - 2, spawnPos.x));
      spawnPos.z = Math.max(-this.boundaries + 2, Math.min(this.boundaries - 2, spawnPos.z));

      const goblin = new Goblin(spawnPos);
      this.goblins.push(goblin);
      this.scene.add(goblin.character.meshGroup);

      // Spawn dust particle
      this.createSpawnParticles(spawnPos);
    }

    this.updateHUD();
  }

  private attack() {
    this.isAttacking = true;
    this.attackTimer = this.attackDuration;
    sounds.playSwing();

    // Swing sword animation trigger
    // Right arm swings down rapidly
    this.player.rightArm.rotation.x = -Math.PI / 6;

    // Detect hits
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.meshGroup.quaternion).normalize();
    const hitBoxCenter = new THREE.Vector3().copy(this.playerPos).addScaledVector(forward, 1.2);

    this.goblins.forEach((goblin) => {
      if (goblin.isDead) return;

      const dist = hitBoxCenter.distanceTo(goblin.position);
      if (dist < this.baseAttackRange) {
        // Calculate knockback direction
        const knockbackDir = new THREE.Vector3().subVectors(goblin.position, this.playerPos).normalize();
        knockbackDir.y = 0.1; // Slight upward launch

        // Hit registration
        const dmg = Math.floor(Math.random() * 15) + 25; // 25-40 damage
        goblin.takeDamage(dmg, knockbackDir);

        // Spawn hit blood/dust particle
        this.createHitParticles(goblin.position);

        // Float damage text
        this.createFloatingText(`-${dmg}`, goblin.position, '#ff3333');

        // Increase score if killed
        if (goblin.isDead) {
          this.score++;
          this.createFloatingText('SLAYED!', goblin.position, '#f9d423');
          this.updateHUD();

          // Spawn clean death splat
          this.createDeathParticles(goblin.position);

          // Check if all goblins are dead
          this.checkWaveCompletion();
        }
      }
    });
  }

  private checkWaveCompletion() {
    const allDead = this.goblins.every((g) => g.isDead);
    if (allDead) {
      // Clear old dead models
      setTimeout(() => {
        this.goblins.forEach((g) => this.scene.remove(g.character.meshGroup));
        this.goblins = [];
      }, 1000);

      // Trigger Wave spawning timer (5 seconds)
      this.spawnCountdown = 5.0;
      this.goblinsToSpawnNext = this.goblinsToSpawnNext * 2; // Double Goblins count
      this.activeWave++;
      document.getElementById('spawner-countdown')!.style.display = 'block';
    }
  }

  private handlePlayerHurt(goblin: Goblin) {
    if (this.playerHealth <= 0 || goblin.isDead) return;

    // Direct distance check to verify attack still hits
    const dist = this.playerPos.distanceTo(goblin.position);
    if (dist < 1.5) {
      const dmg = 10;
      this.playerHealth = Math.max(0, this.playerHealth - dmg);
      sounds.playHurt();

      // Screen impact flash
      document.body.style.backgroundColor = '#4a1111';
      setTimeout(() => {
        document.body.style.backgroundColor = '#0b0c10';
      }, 80);

      // Float damage text on Player
      this.createFloatingText(`-${dmg}`, this.playerPos, '#ff8800');

      // Update HUD
      this.updateHUD();

      if (this.playerHealth <= 0) {
        this.gameOver();
      }
    }
  }

  private updateHUD() {
    if (this.score > this.highscore) {
      this.highscore = this.score;
    }
    document.getElementById('health-val')!.innerText = String(this.playerHealth);
    document.getElementById('player-health')!.style.width = `${(this.playerHealth / this.playerMaxHealth) * 100}%`;
    document.getElementById('score-val')!.innerText = String(this.score);
    document.getElementById('highscore-val')!.innerText = String(this.highscore);
    document.getElementById('wave-val')!.innerText = String(this.activeWave);

    const activeCount = this.goblins.filter((g) => !g.isDead).length;
    document.getElementById('goblins-active-val')!.innerText = String(activeCount);
  }

  private gameOver() {
    sounds.playGameOver();
    document.getElementById('final-wave-val')!.innerText = String(this.activeWave);
    document.getElementById('final-score-val')!.innerText = String(this.score);
    document.getElementById('game-over-overlay')!.style.display = 'flex';
  }

  private resetGame() {
    this.playerHealth = 100;
    this.score = 0;
    this.goblinsToSpawnNext = 1;
    this.activeWave = 1;
    this.spawnCountdown = 0;

    this.playerPos.set(0, 0, 0);
    this.player.meshGroup.position.set(0, 0, 0);

    // Clean active Goblins
    this.goblins.forEach((g) => this.scene.remove(g.character.meshGroup));
    this.goblins = [];

    // Hide overlays
    document.getElementById('game-over-overlay')!.style.display = 'none';
    document.getElementById('spawner-countdown')!.style.display = 'none';

    this.spawnWave();
    this.updateHUD();
  }

  // ==========================================
  // Custom Particle Systems
  // ==========================================
  private createSpawnParticles(pos: THREE.Vector3) {
    const geo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    const mat = new THREE.MeshBasicMaterial({ color: 0x888888 });

    for (let i = 0; i < 15; i++) {
      const pMesh = new THREE.Mesh(geo, mat);
      pMesh.position.copy(pos).add(new THREE.Vector3(
        (Math.random() - 0.5) * 1.5,
        Math.random() * 0.5,
        (Math.random() - 0.5) * 1.5
      ));
      this.scene.add(pMesh);

      this.particles.push({
        mesh: pMesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          Math.random() * 3 + 1,
          (Math.random() - 0.5) * 2
        ),
        life: 0.5,
        maxLife: 0.5,
      });
    }
  }

  private createHitParticles(pos: THREE.Vector3) {
    const geo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    // Green goblin sparks
    const mat = new THREE.MeshBasicMaterial({ color: 0x76b041 });

    for (let i = 0; i < 8; i++) {
      const pMesh = new THREE.Mesh(geo, mat);
      pMesh.position.copy(pos).add(new THREE.Vector3(0, 1.0, 0));
      this.scene.add(pMesh);

      this.particles.push({
        mesh: pMesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 5,
          Math.random() * 4 + 2,
          (Math.random() - 0.5) * 5
        ),
        life: 0.35,
        maxLife: 0.35,
      });
    }
  }

  private createDeathParticles(pos: THREE.Vector3) {
    const geo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const mat = new THREE.MeshBasicMaterial({ color: 0xaa0000 });

    for (let i = 0; i < 20; i++) {
      const pMesh = new THREE.Mesh(geo, mat);
      pMesh.position.copy(pos).add(new THREE.Vector3(0, 0.8, 0));
      this.scene.add(pMesh);

      this.particles.push({
        mesh: pMesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          Math.random() * 6 + 1,
          (Math.random() - 0.5) * 6
        ),
        life: 0.6,
        maxLife: 0.6,
      });
    }
  }

  private createFloatingText(text: string, pos: THREE.Vector3, color: string) {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.color = color;
    div.style.fontWeight = 'bold';
    div.style.fontSize = '1.5rem';
    div.style.textShadow = '2px 2px 0px #000';
    div.style.fontFamily = 'monospace';
    div.style.pointerEvents = 'none';
    div.innerText = text;
    document.body.appendChild(div);

    this.floatingTexts.push({
      element: div,
      x: pos.x,
      y: pos.y + 1.8,
      z: pos.z,
      life: 0.8, // 800ms
      maxLife: 0.8,
    });
  }

  // ==========================================
  // Update Frame Loops
  // ==========================================
  private updatePlayer(dt: number) {
    if (this.playerHealth <= 0) {
      this.player.animateWalk(0, 0);
      return;
    }

    // Determine movement direction vectors
    const forwardVec = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    forwardVec.y = 0;
    forwardVec.normalize();

    const rightVec = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
    rightVec.y = 0;
    rightVec.normalize();

    const moveDirection = new THREE.Vector3();

    if (this.keys['w'] || this.keys['arrowup']) moveDirection.add(forwardVec);
    if (this.keys['s'] || this.keys['arrowdown']) moveDirection.add(forwardVec.clone().negate());
    if (this.keys['a'] || this.keys['arrowleft']) moveDirection.add(rightVec.clone().negate());
    if (this.keys['d'] || this.keys['arrowright']) moveDirection.add(rightVec);

    const speed = this.keys['shift'] ? 6.5 : 4.0; // Running/Walking speeds

    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize();
      this.playerPos.addScaledVector(moveDirection, speed * dt);

      // Rotate player smoothly towards movement direction
      const targetAngle = Math.atan2(moveDirection.x, moveDirection.z);
      // Smooth angle interpolation
      let diff = targetAngle - this.player.meshGroup.rotation.y;
      // Normalize angle diff between -PI and PI
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      this.player.meshGroup.rotation.y += diff * 15 * dt;

      this.player.animateWalk(speed, this.clock.getElapsedTime());
    } else {
      this.player.animateWalk(0, 0);
    }

    // Jump Physics (simple vertical integration)
    this.verticalVelocity += this.gravity * dt;
    this.playerPos.y += this.verticalVelocity * dt;

    if (this.playerPos.y <= 0) {
      this.playerPos.y = 0;
      this.verticalVelocity = 0;
      this.isJumping = false;
    }

    // Keep Player inside arena boundary
    this.playerPos.x = Math.max(-this.boundaries, Math.min(this.boundaries, this.playerPos.x));
    this.playerPos.z = Math.max(-this.boundaries, Math.min(this.boundaries, this.playerPos.z));

    this.player.meshGroup.position.copy(this.playerPos);

    // Sword animation logic during swing
    if (this.isAttacking) {
      this.attackTimer -= dt;
      if (this.attackTimer <= 0) {
        this.isAttacking = false;
        // Restore sword right arm position
        this.player.rightArm.rotation.x = 0;
      } else {
        // Swing transition animation rotation
        const progress = (this.attackDuration - this.attackTimer) / this.attackDuration;
        this.player.rightArm.rotation.x = -Math.PI / 6 - Math.sin(progress * Math.PI) * 1.2;
      }
    }
  }

  private updateGoblins(dt: number) {
    this.goblins.forEach((goblin) => {
      goblin.update(dt, this.playerPos);
    });
  }

  private updateParticles(dt: number) {
    // 1. Text elements
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.life -= dt;

      // Move text upward
      ft.y += 1.2 * dt;

      // Project 3D vector to 2D screen coordinate
      const tempV = new THREE.Vector3(ft.x, ft.y, ft.z);
      tempV.project(this.camera);

      // Convert projected values [-1, 1] to screen dimensions [0, width/height]
      const screenX = (tempV.x *  .5 + .5) * window.innerWidth;
      const screenY = (tempV.y * -.5 + .5) * window.innerHeight;

      ft.element.style.left = `${screenX}px`;
      ft.element.style.top = `${screenY}px`;

      // Fade out opacity
      ft.element.style.opacity = `${ft.life / ft.maxLife}`;

      if (ft.life <= 0) {
        document.body.removeChild(ft.element);
        this.floatingTexts.splice(i, 1);
      }
    }

    // 2. Physical particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;

      p.velocity.y += this.gravity * dt; // Gravity
      p.mesh.position.addScaledVector(p.velocity, dt);

      // Spin particles
      p.mesh.rotation.x += 10 * dt;
      p.mesh.rotation.y += 10 * dt;

      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        if (Array.isArray(p.mesh.material)) {
          p.mesh.material.forEach((m) => m.dispose());
        } else {
          p.mesh.material.dispose();
        }
        this.particles.splice(i, 1);
      }
    }
  }

  private updateCamera(dt: number) {
    // Q & E Camera Rotation
    const rotationSpeed = 2.0; // Radians per second
    if (this.keys['q']) {
      this.cameraAngle -= rotationSpeed * dt;
    }
    if (this.keys['e']) {
      this.cameraAngle += rotationSpeed * dt;
    }

    // Compute camera offset based on angle
    const radius = 10;
    const height = 7;
    const offsetX = Math.sin(this.cameraAngle) * radius;
    const offsetZ = Math.cos(this.cameraAngle) * radius;
    const targetCamOffset = new THREE.Vector3(offsetX, height, offsetZ);
    const targetCamPos = new THREE.Vector3().copy(this.playerPos).add(targetCamOffset);

    // Simple smooth damping
    this.camera.position.lerp(targetCamPos, 6 * dt);
    this.camera.lookAt(new THREE.Vector3().copy(this.playerPos).add(new THREE.Vector3(0, 1.0, 0)));
  }

  private updateSpawner(dt: number) {
    if (this.spawnCountdown > 0) {
      this.spawnCountdown -= dt;
      document.getElementById('timer-val')!.innerText = this.spawnCountdown.toFixed(1);

      if (this.spawnCountdown <= 0) {
        this.spawnWave();
      }
    }
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));

    const dt = Math.min(this.clock.getDelta(), 0.1); // Clamp delta time to avoid huge teleportation jumps on freeze

    this.updatePlayer(dt);
    this.updateGoblins(dt);
    this.updateParticles(dt);
    this.updateCamera(dt);
    this.updateSpawner(dt);

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Instantiate game on load
window.addEventListener('DOMContentLoaded', () => {
  new DemoGame();
});
