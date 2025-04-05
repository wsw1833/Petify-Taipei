require('dotenv').config();
require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-verify');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.24',
  networks: {
    polygonAmoy: {
      url: 'https://rpc-amoy.polygon.technology/',
      chainId: 80002,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGONSCAN_API_KEY,
    },
    customChains: [
      {
        network: 'polygonAmoy',
        chainId: 80002,
        urls: {
          apiURL: 'https://api-amoy.polygonscan.com/api', // Polygon Amoy explorer API
          browserURL: 'https://amoy.polygonscan.com', // Polygon Amoy explorer
        },
      },
      // Add other custom chains if needed
    ],
  },
  sourcify: {
    enabled: true,
  },
};
