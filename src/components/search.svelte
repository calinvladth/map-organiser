<script>
  import "leaflet-geosearch/dist/geosearch.css";
  import { onDestroy, onMount } from "svelte";

  export let map;

  let searchControl;

  onMount(async () => {
    const S = await import("leaflet-geosearch");
    const provider = new S.OpenStreetMapProvider();

    searchControl = new S.GeoSearchControl({
      provider,
      showMarker: false,
      showPopup: false,
      popupFormat: ({ query, result }) => result.label,
      maxMarkers: 3,
      retainZoomLevel: true,
      animateZoom: true,
      autoClose: false,
      searchLabel: "string",
      keepResult: true,
    });

    map.addControl(searchControl);
  });

  onDestroy(() => {
    map.removeControl(searchControl);
  });
</script>
