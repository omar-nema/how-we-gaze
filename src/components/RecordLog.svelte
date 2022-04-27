<script>
  import {
    selectedImage,
    tooltipText,
    tooltipShow,
    pageState,
  } from '../stores/pageState';
  import {
    sessionID,
    gazerRecordingArt,
    stateIndex,
    testMode,
    loadingInd,
    sessionName,
    gazeReactions,
  } from '../stores/gazerState';
  import Tooltip from '../components/Tooltip.svelte';
  import { updateTooltip } from '../utils/tooltipUtils';
  import { fade } from 'svelte/transition';
  import {
    dbGet,
    dbWrite,
    postTest,
    appendData,
    uploadBlob,
  } from '../utils/firebaseUtils.js';

  let reaction = {};
  let reactions = [];
  let reactionId = 1;
  let userText;

  //emo reaction stuff
  let hoverX, hoverY, hoverOn;
  function emptyReaction() {
    reaction = {
      id: reactionId,
      xPct: null,
      yPct: null,
      emoji: [],
      text: null,
    };
    (hoverX = 30000), (hoverY = 40000);
    userText = '';
  }
  emptyReaction();
  //getting pin position instead of mouse cursor
  let domImgHolder, imgBox, imgRect, domImg;
  let overlay = false,
    overlayState = 'emoji',
    overlayX,
    overlayY;
  let submitMode;

  $: {
    if (domImgHolder) {
      imgBox = domImgHolder.getBoundingClientRect();
    }
  }

  let emojiList = [
    '🙂',
    '😁',
    '🥰',
    '😇',
    '🤪',
    '😬',
    '😔',
    '😴',
    '🤔',
    '🤯',
    '🧐',
    '🙁',
    '😯',
    '😡',
    '😈',
    '👽',
    '💜',
    '💯',
    '💥',
    '👀',
    '🌏',
  ];
  //https://unicode.org/emoji/charts/full-emoji-list.html

  function showPin(e) {
    if (!overlay) {
      hoverX = e.clientX - imgBox.left;
      hoverY = e.layerY;
    }
  }
  function helperConvertPctToPixel(dim, pct) {
    if (dim == 'x') {
      return imgRect.left + imgRect.width * pct - imgBox.left;
    } else if (dim == 'y') {
      return imgRect.height * pct;
    }
  }
  function addPin(e) {
    submitMode = 'add';
    imgRect = domImg.getBoundingClientRect();
    reaction.xPct = (e.clientX - imgRect.left) / imgRect.width;
    reaction.yPct = e.layerY / imgRect.height;
    overlayX = helperConvertPctToPixel('x', reaction.xPct);
    overlayY = helperConvertPctToPixel('y', reaction.yPct);
    overlay = true;
  }
  function cancelReaction() {
    emptyReaction();
    overlay = false;
  }
  function editReaction(e, selectedReaction) {
    console.log('edit called');
    submitMode = 'edit';
    if (selectedReaction.text) {
      overlayState = 'text';
    } else {
      overlayState = 'emoji';
    }
    reaction = selectedReaction;
    userText = selectedReaction.text;
    overlayX = helperConvertPctToPixel('x', selectedReaction.xPct);
    overlayY = helperConvertPctToPixel('y', selectedReaction.yPct);
    overlay = true;
  }
  function submitReaction() {
    if (overlayState == 'text') {
      reaction.emoji = [];
      reaction.text = userText;
    } else {
      reaction.text = null;
    }
    if (submitMode == 'add') {
      //const reactionWrite = Object.assign({}, reaction); //array copy
      reactions = [...reactions, reaction];
      reactionId++;
    }
    emptyReaction();
    overlay = false;
  }
  function deleteReaction() {
    reactions = reactions.filter((d) => d !== reaction);
    emptyReaction();
    overlay = false;
  }

  $: {
    $gazeReactions = reactions;
  }

  async function writeSessionToArtwork() {
    let res = await dbGet('works/' + $selectedImage.key);
    if (!res) {
      await dbWrite('works/' + $selectedImage.key, $selectedImage);
    }
    return await dbWrite(
      'works/' + $selectedImage.key + '/sessionData/' + $sessionID,
      {
        name: $sessionName,
      }
    );
  }
  async function storeSessionData() {
    await dbWrite('sessionData/' + $sessionID, $gazerRecordingArt);
    return await dbWrite('sessionData/' + $sessionID, $gazerRecordingArt);
  }
  if ($testMode == 0) {
    storeSessionData();
    writeSessionToArtwork();
  }
</script>

<p>
  We're almost done here! As a last step, please <strong
    >share how viewing this artwork made you feel</strong
  >. Click on any place in the image to add an emoji or text reaction! Add as
  many as you like.
</p>

{#if $tooltipShow}
  <div transition:fade={{ duration: 100 }}>
    <Tooltip />
  </div>
{/if}

<div class="img-holder" bind:this={domImgHolder}>
  <img
    bind:this={domImg}
    src={$selectedImage.url}
    on:click={(e) => addPin(e)}
    on:mousemove={(e) => {
      showPin(e);
      hoverOn = true;
    }}
    on:mouseleave={() => {
      if (overlay == false) {
        hoverOn = false;
      }
    }}
  />
  {#each reactions as reaction}
    <div
      on:click={(e) => {
        editReaction(e, reaction);
      }}
      class="reaction-pin"
      transition:fade={{ duration: 300 }}
      on:mouseover={(e) => {
        hoverOn = false;
        updateTooltip(e.x, e.y, 'Edit or delete reaction');
      }}
      on:mousemove={(e) => {
        updateTooltip(e.x, e.y);
      }}
      on:mouseleave={(e) => {
        updateTooltip();
      }}
      style="left: {helperConvertPctToPixel(
        'x',
        reaction.xPct
      )}px; top: {helperConvertPctToPixel('y', reaction.yPct)}px"
    >
      <div class="reaction-pin-inner">
        <span
          class="material-icons-round md-18 nav"
          style="font-size: 20px; color: white">edit_location</span
        >
      </div>
    </div>
  {/each}
  <div
    class="hoverEffect"
    style="left: {hoverX}px; top: {hoverY}px"
    class:show={hoverOn}
  >
    <span
      class="material-icons-round md-18 nav"
      style="font-size: 20px; color: black">add_location</span
    >
  </div>

  {#if overlay}
    <div
      class="overlay"
      style="left: {overlayX}px; top: {overlayY}px"
      transition:fade={{ duration: 150 }}
    >
      <div class="overlay-header">
        <p style="font-weight:600; font-size: 16px">
          {#if submitMode == 'edit'}
            Edit Reaction
          {:else}
            Add Reaction
          {/if}
        </p>
        <div class="emoji-mode">
          <p
            class="clickable"
            class:selected={overlayState == 'emoji'}
            on:click={() => (overlayState = 'emoji')}
          >
            Emoji
          </p>
          <p
            class="clickable"
            class:selected={overlayState == 'text'}
            on:click={() => (overlayState = 'text')}
          >
            Text
          </p>
        </div>
      </div>
      <div class="overlay-body">
        <textarea
          id="story"
          name="story"
          placeholder="Enter your thoughts below"
          class:hidden={overlayState == 'emoji'}
          bind:value={userText}
        />
        <div class="emoji-holder" class:hidden={overlayState == 'text'}>
          {#each emojiList as emoji}
            <div
              class="emoji"
              class:selected={reaction.emoji.includes(emoji)}
              on:click={(e) => {
                if (reaction.emoji.includes(emoji)) {
                  reaction.emoji = reaction.emoji.filter((d) => d !== emoji);
                  e.target.classList.remove('selected');
                } else {
                  reaction.emoji.push(emoji);
                  e.target.classList.add('selected');
                }
              }}
            >
              {emoji}
            </div>
          {/each}
        </div>
      </div>
      <div class="overlay-footer">
        {#if submitMode == 'edit'}
          <p class="clickable action delete" on:click={deleteReaction}>
            Delete
          </p>
        {/if}

        <p class="clickable action cancel btn-light" on:click={cancelReaction}>
          Cancel
        </p>
        <p class="clickable action submit" on:click={submitReaction}>
          {#if submitMode == 'edit'}
            Submit Edit
          {:else}
            Add Reaction
          {/if}
        </p>
      </div>
    </div>
  {/if}
</div>
<div class="reaction-count">{reactions.length} reactions added</div>

<style>
  .img-holder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 100px);
    position: relative;
    flex-direction: column;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    /* cursor: none; */
    z-index: 1;
    cursor: pointer;
  }
  .reaction-count {
    text-align: center;
    margin: auto;
    padding-top: 10px;
    color: gray;
  }

  .overlay {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%) translateY(25px);
    width: 400px;
    background: #e1eef1e6;
    border-radius: 5px;
    box-shadow: var(--box-shadow-med);
    padding: 0 20px;
    font-size: 14px;
    transition: all 0.15s ease-in-out;
    z-index: 2;
  }
  .overlay-header,
  .overlay-footer {
    display: flex;
    justify-content: space-between;
  }
  .overlay-footer .action {
    text-align: center;
    font-weight: 500;
    border-radius: 5px;
    padding: 10px 0;
  }
  .delete {
    background: #ffe3e3;
    color: #fe9b9b;
    flex-grow: 1;
    margin-right: 15px;
  }
  .overlay-body {
    margin: 10px 0;
  }
  .overlay-footer .cancel {
    flex-grow: 1;
    margin-right: 15px;
  }
  .overlay-footer .submit {
    background: var(--color-accent);
    color: white;
    flex-grow: 4;
  }

  .emoji-mode {
    display: flex;
    align-items: center;
  }
  .emoji-mode p {
    font-weight: 500;
    padding-bottom: 5px;
    margin: 0 15px;
    font-size: 14px;
    border-bottom: 1px solid transparent;
    transition: all 0.15s linear;
  }
  .emoji-mode p:hover {
    color: var(--color-accent);
  }
  .emoji-mode p.selected {
    color: var(--color-accent);
    border-bottom: 1.5px solid var(--color-accent);
  }
  textarea {
    width: 100%;
    height: 80px;
    border: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin: 0;
    font-weight: 500;
  }
  textarea:focus {
    outline: none !important;
  }
  .hoverEffect {
    position: absolute;
    transform: translateX(-50%) translateY(-50%);
    z-index: 3;
    pointer-events: none;
    filter: drop-shadow(rgba(0, 0, 0, 0.2) 1px 1px 6px);
    opacity: 0;
    background: rgb(255 255 255 / 76%);
    padding: 5px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hoverEffect.show {
    opacity: 1;
  }

  .emoji-holder {
    display: flex;
    font-size: 18px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .emoji {
    margin: 0 4px;
    background: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    border: 2px solid #e0dcdc;
    transition: border-color 0.15s linear, box-shadow 0.15s linear;
    cursor: pointer;
  }
  .emoji:hover {
    border: 2px solid #2196f394;
  }
  :global(.emoji.selected) {
    border: 2px solid var(--color-accent) !important;
    box-shadow: 1px 1px 3px 0 rgb(0 0 0 / 20%);
    background: #f7f7f7 !important;
  }
  .hidden,
  .emoji-holder.hidden {
    display: none;
  }
</style>
