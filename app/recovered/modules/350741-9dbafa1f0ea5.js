// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  let r = "auth_token";
  var n = e.i(683023);
  let i = new Set(),
    s = null,
    o = null,
    a = null,
    l = null,
    u = null,
    c = !1;
  function h(e, t = Date.now()) {
    return !1;
  }
  function d(e, t = Date.now()) {
    return h(e, t);
  }
  function y() {
    let e = (function () {
        if ("u" < typeof document) return null;
        for (let e of document.cookie.split(";")) {
          let [t, ...n] = e.trim().split("=");
          if (t === r) return n.join("=") || null;
        }
        return null;
      })(),
      t = (function () {
        try {
          return localStorage.getItem("decoded-jwt");
        } catch {
          return null;
        }
      })();
    (e !== s || t !== o) &&
      ((s = e),
      (o = t),
      (a = (0, n.e)(e)),
      (l = t
        ? (function (e) {
            try {
              return (0, n.S)(JSON.parse(e));
            } catch {
              return null;
            }
          })(t)
        : null));
    let i = a && !d(a) ? a : null,
      c = l && !d(l) ? l : null,
      h = i ?? c;
    return (h !== u && (u = h), u);
  }
  function f() {
    return null;
  }
  function m() {
    for (let e of i) e();
  }
  function g() {}
  function p() {
    (m(), g());
  }
  function v(e) {
    return (
      i.add(e),
      c ||
        ((c = !0),
        window.addEventListener("focus", p),
        window.addEventListener("storage", p),
        document.addEventListener("visibilitychange", p),
        g()),
      () => {
        (i.delete(e),
          i.size > 0 ||
            (c &&
              (window.removeEventListener("focus", p),
              window.removeEventListener("storage", p),
              document.removeEventListener("visibilitychange", p),
              (c = !1)),
            g()));
      }
    );
  }
  function w() {
    (m(), g());
  }
  e.s(
    [
      "c",
      0,
      function () {
        if ("u" < typeof document) return;
        let e = "Max-Age=0; Path=/; SameSite=Lax";
        if (
          ((document.cookie = `${r}=; ${e}`),
          "u" > typeof location && location.hostname)
        ) {
          let t = location.hostname.split(".");
          for (let n = 0; n < t.length - 1; n += 1) {
            let i = t.slice(n).join(".");
            ((document.cookie = `${r}=; ${e}; Domain=${i}`),
              (document.cookie = `${r}=; ${e}; Domain=.${i}`));
          }
        }
        w();
      },
      "i",
      0,
      h,
      "I",
      0,
      w,
      "D",
      0,
      y,
      "s",
      0,
      function () {
        return (0, t.useSyncExternalStore)(v, y, f);
      },
    ],
    350741,
  );
};
