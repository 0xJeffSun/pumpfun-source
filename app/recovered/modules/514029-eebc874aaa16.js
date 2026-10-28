// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018),
    n = e.i(292686),
    s = e.i(322315),
    r = e.i(254010);
  e.i(12692);
  var l = e.i(398902),
    o = e.i(51206),
    d = e.i(595673),
    c = e.i(831115);
  function u(e) {
    return e.toggleOpen;
  }
  function m(e) {
    return e.isOpen;
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let f,
          p,
          b,
          x,
          y = (0, i.c)(12),
          { className: h } = e,
          { t: g } = (0, l.f)(),
          _ = (0, r.k)(s.D.WEB_COIN_FLOATING_TRADE, !1),
          v = (0, c.E)(m),
          j = (0, c.E)(u);
        if (!_) return null;
        y[0] !== v || y[1] !== j
          ? ((f = () => {
              (j(),
                (0, d.ri)({
                  buttonId: v
                    ? "coin_floating_trade_close"
                    : "coin_floating_trade_open",
                  screen: n.Ae.COIN_DETAILS,
                }));
            }),
            (y[0] = v),
            (y[1] = j),
            (y[2] = f))
          : (f = y[2]);
        let w = f,
          k = v
            ? "web.trade.floating_trade_close"
            : "web.trade.floating_trade_open";
        return (
          y[3] !== g || y[4] !== k
            ? ((p = g(k)), (y[3] = g), (y[4] = k), (y[5] = p))
            : (p = y[5]),
          y[6] === Symbol.for("react.memo_cache_sentinel")
            ? ((b = (0, t.jsx)(a.zF, {})), (y[6] = b))
            : (b = y[6]),
          y[7] !== h || y[8] !== w || y[9] !== v || y[10] !== p
            ? ((x = (0, t.jsx)(o._, {
                density: "terminal",
                "aria-pressed": v,
                active: v,
                "aria-label": p,
                "data-testid": "floating-trade-launcher",
                onClick: w,
                className: h,
                children: b,
              })),
              (y[7] = h),
              (y[8] = w),
              (y[9] = v),
              (y[10] = p),
              (y[11] = x))
            : (x = y[11]),
          x
        );
      },
    ],
    514029,
  );
  var f = e.i(426091),
    p = e.i(205761),
    b = e.i(465085),
    x = e.i(453706),
    y = e.i(352386);
  e.i(84455);
  var h = e.i(242917),
    g = e.i(678730),
    _ = e.i(85324),
    v = e.i(714549),
    j = e.i(574472),
    w = e.i(298358);
  e.i(267146);
  var k = e.i(540805),
    N = e.i(25572),
    S = e.i(162918),
    U = e.i(356283),
    P = e.i(865259),
    F = e.i(90832),
    C = e.i(140166),
    I = e.i(855659),
    q = e.i(592054);
  let $ = (0, x.default)(() => e.A(467958).then((e) => e.ReferralAppModal), {
      loadableGenerated: { modules: [734009] },
    }),
    T = {
      info: "text-text-primary",
      notice: "text-text-warning",
      confirm: "text-text-error",
    };
  function A(e) {
    let a,
      n,
      s,
      r,
      l = (0, i.c)(11),
      { label: o, value: d, valueClassName: c, testId: u } = e;
    return (
      l[0] !== o
        ? ((a = (0, t.jsx)("dt", { className: I.B, children: o })),
          (l[0] = o),
          (l[1] = a))
        : (a = l[1]),
      l[2] !== c
        ? ((n = (0, f.c)(I.o, c)), (l[2] = c), (l[3] = n))
        : (n = l[3]),
      l[4] !== n || l[5] !== d
        ? ((s = (0, t.jsx)("dd", { className: n, children: d })),
          (l[4] = n),
          (l[5] = d),
          (l[6] = s))
        : (s = l[6]),
      l[7] !== a || l[8] !== s || l[9] !== u
        ? ((r = (0, t.jsxs)("div", {
            className: I.F,
            "data-testid": u,
            children: [a, s],
          })),
          (l[7] = a),
          (l[8] = s),
          (l[9] = u),
          (l[10] = r))
        : (r = l[10]),
      r
    );
  }
  function B(e) {
    return !e;
  }
  function O(e) {
    let s,
      r,
      o,
      c,
      u,
      m,
      f,
      p,
      b = (0, i.c)(17),
      { mint: x, testId: h } = e,
      { t: g } = (0, l.f)(),
      { data: _ } = (function () {
        let e,
          t = (0, i.c)(2),
          { address: a, decodedJwt: n } = (0, j.F)(),
          s = n ? (a ?? "") : "";
        return (
          t[0] !== s
            ? ((e = { userAddress: s }), (t[0] = s), (t[1] = e))
            : (e = t[1]),
          (0, w.f)(e)
        );
      })(),
      [v, k] = (0, y.useState)(!1),
      [N, S] = (0, y.useState)(!1);
    return _?.eligibleReferee !== !0 || _.referrer
      ? null
      : (b[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = () => {
              ((0, d.LR)({
                interactionType: "click",
                sourceElementType: n.eD.ROW,
              }),
                S(!0),
                k(!0));
            }),
            (b[0] = s))
          : (s = b[0]),
        b[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = (0, t.jsx)(a.Dz, {
              "aria-hidden": !0,
              className: "size-3 shrink-0",
            })),
            (b[1] = r))
          : (r = b[1]),
        b[2] !== g
          ? ((o = g("web.trade.referral_fee_app_prompt")),
            (b[2] = g),
            (b[3] = o))
          : (o = b[3]),
        b[4] !== o
          ? ((c = (0, t.jsxs)("span", {
              className: "flex min-w-0 items-center gap-1.5",
              children: [
                r,
                (0, t.jsx)("span", {
                  className: "text-[11px] leading-tight",
                  children: o,
                }),
              ],
            })),
            (b[4] = o),
            (b[5] = c))
          : (c = b[5]),
        b[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = (0, t.jsx)(a.Tn, {
              "aria-hidden": !0,
              className: "size-3 shrink-0 text-text-quaternary",
            })),
            (b[6] = u))
          : (u = b[6]),
        b[7] !== c || b[8] !== h
          ? ((m = (0, t.jsxs)("button", {
              type: "button",
              onClick: s,
              className:
                "flex w-full items-center justify-between gap-3 py-1 text-left text-text-tertiary transition-colors hover:text-text-primary",
              "data-testid": h,
              children: [c, u],
            })),
            (b[7] = c),
            (b[8] = h),
            (b[9] = m))
          : (m = b[9]),
        b[10] !== N || b[11] !== x || b[12] !== v
          ? ((f = N
              ? (0, t.jsx)($, { open: v, onOpenChange: k, mint: x })
              : null),
            (b[10] = N),
            (b[11] = x),
            (b[12] = v),
            (b[13] = f))
          : (f = b[13]),
        b[14] !== m || b[15] !== f
          ? ((p = (0, t.jsxs)(t.Fragment, { children: [m, f] })),
            (b[14] = m),
            (b[15] = f),
            (b[16] = p))
          : (p = b[16]),
        p);
  }
  function E(e) {
    let a,
      n,
      s = (0, i.c)(8),
      {
        isFetching: r,
        isInputSettled: o,
        paused: d,
        quoteSyncedAt: c,
        refreshMs: u,
      } = e,
      { t: m } = (0, l.f)(),
      f = Math.max(
        0,
        Math.ceil(
          (c +
            u -
            (function () {
              let e,
                t,
                a = (0, i.c)(3),
                n = (0, _.p)(),
                [s, r] = (0, y.useState)(M);
              return (
                a[0] !== n
                  ? ((e = () => {
                      if (!n) return;
                      let e = setInterval(() => r(Date.now()), 1e3);
                      return () => clearInterval(e);
                    }),
                    (t = [n]),
                    (a[0] = n),
                    (a[1] = e),
                    (a[2] = t))
                  : ((e = a[1]), (t = a[2])),
                (0, y.useEffect)(e, t),
                s
              );
            })()) /
            1e3,
        ),
      );
    return (
      s[0] !== r || s[1] !== o || s[2] !== d || s[3] !== f || s[4] !== m
        ? ((a = d
            ? "—"
            : !o || r || 0 === f
              ? m("web.trade.updating")
              : `${f}s`),
          (s[0] = r),
          (s[1] = o),
          (s[2] = d),
          (s[3] = f),
          (s[4] = m),
          (s[5] = a))
        : (a = s[5]),
      s[6] !== a
        ? ((n = (0, t.jsx)("span", { children: a })), (s[6] = a), (s[7] = n))
        : (n = s[7]),
      n
    );
  }
  function M() {
    return Date.now();
  }
  (e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          s,
          r,
          o = (0, i.c)(21),
          {
            preview: d,
            pauseTargetProps: c,
            paused: u,
            notices: m,
            testIdPrefix: x,
            mint: _,
            showAppFee: j,
          } = e,
          w = void 0 !== u && u,
          $ = void 0 === x ? "quote-summary" : x,
          { t: M } = (0, l.f)(),
          [L, D] = (0, y.useState)(!1),
          z = (0, v.f)(_, d.quote?.referralFeeKind ?? null),
          Q = void 0 === j || j ? z : null,
          {
            quote: R,
            isFetching: H,
            isInputSettled: V,
            errorMessage: W,
            quoteSyncedAt: G,
            refreshMs: K,
          } = d;
        if ((0, S.b)(d)) return null;
        o[0] !== $
          ? ((n = (e) => `${$}-${e}`), (o[0] = $), (o[1] = n))
          : (n = o[1]);
        let J = n,
          Z =
            null !== R &&
            (null != R.supplySharePercent ||
              null != R.impactPercent ||
              null !== Q);
        return (
          o[2] !== W ||
          o[3] !== Z ||
          o[4] !== H ||
          o[5] !== V ||
          o[6] !== _ ||
          o[7] !== L ||
          o[8] !== w ||
          o[9] !== R ||
          o[10] !== G ||
          o[11] !== Q ||
          o[12] !== K ||
          o[13] !== M ||
          o[14] !== J
            ? ((s = W
                ? (0, t.jsx)("p", {
                    role: "status",
                    className: (0, f.c)(I.F, "text-[12px] text-text-error"),
                    "data-testid": J("error"),
                    children: W,
                  })
                : null === R
                  ? (0, t.jsxs)("div", {
                      className: I.F,
                      "data-testid": J("receive"),
                      children: [
                        (0, t.jsx)("span", {
                          className: I.B,
                          children: M("web.trade.youd_receive"),
                        }),
                        (0, t.jsx)(C.f, { testId: J("loading") }),
                      ],
                    })
                  : (0, t.jsxs)(t.Fragment, {
                      children: [
                        (0, t.jsxs)("button", {
                          type: "button",
                          "aria-expanded": L,
                          onClick: () => D(B),
                          className: (0, f.c)(I.F, "group w-full text-left"),
                          "data-testid": J("receive"),
                          children: [
                            (0, t.jsx)("span", {
                              className: (0, f.c)(
                                I.B,
                                "transition-colors group-hover:text-text-secondary",
                              ),
                              children: M("web.trade.youd_receive"),
                            }),
                            (0, t.jsxs)("span", {
                              className: "flex min-w-0 items-center gap-1.5",
                              children: [
                                (0, t.jsx)("span", {
                                  className: I.o,
                                  children: (0, S.A)({ figure: R }),
                                }),
                                (0, t.jsx)(C.f, {
                                  compact: !0,
                                  pending: H,
                                  testId: J("loading"),
                                }),
                                (0, t.jsx)(a.J0, {
                                  "aria-hidden": !0,
                                  className: (0, f.c)(
                                    "size-3 shrink-0 text-text-quaternary transition-transform duration-200",
                                    L && "rotate-180",
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                        Z &&
                          (0, t.jsxs)("dl", {
                            className: "flex flex-col",
                            children: [
                              null != R.supplySharePercent &&
                                (0, t.jsx)(A, {
                                  label: M("web.holders.percent_of_supply"),
                                  value: (0, q.g)(R.supplySharePercent),
                                  testId: J("supply-share"),
                                }),
                              null != R.impactPercent &&
                                (0, t.jsx)(A, {
                                  label: M("trade.order_details.price_impact"),
                                  value: (0, k.c)(R.impactPercent, {
                                    fractionDigits: 2,
                                  }),
                                  valueClassName:
                                    h.f[(0, g.P)(R.impactPercent)],
                                  testId: J("price-impact"),
                                }),
                              Q &&
                                (0, t.jsx)(A, {
                                  label: M("web.trade.platform_fee"),
                                  value: (0, N.U)(Q.bps),
                                  valueClassName:
                                    "referrer" === Q.kind
                                      ? "text-text-accent"
                                      : void 0,
                                  testId: J("app-fee"),
                                }),
                            ],
                          }),
                        Q &&
                          Q.bps > 0 &&
                          null !== R &&
                          (0, t.jsx)(O, {
                            mint: _,
                            testId: J("referral-prompt"),
                          }),
                        (0, t.jsx)(p.f, {
                          initial: !1,
                          children:
                            L &&
                            (0, t.jsx)(
                              b.f.div,
                              {
                                initial: { opacity: 0, height: 0 },
                                animate: { opacity: 1, height: "auto" },
                                exit: { opacity: 0, height: 0 },
                                transition: { duration: 0.2 },
                                className: "overflow-hidden",
                                "data-testid": J("details"),
                                children: (0, t.jsxs)("dl", {
                                  className: "flex flex-col",
                                  children: [
                                    null != R.minOutputAtomic &&
                                      (0, t.jsx)(A, {
                                        label: M("web.trade.min_received"),
                                        value: `${(0, S.x)({ atomic: R.minOutputAtomic, decimals: R.outputDecimals })} ${R.outputSymbol}`,
                                      }),
                                    null != R.outputUsd &&
                                      R.outputUsd > 0 &&
                                      (0, t.jsx)(A, {
                                        label: M("web.trade.value"),
                                        value: (0, k.w)(R.outputUsd),
                                      }),
                                    (0, t.jsx)(A, {
                                      label: M("web.trade.max_slippage"),
                                      value: (0, q.N)(R.bindingSlippageBps),
                                    }),
                                    R.poolFeeEstimate &&
                                      (0, t.jsx)(A, {
                                        label: M("web.trade.est_pool_fee"),
                                        value: `~${(0, U.y)(R.poolFeeEstimate.poolFeePercent)}`,
                                      }),
                                    R.transferTax &&
                                      (0, t.jsx)(A, {
                                        label: M("web.trade.transfer_tax"),
                                        value: (0, P.f)(
                                          R.transferTax.transferFeeBps,
                                        ),
                                        valueClassName: T[R.transferTax.tier],
                                        testId: J("transfer-tax"),
                                      }),
                                    R.networkCost &&
                                      (0, t.jsx)(A, {
                                        label: M("web.trade.network_plus_tip"),
                                        value: (0, t.jsxs)(t.Fragment, {
                                          children: [
                                            (0, F.m)(R.networkCost.sol, 5),
                                            " SOL",
                                            R.networkCost.usd > 0 &&
                                              (0, t.jsxs)("span", {
                                                className:
                                                  "font-normal text-text-quaternary",
                                                children: [
                                                  " ",
                                                  "(",
                                                  (0, k.w)(R.networkCost.usd),
                                                  ")",
                                                ],
                                              }),
                                          ],
                                        }),
                                      }),
                                    null != R.mevProtection &&
                                      (0, t.jsx)(A, {
                                        label: M("web.trade.mev_protection"),
                                        value: M(
                                          R.mevProtection
                                            ? "common.on"
                                            : "common.off",
                                        ),
                                      }),
                                    (0, t.jsx)(A, {
                                      label: M("web.trade.quote_status"),
                                      value:
                                        null != K
                                          ? (0, t.jsx)(E, {
                                              isFetching: H,
                                              isInputSettled: V,
                                              paused: w,
                                              quoteSyncedAt: G,
                                              refreshMs: K,
                                            })
                                          : M("web.trade.quote_live"),
                                      testId: J("quote-status"),
                                    }),
                                  ],
                                }),
                              },
                              "details",
                            ),
                        }),
                      ],
                    })),
              (o[2] = W),
              (o[3] = Z),
              (o[4] = H),
              (o[5] = V),
              (o[6] = _),
              (o[7] = L),
              (o[8] = w),
              (o[9] = R),
              (o[10] = G),
              (o[11] = Q),
              (o[12] = K),
              (o[13] = M),
              (o[14] = J),
              (o[15] = s))
            : (s = o[15]),
          o[16] !== m || o[17] !== c || o[18] !== s || o[19] !== $
            ? ((r = (0, t.jsxs)("div", {
                className: "flex flex-col",
                "data-testid": $,
                ...c,
                children: [s, m],
              })),
              (o[16] = m),
              (o[17] = c),
              (o[18] = s),
              (o[19] = $),
              (o[20] = r))
            : (r = o[20]),
          r
        );
      },
    ],
    541917,
  ),
    e.s(
      [
        "$",
        0,
        function (e) {
          let a,
            n,
            s = (0, i.c)(7),
            { note: r } = e,
            { t: o } = (0, l.f)();
          return r
            ? (s[0] !== r.kind || s[1] !== r.symbol || s[2] !== o
                ? ((a =
                    "cross_chain" === r.kind
                      ? o("web.trade.cross_chain_swap")
                      : o("web.trade.coin_trades_in_display_unit", {
                          symbol: r.symbol,
                        })),
                  (s[0] = r.kind),
                  (s[1] = r.symbol),
                  (s[2] = o),
                  (s[3] = a))
                : (a = s[3]),
              s[4] !== r.kind || s[5] !== a
                ? ((n = (0, t.jsx)("p", {
                    className:
                      "px-1 text-center text-[11px] leading-4 text-text-quaternary",
                    "data-testid": "trade-box-footer-note",
                    "data-note": r.kind,
                    children: a,
                  })),
                  (s[4] = r.kind),
                  (s[5] = a),
                  (s[6] = n))
                : (n = s[6]),
              n)
            : null;
        },
        "K",
        0,
        ({
          chain: e,
          promptsAddQuoteFunds: t = !1,
          mode: i,
          canChoosePaymentAsset: a = !1,
          quoteSymbol: n,
        }) =>
          "evm" === e
            ? { kind: "cross_chain" }
            : t && "usd" === i && !a
              ? { kind: "display_unit_only", symbol: n ?? "" }
              : null,
      ],
      304234,
    ));
};
