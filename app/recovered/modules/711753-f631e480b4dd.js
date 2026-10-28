// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(532617),
    n = t.i(811369),
    i = t.i(590719),
    s = t.i(19648);
  function r(t) {
    if (t < 256) return 1;
    if (t < 65536) return 2;
    if (t < 0x1000000) return 3;
    if (t < 0x100000000) return 4;
    throw new e.f("Length is too large.");
  }
  t.s([
    "f",
    0,
    function (t, e = "hex") {
      let o = (function t(e) {
          var n, s;
          let o, a, u, p;
          return Array.isArray(e)
            ? ((a = r(
                (o = (n = e.map((e) => t(e))).reduce(
                  (t, e) => t + e.length,
                  0,
                )),
              )),
              {
                length: o <= 55 ? 1 + o : 1 + a + o,
                encode(t) {
                  for (let { encode: e } of (o <= 55
                    ? t.pushByte(192 + o)
                    : (t.pushByte(247 + a),
                      1 === a
                        ? t.pushUint8(o)
                        : 2 === a
                          ? t.pushUint16(o)
                          : 3 === a
                            ? t.pushUint24(o)
                            : t.pushUint32(o)),
                  n))
                    e(t);
                },
              })
            : ((p = r(
                (u = "string" == typeof (s = e) ? (0, i.X)(s) : s).length,
              )),
              {
                length:
                  1 === u.length && u[0] < 128
                    ? 1
                    : u.length <= 55
                      ? 1 + u.length
                      : 1 + p + u.length,
                encode(t) {
                  ((1 === u.length && u[0] < 128) ||
                    (u.length <= 55
                      ? t.pushByte(128 + u.length)
                      : (t.pushByte(183 + p),
                        1 === p
                          ? t.pushUint8(u.length)
                          : 2 === p
                            ? t.pushUint16(u.length)
                            : 3 === p
                              ? t.pushUint24(u.length)
                              : t.pushUint32(u.length))),
                    t.pushBytes(u));
                },
              });
        })(t),
        a = (0, n.f)(new Uint8Array(o.length));
      return (o.encode(a), "hex" === e) ? (0, s.v)(a.bytes) : a.bytes;
    },
  ]);
};
