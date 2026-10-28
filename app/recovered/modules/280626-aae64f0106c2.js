// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(322315),
    i = e.i(254010),
    l = e.i(426091),
    a = e.i(574472),
    r = e.i(453706),
    s = e.i(352386),
    o = e.i(768820);
  e.i(12692);
  var c = e.i(398902),
    d = e.i(536925),
    m = e.i(38649),
    u = e.i(199995),
    h = e.i(256272);
  e.i(87798);
  var f = e.i(63121),
    p = e.i(137949),
    x = e.i(795663),
    b = e.i(63078),
    g = e.i(32312),
    y = e.i(811198),
    _ = e.i(249113),
    w = e.i(890088),
    j = e.i(592209),
    v = e.i(646908),
    N = e.i(662093),
    k = e.i(733089),
    C = e.i(410513),
    S = e.i(324787),
    I = e.i(793121),
    A = e.i(978854),
    U = e.i(605587),
    F = e.i(84674),
    M = e.i(90832),
    T = e.i(445242),
    P = e.i(745018),
    z = e.i(938277),
    E = e.i(802246),
    W = e.i(875737),
    O = e.i(525793);
  e.i(84455);
  var $ = e.i(242917);
  e.i(107240);
  var D = e.i(693124),
    L = e.i(529841),
    R = e.i(51206),
    B = e.i(813792);
  e.i(267146);
  var H = e.i(540805),
    q = e.i(595673);
  let V = (e) => {
      let t = Number.parseFloat(String(e ?? ""));
      return Number.isFinite(t) && t > 0 ? t : null;
    },
    Q = (e) => {
      let t = V(e.amountSol);
      return null === t ? null : `${(0, M.m)(t, 4)} SOL`;
    },
    K = (e) => V(e.amountUsd) ?? 0,
    Z = (e) => {
      let t = Number.parseFloat(e.priceUsd ?? "");
      return Number.isFinite(t) ? t : 0;
    },
    X = (e) => {
      let t = V(e.amountUsd);
      return null === t ? (Q(e) ?? "-") : (0, M.w)(t);
    },
    Y = (e) => {
      let n,
        i,
        l,
        a,
        r = (0, T.c)(9),
        { timestamp: s, format: o } = e;
      if (r[0] !== o || r[1] !== s) {
        let e = new Date(s);
        ((n = e.toISOString()),
          (i = !0),
          (l = o(e)),
          (r[0] = o),
          (r[1] = s),
          (r[2] = n),
          (r[3] = i),
          (r[4] = l));
      } else ((n = r[2]), (i = r[3]), (l = r[4]));
      return (
        r[5] !== n || r[6] !== i || r[7] !== l
          ? ((a = (0, t.jsx)("time", {
              dateTime: n,
              suppressHydrationWarning: i,
              children: l,
            })),
            (r[5] = n),
            (r[6] = i),
            (r[7] = l),
            (r[8] = a))
          : (a = r[8]),
        a
      );
    },
    J = (e) => {
      let n,
        i = (0, T.c)(5),
        { trade: l, ctx: a, suffix: r } = e;
      return (
        i[0] !== a.formatAbsoluteDate ||
        i[1] !== a.isRelative ||
        i[2] !== r ||
        i[3] !== l.timestamp
          ? ((n = a.isRelative
              ? (0, t.jsx)(L.f, {
                  timestamp: l.timestamp,
                  density: "terminal",
                  suffix: r,
                  showTitle: !0,
                })
              : (0, t.jsx)(Y, {
                  timestamp: l.timestamp,
                  format: a.formatAbsoluteDate,
                })),
            (i[0] = a.formatAbsoluteDate),
            (i[1] = a.isRelative),
            (i[2] = r),
            (i[3] = l.timestamp),
            (i[4] = n))
          : (n = i[4]),
        n
      );
    },
    G = {
      rich: (0, R.x)({
        density: "terminal",
        size: 24,
        className: (0, l.c)("ml-1", u.N),
      }),
      card: (0, R.x)({ density: "terminal", size: 20, className: "ml-1" }),
    },
    ee = (e) => $.f["buy" === e.type ? "gain" : "loss"],
    et = (e) => [
      {
        id: "account",
        header: e.t("web.coin.trades_column_account"),
        className: (0, l.c)("whitespace-nowrap", e.rich && "pl-4"),
        cell: ({ row: n }) => {
          var i;
          let l,
            a,
            r = n.userAddress,
            s =
              ((i = e.identityOf(r)),
              (l = n.username?.trim() || void 0),
              (a = n.profileImage?.trim() || void 0),
              l || a
                ? i
                  ? {
                      ...i,
                      username: i.username ?? l,
                      profileImage: i.profileImage ?? a,
                    }
                  : { username: l, profileImage: a }
                : i),
            o = "BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s" === r,
            c = e.classify(r);
          return (0, t.jsxs)("span", {
            className: "relative z-10 flex",
            children: [
              (0, t.jsx)(D.S, {
                address: r,
                chain: e.chainId,
                username: s?.username,
                profileImage: s?.profileImage,
                avatarDecoration: s?.avatarDecoration,
                size: 24,
                showAvatar:
                  o ||
                  !!(s?.username || s?.profileImage) ||
                  (!!e.rich && c.length > 0),
                avatar: o ? (0, t.jsx)(O.f, {}) : void 0,
                nameOverride: o ? e.t("web.coin.mayhem_mode") : void 0,
                verified: "lookup",
                trailing:
                  !o && s?.xUsername
                    ? (0, t.jsx)(W.f, { xUsername: s.xUsername, iconOnly: !0 })
                    : void 0,
                tags: c,
                maxTags: 2,
                onTagClick: e.onTagClick,
                hoverCard: !0,
                onClick: () =>
                  r ? (0, q.Hr)({ mint: e.mint, profileUserId: r }) : void 0,
              }),
              e.onPlotWallet && r
                ? (0, t.jsx)("button", {
                    type: "button",
                    "aria-label": e.t("web.coin.plot_wallet_trades"),
                    onClick: (t) => {
                      (t.stopPropagation(), e.onPlotWallet?.(r));
                    },
                    className: e.rich ? G.rich : G.card,
                    children: (0, t.jsx)(P.Ga, { "aria-hidden": !0 }),
                  })
                : null,
            ],
          });
        },
      },
      {
        id: "type",
        header: e.t("web.coin.trades_column_type"),
        size: 96,
        className: "whitespace-nowrap font-medium",
        cell: ({ row: n }) => {
          var i;
          let l = (i = e.t)(
              "transfer" === n.kind
                ? "buy" === n.type
                  ? "common.receive"
                  : "common.send"
                : "buy" === n.type
                  ? "web.trade.buy"
                  : "web.trade.sell",
            ),
            a = (0, t.jsx)(J, { trade: n, ctx: e, suffix: !1 });
          return (0, t.jsxs)("span", {
            className: ee(n),
            children: [
              (0, t.jsx)("span", {
                className: "hidden @[440px]:inline",
                children: l,
              }),
              (0, t.jsxs)("span", {
                className: "hidden @[360px]:inline @[440px]:hidden",
                children: [`${l} \xb7 `, a],
              }),
              (0, t.jsxs)("span", {
                className:
                  "whitespace-normal break-words leading-snug @[360px]:hidden",
                children: [`${l} \xb7 ${X(n)} \xb7 `, a],
              }),
            ],
          });
        },
      },
      {
        id: "amount",
        header: e.t("web.coin.amount_currency", { currency: "USD" }),
        minContainerWidth: 360,
        align: "end",
        className: (0, l.c)(
          "whitespace-nowrap font-medium tabular-nums",
          !e.rich && "text-text-primary",
        ),
        sortFn: (e, t) => K(e) - K(t),
        defaultSortDirection: "desc",
        cell: ({ row: n }) => {
          let i;
          return e.rich
            ? (0, t.jsx)("span", {
                className: ee(n),
                title: e.isEVM
                  ? void 0
                  : ((null === V((i = n).amountUsd) ? null : Q(i)) ?? void 0),
                children: X(n),
              })
            : (0, t.jsx)("span", { children: X(n) });
        },
      },
      {
        id: "tokens",
        header: e.symbol,
        minContainerWidth: 520,
        align: "end",
        className: "whitespace-nowrap font-medium tabular-nums",
        sortFn: (e, t) => Number(e.baseAmount) - Number(t.baseAmount),
        defaultSortDirection: "desc",
        cell: ({ row: e }) => {
          var n;
          let i;
          return (0, t.jsx)("span", {
            className: ee(e),
            children:
              Number.isFinite((i = Number((n = e.baseAmount)))) && i >= 1e3
                ? (0, z.C)(i)
                : (0, g.b)(n),
          });
        },
      },
      {
        id: "mcap",
        header: e.t("common.market_cap_short"),
        size: 88,
        minContainerWidth: 600,
        align: "end",
        className:
          "whitespace-nowrap font-medium tabular-nums text-text-primary",
        sortFn: (e, t) => Z(e) - Z(t),
        defaultSortDirection: "desc",
        cell: ({ row: n }) => {
          let i = (0, _.F)({ trade: n, supply: e.supply });
          return null === i
            ? (0, t.jsx)("span", {
                className: "text-text-tertiary",
                children: "—",
              })
            : (0, H.l)(i);
        },
      },
      {
        id: "time",
        header: e.t("web.coin.trades_column_time"),
        headerControls: (0, t.jsx)("button", {
          type: "button",
          className: (0, R.x)({
            density: "terminal",
            size: 20,
            className: "-my-0.5",
          }),
          onClick: e.onToggleTimeFormat,
          "aria-label": e.isRelative
            ? e.t("web.coin.show_absolute_timestamps")
            : e.t("web.coin.show_relative_timestamps"),
          children: (0, t.jsx)(P.E$, { "aria-hidden": !0 }),
        }),
        size: 150,
        minContainerWidth: 440,
        align: "end",
        className: "tabular-nums text-text-tertiary",
        sortFn: (e, t) =>
          new Date(e.timestamp).getTime() - new Date(t.timestamp).getTime(),
        defaultSortDirection: "desc",
        cell: ({ row: n }) => (0, t.jsx)(J, { trade: n, ctx: e, suffix: !0 }),
      },
      {
        id: "txn",
        header: e.t("web.coin.trades_column_txn"),
        align: "end",
        className: e.rich ? "pr-4" : void 0,
        minContainerWidth: 640,
        cell: ({ row: n }) => {
          let i = (0, F.X)(n.tx, e.chainId ?? void 0);
          return (0, t.jsxs)("span", {
            className:
              "relative z-10 inline-flex items-center justify-end gap-1",
            children: [
              (0, t.jsx)("a", {
                href: i,
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "hidden font-mono text-[12px] text-text-tertiary hover:text-text-primary hover:underline sm:inline",
                children: n.tx.slice(0, 6),
              }),
              (0, t.jsx)("a", {
                href: i,
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "text-text-tertiary hover:text-text-primary sm:hidden",
                "aria-label": e.t("position_sheet.activity.view_transaction"),
                children: (0, t.jsx)(P.ic, { className: "size-4" }),
              }),
              n.isBundled
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(E.f, {
                        content: (0, t.jsx)(P.ck, { className: "sm:hidden" }),
                        popoverText: e.t(
                          "web.coin.trades_info_trade_may_have_originated_from_bot",
                        ),
                      }),
                      (0, t.jsx)(B.f, {
                        density: "terminal",
                        content: e.t(
                          "web.coin.trades_info_trade_may_have_originated_from_bot",
                        ),
                        children: (0, t.jsx)("span", {
                          className: "hidden sm:inline-flex",
                          children: (0, t.jsx)(P.ck, {
                            className: "size-3.5 text-text-tertiary",
                          }),
                        }),
                      }),
                    ],
                  })
                : null,
            ],
          });
        },
      },
    ];
  e.s(["e", 0, et, "y", 0, X], 13120);
  var en = e.i(439587),
    ei = e.i(441315);
  (e.i(935302),
    e.i(607122),
    e.i(639374),
    (0, ei.C)({ density: "terminal", variant: "outlined", interactive: !1 }),
    (0, ei.C)({ density: "terminal", variant: "pressed", interactive: !1 }));
  let el =
      "h-7 w-14 shrink-0 appearance-none border-none bg-transparent pl-1 text-left text-[12px] tabular-nums text-text-primary outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
    ea = (e) => {
      let t = e.target.value;
      if ("" === t) return null;
      let n = Number(t);
      return Number.isFinite(n) && n >= 0 ? n : void 0;
    },
    er = (e, t) =>
      (0, q.jK)({ mint: e, fromValue: (0, C.Y)(C.M.getState()), toValue: t });
  function es(e) {
    return e.setSizeBand;
  }
  function eo(e) {
    return e.setSizeEnabled;
  }
  function ec(e) {
    return e.sizeBand;
  }
  function ed(e) {
    return e.sizeEnabled;
  }
  e.s(
    [
      "k",
      0,
      function () {
        let e,
          n,
          i,
          l,
          a,
          r,
          s,
          o,
          d = (0, T.c)(23),
          { t: m } = (0, c.f)(),
          u = (0, C.M)(ed),
          h = (0, C.M)(ec),
          f = (0, C.M)(eo),
          p = (0, C.M)(es);
        d[0] !== p
          ? ((e = (e) => {
              let t = ea(e);
              void 0 !== t && p({ min: t });
            }),
            (d[0] = p),
            (d[1] = e))
          : (e = d[1]);
        let x = e;
        d[2] !== p
          ? ((n = (e) => {
              let t = ea(e);
              void 0 !== t && p({ max: t });
            }),
            (d[2] = p),
            (d[3] = n))
          : (n = d[3]);
        let b = n;
        return (
          d[4] !== m
            ? ((i = m("web.coin.trades_filter_by_size")),
              (d[4] = m),
              (d[5] = i))
            : (i = d[5]),
          d[6] !== i
            ? ((l = (0, t.jsx)("label", {
                className: "shrink-0 text-[13px] text-text-tertiary",
                htmlFor: "tradesBySize",
                children: i,
              })),
              (d[6] = i),
              (d[7] = l))
            : (l = d[7]),
          d[8] !== f || d[9] !== u
            ? ((a = (0, t.jsx)(en.Z, {
                id: "tradesBySize",
                isChecked: u,
                onCheckedChange: f,
                isDisabled: !1,
              })),
              (d[8] = f),
              (d[9] = u),
              (d[10] = a))
            : (a = d[10]),
          d[11] !== l || d[12] !== a
            ? ((r = (0, t.jsxs)("div", {
                className: "flex items-center justify-between gap-2",
                children: [l, a],
              })),
              (d[11] = l),
              (d[12] = a),
              (d[13] = r))
            : (r = d[13]),
          d[14] !== b ||
          d[15] !== x ||
          d[16] !== h ||
          d[17] !== u ||
          d[18] !== m
            ? ((s = u
                ? (0, t.jsxs)("div", {
                    className:
                      "relative flex h-7 shrink-0 flex-row items-center gap-1 rounded-md border border-border-tertiary bg-bg-tertiary px-1.5 focus-within:ring-2 focus-within:ring-text-accent",
                    children: [
                      (0, t.jsx)("span", {
                        className: "shrink-0 text-[11px] text-text-tertiary",
                        children: "$",
                      }),
                      (0, t.jsx)("input", {
                        type: "number",
                        min: 0,
                        step: 1,
                        inputMode: "decimal",
                        value: h.min ?? "",
                        onChange: x,
                        placeholder: m("common.min"),
                        "aria-label": m("web.coin.trades_min_size_label"),
                        className: el,
                      }),
                      (0, t.jsx)("span", {
                        className: "text-xs text-text-tertiary",
                        children: "–",
                      }),
                      (0, t.jsx)("input", {
                        type: "number",
                        min: 0,
                        step: 1,
                        inputMode: "decimal",
                        value: h.max ?? "",
                        onChange: b,
                        placeholder: m("common.max"),
                        "aria-label": m("web.coin.trades_max_size_label"),
                        className: el,
                      }),
                    ],
                  })
                : null),
              (d[14] = b),
              (d[15] = x),
              (d[16] = h),
              (d[17] = u),
              (d[18] = m),
              (d[19] = s))
            : (s = d[19]),
          d[20] !== r || d[21] !== s
            ? ((o = (0, t.jsxs)("div", {
                className: "flex flex-col gap-2",
                children: [r, s],
              })),
              (d[20] = r),
              (d[21] = s),
              (d[22] = o))
            : (o = d[22]),
          o
        );
      },
      "Q",
      0,
      er,
    ],
    57894,
  );
  let em = [],
    eu = (0, r.default)(() => e.A(129319).then((e) => e.UapiTradesFeedMount), {
      loadableGenerated: { modules: [955973] },
      ssr: !1,
    }),
    eh = (e, t) => !!(e && t) && e.toLowerCase() === t.toLowerCase(),
    ef = (e, t) => {
      let n = 0,
        i = 0;
      for (let l of e) {
        let e = (0, g._)(l, t);
        "buy" === l.type ? (n += e) : (i += e);
      }
      return { bought: n, sold: i, net: n - i };
    },
    ep = (e, t) => !!(e.username?.trim() || t(e.userAddress)?.username),
    ex = { mint: "", legs: [] },
    eb = (0, s.forwardRef)((e, r) => {
      let {
          coin: T,
          bordered: P = !0,
          variant: z = "default",
          customizable: E = !1,
          chartLink: W = !1,
        } = e,
        O = "panel" === (0, h.u)(),
        { t: $, i18n: D } = (0, c.f)(),
        { address: L } = (0, a.F)(),
        R = (0, U.N)({ mint: T.mint, chainId: T.chain_id }),
        B = (0, N.b)(T),
        H = (0, i.k)(n.D.UAPI_STREAM_TAPE),
        [q, V] = (0, s.useState)(!1),
        Q = (0, C.M)(),
        K = (0, I.Z)(T.mint),
        Z = Q.sizeEnabled,
        X = Q.sizeBand.min ?? 0,
        Y = Q.sizeEnabled ? Q.sizeBand.max : null,
        J = "pump_fun" === Q.venue,
        G = Q.wallets,
        ee = Q.timeWindow,
        en = 1 === Q.walletClasses.length ? Q.walletClasses[0] : null,
        ei =
          1 === G.length
            ? G[0]
            : "you" === en
              ? (L ?? null)
              : ("dev" === en && T.creator) || null,
        el = 1 !== G.length && null !== ei,
        ea = ei ? "scoped" : "all",
        {
          trades: es,
          allTrades: eo,
          pagination: ec,
          resetTrades: ed,
          appendEventTrades: eb,
          dropLiveLegs: eg,
          fetchTrades: ey,
          fetchMore: e_,
          fetchTradesRange: ew,
          loadMoreWindow: ej,
          windowCoverage: ev,
          loading: eN,
          loadingMore: ek,
        } = (0, g.W)({
          mint: T.mint,
          limit: 100,
          program: T.program,
          chainId: T.chain_id,
        }),
        eC = ei ?? (Q.walletClasses.includes("you") ? (L ?? null) : null),
        eS = R && !!eC && !(0, U.h)(eC),
        eI = (0, x.O)({ solAddress: eC ?? void 0, enabled: eS }),
        eA = eS && eI.isPending,
        eU = eS ? (eI.data ?? eC) : eC,
        eF = ei ? eU : null,
        eM = eC && eh(eC, L) ? eU : (K.viewerActor ?? L ?? null),
        [eT] = (0, d.r)(X, 500),
        eP = eF ?? "",
        [ez, eE] = (0, s.useState)(ex),
        eW = ez.mint === T.mint ? ez.legs : ex.legs,
        eO = (0, s.useRef)(() => null),
        e$ = (0, s.useCallback)(
          (e, t) => {
            let n = e.filter((e) => {
              var t;
              let n;
              return (
                (!eF || eh(e.userAddress, eF)) &&
                (!ee ||
                  ((t = e.timestamp),
                  (n = new Date(t).getTime()) >= ee.fromMs && n < ee.toMs))
              );
            });
            if (J) {
              let e = eO.current,
                t = [],
                i = [];
              for (let l of n) (ep(l, e) ? t : i).push(l);
              (i.length &&
                eE((e) =>
                  ((e, t, n) => {
                    let i = e.mint === t ? e.legs : [],
                      l = new Set(i.map((e) => e.slotIndexId)),
                      a = [];
                    for (let e of n) {
                      if (e.slotIndexId) {
                        if (l.has(e.slotIndexId)) continue;
                        l.add(e.slotIndexId);
                      }
                      a.push(e);
                    }
                    return a.length
                      ? { mint: t, legs: [...i, ...a].slice(-200) }
                      : e.mint === t
                        ? e
                        : ex;
                  })(e, T.mint, i),
                ),
                (n = t));
            }
            if (!n.length) return;
            let i = Z ? { currency: "usd", min: eT } : null;
            eb(n, t ? { sizeThreshold: i, ordered: t } : { sizeThreshold: i });
          },
          [eb, T.mint, eT, J, eF, ee, Z],
        ),
        eD = (0, s.useCallback)((e) => e$(e, !1), [e$]),
        eL = (0, s.useCallback)((e) => e$(e, !0), [e$]),
        eR = (0, s.useCallback)((e) => eD([e]), [eD]);
      ((0, s.useImperativeHandle)(r, () => ({ addTrade: eR })),
        (0, A.b)({ mint: T.mint, onBatch: eD, enabled: !(H && q) }),
        (0, s.useEffect)(() => {
          ed();
        }, [eP, Z, ee, ed]));
      let eB = !!ei && eA,
        eH = (0, s.useCallback)(() => {
          if (eB) return;
          let e = { minUsdAmount: Z ? eT : 0, userAddress: eP };
          ee
            ? ew({
                ...e,
                fromSec: Math.floor(ee.fromMs / 1e3),
                toSec: Math.ceil(ee.toMs / 1e3),
              })
            : ey({ ...e, offset: 0 });
        }, [eB, eT, Z, ey, ew, eP, ee]);
      (0, s.useEffect)(() => {
        eH();
      }, [eH]);
      let eq = (0, s.useRef)(eN);
      eq.current = eN;
      let eV = (0, s.useCallback)(() => {
          eq.current || eH();
        }, [eH]),
        eQ = H
          ? (0, t.jsx)(eu, {
              mint: T.mint,
              chainId: T.chain_id,
              enabled: H,
              onTrades: eL,
              onRevoke: eg,
              onResync: eV,
              onServing: V,
            })
          : null,
        eK = (0, j.v)(D.language) ?? j.T,
        eZ = (0, s.useCallback)((e) => (0, w.V)(e, eK), [eK]),
        eX = K.classify,
        eY = (0, s.useCallback)(
          (e) => {
            if (!e) return [];
            let t = [...eX(e)];
            return (
              eh(e, eM) && !t.includes("you") && t.push("you"),
              eh(e, T.creator) && !t.includes("dev") && t.push("dev"),
              (0, k.O)(t)
            );
          },
          [eX, eM, T.creator],
        ),
        { side: eJ, search: eG, walletClasses: e0 } = Q,
        e1 = el ? em : e0,
        e2 =
          J ||
          "all" !== eJ ||
          null != Y ||
          G.length > 1 ||
          e1.length > 0 ||
          "" !== eG.trim(),
        e3 = Z ? X : 0,
        e4 = (0, s.useMemo)(() => {
          if (!e2 && e3 <= 0) return es;
          let e = G.length > 1 ? new Set(G.map(k.P)) : null,
            t = eG.trim().toLowerCase();
          return es.filter((n) => {
            if ("all" !== eJ && n.type !== eJ) return !1;
            let i = (0, g._)(n, "usd");
            if ((e3 > 0 && i < e3) || (null != Y && i > Y)) return !1;
            let l = n.userAddress ?? "";
            if (e && !e.has((0, k.P)(l))) return !1;
            if (e1.length > 0) {
              let e = eY(l);
              if (!e1.some((t) => e.includes(t))) return !1;
            }
            if (t) {
              let e = K.identityOf(l)?.username?.toLowerCase();
              if (!e?.includes(t) && !l.toLowerCase().startsWith(t)) return !1;
            }
            return !0;
          });
        }, [e2, es, G, eG, eJ, e3, Y, e1, K, eY]),
        e5 = (0, s.useMemo)(() => {
          let e = (J ? es : e4).map((e) => e.userAddress);
          return J && eW.length ? [...e, ...eW.map((e) => e.userAddress)] : e;
        }, [J, es, e4, eW]),
        { identityOf: e6, resolving: e7 } = (0, b.f)({
          actors: e5,
          fallback: K.identityOf,
        });
      ((eO.current = e6),
        (0, s.useEffect)(() => {
          if (0 === eW.length) return;
          let e = J ? eW.filter((e) => ep(e, e6)) : eW;
          if (0 === e.length) return;
          let t = new Set(e);
          (eE((e) => ({ mint: e.mint, legs: e.legs.filter((e) => !t.has(e)) })),
            e$(e, !0));
        }, [e$, e6, eW, J]));
      let e8 = (0, s.useMemo)(
          () => (J ? e4.filter((e) => ep(e, e6)) : e4),
          [J, e4, e6],
        ),
        e9 = (0, s.useRef)(0),
        te = `${J}|${eJ}|${Y}|${G.join(",")}|${e1.join(",")}|${eG}`;
      ((0, s.useEffect)(() => {
        e9.current = 0;
      }, [te]),
        (0, s.useEffect)(() => {
          !e2 ||
            eN ||
            ek ||
            (J && e7) ||
            !ec.hasMore ||
            e8.length >= 30 ||
            e9.current >= 5 ||
            ((e9.current += 1), e_());
        }, [e2, J, e7, eN, ek, ec.hasMore, e8.length, e_]));
      let tt = (0, s.useMemo)(() => {
          if ("all" === ea || ee || ec.hasMore || 0 === eo.length) return null;
          let e = ef(eo, "usd"),
            t = e.net < 0 ? "-" : "+";
          return {
            bought: (0, M.w)(e.bought),
            sold: (0, M.w)(e.sold),
            net: `${t}${(0, M.w)(Math.abs(e.net))}`,
          };
        }, [eo, ec.hasMore, ee, ea]),
        [tn, ti] = (0, s.useState)(!0),
        tl = tn || o.isMobile,
        ta = (0, s.useCallback)(() => ti((e) => !e), []),
        tr = (0, C.M)((e) => e.toggleWalletClass),
        ts = (0, s.useCallback)(
          (e) => {
            C.B.includes(e) && tr(e);
          },
          [tr],
        ),
        to = (0, C.M)((e) => e.setWallets),
        tc = (0, s.useCallback)(
          (e) => {
            (er(T.mint, "wallet:table-row"),
              to([e], "table", { source: "table-row", plotOnChart: !0 }));
          },
          [T.mint, to],
        ),
        td = (0, s.useMemo)(
          () => ({
            rich: O,
            onPlotWallet: W ? tc : void 0,
            t: $,
            isEVM: R,
            chainId: T.chain_id,
            mint: T.mint,
            symbol: T.symbol ?? T.mint,
            supply: B,
            devAddress: T.creator,
            viewerAddress: eM,
            identityOf: e6,
            classify: eY,
            onTagClick: ts,
            isRelative: tl,
            onToggleTimeFormat: ta,
            formatAbsoluteDate: eZ,
          }),
          [
            $,
            R,
            T.chain_id,
            T.mint,
            T.symbol,
            B,
            T.creator,
            eM,
            e6,
            eY,
            ts,
            tl,
            ta,
            eZ,
            O,
            W,
            tc,
          ],
        ),
        tm = (0, s.useMemo)(() => et(td), [td]),
        tu = (0, S.g)(),
        th = (0, S.w)((e) => e.tables.trades),
        tf = E && tu ? th : S.c.trades,
        tp = (0, s.useMemo)(() => {
          let e = new Map(tm.map((e) => [e.id, e]));
          return (0, y.u)({ config: tf, catalog: _.W }).flatMap(
            (t) => e.get(t.id) ?? [],
          );
        }, [tm, tf]),
        tx = (() => {
          if (!ee || !ev || eN) return null;
          let e = 100 * ev.pagesScanned;
          return "complete" === ev.state
            ? ev.matched > 0
              ? $("web.coin.trades_window_showing", { count: ev.matched })
              : null
            : "truncated" === ev.state
              ? $("web.coin.trades_window_partial", {
                  count: ev.matched,
                  scanned: e,
                })
              : $("web.coin.trades_window_unreached", { scanned: e });
        })(),
        tb = !!ee && null != ev && "complete" !== ev.state,
        tg = (0, s.useCallback)(
          (e) => {
            window.open(
              (0, F.X)(e.tx, T.chain_id ?? void 0),
              "_blank",
              "noopener,noreferrer",
            );
          },
          [T.chain_id],
        ),
        ty = J && 0 === e8.length && (e7 || ek),
        t_ = !eN && !ty && 0 === e8.length,
        tw = eN && 0 === es.length;
      if ("compact" === z) {
        let e = J ? es.filter((e) => ep(e, e6)) : es;
        return (0, t.jsxs)(t.Fragment, {
          children: [
            eQ,
            (0, t.jsx)(m.f, {
              coin: T,
              isEVM:
                R ||
                (0, v.L)(T.chain_id) ||
                (0, v.B)(T.chain_id) ||
                (0, v._)(T.chain_id),
              trades: e,
              viewerAddress: eM,
              devAddress: T.creator,
              isRelative: tl,
              onToggleRelative: ta,
              formatAbsoluteDate: eZ,
              status:
                tw || eB || ty
                  ? "loading"
                  : e.length > 0
                    ? "ready"
                    : t_
                      ? "empty"
                      : "idle",
            }),
          ],
        });
      }
      return (0, t.jsxs)("div", {
        "data-testid": "coin-trades-panel",
        className: "flex w-full min-w-0 flex-col gap-3",
        children: [
          eQ,
          tt
            ? (0, t.jsx)("p", {
                "data-testid": "coin-trades-summary",
                className: (0, l.c)(
                  "px-1 text-xs text-text-tertiary",
                  O && "px-4 pt-3",
                ),
                children: $("web.coin.trades_source_summary", tt),
              })
            : null,
          (0, t.jsx)(f.k, {
            rows: e8,
            columns: tp,
            rowKey: g.m,
            status: tw || eB || ty ? "loading" : t_ ? "empty" : "ready",
            loadingLabel: $("web.coin.loading"),
            renderEmpty: () => $("web.coin.no_trades"),
            onRowClick: tg,
            rowActionLabel: () => $("position_sheet.activity.view_transaction"),
            live: {
              pillLabel: (e) =>
                $("web.coin.trades_show_new", {
                  count: e,
                  shown: e > 99 ? "99+" : String(e),
                }),
              pillTail: (e) => $("web.coin.trades_new", { count: e }),
            },
            density: O ? "rich" : tf.density,
            sortIndicator: O ? "active" : "always",
            freshRowClassName: O
              ? (e) => u.p["buy" === e.type ? "gain" : "loss"]
              : void 0,
            rowClassName: O ? () => u.T : void 0,
            rowAttributes: O
              ? (e) => ({ "data-wallet": e.userAddress ?? void 0 })
              : void 0,
            chrome: P ? "card" : "flat",
            footer: ee
              ? tx || tb
                ? (0, t.jsxs)("div", {
                    "data-testid": "coin-trades-window-coverage",
                    className:
                      "flex flex-wrap items-center justify-between gap-2 text-xs text-text-tertiary",
                    children: [
                      (0, t.jsx)("span", { children: tx }),
                      tb
                        ? (0, t.jsx)(p.r, {
                            kind: "loadMore",
                            density: "terminal",
                            label: $("web.coin.trades_window_load_more"),
                            busy: eN,
                            onClick: () => void ej(),
                            className: "w-auto",
                          })
                        : null,
                    ],
                  })
                : null
              : (e2 && !t_) || ec.hasMore
                ? (0, t.jsxs)("div", {
                    className:
                      "flex flex-wrap items-center justify-between gap-2",
                    children: [
                      e2 && !t_
                        ? (0, t.jsx)("p", {
                            className: "text-xs text-text-tertiary",
                            children: $("web.coin.trades_loaded_only_hint"),
                          })
                        : (0, t.jsx)("span", {}),
                      ec.hasMore && !tw
                        ? (0, t.jsx)(p.r, {
                            kind: "loadMore",
                            density: "terminal",
                            label: $("web.common.load_more"),
                            busy: ek,
                            onClick: () => void e_(),
                            className: "w-auto",
                          })
                        : null,
                    ],
                  })
                : null,
            "aria-label": $("web.coin.trades_tab"),
          }),
        ],
      });
    });
  ((eb.displayName = "Trades"),
    e.s(["U", 0, eb, "L", 0, ef], 280626),
    e.s(
      [
        "f",
        0,
        function (e) {
          let t = (0, s.useRef)(null);
          return (0, s.useCallback)(
            (n) => {
              if (e) {
                if (n) {
                  ((t.current = n), (e.current = n));
                  return;
                }
                (e.current === t.current && (e.current = null),
                  (t.current = null));
              }
            },
            [e],
          );
        },
      ],
      877801,
    ));
};
