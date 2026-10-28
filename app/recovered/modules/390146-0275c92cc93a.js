// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(352386),
    r = e.i(466931);
  let i = "alerts-feed",
    l = (e) => Math.max(0, Math.round(e)),
    a = (e) => {
      (0, r.B)({
        name: "friends-feed-first-rows",
        feature: i,
        operation: e.surface,
        context: {
          totalMs: l(e.totalMs),
          cacheState: e.cacheState,
          itemCount: e.itemCount,
        },
      });
    },
    o = (e) => {
      (0, r.B)({
        name: "friends-feed-live-ready",
        feature: i,
        operation: e.surface,
        context: {
          totalMs: l(e.totalMs),
          presenceMs: l(e.presenceMs),
          laneWaitMs: l(e.laneWaitMs),
          natsConnectedMs: l(e.natsConnectedMs),
        },
      });
    },
    s = (e) => {
      (0, r.B)({
        name: "friends-feed-live-degraded",
        feature: i,
        operation: e.surface,
        context: { reason: e.reason },
      });
    },
    u = (e) => {
      (0, r.B)({
        name: "friends-feed-live-reconnect",
        feature: i,
        operation: e.surface,
      });
    },
    c = (e) => {
      (0, r.B)({
        name: "friends-feed-live-event",
        feature: i,
        operation: e.surface,
        context: {
          path: e.path,
          kind: e.kind,
          serverToReceiptMs:
            void 0 === e.serverToReceiptMs ? void 0 : l(e.serverToReceiptMs),
          receiptToPaintMs:
            void 0 === e.receiptToPaintMs ? void 0 : l(e.receiptToPaintMs),
          pagesRefetched: e.pagesRefetched,
          count: e.count,
        },
      });
    };
  (e.s(["Y", 0, a, "q", 0, s, "Q", 0, c, "c", 0, o, "V", 0, u], 572128),
    e.s(
      [
        "f",
        0,
        (e) => {
          let r,
            i,
            l,
            o,
            s,
            u = (0, t.c)(16),
            {
              surface: c,
              enabled: d,
              identity: m,
              hasData: f,
              itemCount: p,
              queryClient: h,
              queryKey: g,
            } = e,
            y = (0, n.useRef)(null),
            v = (0, n.useRef)(!1),
            b = (0, n.useRef)(null),
            w = (0, n.useRef)(g);
          (u[0] !== g
            ? ((r = () => {
                w.current = g;
              }),
              (u[0] = g),
              (u[1] = r))
            : (r = u[1]),
            (0, n.useEffect)(r),
            u[2] !== d || u[3] !== h
              ? ((i = () => {
                  if (!d) {
                    y.current = null;
                    return;
                  }
                  ((y.current = performance.now()),
                    (v.current = void 0 !== h.getQueryData(w.current)),
                    (b.current = null));
                }),
                (u[2] = d),
                (u[3] = h),
                (u[4] = i))
              : (i = u[4]),
            u[5] !== d || u[6] !== m || u[7] !== h
              ? ((l = [d, m, h]),
                (u[5] = d),
                (u[6] = m),
                (u[7] = h),
                (u[8] = l))
              : (l = u[8]),
            (0, n.useEffect)(i, l),
            u[9] !== d ||
            u[10] !== f ||
            u[11] !== m ||
            u[12] !== p ||
            u[13] !== c
              ? ((o = () => {
                  if (!d || !f || b.current === m) return;
                  let e = y.current;
                  null !== e &&
                    ((b.current = m),
                    a({
                      surface: c,
                      totalMs: performance.now() - e,
                      cacheState: v.current ? "warm" : "cold",
                      itemCount: p,
                    }));
                }),
                (s = [d, f, m, p, c]),
                (u[9] = d),
                (u[10] = f),
                (u[11] = m),
                (u[12] = p),
                (u[13] = c),
                (u[14] = o),
                (u[15] = s))
              : ((o = u[14]), (s = u[15])),
            (0, n.useEffect)(o, s));
        },
      ],
      390146,
    ));
  var d = e.i(985526),
    m = e.i(390065),
    f = e.i(606933),
    p = e.i(283087),
    h = e.i(573525),
    g = e.i(646908),
    y = e.i(605587);
  let v = (e) => !e.chainId && (0, g.R)(e.mint);
  var b = e.i(735821),
    w = e.i(541710),
    x = e.i(668487);
  let k = new Set(["callout", "update", "reply", "quote", "repost"]),
    M = {
      minTradeAmountUsd: null,
      minMarketCapUsd: null,
      maxMarketCapUsd: null,
    },
    C = (e) => {
      let t = {};
      return (
        null !== e.minTradeAmountUsd &&
          (t.minTradeAmountUsd = e.minTradeAmountUsd),
        null !== e.minMarketCapUsd && (t.minMarketCapUsd = e.minMarketCapUsd),
        null !== e.maxMarketCapUsd && (t.maxMarketCapUsd = e.maxMarketCapUsd),
        t
      );
    },
    I = (e) => JSON.stringify(C(e)),
    S = Promise.resolve();
  function N(e) {
    let t = S.then(e);
    return ((S = t.catch(() => void 0)), t);
  }
  e.s(
    [
      "f",
      0,
      function ({
        enabled: e,
        viewer: t,
        queryKey: r,
        kinds: i,
        filters: l = M,
        surface: a = "coin-rail",
        onNewContent: S,
        onTradeItems: A,
      }) {
        let j = (0, f.useQueryClient)(),
          _ = (0, w.M)((0, w.l)()),
          U = (0, n.useRef)(S),
          E = (0, n.useRef)(A);
        (0, n.useEffect)(() => {
          ((U.current = S), (E.current = A));
        }, [S, A]);
        let T = (0, n.useRef)(r);
        (0, n.useEffect)(() => {
          T.current = r;
        });
        let [$, R] = (0, n.useState)(null),
          D = (0, n.useRef)(null),
          F = (0, n.useRef)(l);
        (0, n.useEffect)(() => {
          F.current = l;
        }, [l]);
        let P = (0, n.useRef)(null),
          B = (0, n.useRef)(null),
          q = (0, n.useRef)(new Set()),
          O = (0, n.useRef)([]),
          z = (0, n.useRef)(null),
          W = (0, n.useRef)(null),
          L = (0, n.useRef)(null),
          V = (0, n.useRef)(null),
          Q = (0, n.useRef)(!1),
          G = () => {
            (null !== z.current &&
              (clearTimeout(z.current), (z.current = null)),
              (O.current = []));
          };
        ((0, n.useEffect)(() => {
          (q.current.clear(), G());
        }, [t, i, l]),
          (0, n.useEffect)(() => G, []),
          (0, n.useEffect)(() => {
            let n;
            if (!e || null === t) return;
            ((W.current = Date.now()), (V.current = null), (Q.current = !1));
            let r = !1,
              i = async () => {
                let e = null,
                  t = Date.now(),
                  n = t;
                try {
                  e = await N(() => {
                    n = Date.now();
                    let e = F.current;
                    return ((P.current = I(e)), (0, b.m)({ filters: C(e) }));
                  });
                } catch {
                  r || s({ surface: a, reason: "presence-failed" });
                }
                if (!r && e) {
                  let r = Date.now();
                  (null === V.current &&
                    (V.current = { laneWaitMs: n - t, presenceMs: r - n }),
                    null === e.subject &&
                      s({ surface: a, reason: "subject-null" }),
                    R(e),
                    (D.current = e.heartbeatIntervalSeconds));
                }
              },
              l = async () => {
                (await i(),
                  r ||
                    (n = setTimeout(l, 1e3 * Math.max(15, D.current || 60))));
              };
            return (
              (B.current = i),
              l(),
              () => {
                ((r = !0),
                  (B.current = null),
                  (P.current = null),
                  void 0 !== n && clearTimeout(n),
                  R(null),
                  N(() => (0, b.$)()).catch(() => void 0));
              }
            );
          }, [e, t, a]),
          (0, n.useEffect)(() => {
            let e = P.current;
            null !== e && e !== I(l) && B.current?.();
          }, [l]));
        let H = (0, n.useCallback)(() => {
            let e = O.current;
            if (0 === e.length) return 0;
            O.current = [];
            let t = Date.now(),
              n = e[e.length - 1],
              r = e[0];
            return (
              c({
                surface: a,
                path: "trade-insert",
                kind: "trade",
                serverToReceiptMs: r?.serverToReceiptMs,
                receiptToPaintMs: n ? t - n.receivedAtMs : void 0,
                count: e.length,
              }),
              E.current?.(e.map((e) => e.item)),
              e.length
            );
          }, [a]),
          K = (0, n.useCallback)(() => {
            z.current = H() > 0 ? setTimeout(K, 1e3) : null;
          }, [H]),
          Z = (0, n.useCallback)(
            (e) => {
              var t;
              let n;
              if (
                !(
                  e &&
                  "object" == typeof e &&
                  "string" == typeof e.kind &&
                  "string" == typeof e.id
                )
              )
                return;
              let r = q.current;
              if (!e.id || r.has(e.id)) return;
              (r.size >= 512 && r.clear(), r.add(e.id));
              let o = Date.now(),
                s = Number.isFinite((n = Date.parse(e.createdAt ?? "")))
                  ? (0, x.t)() - n
                  : void 0,
                u = i.split(","),
                d = (t) => {
                  (c({
                    surface: a,
                    path: "pill-armed",
                    kind: e.kind,
                    serverToReceiptMs: s,
                  }),
                    U.current({ id: e.id, coinMint: t, receivedAtMs: o }));
                };
              if ("trade" === e.kind || "collectible" === e.kind) {
                if (
                  !u.includes(e.kind) ||
                  (void 0 !== e.coin &&
                    ((t = e.coin),
                    !(
                      0x536f6c4d === t.chainId ||
                      (t.chainId ? (0, y.g)(String(t.chainId)) : _ && v(t))
                    ))) ||
                  (null !== l.minTradeAmountUsd &&
                    (e.trade?.amountUsd ?? 0) < l.minTradeAmountUsd) ||
                  null !== l.minMarketCapUsd ||
                  null !== l.maxMarketCapUsd
                )
                  return;
                let n = ((e) => {
                  let t =
                    "trade" === e.kind || "collectible" === e.kind
                      ? e.kind
                      : null;
                  if (null === t || e.stub) return null;
                  let { trade: n, author: r, coin: i } = e;
                  return n && r && i
                    ? {
                        kind: t,
                        author: {
                          userId: r.userId,
                          userName: r.userName,
                          profileImage: r.profileImage ?? null,
                          walletAddress: r.walletAddress ?? null,
                          isVerified: r.isVerified,
                          verifiedBadgeVisible: r.isVerified,
                          resolvedAvatarDecoration: null,
                          xUsername: null,
                          kind: "person",
                        },
                        coinMint: i.mint,
                        chainId: i.chainId,
                        ...(v(i) ? { chain: g.d } : {}),
                        walletAddress: r.walletAddress ?? null,
                        createdAt: e.createdAt,
                        coinName: null,
                        coinImage: i.imageUri ?? null,
                        symbol: i.symbol ?? null,
                        marketCap: null,
                        callout: null,
                        position: null,
                        reply: null,
                        repost: null,
                        post: null,
                        like: null,
                        totalCallouts: 0,
                        trade: {
                          tx: n.tx,
                          isBuy: n.isBuy,
                          timestamp: e.createdAt,
                          baseAmount: n.baseAmount ?? null,
                          amountUsd: n.amountUsd ?? null,
                          priceUsd: n.priceUsd ?? null,
                          fillMarketCapUsd: null,
                          groupId: null,
                        },
                      }
                    : null;
                })(e);
                if (!n) return;
                let r = j.getQueryData(T.current);
                return r && 0 !== r.pages.length && void 0 !== E.current
                  ? ((O.current = [
                      { item: n, receivedAtMs: o, serverToReceiptMs: s },
                      ...O.current,
                    ].slice(0, 50)),
                    void (
                      null === z.current &&
                      (H(), (z.current = setTimeout(K, 1e3)))
                    ))
                  : void d(n.coinMint);
              }
              k.has(e.kind) &&
                u.includes(e.kind) &&
                d(e.coin?.mint ?? e.stub?.coinMint ?? null);
            },
            [j, i, l, a, H, K, _],
          ),
          X = $?.subject ?? "",
          J = (0, p.f)(),
          Y = e && null !== t && "" !== X && J;
        (0, h.f)({ type: d.N.Core, subject: X, enabled: Y, onEvent: Z });
        let { connectionStates: ee } = (0, m.N)(),
          et = ee[d.N.Core] ?? !1;
        ((0, n.useEffect)(() => {
          et && null === L.current && (L.current = Date.now());
        }, [et]),
          (0, n.useEffect)(() => {
            if (!Y || !et || Q.current) return;
            let e = W.current;
            if (null === e) return;
            Q.current = !0;
            let t = Date.now();
            o({
              surface: a,
              totalMs: t - e,
              presenceMs: V.current?.presenceMs ?? 0,
              laneWaitMs: V.current?.laneWaitMs ?? 0,
              natsConnectedMs: (L.current ?? t) - e,
            });
          }, [Y, et, a]));
        let en = (0, n.useRef)(!1),
          er = (0, n.useRef)(!1);
        (0, n.useEffect)(() => {
          let e = et && !er.current && en.current;
          ((er.current = et),
            et && (en.current = !0),
            e &&
              Y &&
              (u({ surface: a }),
              j.invalidateQueries({ queryKey: T.current, exact: !0 })));
        }, [et, Y, j, a]);
      },
    ],
    106009,
  );
};
