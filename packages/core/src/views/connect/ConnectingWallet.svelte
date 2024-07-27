<script lang="ts">
  import { _ } from 'svelte-i18n'
  import type { WalletState, i18n } from '../../types.js'

  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import questionIcon from '../../icons/question.js'
  import en from '../../i18n/en.json'
  import { state } from '../../store/index.js'
  import { shareReplay, startWith } from 'rxjs'

  export let connectWallet: () => Promise<void>
  export let selectedWallet: WalletState
  export let deselectWallet: (label: string) => void
  export let setStep: (update: keyof i18n['connect']) => void
  export let connectionRejected: boolean
  export let previousConnectionRequest: boolean

  const appMetadata$ = state
    .select('appMetadata')
    .pipe(startWith(state.get().appMetadata), shareReplay(1))
</script>

<style>
  .container {
    padding: var(--onboard-spacing-4, var(--spacing-4));
  }

  .connecting-container {
    width: 100%;
    padding: 10px;
    transition: background-color 100ms ease-in-out,
      border-color 100ms ease-in-out;
    border-radius: 24px;
    background: var(--onboard-primary-100, var(--primary-100));
    border: 1px solid;
    border-color: var(--onboard-primary-300, var(--primary-300));
    color: var(--onboard-gray-600, var(--gray-600));
  }

  .connecting-container.warning {
    background: var(--onboard-warning-100, var(--warning-100));
    border-color: var(--onboard-warning-400, var(--warning-400));
  }

  .text {
      font-size: 24px;
    line-height: 24px;
      font-weight: 400;
      color: #F1F1F1;
    margin-bottom: var(--onboard-spacing-5, var(--spacing-5));
      text-align: center;
  }

  .text.text-rejected {
    line-height: 24px;
    margin-bottom: 0;
  }

  .subtext {
      text-align: center;
    font-size: 1rem;
    line-height: 16px;
      margin: 1rem 0;
  }

  .rejected-cta {
    color: var(--onboard-primary-500, var(--primary-500));
  }

  .onboard-button-primary {
    bottom: var(--onboard-spacing-3, var(--spacing-3));
  }

  .ml {
    margin-left: var(--onboard-spacing-4, var(--spacing-4));
  }

  .loading {
   margin: 2rem 0;
  }

  .loader {
      width: 15px;
      aspect-ratio: 1;
      border-radius: 50%;
      animation: l5 2s infinite linear;
      text-align: center;
      margin: 3rem 0;
  }

  @keyframes l5 {
      0% {
          box-shadow: 20px 0 #212121, -20px 0 #D9D9D9;
          background: #212121
      }
      50% {
          box-shadow: 20px 0 #212121, -20px 0 #212121;
          background: #D9D9D9
      }
      100% {
          box-shadow: 20px 0 #D9D9D9, -20px 0 #212121;
          background: #212121
      }
  }

  @media all and (max-width: 520px) {
    .connecting-container {
      border-radius: var(--onboard-border-radius-4, var(--border-radius-4));
    }

    .container {
      padding-bottom: 0;
    }

    .wallet-badges {
      display: none;
    }

    .connecting-wallet-info {
      margin: 0;
    }

    .onboard-button-primary {
      display: none;
    }
  }
</style>

<div class="container flex flex-column items-center">
  <div
    class="flex justify-between items-center"
    class:warning={connectionRejected || previousConnectionRequest}
  >
    <div class="flex">
      <div class="flex flex-column justify-center connecting-wallet-info">
          <div class="loading flex justify-center">
            <div class="loader"></div>
          </div>
        <div class="text" class:text-rejected={connectionRejected}>
          {$_(
            `connect.connectingWallet.${
              connectionRejected ? 'rejectedText' : 'mainText'
            }`,
            {
              default: connectionRejected
                ? en.connect.connectingWallet.rejectedText
                : en.connect.connectingWallet.mainText,
              values: { wallet: selectedWallet.label }
            }
          )}
        </div>
        {#if connectionRejected}
          <div class="rejected-cta pointer subtext" on:click={connectWallet}>
            {$_('connect.connectingWallet.rejectedCTA', {
              default: en.connect.connectingWallet.rejectedCTA,
              values: { wallet: selectedWallet.label }
            })}
          </div>
        {:else}
          <div class="subtext">
            {$_(
              `connect.connectingWallet.${
                previousConnectionRequest ? 'previousConnection' : 'paragraph'
              }`,
              {
                default: en.connect.connectingWallet.paragraph,
                values: { wallet: selectedWallet.label }
              }
            )}
          </div>
        {/if}
      </div>
    </div>
  </div>

<!--  <button-->
<!--    on:click={() => {-->
<!--      deselectWallet(selectedWallet.label)-->
<!--      setStep('selectingWallet')-->
<!--    }}-->
<!--    class="onboard-button-primary absolute"-->
<!--    >{$_('connect.connectingWallet.primaryButton', {-->
<!--      default: en.connect.connectingWallet.primaryButton-->
<!--    })}</button-->
<!--  >-->
</div>
