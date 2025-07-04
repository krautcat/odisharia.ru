<style lang="postcss">
  @reference "tailwindcss";
  @tailwind utilities;

  #main-link {
    color: inherit;
    text-decoration: none;
  }
  header {
    height: var(--header-height);
    @apply text-zinc-600;
  }

  #krautcat-header {
    display: content;
    height: 100%;
  }

  #intro-name {
    @apply text-5xl;
    font-family: var(--font-serif);

    @apply uppercase;
    @apply m-auto;

    width: var(--intro-name-width);
    position: relative;
    top: var(--intro-name-top);
    transform: translate(0, -50%);
    text-align: center;
  }

  #intro-text {
    font-family: var(--font-serif);

    width: var(--intro-text-width);

    margin: auto;
    text-align: center;

    position: relative;
    top: var(--intro-text-top);
  }

  ._delimiter {
    stroke: black;
    stroke-width: 1;

    margin: auto;

    display: block;
    position: relative;
    top: 100%;
    margin: auto;
  }

  @media (min-width: 1024px) {
    #intro-name {
      line-height: 3rem;
    }
  }
</style>

<script lang="ts">
  import { onMount, setContext } from 'svelte'
  import { readonly, writable } from 'svelte/store'

  import type { CssStyles, LineCssStyle } from './types/header.d.ts'
  import type { Writable } from 'svelte/store'

  export let intro_text: Boolean = true

  export let title: string = 'Georgiy Odisharia'
  export let subtitle: string = ''
  if (title.length == 0) {
    title = 'Georgiy Odisharia'
  }

  function composeCss(): string {
    let header_css = `--header-height:${header_height}`
    let intro_name_css = Object.entries(intro_name_style)
      .map(([key, value]) => `--intro-name-${key}:${value}`)
      .join(';')
    let intro_text_css = Object.entries(intro_text_style)
      .map(([key, value]) => `--intro-text-${key}:${value}`)
      .join(';')

    return [header_css, intro_name_css, intro_text_css].join(';')
  }

  let header_height: string = '30vh'
  let intro_name_style: CssStyles = {
    width: '50%',
    top: '50%'
  }
  let intro_text_style: CssStyles = {
    width: '60%',
    top: '35%'
  }
  let line: LineCssStyle = {
    begin: '10%',
    end: '90%'
  }

  let cssVars: string
  const innerWidth: Writable<number> = writable(0)
  onMount(() => {
    function changeDeviceType(value: number): void {
      if (value <= 640) {
        intro_name_style['width'] = '90%'
        if (intro_text === false) {
          intro_name_style['top'] = '50%'
        } else {
          intro_name_style['top'] = '40%'
        }
        intro_text_style['width'] = '90%'
        intro_text_style['top'] = '27%'
      } else if (value <= 1024 && value > 640) {
        header_height = '30vh'

        intro_name_style['width'] = '90%'
        if (intro_text === false) {
          intro_name_style['top'] = '50%'
        } else {
          intro_name_style['top'] = '40%'
        }
        intro_text_style['width'] = '80%'
        intro_text_style['top'] = '15%'

        line.begin = '10%'
        line.end = '90%'
      } else {
        header_height = '40vh'

        intro_name_style['width'] = '70%'
        if (intro_text === false) {
          intro_name_style['top'] = '50%'
        } else {
          intro_name_style['top'] = '40%'
        }
        intro_text_style['width'] = '70%'
        intro_text_style['top'] = '50%'

        line.begin = '20%'
        line.end = '80%'
      }
      cssVars = composeCss()
    }
    innerWidth.subscribe(value => changeDeviceType(value))
  })
</script>

<svelte:window bind:innerWidth={$innerWidth} />

<header style={cssVars}>
  <div id="krautcat-header">
    <div id="intro-name">
      <a href="/" id="main-link">{title}</a>
      {#if subtitle !== ''}
        → {subtitle}
      {/if}
    </div>
    {#if intro_text}
      <div id="intro-text">
        <p>IT specialist, music enthusiast, portative audiophile and keyboard hobbyist</p>
      </div>
    {/if}
  </div>
</header>
<svg class="_delimiter" width="100%" height="1">
  <line x1={line.end} y1="0" x2={line.begin} y2="0" stroke="black" />
</svg>
