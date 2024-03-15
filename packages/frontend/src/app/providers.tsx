'use client';
import {
  DynamicContextProvider,
  DynamicWidget,
  EvmNetwork,
} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { createConfig, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { sepolia, celoAlfajores } from 'viem/chains';

export function Providers({ children }: { children: React.ReactNode }) {
  const config = createConfig({
    chains: [sepolia],
    multiInjectedProviderDiscovery: false,
    transports: {
      [sepolia.id]: http(),
    },
  });

  const queryClient = new QueryClient();

  const evmNetworks = [
    {
      blockExplorerUrls: celoAlfajores.blockExplorers,
      chainId: celoAlfajores.id,
      chainName: celoAlfajores.name,
      iconUrls: ['https://cryptologos.cc/logos/celo-celo-logo.svg?v=029'],
      name: celoAlfajores.name,
      nativeCurrency: celoAlfajores.nativeCurrency,
      networkId: celoAlfajores.id,
      rpcUrls: [celoAlfajores.rpcUrls.default as unknown as string],
      vanityName: 'Alfajores',
    },
  ];
  return (
    <DynamicContextProvider
      settings={{
        environmentId: '425efe30-9927-45e7-8df6-87767fef70ef',
        walletConnectors: [EthereumWalletConnectors],
        overrides: {
          //@ts-expect-error unsupported
          evmNetworks,
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}

export default Providers;
