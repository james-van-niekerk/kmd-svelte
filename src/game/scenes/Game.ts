import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  tileWidth: number = 64;
  tileHeight: number = 32;
  mapWidth: number = 10; // Number of tiles wide
  mapHeight: number = 10; // Number of tiles high
  mapData: number[][] = []; // Map data array

  constructor() {
    super("Game");
  }

  preload() {
    // Load a tile image (e.g., grass or a basic tile)
    // this.load.image("tile", "assets/tile.png"); // Replace with your asset path
  }

  create() {
    this.camera = this.cameras.main;

    // Initialize the map data with random terrain
    this.generateMap();

    // Render the isometric map
    this.renderIsometricMap();

    EventBus.emit("current-scene-ready", this);
  }

  generateMap() {
    for (let y = 0; y < this.mapHeight; y++) {
      const row = [];
      for (let x = 0; x < this.mapWidth; x++) {
        // Assign a random terrain type (e.g., 0 = grass, 1 = dirt)
        row.push(Phaser.Math.Between(0, 1));
      }
      this.mapData.push(row);
    }
  }

  renderIsometricMap() {
    const originX = this.scale.width / 2; // Start in the middle of the screen
    const originY = 100; // Vertical offset

    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        const terrainType = this.mapData[y][x];

        // Convert tile coordinates to isometric screen coordinates
        const screenX = originX + (x - y) * (this.tileWidth / 2);
        const screenY = originY + (x + y) * (this.tileHeight / 2);

        // Add the tile image
        const tileKey = terrainType === 0 ? "008000" : "964B00"; // Add different tile types as needed
        // this.add.image(screenX, screenY, tileKey).setOrigin(0.5, 0.5);
        this.add.rectangle(
          screenX,
          screenY,
          this.tileWidth,
          this.tileHeight,
          parseInt(tileKey),
        );
      }
    }
  }
}
