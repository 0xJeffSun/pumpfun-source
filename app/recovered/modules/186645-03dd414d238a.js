// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(508578),
    i = t.i(643646),
    s = t.i(661749);
  function r(t) {
    return (0, e.f)(t.animate) || s.z.some((e) => (0, i.f)(t[e]));
  }
  t.s(
    [
      "m",
      0,
      r,
      "I",
      0,
      function (t) {
        return !!(r(t) || t.variants);
      },
    ],
    186645,
  );
  var n = t.i(964355),
    a = t.i(350764);
  t.s(
    [
      "f",
      0,
      function (t, e, i) {
        for (let s in e) {
          let r = e[s],
            o = i[s];
          if ((0, a.f)(r)) t.addValue(s, r);
          else if ((0, a.f)(o)) t.addValue(s, (0, n.o)(r, { owner: t }));
          else if (o !== r)
            if (t.hasValue(s)) {
              let e = t.getValue(s);
              !0 === e.liveStyle ? e.jump(r) : e.hasAnimated || e.set(r);
            } else {
              let e = t.getStaticValue(s);
              t.addValue(s, (0, n.o)(void 0 !== e ? e : r, { owner: t }));
            }
        }
        for (let s in i) void 0 === e[s] && t.removeValue(s);
        return e;
      },
    ],
    59880,
  );
};
