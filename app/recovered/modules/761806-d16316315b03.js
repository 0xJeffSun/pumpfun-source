// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  let n = { ...t },
    r = 0,
    i = n.useId;
  e.s(
    [
      "f",
      0,
      function (e, n) {
        if (void 0 !== i) {
          let t = i();
          return e ?? (n ? `${n}-${t}` : t);
        }
        return (function (e, n = "mui") {
          let [i, o] = t.useState(e),
            l = e || i;
          return (
            t.useEffect(() => {
              null == i && ((r += 1), o(`${n}-${r}`));
            }, [i, n]),
            l
          );
        })(e, n);
      },
    ],
    761806,
  );
};
