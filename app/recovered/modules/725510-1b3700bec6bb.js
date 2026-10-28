// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(628151),
    o = t.r(105693),
    i = t.r(731351),
    a = t.r(310413),
    l = t.r(111735),
    s = n.getBCHDigit(7973);
  function u(t, e) {
    return a.getCharCountIndicator(t, e) + 4;
  }
  ((r.from = function (t, e) {
    return l.isValid(t) ? parseInt(t, 10) : e;
  }),
    (r.getCapacity = function (t, e, r) {
      if (!l.isValid(t)) throw Error("Invalid QR Code version");
      void 0 === r && (r = a.BYTE);
      let i =
        (n.getSymbolTotalCodewords(t) - o.getTotalCodewordsCount(t, e)) * 8;
      if (r === a.MIXED) return i;
      let s = i - u(r, t);
      switch (r) {
        case a.NUMERIC:
          return Math.floor((s / 10) * 3);
        case a.ALPHANUMERIC:
          return Math.floor((s / 11) * 2);
        case a.KANJI:
          return Math.floor(s / 13);
        case a.BYTE:
        default:
          return Math.floor(s / 8);
      }
    }),
    (r.getBestVersionForData = function (t, e) {
      let n,
        o = i.from(e, i.M);
      if (Array.isArray(t)) {
        if (t.length > 1) {
          for (let e = 1; e <= 40; e++)
            if (
              (function (t, e) {
                let r = 0;
                return (
                  t.forEach(function (t) {
                    let n = u(t.mode, e);
                    r += n + t.getBitsLength();
                  }),
                  r
                );
              })(t, e) <= r.getCapacity(e, o, a.MIXED)
            )
              return e;
          return;
        }
        if (0 === t.length) return 1;
        n = t[0];
      } else n = t;
      return (function (t, e, n) {
        for (let o = 1; o <= 40; o++) if (e <= r.getCapacity(o, n, t)) return o;
      })(n.mode, n.getLength(), o);
    }),
    (r.getEncodedBits = function (t) {
      if (!l.isValid(t) || t < 7) throw Error("Invalid QR Code version");
      let e = t << 12;
      for (; n.getBCHDigit(e) - s >= 0; ) e ^= 7973 << (n.getBCHDigit(e) - s);
      return (t << 12) | e;
    }));
};
