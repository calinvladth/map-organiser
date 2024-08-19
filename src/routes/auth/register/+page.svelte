<script lang="ts">
  import {
    AuthenticationApi,
    type AuthenticationForm,
    type AuthenticationFormError,
  } from "../../../api/authentication";
  import Button from "../../../components/button.svelte";

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
    await AuthenticationApi.register(form);
  }
</script>

<div>
  <p>Sign up</p>
  <form on:submit|preventDefault={onSubmit}>
    <label>Email</label>
    <input
      type="email"
      bind:value={form.email}
      class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700"
    />

    <label>Password</label>
    <input
      type="text"
      bind:value={form.password}
      class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700"
    />

    <Button buttonType="submit">Save</Button>
  </form>
</div>
