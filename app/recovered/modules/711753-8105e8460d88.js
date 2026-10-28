// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617),
    n = e.i(811369),
    r = e.i(590719),
    i = e.i(19648);
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
          var n, i;
          let o, a, f, c;
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
                (f = "string" == typeof (i = t) ? (0, r.X)(i) : i).length,
              )),
              {
                length:
                  1 === f.length && f[0] < 128
                    ? 1
                    : f.length <= 55
                      ? 1 + f.length
                      : 1 + c + f.length,
                encode(e) {
                  ((1 === f.length && f[0] < 128) ||
                    (f.length <= 55
                      ? e.pushByte(128 + f.length)
                      : (e.pushByte(183 + c),
                        1 === c
                          ? e.pushUint8(f.length)
                          : 2 === c
                            ? e.pushUint16(f.length)
                            : 3 === c
                              ? e.pushUint24(f.length)
                              : e.pushUint32(f.length))),
                    e.pushBytes(f));
                },
              });
        })(e),
        a = (0, n.f)(new Uint8Array(o.length));
      return (o.encode(a), "hex" === t) ? (0, i.v)(a.bytes) : a.bytes;
    },
  ]);
};
