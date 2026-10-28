// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617),
    i = e.i(811369),
    n = e.i(590719),
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
          var i, r;
          let o, a, l, u;
          return Array.isArray(t)
            ? ((a = s(
                (o = (i = t.map((t) => e(t))).reduce(
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
                  i))
                    t(e);
                },
              })
            : ((u = s(
                (l = "string" == typeof (r = t) ? (0, n.X)(r) : r).length,
              )),
              {
                length:
                  1 === l.length && l[0] < 128
                    ? 1
                    : l.length <= 55
                      ? 1 + l.length
                      : 1 + u + l.length,
                encode(e) {
                  ((1 === l.length && l[0] < 128) ||
                    (l.length <= 55
                      ? e.pushByte(128 + l.length)
                      : (e.pushByte(183 + u),
                        1 === u
                          ? e.pushUint8(l.length)
                          : 2 === u
                            ? e.pushUint16(l.length)
                            : 3 === u
                              ? e.pushUint24(l.length)
                              : e.pushUint32(l.length))),
                    e.pushBytes(l));
                },
              });
        })(e),
        a = (0, i.f)(new Uint8Array(o.length));
      return (o.encode(a), "hex" === t) ? (0, r.v)(a.bytes) : a.bytes;
    },
  ]);
};
