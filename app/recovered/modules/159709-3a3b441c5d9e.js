// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e, i, n, s = n) {
    let l = null != e && e >= 1.1 * n,
      r = null != i && i <= 0.9 * s;
    return {
      createTakeProfit: l,
      createStopLoss: r,
      showTakeProfitTooLowMessage: null != e && !l,
      showStopLossTooHighMessage: null != i && !r,
    };
  }
  function i(e) {
    return null == e.mcapUsd || e.mcapUsd <= 0 || !(e.sellPercent > 0)
      ? null
      : e.hasActiveOrder
        ? e.isEditDirty
          ? "edit"
          : null
        : "create";
  }
  function n(e, t) {
    return t && null != e && e > 0 ? e : null;
  }
  function s(e, t) {
    return null != e && e > 0 ? e : t;
  }
  e.s([
    "m",
    0,
    2,
    "t",
    0,
    function (e) {
      return null == e || e <= 0 ? 0 : Math.min(100, Math.ceil((2 / e) * 100));
    },
    "Y",
    0,
    function () {
      return Math.round((1 - 0.9) * 100);
    },
    "v",
    0,
    function () {
      return Math.round((1.1 - 1) * 100);
    },
    "V",
    0,
    function (e, t) {
      let n = i(e),
        s = i(t);
      return {
        takeProfitAction: n,
        stopLossAction: s,
        isTakeProfitActionable: null !== n,
        isStopLossActionable: null !== s,
        hasActionableLeg: null !== n || null !== s,
      };
    },
    "A",
    0,
    function (e, i, n, s, l) {
      let r = t(
        s && null != e && e > 0 ? e : null,
        l && null != i && i > 0 ? i : null,
        n,
      );
      return {
        takeProfitFailsMinimum: r.showTakeProfitTooLowMessage,
        stopLossExceedsMaximum: r.showStopLossTooHighMessage,
        hasError: r.showTakeProfitTooLowMessage || r.showStopLossTooHighMessage,
        gates: r,
      };
    },
    "W",
    0,
    function ({
      takeProfitMcapUsd: e,
      takeProfitReferenceMcapUsd: i,
      stopLossMcapUsd: l,
      stopLossReferenceMcapUsd: r,
      liveMcapUsd: a,
      isTakeProfitActionable: o,
      isStopLossActionable: u,
    }) {
      let d = n(e, o),
        c = n(l, u),
        m = (function (e, t, i, n) {
          if (!(n > 0)) return e;
          let s = e.createTakeProfit && null != t && t > n,
            l = e.createStopLoss && null != i && i < n;
          return {
            createTakeProfit: s,
            createStopLoss: l,
            showTakeProfitTooLowMessage: null != t && !s,
            showStopLossTooHighMessage: null != i && !l,
          };
        })(t(d, c, s(i, a), s(r, a)), d, c, a);
      return {
        takeProfitFailsMinimum: m.showTakeProfitTooLowMessage,
        stopLossExceedsMaximum: m.showStopLossTooHighMessage,
        hasError: m.showTakeProfitTooLowMessage || m.showStopLossTooHighMessage,
        gates: m,
      };
    },
  ]);
};
