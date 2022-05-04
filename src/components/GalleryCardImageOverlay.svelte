<script>
  import { fade } from 'svelte/transition';
  export let imgHolder, width, fullScreen;
  let classAdjustment = false;
  if (width.includes('px')) {
    imgHolder.classList.add('widthAugment');
    classAdjustment = true;
  } else {
    imgHolder.classList.add('htAugment');
    classAdjustment = true;
  }
  console.log('i aint there');
</script>

<div class="overlay" transition:fade={{ duration: 100 }}>
  <div
    class="minimize clickable btn"
    on:click={() => {
      fullScreen = false;
    }}
  >
    <span class="material-icons-round"> close </span>
  </div>

  {#if imgHolder && classAdjustment}
    {@html imgHolder.outerHTML}
  {/if}
</div>

<style>
  .overlay {
    background: #4b4b4b;
    position: fixed;
    top: 0;
    z-index: 1000;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  :global(.overlay .img-holder) {
    border: none;
  }
  :global(.overlay .img-holder.htAugment) {
    height: 95vh !important;
  }
  :global(.overlay .img-holder.widthAugment) {
    width: 95vw !important;
  }
  :global(.overlay .img-holder .personToggle, .overlay .full-screen) {
    opacity: 0;
    pointer-events: none;
  }
  .minimize {
    position: fixed;
    top: 3%;
    right: 3%;
    background: #0000006e;
    z-index: 10000;
  }
  .material-icons-round {
    font-size: 26px;
    color: white;
  }
</style>
