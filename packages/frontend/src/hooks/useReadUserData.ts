import { registryAddress } from '@/constants'
import { useReadContracts } from 'wagmi'

function useReadUserData () {
  ;[
    {
      address: registryAddress,
      abi: 'wagmigotchiABI',
      functionName: 'getAlive',
      args:[]
    },
    {
      address: registryAddress,
      abi: '',
      functionName: 'getAlive',
      args:[]
    }
  ]
  const result = useReadContracts()
  return result
}

export { useReadUserData }
