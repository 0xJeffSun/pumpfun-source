// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(745018),
    a = e.i(365089),
    o = e.i(458310),
    i = e.i(352386);
  e.i(12692);
  var n = e.i(398902),
    s = e.i(989039),
    c = e.i(865567),
    d = e.i(65407),
    m = e.i(713380),
    u = e.i(909318),
    p = e.i(56087),
    h = e.i(623288),
    b = e.i(214111),
    x = e.i(964626);
  e.i(84455);
  var f = e.i(242917),
    g = e.i(540805),
    y = e.i(79631),
    v = e.i(850175),
    w = e.i(425890),
    S = e.i(505266),
    N = e.i(12345),
    C = e.i(662093),
    j = e.i(338319),
    P = e.i(90832);
  function k(e) {
    let l,
      a,
      o = (0, r.c)(4),
      { columns: i } = e;
    return (
      o[0] !== i ? ((l = i.map(T)), (o[0] = i), (o[1] = l)) : (l = o[1]),
      o[2] !== l
        ? ((a = (0, t.jsx)("div", {
            className: "flex shrink-0 items-center gap-3",
            children: l,
          })),
          (o[2] = l),
          (o[3] = a))
        : (a = o[3]),
      a
    );
  }
  function T(e) {
    return (0, t.jsxs)(
      "div",
      {
        className: "flex flex-col items-end gap-0.5",
        children: [
          (0, t.jsx)("span", {
            className: "text-xs leading-4 text-text-tertiary",
            children: e.label,
          }),
          (0, t.jsx)("span", {
            className: (0, j.c)(
              "text-xs leading-4 tabular-nums",
              e.valueClassName ?? "text-text-primary",
            ),
            children: e.value,
          }),
        ],
      },
      e.label,
    );
  }
  function M(e) {
    let l,
      a,
      o,
      i,
      s,
      c,
      d,
      m,
      u,
      p = (0, r.c)(53),
      {
        summary: h,
        isLoading: y,
        calloutMarketCap: v,
        calloutMultiple: S,
        currentMarketCap: N,
      } = e,
      { t: C } = (0, n.f)(),
      T = (0, w.f)();
    if (y) {
      let e;
      return (
        p[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsxs)("div", {
              "aria-hidden": !0,
              className: "flex items-center gap-3",
              children: [
                (0, t.jsx)("span", {
                  className: "h-8 w-14 animate-pulse rounded bg-bg-tertiary",
                }),
                (0, t.jsx)("span", {
                  className: "h-8 w-14 animate-pulse rounded bg-bg-tertiary",
                }),
              ],
            })),
            (p[0] = e))
          : (e = p[0]),
        e
      );
    }
    let M = h?.isClosed ? null : h?.positionUsd,
      _ = h?.netPnlUsd;
    if (null != M && null != _) {
      let e, r, l, a, o, i, n, s;
      if (
        (p[1] !== C
          ? ((e = C("coin_details.position")), (p[1] = C), (p[2] = e))
          : (e = p[2]),
        p[3] !== M ? ((r = (0, P.w)(M)), (p[3] = M), (p[4] = r)) : (r = p[4]),
        p[5] !== e || p[6] !== r
          ? ((l = { label: e, value: r }), (p[5] = e), (p[6] = r), (p[7] = l))
          : (l = p[7]),
        p[8] !== C
          ? ((a = C("coin_details.profit")), (p[8] = C), (p[9] = a))
          : (a = p[9]),
        p[10] !== _)
      )
        ((o = `${_ >= 0 ? "+" : "-"}${(0, P.w)(Math.abs(_))}`),
          (p[10] = _),
          (p[11] = o));
      else o = p[11];
      return (
        p[12] !== _ || p[13] !== T
          ? ((i = T ? (0, g.k)(_, 0) : _ >= 0 ? "text-gain" : "text-loss"),
            (p[12] = _),
            (p[13] = T),
            (p[14] = i))
          : (i = p[14]),
        p[15] !== a || p[16] !== o || p[17] !== i
          ? ((n = { label: a, value: o, valueClassName: i }),
            (p[15] = a),
            (p[16] = o),
            (p[17] = i),
            (p[18] = n))
          : (n = p[18]),
        p[19] !== l || p[20] !== n
          ? ((s = (0, t.jsx)(k, { columns: [l, n] })),
            (p[19] = l),
            (p[20] = n),
            (p[21] = s))
          : (s = p[21]),
        s
      );
    }
    if (!("number" == typeof v && v > 0)) return null;
    p[22] !== v || p[23] !== S || p[24] !== N
      ? ((l = "number" == typeof N && Number.isFinite(N) ? N / v : (S ?? null)),
        (p[22] = v),
        (p[23] = S),
        (p[24] = N),
        (p[25] = l))
      : (l = p[25]);
    let U = l;
    if (p[26] !== v || p[27] !== U || p[28] !== C) {
      let e,
        t,
        r,
        l = (0, x.f)(U);
      ((a = k),
        p[34] !== C
          ? ((e = C("web.callouts.called_at")), (p[34] = C), (p[35] = e))
          : (e = p[35]),
        p[36] !== v
          ? ((t = (0, b.f)(v)), (p[36] = v), (p[37] = t))
          : (t = p[37]),
        p[38] !== e || p[39] !== t
          ? ((c = { label: e, value: t }),
            (p[38] = e),
            (p[39] = t),
            (p[40] = c))
          : (c = p[40]),
        p[41] !== C
          ? ((o = C("share.pnl.mode_multiple_label")), (p[41] = C), (p[42] = o))
          : (o = p[42]),
        (i = l.label),
        (s =
          "up" === (r = l.tone)
            ? (0, j.c)("font-semibold", f.f.gain)
            : "down" === r
              ? (0, j.c)("font-semibold", f.f.loss)
              : "text-text-primary"),
        (p[26] = v),
        (p[27] = U),
        (p[28] = C),
        (p[29] = a),
        (p[30] = o),
        (p[31] = i),
        (p[32] = s),
        (p[33] = c));
    } else ((a = p[29]), (o = p[30]), (i = p[31]), (s = p[32]), (c = p[33]));
    return (
      p[43] !== o || p[44] !== i || p[45] !== s
        ? ((d = { label: o, value: i, valueClassName: s }),
          (p[43] = o),
          (p[44] = i),
          (p[45] = s),
          (p[46] = d))
        : (d = p[46]),
      p[47] !== c || p[48] !== d
        ? ((m = [c, d]), (p[47] = c), (p[48] = d), (p[49] = m))
        : (m = p[49]),
      p[50] !== a || p[51] !== m
        ? ((u = (0, t.jsx)(a, { columns: m })),
          (p[50] = a),
          (p[51] = m),
          (p[52] = u))
        : (u = p[52]),
      u
    );
  }
  function _(e) {
    let l,
      a,
      o,
      i = (0, r.c)(9),
      { spentUsd: s, avgEntryMcapUsd: c } = e,
      { t: d } = (0, n.f)();
    return null == s && null == c
      ? null
      : (i[0] !== s || i[1] !== d
          ? ((l =
              null != s
                ? (0, t.jsxs)("span", {
                    className: "flex items-center gap-1",
                    children: [
                      (0, t.jsx)("span", {
                        className: "text-text-tertiary",
                        children: d("callouts.position_card.spent_label"),
                      }),
                      (0, t.jsx)("span", {
                        className:
                          "font-semibold tabular-nums text-text-secondary",
                        children: (0, P.v)(s),
                      }),
                    ],
                  })
                : (0, t.jsx)("span", {})),
            (i[0] = s),
            (i[1] = d),
            (i[2] = l))
          : (l = i[2]),
        i[3] !== c || i[4] !== d
          ? ((a =
              null != c
                ? (0, t.jsxs)("span", {
                    className: "flex items-center gap-1",
                    children: [
                      (0, t.jsx)("span", {
                        className: "text-text-tertiary",
                        children: d("callouts.position_card.avg_entry_label"),
                      }),
                      (0, t.jsx)("span", {
                        className:
                          "font-semibold tabular-nums text-text-secondary",
                        children: d("callouts.position_card.mcap_value", {
                          market_cap: (0, P.v)(c),
                        }),
                      }),
                    ],
                  })
                : null),
            (i[3] = c),
            (i[4] = d),
            (i[5] = a))
          : (a = i[5]),
        i[6] !== l || i[7] !== a
          ? ((o = (0, t.jsxs)("div", {
              "data-testid": "callout-coin-card-entry-stats",
              className:
                "flex w-full items-center justify-between text-xs leading-4",
              children: [l, a],
            })),
            (i[6] = l),
            (i[7] = a),
            (i[8] = o))
          : (o = i[8]),
        o);
  }
  function U(e) {
    let l,
      a,
      o,
      i = (0, r.c)(6),
      { coin: n } = e,
      { displayMode: d, persistDisplayMode: m } = (0, s.f)();
    return (
      i[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = { height: 320 }), (i[0] = l))
        : (l = i[0]),
      i[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = ["timeframes_toolbar"]), (i[1] = a))
        : (a = i[1]),
      i[2] !== n || i[3] !== d || i[4] !== m
        ? ((o = (0, t.jsx)("div", {
            className: "flex w-full flex-col",
            children: (0, t.jsx)("div", {
              className: "w-full overflow-hidden",
              style: l,
              children: (0, t.jsx)(c.f, {
                coin: n,
                displayMode: d,
                onDisplayModeChange: m,
                candleClassName: "h-[320px] [&_iframe]:h-[320px]",
                candleMinHeightPx: 320,
                extraDisabledFeatures: a,
              }),
            }),
          })),
          (i[2] = n),
          (i[3] = d),
          (i[4] = m),
          (i[5] = o))
        : (o = i[5]),
      o
    );
  }
  function $(e) {
    return !e;
  }
  e.s([
    "CalloutChartCard",
    0,
    function (e) {
      let l,
        a,
        o,
        i = (0, r.c)(7),
        { coin: n, className: s } = e;
      return (
        i[0] !== s
          ? ((l = (0, j.c)(
              "flex w-full flex-col overflow-hidden rounded-lg border border-border-secondary bg-bg-secondary",
              s,
            )),
            (i[0] = s),
            (i[1] = l))
          : (l = i[1]),
        i[2] !== n
          ? ((a = n
              ? (0, t.jsx)(U, { coin: n })
              : (0, t.jsx)("div", {
                  "aria-hidden": !0,
                  className: "h-56 w-full animate-pulse bg-bg-tertiary",
                })),
            (i[2] = n),
            (i[3] = a))
          : (a = i[3]),
        i[4] !== l || i[5] !== a
          ? ((o = (0, t.jsx)("div", { className: l, children: a })),
            (i[4] = l),
            (i[5] = a),
            (i[6] = o))
          : (o = i[6]),
        o
      );
    },
    "CalloutCoinCard",
    0,
    function (e) {
      let s,
        c,
        b,
        x,
        f,
        g,
        w,
        P,
        k,
        T,
        U,
        D,
        A,
        F,
        E,
        L,
        B,
        I,
        O,
        R,
        W,
        z,
        G = (0, r.c)(80),
        { t: H } = (0, n.f)(),
        [K, V] = (0, i.useState)(!1),
        {
          mint: q,
          coin: Y,
          positionWallet: Z,
          calloutMarketCap: X,
          calloutMultiple: J,
          liveMarketCap: Q,
          onOpenCoin: ee,
          className: et,
        } = e;
      (G[0] !== q ? ((s = [q]), (G[0] = q), (G[1] = s)) : (s = G[1]),
        G[2] !== Z || G[3] !== s
          ? ((c = { userId: Z, mints: s }), (G[2] = Z), (G[3] = s), (G[4] = c))
          : (c = G[4]));
      let { summaryFor: er, isLoading: el } = (0, y._)(c),
        ea = Z ? er(q) : null,
        eo = Y?.chain_id;
      G[5] !== Y || G[6] !== q || G[7] !== eo
        ? ((b = { mint: q, chainId: eo, coin: Y }),
          (G[5] = Y),
          (G[6] = q),
          (G[7] = eo),
          (G[8] = b))
        : (b = G[8]);
      let ei = (0, C.O)(b),
        en = ei(
          (0, S.f)({
            avgEntryPriceUsd: ea?.avgEntryPriceUsd,
            coin: Y,
            mint: q,
          }),
        ),
        es = Y?.chain_id,
        ec = Y?.usd_market_cap;
      G[9] !== Y || G[10] !== q || G[11] !== es || G[12] !== ec
        ? ((x = { mint: q, chainId: es, fallbackMarketCap: ec, coin: Y }),
          (G[9] = Y),
          (G[10] = q),
          (G[11] = es),
          (G[12] = ec),
          (G[13] = x))
        : (x = G[13]);
      let ed = (0, C.h)(x);
      G[14] !== Y?.symbol || G[15] !== q
        ? ((f = Y?.symbol?.trim() || (0, a.d)(q, 4, 4)),
          (G[14] = Y?.symbol),
          (G[15] = q),
          (G[16] = f))
        : (f = G[16]);
      let em = f;
      G[17] !== Y?.name
        ? ((g = Y?.name?.trim() || ""), (G[17] = Y?.name), (G[18] = g))
        : (g = G[18]);
      let eu = g,
        ep = Q ?? ed ?? null;
      G[19] !== Y || G[20] !== q
        ? ((w = Y ?? (0, v.e)(q)), (G[19] = Y), (G[20] = q), (G[21] = w))
        : (w = G[21]);
      let { prefetch: eh, hoverProps: eb } = (0, v.W)(w);
      G[22] !== et
        ? ((P = (0, j.c)(
            "flex w-full flex-col gap-1 rounded-lg border border-border-secondary bg-bg-secondary p-3",
            et,
          )),
          (G[22] = et),
          (G[23] = P))
        : (P = G[23]);
      let ex = `/coin/${q}`;
      (G[24] !== Y || G[25] !== q
        ? ((k =
            Y && (0, N.X)({ ...Y, mint: q })
              ? (0, t.jsx)(u.f, {
                  alt: "",
                  className: "size-full object-cover",
                  height: 72,
                  imageType: p.d.COIN_IMAGE,
                  mint: q,
                  isBanned: Y.is_banned,
                  sourceImageUrl: Y.image_uri ?? void 0,
                  width: 72,
                })
              : null),
          (G[24] = Y),
          (G[25] = q),
          (G[26] = k))
        : (k = G[26]),
        G[27] !== k
          ? ((T = (0, t.jsx)("span", {
              className:
                "block size-full overflow-hidden rounded-xl border border-border-primary bg-bg-primary",
              children: k,
            })),
            (G[27] = k),
            (G[28] = T))
          : (T = G[28]));
      let ef = Y?.chain_id,
        eg = Y?.program,
        ey = Y?.platform,
        ev = Y?.protocol,
        ew = Y?.board_program;
      return (
        G[29] === Symbol.for("react.memo_cache_sentinel")
          ? ((U = (0, d.P)(36)), (G[29] = U))
          : (U = G[29]),
        G[30] !== q ||
        G[31] !== ef ||
        G[32] !== eg ||
        G[33] !== ey ||
        G[34] !== ev ||
        G[35] !== ew
          ? ((D = (0, t.jsx)(m.f, {
              mint: q,
              chainId: ef,
              program: eg,
              platform: ey,
              protocol: ev,
              boardProgram: ew,
              size: 14,
              venueSize: U,
              className: "absolute -bottom-0.5 -right-0.5",
              chainClassName:
                "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-bg-secondary",
            })),
            (G[30] = q),
            (G[31] = ef),
            (G[32] = eg),
            (G[33] = ey),
            (G[34] = ev),
            (G[35] = ew),
            (G[36] = D))
          : (D = G[36]),
        G[37] !== T || G[38] !== D
          ? ((A = (0, t.jsxs)("span", {
              className: "relative block size-9 shrink-0",
              children: [T, D],
            })),
            (G[37] = T),
            (G[38] = D),
            (G[39] = A))
          : (A = G[39]),
        G[40] !== em
          ? ((F = (0, t.jsx)("span", {
              className: "truncate text-xs font-semibold leading-4 text-white",
              children: em,
            })),
            (G[40] = em),
            (G[41] = F))
          : (F = G[41]),
        G[42] !== eu
          ? ((E = eu
              ? (0, t.jsx)("span", {
                  className: "truncate text-xs leading-4 text-text-tertiary",
                  children: eu,
                })
              : null),
            (G[42] = eu),
            (G[43] = E))
          : (E = G[43]),
        G[44] !== F || G[45] !== E
          ? ((L = (0, t.jsxs)("span", {
              className: "flex min-w-0 flex-col gap-0.5",
              children: [F, E],
            })),
            (G[44] = F),
            (G[45] = E),
            (G[46] = L))
          : (L = G[46]),
        G[47] !== eb ||
        G[48] !== ee ||
        G[49] !== eh ||
        G[50] !== ex ||
        G[51] !== A ||
        G[52] !== L
          ? ((B = (0, t.jsxs)(o.default, {
              href: ex,
              prefetch: eh,
              ...eb,
              onClick: ee,
              className:
                "flex min-w-0 flex-1 items-center gap-2 transition-opacity hover:opacity-80",
              children: [A, L],
            })),
            (G[47] = eb),
            (G[48] = ee),
            (G[49] = eh),
            (G[50] = ex),
            (G[51] = A),
            (G[52] = L),
            (G[53] = B))
          : (B = G[53]),
        G[54] !== X ||
        G[55] !== J ||
        G[56] !== ep ||
        G[57] !== el ||
        G[58] !== Z ||
        G[59] !== ei ||
        G[60] !== ea
          ? ((I = Z
              ? (0, t.jsx)(M, {
                  summary: ea,
                  isLoading: el,
                  calloutMarketCap: ei(X),
                  calloutMultiple: J,
                  currentMarketCap: ep,
                })
              : null),
            (G[54] = X),
            (G[55] = J),
            (G[56] = ep),
            (G[57] = el),
            (G[58] = Z),
            (G[59] = ei),
            (G[60] = ea),
            (G[61] = I))
          : (I = G[61]),
        G[62] !== B || G[63] !== I
          ? ((O = (0, t.jsxs)("div", {
              className: "flex w-full items-center gap-3",
              children: [B, I],
            })),
            (G[62] = B),
            (G[63] = I),
            (G[64] = O))
          : (O = G[64]),
        G[65] !== en || G[66] !== el || G[67] !== Z || G[68] !== ea?.spentUsd
          ? ((R =
              Z && !el
                ? (0, t.jsx)(_, {
                    spentUsd: ea?.spentUsd ?? null,
                    avgEntryMcapUsd: en,
                  })
                : null),
            (G[65] = en),
            (G[66] = el),
            (G[67] = Z),
            (G[68] = ea?.spentUsd),
            (G[69] = R))
          : (R = G[69]),
        G[70] !== Y || G[71] !== Z || G[72] !== K || G[73] !== H
          ? ((W =
              Y && Z
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsxs)("button", {
                        type: "button",
                        "data-testid": "callout-coin-card-view-transactions",
                        "aria-expanded": K,
                        onClick: (e) => {
                          (e.stopPropagation(), V($));
                        },
                        className:
                          "mt-2 inline-flex w-full items-center justify-center gap-1 rounded-lg border border-border-tertiary bg-bg-tertiary px-3 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-border-tertiary hover:bg-bg-quaternary",
                        children: [
                          H("web.callouts.view_transactions"),
                          (0, t.jsx)(l.vY, {
                            "aria-hidden": !0,
                            className: (0, j.c)(
                              "size-4 shrink-0 text-text-tertiary transition-transform",
                              K && "rotate-180",
                            ),
                          }),
                        ],
                      }),
                      K
                        ? (0, t.jsx)(h.j, {
                            coin: Y,
                            authorAddress: Z,
                            className: "mt-2",
                          })
                        : null,
                    ],
                  })
                : null),
            (G[70] = Y),
            (G[71] = Z),
            (G[72] = K),
            (G[73] = H),
            (G[74] = W))
          : (W = G[74]),
        G[75] !== P || G[76] !== O || G[77] !== R || G[78] !== W
          ? ((z = (0, t.jsxs)("div", { className: P, children: [O, R, W] })),
            (G[75] = P),
            (G[76] = O),
            (G[77] = R),
            (G[78] = W),
            (G[79] = z))
          : (z = G[79]),
        z
      );
    },
  ]);
};
