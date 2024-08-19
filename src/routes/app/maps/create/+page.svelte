<script lang="ts">
  import { goto } from "$app/navigation";
  import { MapsApi, type MapsForm, type MapsFormError } from "@/api/maps";
  import Button from "@/components/button.svelte";
  import { pb } from "@/services/pb";
  import { ROUTES } from "../../../../utils/constants";

  const form: MapsForm = {
    name: "",
    user: "",
  };

  const formError: MapsFormError = {
    name: false,
    user: false,
  };

  async function onSubmit() {
    form.user = pb.authStore.model.id;
    await MapsApi.create({
      data: form,
      cb: () => {
        goto(ROUTES.MAPS);
      },
    });
  }
</script>

<p>Create map</p>

<form on:submit|preventDefault={onSubmit}>
  <label>Map name</label>
  <input
    type="text"
    bind:value={form.name}
    class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700"
  />

  <Button buttonType="submit">Save</Button>
</form>
