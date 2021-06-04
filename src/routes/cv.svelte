<script>
  import NavLinks from "../components/NavLinks.svelte"
</script>

<style global lang="postcss">
  @import '../css/cv.css';
</style>

<NavLinks />

<main>
  <div class="container grid grid-cols-2 auto-rows-auto gap-24">
    <div class="row-span-5">
      <img class="photo" src="images/image.png" alt="Gerogiy Odisharia"> 
    </div>
    
    <div class="">
      <h2>Georgiy Odisharia</h2>
      <p>Moscow, Russia</p>
      <a href="#"><i class="fab fa-linkedin"></i></a>
      <a href="https://github.com/krautcat"><i class="fab fa-github"></i></a>
    </div>
    
    <div class="">
      <h2>About</h2>
      <p>Embedded Linux system developer.</p>
    </div>
        
    <div>
      <h2>Experience</h2>
    
      <div>    
        <h3>Open Mobile Platform</h3>
        <h4>November, 2020 -- ...</h4>
        <p>
          Working with adaptation of the different mobile devices to Aurora OS. Aurora OS is the
          fork of Sailfish OS.
        </p>
        <ul class="list-disc">
          <li>Sailfish build system</li>
          <li>Bluez</li>
          <li>systemd</li>
          <li>pulseaudio</li>
        </ul>
      </div>
      
      <div>
        <h3>Yandex</h3>
        <h4>December, 2018 -- June, 2020</h4>
        <p>
          Developing smart speakers with Alice voice assistant. Adaptation of foreign devices to
          the business-logic code. Maintanance and devopsing different tasks.
        </p>
        <ul>
          <li>CI</li>
          <li>Android</li>
          <li>Buildroot</li>
          <li>Yocto Linux</li>
        </ul>
      </div>
      
      <div>
        <h3>Samsung R&D Russia<h3>
        <h4>July, 2017 -- November 2018</h4>
        <p>
          Technical support of IoT Academy project. Writing code snippets for student, testing
          hardware, flashing Artik boards.
        </p>
        <ul>
          <li>MQTT</li>
          <li>Tizen</li>
          <li>LoRa</li>
        </ul>
      </div>
    </div>
            
    <div>
      <h2>Skills</h2>
      <ul>
        <li>Programming languages</li>
          <ul>
            <li>C</li>
            <li>C++</li>
            <li>Python</li>
            <li>Perl</li>
          </ul>            
        <li>Technologies</li>
            <ul>
              <li>Linux kernel</li>
              <li>U-boot</li>
              <li>Android</li>
              <li>Buildroot</li>
              <li>Sailfish OS</li>
            </ul>
      </ul>
    </div>
            
    <div>
      <h2>Contact</h2>
      <p>georgiy.odisharia at gmail.com</p>
    </div>
  </div>
</main>
