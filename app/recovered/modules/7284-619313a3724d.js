// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  function e() {
    for (var t, e, r = 0, o = "", n = arguments.length; r < n; r++)
      (t = arguments[r]) &&
        (e = (function t(e) {
          var r,
            o,
            n = "";
          if ("string" == typeof e || "number" == typeof e) n += e;
          else if ("object" == typeof e)
            if (Array.isArray(e)) {
              var i = e.length;
              for (r = 0; r < i; r++)
                e[r] && (o = t(e[r])) && (n && (n += " "), (n += o));
            } else for (o in e) e[o] && (n && (n += " "), (n += o));
          return n;
        })(t)) &&
        (o && (o += " "), (o += e));
    return o;
  }
  t.s(["q", 0, e, "U", 0, e]);
};
