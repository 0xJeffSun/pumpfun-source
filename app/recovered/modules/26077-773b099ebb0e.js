// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = ["volumeUSD", "buyVolumeUSD", "sellVolumeUSD"];
  function r(e) {
    let t =
      "number" == typeof e
        ? e
        : "string" == typeof e && "" !== e.trim()
          ? Number(e)
          : 0 / 0;
    return !Number.isFinite(t) || t < 0 || t > 1e12 ? null : t;
  }
  function n(e) {
    if (!e || "object" != typeof e) return null;
    let n = { ...e };
    for (let a of t) n[a] = r(e[a]);
    return n;
  }
  function a(e) {
    let t = e && "object" == typeof e ? e : {};
    return {
      "5m": n(t["5m"]),
      "1h": n(t["1h"]),
      "6h": n(t["6h"]),
      "24h": n(t["24h"]),
    };
  }
  e.s([
    "N",
    0,
    1e13,
    "a",
    0,
    function (e) {
      let t =
        "number" == typeof e
          ? e
          : "string" == typeof e && "" !== e.trim()
            ? Number(e)
            : 0 / 0;
      return !Number.isFinite(t) || t <= 0 || t > 1e13 ? null : t;
    },
    "f",
    0,
    function (e) {
      if (!e || "object" != typeof e) return {};
      let t = {};
      for (let [r, n] of Object.entries(e)) t[r] = a(n);
      return t;
    },
    "O",
    0,
    a,
    "Y",
    0,
    r,
  ]);
};
