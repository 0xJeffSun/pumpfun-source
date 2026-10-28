// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    i = e.i(526080),
    l = e.i(606933),
    a = e.i(689943),
    n = e.i(998243),
    o = e.i(372743),
    s = e.i(978854),
    c = e.i(680930);
  let d = new WeakMap(),
    u = (e, i, u) => {
      let m,
        p,
        h,
        f,
        y,
        b,
        v,
        g,
        x,
        C,
        k = (0, t.c)(31);
      k[0] !== u
        ? ((m = void 0 === u ? {} : u), (k[0] = u), (k[1] = m))
        : (m = k[1]);
      let {
          shouldFetch: w,
          isEnabled: S,
          chainId: _,
          enablePolling: P,
          pollingInterval: N,
        } = m,
        T = void 0 === w || w,
        M = void 0 === N ? c.t.POLLING_INTERVAL : N,
        j = (0, l.useQueryClient)(),
        A = T && (void 0 === S || S),
        I = !!(void 0 !== P && P) && M;
      (k[2] !== e
        ? ((p = (t) => (0, o.u)({ [e]: t })), (k[2] = e), (k[3] = p))
        : (p = k[3]),
        k[4] !== _ ||
        k[5] !== e ||
        k[6] !== i ||
        k[7] !== A ||
        k[8] !== I ||
        k[9] !== p
          ? ((h = {
              mintAddress: e,
              program: i,
              chainId: _,
              enabled: A,
              refetchInterval: I,
              onFetched: p,
            }),
            (k[4] = _),
            (k[5] = e),
            (k[6] = i),
            (k[7] = A),
            (k[8] = I),
            (k[9] = p),
            (k[10] = h))
          : (h = k[10]));
      let { data: E, isLoading: L } = (0, a.F)(h);
      (k[11] !== E || k[12] !== e
        ? ((f = () => {
            E && (0, n.f)(() => (0, o.c)({ [e]: E }));
          }),
          (y = [e, E]),
          (k[11] = E),
          (k[12] = e),
          (k[13] = f),
          (k[14] = y))
        : ((f = k[13]), (y = k[14])),
        (0, r.useEffect)(f, y),
        k[15] !== e || k[16] !== j || k[17] !== T
          ? ((b = () => {
              if (T && e)
                return (function (e, t) {
                  let r = d.get(e) ?? new Map();
                  d.set(e, r);
                  let i = r.get(t);
                  if (i) r.set(t, { ...i, holders: i.holders + 1 });
                  else {
                    let i = s.m.getState().latestByMint[t],
                      l = setInterval(() => {
                        let r = s.m.getState().latestByMint[t];
                        r !== i &&
                          ((i = r),
                          e.invalidateQueries({
                            queryKey: a.o.marketActivityByMintPrefix(t),
                          }));
                      }, 1e4);
                    r.set(t, { holders: 1, timer: l });
                  }
                  let l = !1;
                  return () => {
                    if (l) return;
                    l = !0;
                    let e = r.get(t);
                    if (e) {
                      if (e.holders > 1)
                        return void r.set(t, { ...e, holders: e.holders - 1 });
                      (clearInterval(e.timer), r.delete(t));
                    }
                  };
                })(j, e);
            }),
            (v = [e, T, j]),
            (k[15] = e),
            (k[16] = j),
            (k[17] = T),
            (k[18] = b),
            (k[19] = v))
          : ((b = k[18]), (v = k[19])),
        (0, r.useEffect)(b, v),
        k[20] !== e
          ? ((g = (t) => t.marketActivity[e]), (k[20] = e), (k[21] = g))
          : (g = k[21]));
      let U = (0, o.f)(g);
      k[22] !== _ || k[23] !== e || k[24] !== i || k[25] !== j
        ? ((x = async () => {
            e &&
              (await j.invalidateQueries({
                queryKey: a.o.marketActivityByMint(e, i, _),
              }));
          }),
          (k[22] = _),
          (k[23] = e),
          (k[24] = i),
          (k[25] = j),
          (k[26] = x))
        : (x = k[26]);
      let $ = x;
      return (
        k[27] !== L || k[28] !== U || k[29] !== $
          ? ((C = { marketActivity: U, loading: L, refetchMint: $ }),
            (k[27] = L),
            (k[28] = U),
            (k[29] = $),
            (k[30] = C))
          : (C = k[30]),
        C
      );
    };
  var m = e.i(803797),
    p = e.i(653805),
    h = e.i(152584),
    f = e.i(783111),
    y = e.i(605587),
    b = e.i(254667);
  class v extends Error {
    constructor(e) {
      (super(e), (this.name = "MarketDataValidationError"));
    }
  }
  function g(e) {
    if (null != e) {
      if ("number" == typeof e && !isNaN(e)) return e;
      if ("string" == typeof e) {
        let t = parseFloat(e);
        return isNaN(t) ? void 0 : t;
      }
    }
  }
  var x = e.i(263889);
  function C(e) {
    let l,
      a,
      o,
      s,
      c,
      d = (0, t.c)(21),
      {
        coin: h,
        liveUsdMarketCap: f,
        liveLastTradeTimestamp: b,
        liveWholeTokenSupply: v,
      } = e,
      g = void 0 === b ? null : b,
      C = void 0 === v ? null : v,
      { athMarketCap: k, isLoading: w } = (0, x.f)(h);
    d[0] !== h.chain_id || d[1] !== h.mint
      ? ((l = (0, y.N)({ mint: h.mint, chainId: h.chain_id })),
        (d[0] = h.chain_id),
        (d[1] = h.mint),
        (d[2] = l))
      : (l = d[2]);
    let S = l,
      _ = void 0 === f;
    d[3] !== h || d[4] !== S || d[5] !== f || d[6] !== C
      ? ((a = S
          ? void 0
          : null != f && "number" == typeof C && C > 0
            ? C
            : (0, i.B)(h)),
        (d[3] = h),
        (d[4] = S),
        (d[5] = f),
        (d[6] = C),
        (d[7] = a))
      : (a = d[7]);
    let P = a;
    d[8] !== k ||
    d[9] !== w ||
    d[10] !== h.usd_market_cap ||
    d[11] !== _ ||
    d[12] !== g ||
    d[13] !== f ||
    d[14] !== P
      ? ((o =
          w || _
            ? void 0
            : {
                usdMarketCap: f ?? h.usd_market_cap,
                usdAthMarketCap: k,
                isFresh: null !== f,
                lastTradeTimestamp:
                  null !== f && "number" == typeof g ? g : void 0,
                ...(void 0 !== P ? { wholeTokenSupply: P } : {}),
              }),
        (d[8] = k),
        (d[9] = w),
        (d[10] = h.usd_market_cap),
        (d[11] = _),
        (d[12] = g),
        (d[13] = f),
        (d[14] = P),
        (d[15] = o))
      : (o = d[15]);
    let N = o;
    (d[16] !== h.mint || d[17] !== N
      ? ((s = { mint: h.mint, initialData: N }),
        (d[16] = h.mint),
        (d[17] = N),
        (d[18] = s))
      : (s = d[18]),
      (function (e) {
        let i,
          l,
          a = (0, t.c)(9),
          { mint: o, initialData: s } = e,
          c = ((0, p.F)(o), void 0 !== s),
          d = s?.usdMarketCap,
          u = s?.usdAthMarketCap,
          h = s?.isFresh === !0,
          f = s?.lastTradeTimestamp ?? void 0,
          y = s?.wholeTokenSupply,
          b = (0, r.useRef)(null),
          v = (0, r.useRef)(null);
        (a[0] !== c ||
        a[1] !== h ||
        a[2] !== f ||
        a[3] !== o ||
        a[4] !== u ||
        a[5] !== d ||
        a[6] !== y
          ? ((i = () => {
              if (
                (b.current?.mint !== o &&
                  (b.current = { mint: o, at: Date.now() }),
                !c)
              )
                return;
              let e = [o, d, u, h, f, y].join("|");
              if (v.current === e) return;
              v.current = e;
              let t = b.current.at;
              (0, n.f)(() =>
                (0, m.j)({
                  mint: o,
                  snapshot: {
                    usdMarketCap: d,
                    usdAthMarketCap: u,
                    isFresh: h,
                    lastTradeTimestamp: f,
                    wholeTokenSupply: y,
                  },
                  arrivedAt: t,
                }),
              );
            }),
            (l = [o, c, d, u, h, f, y]),
            (a[0] = c),
            (a[1] = h),
            (a[2] = f),
            (a[3] = o),
            (a[4] = u),
            (a[5] = d),
            (a[6] = y),
            (a[7] = i),
            (a[8] = l))
          : ((i = a[7]), (l = a[8])),
          (0, r.useEffect)(i, l));
      })(s),
      d[19] !== h.chain_id
        ? ((c = {
            shouldFetch: !0,
            isEnabled: !0,
            chainId: h.chain_id,
            enablePolling: !0,
          }),
          (d[19] = h.chain_id),
          (d[20] = c))
        : (c = d[20]),
      u(h.mint, h.program, c));
  }
  function k(e) {
    let l,
      n,
      s,
      c,
      d,
      m,
      p,
      C,
      k = (0, t.c)(39),
      { coin: w, liveUsdMarketCap: S, liveWholeTokenSupply: _ } = e,
      P = void 0 === _ ? null : _,
      [N, T] = (0, r.useState)(!1);
    (k[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((l = () => {
          T(!0);
        }),
        (n = []),
        (k[0] = l),
        (k[1] = n))
      : ((l = k[0]), (n = k[1])),
      (0, r.useEffect)(l, n));
    let { athMarketCap: M, isLoading: j } = (0, x.f)(w);
    k[2] !== w.chain_id || k[3] !== w.mint
      ? ((s = (0, y.N)({ mint: w.mint, chainId: w.chain_id })),
        (k[2] = w.chain_id),
        (k[3] = w.mint),
        (k[4] = s))
      : (s = k[4]);
    let A = s;
    k[5] !== w
      ? ((c = (({ coin: e, supplyUi: t }) => {
          let r = (0, i.B)(e),
            l = (0, y.N)({ mint: e.mint, chainId: e.chain_id }) && !(0, i.u)(e);
          if (!(t > 0))
            return {
              displaySupply: 0,
              restToDisplayRatio: 1,
              restSupply: l ? 0 : r,
            };
          let a = (0, i.u)(e) && r > 0;
          return {
            displaySupply: t,
            restToDisplayRatio: a ? t / r : 1,
            restSupply: a || l ? t : r,
          };
        })({ coin: w, supplyUi: 0 })),
        (k[5] = w),
        (k[6] = c))
      : (c = k[6]);
    let { displaySupply: I, restToDisplayRatio: E, restSupply: L } = c,
      U = void 0 === S;
    k[7] !== w.chain_id
      ? ((d = {
          shouldFetch: !0,
          isEnabled: !0,
          chainId: w.chain_id,
          enablePolling: !0,
        }),
        (k[7] = w.chain_id),
        (k[8] = d))
      : (d = k[8]);
    let { loading: $ } = u(w.mint, w.program, d);
    k[9] !== w.mint
      ? ((m = (e) => e.marketActivity[w.mint]), (k[9] = w.mint), (k[10] = m))
      : (m = k[10]);
    let D = (0, o.f)(m),
      B = (0, a.P)(w.mint, w.program, w.chain_id),
      F = w.volume_24h_usd,
      V = w.price_change_24h_bps;
    e: {
      let e, t;
      if (B) {
        p = void 0;
        break e;
      }
      k[11] !== V || k[12] !== F
        ? ((e = (0, f.w)({ volume_24h_usd: F, price_change_24h_bps: V })),
          (k[11] = V),
          (k[12] = F),
          (k[13] = e))
        : (e = k[13]);
      let r = e;
      (k[14] !== r
        ? ((t = r ? { "24h": r } : void 0), (k[14] = r), (k[15] = t))
        : (t = k[15]),
        (p = t));
    }
    let O = p,
      R = (0, h.f)(w.mint);
    if (
      k[16] !== M ||
      k[17] !== j ||
      k[18] !== O ||
      k[19] !== w.mint ||
      k[20] !== w.name ||
      k[21] !== w.symbol ||
      k[22] !== w.usd_market_cap ||
      k[23] !== I ||
      k[24] !== A ||
      k[25] !== N ||
      k[26] !== U ||
      k[27] !== S ||
      k[28] !== P ||
      k[29] !== $ ||
      k[30] !== L ||
      k[31] !== E ||
      k[32] !== D ||
      k[33] !== R
    ) {
      let e = N ? R : void 0,
        t = N ? (D ?? O) : void 0,
        r = N ? S : void 0,
        i = (({ row: e, basis: t }) => {
          if (e?.usdMarketCap) {
            if (!(t.displaySupply > 0)) {
              let r =
                !e.isLiveData && void 0 !== e.seedSupply && e.seedSupply > 0
                  ? e.seedSupply
                  : void 0;
              return { marketCap: e.usdMarketCap, supply: r ?? t.restSupply };
            }
            return e.priceUsd && e.priceUsd > 0
              ? {
                  marketCap: e.priceUsd * t.displaySupply,
                  supply: t.displaySupply,
                }
              : e.isLiveData
                ? { marketCap: e.usdMarketCap, supply: t.displaySupply }
                : {
                    marketCap: e.usdMarketCap * t.restToDisplayRatio,
                    supply: t.restSupply,
                  };
          }
        })({
          row: e,
          basis: { displaySupply: I, restToDisplayRatio: E, restSupply: L },
        }),
        l = !A && r && "number" == typeof P && P > 0 ? P : L,
        a = i ?? { marketCap: (r || w.usd_market_cap || 0) * E, supply: l },
        n = a.marketCap || 0,
        o = !N || (!i && U),
        s = e?.priceUsd || (a.supply > 0 ? n / a.supply : 0),
        c = {
          currentMarketCap: n,
          isMarketCapProvisional: o,
          currentPrice: s,
          allTimeHighMarketCap: (e?.usdAthMarketCap || M || 0) * E,
          volume24h: t?.["24h"]?.volumeUSD ?? void 0,
          priceChange5m: t?.["5m"]?.priceChangePercent || 0,
          priceChange1h: t?.["1h"]?.priceChangePercent || 0,
          priceChange6h: t?.["6h"]?.priceChangePercent || 0,
          priceChange24h: t?.["24h"]?.priceChangePercent || 0,
          marketActivity: t,
          isLoading: j || $,
          isMarketActivityLoading: $,
          error: null,
        };
      try {
        let e, t;
        ((e = []),
          (t = {
            ...c,
            currentMarketCap: g(c.currentMarketCap),
            currentPrice: g(c.currentPrice),
            allTimeHighMarketCap: g(c.allTimeHighMarketCap),
            volume24h: g(c.volume24h),
            priceChange5m: g(c.priceChange5m),
            priceChange1h: g(c.priceChange1h),
            priceChange6h: g(c.priceChange6h),
            priceChange24h: g(c.priceChange24h),
          }),
          "boolean" != typeof t.isLoading &&
            e.push(`isLoading must be boolean (got: ${typeof t.isLoading})`),
          null !== t.error && "string" != typeof t.error && (t.error = null),
          void 0 !== t.currentMarketCap &&
            t.currentMarketCap < 0 &&
            e.push(
              `currentMarketCap cannot be negative (got: ${t.currentMarketCap})`,
            ),
          void 0 !== t.allTimeHighMarketCap &&
            t.allTimeHighMarketCap < 0 &&
            e.push(
              `allTimeHighMarketCap cannot be negative (got: ${t.allTimeHighMarketCap})`,
            ),
          void 0 !== t.volume24h &&
            t.volume24h < 0 &&
            e.push(`volume24h cannot be negative (got: ${t.volume24h})`),
          void 0 !== t.currentPrice &&
            t.currentPrice < 0 &&
            e.push(`currentPrice cannot be negative (got: ${t.currentPrice})`),
          void 0 !== t.currentMarketCap &&
            t.currentMarketCap > 1e15 &&
            e.push(
              `currentMarketCap seems unreasonably large (got: ${t.currentMarketCap})`,
            ),
          void 0 !== t.currentPrice &&
            t.currentPrice > 1e10 &&
            e.push(
              `currentPrice seems unreasonably large (got: ${t.currentPrice})`,
            ),
          e.length > 0 &&
            b.y.warn("Market data validation issues", { issues: e }),
          (C = t));
      } catch (e) {
        if (e instanceof v) {
          let t;
          (k[35] !== w.mint || k[36] !== w.name || k[37] !== w.symbol
            ? ((t = { mint: w.mint, symbol: w.symbol, name: w.name }),
              (k[35] = w.mint),
              (k[36] = w.name),
              (k[37] = w.symbol),
              (k[38] = t))
            : (t = k[38]),
            console.error("Market data validation failed:", e.message, {
              coin: t,
              rawData: c,
            }));
        }
        C = c;
      }
      ((k[16] = M),
        (k[17] = j),
        (k[18] = O),
        (k[19] = w.mint),
        (k[20] = w.name),
        (k[21] = w.symbol),
        (k[22] = w.usd_market_cap),
        (k[23] = I),
        (k[24] = A),
        (k[25] = N),
        (k[26] = U),
        (k[27] = S),
        (k[28] = P),
        (k[29] = $),
        (k[30] = L),
        (k[31] = E),
        (k[32] = D),
        (k[33] = R),
        (k[34] = C));
    } else C = k[34];
    return C;
  }
  e.s(
    [
      "U",
      0,
      ({ snapshot: e, mint: t }) => {
        if (void 0 === e || (0, y.c)(e.mint) !== (0, y.c)(t)) return;
        let r = e.coin?.last_trade_timestamp;
        return "number" == typeof r && Number.isFinite(r) && r > 0 ? r : null;
      },
      "D",
      0,
      ({ snapshot: e, mint: t }) => {
        if (void 0 === e || (0, y.c)(e.mint) !== (0, y.c)(t)) return;
        let r = e.coin?.usd_market_cap;
        return "number" == typeof r && Number.isFinite(r) && r > 0 ? r : null;
      },
      "j",
      0,
      ({ snapshot: e, mint: t }) => {
        if (void 0 === e || (0, y.c)(e.mint) !== (0, y.c)(t)) return;
        if (!e.coin) return null;
        let r = (0, i.B)(e.coin);
        return Number.isFinite(r) && r > 0 ? r : null;
      },
      "s",
      0,
      C,
      "T",
      0,
      function (e) {
        return (C(e), k(e));
      },
      "n",
      0,
      k,
    ],
    329017,
  );
};
