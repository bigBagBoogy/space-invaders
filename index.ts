import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

if (canvas && ctx) {
  canvas.width = 600;
  canvas.height = 600;

  const background: HTMLImageElement = new Image();
  background.src = "images/space.png";

  const playerBulletController: BulletController = new BulletController(canvas, 10, "red", true);
  const enemyBulletController: BulletController = new BulletController(canvas, 4, "white", false);
  const enemyController: EnemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController
  );
  const player: Player = new Player(canvas, 3, playerBulletController);

  let isGameOver: boolean = false;
  let didWin: boolean = false;

  function game(): void {
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

  function displayGameOver(): void {
    if (isGameOver && ctx) {
      let text: string = didWin ? "You Win" : "Game Over";
      let textOffset: number = didWin ? 3.5 : 5;

      ctx.fillStyle = "white";
      ctx.font = "70px Arial";
      ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
  }

  function checkGameOver(): void {
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
