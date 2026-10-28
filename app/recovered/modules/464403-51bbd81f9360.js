// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(n) => {
  "use strict";
  var t = n.i(824425),
    e = n.i(512619),
    r = n.i(575281),
    i = n.i(17186),
    o = n.i(959719),
    a = n.i(599077),
    s = n.i(188902);
  let l = new Set([o.z.toBase58(), o.S.toBase58()]),
    c = { kind: "not_mint", reason: "not_mint_layout" },
    d = ({ owner: n, data: o }) => {
      if (!n || !o) return { kind: "not_mint", reason: "missing" };
      if (!l.has(n)) return { kind: "not_mint", reason: "foreign_owner" };
      if (
        o.length < r.b ||
        o.length === i.f ||
        (o.length > r.b && (o.length <= t.C || o[t.C] !== e.d.Mint))
      )
        return c;
      try {
        let t = r.x.decode(o.subarray(0, r.b));
        if (!t.isInitialized) return c;
        return { kind: "mint", tokenProgram: n, decimals: t.decimals };
      } catch {
        return c;
      }
    },
    u = async (n, t = {}) => {
      let e = (0, s.L)();
      if (!e) return { kind: "unknown" };
      try {
        let r,
          i = await fetch(e, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: "getAccountInfo",
              params: [n, { encoding: "base64", commitment: "confirmed" }],
            }),
            signal: ((n, t) => {
              let e = AbortSignal.timeout(t);
              if (!n) return e;
              let r = new AbortController(),
                i = (n) => () => r.abort(n.reason);
              return (
                n.aborted
                  ? r.abort(n.reason)
                  : n.addEventListener("abort", i(n), { once: !0 }),
                e.addEventListener("abort", i(e), { once: !0 }),
                r.signal
              );
            })(t.signal, t.timeoutMs ?? 4e3),
            cache: "no-store",
          });
        if (!i.ok) return { kind: "unknown" };
        let o = await i.json();
        if (o.error || !o.result) return { kind: "unknown" };
        let a = o.result.value;
        if (!a) return { kind: "not_mint", reason: "missing" };
        return d({
          owner: a.owner,
          data:
            ((r = a.data[0]), Uint8Array.from(atob(r), (n) => n.charCodeAt(0))),
        });
      } catch (n) {
        if (((0, a.unstable_rethrow)(n), t.signal?.aborted)) throw n;
        return { kind: "unknown" };
      }
    },
    m = async (n, t) => "mint" === (await u(n, { signal: t })).kind;
  n.s([
    "classifySolanaAccount",
    0,
    d,
    "fetchSolanaMintAccount",
    0,
    u,
    "isSolanaMintOnChain",
    0,
    m,
  ]);
};
