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
    c = e.i(908163),
    d = e.i(170450),
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
  var g = e.i(592209),
    h = e.i(338319),
    x = e.i(633311);
  let f = {
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
          w,
          v,
          y,
          b,
          j,
          N,
          S,
          C,
          R,
          E,
          _,
          P = (0, i.c)(154),
          {
            mint: T,
            symbol: M,
            name: I,
            imageUri: k,
            chainId: O,
            heldAmount: z,
            positionUsd: A,
            isClosed: q,
            exitProceedsUsd: U,
            closedAt: L,
            lastTradeAt: F,
            netPnlUsd: $,
            variant: D,
            density: H,
            valueDetail: B,
            subtitle: V,
            children: W,
            actions: K,
            className: G,
          } = e,
          J = void 0 !== q && q,
          Q = void 0 === D ? "feed" : D,
          Z = void 0 === H ? "terminal" : H,
          { t: X, i18n: Y } = (0, r.f)(),
          ee = (0, d.f)();
        if (
          P[0] !== K ||
          P[1] !== O ||
          P[2] !== G ||
          P[3] !== L ||
          P[4] !== Z ||
          P[5] !== U ||
          P[6] !== z ||
          P[7] !== Y.language ||
          P[8] !== k ||
          P[9] !== J ||
          P[10] !== ee ||
          P[11] !== F ||
          P[12] !== T ||
          P[13] !== I ||
          P[14] !== $ ||
          P[15] !== A ||
          P[16] !== V ||
          P[17] !== M ||
          P[18] !== X ||
          P[19] !== B ||
          P[20] !== Q
        ) {
          w = Symbol.for("react.early_return_sentinel");
          e: {
            let e,
              i,
              r,
              d,
              R,
              E,
              _,
              q,
              D,
              H,
              W,
              et,
              ei = (0, g.v)(Y.language) ?? g.T,
              ea = J ? (0, x.l)(L) : (0, x.l)(F);
            P[30] !== M
              ? ((e = M?.replace(/^\$/, "")), (P[30] = M), (P[31] = e))
              : (e = P[31]);
            let er = e;
            P[32] !== O ||
            P[33] !== k ||
            P[34] !== T ||
            P[35] !== I ||
            P[36] !== M
              ? ((i = {
                  mint: T,
                  name: I,
                  symbol: M,
                  image_uri: k,
                  chain_id: O,
                }),
                (P[32] = O),
                (P[33] = k),
                (P[34] = T),
                (P[35] = I),
                (P[36] = M),
                (P[37] = i))
              : (i = P[37]);
            let en = i;
            P[38] !== k || P[39] !== I || P[40] !== M || P[41] !== X
              ? ((r = (e) =>
                  k?.startsWith("/")
                    ? (0, t.jsx)(a.default, {
                        src: k,
                        alt: I ?? M ?? X("web.callouts.coin_fallback"),
                        width: e,
                        height: e,
                        className: "size-full object-cover",
                        loading: "lazy",
                      })
                    : void 0),
                (P[38] = k),
                (P[39] = I),
                (P[40] = M),
                (P[41] = X),
                (P[42] = r))
              : (r = P[42]);
            let el = r;
            P[43] !== A
              ? ((d = null != A && Number.isFinite(A)),
                (P[43] = A),
                (P[44] = d))
              : (d = P[44]);
            let es = d;
            P[45] !== U || P[46] !== es || P[47] !== J
              ? ((R = !es && J && null != U && Number.isFinite(U)),
                (P[45] = U),
                (P[46] = es),
                (P[47] = J),
                (P[48] = R))
              : (R = P[48]);
            let eo = R,
              ec = (0, s.k)($);
            P[49] !== $
              ? ((E = null != $ && Number.isFinite($)),
                (P[49] = $),
                (P[50] = E))
              : (E = P[50]);
            let ed = E,
              eu = "pill" === Q,
              em = "row" === Q,
              ep = "comfortable" === Z && !eu,
              eg = !em && (!ep || "feed" === Q),
              eh = ep && "elevated" === Q,
              ex = eh ? "ring-bg-secondary" : f[Q];
            if ("strip" === Q) {
              let e, i, a, r, n, o, d, u, m, p, g, x, v, y, b;
              P[51] !== eo || P[52] !== X
                ? ((e = eo
                    ? X("web.callouts.exit_label")
                    : X("coin_details.position")),
                  (P[51] = eo),
                  (P[52] = X),
                  (P[53] = e))
                : (e = P[53]);
              let j = e,
                N = er || I || "—";
              P[54] !== I || P[55] !== N
                ? ((i = I && I.trim() && I.trim() !== N ? I.trim() : null),
                  (P[54] = I),
                  (P[55] = N),
                  (P[56] = i))
                : (i = P[56]);
              let S = i;
              (P[57] !== G
                ? ((a = (0, h.c)(
                    "flex items-center gap-2 rounded-md bg-bg-tertiary px-2 py-2 text-[12px] leading-4",
                    G,
                  )),
                  (P[57] = G),
                  (P[58] = a))
                : (a = P[58]),
                P[59] !== el
                  ? ((r = el(32)), (P[59] = el), (P[60] = r))
                  : (r = P[60]),
                P[61] !== en || P[62] !== r
                  ? ((n = (0, t.jsx)(l.CoinAvatar, {
                      optimisticImage: !0,
                      coin: en,
                      size: 32,
                      cornerSize: 14,
                      cornerRingClassName: f.strip,
                      testIdPrefix: "callout-position-strip",
                      children: r,
                    })),
                    (P[61] = en),
                    (P[62] = r),
                    (P[63] = n))
                  : (n = P[63]),
                P[64] !== N
                  ? ((o = (0, t.jsx)("span", {
                      "data-testid": "callout-position-strip-symbol",
                      className: "shrink-0 font-medium text-text-primary",
                      children: N,
                    })),
                    (P[64] = N),
                    (P[65] = o))
                  : (o = P[65]),
                P[66] !== S
                  ? ((d = S
                      ? (0, t.jsx)("span", {
                          "data-testid": "callout-position-strip-name",
                          className:
                            "min-w-0 flex-1 truncate text-[11px] text-text-quaternary",
                          children: S,
                        })
                      : null),
                    (P[66] = S),
                    (P[67] = d))
                  : (d = P[67]),
                P[68] !== o || P[69] !== d
                  ? ((u = (0, t.jsxs)("div", {
                      className: "flex min-w-0 items-center gap-1.5",
                      children: [o, d],
                    })),
                    (P[68] = o),
                    (P[69] = d),
                    (P[70] = u))
                  : (u = P[70]),
                P[71] !== j
                  ? ((m = (0, t.jsx)("span", {
                      className: "text-[11px] text-text-quaternary",
                      children: j,
                    })),
                    (P[71] = j),
                    (P[72] = m))
                  : (m = P[72]),
                P[73] !== U ||
                P[74] !== es ||
                P[75] !== J ||
                P[76] !== A ||
                P[77] !== eo ||
                P[78] !== X
                  ? ((p = es
                      ? (0, t.jsx)("span", {
                          className:
                            "font-medium tabular-nums text-text-primary",
                          children: (0, s.l)(A),
                        })
                      : eo
                        ? (0, t.jsx)("span", {
                            "data-testid": "callout-position-exit-value",
                            className:
                              "font-medium tabular-nums text-text-primary",
                            children: (0, s.l)(U),
                          })
                        : J
                          ? (0, t.jsx)(c.E, {
                              density: "terminal",
                              "data-testid": "callout-position-closed-tag",
                              children: X("common.closed"),
                            })
                          : (0, t.jsx)("span", {
                              className:
                                "font-medium tabular-nums text-text-primary",
                              children: "—",
                            })),
                    (P[73] = U),
                    (P[74] = es),
                    (P[75] = J),
                    (P[76] = A),
                    (P[77] = eo),
                    (P[78] = X),
                    (P[79] = p))
                  : (p = P[79]),
                P[80] !== X
                  ? ((g = X("coin_details.profit")), (P[80] = X), (P[81] = g))
                  : (g = P[81]),
                P[82] !== g
                  ? ((x = (0, t.jsx)("span", {
                      className: "text-[11px] text-text-quaternary",
                      children: g,
                    })),
                    (P[82] = g),
                    (P[83] = x))
                  : (x = P[83]),
                P[84] !== ed || P[85] !== $
                  ? ((v = ed ? (0, s.u)($) : "—"),
                    (P[84] = ed),
                    (P[85] = $),
                    (P[86] = v))
                  : (v = P[86]));
              let C = (0, t.jsxs)("span", {
                className: "flex min-w-0 items-baseline gap-1.5",
                children: [
                  m,
                  p,
                  x,
                  (0, t.jsx)("span", {
                    className: (0, h.c)("font-medium tabular-nums", ec),
                    children: v,
                  }),
                  K,
                ],
              });
              (P[87] !== u || P[88] !== C
                ? ((y = (0, t.jsxs)("div", {
                    className: "flex min-w-0 flex-1 flex-col",
                    children: [u, C],
                  })),
                  (P[87] = u),
                  (P[88] = C),
                  (P[89] = y))
                : (y = P[89]),
                P[90] !== a || P[91] !== n || P[92] !== y
                  ? ((b = (0, t.jsxs)("div", {
                      "data-testid": "callout-position-mini-card",
                      "data-variant": "strip",
                      className: a,
                      children: [n, y],
                    })),
                    (P[90] = a),
                    (P[91] = n),
                    (P[92] = y),
                    (P[93] = b))
                  : (b = P[93]),
                (w = b));
              break e;
            }
            let ef = !J || es || eo || eu ? null : ea,
              ew = null !== ef ? new Date(ef).toISOString() : void 0,
              ev = null !== ef && ee ? (0, u.V)(ef, ei) : void 0,
              ey = !eu && !em && !J && null != z && Number.isFinite(z) && z > 0,
              eb = eu ? 24 : ep ? 40 : 36,
              ej = ep
                ? "text-sm leading-5 font-medium text-text-primary"
                : "font-medium text-text-primary",
              eN = ep
                ? "text-[13px] leading-[18px] text-text-tertiary"
                : "text-text-tertiary",
              eS = ep
                ? "text-xs leading-4 text-text-quaternary"
                : "text-text-tertiary",
              eC = ep
                ? "text-xs leading-4 font-medium tabular-nums @[17rem]:text-sm @[17rem]:leading-5"
                : "tabular-nums",
              eR = (0, h.c)(
                "flex flex-col items-end gap-0.5",
                ep ? void 0 : "text-xs leading-4",
              );
            P[94] !== ep || P[95] !== er || P[96] !== I
              ? ((_ = ep ? I?.trim() || er || "—" : er || "—"),
                (P[94] = ep),
                (P[95] = er),
                (P[96] = I),
                (P[97] = _))
              : (_ = P[97]);
            let eE = _,
              e_ = ep ? er : I,
              eP =
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
            ((S = "callout-position-mini-card"), (C = Z));
            let eT = eg && "border",
              eM = eu
                ? "rounded-full border-border-tertiary bg-bg-tertiary px-3 py-2"
                : (eg || eh) && "rounded-xl p-3",
              eI =
                !eu &&
                eg &&
                ("feed" === Q
                  ? "border-border-secondary bg-bg-secondary"
                  : "border-border-tertiary bg-bg-tertiary"),
              ek = eh && "bg-bg-secondary";
            (P[98] !== G ||
            P[99] !== eT ||
            P[100] !== eM ||
            P[101] !== eI ||
            P[102] !== ek
              ? ((m = (0, h.c)(
                  "@container flex flex-col items-center gap-2",
                  eT,
                  eM,
                  eI,
                  ek,
                  G,
                )),
                (P[98] = G),
                (P[99] = eT),
                (P[100] = eM),
                (P[101] = eI),
                (P[102] = ek),
                (P[103] = m))
              : (m = P[103]),
              (j = "flex w-full items-center gap-3"));
            let eO = eu ? "round" : "squircle";
            (P[104] !== eb || P[105] !== el
              ? ((q = el(eb)), (P[104] = eb), (P[105] = el), (P[106] = q))
              : (q = P[106]),
              P[107] !== eb ||
              P[108] !== en ||
              P[109] !== ex ||
              P[110] !== eO ||
              P[111] !== q
                ? ((D = (0, t.jsx)(l.CoinAvatar, {
                    coin: en,
                    size: eb,
                    shape: eO,
                    seal: "name",
                    cornerRingClassName: ex,
                    children: q,
                  })),
                  (P[107] = eb),
                  (P[108] = en),
                  (P[109] = ex),
                  (P[110] = eO),
                  (P[111] = q),
                  (P[112] = D))
                : (D = P[112]));
            let ez = ep ? void 0 : "text-xs leading-4";
            (P[113] !== ez
              ? ((H = (0, h.c)("flex min-w-0 flex-1 flex-col gap-0.5", ez)),
                (P[113] = ez),
                (P[114] = H))
              : (H = P[114]),
              P[115] !== O ||
              P[116] !== ep ||
              P[117] !== er ||
              P[118] !== eu ||
              P[119] !== eN ||
              P[120] !== T ||
              P[121] !== I ||
              P[122] !== eP ||
              P[123] !== V ||
              P[124] !== e_ ||
              P[125] !== eE ||
              P[126] !== ej
                ? ((W = eu
                    ? (0, t.jsx)("p", {
                        className:
                          "w-full truncate font-medium text-text-primary",
                        children: I ?? er ?? "—",
                      })
                    : (0, t.jsxs)(t.Fragment, {
                        children: [
                          (0, t.jsxs)("p", {
                            className: "flex w-full min-w-0 items-center gap-1",
                            children: [
                              (0, t.jsx)("span", {
                                className: (0, h.c)("min-w-0 truncate", ej),
                                children: eE,
                              }),
                              (0, t.jsx)(n.f, {
                                mint: T,
                                chainId: O,
                                size: ep ? 14 : 12,
                              }),
                            ],
                          }),
                          null != V
                            ? (0, t.jsx)("div", {
                                className: "flex w-full min-w-0 items-center",
                                children: V,
                              })
                            : eP
                              ? (0, t.jsxs)("p", {
                                  className: (0, h.c)(
                                    "flex w-full items-baseline gap-1",
                                    eN,
                                  ),
                                  children: [
                                    e_
                                      ? (0, t.jsxs)("span", {
                                          className:
                                            "min-w-0 shrink-[999] truncate",
                                          children: [e_, " ·"],
                                        })
                                      : null,
                                    eP,
                                  ],
                                })
                              : (0, t.jsx)("p", {
                                  className: (0, h.c)("w-full truncate", eN),
                                  children: e_ ?? "",
                                }),
                        ],
                      })),
                  (P[115] = O),
                  (P[116] = ep),
                  (P[117] = er),
                  (P[118] = eu),
                  (P[119] = eN),
                  (P[120] = T),
                  (P[121] = I),
                  (P[122] = eP),
                  (P[123] = V),
                  (P[124] = e_),
                  (P[125] = eE),
                  (P[126] = ej),
                  (P[127] = W))
                : (W = P[127]),
              P[128] !== H || P[129] !== W
                ? ((et = (0, t.jsx)("div", { className: H, children: W })),
                  (P[128] = H),
                  (P[129] = W),
                  (P[130] = et))
                : (et = P[130]));
            let eA = ey
              ? (0, t.jsxs)("div", {
                  className: (0, h.c)("shrink-0", eR),
                  children: [
                    (0, t.jsx)("p", {
                      className: (0, h.c)("whitespace-nowrap text-right", eS),
                      children: X(
                        "profile.narrative.positions_sort.position_size",
                      ),
                    }),
                    (0, t.jsxs)("p", {
                      "data-testid": "callout-position-held-amount",
                      className: (0, h.c)(
                        "whitespace-nowrap text-right text-text-primary",
                        eC,
                      ),
                      children: [
                        p({ value: z, locale: ei, t: X }),
                        er ? ` ${er}` : "",
                      ],
                    }),
                  ],
                })
              : null;
            (P[131] !== D || P[132] !== et || P[133] !== eA
              ? ((N = (0, t.jsxs)("div", {
                  className: "flex min-w-10 flex-1 items-center gap-2",
                  children: [D, et, eA],
                })),
                (P[131] = D),
                (P[132] = et),
                (P[133] = eA),
                (P[134] = N))
              : (N = P[134]),
              (v = "flex shrink-0 items-center gap-3"));
            let eq = eu
                ? null
                : (0, t.jsx)("p", {
                    "data-testid": "callout-position-value-label",
                    className: (0, h.c)("whitespace-nowrap text-right", eS),
                    children: eo
                      ? X("web.callouts.exit_label")
                      : null !== ef
                        ? X("common.closed")
                        : X("coin_details.position"),
                  }),
              eU = es
                ? (0, t.jsxs)("p", {
                    className: (0, h.c)(
                      "whitespace-nowrap text-right text-text-primary",
                      eC,
                    ),
                    children: [
                      (0, s.w)(A),
                      B
                        ? (0, t.jsx)("span", {
                            className: "ml-1 font-normal text-text-tertiary",
                            children: B,
                          })
                        : null,
                    ],
                  })
                : eo
                  ? (0, t.jsx)("p", {
                      "data-testid": "callout-position-exit-value",
                      className: (0, h.c)(
                        "whitespace-nowrap text-right text-text-primary",
                        eC,
                      ),
                      children: (0, s.w)(U),
                    })
                  : null !== ef
                    ? (0, t.jsx)("time", {
                        "data-testid": "callout-position-closed-date",
                        dateTime: ew,
                        title: ev,
                        suppressHydrationWarning: !0,
                        className: (0, h.c)(
                          "whitespace-nowrap text-right text-text-primary",
                          eC,
                        ),
                        children: (0, u.u)({ locale: ei, timestampMs: ef }),
                      })
                    : J
                      ? (0, t.jsx)(c.E, {
                          density: ep ? "comfortable" : "terminal",
                          "data-testid": "callout-position-closed-tag",
                          children: X("common.closed"),
                        })
                      : (0, t.jsx)("p", {
                          className: (0, h.c)(
                            "whitespace-nowrap text-right text-text-primary",
                            eC,
                          ),
                          children: "—",
                        });
            (P[135] !== eR || P[136] !== eq || P[137] !== eU
              ? ((y = (0, t.jsxs)("div", {
                  className: eR,
                  children: [eq, eU],
                })),
                (P[135] = eR),
                (P[136] = eq),
                (P[137] = eU),
                (P[138] = y))
              : (y = P[138]),
              (b =
                eu && !ed
                  ? null
                  : (0, t.jsxs)("div", {
                      className: eR,
                      children: [
                        eu
                          ? null
                          : (0, t.jsx)("p", {
                              className: (0, h.c)(
                                "whitespace-nowrap text-right",
                                eS,
                              ),
                              children: X("coin_details.profit"),
                            }),
                        (0, t.jsx)("p", {
                          className: (0, h.c)(
                            "whitespace-nowrap text-right",
                            eC,
                            ec,
                          ),
                          children: ed ? (0, s.u)($) : "—",
                        }),
                      ],
                    })));
          }
          ((P[0] = K),
            (P[1] = O),
            (P[2] = G),
            (P[3] = L),
            (P[4] = Z),
            (P[5] = U),
            (P[6] = z),
            (P[7] = Y.language),
            (P[8] = k),
            (P[9] = J),
            (P[10] = ee),
            (P[11] = F),
            (P[12] = T),
            (P[13] = I),
            (P[14] = $),
            (P[15] = A),
            (P[16] = V),
            (P[17] = M),
            (P[18] = X),
            (P[19] = B),
            (P[20] = Q),
            (P[21] = m),
            (P[22] = w),
            (P[23] = v),
            (P[24] = y),
            (P[25] = b),
            (P[26] = j),
            (P[27] = N),
            (P[28] = S),
            (P[29] = C));
        } else
          ((m = P[21]),
            (w = P[22]),
            (v = P[23]),
            (y = P[24]),
            (b = P[25]),
            (j = P[26]),
            (N = P[27]),
            (S = P[28]),
            (C = P[29]));
        return w !== Symbol.for("react.early_return_sentinel")
          ? w
          : (P[139] !== K || P[140] !== v || P[141] !== y || P[142] !== b
              ? ((R = (0, t.jsxs)("div", {
                  className: v,
                  children: [y, b, K],
                })),
                (P[139] = K),
                (P[140] = v),
                (P[141] = y),
                (P[142] = b),
                (P[143] = R))
              : (R = P[143]),
            P[144] !== R || P[145] !== j || P[146] !== N
              ? ((E = (0, t.jsxs)("div", { className: j, children: [N, R] })),
                (P[144] = R),
                (P[145] = j),
                (P[146] = N),
                (P[147] = E))
              : (E = P[147]),
            P[148] !== W ||
            P[149] !== m ||
            P[150] !== E ||
            P[151] !== S ||
            P[152] !== C
              ? ((_ = (0, t.jsxs)("div", {
                  "data-testid": S,
                  "data-density": C,
                  className: m,
                  children: [E, W],
                })),
                (P[148] = W),
                (P[149] = m),
                (P[150] = E),
                (P[151] = S),
                (P[152] = C),
                (P[153] = _))
              : (_ = P[153]),
            _);
      },
    ],
    223363,
  );
};
