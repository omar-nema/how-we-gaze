<script>
  export let infoTipIndex,
    currSessionIndex,
    viewMode,
    currSessionKey,
    sessionsArray;
  console.log(infoTipIndex, currSessionIndex, viewMode);
</script>

<div
  class="filter person"
  class:info-highlight={infoTipIndex == 0}
  class:info-hide={viewMode == 'original'}
>
  <div
    class="arrow-nav clickable"
    class:disabled={currSessionIndex == 0}
    on:click={() => {
      currSessionIndex--;
      currSessionKey = sessionsArray[currSessionIndex];
    }}
  >
    <span class="material-icons-round md-18 nav" style="font-size: 26px"
      >arrow_left</span
    >
    <span>Prev</span>
  </div>

  <select class="clickable" bind:value={currSessionKey}>
    {#each sessionsArray as session, index}
      <option value={session}>
        <span style="font-weight: 600; color: black;"
          >{sessions[session].name}'s Gaze</span
        >
        <span style="font-weight: 400; color: gray"
          >({index + 1} of {sessionsArray.length})</span
        >
      </option>
    {/each}
  </select>
  <div
    class="clickable arrow-nav"
    class:disabled={currSessionIndex == sessionsArray.length - 1}
    on:click={() => {
      currSessionIndex++;
      currSessionKey = sessionsArray[currSessionIndex];
    }}
  >
    <span>Next</span>
    <span class="material-icons-round md-18 nav" style="font-size: 26px"
      >arrow_right</span
    >
  </div>
</div>
