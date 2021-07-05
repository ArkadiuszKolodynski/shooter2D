<script lang="ts">
  import {
    CONNECTION_ACK,
    PLAYER_CONNECTION,
    RETRIEVE_SERVERLIST,
    PLAYER_SIGNAL,
    SERVER_SIGNAL,
    SERVERLIST,
  } from '@shooter2D/shared/events';
  import type { GameServerInfoId } from '@shooter2D/shared/interfaces';
  import GameWindow from './views/GameWindow.svelte';
  import Matchmaking from './views/Matchmaking.svelte';
  import ServerList from './views/ServerList.svelte';
  // import SimplePeer from 'simple-peer';

  const socket = new WebSocket('ws://127.0.0.1:3000');
  let servers: GameServerInfoId[] = [];
  let showGameWindow = false;
  let showMatchmaking = false;
  let showServerList = false;

  let p;

  socket.onopen = () => {
    socket.send(JSON.stringify({ event: PLAYER_CONNECTION }));
  };

  socket.onmessage = (e) => {
    const message = JSON.parse(e.data);
    switch (message.event) {
      case CONNECTION_ACK:
        console.log('connection created...');
        break;
      case SERVERLIST:
        servers = message.data;
        break;
      case SERVER_SIGNAL:
        p.signal(message.data['data']);
        break;
      default:
        console.log(e, message);
        console.log('Something went wrong!');
    }
  };

  const toggleShowGameWindow = (): boolean => (showGameWindow = !showGameWindow);
  const toggleShowMatchmaking = (): boolean => (showMatchmaking = !showMatchmaking);
  const toggleShowServerList = (): boolean => (showServerList = !showServerList);
  const retrieveServerList = (): void => socket.send(JSON.stringify({ event: RETRIEVE_SERVERLIST }));
  const connectToServer = (id: string): void => {
    console.log('Server id:', id);
    p = new SimplePeer({
      initiator: true,
    });

    p.on('error', (err) => console.log('error', err));

    p.on('signal', (data) => {
      console.log('SIGNAL', JSON.stringify(data));
      socket.send(JSON.stringify({ event: PLAYER_SIGNAL, data: { serverId: id, data } }));
    });

    p.on('connect', () => {
      console.log('CONNECT');
      p.send('whatever' + Math.random());
    });

    p.on('data', (data) => {
      console.log('data: ' + data);
    });

    p.on('close', () => {
      console.log('peer connection closed');
    });
  };
</script>

<main>
  {#if showMatchmaking}
    <Matchmaking {toggleShowMatchmaking} />
  {:else if showServerList}
    <ServerList {servers} {toggleShowServerList} {retrieveServerList} {connectToServer} />
  {:else if showGameWindow}
    <GameWindow {toggleShowGameWindow} />
  {:else}
    <h1>shooter2D</h1>
    <div>
      <button on:click={toggleShowMatchmaking}>Join game!</button>
      <br />
      <button on:click={toggleShowServerList}>Show server list</button>
      <br />
      <button on:click={toggleShowGameWindow}>Show gamewindow</button>
    </div>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
