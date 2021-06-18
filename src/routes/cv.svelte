<script>
  import NavLinks from "../components/NavLinks.svelte";

  let social_links = [
    { name: "GitHub", link: "https://github.com/krautcat", icon: "github" },
    { name: "LinkedIn", link: "https://linked.in/krautcat", icon: "linkedin" }
  ];

  let headerHeight = 0;
  let photoHeight = 0;

  let screenWidth = 0;
  let mainDivWidth = 0;

  let headerTextPaddingLeft = 0;
  let headerPhotoPaddingRight = 0;

  function updateHeaderPadding(screenWidth) {
    return (screenWidth - mainDivWidth) / 2; 
  }
</script>

<style global lang="postcss">
  @import '../css/cv.css';
</style>

<svelte:window bind:innerWidth={screenWidth}/>

<NavLinks />

<header bind:clientHeight={headerHeight}>
  <div class="flex flex-wrap justify-items-center md:justify-items-left mx-auto w-9/12 xl:w-8/12 md:h-1/4">
    
    <div class="flex-grow my-auto order-2 md:order-1">
      <div class="font-black text-3xl">
        Georgiy Odisharia
      </div>
      <div class="mx-auto">
        Moscow, Russia
      </div>
      <div>
        Embedded Linux system developer.
      </div>
      <div class="flex flex-wrap md:gap-2 gap-10 justify-left p-4 my-auto social-links">
        {#each social_links as social_link}
          <div class="social-link social-link-{social_link.name}">
            <a href="{social_link.link}">
              <img class="social_link_icon" alt="{social_link.name} icon" src="icons/social-links/{social_link.icon}.svg"> 
            </a>
          </div>
        {/each}
      </div> 
    
    </div>
    
    <div class="order-1 md:order-2 py-16 md:h-1/4 md:w-1/4">
      <img class="mx-auto photo" src="images/image.png" alt="Gerogiy Odisharia"> 
    </div>
  </div>
</header>

<main>
  <div class="container grid grid-cols-1 auto-rows-auto md:grid-cols-2 xl:grid-rows-7 gap-8 w-9/12 md:w-8/12 mx-auto" bind:clientWidth={mainDivWidth}>
        
    <div>
      <h2>Experience</h2>
    
      <div class="pb-4">    
        <h3>Open Mobile Platform</h3>
        <h4>November, 2020 — …</h4>
        <p>
          Working with adaptation of the different mobile devices to Aurora OS. Aurora OS is the
          fork of Sailfish OS.
        </p>
        <ul class="list-disc pl-8">
          <li>Sailfish build system</li>
          <li>Bluez</li>
          <li>systemd</li>
          <li>pulseaudio</li>
        </ul>
      </div>
      
      <div class="pb-4">
        <h3>Yandex</h3>
        <h4>December, 2018 — June, 2020</h4>
        <p>
          Developing smart speakers with Alice voice assistant. Adaptation of foreign devices to
          the business-logic code. Maintanance and devopsing different tasks.
        </p>
        <ul class="list-disc pl-8">
          <li>CI</li>
          <li>Android</li>
          <li>Buildroot</li>
          <li>Yocto Linux</li>
        </ul>
      </div>
      
      <div>
        <h3>Samsung R&D Russia</h3>
        <h4>July, 2017 — November 2018</h4>
        <p>
          Technical support of IoT Academy project. Writing code snippets for students, testing
          hardware, flashing Artik boards.
        </p>
        <ul class="list-disc pl-8">
          <li>MQTT</li>
          <li>Tizen</li>
          <li>LoRa</li>
        </ul>
      </div>
    </div>
            
    <div>
      <h2>Skills</h2>
      <div class="grid grid-cols-2 auto-rows-auto">
        <div class="h-1/6">
          <h3>Programming languages</h3>
        </div>
        <div class="h-1/6">        
          <h3>Technologies</h3>
        </div>
        <div>
          <ul class="list-disc pl-8">
            <li>C</li>
            <li>C++</li>
            <li>Python</li>
            <li>Perl</li>
          </ul>    
        </div>
        <div>
          <ul class="list-disc pl-8">
            <li>Linux kernel</li>
            <li>U-boot</li>
            <li>Android</li>
            <li>Buildroot</li>
            <li>Sailfish OS</li>
          </ul>
        </div>
      </div>
    </div>
            
    <div class="md:col-span-2 md:mx-auto">
      <h2 class="md:text-center">Contact</h2>
      <p class="md:text-center">georgiy.odisharia at gmail.com</p>
    </div>
  </div>

  <footer class="mx-auto py-4">
    <p class="text-center">2021</p>
  </footer>
</main>
