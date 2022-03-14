import { readable, writable } from 'svelte/store';
import { Provider, Signer, Web3Provider } from 'zksync-web3';
import { Token } from 'zksync-web3/build/types';

export type Wallet = {
	connected: boolean;
	address: string;
	signer: Signer;
	provider: Provider;
	web3Provider: Web3Provider;
};

export const wallet = writable<Wallet>({
	connected: false
} as Wallet);

// TODO: There really should be a better way to fetch tokens with zksync
//       If not, add wrapper to deal with ERC20 contracts for token details
export const tokens: Token[] = [
	{
		address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
		decimals: 18,
		name: 'ETH',
		symbol: 'ETH'
	},
	{
		address: '0xd35cceead182dcee0f148ebac9447da2c4d449c4',
		decimals: 6,
		name: 'USD Coin (goerli)',
		symbol: 'USDC'
	},
	{
		address: '0xCA063A2AB07491eE991dCecb456D1265f842b568',
		decimals: 8,
		name: 'Wrapped Bitcoin',
		symbol: 'wBTC'
	},
	{
		address: '0x63bfb2118771bd0da7A6936667A7BB705A06c1bA',
		decimals: 18,
		name: 'Chainlink',
		symbol: 'LINK'
	},
	{
		address: '0x5C221E77624690fff6dd741493D735a17716c26B',
		decimals: 18,
		name: 'DAI',
		symbol: 'DAI'
	}
];
