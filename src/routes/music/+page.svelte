<script>
    import NavLinks from "$lib/components/NavLinks.svelte";

  let e_music_publics = {
    main: { 
      link: "https://vk.com/e_music", 
      name: "E:\\music",
      image: "e-music",
      time: "2016 — present",
      description: "Writing about guitar music releases and essential \
        releases inside my main genres. Post-punk, indie rock and other \
        interesting for me albums."  
    },
    math_rock: {
      link: "https://vk.com/mathwall",
      name: "E:\\music\\math rock",
      image: "e-music-math-rock",
      time: "2015 — present",
      description: "Math rock releases from the past and present. Angular \
        guitar music with uncommom time signatures and complex rythms. "
    },
    noise_rock: {
      link: "https://vk.com/e_music_noise_rock",
      name: "E:\\music\\noise rock",
      image: "e-music-noise-rock",
      time: "2014 — present",
      description: "Noise rock and noisy post-hardcore, mostly unknown for \
        masses releases and bands."
    },
    emo: {
      link: "https://vk.com/e_emo",
      name: "E:\\music\\emo",
      image: "e-music-emo",
      time: "2017 — present",
      description: "Wide range of emotional music: from mild midwest emo to \
        aggressive screamo and emoviolence"
    }
  }

  let y = 0;
  let headerHeight = 0;
  
  let navLinksBackground = "rgba(0, 0, 0, 0)";
  function updateNavLinksBackground(y) {
    if (y > headerHeight) {
      return "rgba(75, 85, 99, 255)";
    } else {
      return "rgba(0, 0, 0, 0)";
    }
  }

  let navLinksTextColor = "#e5e7eb";
  function updateNavLinksTextColor(y) {
    if (y > headerHeight) {
      return "#e5e7eb"; 
    } else {
      return "#e5e7eb";
    }
  }

  let navLinksTextBackground = "rgba(0, 0, 0, 0)";
  
  $: {
    navLinksBackground = updateNavLinksBackground(y);
    navLinksTextColor = updateNavLinksTextColor(y);
  } 
</script>

<style global lang="postcss">
  @import "../../css/music.css"
</style>

<svelte:window bind:scrollY={y}/>

<NavLinks backgroundColor={navLinksBackground} listItemsColor={navLinksTextColor}
  backgroundListItemsColor={navLinksTextBackground}/>

<header class="flex flex-col justify-center" bind:clientHeight={headerHeight}>
  <div class="container mx-auto">
    <div class="text-gray-200 intro-text flex flex-col gap-y-8">
      <div class="text-5xl uppercase">
        Music
      </div>
    </div>
  </div>
</header>

<main>
  <div class="music container w-5/6 lg:w-1/2 mx-auto my-8">
    <h1 class="text-3xl text-center">
      E:\music
    </h1>
    <div class="container my-8">
      <p>
        I wrote most of my reviews in network of music blogs called E:\music.
        I'm administrator on thematic music blogs and redactor on main page of
        blog.
      </p>
    </div>
    {#each Object.entries(e_music_publics) as [_, e_music_public]} 
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 justify-center px-0 md:px-16 py-8 m-auto social-links">
      <div class="object-right e-music-link-image col-span-1">
        <a href={e_music_public.link}>
          <img class="e_music_public_icon" alt="{e_music_public.name} icon" src="images/e-music/{e_music_public.image}.jpg">
        </a>
      </div>
      <div class="col-span-2">
        <a href={e_music_public.link}>
          <h2 class="text-1.5xl underline e-music-public-icon-text md:pt-3.5">
            {e_music_public.name}
          </h2>
        </a>
        <h3 class="py-2">
          {e_music_public.time}
        </h3>
        <p>
          {e_music_public.description}
        </p>
      </div>
    </div>
    {/each} 
  </div> 
</main>
