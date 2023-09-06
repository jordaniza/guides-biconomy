import { BiconomyAccountAbstractor } from "@/components/aa";
import { ParticleUserInfo } from "@/components/aa/Particle";
import { BiconomySmartAccount } from "@biconomy/account";
import { IBundler } from "@biconomy/bundler";
import { IPaymaster } from "@biconomy/paymaster";
import { providers } from "ethers";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const defaults = {
  smartAccount: undefined,
  loading: false,
  error: undefined,
  provider: undefined,
  bundler: undefined,
  connect: async () => {
    throw new Error("connect not implemented");
  },
  disconnect: async () => {
    throw new Error("disconnect not implemented");
  },
  address: undefined,
  paymaster: undefined,
  userInfo: undefined,
  isConnected: false,
};

const BiconomyAAContext = createContext<BiconomySmartAccountContextProps>(
  defaults,
);

interface SmartAccountProviderProps {
  children: ReactNode;
  chainId: number;
  chainName: string;
}

interface BiconomySmartAccountContextProps {
  smartAccount: BiconomySmartAccount | undefined;
  loading: boolean;
  error: string | undefined;
  provider: providers.Web3Provider | undefined;
  bundler: IBundler | undefined;
  paymaster: IPaymaster | undefined;
  connect: () => Promise<void>;
  userInfo?: any | undefined;
  address: string | undefined;
  disconnect: () => Promise<void>;
  isConnected: boolean;
}

export function BiconomyAccountAbstractionProvider(
  { children, chainId, chainName }: SmartAccountProviderProps,
) {
  const [smartAccount, setSmartAccount] = useState<
    BiconomySmartAccount | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<providers.Web3Provider | undefined>(
    undefined,
  );
  const [bundler, setBundler] = useState<IBundler | undefined>(undefined);
  const [paymaster, setPaymaster] = useState<IPaymaster | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<ParticleUserInfo | null | undefined>(
    undefined,
  );

  const accountAbstractor = useMemo(
    () => new BiconomyAccountAbstractor(chainId, chainName),
    [chainId, chainName],
  );

  const connect = useCallback(() => {
    async function getAccount() {
      if (accountAbstractor) {
        try {
          setLoading(true);

          const scw = await accountAbstractor.getSCW();
          if (!scw) return;

          const userInfo = await accountAbstractor.getUser();
          const provider = accountAbstractor.getProvider();
          const bundler = accountAbstractor.getBundler();
          const paymaster = accountAbstractor.getPaymaster();
          const address = await scw?.getSmartAccountAddress();

          setSmartAccount(scw);
          setProvider(provider);
          console.log("PROVIDER NETWORK", provider?.network, provider);
          setBundler(bundler);
          setPaymaster(paymaster);
          setAddress(address);
          setUserInfo(userInfo);
        } catch (error) {
          console.error(error);
          setError("Error fetching account details");
        } finally {
          setLoading(false);
        }
      }
    }
    return getAccount();
  }, [accountAbstractor]);

  const disconnect = useCallback(() => {
    async function trySignOut() {
      await accountAbstractor.signOut();
      setSmartAccount(undefined);
      setProvider(undefined);
      setBundler(undefined);
      setPaymaster(undefined);
      setAddress(undefined);
      setUserInfo(undefined);
    }
    return trySignOut();
  }, [accountAbstractor]);

  const isConnected = useMemo(() => !!smartAccount, [smartAccount]);

  const value = {
    smartAccount,
    address,
    loading,
    error,
    provider,
    bundler,
    paymaster,
    connect,
    disconnect,
    userInfo,
    isConnected,
  };

  return (
    <BiconomyAAContext.Provider value={value}>
      {children}
    </BiconomyAAContext.Provider>
  );
}

export function useBiconomyAccountAbstraction(): BiconomySmartAccountContextProps {
  const context = useContext(BiconomyAAContext);
  if (context === undefined) {
    throw new Error(
      "useSmartAccount must be used within a SmartAccountProvider",
    );
  }
  return context;
}
