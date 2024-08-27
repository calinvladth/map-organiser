<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../../../components/button.svelte";
  import InputGroup from "../../../components/input-group.svelte";
  import { goto } from "$app/navigation";
  import { pb } from "../../../services/pb";
  import { ROUTES } from "../../../utils/constants";
  import { Validation } from "../../../utils/validation";
  import {
    type AccountType,
    type AccountFormErrorType,
    type AccountPasswordType,
    type AccountPasswordFormErrorType,
    AccountApi,
  } from "../../../api/account";
  import { AuthenticationApi } from "../../../api/authentication";
  import Loading from "../../../components/loading.svelte";
  import Meta from "../../../components/meta.svelte";

  const accountId = pb.authStore.model.id;
  let account: AccountType;
  let loaded = false;

  let form: AccountType = {
    username: "",
    email: "",
  };

  let formError: AccountFormErrorType = {
    username: false,
    email: false,
  };

  let formPassword: AccountPasswordType = {
    oldPassword: "",
    password: "",
    passwordConfirm: "",
  };

  let formPasswordError: AccountPasswordFormErrorType = {
    oldPassword: false,
    password: false,
    passwordConfirm: false,
  };

  onMount(async () => {
    account = await AccountApi.listById(accountId);

    form.email = account.email;
    form.username = account.username;
    loaded = true;
  });

  async function onSubmit() {
    formError.username = Validation.checkText(form.username);
    formError.email = Validation.checkText(form.email);

    const hasErrors = Validation.checkErrors(formError);

    if (!hasErrors) {
      await AccountApi.update({
        accountId,
        data: form,
        cb: async () => {
          account = await AccountApi.listById(accountId);

          form.email = account.email;
          form.username = account.username;
        },
      });
    }
  }

  function onPasswordChange() {
    alert("Not implemented");
  }
</script>

{#if loaded}
  <Meta pageTitle="Account" />

  <section class="w-full h-full overflow-auto">
    <div class="w-full border-b border-black p-5 flex justify-between gap-3">
      <Button on:click={() => goto(ROUTES.MAPS)}>Back</Button>
    </div>

    <h1 class="text-3xl p-5 border-b border-black">Account</h1>

    <form
      on:submit|preventDefault={onSubmit}
      class="w-full flex flex-col gap-5 p-5"
    >
      <InputGroup
        type="text"
        bind:value={form.username}
        isError={formError.username}
        labelName="Username"
      />

      <InputGroup
        type="email"
        bind:value={form.email}
        isError={formError.email}
        labelName="Email"
      />

      <Button type="submit">Save</Button>
    </form>

    <h1 class="text-3xl p-5 border-b border-black mt-5">Change password</h1>

    <form
      on:submit|preventDefault={onPasswordChange}
      class="w-full flex flex-col gap-5 p-5"
    >
      <InputGroup
        type="password"
        bind:value={formPassword.oldPassword}
        isError={formPasswordError.oldPassword}
        labelName="Old password"
      />

      <InputGroup
        type="password"
        bind:value={formPassword.password}
        isError={formPasswordError.password}
        labelName="New password"
      />

      <InputGroup
        type="password"
        bind:value={formPassword.passwordConfirm}
        isError={formPasswordError.passwordConfirm}
        labelName="Repeat new password"
      />

      <Button type="submit">Save</Button>
    </form>

    <p
      class="text-sm text-red-500 cursor-pointer p-5"
      on:click={() =>
        AuthenticationApi.logout(() => {
          goto(ROUTES.LOGIN);
        })}
    >
      Logout
    </p>
  </section>
{:else}
  <Loading />
{/if}
