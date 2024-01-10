<script>
  import Switch from '$lib/components/keyboards/Switch.svelte'

  export let build

  let switches = build.switches
  let stabilizers = build.stabilizers
</script>

<div class="build">
  <div class="switches">
    <h4>Switches</h4>
    {#if switches instanceof Array}
      {#each switches as switch_}
        <div class="switches">
          <ul class="dashed-list">
            <Switch {switch_} />
          </ul>
        </div>
      {/each}
    {:else}
      <div class="switches">
        <ul class="dashed-list">
          <Switch switch_={switches} />
        </ul>
      </div>
    {/if}
  </div>
</div>
