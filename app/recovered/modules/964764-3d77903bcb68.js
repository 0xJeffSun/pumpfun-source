// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(989494),
    r = e.i(590719),
    n = e.i(497763),
    o = e.i(622275),
    s = e.i(532617);
  function a(e) {
    var t;
    return (
      (t = (function (e) {
        let t = !0,
          r = "",
          n = 0,
          o = "",
          a = !1;
        for (let s = 0; s < e.length; s++) {
          let i = e[s];
          if (
            (["(", ")", ","].includes(i) && (t = !0),
            "(" === i && n++,
            ")" === i && n--,
            t)
          ) {
            if (0 === n) {
              if (" " === i && ["event", "function", ""].includes(o)) o = "";
              else if (((o += i), ")" === i)) {
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
            ((o += i), (r += i));
          }
        }
        if (!a) throw new s.f("Unable to normalize signature.");
        return o;
      })("string" == typeof e ? e : (0, o.f)(e))),
      (0, n.f)((0, r.D)(t))
    );
  }
  (e.s(["f", 0, a], 808387),
    e.s(["f", 0, (e) => (0, t.M)(a(e), 0, 4)], 964764));
};
