<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onDestroy, onMount } from "svelte";

    export let location;
    export let map;

    let marker; 

    onMount(async () => {
        const L = await import('leaflet');

        marker = L.marker(location, {draggable: true}).bindPopup(`${location[0]} ${location[1]}`)

        marker.on('dragend', (event) => {
            const markerLocation = event.target.getLatLng()

            location = [markerLocation.lat, markerLocation.lng]

            $page.url.searchParams.set('location', `${markerLocation.lat},${markerLocation.lng}`)
            goto(`?${$page.url.searchParams.toString()}`)
        })

        map.addLayer(marker)
    })
    onDestroy(() => {
        map.removeLayer(marker)
    })
</script>