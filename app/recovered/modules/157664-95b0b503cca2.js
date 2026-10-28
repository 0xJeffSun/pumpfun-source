// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  function a(e, t) {
    ((e.onload = function () {
      ((this.onerror = this.onload = null), t(null, e));
    }),
      (e.onerror = function () {
        ((this.onerror = this.onload = null),
          t(Error("Failed to load " + this.src), e));
      }));
  }
  t.exports = function (e, t, r) {
    var n = document.head || document.getElementsByTagName("head")[0],
      o = document.createElement("script");
    ("function" == typeof t && ((r = t), (t = {})),
      (r = r || function () {}),
      (o.type = (t = t || {}).type || "text/javascript"),
      (o.charset = t.charset || "utf8"),
      (o.async = !("async" in t) || !!t.async),
      (o.src = e),
      t.attrs &&
        (function (e, t) {
          for (var r in t) e.setAttribute(r, t[r]);
        })(o, t.attrs),
      t.text && (o.text = "" + t.text),
      ("onload" in o
        ? a
        : function (e, t) {
            e.onreadystatechange = function () {
              ("complete" == this.readyState || "loaded" == this.readyState) &&
                ((this.onreadystatechange = null), t(null, e));
            };
          })(o, r),
      o.onload || a(o, r),
      n.appendChild(o));
  };
};
