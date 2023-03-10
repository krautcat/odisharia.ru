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

<style global lang="postcss">
  @import "../../css/wishlist.css";
</style>

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
