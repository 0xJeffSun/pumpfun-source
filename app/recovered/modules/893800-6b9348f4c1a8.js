// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    (n.encode = function (e) {
      return e.toString("base64");
    }),
    (n.decode = function (e) {
      return a.Buffer.from(e, "base64");
    }));
  let a = e.r(259390);
};
