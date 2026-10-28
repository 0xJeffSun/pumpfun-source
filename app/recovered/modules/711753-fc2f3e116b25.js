// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617),
    s = e.i(811369),
    i = e.i(590719),
    r = e.i(19648);
  function n(e) {
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
      let a = (function e(t) {
          var s, r;
          let a, o, l, c;
          return Array.isArray(t)
            ? ((o = n(
                (a = (s = t.map((t) => e(t))).reduce(
                  (e, t) => e + t.length,
                  0,
                )),
              )),
              {
                length: a <= 55 ? 1 + a : 1 + o + a,
                encode(e) {
                  for (let { encode: t } of (a <= 55
                    ? e.pushByte(192 + a)
                    : (e.pushByte(247 + o),
                      1 === o
                        ? e.pushUint8(a)
                        : 2 === o
                          ? e.pushUint16(a)
                          : 3 === o
                            ? e.pushUint24(a)
                            : e.pushUint32(a)),
                  s))
                    t(e);
                },
              })
            : ((c = n(
                (l = "string" == typeof (r = t) ? (0, i.X)(r) : r).length,
              )),
              {
                length:
                  1 === l.length && l[0] < 128
                    ? 1
                    : l.length <= 55
                      ? 1 + l.length
                      : 1 + c + l.length,
                encode(e) {
                  ((1 === l.length && l[0] < 128) ||
                    (l.length <= 55
                      ? e.pushByte(128 + l.length)
                      : (e.pushByte(183 + c),
                        1 === c
                          ? e.pushUint8(l.length)
                          : 2 === c
                            ? e.pushUint16(l.length)
                            : 3 === c
                              ? e.pushUint24(l.length)
                              : e.pushUint32(l.length))),
                    e.pushBytes(l));
                },
              });
        })(e),
        o = (0, s.f)(new Uint8Array(a.length));
      return (a.encode(o), "hex" === t) ? (0, r.v)(o.bytes) : o.bytes;
    },
  ]);
};
