// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.parseTextFormatScalarValue = t.parseTextFormatEnumValue = void 0));
  let r = e.r(740640),
    o = e.r(479723),
    a = e.r(138614);
  ((t.parseTextFormatEnumValue = function (e, n) {
    let t = e.values.find((e) => e.name === n);
    return (
      (0, r.assert)(t, `cannot parse ${e.name} default value: ${n}`),
      t.number
    );
  }),
    (t.parseTextFormatScalarValue = function (e, n) {
      switch (e) {
        case a.ScalarType.STRING:
          return n;
        case a.ScalarType.BYTES: {
          let t = (function (e) {
            let n = [],
              t = {
                tail: e,
                c: "",
                next() {
                  return (
                    0 != this.tail.length &&
                    ((this.c = this.tail[0]),
                    (this.tail = this.tail.substring(1)),
                    !0)
                  );
                },
                take(e) {
                  if (this.tail.length >= e) {
                    let n = this.tail.substring(0, e);
                    return ((this.tail = this.tail.substring(e)), n);
                  }
                  return !1;
                },
              };
            for (; t.next(); )
              if ("\\" === t.c) {
                if (t.next())
                  switch (t.c) {
                    case "\\":
                      n.push(t.c.charCodeAt(0));
                      break;
                    case "b":
                      n.push(8);
                      break;
                    case "f":
                      n.push(12);
                      break;
                    case "n":
                      n.push(10);
                      break;
                    case "r":
                      n.push(13);
                      break;
                    case "t":
                      n.push(9);
                      break;
                    case "v":
                      n.push(11);
                      break;
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7": {
                      let e = t.c,
                        r = t.take(2);
                      if (!1 === r) return !1;
                      let o = parseInt(e + r, 8);
                      if (isNaN(o)) return !1;
                      n.push(o);
                      break;
                    }
                    case "x": {
                      let e = t.c,
                        r = t.take(2);
                      if (!1 === r) return !1;
                      let o = parseInt(e + r, 16);
                      if (isNaN(o)) return !1;
                      n.push(o);
                      break;
                    }
                    case "u": {
                      let e = t.c,
                        r = t.take(4);
                      if (!1 === r) return !1;
                      let o = parseInt(e + r, 16);
                      if (isNaN(o)) return !1;
                      let a = new Uint8Array(4);
                      (new DataView(a.buffer).setInt32(0, o, !0),
                        n.push(a[0], a[1], a[2], a[3]));
                      break;
                    }
                    case "U": {
                      let e = t.c,
                        r = t.take(8);
                      if (!1 === r) return !1;
                      let a = o.protoInt64.uEnc(e + r),
                        s = new Uint8Array(8),
                        i = new DataView(s.buffer);
                      (i.setInt32(0, a.lo, !0),
                        i.setInt32(4, a.hi, !0),
                        n.push(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7]));
                    }
                  }
              } else n.push(t.c.charCodeAt(0));
            return new Uint8Array(n);
          })(n);
          if (!1 === t)
            throw Error(`cannot parse ${a.ScalarType[e]} default value: ${n}`);
          return t;
        }
        case a.ScalarType.INT64:
        case a.ScalarType.SFIXED64:
        case a.ScalarType.SINT64:
          return o.protoInt64.parse(n);
        case a.ScalarType.UINT64:
        case a.ScalarType.FIXED64:
          return o.protoInt64.uParse(n);
        case a.ScalarType.DOUBLE:
        case a.ScalarType.FLOAT:
          switch (n) {
            case "inf":
              return 1 / 0;
            case "-inf":
              return -1 / 0;
            case "nan":
              return 0 / 0;
            default:
              return parseFloat(n);
          }
        case a.ScalarType.BOOL:
          return "true" === n;
        case a.ScalarType.INT32:
        case a.ScalarType.UINT32:
        case a.ScalarType.SINT32:
        case a.ScalarType.FIXED32:
        case a.ScalarType.SFIXED32:
          return parseInt(n, 10);
      }
    }));
};
