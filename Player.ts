export default class Player {
    rightPressed: boolean = false;
    leftPressed: boolean = false;
    shootPressed: boolean = false;
    canvas: HTMLCanvasElement;
    velocity: number;
    bulletController: any; // Replace with the actual type
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
  
    constructor(canvas: HTMLCanvasElement, velocity: number, bulletController: any) {
      this.canvas = canvas;
      this.velocity = velocity;
      this.bulletController = bulletController;
  
      this.x = this.canvas.width / 2;
      this.y = this.canvas.height - 75;
      this.width = 50;
      this.height = 48;
      this.image = new Image();
      this.image.src = "images/player.png";
  
      document.addEventListener("keydown", this.keydown);
      document.addEventListener("keyup", this.keyup);
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      if (this.shootPressed) {
        this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
      }
      this.move();
      this.collideWithWalls();
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    collideWithWalls(): void {
      // Left
      if (this.x < 0) {
        this.x = 0;
      }
  
      // Right
      if (this.x > this.canvas.width - this.width) {
        this.x = this.canvas.width - this.width;
      }
    }
  
    move(): void {
      if (this.rightPressed) {
        this.x += this.velocity;
      } else if (this.leftPressed) {
        this.x += -this.velocity;
      }
    }
  
    keydown = (event: KeyboardEvent) => {
      if (event.code == "ArrowRight") {
        this.rightPressed = true;
      }
      if (event.code == "ArrowLeft") {
        this.leftPressed = true;
      }
      if (event.code == "Space") {
        this.shootPressed = true;
      }
    };
  
    keyup = (event: KeyboardEvent) => {
      if (event.code == "ArrowRight") {
        this.rightPressed = false;
      }
      if (event.code == "ArrowLeft") {
        this.leftPressed = false;
      }
      if (event.code == "Space") {
        this.shootPressed = false;
      }
    };
  }
  