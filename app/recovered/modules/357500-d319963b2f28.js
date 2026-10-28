// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, a, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    (n.PLATFORM_SETS =
      n.PLATFORM_SET_NAMES =
      n.PROGRAM_SETS =
      n.PROGRAM_SET_NAMES =
      n.PLATFORMS =
      n.PLATFORM_SLUGS =
      n.PROGRAMS =
      n.PROGRAM_SLUGS =
      n.PROGRAM_KINDS =
      n.WALLET_SETS =
      n.WALLET_SET_NAMES =
      n.TOKEN_SETS =
      n.TOKEN_SET_NAMES =
      n.CHAIN_SETS =
      n.CHAIN_SET_NAMES =
      n.UnknownChainTokenError =
      n.UnknownChainError =
      n.CHAINS =
      n.CHAIN_SLUGS =
        void 0),
    (n.findChainBySlug = c),
    (n.findChainByCaip2 = u),
    (n.findChainByEvmChainId = h),
    (n.findChainByCodexNetworkId = m),
    (n.findChainByRelaySlug = p),
    (n.findChain = b),
    (n.getChain = function (e) {
      return y(b(e), e);
    }),
    (n.getChainBySlug = function (e) {
      return y(c(e), e);
    }),
    (n.getChainByCaip2 = function (e) {
      return y(u(e), e);
    }),
    (n.getChainByEvmChainId = function (e) {
      return y(h(e), e);
    }),
    (n.getChainByCodexNetworkId = function (e) {
      return y(m(e), e);
    }),
    (n.getChainByRelaySlug = function (e) {
      return y(p(e), e);
    }),
    (n.quoteTokens = function (e) {
      return e.tokens.filter((e) => e.quote);
    }),
    (n.stablecoins = function (e) {
      return e.tokens.filter((e) => e.stablecoin);
    }),
    (n.relayFundingTokens = function (e) {
      return e.tokens.filter((e) => e.relayFunding);
    }),
    (n.wrappedNativeToken = function (e) {
      return e.tokens.find((e) => e.wrappedNative);
    }),
    (n.findChainToken = v),
    (n.getChainToken = function (e, a) {
      let n = v(e, a);
      if (void 0 === n) throw new i(e.slug, a);
      return n;
    }),
    (n.chainSet = function (e) {
      return n.CHAIN_SETS[e].slugs.map((e) => t.get(e));
    }),
    (n.chainSetHas = function (e, a) {
      let s = b(a);
      return void 0 !== s && n.CHAIN_SETS[e].slugs.includes(s.slug);
    }),
    (n.tokenSet = function (e) {
      return n.TOKEN_SETS[e].members.map((e) => {
        let a = t.get(e.chain);
        return { chain: a, token: v(a, e.address) };
      });
    }),
    (n.tokenSetHas = function (e, a, s) {
      let i = b(a);
      if (void 0 === i) return !1;
      let t = f(i.family, s);
      return n.TOKEN_SETS[e].members.some(
        (e) => e.chain === i.slug && e.address === t,
      );
    }),
    (n.tokenSetAddresses = function (e, a) {
      let s = b(a);
      return void 0 === s
        ? []
        : n.TOKEN_SETS[e].members
            .filter((e) => e.chain === s.slug)
            .map((e) => e.address);
    }),
    (n.walletSetHas = function (e, a, s) {
      let i = b(a);
      if (void 0 === i) return !1;
      let t = f(i.family, s);
      return n.WALLET_SETS[e].members.some(
        (e) => e.chain === i.slug && e.address === t,
      );
    }),
    (n.walletSetAddresses = function (e, a) {
      let s = b(a);
      return void 0 === s
        ? []
        : n.WALLET_SETS[e].members
            .filter((e) => e.chain === s.slug)
            .map((e) => e.address);
    }),
    (n.findProgram = function (e) {
      return n.PROGRAMS.find((a) => a.slug === e);
    }),
    (n.findPlatform = function (e) {
      return n.PLATFORMS.find((a) => a.slug === e);
    }),
    (n.programSetHas = function (e, a) {
      return n.PROGRAM_SETS[e].members.includes(a || "pump");
    }),
    (n.platformSetHas = function (e, a) {
      return !!a && n.PLATFORM_SETS[e].members.includes(a);
    }),
    (n.CHAIN_SLUGS = [
      "solana",
      "ethereum",
      "bsc",
      "base",
      "monad",
      "robinhood",
      "hyperevm",
      "ink",
      "arc",
      "megaeth",
      "xlayer",
      "polygon",
      "arbitrum",
      "hypercore",
      "hypercore-testnet",
      "ton",
      "ton-testnet",
      "near",
      "starknet",
    ]),
    (n.CHAINS = [
      {
        slug: "solana",
        family: "svm",
        caip2: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        evmChainId: null,
        codexNetworkId: 0x536f6c4d,
        relaySlug: "solana",
        dexscreenerSlug: "solana",
        displayName: "Solana",
        explorerUrl: "https://solscan.io",
        nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
        notes:
          "Relay also identifies this chain by the numeric id 792703809 (mobile SOLANA_RELAY_CHAIN_ID); every other integration uses the slug. Token addresses on this chain are base58 and CASE-SENSITIVE - unlike the EVM chains, they are stored verbatim and must never be lowercased before comparison.",
        tokens: [
          {
            address: "So11111111111111111111111111111111111111112",
            symbol: "WSOL",
            decimals: 9,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "11111111111111111111111111111111",
            symbol: "SOL",
            decimals: 9,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "The System Program id, used as a native-SOL quote_mint spelling by UEP and the pump programs (unified-event-publisher NATIVE_MINT, coin-service SolQuoteMints, unified-indexer NATIVE_MINT). Not an SPL mint - a recognizer spelling for unwrapped SOL, admitted so the svmSolSpellings set can name it (TASK-4363); TASK-4320 had kept it registry-external while no set could carry it.",
          },
          {
            address: "So11111111111111111111111111111111111111111",
            symbol: "SOL",
            decimals: 9,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Helius's native-SOL representation - WSOL's address with a trailing 1 instead of 2 (unified-indexer HELIUS_NATIVE_SOL_MINT). A real wire spelling, not a typo: unified-indexer books it as a SOL quote leg and coin-communities' Native arm matches it, yet a coin-service create quoting it hard-errors as exotic and client-server's market-cap branch reads it as USD (TASK-4353 drift 7). In svmSolSpellings; deliberately NOT in svmQuoteCash - the profile-service#550 reader contract pins it out.",
          },
          {
            address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            symbol: "USDC",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
            symbol: "USDC",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Devnet USDC. Carried in the mainnet quote set deliberately - coin-communities SVM_QUOTE_MINTS and mobile's QUOTE_TOKENS both list it so a devnet build classifies quote-side amounts identically.",
          },
          {
            address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
            symbol: "USDT",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "USD1ttGY1N17NEEHLmELoaybftRBUSErhqYiQzvEmuB",
            symbol: "USD1",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "6 decimals verified on-chain via getTokenSupply on 2026-08-31 (TASK-4363), and asserted independently by coin-service constants.go, unified-event-publisher QUOTE_DECIMALS and unified-indexer quote_mints.rs.",
          },
          {
            address: "CASHx9KJUStyftLFWGvEVf59SGeG9sh5FfcnZMVPCASH",
            symbol: "CASH",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "DFlow CASH. 6 decimals verified on-chain via getTokenSupply on 2026-08-31 (TASK-4363) and asserted by unified-indexer quote_mints.rs. Watch the spelling: a one-character-off CASHx8ZGH... transcription shipped once and is pinned dead by unified-svm-parser's regression test.",
          },
          {
            address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
            symbol: "BONK",
            decimals: 5,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "5 decimals, not 6 or 9. Defaulting an unknown quote mint to SOL's 9 mis-scaled BONK-quoted amounts by 10x in production - the reason mobile's resolveQuoteTokenMeta returns null rather than a default.",
          },
          {
            address: "USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA",
            symbol: "USDS",
            decimals: null,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "DEkqHyPN7GMRJ5cArtQFAWefqbZb33Hyf6s5iCwjEonT",
            symbol: "USDe",
            decimals: null,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo",
            symbol: "PYUSD",
            decimals: null,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "GzX1ireZDU865FiMaKrdVB1H6AE8LAqWYCg6chrMrfBw",
            symbol: "fxrUSD",
            decimals: null,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "9zNQRsGLjNKwCUU5Gq5LR8beUCPzQMVMqKAi3SSZh54u",
            symbol: "FDUSD",
            decimals: null,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "XsoCS1TfEyfFhfvj8EtZ528L3CaKBDBRqRapnBbDF2W",
            symbol: "SPYx",
            decimals: null,
            quote: !1,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "LaunchLab T22 exotic quote (svmExoticQuotes). quote stays false deliberately: unified-indexer's rule is that every exotic quote also trades as a base elsewhere, so is-a-quote is per-trade orientation (the wire's quote_mint_address), never mint identity - and no position ledger skips these.",
          },
          {
            address: "Xsc9qvGR1efVDFGLrVsmkzv3qi45LTBjeUKSPmx9qEh",
            symbol: "NVDAx",
            decimals: null,
            quote: !1,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "LaunchLab T22 exotic quote (svmExoticQuotes); quote deliberately false - see SPYx.",
          },
          {
            address: "XsueG8BtpquVJX9LVLLEGuViXUungE6WmK5YZ3p3bd1",
            symbol: "CRCLx",
            decimals: null,
            quote: !1,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "LaunchLab T22 exotic quote (svmExoticQuotes); quote deliberately false - see SPYx. The trailing 1 is part of the address, not a truncation.",
          },
          {
            address: "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN",
            symbol: "TRUMP",
            decimals: null,
            quote: !1,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "LaunchLab T22 exotic quote (svmExoticQuotes); quote deliberately false - see SPYx.",
          },
          {
            address: "HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr",
            symbol: "EURC",
            decimals: null,
            quote: !1,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "LaunchLab T22 exotic quote (svmExoticQuotes). EUR-pegged Circle stablecoin, deliberately NOT flagged stablecoin: that flag feeds USD-1:1 shortcuts and EURC trades around 1.16 USD (coin-service: a quote mint, never a USD stablecoin; TASK-4353 drift 1 is client-server serving it as USD at face value). quote deliberately false - see SPYx.",
          },
        ],
      },
      {
        slug: "ethereum",
        family: "evm",
        caip2: "eip155:1",
        evmChainId: 1,
        codexNetworkId: 1,
        relaySlug: "ethereum",
        dexscreenerSlug: "ethereum",
        displayName: "Ethereum",
        explorerUrl: "https://etherscan.io",
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        notes: null,
        tokens: [
          {
            address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            symbol: "WETH",
            decimals: null,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            symbol: "USDC",
            decimals: null,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
            symbol: "USDT",
            decimals: null,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
            symbol: "USDe",
            decimals: null,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes: null,
          },
          {
            address: "0x6c3ea9036406852006290770bedfcaba0e23a0e8",
            symbol: "PYUSD",
            decimals: null,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes: null,
          },
          {
            address: "0xe343167631d89b6ffc58b88d6b7fb0228795491d",
            symbol: "USDG",
            decimals: 6,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes:
              "Same Paxos token as Robinhood Chain's cash instrument. compliance-service added it to its screening stables on 2026-08-28 after finding that a wallet funded only in USDG read as verified-empty and was exempted unscreened.",
          },
          {
            address: "0xaca92e438df0b2401ff60da7e4337b687a2435da",
            symbol: "mUSD",
            decimals: null,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes: null,
          },
          {
            address: "0x9f6f3991d525015a6f8caf062c83b62fd3ac4436",
            symbol: "OUSD",
            decimals: 6,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes: null,
          },
          {
            address: "0x6b175474e89094c44da98b954eedeac495271d0f",
            symbol: "DAI",
            decimals: 18,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes: null,
          },
          {
            address: "0x00000000efe302beaa2b3e6e1b18d08d69a9012a",
            symbol: "AUSD",
            decimals: 6,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes: null,
          },
          {
            address: "0xec2af1c8b110a61fd9c3fa6a554a031ca9943926",
            symbol: "USDm",
            decimals: 18,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes: null,
          },
        ],
      },
      {
        slug: "bsc",
        family: "evm",
        caip2: "eip155:56",
        evmChainId: 56,
        codexNetworkId: 56,
        relaySlug: "bsc",
        dexscreenerSlug: "bsc",
        displayName: "BSC",
        explorerUrl: "https://bscscan.com",
        nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
        notes:
          'Display name disagrees across surfaces: "BSC" in mobile and client-server, "BNB Chain" in frontend, "BNB Smart Chain" in viem. The registry uses the org majority. Relay additionally accepts the aliases "bnb" and "binance" (mobile getEvmChainFromNameOrId).',
        tokens: [
          {
            address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
            symbol: "WBNB",
            decimals: null,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "0x55d398326f99059ff775485246999027b3197955",
            symbol: "USDT",
            decimals: null,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Binance-Peg BSC-USD. Binance-pegged stables on this chain do NOT use 6 decimals like their Ethereum counterparts - read decimals on-chain, never assume.",
          },
          {
            address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
            symbol: "USDC",
            decimals: null,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Binance-Peg USD Coin. Same decimals caveat as BSC-USD above.",
          },
          {
            address: "0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d",
            symbol: "USD1",
            decimals: 18,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: "World Liberty Financial USD.",
          },
          {
            address: "0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34",
            symbol: "USDe",
            decimals: null,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes:
              'Sources disagree: unified-indexer classifies this as a quote-side Stable, while coin-communities lists it under EVM_FUNDING_STABLES - explicitly "values a trade but is NOT positions-skip quote cash". The registry follows coin-communities and marks it funding-only.',
          },
          {
            address: "0x21caef8a43163eea865baee23b9c2e327696a3bf",
            symbol: "XAUt",
            decimals: null,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Tether Gold. The org's only quote token that is neither a stablecoin nor a wrapped native - it is priced from the xaut_price feed rather than pegged. Declared solely in evm-event-publisher eep-core/src/quote.rs; no downstream copy models this shape.",
          },
        ],
      },
      {
        slug: "base",
        family: "evm",
        caip2: "eip155:8453",
        evmChainId: 8453,
        codexNetworkId: 8453,
        relaySlug: "base",
        dexscreenerSlug: "base",
        displayName: "Base",
        explorerUrl: "https://basescan.org",
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        notes: null,
        tokens: [
          {
            address: "0x4200000000000000000000000000000000000006",
            symbol: "WETH",
            decimals: null,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
            symbol: "USDC",
            decimals: null,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: "Native Circle USDC on Base.",
          },
          {
            address: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
            symbol: "USDT",
            decimals: null,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes:
              "Bridged Tether on Base. Present in unified-indexer, compliance-service and eep-core's relay funding set, but ABSENT from coin-communities EVM_QUOTE_TOKENS as of 2026-08-29 - adopting the registry adds it there.",
          },
          {
            address: "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf",
            symbol: "cbBTC",
            decimals: null,
            quote: !1,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !0,
            notes: null,
          },
          {
            address: "0x311935cd80b76769bf2ecc9d8ab7635b2139cf82",
            symbol: "SOL",
            decimals: null,
            quote: !1,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !0,
            notes:
              "Bridged SOL on Base - a relay funding asset, not this chain's native currency.",
          },
          {
            address: "0xb2000000000000000000002feb517dfec7415344",
            symbol: "OUSD",
            decimals: 6,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes: null,
          },
        ],
      },
      {
        slug: "monad",
        family: "evm",
        caip2: "eip155:143",
        evmChainId: 143,
        codexNetworkId: 143,
        relaySlug: "monad",
        dexscreenerSlug: "monad",
        displayName: "Monad",
        explorerUrl: "https://monadscan.com",
        nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
        notes:
          "143 is Monad MAINNET. mobile utils/advanced/trenches.ts maps monad to \"eip155:10143\", which is Monad TESTNET - every other site in the org (mobile relay, frontend, blockchain-api-service, viem) uses 143, so the Trenches board queries a different network than trades, explorer links and RPC do. codexNetworkId is Codex COVERAGE (docs.codex.io/networks lists 143; hermes-notification-pipeline, blockchain-client and mobile market-cap alerts already query it). Monad was client-side only (Codex/Relay-served, tokens[] empty) until the monad-wave: evm-event-publisher now indexes it (nad.fun curves as PROTOCOL_NADFUN, nad.fun V2 DEX pairs as PROTOCOL_NADSWAP, Uniswap V2/V3/V4, PancakeSwap V3), so tokens[] carries eep-core's quote_tokens() set address for address and the chain joins the serving sets; client-server holds it out of them via DEFERRED_SET_CHAINS until the Codex parity gates pass (CS-2). Gas is charged on the LIMIT (gasUsed == gas on every receipt), and every block's index-0 tx is a zero-gas system tx from 0x...1000 that is never a trade. Explorer is monadscan.com (Etherscan v2 serves chainid 143, viem's default), replacing the earlier socialscan choice.",
        tokens: [
          {
            address: "0x3bd359c1119da7da1d913d1c4d2b7c461115433a",
            symbol: "WMON",
            decimals: 18,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes: "Wrapped MON, the native quote.",
          },
          {
            address: "0x754704bc059f8c67012fed69bc8a327a5aafb603",
            symbol: "USDC",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "0xe7cd86e13ac4309349f30b3435a9d337750fc82d",
            symbol: "USDT0",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "0x00000000efe302beaa2b3e6e1b18d08d69a9012a",
            symbol: "AUSD",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: "Agora USD.",
          },
          {
            address: "0xaca92e438df0b2401ff60da7e4337b687a2435da",
            symbol: "mUSD",
            decimals: 6,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes:
              "MetaMask USD - a Relay solver currency that values a relay trade, never a memecoin quote (USDC/mUSD V4 pools are quote-vs-quote).",
          },
        ],
      },
      {
        slug: "robinhood",
        family: "evm",
        caip2: "eip155:4663",
        evmChainId: 4663,
        codexNetworkId: 4663,
        relaySlug: "robinhood",
        dexscreenerSlug: "robinhood",
        displayName: "Robinhood",
        explorerUrl: "https://robinhoodchain.blockscout.com",
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        notes:
          "Not shipped by viem: mobile and frontend each hand-define an identical viem Chain object for it, with RPC https://rpc.mainnet.chain.robinhood.com. Carries no USDC or USDT - its cash instrument is USDG.",
        tokens: [
          {
            address: "0x0bd7d308f8e1639fab988df18a8011f41eacad73",
            symbol: "WETH",
            decimals: null,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "0x5fc5360d0400a0fd4f2af552add042d716f1d168",
            symbol: "USDG",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "This chain's only stablecoin, which is why mobile's getDefaultRefundStableSymbol special-cases 4663 to USDG instead of USDC.",
          },
        ],
      },
      {
        slug: "hyperevm",
        family: "evm",
        caip2: "eip155:999",
        evmChainId: 999,
        codexNetworkId: 999,
        relaySlug: "hyperevm",
        dexscreenerSlug: "hyperevm",
        displayName: "HyperEVM",
        explorerUrl: "https://hyperevmscan.io",
        nativeCurrency: { name: "HYPE", symbol: "HYPE", decimals: 18 },
        notes:
          'Display name disagrees across surfaces: "HyperEVM" in mobile\'s feed filter, client-server and viem; "Hyperliquid" in frontend, mobile\'s refund banner and mobile\'s deposit screen - so a user sees both names for one chain. The registry names the chain (HyperEVM); "Hyperliquid" is the parent brand.',
        tokens: [
          {
            address: "0x5555555555555555555555555555555555555555",
            symbol: "WHYPE",
            decimals: null,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "0xb8ce59fc3717ada4c02eadf9682a9e934f625ebb",
            symbol: "USDT0",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "The on-chain symbol is USD₮0 (U+20AE). The registry uses the ASCII spelling deliberately - it is an identifier, not an on-chain read.",
          },
          {
            address: "0xb88339cb7199b77e23db6e890353e22632ba630f",
            symbol: "USDC",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34",
            symbol: "USDe",
            decimals: 18,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes:
              "Same contract address as BSC's USDe, but quote-side here and funding-only on BSC - which is why token lookups must be keyed by (chain, address) and never by address alone.",
          },
        ],
      },
      {
        slug: "ink",
        family: "evm",
        caip2: "eip155:57073",
        evmChainId: 57073,
        codexNetworkId: 57073,
        relaySlug: "ink",
        dexscreenerSlug: "ink",
        displayName: "Ink",
        explorerUrl: "https://explorer.inkonchain.com",
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        notes:
          'Indexed by evm-event-publisher on devnet since 2026-08-24 (prod via evm-event-publisher#150 + amm-infra#663); profile-service PnL and balance rosters via profile-service#756. Quote set mirrors eep-core INK_QUOTES exactly. Relay route wired 2026-09-10 for the 2026-09-13 launch: api.relay.link/chains lists 57073 as slug "ink" with deposits enabled, and rpc-proxy-worker serves ink-mainnet.pump.fun (Alchemy). Trading additionally needs coin-details-api and blockchain-api-service to admit the chain - see their Ink PRs. Etherscan does not cover it - the explorer is a Blockscout instance. Added because drift had already shipped: recommendations-server\'s CAIP-2 map omitted Ink, so Ink coins resolved to None there.',
        tokens: [
          {
            address: "0x4200000000000000000000000000000000000006",
            symbol: "WETH",
            decimals: 18,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes:
              "OP Stack predeploy - the same address as Base's WETH, which is why token lookups stay keyed by (chain, address).",
          },
          {
            address: "0x0200c29006150606b650577bbe7b6248f58470c1",
            symbol: "USDT0",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "The on-chain symbol is USD₮0 (U+20AE); ASCII spelling as on hyperevm. The deepest stable on the chain.",
          },
          {
            address: "0xf1815bd50389c46847f0bda824ec8da914045d14",
            symbol: "USDC.e",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Stargate-bridged USDC - a different token from native USDC.",
          },
          {
            address: "0x2d270e6886d130d724215a266106e6832161eaed",
            symbol: "USDC",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: null,
          },
          {
            address: "0xe343167631d89b6ffc58b88d6b7fb0228795491d",
            symbol: "USDG",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: "Paxos Global Dollar.",
          },
          {
            address: "0x1217bfe6c773eec6cc4a38b5dc45b92292b6e189",
            symbol: "oUSDT",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: "OpenUSDT.",
          },
        ],
      },
      {
        slug: "arc",
        family: "evm",
        caip2: "eip155:5042",
        evmChainId: 5042,
        codexNetworkId: 5042,
        relaySlug: "arc",
        dexscreenerSlug: null,
        displayName: "Arc",
        explorerUrl: "https://explorer.arc.io",
        nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 18 },
        notes:
          'Circle\'s L1, public launch 2026-09-16; ~0.5s blocks, deterministic finality. Gas is USDC: the native asset and the ERC-20 at 0x3600…0000 are ONE balance (the contract is a system mirror, 6 decimals, not a wrapper; native units are 18-decimal wei of the same balance) - so its only token is both the wrapped-native slot and the stablecoin, the one exemption the validator allows. Every native movement also emits an ERC-20-shaped Transfer from the codeless system address 0xff…fe; that address is not a token and must never appear here. codexNetworkId 5042 is ASSUMED: Codex did not list the chain on 2026-09-03 but has it on its roadmap for before launch (Codex uses the EVM chain id for every EVM network it serves); re-verify before serving balances. relaySlug "arc" wired 2026-09-11 ahead of the launch: Relay confirmed it keys the chain by its EVM id 5042 (Relay uses the EVM chain id for every EVM network); api.relay.link/chains did not list 5042 yet on 2026-09-11, so consumers that quote against Relay must not go live before it does. rpc-proxy-worker serves arc-mainnet.pump.fun (Alchemy arc-mainnet, live). Trading additionally needs coin-details-api and blockchain-api-service to admit the chain - see their Arc PRs. dexscreenerSlug null: DexScreener answers the slug with no pairs. Explorer is a Blockscout instance behind Cloudflare Access until launch. Indexed by evm-event-publisher dark (chain absent from ENABLED_CHAINS) via the Arc chain-add.',
        tokens: [
          {
            address: "0x3600000000000000000000000000000000000000",
            symbol: "USDC",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !0,
            relayFunding: !1,
            notes:
              "The ERC-20 face of the native balance (system contract, no deposit/withdraw). The only quote on the chain: 460/461 active Uniswap V3 pools, 38/38 V2 pairs and 260/266 V4 pools had USDC or native on one side on 2026-09-03. Amounts on this interface are 6-dec; eth_getBalance/msg.value/gas are 18-dec wei of the same balance (divide by 1e12).",
          },
        ],
      },
      {
        slug: "megaeth",
        family: "evm",
        caip2: "eip155:4326",
        evmChainId: 4326,
        codexNetworkId: 4326,
        relaySlug: null,
        dexscreenerSlug: "megaeth",
        displayName: "MegaETH",
        explorerUrl: "https://mega.etherscan.io",
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        notes:
          "OP Stack mega-reth L2 launched 2026 with 1 s EVM blocks (its 10 ms mini-blocks are invisible to newHeads), an intrinsic gas floor of 60,000, no native USDC, and Kumbaya Fire as its launchpad.",
        tokens: [
          {
            address: "0x4200000000000000000000000000000000000006",
            symbol: "WETH",
            decimals: 18,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes: "OP Stack predeploy.",
          },
          {
            address: "0xfafddbb3fc7688494971a79cc65dca3ef82079e7",
            symbol: "USDm",
            decimals: 18,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: "18-decimal stable, unlike the 6-decimal USDT0.",
          },
          {
            address: "0xb8ce59fc3717ada4c02eadf9682a9e934f625ebb",
            symbol: "USDT0",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: "Same address as hyperevm's USDT0.",
          },
        ],
      },
      {
        slug: "xlayer",
        family: "evm",
        caip2: "eip155:196",
        evmChainId: 196,
        codexNetworkId: 196,
        relaySlug: "xlayer",
        dexscreenerSlug: null,
        displayName: "X Layer",
        explorerUrl: "https://xlayerscan.com",
        nativeCurrency: { name: "OKB", symbol: "OKB", decimals: 18 },
        notes:
          "OKX's L2: Polygon CDK until block 42,810,021, OP Stack since (hash chain continuous), 1 s blocks. Explorer xlayerscan (OKLink): https://xlayerscan.com/tx/<hash>. Native OKB is priced by the sol-price-service okb_price feed. relaySlug is a parity field only (no Relay rail, no funding row: relayFunding false everywhere); dexscreenerSlug null (DexScreener has no X Layer chain). Wrapped native is the legacy WOKB below, never the 0x4200...0006 predeploy. Launchpad: Ignix (PROTOCOL_IGNIX).",
        tokens: [
          {
            address: "0xe538905cf8410324e03a5a23c1c177a474d59b2b",
            symbol: "WOKB",
            decimals: 18,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes:
              "Legacy WOKB, the live wrapped native and the native quote; never the zero-supply 0x4200...0006 predeploy.",
          },
          {
            address: "0x4ae46a509f6b1d9056937ba4500cb143933d2dc8",
            symbol: "USDG",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Paxos Global Dollar; the coin-details-api stable slot on this chain.",
          },
          {
            address: "0x779ded0c9e1022225f8e0630b35a9b54be713736",
            symbol: "USDT0",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "The on-chain symbol is USD₮0 (U+20AE); ASCII spelling as on hyperevm and ink. The legacy bridged USDT 0x1e4a5963abfd975d8c9021ce480b42188849d41d is not a quote.",
          },
          {
            address: "0xb6ceceab302e2e4948951ee7843fc24e92933061",
            symbol: "USDC",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Native USDC. The bridged USDC 0x74b7f16337b8972027f6196a17a631ac6de26d22 shares the symbol and is not a quote.",
          },
        ],
      },
      {
        slug: "polygon",
        family: "evm",
        caip2: "eip155:137",
        evmChainId: 137,
        codexNetworkId: 137,
        relaySlug: "polygon",
        dexscreenerSlug: "polygon",
        displayName: "Polygon",
        explorerUrl: "https://polygonscan.com",
        nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
        notes:
          "Polygon PoS (Bor), 1.5 s blocks with integer-second timestamps. Native POL, ex-MATIC since block 62,278,656 (same 18-dec balance); the MRC20 system contract 0x0000000000000000000000000000000000001010 mirrors it and emits LogTransfer/LogFeeTransfer, never ERC-20 Transfer. Native POL is priced by the sol-price-service pol_price feed. Explorer polygonscan (Etherscan v2 chainid 137): https://polygonscan.com/tx/<hash>. relaySlug is a parity field only (no Relay rail; pUSD is the only relayFunding row). DEX-only: no launchpad and no PROTOCOL_* value. Wrapped native is WPOL below (on-chain symbol WMATIC).",
        tokens: [
          {
            address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
            symbol: "WPOL",
            decimals: 18,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes:
              "The wrapped native and the native quote; the contract still reports the on-chain symbol WMATIC.",
          },
          {
            address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
            symbol: "USDC",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Circle native, CCTP domain 7; the coin-details-api stable slot.",
          },
          {
            address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
            symbol: "USDT0",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "On-chain symbol USDT0 since the USDT0 migration; Relay/vendors label it USDT.",
          },
          {
            address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
            symbol: "USDC.e",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Bridged PoS USDC, on-chain symbol reads USDC — keyed by address.",
          },
          {
            address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
            symbol: "DAI",
            decimals: 18,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Not a quote (polygon D6): transfer-excluded in evm-event-publisher like Ethereum/Base DAI; the LGNS/DAI and DAI/PiX bot pairs are deliberately unclassified.",
          },
          {
            address: "0xc011a7e12a19f7b1f670d46f03b03f3342e82dfb",
            symbol: "pUSD",
            decimals: 6,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes: "Polymarket USD; Relay solver currency; transfer-excluded.",
          },
        ],
      },
      {
        slug: "arbitrum",
        family: "evm",
        caip2: "eip155:42161",
        evmChainId: 42161,
        codexNetworkId: 42161,
        relaySlug: "arbitrum",
        dexscreenerSlug: "arbitrum",
        displayName: "Arbitrum",
        explorerUrl: "https://arbiscan.io",
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        notes:
          "Arbitrum One (Nitro), ~270 ms blocks with integer-second timestamps (evm-event-publisher runs it at 250 ms, the Orbit floor). Native ETH is priced by the sol-price-service eth_price feed. Explorer arbiscan (Etherscan v2 chainid 42161; Cloudflare-gated for programmatic reads, Sourcify serves verified sources): https://arbiscan.io/tx/<hash>. Relay operates here (depository live, solverCurrencies WETH/USDC/USDT0/USDe/APE/ETH): USDe is the one relayFunding row, APE is declined; relaySlug is a parity field until arbitrum-wave MOB-1 adds RELAY_PARITY_ONLY_SLUGS and a later MOB unit adds viem arbitrum when trading opens. DEX venues Uniswap V3 + V4, PancakeSwap V3, Camelot V3 (Algebra v1.9 on the algebra_integral label), Aerodrome Slipstream, SushiSwap V3 (uniswap_v3 label) plus the Uniswap CCA launchpad venue; one new PROTOCOL_* value, PROTOCOL_PRINTR = 200 (SCH-1b #871). Wrapped native is WETH 0x82af… (not an OP-Stack predeploy).",
        tokens: [
          {
            address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
            symbol: "WETH",
            decimals: 18,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes: "The wrapped native and the native quote.",
          },
          {
            address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
            symbol: "USDC",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Circle native, CCTP domain 3; the coin-details-api stable slot.",
          },
          {
            address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
            symbol: "USDT0",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "On-chain symbol USD₮0 (the USDT0 migration of bridged USDT at the same address); Relay and vendors label it USDT.",
          },
          {
            address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
            symbol: "USDC.e",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Bridged USDC (on-chain name USD Coin (Arb1), symbol reads USDC) — keyed by address.",
          },
          {
            address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
            symbol: "DAI",
            decimals: 18,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Not a quote (the Polygon D6 shape): transfer-excluded in evm-event-publisher.",
          },
          {
            address: "0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34",
            symbol: "USDe",
            decimals: 18,
            quote: !1,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !0,
            notes:
              "Relay solver currency outside the quote set (evm-event-publisher RELAY_FUNDING_TOKENS row), the Monad mUSD shape.",
          },
        ],
      },
      {
        slug: "hypercore",
        family: "hypercore",
        caip2: "hlcore:mainnet",
        evmChainId: null,
        codexNetworkId: null,
        relaySlug: null,
        dexscreenerSlug: null,
        displayName: "Hyperliquid",
        explorerUrl: "https://app.hyperliquid.xyz/explorer",
        nativeCurrency: { name: "HYPE", symbol: "HYPE", decimals: 8 },
        notes:
          "HyperCore, Hyperliquid's L1 order-book state (perps), family hypercore - not HyperEVM (eip155:999), which shares the HYPE brand; the CAIP-2 namespace is hlcore because hypercore is 9 characters and CAIP-2 caps a namespace at 8. CoinRef.address is the HL coin key verbatim and case-sensitive (BTC, kPEPE, xyz:TSLA - a HIP-3 dex keeps its prefix); HIP-3 dexs are not chains. Margin, PnL and funding settle in USDC. nativeCurrency decimals 8 is HYPE's HyperCore spot weiDecimals (HyperEVM's HYPE is 18). No codexNetworkId (Codex does not index HyperCore; HyperCore ChainId values are a reserved range, never a Codex number), no relay route, no tokens and no set memberships in v1 - a perp market is not a token, and the generator rejects either on a hypercore chain so set-scoped consumers never see one.",
        tokens: [],
      },
      {
        slug: "hypercore-testnet",
        family: "hypercore",
        caip2: "hlcore:testnet",
        evmChainId: null,
        codexNetworkId: null,
        relaySlug: null,
        dexscreenerSlug: null,
        displayName: "Hyperliquid",
        explorerUrl: "https://app.hyperliquid-testnet.xyz/explorer",
        nativeCurrency: { name: "HYPE", symbol: "HYPE", decimals: 8 },
        notes:
          "HyperCore testnet (devnet): same shape and rules as the hypercore row; coin keys and asset indexes differ from mainnet, so never resolve a testnet key against mainnet state.",
        tokens: [],
      },
      {
        slug: "ton",
        family: "ton",
        caip2: "ton:-239",
        evmChainId: null,
        codexNetworkId: null,
        relaySlug: null,
        dexscreenerSlug: "ton",
        displayName: "TON",
        explorerUrl: "https://tonviewer.com",
        nativeCurrency: { name: "Gram", symbol: "GRAM", decimals: 9 },
        notes:
          "TON mainnet, family ton, CAIP-2 ton:-239 (the global id). Every address here and on the wire is the raw workchain:account form, lowercase hex (0:b113...1dfe); the friendly bounceable base64url-48 form (EQ...) appears only at the serving boundary. Native coin renamed TON to GRAM 2026-06-15, 9 decimals. No codexNetworkId, no relay route; venue routers and pool code hashes drift and live in the ton.allowlist table, never in programs.json. wallet: every pump.fun user's TON wallet is this contract derived from their Solana ed25519 public key (D15); server and app read this value, nobody hardcodes it. v5r1 walletId 2147483409 = 0x7FFFFF11 = network_global_id -239 XOR the client context (1<<31, workchain 0, version 0, subwallet 0).",
        wallet: { contract: "v5r1", walletId: 0x7fffff11 },
        tokens: [
          {
            address:
              "0:b113a994b5024a16719f69139328eb759596c38a25f59028b146fecdc3621dfe",
            symbol: "USDT",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Tether USDT jetton master; friendly EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs.",
          },
          {
            address:
              "0:671963027f7f85659ab55b821671688601cdcf1ee674fc7fbbb1a776a18d34a3",
            symbol: "pTON",
            decimals: 9,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes:
              "STON.fi pTON v2.1 proxy master, fronting the STON.fi v2 routers; the chain's one wrappedNative.",
          },
          {
            address:
              "0:8cdc1d7640ad5ee326527fc1ad0514f468b30dc84b0173f0e155f451b4e11f7c",
            symbol: "pTON",
            decimals: 9,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "pTON v1 (STON.fi v1 router quote): pTON-family wrapper of the native coin; classified QUOTE_KIND_PTON by the venue decoder, not by this flag",
          },
          {
            address:
              "0:949c4c66760c002800e2fa3d8a3ca4e1c90a9373b53ae7472033483bf14cd95e",
            symbol: "pTON",
            decimals: 9,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "TONCO ProxyTON v1: pTON-family wrapper of the native coin; classified QUOTE_KIND_PTON by the venue decoder, not by this flag",
          },
          {
            address:
              "0:7019100c8d363f08c3562a1cc178703e54f8e9dab0fdbc1debc1ea46d9ca3979",
            symbol: "pTON",
            decimals: 9,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "TONCO ProxyGRAM v2: pTON-family wrapper of the native coin; classified QUOTE_KIND_PTON by the venue decoder, not by this flag",
          },
        ],
      },
      {
        slug: "ton-testnet",
        family: "ton",
        caip2: "ton:-3",
        evmChainId: null,
        codexNetworkId: null,
        relaySlug: null,
        dexscreenerSlug: null,
        displayName: "TON",
        explorerUrl: "https://testnet.tonviewer.com",
        nativeCurrency: { name: "Gram", symbol: "GRAM", decimals: 9 },
        notes:
          "TON testnet, CAIP-2 ton:-3: same shape and rules as the ton row; jetton masters differ from mainnet, so it carries no tokens. wallet: the testnet v5r1 default, walletId 2147483645 = 0x7FFFFFFD = network_global_id -3 XOR the same client context as the ton row (1<<31, workchain 0, version 0, subwallet 0); the same layout yields the ton row's 0x7FFFFF11 from -239.",
        wallet: { contract: "v5r1", walletId: 0x7ffffffd },
        tokens: [],
      },
      {
        slug: "near",
        family: "near",
        caip2: "near:mainnet",
        evmChainId: null,
        codexNetworkId: null,
        relaySlug: null,
        dexscreenerSlug: null,
        displayName: "NEAR",
        explorerUrl: "https://nearblocks.io",
        nativeCurrency: { name: "NEAR", symbol: "NEAR", decimals: 24 },
        notes:
          "NEAR mainnet, family near, CAIP-2 near:mainnet; the only NEAR network in this registry. Every address is a NEAR account id: 2–64 lowercase chars, named (alice.near), 64-hex implicit (hex of the ed25519 public key) or 0x+40hex ETH-implicit; one form, never re-spelled. No codexNetworkId (D6), no relay route; DexScreener chainId is near (slug null until a reader is named, Q6). Venue accounts live in near.allowlist, never programs.json.",
        tokens: [
          {
            address: "wrap.near",
            symbol: "wNEAR",
            decimals: 24,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            notes:
              "Wrapped NEAR (NEP-141), the primary quote; the chain's one wrappedNative.",
          },
          {
            address:
              "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
            symbol: "USDC",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes:
              "Native USDC; a 64-hex account id that is a token contract, not a wallet.",
          },
          {
            address: "usdt.tether-token.near",
            symbol: "USDt",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: "Native Tether USDt.",
          },
          {
            address:
              "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near",
            symbol: "USDC.e",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: "Rainbow bridge USDC (Ethereum 0xa0b8…eb48).",
          },
          {
            address:
              "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
            symbol: "USDT.e",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            notes: "Rainbow bridge USDT (Ethereum 0xdac1…1ec7).",
          },
        ],
      },
      {
        slug: "starknet",
        family: "starknet",
        caip2: "starknet:SN_MAIN",
        evmChainId: null,
        codexNetworkId: null,
        relaySlug: null,
        dexscreenerSlug: "starknet",
        displayName: "Starknet",
        explorerUrl: "https://voyager.online",
        nativeCurrency: {
          name: "Starknet Token",
          symbol: "STRK",
          decimals: 18,
        },
        notes:
          "Starknet mainnet, the only Starknet network here. Addresses: felts < 2^251 as 0x + 64 lowercase zero-padded hex, never the RPC's stripped form. ETH and STRK are ordinary ERC20s, no native leg; STRK is the v3 fee token. codexNetworkId null (D6; 57420037 is the parity oracle). No relay route (2026-10-15). dexscreenerSlug starknet (D15). Venues live in starknet.venues, never programs.json.",
        tokens: [
          {
            address:
              "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
            symbol: "STRK",
            decimals: 18,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !0,
            relayFunding: !1,
            priced: !0,
            notes: null,
          },
          {
            address:
              "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
            symbol: "ETH",
            decimals: 18,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            priced: !0,
            notes: null,
          },
          {
            address:
              "0x033068f6539f8e6e6b131e6b2b814e6c34a5224bc66947c47dab9dfee93b35fb",
            symbol: "USDC",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            priced: !0,
            notes: null,
          },
          {
            address:
              "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
            symbol: "USDC.e",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            priced: !0,
            notes:
              "bridged, felt symbol 'USDC', legacy Transfer layout; key on address",
          },
          {
            address:
              "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
            symbol: "USDT",
            decimals: 6,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            priced: !0,
            notes: null,
          },
          {
            address:
              "0x05574eb6b8789a91466f902c380d978e472db68170ff82a5b650b95a58ddf4ad",
            symbol: "DAI",
            decimals: 18,
            quote: !0,
            stablecoin: !0,
            wrappedNative: !1,
            relayFunding: !1,
            priced: !0,
            notes: null,
          },
          {
            address:
              "0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac",
            symbol: "WBTC",
            decimals: 8,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            priced: !1,
            notes:
              "no BTC USD door: Kafka-only prints until SPS gains btc_price",
          },
          {
            address:
              "0x0787150e306e6eae6e3f79dea881770e8bbff2c1b8eb490f969669ee945b3135",
            symbol: "strkBTC",
            decimals: 8,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            priced: !1,
            notes:
              "no BTC USD door: Kafka-only prints until SPS gains btc_price",
          },
          {
            address:
              "0x05ce53b9b68fb8e9ecab9283a96d97948914733fd6ed8d9a53a276a419497841",
            symbol: "ZEC",
            decimals: 8,
            quote: !0,
            stablecoin: !1,
            wrappedNative: !1,
            relayFunding: !1,
            priced: !1,
            notes: "no USD door",
          },
        ],
      },
    ]));
  class s extends Error {
    constructor(e) {
      (super(`Unknown chain: ${e}. The chain registry has no entry for it.`),
        (this.key = e),
        (this.name = "UnknownChainError"));
    }
  }
  n.UnknownChainError = s;
  class i extends Error {
    constructor(e, a) {
      (super(`Unknown token ${a} on chain ${e}.`),
        (this.chain = e),
        (this.address = a),
        (this.name = "UnknownChainTokenError"));
    }
  }
  n.UnknownChainTokenError = i;
  let t = new Map(n.CHAINS.map((e) => [e.slug, e])),
    r = new Map(n.CHAINS.map((e) => [e.caip2, e])),
    o = new Map(
      n.CHAINS.filter((e) => null !== e.evmChainId).map((e) => [
        e.evmChainId,
        e,
      ]),
    ),
    d = new Map(
      n.CHAINS.filter((e) => null !== e.codexNetworkId).map((e) => [
        e.codexNetworkId,
        e,
      ]),
    ),
    l = new Map(
      n.CHAINS.filter((e) => null !== e.relaySlug).map((e) => [e.relaySlug, e]),
    );
  function c(e) {
    return t.get(e);
  }
  function u(e) {
    return r.get(e);
  }
  function h(e) {
    return o.get(e);
  }
  function m(e) {
    return d.get(e);
  }
  function p(e) {
    return l.get(e);
  }
  function b(e) {
    return "number" == typeof e
      ? (o.get(e) ?? d.get(e))
      : (t.get(e) ??
          r.get(e) ??
          l.get(e) ??
          (/^\d+$/.test(e) ? b(Number(e)) : void 0));
  }
  function y(e, a) {
    if (void 0 === e) throw new s(a);
    return e;
  }
  function f(e, a) {
    if ("evm" === e) return a.toLowerCase();
    if ("starknet" === e) {
      if (!/^0x[0-9a-fA-F]{1,64}$/.test(a)) return;
      let e = a.slice(2).toLowerCase().padStart(64, "0");
      return /^0[0-7]/.test(e) ? "0x" + e : void 0;
    }
    return a;
  }
  function v(e, a) {
    let n = f(e.family, a);
    return e.tokens.find((e) => e.address === n);
  }
  ((n.CHAIN_SET_NAMES = [
    "feed",
    "tokenHolders",
    "greatCoinsEvm",
    "positionLedger",
    "calloutMirror",
    "coinCommunitiesChains",
    "enrichment",
    "evmReadPriority",
    "pnlEvm",
    "portfolioEvm",
    "portfolioNativeBalances",
    "dexscreenerTrending",
    "injectedCoins",
    "goplusUnsupported",
    "goplusSupported",
    "honeypotExempt",
    "evmDownrankExempt",
  ]),
    (n.CHAIN_SETS = {
      feed: {
        name: "feed",
        description:
          "Chains the home feed serves. Replaces client-server home-feed FEED_CHAINS and the ?chain query enum it feeds; widening this set widens the accepted feed variants everywhere at once. Kept separate from tokenHolders and positionLedger although the sets nearly coincide (TASK-4351): feed visibility is a product call with no vendor or migration prerequisite, so a chain can become feed-visible before Codex covers it (tokenHolders) or the ledger books it (positionLedger) - arc takes exactly that path for its 2026-09-16 launch: feed-visible here while it stays out of both vendor-gated sets. ton joins 2026-10 (ton-ready SCH-1b): served through TradeApi, held in client-server DEFERRED_REGISTRY_CHAIN_SLUGS / DEFERRED_SET_CHAINS until a feed-lift unit lifts the hold under its own cutover flag. near joins with the near-wave (W14 release 1): served by client-server /home-feed's near arm (hydration nearRowsByItemId, the Codex-id path null) behind uapiNearDiscovery; near holds only the feed, calloutMirror and coinCommunitiesChains sets (generate-registry.py NEAR_ALLOWED_SETS). starknet joins with the Starknet wave (W14 release 1): served by client-server /home-feed's Starknet arm (the Codex-id path null under D6) behind uapiStarknetDiscovery; starknet holds only the feed, calloutMirror and coinCommunitiesChains sets (generate-registry.py STARKNET_ALLOWED_SETS). arbitrum joins with the arbitrum-wave (SCH-1; EEP-1 runs it dark), held in client-server DEFERRED_SET_CHAINS by CS-0 until CS-2.",
        ordered: !1,
        slugs: [
          "solana",
          "ethereum",
          "base",
          "bsc",
          "robinhood",
          "hyperevm",
          "ink",
          "arc",
          "megaeth",
          "xlayer",
          "monad",
          "polygon",
          "arbitrum",
          "ton",
          "near",
          "starknet",
        ],
      },
      tokenHolders: {
        name: "tokenHolders",
        description:
          "Chains holder-count and top-holder lookups cover via Codex. Replaces client-server KNOWN_CHAINS and CODEX_NETWORK_ID_BY_CHAIN; every member must carry a codexNetworkId that Codex actually serves (docs.codex.io/networks, checked 2026-09-05: 1, 56, 8453, 143, 4663, 999, 57073 listed; 5042 confirmed 2026-09-16 with a live holders query against the Arc launch tokens, so arc is admitted; 4326 listed docs.codex.io/networks, checked 2026-10-06, so megaeth is admitted; 196 verified live 2026-10-11 with a getTokenPrices query pricing WOKB, so xlayer is admitted). Deliberately not merged with feed (TASK-4351): that gate is vendor coverage, feed's is product, so a chain can be feed-visible while holder lookups stay off until Codex lists it - arc walked exactly that path between its 2026-09-16 launch and Codex coverage. monad (served id 143) joins with the monad-wave, held in client-server DEFERRED_SET_CHAINS until CS-2 (the Codex parity gates). polygon (served id 137) joins with the polygon-wave, held in client-server DEFERRED_SET_CHAINS by CS-0 until CS-2. arbitrum (served id 42161, Codex getNetworks checked 2026-10-22) joins with the arbitrum-wave (SCH-1; EEP-1 runs it dark), held in client-server DEFERRED_SET_CHAINS by CS-0 until CS-2.",
        ordered: !1,
        slugs: [
          "solana",
          "ethereum",
          "base",
          "bsc",
          "robinhood",
          "hyperevm",
          "ink",
          "arc",
          "megaeth",
          "xlayer",
          "monad",
          "polygon",
          "arbitrum",
        ],
      },
      greatCoinsEvm: {
        name: "greatCoinsEvm",
        description:
          "EVM chains whose coins may surface in great-coins search and trending notifications (TASK-4249). Replaces client-server GREAT_COINS_EVM_CHAIN_IDS; shared by the endpoint and the notification eligibility pre-filter so an alert can never fire for a coin the endpoint will not serve. polygon is deliberately absent: great-coins exposure is not part of the polygon-wave. arbitrum is deliberately absent: great-coins exposure is not part of the arbitrum-wave.",
        ordered: !1,
        slugs: ["bsc", "base", "robinhood"],
      },
      positionLedger: {
        name: "positionLedger",
        description:
          "Chains the positions ledger books. Mirrors coin-communities ChainId and the ledger.chains / portfolio.chains seed rows shared with ledger-prod; profile-service pnl-stream events use the same id space. Widening this set requires a coordinated cc + ledger-prod migration first - the compact int2 surrogate ids in those tables are repo-local and NOT part of this registry. Membership is left exactly as schemas#484 set it (TASK-4351 rule: a discrepancy gets a new set, never a membership move): ink graduated from declared to booked with coin-communities-backend#1249 (ChainId::Ink, V011/V244, prod 2026-09-11); arc is declared here with the cc Arc PR (ChainId::Arc, V012/V251) and is booked once that PR is live and its chain-8 partitions are bootstrapped; megaeth is declared here with the cc MegaETH PR (ChainId::MegaEth, dictionary id 9) and is booked once that PR is live and its chain-9 partitions are bootstrapped; xlayer is declared here with the cc X Layer PR (ChainId::XLayer, dictionary id 10) and is booked once that PR is live and its chain-10 partitions are bootstrapped - coinCommunitiesChains is the set to read for what is booked TODAY. polygon is declared here with the polygon-wave cc PR (ChainId::Polygon) and is booked once that PR is live and its partitions are bootstrapped. arbitrum is declared here with the arbitrum-wave cc unit CC-1 (ChainId::Arbitrum) and is booked once CC-1 is live and its partitions are bootstrapped.",
        ordered: !1,
        slugs: [
          "solana",
          "ethereum",
          "base",
          "bsc",
          "robinhood",
          "hyperevm",
          "ink",
          "arc",
          "megaeth",
          "xlayer",
          "monad",
          "polygon",
          "arbitrum",
        ],
      },
      calloutMirror: {
        name: "calloutMirror",
        description:
          "Chains client-server mirrors trending system callouts into coin-communities for. client-server resolveCoinCommunitiesChain skips the mirror for coins on any other chain rather than sending a chain cc rejects as invalid_argument. Membership is left exactly as schemas#484 set it (TASK-4351 rule: a discrepancy gets a new set, never a membership move); the discrepancies against cc's real acceptance are recorded in coinCommunitiesChains and are two: (1) robinhood and hyperevm are accepted by cc and user callouts on them already flow (mobile resolveCalloutChainId), but trending system callouts for them are held out here pending the callouts owners' decision - admitting them is a one-line edit plus a client-server bump; (2) a chain declared here ahead of cc accepting it must stay pinned out on the client-server side (DEFERRED_SET_CHAINS.calloutMirror) until coinCommunitiesChains gains it - ink was, until cc#1249 shipped ChainId::Ink; arc is, until the cc Arc PR ships ChainId::Arc; megaeth is, until the cc MegaETH PR ships ChainId::MegaEth (dictionary id 9) - megaeth rides the cc MegaETH PR and must not be acted on before it is live; xlayer is, until the cc X Layer PR ships dictionary id 10, and likewise must not be acted on before it is live. polygon is, until the polygon-wave cc PR ships ChainId::Polygon, and likewise must not be acted on before it is live. arbitrum is, until arbitrum-wave CC-1 ships ChainId::Arbitrum, and likewise must not be acted on before it is live. starknet joins with the Starknet wave (W14 release 2): the reader is cc ListCoins{TRENDING, chains:[starknet:SN_MAIN]} behind uapiStarknetCallouts; client-server resolveCoinCommunitiesChain never mirrors a Starknet coin (D6: no Codex id, no multichain_family). near joins with the near-wave (W14 release 2): the readers are client-server callout.service system callouts behind uapiNearDiscovery and coin-communities system_callout_chain behind NEAR_FEEDS, so membership alone emits no NEAR system callout; rollback pulls the flag first, the membership revert second.",
        ordered: !1,
        slugs: [
          "solana",
          "ethereum",
          "base",
          "bsc",
          "ink",
          "arc",
          "megaeth",
          "xlayer",
          "monad",
          "polygon",
          "arbitrum",
          "near",
          "starknet",
        ],
      },
      coinCommunitiesChains: {
        name: "coinCommunitiesChains",
        description:
          "Chains coin-communities accepts on every RPC and books in its ledger TODAY: base_lib ChainId::is_valid_chain (the validated_chain_id gate on CreateCallout, GetPositionsByPairs and every chain_id field) and the ledger.chains / portfolio.chains seed rows carry exactly these members: the six verified 2026-09-05 (TASK-4351), ink since coin-communities-backend#1249 (ChainId::Ink, ledger V011 / portfolio V244, prod 2026-09-11), arc with the cc Arc PR (ChainId::Arc, V012 / V251), megaeth with the cc MegaETH PR (ChainId::MegaEth, dictionary id 9), xlayer with the cc X Layer PR (dictionary id 10). Added as the reference set for declared-vs-live discrepancies that are deliberately NOT resolved by moving members - calloutMirror omits robinhood/hyperevm cc accepts. Widening this set IS the cc + ledger-prod migration (new ChainId variant, seed rows, int2 surrogate ids) - never edit it ahead of that PR; this bump rides the Arc launch and must not release before cc's Arc PR is live; megaeth rides the cc MegaETH PR and xlayer the cc X Layer PR, and neither may be acted on before its PR is live (client-server keeps them pinned out via its DEFERRED set pins until then). polygon rides the polygon-wave cc PR (ChainId::Polygon) and may not be acted on before it is live (client-server keeps it pinned out via CS-0 until CS-2). arbitrum rides arbitrum-wave CC-1 (ChainId::Arbitrum) and may not be acted on before it is live (client-server keeps it pinned out via DEFERRED_SET_CHAINS, CS-0 until CS-2). starknet joins with the Starknet wave (W14 release 3): cc books starknet:SN_MAIN in its own Starknet lane (base_lib starknet, SK-C1/SK-C4a) and client-server isStoreLaneChain routes a felt to it behind uapiStarknetPositions; no Codex id, no ledger topic row (D6).",
        ordered: !1,
        slugs: [
          "solana",
          "ethereum",
          "base",
          "bsc",
          "robinhood",
          "hyperevm",
          "arc",
          "megaeth",
          "xlayer",
          "monad",
          "polygon",
          "arbitrum",
          "starknet",
        ],
      },
      enrichment: {
        name: "enrichment",
        description:
          "Chains coin-service's metadata enricher covers; an EVM member runs Etherscan/Codex/DexScreener/CoinGecko, a non-EVM member (ton) only the DexScreener and CoinGecko image tracks (a track no-datas where its vendor lacks coverage). Replaces coin-service chainToEVMChainID / EnrichmentSupportedChains default. Deliberately excludes solana. polygon joins with the polygon-wave (Codex 137, Etherscan v2 chainid 137, DexScreener polygon). arbitrum joins with the arbitrum-wave (Codex 42161, Etherscan v2 chainid 42161, DexScreener arbitrum).",
        ordered: !1,
        slugs: [
          "ethereum",
          "base",
          "bsc",
          "robinhood",
          "hyperevm",
          "ink",
          "arc",
          "megaeth",
          "xlayer",
          "monad",
          "ton",
          "polygon",
          "arbitrum",
        ],
      },
      evmReadPriority: {
        name: "evmReadPriority",
        description:
          "Canonical-deployment selection order when one mint is deployed on several EVM chains: first member wins. Replaces coin-service readservice EVMChainPriority and its SQL CASE ladder twins. The ORDER is the policy - do not reorder without the coin-service owners. polygon joins last with the polygon-wave. arbitrum joins last with the arbitrum-wave.",
        ordered: !0,
        slugs: [
          "ethereum",
          "base",
          "bsc",
          "robinhood",
          "hyperevm",
          "ink",
          "arc",
          "megaeth",
          "xlayer",
          "monad",
          "polygon",
          "arbitrum",
        ],
      },
      pnlEvm: {
        name: "pnlEvm",
        description:
          "EVM chains the PnL endpoints serve. Replaces profile-service SUPPORTED_EVM_CHAINS, which was derived from the quote-token map so a chain with no quote-token classification is rejected instead of served unfiltered rows. That gate is now this explicit set: membership requires the chain's quote set to be populated. monad joins with the monad-wave now its tokens[] carries the quote set, held in client-server DEFERRED_SET_CHAINS until CS-2. Not merged with portfolioNativeBalances or dexscreenerTrending although the three coincided at seeding (TASK-4351): they already diverge on arc, which has quote tokens (here) but no dexscreenerSlug and no collapsible native row. Each gate is a different prerequisite, so they stay three sets. polygon joins with the polygon-wave now its tokens[] carries the quote set (WPOL, USDC, USDT0, USDC.e), held by CS-0/PS-0 until CS-2/PS-2. arbitrum joins with the arbitrum-wave (SCH-1) now its tokens[] carries the quote set (WETH, USDC, USDT0, USDC.e), held in client-server DEFERRED_SET_CHAINS (CS-0) and profile-service DEFERRED_REGISTRY_CHAINS (PS-0) until CS-2/PS-2.",
        ordered: !1,
        slugs: [
          "ethereum",
          "base",
          "bsc",
          "robinhood",
          "hyperevm",
          "ink",
          "arc",
          "megaeth",
          "xlayer",
          "monad",
          "polygon",
          "arbitrum",
        ],
      },
      portfolioEvm: {
        name: "portfolioEvm",
        description:
          "EVM chains the linked-wallet portfolio aggregates under chain=all. Replaces profile-service MULTI_CHAIN_EVM_CHAINS / EVM_CHAIN_NETWORK_IDS and client-server USER_PORTFOLIO_EVM_NETWORK_IDS. monad was dropped 2026-08-31 (profile-service#805, entropy E205) because every monad arm of the fan-out returned empty per wallet in production - the absence of app-traded monad positions, not a vendor gap. It is re-admitted with the monad-wave, which makes monad app-traded, held in client-server DEFERRED_SET_CHAINS until CS-2. polygon joins with the polygon-wave, held by CS-0/PS-0 until CS-2/PS-2. arbitrum joins with the arbitrum-wave (SCH-1), held in client-server DEFERRED_SET_CHAINS (CS-0) and profile-service DEFERRED_REGISTRY_CHAINS (PS-0) until CS-2/PS-2.",
        ordered: !1,
        slugs: [
          "ethereum",
          "bsc",
          "base",
          "robinhood",
          "hyperevm",
          "ink",
          "arc",
          "megaeth",
          "xlayer",
          "monad",
          "polygon",
          "arbitrum",
        ],
      },
      portfolioNativeBalances: {
        name: "portfolioNativeBalances",
        description:
          "Chains whose native gas balance the open portfolio serves as a position of its own. Replaces client-server USER_PORTFOLIO_NATIVE_NETWORK_IDS; monad joins with the monad-wave, held in client-server DEFERRED_SET_CHAINS until CS-2. arc was held out until a consumer could collapse a native row against its mirror: this set also derives client-server USER_PORTFOLIO_CASH_TOKENS, whose members each get their own balanceOf next to the chain's getEthBalance, and on Arc those two reads return THE SAME balance (USDC 0x3600 is the ERC-20 face of the native asset, 6-dec against 18-dec wei), so a member row would double the wallet's cash and its position count. Every other chain's wrapped native is a distinct opt-in balance. client-server's Arc launch PR drops the mirror from the cash rows (nativeMirrorAddressOf) and prices the native row at $1 (the gas asset is a dollar), so arc is admitted; that PR must be live before a bump carrying this set lands there. polygon joins with the polygon-wave (native POL, WPOL a distinct opt-in balance), held by CS-0/PS-0 until CS-2/PS-2. arbitrum joins with the arbitrum-wave (SCH-1; native ETH, WETH a distinct opt-in balance), held in client-server DEFERRED_SET_CHAINS (CS-0) and profile-service DEFERRED_REGISTRY_CHAINS (PS-0) until CS-2/PS-2.",
        ordered: !1,
        slugs: [
          "ethereum",
          "bsc",
          "base",
          "robinhood",
          "hyperevm",
          "ink",
          "arc",
          "megaeth",
          "xlayer",
          "monad",
          "polygon",
          "arbitrum",
        ],
      },
      dexscreenerTrending: {
        name: "dexscreenerTrending",
        description:
          "Chains the DexScreener trending pipeline polls and stamps into dex:trending. Replaces recommendations-server infra CHAINS, its DEXSCREENER_TRENDING_CHAINS mirror, and admin-service's producer list - the producer and both consumers must agree, which is exactly why this is one set. Every member must carry a dexscreenerSlug. polygon joined at polygon-wave SCH-2 (v6.228.0) after CS-2, behind one keyed DEXSCREENER_TRENDING_URL probe. arbitrum carries dexscreenerSlug arbitrum but is deliberately absent: it joins at arbitrum-wave SCH-2 after CS-2, behind one keyed DEXSCREENER_TRENDING_URL probe once recommendations-server's infra CHAINS literal moves with it (REC-2).",
        ordered: !1,
        slugs: [
          "ethereum",
          "base",
          "bsc",
          "robinhood",
          "hyperevm",
          "ink",
          "megaeth",
          "monad",
          "polygon",
        ],
      },
      injectedCoins: {
        name: "injectedCoins",
        description:
          "Chains an injected-coins list member may name (coin-communities admin panel validate_injected_chain writes it; recommendations-server ingestion INJECTED_COINS_SUPPORTED_CHAINS syncs it via Codex filterTokens, so every member must carry a codexNetworkId). Replaces the S3 mints file's INJECTED_COINS_SUPPORTED_CHAINS and its nonstandard hyperliquid spelling. Tracks the chains the app can trade, not Codex coverage (TASK-4351): monad joins with the monad-wave, which makes it app-traded; arc joins with the 2026-09-16 launch bump alongside feed (Codex listing 5042 is still pending; until it does, the recommendations-server sync finds no injected arc coins, which is a no-op, not a failure). polygon joins with the polygon-wave (Codex 137). arbitrum joins with the arbitrum-wave (Codex 42161).",
        ordered: !1,
        slugs: [
          "solana",
          "ethereum",
          "base",
          "bsc",
          "hyperevm",
          "robinhood",
          "ink",
          "arc",
          "megaeth",
          "xlayer",
          "monad",
          "polygon",
          "arbitrum",
        ],
      },
      goplusUnsupported: {
        name: "goplusUnsupported",
        description:
          "Registry chains GoPlus's token_security API does not cover: screening skips the upstream call outright instead of paying a discovery miss per pod. Vendor capability, re-verified live against api.gopluslabs.io/api/v1/supported_chains?name=token_security on 2026-09-05 (43 chains): 999 and 5042 confirmed absent. Membership is left exactly as seeded (TASK-4351 rule: a discrepancy gets a new set, never a membership move): ink (57073) is ALSO absent from GoPlus yet sits in neither this set nor goplusSupported - that gap is recorded in goplusSupported and closes when this set's owners admit ink. Consumers: client-server's STATICALLY_UNSUPPORTED_CHAIN_IDS retired with its direct GoPlus integration (TASK-4274); no code reads this set today. polygon (137) is GoPlus-listed and sits in goplusSupported, not here. arbitrum (42161) is GoPlus-listed (supported_chains, checked 2026-10-22) and sits in goplusSupported, not here.",
        ordered: !1,
        slugs: ["hyperevm", "arc", "megaeth"],
      },
      goplusSupported: {
        name: "goplusSupported",
        description:
          "Registry chains GoPlus's token_security API covers, per the live supported_chains list fetched 2026-09-05 (TASK-4351): 1, 56, 8453, 143 and 4663 listed; 196 (xlayer) listed by api.gopluslabs.io/api/v1/supported_chains?name=token_security as X Layer Mainnet, checked 2026-10-11. Byte-identical to coin-details-api's hand-kept CHAIN_TO_GOPLUS once xlayer-wave CDA-1 adds 196 there (apps/api/src/providers/goplus.ts), the org's only GoPlus caller since TASK-4274 - the copy this set exists to replace on that repo's next adoption. The complement of goplusUnsupported plus ink: ink is covered by neither vendor list nor either set, recorded here rather than by moving it into goplusUnsupported. solana is deliberately absent - GoPlus serves it from a different endpoint with a different result shape. 137 (polygon) is listed by the same supported_chains endpoint, checked 2026-10-16, and joins with the polygon-wave. 42161 (arbitrum) is listed by the same supported_chains endpoint, checked 2026-10-22, and joins with the arbitrum-wave.",
        ordered: !1,
        slugs: [
          "ethereum",
          "bsc",
          "base",
          "monad",
          "robinhood",
          "xlayer",
          "polygon",
          "arbitrum",
        ],
      },
      honeypotExempt: {
        name: "honeypotExempt",
        description:
          "Chains whose coins bypass honeypot screening and downranking (recommendations-server HoneypotDownranker and FilterStage, ranking_stage HONEYPOT_EXEMPT_CHAINS): their launchpads are vetted venues where the honeypot heuristics only produce false positives. Reviewed 2026-09-05 (TASK-4351): the screener honeypot filtering TASK-4334 shipped lives in advanced-indexer-aws and does not read this set, so it neither narrows nor widens it; membership is the ranking owners' (recsys) call and stays robinhood-only until they say otherwise. polygon is deliberately absent: it has no launchpad, so its coins stay honeypot-screened. arbitrum is deliberately absent: its Uniswap CCA launchpad venue is not a vetted venue here - CCA graduates are honeypot-checked like any V4 coin and nothing exempts them, so its coins stay honeypot-screened.",
        ordered: !1,
        slugs: ["robinhood"],
      },
      evmDownrankExempt: {
        name: "evmDownrankExempt",
        description:
          "EVM chains exempt from the movers 10x EVM downrank (recommendations-server EvmDownranker, ranking_stage EVM_DOWNRANK_EXEMPT_CHAINS): coins on these chains rank at full score while other EVM coins are damped pending stronger scam signals. hyperevm was added on the 2026-08-26 #core decision to treat HyperEVM like Robinhood; in recs its exemption additionally holds only while the moversShowHyperevmCoins kill switch is on, so the set states the policy and the flag stays the rollout gate (TASK-4351, reviewed 2026-09-05). polygon is deliberately absent: its coins take the standard EVM downrank. arbitrum is deliberately absent: its coins take the standard EVM downrank.",
        ordered: !1,
        slugs: ["robinhood", "hyperevm"],
      },
    }),
    (n.TOKEN_SET_NAMES = [
      "svmQuoteCash",
      "svmUsdStables",
      "svmUsdQuotes",
      "svmValueAnchorStables",
      "svmExoticQuotes",
      "svmAbsurdExempt",
      "svmSolSpellings",
      "evmQuoteCash",
    ]),
    (n.TOKEN_SETS = {
      svmQuoteCash: {
        name: "svmQuoteCash",
        description:
          "The SVM quote-side cash a position ledger skips - the profile-service#550 producer/reader position-exclusion contract. profile-service POSITION_EXCLUDED_QUOTE_MINTS, coin-communities SVM_QUOTE_MINTS (both lockstep copies) and unified-svm-parser READER_EXCLUDED_POSITION_MINTS carry exactly these six. Deliberately excludes BONK (a quote whose positions are real) and the native/Helius SOL sentinels: the exported READER_EXCLUDED_POSITION_MINTS array carries WSOL as its only SOL spelling, though the parser's corrected_quote_class predicate also matches the System Program sentinel via is_sol_mint - only the Helius trailing-1 spelling sits outside the reader contract entirely. Recognizer work wants svmSolSpellings, not this set.",
        ordered: !1,
        members: [
          {
            chain: "solana",
            address: "So11111111111111111111111111111111111111112",
          },
          {
            chain: "solana",
            address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          },
          {
            chain: "solana",
            address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
          },
          {
            chain: "solana",
            address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          },
          {
            chain: "solana",
            address: "USD1ttGY1N17NEEHLmELoaybftRBUSErhqYiQzvEmuB",
          },
          {
            chain: "solana",
            address: "CASHx9KJUStyftLFWGvEVf59SGeG9sh5FfcnZMVPCASH",
          },
        ],
      },
      svmUsdStables: {
        name: "svmUsdStables",
        description:
          "SVM mints whose quote units read as USD 1:1 - the sole gate for the quote-units==USD market-cap shortcut (coin-service UsdStablecoinMints, unified-event-publisher STABLECOIN_MINTS). CASH is deliberately absent: membership here routes a coin-service create around its exotic-quote refusal, so CASH stays out until coin-service's owners admit it. The flag predicate (quote && stablecoin over solana tokens[]) is NOT a drop-in for this set - it matches five mints including CASH - so consumers of this policy must read the named set. svmUsdQuotes is this set minus USDT.",
        ordered: !1,
        members: [
          {
            chain: "solana",
            address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          },
          {
            chain: "solana",
            address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
          },
          {
            chain: "solana",
            address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          },
          {
            chain: "solana",
            address: "USD1ttGY1N17NEEHLmELoaybftRBUSErhqYiQzvEmuB",
          },
        ],
      },
      svmUsdQuotes: {
        name: "svmUsdQuotes",
        description:
          "SVM quote mints whose pool reserves are USD-denominated in the pricing lane (profile-service USDC_QUOTE_MINTS, coin-communities USDC_QUOTE_MINTS). svmUsdStables minus USDT: the USDT omission is the pricing lane's shipped behavior - a USDT-quoted pool prices SOL-quoted today - so unifying is a money-path decision for those owners, not an adoption side effect.",
        ordered: !1,
        members: [
          {
            chain: "solana",
            address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          },
          {
            chain: "solana",
            address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
          },
          {
            chain: "solana",
            address: "USD1ttGY1N17NEEHLmELoaybftRBUSErhqYiQzvEmuB",
          },
        ],
      },
      svmValueAnchorStables: {
        name: "svmValueAnchorStables",
        description:
          "unified-svm-parser's N4 value-anchor whitelist (IDX-883) in ladder order - USDC, then USDT, then USD1: the FIRST member appearing among a route's candidates anchors, so the order is the policy. Deliberately narrower than svmUsdStables and svmQuoteCash: CASH and devnet USDC are excluded per the IDX-883 scope.",
        ordered: !0,
        members: [
          {
            chain: "solana",
            address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          },
          {
            chain: "solana",
            address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          },
          {
            chain: "solana",
            address: "USD1ttGY1N17NEEHLmELoaybftRBUSErhqYiQzvEmuB",
          },
        ],
      },
      svmExoticQuotes: {
        name: "svmExoticQuotes",
        description:
          "The LaunchLab T22 human-admitted exotic quote cohort. Source chain today is three hops of hand copies - Redis HSET admission, unified-indexer shared-lib quote_mints.rs REGISTRY_QUOTE_MINTS, coin-communities REGISTRY_QUOTE_MINTS mirror - which this set retires. Membership makes an otherwise-unknown quote side priceable from the producer's own USD mark; members are never USD-1:1 (EURC is EUR-pegged) and never position-skipped, which is why their tokens[] rows carry quote=false.",
        ordered: !1,
        members: [
          {
            chain: "solana",
            address: "XsoCS1TfEyfFhfvj8EtZ528L3CaKBDBRqRapnBbDF2W",
          },
          {
            chain: "solana",
            address: "Xsc9qvGR1efVDFGLrVsmkzv3qi45LTBjeUKSPmx9qEh",
          },
          {
            chain: "solana",
            address: "XsueG8BtpquVJX9LVLLEGuViXUungE6WmK5YZ3p3bd1",
          },
          {
            chain: "solana",
            address: "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN",
          },
          {
            chain: "solana",
            address: "HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr",
          },
        ],
      },
      svmAbsurdExempt: {
        name: "svmAbsurdExempt",
        description:
          "Dense-series majors exempt from the absurd-mark guard arms (coin-communities: value, depth, exec; profile-service additionally its two lu-backed arms): profile-service MARK_ABSURD_VALUE_EXEMPT and coin-communities is_absurd_exempt, both composed as WSOL + svmUsdQuotes and byte-identical today. USDT and CASH are deliberately absent - they stay absurdity-guarded.",
        ordered: !1,
        members: [
          {
            chain: "solana",
            address: "So11111111111111111111111111111111111111112",
          },
          {
            chain: "solana",
            address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          },
          {
            chain: "solana",
            address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
          },
          {
            chain: "solana",
            address: "USD1ttGY1N17NEEHLmELoaybftRBUSErhqYiQzvEmuB",
          },
        ],
      },
      svmSolSpellings: {
        name: "svmSolSpellings",
        description:
          "Every base58 spelling that means SOL on the wire: WSOL, the System Program sentinel, and Helius's trailing-1 native representation. The is-this-SOL recognizer - coin-communities' Native quote arm and unified-indexer carry all three, coin-service SolQuoteMints and client-server isSolQuoteMint carry two, profile-service one, so a Helius-spelled SOL quote is Native in cc, an exotic hard-error in coin-service and served as USD by client-server (TASK-4353 drift 7; adoption converges all of them on three). coin-communities even declares NATIVE_SOL_MINT twice with different values - address.rs:15 holds the Helius spelling, quote.rs:5 the System Program id. NOT a position-exclusion set: svmQuoteCash deliberately carries only WSOL.",
        ordered: !1,
        members: [
          {
            chain: "solana",
            address: "So11111111111111111111111111111111111111112",
          },
          { chain: "solana", address: "11111111111111111111111111111111" },
          {
            chain: "solana",
            address: "So11111111111111111111111111111111111111111",
          },
        ],
      },
      evmQuoteCash: {
        name: "evmQuoteCash",
        description:
          "EVM quote/cash - the stables and wrapped natives a position ledger skips and the open portfolio serves as null-PnL cash rows. Forty-two rows: four Arbitrum rows (WETH, USDC, USDT0, USDC.e - eep-core quote_tokens(42161), added with the Arbitrum chain; DAI is transfer-excluded and never a quote and USDe is relayFunding only, both deliberately absent), plus four Polygon rows (WPOL, USDC, USDT0, USDC.e - eep-core quote_tokens(137), added with the Polygon chain; DAI is transfer-excluded and never a quote (polygon D6) and pUSD is relayFunding only, both deliberately absent), plus four Monad rows (WMON, USDC, USDT0, AUSD - eep-core quote_tokens(), added with the Monad chain; mUSD is relayFunding only and deliberately absent, like Ethereum mUSD), plus four X Layer rows (legacy WOKB, USDG, USDT0, native USDC - eep-core quote_tokens(), added with the X Layer chain; bridged USDC and legacy USDT are deliberately absent), plus three MegaETH rows (WETH, USDm, USDT0 - eep-core quote set, added 2026-10-06), plus the Arc row (USDC 0x3600, the chain's sole quote and the ERC-20 face of its native gas asset) carries the position-skip duty ONLY - a routed Arc swap books its hops in USDC and none of them is a position - and must never be served as a cash row, because the chain's native balance IS that same USDC and a portfolio serving both shows the wallet's cash twice; arc is held out of portfolioNativeBalances for exactly that reason, plus six Ink rows (WETH, USDT0, USDC.e, USDC, USDG, oUSDT - eep-core INK_QUOTES, added 2026-09-02 together with the unified-indexer, coin-communities and profile-service lockstep copies) plus the 15-row lockstep set (coin-communities EVM_QUOTE_TOKENS = profile-service evm-ledger = client-server USER_PORTFOLIO_CASH_TOKENS, re-verified aligned 2026-08-31 for TASK-4363; coin-communities' alerts_stream CAIP-2 copy had already drifted to 11) plus Base USDT, which unified-indexer and eep already classify as quote and the TASK-4320 reader adoptions admit - coin-communities' writer still refuses it pending frozen-row cleanup (TASK-4352) and keeps a documented narrower read until then. Deliberately excludes BSC XAUt (quote-side for valuation via the xaut_price feed, but positions in it are real) and BSC USDe (funding-only on chain 56; quote cash on 999 only - one address, two classifications, the reason this set is keyed by chain AND address).",
        ordered: !1,
        members: [
          {
            chain: "ethereum",
            address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          },
          {
            chain: "ethereum",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          },
          {
            chain: "ethereum",
            address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          },
          {
            chain: "base",
            address: "0x4200000000000000000000000000000000000006",
          },
          {
            chain: "base",
            address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
          },
          {
            chain: "base",
            address: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
          },
          {
            chain: "bsc",
            address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          },
          {
            chain: "bsc",
            address: "0x55d398326f99059ff775485246999027b3197955",
          },
          {
            chain: "bsc",
            address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
          },
          {
            chain: "bsc",
            address: "0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d",
          },
          {
            chain: "robinhood",
            address: "0x0bd7d308f8e1639fab988df18a8011f41eacad73",
          },
          {
            chain: "robinhood",
            address: "0x5fc5360d0400a0fd4f2af552add042d716f1d168",
          },
          {
            chain: "hyperevm",
            address: "0x5555555555555555555555555555555555555555",
          },
          {
            chain: "hyperevm",
            address: "0xb8ce59fc3717ada4c02eadf9682a9e934f625ebb",
          },
          {
            chain: "hyperevm",
            address: "0xb88339cb7199b77e23db6e890353e22632ba630f",
          },
          {
            chain: "hyperevm",
            address: "0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34",
          },
          {
            chain: "ink",
            address: "0x4200000000000000000000000000000000000006",
          },
          {
            chain: "ink",
            address: "0x0200c29006150606b650577bbe7b6248f58470c1",
          },
          {
            chain: "ink",
            address: "0xf1815bd50389c46847f0bda824ec8da914045d14",
          },
          {
            chain: "ink",
            address: "0x2d270e6886d130d724215a266106e6832161eaed",
          },
          {
            chain: "ink",
            address: "0xe343167631d89b6ffc58b88d6b7fb0228795491d",
          },
          {
            chain: "ink",
            address: "0x1217bfe6c773eec6cc4a38b5dc45b92292b6e189",
          },
          {
            chain: "arc",
            address: "0x3600000000000000000000000000000000000000",
          },
          {
            chain: "megaeth",
            address: "0x4200000000000000000000000000000000000006",
          },
          {
            chain: "megaeth",
            address: "0xfafddbb3fc7688494971a79cc65dca3ef82079e7",
          },
          {
            chain: "megaeth",
            address: "0xb8ce59fc3717ada4c02eadf9682a9e934f625ebb",
          },
          {
            chain: "xlayer",
            address: "0xe538905cf8410324e03a5a23c1c177a474d59b2b",
          },
          {
            chain: "xlayer",
            address: "0x4ae46a509f6b1d9056937ba4500cb143933d2dc8",
          },
          {
            chain: "xlayer",
            address: "0x779ded0c9e1022225f8e0630b35a9b54be713736",
          },
          {
            chain: "xlayer",
            address: "0xb6ceceab302e2e4948951ee7843fc24e92933061",
          },
          {
            chain: "monad",
            address: "0x3bd359c1119da7da1d913d1c4d2b7c461115433a",
          },
          {
            chain: "monad",
            address: "0x754704bc059f8c67012fed69bc8a327a5aafb603",
          },
          {
            chain: "monad",
            address: "0xe7cd86e13ac4309349f30b3435a9d337750fc82d",
          },
          {
            chain: "monad",
            address: "0x00000000efe302beaa2b3e6e1b18d08d69a9012a",
          },
          {
            chain: "polygon",
            address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
          },
          {
            chain: "polygon",
            address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
          },
          {
            chain: "polygon",
            address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
          },
          {
            chain: "polygon",
            address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
          },
          {
            chain: "arbitrum",
            address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
          },
          {
            chain: "arbitrum",
            address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
          },
          {
            chain: "arbitrum",
            address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
          },
          {
            chain: "arbitrum",
            address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
          },
        ],
      },
    }),
    (n.WALLET_SET_NAMES = ["mayhemAgents", "boostAuthorities"]),
    (n.WALLET_SETS = {
      mayhemAgents: {
        name: "mayhemAgents",
        description:
          "Wallets that ARE the Mayhem engine, not humans - ranking, holder and volume surfaces exclude their activity while keeping their market-cap observations. Today one wallet, hand-spelled in seven recommendations-server copies (TS const, four Flink SQL literals, the top-holders lambda, a dead Java const), unified-event-publisher MAYHEM_USER_ADDRESS and a profile-service BLACKLISTED_WALLETS member, plus mobile and web copies. Rotating it means updating this set AND the Flink SQL literals no package import can reach (feature-flink-app's FeatureSqlCompileTest pins the literal text).",
        members: [
          {
            chain: "solana",
            address: "BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s",
          },
        ],
      },
      boostAuthorities: {
        name: "boostAuthorities",
        description:
          "The boost lane's authority wallets (unified-event-publisher BOOST_USER_ADDRESSES, the only declaration in the org): 33MxwC33Eqgmon152hBcpEYuXUmf2kaK1P74wVz3ry8k is the DEVNET authority and HTVZVEQMBsNanubDPTs3CxDAEGNFQHJY8c1441iy2S5r the MAINNET one - UEP indexes its copy positionally, so the roles are spelled here by address, never by member order.",
        members: [
          {
            chain: "solana",
            address: "33MxwC33Eqgmon152hBcpEYuXUmf2kaK1P74wVz3ry8k",
          },
          {
            chain: "solana",
            address: "HTVZVEQMBsNanubDPTs3CxDAEGNFQHJY8c1441iy2S5r",
          },
        ],
      },
    }),
    (n.PROGRAM_KINDS = ["launchpad", "amm", "unattributed"]),
    (n.PROGRAM_SLUGS = [
      "pump",
      "pump_amm",
      "trench",
      "raydium_launchpad",
      "meteora_dbc",
      "loadout",
      "stonkfun",
      "raydium_cpmm",
      "raydium_clmm",
      "raydium_v4_amm",
      "meteora_damm_v2",
      "meteora_dlmm",
      "meteora_damm_v1",
      "orca_whirlpool",
      "non_launchpad",
    ]),
    (n.PROGRAMS = [
      {
        slug: "pump",
        chain: "solana",
        programId: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
        kind: "launchpad",
        notes:
          "pump bonding curve. A legacy row with no program at all reads as this one (coin-service createcoin.go globalParamsPrograms).",
      },
      {
        slug: "pump_amm",
        chain: "solana",
        programId: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
        kind: "amm",
        notes:
          "PumpSwap, the venue pump coins migrate to. Not a birth program: no creation path stamps it on Coin.program (2026-09-24 sweep), so it is in no launchpad set.",
      },
      {
        slug: "trench",
        chain: "solana",
        programId: "8ZoPDsvLWXthQaZz6aJJEWNFBZKk2ePuygi6LHT7F7Hh",
        kind: "launchpad",
        notes:
          "trench bonding curve (spec 009): coins stay hidden until bonded, then coin-service reveals them.",
      },
      {
        slug: "raydium_launchpad",
        chain: "solana",
        programId: "LanMV9sAd7wArD4vJFi2qDdfnVhFxYSUg6eADduJ3uj",
        kind: "launchpad",
        notes: "Raydium LaunchLab.",
      },
      {
        slug: "meteora_dbc",
        chain: "solana",
        programId: "dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN",
        kind: "launchpad",
        notes: "Meteora Dynamic Bonding Curve.",
      },
      {
        slug: "loadout",
        chain: "solana",
        programId: "8nPyghXuy35JwxZ8ANAzxMXKruibh6B3js4QMYBRFadx",
        kind: "launchpad",
        notes:
          "Loadout (app.loadout.xyz) game-token curve; graduates to Meteora DAMM v2 via BdiTJWvRCgrzni5p5oSaH1YFjmDiyqY2SwG6rnetTR6X.",
      },
      {
        slug: "stonkfun",
        chain: "solana",
        programId: null,
        kind: "launchpad",
        notes:
          "stonk.fun, a LaunchLab platform with no program of its own: coin-service stamps it as both Coin.program and Coin.platform on stonk creates; the three hand-healed 2026-09-06 rows carry program raydium_cpmm with platform stonkfun instead.",
      },
      {
        slug: "raydium_cpmm",
        chain: "solana",
        programId: "CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C",
        kind: "amm",
        notes:
          "Raydium CPMM. Coin.program for a coin born straight into a CPMM pool (kids.fun via unified-event-publisher #438) and for the SHARTCOIN / stonk hand-heals.",
      },
      {
        slug: "raydium_clmm",
        chain: "solana",
        programId: "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK",
        kind: "amm",
        notes: null,
      },
      {
        slug: "raydium_v4_amm",
        chain: "solana",
        programId: "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8",
        kind: "amm",
        notes:
          "Raydium AMM v4 under unified-event-publisher's Program spelling; the multichain Protocol value is raydium_amm_v4.",
      },
      {
        slug: "meteora_damm_v2",
        chain: "solana",
        programId: "cpamdpZCGKUy5JxQXB4dcpGPiikHawvSWAd6mEn1sGG",
        kind: "amm",
        notes: null,
      },
      {
        slug: "meteora_dlmm",
        chain: "solana",
        programId: "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo",
        kind: "amm",
        notes: null,
      },
      {
        slug: "meteora_damm_v1",
        chain: "solana",
        programId: "Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB",
        kind: "amm",
        notes: null,
      },
      {
        slug: "orca_whirlpool",
        chain: "solana",
        programId: "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc",
        kind: "amm",
        notes: null,
      },
      {
        slug: "non_launchpad",
        chain: "solana",
        programId: null,
        kind: "unattributed",
        notes:
          "coin-service's Coin.program for a coin discovered from a bare pool init with no launchpad behind it (the orca_pool_init lane, off since 2026-05-26); the venue is in Coin.platform.",
      },
    ]),
    (n.PLATFORM_SLUGS = [
      "kids_fun",
      "stonkfun",
      "orca_whirlpool",
      "dbc",
      "hooked",
    ]),
    (n.PLATFORMS = [
      {
        slug: "kids_fun",
        chain: "solana",
        venue: "raydium_cpmm",
        programId: "BLiaZWNQoPm4mG4cXNm4sXifFqs1Xmxx12qD9T4Y5NeN",
        ammConfig: "ESLj2Rzmvn3RhDo4Z18hY1wYmGyC9xM4ZtRXhvoFkDAi",
        notes:
          "kids.fun: one launcher ix CPIs a Raydium CPMM initialize under this config, locks every LP token in Lockr and revokes the mint - no curve, no migration. unified-event-publisher constants/kidsfun.rs keys the direct-CPMM matcher on programId and stamps this slug as Coin.platform.",
      },
      {
        slug: "stonkfun",
        chain: "solana",
        venue: "raydium_launchpad",
        programId: null,
        ammConfig: null,
        notes:
          "stonk.fun's LaunchLab platform; coin-service stamps it as Coin.platform (and as Coin.program, see programs[]).",
      },
      {
        slug: "orca_whirlpool",
        chain: "solana",
        venue: "orca_whirlpool",
        programId: null,
        ammConfig: null,
        notes:
          "Coin.platform coin-service stamps on an orca_pool_init discovery (Coin.program non_launchpad).",
      },
      {
        slug: "dbc",
        chain: "solana",
        venue: "meteora_dbc",
        programId: null,
        ammConfig: null,
        notes:
          "unified-event-publisher DBC_UNATTRIBUTED_PLATFORM (constants/meteora.rs): a Meteora DBC launch that matched no attribution rung (token authority, creator, config, fee claimer), stamped as Coin.platform since the dbc pass-through (UEP #483, 2026-09-29). A label any self-config DBC launch obtains, never a launcher.",
      },
      {
        slug: "hooked",
        chain: "solana",
        venue: "meteora_dbc",
        programId: null,
        ammConfig: null,
        notes:
          "hookedpad.com Meteora DBC transfer-hook launches (DBC v0.2.0 initialize_virtual_pool_with_token2022_transfer_hook), attributed by config fee_claimer 2oXT6oMgNPfToahWG48QTBPWS9UJ8a7TSSeEoeoSLMGt (unified-event-publisher HOOKED_FEE_CLAIMER) and stamped as Coin.platform. A DBC fee-claimer rung label outside discoveryHeldLaunchers (same class as the unified-event-publisher basedpad rung).",
      },
    ]),
    (n.PROGRAM_SET_NAMES = ["launchpadPrograms"]),
    (n.PROGRAM_SETS = {
      launchpadPrograms: {
        name: "launchpadPrograms",
        description:
          "Coin.program values born on a launchpad - a bonding curve or a platform creator flow - the discovery boards' admission rule since the untracked-launcher intake (2026-09-24): a coin whose program is outside this set stays off boards, trending and movers however it trades (its verdict decides the coin page and search). SVM members are programs.json slugs; EVM members are lowercased multichain Protocol values, copied verbatim from coin-service launchpadProtocols (internal/multichain/coinindexer/indexer.go), which pins here. pump_amm is deliberately absent: no creation path stamps it. An absent or empty program is a legacy pump row and resolves as pump. nadfun joined with the Monad wave (PROTOCOL_NADFUN = 169, nad.fun curve coins); coin-service launchpadProtocols gains it in its own bump. Consumers: coin-communities-backend boards, advanced-indexer-aws boards, recommendations-server ranking, coin-service.",
        members: [
          "pump",
          "trench",
          "raydium_launchpad",
          "meteora_dbc",
          "stonkfun",
          "four_meme",
          "robinhood_launchpad",
          "rooket",
          "liquid_launch",
          "flap",
          "pons",
          "dyorpump",
          "lotus_launchpad",
          "warp_launchpad",
          "stock_factory",
          "open_four",
          "o1_launchpad",
          "tidepool",
          "calamari",
          "sharc_launchpad",
          "inkypump",
          "tolly_launchpad",
          "argus_launchpad",
          "lift_launchpad",
          "minara_launchpad",
          "uniswap_liquidity_launcher",
          "uniswap_cca",
          "doppler",
          "kumbaya_fire",
          "abyss_launchpad",
          "ignix",
          "loadout",
          "nadfun",
        ],
      },
    }),
    (n.PLATFORM_SET_NAMES = ["discoveryHeldLaunchers"]),
    (n.PLATFORM_SETS = {
      discoveryHeldLaunchers: {
        name: "discoveryHeldLaunchers",
        description:
          'Coin.platform values whose coins are born discovery-held: token-trust stamps SECURITY_REASON_UNVERIFIED_LAUNCHER at creation (coin-details-api, the sole writer; coin-service keeps the insert-only default) and the coin stays off discovery until a lift signal clears it, never by time. A positive key on purpose - keying on "not a launchpad" would hold every null-platform pool-init coin (SHARTCOIN, CYBERLEEK, the stonk hand-heals). dbc (every Meteora DBC launch on no known launchpad, UEP #483) is held because the label is permissionless and two of three sampled unattributed creators were create-and-rug factories (2026-09-29). Consumers: coin-details-api token-trust, coin-service, hermes.',
        members: ["kids_fun", "dbc"],
      },
    }));
};
