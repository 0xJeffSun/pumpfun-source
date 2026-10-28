// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(300059),
    r = e.i(382772),
    o = e.i(590719);
  e.s(
    [
      "f",
      0,
      function ({ r: e, s: a, to: s = "hex", v: n, yParity: i }) {
        let c = (() => {
            if (0 === i || 1 === i) return i;
            if (n && (27n === n || 28n === n || n >= 35n))
              return +(n % 2n === 0n);
            throw Error("Invalid `v` or `yParity` value");
          })(),
          l = `0x${new t.secp256k1.Signature((0, r.K)(e), (0, r.K)(a)).toCompactHex()}${0 === c ? "1b" : "1c"}`;
        return "hex" === s ? l : (0, o.X)(l);
      },
    ],
    125975,
  );
  var a = e.i(497763),
    s = e.i(990149),
    n = e.i(612735),
    i = e.i(19648);
  e.s(
    [
      "f",
      0,
      function (e, t) {
        let r, o;
        return (0, a.f)(
          ((r =
            "string" == typeof e
              ? (0, i.B)(e)
              : "string" == typeof e.raw
                ? e.raw
                : (0, i.v)(e.raw)),
          (o = (0, i.B)(`\x19Ethereum Signed Message:
${(0, n.f)(r)}`)),
          (0, s.w)([o, r])),
          t,
        );
      },
    ],
    541332,
  );
};
