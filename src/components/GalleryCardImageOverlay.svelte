<script>
  //full screen gallery card view
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { updateTooltip } from '../utils/tooltipUtils';
  export let imgHolder, width, fullScreen;
  let classAdjustment = false;
  if (width.includes('px')) {
    imgHolder.classList.add('widthAugment');
    classAdjustment = true;
  } else {
    imgHolder.classList.add('htAugment');
    classAdjustment = true;
  }

  //we have to re-bind event listeners when cloning node
  let clone = imgHolder.cloneNode(true);
  clone.querySelectorAll('.reaction-pin').forEach((d) => {
    d.addEventListener('mouseover', (e) => {
      updateTooltip(e.x, e.y, e.target.dataset.text);
    });
    d.addEventListener('mousemove', (e) => {
      updateTooltip(e.x, e.y);
    });
    d.addEventListener('mouseleave', (e) => {
      updateTooltip();
    });
  });

  onMount(() => {
    document.querySelector('.overlay').appendChild(clone);
  });
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
