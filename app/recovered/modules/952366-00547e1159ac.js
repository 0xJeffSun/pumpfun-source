// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  let n = "pump-recent-auth-method",
    i = ["google", "apple", "twitter", "github"];
  function l(e) {
    return i.includes(e);
  }
  function a(e) {
    if (!e) return null;
    try {
      let t = JSON.parse(e);
      if (t?.kind === "wallet" && "string" == typeof t.name && t.name)
        return { kind: "wallet", name: t.name };
      if (t?.kind === "oauth" && "string" == typeof t.provider && l(t.provider))
        return { kind: "oauth", provider: t.provider };
      if (t?.kind === "email") return { kind: "email" };
    } catch {}
    return null;
  }
  function o() {
    try {
      let e = a(window.localStorage.getItem(n));
      if (e) return e;
      let t = window.localStorage.getItem("pump-recent-wallet");
      if (t) return { kind: "wallet", name: t };
    } catch {}
    return null;
  }
  function s(e) {
    try {
      window.localStorage.setItem(n, JSON.stringify(e));
    } catch {}
  }
  e.s([
    "B",
    0,
    function (e) {
      try {
        let t = a(window.localStorage.getItem(n));
        t && e(t) && window.localStorage.removeItem(n);
      } catch {}
    },
    "F",
    0,
    l,
    "S",
    0,
    o,
    "Z",
    0,
    function () {
      let e,
        n,
        i,
        l,
        a = (0, t.c)(6),
        [u, d] = (0, r.useState)(null),
        [c, p] = (0, r.useState)(!1);
      (a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = () => {
            (d(o()), p(!0));
          }),
          (n = []),
          (a[0] = e),
          (a[1] = n))
        : ((e = a[0]), (n = a[1])),
        (0, r.useEffect)(e, n),
        a[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (e) => {
              (d(e), s(e));
            }),
            (a[2] = i))
          : (i = a[2]));
      let f = i;
      return (
        a[3] !== c || a[4] !== u
          ? ((l = {
              recentAuthMethod: u,
              recentAuthMethodReady: c,
              rememberAuthMethod: f,
            }),
            (a[3] = c),
            (a[4] = u),
            (a[5] = l))
          : (l = a[5]),
        l
      );
    },
    "V",
    0,
    s,
  ]);
};
