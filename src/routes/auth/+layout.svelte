<script>
  import { goto } from "$app/navigation";
  import "@/app.css";
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
  <section>
    <div class="w-1/2 h-full border border-red-500">
      <slot></slot>
    </div>
  </section>
{:else}
  <Loading />
{/if}
