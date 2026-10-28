// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(643492);
  function i(e) {
    return e;
  }
  e.s(["f", 0, i], 645511);
  var n = e.i(690877),
    a = e.i(606933),
    o = e.i(352386),
    l = e.i(38279),
    s = e.i(759257);
  let d = { mints: [], chains: null },
    c = (e) => Array.isArray(e) && e.every((e) => "string" == typeof e),
    u = (e) => (Array.isArray(e) ? e.filter((e) => "string" == typeof e) : []);
  async function m(e) {
    let t = await (0, s.j)()("GET /coins/top-tokens/mints", {
      query: { withChains: !0 },
      ...e,
      throwHttpErrors: !1,
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok) throw Error("Failed to fetch top token mints");
          },
        ],
      },
    });
    if (Array.isArray(t)) return { mints: u(t), chains: null };
    if (!t || "object" != typeof t) return d;
    let r = {};
    if (t.chains && "object" == typeof t.chains)
      for (let [e, i] of Object.entries(t.chains)) c(i) && (r[e] = i);
    return { mints: u(t.mints), chains: r };
  }
  var h = e.i(605587);
  let p = (e) => (e.startsWith("solana:") ? "solana" : e),
    f = (e) => {
      let t = new Set(e.mints.map(h.c));
      if (!e.chains) return { mints: t, chains: null };
      let r = new Map();
      for (let [t, i] of Object.entries(e.chains)) {
        let e = (0, h.c)(t),
          n = r.get(e) ?? new Set();
        for (let e of i) n.add(p(e));
        r.set(e, n);
      }
      return { mints: t, chains: r };
    },
    b = (e, t, r) => {
      if (!e || !t) return !1;
      let i = (0, h.c)(t);
      if (!e.mints.has(i)) return !1;
      if (!e.chains) return !0;
      let n = ((e, t) => {
        if (!e.startsWith("0x")) return "solana";
        let r = (0, h.g)(t) ? (0, h.w)(t) : null;
        return r ? `eip155:${r}` : null;
      })(t, r);
      return null === n || (e.chains.get(i)?.has(n) ?? !1);
    },
    g = () =>
      i({
        queryKey: l.Q.TOP_TOKEN_MINTS,
        queryFn: () => m(),
        staleTime: 6e4,
        refetchInterval: 6e4,
        retry: 1,
        select: f,
      }),
    x = new WeakMap(),
    v = new WeakMap();
  function y() {
    return !1;
  }
  e.s(
    [
      "h",
      0,
      b,
      "v",
      0,
      (e, i) => {
        let n,
          s,
          d = (0, t.c)(6),
          c = (0, a.useQueryClient)();
        d[0] !== c
          ? ((n = (e) => {
              let t;
              return (
                (t = ((e) => {
                  let t = x.get(e);
                  if (t) return t;
                  let i = new r.f(e, g()),
                    n = {
                      listeners: new Set(),
                      membership: i.getCurrentResult().data,
                      stop: () => {},
                    };
                  return (
                    (n.stop = i.subscribe((e) => {
                      if (!Object.is(e.data, n.membership))
                        for (let t of ((n.membership = e.data),
                        [...n.listeners]))
                          t();
                    })),
                    x.set(e, n),
                    n
                  );
                })(c)).listeners.add(e),
                () => {
                  (t.listeners.delete(e),
                    t.listeners.size > 0 || (t.stop(), x.delete(c)));
                }
              );
            }),
            (d[0] = c),
            (d[1] = n))
          : (n = d[1]);
        let u = n;
        return (
          d[2] !== i || d[3] !== c || d[4] !== e
            ? ((s = () =>
                b(
                  x.get(c)?.membership ??
                    ((e) => {
                      if (!e) return;
                      let t = v.get(e);
                      if (t) return t;
                      let r = f(e);
                      return (v.set(e, r), r);
                    })(c.getQueryData(l.Q.TOP_TOKEN_MINTS)),
                  e,
                  i,
                )),
              (d[2] = i),
              (d[3] = c),
              (d[4] = e),
              (d[5] = s))
            : (s = d[5]),
          (0, o.useSyncExternalStore)(u, s, y)
        );
      },
      "i",
      0,
      () => {
        let e,
          r = (0, t.c)(1);
        return (
          r[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = g()), (r[0] = e))
            : (e = r[0]),
          (0, n.useQuery)(e)
        );
      },
    ],
    555501,
  );
};
