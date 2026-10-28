// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.FieldMask = void 0));
  let r = e.r(934682),
    o = e.r(962748);
  class a extends r.Message {
    constructor(e) {
      (super(), (this.paths = []), o.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      return this.paths
        .map((e) => {
          if (e.match(/_[0-9]?_/g) || e.match(/[A-Z]/g))
            throw Error(
              'cannot encode google.protobuf.FieldMask to JSON: lowerCamelCase of path name "' +
                e +
                '" is irreversible',
            );
          let n = !1,
            t = [];
          for (let r = 0; r < e.length; r++) {
            let o = e.charAt(r);
            switch (o) {
              case "_":
                n = !0;
                break;
              case "0":
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
                (t.push(o), (n = !1));
                break;
              default:
                (n && ((n = !1), (o = o.toUpperCase())), t.push(o));
            }
          }
          return t.join("");
        })
        .join(",");
    }
    fromJson(e, n) {
      if ("string" != typeof e)
        throw Error(
          "cannot decode google.protobuf.FieldMask from JSON: " +
            o.proto3.json.debug(e),
        );
      return (
        "" === e ||
          (this.paths = e.split(",").map(function (e) {
            if (e.includes("_"))
              throw Error(
                "cannot decode google.protobuf.FieldMask from JSON: path names must be lowerCamelCase",
              );
            let n = e.replace(/[A-Z]/g, (e) => "_" + e.toLowerCase());
            return "_" === n[0] ? n.substring(1) : n;
          })),
        this
      );
    }
    static fromBinary(e, n) {
      return new a().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new a().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new a().fromJsonString(e, n);
    }
    static equals(e, n) {
      return o.proto3.util.equals(a, e, n);
    }
  }
  ((t.FieldMask = a),
    (a.runtime = o.proto3),
    (a.typeName = "google.protobuf.FieldMask"),
    (a.fields = o.proto3.util.newFieldList(() => [
      { no: 1, name: "paths", kind: "scalar", T: 9, repeated: !0 },
    ])));
};
