import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { type Tile } from '../types/GameTypes';
import { CameraController } from '../systems/CameraController';
import { TerrainGenerator } from '../systems/TerrainGenerator';
import { MapRenderer } from '../systems/MapRenderer';

export class Game extends Scene {
  private mapData: Tile[][] = [];
  private cameraController!: CameraController;
  private mapRenderer!: MapRenderer;

  constructor() {
    super('Game');
  }

  preload() {
    // Load assets here
  }

  create() {
    // Initialize systems
    this.cameraController = new CameraController(this);
    this.mapRenderer = new MapRenderer(this);

    // Generate and render map
    this.mapData = TerrainGenerator.generateMap();
    this.mapRenderer.renderMap(this.mapData);

    EventBus.emit('current-scene-ready', this);
  }

  update() {
    this.cameraController.update();
  }
}