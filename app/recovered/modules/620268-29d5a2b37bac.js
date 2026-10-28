// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["Q", () => l, "W", () => i, "t", () => o, "x", () => s]);
  var t = e.i(690877),
    n = e.i(11124),
    r = e.i(896291);
  async function i(e, t) {
    let n = await fetch("/api/relay/rpc/tokens/batch", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ addresses: [e] }),
      signal: t,
    });
    if (!n.ok) throw Error(`Multichain token lookup failed: ${n.status}`);
    return (
      (await n.json()).tokens.find(
        (t) => t.address.toLowerCase() === e.toLowerCase(),
      ) ?? null
    );
  }
  async function l(e, t) {
    try {
      return (await i(e, t)) !== null;
    } catch {
      return !1;
    }
  }
  function a(e) {
    let t = new Map();
    for (let n of e) {
      let e = n.toLowerCase();
      t.has(e) || t.set(e, n.startsWith("0x") ? e : n);
    }
    return [...t.values()].sort();
  }
  function o({ addresses: e, chain: t }) {
    let n = a(e);
    return t ? ["multiChainTokens", n, t] : ["multiChainTokens", n];
  }
  function s({
    addresses: e,
    enabled: i = !0,
    chain: l,
    staleTime: u = 3e5,
    refetchInterval: d,
  }) {
    let c = a(e),
      f = o({ addresses: e, chain: l });
    return (0, t.useQuery)({
      queryKey: f,
      enabled: i && c.length > 0,
      staleTime: u,
      refetchInterval: d ? (e) => d(e.state.data) : void 0,
      retry: (e, t) => e < 1 && (0, r.t)(t),
      retryDelay: 400,
      queryFn: async ({ signal: e, client: t }) => {
        let [i] = c,
          a =
            1 === c.length && i && l
              ? (0, n.l)({ client: t, address: i, chain: l, servedKey: f })
              : null;
        if (a) return new Map([[a.token.address.toLowerCase(), a.token]]);
        let o = new Map();
        return (
          await Promise.all(
            (function (e) {
              let t = [];
              for (let n = 0; n < e.length; n += 50) t.push(e.slice(n, n + 50));
              return t;
            })(c).map(async (t) => {
              let n = await fetch("/api/relay/rpc/tokens/batch", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(
                  l ? { addresses: t, chain: l } : { addresses: t },
                ),
                signal: e,
              }).catch((e) => {
                throw (0, r.T)(e);
              });
              if (!n.ok) throw await (0, r.k)(n);
              for (let e of (await n.json()).tokens)
                o.set(e.address.toLowerCase(), e);
            }),
          ),
          o
        );
      },
    });
  }
};
