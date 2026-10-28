// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  function e(t, e) {
    if (t?.inherit && e) {
      let { inherit: i, ...s } = t;
      return { ...e, ...s };
    }
    return t;
  }
  (t.s(["f", 0, e], 8864),
    t.s(
      [
        "f",
        0,
        function (t, i) {
          let s = t?.[i] ?? t?.default ?? t;
          return s !== t ? e(s, t) : s;
        },
      ],
      233278,
    ));
};
