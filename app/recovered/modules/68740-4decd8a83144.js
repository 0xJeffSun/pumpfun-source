// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(574472),
    n = e.i(690877);
  let l = {
      realizedUSD: 0,
      totalBuysUSD: 0,
      totalSellsUSD: 0,
      totalBuysTokens: 0,
      remainingTokens: 0,
      remainingCostBasisUSD: 0,
      realizedCostBasisUSD: 0,
      hasBuys: !1,
      hasSells: !1,
    },
    i = (e, t, r) => {
      if (
        "number" == typeof r &&
        Number.isInteger(r) &&
        r >= 0 &&
        null != e.baseAmount
      ) {
        let t = Number(e.baseAmount);
        if (Number.isFinite(t) && t > 0) return t / 10 ** r;
      }
      let n = Number(e.priceUSD);
      if (!Number.isFinite(n) || n <= 0) return null;
      let l = t / n;
      return Number.isFinite(l) && l > 0 ? l : null;
    },
    a = (e) => {
      if (e instanceof Date) return e.getTime();
      if ("number" == typeof e) return e > 1e10 ? e : 1e3 * e;
      let t = Date.parse(e);
      if (Number.isFinite(t)) return t;
      let r = Number(e);
      return Number.isFinite(r) ? (r > 1e10 ? r : 1e3 * r) : 0;
    },
    s = (e, { baseDecimals: t } = {}) => {
      if (!e || 0 === e.length) return l;
      let r = [...e].sort((e, t) => a(e.timestamp) - a(t.timestamp)),
        n = 0,
        s = 0,
        o = 0,
        u = 0,
        d = 0,
        c = 0,
        m = 0,
        f = !1,
        p = !1;
      for (let e of r) {
        let r = Number(e.amountUSD);
        if (!Number.isFinite(r) || r <= 0) continue;
        let l = i(e, r, t);
        if (null === l) continue;
        if ("buy" === e.type) {
          ((f = !0), (d += r), (m += l), (n += l), (s += r));
          continue;
        }
        if ("sell" !== e.type) continue;
        if (((p = !0), (c += r), n <= 0)) {
          o += r;
          continue;
        }
        let a = Math.min(l, n),
          h = (s / n) * a,
          b = (a / l) * r,
          g = r - b;
        ((o += b - h + g), (u += h), (n -= a), (s = Math.max(0, s - h)));
      }
      return {
        realizedUSD: o,
        totalBuysUSD: d,
        totalSellsUSD: c,
        totalBuysTokens: m,
        remainingTokens: n,
        remainingCostBasisUSD: s,
        realizedCostBasisUSD: u,
        hasBuys: f,
        hasSells: p,
      };
    },
    o = (e) => e.hasSells && e.remainingTokens <= 1e-6;
  e.s(["J", 0, 1e-6, "S", 0, s, "t", 0, o, "u", 0, i], 250311);
  var u = e.i(503630),
    d = e.i(880783);
  let c = async (e, t, r, n, l) => {
    if (!t) throw Error("Coin program is unavailable");
    let i = await fetch(`${(0, u.V)()}/coins/${e}/trades/batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userAddresses: [n],
        program: (0, d.X)(t),
        createdTs: r,
      }),
      signal: l,
    });
    if (!i.ok)
      throw Error(`Failed to fetch user trades: ${i.status} ${i.statusText}`);
    let a = await i.json();
    return a?.[n] ?? [];
  };
  e.s(
    [
      "f",
      0,
      c,
      "I",
      0,
      (e) => {
        let l,
          i,
          a,
          u,
          d,
          m,
          f = (0, t.c)(26),
          {
            mint: p,
            program: h,
            createdTs: b,
            walletAddress: g,
            baseDecimals: x,
            enabled: y,
            pollUntilClosed: v,
          } = e,
          { address: w } = (0, r.F)(),
          _ = g || w,
          S = !!((void 0 === y || y) && _ && p && h);
        (f[0] !== b || f[1] !== p || f[2] !== h || f[3] !== _
          ? ((l = ["coin-user-trades", _ ?? "", p, h, b ?? null]),
            (f[0] = b),
            (f[1] = p),
            (f[2] = h),
            (f[3] = _),
            (f[4] = l))
          : (l = f[4]),
          f[5] !== b || f[6] !== p || f[7] !== h || f[8] !== _
            ? ((i = (e) => {
                let { signal: t } = e;
                return c(p, h, b, _, t);
              }),
              (f[5] = b),
              (f[6] = p),
              (f[7] = h),
              (f[8] = _),
              (f[9] = i))
            : (i = f[9]));
        let k = void 0 !== v && v ? 5e3 : void 0;
        f[10] !== S || f[11] !== l || f[12] !== i || f[13] !== k
          ? ((a = {
              queryKey: l,
              queryFn: i,
              enabled: S,
              staleTime: 3e4,
              refetchInterval: k,
              refetchOnWindowFocus: !1,
            }),
            (f[10] = S),
            (f[11] = l),
            (f[12] = i),
            (f[13] = k),
            (f[14] = a))
          : (a = f[14]);
        let { data: j, isLoading: N, isError: C } = (0, n.useQuery)(a);
        e: {
          let e;
          if (!j) {
            u = null;
            break e;
          }
          (f[15] !== x || f[16] !== j
            ? ((e = s(j, { baseDecimals: x })),
              (f[15] = x),
              (f[16] = j),
              (f[17] = e))
            : (e = f[17]),
            (u = e));
        }
        let F = u;
        t: {
          let e;
          if (!F) {
            d = !1;
            break t;
          }
          (f[18] !== F ? ((e = o(F)), (f[18] = F), (f[19] = e)) : (e = f[19]),
            (d = e));
        }
        let I = d,
          T = S && N,
          A = j ? j.length : null;
        return (
          f[20] !== I ||
          f[21] !== C ||
          f[22] !== F ||
          f[23] !== A ||
          f[24] !== T
            ? ((m = {
                summary: F,
                hasPreviousPosition: I,
                isLoading: T,
                isError: C,
                rowCount: A,
              }),
              (f[20] = I),
              (f[21] = C),
              (f[22] = F),
              (f[23] = A),
              (f[24] = T),
              (f[25] = m))
            : (m = f[25]),
          m
        );
      },
    ],
    68740,
  );
};
