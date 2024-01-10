<script>
	export let filler = "...";
  export let fillerVisibility;
</script>

<div class="filler">
  {#if fillerVisibility}
    <div class="text-filler">{filler}</div>
  {/if}
</div>

<style lang="postcss">
  @import "$lib/css/filler.css";
</style>
