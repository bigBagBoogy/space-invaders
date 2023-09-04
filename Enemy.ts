export default class Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
  
    constructor(x: number, y: number, imageNumber: number) {
      this.x = x;
      this.y = y;
      this.width = 44;
      this.height = 32;
  
      this.image = new Image();
      this.image.src = `images/enemy${imageNumber}.png`;
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    move(xVelocity: number, yVelocity: number): void {
      this.x += xVelocity;
      this.y += yVelocity;
    }
  
    collideWith(sprite: { x: number; y: number; width: number; height: number }): boolean {
      if (
        this.x + this.width > sprite.x &&
        this.x < sprite.x + sprite.width &&
        this.y + this.height > sprite.y &&
        this.y < sprite.y + sprite.height
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  