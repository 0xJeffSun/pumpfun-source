// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(f) => {
  function e() {
    for (var f, e, b = 0, c = ""; b < arguments.length; )
      (f = arguments[b++]) &&
        (e = (function f(e) {
          var b,
            c,
            a = "";
          if ("string" == typeof e || "number" == typeof e) a += e;
          else if ("object" == typeof e)
            if (Array.isArray(e))
              for (b = 0; b < e.length; b++)
                e[b] && (c = f(e[b])) && (a && (a += " "), (a += c));
            else for (b in e) e[b] && (a && (a += " "), (a += b));
          return a;
        })(f)) &&
        (c && (c += " "), (c += e));
    return c;
  }
  f.s(["clsx", 0, e, "default", 0, e]);
};
