// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    r = e.i(352386),
    i = e.i(735821);
  let l = new Map(),
    a = new Map(),
    s = [],
    o = new Set(),
    u = [],
    c = () => {
      for (let [e, t] of a) p(t) && a.delete(e);
      for (let e of ((s = [...a.values()]), o)) e();
    },
    d = (e) => (
      o.add(e),
      () => {
        o.delete(e);
      }
    ),
    m = () => s;
  function f(e) {
    return e.record;
  }
  let g = (e, t) => `${e}|${t}`,
    p = (e) => Date.now() - e.registeredAtMs > e.ttlMs;
  function h(e, t) {
    let n = l.get(g(e, t));
    return !n || p(n) ? null : n.record;
  }
  let y = (e, t, n) => [
      "callouts",
      "own-mint",
      e,
      t,
      ...(n ? [{ chain: n }] : []),
    ],
    b = async (e, t, n) => {
      let r;
      try {
        r = await (0, i.o)({ userId: e, mint: t, chain: n });
      } catch (r) {
        let n = h(e, t);
        if (n) return n;
        throw r;
      }
      let a = g(e, t);
      if (!r) {
        let n = h(e, t);
        return n || (l.delete(a), null);
      }
      return (l.delete(a), r);
    };
  async function x(e, t, n, r) {
    try {
      return await e.fetchQuery({
        queryKey: y(t, n, r),
        queryFn: () => b(t, n, r),
        staleTime: 6e4,
        retry: !1,
      });
    } catch {
      return null;
    }
  }
  e.s([
    "n",
    0,
    x,
    "L",
    0,
    function (e) {
      let t = [];
      for (let [n, r] of l) {
        if (p(r)) {
          l.delete(n);
          continue;
        }
        r.record.userId === e && t.push(r.record);
      }
      return t.sort((e, t) => t.createdAt - e.createdAt);
    },
    "H",
    0,
    function (e, t, n, { ttlMs: r = 3e5 } = {}) {
      let i = g(e, t),
        s = { record: n, registeredAtMs: Date.now(), ttlMs: r };
      (l.set(i, s), a.set(i, s), c());
    },
    "q",
    0,
    function (e, t) {
      let n = g(e, t);
      (l.delete(n), a.delete(n) && c());
    },
    "W",
    0,
    function (e) {
      let r,
        i,
        l,
        a,
        s = (0, t.c)(17),
        { mint: o, accountKey: u, chain: c, enabled: d } = e,
        m = u ?? null,
        f = o ?? null;
      (s[0] !== c || s[1] !== m || s[2] !== f
        ? ((r = y(m, f, c)), (s[0] = c), (s[1] = m), (s[2] = f), (s[3] = r))
        : (r = s[3]),
        s[4] !== u || s[5] !== c || s[6] !== o
          ? ((i = async () => (u && o ? b(u, o, c) : null)),
            (s[4] = u),
            (s[5] = c),
            (s[6] = o),
            (s[7] = i))
          : (i = s[7]));
      let g = (void 0 === d || d) && !!o && !!u;
      s[8] !== r || s[9] !== i || s[10] !== g
        ? ((l = {
            queryKey: r,
            queryFn: i,
            enabled: g,
            staleTime: 6e4,
            refetchOnWindowFocus: !1,
          }),
          (s[8] = r),
          (s[9] = i),
          (s[10] = g),
          (s[11] = l))
        : (l = s[11]);
      let p = (0, n.useQuery)(l);
      return (
        s[12] !== p.data ||
        s[13] !== p.isError ||
        s[14] !== p.isLoading ||
        s[15] !== p.refetch
          ? ((a = {
              callout: p.data,
              isLoading: p.isLoading,
              isError: p.isError,
              refetch: p.refetch,
            }),
            (s[12] = p.data),
            (s[13] = p.isError),
            (s[14] = p.isLoading),
            (s[15] = p.refetch),
            (s[16] = a))
          : (a = s[16]),
        a
      );
    },
    "o",
    0,
    function (e) {
      let n,
        i = (0, t.c)(5),
        l = (0, r.useSyncExternalStore)(d, m, m);
      e: {
        let t;
        if (!e) {
          n = u;
          break e;
        }
        if (i[0] !== e || i[1] !== l) {
          let n;
          (i[3] !== e
            ? ((n = (t) => !p(t) && t.record.userId === e),
              (i[3] = e),
              (i[4] = n))
            : (n = i[4]),
            (t = l.filter(n).map(f)),
            (i[0] = e),
            (i[1] = l),
            (i[2] = t));
        } else t = i[2];
        n = t;
      }
      return n;
    },
  ]);
};
