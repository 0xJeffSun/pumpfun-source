// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617),
    n = e.i(811369),
    i = e.i(590719),
    r = e.i(19648);
  function s(e) {
    if (e < 256) return 1;
    if (e < 65536) return 2;
    if (e < 0x1000000) return 3;
    if (e < 0x100000000) return 4;
    throw new t.f("Length is too large.");
  }
  e.s([
    "f",
    0,
    function (e, t = "hex") {
      let o = (function e(t) {
          var n, r;
          let o, a, u, c;
          return Array.isArray(t)
            ? ((a = s(
                (o = (n = t.map((t) => e(t))).reduce(
                  (e, t) => e + t.length,
                  0,
                )),
              )),
              {
                length: o <= 55 ? 1 + o : 1 + a + o,
                encode(e) {
                  for (let { encode: t } of (o <= 55
                    ? e.pushByte(192 + o)
                    : (e.pushByte(247 + a),
                      1 === a
                        ? e.pushUint8(o)
                        : 2 === a
                          ? e.pushUint16(o)
                          : 3 === a
                            ? e.pushUint24(o)
                            : e.pushUint32(o)),
                  n))
                    t(e);
                },
              })
            : ((c = s(
                (u = "string" == typeof (r = t) ? (0, i.X)(r) : r).length,
              )),
              {
                length:
                  1 === u.length && u[0] < 128
                    ? 1
                    : u.length <= 55
                      ? 1 + u.length
                      : 1 + c + u.length,
                encode(e) {
                  ((1 === u.length && u[0] < 128) ||
                    (u.length <= 55
                      ? e.pushByte(128 + u.length)
                      : (e.pushByte(183 + c),
                        1 === c
                          ? e.pushUint8(u.length)
                          : 2 === c
                            ? e.pushUint16(u.length)
                            : 3 === c
                              ? e.pushUint24(u.length)
                              : e.pushUint32(u.length))),
                    e.pushBytes(u));
                },
              });
        })(e),
        a = (0, n.f)(new Uint8Array(o.length));
      return (o.encode(a), "hex" === t) ? (0, r.v)(a.bytes) : a.bytes;
    },
  ]);
};
