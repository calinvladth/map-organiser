<script>
  import { AuthenticationApi } from "./../../api/authentication.ts";
  import Button from "./../../components/button.svelte";
  import { onMount } from "svelte";
  import { pb } from "@/services/pb";
  import { goto } from "$app/navigation";
  import { ROUTES } from "@/utils/constants";
  import Loading from "@/components/loading.svelte";

  let loaded = false;
  let account;

  onMount(() => {
    if (!pb.authStore.isValid) {
      goto(ROUTES.LOGIN);
    }

    account = pb.authStore.model;

    loaded = true;
  });
</script>

{#if loaded}
  <section class="flex items-start justify-start h-screen">
    <div class="w-1/3 h-full border border-black">
      <nav class="flex flex-col">
        <p>{account.email}</p>
        <Button
          onClick={() =>
            AuthenticationApi.logout(() => {
              goto(ROUTES.LOGIN);
            })}
        >
          Logout
        </Button>
        <a href={ROUTES.MAPS}>Maps</a>
        <a href={ROUTES.ACCOUNT}>Account</a>
      </nav>
    </div>

    <div class="w-full h-full border border-red-500">
      <slot></slot>
    </div>
  </section>
{:else}
  <Loading />
{/if}
