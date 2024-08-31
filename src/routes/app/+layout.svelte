<script lang="ts">
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
    <div
      class="w-1/6 h-full border-r border-black flex items-center flex-col py-5"
    >
      <div
        class="border border-black w-20 h-20 rounded-full text-center flex items-center justify-center"
        title={account.email}
      >
        <p class="text-3xl font-thin pb-1">
          {Array.from(account.username)[0]}{Array.from(account.username)[1]}
        </p>
      </div>
      <nav class="w-full flex flex-col border-t border-black mt-5 navbar">
        <a href={ROUTES.MAPS} class="border-b border-black p-5">Maps</a>
        <a href={ROUTES.ACCOUNT} class="border-b border-black p-5">Account</a>
      </nav>
    </div>

    <div class="w-full h-full">
      <slot></slot>
    </div>
  </section>
{:else}
  <Loading />
{/if}
