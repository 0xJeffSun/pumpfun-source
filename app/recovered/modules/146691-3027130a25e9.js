// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(67223),
    n = e.i(772488),
    r = e.i(622275),
    i = e.i(927974);
  e.s(
    [
      "f",
      0,
      function (e) {
        var a;
        return (
          (a = (function (e) {
            let t = !0,
              n = "",
              r = 0,
              a = "",
              s = !1;
            for (let i = 0; i < e.length; i++) {
              let o = e[i];
              if (
                (["(", ")", ","].includes(o) && (t = !0),
                "(" === o && r++,
                ")" === o && r--,
                t)
              ) {
                if (0 === r) {
                  if (" " === o && ["event", "function", ""].includes(a))
                    a = "";
                  else if (((a += o), ")" === o)) {
                    s = !0;
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
                ((a += o), (n += o));
              }
            }
            if (!s) throw new i.f("Unable to normalize signature.");
            return a;
          })("string" == typeof e ? e : (0, r.f)(e))),
          (0, n.f)((0, t.D)(a))
        );
      },
    ],
    146691,
  );
};
