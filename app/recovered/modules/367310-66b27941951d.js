// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(628127);
  let r = (e) => ("usdc" === e ? "usdc" : "sol");
  e.s(["k", 0, 0.5, "Y", 0, 25, "u", 0, r], 413826);
  let i = (e) => (Number.isFinite(e) && e > 0 ? e : 0),
    s = (e, t) =>
      "number" == typeof e && Number.isFinite(e) && e >= 0 ? e : t,
    n = (0, t.f)({
      name: "quick-buy",
      fields: {
        solAmount: { default: 0.5, coerce: (e) => s(e, 0.5) },
        usdcAmount: { default: 25, coerce: (e) => s(e, 25) },
        currency: { default: "sol", coerce: r },
      },
      extra: (e) => ({
        hoverCurrency: null,
        setSolAmount: (t) => e({ solAmount: i(t) }),
        setUsdcAmount: (t) => e({ usdcAmount: i(t) }),
        setCurrency: (t) => e({ currency: t }),
        setHoverCurrency: (t) => e({ hoverCurrency: t }),
      }),
    });
  e.s(
    [
      "D",
      0,
      n,
      "N",
      0,
      () => n((e) => e.currency),
      "T",
      0,
      () => n((e) => e.hoverCurrency),
      "r",
      0,
      () => n((e) => e.solAmount),
      "E",
      0,
      () => n((e) => e.usdcAmount),
      "A",
      0,
      () => n((e) => e.setHoverCurrency),
      "U",
      0,
      () => n((e) => e.setSolAmount),
      "X",
      0,
      () => n((e) => e.setUsdcAmount),
    ],
    538459,
  );
  let o = "usd-denomination",
    a = (e) => !0 === e,
    l = (e) => {
      n.getState().setCurrency(e ? "usdc" : "sol");
    },
    c = (0, t.f)({
      name: o,
      version: 1,
      fields: {
        usdDenomination: { default: !1, coerce: a },
        hasUserExplicitlySetDenomination: { default: !1, coerce: a },
      },
      extra: (e, t) => ({
        lastManualSetAt: null,
        setUsdDenomination: (t) => {
          (l(t),
            e({
              usdDenomination: t,
              hasUserExplicitlySetDenomination: !0,
              lastManualSetAt: Date.now(),
            }));
        },
        setUsdDenominationAuto: (t) => {
          (l(t), e({ usdDenomination: t }));
        },
        clear: () => {
          (t().resetFields(), e({ lastManualSetAt: null }));
        },
      }),
    });
  function d(e) {
    return e.usdDenomination;
  }
  function u(e) {
    return e.hasUserExplicitlySetDenomination;
  }
  function p(e) {
    return e.setUsdDenomination;
  }
  e.s(
    [
      "Y",
      0,
      () => c.getState().usdDenomination,
      "f",
      0,
      () => {
        null === window.localStorage.getItem(o) &&
          ("usdc" === n.getState().currency
            ? c.getState().setUsdDenominationAuto(!0)
            : c.getState().setUsdDenominationAuto(!1));
      },
      "B",
      0,
      () => c(u),
      "k",
      0,
      () => c(d),
      "E",
      0,
      () => c(p),
      "p",
      0,
      c,
    ],
    367310,
  );
};
