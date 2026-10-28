// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(350741),
    r = e.i(935258),
    i = e.i(246224),
    l = e.i(620268),
    a = e.i(609252),
    s = e.i(880783),
    o = e.i(652853);
  function c(e) {
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
        let d,
          m,
          h,
          f,
          p,
          g,
          b,
          _,
          x = (0, t.c)(43),
          {
            mints: y,
            disabled: v,
            refetchInterval: k,
            refetchIntervalInBackground: w,
            includeNsfw: j,
            marketCapByMint: N,
          } = e,
          S = void 0 !== v && v;
        x[0] !== S || x[1] !== j || x[2] !== y || x[3] !== k || x[4] !== w
          ? ((d = {
              mints: y,
              disabled: S,
              refetchInterval: k,
              refetchIntervalInBackground: w,
              includeNsfw: j,
            }),
            (x[0] = S),
            (x[1] = j),
            (x[2] = y),
            (x[3] = k),
            (x[4] = w),
            (x[5] = d))
          : (d = x[5]);
        let C = (0, a.f)(d);
        e: {
          let e, t;
          if (S || C.loading) {
            let e;
            (x[6] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = []), (x[6] = e))
              : (e = x[6]),
              (m = e));
            break e;
          }
          x[7] !== C.coins
            ? ((e = new Set(C.coins.filter(c).map(u))),
              (x[7] = C.coins),
              (x[8] = e))
            : (e = x[8]);
          let n = e;
          if (x[9] !== n || x[10] !== y) {
            let e;
            (x[12] !== n
              ? ((e = (e) => !n.has(e) && (0, o.f)(e)),
                (x[12] = n),
                (x[13] = e))
              : (e = x[13]),
              (t = y.filter(e)),
              (x[9] = n),
              (x[10] = y),
              (x[11] = t));
          } else t = x[11];
          m = t;
        }
        let R = m,
          $ = R.length > 0;
        x[14] !== R || x[15] !== $
          ? ((h = { addresses: R, enabled: $ }),
            (x[14] = R),
            (x[15] = $),
            (x[16] = h))
          : (h = x[16]);
        let I = (0, l.x)(h);
        t: {
          let e,
            t = I.data;
          if (!t || 0 === R.length) {
            let e;
            (x[17] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = []), (x[17] = e))
              : (e = x[17]),
              (f = e));
            break t;
          }
          if (x[18] !== R || x[19] !== t) {
            let n;
            (x[21] !== t
              ? ((n = (e) => {
                  let n = t.get(e.toLowerCase());
                  return n && "solana" === n.chain && n.address === e
                    ? [{ mint: e, token: n }]
                    : [];
                }),
                (x[21] = t),
                (x[22] = n))
              : (n = x[22]),
              (e = R.flatMap(n)),
              (x[18] = R),
              (x[19] = t),
              (x[20] = e));
          } else e = x[20];
          f = e;
        }
        let F = f;
        if (x[23] !== F || x[24] !== N) {
          let e;
          (x[26] !== N
            ? ((e = (e) => {
                let { mint: t, token: n } = e;
                return N?.get(t) == null && n.poolAddress
                  ? [
                      {
                        tokenAddress: t,
                        poolAddress: n.poolAddress,
                        chain: "solana",
                      },
                    ]
                  : [];
              }),
              (x[26] = N),
              (x[27] = e))
            : (e = x[27]),
            (p = F.flatMap(e)),
            (x[23] = F),
            (x[24] = N),
            (x[25] = p));
        } else p = x[25];
        let E = p,
          U = E.length > 0;
        x[28] !== U
          ? ((g = { enabled: U }), (x[28] = U), (x[29] = g))
          : (g = x[29]);
        let A = (function (e, l) {
          let a,
            s,
            o,
            c,
            u = (0, t.c)(14);
          u[0] !== l
            ? ((a = void 0 === l ? {} : l), (u[0] = l), (u[1] = a))
            : (a = u[1]);
          let { enabled: d } = a,
            m = void 0 === d || d,
            h = (0, n.s)(),
            f = h?.address ?? null;
          u[2] !== e
            ? ((s = (t) => {
                let n = new Map();
                return (
                  t.forEach((t, r) => {
                    let i = t.data?.price,
                      l = e[r];
                    null != i && l && n.set(l.tokenAddress.toLowerCase(), i);
                  }),
                  n
                );
              }),
              (u[2] = e),
              (u[3] = s))
            : (s = u[3]);
          let p = s;
          if (u[4] !== m || u[5] !== f || u[6] !== e) {
            let t;
            (u[8] !== m || u[9] !== f
              ? ((t = (e) => ({
                  ...(0, i.H)({ ...e, sessionAddress: f }),
                  enabled: m,
                })),
                (u[8] = m),
                (u[9] = f),
                (u[10] = t))
              : (t = u[10]),
              (o = e.map(t)),
              (u[4] = m),
              (u[5] = f),
              (u[6] = e),
              (u[7] = o));
          } else o = u[7];
          return (
            u[11] !== p || u[12] !== o
              ? ((c = { queries: o, combine: p }),
                (u[11] = p),
                (u[12] = o),
                (u[13] = c))
              : (c = u[13]),
            (0, r.f)(c)
          );
        })(E, g);
        n: {
          let e;
          if (0 === F.length) {
            b = C.coins;
            break n;
          }
          if (x[30] !== F || x[31] !== N || x[32] !== A || x[33] !== C.coins) {
            let t;
            x[35] !== N || x[36] !== A
              ? ((t = (e) => {
                  let { mint: t, token: n } = e;
                  return (0, s.H)(n, {
                    usdMarketCap:
                      N?.get(t) ??
                      (0, s.S)(A.get(t.toLowerCase()), (0, s.Q)(n)),
                  });
                }),
                (x[35] = N),
                (x[36] = A),
                (x[37] = t))
              : (t = x[37]);
            let n = F.map(t);
            ((e = [...C.coins, ...n]),
              (x[30] = F),
              (x[31] = N),
              (x[32] = A),
              (x[33] = C.coins),
              (x[34] = e));
          } else e = x[34];
          b = e;
        }
        let M = b,
          z = R.length > 0 && I.isLoading;
        return (
          x[38] !== M || x[39] !== R || x[40] !== C || x[41] !== z
            ? ((_ = { ...C, coins: M, fallbackPending: z, primaryMisses: R }),
              (x[38] = M),
              (x[39] = R),
              (x[40] = C),
              (x[41] = z),
              (x[42] = _))
            : (_ = x[42]),
          _
        );
      },
    ],
    785212,
  );
};
