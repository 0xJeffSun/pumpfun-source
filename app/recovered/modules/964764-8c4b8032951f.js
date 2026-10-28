// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(989494),
    r = e.i(590719),
    s = e.i(497763),
    n = e.i(622275),
    o = e.i(532617);
  function i(e) {
    var t;
    return (
      (t = (function (e) {
        let t = !0,
          r = "",
          s = 0,
          n = "",
          i = !1;
        for (let o = 0; o < e.length; o++) {
          let a = e[o];
          if (
            (["(", ")", ","].includes(a) && (t = !0),
            "(" === a && s++,
            ")" === a && s--,
            t)
          ) {
            if (0 === s) {
              if (" " === a && ["event", "function", ""].includes(n)) n = "";
              else if (((n += a), ")" === a)) {
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
            ((n += a), (r += a));
          }
        }
        if (!i) throw new o.f("Unable to normalize signature.");
        return n;
      })("string" == typeof e ? e : (0, n.f)(e))),
      (0, s.f)((0, r.D)(t))
    );
  }
  (e.s(["f", 0, i], 808387),
    e.s(["f", 0, (e) => (0, t.M)(i(e), 0, 4)], 964764));
};
