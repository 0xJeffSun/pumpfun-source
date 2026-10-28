// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  function e() {
    for (var r, e, i = 0, t = ""; i < arguments.length; )
      (r = arguments[i++]) &&
        (e = (function r(e) {
          var i,
            t,
            n = "";
          if ("string" == typeof e || "number" == typeof e) n += e;
          else if ("object" == typeof e)
            if (Array.isArray(e))
              for (i = 0; i < e.length; i++)
                e[i] && (t = r(e[i])) && (n && (n += " "), (n += t));
            else for (i in e) e[i] && (n && (n += " "), (n += i));
          return n;
        })(r)) &&
        (t && (t += " "), (t += e));
    return t;
  }
  r.s(["clsx", 0, e, "default", 0, e]);
};
