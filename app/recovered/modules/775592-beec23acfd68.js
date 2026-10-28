// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  ((n.__esModule = !0),
    (n.default = function (e, t) {
      if (e && t) {
        var n = Array.isArray(t) ? t : t.split(",");
        if (0 === n.length) return !0;
        var r = e.name || "",
          i = (e.type || "").toLowerCase(),
          o = i.replace(/\/.*$/, "");
        return n.some(function (e) {
          var t = e.trim().toLowerCase();
          return "." === t.charAt(0)
            ? r.toLowerCase().endsWith(t)
            : t.endsWith("/*")
              ? o === t.replace(/\/.*$/, "")
              : i === t;
        });
      }
      return !0;
    }));
};
