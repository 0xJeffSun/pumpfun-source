// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(935258),
    r = e.i(606933),
    i = e.i(352386);
  let l = [];
  var a = e.i(211670);
  function s(e) {
    return [...e].sort();
  }
  function o(e) {
    return e.data;
  }
  function c(e) {
    return e.dataUpdatedAt;
  }
  function u(e) {
    return e.isFetching;
  }
  function d(e) {
    return e.isLoading;
  }
  function m(e) {
    return e.isFetching;
  }
  function h(e) {
    return e.isError;
  }
  function f(e) {
    return e.error;
  }
  function p(e) {
    return e.refetch();
  }
  function g(e) {
    return {
      entries: e.map(o),
      dataUpdatedAt: e.map(c),
      fetching: e.map(u),
      isLoading: e.some(d),
      isFetching: e.some(m),
      isError: e.some(h),
      error: e.find(f)?.error ?? null,
      refetch: () => Promise.all(e.map(p)),
    };
  }
  function b(e) {
    return e ?? [];
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let o,
          c,
          u,
          d,
          m,
          h,
          f,
          p,
          _,
          x,
          y,
          v,
          k,
          w,
          j = (0, t.c)(41),
          { wallet: N, mints: S, enabled: C } = e,
          R = void 0 === C || C,
          $ = (0, r.useQueryClient)(),
          I =
            ((w = (0, i.useRef)(l)),
            (0, i.useMemo)(() => {
              let e = ((e, t) => {
                let n = new Set();
                for (let e of t) e && n.add(e);
                let r = [],
                  i = !1;
                for (let t of e) {
                  let e = !1;
                  for (let r of t) n.delete(r) && (e = !0);
                  e ? r.push(t) : (i = !0);
                }
                return (
                  n.size > 0 && (r.push(Array.from(n)), (i = !0)),
                  i ? r : e
                );
              })(w.current, S);
              return ((w.current = e), e);
            }, [S]));
        j[0] !== I ? ((o = I.map(s)), (j[0] = I), (j[1] = o)) : (o = j[1]);
        let F = o;
        if (j[2] !== F || j[3] !== N) {
          let e;
          (j[5] !== N
            ? ((e = (e) => `${N}|${e.join(",")}`), (j[5] = N), (j[6] = e))
            : (e = j[6]),
            (c = F.map(e)),
            (j[2] = F),
            (j[3] = N),
            (j[4] = c));
        } else c = j[4];
        let E = c;
        if (j[7] !== R || j[8] !== F || j[9] !== N) {
          let e;
          (j[11] !== R || j[12] !== N
            ? ((e = (e) => ({
                queryKey: a.V.batch(N, e),
                queryFn: () => (0, a.Z)({ wallet: N, mints: e }),
                enabled: R && !!N && e.length > 0,
                staleTime: 6e4,
              })),
              (j[11] = R),
              (j[12] = N),
              (j[13] = e))
            : (e = j[13]),
            (u = F.map(e)),
            (j[7] = R),
            (j[8] = F),
            (j[9] = N),
            (j[10] = u));
        } else u = j[10];
        j[14] !== u
          ? ((d = { queries: u, combine: g }), (j[14] = u), (j[15] = d))
          : (d = j[15]);
        let U = (0, n.f)(d);
        j[16] !== U.entries
          ? ((m = U.entries.flatMap(b)), (j[16] = U.entries), (j[17] = m))
          : (m = j[17]);
        let A = m;
        if (j[18] !== A) {
          for (let e of ((h = new Map()), A)) h.set(e.mint, e);
          ((j[18] = A), (j[19] = h));
        } else h = j[19];
        let M = h;
        j[20] === Symbol.for("react.memo_cache_sentinel")
          ? ((f = new Map()), (j[20] = f))
          : (f = j[20]);
        let z = (0, i.useRef)(f);
        j[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((p = new Map()), (j[21] = p))
          : (p = j[21]);
        let L = (0, i.useRef)(p),
          { fetching: O } = U;
        (j[22] !== E || j[23] !== O
          ? ((x = () => {
              O.forEach((e, t) => {
                let n = E[t];
                (e && !L.current.get(n) && z.current.set(n, Date.now()),
                  L.current.set(n, e));
              });
            }),
            (_ = [O, E]),
            (j[22] = E),
            (j[23] = O),
            (j[24] = _),
            (j[25] = x))
          : ((_ = j[24]), (x = j[25])),
          (0, i.useEffect)(x, _));
        let { entries: T, dataUpdatedAt: B } = U;
        return (
          j[26] !== E ||
          j[27] !== B ||
          j[28] !== T ||
          j[29] !== $ ||
          j[30] !== N
            ? ((y = () => {
                N &&
                  T.forEach((e, t) => {
                    if (!e) return;
                    let n = z.current.get(E[t]) || B[t];
                    for (let t of e) {
                      if (!t.unrealized || !(t.unrealized.amount_held > 0))
                        continue;
                      let e = a.V.token(N, t.mint),
                        r = $.getQueryState(e);
                      (!r || r.dataUpdatedAt <= n) &&
                        $.setQueryData(e, (0, a.B)(t));
                    }
                  });
              }),
              (v = [N, T, B, E, $]),
              (j[26] = E),
              (j[27] = B),
              (j[28] = T),
              (j[29] = $),
              (j[30] = N),
              (j[31] = y),
              (j[32] = v))
            : ((y = j[31]), (v = j[32])),
          (0, i.useEffect)(y, v),
          j[33] !== M ||
          j[34] !== U.error ||
          j[35] !== U.isError ||
          j[36] !== U.isFetching ||
          j[37] !== U.isLoading ||
          j[38] !== U.refetch ||
          j[39] !== A
            ? ((k = {
                byMint: M,
                data: A,
                isLoading: U.isLoading,
                isFetching: U.isFetching,
                isError: U.isError,
                error: U.error,
                refetch: U.refetch,
              }),
              (j[33] = M),
              (j[34] = U.error),
              (j[35] = U.isError),
              (j[36] = U.isFetching),
              (j[37] = U.isLoading),
              (j[38] = U.refetch),
              (j[39] = A),
              (j[40] = k))
            : (k = j[40]),
          k
        );
      },
    ],
    982285,
  );
};
