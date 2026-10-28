// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(989494),
    r = e.i(590719),
    n = e.i(497763),
    a = e.i(622275),
    i = e.i(532617);
  function s(e) {
    var t;
    return (
      (t = (function (e) {
        let t = !0,
          r = "",
          n = 0,
          a = "",
          s = !1;
        for (let i = 0; i < e.length; i++) {
          let o = e[i];
          if (
            (["(", ")", ","].includes(o) && (t = !0),
            "(" === o && n++,
            ")" === o && n--,
            t)
          ) {
            if (0 === n) {
              if (" " === o && ["event", "function", ""].includes(a)) a = "";
              else if (((a += o), ")" === o)) {
                s = !0;
                break;
              }
              continue;
            }
            if (" " === o) {
              "," !== e[i - 1] &&
                "," !== r &&
                ",(" !== r &&
                ((r = ""), (t = !1));
              continue;
            }
            ((a += o), (r += o));
          }
        }
        if (!s) throw new i.f("Unable to normalize signature.");
        return a;
      })("string" == typeof e ? e : (0, a.f)(e))),
      (0, n.f)((0, r.D)(t))
    );
  }
  (e.s(["f", 0, s], 808387),
    e.s(["f", 0, (e) => (0, t.M)(s(e), 0, 4)], 964764));
};
