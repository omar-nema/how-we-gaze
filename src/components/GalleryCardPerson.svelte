<script>
  export let cardSessionsArr, cardSessionsObj;
  export let sessionKey, sessionIndex;
  export let visViewMode;
  export let infoTipIndex;
  export let imgNav;
  import { screenWidth } from '../stores/pageState';

  let mobile = false;
  $: {
    if ($screenWidth <= 800) {
      mobile = true;
    }
  }
</script>

<div class="filter-group">
  {#if mobile}
    <span
      class="material-icons-round"
      style="font-size: 12px; color: gray;  margin-right: 10px"
    >
      person
    </span>
  {/if}

  <div
    class="filter person"
    class:info-highlight={infoTipIndex == 0}
    class:info-hide={visViewMode == 'original'}
  >
    <div
      class="arrow-nav clickable"
      class:disabled={sessionIndex == 0}
      on:click={() => {
        sessionIndex--;
      }}
    >
      <span class="material-icons-round md-18 nav" style="font-size: 26px"
        >arrow_left</span
      >
      {#if !mobile}
        <span>Prev</span>
      {/if}
    </div>

    <select class="clickable" bind:value={sessionKey} bind:this={imgNav}>
      {#each cardSessionsArr as session, index}
        <option value={session}>
          <span style="font-weight: 600; color: black;"
            >{cardSessionsObj[session].name}'s Gaze</span
          >
          <span style="font-weight: 400; color: gray"
            >({index + 1} of {cardSessionsArr.length})</span
          >
        </option>
      {/each}
    </select>
    <div
      class="clickable arrow-nav"
      class:disabled={sessionIndex == cardSessionsArr.length - 1}
      on:click={() => {
        sessionIndex++;
      }}
    >
      {#if !mobile}
        <span>Next</span>
      {/if}
      <span class="material-icons-round md-18 nav" style="font-size: 26px"
        >arrow_right</span
      >
    </div>
  </div>
</div>

<style>
  .arrow-nav {
    display: flex;
    align-items: center;
  }

  select {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    text-align: center;
    text-transform: capitalize;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    font-weight: 600;
  }

  .filter.person {
    background: none;
    width: 100%;
    margin: auto;
    padding: 5px 20px;
    display: flex;
  }
  .name {
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }

  .filter:last-child {
    border-right: none;
  }

  @media screen and (max-width: 800px) {
    .filter.person {
      align-items: center;
      background: var(--bg-gradient-dark);
      border-radius: 3px;
      overflow: hidden;
      padding: 0;
    }
    .arrow-nav {
      background: #cceaf1;
      height: 100%;
    }
    .filter-group {
      display: flex;
      align-items: center;
    }
    select {
      font-weight: 500;
    }
  }
</style>
