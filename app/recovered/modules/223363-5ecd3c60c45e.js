// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(928529);
  e.i(12692);
  var r = e.i(398902),
    n = e.i(667876);
  e.i(12641);
  var l = e.i(34011);
  e.i(84455);
  var s = e.i(540805),
    o = e.i(529841),
    d = e.i(908163),
    c = e.i(170450),
    u = e.i(890088),
    m = e.i(714283);
  let p = ({ value: e, locale: t, t: i }) => {
    let a = Math.abs(e);
    return a >= 1e3
      ? (0, u.J)({ value: e, locale: t, t: i })
      : (0, m.f)(
          (0, u.R)(
            t,
            a >= 1
              ? { maximumFractionDigits: 2 }
              : { maximumSignificantDigits: 2 },
          ).format(e),
        );
  };
  (e.s(["f", 0, p], 210940), e.i(267146));
  var h = e.i(592209),
    f = e.i(338319),
    g = e.i(633311);
  let x = {
    feed: "ring-bg-secondary",
    elevated: "ring-bg-tertiary",
    pill: "ring-bg-tertiary",
    row: "ring-bg-primary",
    strip: "ring-bg-tertiary",
  };
  e.s(
    [
      "f",
      0,
      function (e) {
        let m,
          v,
          y,
          w,
          b,
          j,
          N,
          C,
          S,
          M,
          T,
          k,
          R = (0, i.c)(154),
          {
            mint: _,
            symbol: E,
            name: P,
            imageUri: A,
            chainId: z,
            heldAmount: U,
            positionUsd: I,
            isClosed: F,
            exitProceedsUsd: O,
            closedAt: B,
            lastTradeAt: D,
            netPnlUsd: L,
            variant: q,
            density: $,
            valueDetail: H,
            subtitle: V,
            children: W,
            actions: K,
            className: G,
          } = e,
          J = void 0 !== F && F,
          Q = void 0 === q ? "feed" : q,
          Z = void 0 === $ ? "terminal" : $,
          { t: X, i18n: Y } = (0, r.f)(),
          ee = (0, c.f)();
        if (
          R[0] !== K ||
          R[1] !== z ||
          R[2] !== G ||
          R[3] !== B ||
          R[4] !== Z ||
          R[5] !== O ||
          R[6] !== U ||
          R[7] !== Y.language ||
          R[8] !== A ||
          R[9] !== J ||
          R[10] !== ee ||
          R[11] !== D ||
          R[12] !== _ ||
          R[13] !== P ||
          R[14] !== L ||
          R[15] !== I ||
          R[16] !== V ||
          R[17] !== E ||
          R[18] !== X ||
          R[19] !== H ||
          R[20] !== Q
        ) {
          v = Symbol.for("react.early_return_sentinel");
          e: {
            let e,
              i,
              r,
              c,
              M,
              T,
              k,
              F,
              q,
              $,
              W,
              et,
              ei = (0, h.v)(Y.language) ?? h.T,
              ea = J ? (0, g.l)(B) : (0, g.l)(D);
            R[30] !== E
              ? ((e = E?.replace(/^\$/, "")), (R[30] = E), (R[31] = e))
              : (e = R[31]);
            let er = e;
            R[32] !== z ||
            R[33] !== A ||
            R[34] !== _ ||
            R[35] !== P ||
            R[36] !== E
              ? ((i = {
                  mint: _,
                  name: P,
                  symbol: E,
                  image_uri: A,
                  chain_id: z,
                }),
                (R[32] = z),
                (R[33] = A),
                (R[34] = _),
                (R[35] = P),
                (R[36] = E),
                (R[37] = i))
              : (i = R[37]);
            let en = i;
            R[38] !== A || R[39] !== P || R[40] !== E || R[41] !== X
              ? ((r = (e) =>
                  A?.startsWith("/")
                    ? (0, t.jsx)(a.default, {
                        src: A,
                        alt: P ?? E ?? X("web.callouts.coin_fallback"),
                        width: e,
                        height: e,
                        className: "size-full object-cover",
                        loading: "lazy",
                      })
                    : void 0),
                (R[38] = A),
                (R[39] = P),
                (R[40] = E),
                (R[41] = X),
                (R[42] = r))
              : (r = R[42]);
            let el = r;
            R[43] !== I
              ? ((c = null != I && Number.isFinite(I)),
                (R[43] = I),
                (R[44] = c))
              : (c = R[44]);
            let es = c;
            R[45] !== O || R[46] !== es || R[47] !== J
              ? ((M = !es && J && null != O && Number.isFinite(O)),
                (R[45] = O),
                (R[46] = es),
                (R[47] = J),
                (R[48] = M))
              : (M = R[48]);
            let eo = M,
              ed = (0, s.k)(L);
            R[49] !== L
              ? ((T = null != L && Number.isFinite(L)),
                (R[49] = L),
                (R[50] = T))
              : (T = R[50]);
            let ec = T,
              eu = "pill" === Q,
              em = "row" === Q,
              ep = "comfortable" === Z && !eu,
              eh = !em && (!ep || "feed" === Q),
              ef = ep && "elevated" === Q,
              eg = ef ? "ring-bg-secondary" : x[Q];
            if ("strip" === Q) {
              let e, i, a, r, n, o, c, u, m, p, h, g, y, w, b;
              R[51] !== eo || R[52] !== X
                ? ((e = eo
                    ? X("web.callouts.exit_label")
                    : X("coin_details.position")),
                  (R[51] = eo),
                  (R[52] = X),
                  (R[53] = e))
                : (e = R[53]);
              let j = e,
                N = er || P || "—";
              R[54] !== P || R[55] !== N
                ? ((i = P && P.trim() && P.trim() !== N ? P.trim() : null),
                  (R[54] = P),
                  (R[55] = N),
                  (R[56] = i))
                : (i = R[56]);
              let C = i;
              (R[57] !== G
                ? ((a = (0, f.c)(
                    "flex items-center gap-2 rounded-md bg-bg-tertiary px-2 py-2 text-[12px] leading-4",
                    G,
                  )),
                  (R[57] = G),
                  (R[58] = a))
                : (a = R[58]),
                R[59] !== el
                  ? ((r = el(32)), (R[59] = el), (R[60] = r))
                  : (r = R[60]),
                R[61] !== en || R[62] !== r
                  ? ((n = (0, t.jsx)(l.CoinAvatar, {
                      optimisticImage: !0,
                      coin: en,
                      size: 32,
                      cornerSize: 14,
                      cornerRingClassName: x.strip,
                      testIdPrefix: "callout-position-strip",
                      children: r,
                    })),
                    (R[61] = en),
                    (R[62] = r),
                    (R[63] = n))
                  : (n = R[63]),
                R[64] !== N
                  ? ((o = (0, t.jsx)("span", {
                      "data-testid": "callout-position-strip-symbol",
                      className: "shrink-0 font-medium text-text-primary",
                      children: N,
                    })),
                    (R[64] = N),
                    (R[65] = o))
                  : (o = R[65]),
                R[66] !== C
                  ? ((c = C
                      ? (0, t.jsx)("span", {
                          "data-testid": "callout-position-strip-name",
                          className:
                            "min-w-0 flex-1 truncate text-[11px] text-text-quaternary",
                          children: C,
                        })
                      : null),
                    (R[66] = C),
                    (R[67] = c))
                  : (c = R[67]),
                R[68] !== o || R[69] !== c
                  ? ((u = (0, t.jsxs)("div", {
                      className: "flex min-w-0 items-center gap-1.5",
                      children: [o, c],
                    })),
                    (R[68] = o),
                    (R[69] = c),
                    (R[70] = u))
                  : (u = R[70]),
                R[71] !== j
                  ? ((m = (0, t.jsx)("span", {
                      className: "text-[11px] text-text-quaternary",
                      children: j,
                    })),
                    (R[71] = j),
                    (R[72] = m))
                  : (m = R[72]),
                R[73] !== O ||
                R[74] !== es ||
                R[75] !== J ||
                R[76] !== I ||
                R[77] !== eo ||
                R[78] !== X
                  ? ((p = es
                      ? (0, t.jsx)("span", {
                          className:
                            "font-medium tabular-nums text-text-primary",
                          children: (0, s.l)(I),
                        })
                      : eo
                        ? (0, t.jsx)("span", {
                            "data-testid": "callout-position-exit-value",
                            className:
                              "font-medium tabular-nums text-text-primary",
                            children: (0, s.l)(O),
                          })
                        : J
                          ? (0, t.jsx)(d.E, {
                              density: "terminal",
                              "data-testid": "callout-position-closed-tag",
                              children: X("common.closed"),
                            })
                          : (0, t.jsx)("span", {
                              className:
                                "font-medium tabular-nums text-text-primary",
                              children: "—",
                            })),
                    (R[73] = O),
                    (R[74] = es),
                    (R[75] = J),
                    (R[76] = I),
                    (R[77] = eo),
                    (R[78] = X),
                    (R[79] = p))
                  : (p = R[79]),
                R[80] !== X
                  ? ((h = X("coin_details.profit")), (R[80] = X), (R[81] = h))
                  : (h = R[81]),
                R[82] !== h
                  ? ((g = (0, t.jsx)("span", {
                      className: "text-[11px] text-text-quaternary",
                      children: h,
                    })),
                    (R[82] = h),
                    (R[83] = g))
                  : (g = R[83]),
                R[84] !== ec || R[85] !== L
                  ? ((y = ec ? (0, s.u)(L) : "—"),
                    (R[84] = ec),
                    (R[85] = L),
                    (R[86] = y))
                  : (y = R[86]));
              let S = (0, t.jsxs)("span", {
                className: "flex min-w-0 items-baseline gap-1.5",
                children: [
                  m,
                  p,
                  g,
                  (0, t.jsx)("span", {
                    className: (0, f.c)("font-medium tabular-nums", ed),
                    children: y,
                  }),
                  K,
                ],
              });
              (R[87] !== u || R[88] !== S
                ? ((w = (0, t.jsxs)("div", {
                    className: "flex min-w-0 flex-1 flex-col",
                    children: [u, S],
                  })),
                  (R[87] = u),
                  (R[88] = S),
                  (R[89] = w))
                : (w = R[89]),
                R[90] !== a || R[91] !== n || R[92] !== w
                  ? ((b = (0, t.jsxs)("div", {
                      "data-testid": "callout-position-mini-card",
                      "data-variant": "strip",
                      className: a,
                      children: [n, w],
                    })),
                    (R[90] = a),
                    (R[91] = n),
                    (R[92] = w),
                    (R[93] = b))
                  : (b = R[93]),
                (v = b));
              break e;
            }
            let ex = !J || es || eo || eu ? null : ea,
              ev = null !== ex ? new Date(ex).toISOString() : void 0,
              ey = null !== ex && ee ? (0, u.V)(ex, ei) : void 0,
              ew = !eu && !em && !J && null != U && Number.isFinite(U) && U > 0,
              eb = eu ? 24 : ep ? 40 : 36,
              ej = ep
                ? "text-sm leading-5 font-medium text-text-primary"
                : "font-medium text-text-primary",
              eN = ep
                ? "text-[13px] leading-[18px] text-text-tertiary"
                : "text-text-tertiary",
              eC = ep
                ? "text-xs leading-4 text-text-quaternary"
                : "text-text-tertiary",
              eS = ep
                ? "text-xs leading-4 font-medium tabular-nums @[17rem]:text-sm @[17rem]:leading-5"
                : "tabular-nums",
              eM = (0, f.c)(
                "flex flex-col items-end gap-0.5",
                ep ? void 0 : "text-xs leading-4",
              );
            R[94] !== ep || R[95] !== er || R[96] !== P
              ? ((k = ep ? P?.trim() || er || "—" : er || "—"),
                (R[94] = ep),
                (R[95] = er),
                (R[96] = P),
                (R[97] = k))
              : (k = R[97]);
            let eT = k,
              ek = ep ? er : P,
              eR =
                null !== ea
                  ? (0, t.jsxs)("span", {
                      "data-testid": J
                        ? "callout-position-closed-stamp"
                        : "callout-position-last-trade-ago",
                      className: "min-w-0 truncate whitespace-nowrap",
                      children: [
                        J
                          ? X("common.closed")
                          : X("web.callouts.last_trade_label"),
                        " ",
                        J
                          ? (0, t.jsx)("time", {
                              dateTime: new Date(ea).toISOString(),
                              title: ee ? (0, u.V)(ea, ei) : void 0,
                              suppressHydrationWarning: !0,
                              className: "tabular-nums",
                              children: (0, u.u)({
                                locale: ei,
                                timestampMs: ea,
                              }),
                            })
                          : (0, t.jsx)(o.f, {
                              timestamp: ea,
                              live: !1,
                              suffix: !1,
                              showTitle: !0,
                            }),
                      ],
                    })
                  : null;
            ((C = "callout-position-mini-card"), (S = Z));
            let e_ = eh && "border",
              eE = eu
                ? "rounded-full border-border-tertiary bg-bg-tertiary px-3 py-2"
                : (eh || ef) && "rounded-xl p-3",
              eP =
                !eu &&
                eh &&
                ("feed" === Q
                  ? "border-border-secondary bg-bg-secondary"
                  : "border-border-tertiary bg-bg-tertiary"),
              eA = ef && "bg-bg-secondary";
            (R[98] !== G ||
            R[99] !== e_ ||
            R[100] !== eE ||
            R[101] !== eP ||
            R[102] !== eA
              ? ((m = (0, f.c)(
                  "@container flex flex-col items-center gap-2",
                  e_,
                  eE,
                  eP,
                  eA,
                  G,
                )),
                (R[98] = G),
                (R[99] = e_),
                (R[100] = eE),
                (R[101] = eP),
                (R[102] = eA),
                (R[103] = m))
              : (m = R[103]),
              (j = "flex w-full items-center gap-3"));
            let ez = eu ? "round" : "squircle";
            (R[104] !== eb || R[105] !== el
              ? ((F = el(eb)), (R[104] = eb), (R[105] = el), (R[106] = F))
              : (F = R[106]),
              R[107] !== eb ||
              R[108] !== en ||
              R[109] !== eg ||
              R[110] !== ez ||
              R[111] !== F
                ? ((q = (0, t.jsx)(l.CoinAvatar, {
                    coin: en,
                    size: eb,
                    shape: ez,
                    seal: "name",
                    cornerRingClassName: eg,
                    children: F,
                  })),
                  (R[107] = eb),
                  (R[108] = en),
                  (R[109] = eg),
                  (R[110] = ez),
                  (R[111] = F),
                  (R[112] = q))
                : (q = R[112]));
            let eU = ep ? void 0 : "text-xs leading-4";
            (R[113] !== eU
              ? (($ = (0, f.c)("flex min-w-0 flex-1 flex-col gap-0.5", eU)),
                (R[113] = eU),
                (R[114] = $))
              : ($ = R[114]),
              R[115] !== z ||
              R[116] !== ep ||
              R[117] !== er ||
              R[118] !== eu ||
              R[119] !== eN ||
              R[120] !== _ ||
              R[121] !== P ||
              R[122] !== eR ||
              R[123] !== V ||
              R[124] !== ek ||
              R[125] !== eT ||
              R[126] !== ej
                ? ((W = eu
                    ? (0, t.jsx)("p", {
                        className:
                          "w-full truncate font-medium text-text-primary",
                        children: P ?? er ?? "—",
                      })
                    : (0, t.jsxs)(t.Fragment, {
                        children: [
                          (0, t.jsxs)("p", {
                            className: "flex w-full min-w-0 items-center gap-1",
                            children: [
                              (0, t.jsx)("span", {
                                className: (0, f.c)("min-w-0 truncate", ej),
                                children: eT,
                              }),
                              (0, t.jsx)(n.f, {
                                mint: _,
                                chainId: z,
                                size: ep ? 14 : 12,
                              }),
                            ],
                          }),
                          null != V
                            ? (0, t.jsx)("div", {
                                className: "flex w-full min-w-0 items-center",
                                children: V,
                              })
                            : eR
                              ? (0, t.jsxs)("p", {
                                  className: (0, f.c)(
                                    "flex w-full items-baseline gap-1",
                                    eN,
                                  ),
                                  children: [
                                    ek
                                      ? (0, t.jsxs)("span", {
                                          className:
                                            "min-w-0 shrink-[999] truncate",
                                          children: [ek, " ·"],
                                        })
                                      : null,
                                    eR,
                                  ],
                                })
                              : (0, t.jsx)("p", {
                                  className: (0, f.c)("w-full truncate", eN),
                                  children: ek ?? "",
                                }),
                        ],
                      })),
                  (R[115] = z),
                  (R[116] = ep),
                  (R[117] = er),
                  (R[118] = eu),
                  (R[119] = eN),
                  (R[120] = _),
                  (R[121] = P),
                  (R[122] = eR),
                  (R[123] = V),
                  (R[124] = ek),
                  (R[125] = eT),
                  (R[126] = ej),
                  (R[127] = W))
                : (W = R[127]),
              R[128] !== $ || R[129] !== W
                ? ((et = (0, t.jsx)("div", { className: $, children: W })),
                  (R[128] = $),
                  (R[129] = W),
                  (R[130] = et))
                : (et = R[130]));
            let eI = ew
              ? (0, t.jsxs)("div", {
                  className: (0, f.c)("shrink-0", eM),
                  children: [
                    (0, t.jsx)("p", {
                      className: (0, f.c)("whitespace-nowrap text-right", eC),
                      children: X(
                        "profile.narrative.positions_sort.position_size",
                      ),
                    }),
                    (0, t.jsxs)("p", {
                      "data-testid": "callout-position-held-amount",
                      className: (0, f.c)(
                        "whitespace-nowrap text-right text-text-primary",
                        eS,
                      ),
                      children: [
                        p({ value: U, locale: ei, t: X }),
                        er ? ` ${er}` : "",
                      ],
                    }),
                  ],
                })
              : null;
            (R[131] !== q || R[132] !== et || R[133] !== eI
              ? ((N = (0, t.jsxs)("div", {
                  className: "flex min-w-10 flex-1 items-center gap-2",
                  children: [q, et, eI],
                })),
                (R[131] = q),
                (R[132] = et),
                (R[133] = eI),
                (R[134] = N))
              : (N = R[134]),
              (y = "flex shrink-0 items-center gap-3"));
            let eF = eu
                ? null
                : (0, t.jsx)("p", {
                    "data-testid": "callout-position-value-label",
                    className: (0, f.c)("whitespace-nowrap text-right", eC),
                    children: eo
                      ? X("web.callouts.exit_label")
                      : null !== ex
                        ? X("common.closed")
                        : X("coin_details.position"),
                  }),
              eO = es
                ? (0, t.jsxs)("p", {
                    className: (0, f.c)(
                      "whitespace-nowrap text-right text-text-primary",
                      eS,
                    ),
                    children: [
                      (0, s.w)(I),
                      H
                        ? (0, t.jsx)("span", {
                            className: "ml-1 font-normal text-text-tertiary",
                            children: H,
                          })
                        : null,
                    ],
                  })
                : eo
                  ? (0, t.jsx)("p", {
                      "data-testid": "callout-position-exit-value",
                      className: (0, f.c)(
                        "whitespace-nowrap text-right text-text-primary",
                        eS,
                      ),
                      children: (0, s.w)(O),
                    })
                  : null !== ex
                    ? (0, t.jsx)("time", {
                        "data-testid": "callout-position-closed-date",
                        dateTime: ev,
                        title: ey,
                        suppressHydrationWarning: !0,
                        className: (0, f.c)(
                          "whitespace-nowrap text-right text-text-primary",
                          eS,
                        ),
                        children: (0, u.u)({ locale: ei, timestampMs: ex }),
                      })
                    : J
                      ? (0, t.jsx)(d.E, {
                          density: ep ? "comfortable" : "terminal",
                          "data-testid": "callout-position-closed-tag",
                          children: X("common.closed"),
                        })
                      : (0, t.jsx)("p", {
                          className: (0, f.c)(
                            "whitespace-nowrap text-right text-text-primary",
                            eS,
                          ),
                          children: "—",
                        });
            (R[135] !== eM || R[136] !== eF || R[137] !== eO
              ? ((w = (0, t.jsxs)("div", {
                  className: eM,
                  children: [eF, eO],
                })),
                (R[135] = eM),
                (R[136] = eF),
                (R[137] = eO),
                (R[138] = w))
              : (w = R[138]),
              (b =
                eu && !ec
                  ? null
                  : (0, t.jsxs)("div", {
                      className: eM,
                      children: [
                        eu
                          ? null
                          : (0, t.jsx)("p", {
                              className: (0, f.c)(
                                "whitespace-nowrap text-right",
                                eC,
                              ),
                              children: X("coin_details.profit"),
                            }),
                        (0, t.jsx)("p", {
                          className: (0, f.c)(
                            "whitespace-nowrap text-right",
                            eS,
                            ed,
                          ),
                          children: ec ? (0, s.u)(L) : "—",
                        }),
                      ],
                    })));
          }
          ((R[0] = K),
            (R[1] = z),
            (R[2] = G),
            (R[3] = B),
            (R[4] = Z),
            (R[5] = O),
            (R[6] = U),
            (R[7] = Y.language),
            (R[8] = A),
            (R[9] = J),
            (R[10] = ee),
            (R[11] = D),
            (R[12] = _),
            (R[13] = P),
            (R[14] = L),
            (R[15] = I),
            (R[16] = V),
            (R[17] = E),
            (R[18] = X),
            (R[19] = H),
            (R[20] = Q),
            (R[21] = m),
            (R[22] = v),
            (R[23] = y),
            (R[24] = w),
            (R[25] = b),
            (R[26] = j),
            (R[27] = N),
            (R[28] = C),
            (R[29] = S));
        } else
          ((m = R[21]),
            (v = R[22]),
            (y = R[23]),
            (w = R[24]),
            (b = R[25]),
            (j = R[26]),
            (N = R[27]),
            (C = R[28]),
            (S = R[29]));
        return v !== Symbol.for("react.early_return_sentinel")
          ? v
          : (R[139] !== K || R[140] !== y || R[141] !== w || R[142] !== b
              ? ((M = (0, t.jsxs)("div", {
                  className: y,
                  children: [w, b, K],
                })),
                (R[139] = K),
                (R[140] = y),
                (R[141] = w),
                (R[142] = b),
                (R[143] = M))
              : (M = R[143]),
            R[144] !== M || R[145] !== j || R[146] !== N
              ? ((T = (0, t.jsxs)("div", { className: j, children: [N, M] })),
                (R[144] = M),
                (R[145] = j),
                (R[146] = N),
                (R[147] = T))
              : (T = R[147]),
            R[148] !== W ||
            R[149] !== m ||
            R[150] !== T ||
            R[151] !== C ||
            R[152] !== S
              ? ((k = (0, t.jsxs)("div", {
                  "data-testid": C,
                  "data-density": S,
                  className: m,
                  children: [T, W],
                })),
                (R[148] = W),
                (R[149] = m),
                (R[150] = T),
                (R[151] = C),
                (R[152] = S),
                (R[153] = k))
              : (k = R[153]),
            k);
      },
    ],
    223363,
  );
};
