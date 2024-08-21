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
  });

  async function onSubmit() {
    formError.name = Validation.checkText(form.name);
    formError.description = Validation.checkText(form.description);

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

<section class="w-full">
  <div class="w-full border-b border-black p-5 flex justify-between gap-3">
    <Button onClick={() => window.history.back()}>Back</Button>
  </div>

  <h1 class="text-3xl p-5 border-b border-black">
    {pick?.id ? "Edit marker" : "Add marker"}
  </h1>

  <form
    on:submit|preventDefault={onSubmit}
    class="w-full flex flex-col gap-5 p-5"
  >
    <div>
      <label class="text-sm {formError.name && 'text-red-500'}">Name</label>
      <input
        type="text"
        bind:value={form.name}
        class="text-sm box-border appearance-none w-full py-2 px-3 text-gray-700 leading-tight border {formError.name
          ? 'border-red-500'
          : 'border-black'}  focus:outline-none focus:border-blue-700"
      />
    </div>

    <div>
      <label class="text-sm {formError.description && 'text-red-500'}"
        >Description</label
      >
      <textarea
        bind:value={form.description}
        class="text-sm box-border appearance-none w-full h-20 py-2 px-3 text-gray-700 leading-tight border {formError.description
          ? 'border-red-500'
          : 'border-black '} focus:outline-none focus:border-blue-700"
      />
    </div>

    <Button buttonType="submit">Save</Button>

    <p on:click={onDelete} class="text-xs text-red-500 cursor-pointer">
      Remove pick
    </p>
  </form>
</section>
