import { alchemyApiKey } from '@/constants'
import { Alchemy, AssetTransfersCategory, Network } from 'alchemy-sdk'
import { Address } from 'viem'

const config = {
  apiKey: alchemyApiKey,
  network: Network.ARB_MAINNET
}

const alchemy = new Alchemy(config)
export async function getUserData (user: Address) {
  const RPGF = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    fromAddress: '0x017FF2643E1A6d500A54e2c15f8186C87795CbBe',
    toAddress: user,
    excludeZeroValue: true,
    category: [
      AssetTransfersCategory.ERC20
    ]
  })
  const Donations = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    fromAddress: user,
    toAddress: '0x5E15DBf75d3819Dd9DA31Fc159Ce5bc5f3751AB0',
    excludeZeroValue: true,
    category: [
      AssetTransfersCategory.ERC20
    ]
  })
  console.debug(RPGF, user)
  return { RPGF, Donations }
}

