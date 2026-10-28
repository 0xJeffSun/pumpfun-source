// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(617821),
    r = e.i(509015),
    i = e.i(694975);
  e.s([
    "f",
    0,
    function (e = {}) {
      let {
          highlightItemOnHover: o,
          highlightedIndex: l,
          onHighlightedIndexChange: s,
        } = (0, r.o)(),
        { ref: u, index: a } = (0, i.f)(e),
        c = l === a,
        f = t.useRef(null),
        d = (0, n.A)(u, f);
      return {
        compositeProps: t.useMemo(
          () => ({
            tabIndex: c ? 0 : -1,
            onFocus() {
              s(a);
            },
            onMouseMove() {
              let e = f.current;
              if (!o || !e) return;
              let t = e.hasAttribute("disabled") || "true" === e.ariaDisabled;
              c || t || e.focus();
            },
          }),
          [c, s, a, o],
        ),
        compositeRef: d,
        index: a,
      };
    },
  ]);
};
