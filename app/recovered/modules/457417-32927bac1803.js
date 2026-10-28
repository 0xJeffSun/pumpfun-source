// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(753887),
    r = e.i(742542),
    f = e.i(272405);
  let n = (e) => ({ decode: e.decode.bind(e), encode: e.encode.bind(e) }),
    i = (e) => (i) => {
      let a = (0, r.blob)(e, i),
        { encode: s, decode: c } = n(a);
      return (
        (a.decode = (e, r) => {
          let n = c(e, r);
          return (0, f.toBigIntLE)(t.Buffer.from(n));
        }),
        (a.encode = (t, r, n) => s((0, f.toBufferLE)(t, e), r, n)),
        a
      );
    },
    a = (e) => (i) => {
      let a = (0, r.blob)(e, i),
        { encode: s, decode: c } = n(a);
      return (
        (a.decode = (e, r) => {
          let n = c(e, r);
          return (0, f.toBigIntBE)(t.Buffer.from(n));
        }),
        (a.encode = (t, r, n) => s((0, f.toBufferBE)(t, e), r, n)),
        a
      );
    },
    s = i(8);
  a(8);
  let c = i(16);
  (a(16),
    i(24),
    a(24),
    i(32),
    a(32),
    e.s(["r", 0, c, "H", 0, s], 232215),
    new (e.i(703405).f)("1e+18"),
    e.s(
      [
        "f",
        0,
        (e) => {
          let t = (0, r.u8)(e),
            { encode: f, decode: i } = n(t);
          return (
            (t.decode = (e, t) => !!i(e, t)),
            (t.encode = (e, t, r) => f(Number(e), t, r)),
            t
          );
        },
      ],
      973926,
    ));
  var o = e.i(971370);
  (e.s(
    [
      "f",
      0,
      (e) => {
        let t = (0, r.blob)(32, e),
          { encode: f, decode: i } = n(t);
        return (
          (t.decode = (e, t) => {
            let r = i(e, t);
            return new o.PublicKey(r);
          }),
          (t.encode = (e, t, r) => f(e.toBuffer(), t, r)),
          t
        );
      },
    ],
    340907,
  ),
    e.s([], 457417));
};
