// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.Timestamp = void 0));
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
          `cannot decode google.protobuf.Timestamp from JSON: ${a.proto3.json.debug(e)}`,
        );
      let t = e.match(
        /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/,
      );
      if (!t)
        throw Error(
          "cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string",
        );
      let r = Date.parse(
        t[1] +
          "-" +
          t[2] +
          "-" +
          t[3] +
          "T" +
          t[4] +
          ":" +
          t[5] +
          ":" +
          t[6] +
          (t[8] ? t[8] : "Z"),
      );
      if (Number.isNaN(r))
        throw Error(
          "cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string",
        );
      if (
        r < Date.parse("0001-01-01T00:00:00Z") ||
        r > Date.parse("9999-12-31T23:59:59Z")
      )
        throw Error(
          "cannot decode message google.protobuf.Timestamp from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive",
        );
      return (
        (this.seconds = o.protoInt64.parse(r / 1e3)),
        (this.nanos = 0),
        t[7] &&
          (this.nanos =
            parseInt("1" + t[7] + "0".repeat(9 - t[7].length)) - 1e9),
        this
      );
    }
    toJson(e) {
      let n = 1e3 * Number(this.seconds);
      if (
        n < Date.parse("0001-01-01T00:00:00Z") ||
        n > Date.parse("9999-12-31T23:59:59Z")
      )
        throw Error(
          "cannot encode google.protobuf.Timestamp to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive",
        );
      if (this.nanos < 0)
        throw Error(
          "cannot encode google.protobuf.Timestamp to JSON: nanos must not be negative",
        );
      let t = "Z";
      if (this.nanos > 0) {
        let e = (this.nanos + 1e9).toString().substring(1);
        t =
          "000000" === e.substring(3)
            ? "." + e.substring(0, 3) + "Z"
            : "000" === e.substring(6)
              ? "." + e.substring(0, 6) + "Z"
              : "." + e + "Z";
      }
      return new Date(n).toISOString().replace(".000Z", t);
    }
    toDate() {
      return new Date(1e3 * Number(this.seconds) + Math.ceil(this.nanos / 1e6));
    }
    static now() {
      return s.fromDate(new Date());
    }
    static fromDate(e) {
      let n = e.getTime();
      return new s({
        seconds: o.protoInt64.parse(Math.floor(n / 1e3)),
        nanos: (n % 1e3) * 1e6,
      });
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
  ((t.Timestamp = s),
    (s.runtime = a.proto3),
    (s.typeName = "google.protobuf.Timestamp"),
    (s.fields = a.proto3.util.newFieldList(() => [
      { no: 1, name: "seconds", kind: "scalar", T: 3 },
      { no: 2, name: "nanos", kind: "scalar", T: 5 },
    ])));
};
