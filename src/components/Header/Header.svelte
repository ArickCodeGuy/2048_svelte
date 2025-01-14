<script lang="ts">
import { pushPopup } from '@/store/popups/popups';
import Controls from '../Controls/Controls.svelte';

function showPopup() {
  pushPopup({
    component: Controls,
  });
}
</script>

<header class="header">
  <div class="container">
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="burger" onclick={showPopup}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</header>

<style lang="scss">
.header {
  padding: 10px 0;
  background-color: rgba(var(--rgba-contrast), 0.1);
}
.burger {
  width: 20px;
  height: 20px;
  position: relative;
  > * {
    position: absolute;
    width: 100%;
    background-color: var(--contrast);
    height: 3px;
    &:nth-child(2) {
      top: calc(50% - 1.5px);
    }
    &:nth-child(3) {
      bottom: 0;
    }
  }
}
</style>
