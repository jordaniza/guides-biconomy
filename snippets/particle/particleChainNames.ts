// particle network requires chainName config in addition to chainId
// biconomy only supports a subset of these
// this file defines the intersection of both and allows for a quick lookup
// as more chains are added by biconomy, they can be added here

import type { ChainId } from '@biconomy/core-types';

export type ParticleChainNames = {
	[chainId in ChainId]: string;
};

// Particle chainNames mapped to biconomy supported chainIds
export const particleChainNames: Partial<ParticleChainNames> = {
	1: 'ethereum_mainnet',
	5: 'ethereum_goerli',
	56: 'bsc_mainnet',
	97: 'bsc_testnet',
	137: 'polygon_mainnet',
	80001: 'polygon_testnet',
	43114: 'avalanche_mainnet',
	43113: 'avalanche_testnet',
	42161: 'arbitrum_one',
	42170: 'arbitrum_nova',
	421613: 'arbitrum_goerli',
	1284: 'moonbeam',
	10: 'optimism_mainnet',
	420: 'optimism_testnet',
	1101: 'polygonzkevm_mainnet',
	1442: 'polygonzkevm_testnet',
	8453: 'base_mainnet',
	84531: 'base_goerli',
	59140: 'linea_goerli'
};
