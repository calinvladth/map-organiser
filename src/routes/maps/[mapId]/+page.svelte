<script>
  import Map from "../../../components/map.svelte";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Button from "../../../components/button.svelte";

  const zoom = $page.url.searchParams.get('zoom') || 10
  let location = $page.url.searchParams.get('location')
  let loaded = false
  let addPickView = false

  const picks = [
    [44.45216343349134, 25.985069274902347],
    [44.4548592065362, 26.16325378417969],
    [44.46613109099745, 26.10935211181641],
  ]

  async function getLocation() {
    if ("geolocation" in navigator) {
       await navigator.geolocation.getCurrentPosition((position) => {
            location = [position.coords.latitude, position.coords.longitude]
        console.log({lat: position.coords.latitude, lng: position.coords.longitude})
    });
    } 
  }

  onMount(async () => {
    if (!location) {
        await getLocation()
    } else {
        location = location.split(',')
    }
    
    $page.url.searchParams.set('zoom', zoom)
    goto(`?${$page.url.searchParams.toString()}`)

    loaded = true
  })
</script>

<div class="flex flex-col h-full">
    <div class="w-full border-b border-black cursor-pointer p-5 flex justify-end gap-3">
        <Button onClick={() => {addPickView = !addPickView}}>{addPickView ? 'Cancel' : 'Add pick'}</Button>
        {#if addPickView}
            <a href="/maps/21/pick/create?location={location}">
                <Button>Add pick details</Button>
            </a>
        {/if}
    </div>

    <div class="border border-black h-full relative">
        {#if loaded && location}
            <Map zoom={zoom} bind:location={location} picks={picks} addPickView={addPickView}/>
        {:else}
            <p>Map is loading</p>
        {/if}
    </div>

</div>
 