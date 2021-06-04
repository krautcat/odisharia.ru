<script>
  import NavLinks from "../components/NavLinks.svelte";

  let social_links = [
    { link: "https://twitter.com/krautcat", name: "twitter" },
    { link: "https://vk.com/krautcat", name: "vk" },
    { link: "https://vk.com/ignorecam", name: "vk" },
    { link: "https://www.facebook.com/krautcat", name: "facebook" },
    { link: "https://www.flickr.com/photos/186754671@N03/", name: "flickr" },
    { link: "https://last.fm/user/Georg_Bonk", name: "last.fm" },
    { link: "https://instagram.com/ignorecam", name: "instagram" }
  ];

  let e_music_publics = {
    main: { 
      link: "https://vk.com/e_music", 
      name: "E:\\music"
    },
    math_rock: {
      link: "https://vk.com/mathwall",
      name: "E:\\music\\math rock"
    },
    noise_rock: {
      link: "https://vk.com/e_music_noise_rock",
      name: "E:\\music\\noise rock",
    },
    emo: {
      link: "https://vk.com/e_emo",
      name: "E:\\music\\emo"
    }
  }

  let y = 0;
  let headerHeight = 0;

  let navLinksBackground = "0, 0, 0"

  function updateNavLinksBackground(y) {
    if (y > headerHeight) {
      return "75, 85, 99";
    } else {
      return "0, 0, 0";
    }
  }

  $: navLinksBackground = updateNavLinksBackground(y);
</script>

<style global lang="postcss">
  @import '../css/main.css';
</style>

<svelte:window bind:scrollY={y}/>

<NavLinks backgroundColor={navLinksBackground}/>

<header class="flex flex-col justify-center" bind:clientHeight={headerHeight}>
  <div class="container mx-auto">
    <div class="text-gray-200 intro-text flex flex-col gap-y-8">
      <div class="text-5xl uppercase">
        Georgiy Odisharia
      </div>
      <p>
        IT specialist, music enthusiast, portable audiophile and keyboard hobbyist
      </p>
    </div>
  </div>
</header>

<main>
  <div class="aboutme container w-3/5 mx-auto p-6">
    <h2 class="text-2xl p-3">About me</h2>
    <p class="pb-2">
      I am Georgiy Odisharia, embedded software developer from Moscow.
      My main professional area is embedded Linux and mobile devices.
    </p>
    <p class="pb-2">
      Born in Yoshkar-Ola, respublic Mari El, I moved to Moscow when I was 18
      to learn computer science in Bauman Moscow State Technical University.

      I graduated bachelor degree in computer science and then began to work in
      Samsung R&D Research Russia as intern developer. Now I work in Open Mobile
      Platform as junior software developer.
    </p>
    <p class="pb-2">
      My hobbies was always unconventional. I am passionate to music, audiophile
      stuff and keyboards.
    </p>
    <p class="pb-2">
      In the internet I am famous as admin of some public pages on VK platform.
      Currently, I write about music on 
      <a href={e_music_publics.main.link} class="e_music_link">{e_music_publics.main.name}</a>,
      <a href={e_music_publics.math_rock.link} class="e_music_link">{e_music_publics.math_rock.name}</a>,
      <a href={e_music_publics.noise_rock.link} class="e_music_link">{e_music_publics.noise_rock.name}</a>
      and
      <a href={e_music_publics.emo.link} class="e_music_link">{e_music_publics.emo.name}</a>.
    </p>
    <p class="pb-2">
      In the audiophile hobby I am interested in portable audio devices. My main
      daily drivers currently are digital audio player theBit OPUS#3 and couple
      of earphones, Noble Audio Savanna and Etymotic ER-4S.
    <p>
    <p>
      Recently I began to dig into keyboard hobby. My main areas of interest here
      are keyboards with interesting and uncommon mounts targeted to flex,
      premium ergonomic keyboards and ergonomic split keyboards. For now I type
      on Prime_Elise and Thermal on daily basis.
    </p>
  </div>

  <div class="container socials w-3/5 mx-auto p-6">
    <h2 class="text-2xl pb-3">Me on the internet</h2>
    <div class="mx-auto grid grid-rows-3 md:grid-cols-5">
      
      <div class="md:row-span-3 md:col-span-2 mx-auto justify-items-left">
        <img src="../static/images/userpic.jpg" alt="Loius Vain cat, userpic of Georgiy Odisharia" class="userpic">
      </div>
      <div class="md:row-span-3 md:col-span-3 flex flex-wrap md:gap-8 gap-10 justify-center px-4 m-auto social-links">

          {#each social_links as social_link} 
          <div class="social-link social-link-{social_link.name}">
            <a href={social_link.link}>
              <img class="social_link_icon" alt="{social_link.name} icon" src="../static/icons/social-links/{social_link.name}.svg">
            </a>
          </div>
          {/each} 
      </div>

    </div>

    <!-- And finally, your cool footer -->
    <footer>
      <p>2021</p>
    </footer>
  </div>

</main>
