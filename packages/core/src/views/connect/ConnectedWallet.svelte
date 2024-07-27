<script lang="ts">
	import type { WalletState } from '../../types.js'
	import { shareReplay, startWith } from 'rxjs'
	import { state } from '../../store/index.js'
	import { copyWalletAddress, shortenAddress } from "../../utils";
	import { copyIcon, explorerIcon } from "../../icons";
	import disconnect from "../../disconnect";
	import { connectWallet$ } from "../../streams";

	export let selectedWallet: WalletState
	let showTooltip = false;
	let tooltipTimeout: number | undefined;

	function close() {
		connectWallet$.next({ inProgress: false })
	}

	const appMetadata$ = state
		.select('appMetadata')
		.pipe(startWith(state.get().appMetadata), shareReplay(1))

	function handleCopy() {
		copyWalletAddress(selectedWallet.accounts[0].address);
		showTooltip = true;
		if (tooltipTimeout) {
			clearTimeout(tooltipTimeout);
		}
		tooltipTimeout = window.setTimeout(() => {
			showTooltip = false;
		}, 2000);
	}
</script>

<style>
  .container {
    padding: var(--onboard-spacing-4, var(--spacing-4));
    color: var(
      --onboard-connect-accent-text-color,
      var(--onboard-gray-700, var(--gray-700))
    );
  }

  .connecting-container {
    padding: 0.625rem;
    border-radius: var(--onboard-border-radius-1, var(--border-radius-1));
    border: 1px solid var(--onboard-success-600, var(--success-600));
    width: 100%;
  }

  .detail {
      display: flex;
      justify-content: space-between;
  }

  .item {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      color: #FFFFFF80;
      cursor: pointer;
      position: relative;
  }

  .disconnect-field {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
  }

  .connected {
      color: #F1F1F1;
      font-weight: 500;
      font-size: 0.875rem;
  }

  .disconnect-wallet {
      padding: 0.5rem 1rem;
      border-radius: 0.625rem;
      border: 1px solid #CA3131;
      background: #FFE4E4;
  }

  .tooltip {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
</style>

<div class="container">
    <div class="connecting-container">
        <div class="flex">
            <span>{shortenAddress(selectedWallet.accounts[0].address)}</span>
        </div>
        <div class="detail">
            <div class="item"
                on:click|stopPropagation={handleCopy}>
                {@html copyIcon}
                <span>Copy address</span>
                {#if showTooltip}
                    <div class="tooltip">Copied!</div>
                {/if}
            </div>
            <div class="item">
                {@html explorerIcon}
                <span>View on explorer</span>
            </div>
        </div>
    </div>
    <div class="disconnect-field">
        <span class="connected">Connected with {selectedWallet.label}</span>
        <button class="disconnect-wallet"
                on:click|stopPropagation={() => {
            disconnect({ label: selectedWallet.label }).then(
                close
            )
          }}>
            Disconnect
        </button>
    </div>
</div>
