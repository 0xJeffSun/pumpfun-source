// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
($, Y, J) => {
  var Q = $.r(259390),
    ee = Q.Buffer;
  function et($, Y) {
    for (var J in $) Y[J] = $[J];
  }
  function er($, Y, J) {
    return ee($, Y, J);
  }
  (ee.from && ee.alloc && ee.allocUnsafe && ee.allocUnsafeSlow
    ? (Y.exports = Q)
    : (et(Q, J), (J.Buffer = er)),
    (er.prototype = Object.create(ee.prototype)),
    et(ee, er),
    (er.from = function ($, Y, J) {
      if ("number" == typeof $)
        throw TypeError("Argument must not be a number");
      return ee($, Y, J);
    }),
    (er.alloc = function ($, Y, J) {
      if ("number" != typeof $) throw TypeError("Argument must be a number");
      var Q = ee($);
      return (
        void 0 !== Y
          ? "string" == typeof J
            ? Q.fill(Y, J)
            : Q.fill(Y)
          : Q.fill(0),
        Q
      );
    }),
    (er.allocUnsafe = function ($) {
      if ("number" != typeof $) throw TypeError("Argument must be a number");
      return ee($);
    }),
    (er.allocUnsafeSlow = function ($) {
      if ("number" != typeof $) throw TypeError("Argument must be a number");
      return Q.SlowBuffer($);
    }));
};
