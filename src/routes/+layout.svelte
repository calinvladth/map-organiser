<script lang="ts">
  import "@/app.css";
  import Alert from "../components/alert.svelte";
</script>

<Alert />
<div class="w-full h-full border border-black">
  <slot></slot>
</div>
