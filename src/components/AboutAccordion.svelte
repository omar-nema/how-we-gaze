<script>
  import { onMount } from 'svelte';
  let a = false;
  let mount;
  export let questionText, chipText;
  let expanded = false;
</script>

<div
  class="question-cont"
  on:click={() => {
    a.classList.toggle('show');
    expanded = !expanded;
  }}
>
  <div class="question">
    <div>
      <p>{questionText}</p>
    </div>
    <div style="display: flex; align-items:center">
      <div class="chip">{chipText}</div>
      <div class="expand">
        <span class="material-icons-round" class:rotate={expanded}>
          expand_more
        </span>
      </div>
    </div>
  </div>
  <div class="answer" bind:this={a}>
    <slot />
  </div>
</div>

<style>
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
  }
  :global(.answer) {
    transition: all 0.15s ease-in-out;
    height: 0;
    overflow: hidden;
    font-weight: 400;
    color: var(--color-accent);
  }
  :global(.answer.show) {
    height: auto;
  }
  .question-cont:hover {
    /* background: #fbfdfd; */
    border-color: #35c2e6;
  }
  .expand .material-icons-round {
    color: #35c2e6;
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
