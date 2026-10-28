// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(824425),
    r = e.i(512619),
    i = e.i(575281),
    a = e.i(17186),
    n = e.i(959719),
    s = e.i(599077),
    l = e.i(188902);
  let o = new Set([n.z.toBase58(), n.S.toBase58()]),
    c = { kind: "not_mint", reason: "not_mint_layout" },
    m = ({ owner: e, data: n }) => {
      if (!e || !n) return { kind: "not_mint", reason: "missing" };
      if (!o.has(e)) return { kind: "not_mint", reason: "foreign_owner" };
      if (
        n.length < i.b ||
        n.length === a.f ||
        (n.length > i.b && (n.length <= t.C || n[t.C] !== r.d.Mint))
      )
        return c;
      try {
        let t = i.x.decode(n.subarray(0, i.b));
        if (!t.isInitialized) return c;
        return { kind: "mint", tokenProgram: e, decimals: t.decimals };
      } catch {
        return c;
      }
    },
    d = async (e, t = {}) => {
      let r = (0, l.L)();
      if (!r) return { kind: "unknown" };
      try {
        let i,
          a = await fetch(r, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: "getAccountInfo",
              params: [e, { encoding: "base64", commitment: "confirmed" }],
            }),
            signal: ((e, t) => {
              let r = AbortSignal.timeout(t);
              if (!e) return r;
              let i = new AbortController(),
                a = (e) => () => i.abort(e.reason);
              return (
                e.aborted
                  ? i.abort(e.reason)
                  : e.addEventListener("abort", a(e), { once: !0 }),
                r.addEventListener("abort", a(r), { once: !0 }),
                i.signal
              );
            })(t.signal, t.timeoutMs ?? 4e3),
            cache: "no-store",
          });
        if (!a.ok) return { kind: "unknown" };
        let n = await a.json();
        if (n.error || !n.result) return { kind: "unknown" };
        let s = n.result.value;
        if (!s) return { kind: "not_mint", reason: "missing" };
        return m({
          owner: s.owner,
          data:
            ((i = s.data[0]), Uint8Array.from(atob(i), (e) => e.charCodeAt(0))),
        });
      } catch (e) {
        if (((0, s.unstable_rethrow)(e), t.signal?.aborted)) throw e;
        return { kind: "unknown" };
      }
    },
    u = async (e, t) => "mint" === (await d(e, { signal: t })).kind;
  e.s([
    "classifySolanaAccount",
    0,
    m,
    "fetchSolanaMintAccount",
    0,
    d,
    "isSolanaMintOnChain",
    0,
    u,
  ]);
};
