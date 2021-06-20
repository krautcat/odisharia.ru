<script>
  import NavLinks from "../components/NavLinks.svelte";
</script>

<style global lang="postcss">
  @import '../css/wishlist.css';
</style>

<NavLinks />

<main>
  <div class="container w-10/12 xl:w-8/12 mx-auto">
    <h1>Georgiy Odisharia's wishlist</h1>
    
    <h2>Audio</h2>
    
    <h3>IEMs</h3>
    <ul class="list-disc">
      <li>Campfire Audio Comet</li>
      <li>Campfire Audio Jupiter</li>
    </ul>

    <h3>DACs</h3>
    <ul class="list-disc">
      <li>Yulong Audio DAART Canary II</li>
      <li>Aune X1S Pro</li>
      <li>Aune X5S</li>
      <li>QLS DA 9.1 Melokin</li>
      <li>S.M.S.L M8</li>
    </ul>

    <h2>Photo</h2>
    
    <h3>Lenses</h3>
    <ul class="list-disc">
      <li>Canon EF 28mm f/1.8 USM</li>
      <li>Canon EF-S 60mm f/2.8 Macro USM</li>
    </ul>
  </div>
</main>