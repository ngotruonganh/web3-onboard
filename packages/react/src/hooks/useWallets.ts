import type { WalletState } from 'compass-defi-web3-core'

import { useAppState } from './useAppState.js'

export const useWallets = (): WalletState[] => useAppState('wallets')
