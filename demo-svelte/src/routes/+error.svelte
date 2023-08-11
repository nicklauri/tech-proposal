<script>
  import { page } from "$app/stores"
  import Urls from "$lib/consts/url"
</script>

<h1>Error: {$page.status} - {$page.error?.message}</h1>
<br />
<a href={Urls.home.path}>Go to: {Urls.home.name}</a>
