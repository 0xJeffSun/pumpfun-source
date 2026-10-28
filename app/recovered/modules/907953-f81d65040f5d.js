// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(120194);
  let i = {};
  t.s(["f", 0, i], 719372);
  let s = [
      "setup",
      "read",
      "resolveKeyframes",
      "preUpdate",
      "update",
      "preRender",
      "render",
      "postRender",
    ],
    r = { value: null, addProjectionMetrics: null };
  function n(t, e) {
    let n = !1,
      a = !0,
      o = { delta: 0, timestamp: 0, isProcessing: !1 },
      l = () => (n = !0),
      h = s.reduce(
        (t, i) => (
          (t[i] = (function (t, e) {
            let i = new Set(),
              s = new Set(),
              n = !1,
              a = !1,
              o = new WeakSet(),
              l = { delta: 0, timestamp: 0, isProcessing: !1 },
              h = 0;
            function u(e) {
              (o.has(e) && (f.schedule(e), t()), h++, e(l));
            }
            let f = {
              schedule: (t, e = !1, r = !1) => {
                let a = r && n ? i : s;
                return (e && o.add(t), a.add(t), t);
              },
              cancel: (t) => {
                (s.delete(t), o.delete(t));
              },
              process: (t) => {
                if (((l = t), n)) {
                  a = !0;
                  return;
                }
                n = !0;
                let o = i;
                ((i = s),
                  (s = o),
                  i.forEach(u),
                  e && r.value && r.value.frameloop[e].push(h),
                  (h = 0),
                  i.clear(),
                  (n = !1),
                  a && ((a = !1), f.process(t)));
              },
            };
            return f;
          })(l, e ? i : void 0)),
          t
        ),
        {},
      ),
      {
        setup: u,
        read: f,
        resolveKeyframes: d,
        preUpdate: p,
        update: c,
        preRender: m,
        render: g,
        postRender: v,
      } = h,
      y = () => {
        let s = i.useManualTiming,
          r = s ? o.timestamp : performance.now();
        ((n = !1),
          s ||
            (o.delta = a
              ? 1e3 / 60
              : Math.max(Math.min(r - o.timestamp, 40), 1)),
          (o.timestamp = r),
          (o.isProcessing = !0),
          u.process(o),
          f.process(o),
          d.process(o),
          p.process(o),
          c.process(o),
          m.process(o),
          g.process(o),
          v.process(o),
          (o.isProcessing = !1),
          n && e && ((a = !1), t(y)));
      };
    return {
      schedule: s.reduce((e, i) => {
        let s = h[i];
        return (
          (e[i] = (e, i = !1, r = !1) => (
            !n && ((n = !0), (a = !0), o.isProcessing || t(y)),
            s.schedule(e, i, r)
          )),
          e
        );
      }, {}),
      cancel: (t) => {
        for (let e = 0; e < s.length; e++) h[s[e]].cancel(t);
      },
      state: o,
      steps: h,
    };
  }
  (t.s(["f", 0, r], 187067), t.s(["f", 0, n], 240415));
  let {
    schedule: a,
    cancel: o,
    state: l,
    steps: h,
  } = n("u" > typeof requestAnimationFrame ? requestAnimationFrame : e.f, !0);
  t.s(["Y", 0, o, "y", 0, a, "I", 0, l, "q", 0, h], 907953);
};
