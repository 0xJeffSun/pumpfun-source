// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(254667),
    r = e.i(352386);
  let i = new Set(),
    l = new Set(),
    a = null,
    o = null,
    s = 0,
    u = !1,
    d = () => "u" > typeof document && "hidden" === document.visibilityState,
    c = () => {
      (null !== a && (window.cancelAnimationFrame(a), (a = null)),
        null !== o && (clearTimeout(o), (o = null)));
    },
    f = () => {
      if ((c(), s > 0)) return;
      let e = [...i];
      for (let t of (i.clear(), e))
        try {
          t();
        } catch (e) {
          n.y.error("[frameBatch] flush failed", { error: e });
        }
    },
    m = () => {
      d() && 0 !== i.size && f();
    },
    p = () => {
      if (null === a && null === o) {
        if (
          (!u &&
            "u" > typeof document &&
            (document.addEventListener("visibilitychange", m), (u = !0)),
          d() || "function" != typeof window.requestAnimationFrame)
        ) {
          o = setTimeout(f, 250);
          return;
        }
        ((a = window.requestAnimationFrame(f)), (o = setTimeout(f, 100)));
      }
    },
    h = (e) => {
      (i.add(e), s > 0 || p());
    };
  function y() {
    let e,
      t =
        ((s += 1),
        c(),
        (e = !1),
        () => {
          !e && ((e = !0), 0 === (s = Math.max(0, s - 1)) && i.size > 0 && p());
        }),
      n = !1,
      r = null,
      l = null,
      a = () => {
        ((n = !0),
          null !== r && window.cancelAnimationFrame(r),
          null !== l && clearTimeout(l),
          t());
      },
      o = () => {
        !n && (a(), s > 0 || f());
      };
    return (
      "function" == typeof window.requestAnimationFrame &&
        (r = window.requestAnimationFrame(o)),
      (l = setTimeout(o, 250)),
      () => {
        n || a();
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
            let l = n.get(e);
            (n.set(e, t && n.has(e) ? t(l, i) : i), h(r));
          },
          peek: (e) => n.get(e),
          clear: () => n.clear(),
          flush: r,
          get size() {
            return n.size;
          },
        };
      return (l.add(i), i);
    },
    "_",
    0,
    h,
    "J",
    0,
    (e) => {
      let n,
        i = (0, t.c)(2);
      (i[0] !== e ? ((n = [e]), (i[0] = e), (i[1] = n)) : (n = i[1]),
        (0, r.useEffect)(y, n));
    },
  ]);
};
