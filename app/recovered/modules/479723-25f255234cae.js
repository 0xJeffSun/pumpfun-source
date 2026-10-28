// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r = e.i(149502);
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.protoInt64 = void 0));
  let o = e.r(740640),
    a = e.r(756950);
  t.protoInt64 = (function () {
    let e = new DataView(new ArrayBuffer(8));
    if (
      "function" == typeof BigInt &&
      "function" == typeof e.getBigInt64 &&
      "function" == typeof e.getBigUint64 &&
      "function" == typeof e.setBigInt64 &&
      "function" == typeof e.setBigUint64 &&
      ("object" != typeof r.default ||
        "object" != typeof r.default.env ||
        "1" !== r.default.env.BUF_BIGINT_DISABLE)
    ) {
      let n = BigInt("-9223372036854775808"),
        t = BigInt("9223372036854775807"),
        r = BigInt("0"),
        o = BigInt("18446744073709551615");
      return {
        zero: BigInt(0),
        supported: !0,
        parse(e) {
          let r = "bigint" == typeof e ? e : BigInt(e);
          if (r > t || r < n) throw Error(`int64 invalid: ${e}`);
          return r;
        },
        uParse(e) {
          let n = "bigint" == typeof e ? e : BigInt(e);
          if (n > o || n < r) throw Error(`uint64 invalid: ${e}`);
          return n;
        },
        enc(n) {
          return (
            e.setBigInt64(0, this.parse(n), !0),
            { lo: e.getInt32(0, !0), hi: e.getInt32(4, !0) }
          );
        },
        uEnc(n) {
          return (
            e.setBigInt64(0, this.uParse(n), !0),
            { lo: e.getInt32(0, !0), hi: e.getInt32(4, !0) }
          );
        },
        dec: (n, t) => (
          e.setInt32(0, n, !0),
          e.setInt32(4, t, !0),
          e.getBigInt64(0, !0)
        ),
        uDec: (n, t) => (
          e.setInt32(0, n, !0),
          e.setInt32(4, t, !0),
          e.getBigUint64(0, !0)
        ),
      };
    }
    let n = (e) => (0, o.assert)(/^-?[0-9]+$/.test(e), `int64 invalid: ${e}`),
      t = (e) => (0, o.assert)(/^[0-9]+$/.test(e), `uint64 invalid: ${e}`);
    return {
      zero: "0",
      supported: !1,
      parse: (e) => ("string" != typeof e && (e = e.toString()), n(e), e),
      uParse: (e) => ("string" != typeof e && (e = e.toString()), t(e), e),
      enc: (e) => (
        "string" != typeof e && (e = e.toString()),
        n(e),
        (0, a.int64FromString)(e)
      ),
      uEnc: (e) => (
        "string" != typeof e && (e = e.toString()),
        t(e),
        (0, a.int64FromString)(e)
      ),
      dec: (e, n) => (0, a.int64ToString)(e, n),
      uDec: (e, n) => (0, a.uInt64ToString)(e, n),
    };
  })();
};
