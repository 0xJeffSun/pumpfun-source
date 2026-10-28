// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var n = e.r(825115);
  function i(e) {
    var t = function () {
      return t.called
        ? t.value
        : ((t.called = !0), (t.value = e.apply(this, arguments)));
    };
    return ((t.called = !1), t);
  }
  function o(e) {
    var t = function () {
      if (t.called) throw Error(t.onceError);
      return ((t.called = !0), (t.value = e.apply(this, arguments)));
    };
    return (
      (t.onceError =
        (e.name || "Function wrapped with `once`") +
        " shouldn't be called more than once"),
      (t.called = !1),
      t
    );
  }
  ((t.exports = n(i)),
    (t.exports.strict = n(o)),
    (i.proto = i(function () {
      (Object.defineProperty(Function.prototype, "once", {
        value: function () {
          return i(this);
        },
        configurable: !0,
      }),
        Object.defineProperty(Function.prototype, "onceStrict", {
          value: function () {
            return o(this);
          },
          configurable: !0,
        }));
    })));
};
