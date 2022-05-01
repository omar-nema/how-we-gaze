<script>
  import { slide } from 'svelte/transition';
  import { modalState } from '../stores/pageState';
  import { loadedWorksKeys, loadedWorksArray } from '../stores/artworkMetadata';
  import Modal from '../components/Modal.svelte';
  import jump from '../utils/jumpSection';

  function fadeSlide(node, options) {
    const slideTrans = slide(node, options);
    return {
      duration: options.duration,
      css: (t) => `
				${slideTrans.css(t)}
				opacity: ${t};
			`,
    };
  }

  function jumpSection(artwork) {
    jump(`${artwork.key}`);
    modalState.set(null);
  }

  function getLowResImgPath(imgUrl) {
    let n = imgUrl.lastIndexOf('/');
    let pre = imgUrl.substring(0, n);
    let filepath = imgUrl.substring(n + 1);
    return pre + '/lowres/' + filepath;
  }
</script>

<Modal>
  <div class="container">
    <div class="cont-header">
      <h1>Navigate Artworks</h1>
      <div
        class="btn clickable"
        on:click={() => {
          modalState.set(null);
        }}
      >
        <span class="material-icons-round"> close </span>
      </div>
    </div>

    <div class="artwork-container">
      {#each $loadedWorksArray as artwork}
        <div
          class="artwork-holder clickable"
          on:click={() => {
            jumpSection(artwork);
          }}
        >
          <div class="img-holder">
            <img src={getLowResImgPath(artwork.url)} />
          </div>
          <div class="txt-holder">
            <p><strong>{artwork.title}</strong></p>
            <p>{artwork.artist}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</Modal>

<style>
  .container {
    padding-top: 0px;

    width: 85%;
    max-width: 1300px;
  }

  .btn {
    /* background: #ffffff75; */
    border-radius: 5px;
    transition: background 0.15s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
  }
  .cont-header {
    height: 120px;
    align-items: center;
  }

  .artwork-container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding-bottom: 150px;
    height: calc(100vh - 160px);
    overflow: auto;
  }
  .artwork-holder {
    display: flex;
    flex-direction: column;
    margin: 50px;
  }
  .img-holder {
    height: 215px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    height: 100%;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: var(--box-shadow-light);
  }
  .txt-holder {
    margin-top: 15px;
  }
  p {
    text-align: center;
    margin: 3px 0;
  }

  @media screen and (max-width: 800px) {
    .artwork-holder {
      margin: 20px;
      margin-bottom: 40px;
    }
    .img-holder {
      height: 150px;
    }
  }
</style>
