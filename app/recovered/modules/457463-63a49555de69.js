// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    i = e.i(365089),
    n = e.i(458310);
  e.i(12692);
  var s = e.i(398902),
    a = e.i(605255);
  e.i(12641);
  var r = e.i(34011),
    o = e.i(116830);
  e.i(84455);
  var d = e.i(540805),
    c = e.i(936947),
    u = e.i(529841),
    m = e.i(248496),
    p = e.i(210940);
  e.i(267146);
  var f = e.i(890088),
    h = e.i(592209),
    x = e.i(338319),
    v = e.i(90832),
    b = e.i(633311),
    g = e.i(361284);
  let w = "pl-[52px]",
    N = (0, x.c)("max-sm:grid-cols-[minmax(0,1fr)_auto_auto]", a.Ak),
    y =
      "absolute inset-0 z-0 block rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-text-accent",
    j = "relative z-10",
    _ =
      "grid min-h-14 items-start gap-x-3 border-b border-border-secondary px-5 py-2",
    U = (e) => ("number" == typeof e && Number.isFinite(e) && e > 0 ? e : null);
  e.s([
    "h",
    0,
    40,
    "j",
    0,
    y,
    "G",
    0,
    N,
    "N",
    0,
    j,
    "K",
    0,
    "block w-full cursor-pointer text-left",
    "y",
    0,
    "block w-full text-left",
    "z",
    0,
    w,
    "d",
    0,
    function (e) {
      let m,
        C,
        A,
        P,
        S,
        k,
        I,
        E,
        M,
        L,
        O,
        F,
        T,
        R,
        z,
        $,
        D,
        B,
        q,
        K,
        V,
        Q,
        H = (0, l.c)(134),
        {
          mint: Z,
          href: W,
          name: Y,
          symbol: G,
          imageUri: J,
          chainId: X,
          program: ee,
          platform: et,
          protocol: el,
          boardProgram: ei,
          amount: en,
          valueUsd: es,
          exitProceedsUsd: ea,
          marketCapUsd: er,
          avgEntryMarketCapUsd: eo,
          spentUsd: ed,
          originFigure: ec,
          originLine: eu,
          pnlUsd: em,
          pnlPct: ep,
          isClosed: ef,
          closedAt: eh,
          openedAt: ex,
          subtitle: ev,
          actions: eb,
          footer: eg,
          note: ew,
          children: eN,
          art: ey,
          interactive: ej,
          className: e_,
        } = e,
        eU = void 0 !== ef && ef,
        eC = void 0 === ej || ej,
        { t: eA, i18n: eP } = (0, s.f)();
      if (
        H[0] !== en ||
        H[1] !== eh ||
        H[2] !== eP.language ||
        H[3] !== eU ||
        H[4] !== Z ||
        H[5] !== Y ||
        H[6] !== ex ||
        H[7] !== G ||
        H[8] !== eA
      ) {
        let e,
          t,
          l,
          n,
          s = (0, h.v)(eP.language) ?? h.T;
        H[17] !== G
          ? ((e = G?.replace(/^\$/, "") || null), (H[17] = G), (H[18] = e))
          : (e = H[18]);
        let a = e;
        (H[19] !== a || H[20] !== Z || H[21] !== Y
          ? ((t = Y?.trim() || a || (0, i.d)(Z)),
            (H[19] = a),
            (H[20] = Z),
            (H[21] = Y),
            (H[22] = t))
          : (t = H[22]),
          (E = t),
          (m =
            null != en && Number.isFinite(en) && en > 0
              ? `${(0, p.f)({ value: en, locale: s, t: eA })}${a ? ` ${a}` : ""}`
              : a));
        let r = eU ? (0, b.l)(eh) : null;
        C =
          null !== r
            ? `${eA("common.closed")} ${(0, f.u)({ locale: s, timestampMs: r })}`
            : null;
        let o = (0, b.l)(ex);
        ((S = eU ? null : o),
          (k =
            eU && null !== o
              ? `${eA("web.common.opened")} ${(0, f.u)({ locale: s, timestampMs: o })}`
              : null));
        let d = eU && null !== o && null !== r ? r - o : null;
        (H[23] !== d || H[24] !== eA
          ? ((l =
              null !== d && d >= 0
                ? (0, f.f)({ t: eA, elapsedMs: d, suffix: !1 })
                : null),
            (H[23] = d),
            (H[24] = eA),
            (H[25] = l))
          : (l = H[25]),
          (P = l),
          H[26] !== P || H[27] !== eA
            ? ((n =
                null !== P
                  ? `${eA("web.coin.holders_column_held_for")} ${P}`
                  : null),
              (H[26] = P),
              (H[27] = eA),
              (H[28] = n))
            : (n = H[28]),
          (A = n),
          (I =
            eU && null !== o && null !== r
              ? `${(0, f.u)({ locale: s, timestampMs: o })} – ${(0, f.u)({ locale: s, timestampMs: r })}`
              : null),
          (H[0] = en),
          (H[1] = eh),
          (H[2] = eP.language),
          (H[3] = eU),
          (H[4] = Z),
          (H[5] = Y),
          (H[6] = ex),
          (H[7] = G),
          (H[8] = eA),
          (H[9] = m),
          (H[10] = C),
          (H[11] = A),
          (H[12] = P),
          (H[13] = S),
          (H[14] = k),
          (H[15] = I),
          (H[16] = E));
      } else
        ((m = H[9]),
          (C = H[10]),
          (A = H[11]),
          (P = H[12]),
          (S = H[13]),
          (k = H[14]),
          (I = H[15]),
          (E = H[16]));
      let eS = I,
        ek = null !== eS;
      if (
        H[29] !== eb ||
        H[30] !== m ||
        H[31] !== ey ||
        H[32] !== eo ||
        H[33] !== ei ||
        H[34] !== X ||
        H[35] !== e_ ||
        H[36] !== C ||
        H[37] !== eS ||
        H[38] !== ea ||
        H[39] !== A ||
        H[40] !== P ||
        H[41] !== S ||
        H[42] !== W ||
        H[43] !== J ||
        H[44] !== eC ||
        H[45] !== eU ||
        H[46] !== er ||
        H[47] !== Z ||
        H[48] !== Y ||
        H[49] !== k ||
        H[50] !== ec ||
        H[51] !== eu ||
        H[52] !== et ||
        H[53] !== ep ||
        H[54] !== em ||
        H[55] !== ee ||
        H[56] !== el ||
        H[57] !== ed ||
        H[58] !== ev ||
        H[59] !== G ||
        H[60] !== eA ||
        H[61] !== E ||
        H[62] !== es ||
        H[63] !== ek
      ) {
        let e,
          l,
          i,
          s,
          p,
          f,
          h,
          b,
          w = U(er),
          I = U(eo),
          B = U(ed),
          q = eU ? U(ea) : null,
          K = null != es && Number.isFinite(es),
          V = null != em && Number.isFinite(em),
          Q = (0, d.k)(em),
          en = V ? (0, g.f)(ep) : null,
          ef = null != w ? (0, d.l)(w) : null;
        H[73] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, x.c)(a.wG, "text-text-primary")), (H[73] = e))
          : (e = H[73]);
        let eh = e;
        ((T = "holding-row"), (R = W ? c.N : void 0));
        let ex = eC ? a.r$ : _;
        (H[74] !== e_ || H[75] !== ex
          ? ((z = (0, x.c)(ex, N, "relative", e_)),
            (H[74] = e_),
            (H[75] = ex),
            (H[76] = z))
          : (z = H[76]),
          H[77] !== W || H[78] !== E
            ? (($ = W
                ? (0, t.jsx)(n.default, {
                    href: W,
                    "aria-label": E,
                    "data-row-cover": "",
                    "data-testid": "holding-row-link",
                    className: y,
                  })
                : null),
              (H[77] = W),
              (H[78] = E),
              (H[79] = $))
            : ($ = H[79]),
          H[80] !== ey ||
          H[81] !== ei ||
          H[82] !== X ||
          H[83] !== J ||
          H[84] !== Z ||
          H[85] !== Y ||
          H[86] !== et ||
          H[87] !== ee ||
          H[88] !== el ||
          H[89] !== G
            ? ((l =
                ey ??
                (0, t.jsx)(r.CoinAvatar, {
                  coin: {
                    mint: Z,
                    name: Y,
                    symbol: G,
                    image_uri: J,
                    chain_id: X,
                    program: ee,
                    platform: et,
                    protocol: el,
                    board_program: ei,
                  },
                  size: 40,
                  seal: "name",
                  testIdPrefix: "holding-row-art",
                })),
              (H[80] = ey),
              (H[81] = ei),
              (H[82] = X),
              (H[83] = J),
              (H[84] = Z),
              (H[85] = Y),
              (H[86] = et),
              (H[87] = ee),
              (H[88] = el),
              (H[89] = G),
              (H[90] = l))
            : (l = H[90]),
          H[91] !== Z || H[92] !== Y || H[93] !== G
            ? ((i = { mint: Z, name: Y, symbol: G }),
              (H[91] = Z),
              (H[92] = Y),
              (H[93] = G),
              (H[94] = i))
            : (i = H[94]),
          H[95] === Symbol.for("react.memo_cache_sentinel")
            ? ((s = (0, x.c)("min-w-0", a.CW)), (H[95] = s))
            : (s = H[95]),
          H[96] !== E
            ? ((p = (0, t.jsx)("span", {
                "data-testid": "holding-row-title",
                className: "block truncate",
                children: E,
              })),
              (H[96] = E),
              (H[97] = p))
            : (p = H[97]),
          H[98] !== i || H[99] !== p
            ? ((f = (0, t.jsx)("div", {
                "data-testid": "holding-row-name-line",
                className: "flex min-w-0 items-center",
                children: (0, t.jsx)(o.f, {
                  coin: i,
                  nameClassName: s,
                  children: p,
                }),
              })),
              (H[98] = i),
              (H[99] = p),
              (H[100] = f))
            : (f = H[100]));
        let eg =
          null != ev || m || k || C || null !== S || ef || null != eb
            ? (0, t.jsxs)("div", {
                "data-testid": "holding-row-meta",
                className: "flex min-w-0 items-center gap-2",
                children: [
                  null != ev
                    ? (0, t.jsx)("div", {
                        className: "flex min-w-0 flex-1 items-center",
                        children: ev,
                      })
                    : m || k || C || null !== S || ef
                      ? (0, t.jsxs)("p", {
                          className: (0, x.c)(
                            a.aL,
                            a.cr,
                            "max-sm:flex-wrap max-sm:gap-y-0",
                          ),
                          children: [
                            m
                              ? (0, t.jsx)("span", {
                                  "data-testid": "holding-row-amount",
                                  className: "min-w-0 truncate sm:flex-1",
                                  children: m,
                                })
                              : null,
                            k
                              ? (0, t.jsx)("span", {
                                  "data-testid": "holding-row-opened-at",
                                  className:
                                    "hidden min-w-0 truncate @[840px]:inline",
                                  children: k,
                                })
                              : null,
                            C
                              ? (0, t.jsx)("span", {
                                  "data-testid": "holding-row-closed-ago",
                                  className: (0, x.c)(
                                    "min-w-0 truncate",
                                    ek && "hidden @[840px]:inline",
                                  ),
                                  children: C,
                                })
                              : null,
                            A
                              ? (0, t.jsx)("span", {
                                  "data-testid": "holding-row-held-duration",
                                  className:
                                    "hidden min-w-0 truncate @[840px]:inline",
                                  children: A,
                                })
                              : null,
                            eS
                              ? (0, t.jsx)("span", {
                                  "data-testid": "holding-row-closed-range",
                                  className: "min-w-0 truncate @[840px]:hidden",
                                  children: eS,
                                })
                              : null,
                            eS && null !== P
                              ? (0, t.jsx)("span", {
                                  "data-testid":
                                    "holding-row-held-duration-compact",
                                  className: "min-w-0 truncate @[840px]:hidden",
                                  children: P,
                                })
                              : null,
                            null !== S
                              ? (0, t.jsxs)("span", {
                                  "data-testid": "holding-row-held-for",
                                  className: "min-w-0 truncate",
                                  children: [
                                    eA("web.coin.holders_column_held_for"),
                                    " ",
                                    (0, t.jsx)(u.f, {
                                      timestamp: S,
                                      density: "terminal",
                                      showTitle: !0,
                                    }),
                                  ],
                                })
                              : null,
                            ef
                              ? (0, t.jsx)("span", {
                                  "data-testid": "holding-row-mcap-inline",
                                  className: "min-w-0 truncate sm:hidden",
                                  children: eA(
                                    "callouts.position_card.mcap_value",
                                    { market_cap: ef },
                                  ),
                                })
                              : null,
                          ],
                        })
                      : null,
                  null == eu || ef
                    ? null
                    : (0, t.jsx)("span", {
                        "data-testid": "holding-row-origin-line-phone",
                        className: (0, x.c)(a.cr, "min-w-0 truncate sm:hidden"),
                        children: eu,
                      }),
                  null != eb
                    ? (0, t.jsx)("span", {
                        "data-testid": "holding-row-actions",
                        className: (0, x.c)(
                          j,
                          "hidden group-hover:flex group-focus-within:flex [@media(hover:none)]:flex",
                          "-my-px shrink-0 gap-1",
                        ),
                        children: eb,
                      })
                    : null,
                ],
              })
            : null;
        (H[101] !== f || H[102] !== eg
          ? ((h = (0, t.jsxs)("div", { className: a.Ft, children: [f, eg] })),
            (H[101] = f),
            (H[102] = eg),
            (H[103] = h))
          : (h = H[103]),
          H[104] !== l || H[105] !== h
            ? ((D = (0, t.jsxs)("div", { className: a.f7, children: [l, h] })),
              (H[104] = l),
              (H[105] = h),
              (H[106] = D))
            : (D = H[106]),
          H[107] === Symbol.for("react.memo_cache_sentinel")
            ? ((b = (0, x.c)(a.oF, "max-sm:hidden")), (H[107] = b))
            : (b = H[107]));
        let ew =
          ef || null != I
            ? (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)("span", {
                    "data-testid": "holding-row-mcap",
                    className: eh,
                    children: ef ?? "—",
                  }),
                  null != I
                    ? (0, t.jsx)("span", {
                        "data-testid": "holding-row-avg-entry",
                        className: a.cr,
                        children: eA("web.chart.avg_entry_line", {
                          market_cap: (0, d.l)(I),
                        }),
                      })
                    : null,
                ],
              })
            : null != ec || null != eu
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    null != ec
                      ? (0, t.jsx)("span", {
                          "data-testid": "holding-row-origin-figure",
                          className: eh,
                          children: ec,
                        })
                      : (0, t.jsx)("span", {
                          "aria-hidden": !0,
                          className: "h-5",
                        }),
                    null != eu
                      ? (0, t.jsx)("span", {
                          "data-testid": "holding-row-origin-line",
                          className: a.cr,
                          children: eu,
                        })
                      : null,
                  ],
                })
              : null;
        H[108] !== ew
          ? ((M = (0, t.jsx)("div", { className: b, children: ew })),
            (H[108] = ew),
            (H[109] = M))
          : (M = H[109]);
        let eN = eU
            ? null != q
              ? (0, t.jsx)("span", {
                  "data-testid": "holding-row-exit",
                  className: eh,
                  children: (0, v.w)(q),
                })
              : (0, t.jsx)("span", { "aria-hidden": !0, className: "h-5" })
            : (0, t.jsx)("span", {
                "data-testid": "holding-row-value",
                className: eh,
                children: K ? (0, v.w)(es) : "—",
              }),
          ej =
            null != B
              ? (0, t.jsxs)("span", {
                  "data-testid": "holding-row-spent",
                  className: a.cr,
                  children: [
                    eA("callouts.position_card.spent_label"),
                    " ",
                    (0, d.l)(B),
                  ],
                })
              : null;
        (H[110] !== eN || H[111] !== ej
          ? ((L = (0, t.jsxs)("div", { className: a.oF, children: [eN, ej] })),
            (H[110] = eN),
            (H[111] = ej),
            (H[112] = L))
          : (L = H[112]),
          (O = a.oF),
          (F = V
            ? (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)("span", {
                    "data-testid": "holding-row-pnl",
                    className: (0, x.c)(a.wG, Q),
                    children: (0, d.u)(em),
                  }),
                  null !== en
                    ? (0, t.jsx)("span", {
                        "data-testid": "holding-row-pnl-pct",
                        className: (0, x.c)(
                          "text-[13px] leading-[18px] font-medium tabular-nums",
                          Q,
                        ),
                        children: (0, d.c)(en),
                      })
                    : null,
                ],
              })
            : null),
          (H[29] = eb),
          (H[30] = m),
          (H[31] = ey),
          (H[32] = eo),
          (H[33] = ei),
          (H[34] = X),
          (H[35] = e_),
          (H[36] = C),
          (H[37] = eS),
          (H[38] = ea),
          (H[39] = A),
          (H[40] = P),
          (H[41] = S),
          (H[42] = W),
          (H[43] = J),
          (H[44] = eC),
          (H[45] = eU),
          (H[46] = er),
          (H[47] = Z),
          (H[48] = Y),
          (H[49] = k),
          (H[50] = ec),
          (H[51] = eu),
          (H[52] = et),
          (H[53] = ep),
          (H[54] = em),
          (H[55] = ee),
          (H[56] = el),
          (H[57] = ed),
          (H[58] = ev),
          (H[59] = G),
          (H[60] = eA),
          (H[61] = E),
          (H[62] = es),
          (H[63] = ek),
          (H[64] = M),
          (H[65] = L),
          (H[66] = O),
          (H[67] = F),
          (H[68] = T),
          (H[69] = R),
          (H[70] = z),
          (H[71] = $),
          (H[72] = D));
      } else
        ((M = H[64]),
          (L = H[65]),
          (O = H[66]),
          (F = H[67]),
          (T = H[68]),
          (R = H[69]),
          (z = H[70]),
          ($ = H[71]),
          (D = H[72]));
      return (
        H[113] !== O || H[114] !== F
          ? ((B = (0, t.jsx)("div", { className: O, children: F })),
            (H[113] = O),
            (H[114] = F),
            (H[115] = B))
          : (B = H[115]),
        H[116] !== eg
          ? ((q =
              null != eg
                ? (0, t.jsx)("div", {
                    className: (0, x.c)(j, "col-span-full mt-1", w),
                    children: eg,
                  })
                : null),
            (H[116] = eg),
            (H[117] = q))
          : (q = H[117]),
        H[118] !== ew
          ? ((K =
              null != ew
                ? (0, t.jsxs)("div", {
                    "data-testid": "holding-row-note",
                    className: (0, x.c)(j, a.Kh),
                    children: [
                      (0, t.jsx)("span", {
                        "aria-hidden": !0,
                        "data-testid": "holding-row-note-bar",
                        className: a.N8,
                      }),
                      (0, t.jsx)("div", {
                        className: "min-w-0 flex-1",
                        children: ew,
                      }),
                    ],
                  })
                : null),
            (H[118] = ew),
            (H[119] = K))
          : (K = H[119]),
        H[120] !== eN
          ? ((V =
              null != eN
                ? (0, t.jsx)("div", {
                    className: (0, x.c)(j, "col-span-full"),
                    children: eN,
                  })
                : null),
            (H[120] = eN),
            (H[121] = V))
          : (V = H[121]),
        H[122] !== M ||
        H[123] !== L ||
        H[124] !== B ||
        H[125] !== q ||
        H[126] !== K ||
        H[127] !== V ||
        H[128] !== T ||
        H[129] !== R ||
        H[130] !== z ||
        H[131] !== $ ||
        H[132] !== D
          ? ((Q = (0, t.jsxs)("div", {
              "data-testid": T,
              onClick: R,
              className: z,
              children: [$, D, M, L, B, q, K, V],
            })),
            (H[122] = M),
            (H[123] = L),
            (H[124] = B),
            (H[125] = q),
            (H[126] = K),
            (H[127] = V),
            (H[128] = T),
            (H[129] = R),
            (H[130] = z),
            (H[131] = $),
            (H[132] = D),
            (H[133] = Q))
          : (Q = H[133]),
        Q
      );
    },
    "E",
    0,
    function () {
      let e,
        i,
        n,
        s,
        r = (0, l.c)(4);
      r[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsxs)(t.Fragment, {
            children: [
              (0, t.jsx)(m.l, { className: "my-[3px]", height: 14, width: 64 }),
              (0, t.jsx)(m.l, { className: "my-[3px]", height: 12, width: 80 }),
            ],
          })),
          (r[0] = e))
        : (e = r[0]);
      let o = e;
      return (
        r[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, x.c)(_, N)), (r[1] = i))
          : (i = r[1]),
        r[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = (0, t.jsx)(m.l, { variant: "art", size: 40 })), (r[2] = n))
          : (n = r[2]),
        r[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = (0, t.jsxs)("div", {
              "aria-hidden": !0,
              className: i,
              children: [
                (0, t.jsxs)("div", {
                  className: a.f7,
                  children: [
                    n,
                    (0, t.jsxs)("div", {
                      className: a.Ft,
                      children: [
                        (0, t.jsx)(m.l, {
                          className: "my-[3px] max-w-full",
                          height: 14,
                          width: 112,
                        }),
                        (0, t.jsx)(m.l, {
                          className: "my-[3px] max-w-full",
                          height: 12,
                          width: 80,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  className: (0, x.c)(a.oF, "max-sm:hidden"),
                  children: o,
                }),
                (0, t.jsx)("div", { className: a.oF, children: o }),
                (0, t.jsx)("div", { className: a.oF, children: o }),
              ],
            })),
            (r[3] = s))
          : (s = r[3]),
        s
      );
    },
    "D",
    0,
    "divide-y divide-border-secondary",
    "R",
    0,
    "px-[var(--position-row-pad,1rem)]",
    "f",
    0,
    "focus-inset block w-full cursor-pointer px-[var(--position-row-pad,1rem)] py-2 text-left transition-colors hover:bg-bg-tertiary",
    "u",
    0,
    "block w-full px-[var(--position-row-pad,1rem)] py-2 text-left",
  ]);
};
