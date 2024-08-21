<script lang="ts">
  import { AuthenticationApi } from "./../../../api/authentication.ts";
  import { AccountApi } from "./../../../api/account.ts";
  import { Validation } from "./../../../utils/validation";
  import { goto } from "$app/navigation";
  import Button from "../../../components/button.svelte";
  import { ROUTES } from "../../../utils/constants";
  import type {
    AccountFormErrorType,
    AccountType,
    AccountPasswordType,
    AccountPasswordFormErrorType,
  } from "../../../api/account";
  import { onMount } from "svelte";
  import { pb } from "../../../services/pb";

  const accountId = pb.authStore.model.id;
  let account: AccountType;

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

<section class="w-full h-full overflow-auto">
  <div class="w-full border-b border-black p-5 flex justify-between gap-3">
    <Button onClick={() => goto(ROUTES.MAPS)}>Back</Button>
  </div>

  <h1 class="text-3xl p-5 border-b border-black">Account</h1>

  <form
    on:submit|preventDefault={onSubmit}
    class="w-full flex flex-col gap-5 p-5"
  >
    <div>
      <label class="text-sm {formError.name && 'text-red-500'}">Username</label>
      <input
        type="text"
        bind:value={form.username}
        class="text-sm box-border appearance-none w-full py-2 px-3 text-gray-700 leading-tight border {formError.username
          ? 'border-red-500'
          : 'border-black'} focus:outline-none focus:border-blue-700"
      />
    </div>

    <div>
      <label class="text-sm {formError.name && 'text-red-500'}">Email</label>
      <input
        type="email"
        bind:value={form.email}
        class="text-sm box-border appearance-none w-full py-2 px-3 text-gray-700 leading-tight border {formError.email
          ? 'border-red-500'
          : 'border-black'} focus:outline-none focus:border-blue-700"
      />
    </div>

    <Button buttonType="submit">Save</Button>
  </form>

  <h1 class="text-3xl p-5 border-b border-black mt-5">Change Password</h1>

  <form
    on:submit|preventDefault={onPasswordChange}
    class="w-full flex flex-col gap-5 p-5"
  >
    <div>
      <label class="text-sm {formPasswordError.oldPassword && 'text-red-500'}"
        >Old password</label
      >
      <input
        type="password"
        bind:value={formPassword.oldPassword}
        class="text-sm box-border appearance-none w-full py-2 px-3 text-gray-700 leading-tight border {formPasswordError.oldPassword
          ? 'border-red-500'
          : 'border-black'} focus:outline-none focus:border-blue-700"
      />
    </div>

    <div>
      <label class="text-sm {formPasswordError.password && 'text-red-500'}"
        >New password</label
      >
      <input
        type="password"
        bind:value={formPassword.password}
        class="text-sm box-border appearance-none w-full py-2 px-3 text-gray-700 leading-tight border {formPasswordError.password
          ? 'border-red-500'
          : 'border-black'} focus:outline-none focus:border-blue-700"
      />
    </div>

    <div>
      <label
        class="text-sm {formPasswordError.passwordConfirm && 'text-red-500'}"
        >Repeat new password</label
      >
      <input
        type="password"
        bind:value={formPassword.passwordConfirm}
        class="text-sm box-border appearance-none w-full py-2 px-3 text-gray-700 leading-tight border {formPasswordError.passwordConfirm
          ? 'border-red-500'
          : 'border-black'} focus:outline-none focus:border-blue-700"
      />
    </div>

    <Button buttonType="submit">Save</Button>
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
