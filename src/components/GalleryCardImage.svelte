<script>
  import { screenWidth, screenHeight } from '../stores/pageState';
  export let data;
  export let visViewMode;
  export let clips, clipHolder;

  //CUSTOM WIDTH AND HEIGHT CALC
  let dimWidthToHt = data.width / data.height;
  //cardwidth should be factoer
  let maxW = Math.min($screenWidth, 800),
    maxH = $screenHeight - 200;
  let width = 'auto',
    ht = 'auto',
    styleSubstring = '';

  if (dimWidthToHt < 1) {
    ht = Math.min(maxH, (data.height / data.width) * maxW) + 'px';
    styleSubstring = 'height: 100%';
  } else {
    width = Math.min(maxW, maxH * (data.width / data.height)) + 'px';
    styleSubstring = 'width: 100%';
  }
</script>

<div
  class="img-holder"
  style="width: {width}; height: {ht}; max-width: {data.width}px; max-height: {data.height}px"
>
  <img
    class:slice={visViewMode == 'slice'}
    class:agg={visViewMode == 'aggregate'}
    src={data.url}
    style={styleSubstring}
    class="main"
  />
  <svg
    class="contour"
    class:active={visViewMode == 'aggregate'}
    id="{data.key}-contour"
    style="width: 100%; height: 100%; position: absolute; top:0; left:0; z-index:10"
  />
  {#if visViewMode == 'slice'}
    <div bind:this={clipHolder}>
      {#each clips as clip}
        <img
          class="clip"
          style="clip-path: circle({clip.r}% at {clip.ctrx}% {clip.ctry}%); filter: blur({clip.blur}px);opacity: ${clip.opacity}"
          src={data.url}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .img-holder {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
    display: inline-block;
    margin: auto;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  img.agg {
    filter: blur(5px);
  }
  img.main {
    transition: all 0.3s ease-in-out;
  }
  img.slice {
    filter: blur(10px);
  }
  .info-hide {
    opacity: 0;
  }
  .info-highlight {
    border: 1px dashed var(--color-accent-faded) !important;
    box-shadow: var(--box-shadow-med);
    border-radius: 5px;
    opacity: 1;
  }
  .disabled {
    opacity: 0.1;
    pointer-events: none;
  }
  .clip {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    margin: auto;
    opacity: 1;
    transition: all 0.1s ease-in-out;
  }

  .contour {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease-in-out;
  }
  .contour.active {
    opacity: 1;
  }
</style>
