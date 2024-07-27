<script>
  import closeIcon from '../../icons/close.js'
</script>

<style>
  .close-button {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
    border-radius: 2rem;
    cursor: pointer;
    color: var(--onboard-close-button-color, inherit);
    border: 0.09375rem solid var(--onboard-close-button-color);
  }

  .close-button:hover::before {
    opacity: 0.2;
  }
  .close-button:hover .svg-box {
    opacity: 1;
  }

  .close-button::before {
    content: '';
    position: absolute;
    height: inherit;
    width: inherit;
    opacity: 0.1;
    background: currentColor;
    transition: 300ms ease-in-out opacity;
  }

   .svg-box {
    position: absolute;
    height: 1.2rem;
    width: 1.2rem;
    opacity: 0.6;
    transition: 300ms ease-in-out opacity;
  }
</style>

<div class="close-button">
  <div class="svg-box">
    {@html closeIcon}
  </div>
</div>
