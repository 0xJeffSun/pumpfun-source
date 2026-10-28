// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  var a =
    (e.e && e.e.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    (n.encode = function (e) {
      return o.default.encode(e);
    }),
    (n.decode = function (e) {
      return o.default.decode(e);
    }));
  let o = a(e.r(315141));
};
