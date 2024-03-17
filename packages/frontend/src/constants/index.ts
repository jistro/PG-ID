import { Address } from 'viem'

export const counterAddress = '0xA9902B1913Fb2894ea03aF0140Dbfa7920F0B557'
export const pimlicoApiKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY
export const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
export const registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS
export const schemaUID = process.env.NEXT_PUBLIC_SCHEMA_ID
export const network = process.env.NEXT_PUBLIC_NETWORK
export const attesterAddress = process.env
  .NEXT_PUBLIC_ATTESTER_ADDRESS as Address
