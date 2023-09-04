import Bullet from "./Bullet.js";

export default class BulletController {
  bullets: Bullet[] = [];
  timeTillNextBulletAllowed: number = 0;
  canvas: HTMLCanvasElement;
  maxBulletsAtATime: number;
  bulletColor: string;
  soundEnabled: boolean;
  shootSound: HTMLAudioElement;

  constructor(canvas: HTMLCanvasElement, maxBulletsAtATime: number, bulletColor: string, soundEnabled: boolean) {
    this.canvas = canvas;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.bulletColor = bulletColor;
    this.soundEnabled = soundEnabled;

    this.shootSound = new Audio("sounds/shoot.wav");
    this.shootSound.volume = 0.1;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
    );

    this.bullets.forEach((bullet) => bullet.draw(ctx));
    if (this.timeTillNextBulletAllowed > 0) {
      this.timeTillNextBulletAllowed--;
    }
  }

  collideWith(sprite: { x: number; y: number; width: number; height: number }): boolean {
    const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite)
    );

    if (bulletThatHitSpriteIndex >= 0) {
      this.bullets.splice(bulletThatHitSpriteIndex, 1);
      return true;
    }

    return false;
  }

  shoot(x: number, y: number, velocity: number, timeTillNextBulletAllowed: number = 0): void {
    if (
      this.timeTillNextBulletAllowed <= 0 &&
      this.bullets.length < this.maxBulletsAtATime
    ) {
      const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
      this.bullets.push(bullet);
      if (this.soundEnabled) {
        this.shootSound.currentTime = 0;
        this.shootSound.play();
      }
      this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
    }
  }
}
