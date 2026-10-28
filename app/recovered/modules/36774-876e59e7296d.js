// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.reifyWkt = void 0));
  let r = e.r(138614);
  t.reifyWkt = function (e) {
    switch (e.typeName) {
      case "google.protobuf.Any": {
        let n = e.fields.find(
            (e) =>
              1 == e.number &&
              "scalar" == e.fieldKind &&
              e.scalar === r.ScalarType.STRING,
          ),
          t = e.fields.find(
            (e) =>
              2 == e.number &&
              "scalar" == e.fieldKind &&
              e.scalar === r.ScalarType.BYTES,
          );
        if (n && t) return { typeName: e.typeName, typeUrl: n, value: t };
        break;
      }
      case "google.protobuf.Timestamp": {
        let n = e.fields.find(
            (e) =>
              1 == e.number &&
              "scalar" == e.fieldKind &&
              e.scalar === r.ScalarType.INT64,
          ),
          t = e.fields.find(
            (e) =>
              2 == e.number &&
              "scalar" == e.fieldKind &&
              e.scalar === r.ScalarType.INT32,
          );
        if (n && t) return { typeName: e.typeName, seconds: n, nanos: t };
        break;
      }
      case "google.protobuf.Duration": {
        let n = e.fields.find(
            (e) =>
              1 == e.number &&
              "scalar" == e.fieldKind &&
              e.scalar === r.ScalarType.INT64,
          ),
          t = e.fields.find(
            (e) =>
              2 == e.number &&
              "scalar" == e.fieldKind &&
              e.scalar === r.ScalarType.INT32,
          );
        if (n && t) return { typeName: e.typeName, seconds: n, nanos: t };
        break;
      }
      case "google.protobuf.Struct": {
        let n = e.fields.find((e) => 1 == e.number && !e.repeated);
        if (
          (null == n ? void 0 : n.fieldKind) !== "map" ||
          "message" !== n.mapValue.kind ||
          "google.protobuf.Value" !== n.mapValue.message.typeName
        )
          break;
        return { typeName: e.typeName, fields: n };
      }
      case "google.protobuf.Value": {
        let n = e.oneofs.find((e) => "kind" === e.name),
          t = e.fields.find((e) => 1 == e.number && e.oneof === n);
        if (
          (null == t ? void 0 : t.fieldKind) !== "enum" ||
          "google.protobuf.NullValue" !== t.enum.typeName
        )
          return;
        let o = e.fields.find(
            (e) =>
              2 == e.number &&
              "scalar" == e.fieldKind &&
              e.scalar === r.ScalarType.DOUBLE &&
              e.oneof === n,
          ),
          a = e.fields.find(
            (e) =>
              3 == e.number &&
              "scalar" == e.fieldKind &&
              e.scalar === r.ScalarType.STRING &&
              e.oneof === n,
          ),
          s = e.fields.find(
            (e) =>
              4 == e.number &&
              "scalar" == e.fieldKind &&
              e.scalar === r.ScalarType.BOOL &&
              e.oneof === n,
          ),
          i = e.fields.find((e) => 5 == e.number && e.oneof === n);
        if (
          (null == i ? void 0 : i.fieldKind) !== "message" ||
          "google.protobuf.Struct" !== i.message.typeName
        )
          return;
        let m = e.fields.find((e) => 6 == e.number && e.oneof === n);
        if (
          (null == m ? void 0 : m.fieldKind) !== "message" ||
          "google.protobuf.ListValue" !== m.message.typeName
        )
          return;
        if (n && o && a && s)
          return {
            typeName: e.typeName,
            kind: n,
            nullValue: t,
            numberValue: o,
            stringValue: a,
            boolValue: s,
            structValue: i,
            listValue: m,
          };
        break;
      }
      case "google.protobuf.ListValue": {
        let n = e.fields.find((e) => 1 == e.number && e.repeated);
        if (
          (null == n ? void 0 : n.fieldKind) != "message" ||
          "google.protobuf.Value" !== n.message.typeName
        )
          break;
        return { typeName: e.typeName, values: n };
      }
      case "google.protobuf.FieldMask": {
        let n = e.fields.find(
          (e) =>
            1 == e.number &&
            "scalar" == e.fieldKind &&
            e.scalar === r.ScalarType.STRING &&
            e.repeated,
        );
        if (n) return { typeName: e.typeName, paths: n };
        break;
      }
      case "google.protobuf.DoubleValue":
      case "google.protobuf.FloatValue":
      case "google.protobuf.Int64Value":
      case "google.protobuf.UInt64Value":
      case "google.protobuf.Int32Value":
      case "google.protobuf.UInt32Value":
      case "google.protobuf.BoolValue":
      case "google.protobuf.StringValue":
      case "google.protobuf.BytesValue": {
        let n = e.fields.find((e) => 1 == e.number && "value" == e.name);
        if (!n || "scalar" !== n.fieldKind) break;
        return { typeName: e.typeName, value: n };
      }
    }
  };
};
