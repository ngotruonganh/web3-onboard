<script lang="ts">
	import type { WalletState } from '../../types.js'
	import { shareReplay, startWith } from 'rxjs'
	import { state } from '../../store/index.js'
	 import { copyWalletAddress, shortenAddress } from "../../utils";
	import { copyIcon, explorerIcon } from "../../icons";
	 import disconnect from "../../disconnect";
	 import { connectWallet$ } from "../../streams";

	export let selectedWallet: WalletState

	 function close() {
		 connectWallet$.next({ inProgress: false })
	 }

  const appMetadata$ = state
    .select('appMetadata')
    .pipe(startWith(state.get().appMetadata), shareReplay(1))


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

</style>

<div class="container">
    <div class="connecting-container">
        <div class="flex">
            <span>{shortenAddress(selectedWallet.accounts[0].address)}</span>
        </div>
        <div class="detail">
            <div class="item"
                on:click|stopPropagation={() => {
                    copyWalletAddress(selectedWallet.accounts[0].address)
            }}>
                {@html copyIcon}
                <span>Copy address</span>
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
