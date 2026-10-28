// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    SEARCH_PARAMS_VARY_ID: function () {
      return u;
    },
    createVaryParams: function () {
      return c;
    },
    decodeVaryParams: function () {
      return i;
    },
    readVaryParams: function () {
      return s;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(136305),
    u = 0;
  function o(e, t) {
    let n = e[Symbol.asyncIterator]();
    for (;;) {
      let e = (0, l.readFulfilledValue)(n.next(), void 0);
      if (void 0 === e || e.done) return;
      t.add(e.value);
    }
  }
  function i(e, t) {
    if (null == e || null == t) return null;
    let n = new Set();
    return (o(e, n), o(t, n), c(n));
  }
  function c(e) {
    let t = Promise.resolve(e);
    return ((t.status = "fulfilled"), (t.value = e), t);
  }
  function s(e) {
    return (0, l.readFulfilledValue)(e, null);
  }
};
