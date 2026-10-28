// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let r = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    t = (e) => "string" == typeof e && e.trim().length > 0,
    s = (e, r) =>
      t(e.userId) && t(r.userId)
        ? e.userId === r.userId
        : t(e.address) &&
          t(r.address) &&
          e.address.toLowerCase() === r.address.toLowerCase(),
    n = (e) => {
      let t = r.test(e.userAddress) ? e.userAddress : void 0;
      return {
        userId: e.ccUserId ?? t,
        address: e.walletAddress ?? (t ? void 0 : e.userAddress),
      };
    };
  e.s([
    "g",
    0,
    n,
    "T",
    0,
    (e) => !!(e && (t(e.userId) || t(e.address))),
    "h",
    0,
    (e, r) => s(n(e), r),
    "E",
    0,
    s,
  ]);
};
