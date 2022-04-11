<script>
  import { slide, fade } from 'svelte/transition';

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
</script>

<main id="modal" transition:fadeSlide={{ duration: 300 }}>
  <slot />
</main>

<style>
  main {
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: linear-gradient(
        160deg,
        rgb(250 253 255) 0%,
        rgb(203 241 250) 50%,
        rgb(240, 240, 240) 100%
      )
      fixed;
    background-repeat: no-repeat;
    background-attachment: local;
  }

  :global(.cont-header) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  :global(.material-icons-round) {
    font-size: 40px;
    color: black;
  }
  :global(.btn) {
    transition: all 0.2s ease-in-out;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  :global(.btn:hover) {
    background: rgba(0, 0, 0, 0.05);
  }
</style>
