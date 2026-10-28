// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(984086),
    o = t.r(81774),
    n = t.r(669993),
    a = t.r(598670),
    s = t.r(76198),
    l = r.getBCHDigit(7973);
  function c(t, e) {
    return a.getCharCountIndicator(t, e) + 4;
  }
  ((i.from = function (t, e) {
    return s.isValid(t) ? parseInt(t, 10) : e;
  }),
    (i.getCapacity = function (t, e, i) {
      if (!s.isValid(t)) throw Error("Invalid QR Code version");
      void 0 === i && (i = a.BYTE);
      let n =
        (r.getSymbolTotalCodewords(t) - o.getTotalCodewordsCount(t, e)) * 8;
      if (i === a.MIXED) return n;
      let l = n - c(i, t);
      switch (i) {
        case a.NUMERIC:
          return Math.floor((l / 10) * 3);
        case a.ALPHANUMERIC:
          return Math.floor((l / 11) * 2);
        case a.KANJI:
          return Math.floor(l / 13);
        case a.BYTE:
        default:
          return Math.floor(l / 8);
      }
    }),
    (i.getBestVersionForData = function (t, e) {
      let r,
        o = n.from(e, n.M);
      if (Array.isArray(t)) {
        if (t.length > 1) {
          for (let e = 1; e <= 40; e++)
            if (
              (function (t, e) {
                let i = 0;
                return (
                  t.forEach(function (t) {
                    let r = c(t.mode, e);
                    i += r + t.getBitsLength();
                  }),
                  i
                );
              })(t, e) <= i.getCapacity(e, o, a.MIXED)
            )
              return e;
          return;
        }
        if (0 === t.length) return 1;
        r = t[0];
      } else r = t;
      return (function (t, e, r) {
        for (let o = 1; o <= 40; o++) if (e <= i.getCapacity(o, r, t)) return o;
      })(r.mode, r.getLength(), o);
    }),
    (i.getEncodedBits = function (t) {
      if (!s.isValid(t) || t < 7) throw Error("Invalid QR Code version");
      let e = t << 12;
      for (; r.getBCHDigit(e) - l >= 0; ) e ^= 7973 << (r.getBCHDigit(e) - l);
      return (t << 12) | e;
    }));
};
