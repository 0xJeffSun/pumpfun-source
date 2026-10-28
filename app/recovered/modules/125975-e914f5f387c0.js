// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(300059),
    n = e.i(382772),
    r = e.i(590719);
  e.s(
    [
      "f",
      0,
      function ({ r: e, s: i, to: s = "hex", v: o, yParity: a }) {
        let f = (() => {
            if (0 === a || 1 === a) return a;
            if (o && (27n === o || 28n === o || o >= 35n))
              return +(o % 2n === 0n);
            throw Error("Invalid `v` or `yParity` value");
          })(),
          c = `0x${new t.secp256k1.Signature((0, n.K)(e), (0, n.K)(i)).toCompactHex()}${0 === f ? "1b" : "1c"}`;
        return "hex" === s ? c : (0, r.X)(c);
      },
    ],
    125975,
  );
  var i = e.i(497763),
    s = e.i(990149),
    o = e.i(612735),
    a = e.i(19648);
  e.s(
    [
      "f",
      0,
      function (e, t) {
        let n, r;
        return (0, i.f)(
          ((n =
            "string" == typeof e
              ? (0, a.B)(e)
              : "string" == typeof e.raw
                ? e.raw
                : (0, a.v)(e.raw)),
          (r = (0, a.B)(`\x19Ethereum Signed Message:
${(0, o.f)(n)}`)),
          (0, s.w)([r, n])),
          t,
        );
      },
    ],
    541332,
  );
};
