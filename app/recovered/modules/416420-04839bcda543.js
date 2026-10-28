// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }), (t.Any = void 0));
  let r = e.r(934682),
    o = e.r(962748);
  class a extends r.Message {
    constructor(e) {
      (super(),
        (this.typeUrl = ""),
        (this.value = new Uint8Array(0)),
        o.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      var n;
      if ("" === this.typeUrl) return {};
      let t = this.typeUrlToName(this.typeUrl),
        r =
          null == (n = null == e ? void 0 : e.typeRegistry)
            ? void 0
            : n.findMessage(t);
      if (!r)
        throw Error(
          `cannot encode message google.protobuf.Any to JSON: "${this.typeUrl}" is not in the type registry`,
        );
      let o = r.fromBinary(this.value).toJson(e);
      return (
        (t.startsWith("google.protobuf.") ||
          null === o ||
          Array.isArray(o) ||
          "object" != typeof o) &&
          (o = { value: o }),
        (o["@type"] = this.typeUrl),
        o
      );
    }
    fromJson(e, n) {
      var t;
      let r;
      if (null === e || Array.isArray(e) || "object" != typeof e)
        throw Error(
          `cannot decode message google.protobuf.Any from JSON: expected object but got ${null === e ? "null" : Array.isArray(e) ? "array" : typeof e}`,
        );
      if (0 == Object.keys(e).length) return this;
      let o = e["@type"];
      if ("string" != typeof o || "" == o)
        throw Error(
          'cannot decode message google.protobuf.Any from JSON: "@type" is empty',
        );
      let a = this.typeUrlToName(o),
        s =
          null == (t = null == n ? void 0 : n.typeRegistry)
            ? void 0
            : t.findMessage(a);
      if (!s)
        throw Error(
          `cannot decode message google.protobuf.Any from JSON: ${o} is not in the type registry`,
        );
      if (
        a.startsWith("google.protobuf.") &&
        Object.prototype.hasOwnProperty.call(e, "value")
      )
        r = s.fromJson(e.value, n);
      else {
        let t = Object.assign({}, e);
        (delete t["@type"], (r = s.fromJson(t, n)));
      }
      return (this.packFrom(r), this);
    }
    packFrom(e) {
      ((this.value = e.toBinary()),
        (this.typeUrl = this.typeNameToUrl(e.getType().typeName)));
    }
    unpackTo(e) {
      return !!this.is(e.getType()) && (e.fromBinary(this.value), !0);
    }
    unpack(e) {
      if ("" === this.typeUrl) return;
      let n = e.findMessage(this.typeUrlToName(this.typeUrl));
      if (n) return n.fromBinary(this.value);
    }
    is(e) {
      if ("" === this.typeUrl) return !1;
      let n = this.typeUrlToName(this.typeUrl);
      return n === ("string" == typeof e ? e : e.typeName);
    }
    typeNameToUrl(e) {
      return `type.googleapis.com/${e}`;
    }
    typeUrlToName(e) {
      if (!e.length) throw Error(`invalid type url: ${e}`);
      let n = e.lastIndexOf("/"),
        t = n >= 0 ? e.substring(n + 1) : e;
      if (!t.length) throw Error(`invalid type url: ${e}`);
      return t;
    }
    static pack(e) {
      let n = new a();
      return (n.packFrom(e), n);
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
  ((t.Any = a),
    (a.runtime = o.proto3),
    (a.typeName = "google.protobuf.Any"),
    (a.fields = o.proto3.util.newFieldList(() => [
      { no: 1, name: "type_url", kind: "scalar", T: 9 },
      { no: 2, name: "value", kind: "scalar", T: 12 },
    ])));
};
