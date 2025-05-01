<script lang="ts">
    import {onMount, setContext} from "svelte";
    import {readonly, writable} from "svelte/store";
    
    import type {CssStyles, LineCssStyle} from "./types/header.d.ts";
    import type {Writable} from "svelte/store";

    export let intro_text: Boolean = true;
    
    export let title: string = "Georgiy Odisharia";
    if (title.length == 0) {
        title = "Georgiy Odisharia";
    }
    
    function composeCss(): string {
        let header_css = `--header-height:${header_height}`;
        let intro_name_css = Object
            .entries(intro_name_style)
            .map(([key, value]) => `--intro-name-${key}:${value}`)
            .join(";");
        let intro_text_css = Object
            .entries(intro_text_style)
            .map(([key, value]) => `--intro-text-${key}:${value}`)
            .join(";");
        
        return [
            header_css,
            intro_name_css,
            intro_text_css
        ]
        .join(";");
    }
    
    let header_height: string = "30vh";
    let intro_name_style: CssStyles = {
        'width': '50%',
        'top': '50%',
    };
    let intro_text_style: CssStyles = {
        'width': "60%",
        'top': '35%',
    };
    let line: LineCssStyle = {
        begin: "10%",
        end: "90%",
    }
    
    let cssVars: string;
    const innerWidth: Writable<number> = writable(0);
    onMount(() => {
        function changeDeviceType(value: number): void {
            if (value <= 640) {
                intro_name_style['width'] = "90%";
                if (intro_text === false) {
                    intro_name_style['top'] = "50%";
                } else {
                    intro_name_style['top'] = "40%";
                }
                intro_text_style['width'] = "90%";
                intro_text_style['top'] = "27%";
            } else if (value <= 1024 && value > 640) {
                header_height = "30vh";
                
                intro_name_style['width'] = "90%";
                if (intro_text === false) {
                    intro_name_style['top'] = "50%";
                } else {
                    intro_name_style['top'] = "40%";
                }
                intro_text_style['width'] = "80%";
                intro_text_style['top'] = "15%";

                line.begin = "10%";
                line.end = "90%";
            } else {
                header_height = "40vh";

                intro_name_style['width'] = "70%";
                if (intro_text === false) {
                    intro_name_style['top'] = "50%";
                } else {
                    intro_name_style['top'] = "40%";
                }
                intro_text_style['width'] = "70%";
                intro_text_style['top'] = "50%";
1
                line.begin = "10%";
                line.end = "90%";
            }
            cssVars = composeCss();
        }
        innerWidth.subscribe(value => changeDeviceType(value));
    });
</script>

<svelte:window bind:innerWidth={$innerWidth} />

<header id="krautcat-header" style={cssVars}>
    <div id="intro-name">
        {title}
    </div>
    {#if intro_text}
        <p id="intro-text">
            IT specialist, music enthusiast, portative audiophile and keyboard
            hobbyist
        </p>
    {/if}
</header>
<svg class="_delimiter" width="100%" height="1">
    <line x1="{line.end}" y1="0" x2="{line.begin}" y2="0" stroke="black"/>
</svg>

<style lang="postcss">
    @import "./css/header.css";
</style>
  