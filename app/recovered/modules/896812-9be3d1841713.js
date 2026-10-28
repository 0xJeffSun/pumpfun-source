// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, r, e) => {
  "function" == typeof Object.create
    ? (r.exports = function (t, r) {
        r &&
          ((t.super_ = r),
          (t.prototype = Object.create(r.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })));
      })
    : (r.exports = function (t, r) {
        if (r) {
          t.super_ = r;
          var e = function () {};
          ((e.prototype = r.prototype),
            (t.prototype = new e()),
            (t.prototype.constructor = t));
        }
      });
};
