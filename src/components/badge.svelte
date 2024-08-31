<script lang="ts">
    export let style: string;
    export let text: string;
</script>

{#if style === "" || style === "default"}
    <span class="border-gray-300 bg-gray-300 border text-xs font-medium me-2 px-2.5 py-0.5 rounded">{text}</span>
{:else if style === "dark"}
    <span class="bg-black border-black text-white border text-xs font-medium me-2 px-2.5 py-0.5 rounded">{text}</span>
{/if}
