// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    ActionDidNotRevalidate: function () {
      return l;
    },
    ActionDidRevalidateDynamicOnly: function () {
      return o;
    },
    ActionDidRevalidateStaticAndDynamic: function () {
      return u;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = 0,
    u = 1,
    o = 2;
};
