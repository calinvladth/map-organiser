<script>
    import { onMount, onDestroy } from 'svelte';
    import Marker from './marker.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

    export let zoom = 13;
    export let location;
    export let addPickView;
    export let picks = []

    let L;
    let mapElement;
    let map;
    let loaded = false
    

    onMount(async () => {
        L = await import('leaflet');

        // TODO: Handle map location on init

        map = L.map(mapElement, { 
            center: location,
            zoom: zoom
        })

        // TODO: Handle on click?
        map.on('click', (event) => console.log('Map clicked: ', event))

        map.on('dragend', (event) => {
            const center = event.target.getCenter()

            location = [center.lat, center.lng]

            $page.url.searchParams.set('location', `${center.lat},${center.lng}`)
            goto(`?${$page.url.searchParams.toString()}`)
        })

        map.on('zoomend', (event) => {
            const center = event.target.getCenter()
            
            location = [center.lat, center.lng]

            $page.url.searchParams.set('location', `${center.lat},${center.lng}`)
            $page.url.searchParams.set('zoom', event.target._zoom)
            goto(`?${$page.url.searchParams.toString()}`)
        })


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.panTo(location)


        loaded = true
    });

    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });
</script>


<main>
    {#if loaded}
        {#if addPickView}
            <Marker map={map} location={location} /> 
        {:else}
            {#each picks as pick}
            <Marker map={map} location={pick}/>
            {/each}
        {/if}
       
    {/if}
    <div class="w-full h-full absolute inset-0" bind:this={mapElement}></div>
</main>

