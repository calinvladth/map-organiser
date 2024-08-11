<script>

  import Button from "../../../components/button.svelte";

  const form = {
    email: '',
    password: ''
  }

  const formError = {
    email: false,
    password: false
  }

  function onSubmit() {
    console.log({form, formError})
  }

</script>
<div>
    <p>Login</p>

    <form on:submit|preventDefault={onSubmit}>
  
    <label>Email</label>
    <input type="email" bind:value={form.email} class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700">
  
    <label>Password</label>
    <input type="text" bind:value={form.password} class="text-sm box-border appearance-none border w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700">
  
    <Button buttonType="submit">Save</Button>
    </form>
  </div>