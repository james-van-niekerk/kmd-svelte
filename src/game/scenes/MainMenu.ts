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

    // Background color (optional, adjust as needed)
    this.cameras.main.setBackgroundColor("#242424");

    // Add a title
    this.gameText = this.add.text(this.scale.width / 2, 100, "Main Menu", {
      font: "48px Crang",
      color: "#ffffff",
      align: "center",
    });
    this.gameText.setOrigin(0.5);

    this.createButton(this.scale.width / 2, 200, "Start Game", () =>
      this.changeScene(),
    );

    this.createButton(this.scale.width / 2, 300, "Settings", () =>
      console.log("Settings button clicked!"),
    );

    this.createButton(this.scale.width / 2, 400, "Credits", () =>
      console.log("Settings button clicked!"),
    );

    EventBus.emit("current-scene-ready", this);
  }

  createButton(x: number, y: number, text: string, callback: () => void) {
    // Create a container for the button
    const container = this.add.container(x, y);

    // Create a rectangle for the button background with a border
    const borderThickness = 4;
    const buttonWidth = 300; // Adjust width as needed
    const buttonHeight = 70; // Adjust height as needed

    const buttonBackground = this.add.rectangle(
      0,
      0,
      buttonWidth,
      buttonHeight,
      0x242424,
    );
    buttonBackground.setStrokeStyle(borderThickness, 0xffffff); // White border

    // Add the text to the button
    const buttonText = this.add.text(0, 0, text, {
      font: "32px Crang",
      color: "#ffffff",
    });
    buttonText.setOrigin(0.5);

    // Add background and text to the container
    container.add([buttonBackground, buttonText]);
    container.setSize(buttonWidth, buttonHeight);
    container.setInteractive();

    // Add hover effects
    container.on("pointerover", () => {
      buttonBackground.setFillStyle(0xffffff); // White background
      buttonText.setColor("#242424"); // Black text
    });

    container.on("pointerout", () => {
      buttonBackground.setFillStyle(0x242424); // Black background
      buttonText.setColor("#ffffff"); // White text
    });

    // Add click event
    container.on("pointerdown", callback);
  }

  changeScene() {
    this.scene.start("Game");
  }
}
