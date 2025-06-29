<script lang="ts">
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
</script>

<svelte:window />

<Header subtitle="Music" intro_text={false}/>

<main>
  <div class="music mx-auto my-8">
    <h1 class="text-3xl">
      E:\music
    </h1>
    <div class="container my-8">
      <p id="e-music-intro">
        I wrote most of my reviews in network of music blogs called E:\music.
        I'm administrator on thematic music blogs and redactor on main page of
        blog.
      </p>
    </div>
    <div id="main-publics-container">
      {#each Object.entries(e_music_publics) as [_, e_music_public]}
      <div class="social-links">
        <div class="public-link-image">
          <a href={e_music_public.link}>
            <img class="public-icon" alt="{e_music_public.name} icon"
              src="images/e-music/{e_music_public.image}.jpg"/>
          </a>
        </div>
        <div class="e-music-public-info">
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
  </div> 

  <div class="music mx-auto my-8">
    <h1 class="text-3xl">
      <a href="https://t.me/krautcat_musique">
        krautcat | musique
      </a>
    </h1>
    <div class="main-publics-container">
      <div class="social-links">
        <div class="public-link-image">
          <a href="https://t.me/krautcat_musique">
            <img class="public-icon" alt="krautcat | musique icon"
              src="images/publics/krautcat-musique.webp"/>
          </a>
        </div>
        <div>
        <h3 class="py-2">
          2023 – present
        </h3>
        <p id="e-music-public-description">
          Part of my reviews goes to my main music blog, Telegram channel
          <a href="https://t.me/krautcat_musique">krautcat | musique</a>. It
          contains exclusive texts and reviews of albums from main public of 
          E:\music network as well as from E:\music\emo.
        </p>
        </div>
      </div>
    </div> 
  </div>
</main>

<style global lang="postcss">

  main {
    width: 60%;
    margin: auto;
  }

  #main-publics-container {
    display: flex;
    flex-direction: column;
  }

  .social-links {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    gap: 0;
    margin-left: 0;
    margin-right: auto;
  }

  .public-link-image {
    flex-shrink: 1;
    margin: 1rem 1rem 1rem 0rem;
  }

  .e-music-public-icon-text {
      text-align: left;
      position: relative;
      bottom: 0;
      right: 0;
  }

  .public-icon {
      position: relative;
      float: left;
      height: auto;
      width: 10vw;
  }

  @media (max-width: 640px) {
    main {
      width: 90%
    }
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
