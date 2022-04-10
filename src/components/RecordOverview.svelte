<script>
  import { slide, fade } from 'svelte/transition';
  import { sessionName } from '../stores/gazerState';
  export let userName = '';
  export let currSection;

  $: {
    if (userName.length > 1) {
      $sessionName = userName;
      currSection.disableNext = false;
    }
  }
</script>

<p>
  In order to generate a visualization of your viewing session, we’ll ask you to
  study a piece of artwork for 15 seconds with your webcam turned on.
</p>
<p>
  <strong>No personal information will be recorded.</strong> The only information
  that will be recorded is a series of points corresponding to your eye movement.
  Please enable webcam permission to proceed!
</p>
<p>
  This should take about 5 minutes total. Before we get started, <strong
    >please enter your name (or whichever name you'd like to associate your
    gaze).</strong
  >
</p>

<div class="input-wrapper">
  <input placeholder="Enter name here" bind:value={userName} />
</div>

<style>
  .input-wrapper {
    margin-top: 50px;
    display: flex;
    height: 50px;
    justify-content: center;
    width: 100%;
    align-items: center;
  }
  input {
    background: var(--bg-contrast-darker);
    min-width: 50%;
    padding: 0 20px;
    height: 100%;
    border-radius: 0;
    margin: 0;
    box-sizing: border-box;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
