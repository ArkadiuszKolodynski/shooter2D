<script lang="ts">
  export let toggleShowMatchmaking: () => boolean;
</script>

<div id="matchmaking">
  <p>Searching for available games...</p>
  <button on:click={toggleShowMatchmaking}>Cancel</button>
</div>
