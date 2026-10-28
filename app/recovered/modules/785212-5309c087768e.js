// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(350741),
    a = e.i(935258),
    l = e.i(246224),
    s = e.i(620268),
    i = e.i(609252),
    n = e.i(880783),
    o = e.i(652853);
  function d(e) {
    return !(!1 === e.initialized && !e.name && !e.symbol);
  }
  function u(e) {
    return e.mint;
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let c,
          f,
          m,
          p,
          h,
          g,
          b,
          w,
          y = (0, t.c)(43),
          {
            mints: v,
            disabled: x,
            refetchInterval: j,
            refetchIntervalInBackground: _,
            includeNsfw: A,
            marketCapByMint: k,
          } = e,
          N = void 0 !== x && x;
        y[0] !== N || y[1] !== A || y[2] !== v || y[3] !== j || y[4] !== _
          ? ((c = {
              mints: v,
              disabled: N,
              refetchInterval: j,
              refetchIntervalInBackground: _,
              includeNsfw: A,
            }),
            (y[0] = N),
            (y[1] = A),
            (y[2] = v),
            (y[3] = j),
            (y[4] = _),
            (y[5] = c))
          : (c = y[5]);
        let I = (0, i.f)(c);
        e: {
          let e, t;
          if (N || I.loading) {
            let e;
            (y[6] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = []), (y[6] = e))
              : (e = y[6]),
              (f = e));
            break e;
          }
          y[7] !== I.coins
            ? ((e = new Set(I.coins.filter(d).map(u))),
              (y[7] = I.coins),
              (y[8] = e))
            : (e = y[8]);
          let r = e;
          if (y[9] !== r || y[10] !== v) {
            let e;
            (y[12] !== r
              ? ((e = (e) => !r.has(e) && (0, o.f)(e)),
                (y[12] = r),
                (y[13] = e))
              : (e = y[13]),
              (t = v.filter(e)),
              (y[9] = r),
              (y[10] = v),
              (y[11] = t));
          } else t = y[11];
          f = t;
        }
        let C = f,
          P = C.length > 0;
        y[14] !== C || y[15] !== P
          ? ((m = { addresses: C, enabled: P }),
            (y[14] = C),
            (y[15] = P),
            (y[16] = m))
          : (m = y[16]);
        let S = (0, s.x)(m);
        t: {
          let e,
            t = S.data;
          if (!t || 0 === C.length) {
            let e;
            (y[17] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = []), (y[17] = e))
              : (e = y[17]),
              (p = e));
            break t;
          }
          if (y[18] !== C || y[19] !== t) {
            let r;
            (y[21] !== t
              ? ((r = (e) => {
                  let r = t.get(e.toLowerCase());
                  return r && "solana" === r.chain && r.address === e
                    ? [{ mint: e, token: r }]
                    : [];
                }),
                (y[21] = t),
                (y[22] = r))
              : (r = y[22]),
              (e = C.flatMap(r)),
              (y[18] = C),
              (y[19] = t),
              (y[20] = e));
          } else e = y[20];
          p = e;
        }
        let E = p;
        if (y[23] !== E || y[24] !== k) {
          let e;
          (y[26] !== k
            ? ((e = (e) => {
                let { mint: t, token: r } = e;
                return k?.get(t) == null && r.poolAddress
                  ? [
                      {
                        tokenAddress: t,
                        poolAddress: r.poolAddress,
                        chain: "solana",
                      },
                    ]
                  : [];
              }),
              (y[26] = k),
              (y[27] = e))
            : (e = y[27]),
            (h = E.flatMap(e)),
            (y[23] = E),
            (y[24] = k),
            (y[25] = h));
        } else h = y[25];
        let F = h,
          U = F.length > 0;
        y[28] !== U
          ? ((g = { enabled: U }), (y[28] = U), (y[29] = g))
          : (g = y[29]);
        let T = (function (e, s) {
          let i,
            n,
            o,
            d,
            u = (0, t.c)(14);
          u[0] !== s
            ? ((i = void 0 === s ? {} : s), (u[0] = s), (u[1] = i))
            : (i = u[1]);
          let { enabled: c } = i,
            f = void 0 === c || c,
            m = (0, r.s)(),
            p = m?.address ?? null;
          u[2] !== e
            ? ((n = (t) => {
                let r = new Map();
                return (
                  t.forEach((t, a) => {
                    let l = t.data?.price,
                      s = e[a];
                    null != l && s && r.set(s.tokenAddress.toLowerCase(), l);
                  }),
                  r
                );
              }),
              (u[2] = e),
              (u[3] = n))
            : (n = u[3]);
          let h = n;
          if (u[4] !== f || u[5] !== p || u[6] !== e) {
            let t;
            (u[8] !== f || u[9] !== p
              ? ((t = (e) => ({
                  ...(0, l.H)({ ...e, sessionAddress: p }),
                  enabled: f,
                })),
                (u[8] = f),
                (u[9] = p),
                (u[10] = t))
              : (t = u[10]),
              (o = e.map(t)),
              (u[4] = f),
              (u[5] = p),
              (u[6] = e),
              (u[7] = o));
          } else o = u[7];
          return (
            u[11] !== h || u[12] !== o
              ? ((d = { queries: o, combine: h }),
                (u[11] = h),
                (u[12] = o),
                (u[13] = d))
              : (d = u[13]),
            (0, a.f)(d)
          );
        })(F, g);
        r: {
          let e;
          if (0 === E.length) {
            b = I.coins;
            break r;
          }
          if (y[30] !== E || y[31] !== k || y[32] !== T || y[33] !== I.coins) {
            let t;
            y[35] !== k || y[36] !== T
              ? ((t = (e) => {
                  let { mint: t, token: r } = e;
                  return (0, n.H)(r, {
                    usdMarketCap:
                      k?.get(t) ??
                      (0, n.S)(T.get(t.toLowerCase()), (0, n.Q)(r)),
                  });
                }),
                (y[35] = k),
                (y[36] = T),
                (y[37] = t))
              : (t = y[37]);
            let r = E.map(t);
            ((e = [...I.coins, ...r]),
              (y[30] = E),
              (y[31] = k),
              (y[32] = T),
              (y[33] = I.coins),
              (y[34] = e));
          } else e = y[34];
          b = e;
        }
        let z = b,
          K = C.length > 0 && S.isLoading;
        return (
          y[38] !== z || y[39] !== C || y[40] !== I || y[41] !== K
            ? ((w = { ...I, coins: z, fallbackPending: K, primaryMisses: C }),
              (y[38] = z),
              (y[39] = C),
              (y[40] = I),
              (y[41] = K),
              (y[42] = w))
            : (w = y[42]),
          w
        );
      },
    ],
    785212,
  );
};
