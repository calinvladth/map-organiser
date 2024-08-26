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
  class="border border-black px-5 py-2 rounded text-xs hover:bg-black hover:text-white duration-300"
>
  <slot></slot>
</button>
