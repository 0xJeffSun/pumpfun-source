// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = Date.parse("2026-09-25T15:00:00Z"),
    r = (e) => Math.max(0, t - e),
    n = (e) => "external" === e.kind && (e.connected || !!e.walletName),
    i = ({ method: e, linkStatus: t }) =>
      "external" === e.kind && (!n(e) || t?.linked === !0);
  e.s([
    "A",
    0,
    t,
    "O",
    0,
    "/docs/wallet-login-changes",
    "q",
    0,
    (e) => {
      let n = ((e) => {
        if (e >= t) return { unit: "past" };
        let n = r(e);
        return n >= 864e5
          ? { unit: "days", count: Math.ceil(n / 864e5) }
          : n >= 36e5
            ? { unit: "hours", count: Math.ceil(n / 36e5) }
            : { unit: "imminent" };
      })(e);
      return "count" in n ? `${n.unit}:${n.count}` : n.unit;
    },
    "l",
    0,
    n,
    "h",
    0,
    i,
    "B",
    0,
    (e) => 2592e5 >= r(e),
    "_",
    0,
    ({ method: e, linkStatus: t, rememberedPrivyLogin: r }) =>
      "external" !== e.kind || e.connected || !i({ method: e, linkStatus: t })
        ? null
        : t?.linked === !0
          ? "wallet_is_privy_account"
          : r
            ? "device_remembers_privy_login"
            : null,
    "j",
    0,
    (e) => {
      let [t, r] = e.split(":");
      return "days" === t || "hours" === t
        ? { unit: t, count: Number(r) }
        : "past" === t
          ? { unit: "past" }
          : { unit: "imminent" };
    },
  ]);
};
