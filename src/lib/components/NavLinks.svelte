<style lang="postcss">
  @reference "tailwindcss";
  @tailwind utilities;

  .nav-content {
    margin-left: auto;
    margin-right: auto;
  }

  #krautcat-navlinks {
    width: 60%;

    display: flex;
    overflow-y: scroll;
    scrollbar-width: none;
    overscroll-behavior: none;

    align-items: center;
    justify-content: center;

    scroll-snap-type: x mandatory;
  }

  #links {
    display: flex;
  }

  .link {
    margin: auto 2rem auto 2rem;
  }

  a.nav-link {
    @apply text-2xl;
    @apply text-gray-800;
    text-decoration: none;
  }

  a.nav-link:visited {
    @apply text-zinc-700;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  ul > li {
    @apply text-zinc-900;
    display: inline-block;

    /* You can also add some margins here to make it look prettier */
  }

  @media (max-width: 640px) {
    #krautcat-navlinks {
      width: 85%;
    }
  }
</style>

<script lang="ts">
  import type { SiteLink } from './types/navlinks.d.ts'

  let other_sites: Array<SiteLink> = [
    {
      link: '/cv',
      name: 'CV'
    },
    {
      link: '/music',
      name: 'Music'
    }
    // {
    //     link: "/wishlist",
    //     name: "Wishlist",
    // },
  ]
</script>

<svelte:window />

<nav id="krautcat-navlinks" class="nav-content">
  <!-- <ul class:scrolled="nav-show" style="background-color: {backgroundListItemsColor}"> -->
  <ul id="links">
    {#each other_sites as site}
      <li class="link">
        <a
          href={site.link}
          data-sveltekit-preload-data="off"
          class="block nav-link lg:mt-0"
        >
          {site.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>
