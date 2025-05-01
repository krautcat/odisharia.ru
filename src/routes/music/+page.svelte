<script>
  import Footer from "$lib/components/Footer.svelte"
  import Header from "$lib/components/Header.svelte";

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
        aggressive emocore."
    },
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

<svelte:window bind:scrollY={y}/>

<Header title="Georgiy Odisharia → Music" intro_text={false}/>

<main>
  <div class="music w-5/6 lg:w-1/2 mx-auto my-8">
    <h1 class="text-3xl text-center">
      E:\music
    </h1>
    <div class="container my-8">
      <p id="e-music-intro">
        I wrote most of my reviews in network of music blogs called E:\music.
        I'm administrator on thematic music blogs and redactor on main page of
        blog.
      </p>
    </div>
    <div class="main-publics-container">
      {#each Object.entries(e_music_publics) as [_, e_music_public]}
      <div class="px-0 md:px-16 py-8 social-links">
        <div class="public-link-image">
          <a href={e_music_public.link}>
            <img class="public-icon" alt="{e_music_public.name} icon"
              src="images/e-music/{e_music_public.image}.jpg"/>
          </a>
        </div>
        <div class="">
          <a href={e_music_public.link} class="e=music-link-caption">
            <h2 class="text-1.5xl underline e-music-public-icon-text md:pt-3.5">
              {e_music_public.name}
            </h2>
          </a>
          <h3 class="py-2">
            {e_music_public.time}
          </h3>
          <p class="e-music-public-description">
            {e_music_public.description}
          </p>
        </div>
      </div>
      {/each} 
    </div>
    <h1 class="text-3xl text-center">
      <a href="https://t.me/krautcat_musique">
        krautcat | musique
      </a>
    </h1>
    <div class="container my-8">
      <div class="social-links">
        <div class="public-link-image">
          <a href="https://t.me/krautcat_musique">
            <img class="public-icon" alt="krautcat | musique icon"
              src="images/publics/krautcat-musique.webp"/>
          </a>
        </div>
        <p id="e-music-intro">
          Part of my reviews goes to my main musicblog, Telegram channel
          <a href="https://t.me/krautcat_musique">krautcat | musique</a>. It
          contains exclusive texts and reviews of albums from main public of 
          E:\music network as well as from E:\music\emo.
        </p>
      </div>
    </div> 
  </div> 
</main>

<Footer />

<style global lang="postcss">@reference "tailwindcss";
  @reference "tailwindcss";
  @tailwind utilities;
  
  main {
    width: 60%;
    margin: auto;
  }

  .social-links {
    display: flex;
  }

  .public-link-image {
    margin: 1rem 1rem 1rem 0rem;
  }

  .e-music-public-icon-text {
      text-align: left;
      position: relative;
      bottom: 0;
  }

  .public-icon {
      position: relative;
      float: left;
      height: auto;
      width: 10vw;
  }

  @media (max-width: 1024px) {
    main {
      width: 90%;
      margin: 0 5% 0 5%;
    }


  }

  @media (max-width: 640px) {
    .social-links {
      display: contents;
    }

    #e-music-intro {
      margin-bottom: 3rem;
    }

    .public-link-image {
      display: flex;
      margin: 0rem 0rem 1rem 0rem;
    }

    .public-icon {
      width: 100%;
    }

    .e-music-link-caption {

    }

    .e-music-public-icon-text {
      margin-top: 0.5rem;
    }

    .e-music-public-description {
      margin-bottom: 3rem;
    }
  
    header .intro-text {
      align-items: center;
    }
  }
</style>
