// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(872682),
    i = e.i(975982),
    r = e.i(163401),
    a = e.i(369773),
    n = e.i(207816),
    s = e.i(763114),
    l = e.i(11315),
    o = e.i(653805),
    d = e.i(605587),
    c = e.i(987425);
  let u = n.MAX_TOPICS - 8,
    p = (e) => `${e.topic} ${e.mint}`,
    m = { parts: [t.Part.MARKET], delivery: "latest" },
    f = (e) => {
      try {
        if (e.chainId === r.NEAR_MAINNET_CHAIN_ID)
          return (0, r.coinTopic)(r.NEAR_MAINNET_CHAIN_ID, e.mint);
        if ((0, d.N)({ mint: e.mint, chainId: e.chainId })) {
          let t = (0, c.f)(e.chainId);
          return t ? (0, r.coinTopic)(t, e.mint) : null;
        }
        return (0, i.k)(e.mint)
          ? (0, r.coinTopic)(r.SOLANA_CHAIN_ID, e.mint)
          : null;
      } catch {
        return null;
      }
    },
    h = new Map(),
    v = new Set(),
    g = !1,
    S = (e) => {
      let t = h.get(e) ?? 0;
      return (0 !== t || !(h.size >= u)) && (h.set(e, t + 1), !0);
    },
    b = (e) => (i, r) => {
      if (
        !(0, a.isCoinState)(r) ||
        !r.market ||
        !i.some((e) => "frame" === e.kind)
      )
        return;
      let n = ((e, i) => {
        let r = Number(e.marketCapUsd?.value);
        if (!Number.isFinite(r) || r <= 0) return null;
        let a = e.priceUsd?.value ? Number(e.priceUsd.value) : void 0,
          n = Number(e.athMarketCapUsd?.value);
        return {
          usdMarketCap: r,
          priceUsd: Number.isFinite(a) ? a : void 0,
          ...(Number.isFinite(n) && n > 0 ? { usdAthMarketCap: n } : {}),
          ...(i
            ? {
                lastTradeTimestamp:
                  ((e) => {
                    let t = e.asOf?.blockTime;
                    if (t)
                      return (
                        1e3 * Number(t.seconds) + Math.floor(t.nanos / 1e6)
                      );
                  })(e) ?? Date.now(),
              }
            : {}),
          lastTradeIsBuy: e.lastSide === t.Side.BUY,
        };
      })(r.market, i.some(s.q));
      n && o.x.getState().updateCoin(e, n);
    };
  e.s([
    "COIN_PAGE_TOPIC_RESERVE",
    0,
    8,
    "LIST_FRAME_STALE_MS",
    0,
    2e4,
    "LIST_TOPIC_BUDGET",
    0,
    u,
    "createUapiCoinMarketBatch",
    0,
    function (e) {
      let t = new Map(),
        i = [],
        r = !1,
        a = (0, l.X)(),
        n = "down" === a.status();
      e(n);
      let s = (t) => {
          r || t === n || e((n = t));
        },
        o = a.onStatus((e) => {
          "down" === e ? s(!0) : "open" === e && s(!1);
        }),
        d = setInterval(() => {
          let e = a.status(),
            t = a.lastFrameAt?.() ?? 0;
          ("open" === e || "connecting" === e) &&
            t > 0 &&
            Date.now() - t > 2e4 &&
            s(!0);
        }, 5e3),
        c = (e) => {
          let i = t.get(e);
          if (i) {
            var r;
            let a;
            (t.delete(e),
              i.unsubscribe(),
              (r = i.topic),
              (a = h.get(r) ?? 0) > 1
                ? h.set(r, a - 1)
                : h.delete(r) &&
                  !g &&
                  ((g = !0),
                  queueMicrotask(() => {
                    for (let e of ((g = !1), [...v])) e();
                  })));
          }
        },
        u = () => {
          if (r) return;
          let e = new Map(),
            n = new Set();
          for (let t of i) {
            if (!t?.mint) continue;
            let i = f(t);
            if (!i || n.has(i)) continue;
            n.add(i);
            let r = { topic: i, mint: t.mint };
            e.set(p(r), r);
          }
          for (let i of [...t.keys()]) e.has(i) || c(i);
          for (let [i, r] of e)
            !t.has(i) &&
              S(r.topic) &&
              t.set(i, {
                topic: r.topic,
                unsubscribe: a.subscribe(r.topic, m, b(r.mint)),
              });
        };
      return (
        v.add(u),
        {
          sync: (e) => {
            ((i = e), u());
          },
          dispose: () => {
            for (let e of ((r = !0),
            v.delete(u),
            o(),
            clearInterval(d),
            [...t.keys()]))
              c(e);
          },
        }
      );
    },
    "listTopicsClaimed",
    0,
    () => h.size,
  ]);
};
