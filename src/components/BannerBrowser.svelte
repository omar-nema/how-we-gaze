<script>
  import { slide } from 'svelte/transition';
  let bannerShow = true;
</script>

{#if bannerShow}
  <div class="banner" transition:slide={{ duration: 150 }}>
    <div class="inner">
      <p>
        This project runs smoother on Google Chrome or Edge - please switch over
        for the best experience!
      </p>
      <div
        class="btn-close clickable"
        on:click={() => {
          bannerShow = false;
        }}
      >
        <span
          class="material-icons-round"
          style="font-size: 14px; color: white; margin-right: 5px;"
        >
          close
        </span>
        <div>Dismiss</div>
      </div>
    </div>
  </div>
{/if}

<style>
  .banner {
    width: 100%;
    position: fixed;
    height: 50px;
    background: #ffffc6;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    z-index: 1000;
    box-shadow: var(--box-shadow-med);
  }
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    margin: auto;
  }

  .btn-close {
    color: white;
    display: flex;
    align-items: center;
    background-color: gray;
    border-radius: 5px;
    padding: 5px;
    margin-left: 40px;
    background: #7d7c44;
    font-weight: 500;
  }
</style>
