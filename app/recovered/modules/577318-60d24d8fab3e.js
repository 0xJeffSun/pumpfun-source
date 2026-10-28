// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.getUnwrappedFieldType = t.wrapField = void 0));
  let r = e.r(138614),
    o = e.r(503158);
  ((t.wrapField = function (e, n) {
    return (0, o.isMessage)(n) || !e.fieldWrapper
      ? n
      : e.fieldWrapper.wrapField(n);
  }),
    (t.getUnwrappedFieldType = function (e) {
      if ("message" === e.fieldKind && !e.repeated && void 0 == e.oneof)
        return a[e.message.typeName];
    }));
  let a = {
    "google.protobuf.DoubleValue": r.ScalarType.DOUBLE,
    "google.protobuf.FloatValue": r.ScalarType.FLOAT,
    "google.protobuf.Int64Value": r.ScalarType.INT64,
    "google.protobuf.UInt64Value": r.ScalarType.UINT64,
    "google.protobuf.Int32Value": r.ScalarType.INT32,
    "google.protobuf.UInt32Value": r.ScalarType.UINT32,
    "google.protobuf.BoolValue": r.ScalarType.BOOL,
    "google.protobuf.StringValue": r.ScalarType.STRING,
    "google.protobuf.BytesValue": r.ScalarType.BYTES,
  };
};
