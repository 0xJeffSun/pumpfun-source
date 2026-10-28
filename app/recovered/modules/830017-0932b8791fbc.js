// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    assign: function () {
      return c;
    },
    getRenderedSearch: function () {
      return l;
    },
    searchParamsToUrlQuery: function () {
      return u;
    },
    urlQueryToSearchParams: function () {
      return i;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  function l(e) {
    let t = [];
    for (let n in e) {
      let r = e[n];
      if (null != r)
        if (Array.isArray(r))
          for (let e of r)
            t.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(e))}`);
        else
          t.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(r))}`);
    }
    return 0 === t.length ? "" : "?" + t.join("&");
  }
  function u(e) {
    let t = {};
    for (let [n, r] of e.entries()) {
      let e = t[n];
      void 0 === e
        ? (t[n] = r)
        : Array.isArray(e)
          ? e.push(r)
          : (t[n] = [e, r]);
    }
    return t;
  }
  function o(e) {
    return "string" == typeof e
      ? e
      : ("number" != typeof e || isNaN(e)) && "boolean" != typeof e
        ? ""
        : String(e);
  }
  function i(e) {
    let t = new URLSearchParams();
    for (let [n, r] of Object.entries(e))
      if (Array.isArray(r)) for (let e of r) t.append(n, o(e));
      else t.set(n, o(r));
    return t;
  }
  function c(e, ...t) {
    for (let n of t) {
      for (let t of n.keys()) e.delete(t);
      for (let [t, r] of n.entries()) e.append(t, r);
    }
    return e;
  }
};
