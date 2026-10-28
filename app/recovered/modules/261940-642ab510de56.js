// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let n,
    t =
      "u" > typeof crypto &&
      crypto.randomUUID &&
      crypto.randomUUID.bind(crypto),
    r = new Uint8Array(16),
    o = [];
  for (let e = 0; e < 256; ++e) o.push((e + 256).toString(16).slice(1));
  e.s(
    [
      "f",
      0,
      function (e, i, a) {
        if (t && !i && !e) return t();
        let c =
          (e = e || {}).random ||
          (
            e.rng ||
            function () {
              if (
                !n &&
                !(n =
                  "u" > typeof crypto &&
                  crypto.getRandomValues &&
                  crypto.getRandomValues.bind(crypto))
              )
                throw Error(
                  "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
                );
              return n(r);
            }
          )();
        if (((c[6] = (15 & c[6]) | 64), (c[8] = (63 & c[8]) | 128), i)) {
          a = a || 0;
          for (let e = 0; e < 16; ++e) i[a + e] = c[e];
          return i;
        }
        return (function (e, n = 0) {
          return (
            o[e[n + 0]] +
            o[e[n + 1]] +
            o[e[n + 2]] +
            o[e[n + 3]] +
            "-" +
            o[e[n + 4]] +
            o[e[n + 5]] +
            "-" +
            o[e[n + 6]] +
            o[e[n + 7]] +
            "-" +
            o[e[n + 8]] +
            o[e[n + 9]] +
            "-" +
            o[e[n + 10]] +
            o[e[n + 11]] +
            o[e[n + 12]] +
            o[e[n + 13]] +
            o[e[n + 14]] +
            o[e[n + 15]]
          );
        })(c);
      },
    ],
    261940,
  );
};
