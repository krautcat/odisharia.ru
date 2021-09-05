<script>
  import { onMount } from "svelte";
  import { apiData, wishlistEntries } from "./wishlist.js";
  import NavLinks from "../components/NavLinks.svelte";
  import Pagination from "../components/Pagination.svelte"; 

  let items = [];
  let page = 1; //first page
	let pageIndex = 0; //first row
  let pageSize = 3; //optional, 10 by default

  let loading = true;

  fetch(`http://api.odisharia.ru/wishlist?page=${page}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      items = data;
    });

  function onPageChange(event) {
    load(event.detail.page);
		page = event.detail.page;
  }
</script>

<style global lang="postcss">
  @import '../css/wishlist.css';
</style>

<NavLinks />

<main>
  <div class="container w-10/12 xl:w-7/12 mx-auto">
    <h1 class="mx-auto">Georgiy Odisharia's wishlist</h1>

    {#each items as entry}
      <div>{entry.name}</div>
    {/each}

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

  <div>
    <Pagination {page} {pageSize} count={items.length} serverSide={true} on:pageChange={onPageChange} />
  </div>
</main>
