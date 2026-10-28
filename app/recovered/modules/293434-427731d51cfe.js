// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(
    [
      "f",
      0,
      function (e, t = 100) {
        if (0 === e.length) return [];
        let r = e.reduce((e, t) => e + t, 0);
        if (r <= 0) return e.map(() => 0);
        let n = e.map((e) => (e * t) / r),
          a = n.map((e) => Math.floor(e)),
          i = n.map((e, t) => ({ i: t, remainder: e - a[t] })),
          o = t - a.reduce((e, t) => e + t, 0);
        i.sort((e, t) =>
          t.remainder !== e.remainder ? t.remainder - e.remainder : e.i - t.i,
        );
        let l = a.slice();
        for (let e of i) {
          if (o <= 0) break;
          ((l[e.i] += 1), (o -= 1));
        }
        return l;
      },
    ],
    293434,
  );
  var t = e.i(655397);
  e.s(
    [
      "l",
      0,
      5,
      "q",
      0,
      10,
      "x",
      0,
      function (e, r) {
        return (
          !!(0, t.Z)(r) && e.some((e) => "charity" === e.kind && e.shareBps > 0)
        );
      },
      "p",
      0,
      function (e) {
        let t = 0,
          r = 0,
          n = 0;
        for (let a of e) {
          if (
            !Number.isFinite(a.shareBps) ||
            a.shareBps < 0 ||
            a.shareBps > 1e4
          )
            throw Error(
              `Invalid recipient share (${a.shareBps} bps); each row must be between 0 and 10000.`,
            );
          (a.shareBps > 0 &&
            ("wallet" === a.kind ? (t += 1) : "charity" === a.kind && (r += 1)),
            (n += a.shareBps));
        }
        if (1e4 !== n)
          throw Error(
            `Recipient shares must sum to 10000 bps (100%); got ${n}.`,
          );
        let a = t + +(r > 0);
        if (a > 10)
          throw Error(`Too many on-chain shareholders (${a}); max is 10.`);
        if (r > 5) throw Error(`Too many charity rows (${r}); max is 5.`);
      },
    ],
    378873,
  );
};
