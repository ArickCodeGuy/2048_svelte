import type { Movement } from '@/composables/types';
import { CELL_NUMBER_DICTIONARY } from '@/constants/base';
import { game, type State } from '@/store/game/game';

const gap = 2;

let gameState: State;
let lastUpdate = 0;

game.subscribe((v) => {
  gameState = v;
  lastUpdate = Number(new Date());
});

// @ts-ignore
export function useCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;

  function clear() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function gridPosToCanvasPos([x, y]: Movement): Movement {
    const w = canvas.getBoundingClientRect().width;
    const s = gameState.size;
    const j = Math.floor(w / s);

    return [j * x, y * j];
  }

  function drawCell(
    [ox, oy]: Movement,
    [dx, dy]: Movement = [0, 0],
    value?: number
  ) {
    const cellSize = Math.floor(
      canvas.getBoundingClientRect().width / gameState.size -
        gap * gameState.size
    );

    const timePassed = Math.max(1, Number(new Date()) - lastUpdate);
    const transitionState = Math.min(
      1,
      timePassed / gameState.transitionDuration
    );
    const x = ox + dx * transitionState;
    const y = oy + dy * transitionState;

    const [canvasX, canvasY] = gridPosToCanvasPos([x, y]);

    if (value) {
      ctx.fillStyle = CELL_NUMBER_DICTIONARY[value] ?? '#f00';
    } else {
      ctx.fillStyle = '#000';
    }

    ctx.fillRect(canvasX, canvasY, cellSize, cellSize);

    if (value) {
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = `${cellSize / 3}px Arial`;
      ctx.fillText(
        value + '',
        canvasX + cellSize / 2,
        canvasY + cellSize / 1.6
      );
    }
  }

  function draw() {
    if (!gameState) return;

    // background
    for (let y = 0; y < gameState.grid.length; y++) {
      for (let x = 0; x < gameState.grid[0].length; x++) {
        drawCell([x, y]);
      }
    }

    for (let y = 0; y < gameState.grid.length; y++) {
      for (let x = 0; x < gameState.grid[0].length; x++) {
        if (!gameState.grid[y][x].value) continue;
        drawCell(
          [x, y],
          gameState.grid[y][x].transform,
          gameState.grid[y][x].value
        );
      }
    }
  }

  function render() {
    const w = canvas.getBoundingClientRect().width;
    canvas.width = w;
    canvas.height = w;

    clear();
    draw();
  }

  setInterval(() => {
    render();
  }, 1000 / 60);
}
