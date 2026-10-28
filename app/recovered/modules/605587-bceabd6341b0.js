// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(357500);
  let n = { 56: "BNB Chain", 999: "Hyperliquid" };
  function s(e) {
    if (e && /^\d+$/.test(e)) return (0, a.findChainByEvmChainId)(Number(e));
  }
  function i(e) {
    if (!e) return null;
    let a = e.trim();
    return a ? (a.startsWith("eip155:") ? a.slice(7) : a) : null;
  }
  function t(e) {
    return (
      "string" == typeof e && (!!e.startsWith("eip155:") || void 0 !== s(i(e)))
    );
  }
  e.s([
    "c",
    0,
    function (e) {
      return e.startsWith("0x") ? e.toLowerCase() : e;
    },
    "I",
    0,
    function (e, a) {
      return (
        !!e &&
        !!a &&
        (e === a ||
          (e.startsWith("0x") &&
            a.startsWith("0x") &&
            e.toLowerCase() === a.toLowerCase()))
      );
    },
    "k",
    0,
    function (e) {
      return e
        ? e
            .split("_")
            .map((e) =>
              e.length <= 2
                ? e.toUpperCase()
                : e.charAt(0).toUpperCase() + e.slice(1),
            )
            .join(" ")
        : null;
    },
    "n",
    0,
    function (e) {
      if (!t(e)) return null;
      let a = i(e);
      if (!a) return null;
      let r = s(a);
      return r ? (n[Number(a)] ?? r.displayName) : `EVM #${a}`;
    },
    "w",
    0,
    i,
    "m",
    0,
    function (e) {
      let a = i(e);
      return s(a)?.explorerUrl || "https://etherscan.io";
    },
    "g",
    0,
    t,
    "N",
    0,
    function (e) {
      let a = "string" == typeof e.chainId ? e.chainId.trim() : "";
      if (a) {
        if (t(a)) return !0;
        if (a.includes(":")) return !1;
      }
      return !!e.mint && e.mint.startsWith("0x");
    },
    "h",
    0,
    function (e) {
      return "string" == typeof e && /^0x[0-9a-fA-F]{40}$/.test(e);
    },
  ]);
};
