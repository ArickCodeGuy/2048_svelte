<script lang="ts">
import Canvas from './components/Canvas/Canvas.svelte';
import Controls from './components/Controls/Controls.svelte';
import GameOver from './components/GameOver/GameOver.svelte';
import Header from './components/Header/Header.svelte';
import { initGame } from './composables/game/game';
import { isGameOver } from './composables/game/utils/canMove';
import { useDelayedNumberUpdate } from './composables/useDelayedNumberUpdate';
import { game, restartGame } from './store/game/game';
import { pushPopup } from './store/popups/popups';
import Popups from './store/popups/Popups.svelte';

initGame();

let score = $state(0);
const [updateScore] = useDelayedNumberUpdate(0, {
  onAnimate: (v) => (score = v),
});
$effect(() => {
  updateScore($game.score);
});

game.subscribe((v) => {
  if (isGameOver(v.grid)) {
    pushPopup({
      component: GameOver,
    });
  }
});
</script>

<Header />

<seciton class="section">
  <div class="container">
    <div class="row">
      <div class="col-lg-4 left">
        <Controls />
      </div>
      <div class="col-lg-4 middle">
        <Canvas />
        <p>
          <button class="btn" onclick={restartGame}>Restart</button>
        </p>
      </div>
      <div class="col-lg-4 right">
        <h2 class="heading">Score: {score}</h2>
      </div>
    </div>
  </div>
</seciton>

<Popups />

<style lang="scss">
@use '@/assets/styles/vars';

.heading {
  text-align: center;
}
.right {
  text-align: center;
}

@media (max-width: vars.$breakpoint-lg) {
  .left {
    display: none;
  }
  .right {
    order: -1;
  }
}
</style>
