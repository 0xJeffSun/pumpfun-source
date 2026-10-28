// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(322315),
    r = e.i(254010),
    i = e.i(975982),
    n = e.i(352386),
    s = e.i(915631),
    l = e.i(254667),
    a = e.i(985526),
    o = e.i(755793),
    u = e.i(544514),
    c = e.i(662093),
    d = e.i(237237),
    f = e.i(653805),
    h = e.i(605587),
    m = e.i(987425),
    p = e.i(225233);
  function b(e, t = !0) {
    let r = (0, f.x)((e) => e.updateCoin),
      i = (0, u.f)(),
      s = !!"wss://multichain-prod.nats.realtime.pump.fun".startsWith("wss"),
      g = (0, n.useMemo)(() => {
        let t = new Map();
        for (let r of e) {
          if (!r.mint || !(0, h.N)(r)) continue;
          let e = (0, m.f)(r.chainId);
          if (!e) continue;
          let i = `${d._}.${e}.${(0, p.f)(r.mint)}`;
          t.has(i) || t.set(i, r.mint);
        }
        return t;
      }, [e]),
      y = (0, n.useMemo)(
        () =>
          [...g.entries()]
            .map(([e, t]) => `${e}|${t}`)
            .sort()
            .join(","),
        [g],
      ),
      v = g.size > 0;
    ((0, c.c)(e),
      (0, n.useEffect)(() => {
        t &&
          v &&
          !s &&
          l.y.warn(
            "[useRealtimeEvmCoinMarketDataBatch] NEXT_PUBLIC_MULTICHAIN_NATS_URL is unset — live EVM market caps are disabled for this list",
          );
      }, [t, v, s]));
    let w = (0, n.useRef)(r);
    (0, n.useEffect)(() => {
      w.current = r;
    }, [r]);
    let _ = (e, t) => {
        let r = t?.trade;
        if (!r) return;
        let i = Number(r.market_cap_usd);
        if (!Number.isFinite(i) || i <= 0) return;
        let n = Number(r.price_usd);
        (0, c.H)({ mint: e, priceUsd: n, marketCapUsd: i });
        let s = t.block_timestamp ? Date.parse(t.block_timestamp) : 0 / 0,
          l = f.x.getState().peekCoin(e)?.usdAthMarketCap,
          a = {
            usdMarketCap: i,
            priceUsd: n > 0 ? n : void 0,
            lastTradeTimestamp: Number.isFinite(s) ? s : Date.now(),
            lastTradeIsBuy: "BUY" === r.type,
          };
        (l && i > l && (a.usdAthMarketCap = i), w.current(e, a));
      },
      x = (0, n.useRef)(_);
    x.current = _;
    let E = (0, n.useRef)(new Map());
    ((0, n.useEffect)(() => {
      let e = E.current;
      t && i && s && v
        ? (e.forEach(({ subId: t, mint: r }, i) => {
            g.get(i) !== r && ((0, o.V)(a.N.Multichain, t), e.delete(i));
          }),
          g.forEach((t, r) => {
            if (e.has(r)) return;
            let i = (0, o.i)(
              a.N.Multichain,
              r,
              (e) => x.current(t, e),
              void 0,
              { coalesce: "latest" },
            );
            e.set(r, { subId: i, mint: t });
          }))
        : (e.forEach(({ subId: e }) => (0, o.V)(a.N.Multichain, e)), e.clear());
    }, [y, t, i, s, v]),
      (0, n.useEffect)(() => {
        let e = E.current;
        return () => {
          (e.forEach(({ subId: e }) => (0, o.V)(a.N.Multichain, e)), e.clear());
        };
      }, []));
  }
  e.s(["f", 0, b], 562606);
  var g = e.i(646908);
  let y = [],
    v = [];
  e.s(
    [
      "f",
      0,
      function (l, a = !0) {
        let o = (0, r.k)(t.D.UAPI_STREAM_LISTS),
          {
            solanaMints: u,
            evmCoins: c,
            ordered: d,
          } = (0, n.useMemo)(() => {
            let e = [],
              t = [],
              r = [],
              n = new Set();
            for (let s of l) {
              let l = s?.mint;
              if (!l) continue;
              let a = (0, h.c)(l);
              if (n.has(a)) continue;
              n.add(a);
              let o = s.chain_id;
              (0, g.B)(o)
                ? r.push({ mint: l, chainId: o })
                : (0, h.N)({ mint: l, chainId: o })
                  ? (t.push({ mint: l, chainId: o }),
                    r.push({ mint: l, chainId: o }))
                  : (0, i.k)(l) && (e.push(l), r.push({ mint: l }));
            }
            return { solanaMints: e, evmCoins: t, ordered: r };
          }, [l]),
          f = a && o,
          m = (0, n.useRef)(d),
          p = (0, n.useRef)(null),
          [w, _] = (0, n.useState)(!1),
          [x, E] = (0, n.useState)(!1);
        ((0, n.useEffect)(() => {
          ((m.current = d), p.current?.sync(d));
        }, [d]),
          (0, n.useEffect)(() => {
            if (!f) return;
            let t = !1,
              r = null;
            return (
              e
                .A(533700)
                .then((e) => {
                  t ||
                    (E(!1),
                    (p.current = r = e.createUapiCoinMarketBatch(_)),
                    r.sync(m.current));
                })
                .catch(() => {
                  t || E(!0);
                }),
              () => {
                ((t = !0), r?.dispose(), (p.current = null), _(!1));
              }
            );
          }, [f]));
        let N = !o || x || w,
          S = N ? u : y,
          R = N ? c : v;
        ((0, s.f)(S.length > 0 ? S : y, a && S.length > 0),
          b(R.length > 0 ? R : v, a && R.length > 0));
      },
    ],
    48485,
  );
};
