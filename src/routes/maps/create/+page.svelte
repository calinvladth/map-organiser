<script>
  import Button from "../../../components/button.svelte";

  const form = {
    name: "",
  };

  const formError = {
    name: false,
  };

  function onSubmit() {
    console.log({ form, formError });
  }
</script>

<p>Create map</p>

<form on:submit|preventDefault={onSubmit}>
  <label>Map name</label>
  <input
    type="text"
    bind:value={form.name}
    class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700"
  />

  <Button buttonType="submit">Save</Button>
</form>
