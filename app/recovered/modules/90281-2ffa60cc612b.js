// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.isScalarZeroValue = t.scalarZeroValue = t.scalarEquals = void 0));
  let r = e.r(479723),
    o = e.r(138614);
  ((t.scalarEquals = function (e, n, t) {
    if (n === t) return !0;
    if (e == o.ScalarType.BYTES) {
      if (
        !(n instanceof Uint8Array) ||
        !(t instanceof Uint8Array) ||
        n.length !== t.length
      )
        return !1;
      for (let e = 0; e < n.length; e++) if (n[e] !== t[e]) return !1;
      return !0;
    }
    switch (e) {
      case o.ScalarType.UINT64:
      case o.ScalarType.FIXED64:
      case o.ScalarType.INT64:
      case o.ScalarType.SFIXED64:
      case o.ScalarType.SINT64:
        return n == t;
    }
    return !1;
  }),
    (t.scalarZeroValue = function (e, n) {
      switch (e) {
        case o.ScalarType.BOOL:
          return !1;
        case o.ScalarType.UINT64:
        case o.ScalarType.FIXED64:
        case o.ScalarType.INT64:
        case o.ScalarType.SFIXED64:
        case o.ScalarType.SINT64:
          return 0 == n ? r.protoInt64.zero : "0";
        case o.ScalarType.DOUBLE:
        case o.ScalarType.FLOAT:
          return 0;
        case o.ScalarType.BYTES:
          return new Uint8Array(0);
        case o.ScalarType.STRING:
          return "";
        default:
          return 0;
      }
    }),
    (t.isScalarZeroValue = function (e, n) {
      switch (e) {
        case o.ScalarType.BOOL:
          return !1 === n;
        case o.ScalarType.STRING:
          return "" === n;
        case o.ScalarType.BYTES:
          return n instanceof Uint8Array && !n.byteLength;
        default:
          return 0 == n;
      }
    }));
};
