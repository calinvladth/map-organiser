<script lang="ts">
  import { Validation } from "./../../../../utils/validation.ts";
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

    formError.name = Validation.checkText(form.name);

    const hasErrors = Validation.checkErrors(formError);

    if (!hasErrors) {
      await MapsApi.create({
        data: form,
        cb: () => {
          goto(ROUTES.MAPS);
        },
      });
    }
  }
</script>

<section class="w-full h-full flex items-center justify-center flex-col">
  <h1 class="text-3xl mb-5">Create map</h1>

  <form on:submit|preventDefault={onSubmit} class="w-96 flex flex-col gap-5">
    <div>
      <label class="text-sm {formError.name && 'text-red-500'}">Map name</label>
      <input
        type="text"
        bind:value={form.name}
        class="text-sm box-border appearance-none w-full py-2 px-3 text-gray-700 leading-tight border {formError.name
          ? 'border-red-500'
          : 'border-black'} focus:outline-none focus:border-blue-700"
      />
    </div>

    <Button buttonType="submit">Save</Button>
  </form>
</section>
