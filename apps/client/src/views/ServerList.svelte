<script lang="ts">
  import type { GameServerInfoId } from '@shooter2D/shared/interfaces';

  export let servers: GameServerInfoId[];
  export let toggleShowServerList: () => boolean;
  export let retrieveServerList: () => void;
  export let connectToServer: (name: string) => void;

  retrieveServerList();
</script>

<h1>Server list:</h1>
<div id="servers">
  {#if servers?.length > 0}
    <ul>
      {#each servers as server}
        <li on:click={() => connectToServer(server.id)}>{server.name}</li>
      {/each}
    </ul>
  {:else}
    <p>No servers!</p>
  {/if}
  <button on:click={toggleShowServerList}>Back</button>
</div>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }
</style>
