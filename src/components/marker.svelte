<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onDestroy, onMount } from "svelte";
  import { ROUTES } from "../utils/constants";
  import replaceKeysInUrl from "../utils/replaceKeysInURL";
  import type { MarkerType } from "../api/markers";
  import type { MapType } from "../api/maps";

  export let location;
  export let pick: MarkerType;
  export let map: MapType;
  export let activePick: string;
  export let mapId: string;
  export let pickView: boolean = false;

  let latLng;
  let marker;

  onMount(async () => {
    const L = await import("leaflet");
    latLng = pick.location;

    marker = L.marker(latLng, { draggable: true });

    if (pickView) {
        // Make it easier to see the active marker
        L.Icon.Default.prototype.options["className"] = "blinking"
    } else {
        // Reset to avoid all markers blinking after saving
        L.Icon.Default.prototype.options["className"] = ""
    }

    if (pick.name) {
      marker.bindPopup(`${pick.name}`);
    }

    marker.on("mouseover", (event) => {
      marker.openPopup();
    });

    marker.on("mouseout", () => {
      marker.closePopup();
    });

    marker.on("click", () => {
      const location = $page.url.searchParams.get("location");
      if (!location) {
        $page.url.searchParams.set("location", `${pick.lat},${pick.lng}`);
      }

      if (pick.id) {
        $page.url.searchParams.set("activePick", pick.id);

        goto(
          replaceKeysInUrl(
            `${ROUTES.PICKS}?${$page.url.searchParams.toString()}`,
            {
              mapId: mapId,
            }
          )
        );
      }
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
    map.removeLayer(marker);
  });
</script>
