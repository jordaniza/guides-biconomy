"use client";
import { BiconomyAccountAbstractionProvider } from "@/context/SmartAccountContext";
import { ChainId } from "@biconomy/core-types";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
        <BiconomyAccountAbstractionProvider chainId={ChainId.POLYGON_MUMBAI} chainName="Polygon">
          {children}
        </BiconomyAccountAbstractionProvider>
  );
}

