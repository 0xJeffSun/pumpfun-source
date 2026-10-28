// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  (r.i(74812),
    r.i(825717),
    r.i(887583),
    r.i(164631),
    r.i(514186),
    r.s(
      [
        "n",
        0,
        function (r) {
          return (
            ("signTransactions" in r &&
              "function" == typeof r.signTransactions) ||
            ("modifyAndSignTransactions" in r &&
              "function" == typeof r.modifyAndSignTransactions) ||
            ("signAndSendTransactions" in r &&
              "function" == typeof r.signAndSendTransactions)
          );
        },
        "I",
        0,
        function (r, e) {
          Object.freeze(r);
          let o = { ...e, feePayer: r };
          return (Object.freeze(o), o);
        },
      ],
      617712,
    ));
  var e = r.i(970260);
  r.s(
    [
      "g",
      0,
      function (r) {
        return (0, e.E)().decode(r);
      },
    ],
    296158,
  );
};
