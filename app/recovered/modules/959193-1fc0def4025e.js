// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s([
    "d",
    0,
    "OPEN",
    "P",
    0,
    20,
    "S",
    0,
    function (t) {
      if ("PENDING_RESOLUTION" !== t.status) return !1;
      if (!t.expiresAt) return !0;
      let n = Date.parse(t.expiresAt);
      return Number.isFinite(n) && n > Date.now();
    },
  ]);
};
