// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = Symbol.for("motionComponentSymbol");
  e.s(["f", 0, t], 964421);
  var i = e.i(352386);
  e.s(
    [
      "f",
      0,
      function (e, t, r) {
        let n = (0, i.useRef)(r);
        (0, i.useInsertionEffect)(() => {
          n.current = r;
        });
        let a = (0, i.useRef)(null);
        return (0, i.useCallback)(
          (i) => {
            (i && e.onMount?.(i), t && (i ? t.mount(i) : t.unmount()));
            let r = n.current;
            if ("function" == typeof r)
              if (i) {
                let e = r(i);
                "function" == typeof e && (a.current = e);
              } else a.current ? (a.current(), (a.current = null)) : r(i);
            else r && (r.current = i);
          },
          [t],
        );
      },
    ],
    428746,
  );
};
