// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    i = "hlcore:mainnet",
    s = "near:mainnet";
  class a extends Error {
    name = "StreamTopicError";
  }
  let r = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
    n = /^0x[0-9a-f]{40}$/,
    l = /^hlcore:(mainnet|testnet)$/,
    o = /^[A-Za-z0-9:._-]{1,32}$/,
    c = "ton:-239",
    d = /^EQ[A-Za-z0-9_-]{46}$/,
    x = "starknet:SN_MAIN",
    h = /^0x[0-9a-f]{64}$/,
    u = /^(([a-z0-9]+[-_])*[a-z0-9]+\.)*([a-z0-9]+[-_])*[a-z0-9]+$/,
    f = (e) => e.length >= 2 && e.length <= 64 && u.test(e);
  e.s([
    "HLCORE_MAINNET_CHAIN_ID",
    0,
    i,
    "NEAR_MAINNET_CHAIN_ID",
    0,
    s,
    "SOLANA_CHAIN_ID",
    0,
    t,
    "STARKNET_FELT_ADDRESS",
    0,
    h,
    "STARKNET_MAINNET_CHAIN_ID",
    0,
    x,
    "StreamTopicError",
    0,
    a,
    "TON_FRIENDLY_ADDRESS",
    0,
    d,
    "TON_MAINNET_CHAIN_ID",
    0,
    c,
    "chainIdFor",
    0,
    (e) =>
      "solana" === e
        ? t
        : "hlcore" === e
          ? i
          : "near" === e
            ? s
            : `eip155:${e.evmChainId}`,
    "coinTopic",
    0,
    (e, t) => {
      if (e.startsWith("hlcore:")) {
        if (!l.test(e)) throw new a(`unsupported chain id: ${e}`);
        if (!o.test(t)) throw new a(`not an hlcore coin key: ${t}`);
        return `coin/${e}/${t}`;
      }
      if (e.startsWith("eip155:")) {
        let i = t.toLowerCase();
        if (!n.test(i)) throw new a(`not an eip155 address: ${t}`);
        return `coin/${e}/${i}`;
      }
      if (e.startsWith("solana:")) {
        if (!r.test(t)) throw new a(`not a solana address: ${t}`);
        return `coin/${e}/${t}`;
      }
      if (e.startsWith("ton:")) {
        if (e !== c) throw new a(`unsupported chain id: ${e}`);
        if (!d.test(t)) throw new a(`not a ton friendly address: ${t}`);
        return `coin/${e}/${t}`;
      }
      if (e.startsWith("starknet:")) {
        if (e !== x) throw new a(`unsupported chain id: ${e}`);
        if (!h.test(t)) throw new a(`not a starknet felt address: ${t}`);
        return `coin/${e}/${t}`;
      }
      if (e.startsWith("near:")) {
        if (e !== s) throw new a(`unsupported chain id: ${e}`);
        if (!f(t)) throw new a(`not a near account id: ${t}`);
        return `coin/${e}/${t}`;
      }
      throw new a(`unsupported chain id: ${e}`);
    },
    "isNearAccountId",
    0,
    f,
    "listTopic",
    0,
    (e) => `list/${e}/-`,
    "parseTopic",
    0,
    (e) => {
      let [t, i, s, r] = e.split("/");
      if (void 0 === r) {
        if ("coin" === t && i && s)
          return { kind: "coin", chainId: i, address: s };
        if ("list" === t && i && s)
          return { kind: "list", listKind: i, listArg: s };
        if ("wallet" === t && i && void 0 === s)
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
