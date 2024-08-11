<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onDestroy, onMount } from "svelte";

  export let location;
  export let pick;
  export let map;
  export let activePick;

  let latLng;
  let marker;

  console.log("WTF!?");

  onMount(async () => {
    console.log("AAAAAA:", pick);
    const L = await import("leaflet");
    latLng = pick.location;

    marker = L.marker(latLng, { draggable: true }).bindPopup(
      `${latLng[0]} ${latLng[1]} / ${location}`
    );

    marker.on("dragend", (event) => {
      const markerLocation = event.target.getLatLng();

      latLng = [markerLocation.lat, markerLocation.lng];

      if (location) {
        location = latLng;

        $page.url.searchParams.set(
          "location",
          `${markerLocation.lat},${markerLocation.lng}`
        );
      }

      if (pick.id) {
        activePick = pick.id;
        $page.url.searchParams.set("activePick", pick.id);
      }

      goto(`?${$page.url.searchParams.toString()}`);
    });

    map.addLayer(marker);
  });
  onDestroy(() => {
    console.log("Destroy: ", pick.id);
    map.removeLayer(marker);
  });
</script>
