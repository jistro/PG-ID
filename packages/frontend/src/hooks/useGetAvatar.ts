import { registryAddress } from "@/constants"
import { useAccount, useReadContract, useReadContracts } from "wagmi"
import RegistryAbi from "@/constants/Registry.abi.json"
function useGetAvatar() {
    const {address} = useAccount()

    const queries = [
        {
            address: registryAddress,
            abi: RegistryAbi,
            functionName: "boddyOfProfile",
            args: [address, 0]
        } as const,
        {
            address: registryAddress,
            abi: RegistryAbi,
            functionName: "boddyOfProfile",
            args: [address, 1]
        } as const,
        {
            address: registryAddress,
            abi: RegistryAbi,
            functionName: "boddyOfProfile",
            args: [address, 2]
        } as const,
        {
            address: registryAddress,
            abi: RegistryAbi,
            functionName: "boddyOfProfile",
            args: [address, 3]
        } as const
      ]
    const data = useReadContracts({
    //@ts-expect-error
        contracts:queries})

    return {
        isLoading: data.isLoading,
        data: {
            body: Number(data.data?.[0]?.result ?? 0),
            glasses: Number(data.data?.[1]?.result ?? 0),
            background: Number(data.data?.[2]?.result ?? 0),
            head: Number(data.data?.[3]?.result ?? 0)
        }
    }
 
}

export { useGetAvatar}