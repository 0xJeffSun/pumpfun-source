// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t,
    i =
      "u" > typeof crypto &&
      crypto.randomUUID &&
      crypto.randomUUID.bind(crypto),
    n = new Uint8Array(16),
    r = [];
  for (let e = 0; e < 256; ++e) r.push((e + 256).toString(16).slice(1));
  e.s(
    [
      "f",
      0,
      function (e, s, a) {
        if (i && !s && !e) return i();
        let o =
          (e = e || {}).random ||
          (
            e.rng ||
            function () {
              if (
                !t &&
                !(t =
                  "u" > typeof crypto &&
                  crypto.getRandomValues &&
                  crypto.getRandomValues.bind(crypto))
              )
                throw Error(
                  "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
                );
              return t(n);
            }
          )();
        if (((o[6] = (15 & o[6]) | 64), (o[8] = (63 & o[8]) | 128), s)) {
          a = a || 0;
          for (let e = 0; e < 16; ++e) s[a + e] = o[e];
          return s;
        }
        return (function (e, t = 0) {
          return (
            r[e[t + 0]] +
            r[e[t + 1]] +
            r[e[t + 2]] +
            r[e[t + 3]] +
            "-" +
            r[e[t + 4]] +
            r[e[t + 5]] +
            "-" +
            r[e[t + 6]] +
            r[e[t + 7]] +
            "-" +
            r[e[t + 8]] +
            r[e[t + 9]] +
            "-" +
            r[e[t + 10]] +
            r[e[t + 11]] +
            r[e[t + 12]] +
            r[e[t + 13]] +
            r[e[t + 14]] +
            r[e[t + 15]]
          );
        })(o);
      },
    ],
    261940,
  );
};
