// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "Z",
    0,
    (e, t) => {
      if (!t) return !1;
      let i = e?.userId?.trim();
      if (i && t === i) return !0;
      let r = e?.address?.trim();
      return !!r && t.toLowerCase() === r.toLowerCase();
    },
    "$",
    0,
    (e) => {
      let t = e?.userId?.trim();
      return t ? t : e?.address?.trim() || null;
    },
    "m",
    0,
    (e) => (e?.userId?.trim() ? "claim" : e?.address?.trim() ? "wallet" : null),
  ]);
};
