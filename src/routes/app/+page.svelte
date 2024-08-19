<script lang="ts">
  import { onMount } from "svelte";
  import Button from "@/components/button.svelte";
  import { MapsApi, type MapType } from "@/api/maps";
  import { pb } from "@/services/pb";
  import replaceKeysInUrl from "../../utils/replaceKeysInURL";
  import { ROUTES } from "../../utils/constants";

  let maps: MapType[] = [];

  onMount(async () => {
    maps = await MapsApi.list(pb.authStore.model.id);
  });
</script>

<section>
  <div class="w-full border-b border-black cursor-pointer p-5 flex justify-end">
    <a href={ROUTES.MAPS_CREATE}>
      <Button>Create</Button>
    </a>
  </div>

  {#each maps as map}
    <a href={replaceKeysInUrl(ROUTES.MAP, { mapId: map.id })}>
      <div class="w-full border-b border-black cursor-pointer p-5">
        <p class="text-sm">{map.name}</p>
      </div>
    </a>
  {/each}
</section>
