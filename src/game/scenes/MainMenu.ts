import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class MainMenu extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;

  constructor() {
    super("MainMenu");
  }

  create() {
    this.camera = this.cameras.main;

    // this.add.image(510, 380, "sky");
    this.add.image(400, 300, "star");

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    this.scene.start("Game");
  }
}
