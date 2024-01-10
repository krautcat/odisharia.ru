<style global lang="postcss">
  @import '$lib/../css/keyboards/collection.css';
</style>

<script lang="typescript">
  import { setContext } from 'svelte'

  import { ApiResponse, ErrorResponse, loadKeyboards } from '$lib/ts/api/keyboards'
  import { IconsKeyboardsStore } from '$lib/ts/store/icons/keyboards'

  import NavLinks from '$lib/components/NavLinks.svelte'
  import Pagination from '$lib/components/Pagination.svelte'
  import Filler from '$lib/components/Filler.svelte'
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte'
  import Keyboard from '$lib/components/keyboards/Keyboard.svelte'

  import { view } from '$lib/../stores.js'

  import type { LoadResponse } from './$types'

  export let data: LoadResponse

  let total = data.total
  let per_page = data.per_page
  let items_on_page = data.items_on_page
  let items = data.items

  let error = undefined

  let page: number = 1
  let current_page: number = 1

  let y = 0
  let headerHeight = 0

  setContext('icons.keyboards', new IconsKeyboardsStore())

  async function changePage(params: { page: number }) {
    current_page = params.page
    let response: ApiResponse | ErrorResponse = await loadKeyboards(current_page)
    switch (response.constructor) {
      case ApiResponse:
        total = response.total
        per_page = response.per_page
        items_on_page = response.items_on_page
        items = response.items
        break
      case ErrorResponse:
        error = response.error
        break
      default:
        throw new Error('Unsupported type')
    }
  }

  let navLinksBackground = 'rgba(0, 0, 0, 0)'
  function updateNavLinksBackground(y) {
    if (y > headerHeight) {
      return 'rgba(75, 85, 99, 255)'
    } else {
      return 'rgba(0, 0, 0, 0)'
    }
  }

  let navLinksTextColor = '#e5e7eb'
  function updateNavLinksTextColor(y) {
    if (y > headerHeight) {
      return '#e5e7eb'
    } else {
      return '#e5e7eb'
    }
  }

  let navLinksTextBackground = 'rgba(0, 0, 0, 0)'

  let paginationBackgroundColorInactive = 'rgb(209 213 219)'
  let paginationBackgroundColorActive = 'rgb(229 231 235)'
  let paginationTextColorActive = 'rgb(17 24 39)'

  function isFillerVisible(items_on_page) {
    if (items_on_page < per_page && items_on_page > 0) {
      return true
    } else {
      return false
    }
  }

  let spinnerColor = 'rgb(17 24 39)'

  let fillerVisibility
  view.subscribe(data => {
    fillerVisibility = data.fillerVisible
  })

  $: {
    navLinksBackground = updateNavLinksBackground(y)
    navLinksTextColor = updateNavLinksTextColor(y)
    $view.fillerVisible = isFillerVisible(items_on_page)
  }
</script>

<svelte:window bind:scrollY={y} />

<NavLinks
  backgroundColor={navLinksBackground}
  listItemsColor={navLinksTextColor}
  backgroundListItemsColor={navLinksTextBackground}
/>

<header class="flex flex-col justify-center bg-gray-800" bind:clientHeight={headerHeight}>
  <div class="container mx-auto">
    <div class="text-gray-200 intro-text flex flex-col gap-y-8">
      <div class="text-5xl uppercase">Keyboards collection</div>
    </div>
  </div>
</header>

<main class="flex-box">
  <section class="flex-container container w-5/6 lg:w-1/3 mx-auto">
    {#await items}
      <div class="spinner">
        <div class="spinner-central">
          <LoadingSpinner color={spinnerColor} />
        </div>
      </div>
    {:then items}
      {#key items}
        {#each items as item}
          <Keyboard keyboard={item} />
        {/each}
      {/key}
    {/await}
  </section>

  <div class="flex-filler">
    <Filler filler="· · ·" bind:fillerVisibility />
  </div>

  <div class="flex-pagination">
    {#if total > per_page}
      <Pagination
        {per_page}
        {total}
        {page}
        {current_page}
        --background-color-active="paginationBackgroundColorActive"
        --background-color-inactive="paginationBackgroundColorInactive"
        --text-color-active="paginationTextColorActive"
        on:change={ev => changePage({ page: ev.detail })}
      />
    {/if}
  </div>
</main>
