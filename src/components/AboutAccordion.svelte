<script>
  import { slide } from 'svelte/transition';
  import { activeAccordionIndex } from '../stores/pageState';

  export let questionText, chipText;
  let expanded = false;
  let thisAcc;
  let thisIndex = 9000;

  $: {
    if ($activeAccordionIndex == thisIndex) {
      expanded = true;
    } else {
      expanded = false;
    }
  }
</script>

<div
  class="question-cont"
  bind:this={thisAcc}
  on:click={() => {
    let all = document.querySelectorAll('.question-cont');
    thisIndex = Array.from(all).indexOf(thisAcc);
    if ($activeAccordionIndex !== thisIndex) {
      $activeAccordionIndex = thisIndex;
    } else {
      $activeAccordionIndex = null;
    }
  }}
>
  <div class="question">
    <div>
      <p>{questionText}</p>
    </div>
    <div style="display: flex; align-items:center">
      <div class="chip">{chipText}</div>
      <div class="expand">
        <span
          class="material-icons-round"
          class:rotate={thisIndex && $activeAccordionIndex == thisIndex}
        >
          expand_more
        </span>
      </div>
    </div>
  </div>
  <div class="answer" class:show={$activeAccordionIndex == thisIndex}>
    {#if expanded}
      <div transition:slide={{ duration: 200 }}>
        <slot />
      </div>
    {/if}
  </div>
</div>

<style>
  .close {
    width: 100%;
    display: flex;
    box-shadow: 0 -1px 8px 0 rgb(0 0 0 / 10%);
    justify-content: center;
    align-items: center;
  }

  .question-cont {
    background: white;
    border-radius: 10px;
    margin-bottom: 15px;
    align-items: center;
    padding: 10px 25px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.15s linear;
    font-size: 16px;
  }
  .question {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }
  :global(.answer) {
    transition: all 0.15s ease-in-out;
    height: 0;
    overflow: hidden;
    font-weight: 400;
    /* color: #0d61a4; */
    color: black;
    font-size: 16px;
  }
  :global(.answer.show) {
    height: auto;
  }
  .question-cont:hover {
    /* background: #fbfdfd; */
    border-color: #35c2e6;
  }
  .expand .material-icons-round {
    /* color: #35c2e6; */
    color: black;
    transform: rotate(-90deg);
    transition: all 0.2s ease-in-out;
  }

  .question-cont:hover .material-icons-round,
  :global(.material-icons-round.rotate) {
    transform: rotate(0deg) !important;
  }
  .expand {
    font-size: 16px;
    transition: all 0.15s linear;
  }
  .chip {
    background: #e0faff;
    border-radius: 50px;
    padding: 8px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    font-size: 14px;
    max-height: 40px;
  }
</style>
