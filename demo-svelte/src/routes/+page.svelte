
<script lang="ts">
  let name = "Khoa"

</script>

<div class="main">
  <div>The hello engine!</div>
  
  <input bind:value={name} placeholder="Tell me your name" />
  
  <div>Hello {name}!</div>
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input {
    width: 200px;
  }
</style>
