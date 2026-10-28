// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  e.s([
    "f",
    0,
    function (e) {
      let n = t.useRef(e);
      return (
        t.useEffect(() => {
          n.current = e;
        }),
        t.useMemo(
          () =>
            (...e) =>
              n.current?.(...e),
          [],
        )
      );
    },
  ]);
};
