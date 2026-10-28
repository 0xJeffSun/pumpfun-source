// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(278051),
    r = e.i(231332),
    i = e.i(575272);
  function o(e) {
    return null == e ? e : "current" in e ? e.current : e;
  }
  e.s(["f", 0, o], 701042);
  var l = e.i(810954);
  function s(e, t = !1, u = !0) {
    let a = (0, i.z)();
    return (0, n.f)((n, i = null) => {
      function s() {
        r.flushSync(n);
      }
      a.cancel();
      let c = o(e);
      if (null != c)
        if (
          "function" != typeof c.getAnimations ||
          globalThis.BASE_UI_ANIMATIONS_DISABLED
        )
          n();
        else {
          function f() {
            Promise.all(c.getAnimations().map((e) => e.finished))
              .then(() => {
                i?.aborted || s();
              })
              .catch(() => {
                let e = c.getAnimations();
                if (u) {
                  if (i?.aborted) return;
                  s();
                } else
                  e.length > 0 &&
                    e.some((e) => e.pending || "finished" !== e.playState) &&
                    f();
              });
          }
          if (t)
            return void (function () {
              let e = l.S.startingStyle;
              if (!c.hasAttribute(e)) return a.request(f);
              let t = new MutationObserver(() => {
                c.hasAttribute(e) || (t.disconnect(), f());
              });
              (t.observe(c, { attributes: !0, attributeFilter: [e] }),
                i?.addEventListener("abort", () => t.disconnect(), {
                  once: !0,
                }));
            })();
          a.request(f);
        }
    });
  }
  (e.s(["f", 0, s], 67467),
    e.s(
      [
        "f",
        0,
        function (e) {
          let { enabled: r = !0, open: i, ref: o, onComplete: l } = e,
            u = (0, n.f)(l),
            a = s(o, i, !1);
          t.useEffect(() => {
            if (!r) return;
            let e = new AbortController();
            return (
              a(u, e.signal),
              () => {
                e.abort();
              }
            );
          }, [r, i, u, a]);
        },
      ],
      24542,
    ));
};
