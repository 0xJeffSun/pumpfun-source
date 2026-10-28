// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.i(995905);
  var e = t.i(968263),
    i = t.i(49997),
    s = t.i(341330);
  let r = {
    borderRadius: {
      ...e.f,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ],
    },
    borderTopLeftRadius: e.f,
    borderTopRightRadius: e.f,
    borderBottomLeftRadius: e.f,
    borderBottomRightRadius: e.f,
    boxShadow: {
      correct: (t, { treeScale: e, projectionDelta: r }) => {
        let n = i.u.parse(t);
        if (n.length > 5) return t;
        let a = i.u.createTransformer(t),
          o = +("number" != typeof n[0]),
          l = r.x.scale * e.x,
          h = r.y.scale * e.y;
        ((n[0 + o] /= l), (n[1 + o] /= h));
        let u = (0, s.f)(l, h, 0.5);
        return (
          "number" == typeof n[2 + o] && (n[2 + o] /= u),
          "number" == typeof n[3 + o] && (n[3 + o] /= u),
          a(n)
        );
      },
    },
  };
  t.s(["f", 0, r], 575342);
};
