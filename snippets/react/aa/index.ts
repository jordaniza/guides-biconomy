// export the 3rd party SDKs behind a common interface
import { providers } from "ethers";
import * as biconomy from "./Biconomy";
import * as particle from "./Particle";
import { IBundler } from "@biconomy/bundler";
import { IPaymaster } from "@biconomy/paymaster";
import { BiconomySmartAccount } from "@biconomy/account";
import { ParticleAuthModule } from "@biconomy/particle-auth";

export interface AccountAbstractor<
  Provider = providers.Web3Provider,
  Bundler = any,
  Paymaster = any,
  SCW = any,
  User = any
> {
  getProvider(network: string): Provider;
  getBundler(): Bundler;
  getPaymaster(): Paymaster;
  getSCW(): Promise<SCW>;
  getUser(): Promise<User>;
  signOut(): Promise<void>;
}

export class BiconomyAccountAbstractor
  implements
    AccountAbstractor<
      providers.Web3Provider | undefined,
      IBundler,
      IPaymaster,
      BiconomySmartAccount | undefined,
      particle.ParticleUserInfo | null | undefined
    >
{
  public chainId: number;
  public chainName: string;
  constructor(chainId: number, chainName: string) {
    this.chainId = chainId;
    this.chainName = chainName;
  }

  private _getAuth(): ParticleAuthModule.ParticleNetwork {
    return particle.initParticle(this.chainId, this.chainName);
  }

  public getProvider(): providers.Web3Provider | undefined {
    try {
      return particle.getProvider(this._getAuth());
    } catch (error) {
      console.error("Error Fetching The Biconomy Smart Account:", error);
    }
  }

  public getBundler() {
    return biconomy.getBundler(this.chainId);
  }

  public getPaymaster() {
    return biconomy.getPaymaster(this.chainId);
  }

  public async getUser(): Promise<particle.ParticleUserInfo | null | undefined> {
    try {
      return particle.getUserInfo(this._getAuth());
    } catch (error) {
      console.error("Error Fetching The Biconomy Smart Account:", error);
    }
  }

  public async getSCW(): Promise<BiconomySmartAccount | undefined> {
    try {
      const provider = this.getProvider();
      if (!provider) throw new Error("Provider is not initialized");
      // this will sign the user in and return the user info
      const bundler = this.getBundler();
      const paymaster = this.getPaymaster();
      const smartAccount = await biconomy.getSmartAccount({
        chainId: this.chainId,
        provider,
        bundler,
        paymaster,
      });
      if (!smartAccount) throw new Error("Smart Account is not initialized");
      return smartAccount;
    } catch (error) {
      console.error("Error Fetching The Biconomy Smart Account:", error);
    }
  }

  public async signOut(): Promise<void> {
    try {
      await particle.signOut(this._getAuth());
    } catch (error) {
      console.error("Problem with Logout", error);
    }
  }
}
