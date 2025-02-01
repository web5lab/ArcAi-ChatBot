import { createWeb3Modal } from '@web3modal/wagmi/react';
import { walletConnectProvider } from '@web3modal/wagmi';
import { createConfig, configureChains } from 'wagmi';
import { mainnet, arbitrum } from 'wagmi/chains';
import { parseEther } from 'viem';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';
import type { WalletState, WalletHandlers } from './types';

export class WalletBot  {
  private static instance: WalletBot | null = null;
 walletState: WalletState = {
    address: null,
    isConnecting: false,
    isConnected: false,
    error: null
  };
 web3Modal: any;
  private config: any;
  private projectId: string;
  handlers: WalletHandlers | undefined;

  static getInstance(projectId?: string): WalletBot {
    if (!WalletBot.instance) {
      WalletBot.instance = new WalletBot(projectId);
    }
    return WalletBot.instance;
  }

  private constructor(projectId?: string) {
  
    this.projectId = projectId || 'YOUR_PROJECT_ID';
    this.initializeWeb3();

   
  }

  private initializeWeb3() {
    const { chains, publicClient } = configureChains(
      [mainnet, arbitrum],
      [walletConnectProvider({ projectId: this.projectId }), publicProvider()]
    );

    const metadata = {
      name: 'Simple Chat Bot',
      description: 'Chat bot with wallet integration',
      url: window.location.origin,
      icons: [`${window.location.origin}/icon.png`]
    };

    this.config = createConfig({
      autoConnect: true,
      connectors: [
        new InjectedConnector({ chains }),
        new WalletConnectConnector({
          chains,
          options: {
            projectId: this.projectId,
            metadata,
          },
        }),
      ],
      publicClient,
    });

    this.web3Modal = createWeb3Modal({ 
      wagmiConfig: this.config, 
      projectId: this.projectId, 
      chains 
    });
  }

 

  public setWalletHandlers(handlers: WalletHandlers) {
    this.handlers = handlers;
  }

  public updateWalletState(state: Partial<WalletState>) {
    this.walletState = { ...this.walletState, ...state };
  }
}