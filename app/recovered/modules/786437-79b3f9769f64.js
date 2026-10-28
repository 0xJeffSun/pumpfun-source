// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(["f", 0, function () {}], 786437),
    e.s(
      [
        "f",
        0,
        function (e, t) {
          let n = {};
          for (let r in e) {
            let i = e[r];
            if (t?.hasOwnProperty(r)) {
              let e = t[r](i);
              null != e && Object.assign(n, e);
              continue;
            }
            !0 === i
              ? (n[`data-${r.toLowerCase()}`] = "")
              : i && (n[`data-${r.toLowerCase()}`] = i.toString());
          }
          return n;
        },
      ],
      143611,
    ),
    e.s(
      [
        "f",
        0,
        function (e, t) {
          return "function" == typeof e ? e(t) : e;
        },
      ],
      719878,
    ),
    e.s(
      [
        "f",
        0,
        function (e, t) {
          return "function" == typeof e ? e(t) : e;
        },
      ],
      765671,
    ));
};
