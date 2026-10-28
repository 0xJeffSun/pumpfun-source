// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(12692);
  var n = e.i(398902),
    a = e.i(367036),
    i = e.i(228935);
  let o = () => {
    let e,
      n = (0, r.c)(1);
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className:
              "inline-block size-3.5 animate-spin rounded-full border-2 border-text-tertiary border-t-transparent",
          })),
          (n[0] = e))
        : (e = n[0]),
      e
    );
  };
  e.s([
    "f",
    0,
    function (e) {
      let l,
        u,
        s,
        c,
        d,
        f,
        m,
        p,
        h,
        b,
        v,
        g = (0, r.c)(47),
        { controller: y } = e,
        { t: x } = (0, n.f)(),
        {
          feeMintSymbol: w,
          setFeeMintSymbol: S,
          quote: N,
          isQuoting: P,
          quoteError: M,
        } = y;
      if (g[0] !== w || g[1] !== P || g[2] !== N || g[3] !== S || g[4] !== x) {
        var j, A;
        let e,
          r,
          n,
          p,
          h,
          b,
          v = (0, a.y)(w),
          y = null != N && N.feeMint === v.mintAddress;
        ((d =
          "rounded-[14px] border border-border-secondary bg-bg-tertiary px-4 py-3"),
          (f = "bounty-fee-quote-panel"),
          g[12] !== x
            ? ((e = x("web.bounties.fee_platform_fee")),
              (g[12] = x),
              (g[13] = e))
            : (e = g[13]),
          g[14] !== e
            ? ((r = (0, t.jsx)("p", {
                className: "text-sm font-semibold text-white",
                children: e,
              })),
              (g[14] = e),
              (g[15] = r))
            : (r = g[15]),
          g[16] !== x
            ? ((n = x("web.bounties.fee_currency")), (g[16] = x), (g[17] = n))
            : (n = g[17]),
          g[18] !== w || g[19] !== S
            ? ((p = a.m.map((e) => {
                let r = e.symbol === w;
                return (0, t.jsx)(
                  "button",
                  {
                    type: "button",
                    role: "radio",
                    "aria-checked": r,
                    onClick: () => S(e.symbol),
                    className: `rounded-full px-3 py-1 text-xs font-medium transition-colors ${r ? "bg-bg-quaternary text-white" : "text-text-secondary hover:text-white"}`,
                    children: e.label,
                  },
                  e.symbol,
                );
              })),
              (g[18] = w),
              (g[19] = S),
              (g[20] = p))
            : (p = g[20]),
          g[21] !== n || g[22] !== p
            ? ((h = (0, t.jsx)("div", {
                className:
                  "flex items-center gap-1 rounded-full bg-bg-quaternary p-1",
                role: "radiogroup",
                "aria-label": n,
                children: p,
              })),
              (g[21] = n),
              (g[22] = p),
              (g[23] = h))
            : (h = g[23]),
          g[24] !== h || g[25] !== r
            ? ((m = (0, t.jsxs)("div", {
                className: "flex items-center justify-between gap-3",
                children: [r, h],
              })),
              (g[24] = h),
              (g[25] = r),
              (g[26] = m))
            : (m = g[26]),
          (s = "mt-2 flex items-center justify-between text-sm"),
          g[27] !== x
            ? ((b = x("web.bounties.fee_charged_separately")),
              (g[27] = x),
              (g[28] = b))
            : (b = g[28]),
          g[29] !== b
            ? ((c = (0, t.jsx)("span", {
                className: "text-text-secondary",
                children: b,
              })),
              (g[29] = b),
              (g[30] = c))
            : (c = g[30]),
          (l = "font-medium text-white"),
          (u =
            P || !y
              ? (0, t.jsx)(o, {})
              : (0, t.jsxs)(t.Fragment, {
                  children: [
                    ((j = N.feeAmountAtomic),
                    (A = v.decimals),
                    (0, i.f)(BigInt(j), A).toLocaleString(void 0, {
                      maximumFractionDigits: Math.min(A, 6),
                    })),
                    " ",
                    v.label,
                    (0, t.jsxs)("span", {
                      className: "ml-1 text-text-tertiary",
                      children: ["(", (N.feeBps / 100).toFixed(2), "%)"],
                    }),
                  ],
                })),
          (g[0] = w),
          (g[1] = P),
          (g[2] = N),
          (g[3] = S),
          (g[4] = x),
          (g[5] = l),
          (g[6] = u),
          (g[7] = s),
          (g[8] = c),
          (g[9] = d),
          (g[10] = f),
          (g[11] = m));
      } else
        ((l = g[5]),
          (u = g[6]),
          (s = g[7]),
          (c = g[8]),
          (d = g[9]),
          (f = g[10]),
          (m = g[11]));
      return (
        g[31] !== l || g[32] !== u
          ? ((p = (0, t.jsx)("span", { className: l, children: u })),
            (g[31] = l),
            (g[32] = u),
            (g[33] = p))
          : (p = g[33]),
        g[34] !== s || g[35] !== c || g[36] !== p
          ? ((h = (0, t.jsxs)("div", { className: s, children: [c, p] })),
            (g[34] = s),
            (g[35] = c),
            (g[36] = p),
            (g[37] = h))
          : (h = g[37]),
        g[38] !== M || g[39] !== x
          ? ((b = M
              ? (0, t.jsx)("p", {
                  className: "mt-2 text-xs leading-5 text-[#FCA5A5]",
                  children: x("web.bounties.fee_quote_error"),
                })
              : (0, t.jsx)("p", {
                  className: "mt-2 text-xs leading-5 text-text-tertiary",
                  children: x("web.bounties.fee_pump_no_fee"),
                })),
            (g[38] = M),
            (g[39] = x),
            (g[40] = b))
          : (b = g[40]),
        g[41] !== b || g[42] !== d || g[43] !== f || g[44] !== m || g[45] !== h
          ? ((v = (0, t.jsxs)("div", {
              className: d,
              "data-testid": f,
              children: [m, h, b],
            })),
            (g[41] = b),
            (g[42] = d),
            (g[43] = f),
            (g[44] = m),
            (g[45] = h),
            (g[46] = v))
          : (v = g[46]),
        v
      );
    },
  ]);
};
