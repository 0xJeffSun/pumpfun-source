// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  "function" == typeof Object.create
    ? (e.exports = function (t, e) {
        e &&
          ((t.super_ = e),
          (t.prototype = Object.create(e.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })));
      })
    : (e.exports = function (t, e) {
        if (e) {
          t.super_ = e;
          var r = function () {};
          ((r.prototype = e.prototype),
            (t.prototype = new r()),
            (t.prototype.constructor = t));
        }
      });
};
