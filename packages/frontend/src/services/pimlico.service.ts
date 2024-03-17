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
import { baseSepolia } from 'viem/chains'
import { createPublicClient, http, getContract } from 'viem'
import { counterAddress, pimlicoApiKey } from '@/constants'

const publicClient = createPublicClient({
  transport: http('https://rpc.ankr.com/base_sepolia')
})

const apiKey = pimlicoApiKey
const paymasterUrl = `https://api.pimlico.io/v2/base-sepolia/rpc?apikey=${apiKey}`
const paymasterClient = createPimlicoPaymasterClient({
  transport: http(paymasterUrl),
  entryPoint: ENTRYPOINT_ADDRESS_V06
})
const bundlerUrl = `https://api.pimlico.io/v1/base-sepolia/rpc?apikey=${apiKey}`
const pimlicoBundlerClient = createPimlicoBundlerClient({
  transport: http(bundlerUrl),
  entryPoint: ENTRYPOINT_ADDRESS_V06
})

export async function getGaslessTransactionClient (walletClient: any) {
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
    chain: baseSepolia, // or whatever chain you are using
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    bundlerTransport: http(
      `https://api.pimlico.io/v1/base-sepolia/rpc?apikey=${apiKey}`
    ),
    middleware: {
      gasPrice: async () =>
        (await pimlicoBundlerClient.getUserOperationGasPrice()).fast,
      sponsorUserOperation: paymasterClient.sponsorUserOperation
    }
  })
  return { smartAccountClient, publicClient }

}
