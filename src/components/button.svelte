<script>
    export let onClick = () => {}
    export let buttonType = 'button'
</script>

<button on:click={onClick} type={buttonType} class="border border-black px-5 py-2 text-xs">
    <slot></slot>
</button>