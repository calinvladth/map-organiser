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

<h1 class="text-3xl text-center mb-5">Login</h1>

<form on:submit|preventDefault={onSubmit} class="flex flex-col gap-5">
  <div>
    <label class="text-sm {formError.email && 'text-red-500'}">Email</label>
    <input
      type="email"
      bind:value={form.email}
      class="text-sm box-border appearance-none w-full py-2 px-3 text-gray-700 leading-tight border {formError.email
        ? 'border-red-500'
        : 'border-black'} focus:outline-none focus:border-blue-700"
    />
  </div>

  <div>
    <label class="text-sm {formError.password && 'text-red-500'}"
      >Password</label
    >
    <input
      type="password"
      bind:value={form.password}
      class="text-sm box-border appearance-none w-full py-2 px-3 text-gray-700 leading-tight border {formError.password
        ? 'border-red-500'
        : 'border-black'} focus:outline-none focus:border-blue-700"
    />
  </div>

  <p class="text-xs">
    Don't have an account? <a href={ROUTES.REGISTER} class="text-blue-500"
      >Register</a
    >
  </p>

  <Button buttonType="submit">Submit</Button>
</form>
