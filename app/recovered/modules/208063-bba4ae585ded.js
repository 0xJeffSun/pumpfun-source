// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  "use strict";
  function e(t, r) {
    return (e = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return ((t.__proto__ = e), t);
        })(t, r);
  }
  (t.s(
    [
      "f",
      0,
      function (t) {
        if (void 0 === t)
          throw ReferenceError(
            "this hasn't been initialised - super() hasn't been called",
          );
        return t;
      },
    ],
    208063,
  ),
    t.s(
      [
        "f",
        0,
        function (t, r) {
          ((t.prototype = Object.create(r.prototype)),
            (t.prototype.constructor = t),
            e(t, r));
        },
      ],
      854556,
    ));
};
