// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["j", () => C, "W", () => k]);
  var t = e.i(732486),
    l = e.i(445242),
    n = e.i(745018),
    i = e.i(439587),
    a = e.i(426091),
    r = e.i(938277),
    s = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    d = e.i(385438),
    u = e.i(745674),
    c = e.i(529841),
    m = e.i(606178),
    f = e.i(131611),
    p = e.i(425890),
    h = e.i(32312),
    g = e.i(541710),
    x = e.i(646908),
    b = e.i(662093),
    y = e.i(605587),
    w = e.i(84674),
    v = e.i(90832);
  let _ =
      "grid grid-cols-[minmax(0,1fr)_4.25rem_4.25rem_1.25rem] @[21rem]:grid-cols-[minmax(0,1fr)_4.5rem_4.25rem_4.25rem_1.25rem] items-center gap-x-2",
    I = "hidden @[21rem]:block",
    N = "col-span-full grid grid-cols-subgrid items-center",
    j = `h-8 ${u.W} text-[13px] last:border-b-0`;
  function k(e) {
    let n,
      r,
      d,
      u,
      c = (0, l.c)(14),
      { checked: m, onChange: f, className: p, dense: h } = e,
      { t: g } = (0, o.f)(),
      x = (0, s.useId)(),
      b =
        void 0 !== h && h
          ? "text-[11px] leading-4 text-text-quaternary"
          : "py-1 text-xs text-text-tertiary";
    return (
      c[0] !== p || c[1] !== b
        ? ((n = (0, a.c)(
            "relative z-[2] flex shrink-0 cursor-pointer items-center gap-1.5",
            b,
            p,
          )),
          (c[0] = p),
          (c[1] = b),
          (c[2] = n))
        : (n = c[2]),
      c[3] !== g
        ? ((r = g("web.callouts.include_transfers")), (c[3] = g), (c[4] = r))
        : (r = c[4]),
      c[5] !== m || c[6] !== f || c[7] !== x
        ? ((d = (0, t.jsx)(i.Z, {
            id: x,
            isChecked: m,
            onCheckedChange: f,
            isDisabled: !1,
            size: 18,
          })),
          (c[5] = m),
          (c[6] = f),
          (c[7] = x),
          (c[8] = d))
        : (d = c[8]),
      c[9] !== n || c[10] !== r || c[11] !== d || c[12] !== x
        ? ((u = (0, t.jsxs)("label", {
            onClick: M,
            className: n,
            htmlFor: x,
            children: [r, d],
          })),
          (c[9] = n),
          (c[10] = r),
          (c[11] = d),
          (c[12] = x),
          (c[13] = u))
        : (u = c[13]),
      u
    );
  }
  function M(e) {
    return e.stopPropagation();
  }
  function C(e) {
    let i,
      u,
      M,
      C,
      S,
      P,
      A,
      F,
      T,
      z,
      W,
      D,
      E,
      B,
      L,
      O,
      H,
      $,
      R = (0, l.c)(90),
      {
        coin: V,
        authorAddress: q,
        bordered: K,
        dense: Q,
        hostInset: G,
        className: J,
      } = e,
      X = void 0 !== K && K,
      Y = void 0 !== Q && Q,
      { t: Z } = (0, o.f)(),
      ee = (0, p.f)(),
      et = Y && !X ? G : void 0,
      el = (0, a.c)(
        X && (ee ? d.U : d.O),
        Y && !X && "border-y border-border-secondary",
        et && (0, a.c)(m.z[et], "w-auto"),
        J,
      ),
      en = et ? m.U[et] : void 0,
      ei = X ? d.C : (en ?? ""),
      ea = (0, y.N)({ mint: V.mint, chainId: V.chain_id });
    R[0] !== V
      ? ((i = (0, x.e)(V) || null != (0, g.T)(V.chain_id)),
        (R[0] = V),
        (R[1] = i))
      : (i = R[1]);
    let er = i,
      [es, eo] = (0, s.useState)(!1),
      ed = void 0 !== e.includeTransfers,
      eu = e.includeTransfers ?? es,
      ec = e.onIncludeTransfersChange ?? eo;
    R[2] !== q || R[3] !== V || R[4] !== eu
      ? ((u = { coin: V, authorAddress: q, includeTransfers: eu }),
        (R[2] = q),
        (R[3] = V),
        (R[4] = eu),
        (R[5] = u))
      : (u = R[5]);
    let {
        trades: em,
        isLoading: ef,
        isError: ep,
        hasNextPage: eh,
        isFetchingNextPage: eg,
        fetchNextPage: ex,
      } = (0, f.Q)(u),
      eb = (0, b.b)(V),
      ey = ea || er ? String(V.chain_id) : null;
    R[6] !== Y || R[7] !== eu || R[8] !== ed || R[9] !== er || R[10] !== ec
      ? ((M =
          ed || er
            ? null
            : (0, t.jsx)(k, {
                checked: eu,
                onChange: ec,
                dense: Y,
                className: Y ? void 0 : "self-end",
              })),
        (R[6] = Y),
        (R[7] = eu),
        (R[8] = ed),
        (R[9] = er),
        (R[10] = ec),
        (R[11] = M))
      : (M = R[11]);
    let ew = M;
    if (ef || !q) {
      let e,
        l,
        n = (0, a.c)("flex flex-col", !Y && "gap-2 py-2", el);
      return (
        R[12] !== Y
          ? ((e = Array.from({ length: Y ? 6 : 8 })), (R[12] = Y), (R[13] = e))
          : (e = R[13]),
        R[14] !== Y || R[15] !== ei || R[16] !== e
          ? ((l = e.map((e, l) =>
              Y
                ? (0, t.jsxs)(
                    "div",
                    {
                      className: (0, a.c)(
                        "flex items-center justify-between",
                        j,
                        ei,
                      ),
                      children: [
                        (0, t.jsx)("div", {
                          className:
                            "h-3.5 w-20 animate-pulse rounded bg-bg-tertiary",
                        }),
                        (0, t.jsx)("div", {
                          className:
                            "h-3.5 w-36 animate-pulse rounded bg-bg-tertiary",
                        }),
                      ],
                    },
                    l,
                  )
                : (0, t.jsx)(
                    "div",
                    {
                      className:
                        "h-9 w-full animate-pulse rounded-lg bg-bg-tertiary",
                    },
                    l,
                  ),
            )),
            (R[14] = Y),
            (R[15] = ei),
            (R[16] = e),
            (R[17] = l))
          : (l = R[17]),
        (0, t.jsx)("div", {
          "aria-hidden": !0,
          "data-testid": "callout-trades-skeleton",
          className: n,
          children: l,
        })
      );
    }
    if (ep) {
      let e,
        l = (0, a.c)(
          "py-4 text-text-tertiary",
          Y ? "text-[12px]" : "text-sm",
          el,
          en,
        );
      return (
        R[18] !== Z
          ? ((e = Z("web.callouts.trades_error")), (R[18] = Z), (R[19] = e))
          : (e = R[19]),
        (0, t.jsx)("p", { className: l, children: e })
      );
    }
    if (0 === em.length) {
      let e,
        l,
        n,
        i,
        r = (0, a.c)("flex w-full flex-col gap-1 py-2", el, en);
      R[20] !== Y || R[21] !== ew
        ? ((e =
            Y && ew
              ? (0, t.jsx)("div", {
                  className: "flex h-7 items-center justify-end",
                  children: ew,
                })
              : ew),
          (R[20] = Y),
          (R[21] = ew),
          (R[22] = e))
        : (e = R[22]);
      let s = Y ? "text-[12px]" : "text-sm";
      return (
        R[23] !== s
          ? ((l = (0, a.c)("py-2 text-text-tertiary", s)),
            (R[23] = s),
            (R[24] = l))
          : (l = R[24]),
        R[25] !== Z
          ? ((n = Z("web.callouts.trades_empty")), (R[25] = Z), (R[26] = n))
          : (n = R[26]),
        R[27] !== l || R[28] !== n
          ? ((i = (0, t.jsx)("p", { className: l, children: n })),
            (R[27] = l),
            (R[28] = n),
            (R[29] = i))
          : (i = R[29]),
        (0, t.jsxs)("div", { className: r, children: [e, i] })
      );
    }
    let ev = Y ? "text-right" : void 0,
      e_ = Y
        ? "text-right font-medium tabular-nums text-text-primary"
        : "text-sm tabular-nums text-text-secondary";
    (R[30] !== Z
      ? ((C = Z("web.callouts.trade_column")), (R[30] = Z), (R[31] = C))
      : (C = R[31]),
      R[32] !== C
        ? ((S = (0, t.jsx)("span", { children: C })), (R[32] = C), (R[33] = S))
        : (S = R[33]),
      R[34] !== ev
        ? ((P = (0, a.c)(I, ev)), (R[34] = ev), (R[35] = P))
        : (P = R[35]),
      R[36] !== Z
        ? ((A = Z("trade.order_details.amount")), (R[36] = Z), (R[37] = A))
        : (A = R[37]),
      R[38] !== P || R[39] !== A
        ? ((F = (0, t.jsx)("span", { className: P, children: A })),
          (R[38] = P),
          (R[39] = A),
          (R[40] = F))
        : (F = R[40]),
      R[41] !== Z
        ? ((T = Z("profile.narrative.positions_sort.position_size")),
          (R[41] = Z),
          (R[42] = T))
        : (T = R[42]),
      R[43] !== ev || R[44] !== T
        ? ((z = (0, t.jsx)("span", { className: ev, children: T })),
          (R[43] = ev),
          (R[44] = T),
          (R[45] = z))
        : (z = R[45]),
      R[46] !== Z
        ? ((W = Z("common.market_cap_short")), (R[46] = Z), (R[47] = W))
        : (W = R[47]),
      R[48] !== ev || R[49] !== W
        ? ((D = (0, t.jsx)("span", { className: ev, children: W })),
          (R[48] = ev),
          (R[49] = W),
          (R[50] = D))
        : (D = R[50]),
      R[51] !== z || R[52] !== D || R[53] !== S || R[54] !== F
        ? ((E = (0, t.jsxs)(t.Fragment, { children: [S, F, z, D] })),
          (R[51] = z),
          (R[52] = D),
          (R[53] = S),
          (R[54] = F),
          (R[55] = E))
        : (E = R[55]));
    let eI = E;
    R[56] !== Z
      ? ((B = Z("web.callouts.author_trades_a11y")), (R[56] = Z), (R[57] = B))
      : (B = R[57]);
    let eN = B;
    if (
      R[58] !== Y ||
      R[59] !== eb ||
      R[60] !== ey ||
      R[61] !== e_ ||
      R[62] !== ei ||
      R[63] !== Z ||
      R[64] !== em
    ) {
      let e;
      (R[66] !== Y ||
      R[67] !== eb ||
      R[68] !== ey ||
      R[69] !== e_ ||
      R[70] !== ei ||
      R[71] !== Z
        ? ((e = (e) => {
            let l = "transfer" === e.kind,
              i = Number.parseFloat(e.priceUsd ?? ""),
              s = Number.isFinite(i) && i > 0 ? i * eb : null,
              o = Number.parseFloat(e.amountUsd ?? ""),
              d = () => {
                window.open(
                  (0, w.X)(e.tx, ey),
                  "_blank",
                  "noopener,noreferrer",
                );
              },
              u = l
                ? "buy" === e.type
                  ? Z("common.receive")
                  : Z("common.send")
                : "buy" === e.type
                  ? Z("web.callouts.trade_buy")
                  : Z("web.callouts.trade_sell");
            return (0, t.jsxs)(
              "li",
              {
                "data-testid": "callout-trades-row",
                ...(e.tx
                  ? {
                      role: "button",
                      tabIndex: 0,
                      "aria-label": Z("web.callouts.view_tx_a11y"),
                      onClick: d,
                      onKeyDown: (e) => {
                        ("Enter" !== e.key && " " !== e.key) ||
                          (e.target === e.currentTarget &&
                            (e.preventDefault(), d()));
                      },
                    }
                  : {}),
                className: (0, a.c)(
                  Y
                    ? (0, a.c)(N, j)
                    : (0, a.c)(
                        _,
                        "border-b border-border-secondary py-2 last:border-b-0",
                      ),
                  ei,
                  "transition-colors",
                  e.tx && "cursor-pointer hover:bg-bg-tertiary",
                ),
                children: [
                  Y
                    ? (0, t.jsxs)("span", {
                        className:
                          "flex min-w-0 items-baseline gap-1 whitespace-nowrap",
                        children: [
                          (0, t.jsx)("span", {
                            className: (0, a.c)(
                              "font-medium",
                              "buy" === e.type ? "text-gain" : "text-loss",
                            ),
                            children: u,
                          }),
                          (0, t.jsx)("span", {
                            "aria-hidden": !0,
                            className: "text-[11px] text-text-quaternary",
                            children: "·",
                          }),
                          (0, t.jsx)(c.f, {
                            timestamp: e.timestamp,
                            className:
                              "truncate text-[11px] text-text-quaternary",
                          }),
                        ],
                      })
                    : (0, t.jsxs)("span", {
                        className: "flex min-w-0 flex-col",
                        children: [
                          (0, t.jsx)("span", {
                            className: (0, a.c)(
                              "text-sm font-semibold",
                              "buy" === e.type
                                ? "text-positive"
                                : "text-negative",
                            ),
                            children: u,
                          }),
                          (0, t.jsx)(c.f, {
                            timestamp: e.timestamp,
                            className: "truncate text-xs text-text-tertiary",
                          }),
                        ],
                      }),
                  (0, t.jsx)("span", {
                    className: (0, a.c)(I, e_),
                    children: (0, h.b)(e.baseAmount),
                  }),
                  (0, t.jsx)("span", {
                    className: e_,
                    children: Number.isFinite(o) ? (0, v.v)(o) : "—",
                  }),
                  (0, t.jsx)("span", {
                    className: e_,
                    children: null != s ? `$${(0, r.M)(s)}` : "—",
                  }),
                  e.tx
                    ? (0, t.jsx)("a", {
                        href: (0, w.X)(e.tx, ey),
                        target: "_blank",
                        rel: "noreferrer",
                        "aria-label": Z("web.callouts.view_tx_a11y"),
                        onClick: U,
                        className: (0, a.c)(
                          "flex justify-end transition-colors hover:text-text-primary",
                          Y ? "text-text-quaternary" : "text-text-tertiary",
                        ),
                        children: (0, t.jsx)(n.x8, { className: "size-3.5" }),
                      })
                    : (0, t.jsx)("span", { "aria-hidden": !0 }),
                ],
              },
              `${e.tx}:${e.kind ?? "trade"}`,
            );
          }),
          (R[66] = Y),
          (R[67] = eb),
          (R[68] = ey),
          (R[69] = e_),
          (R[70] = ei),
          (R[71] = Z),
          (R[72] = e))
        : (e = R[72]),
        (L = em.map(e)),
        (R[58] = Y),
        (R[59] = eb),
        (R[60] = ey),
        (R[61] = e_),
        (R[62] = ei),
        (R[63] = Z),
        (R[64] = em),
        (R[65] = L));
    } else L = R[65];
    let ej = L,
      ek = (0, a.c)("@container flex w-full flex-col", el);
    return (
      R[73] !== Y ||
      R[74] !== eI ||
      R[75] !== ei ||
      R[76] !== ej ||
      R[77] !== eN ||
      R[78] !== ew
        ? ((O = Y
            ? (0, t.jsxs)("div", {
                className:
                  "grid grid-cols-[minmax(0,1fr)_4.25rem_4.25rem_minmax(1.5rem,auto)] gap-x-2 @[21rem]:grid-cols-[minmax(0,1fr)_4.5rem_4.25rem_4.25rem_minmax(1.5rem,auto)]",
                children: [
                  (0, t.jsxs)("div", {
                    className: (0, a.c)(
                      N,
                      "auto-rows-[1.75rem] border-b border-border-secondary text-[11px] font-normal leading-4 text-text-quaternary",
                      ei,
                    ),
                    children: [
                      eI,
                      ew
                        ? (0, t.jsx)("div", {
                            className:
                              "order-first col-span-full flex justify-end @[32rem]:order-none @[32rem]:col-span-1",
                            children: ew,
                          })
                        : (0, t.jsx)("span", { "aria-hidden": !0 }),
                    ],
                  }),
                  (0, t.jsx)("ul", {
                    "aria-label": eN,
                    className: "contents",
                    children: ej,
                  }),
                ],
              })
            : (0, t.jsxs)(t.Fragment, {
                children: [
                  ew,
                  (0, t.jsxs)("div", {
                    className: (0, a.c)(
                      _,
                      ei,
                      "border-b border-border-secondary pb-2 text-xs font-medium text-text-tertiary",
                    ),
                    children: [eI, (0, t.jsx)("span", { "aria-hidden": !0 })],
                  }),
                  (0, t.jsx)("ul", {
                    "aria-label": eN,
                    className: "flex w-full flex-col",
                    children: ej,
                  }),
                ],
              })),
          (R[73] = Y),
          (R[74] = eI),
          (R[75] = ei),
          (R[76] = ej),
          (R[77] = eN),
          (R[78] = ew),
          (R[79] = O))
        : (O = R[79]),
      R[80] !== Y || R[81] !== ex || R[82] !== eh || R[83] !== eg || R[84] !== Z
        ? ((H = eh
            ? (0, t.jsx)("button", {
                type: "button",
                onClick: ex,
                disabled: eg,
                "aria-busy": eg,
                className: (0, a.c)(
                  "inline-flex w-full items-center justify-center transition-colors disabled:cursor-default disabled:opacity-60",
                  Y
                    ? "h-8 border-t border-border-tertiary text-[12px] font-medium text-text-tertiary hover:bg-bg-tertiary hover:text-text-primary"
                    : "mt-2 rounded-lg border border-border-tertiary bg-bg-tertiary px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-bg-quaternary hover:text-text-primary",
                ),
                children: eg ? Z("common.loading") : Z("common.show_more"),
              })
            : null),
          (R[80] = Y),
          (R[81] = ex),
          (R[82] = eh),
          (R[83] = eg),
          (R[84] = Z),
          (R[85] = H))
        : (H = R[85]),
      R[86] !== ek || R[87] !== O || R[88] !== H
        ? (($ = (0, t.jsxs)("div", { className: ek, children: [O, H] })),
          (R[86] = ek),
          (R[87] = O),
          (R[88] = H),
          (R[89] = $))
        : ($ = R[89]),
      $
    );
  }
  function U(e) {
    return e.stopPropagation();
  }
};
