import { createConfig, http, cookieStorage, createStorage } from 'wagmi';
import { polygonAmoy, flowTestnet } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [polygonAmoy, flowTestnet],
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'Petify DApp',
        iconUrl: '',
        logging: { developerMode: true, sdk: true },
      },
    }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [polygonAmoy.id]: http(),
    [flowTestnet.id]: http(),
  },
});
