<script>
  import "@/app.css";
</script>

<section class="flex items-start justify-start h-screen">
  <div class="w-1/3 h-full border border-black">
    <nav class="flex flex-col">
      <a href="/">Maps</a>
      <a href="/maps/21">Picks</a>
      <a href="/account">Account</a>
    </nav>
  </div>

  <div class="w-full h-full border border-red-500">
    <slot></slot>
  </div>
</section>
