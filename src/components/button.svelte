<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleClick(event: Event) {
    dispatch("click", event);
  }
</script>

<button
  on:click={handleClick}
  {...$$restProps}
  class="border border-black px-5 py-2 text-xs"
>
  <slot></slot>
</button>
