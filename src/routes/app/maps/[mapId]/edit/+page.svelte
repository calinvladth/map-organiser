<script lang="ts">
  import Loading from "@/components/loading.svelte";
  import { Validation } from "@/utils/validation.ts";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import {
    MapsApi,
    type MapsForm,
    type MapsFormError,
    type MapType,
  } from "@/api/maps";
  import Button from "@/components/button.svelte";
  import { pb } from "@/services/pb";
  import { ROUTES } from "@/utils/constants";
  import { onMount } from "svelte";
  import replaceKeysInUrl from "../../../../../utils/replaceKeysInURL";
  import InputGroup from "../../../../../components/input-group.svelte";
  import Meta from "../../../../../components/meta.svelte";

  let loaded = false;
  let map: MapType;

  const mapId = $page.params.mapId;

  const form: MapsForm = {
    name: "",
    user: "",
  };

  const formError: MapsFormError = {
    name: false,
    user: false,
  };

  onMount(async () => {
    map = await MapsApi.listById(mapId);

    form.name = map.name;

    loaded = true;
  });

  async function onSubmit() {
    form.user = pb.authStore.model.id;

    formError.name = Validation.checkText(form.name);

    const hasErrors = Validation.checkErrors(formError);

    if (!hasErrors) {
      await MapsApi.update({
        mapId,
        data: form,
        cb: () => {
          goto(ROUTES.MAPS);
        },
      });
    }
  }

  async function onDelete() {
    await MapsApi.remove({
      mapId,
      cb: () => {
        goto(ROUTES.MAPS);
      },
    });
  }
</script>

{#if loaded}
  <Meta pageTitle="Edit {map?.name}" />

  <section class="w-full">
    <div class="w-full border-b border-black p-5 flex justify-between gap-3">
      <Button on:click={() => goto(replaceKeysInUrl(ROUTES.MAP, { mapId }))}
        >Back</Button
      >
    </div>

    <h1 class="text-3xl p-5 border-b border-black">{map.name}</h1>

    <form
      on:submit|preventDefault={onSubmit}
      class="w-full flex flex-col gap-5 p-5"
    >
      <InputGroup
        type="text"
        bind:value={form.name}
        isError={formError.name}
        labelName="Map Name"
      />

      <Button type="submit">Save</Button>

      <p on:click={onDelete} class="text-xs text-red-500 cursor-pointer">
        Remove map
      </p>
    </form>
  </section>
{:else}
  <Loading />
{/if}
