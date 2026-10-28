// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = "[0-9]+",
    o =
      "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",
    n =
      "(?:(?![A-Z0-9 $%*+\\-./:]|" +
      (o = o.replace(/u/g, "\\u")) +
      ")(?:.|[\r\n]))+";
  ((i.KANJI = RegExp(o, "g")),
    (i.BYTE_KANJI = RegExp("[^A-Z0-9 $%*+\\-./:]+", "g")),
    (i.BYTE = RegExp(n, "g")),
    (i.NUMERIC = RegExp(r, "g")),
    (i.ALPHANUMERIC = RegExp("[A-Z $%*+\\-./:]+", "g")));
  let a = RegExp("^" + o + "$"),
    s = RegExp("^" + r + "$"),
    l = RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  ((i.testKanji = function (t) {
    return a.test(t);
  }),
    (i.testNumeric = function (t) {
      return s.test(t);
    }),
    (i.testAlphanumeric = function (t) {
      return l.test(t);
    }));
};
