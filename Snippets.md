# Some Snippets I used working with Biconomy

### React Context hook

Inspired by Web3React, this component defines a reusable context hook that caches app-wide variables in a useCallback hook.

Use it:

1. Wrap the app in the context provider (see providers.tsx), passing the chainId and chainName

- See the https://docs.particle.network/developers/node-service/evm-chains-api for chainName config

2. Import the hook and call 'connect' to connect to the Particle Network
3. You can reuse the components across the application: state is managed in React Context

## Example Usage

```tsx
const { address, connect, disconnect, provider } = useBiconomyAccountAbstraction();

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
          <Button variant="ghost" className="rounded-full" onClick={login}>
            <ProfileIcon className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
```
