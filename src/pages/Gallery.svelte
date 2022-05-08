<script>
  import GalleryCard from '../components/GalleryCard.svelte';
  import { dbGet, dbWrite, getOfflineData } from '../utils/firebaseUtils.js';
  import { slide, fade } from 'svelte/transition';
  import {
    artworkMetadata,
    loadedWorksKeys,
    loadedWorksArray,
  } from '../stores/artworkMetadata';
  import { initScroll } from '../utils/scrollListener';
  import { onMount, afterUpdate } from 'svelte';
  import {
    cardInView,
    jumpCard,
    offlineMode,
    offlineData,
    imagesLoaded,
  } from '../stores/pageState';
  import jump from '../utils/jumpSection';

  let worksArray = [],
    worksKeys = [];
  async function getAllWorks() {
    let worksObject = await dbGet('works');
    if (worksObject) {
      let filtered = {};
      for (let d in $artworkMetadata) {
        //don't show errthing in Db, just what i've toggled in local file
        if (worksObject.hasOwnProperty(d)) {
          filtered[d] = worksObject[d];
        } else {
          await dbWrite('works/' + d, $artworkMetadata[d]);
        }
      }
      worksArray = Object.values(filtered);
      worksKeys = Object.keys(filtered);
    }
    loadedWorksKeys.set(worksKeys);
    loadedWorksArray.set(worksArray);
    cardInView.set(worksKeys[0]);
  }

  //after recording sesh, scroll to the card that was last viewed
  afterUpdate(() => {
    if ($jumpCard) {
      let observer = new MutationObserver((mutationRecords) => {
        if (mutationRecords.length > 10) {
          window.scrollTo({
            top: document.querySelector('#' + $jumpCard).getBoundingClientRect()
              .top,
          });
        }
      });
      observer.observe(document.querySelector('.card-holder'), {
        childList: true, // observe direct children
        subtree: false, // lower descendants too
        characterDataOldValue: true, // pass old data to callback
      });
    }
  });

  async function init() {
    await getOfflineData();
    await getAllWorks();
    initScroll();
  }
  init();
</script>

<div
  class="loading-overlay"
  class:hidden={worksArray.length > 1 &&
    worksArray.length == Object.keys($imagesLoaded).length}
>
  <p>Loading...</p>
</div>

<div class="card-holder">
  <div class="card-outer intro" style="font-size: 16px; font-weight: 400;">
    <h2>How We Gaze: Gallery</h2>
    <p>
      Welcome to the Gallery! Each collection below visualizes how individuals
      gazed at a particular piece of artwork. Study the existing gazes in this
      gallery, or add your own.
    </p>
    <p>
      All works are sourced from the Smithsonian and Met Institute Open
      Collections.
    </p>
  </div>
  {#each worksArray as img, i}
    <GalleryCard data={img} visViewMode="slice" />
  {/each}
</div>

<style>
  .loading-overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #e7f4f8;
    color: black;
    top: 0;
    left: 0;
    z-index: 3;
    font-size: 40px;
    transition: opacity 0.5s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loading-overlay.hidden {
    opacity: 0;
    pointer-events: none;
  }

  a {
    color: black;
    transition: all 0.15s linear;
    text-decoration: underline;
    text-decoration-color: rgba(0, 0, 0, 0.1);
  }
  a:hover {
    color: var(--color-accent);
  }
  .card-holder {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 30px;
  }
  .card-outer {
    background: linear-gradient(
      10deg,
      rgba(240, 240, 240, 0.05) 0%,
      rgba(0, 212, 255, 0.05) 100%
    );
  }
  h2 {
    margin-top: 0;
  }

  @media screen and (max-width: 800px) {
    .intro.card-outer {
      padding: 20px 25px;
    }
  }
</style>
