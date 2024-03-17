import { registryAddress } from '@/constants'
import { getGaslessTransactionClient } from '@/services/pimlico.service'
import { getContract } from 'viem'
import { useAccount, useWalletClient } from 'wagmi'
import RegistryAbi from '@/constants/Registry.abi.json'

function useMakePGAvatar () {
  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()

  const creatPGAvatar = async (username: string) => {
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
    const tx = await registryContract.write.safeMint([
      address as string,
      username
    ])
    console.debug(tx)
  }
  return { creatPGAvatar }
}

export { useMakePGAvatar }
