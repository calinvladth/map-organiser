<script lang="ts">
  import { alertError, alertSuccess } from "../stores/alerts";

  let errorMessage: string;
  let successMessage: string;

  alertError.subscribe((data) => (errorMessage = data));
  alertSuccess.subscribe((data) => (successMessage = data));
</script>

{#if successMessage}
  <div
    class="fixed right-5 top-5 border border-green-600 bg-green-500 text-white py-3 px-6"
  >
    {successMessage}
  </div>
{/if}

{#if errorMessage}
  <div
    class="fixed right-5 top-5 border border-red-600 bg-red-500 text-white py-3 px-6"
  >
    {errorMessage}
  </div>
{/if}
