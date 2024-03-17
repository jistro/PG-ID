import { registryAddress } from '@/constants'
import { getGaslessTransactionClient } from '@/services/pimlico.service'
import { getContract } from 'viem'
import { useAccount, useWalletClient } from 'wagmi'
import RegistryAbi from '@/constants/Registry.abi.json'

function useMakePGAvatar () {
  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()

  const createPGAvatar = async (data: {
    body: number
    glasses: number
    background: number
  }) => {
    if (!walletClient || !address) return
    const { publicClient, smartAccountClient } =
      await getGaslessTransactionClient(walletClient)
    const registryContract = getContract({
      address: registryAddress,
      abi: RegistryAbi,
      client: {
        public: publicClient,
        wallet: smartAccountClient
      }
    })
    await registryContract.write.customProfileData([0, data.background])
    await registryContract.write.customProfileData([1, data.glasses])
    await registryContract.write.customProfileData([2, data.body])
    await registryContract.write.customProfileData([3, 0])
  }
  return { createPGAvatar }
}

export { useMakePGAvatar }
