// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(357500),
    s = e.i(672878);
  let i = (0, s.f)({
    id: 42161,
    name: "Arbitrum One",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    blockTime: 250,
    rpcUrls: { default: { http: ["https://arb1.arbitrum.io/rpc"] } },
    blockExplorers: {
      default: {
        name: "Arbiscan",
        url: "https://arbiscan.io",
        apiUrl: "https://api.arbiscan.io/api",
      },
    },
    contracts: {
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 7654707,
      },
    },
  });
  var r = e.i(382772),
    n = e.i(694810),
    a = e.i(787821),
    o = e.i(767924);
  let l = {
    block: (0, n.B)({
      format: (e) => ({
        transactions: e.transactions?.map((e) => {
          if ("string" == typeof e) return e;
          let t = (0, a.F)(e);
          return (
            "0x7e" === t.typeHex &&
              ((t.isSystemTx = e.isSystemTx),
              (t.mint = e.mint ? (0, r.K)(e.mint) : void 0),
              (t.sourceHash = e.sourceHash),
              (t.type = "deposit")),
            t
          );
        }),
        stateRoot: e.stateRoot,
      }),
    }),
    transaction: (0, a.K)({
      format(e) {
        let t = {};
        return (
          "0x7e" === e.type &&
            ((t.isSystemTx = e.isSystemTx),
            (t.mint = e.mint ? (0, r.K)(e.mint) : void 0),
            (t.sourceHash = e.sourceHash),
            (t.type = "deposit")),
          t
        );
      },
    }),
    transactionReceipt: (0, o.l)({
      format: (e) => ({
        l1GasPrice: e.l1GasPrice ? (0, r.K)(e.l1GasPrice) : null,
        l1GasUsed: e.l1GasUsed ? (0, r.K)(e.l1GasUsed) : null,
        l1Fee: e.l1Fee ? (0, r.K)(e.l1Fee) : null,
        l1FeeScalar: e.l1FeeScalar ? Number(e.l1FeeScalar) : null,
      }),
    }),
  };
  var c = e.i(296006),
    d = e.i(4911),
    u = e.i(990149),
    h = e.i(19648),
    f = e.i(711753),
    p = e.i(161892);
  let m = {
      blockTime: 2e3,
      contracts: {
        gasPriceOracle: {
          address: "0x420000000000000000000000000000000000000F",
        },
        l1Block: { address: "0x4200000000000000000000000000000000000015" },
        l2CrossDomainMessenger: {
          address: "0x4200000000000000000000000000000000000007",
        },
        l2Erc721Bridge: {
          address: "0x4200000000000000000000000000000000000014",
        },
        l2StandardBridge: {
          address: "0x4200000000000000000000000000000000000010",
        },
        l2ToL1MessagePasser: {
          address: "0x4200000000000000000000000000000000000016",
        },
      },
      formatters: l,
      serializers: {
        transaction: function (e, t) {
          var s;
          return "deposit" === (s = e).type || void 0 !== s.sourceHash
            ? (function (e) {
                !(function (e) {
                  let { from: t, to: s } = e;
                  if (t && !(0, d.f)(t)) throw new c.f({ address: t });
                  if (s && !(0, d.f)(s)) throw new c.f({ address: s });
                })(e);
                let {
                    sourceHash: t,
                    data: s,
                    from: i,
                    gas: r,
                    isSystemTx: n,
                    mint: a,
                    to: o,
                    value: l,
                  } = e,
                  p = [
                    t,
                    i,
                    o ?? "0x",
                    a ? (0, h.g)(a) : "0x",
                    l ? (0, h.g)(l) : "0x",
                    r ? (0, h.g)(r) : "0x",
                    n ? "0x1" : "0x",
                    s ?? "0x",
                  ];
                return (0, u.s)(["0x7e", (0, f.f)(p)]);
              })(e)
            : (0, p.k)(e, t);
        },
      },
    },
    b = (0, s.f)({
      ...m,
      id: 8453,
      name: "Base",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: { default: { http: ["https://mainnet.base.org"] } },
      blockExplorers: {
        default: {
          name: "Basescan",
          url: "https://basescan.org",
          apiUrl: "https://api.basescan.org/api",
        },
      },
      contracts: {
        ...m.contracts,
        disputeGameFactory: {
          1: { address: "0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e" },
        },
        l2OutputOracle: {
          1: { address: "0x56315b90c40730925ec5485cf004d835058518A0" },
        },
        multicall3: {
          address: "0xca11bde05977b3631167028862be2a173976ca11",
          blockCreated: 5022,
        },
        portal: {
          1: {
            address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
            blockCreated: 0x10ac19f,
          },
        },
        l1StandardBridge: {
          1: {
            address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
            blockCreated: 0x10ac19f,
          },
        },
      },
      sourceId: 1,
    });
  ({
    ...b,
    experimental_preconfirmationTime: 200,
    rpcUrls: { default: { http: ["https://mainnet-preconf.base.org"] } },
  });
  let g = (0, s.f)({
      id: 56,
      name: "BNB Smart Chain",
      blockTime: 750,
      nativeCurrency: { decimals: 18, name: "BNB", symbol: "BNB" },
      rpcUrls: { default: { http: ["https://56.rpc.thirdweb.com"] } },
      blockExplorers: {
        default: {
          name: "BscScan",
          url: "https://bscscan.com",
          apiUrl: "https://api.bscscan.com/api",
        },
      },
      contracts: {
        multicall3: {
          address: "0xca11bde05977b3631167028862be2a173976ca11",
          blockCreated: 0xf2f12c,
        },
      },
    }),
    x = (0, s.f)({
      id: 999,
      name: "HyperEVM",
      nativeCurrency: { name: "HYPE", symbol: "HYPE", decimals: 18 },
      blockExplorers: {
        default: { name: "HyperEVMScan", url: "https://hyperevmscan.io" },
      },
      rpcUrls: { default: { http: ["https://rpc.hyperliquid.xyz/evm"] } },
      testnet: !1,
    }),
    y = (0, s.f)({
      ...m,
      id: 57073,
      name: "Ink",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: {
        default: {
          http: [
            "https://rpc-gel.inkonchain.com",
            "https://rpc-qnd.inkonchain.com",
          ],
          webSocket: [
            "wss://rpc-gel.inkonchain.com",
            "wss://rpc-qnd.inkonchain.com",
          ],
        },
      },
      blockExplorers: {
        default: {
          name: "Blockscout",
          url: "https://explorer.inkonchain.com",
          apiUrl: "https://explorer.inkonchain.com/api/v2",
        },
      },
      contracts: {
        multicall3: {
          address: "0xcA11bde05977b3631167028862bE2a173976CA11",
          blockCreated: 0,
        },
        ...m.contracts,
        disputeGameFactory: {
          1: { address: "0x10d7b35078d3baabb96dd45a9143b94be65b12cd" },
        },
        portal: {
          1: { address: "0x5d66c1782664115999c47c9fa5cd031f495d3e4f" },
        },
        l1StandardBridge: {
          1: { address: "0x88ff1e5b602916615391f55854588efcbb7663f0" },
        },
      },
      testnet: !1,
      sourceId: 1,
    }),
    v = (0, s.f)({
      id: 1,
      name: "Ethereum",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      blockTime: 12e3,
      rpcUrls: { default: { http: ["https://eth.merkle.io"] } },
      blockExplorers: {
        default: {
          name: "Etherscan",
          url: "https://etherscan.io",
          apiUrl: "https://api.etherscan.io/api",
        },
      },
      contracts: {
        ensUniversalResolver: {
          address: "0xeeeeeeee14d718c2b47d9923deab1335e144eeee",
          blockCreated: 0x16041f6,
        },
        multicall3: {
          address: "0xca11bde05977b3631167028862be2a173976ca11",
          blockCreated: 0xdb04c1,
        },
      },
    }),
    w = (0, s.f)({
      id: 143,
      name: "Monad",
      blockTime: 400,
      nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
      rpcUrls: {
        default: {
          http: ["https://rpc.monad.xyz", "https://rpc1.monad.xyz"],
          webSocket: ["wss://rpc.monad.xyz", "wss://rpc1.monad.xyz"],
        },
      },
      blockExplorers: {
        default: { name: "MonadVision", url: "https://monadvision.com" },
        monadscan: {
          name: "Monadscan",
          url: "https://monadscan.com",
          apiUrl: "https://api.monadscan.com/api",
        },
      },
      testnet: !1,
      contracts: {
        multicall3: {
          address: "0xcA11bde05977b3631167028862bE2a173976CA11",
          blockCreated: 9248132,
        },
      },
    }),
    P = (0, s.f)({
      id: 137,
      name: "Polygon",
      blockTime: 2e3,
      nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
      rpcUrls: { default: { http: ["https://polygon-rpc.com"] } },
      blockExplorers: {
        default: {
          name: "PolygonScan",
          url: "https://polygonscan.com",
          apiUrl: "https://api.etherscan.io/v2/api",
        },
      },
      contracts: {
        multicall3: {
          address: "0xca11bde05977b3631167028862be2a173976ca11",
          blockCreated: 0x18938b0,
        },
      },
    }),
    k = (0, s.f)({
      id: 196,
      name: "X Layer Mainnet",
      nativeCurrency: { decimals: 18, name: "OKB", symbol: "OKB" },
      rpcUrls: { default: { http: ["https://rpc.xlayer.tech"] } },
      blockExplorers: {
        default: {
          name: "OKLink",
          url: "https://www.oklink.com/xlayer",
          apiUrl: "https://www.oklink.com/api/v5/explorer/xlayer/api",
        },
      },
      contracts: {
        multicall3: {
          address: "0xcA11bde05977b3631167028862bE2a173976CA11",
          blockCreated: 47416,
        },
      },
    }),
    B = (0, t.getChainBySlug)("robinhood");
  if (null === B.evmChainId || null === B.explorerUrl)
    throw Error("Robinhood registry entry lost its EVM id or explorer");
  let E = {
      id: B.evmChainId,
      name: B.displayName,
      nativeCurrency: B.nativeCurrency,
      rpcUrls: {
        default: { http: ["https://rpc.mainnet.chain.robinhood.com"] },
      },
      blockExplorers: { default: { name: "Blockscout", url: B.explorerUrl } },
    },
    U = (0, t.getChainBySlug)("arc");
  if (null === U.evmChainId || null === U.explorerUrl)
    throw Error("Arc registry entry lost its EVM id or explorer");
  let T = {
      id: U.evmChainId,
      name: U.displayName,
      nativeCurrency: U.nativeCurrency,
      rpcUrls: { default: { http: ["https://rpc.arc-scan.org"] } },
      blockExplorers: { default: { name: "Blockscout", url: U.explorerUrl } },
    },
    C = (0, t.getChainBySlug)("megaeth");
  if (null === C.evmChainId || null === C.explorerUrl)
    throw Error("MegaETH registry entry lost its EVM id or explorer");
  let N = {
      id: C.evmChainId,
      name: C.displayName,
      nativeCurrency: C.nativeCurrency,
      rpcUrls: { default: { http: ["https://mainnet.megaeth.com/rpc"] } },
      blockExplorers: { default: { name: "Etherscan", url: C.explorerUrl } },
    },
    I = [v, b, g, w, E, x, y, T],
    $ = [
      { chain: N, isExposed: (e) => e.megaeth },
      { chain: P, isExposed: (e) => !0 === e.polygon },
      { chain: k, isExposed: (e) => !0 === e.xlayer },
      { chain: i, isExposed: (e) => !0 === e.arbitrum },
    ],
    G = Array.from({ length: 1 << $.length }, (e, t) =>
      0 === t
        ? I
        : [
            ...I,
            ...$.filter((e, s) => (t & (1 << s)) != 0).map(({ chain: e }) => e),
          ],
    ),
    F = (e) =>
      $.reduce((t, { isExposed: s }, i) => (s(e) ? t | (1 << i) : t), 0);
  e.s(["s", 0, I, "P", 0, G, "B", 0, F, "Z", 0, (e) => G[F(e)]], 946985);
};
