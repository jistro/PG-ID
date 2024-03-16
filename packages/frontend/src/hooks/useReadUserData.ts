import { registryAddress } from '@/constants'
import { useReadContracts } from 'wagmi'
import Registry from '@/constants/Registry.abi.json'
import { Address, zeroAddress } from 'viem'

function useReadUserData (user: Address) {
  const queries = [
    {
      address: registryAddress,
      abi: Registry,
      functionName: 'getUsername',
      args: [user ?? zeroAddress]
    } as const,
    {
      address: registryAddress,
      abi: Registry,
      functionName: 'getPointsOfUser',
      args: [user ?? zeroAddress]
    } as const,
    {
        address: registryAddress,
        abi: Registry,
        functionName: 'getLevelOfUser',
        args: [user ?? zeroAddress]
      } as const
  ]
  const result = useReadContracts({
    //@ts-expect-error
    contracts: queries
  })
  return result
}

export { useReadUserData }
