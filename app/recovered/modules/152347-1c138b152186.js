// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  e.s([
    "f",
    0,
    function () {
      let e,
        l,
        i = (0, t.c)(2),
        [a, n] = (0, r.useState)("unknown");
      return (
        i[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = () => {
              let e;
              ((e = navigator.userAgent.toLowerCase()),
                /iphone|ipad|ipod/.test(e)
                  ? n("ios")
                  : /android/.test(e) && n("android"));
            }),
            (l = []),
            (i[0] = e),
            (i[1] = l))
          : ((e = i[0]), (l = i[1])),
        (0, r.useEffect)(e, l),
        a
      );
    },
  ]);
};
