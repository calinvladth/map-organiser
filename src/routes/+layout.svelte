<script lang="ts">
  import { goto } from "$app/navigation";
  import "@/app.css";
  import Alert from "../components/alert.svelte";
  import { onMount } from "svelte";
  import { ROUTES } from "../utils/constants";

  onMount(() => {
    goto(ROUTES.LOGIN);
  });
</script>

<Alert />
<div class="w-full h-full border border-black">
  <slot></slot>
</div>
