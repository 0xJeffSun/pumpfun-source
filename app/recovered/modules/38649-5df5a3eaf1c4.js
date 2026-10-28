// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(745018),
    l = e.i(426091),
    a = e.i(352386);
  e.i(12692);
  var r = e.i(398902);
  e.i(84455);
  var s = e.i(678730);
  e.i(107240);
  var o = e.i(693124),
    c = e.i(745674),
    d = e.i(529841),
    m = e.i(787773),
    u = e.i(813792),
    h = e.i(735666),
    f = e.i(32312),
    p = e.i(249113);
  e.i(267146);
  var x = e.i(540805),
    b = e.i(646908),
    g = e.i(662093),
    y = e.i(84674),
    _ = e.i(90832);
  let w = (0, l.c)(
      "h-auto align-middle first:pl-3 last:pr-3",
      c.h.compact,
      c.d.compact,
      c.c,
    ),
    j = (0, l.c)(
      "whitespace-nowrap align-middle tabular-nums first:pl-3 last:pr-3",
      c.a.compact,
      c.D,
      "[tr:last-child>&]:shadow-none",
    ),
    v = (0, l.c)(c.n, "text-left text-text-quaternary transition-colors"),
    N = (0, l.c)("border-0 transition-colors", c.P.compact, c.e),
    k = (e) => {
      let t = Number.parseFloat(e ?? "");
      return Number.isFinite(t) && t > 0 ? t : null;
    };
  function C(e) {
    return e.stopPropagation();
  }
  function S(e) {
    return "mc" === e ? "price" : "mc";
  }
  function I(e) {
    return "usd" === e ? "quote" : "usd";
  }
  function A(e) {
    return (0, t.jsx)(h.N, {
      className: "border-0 hover:bg-transparent",
      children: (0, t.jsx)(h.d, {
        className: (0, l.c)("text-center", c.p.compact, m.Q.terminal),
        colSpan: 4,
        children: e,
      }),
    });
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let m,
          U,
          F,
          M,
          T,
          P,
          z,
          E,
          W,
          O,
          $,
          D,
          L,
          R,
          B,
          H,
          q,
          V,
          Q,
          K,
          Z = (0, n.c)(59),
          {
            coin: X,
            isEVM: Y,
            trades: J,
            viewerAddress: G,
            devAddress: ee,
            isRelative: et,
            onToggleRelative: en,
            formatAbsoluteDate: ei,
            status: el,
          } = e,
          { t: ea } = (0, r.f)(),
          [er, es] = (0, a.useState)(Y ? "usd" : "quote"),
          [eo, ec] = (0, a.useState)("mc"),
          ed = (0, g.b)(X),
          em = Y || "usd" === er;
        Z[0] !== X.chain_id
          ? ((m =
              (0, b.L)(X.chain_id) ||
              (0, b.B)(X.chain_id) ||
              (0, b._)(X.chain_id)),
            (Z[0] = X.chain_id),
            (Z[1] = m))
          : (m = Z[1]);
        let eu = m,
          eh = em ? "USD" : "SOL";
        Z[2] !== eo || Z[3] !== ed
          ? ((U = (e) => {
              if ("mc" === eo) {
                let t = (0, p.F)({ trade: e, supply: ed });
                return null === t ? "—" : (0, x.l)(t);
              }
              let n = ((e) => {
                if (!Number.isFinite(e) || e <= 0) return { text: "—" };
                let t = () => ({
                  text: new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumSignificantDigits: 4,
                  }).format(e),
                });
                if (e >= 0.001) return t();
                let n = e.toFixed(20).slice(2),
                  i = n.search(/[1-9]/),
                  l = -1 === i ? n.length : i;
                return l < 4
                  ? t()
                  : {
                      prefix: "$0.0",
                      zeros: l,
                      digits: n.slice(i, i + 3).replace(/0+$/, "") || "0",
                    };
              })(k(e.priceUsd) ?? 0 / 0);
              return "text" in n
                ? n.text
                : (0, t.jsxs)(t.Fragment, {
                    children: [
                      n.prefix,
                      (0, t.jsx)("sub", {
                        className: "text-[10px] leading-none",
                        children: n.zeros,
                      }),
                      n.digits,
                    ],
                  });
            }),
            (Z[2] = eo),
            (Z[3] = ed),
            (Z[4] = U))
          : (U = Z[4]);
        let ef = U;
        Z[5] !== eu || Z[6] !== em
          ? ((F = (e) => {
              if (em && eu && null === k(e.amountUsd)) return "—";
              let t = (0, f._)(e, em ? "usd" : "sol");
              return em
                ? (0, x.l)(t)
                : Number.isFinite(t)
                  ? Math.abs(t) >= 1e4
                    ? (0, _.S)(t)
                    : new Intl.NumberFormat("en-US", {
                        maximumSignificantDigits: 4,
                      }).format(t)
                  : "—";
            }),
            (Z[5] = eu),
            (Z[6] = em),
            (Z[7] = F))
          : (F = Z[7]);
        let ep = F;
        return (
          Z[8] !== Y || Z[9] !== ea || Z[10] !== eh
            ? ((M = (0, t.jsx)(h.U, {
                className: w,
                children: Y
                  ? (0, t.jsxs)("span", {
                      className: "inline-flex items-center gap-1",
                      children: [
                        ea("web.coin.trades_column_total"),
                        (0, t.jsx)("span", {
                          className: "text-text-quaternary",
                          children: eh,
                        }),
                      ],
                    })
                  : (0, t.jsxs)("button", {
                      type: "button",
                      "data-testid": "compact-trades-denomination-toggle",
                      "aria-label": ea("web.trade.switch_denomination", {
                        symbol: eh,
                      }),
                      onClick: () => es(I),
                      className: v,
                      children: [
                        ea("web.coin.trades_column_total"),
                        (0, t.jsx)("span", {
                          className: "text-text-quaternary",
                          children: eh,
                        }),
                      ],
                    }),
              })),
              (Z[8] = Y),
              (Z[9] = ea),
              (Z[10] = eh),
              (Z[11] = M))
            : (M = Z[11]),
          Z[12] !== eo || Z[13] !== ea
            ? ((T =
                "mc" === eo
                  ? ea("web.coin.trades_show_price")
                  : ea("web.coin.trades_show_market_cap")),
              (Z[12] = eo),
              (Z[13] = ea),
              (Z[14] = T))
            : (T = Z[14]),
          Z[15] === Symbol.for("react.memo_cache_sentinel")
            ? ((P = () => ec(S)), (Z[15] = P))
            : (P = Z[15]),
          Z[16] !== eo || Z[17] !== ea
            ? ((z =
                "mc" === eo
                  ? ea("common.market_cap_short")
                  : ea("web.coin.trades_column_price")),
              (Z[16] = eo),
              (Z[17] = ea),
              (Z[18] = z))
            : (z = Z[18]),
          Z[19] !== T || Z[20] !== z
            ? ((E = (0, t.jsx)(h.U, {
                className: w,
                children: (0, t.jsx)("button", {
                  type: "button",
                  "data-testid": "compact-trades-market-toggle",
                  "aria-label": T,
                  onClick: P,
                  className: v,
                  children: z,
                }),
              })),
              (Z[19] = T),
              (Z[20] = z),
              (Z[21] = E))
            : (E = Z[21]),
          Z[22] !== ea
            ? ((W = ea("web.coin.trades_column_trader")),
              (Z[22] = ea),
              (Z[23] = W))
            : (W = Z[23]),
          Z[24] !== W
            ? ((O = (0, t.jsx)(h.U, { className: w, children: W })),
              (Z[24] = W),
              (Z[25] = O))
            : (O = Z[25]),
          Z[26] === Symbol.for("react.memo_cache_sentinel")
            ? (($ = (0, l.c)(w, "text-right")), (Z[26] = $))
            : ($ = Z[26]),
          Z[27] !== et || Z[28] !== ea
            ? ((D = et
                ? ea("web.coin.show_absolute_timestamps")
                : ea("web.coin.show_relative_timestamps")),
              (Z[27] = et),
              (Z[28] = ea),
              (Z[29] = D))
            : (D = Z[29]),
          Z[30] === Symbol.for("react.memo_cache_sentinel")
            ? ((L = (0, l.c)(v, "ml-auto")), (Z[30] = L))
            : (L = Z[30]),
          Z[31] !== ea
            ? ((R = ea("common.age")), (Z[31] = ea), (Z[32] = R))
            : (R = Z[32]),
          Z[33] === Symbol.for("react.memo_cache_sentinel")
            ? ((B = (0, t.jsx)(i.E$, { className: "size-3" })), (Z[33] = B))
            : (B = Z[33]),
          Z[34] !== en || Z[35] !== D || Z[36] !== R
            ? ((H = (0, t.jsx)(h.U, {
                className: $,
                children: (0, t.jsxs)("button", {
                  type: "button",
                  onClick: en,
                  "aria-label": D,
                  className: L,
                  children: [R, B],
                }),
              })),
              (Z[34] = en),
              (Z[35] = D),
              (Z[36] = R),
              (Z[37] = H))
            : (H = Z[37]),
          Z[38] !== H || Z[39] !== M || Z[40] !== E || Z[41] !== O
            ? ((q = (0, t.jsx)(h.E, {
                className: c.m,
                children: (0, t.jsxs)(h.N, {
                  className: "border-0 hover:bg-transparent",
                  children: [M, E, O, H],
                }),
              })),
              (Z[38] = H),
              (Z[39] = M),
              (Z[40] = E),
              (Z[41] = O),
              (Z[42] = q))
            : (q = Z[42]),
          Z[43] !== X.chain_id ||
          Z[44] !== ee ||
          Z[45] !== ei ||
          Z[46] !== et ||
          Z[47] !== ef ||
          Z[48] !== el ||
          Z[49] !== ea ||
          Z[50] !== ep ||
          Z[51] !== J ||
          Z[52] !== G
            ? ((V =
                "loading" === el
                  ? A(
                      (0, t.jsxs)("span", {
                        className: "inline-flex items-center gap-2",
                        children: [
                          (0, t.jsx)(i.AC, {
                            size: 16,
                            className: "animate-spin",
                            "aria-hidden": !0,
                          }),
                          ea("web.coin.loading"),
                        ],
                      }),
                    )
                  : "empty" === el
                    ? A(ea("web.coin.no_trades"))
                    : J.map((e) => {
                        let n = "buy" === e.type,
                          a = (0, y.X)(e.tx, X.chain_id);
                        return (0, t.jsxs)(
                          h.N,
                          {
                            "data-side": e.type,
                            style: { "--pulse-color": "transparent" },
                            className: (0, l.c)(
                              N,
                              e.isEventTrade && "animate-pulse-row",
                              "cursor-pointer",
                            ),
                            onClick: () =>
                              window.open(a, "_blank", "noopener,noreferrer"),
                            children: [
                              (0, t.jsx)(h.d, {
                                className: (0, l.c)(
                                  j,
                                  "font-medium",
                                  (0, s.F)(n ? "buy" : "sell"),
                                ),
                                children: ep(e),
                              }),
                              (0, t.jsx)(h.d, {
                                className: (0, l.c)(j, "text-text-primary"),
                                children: ef(e),
                              }),
                              (0, t.jsx)(h.d, {
                                className: (0, l.c)(j, "max-w-0"),
                                onClick: C,
                                children: (0, t.jsxs)("span", {
                                  className: "flex min-w-0 items-center gap-1",
                                  children: [
                                    (0, t.jsx)(o.S, {
                                      address: e.userAddress,
                                      chain: X.chain_id,
                                      size: 20,
                                      nameClassName: "text-xs leading-4",
                                      showAvatar: !1,
                                      verified: "lookup",
                                      tags: (({
                                        address: e,
                                        devAddress: t,
                                        viewerAddress: n,
                                      }) => {
                                        if (!e) return [];
                                        let i = (t) =>
                                            !!t &&
                                            t?.toLowerCase() ===
                                              e.toLowerCase(),
                                          l = [];
                                        return (
                                          i(n) && l.push("you"),
                                          i(t) && l.push("dev"),
                                          l
                                        );
                                      })({
                                        address: e.userAddress,
                                        devAddress: ee,
                                        viewerAddress: G,
                                      }),
                                    }),
                                    e.isBundled
                                      ? (0, t.jsx)(u.f, {
                                          density: "terminal",
                                          content: ea(
                                            "web.coin.trades_info_trade_may_have_originated_from_bot",
                                          ),
                                          children: (0, t.jsx)("span", {
                                            className: "inline-flex",
                                            children: (0, t.jsx)(i.ck, {
                                              className:
                                                "size-3.5 shrink-0 text-text-tertiary",
                                              "aria-label": ea(
                                                "web.coin.trades_info_trade_may_have_originated_from_bot",
                                              ),
                                            }),
                                          }),
                                        })
                                      : null,
                                  ],
                                }),
                              }),
                              (0, t.jsx)(h.d, {
                                className: (0, l.c)(
                                  j,
                                  "text-right text-text-tertiary",
                                ),
                                children: et
                                  ? (0, t.jsx)(d.f, {
                                      timestamp: e.timestamp,
                                      density: "terminal",
                                      showTitle: !0,
                                    })
                                  : (0, t.jsx)("time", {
                                      dateTime: new Date(
                                        e.timestamp,
                                      ).toISOString(),
                                      suppressHydrationWarning: !0,
                                      children: ei(new Date(e.timestamp)),
                                    }),
                              }),
                            ],
                          },
                          (0, f.m)(e),
                        );
                      })),
              (Z[43] = X.chain_id),
              (Z[44] = ee),
              (Z[45] = ei),
              (Z[46] = et),
              (Z[47] = ef),
              (Z[48] = el),
              (Z[49] = ea),
              (Z[50] = ep),
              (Z[51] = J),
              (Z[52] = G),
              (Z[53] = V))
            : (V = Z[53]),
          Z[54] !== V
            ? ((Q = (0, t.jsx)(h.z, { children: V })), (Z[54] = V), (Z[55] = Q))
            : (Q = Z[55]),
          Z[56] !== q || Z[57] !== Q
            ? ((K = (0, t.jsxs)(h.s, {
                "data-testid": "compact-trades-table",
                className: "w-full table-auto",
                children: [q, Q],
              })),
              (Z[56] = q),
              (Z[57] = Q),
              (Z[58] = K))
            : (K = Z[58]),
          K
        );
      },
    ],
    38649,
  );
  var U = e.i(213618),
    F = e.i(536925),
    M = e.i(576766),
    T = e.i(544514),
    P = e.i(733089);
  e.s(
    [
      "f",
      0,
      ({ actors: e, fallback: t, enabled: n = !0 }) => {
        let i = (0, T.f)(),
          [l, r] = (0, a.useState)(() => new Map()),
          [s, o] = (0, a.useState)(() => new Map()),
          c = (0, a.useMemo)(() => {
            let t = [],
              n = new Set();
            for (let i of e) {
              if (!i) continue;
              let e = (0, P.P)(i);
              n.has(e) || l.has(e) || s.has(e) || (n.add(e), t.push(i));
            }
            return t.sort().join(",");
          }, [e, l, s]),
          [d] = (0, F.r)(c, 250, { maxWait: 1e3 }),
          m = (0, a.useMemo)(() => (d ? d.split(",") : []), [d]),
          u = (0, M.f)({
            userAddresses: m,
            queryOptions: {
              enabled: n && i && m.length > 0,
              placeholderData: U.y,
            },
          });
        return (
          (0, a.useEffect)(() => {
            if (!u.data || u.isPlaceholderData || u.isError) return;
            let e = new Map();
            for (let t of u.data) t.address && e.set((0, P.P)(t.address), t);
            r((t) => {
              let n = null;
              for (let i of m) {
                let l = (0, P.P)(i);
                if (t.has(l)) continue;
                let a = e.get(l);
                (n ??= new Map(t)).set(
                  l,
                  a
                    ? {
                        username: a.username?.trim() || void 0,
                        profileImage: a.profile_image?.trim() || void 0,
                        xUsername: a.x_username?.trim() || void 0,
                        avatarDecoration:
                          a.resolved_avatar_decoration || void 0,
                      }
                    : null,
                );
              }
              return n ?? t;
            });
          }, [u.data, u.isPlaceholderData, u.isError, m]),
          (0, a.useEffect)(() => {
            if (!u.isError || 0 === m.length) return;
            let e = Date.now() + 3e4;
            o((t) => {
              let n = new Map(t);
              for (let t of m) n.set((0, P.P)(t), e);
              return n;
            });
          }, [u.isError, u.errorUpdatedAt, m]),
          (0, a.useEffect)(() => {
            if (0 === s.size) return;
            let e = setTimeout(
              () => {
                let e = Date.now();
                o((t) => {
                  let n = null;
                  for (let [i, l] of t) l > e || (n ??= new Map(t)).delete(i);
                  return n ?? t;
                });
              },
              Math.max(0, Math.min(...s.values()) - Date.now()),
            );
            return () => clearTimeout(e);
          }, [s]),
          {
            identityOf: (0, a.useCallback)(
              (e) => {
                if (!e) return null;
                let n = l.get((0, P.P)(e)),
                  i = t?.(e) ?? null;
                return n
                  ? i
                    ? {
                        username: n.username ?? i.username,
                        profileImage: n.profileImage ?? i.profileImage,
                        xUsername: n.xUsername ?? i.xUsername,
                      }
                    : n
                  : i;
              },
              [t, l],
            ),
            resolving: n && ("" !== c || (m.length > 0 && u.isPending)),
          }
        );
      },
    ],
    63078,
  );
  var z = e.i(66732);
  function E(e) {
    (console.log("clicked", e), e.stopPropagation(), e.preventDefault());
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          l,
          a,
          r = (0, n.c)(7),
          { content: s, popoverText: o } = e;
        return (
          r[0] !== s
            ? ((i = (0, t.jsx)(z.J, {
                asChild: !0,
                children: (0, t.jsx)("div", {
                  className: "hover:opacity-7 cursor-pointer",
                  children: s,
                }),
              })),
              (r[0] = s),
              (r[1] = i))
            : (i = r[1]),
          r[2] !== o
            ? ((l = (0, t.jsx)(z.T, {
                className: "w-fit bg-black p-2 text-white",
                children: (0, t.jsx)("p", {
                  className: "text-sm leading-none",
                  children: o,
                }),
              })),
              (r[2] = o),
              (r[3] = l))
            : (l = r[3]),
          r[4] !== i || r[5] !== l
            ? ((a = (0, t.jsx)("div", {
                onClick: E,
                children: (0, t.jsxs)(z.V, { children: [i, l] }),
              })),
              (r[4] = i),
              (r[5] = l),
              (r[6] = a))
            : (a = r[6]),
          a
        );
      },
    ],
    802246,
  );
};
