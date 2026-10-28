// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(989494),
    n = e.i(590719),
    i = e.i(497763),
    r = e.i(622275),
    s = e.i(532617);
  function o(e) {
    var t;
    return (
      (t = (function (e) {
        let t = !0,
          n = "",
          i = 0,
          r = "",
          o = !1;
        for (let s = 0; s < e.length; s++) {
          let a = e[s];
          if (
            (["(", ")", ","].includes(a) && (t = !0),
            "(" === a && i++,
            ")" === a && i--,
            t)
          ) {
            if (0 === i) {
              if (" " === a && ["event", "function", ""].includes(r)) r = "";
              else if (((r += a), ")" === a)) {
                o = !0;
                break;
              }
              continue;
            }
            if (" " === a) {
              "," !== e[s - 1] &&
                "," !== n &&
                ",(" !== n &&
                ((n = ""), (t = !1));
              continue;
            }
            ((r += a), (n += a));
          }
        }
        if (!o) throw new s.f("Unable to normalize signature.");
        return r;
      })("string" == typeof e ? e : (0, r.f)(e))),
      (0, i.f)((0, n.D)(t))
    );
  }
  (e.s(["f", 0, o], 808387),
    e.s(["f", 0, (e) => (0, t.M)(o(e), 0, 4)], 964764));
};
