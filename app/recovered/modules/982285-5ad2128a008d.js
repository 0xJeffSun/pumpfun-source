// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(935258),
    n = e.i(606933),
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
  function f(e) {
    return e.isError;
  }
  function h(e) {
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
      isError: e.some(f),
      error: e.find(h)?.error ?? null,
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
          f,
          h,
          p,
          x,
          v,
          y,
          w,
          j,
          N,
          C = (0, t.c)(41),
          { wallet: _, mints: k, enabled: S } = e,
          A = void 0 === S || S,
          U = (0, n.useQueryClient)(),
          $ =
            ((N = (0, i.useRef)(l)),
            (0, i.useMemo)(() => {
              let e = ((e, t) => {
                let r = new Set();
                for (let e of t) e && r.add(e);
                let n = [],
                  i = !1;
                for (let t of e) {
                  let e = !1;
                  for (let n of t) r.delete(n) && (e = !0);
                  e ? n.push(t) : (i = !0);
                }
                return (
                  r.size > 0 && (n.push(Array.from(r)), (i = !0)),
                  i ? n : e
                );
              })(N.current, k);
              return ((N.current = e), e);
            }, [k]));
        C[0] !== $ ? ((o = $.map(s)), (C[0] = $), (C[1] = o)) : (o = C[1]);
        let E = o;
        if (C[2] !== E || C[3] !== _) {
          let e;
          (C[5] !== _
            ? ((e = (e) => `${_}|${e.join(",")}`), (C[5] = _), (C[6] = e))
            : (e = C[6]),
            (c = E.map(e)),
            (C[2] = E),
            (C[3] = _),
            (C[4] = c));
        } else c = C[4];
        let R = c;
        if (C[7] !== A || C[8] !== E || C[9] !== _) {
          let e;
          (C[11] !== A || C[12] !== _
            ? ((e = (e) => ({
                queryKey: a.V.batch(_, e),
                queryFn: () => (0, a.Z)({ wallet: _, mints: e }),
                enabled: A && !!_ && e.length > 0,
                staleTime: 6e4,
              })),
              (C[11] = A),
              (C[12] = _),
              (C[13] = e))
            : (e = C[13]),
            (u = E.map(e)),
            (C[7] = A),
            (C[8] = E),
            (C[9] = _),
            (C[10] = u));
        } else u = C[10];
        C[14] !== u
          ? ((d = { queries: u, combine: g }), (C[14] = u), (C[15] = d))
          : (d = C[15]);
        let I = (0, r.f)(d);
        C[16] !== I.entries
          ? ((m = I.entries.flatMap(b)), (C[16] = I.entries), (C[17] = m))
          : (m = C[17]);
        let F = m;
        if (C[18] !== F) {
          for (let e of ((f = new Map()), F)) f.set(e.mint, e);
          ((C[18] = F), (C[19] = f));
        } else f = C[19];
        let M = f;
        C[20] === Symbol.for("react.memo_cache_sentinel")
          ? ((h = new Map()), (C[20] = h))
          : (h = C[20]);
        let B = (0, i.useRef)(h);
        C[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((p = new Map()), (C[21] = p))
          : (p = C[21]);
        let L = (0, i.useRef)(p),
          { fetching: T } = I;
        (C[22] !== R || C[23] !== T
          ? ((v = () => {
              T.forEach((e, t) => {
                let r = R[t];
                (e && !L.current.get(r) && B.current.set(r, Date.now()),
                  L.current.set(r, e));
              });
            }),
            (x = [T, R]),
            (C[22] = R),
            (C[23] = T),
            (C[24] = x),
            (C[25] = v))
          : ((x = C[24]), (v = C[25])),
          (0, i.useEffect)(v, x));
        let { entries: V, dataUpdatedAt: z } = I;
        return (
          C[26] !== R ||
          C[27] !== z ||
          C[28] !== V ||
          C[29] !== U ||
          C[30] !== _
            ? ((y = () => {
                _ &&
                  V.forEach((e, t) => {
                    if (!e) return;
                    let r = B.current.get(R[t]) || z[t];
                    for (let t of e) {
                      if (!t.unrealized || !(t.unrealized.amount_held > 0))
                        continue;
                      let e = a.V.token(_, t.mint),
                        n = U.getQueryState(e);
                      (!n || n.dataUpdatedAt <= r) &&
                        U.setQueryData(e, (0, a.B)(t));
                    }
                  });
              }),
              (w = [_, V, z, R, U]),
              (C[26] = R),
              (C[27] = z),
              (C[28] = V),
              (C[29] = U),
              (C[30] = _),
              (C[31] = y),
              (C[32] = w))
            : ((y = C[31]), (w = C[32])),
          (0, i.useEffect)(y, w),
          C[33] !== M ||
          C[34] !== I.error ||
          C[35] !== I.isError ||
          C[36] !== I.isFetching ||
          C[37] !== I.isLoading ||
          C[38] !== I.refetch ||
          C[39] !== F
            ? ((j = {
                byMint: M,
                data: F,
                isLoading: I.isLoading,
                isFetching: I.isFetching,
                isError: I.isError,
                error: I.error,
                refetch: I.refetch,
              }),
              (C[33] = M),
              (C[34] = I.error),
              (C[35] = I.isError),
              (C[36] = I.isFetching),
              (C[37] = I.isLoading),
              (C[38] = I.refetch),
              (C[39] = F),
              (C[40] = j))
            : (j = C[40]),
          j
        );
      },
    ],
    982285,
  );
};
