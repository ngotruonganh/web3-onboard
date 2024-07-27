import type { Theme } from 'compass-defi-web3-core'
import { useWeb3Onboard } from '../context.js'

export const useUpdateTheme = (): ((
  update: Theme
) => void) => useWeb3Onboard().state.actions.updateTheme
