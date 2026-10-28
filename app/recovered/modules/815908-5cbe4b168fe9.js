// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018),
    l = e.i(352386);
  e.i(12692);
  var i = e.i(398902);
  e.i(84455);
  var a = e.i(392968),
    s = e.i(540805),
    o = e.i(51206),
    u = e.i(776438),
    d = e.i(908163);
  e.i(267146);
  var c = e.i(890088),
    m = e.i(592209),
    f = e.i(338319),
    p = e.i(90832);
  let h = (0, o.x)({
      density: "terminal",
      size: 28,
      variant: "ghost",
      className: "p-0",
    }),
    b = {
      end: {
        root: "flex flex-col items-end gap-1 text-right text-[11px] leading-4",
        toggle: "flex flex-col items-end text-right",
        figures: "flex flex-col items-end gap-0.5 text-[12px] leading-4",
        figureLine: "flex flex-nowrap items-baseline justify-end gap-1",
        basis: "flex flex-col items-end text-text-quaternary",
        basisLine: "flex flex-nowrap items-baseline justify-end gap-x-1",
      },
      start: {
        root: "flex flex-col items-start gap-1 text-left text-[11px] leading-4",
        toggle: "flex flex-col items-start text-left",
        figures: "flex flex-col items-start gap-0.5 text-[12px] leading-4",
        figureLine: "flex flex-nowrap items-baseline justify-start gap-1",
        basis: "flex flex-col items-start text-text-quaternary",
        basisLine: "flex flex-nowrap items-baseline justify-start gap-x-1",
      },
    };
  function g(e) {
    return !e;
  }
  function x(e) {
    return !e;
  }
  function y(e) {
    return "supply-share" === e ? "position-pnl-card-supply-share" : void 0;
  }
  let v = 2 * Math.PI * 6;
  function w(e) {
    let n,
      a,
      s,
      o,
      u,
      d,
      c,
      m,
      f = (0, r.c)(15),
      { intervalMs: p, onRefresh: h } = e,
      { t: b } = (0, i.f)(),
      g = (0, l.useRef)(null),
      x = (0, l.useRef)(0);
    (f[0] !== p
      ? ((n = () => {
          x.current = Date.now();
          let e = 0,
            t = () => {
              let r = (Date.now() - x.current) % p;
              (g.current?.setAttribute(
                "stroke-dashoffset",
                String((r / p) * v),
              ),
                (e = requestAnimationFrame(t)));
            };
          return (
            (e = requestAnimationFrame(t)),
            () => cancelAnimationFrame(e)
          );
        }),
        (a = [p]),
        (f[0] = p),
        (f[1] = n),
        (f[2] = a))
      : ((n = f[1]), (a = f[2])),
      (0, l.useEffect)(n, a),
      f[3] !== h
        ? ((s = () => {
            ((x.current = Date.now()),
              g.current?.setAttribute("stroke-dashoffset", "0"),
              h());
          }),
          (f[3] = h),
          (f[4] = s))
        : (s = f[4]));
    let y = s;
    return (
      f[5] !== b
        ? ((o = b("web.coin.refresh_pnl")), (f[5] = b), (f[6] = o))
        : (o = f[6]),
      f[7] !== y
        ? ((u = (e) => {
            (e.stopPropagation(), y());
          }),
          (d = (e) => {
            ("Enter" === e.key || " " === e.key) &&
              (e.preventDefault(), e.stopPropagation(), y());
          }),
          (f[7] = y),
          (f[8] = u),
          (f[9] = d))
        : ((u = f[8]), (d = f[9])),
      f[10] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = (0, t.jsxs)("svg", {
            viewBox: "0 0 16 16",
            "aria-hidden": !0,
            className: "size-3.5 -rotate-90",
            children: [
              (0, t.jsx)("circle", {
                cx: "8",
                cy: "8",
                r: 6,
                fill: "none",
                stroke: "currentColor",
                strokeOpacity: "0.25",
                strokeWidth: "2",
              }),
              (0, t.jsx)("circle", {
                ref: g,
                cx: "8",
                cy: "8",
                r: 6,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeDasharray: v,
                strokeDashoffset: 0,
              }),
            ],
          })),
          (f[10] = c))
        : (c = f[10]),
      f[11] !== o || f[12] !== u || f[13] !== d
        ? ((m = (0, t.jsx)("span", {
            role: "button",
            tabIndex: 0,
            "aria-label": o,
            "data-testid": "pnl-refresh-countdown",
            onClick: u,
            onKeyDown: d,
            className:
              "inline-flex cursor-pointer text-text-quaternary transition-colors hover:text-text-primary",
            children: c,
          })),
          (f[11] = o),
          (f[12] = u),
          (f[13] = d),
          (f[14] = m))
        : (m = f[14]),
      m
    );
  }
  e.s([
    "a",
    0,
    h,
    "O",
    0,
    function (e) {
      var o, h;
      let v,
        _,
        S,
        k,
        j,
        N,
        C,
        F,
        I,
        T,
        A,
        K,
        E,
        M = (0, r.c)(64),
        { t: q, i18n: D } = (0, i.f)(),
        B = (0, m.v)(D.language) ?? m.T,
        {
          embeddedFooter: O,
          positionUsd: U,
          positionTokenAmount: P,
          netPnlUsd: R,
          displayPct: L,
          spentUsd: z,
          avgEntryMcapUsd: V,
          isClosed: W,
          soldFraction: $,
          supplyShare: H,
          refresh: Z,
          headerAction: J,
          className: Q,
          flat: G,
          layout: Y,
          align: X,
        } = e,
        ee = void 0 !== W && W,
        et = void 0 !== G && G,
        er = void 0 === X ? "end" : X,
        en = "inline" === (void 0 === Y ? "card" : Y),
        [el, ei] = (0, l.useState)(!1),
        ea = !ee && null != U && null != P && P > 0,
        es = (0, s.k)(R),
        eo = null != z && z > 0 ? z : null,
        eu =
          ((o = void 0 === H ? null : H),
          ee || null == o || !Number.isFinite(o) ? null : o > 1e-4 ? o : null),
        ed = [
          ...(null != eo
            ? [
                {
                  key: "spent",
                  line: 0,
                  label: q("callouts.position_card.spent_label"),
                  value: (0, s.l)(eo),
                },
              ]
            : []),
          ...(null != V
            ? [
                {
                  key: "avg-entry",
                  line: 0,
                  label: q("callouts.position_card.avg_entry_label"),
                  value: q("web.coin.value_mc", { value: (0, s.l)(V) }),
                },
              ]
            : []),
          ...(null != eu
            ? [
                {
                  key: "supply-share",
                  line: 1,
                  label: q("web.coin.position_supply_held_label"),
                  value: (0, c.R)(B, {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(eu),
                },
              ]
            : []),
        ],
        ec = ed.length > 0,
        em = ((e) => {
          let t = new Map();
          for (let r of e) t.set(r.line, [...(t.get(r.line) ?? []), r]);
          return [...t.entries()].sort(([e], [t]) => e - t).map(([, e]) => e);
        })(ed),
        ef = en ? "text-[12px] leading-4" : "text-[13px]";
      M[0] !== ef
        ? ((v = (0, f.c)(
            "whitespace-nowrap font-medium tabular-nums text-text-primary",
            ef,
          )),
          (M[0] = ef),
          (M[1] = v))
        : (v = M[1]);
      let ep = v,
        eh = () =>
          ee
            ? (0, t.jsx)(d.E, {
                density: "terminal",
                "data-testid": "callout-position-closed-tag",
                className: en ? "bg-bg-quaternary" : void 0,
                children: q("common.closed"),
              })
            : ea && el
              ? (0, t.jsx)("p", {
                  className: ep,
                  children: q("web.coin.amount_tokens", {
                    amount:
                      P >= c.Z
                        ? (0, c.h)({ value: P, locale: B })
                        : (0, p.p)(P),
                  }),
                })
              : (0, t.jsx)("p", {
                  className: ep,
                  children: null != U ? (0, p.w)(U) : "—",
                }),
        eb =
          ee ||
          null == (h = void 0 === $ ? null : $) ||
          !Number.isFinite(h) ||
          h <= 0
            ? null
            : Math.min(0.99, Math.max(0.001, h)),
        eg = ee
          ? null
          : (0, t.jsx)(d.E, {
              density: "terminal",
              "data-testid": "position-pnl-card-status",
              "data-status": null != eb ? "sold" : "holding",
              className: en ? "bg-bg-quaternary" : void 0,
              children:
                null != eb
                  ? q("web.coin.position_status_sold_share", {
                      percent: (0, c.R)(B, {
                        style: "percent",
                        maximumFractionDigits: +(eb < 0.01),
                      }).format(eb),
                    })
                  : q("web.coin.position_status_holding"),
            });
      if (en) {
        let e,
          r,
          i,
          o,
          u,
          d,
          c,
          m,
          p,
          h,
          g = b[er],
          v = g.figures,
          _ = g.figureLine;
        (M[2] !== q
          ? ((e = q("coin_details.position")), (M[2] = q), (M[3] = e))
          : (e = M[3]),
          M[4] !== ea
            ? ((r = ea
                ? (0, t.jsx)(n.zm, { "aria-hidden": !0, className: "size-3" })
                : null),
              (M[4] = ea),
              (M[5] = r))
            : (r = M[5]),
          M[6] !== e || M[7] !== r
            ? ((i = (0, t.jsxs)("span", {
                className:
                  "flex items-center gap-1 text-[11px] text-text-quaternary",
                children: [e, r],
              })),
              (M[6] = e),
              (M[7] = r),
              (M[8] = i))
            : (i = M[8]));
        let S = g.figureLine;
        (M[9] !== q
          ? ((o = q("coin_details.profit")), (M[9] = q), (M[10] = o))
          : (o = M[10]),
          M[11] !== Z
            ? ((u = Z
                ? (0, t.jsx)(w, {
                    intervalMs: Z.intervalMs,
                    onRefresh: Z.onRefresh,
                  })
                : null),
              (M[11] = Z),
              (M[12] = u))
            : (u = M[12]),
          M[13] !== o || M[14] !== u
            ? ((d = (0, t.jsxs)("span", {
                className:
                  "flex items-center gap-1 text-[11px] text-text-quaternary",
                children: [o, u],
              })),
              (M[13] = o),
              (M[14] = u),
              (M[15] = d))
            : (d = M[15]),
          M[16] !== R
            ? ((c = null != R ? (0, s.u)(R) : "—"), (M[16] = R), (M[17] = c))
            : (c = M[17]),
          M[18] !== L || M[19] !== R
            ? ((m =
                null != R && null != L
                  ? (0, t.jsx)(a.f, {
                      changePercent: L,
                      isPnl: !0,
                      signed: !0,
                      className: "text-[11px] leading-4",
                    })
                  : null),
              (M[18] = L),
              (M[19] = R),
              (M[20] = m))
            : (m = M[20]));
        let k = (0, t.jsxs)("span", {
            "data-testid": "position-pnl-card-figures",
            className: v,
            children: [
              (0, t.jsxs)("span", { className: _, children: [i, eh(), eg] }),
              (0, t.jsxs)("span", {
                className: S,
                children: [
                  d,
                  (0, t.jsx)("span", {
                    className: (0, f.c)(
                      "whitespace-nowrap font-medium tabular-nums",
                      es,
                    ),
                    children: c,
                  }),
                  m,
                ],
              }),
            ],
          }),
          j = ea ? void 0 : "position-pnl-card";
        M[21] !== Q || M[22] !== g.root
          ? ((p = (0, f.c)(g.root, Q)),
            (M[21] = Q),
            (M[22] = g.root),
            (M[23] = p))
          : (p = M[23]);
        let N = ea
            ? (0, t.jsx)("button", {
                type: "button",
                "data-testid": "position-pnl-card",
                "aria-label": q("web.coin.toggle_position_denomination"),
                onClick: () => ei(x),
                className: g.toggle,
                children: k,
              })
            : k,
          C = ec
            ? (0, t.jsx)("p", {
                "data-testid": "position-pnl-card-basis",
                className: g.basis,
                children: em.map((e) =>
                  (0, t.jsx)(
                    "span",
                    {
                      "data-testid": "position-pnl-card-basis-line",
                      className: g.basisLine,
                      children: e.map((e, r) =>
                        (0, t.jsxs)(
                          l.Fragment,
                          {
                            children: [
                              r > 0
                                ? (0, t.jsx)("span", {
                                    "aria-hidden": !0,
                                    children: "·",
                                  })
                                : null,
                              (0, t.jsxs)("span", {
                                className: "whitespace-nowrap",
                                "data-testid": y(e.key),
                                children: [
                                  e.label,
                                  " ",
                                  (0, t.jsx)("span", {
                                    className: "tabular-nums",
                                    children: e.value,
                                  }),
                                ],
                              }),
                            ],
                          },
                          e.key,
                        ),
                      ),
                    },
                    e[0].key,
                  ),
                ),
              })
            : null;
        return (
          M[24] !== er ||
          M[25] !== O ||
          M[26] !== J ||
          M[27] !== j ||
          M[28] !== p ||
          M[29] !== N ||
          M[30] !== C
            ? ((h = (0, t.jsxs)("div", {
                "data-testid": j,
                "data-layout": "inline",
                "data-align": er,
                className: p,
                children: [N, C, O, J],
              })),
              (M[24] = er),
              (M[25] = O),
              (M[26] = J),
              (M[27] = j),
              (M[28] = p),
              (M[29] = N),
              (M[30] = C),
              (M[31] = h))
            : (h = M[31]),
          h
        );
      }
      (M[32] !== q
        ? ((_ = q("coin_details.position")), (M[32] = q), (M[33] = _))
        : (_ = M[33]),
        M[34] !== ea
          ? ((S = ea
              ? (0, t.jsx)(n.zm, { "aria-hidden": !0, className: "size-3" })
              : null),
            (M[34] = ea),
            (M[35] = S))
          : (S = M[35]),
        M[36] !== q
          ? ((k = q("coin_details.profit")), (M[36] = q), (M[37] = k))
          : (k = M[37]),
        M[38] !== Z
          ? ((j = Z
              ? (0, t.jsx)(w, {
                  intervalMs: Z.intervalMs,
                  onRefresh: Z.onRefresh,
                })
              : null),
            (M[38] = Z),
            (M[39] = j))
          : (j = M[39]));
      let ex = null != J ? "pr-8" : void 0,
        ey = (0, f.c)("whitespace-nowrap", es);
      (M[40] !== R
        ? ((N = null != R ? (0, s.u)(R) : "—"), (M[40] = R), (M[41] = N))
        : (N = M[41]),
        M[42] !== ey || M[43] !== N
          ? ((C = (0, t.jsx)("span", { className: ey, children: N })),
            (M[42] = ey),
            (M[43] = N),
            (M[44] = C))
          : (C = M[44]),
        M[45] !== L || M[46] !== R
          ? ((F =
              null != R && null != L
                ? (0, t.jsx)(a.f, { changePercent: L, isPnl: !0, signed: !0 })
                : null),
            (M[45] = L),
            (M[46] = R),
            (M[47] = F))
          : (F = M[47]),
        M[48] !== k || M[49] !== j || M[50] !== ex || M[51] !== C || M[52] !== F
          ? ((I = (0, t.jsxs)(u.D, {
              density: "terminal",
              align: "end",
              label: k,
              hint: j,
              labelClassName: ex,
              figureClassName: "flex items-end gap-1.5 overflow-visible",
              children: [C, F],
            })),
            (M[48] = k),
            (M[49] = j),
            (M[50] = ex),
            (M[51] = C),
            (M[52] = F),
            (M[53] = I))
          : (I = M[53]));
      let ev = (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsxs)("div", {
              className: "flex w-full items-start justify-between gap-6",
              children: [
                (0, t.jsxs)(u.D, {
                  density: "terminal",
                  label: _,
                  hint: S,
                  figureClassName: "flex items-center gap-1.5",
                  children: [eh(), eg],
                }),
                I,
              ],
            }),
            ec
              ? (0, t.jsxs)("div", {
                  className:
                    "flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs leading-4",
                  children: [
                    null == eo ? (0, t.jsx)("span", {}) : null,
                    ed.map((e) =>
                      (0, t.jsxs)(
                        "span",
                        {
                          className: "flex items-center gap-1",
                          "data-testid": y(e.key),
                          children: [
                            (0, t.jsx)("span", {
                              className: "text-[11px] text-text-quaternary",
                              children: e.label,
                            }),
                            (0, t.jsx)("span", {
                              className:
                                "text-[12px] font-medium tabular-nums text-text-primary",
                              children: e.value,
                            }),
                          ],
                        },
                        e.key,
                      ),
                    ),
                  ],
                })
              : null,
          ],
        }),
        ew =
          !et &&
          "rounded-xl border border-border-secondary bg-bg-secondary p-3";
      M[54] !== Q || M[55] !== ew
        ? ((T = (0, f.c)("relative flex flex-col gap-2", ew, Q)),
          (M[54] = Q),
          (M[55] = ew),
          (M[56] = T))
        : (T = M[56]);
      let e_ = T;
      M[57] !== et || M[58] !== J
        ? ((A =
            null != J
              ? (0, t.jsx)("div", {
                  "data-testid": "position-pnl-card-header-action",
                  className: (0, f.c)(
                    "absolute flex size-7 items-center justify-center",
                    et ? "-top-1.5 right-0" : "right-3 top-1.5",
                  ),
                  children: J,
                })
              : null),
          (M[57] = et),
          (M[58] = J),
          (M[59] = A))
        : (A = M[59]);
      let eS = A;
      return ea
        ? (M[60] !== q
            ? ((K = q("web.coin.toggle_position_denomination")),
              (M[60] = q),
              (M[61] = K))
            : (K = M[61]),
          M[62] !== ei
            ? ((E = () => ei(g)), (M[62] = ei), (M[63] = E))
            : (E = M[63]),
          (0, t.jsxs)("div", {
            className: e_,
            children: [
              (0, t.jsx)("button", {
                type: "button",
                "data-testid": "position-pnl-card",
                "aria-label": K,
                onClick: E,
                className: "flex w-full flex-col gap-2 text-left",
                children: ev,
              }),
              O,
              eS,
            ],
          }))
        : (0, t.jsxs)("div", {
            "data-testid": "position-pnl-card",
            className: e_,
            children: [ev, O, eS],
          });
    },
  ]);
};
