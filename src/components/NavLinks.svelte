<script>
  let other_sites = [
    { link: "./cv", name: "CV" },
    { link: "./wishlist", name: "Wishlist" },
  ]

  export let duration = "300ms";
  export let offset = 0;
  export let tolerance = 30;

  export let backgroundColor = "rgba(0, 0, 0, 0)";

  let headerClass = "nav-show";
  let y = 0;
  let lastY = 0;

  function deriveClass(y, dy) {
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

  $: headerClass = updateClass(y);
</script>

<svelte:window bind:scrollY={y} />

<nav class="{headerClass} nav-content fixed flex items-center justify-end w-screen p-6 mx-auto" style="background-color: rgba({backgroundColor}, var(--tw-bg-opacity);">
  <div class="flex items-center text-lg justify-items-center">
    {#each other_sites as site} 
      <a href="{site.link}" class="block mt-4 mr-10 text-white nav-link lg:inline-block hover:text-gray-300 lg:mt-0">
        {site.name}
      </a>
    {/each}
  </div>
</nav>  
