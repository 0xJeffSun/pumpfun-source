// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(488257),
    i = t.i(995905),
    s = t.i(59778),
    n = t.i(829451),
    r = t.i(609846),
    o = t.i(83581),
    a = t.i(6778),
    l = t.i(671348),
    h = t.i(570110);
  class u extends o.f {
    constructor() {
      (super(...arguments), (this.type = "html"), (this.renderInstance = l.f));
    }
    readValueFromInstance(t, e) {
      if (s.P.has(e))
        return this.projection?.isProjecting ? (0, n.P)(e) : (0, n.o)(t, e);
      {
        let s = window.getComputedStyle(t),
          n = ((0, i.A)(e) ? s.getPropertyValue(e) : s[e]) || 0;
        return "string" == typeof n ? n.trim() : n;
      }
    }
    measureInstanceViewportBox(t, { transformPagePoint: e }) {
      return (0, r.I)(t, e);
    }
    build(t, e, i) {
      (0, a.f)(t, e, i.transformTemplate);
    }
    scrapeMotionValuesFromProps(t, e, i) {
      return (0, h.f)(t, e, i);
    }
  }
  var d = t.i(352386),
    c = t.i(398246);
  t.s(
    [
      "f",
      0,
      (t, i) =>
        (i.isSVG ?? (0, c.f)(t))
          ? new e.f(i)
          : new u(i, { allowProjection: t !== d.Fragment }),
    ],
    506984,
  );
};
