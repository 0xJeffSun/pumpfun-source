// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  "function" == typeof Object.create
    ? (t.exports = function (e, t) {
        t &&
          ((e.super_ = t),
          (e.prototype = Object.create(t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })));
      })
    : (t.exports = function (e, t) {
        if (t) {
          e.super_ = t;
          var r = function () {};
          ((r.prototype = t.prototype),
            (e.prototype = new r()),
            (e.prototype.constructor = e));
        }
      });
};
