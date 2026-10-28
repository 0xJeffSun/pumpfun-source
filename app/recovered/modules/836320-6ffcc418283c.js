// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.Duration = void 0));
  let r = e.r(934682),
    o = e.r(479723),
    a = e.r(962748);
  class s extends r.Message {
    constructor(e) {
      (super(),
        (this.seconds = o.protoInt64.zero),
        (this.nanos = 0),
        a.proto3.util.initPartial(e, this));
    }
    fromJson(e, n) {
      if ("string" != typeof e)
        throw Error(
          `cannot decode google.protobuf.Duration from JSON: ${a.proto3.json.debug(e)}`,
        );
      let t = e.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
      if (null === t)
        throw Error(
          `cannot decode google.protobuf.Duration from JSON: ${a.proto3.json.debug(e)}`,
        );
      let r = Number(t[1]);
      if (r > 315576e6 || r < -315576e6)
        throw Error(
          `cannot decode google.protobuf.Duration from JSON: ${a.proto3.json.debug(e)}`,
        );
      if (((this.seconds = o.protoInt64.parse(r)), "string" == typeof t[2])) {
        let e = t[2] + "0".repeat(9 - t[2].length);
        ((this.nanos = parseInt(e)),
          (r < 0 || Object.is(r, -0)) && (this.nanos = -this.nanos));
      }
      return this;
    }
    toJson(e) {
      if (Number(this.seconds) > 315576e6 || -315576e6 > Number(this.seconds))
        throw Error(
          "cannot encode google.protobuf.Duration to JSON: value out of range",
        );
      let n = this.seconds.toString();
      if (0 !== this.nanos) {
        let e = Math.abs(this.nanos).toString();
        ("000000" === (e = "0".repeat(9 - e.length) + e).substring(3)
          ? (e = e.substring(0, 3))
          : "000" === e.substring(6) && (e = e.substring(0, 6)),
          (n += "." + e),
          this.nanos < 0 && 0 == Number(this.seconds) && (n = "-" + n));
      }
      return n + "s";
    }
    static fromBinary(e, n) {
      return new s().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new s().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new s().fromJsonString(e, n);
    }
    static equals(e, n) {
      return a.proto3.util.equals(s, e, n);
    }
  }
  ((t.Duration = s),
    (s.runtime = a.proto3),
    (s.typeName = "google.protobuf.Duration"),
    (s.fields = a.proto3.util.newFieldList(() => [
      { no: 1, name: "seconds", kind: "scalar", T: 3 },
      { no: 2, name: "nanos", kind: "scalar", T: 5 },
    ])));
};
