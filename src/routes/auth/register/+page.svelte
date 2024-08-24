<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    AuthenticationApi,
    type AuthenticationForm,
    type AuthenticationFormError,
  } from "../../../api/authentication";
  import Button from "../../../components/button.svelte";
  import InputGroup from "../../../components/input-group.svelte";
  import { ROUTES } from "../../../utils/constants";
  import { Validation } from "../../../utils/validation";

  const form: AuthenticationForm = {
    email: "",
    password: "",
  };

  const formError: AuthenticationFormError = {
    email: false,
    password: false,
  };

  async function onSubmit() {
    formError.email = Validation.checkText(form.email);
    formError.password = Validation.checkStringRequiredLength(form.password, 8);

    const hasErrors = Validation.checkErrors(formError);

    if (!hasErrors) {
      await AuthenticationApi.register({
        data: form,
        cb: () => {
          goto(ROUTES.MAPS);
        },
      });
    }
  }
</script>

<div>
  <h1 class="text-3xl text-center mb-5">Register</h1>
  <form on:submit|preventDefault={onSubmit} class="flex flex-col gap-5">
    <InputGroup
      type="email"
      bind:value={form.email}
      isError={formError.email}
      labelName="Email"
    />

    <InputGroup
      type="password"
      bind:value={form.password}
      isError={formError.password}
      labelName="Password"
    />

    <p class="text-xs">
      Already have an account? <a href={ROUTES.LOGIN} class="text-blue-500"
        >Login</a
      >
    </p>

    <Button type="submit">Submit</Button>
  </form>
</div>
