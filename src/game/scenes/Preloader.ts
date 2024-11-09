import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    const text_1 = this.add.text(90, 385, "", {});
    text_1.text = "Loading";
    text_1.setStyle({
      backgroundColor: "blue",
      color: "orange",
      fontFamily: "serif",
      fontSize: "60px",
      fontStyle: "bold italic",
      stroke: "orange",
      "shadow.offsetX": 5,
      "shadow.offsetY": 5,
      "shadow.color": "brown",
      "shadow.blur": 7,
      "shadow.stroke": true,
      "shadow.fill": true,
    });
    text_1.setPadding({ left: 10, top: 10, right: 10, bottom: 10 });

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");

    this.load.image("sky", "sky.png");
    this.load.image("ground", "platform.png");
    this.load.image("star", "star.png");
    this.load.image("bomb", "bomb.png");
    this.load.spritesheet("dude", "dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.
    this.scene.start("MainMenu");
  }
}
