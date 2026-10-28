// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  function r(e) {
    let t = e.indexOf("#"),
      n = e.indexOf("?"),
      r = n > -1 && (t < 0 || n < t);
    return r || t > -1
      ? {
          pathname: e.substring(0, r ? n : t),
          query: r ? e.substring(n, t > -1 ? t : void 0) : "",
          hash: t > -1 ? e.slice(t) : "",
        }
      : { pathname: e, query: "", hash: "" };
  }
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "parsePath", {
      enumerable: !0,
      get: function () {
        return r;
      },
    }));
};
