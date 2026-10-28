// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = "\\ud800-\\udfff",
    o = "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",
    i = "\\ud83c[\\udffb-\\udfff]",
    a = "[^" + n + "]",
    u = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    c = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    l = "(?:" + o + "|" + i + ")?",
    s = "[\\ufe0e\\ufe0f]?",
    f = "(?:\\u200d(?:" + [a, u, c].join("|") + ")" + s + l + ")*",
    p = RegExp(
      i +
        "(?=" +
        i +
        ")|" +
        ("(?:" + [a + o + "?", o, u, c, "[" + n + "]"].join("|")) +
        ")" +
        (s + l + f),
      "g",
    );
  e.exports = function (t) {
    return t.match(p) || [];
  };
};
