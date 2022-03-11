import { readable, writable } from 'svelte/store';
import { Provider, Signer, Web3Provider } from 'zksync-web3';

export type Wallet = {
	connected: boolean;
	address: string;
	signer: Signer;
	provider: Provider;
};

export const wallet = writable<Wallet>({
	connected: false
} as Wallet);

export async function connectMetaMask(): Promise<Wallet> {
	const { ethereum } = window as any;
	if (ethereum !== undefined && ethereum.isMetaMask) {
		try {
			await ethereum.request({ method: 'eth_requestAccounts' });
			if (ethereum.networkVersion == 280) {
				const provider = new Provider('https://zksync2-testnet.zksync.dev');
				const signer = new Web3Provider(ethereum).getSigner();
				const address = await signer.getAddress();
				console.log('Finished connecting');
				return {
					connected: true,
					address,
					provider,
					signer
				};
			} else {
				throw new Error('Please use the zksync Goerli network, version 280');
			}
		} catch {
			throw new Error('Unable to connect to MetaMask');
		}
	} else {
		throw new Error('Unable to detect MetaMask');
	}
}
