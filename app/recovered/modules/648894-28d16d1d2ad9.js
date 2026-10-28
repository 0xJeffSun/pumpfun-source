// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(363250),
    n = e.i(604142),
    a = e.i(462024),
    i = e.i(994598),
    o = e.i(665010);
  e.s([
    "p",
    0,
    5,
    "q",
    0,
    function (e, l) {
      let u,
        s,
        c,
        d,
        f = (0, t.c)(10);
      f[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = {}), (f[0] = u))
        : (u = f[0]);
      let { data: m } = (0, r.f)(u),
        p = void 0 === m ? 0 : m,
        { walletCoinOptions: h } = (0, o.f)();
      if (f[1] !== h) {
        for (let e of ((s = new Map()), h))
          e.priceUsd > 0 && s.set(e.mint, e.priceUsd);
        ((f[1] = h), (f[2] = s));
      } else s = f[2];
      let b = s;
      f[3] !== l
        ? ((c = l ? (0, n.w)(l) : 5), (f[3] = l), (f[4] = c))
        : (c = f[4]);
      let v = c;
      return (
        f[5] !== b || f[6] !== v || f[7] !== e || f[8] !== p
          ? ((d = (function (e) {
              let {
                  pools: t,
                  solPriceUsd: r,
                  customPriceUsdByMint: n,
                  minRewardUsd: o = 5,
                } = e,
                l = 0,
                u = !1,
                s = !1,
                c = !1;
              for (let e of t) {
                (function (e) {
                  let t = Number(e.humanAmount || 0);
                  return Number.isFinite(t) && t > 0;
                })(e) && (c = !0);
                let t = (function (e) {
                  let { pool: t, solPriceUsd: r, customPriceUsdByMint: n } = e,
                    i = Number(t.humanAmount || 0);
                  if (!Number.isFinite(i) || i <= 0) return 0;
                  if ("PUMP" === t.kind) {
                    let e = n.get(a.i.PUMP.mint);
                    if (void 0 === e) return;
                    return i * e;
                  }
                  if ("SOL" === t.kind) {
                    if (!r) return;
                    return i * r;
                  }
                  if (!t.customMint) return;
                  if (t.customMint === a.i.USDC.mint) return i;
                  let o = n.get(t.customMint);
                  if (void 0 !== o) return i * o;
                })({ pool: e, solPriceUsd: r, customPriceUsdByMint: n });
                if (void 0 === t) {
                  (0, i.r)(e) === a.i.SOL.mint ? (u = !0) : (s = !0);
                  continue;
                }
                l += t;
              }
              let d = u || s,
                f = !c,
                m = l >= o,
                p = !f && !m,
                h = p && !d,
                b = p && u;
              return {
                knownTotalUsd: l,
                hasUnknownPrice: d,
                isEmpty: f,
                isBelowMinimum: h,
                isMinimumUnchecked: b,
                isUnverifiable: p && s && !u,
                blocksPublish: h || b,
              };
            })({
              pools: e,
              solPriceUsd: p,
              customPriceUsdByMint: b,
              minRewardUsd: v,
            })),
            (f[5] = b),
            (f[6] = v),
            (f[7] = e),
            (f[8] = p),
            (f[9] = d))
          : (d = f[9]),
        d
      );
    },
  ]);
};
