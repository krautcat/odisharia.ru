<script lang="ts">
    import type {SiteLink} from "./types/navlinks.d.ts";

    let other_sites: Array<SiteLink> = [
        { 
            link: "/cv",
            name: "CV",
        },
        // {
        //     link: "/wishlist",
        //     name: "Wishlist",
        // },
    ]
</script>

<svelte:window />

<nav id="krautcat-navlinks" class="nav-content">
    <!-- <ul class:scrolled="nav-show" style="background-color: {backgroundListItemsColor}"> -->
  <ul>
    {#each other_sites as site} 
      <li>        
        <a href="{site.link}" class="block nav-link lg:mt-0">
          {site.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style lang="postcss">
    @import "./css/navlinks.css";
</style>