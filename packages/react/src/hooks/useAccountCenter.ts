import type { AccountCenter } from 'compass-defi-web3-core'
import { useWeb3Onboard } from '../context.js'

export const useAccountCenter = (): ((
  update: AccountCenter | Partial<AccountCenter>
) => void) => useWeb3Onboard().state.actions.updateAccountCenter
