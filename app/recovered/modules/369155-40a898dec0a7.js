// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(903078);
  e.s([
    "f",
    0,
    function (e, { emitOnBegin: r, initialWaitTime: n, interval: i }) {
      let a = !0,
        s = () => (a = !1);
      return (
        (async () => {
          let o;
          r && (o = await e({ unpoll: s }));
          let u = (await n?.(o)) ?? i;
          await (0, t.f)(u);
          let l = async () => {
            a && (await e({ unpoll: s }), await (0, t.f)(i), l());
          };
          l();
        })(),
        s
      );
    },
  ]);
};
