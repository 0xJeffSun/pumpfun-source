// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t, n, r;
  function i() {
    return null != t
      ? t
      : (t = (function (e = window) {
          var t;
          let n = e.navigator.userAgent;
          return e.chrome || /HeadlessChrome/.test(n)
            ? 0
            : (null == (t = e.navigator.vendor)
                  ? void 0
                  : t.indexOf("Apple")) === 0 ||
                (/safari/i.test(n) && !/chrome|android/i.test(n))
              ? 1
              : 2;
        })());
  }
  e.s(
    [
      "d",
      0,
      function () {
        return 0 === i();
      },
      "G",
      0,
      function () {
        return 1 === i();
      },
    ],
    801457,
  );
  var o = e.i(895453),
    s = e.i(775975),
    u = e.i(839476),
    a = e.i(141898);
  function l(e, t, n = 0, r) {
    let i = new Date();
    i.setTime(i.getTime() + n);
    let o = `expires=${i.toUTCString()}`,
      s = r && r.crossSite ? "none" : "strict",
      u = r && r.domain ? `;domain=${r.domain}` : "",
      a = r && r.secure ? ";secure" : "",
      c = r && r.partitioned ? ";partitioned" : "";
    document.cookie = `${e}=${t};${o};path=/;samesite=${s}${u}${a}${c}`;
  }
  function c(e) {
    return (0, u.H)(document.cookie, e);
  }
  (e.s(
    [
      "h",
      0,
      function (e) {
        if (void 0 === document.cookie || null === document.cookie) return !1;
        try {
          let t = `dd_cookie_test_${(0, u.o)()}`,
            n = "test";
          l(t, n, s._, e);
          let r = c(t) === n;
          return (l(t, "", 0, e), r);
        } catch (e) {
          return (o.s.error(e), !1);
        }
      },
      "Z",
      0,
      c,
      "V",
      0,
      function (e = location.hostname, t = document.referrer) {
        if (void 0 === r) {
          let n = (function (e, t) {
            try {
              return e || (0, a.d)(t).hostname;
            } catch (e) {}
          })(e, t);
          if (n) {
            let e = `dd_site_test_${(0, u.o)()}`,
              t = n.split("."),
              i = t.pop();
            for (; t.length && !c(e); )
              ((i = `${t.pop()}.${i}`), l(e, "test", s.R, { domain: i }));
            (l(e, "", 0, { domain: i }), (r = i));
          }
        }
        return r;
      },
      "P",
      0,
      function (e) {
        return (n || (n = (0, u.w)(document.cookie)), n.get(e));
      },
      "d",
      0,
      l,
    ],
    484247,
  ),
    e.s(["f", 0, "_dd_s"], 944767));
};
