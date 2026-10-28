// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(132232);
  let n = {};
  function r(e, n) {
    return i(n)
      ? n(e)
      : (function (e, n) {
          if (!n) return e;
          for (let r in n) {
            let i = n[r];
            switch (r) {
              case "style":
                e[r] = (0, t.f)(e.style, i);
                break;
              case "className":
                e[r] = s(e.className, i);
                break;
              default:
                !(function (e, t) {
                  let n = e.charCodeAt(0),
                    r = e.charCodeAt(1),
                    i = e.charCodeAt(2);
                  return (
                    111 === n &&
                    110 === r &&
                    i >= 65 &&
                    i <= 90 &&
                    ("function" == typeof t || void 0 === t)
                  );
                })(r, i)
                  ? (e[r] = i)
                  : (e[r] = (function (e, t) {
                      return t
                        ? e
                          ? (n) => {
                              var r;
                              if (
                                null != (r = n) &&
                                "object" == typeof r &&
                                "nativeEvent" in r
                              ) {
                                l(n);
                                let r = t(n);
                                return (n.baseUIHandlerPrevented || e?.(n), r);
                              }
                              let i = t(n);
                              return (e?.(n), i);
                            }
                          : t
                        : e;
                    })(e[r], i));
            }
          }
          return e;
        })(e, n);
  }
  function i(e) {
    return "function" == typeof e;
  }
  function o(e, t) {
    return i(e) ? e(t) : (e ?? n);
  }
  function l(e) {
    return (
      (e.preventBaseUIHandler = () => {
        e.baseUIHandlerPrevented = !0;
      }),
      e
    );
  }
  function s(e, t) {
    return t ? (e ? t + " " + e : t) : e;
  }
  e.s([
    "U",
    0,
    l,
    "c",
    0,
    s,
    "w",
    0,
    function (e, t, i, l, s) {
      let u = { ...o(e, n) };
      return (
        t && (u = r(u, t)),
        i && (u = r(u, i)),
        l && (u = r(u, l)),
        s && (u = r(u, s)),
        u
      );
    },
    "b",
    0,
    function (e) {
      if (0 === e.length) return n;
      if (1 === e.length) return o(e[0], n);
      let t = { ...o(e[0], n) };
      for (let n = 1; n < e.length; n += 1) t = r(t, e[n]);
      return t;
    },
  ]);
};
