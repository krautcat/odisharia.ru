<style global lang="postcss">
  ul.dashed-list-indented {
    list-style: none;
  }

  ul.dashed-list-indented > li {
    margin-left: 1rem;
  }

  ul.dashed-list-indented > li::before {
    content: '— ';
    text-indent: 1rem;
  }

  ul.dashed-list-indented > li.custom-list-image {
    white-space: nowrap;
  }

  ul.dashed-list-indented > li.custom-list-image::before {
    content: '';
    display: inline-flex;
    position: relative;
    left: 0;
    width: 1em;
    height: 1em;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }

  .custom-image {
    content: '';
    position: relative;
    left: 0;
    width: 10em;
    height: 10em;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }

  .switch-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 1 1 auto;
    height: 10rem;
    width: 10rem;
  }

  .swtich-info {
    padding-left: 1em;
  }
</style>

<script lang="typescript">
  import { getContext, onMount } from 'svelte'
  import type { Switch } from '$lib/ts/api/keyboards'
  import type { IconsKeyboardsStore, IconSwitch } from '$lib/ts/store/icons/keyboards'

  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte'

  export let switch_: Switch

  let ctx: IconsKeyboardsStore = getContext('icons.keyboards')

  let icon: IconSwitch

  let load: boolean = true

  onMount(async () => {
    icon = await ctx.switch_icons.getIcons('cherry-mx').assembly()
    icon = await icon.fill(switch_.colors)

    let iconEncoded: string = icon.toURIString()

    let divId: string = `switch-${switch_.full_name}`
    let elementCssStyleSheet: CSSStyleSheet = new CSSStyleSheet()
    let l: number = elementCssStyleSheet.insertRule(
      '*{}',
      elementCssStyleSheet.cssRules.length
    )
    let elementCssStyle: CSSStyleRule = elementCssStyleSheet.cssRules[l]
    elementCssStyle.selectorText = `#${divId}`
    elementCssStyle.style.backgroundImage = `url('${iconEncoded}')`
    elementCssStyleSheet.insertRule(elementCssStyle.cssText)
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, elementCssStyleSheet]

    //let objectElement = document.createElement('object')
    //objectElement.setAttribute('type', 'image/svg+xml')
    //objectElement.setAttribute('class', 'switch-icon')
    //icon.svg.setAttribute('viewbox', 'auto')
    //icon.svg.setAttribute('width', '100%')
    //icon.svg.setAttribute('height', '100%')
    //objectElement.setAttribute('data', icon.toURIString())
    load = false
    //let element = await waitForElm(`#${divId}`)
    //console.log(`Here: ${objectElement}`)
    //element.appendChild(objectElement)
  })

  async function waitForElm(selector: string): Promise<Element> {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector))
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector))
          observer.disconnect()
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    })
  }
</script>

<li>
  <div class="flex">
    {#if load}
      <div class="switch-icon spinner-central">
        <LoadingSpinner />
      </div>
    {:else}
      <div id="switch-{switch_.full_name}" class="custom-image switch-icon" />
    {/if}
    <div class="switch-info">
      {switch_.info_with_lube}
      <ul class="dashed-list-indented">
        {#if 'top' in switch_ || 'bottom' in switch_ || 'stem' in switch_}
          {#if switch_.top}
            <li>Top: {switch_.top}</li>
          {/if}
          {#if switch_.bottom}
            <li>Bottom: {switch_.bottom}</li>
          {/if}
          {#if switch_.stem}
            <li>Stem: {switch_.stem}</li>
          {/if}
        {/if}
        <li class="spring custom-list-mage">
          {switch_.spring.info}
        </li>
        {#if switch_.switch_film}
          <li>
            Switch films:
            {#if switch_.switch_film instanceof Array}
              {switch_.switch_film.join(', ')}
            {:else}
              {switch_.switch_film}
            {/if}
          </li>
        {/if}
      </ul>
    </div>
  </div>
</li>
