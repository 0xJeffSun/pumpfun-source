// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(989494),
    r = e.i(590719),
    n = e.i(497763),
    s = e.i(622275),
    o = e.i(532617);
  function i(e) {
    var t;
    return (
      (t = (function (e) {
        let t = !0,
          r = "",
          n = 0,
          s = "",
          i = !1;
        for (let o = 0; o < e.length; o++) {
          let a = e[o];
          if (
            (["(", ")", ","].includes(a) && (t = !0),
            "(" === a && n++,
            ")" === a && n--,
            t)
          ) {
            if (0 === n) {
              if (" " === a && ["event", "function", ""].includes(s)) s = "";
              else if (((s += a), ")" === a)) {
                i = !0;
                break;
              }
              continue;
            }
            if (" " === a) {
              "," !== e[o - 1] &&
                "," !== r &&
                ",(" !== r &&
                ((r = ""), (t = !1));
              continue;
            }
            ((s += a), (r += a));
          }
        }
        if (!i) throw new o.f("Unable to normalize signature.");
        return s;
      })("string" == typeof e ? e : (0, s.f)(e))),
      (0, n.f)((0, r.D)(t))
    );
  }
  (e.s(["f", 0, i], 808387),
    e.s(["f", 0, (e) => (0, t.M)(i(e), 0, 4)], 964764));
};
