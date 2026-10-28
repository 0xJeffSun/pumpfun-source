// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(989494),
    r = e.i(590719),
    o = e.i(497763),
    n = e.i(622275),
    s = e.i(532617);
  function a(e) {
    var t;
    return (
      (t = (function (e) {
        let t = !0,
          r = "",
          o = 0,
          n = "",
          a = !1;
        for (let s = 0; s < e.length; s++) {
          let i = e[s];
          if (
            (["(", ")", ","].includes(i) && (t = !0),
            "(" === i && o++,
            ")" === i && o--,
            t)
          ) {
            if (0 === o) {
              if (" " === i && ["event", "function", ""].includes(n)) n = "";
              else if (((n += i), ")" === i)) {
                a = !0;
                break;
              }
              continue;
            }
            if (" " === i) {
              "," !== e[s - 1] &&
                "," !== r &&
                ",(" !== r &&
                ((r = ""), (t = !1));
              continue;
            }
            ((n += i), (r += i));
          }
        }
        if (!a) throw new s.f("Unable to normalize signature.");
        return n;
      })("string" == typeof e ? e : (0, n.f)(e))),
      (0, o.f)((0, r.D)(t))
    );
  }
  (e.s(["f", 0, a], 808387),
    e.s(["f", 0, (e) => (0, t.M)(a(e), 0, 4)], 964764));
};
