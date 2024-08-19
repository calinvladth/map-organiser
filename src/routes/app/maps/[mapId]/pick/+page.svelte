<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import Button from "@/components/button.svelte";
  import { MarkersApi, type MarkerType } from "@/api/markers";
  import { pb } from "@/services/pb";
  import { goto } from "$app/navigation";
  import replaceKeysInUrl from "../../../../../utils/replaceKeysInURL";
  import { ROUTES } from "../../../../../utils/constants";

  let pick: MarkerType;

  let location = $page.url.searchParams.get("location");
  const pickId = $page.url.searchParams.get("activePick");
  const { mapId } = $page.params;

  let form: MarkerType = {
    lat: "",
    lng: "",
    name: "",
    description: "",
    user: "",
    map: mapId,
  };

  onMount(async () => {
    if (location) {
      location = location?.split(",");
      if (location?.length !== 0) {
        form.lat = location[0];
        form.lng = location[1];
      }
    }

    pick = await MarkersApi.listById(pickId);
    form = {
      ...form,
      ...pick,
      user: pb.authStore.model.id,
      lat: location[0],
      lng: location[1],
    };
  });

  async function onSubmit() {
    if (pick?.id) {
      MarkersApi.update({
        pickId: pick.id,
        data: form,
        cb: () => {
          $page.url.searchParams.delete("activePick");
          goto(
            replaceKeysInUrl(
              `${ROUTES.MAP}?${$page.url.searchParams.toString()}`,
              { mapId: mapId }
            )
          );
        },
      });
      return;
    }

    MarkersApi.create({
      data: form,
      cb: () => {
        $page.url.searchParams.delete("activePick");
        goto(
          replaceKeysInUrl(
            `${ROUTES.MAP}?${$page.url.searchParams.toString()}`,
            { mapId: mapId }
          )
        );
      },
    });
  }
</script>

<div class="w-full border-b border-black cursor-pointer p-5 flex justify-end">
  <Button onClick={() => window.history.back()}>Back</Button>
</div>

{#if location}
  <p>Pick {location[0]} {location[1]}</p>
{/if}

<form on:submit|preventDefault={onSubmit}>
  <label>Name</label>
  <input
    type="text"
    bind:value={form.name}
    class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700"
  />

  <label>Description</label>
  <input
    type="text"
    bind:value={form.description}
    class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700"
  />

  <Button buttonType="submit">Save</Button>
</form>
