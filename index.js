"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EnemyController_js_1 = __importDefault(require("./EnemyController.js"));
const Player_js_1 = __importDefault(require("./Player.js"));
const BulletController_js_1 = __importDefault(require("./BulletController.js"));
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
if (canvas && ctx) {
    canvas.width = 600;
    canvas.height = 600;
    const background = new Image();
    background.src = "images/space.png";
    const playerBulletController = new BulletController_js_1.default(canvas, 10, "red", true);
    const enemyBulletController = new BulletController_js_1.default(canvas, 4, "white", false);
    const enemyController = new EnemyController_js_1.default(canvas, enemyBulletController, playerBulletController);
    const player = new Player_js_1.default(canvas, 3, playerBulletController);
    let isGameOver = false;
    let didWin = false;
    function game() {
        checkGameOver();
        if (ctx) {
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            displayGameOver();
            if (!isGameOver) {
                enemyController.draw(ctx);
                player.draw(ctx);
                playerBulletController.draw(ctx);
                enemyBulletController.draw(ctx);
            }
        }
    }
    function displayGameOver() {
        if (isGameOver && ctx) {
            let text = didWin ? "You Win" : "Game Over";
            let textOffset = didWin ? 3.5 : 5;
            ctx.fillStyle = "white";
            ctx.font = "70px Arial";
            ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
        }
    }
    function checkGameOver() {
        if (isGameOver) {
            return;
        }
        if (enemyBulletController.collideWith(player)) {
            isGameOver = true;
        }
        if (enemyController.collideWith(player)) {
            isGameOver = true;
        }
        if (enemyController.enemyRows.length === 0) {
            didWin = true;
            isGameOver = true;
        }
    }
    setInterval(game, 1000 / 60);
}
