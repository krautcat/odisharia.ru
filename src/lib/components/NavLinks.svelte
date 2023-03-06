<script>  
  import { onMount } from "svelte";
  import AnimatedHamburger from "./AnimatedHamburger.svelte";

  let other_sites = [
    { link: "./cv", name: "CV" },
    { link: "./wishlist", name: "Wishlist" },
  ]

  export let duration = "300ms";
  export let offset = 10;
  export let tolerance = 30;

  export let backgroundColor = "rgba(0, 0, 0, 0)";
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

  function setTransitionDuration(node) {
    node.style.transitionDuration = duration;
  }

  // Mobile menu click event handler
  const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

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
  };

  $: headerClass = updateClass(y);
</script>

<svelte:window bind:scrollY={y} />

<nav class="{headerClass} nav-content" style="background-color: {backgroundColor}, var(--tw-bg-opacity);">
  <div class="navbar-inner">
    <AnimatedHamburger {open} {onClick}/>
    <ul class:scrolled={headerClass} class={`navbar-list${showMobileMenu ? ' mobile' : ''}`}>
    {#each other_sites as site} 
      <li>        
        <a href="{site.link}" class="block nav-link lg:inline-block hover:text-gray-300 lg:mt-0">
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
    height: 18vh;
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

  .mobile-icon {
    width: 25px;
    height: 14px;
    position: relative;
    cursor: pointer;
    margin-left: 10pt;
  }

  .mobile-icon:after,
  .mobile-icon:before,
  .middle-line {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #Fff;
    transition: all 0.4s;
    transform-origin: center;
  }

  .mobile-icon:before,
  .middle-line {
    top: 0;
  }

  .mobile-icon:after,
  .middle-line {
    bottom: 0;
  }

  .mobile-icon:before {
    width: 66%;
  }

  .mobile-icon:after {
    width: 33%;
  }

  .middle-line {
    margin: auto;
  }

  .mobile-icon:hover:before,
  .mobile-icon:hover:after,
  .mobile-icon.active:before,
  .mobile-icon.active:after,
  .mobile-icon.active .middle-line {
    width: 100%;
  }

  .mobile-icon.active:before,
  .mobile-icon.active:after {
    top: 50%;
    transform: rotate(-45deg);
  }

  .mobile-icon.active .middle-line {
    transform: rotate(45deg);
  }

  .navbar-list {
    @apply text-gray-200;
    display: none;
    width: 100%;
    justify-content: space-between;
    margin: 0;
    padding: 3px;
  }

  .navbar-list.mobile {
    background-color: gray;
    position: absolute;
    z-index: -1;
    width: 100%;
    padding: 1rem;
    padding-left: 5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: right;
  }

  .navbar-list li {
    list-style-type: none;
    position: relative;
    text-decoration: none;
    display: inline;
    align-items: center;
    padding: 0;
    
    font-size: 15pt;
  }

  .nav-content {
      @apply fixed;
      @apply items-center;
      @apply justify-center;
      @apply w-screen;
  }

  @screen md {
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

    .navbar-list a {
      display: inline-flex;
    }
  }
</style>