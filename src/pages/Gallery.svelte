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
    if ($offlineMode) {
      await getOfflineData();
    }
    await getAllWorks();
    initScroll();
  }
  init();
</script>

<div class="card-holder">
  <div class="card-outer intro">
    <p>
      Welcome to the Gallery! Each collection below visualizes how individuals
      gazed at a particular piece of artwork. Study the existing gazes in this
      gallery, or add your own.
    </p>
    <p>
      All works are sourced from the Smithsonian Insitute's <a
        href="https://www.si.edu/openaccess"
        target="_blank"
        >Open Access Collection
        <span class="material-icons-round" style="font-size: 12px;">
          open_in_new
        </span>
      </a>

      .
    </p>
  </div>
  {#each worksArray as img, i}
    {#if i == 0}
      <GalleryCard data={img} visViewMode={'aggregate'} />
    {:else}
      <GalleryCard data={img} visViewMode={'aggregate'} />
    {/if}
  {/each}
</div>

<style>
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
