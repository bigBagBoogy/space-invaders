"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bullet_js_1 = __importDefault(require("./Bullet.js"));
class BulletController {
    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
        this.bullets = [];
        this.timeTillNextBulletAllowed = 0;
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;
        this.shootSound = new Audio("sounds/shoot.wav");
        this.shootSound.volume = 0.1;
    }
    draw(ctx) {
        this.bullets = this.bullets.filter((bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height);
        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }
    collideWith(sprite) {
        const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) => bullet.collideWith(sprite));
        if (bulletThatHitSpriteIndex >= 0) {
            this.bullets.splice(bulletThatHitSpriteIndex, 1);
            return true;
        }
        return false;
    }
    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
        if (this.timeTillNextBulletAllowed <= 0 &&
            this.bullets.length < this.maxBulletsAtATime) {
            const bullet = new Bullet_js_1.default(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }
}
exports.default = BulletController;
