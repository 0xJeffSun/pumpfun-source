// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    i = e.i(745018);
  e.i(12692);
  var n = e.i(398902),
    s = e.i(505266);
  e.i(267146);
  var a = e.i(540805),
    r = e.i(662093);
  let o = (e) =>
    "number" == typeof e && Number.isFinite(e) && e > 0 ? e : null;
  function d(e) {
    let t,
      i,
      n,
      a,
      d,
      c,
      u,
      m = (0, l.c)(25),
      { mint: p, coin: f, positionSummary: h } = e;
    m[0] !== f || m[1] !== p
      ? ((t = f ? { ...f, mint: p } : null), (m[0] = f), (m[1] = p), (m[2] = t))
      : (t = m[2]);
    let x = t,
      v = f?.chain_id,
      b = f?.usd_market_cap;
    m[3] !== x || m[4] !== p || m[5] !== v || m[6] !== b
      ? ((i = { mint: p, chainId: v, fallbackMarketCap: b, coin: x }),
        (m[3] = x),
        (m[4] = p),
        (m[5] = v),
        (m[6] = b),
        (m[7] = i))
      : (i = m[7]);
    let g = (0, r.h)(i),
      w = f?.chain_id;
    m[8] !== x || m[9] !== p || m[10] !== w
      ? ((n = { mint: p, chainId: w, coin: x }),
        (m[8] = x),
        (m[9] = p),
        (m[10] = w),
        (m[11] = n))
      : (n = m[11]);
    let N = (0, r.O)(n),
      y = h?.spentUsd;
    return (
      m[12] !== y ? ((a = o(y)), (m[12] = y), (m[13] = a)) : (a = m[13]),
      m[14] !== f || m[15] !== p || m[16] !== h?.avgEntryPriceUsd || m[17] !== N
        ? ((d = N(
            (0, s.f)({
              avgEntryPriceUsd: h?.avgEntryPriceUsd,
              coin: f,
              mint: p,
            }),
          )),
          (m[14] = f),
          (m[15] = p),
          (m[16] = h?.avgEntryPriceUsd),
          (m[17] = N),
          (m[18] = d))
        : (d = m[18]),
      m[19] !== g ? ((c = o(g)), (m[19] = g), (m[20] = c)) : (c = m[20]),
      m[21] !== c || m[22] !== a || m[23] !== d
        ? ((u = { spentUsd: a, avgEntryMcapUsd: d, currentMcapUsd: c }),
          (m[21] = c),
          (m[22] = a),
          (m[23] = d),
          (m[24] = u))
        : (u = m[24]),
      u
    );
  }
  e.s([
    "n",
    0,
    function (e) {
      let s,
        r,
        o,
        c,
        u = (0, l.c)(16),
        { mint: m, coin: p, positionSummary: f, testId: h } = e,
        { t: x } = (0, n.f)();
      u[0] !== p || u[1] !== m || u[2] !== f
        ? ((s = { mint: m, coin: p, positionSummary: f }),
          (u[0] = p),
          (u[1] = m),
          (u[2] = f),
          (u[3] = s))
        : (s = u[3]);
      let { spentUsd: v, avgEntryMcapUsd: b, currentMcapUsd: g } = d(s);
      return null == v && null == b && null == g
        ? null
        : (u[4] !== v || u[5] !== x
            ? ((r =
                null != v
                  ? (0, t.jsxs)("span", {
                      className: "flex items-center gap-1",
                      children: [
                        (0, t.jsx)("span", {
                          className: "text-text-tertiary",
                          children: x("callouts.position_card.spent_label"),
                        }),
                        (0, t.jsx)("span", {
                          className: "font-medium text-text-secondary",
                          children: (0, a.l)(v),
                        }),
                      ],
                    })
                  : (0, t.jsx)("span", {})),
              (u[4] = v),
              (u[5] = x),
              (u[6] = r))
            : (r = u[6]),
          u[7] !== b || u[8] !== g || u[9] !== x || u[10] !== h
            ? ((o =
                null != b || null != g
                  ? (0, t.jsxs)("span", {
                      className: "flex items-center justify-end gap-1",
                      children: [
                        null != b
                          ? (0, t.jsxs)("span", {
                              className: "flex items-center gap-1",
                              children: [
                                (0, t.jsx)("span", {
                                  className: "text-text-tertiary",
                                  children: x(
                                    "callouts.position_card.avg_entry_label",
                                  ),
                                }),
                                (0, t.jsx)("span", {
                                  className: "font-medium text-text-secondary",
                                  children: x(
                                    "callouts.position_card.mcap_value",
                                    { market_cap: (0, a.l)(b) },
                                  ),
                                }),
                              ],
                            })
                          : null,
                        null != b && null != g
                          ? (0, t.jsx)(i.A3, {
                              "aria-hidden": !0,
                              className: "size-3 shrink-0 text-text-tertiary",
                            })
                          : null,
                        null != g
                          ? (0, t.jsx)("span", {
                              className: "font-medium text-text-secondary",
                              "data-testid": h ? `${h}-current-mc` : void 0,
                              children: x("callouts.position_card.mcap_value", {
                                market_cap: (0, a.l)(g),
                              }),
                            })
                          : null,
                      ],
                    })
                  : null),
              (u[7] = b),
              (u[8] = g),
              (u[9] = x),
              (u[10] = h),
              (u[11] = o))
            : (o = u[11]),
          u[12] !== r || u[13] !== o || u[14] !== h
            ? ((c = (0, t.jsxs)("div", {
                "data-testid": h,
                className:
                  "flex w-full items-center justify-between gap-x-3 whitespace-nowrap text-xs leading-4",
                children: [r, o],
              })),
              (u[12] = r),
              (u[13] = o),
              (u[14] = h),
              (u[15] = c))
            : (c = u[15]),
          c);
    },
    "r",
    0,
    d,
  ]);
};
