// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(753887),
    n = e.i(742542),
    r = e.i(272405);
  let o = (e) => ({ decode: e.decode.bind(e), encode: e.encode.bind(e) }),
    i = (e) => (i) => {
      let u = (0, n.blob)(e, i),
        { encode: a, decode: l } = o(u);
      return (
        (u.decode = (e, n) => {
          let o = l(e, n);
          return (0, r.toBigIntLE)(t.Buffer.from(o));
        }),
        (u.encode = (t, n, o) => a((0, r.toBufferLE)(t, e), n, o)),
        u
      );
    },
    u = (e) => (i) => {
      let u = (0, n.blob)(e, i),
        { encode: a, decode: l } = o(u);
      return (
        (u.decode = (e, n) => {
          let o = l(e, n);
          return (0, r.toBigIntBE)(t.Buffer.from(o));
        }),
        (u.encode = (t, n, o) => a((0, r.toBufferBE)(t, e), n, o)),
        u
      );
    },
    a = i(8);
  u(8);
  let l = i(16);
  (u(16),
    i(24),
    u(24),
    i(32),
    u(32),
    e.s(["r", 0, l, "H", 0, a], 232215),
    new (e.i(703405).f)("1e+18"),
    e.s(
      [
        "f",
        0,
        (e) => {
          let t = (0, n.u8)(e),
            { encode: r, decode: i } = o(t);
          return (
            (t.decode = (e, t) => !!i(e, t)),
            (t.encode = (e, t, n) => r(Number(e), t, n)),
            t
          );
        },
      ],
      973926,
    ));
  var c = e.i(971370);
  (e.s(
    [
      "f",
      0,
      (e) => {
        let t = (0, n.blob)(32, e),
          { encode: r, decode: i } = o(t);
        return (
          (t.decode = (e, t) => {
            let n = i(e, t);
            return new c.PublicKey(n);
          }),
          (t.encode = (e, t, n) => r(e.toBuffer(), t, n)),
          t
        );
      },
    ],
    340907,
  ),
    e.s([], 457417));
};
