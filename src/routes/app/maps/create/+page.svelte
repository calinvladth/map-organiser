<script lang="ts">
  import { Validation } from "./../../../../utils/validation.ts";
  import { goto } from "$app/navigation";
  import { MapsApi, type MapsForm, type MapsFormError } from "@/api/maps";
  import Button from "@/components/button.svelte";
  import { pb } from "@/services/pb";
  import { ROUTES } from "../../../../utils/constants";
  import InputGroup from "../../../../components/input-group.svelte";

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

<section class="w-full">
  <div class="w-full border-b border-black p-5 flex justify-between gap-3">
    <Button on:click={() => goto(ROUTES.MAPS)}>Back</Button>
  </div>

  <h1 class="text-3xl p-5 border-b border-black">Create map</h1>

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
  </form>
</section>
