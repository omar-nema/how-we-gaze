<script>
  import {
    pageState,
    selectedImage,
    screenWidth,
    screenHeight,
    cardInView,
    tooltipText,
    tooltipShow,
  } from '../stores/pageState';
  import { dbGet } from '../utils/firebaseUtils.js';
  import { onMount } from 'svelte';
  import { contourMapBlur } from '../utils/generateVisuals';
  import Tooltip from './Tooltip.svelte';
  import GalleryCardImage from './GalleryCardImage.svelte';
  import GalleryCardTip from './GalleryCardTip.svelte';
  import GalleryCardFilter from './GalleryCardFilter.svelte';
  import GalleryCardPerson from './GalleryCardPerson.svelte';
  //utils
  import { fade } from 'svelte/transition';
  import { updateTooltip, updateHelperTextPos } from '../utils/tooltipUtils';
  import jump from '../utils/jumpSection';
  import { createClips, moveClips } from '../utils/galleryCardAnimate';
  export let data;

  //LOCAL STATES
  let mount = false;
  let sessionLoaded = false;
  let cardSessionsObj = data.sessionData;
  let cardSessionsArr = Object.keys(data.sessionData);
  let sessionIndex = cardSessionsArr.length - 1;
  let sessionKey = cardSessionsArr[sessionIndex.length - 1];
  let sessionData = null;
  let sessionSliderMax = 100;
  let visViewMode = 'slice';
  let visPlayStatus = 'pause';
  let visCurrFrame = 0;
  let infoTipIndex = -1;
  let clips = [];

  onMount(async () => {
    await getSessionData(sessionKey);
    mount = true;
  });

  //SESSION STATE REACTIVITY
  $: {
    if (mount) {
      sessionKey = cardSessionsArr[sessionIndex];
      getSessionData(sessionKey);
    }
  }

  //VIEW MODE REACTIVITY
  $: {
    if (mount && visViewMode == 'aggregate') {
      contourMapBlur(
        sessionData,
        `#${data.key} .img-holder`,
        `#${data.key}-contour`,
        data.url
      );
    }
  }

  //HELPER TEXT MOVEMENT
  let helperTextPositions = [[], [0, 0], [0, 0]];
  let imgNav, visFilter, gazeBtn, card;
  $: {
    if (imgNav && visFilter && gazeBtn) {
      let textObjects = [imgNav, visFilter, gazeBtn];
      textObjects.forEach((obj, index) => {
        if (obj) {
          updateHelperTextPos(
            index,
            obj.getBoundingClientRect(),
            card.getBoundingClientRect(),
            helperTextPositions
          );
        }
      });
    }
  }

  //ANIMATION REACTIVITY
  $: {
    if (mount) {
      if (visPlayStatus == 'play' && visCurrFrame < sessionData.length - 1) {
        setTimeout(() => {
          visCurrFrame++;
        }, 50);
      } else if (
        visPlayStatus == 'play' &&
        visCurrFrame == sessionData.length - 1
      ) {
        visPlayStatus = 'pause';
      }
    }
  }

  async function getSessionData(key) {
    sessionData = await dbGet('sessionData/' + key);
    if (sessionData) {
      sessionSliderMax = sessionData.length;
      sessionLoaded = true;

      clips = await createClips(data.url, sessionData);
      visCurrFrame = 0;
    }
    return;
  }

  //ANIMATION
  let clipHolder, domClips;
  $: {
    if (clipHolder) {
      domClips = clipHolder.childNodes;
    }
  }
  $: {
    visCurrFrame;
    if (mount && sessionLoaded) {
      if (visCurrFrame < sessionData.length - 1) {
        moveClips(
          domClips,
          sessionData[visCurrFrame].xPct,
          sessionData[visCurrFrame].yPct
        );
      }
    }
  }
  // $: clips;
</script>

{#if mount}
  {#if $tooltipShow}
    <div transition:fade={{ duration: 100 }}>
      <Tooltip />
    </div>
  {/if}

  <div
    class="card-outer"
    id={data.key}
    class:active={data.key == $cardInView}
    bind:this={card}
  >
    {#if infoTipIndex >= 0}
      <GalleryCardTip {helperTextPositions} bind:infoTipIndex />
    {/if}
    <div class="card-header">
      <h2 style="display: flex; align-items: center;">
        {#if $screenWidth >= 900}
          <div
            style="font-weight: 400; color: rgb(126 123 123);margin-right: 15px;"
          >
            Gaze Collection
          </div>
        {/if}
        <a
          class="clickable"
          style="display: flex; align-items: center;"
          href={data.origLink}
          target="_blank"
        >
          <span>
            {data.artist}, <i>{data.title}</i>
          </span>
          <span
            class="material-icons-round"
            style="font-size: 12px; margin-left: 6px"
          >
            open_in_new
          </span>
        </a>
      </h2>
      {#if $screenWidth >= 900}
        <div
          class="clickable"
          on:click={() => {
            jump(data.key);
            infoTipIndex = 0;
          }}
        >
          <span class="material-icons-round md-14" style="color: #bfb9b9"
            >info</span
          >
        </div>
      {/if}
    </div>

    <GalleryCardFilter
      bind:visFilter
      bind:gazeBtn
      bind:sessionSliderMax
      bind:visCurrFrame
      bind:visPlayStatus
      bind:visViewMode
      {infoTipIndex}
      {sessionData}
    />

    <div class="center">
      <GalleryCardImage bind:clipHolder {data} {visViewMode} {clips} />
      <GalleryCardPerson
        bind:imgNav
        bind:sessionKey
        bind:sessionIndex
        {cardSessionsArr}
        {cardSessionsObj}
        {visViewMode}
        {infoTipIndex}
      />
    </div>
  </div>
{/if}

<style>
  .card-outer {
    opacity: 0.2;
    position: relative;
    transition: opacity 0.3s ease-in-out;
  }
  .card-outer.active {
    opacity: 1;
  }
  .card-header {
    display: flex;
  }
  #contour-overlay {
    background: black;
  }
  a {
    color: black;
    transition: all 0.15s linear;
  }
  a:hover {
    text-decoration: none;
  }
  h2 {
    text-align: left;
    width: 100%;
    margin-top: 0;
  }
  i {
    text-decoration: underline;
    text-decoration-color: gray;
  }
  .material-icons-round {
    font-size: 18px;
    margin-right: 5px;
  }
  :global(.filter) {
    background: var(--bg-contrast-darker);
    padding: 0 10px;
    height: 100%;
    border: 0.5px dashed transparent;
    transition: all 0.15s linear;
    border-right: 0.5px solid rgba(0, 0, 0, 0.1);
  }
  .clickable:hover {
    color: var(--color-accent);
  }
  .center {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  @media screen and (max-width: 900px) {
    .card-outer {
      opacity: 1 !important;
    }
  }
</style>
