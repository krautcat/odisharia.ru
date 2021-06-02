<script>
  let other_sites = [
    { link: "https://cv.odisharia.ru", name: "CV" },
    { link: "https://wishlist.odisharia.ru", name: "Wishlist" },
  ]     
  let social_links = [
    { link: "https://twitter.com/krautcat", name: "twitter" },
    { link: "https://vk.com/krautcat", name: "vk" },
    { link: "https://vk.com/ignorecam", name: "vk" },
    { link: "https://www.facebook.com/krautcat", name: "facebook" },
    { link: "https://www.flickr.com/photos/186754671@N03/", name: "flickr" },
    { link: "https://last.fm/user/Georg_Bonk", name: "last.fm" },
    { link: "https://instagram.com/ignorecam", name: "instagram" }
  ];
</script>

<style global lang="postcss">
  @import '../css/main.css';
  
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<main>
  <nav class="container fixed flex items-center justify-end w-screen p-6 mx-auto">
    <div class="flex items-center text-lg justify-items-center">
      {#each other_sites as site} 
        <a href="{site.link}" class="block mt-4 mr-10 text-white nav-link lg:inline-block hover:text-gray-300 lg:mt-0">
          {site.name}
        </a>
        {/each}
    </div>
  </nav>

  <header>
    <div class="container">
      <div class="text-gray-200 intro-text">
        <div class="text-5xl uppercase">
          Georgiy Odisharia
        </div>
        <p>
          IT specialist, music enthusiast, portable audiophile and keyboard hobbyist
        </p>
      </div>
    </div>
  </header>

  <div class="container w-3/5">
    <div class="content">
      <div class="userpic">
        <img src="userpic.jpg" alt="Loius Vain cat, userpic of Georgiy Odisharia">
      </div>
      
      <h2 class="text-2xl">About me</h2>

      <h2 class="text-2xl">Me on the internet</h2>
      <div class="container flex flex-row justify-center px-4 mx-auto social-links">
          {#each social_links as social_link} 
          <div class="social-link social-link-{social_link.name}">
            <a href={social_link.link}>
              <img class="social_link_icon" alt="{social_link.name} icon" src="icons/social-links/{social_link.name}.svg">
            </a>
          </div>
          {/each} 
      </div>
      <p/>
    </div>

    <!-- And finally, your cool footer -->
    <footer>
      <p>2021</p>
    </footer>
  </div>

</main>
