import type { WagmiConfig } from 'compass-defi-web3-core'
import { useAppState } from './useAppState.js'

export const useWagmiConfig = (): WagmiConfig | null =>
  useAppState('wagmiConfig')
