<script>
  import { onMount } from "svelte";
  import NavLinks from "$lib/components/NavLinks.svelte";
  import Pagination from "$lib/components/Pagination.svelte"; 

  let items = [];
  let total = 0;
  let per_page = 0;
  let page = 1;
  let current_page = 1; 

 
  let y = 0;
  let headerHeight = 0;

  onMount(async () => {
    fetch(`https://api.odisharia.ru/wishlist?page=${page}`, {
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        items = data.data;
        total = data.total;
        per_page = data.per_page;
      });
  })

  let loading = true;
  function changePage(params) {
    loading = true;
    current_page = params.page
    fetch(`https://api.odisharia.ru/wishlist?page=${current_page}`)
      .then((response) => {
        return response.json();
      })
      .then(function (response) {
        total = response.total;
        per_page = response.per_page;
        items = response.data;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        loading = false;
      });
  }
  
  let navLinksBackground = "rgba(0, 0, 0, 0)";
  function updateNavLinksBackground(y) {
    if (y > headerHeight) {
      return "rgba(75, 85, 99, 255)";
    } else {
      return "rgba(0, 0, 0, 0)";
    }
  }

  let navLinksTextColor = "#e5e7eb";
  function updateNavLinksTextColor(y) {
    if (y > headerHeight) {
      return "#e5e7eb"; 
    } else {
      return "#e5e7eb";
    }
  }

  let navLinksTextBackground = "rgba(0, 0, 0, 0)";
 
  let paginationBackgroundColorInactive = "rgb(209 213 219)";
  let paginationBackgroundColorActive = "rgb(229 231 235)";
  let paginationTextColorActive = "rgb(17 24 39)";
 
  $: {
    navLinksBackground = updateNavLinksBackground(y);
    navLinksTextColor = updateNavLinksTextColor(y);
  } 
</script>

<svelte:window bind:scrollY={y}/>

<NavLinks backgroundColor={navLinksBackground} listItemsColor={navLinksTextColor}
  backgroundListItemsColor={navLinksTextBackground}/>

<header class="flex flex-col justify-center bg-gray-800" bind:clientHeight={headerHeight}>
  <div class="container mx-auto">
    <div class="text-gray-200 intro-text flex flex-col gap-y-8">
      <div class="text-5xl uppercase">
        Wishlist
      </div>
    </div>
  </div>
</header>

<main>
  <div class="container container w-5/6 lg:w-1/2 mx-auto">
    {#each Object.entries(items) as [category, category_value]}
      <h2>{category}</h2>
      {#each Object.entries(category_value) as [subcategory, subcategory_values]}
        <h3>{subcategory}</h3>
        {#each subcategory_values as entry}
          <p>{entry.name}</p> 
        {/each}
      {/each}    
    {/each}
  </div>

  {#if total > per_page}
    <Pagination
      {per_page}
      {total}
      {page}
      {current_page}
      --background-color-active=paginationBackgroundColorActive 
      --background-color-inactive=paginationBackgroundColorInactive
      --text-color-active=paginationTextColorActive
      on:change="{(ev) => changePage({page: ev.detail})}"/>
  {/if}
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
 
  header {
    height: 50vh;
    background-image: none;
    @apply bg-gray-800;
  }
  
  header .intro-text {
    width: 60%;
    @apply h-1/2;

    margin-left: auto;
    margin-right: auto;
    text-align: center;
    
    @apply pt-40;
    @apply pb-40;
  }
  
  main {
    @apply bg-gray-300;
  }

  h1 {
    @apply font-bold;
    @apply text-4xl;
    @apply py-4;
  }

  h2 {
    @apply font-bold;
    @apply text-3xl;
    @apply py-4;
  }

  h3 {
    @apply font-semibold;
    @apply py-3;
  }

  h4 {
    @apply font-medium;
  }

  @layer base {
    main {
      @apply bg-gray-300;
    }

    h2 {
      @apply font-bold;
      @apply text-3xl;
      @apply py-4;
    }

    h3 {
      @apply font-semibold;
    }

    h4 {
      @apply font-medium;
    }

    .social_link_icon {
      margin: 0rem 0.5rem 0rem 0.5rem;
      height: 2rem;
      width: 2rem;
    }

    .photo {
      border-radius: 50%;
      height: auto;
      width: auto;
    }

    ul.dashed-list {
      list-style-type: none;
    }

    ul.dashed-list > li {
      text-indent: -1.5rem;
    }

    ul.dashed-list > li:before {
      content: "— ";
      text-indent: -1.5rem;
    }

    footer {
      text-align: center;
      border-top: 2px;
    }
  }
</style>
