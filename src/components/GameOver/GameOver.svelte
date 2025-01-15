<script lang="ts">
import { game, restartGame } from '@/store/game/game';
import { popups } from '@/store/popups/popups';

function restart() {
  restartGame();
  popups.update(() => []);
}
</script>

<div class="GameOver">
  <h2>Game Over</h2>
  <p>Score: {$game.score}</p>
  <p>
    <button class="btn" onclick={restart}>restart</button>
  </p>
</div>

<style lang="scss">
.GameOver {
  text-align: center;
}
</style>
