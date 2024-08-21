<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    AuthenticationApi,
    type AuthenticationForm,
    type AuthenticationFormError,
  } from "../../../api/authentication";
  import Button from "../../../components/button.svelte";
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
      <label class="text-xs {formError.password && 'text-red-500'}"
        >Password must have at least 8 characters</label
      >
    </div>

    <p class="text-xs">
      Already have an account? <a href={ROUTES.LOGIN} class="text-blue-500"
        >Login</a
      >
    </p>

    <Button buttonType="submit">Submit</Button>
  </form>
</div>
