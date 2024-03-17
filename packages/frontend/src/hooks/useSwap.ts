import { swapAddress } from '@/constants'
import { getGaslessTransactionClient } from '@/services/pimlico.service'
import { getContract } from 'viem'
import { useWalletClient } from 'wagmi'
import SwapAbi from '@/constants/Swap.abi.json'
import { parseUnits } from 'viem'
function useSwap () {
  const { data: walletClient } = useWalletClient()

  const swap = async (value: string) => {
    if (!walletClient) return
    const { publicClient, smartAccountClient } =
      await getGaslessTransactionClient(walletClient)
    const swapContract = getContract({
      address: swapAddress,
      abi: SwapAbi,
      client: {
        public: publicClient,
        wallet: smartAccountClient
      }
    })
    const tx = await swapContract.write.swapInPool([parseUnits(value, 6)])
    console.debug(tx)
  }
  return { swap }
}

export { useSwap }
