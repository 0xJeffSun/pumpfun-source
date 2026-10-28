// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(163401),
    r = e.i(352386),
    n = e.i(406920),
    l = e.i(759257),
    i = e.i(646908),
    a = e.i(466931),
    s = e.i(720772),
    o = e.i(605587),
    u = e.i(987425),
    d = e.i(815612);
  let c = (e) => `${e.tx}|${(e.userAddress ?? "").toLowerCase()}`,
    m = (e, t) => {
      if (null == e) return null;
      let r = Number.parseFloat(e);
      return Number.isFinite(r) ? r * t : null;
    },
    f = (e, t) => (null == e ? t : null == t ? e : e + t),
    p = (e) => (null == e ? null : String(Math.abs(e)));
  function h(e) {
    let t = new Map();
    for (let r of e) {
      let e = "sell" === r.type ? -1 : 1,
        n = c(r),
        l = t.get(n),
        i = m(r.baseAmount, e) ?? 0,
        a = m(r.quoteAmount, e),
        s = m(r.amountSol, e),
        o = m(r.amountUsd, e);
      if (!l) {
        t.set(n, {
          first: r,
          legs: 1,
          base: i,
          quote: a,
          sol: s,
          usd: o,
          isBundled: !!r.isBundled,
          isEventTrade: !!r.isEventTrade,
        });
        continue;
      }
      ((l.legs += 1),
        (l.base += i),
        (l.quote = f(l.quote, a)),
        (l.sol = f(l.sol, s)),
        (l.usd = f(l.usd, o)),
        (l.isBundled ||= !!r.isBundled),
        (l.isEventTrade ||= !!r.isEventTrade));
    }
    let r = [];
    for (let e of t.values()) {
      if (1 === e.legs) {
        r.push(e.first);
        continue;
      }
      let t = 0 !== e.base ? e.base : (e.quote ?? e.usd ?? 0);
      if (0 === t) continue;
      let n = Math.abs(e.base),
        l = null == e.usd ? null : Math.abs(e.usd),
        i = null == e.sol ? null : Math.abs(e.sol);
      r.push({
        ...e.first,
        type: t > 0 ? "buy" : "sell",
        baseAmount: String(n),
        quoteAmount: p(e.quote) ?? e.first.quoteAmount,
        amountSol: p(e.sol) ?? e.first.amountSol,
        amountUsd: p(e.usd) ?? e.first.amountUsd,
        priceUsd: null != l && n > 0 ? String(l / n) : e.first.priceUsd,
        priceSol: null != i && n > 0 ? String(i / n) : e.first.priceSol,
        isBundled: e.isBundled,
        isEventTrade: e.isEventTrade,
      });
    }
    return r;
  }
  let b = (e, t) => {
      let r = Number.parseFloat(
        ("usd" === t ? e.amountUsd : e.amountSol) ?? "",
      );
      return Number.isFinite(r) ? r : 0;
    },
    g = (e, t) => !t || t.min <= 0 || b(e, t.currency) >= t.min,
    x = (e, t, r, n, l = !1) => {
      let i = { ...t, isEventTrade: !0 },
        a = c(i),
        s = e.findIndex((e) => c(e) === a);
      if (s >= 0) {
        let [t] = h([e[s], i]),
          r = [...e];
        return (t ? (r[s] = t) : r.splice(s, 1), { rows: r, folded: !0 });
      }
      if (!g(i, r)) return { rows: e, folded: !1 };
      let o = l
        ? [i, ...e].sort((e, t) => y(t.timestamp) - y(e.timestamp))
        : [i, ...e];
      return l && o.indexOf(i) >= n
        ? { rows: e, folded: !1, dropped: !0 }
        : { rows: o.length > n ? o.slice(0, n) : o, folded: !1 };
    },
    y = (e) => {
      let t = new Date(e).getTime();
      return Number.isFinite(t) ? t : 0;
    },
    v = (e) => Math.floor(y(e) / 1e3),
    w = ({ minUsdAmount: e }) =>
      "number" == typeof e ? { currency: "usd", min: e } : null,
    _ = /^\d+$/,
    S = (e, t) => {
      let r =
        26 === e.slotIndexId.length && _.test(e.slotIndexId)
          ? BigInt(e.slotIndexId.slice(0, 12))
          : null;
      return null === r || r < t;
    },
    k = async ({
      mint: e,
      limit: r,
      program: a,
      chainId: d,
      cursor: c,
      scope: m,
    }) => {
      let f,
        p = (0, o.g)(d),
        h = (0, i.L)(d),
        b = (0, i.B)(d),
        g = (0, i._)(d);
      if (m.userAddress) {
        if (g) return { trades: [], nextCursor: null };
        let t = p ? (0, s.c)({ mint: e, chain_id: d }) : void 0,
          o = { mint: e, limit: r, cursor: c, chainId: t },
          u = await (0, l.j)()("GET /user-trades/{id}", {
            params: { id: m.userAddress },
            query: h || b ? { ...o, chain: h ? i.J : i.d } : o,
          });
        return Array.isArray(u?.trades) && void 0 !== u.nextCursor
          ? {
              trades: u.trades.map((e) => (0, n.r)(e, { program: a })),
              nextCursor: u.nextCursor,
            }
          : null;
      }
      let x = h ? i.J : b ? i.d : g ? i.W : p ? (0, u.f)(d) : t.SOLANA_CHAIN_ID;
      if (!x) throw Error(`No CAIP-2 chain id for ${d}`);
      let y = await (0, l.j)()("GET /trades/{chainId}/{address}", {
        params: { chainId: x, address: e },
        query: {
          limit: r,
          cursor: c,
          minUsd:
            h || b || g
              ? void 0
              : (({ minUsdAmount: e }) => (null != e && e > 0 ? e : void 0))(m),
        },
      });
      if (!Array.isArray(y?.trades) || void 0 === y.cursor) return null;
      let v =
        g && null != (f = y.revokedFromBlock) && _.test(f) ? BigInt(f) : void 0;
      return {
        trades: y.trades.map((e) => (0, n.c)(e, { chainId: x })),
        nextCursor: y.cursor,
        ...(void 0 !== v ? { revokedFromBlock: v } : {}),
      };
    },
    j = (e, { fromSec: t, toSec: r }) => {
      let n = v(e.timestamp);
      return t <= n && n < r;
    };
  e.s([
    "b",
    0,
    (e) => {
      let t = "string" == typeof e ? parseFloat(e) : e;
      return t >= 1e9
        ? (t / 1e9).toFixed(2) + "b"
        : t >= 1e6
          ? (t / 1e6).toFixed(2) + "m"
          : t >= 1e4
            ? (t / 1e3).toFixed(2) + "k"
            : t >= 1
              ? t.toFixed(2)
              : (0, d.I)(t);
    },
    "m",
    0,
    c,
    "_",
    0,
    b,
    "W",
    0,
    ({ mint: e, limit: t, program: n, chainId: l }) => {
      let [s, u] = (0, r.useState)([]),
        [d, c] = (0, r.useState)(null),
        [m, f] = (0, r.useState)({ nextCursor: void 0, hasMore: !0, limit: t }),
        [p, b] = (0, r.useState)(!1),
        [_, N] = (0, r.useState)(null),
        C = (0, r.useRef)(0),
        [F, I] = (0, r.useState)(!1),
        T = (0, r.useRef)(null),
        A = (0, r.useRef)([]),
        K = (0, r.useRef)(new Set()),
        E = (0, r.useRef)([]),
        M = (0, r.useRef)(null),
        q = (0, r.useRef)(null),
        D = (0, r.useRef)(null),
        B = (0, r.useCallback)(
          ({
            folded: e,
            legIds: t,
            threshold: r,
            pagination: n,
            timeWindow: l,
          }) => {
            let i = new Set(t),
              a = e,
              s = [];
            for (let e of E.current) {
              let t = e.trade.slotIndexId;
              if (t && i.has(t)) continue;
              if (l && !j(e.trade, l)) {
                s.push(e);
                continue;
              }
              let n = x(a, e.trade, r, 1 / 0);
              (!e.extendedListedRow || n.folded) &&
                ((a = n.rows), t && i.add(t), s.push(e));
            }
            (s.length > 0 &&
              (a = [...a].sort((e, t) => y(t.timestamp) - y(e.timestamp))),
              (E.current = s),
              (K.current = i),
              u(a),
              c(r),
              f(n),
              b(!1));
          },
          [],
        ),
        O = (0, r.useCallback)(
          async (r, s) => {
            let { offset: d, ...m } = r,
              p = ++C.current;
            if (
              !n &&
              !(0, o.g)(l) &&
              !(0, i.L)(l) &&
              !(0, i.B)(l) &&
              !(0, i._)(l)
            ) {
              ((K.current = new Set()),
                (E.current = []),
                (A.current = []),
                (T.current = null),
                (M.current = null),
                u([]),
                c(null),
                N(null),
                f({ nextCursor: void 0, hasMore: !0, limit: t }),
                b(!0),
                I(!1));
              return;
            }
            "replace" === s ? b(!0) : I(!0);
            let g = w(m);
            try {
              let i = await k({
                mint: e,
                limit: t,
                program: n,
                chainId: l,
                cursor: void 0 === d || 0 === d ? void 0 : String(d),
                scope: m,
              });
              if (p !== C.current) return;
              if (!i) {
                (b(!1),
                  I(!1),
                  (0, a.l)({
                    error: Error(
                      "client-server trades response missing trades/cursor",
                    ),
                    feature: "coin",
                    operation: "trades-fetch",
                    context: { mint: e, chainId: l, mode: s },
                  }));
                return;
              }
              ((M.current = null), N(null));
              let o = i.trades,
                u = i.revokedFromBlock,
                c = void 0 !== u && u !== q.current;
              void 0 !== u &&
                ((q.current = u),
                (A.current = A.current.filter((e) => S(e, u))),
                (E.current = E.current.filter((e) => S(e.trade, u))));
              let f = "append" === s ? [...A.current, ...o].slice(0, 1e3) : o;
              ((A.current = f),
                (T.current = r),
                B({
                  folded: h(f),
                  legIds: f.map((e) => e.slotIndexId).filter(Boolean),
                  threshold: g,
                  pagination: {
                    nextCursor: i.nextCursor ?? void 0,
                    hasMore: null !== i.nextCursor && f.length < 1e3,
                    limit: t,
                  },
                }),
                I(!1),
                c &&
                  "append" === s &&
                  D.current?.({ ...r, offset: 0 }, "replace"));
            } catch (t) {
              if (p !== C.current) return;
              (b(!1),
                I(!1),
                (0, a.l)({
                  error: t,
                  feature: "coin",
                  operation: "trades-fetch",
                  context: { mint: e, chainId: l, mode: s },
                }));
            }
          },
          [t, e, n, l, B],
        );
      D.current = O;
      let U = (0, r.useCallback)((e) => O(e, "replace"), [O]),
        P = (0, r.useCallback)(() => {
          let e = T.current;
          return e && m.hasMore && m.nextCursor && !p && !F
            ? O({ ...e, offset: m.nextCursor }, "append")
            : Promise.resolve();
        }, [O, m.hasMore, m.nextCursor, p, F]),
        R = (0, r.useCallback)(
          async (r, i, s) => {
            let { fromSec: o, toSec: u, maxPages: d, ...c } = r.params;
            r.inFlight = !0;
            let m = 0,
              f = () =>
                !r.hasMore ||
                (null != r.oldestScannedSec && r.oldestScannedSec < o);
            try {
              for (; m < s && !f(); ) {
                let s = await k({
                  mint: e,
                  limit: t,
                  program: n,
                  chainId: l,
                  cursor: r.nextCursor,
                  scope: c,
                });
                if (i !== C.current) return null;
                if (!s)
                  return (
                    b(!1),
                    (0, a.l)({
                      error: Error(
                        "client-server trades response missing trades/cursor",
                      ),
                      feature: "coin",
                      operation: "trades-fetch",
                      context: { mint: e, chainId: l, mode: "window" },
                    }),
                    null
                  );
                ((m += 1), (r.pagesScanned += 1));
                let o = s.revokedFromBlock;
                for (let e of (void 0 !== o &&
                  ((q.current = o),
                  (r.raw = r.raw.filter((e) => S(e, o))),
                  (A.current = A.current.filter((e) => S(e, o))),
                  (E.current = E.current.filter((e) => S(e.trade, o)))),
                r.raw.push(...s.trades),
                (r.nextCursor = s.nextCursor ?? void 0),
                (r.hasMore = null !== s.nextCursor),
                s.trades)) {
                  let t = v(e.timestamp);
                  !(t <= 0) &&
                    (null == r.oldestScannedSec || t < r.oldestScannedSec) &&
                    (r.oldestScannedSec = t);
                }
              }
            } catch (t) {
              if (i !== C.current) return null;
              return (
                b(!1),
                (0, a.l)({
                  error: t,
                  feature: "coin",
                  operation: "trades-fetch",
                  context: { mint: e, chainId: l, mode: "window" },
                }),
                null
              );
            } finally {
              r.inFlight = !1;
            }
            return f()
              ? "complete"
              : null != r.oldestScannedSec && r.oldestScannedSec < u
                ? "truncated"
                : "unreached";
          },
          [t, e, n, l],
        ),
        L = (0, r.useCallback)(
          (e, r) => {
            let { fromSec: n, toSec: l } = e.params,
              i = h(e.raw).filter((e) => j(e, { fromSec: n, toSec: l }));
            ((M.current = e),
              N({
                state: r,
                pagesScanned: e.pagesScanned,
                oldestScannedSec: e.oldestScannedSec,
                matched: i.length,
              }),
              B({
                folded: i,
                legIds: e.raw.map((e) => e.slotIndexId).filter(Boolean),
                threshold: w(e.params),
                pagination: {
                  nextCursor: e.nextCursor,
                  hasMore: e.hasMore,
                  limit: t,
                },
                timeWindow: { fromSec: n, toSec: l },
              }));
          },
          [B, t],
        ),
        z = (0, r.useCallback)(
          async (e) => {
            let t = ++C.current;
            b(!0);
            let r = {
                params: e,
                raw: [],
                nextCursor: void 0,
                hasMore: !0,
                pagesScanned: 0,
                oldestScannedSec: null,
                inFlight: !1,
              },
              n = await R(r, t, e.maxPages ?? 5);
            n && L(r, n);
          },
          [R, L],
        ),
        V = (0, r.useCallback)(async () => {
          let e = M.current;
          if (
            !e ||
            e.inFlight ||
            !e.hasMore ||
            (null != e.oldestScannedSec &&
              e.oldestScannedSec < e.params.fromSec)
          )
            return;
          let t = ++C.current;
          b(!0);
          let r = await R(e, t, e.params.maxPages ?? 5);
          r && L(e, r);
        }, [R, L]),
        W = (0, r.useCallback)(
          (e, r) => {
            let n = [];
            for (let t of e) {
              let e = t.slotIndexId;
              if (e) {
                if (K.current.has(e)) continue;
                K.current.add(e);
              }
              n.push({ trade: t, options: r });
            }
            n.length &&
              ((E.current = [...E.current, ...n].slice(-1e3)),
              u((e) => {
                let l = e;
                for (let e of n) {
                  let n = x(
                    l,
                    e.trade,
                    r?.sizeThreshold ?? null,
                    Math.max(t, l.length),
                    e.options?.ordered,
                  );
                  ((e.extendedListedRow = n.folded),
                    n.dropped &&
                      ((E.current = E.current.filter((t) => t !== e)),
                      e.trade.slotIndexId &&
                        K.current.delete(e.trade.slotIndexId)),
                    (l = n.rows));
                }
                return l;
              }));
          },
          [t],
        ),
        $ = (0, r.useCallback)((e) => {
          if (!e.length) return;
          let t = new Set(e);
          for (let e of ((E.current = E.current.filter(
            (e) => !t.has(e.trade.slotIndexId),
          )),
          t))
            K.current.delete(e);
          u((e) => {
            let r = e.filter((e) => !e.slotIndexId || !t.has(e.slotIndexId));
            return r.length === e.length ? e : r;
          });
        }, []),
        H = (0, r.useCallback)((e, t) => W([e], t), [W]),
        Z = (0, r.useCallback)(() => {
          ((C.current += 1),
            (q.current = null),
            (K.current = new Set()),
            (E.current = []),
            (A.current = []),
            (T.current = null),
            (M.current = null),
            u([]),
            c(null),
            N(null),
            f({ nextCursor: void 0, hasMore: !0, limit: t }),
            b(!1),
            I(!1));
        }, [t]);
      return {
        trades: (0, r.useMemo)(
          () => (d ? s.filter((e) => g(e, d)) : s),
          [s, d],
        ),
        allTrades: s,
        pagination: m,
        loading: p,
        loadingMore: F,
        fetchTrades: U,
        fetchMore: P,
        fetchTradesRange: z,
        loadMoreWindow: V,
        windowCoverage: _,
        resetTrades: Z,
        appendEventTrade: H,
        appendEventTrades: W,
        dropLiveLegs: $,
      };
    },
  ]);
};
