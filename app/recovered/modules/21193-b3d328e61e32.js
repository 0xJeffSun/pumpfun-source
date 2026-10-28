// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  e.s([
    "l",
    0,
    "animate-in fade-in slide-in-from-top-2 duration-300 motion-reduce:animate-none",
    "C",
    0,
    function (e) {
      let i = (0, t.useRef)(null);
      null === i.current && (i.current = new Set(e));
      let s = i.current,
        a = new Set();
      for (let t of e) s.has(t) || a.add(t);
      return (
        (0, t.useEffect)(() => {
          for (let e of a) s.add(e);
        }),
        a
      );
    },
  ]);
};
