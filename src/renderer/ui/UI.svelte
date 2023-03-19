<script lang="ts">
  import './UI.css';
  import type Game from 'renderer/index'
  import type Events from 'renderer/util/Events'

  export let Game: Game
  export let Events: Events

  Events.addListener('updateUI', () => Game = window.GameInstance)

</script>

<main class="absolute h-full w-full">
  <div>{ Game.Player.lastFired }</div>
</main>