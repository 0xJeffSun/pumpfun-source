// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = {
      id: 42161,
      name: "Arbitrum One",
      network: "arbitrum",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: {
        privy: { http: ["https://arbitrum-mainnet.rpc.privy.systems"] },
        alchemy: {
          http: ["https://arb-mainnet.g.alchemy.com/v2"],
          webSocket: ["wss://arb-mainnet.g.alchemy.com/v2"],
        },
        infura: {
          http: ["https://arbitrum-mainnet.infura.io/v3"],
          webSocket: ["wss://arbitrum-mainnet.infura.io/ws/v3"],
        },
        default: { http: ["https://arb1.arbitrum.io/rpc"] },
        public: { http: ["https://arb1.arbitrum.io/rpc"] },
      },
      blockExplorers: {
        etherscan: { name: "Arbiscan", url: "https://arbiscan.io" },
        default: { name: "Arbiscan", url: "https://arbiscan.io" },
      },
    },
    a = {
      id: 421614,
      name: "Arbitrum Sepolia",
      network: "arbitrum-sepolia",
      nativeCurrency: {
        name: "Arbitrum Sepolia Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: {
        privy: { http: ["https://arbitrum-sepolia.rpc.privy.systems"] },
        default: { http: ["https://sepolia-rollup.arbitrum.io/rpc"] },
        public: { http: ["https://sepolia-rollup.arbitrum.io/rpc"] },
      },
      blockExplorers: {
        default: {
          name: "Blockscout",
          url: "https://sepolia-explorer.arbitrum.io",
        },
      },
      testnet: !0,
    },
    r = {
      id: 43114,
      name: "Avalanche",
      network: "avalanche",
      nativeCurrency: { decimals: 18, name: "Avalanche", symbol: "AVAX" },
      rpcUrls: {
        default: { http: ["https://api.avax.network/ext/bc/C/rpc"] },
        public: { http: ["https://api.avax.network/ext/bc/C/rpc"] },
      },
      blockExplorers: {
        etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
        default: { name: "SnowTrace", url: "https://snowtrace.io" },
      },
    },
    n = {
      id: 43113,
      name: "Avalanche Fuji",
      network: "avalanche-fuji",
      nativeCurrency: { decimals: 18, name: "Avalanche Fuji", symbol: "AVAX" },
      rpcUrls: {
        default: { http: ["https://api.avax-test.network/ext/bc/C/rpc"] },
        public: { http: ["https://api.avax-test.network/ext/bc/C/rpc"] },
      },
      blockExplorers: {
        etherscan: { name: "SnowTrace", url: "https://testnet.snowtrace.io" },
        default: { name: "SnowTrace", url: "https://testnet.snowtrace.io" },
      },
      testnet: !0,
    },
    i = {
      id: 8453,
      network: "base",
      name: "Base",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: {
        privy: { http: ["https://base-mainnet.rpc.privy.systems"] },
        default: { http: ["https://mainnet.base.org"] },
        public: { http: ["https://mainnet.base.org"] },
      },
      blockExplorers: {
        etherscan: { name: "Basescan", url: "https://basescan.org" },
        default: { name: "Basescan", url: "https://basescan.org" },
      },
    },
    l = {
      id: 84532,
      network: "base-sepolia",
      name: "Base Sepolia",
      nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: {
        privy: { http: ["https://base-sepolia.rpc.privy.systems"] },
        default: { http: ["https://sepolia.base.org"] },
        public: { http: ["https://sepolia.base.org"] },
      },
      blockExplorers: {
        default: {
          name: "Blockscout",
          url: "https://base-sepolia.blockscout.com",
        },
      },
      testnet: !0,
    },
    o = {
      id: 42220,
      name: "Celo Mainnet",
      network: "celo",
      nativeCurrency: { decimals: 18, name: "CELO", symbol: "CELO" },
      rpcUrls: {
        default: { http: ["https://forno.celo.org"] },
        infura: { http: ["https://celo-mainnet.infura.io/v3"] },
        public: { http: ["https://forno.celo.org"] },
      },
      blockExplorers: {
        default: {
          name: "Celo Explorer",
          url: "https://explorer.celo.org/mainnet",
        },
        etherscan: { name: "CeloScan", url: "https://celoscan.io" },
      },
      testnet: !1,
    },
    s = {
      id: 59144,
      network: "linea-mainnet",
      name: "Linea Mainnet",
      nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: {
        default: {
          http: ["https://rpc.linea.build"],
          webSocket: ["wss://rpc.linea.build"],
        },
        public: {
          http: ["https://rpc.linea.build"],
          webSocket: ["wss://rpc.linea.build"],
        },
      },
      blockExplorers: {
        default: { name: "Etherscan", url: "https://lineascan.build" },
        etherscan: { name: "Etherscan", url: "https://lineascan.build" },
      },
      testnet: !1,
    },
    c = {
      id: 1,
      network: "homestead",
      name: "Ethereum",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: {
        privy: { http: ["https://mainnet.rpc.privy.systems"] },
        alchemy: {
          http: ["https://eth-mainnet.g.alchemy.com/v2"],
          webSocket: ["wss://eth-mainnet.g.alchemy.com/v2"],
        },
        infura: {
          http: ["https://mainnet.infura.io/v3"],
          webSocket: ["wss://mainnet.infura.io/ws/v3"],
        },
        default: { http: ["https://cloudflare-eth.com"] },
        public: { http: ["https://cloudflare-eth.com"] },
      },
      blockExplorers: {
        etherscan: { name: "Etherscan", url: "https://etherscan.io" },
        default: { name: "Etherscan", url: "https://etherscan.io" },
      },
    },
    u = {
      id: 10,
      name: "OP Mainnet",
      network: "optimism",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: {
        privy: { http: ["https://optimism-mainnet.rpc.privy.systems"] },
        alchemy: {
          http: ["https://opt-mainnet.g.alchemy.com/v2"],
          webSocket: ["wss://opt-mainnet.g.alchemy.com/v2"],
        },
        infura: {
          http: ["https://optimism-mainnet.infura.io/v3"],
          webSocket: ["wss://optimism-mainnet.infura.io/ws/v3"],
        },
        default: { http: ["https://mainnet.optimism.io"] },
        public: { http: ["https://mainnet.optimism.io"] },
      },
      blockExplorers: {
        etherscan: {
          name: "Etherscan",
          url: "https://optimistic.etherscan.io",
        },
        default: {
          name: "Optimism Explorer",
          url: "https://explorer.optimism.io",
        },
      },
    },
    d = {
      id: 0xaa37dc,
      name: "Optimism Sepolia",
      network: "optimism-sepolia",
      nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: {
        privy: { http: ["https://optimism-sepolia.rpc.privy.systems"] },
        default: { http: ["https://sepolia.optimism.io"] },
        public: { http: ["https://sepolia.optimism.io"] },
        infura: { http: ["https://optimism-sepolia.infura.io/v3"] },
      },
      blockExplorers: {
        default: {
          name: "Blockscout",
          url: "https://optimism-sepolia.blockscout.com",
        },
      },
      testnet: !0,
    },
    p = {
      id: 137,
      name: "Polygon Mainnet",
      network: "polygon",
      nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
      rpcUrls: {
        privy: { http: ["https://polygon-mainnet.rpc.privy.systems"] },
        alchemy: {
          http: ["https://polygon-mainnet.g.alchemy.com/v2"],
          webSocket: ["wss://polygon-mainnet.g.alchemy.com/v2"],
        },
        infura: {
          http: ["https://polygon-mainnet.infura.io/v3"],
          webSocket: ["wss://polygon-mainnet.infura.io/ws/v3"],
        },
        default: { http: ["https://polygon-rpc.com"] },
        public: { http: ["https://polygon-rpc.com"] },
      },
      blockExplorers: {
        etherscan: { name: "PolygonScan", url: "https://polygonscan.com" },
        default: { name: "PolygonScan", url: "https://polygonscan.com" },
      },
    },
    h = {
      id: 80002,
      name: "Polygon Amoy",
      network: "polygon-amoy",
      nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
      rpcUrls: {
        privy: { http: ["https://polygon-amoy.rpc.privy.systems"] },
        infura: {
          http: ["https://polygon-amoy.infura.io/v3"],
          webSocket: ["wss://polygon-amoy.infura.io/ws/v3"],
        },
        default: { http: ["https://rpc-amoy.polygon.technology"] },
      },
      blockExplorers: {
        default: { name: "OK LINK", url: "https://www.oklink.com/amoy" },
      },
      testnet: !0,
    },
    m = {
      id: 0xaa36a7,
      network: "sepolia",
      name: "Sepolia",
      nativeCurrency: { name: "Sepolia Ether", symbol: "SEP", decimals: 18 },
      rpcUrls: {
        privy: { http: ["https://sepolia.rpc.privy.systems"] },
        alchemy: {
          http: ["https://eth-sepolia.g.alchemy.com/v2"],
          webSocket: ["wss://eth-sepolia.g.alchemy.com/v2"],
        },
        infura: {
          http: ["https://sepolia.infura.io/v3"],
          webSocket: ["wss://sepolia.infura.io/ws/v3"],
        },
        default: { http: ["https://rpc.sepolia.org"] },
        public: { http: ["https://rpc.sepolia.org"] },
      },
      blockExplorers: {
        etherscan: { name: "Etherscan", url: "https://sepolia.etherscan.io" },
        default: { name: "Etherscan", url: "https://sepolia.etherscan.io" },
      },
      testnet: !0,
    },
    f = {
      id: 7777777,
      name: "Zora",
      network: "zora",
      nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
      rpcUrls: {
        privy: { http: ["https://zora-mainnet.rpc.privy.systems"] },
        default: {
          http: ["https://rpc.zora.energy"],
          webSocket: ["wss://rpc.zora.energy"],
        },
        public: {
          http: ["https://rpc.zora.energy"],
          webSocket: ["wss://rpc.zora.energy"],
        },
      },
      blockExplorers: {
        default: { name: "Explorer", url: "https://explorer.zora.energy" },
      },
    },
    b = [
      c,
      m,
      {
        id: 17e3,
        name: "Holesky",
        network: "holesky",
        nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
        rpcUrls: {
          default: { http: ["https://ethereum-holesky.publicnode.com"] },
          public: { http: ["https://ethereum-holesky.publicnode.com"] },
        },
        blockExplorers: {
          etherscan: { name: "EtherScan", url: "https://holesky.etherscan.io" },
          default: { name: "EtherScan", url: "https://holesky.etherscan.io" },
        },
      },
      t,
      a,
      u,
      d,
      p,
      h,
      o,
      {
        id: 44787,
        name: "Celo Alfajores Testnet",
        network: "celo-alfajores",
        nativeCurrency: { decimals: 18, name: "CELO", symbol: "CELO" },
        rpcUrls: {
          default: { http: ["https://alfajores-forno.celo-testnet.org"] },
          infura: { http: ["https://celo-alfajores.infura.io/v3"] },
          public: { http: ["https://alfajores-forno.celo-testnet.org"] },
        },
        blockExplorers: {
          default: {
            name: "Celo Explorer",
            url: "https://explorer.celo.org/alfajores",
          },
          etherscan: {
            name: "CeloScan",
            url: "https://alfajores.celoscan.io/",
          },
        },
        testnet: !0,
      },
      {
        id: 314,
        name: "Filecoin - Mainnet",
        network: "filecoin-mainnet",
        nativeCurrency: { decimals: 18, name: "filecoin", symbol: "FIL" },
        rpcUrls: {
          default: { http: ["https://api.node.glif.io/rpc/v1"] },
          public: { http: ["https://api.node.glif.io/rpc/v1"] },
        },
        blockExplorers: {
          default: { name: "Filfox", url: "https://filfox.info/en" },
          filscan: { name: "Filscan", url: "https://filscan.io" },
          filscout: { name: "Filscout", url: "https://filscout.io/en" },
          glif: { name: "Glif", url: "https://explorer.glif.io" },
        },
      },
      {
        id: 314159,
        name: "Filecoin - Calibration testnet",
        network: "filecoin-calibration",
        nativeCurrency: {
          decimals: 18,
          name: "testnet filecoin",
          symbol: "tFIL",
        },
        rpcUrls: {
          default: { http: ["https://api.calibration.node.glif.io/rpc/v1"] },
          public: { http: ["https://api.calibration.node.glif.io/rpc/v1"] },
        },
        blockExplorers: {
          default: { name: "Filscan", url: "https://calibration.filscan.io" },
        },
      },
      i,
      l,
      {
        id: 80085,
        network: "berachain-artio",
        name: "Berachain Artio",
        nativeCurrency: { name: "BERA", symbol: "BERA", decimals: 18 },
        rpcUrls: {
          default: { http: ["https://berachain-artio.rpc.privy.systems"] },
          public: { http: ["https://berachain-artio.rpc.privy.systems"] },
        },
        blockExplorers: {
          default: { name: "Beratrail", url: "https://artio.beratrail.io" },
        },
        testnet: !0,
      },
      {
        id: 56,
        network: "bsc",
        name: "Binance Smart Chain",
        nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
        rpcUrls: {
          privy: { http: ["https://bsc-mainnet.rpc.privy.systems"] },
          default: { http: ["https://56.rpc.thirdweb.com"] },
          public: { http: ["https://56.rpc.thirdweb.com"] },
        },
        blockExplorers: {
          etherscan: { name: "BscScan", url: "https://bscscan.com" },
          default: { name: "BscScan", url: "https://bscscan.com" },
        },
      },
      {
        id: 43419,
        name: "Gunz Mainnet",
        network: "gunz",
        nativeCurrency: { name: "GUN", symbol: "GUN", decimals: 18 },
        rpcUrls: {
          privy: { http: ["https://gunz-mainnet.rpc.privy.systems"] },
          default: {
            http: [
              "https://rpc.gunzchain.io/ext/bc/2M47TxWHGnhNtq6pM5zPXdATBtuqubxn5EPFgFmEawCQr9WFML/rpc",
            ],
          },
          public: {
            http: [
              "https://rpc.gunzchain.io/ext/bc/2M47TxWHGnhNtq6pM5zPXdATBtuqubxn5EPFgFmEawCQr9WFML/rpc",
            ],
          },
        },
        blockExplorers: {
          default: { name: "Gunz Explorer", url: "https://gunzscan.io" },
        },
      },
      {
        id: 13371,
        name: "Immutable zkEVM",
        network: "immutable-zkevm",
        nativeCurrency: { name: "Immutable Coin", symbol: "IMX", decimals: 18 },
        rpcUrls: {
          privy: { http: ["https://immutable-mainnet.rpc.privy.systems"] },
          default: { http: ["https://rpc.immutable.com"] },
          public: { http: ["https://rpc.immutable.com"] },
        },
        blockExplorers: {
          default: {
            name: "Immutable Explorer",
            url: "https://explorer.immutable.com",
          },
        },
      },
      {
        id: 42,
        network: "lukso",
        name: "LUKSO",
        nativeCurrency: { name: "LUKSO", symbol: "LYX", decimals: 18 },
        rpcUrls: {
          default: {
            http: ["https://rpc.mainnet.lukso.network"],
            webSocket: ["wss://ws-rpc.mainnet.lukso.network"],
          },
        },
        blockExplorers: {
          default: {
            name: "LUKSO Mainnet Explorer",
            url: "https://explorer.execution.mainnet.lukso.network",
          },
        },
      },
      s,
      {
        id: 59140,
        network: "linea-testnet",
        name: "Linea Goerli Testnet",
        nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
        rpcUrls: {
          infura: {
            http: ["https://linea-goerli.infura.io/v3"],
            webSocket: ["wss://linea-goerli.infura.io/ws/v3"],
          },
          default: {
            http: ["https://rpc.goerli.linea.build"],
            webSocket: ["wss://rpc.goerli.linea.build"],
          },
          public: {
            http: ["https://rpc.goerli.linea.build"],
            webSocket: ["wss://rpc.goerli.linea.build"],
          },
        },
        blockExplorers: {
          default: { name: "Etherscan", url: "https://goerli.lineascan.build" },
          etherscan: {
            name: "Etherscan",
            url: "https://goerli.lineascan.build",
          },
        },
        testnet: !0,
      },
      {
        id: 1088,
        name: "Metis Andromeda",
        network: "metis",
        nativeCurrency: { name: "Metis", symbol: "METIS", decimals: 18 },
        rpcUrls: {
          privy: { http: ["https://metis-mainnet.rpc.privy.systems"] },
          default: {
            http: [
              "https://andromeda.metis.io/?owner=1088",
              "https://metis-mainnet.public.blastapi.io",
            ],
          },
          public: {
            http: [
              "https://andromeda.metis.io/?owner=1088",
              "https://metis-mainnet.public.blastapi.io",
            ],
          },
        },
        blockExplorers: {
          default: { name: "Metis Explorer", url: "https://explorer.metis.io" },
        },
      },
      r,
      n,
      {
        id: 1868,
        name: "Soneium Mainnet",
        network: "soneium",
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        rpcUrls: {
          privy: { http: ["https://soneium-mainnet.rpc.privy.systems"] },
          default: { http: ["https://rpc.soneium.org"] },
          public: { http: ["https://rpc.soneium.org"] },
        },
        blockExplorers: {
          default: {
            name: "Blockscout",
            url: "https://soneium.blockscout.com",
          },
        },
      },
      {
        id: 130,
        name: "Unichain",
        network: "unichain",
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        rpcUrls: {
          privy: { http: ["https://unichain-mainnet.rpc.privy.systems"] },
          default: { http: ["https://mainnet.unichain.org"] },
          public: { http: ["https://mainnet.unichain.org"] },
        },
        blockExplorers: {
          default: { name: "Uniscan", url: "https://uniscan.xyz" },
        },
      },
      f,
      {
        id: 999,
        name: "Zora Goerli Testnet",
        network: "zora-testnet",
        nativeCurrency: { decimals: 18, name: "Zora Goerli", symbol: "ETH" },
        rpcUrls: {
          default: {
            http: ["https://testnet.rpc.zora.energy"],
            webSocket: ["wss://testnet.rpc.zora.energy"],
          },
          public: {
            http: ["https://testnet.rpc.zora.energy"],
            webSocket: ["wss://testnet.rpc.zora.energy"],
          },
        },
        blockExplorers: {
          default: {
            name: "Explorer",
            url: "https://testnet.explorer.zora.energy",
          },
        },
        testnet: !0,
      },
      {
        id: 0x3b9ac9ff,
        name: "Zora Sepolia",
        network: "zora-sepolia",
        nativeCurrency: { decimals: 18, name: "Zora Sepolia", symbol: "ETH" },
        rpcUrls: {
          default: {
            http: ["https://sepolia.rpc.zora.energy"],
            webSocket: ["wss://sepolia.rpc.zora.energy"],
          },
          public: {
            http: ["https://sepolia.rpc.zora.energy"],
            webSocket: ["wss://sepolia.rpc.zora.energy"],
          },
        },
        blockExplorers: {
          default: {
            name: "Zora Sepolia Explorer",
            url: "https://sepolia.explorer.zora.energy/",
          },
        },
        testnet: !0,
      },
      {
        id: 690,
        name: "Redstone",
        network: "redstone",
        nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
        rpcUrls: {
          default: { http: ["https://rpc.redstonechain.com"] },
          public: { http: ["https://rpc.redstonechain.com"] },
        },
        blockExplorers: {
          default: {
            name: "Blockscout",
            url: "https://explorer.redstone.xyz/",
          },
        },
      },
      {
        id: 17069,
        name: "Garnet Holesky",
        network: "garnet-holesky",
        nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
        rpcUrls: {
          default: { http: ["https://rpc.garnetchain.com"] },
          public: { http: ["https://rpc.garnetchain.com"] },
        },
        blockExplorers: {
          default: {
            name: "Blockscout",
            url: "https://explorer.garnetchain.com",
          },
        },
      },
    ],
    g = new Set(b.map((e) => e.id));
  e.s([
    "L",
    0,
    b,
    "C",
    0,
    g,
    "i",
    0,
    function (e) {
      let t = e.filter((e) => !g.has(e.id));
      return b.concat(t);
    },
    "g",
    0,
    t,
    "D",
    0,
    a,
    "M",
    0,
    r,
    "w",
    0,
    n,
    "j",
    0,
    i,
    "N",
    0,
    l,
    "$",
    0,
    o,
    "Q",
    0,
    (e) =>
      e.map((e) => {
        if (e.rpcUrls.privyWalletOverride) return e;
        let t = b.find((t) => t.id === e.id)?.rpcUrls.privy?.http[0];
        return t
          ? { ...e, rpcUrls: { ...e.rpcUrls, privy: { http: [t] } } }
          : e;
      }),
    "e",
    0,
    {
      id: 999,
      name: "HyperEVM Mainnet",
      network: "hyperevm",
      nativeCurrency: { name: "HYPE", symbol: "HYPE", decimals: 18 },
      rpcUrls: {
        privy: { http: ["https://hyperevm-mainnet.rpc.privy.systems"] },
        default: { http: ["https://rpc.hyperliquid.xyz/evm"] },
        public: { http: ["https://rpc.hyperliquid.xyz/evm"] },
      },
      blockExplorers: {
        default: { name: "HyperEVM Mainnet Explorer", url: "" },
      },
    },
    "R",
    0,
    s,
    "q",
    0,
    c,
    "k",
    0,
    {
      id: 143,
      name: "Monad",
      network: "monad",
      nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
      rpcUrls: {
        privy: { http: ["https://monad-mainnet.rpc.privy.systems"] },
        default: { http: ["https://rpc.monad.xyz"] },
        public: { http: ["https://rpc.monad.xyz"] },
      },
      blockExplorers: {
        default: {
          name: "Monadscan",
          url: "https://mainnet-beta.monvision.io",
        },
      },
    },
    "S",
    0,
    u,
    "O",
    0,
    d,
    "y",
    0,
    p,
    "z",
    0,
    h,
    "P",
    0,
    m,
    "l",
    0,
    f,
  ]);
};
