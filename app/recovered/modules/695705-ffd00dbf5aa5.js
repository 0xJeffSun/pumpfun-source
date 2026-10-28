// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e) {
    return e.trim().toUpperCase();
  }
  function r(e) {
    let r = t(e);
    return "OPEN" === r || "EXECUTING" === r || "ACTIVE" === r;
  }
  function n(e) {
    let t = e.trim().toLowerCase().replace(/\s+/g, "_");
    return "take_profit" === t
      ? "take_profit"
      : "stop_loss" === t
        ? "stop_loss"
        : t.includes("take") && t.includes("profit")
          ? "take_profit"
          : t.includes("stop") && t.includes("loss")
            ? "stop_loss"
            : null;
  }
  function i(e) {
    if (0 === e.length) return;
    let t = (e) => {
      let t = new Date(e.updatedAt).getTime();
      return Number.isNaN(t) ? -1 / 0 : t;
    };
    return [...e].sort((e, r) => t(r) - t(e))[0];
  }
  function l(e) {
    let t = e.triggerMcapUsd;
    return null == t || !Number.isFinite(t) || t <= 0 ? null : t;
  }
  function a(e) {
    let t = e.filter((e) => r(e.status));
    return {
      takeProfit: i(t.filter((e) => "take_profit" === n(e.orderType))),
      stopLoss: i(t.filter((e) => "stop_loss" === n(e.orderType))),
    };
  }
  e.s([
    "$",
    0,
    function (e) {
      let { takeProfit: t, stopLoss: r } = a(e),
        n = (e) => {
          if (void 0 === e) return null;
          let t = l(e);
          return null === t ? null : Math.round(t);
        };
      return { takeProfitMcapUsd: n(t), stopLossMcapUsd: n(r) };
    },
    "W",
    0,
    a,
    "A",
    0,
    l,
    "H",
    0,
    function (e) {
      let n = t(e);
      return r(n)
        ? "active"
        : "DONE" === n || "SUCCESS" === n
          ? "success"
          : "CANCELLED" === n || "CANCELED" === n
            ? "cancelled"
            : "FAILED" === n || "FAILURE" === n
              ? "failure"
              : "EXPIRED" === n
                ? "expired"
                : "unknown";
    },
    "z",
    0,
    r,
    "D",
    0,
    function (e) {
      return null != e && "EXECUTING" === t(e);
    },
  ]);
};
