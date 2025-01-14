<script lang="ts">
import { onMount } from 'svelte';
import { useCanvas } from './useCanvas';

let canvas: HTMLCanvasElement;

onMount(() => {
  useCanvas(canvas);
});
</script>

<div class="canvas-container">
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <canvas bind:this={canvas} class="canvas" />
</div>

<style lang="scss">
.canvas-container {
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 100%;
    padding-top: 100%;
  }
}
.canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
