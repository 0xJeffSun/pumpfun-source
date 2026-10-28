// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new Set(["limit_order_filled"]),
    n = (e) => null != e && t.has(e),
    i = 0;
  e.s([
    "D",
    0,
    () => i > 0,
    "K",
    0,
    (e) => n(e.genericV1?.notificationSubtype),
    "g",
    0,
    n,
    "I",
    0,
    () => {
      i += 1;
      let e = !1;
      return () => {
        e || ((e = !0), (i = Math.max(0, i - 1)));
      };
    },
  ]);
};
