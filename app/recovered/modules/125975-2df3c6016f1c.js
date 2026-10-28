// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(300059),
    r = e.i(382772),
    n = e.i(590719);
  e.s(
    [
      "f",
      0,
      function ({ r: e, s: a, to: i = "hex", v: s, yParity: o }) {
        let c = (() => {
            if (0 === o || 1 === o) return o;
            if (s && (27n === s || 28n === s || s >= 35n))
              return +(s % 2n === 0n);
            throw Error("Invalid `v` or `yParity` value");
          })(),
          l = `0x${new t.secp256k1.Signature((0, r.K)(e), (0, r.K)(a)).toCompactHex()}${0 === c ? "1b" : "1c"}`;
        return "hex" === i ? l : (0, n.X)(l);
      },
    ],
    125975,
  );
  var a = e.i(497763),
    i = e.i(990149),
    s = e.i(612735),
    o = e.i(19648);
  e.s(
    [
      "f",
      0,
      function (e, t) {
        let r, n;
        return (0, a.f)(
          ((r =
            "string" == typeof e
              ? (0, o.B)(e)
              : "string" == typeof e.raw
                ? e.raw
                : (0, o.v)(e.raw)),
          (n = (0, o.B)(`\x19Ethereum Signed Message:
${(0, s.f)(r)}`)),
          (0, i.w)([n, r])),
          t,
        );
      },
    ],
    541332,
  );
};
