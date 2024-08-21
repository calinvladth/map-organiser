<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { pb } from "@/services/pb";
  import { ROUTES } from "@/utils/constants";
  import Loading from "@/components/loading.svelte";

  let loaded = false;

  onMount(() => {
    if (pb.authStore.isValid) {
      goto(ROUTES.MAPS);
    }

    loaded = true;
  });
</script>

{#if loaded}
  <section class="w-full h-screen flex justify-center items-center flex-col">
    <div class="w-96">
      <slot></slot>
    </div>
  </section>
{:else}
  <Loading />
{/if}
