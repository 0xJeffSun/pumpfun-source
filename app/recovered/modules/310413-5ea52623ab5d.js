// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(111735),
    o = t.r(214477);
  ((r.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }),
    (r.ALPHANUMERIC = { id: "Alphanumeric", bit: 2, ccBits: [9, 11, 13] }),
    (r.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }),
    (r.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }),
    (r.MIXED = { bit: -1 }),
    (r.getCharCountIndicator = function (t, e) {
      if (!t.ccBits) throw Error("Invalid mode: " + t);
      if (!n.isValid(e)) throw Error("Invalid version: " + e);
      return e >= 1 && e < 10
        ? t.ccBits[0]
        : e < 27
          ? t.ccBits[1]
          : t.ccBits[2];
    }),
    (r.getBestModeForData = function (t) {
      return o.testNumeric(t)
        ? r.NUMERIC
        : o.testAlphanumeric(t)
          ? r.ALPHANUMERIC
          : o.testKanji(t)
            ? r.KANJI
            : r.BYTE;
    }),
    (r.toString = function (t) {
      if (t && t.id) return t.id;
      throw Error("Invalid mode");
    }),
    (r.isValid = function (t) {
      return t && t.bit && t.ccBits;
    }),
    (r.from = function (t, e) {
      if (r.isValid(t)) return t;
      try {
        if ("string" != typeof t) throw Error("Param is not a string");
        switch (t.toLowerCase()) {
          case "numeric":
            return r.NUMERIC;
          case "alphanumeric":
            return r.ALPHANUMERIC;
          case "kanji":
            return r.KANJI;
          case "byte":
            return r.BYTE;
          default:
            throw Error("Unknown mode: " + t);
        }
      } catch (t) {
        return e;
      }
    }));
};
