# Some Snippets I used working with Biconomy

SDK versions are listed in the [dependencies](./dependencies) file

### Particle Chain names

Ethers and particle will connect to homestead by default. To connect to other chains, you need to pass the chainId and chainName to the particle provider.

The next folder gives an example of passing both, but you could equally use a lookup table defined in [`particleChainNames`](./snippets/particle/particleChainNames.ts)

### React Context hook with NextJS

Inspired by Web3React, [this component](./snippets/next) defines a reusable context hook that caches app-wide variables in a useCallback hook.

Use it:

1. Wrap the app in the context provider (see providers.tsx), passing the chainId and chainName

- See the https://docs.particle.network/developers/node-service/evm-chains-api for chainName config

2. Import the hook and call 'connect' to connect to the Particle Network
3. You can reuse the components across the application: state is managed in React Context

## Example Usage

```tsx
export default function Menu() {
  const { address, connect, disconnect } = useBiconomyAccountAbstraction();

  async function login() {
    try {
      await connect();
    } catch (error) {
      console.log("Attempted Login Error: ", error);
    }
  }

  // attempt to login on page load
  useEffect(() => {
    login();
  }, []);

  return (
    <div className="flex items-center justify-between p-4 backdrop-blur">
      {/* Button to Open Mobile Nav */}
      <div className="flex items-center">
        <nav>{/* Nav Items */}</nav>
      </div>
      <h1>{APP_NAME}</h1>
      {/* Profile Avatar / Login Button */}
      <div className="flex items-center">
        {/* Replace the condition with actual logic to detect if the user is logged in */}
        {address ? (
          {
            /* something if the user is logged in */
          }
        ) : (
          <button className="rounded-full" onClick={login}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}
```

d
