// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(127864);
  e.s([
    "f",
    0,
    function (e) {
      let [r, n] = t.useState(void 0);
      return (
        (0, i.f)(() => {
          if (e) {
            n({ width: e.offsetWidth, height: e.offsetHeight });
            let t = new ResizeObserver((t) => {
              let i, r;
              if (!Array.isArray(t) || !t.length) return;
              let a = t[0];
              if ("borderBoxSize" in a) {
                let e = a.borderBoxSize,
                  t = Array.isArray(e) ? e[0] : e;
                ((i = t.inlineSize), (r = t.blockSize));
              } else ((i = e.offsetWidth), (r = e.offsetHeight));
              n({ width: i, height: r });
            });
            return (t.observe(e, { box: "border-box" }), () => t.unobserve(e));
          }
          n(void 0);
        }, [e]),
        r
      );
    },
  ]);
};
