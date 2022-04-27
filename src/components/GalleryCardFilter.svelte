<script>
  export let gazeBtn, visFilter;
  export let sessionSliderMax, sessionData;
  export let visCurrFrame, visPlayStatus, visViewMode;
  export let visViewReactions = false;
  export let infoTipIndex, data;
  export let sessionReactions;
  import { screenWidth, selectedImage, pageState } from '../stores/pageState';
</script>

<div
  class="visual-filter filter-group"
  bind:this={visFilter}
  class:info-highlight={infoTipIndex == 1}
>
  {#if $screenWidth <= 800}
    <!-- <span style=" color: gray; margin-right: 10px">View</span> -->
    <span
      class="material-icons-round"
      style="font-size: 14px; color: gray;  margin-right: 10px"
    >
      filter_alt
    </span>
  {/if}
  <div class="filter-options">
    <div
      class="filter time clickable"
      class:selected={visViewMode == 'slice'}
      on:click={() => {
        if (visPlayStatus == 'pause') {
          visViewMode = 'slice';
          if (
            visCurrFrame == sessionData.length ||
            visCurrFrame == sessionData.length - 1
          ) {
            visCurrFrame = 0;
          }
          visPlayStatus = 'play';
        } else if (visViewMode == 'slice' && visPlayStatus !== 'pause') {
          visPlayStatus = 'pause';
        }
      }}
    >
      {#if visPlayStatus == 'pause'}
        <span class="play-toggle">Animate</span>
      {:else}
        <span
          on:click={() => {
            // visPlayStatus = 'pause';
          }}
          class="play-toggle">Pause</span
        >
      {/if}

      <span id="slider-holder">
        <input
          type="range"
          id="slider"
          name="slider"
          min="0"
          max={sessionSliderMax}
          step="1"
          on:input={() => {
            visViewMode = 'slice';
          }}
          bind:value={visCurrFrame}
        />
      </span>
    </div>
    <div
      class="filter clickable"
      class:selected={visViewMode == 'aggregate'}
      on:click={() => {
        visPlayStatus = 'pause';
        visViewMode = 'aggregate';
      }}
    >
      <!-- <span class="material-icons-round md-14">image</span> -->
      <span>Aggregate</span>
    </div>
    <div
      class="filter clickable"
      class:selected={visViewMode == 'point'}
      on:click={() => {
        visPlayStatus = 'pause';
        visViewMode = 'point';
      }}
    >
      <!-- <span class="material-icons-round md-14">image</span> -->
      <span>Point</span>
    </div>
    <div
      class="filter clickable"
      class:selected={visViewMode == 'original'}
      on:click={() => {
        visViewMode = 'original';
      }}
    >
      <!-- <span class="material-icons-round md-14">compare</span> -->
      <span>Original</span>
    </div>
  </div>
  <div
    class="filter clickable"
    style="margin-left: 25px; border-radius: 5px"
    on:click={() => {
      visViewReactions = !visViewReactions;
    }}
    class:selected={visViewReactions}
    class:disabled={!sessionReactions}
  >
    <span>Show Reactions</span>
  </div>
</div>
{#if $screenWidth > 950}
  <div
    class="viewer-filter  filter-group"
    class:info-highlight={infoTipIndex == 2}
  >
    <div class="filter-options">
      <div
        bind:this={gazeBtn}
        class="filter clickable add"
        on:click={() => {
          selectedImage.set(data);
          pageState.set('record');
        }}
      >
        <span> Add Your Gaze</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .filter-group {
    /* min-width: 350px; */
    font-size: var(--font-size-filter);
    align-items: center;
  }

  .filter-group,
  .filter-options {
    display: flex;
    flex-direction: row;
  }
  .filter-options {
    overflow: hidden;
    flex-grow: 0.7;
    border-radius: 5px;
    height: 100%;
  }
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
    text-align-last: center;
    -moz-text-align-last: center;
    text-transform: capitalize;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    font-weight: 600;
  }

  .filter {
    background: var(--bg-contrast-darker);
    height: 100%;
    border: 0.5px dashed transparent;
    transition: all 0.15s linear;
    border-right: 0.5px solid rgba(0, 0, 0, 0.1);
  }
  .filter.add {
    background: var(--bg-gradient-dark);
  }
  .filter:last-child {
    border-right: none;
  }

  .filter.selected {
    background: var(--bg-gradient-dark);
    /* border: 0.5px solid #0000004f; */
  }
  .filter,
  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 20px;
  }
  .label.compact {
    padding-left: 0;
    padding-right: 0;
  }

  .viewer-filter {
    margin-right: 15px;
  }

  input {
    margin: 0;
    padding: 0;
  }

  #slider-holder {
    display: flex;
    margin-left: 15px;
    align-items: center;
    width: 50px;
  }
  input {
    width: 100%;
  }

  .filter.time span {
    margin: 0 4px;
  }
  input[type='range'] {
    -webkit-appearance: none !important;
    height: 7px;
    border: none;
    border-radius: 0;
    background: var(--bg-contrast);
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    background: white;
    border-radius: 100%;
    border: none;
    box-shadow: none;
    height: 15px;
    width: 15px;
    cursor: pointer !important;
    transition: all 0.1s linear;
    box-shadow: var(--box-shadow-light);
  }
  input[type='range']::-ms-fill-lower {
    background: blue !important;
  }
  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none !important;
    background: white;
    border-radius: 100%;
    border: none;
    box-shadow: none;
    height: 15px;
    width: 15px;
    cursor: pointer !important;
    transition: all 0.15s ease-in-out;
    box-shadow: var(--box-shadow-light);
  }
  input[type='range']::-moz-range-thumb:hover {
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  }

  input[type='range']::-webkit-slider-thumb:hover {
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  }
  input[type='range']:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  .clickable:hover {
    color: var(--color-accent);
  }
  .play-toggle {
    width: 50px;
  }
  .disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  @media screen and (max-width: 800px) {
    .filter {
      padding: 6px 13px;
    }
    .filter-group {
      border-radius: 3px;
    }
    .filter-options {
      flex-grow: 1;
    }
    .filter.selected {
      background: #e0f6fc;
    }

    #slider-holder {
      width: 30px;
    }
    input[type='range'] {
      height: 5px;
    }
    input[type='range']::-webkit-slider-thumb {
      height: 10px;
      width: 10px;
    }

    input[type='range']::-moz-range-thumb {
      height: 10px;
      width: 10px;
    }
    #slider-holder {
      margin-left: 10px;
    }
  }
</style>
