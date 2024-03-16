import {
  ENTRYPOINT_ADDRESS_V06,
  createSmartAccountClient,
  walletClientToSmartAccountSigner
} from 'permissionless'
import {
  createPimlicoPaymasterClient,
  createPimlicoBundlerClient
} from 'permissionless/clients/pimlico'
import { signerToSafeSmartAccount } from 'permissionless/accounts'
import { celo } from 'viem/chains'
import { createPublicClient, http, getContract } from 'viem'
import { counterAddress, pimlicoApiKey } from '@/constants'
import CounterABI from '@/constants/Counter.abi.json'

const publicClient = createPublicClient({
  transport: http('https://rpc.ankr.com/celo')
})

const apiKey = pimlicoApiKey
const paymasterUrl = `https://api.pimlico.io/v2/celo/rpc?apikey=${apiKey}`
const paymasterClient = createPimlicoPaymasterClient({
  transport: http(paymasterUrl),
  entryPoint: ENTRYPOINT_ADDRESS_V06
})
const bundlerUrl = `https://api.pimlico.io/v1/celo/rpc?apikey=${apiKey}`
const pimlicoBundlerClient = createPimlicoBundlerClient({
  transport: http(bundlerUrl),
  entryPoint: ENTRYPOINT_ADDRESS_V06
})

export async function makeGaslessTransaction (walletClient: any) {
  console.debug(walletClient)
if (!walletClient) return
  const customSigner = walletClientToSmartAccountSigner(walletClient)
  const simpleSmartAccountClient = await signerToSafeSmartAccount(
    publicClient,
    {
      entryPoint: ENTRYPOINT_ADDRESS_V06,
      signer: customSigner,
      safeVersion: '1.4.1'
    }
  )

  const smartAccountClient = createSmartAccountClient({
    account: simpleSmartAccountClient,
    chain: celo, // or whatever chain you are using
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    bundlerTransport: http(
      `https://api.pimlico.io/v1/celo/rpc?apikey=${apiKey}`
    ),
    middleware: {
      gasPrice: async () =>
        (await pimlicoBundlerClient.getUserOperationGasPrice()).fast, 
      sponsorUserOperation: paymasterClient.sponsorUserOperation 
    }
  })

  const counterContract = getContract({
    address: counterAddress,
    abi: CounterABI,
    client: {
      public: publicClient,
      wallet: smartAccountClient
    }
  })
  const tx = await counterContract.write.increment()
  console.debug(tx)
}
