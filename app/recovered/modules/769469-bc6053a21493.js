// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(545177);
  let n = "Not sent: an earlier transaction in its batch failed";
  t.s([
    "X",
    0,
    n,
    "h",
    0,
    function ({ signedTxs: t, options: r }) {
      if (0 === t.length) return [];
      let s = Math.min(10, Math.ceil(t.length / 8)),
        a = [];
      for (let e = 0; e < t.length; e += s) a.push(t.slice(e, e + s));
      let i = [];
      return a.flatMap((t, s) => {
        let a = s % 8,
          o = (i[a] ?? Promise.resolve()).then(() => (0, e.l)(t, r));
        return (
          (i[a] = o),
          t.map((t, e) =>
            o.then((t) => {
              if ("error" === t.kind) throw Error(t.message);
              let r = (t.data.results ?? [t.data])[e];
              if (!r) throw Error(n);
              return r;
            }),
          )
        );
      });
    },
  ]);
};
