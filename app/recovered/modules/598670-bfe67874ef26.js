// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(76198),
    o = t.r(320596);
  ((i.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }),
    (i.ALPHANUMERIC = { id: "Alphanumeric", bit: 2, ccBits: [9, 11, 13] }),
    (i.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }),
    (i.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }),
    (i.MIXED = { bit: -1 }),
    (i.getCharCountIndicator = function (t, e) {
      if (!t.ccBits) throw Error("Invalid mode: " + t);
      if (!r.isValid(e)) throw Error("Invalid version: " + e);
      return e >= 1 && e < 10
        ? t.ccBits[0]
        : e < 27
          ? t.ccBits[1]
          : t.ccBits[2];
    }),
    (i.getBestModeForData = function (t) {
      return o.testNumeric(t)
        ? i.NUMERIC
        : o.testAlphanumeric(t)
          ? i.ALPHANUMERIC
          : o.testKanji(t)
            ? i.KANJI
            : i.BYTE;
    }),
    (i.toString = function (t) {
      if (t && t.id) return t.id;
      throw Error("Invalid mode");
    }),
    (i.isValid = function (t) {
      return t && t.bit && t.ccBits;
    }),
    (i.from = function (t, e) {
      if (i.isValid(t)) return t;
      try {
        if ("string" != typeof t) throw Error("Param is not a string");
        switch (t.toLowerCase()) {
          case "numeric":
            return i.NUMERIC;
          case "alphanumeric":
            return i.ALPHANUMERIC;
          case "kanji":
            return i.KANJI;
          case "byte":
            return i.BYTE;
          default:
            throw Error("Unknown mode: " + t);
        }
      } catch (t) {
        return e;
      }
    }));
};
