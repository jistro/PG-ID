import { alchemyApiKey } from '@/constants'
import {
  Alchemy,
  AssetTransfersCategory,
  AssetTransfersResponse,
  Network
} from 'alchemy-sdk'
import { Address } from 'viem'

const config = {
  apiKey: alchemyApiKey,
  network: Network.BASE_SEPOLIA
}

const alchemy = new Alchemy(config)

function calculateAccumulatedPoints (
  transactions: AssetTransfersResponse
): number {
  let totalValue = 0

  transactions.transfers.forEach(transaction => {
    if (transaction.rawContract.value) {
      const decimalValue = parseInt(transaction.rawContract.value, 16)
      totalValue += decimalValue
    }
  })

  const formattedTotalValue = totalValue / 1e6 // Asumiendo 6 decimales para ERC20

  // Calcular puntos basados en el total acumulado
  if (formattedTotalValue >= 1 && formattedTotalValue < 100) {
    return 10
  } else if (formattedTotalValue >= 100 && formattedTotalValue < 500) {
    return 25
  } else if (formattedTotalValue >= 500) {
    return 50
  }

  return 0 // En caso de que el valor no caiga en ninguno de los rangos
}
export async function getUserData (user: Address) {
  const RPGF = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    fromAddress: '0x1726cf86DA996BC4B2F393E713f6F8ef83f2e4f6',
    toAddress: user,
    excludeZeroValue: true,
    category: [AssetTransfersCategory.ERC20]
  })
  const Donations = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    fromAddress: user,
    toAddress: '0x1726cf86DA996BC4B2F393E713f6F8ef83f2e4f6',
    excludeZeroValue: true,
    category: [AssetTransfersCategory.ERC20]
  })
  return {
    RPGF: calculateAccumulatedPoints(RPGF),
    Donations: calculateAccumulatedPoints(Donations)
  }
}
