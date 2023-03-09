<script>  
  import { onMount } from "svelte";
  import AnimatedHamburger from "./AnimatedHamburger.svelte";

  let other_sites = [
    { link: "./cv", name: "CV" },
    { link: "./wishlist", name: "Wishlist" },
  ]

  export let offset = 10;
  export let tolerance = 30;

  export let backgroundColor = "rgba(0, 0, 0, 0)";
  export let listItemsColor = "#e5e7eb";
  export let backgroundListItemsColor = "rgba(0, 0, 0, 0)";
  export let backgroundListItemsColorMobile = "rgba(75, 85, 99, 255)";
  export let headerHeight = 0;

  let headerClass = "nav-show";
  let y = 0;
  let lastY = 0;

  // Show mobile icon and display menu
  let showMobileMenu = false;

  function deriveClass(y, dy) {
    if (showMobileMenu) {
      return "nav-show";
    }

    if (y == 0) {
      return "nav-show";
    }

    if ((y < headerHeight) && (y != 0)) {
      return "nav-hide"
    }

    if (y <= offset) {
      return "nav-show";
    }

    if (Math.abs(dy) <= tolerance) {
      return headerClass;
    }

    if (dy > 0) {
      return "nav-show";
    }

    return "nav-hide";
  }

  function updateClass(y) {
    const dy = lastY - y;
    lastY = y;
    return deriveClass(y, dy);
  }

  // Media match query handler
  const mediaQueryHandler = e => {
    // Reset mobile state
    if (!e.matches) {
      showMobileMenu = false;
    }
  };

  // Attach media query listener on mount hook
  onMount(() => {
    const mediaListener = window.matchMedia("(max-width: 767px)");

    mediaListener.addEventListener("change", () => {
      mediaQueryHandler();
    });
  });

  export let open = false;
  export let onClick = () => {
    open = !open
    showMobileMenu = !showMobileMenu
    backgroundListItemsColor = backgroundListItemsColorMobile;
  };

  $: {
    headerClass = updateClass(y);
  }
</script>

<svelte:window bind:scrollY={y} />

<nav class="{headerClass} nav-content" style="background-color: {backgroundColor} ;">
  <div class="navbar-inner">
    <AnimatedHamburger {open} {onClick}/>
    <ul class:scrolled={headerClass} class={`navbar-list${showMobileMenu ? ' mobile' : ''}`}
      style="background-color: {backgroundListItemsColor}">
    {#each other_sites as site} 
      <li>        
        <a href="{site.link}" class="block nav-link lg:inline-block hover:text-gray-300 lg:mt-0" style="color={listItemsColor}">
          {site.name}
        </a>
      </li>
    {/each}
    </ul>
  </div>
</nav>  

<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  nav {
    background-color: rgba(0, 0, 0, 0);
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    height: 10vh;
    padding: 0 0 0 0;
    z-index: 3;
  }

  .nav-hide {
    visibility: hidden;
  }

  .nav-show {
    visibility: visible;
  }

  .navbar-inner {
    margin: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .navbar-list {
    @apply text-gray-200;
    display: none;
    position: absolute;
    width: 100%;
    justify-content: space-between;
    margin: 0;
    padding: 3px;
    top: 5vh;
  }

  .navbar-list.mobile {
    position: absolute;
    z-index: -1;
    width: 100%;
    padding: 1rem;
    padding-top: 20px;
    padding-left: 5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: right;
    top: 0vh;
  }

  .navbar-list li {
    list-style-type: none;
    position: relative;
    text-decoration: none;
    display: inline;
    align-items: center;
    padding: 0;
   
    font-size: 25pt;
  }

  .nav-content {
      @apply fixed;
      @apply items-center;
      @apply justify-center;
      @apply w-screen;
  }

  @screen md {
    nav {
      height: 15vh;
    }

    .nav-content {
      @apply fixed;
      @apply flex;
      @apply items-center;
      @apply justify-center;
      @apply w-screen;
    }

    .navbar-list li {
      font-size: 15pt;
      text-decoration-line: underline;
      @apply mx-7;
    }

    .mobile-icon {
      visibility: hidden;
    }

    .navbar-list {
      display: inline-flex;
      position: center;
      padding: 0;
      @apply justify-center;
    }

    .navbar-list li {
      font-size: 15pt;
    }

    .navbar-list a {
      display: inline-flex;
    }
  }
</style>
