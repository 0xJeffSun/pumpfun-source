// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(194672),
    n = e.i(586419);
  function r(e, i, o, s, { once: u, capture: a, passive: l } = {}) {
    let c = (0, t.l)((t) => {
        (t.isTrusted || t.__ddIsTrusted || e.allowUntrustedEvents) &&
          (u && g(), s(t));
      }),
      d = l ? { capture: a, passive: l } : a,
      f =
        window.EventTarget && i instanceof EventTarget
          ? window.EventTarget.prototype
          : i,
      p = (0, n.f)(f, "addEventListener");
    function g() {
      let e = (0, n.f)(f, "removeEventListener");
      o.forEach((t) => e.call(i, t, c, d));
    }
    return (o.forEach((e) => p.call(i, e, c, d)), { stop: g });
  }
  e.s([
    "W",
    0,
    function (e, t, n, i, o) {
      return r(e, t, [n], i, o);
    },
    "U",
    0,
    r,
  ]);
};
