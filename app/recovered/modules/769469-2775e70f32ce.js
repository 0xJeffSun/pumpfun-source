// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(545177);
  let r = "Not sent: an earlier transaction in its batch failed";
  e.s([
    "X",
    0,
    r,
    "h",
    0,
    function ({ signedTxs: e, options: n }) {
      if (0 === e.length) return [];
      let a = Math.min(10, Math.ceil(e.length / 8)),
        i = [];
      for (let t = 0; t < e.length; t += a) i.push(e.slice(t, t + a));
      let o = [];
      return i.flatMap((e, a) => {
        let i = a % 8,
          l = (o[i] ?? Promise.resolve()).then(() => (0, t.l)(e, n));
        return (
          (o[i] = l),
          e.map((e, t) =>
            l.then((e) => {
              if ("error" === e.kind) throw Error(e.message);
              let n = (e.data.results ?? [e.data])[t];
              if (!n) throw Error(r);
              return n;
            }),
          )
        );
      });
    },
  ]);
};
