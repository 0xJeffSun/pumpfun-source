// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(412826);
  e.s([
    "f",
    0,
    (e) => {
      let n,
        o = (0, r.c)(3),
        { loaderType: l } = e,
        a = void 0 === l ? "spinner" : l;
      if ("progress-bar" === a) {
        let e;
        return (
          o[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)("div", {
                className:
                  "absolute bottom-0 left-0 right-0 z-10 h-1 w-full overflow-hidden bg-bg-accent/50 transition-opacity",
                children: (0, t.jsx)("div", {
                  className:
                    "h-full w-full origin-left animate-indeterminate-progress-bar bg-bg-accent",
                }),
              })),
              (o[0] = e))
            : (e = o[0]),
          e
        );
      }
      if ("overlay" === a) {
        let e;
        return (
          o[1] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)("div", {
                className:
                  "absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]",
                children: (0, t.jsx)(i.f, { logoSize: 32, glowSize: 48 }),
              })),
              (o[1] = e))
            : (e = o[1]),
          e
        );
      }
      return (
        o[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = (0, t.jsx)("div", {
              className:
                "absolute inset-0 z-20 flex items-center justify-center bg-black",
              children: (0, t.jsx)(i.f, { logoSize: 48, glowSize: 64 }),
            })),
            (o[2] = n))
          : (n = o[2]),
        n
      );
    },
  ]);
};
