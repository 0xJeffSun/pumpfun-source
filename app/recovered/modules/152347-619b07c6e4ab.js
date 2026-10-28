// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  "use strict";
  var e = t.i(445242),
    s = t.i(352386);
  t.s([
    "f",
    0,
    function () {
      let t,
        a,
        i = (0, e.c)(2),
        [l, c] = (0, s.useState)("unknown");
      return (
        i[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = () => {
              let t;
              ((t = navigator.userAgent.toLowerCase()),
                /iphone|ipad|ipod/.test(t)
                  ? c("ios")
                  : /android/.test(t) && c("android"));
            }),
            (a = []),
            (i[0] = t),
            (i[1] = a))
          : ((t = i[0]), (a = i[1])),
        (0, s.useEffect)(t, a),
        l
      );
    },
  ]);
};
