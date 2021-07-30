<script lang="ts">
  export let toggleShowGameWindow: () => boolean;

  import { onDestroy, onMount } from 'svelte';
  import { AppSingleton } from '../classes/AppSingleton';
  import { InputHandler } from '../classes/InputHandler';
  import { Game } from '../classes/Game';

  let gameWindow: HTMLDivElement;

  onMount(() => {
    new Game(gameWindow);
    InputHandler.subscribe();
  });

  onDestroy(() => {
    AppSingleton.getInstance().destroy();
    InputHandler.unsubscribe();
  });
</script>

<div>
  <div id="gamewindow" bind:this={gameWindow} />
  <button on:click={toggleShowGameWindow}>Leave game</button>
</div>
