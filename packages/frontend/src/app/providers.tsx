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
import { baseSepolia } from 'viem/chains';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

export function Providers({ children }: { children: React.ReactNode }) {
  const config = createConfig({
    chains: [baseSepolia],
    multiInjectedProviderDiscovery: false,
    transports: {
      [baseSepolia.id]: http(),
    },
  });

  const queryClient = new QueryClient();
  const client = new ApolloClient({
    uri: 'https://sepolia.easscan.org/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <DynamicContextProvider
        settings={{
          environmentId: '425efe30-9927-45e7-8df6-87767fef70ef',
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </ApolloProvider>
  );
}

export default Providers;
