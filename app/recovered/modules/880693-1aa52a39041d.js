// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    (n.decode = function (t) {
      return (
        a.isBrowser
          ? new TextDecoder("utf-8")
          : new (e.r(824885).TextDecoder)("utf-8")
      ).decode(t);
    }),
    (n.encode = function (t) {
      return (
        a.isBrowser ? new TextEncoder() : new (e.r(824885).TextEncoder)("utf-8")
      ).encode(t);
    }));
  let a = e.r(100281);
};
