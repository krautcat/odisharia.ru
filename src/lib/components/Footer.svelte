<script lang="ts">
  import {onMount} from "svelte";
  import {writable} from "svelte/store";
  
  import type {LineCssStyle} from "./types/footer.d.ts";
  import type {Writable} from "svelte/store";

  let line: LineCssStyle = {
      begin: "10%",
      end: "90%",
  }
  
  const innerWidth: Writable<number> = writable(0);

  onMount(() => {
      function changeDeviceType(value: number): void {
          if (value <= 640) {
              line.begin = "10%";
              line.end = "90%";
          } else {
              line.begin = "10%";
              line.end = "90%";
          }
      }
      innerWidth.subscribe(value => changeDeviceType(value));
  });
</script>

<svelte:window bind:innerWidth={$innerWidth} />

<footer>
  <svg class="_delimiter" width="100%" height="1">
    <line x1="{line.end}" y1="0" x2="{line.begin}" y2="0" stroke="black"/>
  </svg>
  <div class="year">
    2025
  </div>
</footer>

<style lang="postcss">
  @import "./css/footer.css";
</style>