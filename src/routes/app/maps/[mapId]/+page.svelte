<script lang="ts">
  import Map from "@/components/map.svelte";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Button from "@/components/button.svelte";
  import { MapsApi, type MapType } from "@/api/maps";
  import { MarkersApi, type MarkerType } from "@/api/markers";
  import replaceKeysInUrl from "../../../../utils/replaceKeysInURL";
  import { MAP_ZOOM, ROUTES } from "../../../../utils/constants";
  import Meta from "../../../../components/meta.svelte";
  import Loading from "../../../../components/loading.svelte";

  const zoom = $page.url.searchParams.get("zoom") || MAP_ZOOM;
  const mapId = $page.params.mapId;

  let map: MapType;
  let picks: MarkerType[];

  let location = $page.url.searchParams.get("location");
  let activePick = $page.url.searchParams.get("activePick");
  let loaded = false;
  let addPickView = false;

  async function getLocation() {
    if ("geolocation" in navigator) {
      await navigator.geolocation.getCurrentPosition((position) => {
        location = [position.coords.latitude, position.coords.longitude];
      });
    }
  }

  async function addMapStartingPoint() {
    const data = {
      ...map,
      lat: location[0],
      lng: location[1],
    };

    await MapsApi.update({
      mapId: map.id,
      data,
      cb: async () => {
        map = await MapsApi.listById(mapId);
        addPickView = false;
      },
    });
  }

  onMount(async () => {
    map = await MapsApi.listById(mapId);
    picks = await MarkersApi.list(mapId);

    if (!location) {
      if (map.isCentered) {
        location = [map.lat, map.lng];
      } else {
        await getLocation();
      }
    } else {
      location = location.split(",");
    }

    $page.url.searchParams.set("zoom", zoom);
    goto(`?${$page.url.searchParams.toString()}`);

    loaded = true;
  });

  function goToPick() {
    const isLocation = $page.url.searchParams.get("location");

    if (!isLocation) {
      $page.url.searchParams.set("location", location);
    }

    goto(
      replaceKeysInUrl(`${ROUTES.PICKS}?${$page.url.searchParams.toString()}`, {
        mapId: mapId,
      })
    );
  }
</script>

{#if loaded}
  <Meta pageTitle={map?.name} />

  <div class="flex flex-col h-full">
    <div class="w-full border-b border-black p-5 flex justify-between gap-3">
      <div>
        <Button on:click={() => goto(ROUTES.MAPS)}>Back</Button>
        <Button
          on:click={() => {
            goto(replaceKeysInUrl(ROUTES.MAP_EDIT, { mapId }));
          }}>Edit map</Button
        >
      </div>
      <div>
        {#if !map?.isCentered}
          <Button
            on:click={() => {
              addPickView = !addPickView;
            }}
          >
            {addPickView ? "Cancel" : "Add map starting point"}
          </Button>
          {#if addPickView}
            <Button on:click={addMapStartingPoint}>Save</Button>
          {/if}
        {:else}
          {#if activePick}
            <Button
              on:click={() => {
                activePick = "";
                $page.url.searchParams.delete("activePick");
                goto(`?${$page.url.searchParams.toString()}`);
              }}>Cancel</Button
            >

            <Button on:click={goToPick}>Edit pick details</Button>
          {:else}
            <Button
              on:click={() => {
                addPickView = !addPickView;
              }}>{addPickView ? "Cancel" : "Add pick"}</Button
            >
          {/if}

          {#if addPickView}
            <Button on:click={goToPick}>Add pick details</Button>
          {/if}
        {/if}
      </div>
    </div>

    <div class=" h-full relative">
      {#if location}
        <Map
          {zoom}
          {mapId}
          bind:location
          bind:activePick
          {addPickView}
          {picks}
        />
      {:else}
        <p class="p-5">Map is loading</p>
      {/if}
    </div>
  </div>
{:else}
  <Loading />
{/if}
