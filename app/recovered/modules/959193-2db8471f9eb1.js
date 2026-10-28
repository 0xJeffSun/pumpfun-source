// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "d",
    0,
    "OPEN",
    "P",
    0,
    20,
    "S",
    0,
    function (e) {
      if ("PENDING_RESOLUTION" !== e.status) return !1;
      if (!e.expiresAt) return !0;
      let t = Date.parse(e.expiresAt);
      return Number.isFinite(t) && t > Date.now();
    },
  ]);
};
