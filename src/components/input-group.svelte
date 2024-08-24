<script lang="ts">
  export let value: string;
  export let isError: boolean;
  export let labelName: string;
  export let isTextArea: boolean = false;
</script>

<div>
  <label class="text-sm {isError && 'text-red-500'}">{labelName}</label>
  {#if isTextArea}
    <textarea
      {...$$props}
      bind:value
      class="text-sm box-border appearance-none w-full h-20 py-2 px-3 text-gray-700 leading-tight border {isError
        ? 'border-red-500'
        : 'border-black '} focus:outline-none focus:border-blue-700"
    />
  {:else}
    <input
      {...$$props}
      bind:value
      class="text-sm box-border appearance-none w-full py-2 px-3 text-gray-700 leading-tight border {isError
        ? 'border-red-500'
        : 'border-black'} focus:outline-none focus:border-blue-700"
    />
  {/if}
</div>
