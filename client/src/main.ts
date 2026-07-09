import * as THREE from 'three';

class Game {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private playerMesh!: THREE.Mesh;

  constructor() {
    this.initScene();
    this.initLights();
    this.initPlayer();
    this.initEnvironment();
    this.animate();
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0b0c10);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(0, 0, 0);

    const container = document.getElementById('game-container');
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    if (container) {
      container.appendChild(this.renderer.domElement);
    }
  }

  private initLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    this.scene.add(dirLight);
  }

  private initPlayer() {
    // A placeholder capsule for the player character
    const geometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
    const material = new THREE.MeshStandardMaterial({
      color: 0x4e9af1,
      roughness: 0.4,
    });
    this.playerMesh = new THREE.Mesh(geometry, material);
    this.playerMesh.position.y = 1;
    this.playerMesh.castShadow = true;
    this.playerMesh.receiveShadow = true;
    this.scene.add(this.playerMesh);
  }

  private initEnvironment() {
    // Floor
    const floorGeo = new THREE.PlaneGeometry(100, 100);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1f2833,
      roughness: 0.8,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Some simple environment pillars
    for (let i = 0; i < 10; i++) {
      const pillarGeo = new THREE.BoxGeometry(1, Math.random() * 5 + 2, 1);
      const pillarMat = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.6,
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(
        Math.random() * 40 - 20,
        pillarGeo.parameters.height / 2,
        Math.random() * 40 - 20
      );
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      this.scene.add(pillar);
    }
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Spin player slightly to show active render loop
    if (this.playerMesh) {
      this.playerMesh.rotation.y += 0.01;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Start the game when window loads
window.addEventListener('DOMContentLoaded', () => {
  new Game();
});
