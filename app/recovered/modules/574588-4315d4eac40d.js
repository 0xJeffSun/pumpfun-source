// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(890088);
  e.s([
    "a",
    0,
    ({ count: e, locale: r, t: n }) =>
      !Number.isFinite(e) || e <= 0
        ? "0"
        : e < 1e3
          ? String(Math.trunc(e))
          : (0, t.J)({ value: e, locale: r, t: n }),
    "w",
    0,
    (e) => (e ?? []).reduce((e, t) => (t.isMuted ? e : e + t.unreadCount), 0),
  ]);
};
