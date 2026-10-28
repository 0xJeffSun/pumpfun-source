// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(365089);
  let l = (e) => {
      if (null == e) return null;
      let t = Number.parseFloat(e);
      return Number.isFinite(t) ? t : null;
    },
    a = (e) => (null == l(e) ? void 0 : e);
  var s = e.i(131611),
    i = e.i(445242),
    n = e.i(795663),
    d = e.i(605587);
  let o = [];
  e.s(
    [
      "f",
      0,
      ({ coin: e, wallet: u }) => {
        let m = !!u?.plotOnChart,
          c = m ? (u?.address ?? null) : null,
          { actorAddress: f, pending: h } = ((e) => {
            let t,
              r,
              l,
              a = (0, i.c)(13),
              { coin: s, identity: o } = e;
            a[0] !== s.chain_id || a[1] !== s.mint || a[2] !== o
              ? ((t =
                  (0, d.N)({ mint: s.mint, chainId: s.chain_id }) &&
                  !!o &&
                  !(0, d.h)(o)),
                (a[0] = s.chain_id),
                (a[1] = s.mint),
                (a[2] = o),
                (a[3] = t))
              : (t = a[3]);
            let u = t,
              m = o ?? void 0;
            a[4] !== u || a[5] !== m
              ? ((r = { solAddress: m, enabled: u }),
                (a[4] = u),
                (a[5] = m),
                (a[6] = r))
              : (r = a[6]);
            let c = (0, n.O)(r);
            if (!o) {
              let e;
              return (
                a[7] === Symbol.for("react.memo_cache_sentinel")
                  ? ((e = { actorAddress: null, pending: !1 }), (a[7] = e))
                  : (e = a[7]),
                e
              );
            }
            if (!u) {
              let e;
              return (
                a[8] !== o
                  ? ((e = { actorAddress: o, pending: !1 }),
                    (a[8] = o),
                    (a[9] = e))
                  : (e = a[9]),
                e
              );
            }
            let f = c.data ?? o;
            return (
              a[10] !== c.isPending || a[11] !== f
                ? ((l = { actorAddress: f, pending: c.isPending }),
                  (a[10] = c.isPending),
                  (a[11] = f),
                  (a[12] = l))
                : (l = a[12]),
              l
            );
          })({ coin: e, identity: c }),
          g = (0, s.Q)({
            coin: e,
            authorAddress: c ?? void 0,
            enabled: m,
            includeTransfers: !1,
          }),
          p = (0, t.useRef)(0),
          T = `${e.mint}|${c ?? ""}`;
        (0, t.useEffect)(() => {
          p.current = 0;
        }, [T]);
        let b = g.trades,
          { hasNextPage: v, isFetchingNextPage: y, fetchNextPage: w } = g,
          k = (0, t.useRef)(w);
        k.current = w;
        let I = b.length;
        (0, t.useEffect)(() => {
          !m || !v || y || p.current >= 9 || ((p.current += 1), k.current());
        }, [m, v, y, I, T]);
        let S = (0, t.useMemo)(() => {
          if (!m || 0 === b.length) return o;
          let e = f ?? c ?? "";
          return b
            .filter((e) => "transfer" !== e.kind)
            .map((t) =>
              (({ trade: e, walletAddress: t }) => {
                let s = new Date(e.timestamp).getTime(),
                  i = Number.isFinite(s) ? s : 0;
                return {
                  id: e.slotIndexId || `${e.tx}_${i}`,
                  transactionId: e.tx,
                  time: i > 0 ? new Date(i).toISOString() : "",
                  timestamp: i,
                  type: e.type,
                  sol: l(e.amountSol) ?? 0,
                  tokens: l(e.baseAmount) ?? 0,
                  walletId: t,
                  walletIdFormatted: (0, r.d)(t),
                  priceUSD: a(e.priceUsd),
                  priceSOL: a(e.priceSol),
                  amountUSD: a(e.amountUsd),
                  amountSOL: a(e.amountSol),
                  slotIndexId: e.slotIndexId,
                };
              })({ trade: t, walletAddress: t.userAddress || e }),
            );
        }, [m, b, f, c]);
        return {
          actorAddress: m ? f : null,
          trades: S,
          loading: m && (h || g.isLoading || g.isFetchingNextPage),
        };
      },
    ],
    374701,
  );
  var u = e.i(78436),
    m = e.i(410513);
  let c = m.M,
    f = () => {
      let e = c.getState(),
        t = e.wallets[0],
        r =
          t && ("chart" === e.writer || null !== e.walletSource)
            ? {
                address: t,
                source: e.walletSource ?? "chart-bubble",
                plotOnChart: e.plotOnChart,
              }
            : null,
        l = e.timeWindow
          ? {
              fromSec: Math.floor(e.timeWindow.fromMs / 1e3),
              toSec: Math.ceil(e.timeWindow.toMs / 1e3),
              source: e.timeWindow.source ?? "chart-range",
            }
          : null;
      return { mint: e.mint, wallet: r, timeWindow: l };
    },
    h = (0, u.$)((e) => ({
      ...f(),
      setWallet: ({ mint: t, wallet: r }) => {
        let l = c.getState();
        (l.mint !== t && l.initForMint(t, { defaultMinSize: m.p }),
          c
            .getState()
            .setWallets([r.address], "chart", {
              source: r.source,
              plotOnChart: r.plotOnChart,
            }),
          e(f()));
      },
      setTimeWindow: ({ mint: t, timeWindow: r }) => {
        let l = c.getState();
        l.mint !== t && l.initForMint(t, { defaultMinSize: m.p });
        let [a, s] =
          r.fromSec <= r.toSec ? [r.fromSec, r.toSec] : [r.toSec, r.fromSec];
        (c
          .getState()
          .setTimeWindow({ fromMs: 1e3 * a, toMs: 1e3 * s, source: r.source }),
          e(f()));
      },
      clearWallet: () => {
        (c.getState().clearWallets(), e(f()));
      },
      clearTimeWindow: () => {
        (c.getState().setTimeWindow(null), e(f()));
      },
      resetForMint: () => {},
    }));
  (c.subscribe(() => {
    let e = f(),
      t = h.getState();
    (t.mint !== e.mint ||
      t.wallet?.address !== e.wallet?.address ||
      t.wallet?.plotOnChart !== e.wallet?.plotOnChart ||
      t.wallet?.source !== e.wallet?.source ||
      t.timeWindow?.fromSec !== e.timeWindow?.fromSec ||
      t.timeWindow?.toSec !== e.timeWindow?.toSec) &&
      h.setState(e);
  }),
    e.s(
      [
        "h",
        0,
        (e) => {
          let t,
            r,
            l,
            a = (0, i.c)(7),
            { mint: s } = e;
          a[0] !== s
            ? ((t = (e) => (e.mint === s ? e.wallet : null)),
              (a[0] = s),
              (a[1] = t))
            : (t = a[1]);
          let n = h(t);
          a[2] !== s
            ? ((r = (e) => (e.mint === s ? e.timeWindow : null)),
              (a[2] = s),
              (a[3] = r))
            : (r = a[3]);
          let d = h(r);
          return (
            a[4] !== d || a[5] !== n
              ? ((l = { wallet: n, timeWindow: d }),
                (a[4] = d),
                (a[5] = n),
                (a[6] = l))
              : (l = a[6]),
            l
          );
        },
        "W",
        0,
        h,
      ],
      368265,
    ));
};
