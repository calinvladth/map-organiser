<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    AuthenticationApi,
    type AuthenticationForm,
    type AuthenticationFormError,
  } from "@/api/authentication";
  import Button from "@/components/button.svelte";
  import { ROUTES } from "../../../utils/constants";

  const form: AuthenticationForm = {
    email: "",
    password: "",
  };

  const formError: AuthenticationFormError = {
    email: false,
    password: false,
  };

  async function onSubmit() {
    console.log({ form, formError });
    await AuthenticationApi.login({
      data: form,
      cb: () => {
        goto(ROUTES.MAPS);
      },
    });
  }
</script>

<div>
  <p>Login</p>

  <form on:submit|preventDefault={onSubmit}>
    <label>Email</label>
    <input
      type="email"
      bind:value={form.email}
      class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700"
    />

    <label>Password</label>
    <input
      type="password"
      bind:value={form.password}
      class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700"
    />

    <p class="text-xs">
      Don't have an account? <a href={ROUTES.REGISTER} class="text-blue-500"
        >Register</a
      >
    </p>

    <Button buttonType="submit">Save</Button>
  </form>
</div>
