// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    i = "hlcore:mainnet",
    r = "near:mainnet";
  class a extends Error {
    name = "StreamTopicError";
  }
  let n = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
    l = /^0x[0-9a-f]{40}$/,
    o = /^hlcore:(mainnet|testnet)$/,
    s = /^[A-Za-z0-9:._-]{1,32}$/,
    d = "ton:-239",
    c = /^EQ[A-Za-z0-9_-]{46}$/,
    u = "starknet:SN_MAIN",
    p = /^0x[0-9a-f]{64}$/,
    m = /^(([a-z0-9]+[-_])*[a-z0-9]+\.)*([a-z0-9]+[-_])*[a-z0-9]+$/,
    x = (e) => e.length >= 2 && e.length <= 64 && m.test(e);
  e.s([
    "HLCORE_MAINNET_CHAIN_ID",
    0,
    i,
    "NEAR_MAINNET_CHAIN_ID",
    0,
    r,
    "SOLANA_CHAIN_ID",
    0,
    t,
    "STARKNET_FELT_ADDRESS",
    0,
    p,
    "STARKNET_MAINNET_CHAIN_ID",
    0,
    u,
    "StreamTopicError",
    0,
    a,
    "TON_FRIENDLY_ADDRESS",
    0,
    c,
    "TON_MAINNET_CHAIN_ID",
    0,
    d,
    "chainIdFor",
    0,
    (e) =>
      "solana" === e
        ? t
        : "hlcore" === e
          ? i
          : "near" === e
            ? r
            : `eip155:${e.evmChainId}`,
    "coinTopic",
    0,
    (e, t) => {
      if (e.startsWith("hlcore:")) {
        if (!o.test(e)) throw new a(`unsupported chain id: ${e}`);
        if (!s.test(t)) throw new a(`not an hlcore coin key: ${t}`);
        return `coin/${e}/${t}`;
      }
      if (e.startsWith("eip155:")) {
        let i = t.toLowerCase();
        if (!l.test(i)) throw new a(`not an eip155 address: ${t}`);
        return `coin/${e}/${i}`;
      }
      if (e.startsWith("solana:")) {
        if (!n.test(t)) throw new a(`not a solana address: ${t}`);
        return `coin/${e}/${t}`;
      }
      if (e.startsWith("ton:")) {
        if (e !== d) throw new a(`unsupported chain id: ${e}`);
        if (!c.test(t)) throw new a(`not a ton friendly address: ${t}`);
        return `coin/${e}/${t}`;
      }
      if (e.startsWith("starknet:")) {
        if (e !== u) throw new a(`unsupported chain id: ${e}`);
        if (!p.test(t)) throw new a(`not a starknet felt address: ${t}`);
        return `coin/${e}/${t}`;
      }
      if (e.startsWith("near:")) {
        if (e !== r) throw new a(`unsupported chain id: ${e}`);
        if (!x(t)) throw new a(`not a near account id: ${t}`);
        return `coin/${e}/${t}`;
      }
      throw new a(`unsupported chain id: ${e}`);
    },
    "isNearAccountId",
    0,
    x,
    "listTopic",
    0,
    (e) => `list/${e}/-`,
    "parseTopic",
    0,
    (e) => {
      let [t, i, r, n] = e.split("/");
      if (void 0 === n) {
        if ("coin" === t && i && r)
          return { kind: "coin", chainId: i, address: r };
        if ("list" === t && i && r)
          return { kind: "list", listKind: i, listArg: r };
        if ("wallet" === t && i && void 0 === r)
          return { kind: "wallet", walletId: i };
      }
      throw new a(`malformed topic: ${e}`);
    },
    "topicKind",
    0,
    (e) => {
      let t = e.slice(0, e.indexOf("/"));
      return "coin" === t || "list" === t || "wallet" === t ? t : void 0;
    },
  ]);
};
