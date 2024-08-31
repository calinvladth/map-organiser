<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import Button from "@/components/button.svelte";
  import {
    MarkersApi,
    type MarkerType,
    type MarkerFormError,
  } from "@/api/markers";
  import { pb } from "@/services/pb";
  import { goto } from "$app/navigation";
  import replaceKeysInUrl from "../../../../../utils/replaceKeysInURL";
  import { ROUTES } from "../../../../../utils/constants";
  import { Validation } from "../../../../../utils/validation";
  import InputGroup from "../../../../../components/input-group.svelte";
  import Meta from "../../../../../components/meta.svelte";
  import Loading from "../../../../../components/loading.svelte";

  let loaded = false;
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

  let formError: MarkerFormError = {
    name: false,
    description: false,
  };

  onMount(async () => {
    if (location) {
      location = location?.split(",");
      if (location?.length !== 0) {
        form.lat = location[0];
        form.lng = location[1];
      }
    }

    if (pickId) {
      pick = await MarkersApi.listById(pickId);
    }

    form = {
      ...form,
      ...pick,
      user: pb.authStore.model.id,
      lat: location[0],
      lng: location[1],
    };
    loaded = true;
  });

  async function onSubmit() {
    formError.name = Validation.checkText(form.name);

    const hasError = Validation.checkErrors(formError);

    if (!hasError) {
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
  }

  async function onDelete() {
    await MarkersApi.remove({
      pickId,
      cb: () => {
        goto(replaceKeysInUrl(ROUTES.MAP, { mapId }));
      },
    });
  }
</script>

{#if loaded}
  <Meta pageTitle={pick?.id ? `Edit ${pick?.name}` : "Add Marker"} />

  <section class="w-full">
    <div class="w-full border-b border-black p-5 flex justify-between gap-3">
      <Button on:click={() => window.history.back()}>Back</Button>
    </div>

    <h1 class="text-3xl p-5 border-b border-black">
      {pick?.id ? `Edit ${pick?.name}` : "Add marker"}
    </h1>

    <form
      on:submit|preventDefault={onSubmit}
      class="w-full flex flex-col gap-5 p-5"
    >
      <InputGroup
        type="text"
        bind:value={form.name}
        isError={formError.name}
        labelName="Name"
      />

      <InputGroup
        type="text"
        bind:value={form.description}
        isError={formError.description}
        labelName="Description"
        isTextArea
      />

      <Button type="submit">Save</Button>

      <p on:click={onDelete} class="text-xs text-red-500 cursor-pointer">
        Remove pick
      </p>
    </form>
  </section>
{:else}
  <Loading />
{/if}
