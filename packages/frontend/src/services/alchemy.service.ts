import { alchemyApiKey } from '@/constants'
import { Alchemy, AssetTransfersCategory, Network } from 'alchemy-sdk'
import { Address } from 'viem'

const config = {
  apiKey: alchemyApiKey,
  network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(config)
async function getUserData (user: Address) {
  const RPGF = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    fromAddress: '0x0000000000000000000000000000000000000000',
    toAddress: user,
    excludeZeroValue: true,
    category: [
      AssetTransfersCategory.INTERNAL,
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.ERC20
    ]
  })
  const Donations = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    fromAddress: user,
    toAddress: '0x0000000000000000000000000000000000000000',
    excludeZeroValue: true,
    category: [
      AssetTransfersCategory.INTERNAL,
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.ERC20
    ]
  })
}
