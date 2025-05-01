<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let social_links = [
    { name: "GitHub", link: "https://github.com/krautcat", icon: "github" },
    { name: "LinkedIn", link: "https://linkedin.com/in/krautcat ", icon: "linkedin" }
  ];
</script>

<svelte:window />

<Header intro_text={false} title={"Georgiy Odisharia → CV"} />

<main>
  <div>
    <div id="summary" class="justify-items-center md:justify-items-left mx-auto">
      
      <div id="photo">
        <img class="photo" src="images/image.webp" alt="Gerogiy Odisharia"> 
      </div>

      <div class="my-auto order-2 md:pl-8 mx-auto" id="info">
        <div class="font-black text-3xl text-center lg:text-left">
          Georgiy Odisharia
        </div>
        <div class="mx-auto text-center lg:text-left">
          Moscow, Russia
        </div>
        <div class="text-center lg:text-left">
          Embedded Linux system developer.
        </div>    
      </div>
      <div class="flex md:gap-2 gap-10 justify-evenly py-4 my-auto social-links">
        {#each social_links as social_link}
          <div class="social-link social-link-{social_link.name}">
            <a href="{social_link.link}">
              <img class="social_link_icon" alt="{social_link.name} icon" src="icons/social-links/{social_link.icon}.svg"> 
            </a>
          </div>
        {/each}
      </div> 
    </div>
  </div>

  <div class="container grid grid-cols-1 auto-rows-auto lg:grid-cols-3 gap-8 mx-auto">
        
    <div class="lg:col-span-2">
      <h2>Experience</h2>
    
      <div class="container grid grid-cols-1 lg:grid-cols-3 auto-rows-auto gap-x-1.5 md:gap-y-6">  
        <div> 
          <h3>Edelweiss, LLC</h3>
          <h4>December, 2021 — now</h4>
        </div>
        <div class="col-span-2">
          <h4>Middle embedded software developer and DevOps</h4>
          <p>
            Bringup of boards based on Baikal, Elbrus and Rockchip SoCs, modifying
            U-boot, UEFI (based on EDK 2) and Linux kernel, creating BSP, some DevOps.
          </p>
          <ul class="list-disc pl-8 dashed-list">
            <li>Linux kernel</li>
            <li>U-boot</li>
            <li>UEFI (EDK 2)</li>
            <li>Build systems of vendors</li>
            <li>OpenBMC</li>
            <li>BSP for boards</li>
            <li>Baikal, Elbrus, Rockhip</li>
            <li>Testing stand for boards (Python)</li>
            <li>DevOps (Redmine, GitLab, Gitea)</li>
          </ul>
        </div>
        
        <div> 
          <h3>Open Mobile Platform</h3>
          <h4>November, 2020 — December, 2021</h4>
        </div>
        <div class="col-span-2">
          <h4>Junior embedded software developer</h4>
          <p>
            Working with adaptation of the different mobile devices to Aurora OS. Aurora OS is the
            fork of Sailfish OS.
          </p>
          <ul class="list-disc pl-8 dashed-list">
            <li>Sailfish build system</li>
            <li>Bluez</li>
            <li>systemd</li>
            <li>pulseaudio</li>
          </ul>
        </div>
        
        <div>
          <h3>Yandex</h3>
          <h4>December, 2018 — June, 2020</h4>
        </div>
        <div class="col-span-2">
          <h4>Junior embedded software developer</h4>
          <p>
            Developing smart speakers with Alice voice assistant. Adaptation of foreign devices to
            the business-logic code. Maintenance and devopsing different tasks.
          </p>
          <ul class="list-disc pl-8 dashed-list">
            <li>CI</li>
            <li>Android</li>
            <li>Buildroot</li>
            <li>Yocto Linux</li>
          </ul>
        </div>
        
        <div>
          <h3>Samsung R&D Russia</h3>
          <h4>July, 2017 — November 2018</h4>
        </div>
        <div class="col-span-2">
          <h4>Intern embedded software developer</h4>
          <p>
            Technical support of IoT Academy project. Writing code snippets for students, testing
            hardware, flashing Artik boards.
          </p>
          <ul class="list-disc pl-8 dashed-list">
            <li>MQTT</li>
            <li>Tizen</li>
            <li>LoRa</li>
          </ul>
        </div>
      </div>
    </div>
            
    <div class="lg:col-span-1">
      <h2>Skills</h2>
      <div class="grid grid-cols-2 auto-cols-min">
      <div class="h-1/6">
        <h3>Programming languages</h3>
      </div>
      <div class="h-1/6">        
        <h3>Technologies</h3>
      </div>
      <div>
        <ul class="list-disc pl-8 dashed-list">
          <li>C</li>
          <li>C++</li>
          <li>Python</li>
          <li>Perl</li>
          <li>Ruby</li>
          <li>Tcl</li>
          <li>Bash</li>
          <li>Rust</li>
        </ul>    
      </div>
      <div>
        <ul class="list-disc pl-8 dashed-list">
          <li>Linux kernel</li>
          <li>U-boot</li>
          <li>UEFI (EDK 2)</li>
          <li>Device Tree</li>
          <li>Buildroot</li>
          <li>Android</li>
          <li>Sailfish OS</li>
          <li>Yoctu</li>
          <li>OpenBMC</li>
        </ul>
      </div>
      </div>
      <div class="">
        <h2>Contact</h2>
        <p>E-mail:
          <a href="mailto:georgiy.odisharia@gmail.com">georgiy.odisharia at gmail.com</a>
        </p>
        <p>Telegram:
          <a href="https://t.me/krautcat">@krautcat</a>
        </p>
      </div>
    </div>
  </div>
</main>

<Footer />

<style lang="postcss">
  @tailwind utilities;
  @reference "tailwindcss"; 
  main {
    width: 60%;
    margin: auto;
  }
  
  #summary {
    display: flex;
    flex-direction: row;

  }

  #info {
    flex-grow: 1;
    justify-self: auto;
  }
  
  h2 {
    @apply font-bold;
    @apply text-3xl;
    @apply py-4;
  }
  
  h3 {
    @apply font-semibold;
  }
  
  h4 {
    @apply font-medium;
  }
  
  #photo {
    margin: 1rem 1rem 1rem 1rem;
  }
  .social_link_icon {
    margin: 0rem 0.5rem 0rem 0.5rem;
    height: 2rem;
    width: 2rem;
  }
  
  .photo {
    border-radius: 50%;
    height: 40vh;
    width: 40vh;
  }
  
  ul.dashed-list {
    list-style-type: none;
  }
  
  ul.dashed-list > li {
    text-indent: -1.5rem;
  }
  
  ul.dashed-list > li:before {
    content: "— ";
    text-indent: -1.5rem;
  }
  
  footer {
    text-align: center;
    border-top: 2px;
  }
  
  @media (max-width: 640px) {

    h2 {
      margin: 1rem 0 0 0;
      padding: 0 0 0 0;
    }

    h4 {
      margin: 0 0 1rem 0;
    }
    main {
      width: 90%;
      margin: auto;
    }

    #summary {
      flex-wrap: wrap;
    }

    #photo {
      display: block;
      flex-wrap: nowrap;
      margin: auto;
    }

    .social-links {
      flex-grow: 1;
    }
  }
</style>