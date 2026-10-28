// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.assertFloat32 = t.assertUInt32 = t.assertInt32 = t.assert = void 0),
    (t.assert = function (e, n) {
      if (!e) throw Error(n);
    }),
    (t.assertInt32 = function (e) {
      if ("number" != typeof e) throw Error("invalid int 32: " + typeof e);
      if (!Number.isInteger(e) || e > 0x7fffffff || e < -0x80000000)
        throw Error("invalid int 32: " + e);
    }),
    (t.assertUInt32 = function (e) {
      if ("number" != typeof e) throw Error("invalid uint 32: " + typeof e);
      if (!Number.isInteger(e) || e > 0xffffffff || e < 0)
        throw Error("invalid uint 32: " + e);
    }),
    (t.assertFloat32 = function (e) {
      if ("number" != typeof e) throw Error("invalid float 32: " + typeof e);
      if (
        Number.isFinite(e) &&
        (e > 34028234663852886e22 || e < -34028234663852886e22)
      )
        throw Error("invalid float 32: " + e);
    }));
};
