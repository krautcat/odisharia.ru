<script lang="ts">
  import Header from "$lib/components/Header.svelte"
  import Footer from "$lib/components/Footer.svelte";
  import NavLinks from "$lib/components/NavLinks.svelte";

  let social_links = [
    { link: "https://twitter.com/ken__mode", name: "twitter" },
    { link: "https://vk.com/krautcat", name: "vk" },
    { link: "https://vk.com/ignorecam", name: "vk" },
    { link: "https://www.facebook.com/krautcat", name: "facebook" },
    { link: "https://www.flickr.com/photos/186754671@N03/", name: "flickr" },
    { link: "https://last.fm/user/Georg_Bonk", name: "last.fm" },
    { link: "https://instagram.com/ignorecam", name: "instagram" },
  ];

  let e_music_publics = {
    main: {
      link: "https://vk.com/e_music",
      name: "E:\\music",
      image: "e-music",
    },
    math_rock: {
      link: "https://vk.com/mathwall",
      name: "E:\\music\\math rock",
      image: "e-music-math-rock",
    },
    noise_rock: {
      link: "https://vk.com/e_music_noise_rock",
      name: "E:\\music\\noise rock",
      image: "e-music-noise-rock",
    },
    emo: {
      link: "https://vk.com/e_emo",
      name: "E:\\music\\emo",
      image: "e-music-emo",
    },
  };
</script>

<svelte:window />

<Header />
<NavLinks />

<main>
  <div class="aboutme">
    <h2 class="text-3xl">About me</h2>
    <div>
      <p class="pb-2">
        I am Georgiy Odisharia, embedded software developer from Moscow. My main
        professional area is embedded Linux, bootloaders, low-level userspace
        applications and mobile devices.
      </p>
      <p class="pb-2">
        Born in Yoshkar-Ola, republic of Mari El, I moved to Moscow when I was
        18 to learn computer science in Bauman Moscow State Technical
        University. I graduated bachelor degree in computer science and then
        began to work in Samsung R&amp;D Research Russia as intern developer.
        Worked in Yandex and Open Mobile Platform. Currently employed in
        Edelweiss LLC as embedded software developer.
      </p>
      <p class="pb-2">
        My hobbies were always unconventional. I am passionate to music,
        audiophile stuff and keyboards.
      </p>
    </div>

    <h3 class="text-2xl underline">
      <a data-sveltekit-preload-data="tap" href="./music">Music</a>
    </h3>
    <div>
      <p>
        In the internet I am famous as admin of some public pages on VK
        platform. Currently, I write about music on
        <a href={e_music_publics.main.link} class="e_music_link"
          >{e_music_publics.main.name}</a
        >,
        <a href={e_music_publics.math_rock.link} class="e_music_link"
          >{e_music_publics.math_rock.name}</a
        >,
        <a href={e_music_publics.noise_rock.link} class="e_music_link"
          >{e_music_publics.noise_rock.name}</a
        >
        and
        <a href={e_music_publics.emo.link} class="e_music_link"
          >{e_music_publics.emo.name}</a
        >.
      </p>
    </div>

    <h3 class="text-2xl">Audiophilia</h3>
    <div>
      <p class="pb-2">
        In the audiophile hobby I am interested in portable audio devices. My
        main daily drivers currently are digital audio player theBit OPUS#3 and
        couple of earphones, Noble Audio Savanna and Etymotic ER-4S.
      </p>
    </div>

    <h3 class="text-2xl">Keyboards</h3>
    <div>
      <p>
        Recently I began to dig into keyboard hobby. My main areas of interest
        here are keyboards with interesting and uncommon mounts targeted to
        flex, premium ergonomic keyboards and ergonomic split keyboards. For now
        I type on TEX Shinobi with Cherry MX Green and Thermal with Thic Thock
        Marshmallows on daily basis.
      </p>
    </div>
  </div>

  <div class="socials">
    <h2 class="text-2xl">Me on the internet</h2>
    <div class="grid grid-cols-1 grid-rows-5 lg:grid-cols-5 lg:grid-rows-3 lg:justify-items-center">
      <div class="social-link-avatar row-span-4 lg:row-span-3 lg:col-span-1">
        <img
          src="images/userpic.jpg"
          alt="Loius Vain cat, userpic of Georgiy Odisharia"
          class="userpic"
        />
      </div>
      <div
        class="row-span-3 col-span-5 lg:col-span-4 flex justify-stretch 
        gap-2 social-links"
      >
        {#each social_links as social_link}
          <div class="social-link social-link-{social_link.name}">
            <a href={social_link.link}>
              <img
                class="social-link-icon"
                alt="{social_link.name} icon"
                src="icons/social-links/{social_link.name}.svg"
              />
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>

<Footer/>

<style global lang="postcss">
  @tailwind utilities;
  @reference "tailwindcss";

  :root {
    --userpic-size: 16rem;
    --tw-bg-opacity: 1;
  }

  main {
    width: 60%;
    margin: 0 0 0 0;
  }

  .nav-show {
    transform: translateY(0%);
  }

  .nav-hide {
    transform: translateY(-100%);
  }

  h1, h2 {
    text-algin: left;
  }

  h3 {
    text-align: left;
  }

  .other-sites {
    text-align: center;
  }

  .userpic {
    width: var(--userpic-size);
    text-align: center;
    height: auto;
    border-radius: 50%;
  }

  .social-link-avatar {
    margin: 0rem 0.5rem 0rem 0.5rem;
    height: calc(var(--userpic-size) / 5 - 1 rem);
    width: calc(var(--userpic-size) / 5 - 1 rem);
  }

  .e_music_link {
    text-decoration: underline;
  }

  .e-music-public-image {
    height: 100%;
  }

  @layer base {
    a.nav-link {
      @apply text-gray-600;
    }

    a.nav-link:visited {
      @apply text-zinc-500;
    }
  }

  nav {
    padding: 0 0 0 0;
  }

  @media (max-width: 1024px) {
    main {
      width: 90%;
      margin: 0 5% 0 5%;
    }

    header .intro-text {
      align-items: center;
    }

    .aboutme,
    .socials {
      @apply w-full;
      margin: 0 auto 0 auto
    }

    .social-link-avatar {
      padding: 1rem 1rem 1rem 1rem;
      margin: auto auto auto auto;
      align-self: center;
      justify-self: center;
    }

    .userpic {
      margin: auto auto auto auto;

    }

    .social-links {
      flex-direction: row;
    }

    .social-link {
      margin: auto auto auto auto;
      height: calc(var(--userpic-size) / 5 - 1rem);
      width: calc(var(--userpic-size) / 5 - 1rem);
    }
  }

  @media (min-width: 1024px) {
    :root {
      --userpic-size: 10rem;
      width: 60%;
      margin: auto;
    }

    main {
      width: 80%;
      margin: 0 auto 0 auto;
    }
    
    .aboutme,
    .socials {
      @apply w-full;
      margin: 0 auto 0 auto
    }

    .social-link-avatar {
      margin: 0rem 0.5rem 0rem 0.5rem;
    }

    .userpic {
      margin: auto;
      vertical-align: middle;
    }

    .social-links {
      column-gap: 1rem;
    }

    .social-link {
      margin: auto auto auto auto;
      height: calc(var(--userpic-size) / 2 - 1rem);
      width: calc(var(--userpic-size) / 2 - 1rem);
    }
  }
</style>