// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  ((r.__esModule = !0),
    (r.default = function (e, t) {
      if (e && t) {
        var r = Array.isArray(t) ? t : t.split(",");
        if (0 === r.length) return !0;
        var n = e.name || "",
          a = (e.type || "").toLowerCase(),
          i = a.replace(/\/.*$/, "");
        return r.some(function (e) {
          var t = e.trim().toLowerCase();
          return "." === t.charAt(0)
            ? n.toLowerCase().endsWith(t)
            : t.endsWith("/*")
              ? i === t.replace(/\/.*$/, "")
              : a === t;
        });
      }
      return !0;
    }));
};
