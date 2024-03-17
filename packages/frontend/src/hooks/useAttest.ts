import { attesterAddress, schemaUID } from '@/constants'
import { getGaslessTransactionClient } from '@/services/pimlico.service'
import { Address, getContract } from 'viem'
import { useAccount, useWalletClient } from 'wagmi'
import AttesterAbi from '@/constants/Attester.abi.json'
function useAttest () {
  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()

  const makeAttest = async (name: string, value: number) => {
    console.debug('attest', name, value)
    if (!walletClient || !attesterAddress || !address) return
    const { publicClient, smartAccountClient } =
      await getGaslessTransactionClient(walletClient)
    const counterContract = getContract({
      address: attesterAddress,
      abi: AttesterAbi,
      client: {
        public: publicClient,
        wallet: smartAccountClient
      }
    })
    const tx = await counterContract.write.attest([
      schemaUID as string,
      name as string,
      value as number,
      address as Address
    ])
    console.debug(tx)
  }
  return { makeAttest }
}

export { useAttest }
