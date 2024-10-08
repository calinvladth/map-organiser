<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Marker from "./marker.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Search from "./search.svelte";
  import { MAP_ZOOM } from "../utils/constants";

  export let zoom = MAP_ZOOM;
  export let location: Array<number>;
  export let addPickView;
  export let picks = [];
  export let activePick;
  export let mapId;

  let L;
  let mapElement: HTMLElement;
  let map: any;
  let loaded = false;

  onMount(async () => {
    L = await import("leaflet");

    // TODO: Handle map location on init

    map = L.map(mapElement, {
      center: location,
      zoom: zoom,
    });

    map.on("dragend", (event: any) => {
      const center = event.target.getCenter();

      location = [center.lat, center.lng];

      $page.url.searchParams.set("location", `${center.lat},${center.lng}`);
      goto(`?${$page.url.searchParams.toString()}`);
    });

    map.on("geosearch/showlocation", (event: any) => {
      const latLng = [event.location.y, event.location.x];
      location = latLng;

      $page.url.searchParams.set("location", `${latLng[0]},${latLng[1]}`);
      goto(`?${$page.url.searchParams.toString()}`);
    });

    map.on("zoomend", (event: any) => {
      const center = event.target.getCenter();

      location = [center.lat, center.lng];

      $page.url.searchParams.set("location", `${center.lat},${center.lng}`);
      $page.url.searchParams.set("zoom", event.target._zoom);
      goto(`?${$page.url.searchParams.toString()}`);
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.panTo(location);

    loaded = true;
  });

  onDestroy(async () => {
    if (map) {
      map.remove();
    }
  });
</script>

<main>
  <div class="pointer"></div>
  {#if loaded}
    {#if addPickView}
      <Marker {map} pick={{ location }} pickView={true} bind:activePick bind:location />
    {/if}
    {#if activePick}
      <Marker
        {map}
        {mapId}
        pick={{
          id: activePick,
          location,
        }}
        bind:activePick
        bind:location
      />
    {:else}
      {#each picks as pick}
        <Marker {map} {pick} {mapId} bind:activePick bind:location />
      {/each}
    {/if}
    <Search {map} />
  {/if}
  <div class="w-full h-full absolute inset-0" bind:this={mapElement}></div>
</main>
