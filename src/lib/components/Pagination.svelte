<script>
  export let total;
  export let per_page;
  export let page;
  export let current_page;

  let last_page = Math.ceil(total / per_page); 

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  function range(size, startAt = 0, current_page) {
    let pages = [];
    if (size > 5) {
      if (current_page == 1) {
        pages = [1, 2, "...", size];
      } else if (current_page == 2) {
        pages = [1, 2, 3, "...", size];
      } else if (current_page == 3) {
        pages = [1, 2, 3, 4, "...", size]
      } else if (current_page == size - 2) {
        pages = [1, "...", current_page - 1, current_page, current_page + 1, size]
      } else if (current_page == size - 1) {
        pages = [1, "...", current_page - 1, current_page, size]
      } else if (current_page == size) {
        pages = [1, "...", current_page - 1, size]
      } else if (current_page > 3 && current_page < last_page - 2) {
        pages = [1, "...", current_page - 1, current_page, current_page + 1, "...", size]
      }
    } else {
      pages = Array.from({ length: size }, (value, index) => index + 1);
    }
    return pages;
  }
  function changePage(page) {
    if (page !== current_page) {
      last_page = Math.ceil(total / per_page)
      dispatch('change', page);
    }
  }
  
</script>

<nav class="pagination">
  <ul>
    <li class="{current_page === 1 ? 'disabled' : ''}">
      <a href="javascript:void(0)" on:click="{() => changePage(1)}">
        <span aria-hidden="true">«</span>
      </a>
    </li>
    <li class="{current_page === 1 ? 'disabled' : ''}">
      <a href="javascript:void(0)" on:click="{() => changePage(current_page - 1)}">
        <span aria-hidden="true">&lt;</span>
      </a>
    </li>

    {#each range(last_page, 1, current_page) as page}
    {#if page == "..."}
    <li class="disabled">
      <a href="javascript:void(0)"> 
        {page}
      </a>
    </li>
    {:else}
    <li class='{page === current_page ? "active": ""}'>
      <a href="javascript:void(0)" on:click="{() => changePage(page)}">{page}</a>
    </li>
    {/if}
    {/each}

    <li class="{current_page === last_page ? 'disabled' : ''}">
      <a href="javascript:void(0)" on:click="{() => changePage(current_page + 1)}">
        <span aria-hidden="true">&gt;</span>
      </a>
    </li>
    <li class="{current_page === last_page ? 'disabled' : ''}">
      <a href="javascript:void(0)" on:click="{() => changePage(last_page)}">
        <span aria-hidden="true">»</span>
      </a>
    </li>
  </ul>
</nav>

<style>

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 5vh;
    padding-bottom: 5vh;
  }
  .pagination ul {
    display: flex;
    padding-left: 0;
    list-style: none;
  }
  .pagination li a {
    position: relative;
    display: block;
    padding: .5rem .75rem;
    margin-left: -1px;
    line-height: 1.25;
    background-color: var(--background-color-active);
  }
  .pagination li.active a {
    color: var(--text-color-active);
    font-weight: bold;
    text-decoration: underline;
    background-color: var(--background-color-active);
    border-color: #007bff;
  }
  .pagination li.disabled a {
    color: #6c757d;
    background-color: var(--background-color-inactive);
    pointer-events: none;
    cursor: auto;
    border-color: #dee2e6;
  }
</style>
