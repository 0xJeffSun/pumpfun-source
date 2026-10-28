// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(254667),
    r = e.i(352386);
  let i = new Set(),
    o = new Set(),
    s = null,
    a = null,
    l = 0,
    u = !1,
    c = () => "u" > typeof document && "hidden" === document.visibilityState,
    f = () => {
      (null !== s && (window.cancelAnimationFrame(s), (s = null)),
        null !== a && (clearTimeout(a), (a = null)));
    },
    d = () => {
      if ((f(), l > 0)) return;
      let e = [...i];
      for (let t of (i.clear(), e))
        try {
          t();
        } catch (e) {
          n.y.error("[frameBatch] flush failed", { error: e });
        }
    },
    h = () => {
      c() && 0 !== i.size && d();
    },
    p = () => {
      if (null === s && null === a) {
        if (
          (!u &&
            "u" > typeof document &&
            (document.addEventListener("visibilitychange", h), (u = !0)),
          c() || "function" != typeof window.requestAnimationFrame)
        ) {
          a = setTimeout(d, 250);
          return;
        }
        ((s = window.requestAnimationFrame(d)), (a = setTimeout(d, 100)));
      }
    },
    g = (e) => {
      (i.add(e), l > 0 || p());
    };
  function m() {
    let e,
      t =
        ((l += 1),
        f(),
        (e = !1),
        () => {
          !e && ((e = !0), 0 === (l = Math.max(0, l - 1)) && i.size > 0 && p());
        }),
      n = !1,
      r = null,
      o = null,
      s = () => {
        ((n = !0),
          null !== r && window.cancelAnimationFrame(r),
          null !== o && clearTimeout(o),
          t());
      },
      a = () => {
        !n && (s(), l > 0 || d());
      };
    return (
      "function" == typeof window.requestAnimationFrame &&
        (r = window.requestAnimationFrame(a)),
      (o = setTimeout(a, 250)),
      () => {
        n || s();
      }
    );
  }
  e.s([
    "H",
    0,
    ({ onFlush: e, merge: t }) => {
      let n = new Map(),
        r = () => {
          if (0 === n.size) return;
          let t = new Map(n);
          (n.clear(), e(t));
        },
        i = {
          set: (e, i) => {
            let o = n.get(e);
            (n.set(e, t && n.has(e) ? t(o, i) : i), g(r));
          },
          peek: (e) => n.get(e),
          clear: () => n.clear(),
          flush: r,
          get size() {
            return n.size;
          },
        };
      return (o.add(i), i);
    },
    "_",
    0,
    g,
    "J",
    0,
    (e) => {
      let n,
        i = (0, t.c)(2);
      (i[0] !== e ? ((n = [e]), (i[0] = e), (i[1] = n)) : (n = i[1]),
        (0, r.useEffect)(m, n));
    },
  ]);
};
