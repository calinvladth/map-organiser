<script lang="ts">
  import { onMount } from "svelte";
  import Button from "@/components/button.svelte";
  import { MapsApi, type MapType } from "@/api/maps";
  import { pb } from "@/services/pb";
  import replaceKeysInUrl from "../../utils/replaceKeysInURL";
  import { ROUTES } from "../../utils/constants";
  import { goto } from "$app/navigation";
  import Meta from "../../components/meta.svelte";

  let maps: MapType[] = [];

  onMount(async () => {
    maps = await MapsApi.list(pb.authStore.model.id);
  });
</script>

<Meta pageTitle="All maps" />

<section class="w-full h-full">
  <div class="w-full border-b border-black cursor-pointer p-5 flex justify-end">
    <Button on:click={() => goto(ROUTES.MAPS_CREATE)}>Create</Button>
  </div>

  <h1 class="text-3xl p-5 border-b border-black">Maps {@html maps.length > 0 ? "<small>(" + maps.length + ")</small>": ""}</h1>

  {#if maps.length === 0}
    <div class="w-full h-full flex items-center justify-center">
      <a href="{ROUTES.MAPS_CREATE}" class="underline">Create your first map</a>
    </div>
  {/if}

  {#each maps as map}
    <a href={replaceKeysInUrl(ROUTES.MAP, { mapId: map.id })}>
      <div class="w-full border-b border-black cursor-pointer p-5">
        <p class="text-sm">{map.name}</p>
      </div>
    </a>
  {/each}
</section>
