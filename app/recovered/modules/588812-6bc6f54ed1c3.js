// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(745018);
  e.i(12692);
  var i = e.i(398902);
  e.i(84455);
  var a = e.i(392968),
    s = e.i(540805),
    n = e.i(256272),
    o = e.i(529841),
    d = e.i(51206),
    c = e.i(776438),
    u = e.i(908163);
  e.i(267146);
  var m = e.i(592209),
    p = e.i(243719);
  function f(e) {
    let r,
      a,
      s,
      n = (0, l.c)(11),
      { side: o, leverage: d, isLive: c } = e,
      m = void 0 !== c && c,
      { t: p } = (0, i.f)(),
      f = "long" === o,
      x = f ? "gain" : "loss";
    return (
      n[0] !== f || n[1] !== d || n[2] !== p
        ? ((r = p("web.perps.market.position_badge", {
            leverage: d,
            side: p(
              f ? "web.perps.market.side_long" : "web.perps.market.side_short",
            ),
          })),
          (n[0] = f),
          (n[1] = d),
          (n[2] = p),
          (n[3] = r))
        : (r = n[3]),
      n[4] !== m
        ? ((a = m
            ? (0, t.jsx)("span", {
                "aria-hidden": !0,
                "data-testid": "perp-position-live-dot",
                className: "size-1.5 rounded-full bg-current",
              })
            : null),
          (n[4] = m),
          (n[5] = a))
        : (a = n[5]),
      n[6] !== o || n[7] !== x || n[8] !== r || n[9] !== a
        ? ((s = (0, t.jsxs)(u.E, {
            density: "terminal",
            tone: x,
            "data-testid": "perp-position-badge",
            "data-side": o,
            children: [r, a],
          })),
          (n[6] = o),
          (n[7] = x),
          (n[8] = r),
          (n[9] = a),
          (n[10] = s))
        : (s = n[10]),
      s
    );
  }
  e.s([
    "u",
    0,
    function (e) {
      let u,
        x,
        h,
        g,
        y,
        v,
        b,
        w,
        j,
        N,
        I,
        _,
        k,
        C = (0, l.c)(52),
        { position: S, onShare: P } = e,
        { t: U, i18n: A } = (0, i.f)();
      if (
        C[0] !== A.language ||
        C[1] !== P ||
        C[2] !== S.closedAt ||
        C[3] !== S.coin ||
        C[4] !== S.entryPx ||
        C[5] !== S.exitPx ||
        C[6] !== S.leverage ||
        C[7] !== S.side ||
        C[8] !== U
      ) {
        let e,
          l,
          i,
          a,
          s = (0, m.v)(A.language) ?? m.T;
        ((u = n.g),
          (x = "gap-3"),
          (h = "perp-closed-position-card"),
          (g = S.coin),
          C[15] !== S.leverage || C[16] !== S.side
            ? ((e = (0, t.jsx)(f, { side: S.side, leverage: S.leverage })),
              (C[15] = S.leverage),
              (C[16] = S.side),
              (C[17] = e))
            : (e = C[17]),
          C[18] !== S.closedAt
            ? ((l =
                null !== S.closedAt
                  ? (0, t.jsx)(o.f, {
                      timestamp: S.closedAt,
                      density: "terminal",
                      live: !1,
                      className: "text-[11px] leading-4 text-text-quaternary",
                    })
                  : null),
              (C[18] = S.closedAt),
              (C[19] = l))
            : (l = C[19]),
          C[20] !== e || C[21] !== l
            ? ((i = (0, t.jsxs)("div", {
                className: "flex min-w-0 items-center gap-2",
                children: [e, l],
              })),
              (C[20] = e),
              (C[21] = l),
              (C[22] = i))
            : (i = C[22]),
          C[23] !== P || C[24] !== U
            ? ((a = P
                ? (0, t.jsx)(d._, {
                    density: "terminal",
                    size: 24,
                    "aria-label": U("common.share"),
                    onClick: P,
                    "data-testid": "perp-closed-position-share",
                    children: (0, t.jsx)(r.ss, { "aria-hidden": !0 }),
                  })
                : null),
              (C[23] = P),
              (C[24] = U),
              (C[25] = a))
            : (a = C[25]),
          C[26] !== i || C[27] !== a
            ? ((y = (0, t.jsxs)("div", {
                className: "flex items-center justify-between gap-2",
                children: [i, a],
              })),
              (C[26] = i),
              (C[27] = a),
              (C[28] = y))
            : (y = C[28]),
          (v =
            null !== S.entryPx || null !== S.exitPx
              ? (0, t.jsxs)("div", {
                  className: "flex items-end gap-6",
                  "data-testid": "perp-closed-position-prices",
                  children: [
                    (0, t.jsx)(c.D, {
                      density: "terminal",
                      label: U("web.perps.close.details.entry_price"),
                      figureTestId: "perp-closed-position-entry",
                      children:
                        null === S.entryPx
                          ? "—"
                          : (0, p.Q)({ px: S.entryPx, locale: s }),
                    }),
                    (0, t.jsx)(c.D, {
                      density: "terminal",
                      label: U("web.perps.market.exit_price"),
                      figureTestId: "perp-closed-position-exit",
                      children:
                        null === S.exitPx
                          ? "—"
                          : (0, p.Q)({ px: S.exitPx, locale: s }),
                    }),
                  ],
                })
              : null),
          (C[0] = A.language),
          (C[1] = P),
          (C[2] = S.closedAt),
          (C[3] = S.coin),
          (C[4] = S.entryPx),
          (C[5] = S.exitPx),
          (C[6] = S.leverage),
          (C[7] = S.side),
          (C[8] = U),
          (C[9] = u),
          (C[10] = x),
          (C[11] = h),
          (C[12] = g),
          (C[13] = y),
          (C[14] = v));
      } else
        ((u = C[9]),
          (x = C[10]),
          (h = C[11]),
          (g = C[12]),
          (y = C[13]),
          (v = C[14]));
      return (
        C[29] !== U
          ? ((b = U("web.perps.market.realized_pnl")), (C[29] = U), (C[30] = b))
          : (b = C[30]),
        C[31] !== S.realizedPnlUsd
          ? ((w = (0, s.k)(S.realizedPnlUsd)),
            (C[31] = S.realizedPnlUsd),
            (C[32] = w))
          : (w = C[32]),
        C[33] !== S.realizedPnlUsd
          ? ((j = (0, s.u)(S.realizedPnlUsd)),
            (C[33] = S.realizedPnlUsd),
            (C[34] = j))
          : (j = C[34]),
        C[35] !== b || C[36] !== w || C[37] !== j
          ? ((N = (0, t.jsx)(c.D, {
              density: "terminal",
              label: b,
              figureClassName: w,
              figureTestId: "perp-closed-position-pnl",
              children: j,
            })),
            (C[35] = b),
            (C[36] = w),
            (C[37] = j),
            (C[38] = N))
          : (N = C[38]),
        C[39] !== S.realizedPnlPct
          ? ((I = (0, t.jsx)(a.f, {
              changePercent: S.realizedPnlPct,
              density: "terminal",
              signed: !0,
              isPnl: !0,
              "data-testid": "perp-closed-position-pnl-pct",
            })),
            (C[39] = S.realizedPnlPct),
            (C[40] = I))
          : (I = C[40]),
        C[41] !== I || C[42] !== N
          ? ((_ = (0, t.jsxs)("div", {
              className: "flex items-end justify-between gap-3",
              children: [N, I],
            })),
            (C[41] = I),
            (C[42] = N),
            (C[43] = _))
          : (_ = C[43]),
        C[44] !== u ||
        C[45] !== x ||
        C[46] !== _ ||
        C[47] !== h ||
        C[48] !== g ||
        C[49] !== y ||
        C[50] !== v
          ? ((k = (0, t.jsxs)(u, {
              className: x,
              "data-testid": h,
              "data-coin": g,
              children: [y, v, _],
            })),
            (C[44] = u),
            (C[45] = x),
            (C[46] = _),
            (C[47] = h),
            (C[48] = g),
            (C[49] = y),
            (C[50] = v),
            (C[51] = k))
          : (k = C[51]),
        k
      );
    },
    "A",
    0,
    f,
  ]);
};
