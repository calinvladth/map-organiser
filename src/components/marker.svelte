<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onDestroy, onMount } from "svelte";
  import { ROUTES } from "../utils/constants";
  import replaceKeysInUrl from "../utils/replaceKeysInURL";

  export let location;
  export let pick;
  export let map;
  export let activePick;
  export let mapId;

  let latLng;
  let marker;

  onMount(async () => {
    const L = await import("leaflet");
    latLng = pick.location;

    marker = L.marker(latLng, { draggable: true }).bindPopup(
      `${latLng[0]} ${latLng[1]} / ${location}`
    );

    marker.on("mouseover", (event) => {
      marker.openPopup();
    });

    marker.on("mouseout", () => {
      marker.closePopup();
    });

    marker.on("click", () => {
      $page.url.searchParams.set("activePick", pick.id);
      goto(
        replaceKeysInUrl(
          `${ROUTES.PICKS}?${$page.url.searchParams.toString()}`,
          {
            mapId: mapId,
          }
        )
      );
    });

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
