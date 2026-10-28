// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(717473);
  let n = 2n ** 256n - 1n;
  e.s(["f", 0, n], 997214);
  var r = e.i(411792),
    i = e.i(790336),
    a = e.i(858042);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { account: s, maxFeePerGas: o, maxPriorityFeePerGas: f, to: c } = e,
          u = s ? (0, t.f)(s) : void 0;
        if (u && !(0, a.f)(u.address)) throw new r.f({ address: u.address });
        if (c && !(0, a.f)(c)) throw new r.f({ address: c });
        if (o && o > n) throw new i.k({ maxFeePerGas: o });
        if (f && o && f > o)
          throw new i.M({ maxFeePerGas: o, maxPriorityFeePerGas: f });
      },
    ],
    41096,
  );
};
