<script>
  import { Router, Route } from "svelte-routing";

  import NavLink from "./components/NavLink.svelte";
  
  import Home from "./routes/Home.svelte";
  import CV from "./routes/CV.svelte";

  export let url = ''; 
</script>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<Router {url}>
  <nav> 
    <NavLink to="/">Home</NavLink> 
    <NavLink to="cv">CV</NavLink>
  </nav>

  <div>
    <Route path="/" component="{Home}"/>
    <Route path="cv" component="{CV}"/>
  </div>
</Router>
