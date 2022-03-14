import { Wallet, tokens } from '$lib/wallet';
import { BigNumber, ethers } from 'ethers';
import { Provider, Signer, Web3Provider } from 'zksync-web3';
import { Token } from 'zksync-web3/build/types';

/**
 * Connect a wallet with MetaMask
 * @returns Wallet
 */
export async function connectMetaMask(): Promise<Wallet> {
	const { ethereum } = window as any;
	if (ethereum !== undefined && ethereum.isMetaMask) {
		try {
			await ethereum.request({ method: 'eth_requestAccounts' });
			if (ethereum.networkVersion == 280) {
				const provider = new Provider('https://zksync2-testnet.zksync.dev');
				const web3Provider = new Web3Provider(ethereum);
				const signer = web3Provider.getSigner();
				const address = await signer.getAddress();
				console.log('Finished connecting');

				const currentBlock = await web3Provider.getBlockNumber();
				console.log('web3Block', currentBlock);
				const provBlock = await provider.getBlockNumber();
				console.log('providerBlock', provBlock);

				const wallet: Wallet = {
					connected: true,
					address,
					signer,
					provider,
					web3Provider
				};

				console.log('Testing Balances');
				for (const token of tokens) {
					await fetchBalanceAsync(wallet, token);
					console.log('');
				}

				return wallet;
			}
		} catch (e) {
			console.error(e);
			throw new Error('Unable to connect to MetaMask');
		}
	} else {
		throw new Error('Unable to detect MetaMask');
	}
}

/**
 * Fetch a tokens balance
 * @param wallet - The wallet to fetch a balance for
 * @param token - The token to fetch a balance for
 *
 * @returns Number of tokens, adjusted to the tokens decimal requirements
 */
export async function fetchBalanceAsync(wallet: Wallet, token: Token): Promise<string> {
	try {
		console.log('Fetching', token.symbol, token.address);
		const balance = await wallet.signer.getBalance(token.address);
		const web3Balance = await wallet.web3Provider.getBalance(
			wallet.address,
			undefined,
			token.address
		);
		const provBalance = await wallet.provider.getBalance(wallet.address, undefined, token.address);
		console.log(
			'Signer: ',
			'raw result',
			balance.toString(),
			'formatted',
			ethers.utils.formatUnits(balance, token.decimals)
		);
		console.log(
			'Web3Provider:',
			'raw result',
			web3Balance.toString(),
			'formatted',
			ethers.utils.formatUnits(web3Balance, token.decimals)
		);
		console.log(
			'Provider (hardcode rpc):',
			'raw result',
			provBalance.toString(),
			'formatted',
			ethers.utils.formatUnits(provBalance, token.decimals)
		);
		return ethers.utils.formatUnits(provBalance, token.decimals);
	} catch {
		console.log(`Unable to fetch balance for ${token.address}`);
		return '0';
	}
}
