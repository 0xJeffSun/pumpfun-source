// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(
    [
      "V",
      0,
      function (e, t) {
        let n = [],
          r = e.find((e) => e.id === t)?.parentId;
        for (; r; ) {
          let t = e.find((e) => e.id === r);
          ((r = t?.parentId), t && (n = n.concat(t)));
        }
        return n;
      },
      "Q",
      0,
      function e(t, n, r = !0) {
        return t
          .filter((e) => e.parentId === n && (!r || e.context?.open))
          .flatMap((n) => [n, ...e(t, n.id, r)]);
      },
    ],
    493798,
  );
  var t = e.i(904440);
  e.s(["f", 0, t], 875355);
};
