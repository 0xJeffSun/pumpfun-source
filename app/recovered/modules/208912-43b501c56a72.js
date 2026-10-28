// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(292686),
    r = e.i(432405);
  let n = null,
    i = !1,
    a = (e) => (e.length > 1 && e.endsWith("/") ? e.slice(0, -1) : e),
    l = ({ pathname: e, entryPoint: t, now: r = Date.now() }) => {
      n = { pathname: a(e), entryPoint: t, at: r };
    },
    s = (e, t) =>
      null !== n && n.pathname === e && t - n.at < 3e4 ? n.entryPoint : null;
  e.s([
    "x",
    0,
    ({ pathname: e, now: r = Date.now() }) => {
      let l = a(e),
        o = s(l, r);
      n?.pathname === l && (n = null);
      let c =
        !i &&
        (() => {
          if ("u" < typeof performance) return null;
          let [e] = performance.getEntriesByType?.("navigation") ?? [];
          if (
            void 0 === e ||
            ("type" in e && ("reload" === e.type || "back_forward" === e.type))
          )
            return null;
          try {
            return a(new URL(e.name).pathname);
          } catch {
            return null;
          }
        })() === l;
      return (c && (i = !0), o ?? (c ? t.z.DEEPLINK : null));
    },
    "G",
    0,
    ({ pathname: e, now: t = Date.now() }) => null !== s(a(e), t),
    "K",
    0,
    l,
    "n",
    0,
    ({ href: e, entryPoint: t }) => {
      let r;
      try {
        r = a(new URL(e, window.location.origin).pathname);
      } catch {
        return;
      }
      ("/messages" === r || r.startsWith("/messages/")) &&
        a(window.location.pathname) !== r &&
        l({ pathname: r, entryPoint: t });
    },
    "L",
    0,
    ({ pathname: e, entryPoint: t, onClick: n }) =>
      (i) => {
        ((0, r.f)(i) &&
          a(window.location.pathname) !== a(e) &&
          l({ pathname: e, entryPoint: t }),
          n?.(i));
      },
  ]);
};
