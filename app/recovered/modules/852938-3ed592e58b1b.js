// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var r = e.i(641947);
  let n = [],
    i = new Set(),
    l = !1,
    a = [],
    s = !1,
    o = () => {
      let e = n.slice();
      for (let t of i) t(e);
    },
    u = (e) => ({
      ...e,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
    });
  e.s([
    "J",
    0,
    (e) => {
      if (r.g || l) {
        ((n = [...n, u(e)].slice(-200)), o());
        return;
      }
      !s &&
        ((a = [...a, u(e)].slice(-200)),
        s ||
          void 0 !== t ||
          (t = setTimeout(() => {
            ((t = void 0), l || ((s = !0), (a = [])));
          }, 3e4)));
    },
    "h",
    0,
    () => {
      (r.g || l) && ((n = []), (a = []), o());
    },
    "C",
    0,
    () => r.g || l || !s,
    "e",
    0,
    (e) => {
      ((l = e),
        e &&
          ((s = !0),
          void 0 !== t && (clearTimeout(t), (t = void 0)),
          a.length > 0 && ((n = [...n, ...a].slice(-200)), (a = []), o())));
    },
    "A",
    0,
    (e) => (
      i.add(e),
      e(n.slice()),
      () => {
        i.delete(e);
      }
    ),
  ]);
};
