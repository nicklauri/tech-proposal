<script lang="ts">
  import { Link, Route, Router } from "svelte-routing";
  import Urls from "$lib/consts/url"
  import Index from "./routes/Index.svelte";
  import Home from "./routes/Home.svelte";
  import Info from "./routes/Info.svelte";

  let url = "/";
</script>

<Router {url}>
  <nav>
    <Link to={Urls.home.root} />
    <Link to={Urls.home.info} />
    <Link to={Urls.root} />
  </nav>
  <div>
    <Route path={Urls.home.root} component={Home} />
    <Route path={Urls.home.info} component={Info} />
    <Route path={Urls.root} component={Index} />
  </div>
</Router>

<style>
</style>
