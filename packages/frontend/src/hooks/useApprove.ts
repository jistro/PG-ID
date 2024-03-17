import { USDTAddress, swapAddress } from '@/constants'
import { getGaslessTransactionClient } from '@/services/pimlico.service'
import { getContract } from 'viem'
import { useWalletClient } from 'wagmi'
import SwapAbi from '@/constants/Swap.abi.json'
import { parseUnits } from 'viem'
import USDTAbi from '@/constants/USDT.abi.json'

function useApprove () {
  const { data: walletClient } = useWalletClient()

  const approve = async (value: string) => {
    if (!walletClient) return
    const { publicClient, smartAccountClient } =
      await getGaslessTransactionClient(walletClient)
    const swapContract = getContract({
      address: USDTAddress,
      abi: USDTAbi,
      client: {
        public: publicClient,
        wallet: smartAccountClient
      }
    })
    const tx = await swapContract.write.approve([
      swapAddress,
      parseUnits(value, 6)
    ])
    console.debug(tx)
  }
  return { approve }
}

export { useApprove }
