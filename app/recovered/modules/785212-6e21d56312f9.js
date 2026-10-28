// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(350741),
    l = e.i(935258),
    a = e.i(246224),
    i = e.i(620268),
    s = e.i(609252),
    n = e.i(880783),
    o = e.i(652853);
  function u(e) {
    return !(!1 === e.initialized && !e.name && !e.symbol);
  }
  function c(e) {
    return e.mint;
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let d,
          m,
          f,
          p,
          h,
          g,
          x,
          b,
          w = (0, t.c)(43),
          {
            mints: y,
            disabled: v,
            refetchInterval: E,
            refetchIntervalInBackground: k,
            includeNsfw: C,
            marketCapByMint: S,
          } = e,
          I = void 0 !== v && v;
        w[0] !== I || w[1] !== C || w[2] !== y || w[3] !== E || w[4] !== k
          ? ((d = {
              mints: y,
              disabled: I,
              refetchInterval: E,
              refetchIntervalInBackground: k,
              includeNsfw: C,
            }),
            (w[0] = I),
            (w[1] = C),
            (w[2] = y),
            (w[3] = E),
            (w[4] = k),
            (w[5] = d))
          : (d = w[5]);
        let N = (0, s.f)(d);
        e: {
          let e, t;
          if (I || N.loading) {
            let e;
            (w[6] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = []), (w[6] = e))
              : (e = w[6]),
              (m = e));
            break e;
          }
          w[7] !== N.coins
            ? ((e = new Set(N.coins.filter(u).map(c))),
              (w[7] = N.coins),
              (w[8] = e))
            : (e = w[8]);
          let r = e;
          if (w[9] !== r || w[10] !== y) {
            let e;
            (w[12] !== r
              ? ((e = (e) => !r.has(e) && (0, o.f)(e)),
                (w[12] = r),
                (w[13] = e))
              : (e = w[13]),
              (t = y.filter(e)),
              (w[9] = r),
              (w[10] = y),
              (w[11] = t));
          } else t = w[11];
          m = t;
        }
        let T = m,
          A = T.length > 0;
        w[14] !== T || w[15] !== A
          ? ((f = { addresses: T, enabled: A }),
            (w[14] = T),
            (w[15] = A),
            (w[16] = f))
          : (f = w[16]);
        let j = (0, i.x)(f);
        t: {
          let e,
            t = j.data;
          if (!t || 0 === T.length) {
            let e;
            (w[17] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = []), (w[17] = e))
              : (e = w[17]),
              (p = e));
            break t;
          }
          if (w[18] !== T || w[19] !== t) {
            let r;
            (w[21] !== t
              ? ((r = (e) => {
                  let r = t.get(e.toLowerCase());
                  return r && "solana" === r.chain && r.address === e
                    ? [{ mint: e, token: r }]
                    : [];
                }),
                (w[21] = t),
                (w[22] = r))
              : (r = w[22]),
              (e = T.flatMap(r)),
              (w[18] = T),
              (w[19] = t),
              (w[20] = e));
          } else e = w[20];
          p = e;
        }
        let P = p;
        if (w[23] !== P || w[24] !== S) {
          let e;
          (w[26] !== S
            ? ((e = (e) => {
                let { mint: t, token: r } = e;
                return S?.get(t) == null && r.poolAddress
                  ? [
                      {
                        tokenAddress: t,
                        poolAddress: r.poolAddress,
                        chain: "solana",
                      },
                    ]
                  : [];
              }),
              (w[26] = S),
              (w[27] = e))
            : (e = w[27]),
            (h = P.flatMap(e)),
            (w[23] = P),
            (w[24] = S),
            (w[25] = h));
        } else h = w[25];
        let _ = h,
          U = _.length > 0;
        w[28] !== U
          ? ((g = { enabled: U }), (w[28] = U), (w[29] = g))
          : (g = w[29]);
        let M = (function (e, i) {
          let s,
            n,
            o,
            u,
            c = (0, t.c)(14);
          c[0] !== i
            ? ((s = void 0 === i ? {} : i), (c[0] = i), (c[1] = s))
            : (s = c[1]);
          let { enabled: d } = s,
            m = void 0 === d || d,
            f = (0, r.s)(),
            p = f?.address ?? null;
          c[2] !== e
            ? ((n = (t) => {
                let r = new Map();
                return (
                  t.forEach((t, l) => {
                    let a = t.data?.price,
                      i = e[l];
                    null != a && i && r.set(i.tokenAddress.toLowerCase(), a);
                  }),
                  r
                );
              }),
              (c[2] = e),
              (c[3] = n))
            : (n = c[3]);
          let h = n;
          if (c[4] !== m || c[5] !== p || c[6] !== e) {
            let t;
            (c[8] !== m || c[9] !== p
              ? ((t = (e) => ({
                  ...(0, a.H)({ ...e, sessionAddress: p }),
                  enabled: m,
                })),
                (c[8] = m),
                (c[9] = p),
                (c[10] = t))
              : (t = c[10]),
              (o = e.map(t)),
              (c[4] = m),
              (c[5] = p),
              (c[6] = e),
              (c[7] = o));
          } else o = c[7];
          return (
            c[11] !== h || c[12] !== o
              ? ((u = { queries: o, combine: h }),
                (c[11] = h),
                (c[12] = o),
                (c[13] = u))
              : (u = c[13]),
            (0, l.f)(u)
          );
        })(_, g);
        r: {
          let e;
          if (0 === P.length) {
            x = N.coins;
            break r;
          }
          if (w[30] !== P || w[31] !== S || w[32] !== M || w[33] !== N.coins) {
            let t;
            w[35] !== S || w[36] !== M
              ? ((t = (e) => {
                  let { mint: t, token: r } = e;
                  return (0, n.H)(r, {
                    usdMarketCap:
                      S?.get(t) ??
                      (0, n.S)(M.get(t.toLowerCase()), (0, n.Q)(r)),
                  });
                }),
                (w[35] = S),
                (w[36] = M),
                (w[37] = t))
              : (t = w[37]);
            let r = P.map(t);
            ((e = [...N.coins, ...r]),
              (w[30] = P),
              (w[31] = S),
              (w[32] = M),
              (w[33] = N.coins),
              (w[34] = e));
          } else e = w[34];
          x = e;
        }
        let D = x,
          R = T.length > 0 && j.isLoading;
        return (
          w[38] !== D || w[39] !== T || w[40] !== N || w[41] !== R
            ? ((b = { ...N, coins: D, fallbackPending: R, primaryMisses: T }),
              (w[38] = D),
              (w[39] = T),
              (w[40] = N),
              (w[41] = R),
              (w[42] = b))
            : (b = w[42]),
          b
        );
      },
    ],
    785212,
  );
};
