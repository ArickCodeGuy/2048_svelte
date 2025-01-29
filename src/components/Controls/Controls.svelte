<script lang="ts"></script>

<h2 class="h2">Controls</h2>
<div class="controls-container">
  <div class="controls">
    <div>
      <button class="btn">W</button>
    </div>
    <div>
      <button class="btn">A</button>
      <button class="btn">.</button>
      <button class="btn">D</button>
    </div>
    <div>
      <button class="btn">S</button>
    </div>
  </div>
  <div class="controls">
    <div>
      <button class="btn">↑</button>
    </div>
    <div>
      <button class="btn">←</button>
      <button class="btn">.</button>
      <button class="btn">→</button>
    </div>
    <div>
      <button class="btn">↓</button>
    </div>
  </div>
</div>

<style lang="scss">
.controls-container {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}
.controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  > * {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .btn {
    width: 40px;
    height: 40px;
  }
}
</style>
