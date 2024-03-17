import { registryAddress } from '@/constants'
import { useAccount, useReadContracts } from 'wagmi'
import Registry from '@/constants/Registry.abi.json'
import { Address, zeroAddress } from 'viem'

function useReadUserData () {
  const { address: user } = useAccount()
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
  return {
    isLoading: result.isLoading,
    data: {
      username: result.data?.[0]?.result,
      points: result.data?.[1]?.result,
      level: result.data?.[2]?.result
    }
  }
}

export { useReadUserData }
