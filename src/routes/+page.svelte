<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { pb } from "../services/pb";
  import { ROUTES } from "../utils/constants";

  onMount(() => {
    if (pb.authStore.isValid) {
      goto(ROUTES.MAPS);
    } else {
      goto(ROUTES.LOGIN);
    }
  });
</script>
