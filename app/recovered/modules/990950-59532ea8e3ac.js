// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let {
      MAX_SAFE_COMPONENT_LENGTH: s,
      MAX_SAFE_BUILD_LENGTH: i,
      MAX_LENGTH: n,
    } = e.r(444946),
    o = e.r(777453),
    a = ((t = r.exports = {}).re = []),
    l = (t.safeRe = []),
    p = (t.src = []),
    c = (t.safeSrc = []),
    h = (t.t = {}),
    u = 0,
    E = "[a-zA-Z0-9-]",
    d = [
      ["\\s", 1],
      ["\\d", n],
      [E, i],
    ],
    f = (e, r, t) => {
      let s = ((e) => {
          for (let [r, t] of d)
            e = e
              .split(`${r}*`)
              .join(`${r}{0,${t}}`)
              .split(`${r}+`)
              .join(`${r}{1,${t}}`);
          return e;
        })(r),
        i = u++;
      (o(e, i, r),
        (h[e] = i),
        (p[i] = r),
        (c[i] = s),
        (a[i] = new RegExp(r, t ? "g" : void 0)),
        (l[i] = new RegExp(s, t ? "g" : void 0)));
    };
  (f("NUMERICIDENTIFIER", "0|[1-9]\\d*"),
    f("NUMERICIDENTIFIERLOOSE", "\\d+"),
    f("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${E}*`),
    f(
      "MAINVERSION",
      `(${p[h.NUMERICIDENTIFIER]})\\.(${p[h.NUMERICIDENTIFIER]})\\.(${p[h.NUMERICIDENTIFIER]})`,
    ),
    f(
      "MAINVERSIONLOOSE",
      `(${p[h.NUMERICIDENTIFIERLOOSE]})\\.(${p[h.NUMERICIDENTIFIERLOOSE]})\\.(${p[h.NUMERICIDENTIFIERLOOSE]})`,
    ),
    f(
      "PRERELEASEIDENTIFIER",
      `(?:${p[h.NONNUMERICIDENTIFIER]}|${p[h.NUMERICIDENTIFIER]})`,
    ),
    f(
      "PRERELEASEIDENTIFIERLOOSE",
      `(?:${p[h.NONNUMERICIDENTIFIER]}|${p[h.NUMERICIDENTIFIERLOOSE]})`,
    ),
    f(
      "PRERELEASE",
      `(?:-(${p[h.PRERELEASEIDENTIFIER]}(?:\\.${p[h.PRERELEASEIDENTIFIER]})*))`,
    ),
    f(
      "PRERELEASELOOSE",
      `(?:-?(${p[h.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${p[h.PRERELEASEIDENTIFIERLOOSE]})*))`,
    ),
    f("BUILDIDENTIFIER", `${E}+`),
    f(
      "BUILD",
      `(?:\\+(${p[h.BUILDIDENTIFIER]}(?:\\.${p[h.BUILDIDENTIFIER]})*))`,
    ),
    f("FULLPLAIN", `v?${p[h.MAINVERSION]}${p[h.PRERELEASE]}?${p[h.BUILD]}?`),
    f("FULL", `^${p[h.FULLPLAIN]}$`),
    f(
      "LOOSEPLAIN",
      `[v=\\s]*${p[h.MAINVERSIONLOOSE]}${p[h.PRERELEASELOOSE]}?${p[h.BUILD]}?`,
    ),
    f("LOOSE", `^${p[h.LOOSEPLAIN]}$`),
    f("GTLT", "((?:<|>)?=?)"),
    f("XRANGEIDENTIFIERLOOSE", `${p[h.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),
    f("XRANGEIDENTIFIER", `${p[h.NUMERICIDENTIFIER]}|x|X|\\*`),
    f(
      "XRANGEPLAIN",
      `[v=\\s]*(${p[h.XRANGEIDENTIFIER]})(?:\\.(${p[h.XRANGEIDENTIFIER]})(?:\\.(${p[h.XRANGEIDENTIFIER]})(?:${p[h.PRERELEASE]})?${p[h.BUILD]}?)?)?`,
    ),
    f(
      "XRANGEPLAINLOOSE",
      `[v=\\s]*(${p[h.XRANGEIDENTIFIERLOOSE]})(?:\\.(${p[h.XRANGEIDENTIFIERLOOSE]})(?:\\.(${p[h.XRANGEIDENTIFIERLOOSE]})(?:${p[h.PRERELEASELOOSE]})?${p[h.BUILD]}?)?)?`,
    ),
    f("XRANGE", `^${p[h.GTLT]}\\s*${p[h.XRANGEPLAIN]}$`),
    f("XRANGELOOSE", `^${p[h.GTLT]}\\s*${p[h.XRANGEPLAINLOOSE]}$`),
    f(
      "COERCEPLAIN",
      `(^|[^\\d])(\\d{1,${s}})(?:\\.(\\d{1,${s}}))?(?:\\.(\\d{1,${s}}))?`,
    ),
    f("COERCE", `${p[h.COERCEPLAIN]}(?:$|[^\\d])`),
    f(
      "COERCEFULL",
      p[h.COERCEPLAIN] +
        `(?:${p[h.PRERELEASE]})?` +
        `(?:${p[h.BUILD]})?` +
        "(?:$|[^\\d])",
    ),
    f("COERCERTL", p[h.COERCE], !0),
    f("COERCERTLFULL", p[h.COERCEFULL], !0),
    f("LONETILDE", "(?:~>?)"),
    f("TILDETRIM", `(\\s*)${p[h.LONETILDE]}\\s+`, !0),
    (t.tildeTrimReplace = "$1~"),
    f("TILDE", `^${p[h.LONETILDE]}${p[h.XRANGEPLAIN]}$`),
    f("TILDELOOSE", `^${p[h.LONETILDE]}${p[h.XRANGEPLAINLOOSE]}$`),
    f("LONECARET", "(?:\\^)"),
    f("CARETTRIM", `(\\s*)${p[h.LONECARET]}\\s+`, !0),
    (t.caretTrimReplace = "$1^"),
    f("CARET", `^${p[h.LONECARET]}${p[h.XRANGEPLAIN]}$`),
    f("CARETLOOSE", `^${p[h.LONECARET]}${p[h.XRANGEPLAINLOOSE]}$`),
    f("COMPARATORLOOSE", `^${p[h.GTLT]}\\s*(${p[h.LOOSEPLAIN]})$|^$`),
    f("COMPARATOR", `^${p[h.GTLT]}\\s*(${p[h.FULLPLAIN]})$|^$`),
    f(
      "COMPARATORTRIM",
      `(\\s*)${p[h.GTLT]}\\s*(${p[h.LOOSEPLAIN]}|${p[h.XRANGEPLAIN]})`,
      !0,
    ),
    (t.comparatorTrimReplace = "$1$2$3"),
    f(
      "HYPHENRANGE",
      `^\\s*(${p[h.XRANGEPLAIN]})\\s+-\\s+(${p[h.XRANGEPLAIN]})\\s*$`,
    ),
    f(
      "HYPHENRANGELOOSE",
      `^\\s*(${p[h.XRANGEPLAINLOOSE]})\\s+-\\s+(${p[h.XRANGEPLAINLOOSE]})\\s*$`,
    ),
    f("STAR", "(<|>)?=?\\s*\\*"),
    f("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"),
    f("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$"));
};
