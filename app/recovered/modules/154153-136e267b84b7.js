// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    n = e.i(4327),
    i = e.i(952366);
  let a = "pump-inapp-auto-signin-opened";
  function l() {
    try {
      return "1" === sessionStorage.getItem(a);
    } catch {
      return !1;
    }
  }
  function s() {
    try {
      sessionStorage.setItem(a, "1");
    } catch {}
  }
  function o() {
    return (
      !("u" < typeof document) &&
      document.cookie.split("; ").includes(`${n.c}=true`)
    );
  }
  e.s([
    "x",
    0,
    o,
    "V",
    0,
    s,
    "W",
    0,
    function (e) {
      let a,
        c,
        u = (0, t.c)(5),
        { enabled: d, blocked: f, onAutoOpen: m } = e,
        p = void 0 !== f && f;
      (u[0] !== p || u[1] !== d || u[2] !== m
        ? ((a = () => {
            if (!d || p || l() || !(0, i.S)()) return;
            let e = function () {
              return !!l() || (!!o() && (m() && s(), !0));
            };
            if (e()) return;
            let t = (0, n.C)(() => {
              e() && t();
            });
            return t;
          }),
          (c = [d, p, m]),
          (u[0] = p),
          (u[1] = d),
          (u[2] = m),
          (u[3] = a),
          (u[4] = c))
        : ((a = u[3]), (c = u[4])),
        (0, r.useEffect)(a, c));
    },
  ]);
};
