// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(f) => {
  "use strict";
  function e() {
    for (var f, e, b = 0, a = ""; b < arguments.length; )
      (f = arguments[b++]) &&
        (e = (function f(e) {
          var b,
            a,
            c = "";
          if ("string" == typeof e || "number" == typeof e) c += e;
          else if ("object" == typeof e)
            if (Array.isArray(e))
              for (b = 0; b < e.length; b++)
                e[b] && (a = f(e[b])) && (c && (c += " "), (c += a));
            else for (b in e) e[b] && (c && (c += " "), (c += b));
          return c;
        })(f)) &&
        (a && (a += " "), (a += e));
    return a;
  }
  f.s(["clsx", 0, e, "default", 0, e]);
};
