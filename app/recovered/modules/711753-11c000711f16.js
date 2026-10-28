// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617),
    r = e.i(811369),
    s = e.i(590719),
    n = e.i(19648);
  function o(e) {
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
      let i = (function e(t) {
          var r, n;
          let i, a, c, u;
          return Array.isArray(t)
            ? ((a = o(
                (i = (r = t.map((t) => e(t))).reduce(
                  (e, t) => e + t.length,
                  0,
                )),
              )),
              {
                length: i <= 55 ? 1 + i : 1 + a + i,
                encode(e) {
                  for (let { encode: t } of (i <= 55
                    ? e.pushByte(192 + i)
                    : (e.pushByte(247 + a),
                      1 === a
                        ? e.pushUint8(i)
                        : 2 === a
                          ? e.pushUint16(i)
                          : 3 === a
                            ? e.pushUint24(i)
                            : e.pushUint32(i)),
                  r))
                    t(e);
                },
              })
            : ((u = o(
                (c = "string" == typeof (n = t) ? (0, s.X)(n) : n).length,
              )),
              {
                length:
                  1 === c.length && c[0] < 128
                    ? 1
                    : c.length <= 55
                      ? 1 + c.length
                      : 1 + u + c.length,
                encode(e) {
                  ((1 === c.length && c[0] < 128) ||
                    (c.length <= 55
                      ? e.pushByte(128 + c.length)
                      : (e.pushByte(183 + u),
                        1 === u
                          ? e.pushUint8(c.length)
                          : 2 === u
                            ? e.pushUint16(c.length)
                            : 3 === u
                              ? e.pushUint24(c.length)
                              : e.pushUint32(c.length))),
                    e.pushBytes(c));
                },
              });
        })(e),
        a = (0, r.f)(new Uint8Array(i.length));
      return (i.encode(a), "hex" === t) ? (0, n.v)(a.bytes) : a.bytes;
    },
  ]);
};
