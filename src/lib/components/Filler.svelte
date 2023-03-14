<script>
  import { view } from "$lib/../stores.js";

	export let filler = "...";
  let visibility;

  view.subscribe((data) => {
    visibility = data.fillerVisible;
  })

	function renderFiller(node, {visibility, filler}) {
    if (visibility) {
      return {
        update() { 
          let removed_element = document.getElementById("filler");
          if (removed_element) {
            removed_element.remove();
          }

          const el = document.createElement("div");
          el.setAttribute("id", "filler")
          el.classList.add("text-filler");
          el.innerText = filler;
          node.appendChild(el);
        }
      }
    } else {
      return {
        update() {
          let removed_element = document.getElementById("filler");
          if (removed_element) {
            removed_element.remove();
          }
        }
      }
    }
	}

</script>

<div class="filler" use:renderFiller={{visibility, filler}} />

<style lang="postcss">
  @import "$lib/../css/lib/components/filler.css";
</style>
