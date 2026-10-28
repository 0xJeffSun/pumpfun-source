// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(719372),
    i = t.i(350764);
  t.s(
    [
      "f",
      0,
      function (t, s) {
        let n = t.getValue("willChange");
        if ((0, i.f)(n) && n.add) return n.add(s);
        if (!n && e.f.WillChange) {
          let i = new e.f.WillChange("auto");
          (t.addValue("willChange", i), i.add(s));
        }
      },
    ],
    923301,
  );
};
