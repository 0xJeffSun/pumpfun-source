// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t =
      /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
    r =
      /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
    s = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
  function n(e, t) {
    var r;
    return "__proto__" === e ||
      ("constructor" === e && t && "object" == typeof t && "prototype" in t)
      ? void ((r = e),
        console.warn(
          `[destr] Dropping "${r}" key to prevent prototype pollution.`,
        ))
      : t;
  }
  e.s([
    "f",
    0,
    function (e, o = {}) {
      if ("string" != typeof e) return e;
      if ('"' === e[0] && '"' === e[e.length - 1] && -1 === e.indexOf("\\"))
        return e.slice(1, -1);
      let i = e.trim();
      if (i.length <= 9)
        switch (i.toLowerCase()) {
          case "true":
            return !0;
          case "false":
            return !1;
          case "undefined":
            return;
          case "null":
            return null;
          case "nan":
            return 0 / 0;
          case "infinity":
            return 1 / 0;
          case "-infinity":
            return -1 / 0;
        }
      if (!s.test(e)) {
        if (o.strict) throw SyntaxError("[destr] Invalid JSON");
        return e;
      }
      try {
        if (t.test(e) || r.test(e)) {
          if (o.strict) throw Error("[destr] Possible prototype pollution");
          return JSON.parse(e, n);
        }
        return JSON.parse(e);
      } catch (t) {
        if (o.strict) throw t;
        return e;
      }
    },
  ]);
};
