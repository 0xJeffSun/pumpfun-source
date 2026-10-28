// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(300059),
    r = e.i(382772),
    n = e.i(590719);
  e.s(
    [
      "f",
      0,
      function ({ r: e, s, to: o = "hex", v: i, yParity: a }) {
        let c = (() => {
            if (0 === a || 1 === a) return a;
            if (i && (27n === i || 28n === i || i >= 35n))
              return +(i % 2n === 0n);
            throw Error("Invalid `v` or `yParity` value");
          })(),
          u = `0x${new t.secp256k1.Signature((0, r.K)(e), (0, r.K)(s)).toCompactHex()}${0 === c ? "1b" : "1c"}`;
        return "hex" === o ? u : (0, n.X)(u);
      },
    ],
    125975,
  );
  var s = e.i(497763),
    o = e.i(990149),
    i = e.i(612735),
    a = e.i(19648);
  e.s(
    [
      "f",
      0,
      function (e, t) {
        let r, n;
        return (0, s.f)(
          ((r =
            "string" == typeof e
              ? (0, a.B)(e)
              : "string" == typeof e.raw
                ? e.raw
                : (0, a.v)(e.raw)),
          (n = (0, a.B)(`\x19Ethereum Signed Message:
${(0, i.f)(r)}`)),
          (0, o.w)([n, r])),
          t,
        );
      },
    ],
    541332,
  );
};
