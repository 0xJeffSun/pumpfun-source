// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(252960);
  e.s([
    "f",
    0,
    function (e, r = globalThis?.document) {
      let o = (0, n.f)(e);
      t.useEffect(() => {
        let e = (e) => {
          "Escape" === e.key && o(e);
        };
        return (
          r.addEventListener("keydown", e, { capture: !0 }),
          () => r.removeEventListener("keydown", e, { capture: !0 })
        );
      }, [o, r]);
    },
  ]);
};
