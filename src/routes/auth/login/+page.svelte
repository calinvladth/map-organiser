<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    AuthenticationApi,
    type AuthenticationForm,
    type AuthenticationFormError,
  } from "@/api/authentication";
  import Button from "@/components/button.svelte";
  import { ROUTES } from "../../../utils/constants";
  import { Validation } from "../../../utils/validation";
  import InputGroup from "../../../components/input-group.svelte";
  import Meta from "../../../components/meta.svelte";

  const form: AuthenticationForm = {
    email: "",
    password: "",
  };

  const formError: AuthenticationFormError = {
    email: false,
    password: false,
    passwordLength: false,
  };

  async function onSubmit() {
    console.log({ form, formError });
    formError.email = Validation.checkText(form.email);
    formError.password = Validation.checkText(form.password);

    const hasErrors = Validation.checkErrors(formError);

    if (!hasErrors) {
      await AuthenticationApi.login({
        data: form,
        cb: () => {
          goto(ROUTES.MAPS);
        },
      });
    }
  }
</script>

<Meta pageTitle="Login" />

<h1 class="text-3xl text-center mb-5">Login</h1>

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
    Don't have an account? <a href={ROUTES.REGISTER} class="text-blue-500"
      >Register</a
    >
  </p>

  <Button type="submit">Submit</Button>
</form>
