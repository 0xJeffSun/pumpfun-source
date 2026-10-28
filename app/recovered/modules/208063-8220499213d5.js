// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e, n) {
    return (t = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        })(e, n);
  }
  (e.s(
    [
      "f",
      0,
      function (e) {
        if (void 0 === e)
          throw ReferenceError(
            "this hasn't been initialised - super() hasn't been called",
          );
        return e;
      },
    ],
    208063,
  ),
    e.s(
      [
        "f",
        0,
        function (e, n) {
          ((e.prototype = Object.create(n.prototype)),
            (e.prototype.constructor = e),
            t(e, n));
        },
      ],
      854556,
    ));
};
