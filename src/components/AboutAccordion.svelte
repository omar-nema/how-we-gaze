<script>
  import { slide } from 'svelte/transition';
  import { activeAccordionIndex } from '../stores/pageState';
  let a = false;
  export let questionText, chipText;
  let expanded = false;
  let thisAcc;
  let thisIndex;

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
    a.classList.toggle('show');
    expanded = !expanded;
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
  <div class="answer" bind:this={a}>
    {#if expanded}
      <div in:slide={{ duration: 100 }} out:slide={{ duration: 100 }}>
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
    font-size: 16px;
    max-height: 40px;
  }
</style>
