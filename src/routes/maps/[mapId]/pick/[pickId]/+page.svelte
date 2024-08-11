<script>
  import { page } from "$app/stores";


  import Button from "../../../../../components/button.svelte";

</script>

<div class="w-full border-b border-black cursor-pointer p-5 flex justify-end">
      <Button onClick={() => window.history.back()}>Back</Button>
</div>

<div>
  <p>Pick manage</p>

  <label>Name</label>
  <input type="text" class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700">

  <label>Description</label>
  <input type="text" class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700">

  <label>Location</label>
  <input type="text" class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700">

  <Button>Save</Button>
</div>