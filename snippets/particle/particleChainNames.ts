// particle network requires chainName config in addition to chainId
// biconomy only supports a subset of these
// this file defines the intersection of both and allows for a quick lookup
// as more chains are added by biconomy, they can be added here

import type { ChainId } from "@biconomy/core-types";

export type ParticleChainNames = {
  [chainId in ChainId]: string;
};

// Particle chainNames mapped to biconomy supported chainIds
export const particleChainNames: Partial<ParticleChainNames> = {
  1: "ethereum",
  5: "ethereum",
  56: "bsc",
  97: "bsc",
  137: "polygon",
  80001: "polygon",
  43114: "avalanche",
  43113: "avalanche",
  42161: "arbitrum",
  42170: "arbitrum",
  421613: "arbitrum",
  1284: "moonbeam",
  10: "optimism",
  420: "optimism",
  1101: "polygonzkevm",
  1442: "polygonzkevm",
  8453: "base",
  84531: "base",
  59140: "linea",
};
