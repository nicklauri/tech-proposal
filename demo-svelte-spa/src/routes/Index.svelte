<script>
  import Urls from "$lib/consts/url"
  import { navigate } from "svelte-routing"
</script>

<div>Index page</div>

<button on:click={() => navigate("/home")}>To home</button>
<button on:click={() => navigate("/home/info")}>To info</button>
<br />
<a href={Urls.root}>To: /</a><br />
<a href={Urls.home.root}>To: /Home</a><br />
<a href={Urls.home.info}>To: /Home/Info</a>