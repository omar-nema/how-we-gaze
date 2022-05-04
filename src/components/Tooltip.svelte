<script>
  import { tooltipText, tooltipX, tooltipY } from '../stores/pageState';
</script>

<div class="tooltip" style="top: {$tooltipY + 20}px; left: {$tooltipX}px">
  {$tooltipText}
</div>

<style>
  .tooltip {
    position: fixed;
    background: black;
    color: white;
    max-width: 250px;
    padding: 8px 15px;
    z-index: 100000;
    pointer-events: none;
    font-size: 12px;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
    transform: translateX(-50%);
  }
</style>
