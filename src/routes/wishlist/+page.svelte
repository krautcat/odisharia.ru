<script>
  import NavLinks from "$lib/components/NavLinks.svelte";
  import Pagination from "$lib/components/Pagination.svelte"; 
  import Filler from "$lib/components/Filler.svelte"; 
  import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";

  import { view } from "$lib/../stores.js";

  let items = [];
  let items_on_page = 0;
  let total = 0;
  let per_page = 0;
  let page = 1;
  let current_page = 1; 
 
  let y = 0;
  let headerHeight = 0;

  async function changePage(params) {
    current_page = params.page
    await fetch(`https://api.odisharia.ru/wishlist?page=${current_page}`)
      .then((response) => {
        return response.json();
      })
      .then(function (response) {
        total = response.total;
        per_page = response.per_page;
        items = response.data;
        let _items_on_page = 0; 
        for (const category in items) {
          for (const subcategory in items[category]) {
            _items_on_page += items[category][subcategory].length;
          }
        }
        items_on_page = _items_on_page;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
      });
    return items;
  }
  items = changePage({page: current_page});
  
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

  function isFillerVisible(items_on_page) {
    if (items_on_page < 10 && items_on_page > 0) {
      return true;
    } else {
      return false;
    }
  }
 
  let spinnerColor = "rgb(17 24 39)";
 
  $: {
    navLinksBackground = updateNavLinksBackground(y);
    navLinksTextColor = updateNavLinksTextColor(y);
    $view.fillerVisible = isFillerVisible(items_on_page);
  } 
</script>

<style global lang="postcss">
  @import "../../css/wishlist.css";
</style>

<svelte:window bind:scrollY={y}/>

<NavLinks
  backgroundColor={navLinksBackground}
  listItemsColor={navLinksTextColor}
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

<main class="flex-box">
  <section class="flex-container container w-5/6 lg:w-1/3 mx-auto">
    {#await items}
      <div class="spinner">
        <div class="spinner-central">
          <LoadingSpinner
            color={spinnerColor} /> 
        </div>
      </div>
    {:then items} 
      {#each Object.entries(items) as [category, category_value]}
        <h2>{category}</h2>
        {#each Object.entries(category_value) as [subcategory, subcategory_values]}
          <h3>{subcategory}</h3>
            <ul class="dashed-list">
              {#each subcategory_values as entry}
                <li>{entry.name}</li> 
              {/each}
            </ul>
        {/each}
      {/each}
    {/await}
  </section>

  <div class="flex-filler" > 
    <Filler />
  </div> 
 
  <div class="flex-pagination"> 
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
  </div>
</main>
