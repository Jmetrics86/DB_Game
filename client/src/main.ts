// David's Magic RPG - WebGL 3D Game with Spells, Kingdom, and Relics
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

  playSpellCast() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playBuy() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.15, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.08 + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.15);
    });
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
// Interfaces
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

interface Projectile {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  damage: number;
  owner: 'player' | 'enemy';
  life: number;
  maxLife: number;
  type: 'fire' | 'ice' | 'portal' | 'beast' | 'anti-magic';
  isWall?: boolean;
  isRift?: boolean;
}

// ==========================================
// Floating 3D Grimoire (Book Model)
// ==========================================
class FloatingGrimoire {
  meshGroup: THREE.Group;
  coverL: THREE.Mesh;
  coverR: THREE.Mesh;
  pages: THREE.Mesh;
  light: THREE.PointLight;

  constructor(colorHex: number, grimoireType: '3-leaf' | '4-leaf' | '5-leaf' = '3-leaf') {
    this.meshGroup = new THREE.Group();

    const coverMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5 });
    const pageMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
    const spineMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.7 });

    // Spine
    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.4, 0.08), spineMat);
    spine.castShadow = true;
    this.meshGroup.add(spine);

    // Left Cover (hinged at spine)
    const coverLGroup = new THREE.Group();
    coverLGroup.position.set(-0.02, 0, 0);
    const coverLMesh = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.38, 0.02), coverMat);
    coverLMesh.position.set(-0.125, 0, 0); // hinge offset
    coverLMesh.castShadow = true;
    coverLGroup.add(coverLMesh);
    this.coverL = coverLGroup as any;
    this.meshGroup.add(coverLGroup);

    // Right Cover
    const coverRGroup = new THREE.Group();
    coverRGroup.position.set(0.02, 0, 0);
    const coverRMesh = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.38, 0.02), coverMat);
    coverRMesh.position.set(0.125, 0, 0);
    coverRMesh.castShadow = true;
    coverRGroup.add(coverRMesh);
    this.coverR = coverRGroup as any;
    this.meshGroup.add(coverRGroup);

    // Pages
    this.pages = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.35, 0.06), pageMat);
    this.pages.position.set(0, 0, 0);
    this.pages.castShadow = true;
    this.meshGroup.add(this.pages);

    // Internal magic light
    this.light = new THREE.PointLight(colorHex, 1.5, 4);
    this.light.position.set(0, 0, 0);
    this.meshGroup.add(this.light);

    // Clover Emblem Addition
    const cloverColor = grimoireType === '5-leaf' ? 0xff1111 : (grimoireType === '4-leaf' ? 0xffeb3b : 0x111111);
    const numLeaves = grimoireType === '5-leaf' ? 5 : (grimoireType === '4-leaf' ? 4 : 3);

    const createClover = (leaves: number, color: number) => {
      const group = new THREE.Group();
      const leafMat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.3,
        metalness: 0.5,
        emissive: color,
        emissiveIntensity: 0.2
      });

      const leafSize = 0.04;
      const radius = 0.035;
      for (let i = 0; i < leaves; i++) {
        const leaf = new THREE.Mesh(new THREE.BoxGeometry(leafSize, leafSize, 0.005), leafMat);
        const angle = (i * Math.PI * 2) / leaves;
        leaf.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        leaf.rotation.z = angle + Math.PI / 4;
        group.add(leaf);
      }

      const stem = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.06, 0.004), leafMat);
      stem.position.set(0, -0.04, 0);
      stem.rotation.z = -0.2;
      group.add(stem);

      return group;
    };

    const cloverL = createClover(numLeaves, cloverColor);
    cloverL.position.set(-0.125, 0, 0.011);
    this.coverL.add(cloverL);

    const cloverR = createClover(numLeaves, cloverColor);
    cloverR.position.set(0.125, 0, -0.011);
    cloverR.rotation.y = Math.PI;
    this.coverR.add(cloverR);

    this.setOpen(false);
  }

  setOpen(open: boolean) {
    if (open) {
      this.coverL.rotation.y = Math.PI - 0.2;
      this.coverR.rotation.y = -Math.PI + 0.2;
      this.pages.scale.set(1.0, 1.0, 0.1);
      this.light.intensity = 3.0;
    } else {
      this.coverL.rotation.y = Math.PI / 2;
      this.coverR.rotation.y = -Math.PI / 2;
      this.pages.scale.set(1.0, 1.0, 1.0);
      this.light.intensity = 0.5;
    }
  }

  update(dt: number, playerPos: THREE.Vector3, playerRotationY: number, time: number, isCasting: boolean) {
    this.setOpen(isCasting);

    // Orbit/hover to the left and slightly behind the player
    const offsetDistance = 0.6;
    const angle = playerRotationY + Math.PI + 0.5; // behind/left shoulder angle
    const targetX = playerPos.x + Math.sin(angle) * offsetDistance;
    const targetZ = playerPos.z + Math.cos(angle) * offsetDistance;
    const targetY = playerPos.y + 1.2 + Math.sin(time * 3.0) * 0.08; // bobbing

    // Smooth lerp
    this.meshGroup.position.x += (targetX - this.meshGroup.position.x) * 8 * dt;
    this.meshGroup.position.y += (targetY - this.meshGroup.position.y) * 8 * dt;
    this.meshGroup.position.z += (targetZ - this.meshGroup.position.z) * 8 * dt;

    // Rotate book to match player facing direction, facing slightly outwards
    this.meshGroup.rotation.y = playerRotationY + Math.PI / 6 + Math.sin(time * 0.5) * 0.05;
    this.meshGroup.rotation.z = Math.sin(time * 1.5) * 0.04;
  }
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
  staff: THREE.Mesh | null = null;

  constructor(role: 'player' | 'goblin' | 'mage' | 'merchant' = 'goblin') {
    this.meshGroup = new THREE.Group();

    let skinColor = 0xffdbac;
    let shirtColor = 0x2e8bc0;
    let pantsColor = 0x1f2833;
    let hairColor = 0xd4a373;
    let eyeColor = 0x000000;
    let emissiveColor = 0x000000;

    if (role === 'goblin') {
      skinColor = 0x76b041;
      shirtColor = 0x4a5d4e;
      pantsColor = 0x3d3027;
      hairColor = 0x111111;
      eyeColor = 0xff0000;
      emissiveColor = 0x550000;
    } else if (role === 'mage') {
      skinColor = 0xfad6a5;
      shirtColor = 0x5c2d91; // purple wizard robe
      pantsColor = 0x230c33;
      hairColor = 0xeeeeee; // white beard/hair
      eyeColor = 0x00ffff; // cyan glowing eyes
      emissiveColor = 0x004444;
    } else if (role === 'merchant') {
      skinColor = 0xffdbac;
      shirtColor = 0x008080; // teal merchant robe
      pantsColor = 0x1e3f3f;
      hairColor = 0x8b4513; // brown hair
      eyeColor = 0x000000;
      emissiveColor = 0x000000;
    }

    const materials = {
      skin: new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.9 }),
      shirt: new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.9 }),
      pants: new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.9 }),
      hair: new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.9 }),
      eyes: new THREE.MeshStandardMaterial({ color: eyeColor, roughness: 0.1, emissive: emissiveColor }),
    };

    const scale = role === 'player' ? 1.0 : (role === 'merchant' ? 0.95 : 0.75);

    // Body
    const bodyGeo = new THREE.BoxGeometry(0.8 * scale, 1.2 * scale, 0.4 * scale);
    this.body = new THREE.Mesh(bodyGeo, materials.shirt);
    this.body.position.y = 1.0 * scale;
    this.body.castShadow = true;
    this.body.receiveShadow = true;
    this.meshGroup.add(this.body);

    // Head
    const headGeo = new THREE.BoxGeometry(0.8 * scale, 0.8 * scale, 0.8 * scale);
    this.head = new THREE.Mesh(headGeo, materials.skin);
    this.head.position.y = 2.0 * scale;
    this.head.castShadow = true;
    this.head.receiveShadow = true;
    this.meshGroup.add(this.head);

    // Eyes
    const eyeGeo = new THREE.BoxGeometry(0.15 * scale, 0.08 * scale, 0.08 * scale);
    const leftEye = new THREE.Mesh(eyeGeo, materials.eyes);
    leftEye.name = 'eyes';
    leftEye.position.set(-0.2 * scale, 2.0 * scale, 0.4 * scale);
    const rightEye = leftEye.clone();
    rightEye.position.x = 0.2 * scale;
    this.meshGroup.add(leftEye);
    this.meshGroup.add(rightEye);

    // Hair / Helmet / Hats
    if (role === 'player') {
      const hairGeo = new THREE.BoxGeometry(0.85, 0.2, 0.85);
      const hair = new THREE.Mesh(hairGeo, materials.hair);
      hair.position.set(0, 2.4, 0);
      this.meshGroup.add(hair);
    } else if (role === 'goblin') {
      // ears
      const earGeo = new THREE.BoxGeometry(0.3 * scale, 0.1 * scale, 0.1 * scale);
      const leftEar = new THREE.Mesh(earGeo, materials.skin);
      leftEar.position.set(-0.5 * scale, 2.0 * scale, 0);
      leftEar.rotation.z = -0.2;
      const rightEar = leftEar.clone();
      rightEar.position.x = 0.5 * scale;
      rightEar.rotation.z = 0.2;
      this.meshGroup.add(leftEar);
      this.meshGroup.add(rightEar);
    } else if (role === 'mage' || role === 'merchant') {
      // Pointed Wizard Hat
      const hatGeo = new THREE.ConeGeometry(0.65 * scale, 1.0 * scale, 4);
      const hatMat = new THREE.MeshStandardMaterial({ color: role === 'mage' ? 0x411e6d : 0x004d4d, roughness: 0.9 });
      const hat = new THREE.Mesh(hatGeo, hatMat);
      hat.position.set(0, 2.5 * scale, 0);
      hat.rotation.y = Math.PI / 4;
      this.meshGroup.add(hat);

      // Hat Brim
      const brim = new THREE.Mesh(new THREE.BoxGeometry(1.1 * scale, 0.04 * scale, 1.1 * scale), hatMat);
      brim.position.set(0, 2.05 * scale, 0);
      this.meshGroup.add(brim);
    }

    // Legs
    const legGeo = new THREE.BoxGeometry(0.35 * scale, 1.0 * scale, 0.35 * scale);
    this.leftLeg = new THREE.Mesh(legGeo, materials.pants);
    this.leftLeg.position.set(-0.22 * scale, 0.5 * scale, 0);
    this.leftLeg.castShadow = true;
    this.meshGroup.add(this.leftLeg);

    this.rightLeg = this.leftLeg.clone();
    this.rightLeg.position.x = 0.22 * scale;
    this.meshGroup.add(this.rightLeg);

    // Arms
    const armGeo = new THREE.BoxGeometry(0.35 * scale, 1.0 * scale, 0.35 * scale);
    this.leftArm = new THREE.Mesh(armGeo, materials.shirt);
    this.leftArm.position.set(-0.6 * scale, 1.1 * scale, 0);
    this.leftArm.castShadow = true;
    this.meshGroup.add(this.leftArm);

    this.rightArm = this.leftArm.clone();
    this.rightArm.position.x = 0.6 * scale;
    this.meshGroup.add(this.rightArm);

    // Hold Staff for Mages and Merchant
    if (role === 'mage') {
      const staffGroup = new THREE.Group();
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.04 * scale, 0.04 * scale, 1.5 * scale, 4), new THREE.MeshStandardMaterial({ color: 0x5c4033 }));
      stick.position.y = 0.45 * scale;
      stick.castShadow = true;
      staffGroup.add(stick);

      const crystal = new THREE.Mesh(new THREE.BoxGeometry(0.18 * scale, 0.18 * scale, 0.18 * scale), new THREE.MeshStandardMaterial({ color: 0xff0066, emissive: 0xaa0033 }));
      crystal.position.y = 1.2 * scale;
      staffGroup.add(crystal);

      this.staff = staffGroup as any;
      this.staff!.position.set(0, -0.4 * scale, 0.2 * scale);
      this.staff!.rotation.x = Math.PI / 6;
      this.rightArm.add(this.staff!);
    } else if (role === 'merchant') {
      const staffGroup = new THREE.Group();
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.6, 4), new THREE.MeshStandardMaterial({ color: 0xd4af37 }));
      stick.position.y = 0.45;
      staffGroup.add(stick);

      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 5, 5), new THREE.MeshStandardMaterial({ color: 0x00ffdd, emissive: 0x008888 }));
      orb.position.y = 1.25;
      staffGroup.add(orb);

      this.staff = staffGroup as any;
      this.staff!.position.set(0, -0.4, 0.2);
      this.staff!.rotation.x = Math.PI / 8;
      this.rightArm.add(this.staff!);
    }
  }

  animateWalk(speed: number, time: number) {
    const factor = Math.min(speed * 4, 1);
    const angle = Math.sin(time * 12) * 0.6 * factor;

    this.leftLeg.rotation.x = angle;
    this.rightLeg.rotation.x = -angle;

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
  isFrozen = false;
  freezeTimer = 0;

  constructor(spawnPos: THREE.Vector3) {
    this.character = new CubistCharacter('goblin');
    this.position.copy(spawnPos);
    this.character.meshGroup.position.copy(spawnPos);
  }

  takeDamage(amount: number, dir: THREE.Vector3) {
    if (this.isDead) return;
    this.health = Math.max(0, this.health - amount);
    this.flashTimer = 0.15;
    this.knockback.copy(dir).multiplyScalar(8);

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
          mat.emissive.setHex(this.isFrozen ? 0x0088ff : (child.name === 'eyes' ? 0x550000 : 0x000000));
        }
      }
    });
  }

  update(dt: number, playerPos: THREE.Vector3) {
    if (this.isDead) {
      this.character.meshGroup.rotation.z += 5 * dt;
      this.character.meshGroup.position.y -= 2 * dt;
      return;
    }

    if (this.isFrozen) {
      this.freezeTimer -= dt;
      this.setMaterialColor(0x0044ff);
      if (this.freezeTimer <= 0) {
        this.isFrozen = false;
        this.resetMaterialColor();
      }
      return;
    }

    if (this.flashTimer > 0) {
      this.flashTimer -= dt;
      if (this.flashTimer <= 0) {
        this.resetMaterialColor();
      }
    }

    if (this.attackCooldown > 0) {
      this.attackCooldown -= dt;
    }

    this.position.addScaledVector(this.knockback, dt);
    this.knockback.multiplyScalar(Math.exp(-10 * dt));

    const toPlayer = new THREE.Vector3().subVectors(playerPos, this.position);
    toPlayer.y = 0;
    const distance = toPlayer.length();

    if (distance > 0.8) {
      toPlayer.normalize();
      const targetAngle = Math.atan2(toPlayer.x, toPlayer.z);
      this.character.meshGroup.rotation.y = targetAngle;

      const moveSpeed = 2.0;
      this.position.addScaledVector(toPlayer, moveSpeed * dt);
      this.character.animateWalk(moveSpeed, Date.now() * 0.001);
    } else {
      this.character.animateWalk(0, 0);
      if (this.attackCooldown <= 0) {
        this.attackPlayer();
      }
    }

    this.character.meshGroup.position.copy(this.position);
  }

  attackPlayer() {
    this.attackCooldown = 1.5;
    this.character.leftArm.rotation.x = -Math.PI / 2;
    this.character.rightArm.rotation.x = -Math.PI / 2;

    setTimeout(() => {
      if (!this.isDead && !this.isFrozen) {
        this.character.leftArm.rotation.x = 0;
        this.character.rightArm.rotation.x = 0;
      }
    }, 200);

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
// Mage Class (Ranged Fireball Caster)
// ==========================================
class Mage {
  character: CubistCharacter;
  health: number = 80;
  maxHealth: number = 80;
  isDead: boolean = false;
  position: THREE.Vector3 = new THREE.Vector3();
  flashTimer: number = 0;
  attackCooldown: number = 0;
  knockback: THREE.Vector3 = new THREE.Vector3();
  isFrozen = false;
  freezeTimer = 0;

  constructor(spawnPos: THREE.Vector3) {
    this.character = new CubistCharacter('mage');
    this.position.copy(spawnPos);
    this.character.meshGroup.position.copy(spawnPos);
  }

  takeDamage(amount: number, dir: THREE.Vector3) {
    if (this.isDead) return;
    this.health = Math.max(0, this.health - amount);
    this.flashTimer = 0.15;
    this.knockback.copy(dir).multiplyScalar(10);

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
          mat.emissive.setHex(this.isFrozen ? 0x0088ff : (child.name === 'eyes' ? 0x004444 : 0x000000));
        }
      }
    });
  }

  update(dt: number, playerPos: THREE.Vector3, onFireballCast: (start: THREE.Vector3, target: THREE.Vector3) => void) {
    if (this.isDead) {
      this.character.meshGroup.rotation.z += 5 * dt;
      this.character.meshGroup.position.y -= 2 * dt;
      return;
    }

    if (this.isFrozen) {
      this.freezeTimer -= dt;
      this.setMaterialColor(0x0044ff);
      if (this.freezeTimer <= 0) {
        this.isFrozen = false;
        this.resetMaterialColor();
      }
      return;
    }

    if (this.flashTimer > 0) {
      this.flashTimer -= dt;
      if (this.flashTimer <= 0) {
        this.resetMaterialColor();
      }
    }

    if (this.attackCooldown > 0) {
      this.attackCooldown -= dt;
    }

    this.position.addScaledVector(this.knockback, dt);
    this.knockback.multiplyScalar(Math.exp(-10 * dt));

    const toPlayer = new THREE.Vector3().subVectors(playerPos, this.position);
    toPlayer.y = 0;
    const distance = toPlayer.length();

    toPlayer.normalize();
    const targetAngle = Math.atan2(toPlayer.x, toPlayer.z);
    this.character.meshGroup.rotation.y = targetAngle;

    if (distance > 11) {
      const moveSpeed = 1.8;
      this.position.addScaledVector(toPlayer, moveSpeed * dt);
      this.character.animateWalk(moveSpeed, Date.now() * 0.001);
    } else if (distance < 7) {
      const moveSpeed = 1.5;
      this.position.addScaledVector(toPlayer.clone().negate(), moveSpeed * dt);
      this.character.animateWalk(moveSpeed, Date.now() * 0.001);
    } else {
      this.character.animateWalk(0, 0);
      if (this.attackCooldown <= 0 && distance < 15) {
        this.castFireball(playerPos, onFireballCast);
      }
    }

    this.character.meshGroup.position.copy(this.position);
  }

  castFireball(playerPos: THREE.Vector3, onFireballCast: (start: THREE.Vector3, target: THREE.Vector3) => void) {
    this.attackCooldown = 2.5;
    this.character.rightArm.rotation.x = -Math.PI / 2;

    setTimeout(() => {
      if (!this.isDead && !this.isFrozen) {
        this.character.rightArm.rotation.x = 0;
      }
    }, 300);

    const spawnPos = new THREE.Vector3().copy(this.position).add(new THREE.Vector3(0, 1.2, 0));
    onFireballCast(spawnPos, playerPos);
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
  private mages: Mage[] = [];
  private merchant!: CubistCharacter;
  private merchantPos = new THREE.Vector3(5, 0, 5);

  // Physics/Controls
  private keys: Record<string, boolean> = {};
  private verticalVelocity = 0;
  private isJumping = false;
  private gravity = -20;
  private jumpForce = 8;
  private boundaries = 58; // Size of expanded outer grasslands
  private cameraAngle = 0;
  private cameraRadius = 10.0;

  // Combat State / Grimoires / Relics
  private gameStarted = false;

  // Nephew requirements variables
  private magicAttribute: 'fire' | 'ice' | 'portal' | 'beast' | 'devil' = 'fire';
  private grimoireType: '3-leaf' | '4-leaf' | '5-leaf' = '3-leaf';
  private gold = 0;
  private magicPowerMultiplier = 1.0;
  private speedMultiplier = 1.0;

  // Active buffs / transformations
  private isGiantForm = false;
  private giantFormTimer = 0;
  private isDevilUnion = false;
  private devilUnionTimer = 0;
  private devilWings: THREE.Group | null = null;
  private isInvulnerable = false;
  private invulnTimer = 0;
  private nullifyShieldMesh: THREE.Mesh | null = null;

  // Relic Shop items
  private activeRelics: string[] = [];

  // Floating Grimoire Mesh
  private floatingGrimoire: FloatingGrimoire | null = null;
  private prevGamepadButtons: boolean[] = [];

  // Cooldown tracker (seconds remaining)
  private cooldowns = {
    basic: 0,
    combo: 0,
    skill: 0,
    ultimate: 0
  };
  private maxCooldowns = {
    basic: 0.2,
    combo: 2.5,
    skill: 7.0,
    ultimate: 15.0
  };

  // UI States
  private isSpellbookOpen = false;
  private isShopOpen = false;
  private isPaused = false;
  private isTravelOpen = false;

  // Obstacles for Collisions
  private obstacleBoxes: { xMin: number; xMax: number; zMin: number; zMax: number }[] = [];
  private obstacleCircles: { x: number; z: number; radius: number }[] = [];

  // Spawners & Zone Management
  private goblinsToSpawnNext = 1;
  private spawnCountdown = 0;
  private activeWave = 1;

  // Particles, Floating numbers, Projectiles
  private floatingTexts: FloatingText[] = [];
  private particles: Particle[] = [];
  private projectiles: Projectile[] = [];

  // Clock
  private clock = new THREE.Clock();

  constructor() {
    this.injectStyles();
    this.initObstacles();
    this.initScene();
    this.initLights();
    this.initEnvironment();
    this.initPlayer();
    this.initInput();
    this.initUI();

    // Start rendering frame loop right away
    this.animate();
  }

  private injectStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
      .selection-overlay {
        position: absolute; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(10, 12, 16, 0.95); display: flex; flex-direction: column;
        justify-content: center; align-items: center; z-index: 100; backdrop-filter: blur(15px);
        font-family: sans-serif; pointer-events: auto;
      }
      .selection-box {
        background: rgba(25, 30, 40, 0.85); border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px; padding: 30px 40px; text-align: center;
        box-shadow: 0 10px 40px rgba(0,0,0,0.8); max-width: 500px; width: 90%;
      }
      .selection-title {
        font-size: 2.2rem; margin-bottom: 20px;
        background: linear-gradient(45deg, #00ffcc, #0077ff);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold;
      }
      .selection-row { display: flex; justify-content: center; gap: 10px; margin: 15px 0; flex-wrap: wrap; }
      .selection-btn {
        background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
        color: #ccc; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: bold;
        transition: all 0.2s ease;
      }
      .selection-btn:hover { background: rgba(255, 255, 255, 0.15); color: #fff; }
      .selection-btn.active {
        background: linear-gradient(45deg, #00ffcc, #0077ff); border-color: #00ffcc;
        color: #111; box-shadow: 0 0 15px rgba(0,255,204,0.4);
      }
      .roll-btn {
        background: linear-gradient(45deg, #f9d423, #ff4e50); border: none; color: #111;
        padding: 12px 25px; border-radius: 25px; cursor: pointer; font-weight: 900;
        font-size: 1.1rem; margin-top: 15px; text-transform: uppercase;
        box-shadow: 0 5px 15px rgba(249,212,35,0.4); transition: transform 0.2s;
      }
      .roll-btn:hover { transform: scale(1.05); }
      .start-game-btn {
        background: linear-gradient(45deg, #00ff87, #60efff); border: none; color: #111;
        padding: 15px 40px; border-radius: 30px; cursor: pointer; font-weight: bold;
        font-size: 1.3rem; margin-top: 25px; box-shadow: 0 5px 20px rgba(0,255,135,0.4);
        transition: transform 0.2s;
      }
      .start-game-btn:hover { transform: scale(1.05); }

      .shop-overlay {
        position: absolute; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(10, 12, 16, 0.85); display: flex; justify-content: center;
        align-items: center; z-index: 90; pointer-events: auto; backdrop-filter: blur(10px);
        font-family: sans-serif;
      }
      .shop-container {
        background: rgba(20, 25, 35, 0.95); border: 2px solid #00ffcc; border-radius: 16px;
        padding: 30px; max-width: 650px; width: 90%; text-align: center;
        box-shadow: 0 10px 40px rgba(0,255,204,0.3);
      }
      .shop-cards { display: flex; gap: 20px; justify-content: center; margin-top: 20px; flex-wrap: wrap; }
      .shop-card {
        background: rgba(30, 35, 45, 0.8); border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px; padding: 20px; width: 160px; display: flex; flex-direction: column;
        justify-content: space-between; align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      }
      .relic-icon { font-size: 2.5rem; margin-bottom: 10px; }
      .relic-name { font-weight: bold; font-size: 1.1rem; color: #00ffcc; margin-bottom: 5px; }
      .relic-desc { font-size: 0.8rem; color: #a8b2c1; height: 50px; text-align: center; }
      .relic-price { font-weight: bold; color: #f9d423; margin: 10px 0; }
      .buy-btn {
        background: #00ffcc; color: #111; border: none; padding: 8px 15px; border-radius: 6px;
        font-weight: bold; cursor: pointer; transition: all 0.2s; width: 100%;
      }
      .buy-btn:hover { background: #00cca3; }
      .buy-btn:disabled { background: #444; color: #777; cursor: not-allowed; }

      .spellbook-overlay {
        position: absolute; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(10, 12, 16, 0.9); display: flex; justify-content: center;
        align-items: center; z-index: 95; pointer-events: auto; backdrop-filter: blur(10px);
        font-family: 'Georgia', serif;
      }
      .spellbook-book {
        background: #3e2723; border: 10px solid #d4af37; border-radius: 20px;
        display: flex; width: 850px; height: 550px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);
        overflow: hidden;
      }
      .spellbook-page {
        flex: 1; background: #f5eccd; color: #3e2723; padding: 30px 40px; overflow-y: auto;
        box-shadow: inset 0 0 30px rgba(0,0,0,0.15); border-right: 1px solid rgba(0,0,0,0.1);
      }
      .spellbook-page:last-child { border-right: none; }
      .spellbook-title { font-size: 1.8rem; border-bottom: 2px solid #3e2723; padding-bottom: 5px; margin-bottom: 15px; text-align: center; font-weight: bold; }
      .spellbook-stat { display: flex; justify-content: space-between; margin: 10px 0; border-bottom: 1px dashed rgba(62,39,35,0.3); }
      .spell-card-item { margin-bottom: 18px; background: rgba(255, 255, 255, 0.4); padding: 10px; border-radius: 6px; border-left: 4px solid #3e2723; }
      .spell-card-name { font-weight: bold; font-size: 1.05rem; }
      .spell-card-binding { font-size: 0.8rem; font-style: italic; color: #6d4c41; }
      .spell-card-desc { font-size: 0.85rem; margin-top: 3px; }

      .mmo-hotbar {
        position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
        display: flex; gap: 12px; pointer-events: auto; z-index: 10; font-family: sans-serif;
      }
      .hotbar-slot {
        position: relative; width: 62px; height: 62px; background: rgba(20, 24, 33, 0.85);
        border: 2px solid rgba(255, 255, 255, 0.15); border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.5); display: flex; flex-direction: column;
        justify-content: center; align-items: center; cursor: pointer; user-select: none;
        transition: all 0.15s ease;
      }
      .hotbar-slot:hover { border-color: #00ffcc; transform: translateY(-2px); }
      .hotbar-icon { font-size: 1.8rem; }
      .hotbar-key {
        position: absolute; bottom: 2px; right: 4px; font-size: 0.65rem;
        color: rgba(255,255,255,0.7); background: rgba(0,0,0,0.5); padding: 1px 4px;
        border-radius: 3px; font-family: monospace;
      }
      .hotbar-name {
        position: absolute; top: -32px; font-size: 0.75rem; background: rgba(0,0,0,0.85);
        color: #fff; padding: 4px 8px; border-radius: 4px; opacity: 0; pointer-events: none;
        transition: opacity 0.15s; white-space: nowrap; border: 1px solid rgba(255,255,255,0.1);
      }
      .hotbar-slot:hover .hotbar-name { opacity: 1; }
      .cooldown-overlay {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.75); border-radius: 10px; display: flex;
        justify-content: center; align-items: center; font-weight: bold; color: #ff4b2b;
        font-size: 1rem; pointer-events: none;
      }

      .zone-banner {
        position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
        background: rgba(0,0,0,0.85); border-radius: 20px; padding: 6px 20px;
        font-size: 0.9rem; font-weight: bold; letter-spacing: 1px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.5); z-index: 10; font-family: sans-serif;
      }
      .zone-safe { color: #00ffcc; border: 1px solid rgba(0,255,204,0.4); }
      .zone-combat { color: #ff4b2b; border: 1px solid rgba(255,75,43,0.4); }

      .merchant-prompt {
        position: absolute; background: rgba(0, 0, 0, 0.85); color: #00ffcc;
        border: 1px solid #00ffcc; padding: 6px 12px; border-radius: 15px;
        font-size: 0.85rem; font-weight: bold; pointer-events: none; z-index: 10;
        box-shadow: 0 0 10px rgba(0,255,204,0.3); font-family: sans-serif;
      }
      .close-x-btn {
        position: absolute; top: 15px; right: 15px; background: none; border: none;
        color: #ff4b2b; font-size: 1.8rem; font-weight: bold; cursor: pointer;
        transition: color 0.2s, transform 0.2s; line-height: 1; z-index: 10;
        font-family: sans-serif;
      }
      .close-x-btn:hover { color: #ff3333; transform: scale(1.15); }
      .close-x-btn-spellbook {
        position: absolute; top: 15px; right: 15px; background: none; border: none;
        color: #3e2723; font-size: 1.8rem; font-weight: bold; cursor: pointer;
        transition: color 0.2s, transform 0.2s; line-height: 1; z-index: 10;
        font-family: sans-serif;
      }
      .close-x-btn-spellbook:hover { color: #8b2500; transform: scale(1.15); }
      .pause-overlay {
        position: absolute; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(10, 12, 16, 0.85); display: flex; flex-direction: column;
        justify-content: center; align-items: center; z-index: 98; pointer-events: auto;
        backdrop-filter: blur(10px); font-family: sans-serif;
      }
    `;
    document.head.appendChild(style);
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c0f12);
    this.scene.fog = new THREE.FogExp2(0x0c0f12, 0.025);

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const container = document.getElementById('game-container')!;
    container.innerHTML = '';

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private initLights() {
    const ambientLight = new THREE.AmbientLight(0xdff0ff, 0.4);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 1.0);
    dirLight.position.set(30, 50, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 120;
    const d = 40;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    this.scene.add(dirLight);

    // Dynamic torch lights inside Kingdom
    const lightPositions = [
      new THREE.Vector3(-10, 2, -10),
      new THREE.Vector3(10, 2, -10),
      new THREE.Vector3(-10, 2, 10),
      new THREE.Vector3(10, 2, 10),
    ];
    lightPositions.forEach((pos, idx) => {
      const colors = [0xff7700, 0x00aaff];
      const light = new THREE.PointLight(colors[idx % 2], 2.5, 12);
      light.position.copy(pos);
      light.castShadow = true;
      this.scene.add(light);

      // Light post
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2, 0.3), new THREE.MeshStandardMaterial({ color: 0x222222 }));
      post.position.copy(pos);
      post.position.y = 1;
      this.scene.add(post);
    });
  }

  private initEnvironment() {
    // 1. Core floor (Kingdom Paved, Grasslands outside)
    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x558b2f, roughness: 0.9 }); // Dark grass green
    const ground = new THREE.Mesh(groundGeo, grassMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Kingdom paved town square center
    const kingdomRoadGeo = new THREE.PlaneGeometry(50, 50);
    const kingdomRoadMat = new THREE.MeshStandardMaterial({ color: 0x5a6268, roughness: 0.8 }); // Slate paved road
    const kingdomRoad = new THREE.Mesh(kingdomRoadGeo, kingdomRoadMat);
    kingdomRoad.rotation.x = -Math.PI / 2;
    kingdomRoad.position.set(0, 0.01, 0); // Z-fighting fix
    kingdomRoad.receiveShadow = true;
    this.scene.add(kingdomRoad);

    // 2. Kingdom Walls (Safe boundaries, Z: -25 to 25, X: -25 to 25)
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x3e4a56, roughness: 0.9 });
    const wallHeight = 5;
    const blockWidth = 2.5;

    for (let i = -25; i <= 25; i += blockWidth) {
      // North Wall
      const wN = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, wallHeight, blockWidth), wallMat);
      wN.position.set(i, wallHeight / 2, -25);
      wN.castShadow = true; wN.receiveShadow = true;
      this.scene.add(wN);

      // West Wall
      const wW = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, wallHeight, blockWidth), wallMat);
      wW.position.set(-25, wallHeight / 2, i);
      wW.castShadow = true; wW.receiveShadow = true;
      this.scene.add(wW);

      // East Wall
      const wE = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, wallHeight, blockWidth), wallMat);
      wE.position.set(25, wallHeight / 2, i);
      wE.castShadow = true; wE.receiveShadow = true;
      this.scene.add(wE);

      // South Wall with central gate opening at X = [-5, 5]
      if (Math.abs(i) > 4) {
        const wS = new THREE.Mesh(new THREE.BoxGeometry(blockWidth, wallHeight, blockWidth), wallMat);
        wS.position.set(i, wallHeight / 2, 25);
        wS.castShadow = true; wS.receiveShadow = true;
        this.scene.add(wS);
      }
    }

    // Corner Watchtowers
    const corners = [
      [-25, -25],
      [25, -25],
      [-25, 25],
      [25, 25],
    ];
    corners.forEach((coord) => {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(3.5, 8, 3.5), wallMat);
      tower.position.set(coord[0], 4, coord[1]);
      tower.castShadow = true; tower.receiveShadow = true;
      this.scene.add(tower);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(2.5, 3, 4), new THREE.MeshStandardMaterial({ color: 0x8b0000, roughness: 0.9 }));
      roof.position.set(coord[0], 9.5, coord[1]);
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      this.scene.add(roof);
    });

    // 3. Kingdom Town Houses (Safe Zone decorations)
    const houseMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xc2b280 }), // beige
      new THREE.MeshStandardMaterial({ color: 0x8b5a2b }), // brown wood
      new THREE.MeshStandardMaterial({ color: 0xd3d3d3 }), // stone white
    ];
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x8b2500, roughness: 0.95 }); // dark red tiles

    // House 1
    this.createHouse(new THREE.Vector3(-14, 0, -12), 4, 3.5, 4, houseMaterials[0], roofMat);
    // House 2
    this.createHouse(new THREE.Vector3(-15, 0, 10), 4, 3, 5, houseMaterials[1], roofMat);
    // House 3
    this.createHouse(new THREE.Vector3(14, 0, -10), 5, 4, 4, houseMaterials[2], roofMat);

    // 4. Relic Merchant Pedestal/Table
    const table = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 1.2), new THREE.MeshStandardMaterial({ color: 0x4a2711, roughness: 0.9 }));
    table.position.copy(this.merchantPos).add(new THREE.Vector3(0, 0.5, 1.0));
    table.castShadow = true; table.receiveShadow = true;
    this.scene.add(table);

    // Map Table next to Merchant
    const mapTablePos = new THREE.Vector3(2.0, 0, 5.0);
    const mTable = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.9, 1.5), new THREE.MeshStandardMaterial({ color: 0x4a2711, roughness: 0.9 }));
    mTable.position.copy(mapTablePos).add(new THREE.Vector3(0, 0.45, 0));
    mTable.castShadow = true; mTable.receiveShadow = true;
    this.scene.add(mTable);

    // Parchment map rolled out on table
    const mapParchment = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 1.2), new THREE.MeshStandardMaterial({ color: 0xf5eccd, roughness: 0.9 }));
    mapParchment.position.copy(mapTablePos).add(new THREE.Vector3(0, 0.92, 0));
    mapParchment.castShadow = true;
    this.scene.add(mapParchment);

    // Visual indicators/miniatures on the map
    const miniKingdom = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.15, 0.2), new THREE.MeshStandardMaterial({ color: 0x3e4a56 }));
    miniKingdom.position.copy(mapTablePos).add(new THREE.Vector3(-0.3, 0.95, -0.2));
    this.scene.add(miniKingdom);

    const miniGrasslands = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.2), new THREE.MeshStandardMaterial({ color: 0x558b2f }));
    miniGrasslands.position.copy(mapTablePos).add(new THREE.Vector3(0.2, 0.95, 0.2));
    this.scene.add(miniGrasslands);

    // Paved path to South Gate
    const gatePath = new THREE.Mesh(new THREE.PlaneGeometry(8, 25), kingdomRoadMat);
    gatePath.rotation.x = -Math.PI / 2;
    gatePath.position.set(0, 0.015, 12.5);
    gatePath.receiveShadow = true;
    this.scene.add(gatePath);

    // 5. Scattered Trees & Obstacles in Grasslands (Combat Zone)
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x143d16, roughness: 0.9 });

    for (let i = 0; i < 40; i++) {
      const treeGroup = new THREE.Group();

      const trunkHeight = Math.random() * 2 + 2.5;
      const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.5, trunkHeight, 0.5), trunkMat);
      trunk.position.y = trunkHeight / 2;
      trunk.castShadow = true; trunk.receiveShadow = true;
      treeGroup.add(trunk);

      const foliageHeight = Math.random() * 2 + 2.5;
      const foliage = new THREE.Mesh(new THREE.ConeGeometry(1.5, foliageHeight, 4), foliageMat);
      foliage.position.y = trunkHeight + foliageHeight / 2 - 0.2;
      foliage.castShadow = true; foliage.receiveShadow = true;
      treeGroup.add(foliage);

      // Random position outside Kingdom
      let x = Math.random() * 100 - 50;
      let z = Math.random() * 100 - 50;

      while (Math.abs(x) < 27 && Math.abs(z) < 27) {
        x = Math.random() * 100 - 50;
        z = Math.random() * 100 - 50;
      }

      treeGroup.position.set(x, 0, z);
      this.scene.add(treeGroup);

      this.obstacleCircles.push({ x, z, radius: 0.4 });
    }
  }

  private createHouse(pos: THREE.Vector3, w: number, h: number, d: number, wallMat: THREE.Material, roofMat: THREE.Material) {
    const houseGroup = new THREE.Group();

    const base = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
    base.position.y = h / 2;
    base.castShadow = true; base.receiveShadow = true;
    houseGroup.add(base);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w, d) * 0.8, 2, 4), roofMat);
    roof.position.y = h + 1;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    houseGroup.add(roof);

    houseGroup.position.copy(pos);
    this.scene.add(houseGroup);
  }

  private initPlayer() {
    this.player = new CubistCharacter('player');
    this.player.meshGroup.position.set(0, 0, 0);
    this.scene.add(this.player.meshGroup);

    // Spawn Merchant
    this.merchant = new CubistCharacter('merchant');
    this.merchant.meshGroup.position.copy(this.merchantPos);
    this.merchant.meshGroup.rotation.y = Math.PI;
    this.scene.add(this.merchant.meshGroup);

    // Initial Camera position
    this.camera.position.set(0, 8, 12);
  }

  private initInput() {
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      this.keys[key] = true;

      // Jump
      if (e.key === ' ' && !this.isJumping) {
        this.verticalVelocity = this.jumpForce;
        this.isJumping = true;
      }

      // Toggle Spellbook (using 'K' instead of 'Tab' for browser compatibility)
      if (key === 'k') {
        e.preventDefault();
        this.toggleSpellbook();
      }

      // Shop Interact
      if (key === 'e') {
        const dist = this.playerPos.distanceTo(this.merchantPos);
        if (dist < 3.0) {
          this.toggleShop();
        }
      }

      // Travel Map Interact
      if (key === 'm') {
        const dist = this.playerPos.distanceTo(new THREE.Vector3(2.0, 0, 5.0));
        if (dist < 3.0) {
          this.toggleTravel();
        }
      }

      // Escape close all UI
      if (e.key === 'Escape') {
        this.isSpellbookOpen = false;
        document.getElementById('spellbook-overlay')!.style.display = 'none';
        this.isShopOpen = false;
        document.getElementById('shop-overlay')!.style.display = 'none';
        this.isTravelOpen = false;
        document.getElementById('travel-overlay')!.style.display = 'none';
        if (this.isPaused) {
          this.togglePause();
        }
      }

      // '=' Pause Button
      if (key === '=') {
        this.togglePause();
      }

      // Skill casts (Keyboard)
      if (key === '1' && this.gameStarted && !this.isShopOpen && !this.isSpellbookOpen && !this.isPaused) {
        this.castBasic();
      }
      if (key === '2' && this.gameStarted && !this.isShopOpen && !this.isSpellbookOpen && !this.isPaused) {
        this.castCombo();
      }
      if ((key === '3' || key === 'r') && this.gameStarted && !this.isShopOpen && !this.isSpellbookOpen && !this.isPaused) {
        this.castSkill();
      }
      if ((key === '4' || key === 'f') && this.gameStarted && !this.isShopOpen && !this.isSpellbookOpen && !this.isPaused) {
        this.castUltimate();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    // Mouse scrollwheel zoom
    window.addEventListener('wheel', (e) => {
      this.cameraRadius = Math.max(4.0, Math.min(22.0, this.cameraRadius + e.deltaY * 0.015));
    });

    window.addEventListener('mousedown', (e) => {
      if (this.isShopOpen || this.isSpellbookOpen || this.isPaused || !this.gameStarted || this.playerHealth <= 0) return;

      if (e.button === 0) {
        // Left-Click: Basic Cast
        this.castBasic();
      } else if (e.button === 2) {
        // Right-Click: Magic Combo
        this.castCombo();
      }
    });

    // Capture damage events
    window.addEventListener('goblinAttack', (e: any) => {
      const goblin = e.detail.goblin as Goblin;
      this.handlePlayerHurt(goblin.position, 10);
    });
  }

  private initUI() {
    // 1. Grimoire Selection menu on startup
    const uiLayer = document.getElementById('ui-layer')!;
    uiLayer.innerHTML = `
      <div class="selection-overlay" id="ceremony-menu">
        <div class="selection-box">
          <div class="selection-title">GRIMOIRE CEREMONY</div>
          <p style="color: #a8b2c1; margin-bottom: 20px;">Pick your Magic Attribute & roll for your Grimoire book cover!</p>

          <div style="font-weight: bold; color: #fff; text-align: left; margin-bottom: 5px;">Magic Attribute:</div>
          <div class="selection-row" id="attrib-row">
            <button class="selection-btn active" data-val="fire">🔥 Fire</button>
            <button class="selection-btn" data-val="ice">❄️ Ice</button>
            <button class="selection-btn" data-val="portal">🌀 Portal</button>
            <button class="selection-btn" data-val="beast">🐾 Beast</button>
            <button class="selection-btn" data-val="devil">😈 Anti-Magic</button>
          </div>

          <div style="font-weight: bold; color: #fff; text-align: left; margin-top: 20px; margin-bottom: 5px;">Grimoire Quality:</div>
          <div style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 10px;">
            <div id="grimoire-result" style="font-size: 1.4rem; font-weight: bold; color: #ffeb3b;">??? Grimoire</div>
            <div id="grimoire-buffs" style="font-size: 0.85rem; color: #a8b2c1; margin-top: 5px;">Select an attribute and roll!</div>
          </div>

          <button class="roll-btn" id="roll-grimoire-btn">Roll Grimoire Cover</button>
          <br>
          <button class="start-game-btn" id="start-game-btn" disabled>Enter Kingdom</button>
        </div>
      </div>

      <!-- Persistent HUD -->
      <div class="hud-panel" id="player-hud" style="display: none; align-self: flex-start; z-index: 5;">
        <h1 id="hud-title">WIZARD KNIGHT</h1>
        <div>Grimoire: <span id="hud-grimoire-type" style="color: #f9d423; font-weight: bold;">-</span></div>
        <div>Health: <span id="health-val">100</span> / <span id="maxhealth-val">100</span></div>
        <div class="health-bar-container">
          <div class="health-bar" id="player-health" style="width: 100%"></div>
        </div>
        <div style="margin-top: 10px;">Gold / Shards: <span id="gold-val" style="color: #f9d423; font-weight: bold;">0</span></div>
        <div>Active Goblins & Mages: <span id="goblins-active-val" style="color: #76b041;">0</span></div>
        <div>Current Wave: <span id="wave-val" style="color: #ff4b2b;">1</span></div>
        <div style="color: #ccc; font-size: 0.85rem; margin-top: 5px; font-style: italic;">Press K to inspect Spellbook</div>
      </div>

      <!-- Spawner warning -->
      <div id="spawner-countdown" style="display: none; align-self: center; background: rgba(0,0,0,0.85); border: 2px solid #ff4b2b; padding: 15px 30px; border-radius: 12px; text-align: center; box-shadow: 0 0 20px rgba(255,75,43,0.4); z-index: 5;">
        <h2 style="margin: 0; color: #ff4b2b; font-size: 1.8rem; letter-spacing: 2px;">GOBLINS DOUBLING!</h2>
        <p style="margin: 5px 0 0 0; font-size: 1.2rem;">Next wave spawning in <span id="timer-val" style="font-weight: bold; color: #fff;">5.0</span>s</p>
      </div>

      <!-- MMO Hotbar (Bottom Center) -->
      <div class="mmo-hotbar" id="mmo-hotbar" style="display: none;">
        <div class="hotbar-slot" id="slot-basic">
          <div class="hotbar-icon" id="icon-basic">🔥</div>
          <div class="hotbar-key">1 / L-Click</div>
          <div class="hotbar-name" id="name-basic">Basic Cast</div>
          <div class="cooldown-overlay" id="cd-basic" style="display: none;"></div>
        </div>
        <div class="hotbar-slot" id="slot-combo">
          <div class="hotbar-icon" id="icon-combo">☄️</div>
          <div class="hotbar-key">2</div>
          <div class="hotbar-name" id="name-combo">Magic Combo</div>
          <div class="cooldown-overlay" id="cd-combo" style="display: none;"></div>
        </div>
        <div class="hotbar-slot" id="slot-skill">
          <div class="hotbar-icon" id="icon-skill">🌋</div>
          <div class="hotbar-key">3 / R</div>
          <div class="hotbar-name" id="name-skill">Spell Skill</div>
          <div class="cooldown-overlay" id="cd-skill" style="display: none;"></div>
        </div>
        <div class="hotbar-slot" id="slot-ultimate">
          <div class="hotbar-icon" id="icon-ultimate">💥</div>
          <div class="hotbar-key">4 / F</div>
          <div class="hotbar-name" id="name-ultimate">Ultimate Spell</div>
          <div class="cooldown-overlay" id="cd-ultimate" style="display: none;"></div>
        </div>
        <div class="hotbar-slot" id="slot-spellbook">
          <div class="hotbar-icon">📖</div>
          <div class="hotbar-key">K</div>
          <div class="hotbar-name">Spellbook Menu</div>
        </div>
      </div>

      <!-- Interactive Merchant Prompt -->
      <div class="merchant-prompt" id="merchant-prompt" style="display: none;">
        Merchant Pedestal <span style="color: #fff; background: #333; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; margin-left: 5px;">Press E</span>
      </div>

      <!-- Interactive Map Table Prompt -->
      <div class="merchant-prompt" id="map-prompt" style="display: none;">
        Map Table <span style="color: #fff; background: #333; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; margin-left: 5px;">Press M</span>
      </div>

      <!-- Relic Shop Overlay -->
      <div class="shop-overlay" id="shop-overlay" style="display: none;">
        <div class="shop-container" style="position: relative;">
          <button class="close-x-btn" id="shop-close-x">&times;</button>
          <h2 style="margin:0; font-size:2rem; color:#00ffcc;">Relic Merchant Shop</h2>
          <p style="color:#a8b2c1; margin-top:5px;">Purchase magical relics to permanently boost your stats. Current Gold: <span id="shop-gold" style="color:#f9d423; font-weight:bold;">0</span></p>
          <div class="shop-cards">
            <div class="shop-card">
              <div class="relic-icon">🛡️</div>
              <div class="relic-name">Amulet of Life</div>
              <div class="relic-desc">Increases max Health by +50.</div>
              <div class="relic-price">50 Gold</div>
              <button class="buy-btn" id="buy-amulet">Buy</button>
            </div>
            <div class="shop-card">
              <div class="relic-icon">💍</div>
              <div class="relic-name">Sorcerer Ring</div>
              <div class="relic-desc">Boosts magic Spell Damage by +25%.</div>
              <div class="relic-price">75 Gold</div>
              <button class="buy-btn" id="buy-ring">Buy</button>
            </div>
            <div class="shop-card">
              <div class="relic-icon">🥾</div>
              <div class="relic-name">Swift Boots</div>
              <div class="relic-desc">Increases travel Speed by +35%.</div>
              <div class="relic-price">60 Gold</div>
              <button class="buy-btn" id="buy-boots">Buy</button>
            </div>
          </div>
          <button class="start-game-btn" id="close-shop-btn" style="background:#ff4b2b; color:#fff; font-size:1rem; padding:10px 30px; margin-top:30px; box-shadow:none;">Close Shop</button>
        </div>
      </div>

      <!-- Parchment Spellbook Overlay -->
      <div class="spellbook-overlay" id="spellbook-overlay" style="display: none;">
        <div class="spellbook-book" style="position: relative;">
          <button class="close-x-btn-spellbook" id="spellbook-close-x">&times;</button>
          <!-- Page 1 -->
          <div class="spellbook-page">
            <div class="spellbook-title">MAGE GRIMOIRE</div>
            <div style="text-align: center; margin-bottom: 20px;">
              <span id="sb-leaf-type" style="font-size: 1.5rem; font-weight: bold; color: #795548;">3-Leaf Grimoire</span>
              <p id="sb-leaf-desc" style="font-style: italic; color: #5d4037; font-size: 0.9rem; margin-top: 5px;">A standard magic grimoire issued to Magic Knights.</p>
            </div>

            <h3 style="border-bottom: 1px solid #3e2723; padding-bottom:3px; margin-top:20px;">STATISTICS</h3>
            <div class="spellbook-stat"><span>Max Health:</span><span id="sb-stat-hp" style="font-weight:bold;">100</span></div>
            <div class="spellbook-stat"><span>Magic Power:</span><span id="sb-stat-power" style="font-weight:bold;">100%</span></div>
            <div class="spellbook-stat"><span>Speed Bonus:</span><span id="sb-stat-speed" style="font-weight:bold;">+0%</span></div>
            <div class="spellbook-stat"><span>Gold / Shards:</span><span id="sb-stat-gold" style="font-weight:bold; color: #b58900;">0</span></div>

            <h3 style="border-bottom: 1px solid #3e2723; padding-bottom:3px; margin-top:25px;">EQUIPPED RELICS</h3>
            <ul id="sb-relic-list" style="margin: 5px 0 0 15px; padding: 0; line-height: 1.5;">
              <li style="color: #6d4c41; font-style: italic;">No relics purchased yet</li>
            </ul>
          </div>

          <!-- Page 2 -->
          <div class="spellbook-page">
            <div class="spellbook-title">MAGIC SPELLS</div>
            <div id="sb-spells-list">
            </div>
          </div>
        </div>
      </div>

      <!-- Game Over overlay -->
      <div id="game-over-overlay" style="display: none; position: absolute; top:0; left:0; width:100vw; height:100vh; background: rgba(12, 15, 18, 0.85); backdrop-filter: blur(15px); flex-direction: column; justify-content: center; align-items: center; pointer-events: auto; z-index: 99;">
        <h1 style="font-size: 4rem; margin: 0 0 10px 0; background: linear-gradient(45deg, #ff416c, #ff4b2b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 0 30px rgba(255,65,108,0.5);">DEFEATED</h1>
        <p style="font-size: 1.5rem; margin: 0 0 30px 0; color: #a8b2c1; font-family: sans-serif;">You cleared Wave <span id="final-wave-val">1</span> with <span id="final-score-val">0</span> kills</p>
        <button id="restart-btn" style="background: linear-gradient(45deg, #ff4b2b, #ff416c); border: none; color: #fff; padding: 15px 40px; font-size: 1.2rem; border-radius: 30px; cursor: pointer; font-weight: bold; box-shadow: 0 5px 20px rgba(255,75,43,0.4); transition: transform 0.2s; font-family: sans-serif;">RESPAWN</button>
      </div>

      <!-- Pause Overlay -->
      <div id="pause-overlay" class="pause-overlay" style="display: none;">
        <h1 style="font-size: 3.5rem; margin: 0 0 10px 0; color: #00ffcc; text-shadow: 0 0 20px rgba(0,255,204,0.4);">GAME PAUSED</h1>
        <p style="font-size: 1.2rem; margin: 0 0 30px 0; color: #a8b2c1;">Press = or ESCAPE to resume</p>
        <button id="resume-btn" style="background: linear-gradient(45deg, #00ffcc, #0077ff); border: none; color: #111; padding: 12px 35px; font-size: 1.1rem; border-radius: 25px; cursor: pointer; font-weight: bold; box-shadow: 0 5px 15px rgba(0,255,204,0.3); transition: transform 0.2s;">RESUME</button>
      </div>

      <!-- Travel Map Overlay -->
      <div class="shop-overlay" id="travel-overlay" style="display: none;">
        <div class="shop-container" style="position: relative; max-width: 500px;">
          <button class="close-x-btn" id="travel-close-x">&times;</button>
          <h2 style="margin:0; font-size:2rem; color:#00ffcc;">Kingdom Travel Map</h2>
          <p style="color:#a8b2c1; margin-top:5px;">Select a zone to travel to instantly.</p>
          <div class="shop-cards" style="flex-direction: column; gap: 15px; margin-top: 25px;">
            <button class="start-game-btn" id="travel-kingdom" style="margin: 0; width: 100%; box-shadow: none; font-size: 1.1rem; background: linear-gradient(45deg, #00ffcc, #0077ff); color: #111;">🏰 Kingdom Square (Safe)</button>
            <button class="start-game-btn" id="travel-grasslands" style="margin: 0; width: 100%; box-shadow: none; font-size: 1.1rem; background: linear-gradient(45deg, #ff4b2b, #ff416c); color: #fff;">🌲 Clover Grasslands (Danger)</button>
            <button class="start-game-btn" id="travel-forest" style="margin: 0; width: 100%; box-shadow: none; font-size: 1.1rem; background: linear-gradient(45deg, #9c27b0, #e040fb); color: #fff;">🧙‍♀️ Witch's Forest (Combat Corner)</button>
          </div>
        </div>
      </div>

      <!-- Dynamic Zone Indicator -->
      <div class="zone-banner zone-safe" id="zone-banner">🏰 KINGDOM OF CLOVER (Safe Zone)</div>
    `;

    const attribBtns = document.querySelectorAll('#attrib-row button');
    attribBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        attribBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.magicAttribute = btn.getAttribute('data-val') as any;
        this.updateSpawnerHUDIcons();
      });
    });

    const rollBtn = document.getElementById('roll-grimoire-btn')!;
    rollBtn.addEventListener('click', () => {
      const rand = Math.random();
      let color = 0x5a2d91;
      if (rand < 0.15) {
        this.grimoireType = '5-leaf';
        document.getElementById('grimoire-result')!.innerText = '🍀 5-LEAF DEVIL GRIMOIRE';
        document.getElementById('grimoire-result')!.style.color = '#ff3333';
        document.getElementById('grimoire-buffs')!.innerHTML = 'Special Boost: **DOUBLE MAX HP** (+100 Base HP) & Devil powers!';
        color = 0x111111;
      } else if (rand < 0.45) {
        this.grimoireType = '4-leaf';
        document.getElementById('grimoire-result')!.innerText = '🍀 4-LEAF CLOVER GRIMOIRE';
        document.getElementById('grimoire-result')!.style.color = '#ffeb3b';
        document.getElementById('grimoire-buffs')!.innerHTML = 'Special Boost: **DOUBLE MAGIC POWER** (+100% Spell Damage)!';
        color = 0xd4af37;
      } else {
        this.grimoireType = '3-leaf';
        document.getElementById('grimoire-result')!.innerText = '🍀 3-LEAF GRIMOIRE';
        document.getElementById('grimoire-result')!.style.color = '#00ffcc';
        document.getElementById('grimoire-buffs')!.innerHTML = 'Standard Grimoire: Normal stats, standard spells.';
        color = 0x8b5a2b;
      }

      if (this.floatingGrimoire) {
        this.scene.remove(this.floatingGrimoire.meshGroup);
      }
      this.floatingGrimoire = new FloatingGrimoire(color, this.grimoireType);
      this.scene.add(this.floatingGrimoire.meshGroup);

      sounds.playBuy();
      document.getElementById('start-game-btn')!.removeAttribute('disabled');
    });

    document.getElementById('start-game-btn')!.addEventListener('click', () => {
      document.getElementById('ceremony-menu')!.style.display = 'none';
      document.getElementById('player-hud')!.style.display = 'block';
      document.getElementById('mmo-hotbar')!.style.display = 'flex';

      if (this.grimoireType === '5-leaf') {
        this.playerMaxHealth = 200;
        this.playerHealth = 200;
      } else if (this.grimoireType === '4-leaf') {
        this.magicPowerMultiplier = 2.0;
      }

      this.gameStarted = true;
      this.updateHUD();
      this.updateSpellbookContent();
    });

    document.getElementById('close-shop-btn')!.addEventListener('click', () => {
      this.toggleShop();
    });

    document.getElementById('buy-amulet')!.addEventListener('click', () => {
      if (this.gold >= 50 && !this.activeRelics.includes('Amulet of Life')) {
        this.gold -= 50;
        this.activeRelics.push('Amulet of Life');
        this.playerMaxHealth += 50;
        this.playerHealth += 50;
        sounds.playBuy();
        this.updateHUD();
        this.updateShopButtons();
        this.updateSpellbookContent();
      }
    });

    document.getElementById('buy-ring')!.addEventListener('click', () => {
      if (this.gold >= 75 && !this.activeRelics.includes('Sorcerer Ring')) {
        this.gold -= 75;
        this.activeRelics.push('Sorcerer Ring');
        this.magicPowerMultiplier += 0.25;
        sounds.playBuy();
        this.updateHUD();
        this.updateShopButtons();
        this.updateSpellbookContent();
      }
    });

    document.getElementById('buy-boots')!.addEventListener('click', () => {
      if (this.gold >= 60 && !this.activeRelics.includes('Swift Boots')) {
        this.gold -= 60;
        this.activeRelics.push('Swift Boots');
        this.speedMultiplier += 0.35;
        sounds.playBuy();
        this.updateHUD();
        this.updateShopButtons();
        this.updateSpellbookContent();
      }
    });

    document.getElementById('slot-basic')!.addEventListener('click', () => this.castBasic());
    document.getElementById('slot-combo')!.addEventListener('click', () => this.castCombo());
    document.getElementById('slot-skill')!.addEventListener('click', () => this.castSkill());
    document.getElementById('slot-ultimate')!.addEventListener('click', () => this.castUltimate());
    document.getElementById('slot-spellbook')!.addEventListener('click', () => this.toggleSpellbook());

    document.getElementById('shop-close-x')!.addEventListener('click', () => {
      this.toggleShop();
    });

    document.getElementById('spellbook-close-x')!.addEventListener('click', () => {
      this.toggleSpellbook();
    });

    document.getElementById('resume-btn')!.addEventListener('click', () => {
      this.togglePause();
    });

    document.getElementById('travel-close-x')!.addEventListener('click', () => {
      this.toggleTravel();
    });

    document.getElementById('travel-kingdom')!.addEventListener('click', () => {
      this.teleportPlayer(new THREE.Vector3(0, 0, 0), '🏰 Kingdom Square!');
    });

    document.getElementById('travel-grasslands')!.addEventListener('click', () => {
      this.teleportPlayer(new THREE.Vector3(0, 0, 32), '🌲 Clover Grasslands!');
    });

    document.getElementById('travel-forest')!.addEventListener('click', () => {
      this.teleportPlayer(new THREE.Vector3(45, 0, -45), '🧙‍♀️ Witch\'s Forest!');
    });

    document.getElementById('restart-btn')!.addEventListener('click', () => {
      this.resetGame();
    });
  }

  private updateSpawnerHUDIcons() {
    const icons = {
      fire: { basic: '🔥', combo: '☄️', skill: '🌋', ultimate: '💥' },
      ice: { basic: '❄️', combo: '💨', skill: '🧱', ultimate: '❄️' },
      portal: { basic: '🌀', combo: '🌌', skill: '⚡', ultimate: '🌠' },
      beast: { basic: '🐾', combo: '🦁', skill: '🐆', ultimate: '🐺' },
      devil: { basic: '😈', combo: '🖤', skill: '🛡️', ultimate: '👹' },
    };

    const names = {
      fire: { basic: 'Fireball', combo: 'Flame Burst', skill: 'Flame Pillar', ultimate: 'Crimson Inferno' },
      ice: { basic: 'Ice Spear', combo: 'Glacial Fan', skill: 'Ice Wall', ultimate: 'Frozen Kingdom' },
      portal: { basic: 'Portal Shot', combo: 'Void Rift', skill: 'Teleport Blink', ultimate: 'Infinite Portals' },
      beast: { basic: 'Claw Slash', combo: 'Beast Combo', skill: 'Beast Rush', ultimate: 'Giant Form' },
      devil: { basic: 'Anti-Magic Slash', combo: 'Demon Combo', skill: 'Spell Nullify', ultimate: 'Devil Union' },
    };

    const currentIcons = icons[this.magicAttribute];
    const currentNames = names[this.magicAttribute];

    document.getElementById('icon-basic')!.innerText = currentIcons.basic;
    document.getElementById('icon-combo')!.innerText = currentIcons.combo;
    document.getElementById('icon-skill')!.innerText = currentIcons.skill;
    document.getElementById('icon-ultimate')!.innerText = currentIcons.ultimate;

    document.getElementById('name-basic')!.innerText = currentNames.basic;
    document.getElementById('name-combo')!.innerText = currentNames.combo;
    document.getElementById('name-skill')!.innerText = currentNames.skill;
    document.getElementById('name-ultimate')!.innerText = currentNames.ultimate;
  }

  private updateShopButtons() {
    document.getElementById('shop-gold')!.innerText = String(this.gold);

    const bAmulet = document.getElementById('buy-amulet') as HTMLButtonElement;
    const bRing = document.getElementById('buy-ring') as HTMLButtonElement;
    const bBoots = document.getElementById('buy-boots') as HTMLButtonElement;

    if (this.activeRelics.includes('Amulet of Life')) {
      bAmulet.innerText = 'Purchased';
      bAmulet.disabled = true;
    } else {
      bAmulet.innerText = 'Buy';
      bAmulet.disabled = this.gold < 50;
    }

    if (this.activeRelics.includes('Sorcerer Ring')) {
      bRing.innerText = 'Purchased';
      bRing.disabled = true;
    } else {
      bRing.innerText = 'Buy';
      bRing.disabled = this.gold < 75;
    }

    if (this.activeRelics.includes('Swift Boots')) {
      bBoots.innerText = 'Purchased';
      bBoots.disabled = true;
    } else {
      bBoots.innerText = 'Buy';
      bBoots.disabled = this.gold < 60;
    }
  }

  private updateSpellbookContent() {
    const grimoires = {
      '3-leaf': { title: '3-Leaf Clover Grimoire', desc: 'A standard magic grimoire issued to Magic Knights.' },
      '4-leaf': { title: '4-Leaf Clover Grimoire', desc: 'A legendary grimoire said to bring good luck. Doubles your magic power.' },
      '5-leaf': { title: '5-Leaf Clover Grimoire', desc: 'In the fifth leaf resides a devil. Grants massive HP boost and anti-magic Union capabilities.' },
    };

    const gInfo = grimoires[this.grimoireType];
    document.getElementById('sb-leaf-type')!.innerText = gInfo.title;
    document.getElementById('sb-leaf-desc')!.innerText = gInfo.desc;
    document.getElementById('sb-stat-hp')!.innerText = `${this.playerHealth} / ${this.playerMaxHealth}`;
    document.getElementById('sb-stat-power')!.innerText = `${Math.round(this.magicPowerMultiplier * 100)}%`;
    document.getElementById('sb-stat-speed')!.innerText = `+${Math.round((this.speedMultiplier - 1.0) * 100)}%`;
    document.getElementById('sb-stat-gold')!.innerText = String(this.gold);

    const relicList = document.getElementById('sb-relic-list')!;
    if (this.activeRelics.length === 0) {
      relicList.innerHTML = `<li style="color: #6d4c41; font-style: italic;">No relics purchased yet</li>`;
    } else {
      relicList.innerHTML = this.activeRelics.map((r) => `<li style="font-weight: bold; color: #2e7d32;">✨ ${r}</li>`).join('');
    }

    const spellTexts = {
      fire: `
        <div class="spell-card-item">
          <div class="spell-card-name">🔥 Fireball <span class="spell-card-binding">(L-Click)</span></div>
          <div class="spell-card-desc">Shoot a fast glowing fireball dealing 15 * Power damage. Cooldown: 0.2s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">☄️ Flame Burst <span class="spell-card-binding">(Shift)</span></div>
          <div class="spell-card-desc">Shoot 3 fireballs in rapid succession. Cooldown: 2.5s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">🌋 Flame Pillar <span class="spell-card-binding">(R)</span></div>
          <div class="spell-card-desc">Conjures a fiery pillar that burns enemies standing inside it over 3 seconds. Cooldown: 7.0s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">💥 Crimson Inferno <span class="spell-card-binding">(F)</span></div>
          <div class="spell-card-desc">Launch a massive fire vortex that pulls Goblins inside and deals heavy ultimate damage. Cooldown: 15.0s</div>
        </div>
      `,
      ice: `
        <div class="spell-card-item">
          <div class="spell-card-name">❄️ Ice Spear <span class="spell-card-binding">(L-Click)</span></div>
          <div class="spell-card-desc">Launches a rapid piercing cone of ice dealing 12 * Power damage. Cooldown: 0.2s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">💨 Glacial Fan <span class="spell-card-binding">(Shift)</span></div>
          <div class="spell-card-desc">Casts a spreading fan of three ice spears. Cooldown: 2.0s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">🧱 Ice Wall <span class="spell-card-binding">(R)</span></div>
          <div class="spell-card-desc">Summons a solid wall of ice in front of you that blocks enemies from passing for 4s. Cooldown: 8.0s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">❄️ Frozen Kingdom <span class="spell-card-binding">(F)</span></div>
          <div class="spell-card-desc">Instantly freezes all surrounding enemies in place for 4 seconds, dealing tick damage. Cooldown: 18.0s</div>
        </div>
      `,
      portal: `
        <div class="spell-card-item">
          <div class="spell-card-name">🌀 Portal Shot <span class="spell-card-binding">(L-Click)</span></div>
          <div class="spell-card-desc">Shoots a spatial portal orb dealing 18 * Power damage. Cooldown: 0.3s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">🌌 Void Rift <span class="spell-card-binding">(Shift)</span></div>
          <div class="spell-card-desc">Creates a portal rift that pulls nearby enemies toward its center for 2s. Cooldown: 3.0s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">⚡ Teleport Blink <span class="spell-card-binding">(R)</span></div>
          <div class="spell-card-desc">Instantly teleports you 8 units forward in the direction you face. Cooldown: 4.0s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">🌠 Infinite Portals <span class="spell-card-binding">(F)</span></div>
          <div class="spell-card-desc">Spawns portals above that rain down magic rays onto random enemies. Cooldown: 16.0s</div>
        </div>
      `,
      beast: `
        <div class="spell-card-item">
          <div class="spell-card-name">🐾 Claw Slash <span class="spell-card-binding">(L-Click)</span></div>
          <div class="spell-card-desc">A swipe of animal magic dealing 22 * Power damage. Cooldown: 0.25s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">🦁 Beast Combo <span class="spell-card-binding">(Shift)</span></div>
          <div class="spell-card-desc">Unleashes a rapid triple claw sweep. Cooldown: 1.8s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">🐆 Beast Rush <span class="spell-card-binding">(R)</span></div>
          <div class="spell-card-desc">Charge forward at speed, damaging all Goblins along your pathway. Cooldown: 7.0s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">🐺 Giant Beast Form <span class="spell-card-binding">(F)</span></div>
          <div class="spell-card-desc">Grow in size, gain 100 extra HP, and double your magic spell damage for 10 seconds. Cooldown: 20.0s</div>
        </div>
      `,
      devil: `
        <div class="spell-card-item">
          <div class="spell-card-name">😈 Anti-Magic Slash <span class="spell-card-binding">(L-Click)</span></div>
          <div class="spell-card-desc">Shoots a black slice wave that clears enemy fireballs in its path. Cooldown: 0.2s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">🖤 Demon Combo <span class="spell-card-binding">(Shift)</span></div>
          <div class="spell-card-desc">A circular sweep of black anti-magic hitting all surrounding mobs. Cooldown: 3.5s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">🛡️ Spell Nullify <span class="spell-card-binding">(R)</span></div>
          <div class="spell-card-desc">Summons an invulnerability shield for 3 seconds that deletes enemy fireballs. Cooldown: 10.0s</div>
        </div>
        <div class="spell-card-item">
          <div class="spell-card-name">👹 Devil Union <span class="spell-card-binding">(F)</span></div>
          <div class="spell-card-desc">Merge with your devil: grow wings, make spell damage 3x, and halve all cooldowns for 8s. Cooldown: 25.0s</div>
        </div>
      `,
    };

    document.getElementById('sb-spells-list')!.innerHTML = spellTexts[this.magicAttribute];
  }

  private toggleSpellbook() {
    this.isSpellbookOpen = !this.isSpellbookOpen;
    const el = document.getElementById('spellbook-overlay')!;
    el.style.display = this.isSpellbookOpen ? 'flex' : 'none';
    if (this.isSpellbookOpen) {
      this.isShopOpen = false;
      document.getElementById('shop-overlay')!.style.display = 'none';
      this.updateSpellbookContent();
    }
  }

  private toggleShop() {
    this.isShopOpen = !this.isShopOpen;
    const el = document.getElementById('shop-overlay')!;
    el.style.display = this.isShopOpen ? 'flex' : 'none';
    if (this.isShopOpen) {
      this.isSpellbookOpen = false;
      document.getElementById('spellbook-overlay')!.style.display = 'none';
      this.updateShopButtons();
    }
  }

  private togglePause() {
    if (!this.gameStarted || this.playerHealth <= 0) return;
    this.isPaused = !this.isPaused;
    const el = document.getElementById('pause-overlay')!;
    el.style.display = this.isPaused ? 'flex' : 'none';
    if (this.isPaused) {
      this.isSpellbookOpen = false;
      document.getElementById('spellbook-overlay')!.style.display = 'none';
      this.isShopOpen = false;
      document.getElementById('shop-overlay')!.style.display = 'none';
      this.isTravelOpen = false;
      document.getElementById('travel-overlay')!.style.display = 'none';
    }
  }

  private toggleTravel() {
    if (!this.gameStarted || this.playerHealth <= 0) return;
    this.isTravelOpen = !this.isTravelOpen;
    const el = document.getElementById('travel-overlay')!;
    el.style.display = this.isTravelOpen ? 'flex' : 'none';
    if (this.isTravelOpen) {
      this.isSpellbookOpen = false;
      document.getElementById('spellbook-overlay')!.style.display = 'none';
      this.isShopOpen = false;
      document.getElementById('shop-overlay')!.style.display = 'none';
      this.isPaused = false;
      document.getElementById('pause-overlay')!.style.display = 'none';
    }
  }

  private teleportPlayer(targetPos: THREE.Vector3, zoneName: string) {
    this.playerPos.copy(targetPos);
    this.player.meshGroup.position.copy(targetPos);
    this.createSpawnParticles(targetPos);
    this.createFloatingText(zoneName, targetPos, '#00ffcc');
    sounds.playSpellCast();
    this.toggleTravel();
  }

  // ==========================================
  // Magic Spell Casting Logic
  // ==========================================
  private triggerCastEffect() {
    sounds.playSpellCast();
    if (this.floatingGrimoire) {
      this.floatingGrimoire.setOpen(true);
      setTimeout(() => {
        if (this.floatingGrimoire) this.floatingGrimoire.setOpen(false);
      }, 350);
    }
    this.player.rightArm.rotation.x = -Math.PI / 2;
    setTimeout(() => {
      if (this.playerHealth > 0) this.player.rightArm.rotation.x = 0;
    }, 250);
  }

  private castBasic() {
    if (this.cooldowns.basic > 0) return;
    this.cooldowns.basic = this.maxCooldowns.basic;

    this.triggerCastEffect();

    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.meshGroup.quaternion).normalize();
    const spawnPos = new THREE.Vector3().copy(this.playerPos).add(new THREE.Vector3(0, 1.2, 0)).addScaledVector(forward, 0.5);

    if (this.magicAttribute === 'fire') {
      this.spawnProjectile(spawnPos, forward.multiplyScalar(15), 15, 'fire');
    } else if (this.magicAttribute === 'ice') {
      this.spawnProjectile(spawnPos, forward.multiplyScalar(20), 12, 'ice');
    } else if (this.magicAttribute === 'portal') {
      this.spawnProjectile(spawnPos, forward.multiplyScalar(14), 18, 'portal');
    } else if (this.magicAttribute === 'beast') {
      this.castMeleeClaw(22);
    } else if (this.magicAttribute === 'devil') {
      this.spawnProjectile(spawnPos, forward.multiplyScalar(18), 25, 'anti-magic');
    }
  }

  private castCombo() {
    if (this.cooldowns.combo > 0) return;
    this.cooldowns.combo = this.maxCooldowns.combo;

    this.triggerCastEffect();

    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.meshGroup.quaternion).normalize();
    const spawnPos = new THREE.Vector3().copy(this.playerPos).add(new THREE.Vector3(0, 1.2, 0)).addScaledVector(forward, 0.5);

    if (this.magicAttribute === 'fire') {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          if (this.playerHealth <= 0) return;
          const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.meshGroup.quaternion).normalize();
          const sp = new THREE.Vector3().copy(this.playerPos).add(new THREE.Vector3(0, 1.2, 0)).addScaledVector(fwd, 0.5);
          this.spawnProjectile(sp, fwd.multiplyScalar(16), 18, 'fire');
        }, i * 150);
      }
    } else if (this.magicAttribute === 'ice') {
      const angles = [-0.2, 0, 0.2];
      angles.forEach((ang) => {
        const fwd = forward.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), ang);
        this.spawnProjectile(spawnPos, fwd.multiplyScalar(20), 14, 'ice');
      });
    } else if (this.magicAttribute === 'portal') {
      this.spawnProjectile(spawnPos, forward.multiplyScalar(10), 20, 'portal', false, true);
    } else if (this.magicAttribute === 'beast') {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          if (this.playerHealth <= 0) return;
          this.castMeleeClaw(26);
        }, i * 180);
      }
    } else if (this.magicAttribute === 'devil') {
      this.castCircularSweep(35);
    }
  }

  private castSkill() {
    if (this.cooldowns.skill > 0) return;
    this.cooldowns.skill = this.maxCooldowns.skill;

    this.triggerCastEffect();

    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.meshGroup.quaternion).normalize();

    if (this.magicAttribute === 'fire') {
      const targetPos = new THREE.Vector3().copy(this.playerPos).addScaledVector(forward, 5.0);
      this.spawnFlamePillar(targetPos);
    } else if (this.magicAttribute === 'ice') {
      const targetPos = new THREE.Vector3().copy(this.playerPos).addScaledVector(forward, 3.0);
      this.spawnIceWall(targetPos);
    } else if (this.magicAttribute === 'portal') {
      const targetPos = new THREE.Vector3().copy(this.playerPos).addScaledVector(forward, 8.0);
      targetPos.x = Math.max(-this.boundaries, Math.min(this.boundaries, targetPos.x));
      targetPos.z = Math.max(-this.boundaries, Math.min(this.boundaries, targetPos.z));

      this.createSpawnParticles(this.playerPos);
      this.playerPos.copy(targetPos);
      this.player.meshGroup.position.copy(targetPos);
      this.createSpawnParticles(targetPos);
    } else if (this.magicAttribute === 'beast') {
      this.triggerBeastRush();
    } else if (this.magicAttribute === 'devil') {
      this.triggerNullifyShield();
    }
  }

  private castUltimate() {
    if (this.cooldowns.ultimate > 0) return;
    this.cooldowns.ultimate = this.maxCooldowns.ultimate;

    this.triggerCastEffect();

    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.meshGroup.quaternion).normalize();

    if (this.magicAttribute === 'fire') {
      const spawnPos = new THREE.Vector3().copy(this.playerPos).add(new THREE.Vector3(0, 1.2, 0)).addScaledVector(forward, 1.0);
      this.spawnProjectile(spawnPos, forward.multiplyScalar(6), 65, 'fire', false, false, true);
    } else if (this.magicAttribute === 'ice') {
      this.triggerFrozenKingdom();
    } else if (this.magicAttribute === 'portal') {
      this.triggerInfinitePortals();
    } else if (this.magicAttribute === 'beast') {
      this.triggerGiantForm();
    } else if (this.magicAttribute === 'devil') {
      this.triggerDevilUnion();
    }
  }

  // ==========================================
  // Projectile & Skill Spawners
  // ==========================================
  private spawnProjectile(
    pos: THREE.Vector3,
    vel: THREE.Vector3,
    dmg: number,
    type: 'fire' | 'ice' | 'portal' | 'beast' | 'anti-magic',
    isEnemy = false,
    isRift = false,
    isInferno = false
  ) {
    let geo: THREE.BufferGeometry;
    let mat: THREE.MeshStandardMaterial;

    if (type === 'fire') {
      const radius = isInferno ? 1.5 : 0.25;
      geo = new THREE.SphereGeometry(radius, 8, 8);
      mat = new THREE.MeshStandardMaterial({
        color: 0xff3300,
        emissive: 0xff3300,
        roughness: 0.1,
      });
    } else if (type === 'ice') {
      geo = new THREE.ConeGeometry(0.12, 0.7, 4);
      mat = new THREE.MeshStandardMaterial({
        color: 0x00ccff,
        emissive: 0x0044ff,
        roughness: 0.1,
      });
    } else if (type === 'portal') {
      geo = isRift ? new THREE.SphereGeometry(1.2, 8, 8) : new THREE.TorusGeometry(0.2, 0.05, 4, 8);
      mat = new THREE.MeshStandardMaterial({
        color: 0x9c27b0,
        emissive: 0x4a148c,
        roughness: 0.1,
      });
    } else {
      geo = new THREE.BoxGeometry(1.8, 0.15, 0.4);
      mat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: 0x330000,
        roughness: 0.8,
      });
    }

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    mesh.castShadow = true;
    this.scene.add(mesh);

    if (type === 'ice') {
      mesh.rotation.x = Math.PI / 2;
    } else if (type === 'anti-magic') {
      mesh.rotation.y = this.player.meshGroup.rotation.y;
    }

    const light = new THREE.PointLight(mat.color.getHex(), isInferno ? 3.0 : 1.5, isInferno ? 8 : 4);
    mesh.add(light);

    this.projectiles.push({
      mesh,
      velocity: vel,
      damage: Math.round(dmg * this.magicPowerMultiplier),
      owner: isEnemy ? 'enemy' : 'player',
      life: isInferno ? 3.0 : (isRift ? 2.0 : 1.5),
      maxLife: isInferno ? 3.0 : (isRift ? 2.0 : 1.5),
      type,
      isRift,
    });
  }

  private spawnFlamePillar(pos: THREE.Vector3) {
    const geo = new THREE.CylinderGeometry(1.6, 1.6, 4.0, 8, 1, true);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xff5722,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    mesh.position.y = 2.0;
    this.scene.add(mesh);

    const light = new THREE.PointLight(0xff5722, 3, 10);
    mesh.add(light);

    this.projectiles.push({
      mesh,
      velocity: new THREE.Vector3(),
      damage: Math.round(6 * this.magicPowerMultiplier),
      owner: 'player',
      life: 3.0,
      maxLife: 3.0,
      type: 'fire',
      isWall: true,
    });
  }

  private spawnIceWall(pos: THREE.Vector3) {
    const geo = new THREE.BoxGeometry(3.5, 2.2, 0.8);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x80deea,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    mesh.position.y = 1.1;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    this.projectiles.push({
      mesh,
      velocity: new THREE.Vector3(),
      damage: 0,
      owner: 'player',
      life: 4.0,
      maxLife: 4.0,
      type: 'ice',
      isWall: true,
    });

    this.createSpawnParticles(pos);
  }

  private castMeleeClaw(dmg: number) {
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.meshGroup.quaternion).normalize();
    const swipeCenter = new THREE.Vector3().copy(this.playerPos).addScaledVector(forward, 1.3);

    const geo = new THREE.BoxGeometry(1.6, 0.4, 0.1);
    const mat = new THREE.MeshBasicMaterial({ color: 0x4caf50, transparent: true, opacity: 0.8 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(swipeCenter).add(new THREE.Vector3(0, 1.0, 0));
    mesh.rotation.y = this.player.meshGroup.rotation.y;
    mesh.rotation.z = 0.3;
    this.scene.add(mesh);

    let life = 0.15;
    const animateSlash = () => {
      life -= 0.016;
      mesh.scale.x += 0.15;
      mat.opacity = life / 0.15;
      if (life > 0) {
        requestAnimationFrame(animateSlash);
      } else {
        this.scene.remove(mesh);
        geo.dispose();
        mat.dispose();
      }
    };
    animateSlash();

    this.goblins.concat(this.mages as any).forEach((enemy: any) => {
      if (enemy.isDead) return;
      const dist = swipeCenter.distanceTo(enemy.position);
      if (dist < 2.0) {
        const knockbackDir = new THREE.Vector3().subVectors(enemy.position, this.playerPos).normalize();
        knockbackDir.y = 0.15;
        const totalDmg = Math.round(dmg * this.magicPowerMultiplier);
        enemy.takeDamage(totalDmg, knockbackDir);
        this.createHitParticles(enemy.position);
        this.createFloatingText(`-${totalDmg}`, enemy.position, '#4caf50');
        this.checkWaveCompletion();
      }
    });
  }

  private castCircularSweep(dmg: number) {
    const geo = new THREE.RingGeometry(0.1, 3.2, 16);
    const mat = new THREE.MeshBasicMaterial({ color: 0x111111, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.copy(this.playerPos).add(new THREE.Vector3(0, 0.2, 0));
    this.scene.add(mesh);

    let life = 0.25;
    const animateSweep = () => {
      life -= 0.016;
      mesh.scale.x += 0.25;
      mesh.scale.y += 0.25;
      mat.opacity = life / 0.25;
      if (life > 0) {
        requestAnimationFrame(animateSweep);
      } else {
        this.scene.remove(mesh);
        geo.dispose();
        mat.dispose();
      }
    };
    animateSweep();

    this.goblins.concat(this.mages as any).forEach((enemy: any) => {
      if (enemy.isDead) return;
      const dist = this.playerPos.distanceTo(enemy.position);
      if (dist < 4.0) {
        const knockbackDir = new THREE.Vector3().subVectors(enemy.position, this.playerPos).normalize();
        knockbackDir.y = 0.2;
        const totalDmg = Math.round(dmg * this.magicPowerMultiplier);
        enemy.takeDamage(totalDmg, knockbackDir);
        this.createHitParticles(enemy.position);
        this.createFloatingText(`-${totalDmg}`, enemy.position, '#000000');
        this.checkWaveCompletion();
      }
    });
  }

  private triggerBeastRush() {
    this.isInvulnerable = true;
    this.invulnTimer = 0.4;
    this.speedMultiplier = 3.5;

    const timer = setInterval(() => {
      if (this.playerHealth <= 0) {
        clearInterval(timer);
        return;
      }
      this.createSpawnParticles(this.playerPos);
      
      this.goblins.concat(this.mages as any).forEach((enemy: any) => {
        if (enemy.isDead) return;
        const dist = this.playerPos.distanceTo(enemy.position);
        if (dist < 2.0) {
          const knockbackDir = new THREE.Vector3().subVectors(enemy.position, this.playerPos).normalize();
          const totalDmg = Math.round(30 * this.magicPowerMultiplier);
          enemy.takeDamage(totalDmg, knockbackDir);
          this.createFloatingText(`-${totalDmg}`, enemy.position, '#4caf50');
          this.checkWaveCompletion();
        }
      });
    }, 40);

    setTimeout(() => {
      clearInterval(timer);
      this.speedMultiplier = this.activeRelics.includes('Swift Boots') ? 1.35 : 1.0;
    }, 350);
  }

  private triggerNullifyShield() {
    this.isInvulnerable = true;
    this.invulnTimer = 3.0;

    const geo = new THREE.SphereGeometry(2.0, 16, 16);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.4,
      wireframe: true
    });
    this.nullifyShieldMesh = new THREE.Mesh(geo, mat);
    this.nullifyShieldMesh.position.copy(this.playerPos).add(new THREE.Vector3(0, 1.0, 0));
    this.scene.add(this.nullifyShieldMesh);
  }

  private triggerFrozenKingdom() {
    const geo = new THREE.RingGeometry(0.1, 12, 24);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.copy(this.playerPos).add(new THREE.Vector3(0, 0.1, 0));
    this.scene.add(mesh);

    let scale = 0.1;
    const anim = () => {
      scale += 0.8;
      mesh.scale.set(scale, scale, 1.0);
      mat.opacity = 1.0 - scale / 12.0;
      if (scale < 12) {
        requestAnimationFrame(anim);
      } else {
        this.scene.remove(mesh);
        geo.dispose();
        mat.dispose();
      }
    };
    anim();

    this.goblins.concat(this.mages as any).forEach((enemy: any) => {
      if (enemy.isDead) return;
      const dist = this.playerPos.distanceTo(enemy.position);
      if (dist < 12.0) {
        enemy.isFrozen = true;
        enemy.freezeTimer = 4.0;
        const totalDmg = Math.round(55 * this.magicPowerMultiplier);
        enemy.takeDamage(totalDmg, new THREE.Vector3(0, 0.1, 0));
        this.createFloatingText(`FROZEN! -${totalDmg}`, enemy.position, '#00e5ff');
        this.checkWaveCompletion();
      }
    });
  }

  private triggerInfinitePortals() {
    this.goblins.concat(this.mages as any).forEach((enemy: any, index) => {
      if (enemy.isDead || index >= 6) return;

      setTimeout(() => {
        if (enemy.isDead || this.playerHealth <= 0) return;
        const portalPos = new THREE.Vector3().copy(enemy.position).add(new THREE.Vector3(0, 5, 0));
        const pRing = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.1, 4, 12), new THREE.MeshBasicMaterial({ color: 0x9c27b0 }));
        pRing.position.copy(portalPos);
        pRing.rotation.x = Math.PI / 2;
        this.scene.add(pRing);

        const laser = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 5), new THREE.MeshBasicMaterial({ color: 0xff00ff }));
        laser.position.copy(portalPos).add(new THREE.Vector3(0, -2.5, 0));
        this.scene.add(laser);

        setTimeout(() => {
          this.scene.remove(pRing);
          this.scene.remove(laser);
          if (!enemy.isDead) {
            const totalDmg = Math.round(40 * this.magicPowerMultiplier);
            enemy.takeDamage(totalDmg, new THREE.Vector3(0, 0.2, 0));
            this.createFloatingText(`-${totalDmg}`, enemy.position, '#ff00ff');
            this.checkWaveCompletion();
          }
        }, 300);

      }, index * 250);
    });
  }

  private triggerGiantForm() {
    this.isGiantForm = true;
    this.giantFormTimer = 10.0;
    this.player.meshGroup.scale.set(2.2, 2.2, 2.2);
    this.playerMaxHealth += 100;
    this.playerHealth += 100;
    this.magicPowerMultiplier *= 2.0;

    this.updateHUD();
    this.createSpawnParticles(this.playerPos);
    this.createFloatingText('GIANT FORM!', this.playerPos, '#4caf50');
  }

  private triggerDevilUnion() {
    this.isDevilUnion = true;
    this.devilUnionTimer = 8.0;
    this.magicPowerMultiplier *= 3.0;
    this.playerHealth = Math.min(this.playerMaxHealth, this.playerHealth + 50);

    this.devilWings = new THREE.Group();
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 0.05), wingMat);
    wingL.position.set(-0.5, 1.2, -0.2);
    wingL.rotation.y = 0.4;
    const wingR = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 0.05), wingMat);
    wingR.position.set(0.5, 1.2, -0.2);
    wingR.rotation.y = -0.4;
    this.devilWings.add(wingL);
    this.devilWings.add(wingR);
    this.player.meshGroup.add(this.devilWings);

    this.player.meshGroup.traverse((child) => {
      if (child instanceof THREE.Mesh && child.name === 'eyes') {
        (child.material as any).emissive?.setHex(0x990000);
      }
    });

    this.updateHUD();
    this.createSpawnParticles(this.playerPos);
    this.createFloatingText('DEVIL UNION!', this.playerPos, '#7f0000');
  }

  private endGiantForm() {
    this.isGiantForm = false;
    this.player.meshGroup.scale.set(1.0, 1.0, 1.0);
    this.playerMaxHealth = Math.max(100, this.playerMaxHealth - 100);
    this.playerHealth = Math.min(this.playerMaxHealth, this.playerHealth);
    this.magicPowerMultiplier /= 2.0;
    this.updateHUD();
  }

  private endDevilUnion() {
    this.isDevilUnion = false;
    this.magicPowerMultiplier /= 3.0;

    if (this.devilWings) {
      this.player.meshGroup.remove(this.devilWings);
      this.devilWings = null;
    }

    this.player.meshGroup.traverse((child) => {
      if (child instanceof THREE.Mesh && child.name === 'eyes') {
        (child.material as any).emissive?.setHex(0x000000);
      }
    });
    this.updateHUD();
  }

  // ==========================================
  // Update Loop Integrations
  // ==========================================
  private updateGamepad(dt: number) {
    const gamepads = navigator.getGamepads();
    const gp = gamepads[0];
    if (!gp) return;

    if (this.prevGamepadButtons.length !== gp.buttons.length) {
      this.prevGamepadButtons = new Array(gp.buttons.length).fill(false);
    }

    const isButtonPressed = (index: number) => {
      const pressed = gp.buttons[index].pressed;
      const wasPressed = this.prevGamepadButtons[index];
      return pressed && !wasPressed;
    };

    const camAxisX = gp.axes[2];
    const camAxisY = gp.axes[3];
    if (Math.abs(camAxisX) > 0.15) {
      this.cameraAngle += camAxisX * 2.2 * dt;
    }
    if (Math.abs(camAxisY) > 0.15) {
      this.cameraRadius = Math.max(4.0, Math.min(22.0, this.cameraRadius + camAxisY * 12 * dt));
    }

    if (isButtonPressed(0) && !this.isJumping) {
      this.verticalVelocity = this.jumpForce;
      this.isJumping = true;
    }

    if (gp.buttons[7].pressed) {
      this.castBasic();
    }

    if (isButtonPressed(6)) {
      this.castCombo();
    }

    if (isButtonPressed(2)) {
      this.castSkill();
    }

    if (isButtonPressed(3)) {
      this.castUltimate();
    }

    if (isButtonPressed(8)) {
      this.toggleSpellbook();
    }

    if (isButtonPressed(1)) {
      const dist = this.playerPos.distanceTo(this.merchantPos);
      if (dist < 3.0) {
        this.toggleShop();
      }
    }

    for (let i = 0; i < gp.buttons.length; i++) {
      this.prevGamepadButtons[i] = gp.buttons[i].pressed;
    }
  }

  private handlePlayerHurt(_attackerPos: THREE.Vector3, dmg: number) {
    if (this.playerHealth <= 0 || !this.gameStarted) return;

    if (this.isInvulnerable) {
      this.createFloatingText('BLOCK!', this.playerPos, '#00ffcc');
      return;
    }

    this.playerHealth = Math.max(0, this.playerHealth - dmg);
    sounds.playHurt();

    document.body.style.backgroundColor = '#4a1111';
    setTimeout(() => {
      document.body.style.backgroundColor = '#0b0c10';
    }, 85);

    this.createFloatingText(`-${dmg}`, this.playerPos, '#ff4444');
    this.updateHUD();

    if (this.playerHealth <= 0) {
      this.gameOver();
    }
  }

  private spawnWave() {
    this.spawnCountdown = 0;
    document.getElementById('spawner-countdown')!.style.display = 'none';

    sounds.playSpawnWarning();

    const count = this.goblinsToSpawnNext;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8 + 14;
      const spawnPos = new THREE.Vector3(
        this.playerPos.x + Math.cos(angle) * radius,
        0,
        this.playerPos.z + Math.sin(angle) * radius
      );

      if (Math.abs(spawnPos.x) < 27 && Math.abs(spawnPos.z) < 27) {
        spawnPos.x += spawnPos.x > 0 ? 12 : -12;
        spawnPos.z += spawnPos.z > 0 ? 12 : -12;
      }

      spawnPos.x = Math.max(-this.boundaries + 3, Math.min(this.boundaries - 3, spawnPos.x));
      spawnPos.z = Math.max(-this.boundaries + 3, Math.min(this.boundaries - 3, spawnPos.z));

      if (i % 2 === 0) {
        const goblin = new Goblin(spawnPos);
        this.goblins.push(goblin);
        this.scene.add(goblin.character.meshGroup);
      } else {
        const mage = new Mage(spawnPos);
        this.mages.push(mage);
        this.scene.add(mage.character.meshGroup);
      }

      this.createSpawnParticles(spawnPos);
    }

    this.updateHUD();
  }

  private checkWaveCompletion() {
    const allDead = this.goblins.every((g) => g.isDead) && this.mages.every((m) => m.isDead);
    if (allDead) {
      setTimeout(() => {
        this.goblins.forEach((g) => this.scene.remove(g.character.meshGroup));
        this.mages.forEach((m) => this.scene.remove(m.character.meshGroup));
        this.goblins = [];
        this.mages = [];
      }, 1000);

      this.spawnCountdown = 5.0;
      this.goblinsToSpawnNext = this.goblinsToSpawnNext * 2;
      this.activeWave++;
      document.getElementById('spawner-countdown')!.style.display = 'block';
    }
  }

  private updateHUD() {
    if (this.score > this.highscore) {
      this.highscore = this.score;
    }
    document.getElementById('health-val')!.innerText = String(this.playerHealth);
    document.getElementById('maxhealth-val')!.innerText = String(this.playerMaxHealth);
    document.getElementById('player-health')!.style.width = `${(this.playerHealth / this.playerMaxHealth) * 100}%`;
    document.getElementById('gold-val')!.innerText = String(this.gold);
    document.getElementById('wave-val')!.innerText = String(this.activeWave);
    document.getElementById('hud-grimoire-type')!.innerText = this.grimoireType.toUpperCase();

    const activeCount = this.goblins.filter((g) => !g.isDead).length + this.mages.filter((m) => !m.isDead).length;
    document.getElementById('goblins-active-val')!.innerText = String(activeCount);
  }

  private updateCooldownsHUD() {
    const ids = ['basic', 'combo', 'skill', 'ultimate'];
    ids.forEach((id) => {
      const cd = this.cooldowns[id as keyof typeof this.cooldowns];
      const element = document.getElementById(`cd-${id}`)!;
      if (cd > 0) {
        element.style.display = 'flex';
        element.innerText = cd.toFixed(1) + 's';
      } else {
        element.style.display = 'none';
      }
    });
  }

  private gameOver() {
    sounds.playGameOver();
    document.getElementById('final-wave-val')!.innerText = String(this.activeWave);
    document.getElementById('final-score-val')!.innerText = String(this.score);
    document.getElementById('game-over-overlay')!.style.display = 'flex';
  }

  private resetGame() {
    this.playerHealth = this.grimoireType === '5-leaf' ? 200 : 100;
    this.playerMaxHealth = this.grimoireType === '5-leaf' ? 200 : 100;
    this.score = 0;
    this.gold = 0;
    this.goblinsToSpawnNext = 1;
    this.activeWave = 1;
    this.spawnCountdown = 0;
    this.activeRelics = [];
    this.speedMultiplier = 1.0;
    this.magicPowerMultiplier = this.grimoireType === '4-leaf' ? 2.0 : 1.0;

    this.playerPos.set(0, 0, 0);
    this.player.meshGroup.position.set(0, 0, 0);
    this.player.meshGroup.scale.set(1.0, 1.0, 1.0);

    this.isGiantForm = false;
    this.isDevilUnion = false;
    this.isInvulnerable = false;
    if (this.devilWings) {
      this.player.meshGroup.remove(this.devilWings);
      this.devilWings = null;
    }

    this.goblins.forEach((g) => this.scene.remove(g.character.meshGroup));
    this.goblins = [];
    this.mages.forEach((m) => this.scene.remove(m.character.meshGroup));
    this.mages = [];
    this.projectiles.forEach((p) => this.scene.remove(p.mesh));
    this.projectiles = [];

    document.getElementById('game-over-overlay')!.style.display = 'none';
    document.getElementById('spawner-countdown')!.style.display = 'none';
    document.getElementById('shop-overlay')!.style.display = 'none';
    document.getElementById('spellbook-overlay')!.style.display = 'none';
    document.getElementById('pause-overlay')!.style.display = 'none';
    document.getElementById('travel-overlay')!.style.display = 'none';
    this.isShopOpen = false;
    this.isSpellbookOpen = false;
    this.isPaused = false;
    this.isTravelOpen = false;

    this.updateHUD();
    this.updateSpellbookContent();
  }

  private createSpawnParticles(pos: THREE.Vector3) {
    const geo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    const mat = new THREE.MeshBasicMaterial({ color: 0xb2dfdb });

    for (let i = 0; i < 12; i++) {
      const pMesh = new THREE.Mesh(geo, mat);
      pMesh.position.copy(pos).add(new THREE.Vector3(
        (Math.random() - 0.5) * 1.5,
        Math.random() * 0.8,
        (Math.random() - 0.5) * 1.5
      ));
      this.scene.add(pMesh);

      this.particles.push({
        mesh: pMesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 2.5,
          Math.random() * 3.5 + 1.0,
          (Math.random() - 0.5) * 2.5
        ),
        life: 0.5,
        maxLife: 0.5,
      });
    }
  }

  private createHitParticles(pos: THREE.Vector3) {
    const geo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });

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

  private createFloatingText(text: string, pos: THREE.Vector3, color: string) {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.color = color;
    div.style.fontWeight = 'bold';
    div.style.fontSize = '1.4rem';
    div.style.textShadow = '2px 2px 0px #000';
    div.style.fontFamily = 'sans-serif';
    div.style.pointerEvents = 'none';
    div.innerText = text;
    document.body.appendChild(div);

    this.floatingTexts.push({
      element: div,
      x: pos.x,
      y: pos.y + 1.8,
      z: pos.z,
      life: 0.8,
      maxLife: 0.8,
    });
  }

  private updatePlayer(dt: number) {
    if (this.playerHealth <= 0 || !this.gameStarted || this.isShopOpen || this.isSpellbookOpen) {
      this.player.animateWalk(0, 0);
      return;
    }

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

    const gamepads = navigator.getGamepads();
    const gp = gamepads[0];
    if (gp) {
      const axisX = gp.axes[0];
      const axisY = gp.axes[1];
      if (Math.abs(axisX) > 0.15) {
        moveDirection.addScaledVector(rightVec, axisX);
      }
      if (Math.abs(axisY) > 0.15) {
        moveDirection.addScaledVector(forwardVec, -axisY);
      }
    }

    const moveLen = moveDirection.length();
    if (moveLen > 0) {
      if (moveLen > 1.0) {
        moveDirection.normalize();
      }

      const isSprinting = this.keys['shift'] || (gp && (gp.buttons[10].pressed || gp.buttons[4].pressed));
      const speed = (isSprinting ? 6.5 : 4.0) * this.speedMultiplier;

      this.playerPos.addScaledVector(moveDirection, speed * dt);

      const targetAngle = Math.atan2(moveDirection.x, moveDirection.z);
      let diff = targetAngle - this.player.meshGroup.rotation.y;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      this.player.meshGroup.rotation.y += diff * 15 * dt;

      this.player.animateWalk(speed, this.clock.getElapsedTime());
    } else {
      this.player.animateWalk(0, 0);
    }

    // Jump Physics
    this.verticalVelocity += this.gravity * dt;
    this.playerPos.y += this.verticalVelocity * dt;

    if (this.playerPos.y <= 0) {
      this.playerPos.y = 0;
      this.verticalVelocity = 0;
      this.isJumping = false;
    }

    // Resolve building/tree collisions
    this.resolveObstacleCollisions(this.playerPos, 0.5);

    this.playerPos.x = Math.max(-this.boundaries, Math.min(this.boundaries, this.playerPos.x));
    this.playerPos.z = Math.max(-this.boundaries, Math.min(this.boundaries, this.playerPos.z));

    this.player.meshGroup.position.copy(this.playerPos);

    if (this.isInvulnerable && this.nullifyShieldMesh) {
      this.nullifyShieldMesh.position.copy(this.playerPos).add(new THREE.Vector3(0, 1.0, 0));
    }
  }

  private updateProjectiles(dt: number) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;

      if (p.velocity.lengthSq() > 0) {
        p.mesh.position.addScaledVector(p.velocity, dt);
      }

      if (p.isRift) {
        this.goblins.concat(this.mages as any).forEach((enemy: any) => {
          if (enemy.isDead) return;
          const dist = enemy.position.distanceTo(p.mesh.position);
          if (dist < 6.0) {
            const pullDir = new THREE.Vector3().subVectors(p.mesh.position, enemy.position).normalize();
            enemy.position.addScaledVector(pullDir, 5.0 * (1.0 - dist / 6.0) * dt);
          }
        });
      }

      const isTickTime = Math.floor(p.life * 10) % 3 === 0;

      if (p.owner === 'player') {
        this.goblins.concat(this.mages as any).forEach((enemy: any) => {
          if (enemy.isDead) return;
          const dist = p.mesh.position.distanceTo(enemy.position);
          
          if (p.isWall) {
            if (p.type === 'fire' && dist < 2.0 && isTickTime) {
              enemy.takeDamage(p.damage, new THREE.Vector3(0, 0.1, 0));
              this.createFloatingText(`-${p.damage}`, enemy.position, '#ff5722');
            } else if (p.type === 'ice' && dist < 2.5) {
              const pushBack = new THREE.Vector3().subVectors(enemy.position, p.mesh.position).normalize();
              pushBack.y = 0;
              enemy.position.addScaledVector(pushBack, 3.5 * dt);
            }
          } else {
            if (dist < 1.6) {
              const knockback = p.velocity.clone().normalize();
              knockback.y = 0.15;
              enemy.takeDamage(p.damage, knockback);
              this.createHitParticles(enemy.position);
              this.createFloatingText(`-${p.damage}`, enemy.position, p.type === 'fire' ? '#ff3300' : '#00e5ff');
              p.life = 0;

              if (enemy.isDead) {
                this.score++;
                this.gold += enemy.maxHealth === 80 ? 35 : 15;
                this.createFloatingText('DEFEATED!', enemy.position, '#f9d423');
                this.updateHUD();
                this.checkWaveCompletion();
              }
            }
          }
        });
      } else if (p.owner === 'enemy') {
        const dist = p.mesh.position.distanceTo(this.playerPos);
        if (dist < 1.5) {
          this.handlePlayerHurt(p.mesh.position, p.damage);
          p.life = 0;
        }

        if (this.isInvulnerable && this.nullifyShieldMesh) {
          const sDist = p.mesh.position.distanceTo(this.playerPos);
          if (sDist < 2.2) {
            this.createSpawnParticles(p.mesh.position);
            p.life = 0;
            this.createFloatingText('NULLIFIED!', p.mesh.position, '#00ffcc');
          }
        }
      }

      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        if (Array.isArray(p.mesh.material)) {
          p.mesh.material.forEach((m) => m.dispose());
        } else {
          p.mesh.material.dispose();
        }
        this.projectiles.splice(i, 1);
      }
    }
  }

  private updateCamera(dt: number) {
    const rotationSpeed = 2.2;
    if (this.keys['q']) {
      this.cameraAngle -= rotationSpeed * dt;
    }
    if (this.keys['e']) {
      this.cameraAngle += rotationSpeed * dt;
    }

    const offsetX = Math.sin(this.cameraAngle) * this.cameraRadius;
    const offsetZ = Math.cos(this.cameraAngle) * this.cameraRadius;
    const targetCamOffset = new THREE.Vector3(offsetX, this.cameraRadius * 0.7, offsetZ);
    const targetCamPos = new THREE.Vector3().copy(this.playerPos).add(targetCamOffset);

    this.camera.position.lerp(targetCamPos, 7 * dt);
    this.camera.lookAt(new THREE.Vector3().copy(this.playerPos).add(new THREE.Vector3(0, 1.2, 0)));
  }

  private updateSpawner(dt: number) {
    const insideKingdom = Math.abs(this.playerPos.x) < 25 && Math.abs(this.playerPos.z) < 25;

    const zBanner = document.getElementById('zone-banner')!;
    if (insideKingdom) {
      zBanner.innerText = '🏰 KINGDOM OF CLOVER (Safe Zone)';
      zBanner.className = 'zone-banner zone-safe';
      document.getElementById('merchant-prompt')!.style.display = this.playerPos.distanceTo(this.merchantPos) < 3.0 ? 'block' : 'none';

      const mapTablePos = new THREE.Vector3(2.0, 0, 5.0);
      document.getElementById('map-prompt')!.style.display = this.playerPos.distanceTo(mapTablePos) < 3.0 ? 'block' : 'none';
    } else {
      zBanner.innerText = '🌲 CLOVER GRASSLANDS (Combat Zone)';
      zBanner.className = 'zone-banner zone-combat';
      document.getElementById('merchant-prompt')!.style.display = 'none';
      document.getElementById('map-prompt')!.style.display = 'none';

      if (this.spawnCountdown > 0) {
        this.spawnCountdown -= dt;
        document.getElementById('timer-val')!.innerText = this.spawnCountdown.toFixed(1);

        if (this.spawnCountdown <= 0) {
          this.spawnWave();
        }
      }
    }
  }

  private updateParticles(dt: number) {
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.life -= dt;

      ft.y += 1.3 * dt;

      const tempV = new THREE.Vector3(ft.x, ft.y, ft.z);
      tempV.project(this.camera);

      const screenX = (tempV.x * 0.5 + 0.5) * window.innerWidth;
      const screenY = (tempV.y * -0.5 + 0.5) * window.innerHeight;

      ft.element.style.left = `${screenX}px`;
      ft.element.style.top = `${screenY}px`;
      ft.element.style.opacity = `${ft.life / ft.maxLife}`;

      if (ft.life <= 0) {
        document.body.removeChild(ft.element);
        this.floatingTexts.splice(i, 1);
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;

      p.velocity.y += this.gravity * dt;
      p.mesh.position.addScaledVector(p.velocity, dt);

      p.mesh.rotation.x += 8 * dt;
      p.mesh.rotation.y += 8 * dt;

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

  private animate() {
    requestAnimationFrame(this.animate.bind(this));

    const dt = this.isPaused ? 0 : Math.min(this.clock.getDelta(), 0.1);

    if (this.gameStarted && !this.isPaused) {
      for (const key in this.cooldowns) {
        if (this.cooldowns[key as keyof typeof this.cooldowns] > 0) {
          this.cooldowns[key as keyof typeof this.cooldowns] = Math.max(0, this.cooldowns[key as keyof typeof this.cooldowns] - dt);
        }
      }
      this.updateCooldownsHUD();

      if (this.isGiantForm) {
        this.giantFormTimer -= dt;
        if (this.giantFormTimer <= 0) {
          this.endGiantForm();
        }
      }

      if (this.isDevilUnion) {
        this.devilUnionTimer -= dt;
        if (this.devilWings) {
          const time = this.clock.getElapsedTime();
          this.devilWings.children[0].rotation.y = 0.4 + Math.sin(time * 10) * 0.2;
          this.devilWings.children[1].rotation.y = -0.4 - Math.sin(time * 10) * 0.2;
        }

        if (this.devilUnionTimer <= 0) {
          this.endDevilUnion();
        }
      }

      if (this.isInvulnerable) {
        this.invulnTimer -= dt;
        if (this.invulnTimer <= 0) {
          this.isInvulnerable = false;
          if (this.nullifyShieldMesh) {
            this.scene.remove(this.nullifyShieldMesh);
            this.nullifyShieldMesh.geometry.dispose();
            (this.nullifyShieldMesh.material as any).dispose();
            this.nullifyShieldMesh = null;
          }
        }
      }

      this.updateGamepad(dt);
    }

    this.updatePlayer(dt);

    if (this.floatingGrimoire && this.gameStarted) {
      const isCasting = this.cooldowns.basic > 0.1 || this.cooldowns.combo > 2.0 || this.cooldowns.skill > 6.0 || this.cooldowns.ultimate > 13.0;
      this.floatingGrimoire.update(dt, this.playerPos, this.player.meshGroup.rotation.y, this.clock.getElapsedTime(), isCasting);
    }

    this.goblins.forEach((g) => {
      g.update(dt, this.playerPos);
      this.resolveObstacleCollisions(g.position, 0.4);
    });

    this.mages.forEach((m) => {
      m.update(dt, this.playerPos, (start, target) => {
        const dir = new THREE.Vector3().subVectors(target, start).normalize();
        this.spawnProjectile(start, dir.multiplyScalar(8), 12, 'fire', true);
      });
      this.resolveObstacleCollisions(m.position, 0.4);
    });

    this.updateProjectiles(dt);
    this.updateParticles(dt);
    this.updateCamera(dt);
    this.updateSpawner(dt);

    this.renderer.render(this.scene, this.camera);
  }

  private initObstacles() {
    this.obstacleBoxes = [];
    this.obstacleCircles = [];

    // 1. Town Houses
    this.obstacleBoxes.push({ xMin: -16.2, xMax: -11.8, zMin: -14.2, zMax: -9.8 });
    this.obstacleBoxes.push({ xMin: -17.2, xMax: -12.8, zMin: 7.3, zMax: 12.7 });
    this.obstacleBoxes.push({ xMin: 11.3, xMax: 16.7, zMin: -12.2, zMax: -7.8 });

    // 2. Merchant Table
    this.obstacleBoxes.push({ xMin: 3.8, xMax: 6.2, zMin: 5.2, zMax: 6.8 });

    // 3. Map Table next to Merchant
    this.obstacleBoxes.push({ xMin: 1.0, xMax: 3.0, zMin: 4.0, zMax: 6.0 });

    // 4. Corner Watchtowers
    this.obstacleBoxes.push({ xMin: -27.0, xMax: -23.0, zMin: -27.0, zMax: -23.0 });
    this.obstacleBoxes.push({ xMin: 23.0, xMax: 27.0, zMin: -27.0, zMax: -23.0 });
    this.obstacleBoxes.push({ xMin: -27.0, xMax: -23.0, zMin: 23.0, zMax: 27.0 });
    this.obstacleBoxes.push({ xMin: 23.0, xMax: 27.0, zMin: 23.0, zMax: 27.0 });

    // 5. Castle Walls
    this.obstacleBoxes.push({ xMin: -26.25, xMax: 26.25, zMin: -26.25, zMax: -23.75 });
    this.obstacleBoxes.push({ xMin: -26.25, xMax: -23.75, zMin: -26.25, zMax: 26.25 });
    this.obstacleBoxes.push({ xMin: 23.75, xMax: 26.25, zMin: -26.25, zMax: 26.25 });
    this.obstacleBoxes.push({ xMin: -26.25, xMax: -4.0, zMin: 23.75, zMax: 26.25 });
    this.obstacleBoxes.push({ xMin: 4.0, xMax: 26.25, zMin: 23.75, zMax: 26.25 });
  }

  private resolveObstacleCollisions(pos: THREE.Vector3, radius = 0.5) {
    let px = pos.x;
    let pz = pos.z;

    for (const c of this.obstacleCircles) {
      const dx = px - c.x;
      const dz = pz - c.z;
      const distSq = dx * dx + dz * dz;
      const minDist = c.radius + radius;
      if (distSq < minDist * minDist) {
        const dist = Math.sqrt(distSq);
        if (dist > 0) {
          px += (dx / dist) * (minDist - dist);
          pz += (dz / dist) * (minDist - dist);
        }
      }
    }

    for (const b of this.obstacleBoxes) {
      const cx = Math.max(b.xMin, Math.min(px, b.xMax));
      const cz = Math.max(b.zMin, Math.min(pz, b.zMax));
      const dx = px - cx;
      const dz = pz - cz;
      const distSq = dx * dx + dz * dz;
      if (distSq < radius * radius) {
        if (distSq > 0) {
          const dist = Math.sqrt(distSq);
          px += (dx / dist) * (radius - dist);
          pz += (dz / dist) * (radius - dist);
        } else {
          const leftDist = px - b.xMin;
          const rightDist = b.xMax - px;
          const topDist = pz - b.zMin;
          const bottomDist = b.zMax - pz;
          const minDist = Math.min(leftDist, rightDist, topDist, bottomDist);
          if (minDist === leftDist) px = b.xMin - radius;
          else if (minDist === rightDist) px = b.xMax + radius;
          else if (minDist === topDist) pz = b.zMin - radius;
          else pz = b.zMax + radius;
        }
      }
    }

    pos.x = px;
    pos.z = pz;
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new DemoGame();
});
