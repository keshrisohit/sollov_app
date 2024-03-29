import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    getLedgerWallet,
    getMathWallet,
    getPhantomWallet,
    getSolflareWallet,
    getSolletWallet,
    getSolongWallet,
    getTorusWallet,
} from '@solana/wallet-adapter-wallets';
import {
    WalletDialogProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-material-ui';
import { clusterApiUrl } from '@solana/web3.js';


export const Wallet: FC = () => {
    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you want to instantiate here will be compiled into your application
    const wallets = useMemo(() => [
        getPhantomWallet()
    ], []);

    // Set to 'devnet' | 'testnet' | 'mainnet-beta' or provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl('devnet'), []);
    console.log("here")
    return (
   
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletDialogProvider>
                    <WalletMultiButton/>
                    <WalletDisconnectButton/>
                   
                </WalletDialogProvider>
            </WalletProvider>
        </ConnectionProvider>
      
    );
};

export default Wallet
