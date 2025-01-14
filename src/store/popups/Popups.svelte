<script lang="ts">
import { closePopup, popups } from './popups';
</script>

<div class="Popups">
  {#each $popups as popup}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="Popup" on:click={() => closePopup(popup.id)}>
      <div class="Popup-content" on:click|stopPropagation={() => null}>
        <svelte:component this={popup.component} />

        <button class="Popup-close" on:click={() => closePopup(popup.id)}
          >X</button
        >
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
.Popup {
  position: fixed;
  padding: 40px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Popup-content {
  position: relative;
  width: 1200px;
  max-width: 100%;
  border-radius: 4px;
  background-color: var(--bgc);
  padding: 20px;
}
.Popup-close {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
