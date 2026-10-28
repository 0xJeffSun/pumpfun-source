// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(989494),
    n = e.i(590719),
    r = e.i(497763),
    s = e.i(622275),
    i = e.i(532617);
  function a(e) {
    var t;
    return (
      (t = (function (e) {
        let t = !0,
          n = "",
          r = 0,
          s = "",
          a = !1;
        for (let i = 0; i < e.length; i++) {
          let o = e[i];
          if (
            (["(", ")", ","].includes(o) && (t = !0),
            "(" === o && r++,
            ")" === o && r--,
            t)
          ) {
            if (0 === r) {
              if (" " === o && ["event", "function", ""].includes(s)) s = "";
              else if (((s += o), ")" === o)) {
                a = !0;
                break;
              }
              continue;
            }
            if (" " === o) {
              "," !== e[i - 1] &&
                "," !== n &&
                ",(" !== n &&
                ((n = ""), (t = !1));
              continue;
            }
            ((s += o), (n += o));
          }
        }
        if (!a) throw new i.f("Unable to normalize signature.");
        return s;
      })("string" == typeof e ? e : (0, s.f)(e))),
      (0, r.f)((0, n.D)(t))
    );
  }
  (e.s(["f", 0, a], 808387),
    e.s(["f", 0, (e) => (0, t.M)(a(e), 0, 4)], 964764));
};
