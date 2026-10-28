// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(545177);
  let i = "Not sent: an earlier transaction in its batch failed";
  e.s([
    "X",
    0,
    i,
    "h",
    0,
    function ({ signedTxs: e, options: r }) {
      if (0 === e.length) return [];
      let a = Math.min(10, Math.ceil(e.length / 8)),
        n = [];
      for (let t = 0; t < e.length; t += a) n.push(e.slice(t, t + a));
      let s = [];
      return n.flatMap((e, a) => {
        let n = a % 8,
          l = (s[n] ?? Promise.resolve()).then(() => (0, t.l)(e, r));
        return (
          (s[n] = l),
          e.map((e, t) =>
            l.then((e) => {
              if ("error" === e.kind) throw Error(e.message);
              let r = (e.data.results ?? [e.data])[t];
              if (!r) throw Error(i);
              return r;
            }),
          )
        );
      });
    },
  ]);
};
