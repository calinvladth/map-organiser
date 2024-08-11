<script>
  import { onMount, onDestroy } from "svelte";
  import Marker from "./marker.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Search from "./search.svelte";

  export let zoom = 13;
  export let location;
  export let addPickView;
  export let picks = [];
  export let activePick;

  let L;
  let mapElement;
  let map;
  let loaded = false;

  onMount(async () => {
    L = await import("leaflet");

    // TODO: Handle map location on init

    map = L.map(mapElement, {
      center: location,
      zoom: zoom,
    });

    // TODO: Handle on click?
    map.on("click", (event) => console.log("Map clicked: ", event));

    map.on("dragend", (event) => {
      const center = event.target.getCenter();

      location = [center.lat, center.lng];

      $page.url.searchParams.set("location", `${center.lat},${center.lng}`);
      goto(`?${$page.url.searchParams.toString()}`);
    });

    map.on("geosearch/showlocation", (event) => {
      const latLng = [event.location.y, event.location.x];
      console.log(event.location.y, event.location.x);
      location = latLng;

      $page.url.searchParams.set("location", `${latLng[0]},${latLng[1]}`);
      goto(`?${$page.url.searchParams.toString()}`);
    });

    map.on("zoomend", (event) => {
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
      console.log("Unloading Leaflet map.");
      map.remove();
    }
  });
</script>

<main>
  {#if loaded}
    {#if addPickView}
      <Marker {map} pick={{ location }} bind:activePick bind:location />
    {:else if activePick}
      <Marker
        {map}
        pick={{
          id: activePick,
          location,
        }}
        bind:activePick
        bind:location
      />
    {:else}
      {#each picks as pick}
        <Marker {map} {pick} bind:activePick bind:location />
      {/each}
    {/if}
    <Search {map} />
  {/if}
  <div class="w-full h-full absolute inset-0" bind:this={mapElement}></div>
</main>
