// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(972889),
    i = e.i(474032),
    r = e.i(186645),
    n = e.i(508578),
    a = e.i(155458),
    o = e.i(352386),
    s = e.i(329041),
    l = e.i(430663),
    u = e.i(1807);
  let c = (e) => (t, c) => {
    let d = (0, o.useContext)(s.f),
      f = (0, o.useContext)(l.f),
      m = () =>
        (function (
          { scrapeMotionValuesFromProps: e, createRenderState: t },
          o,
          s,
          l,
        ) {
          return {
            latestValues: (function (e, t, o, s) {
              let l = {},
                u = s(e, {});
              for (let e in u) l[e] = (0, i.f)(u[e]);
              let { initial: c, animate: d } = e,
                f = (0, r.m)(e),
                m = (0, r.I)(e);
              t &&
                m &&
                !f &&
                !1 !== e.inherit &&
                (void 0 === c && (c = t.initial),
                void 0 === d && (d = t.animate));
              let h = !!o && !1 === o.initial,
                p = (h = h || !1 === c) ? d : c;
              if (p && "boolean" != typeof p && !(0, n.f)(p)) {
                let t = Array.isArray(p) ? p : [p];
                for (let i = 0; i < t.length; i++) {
                  let r = (0, a.f)(e, t[i]);
                  if (r) {
                    let { transitionEnd: e, transition: t, ...i } = r;
                    for (let e in i) {
                      let t = i[e];
                      if (Array.isArray(t)) {
                        let e = h ? t.length - 1 : 0;
                        t = t[e];
                      }
                      null !== t && (l[e] = t);
                    }
                    for (let t in e) l[t] = e[t];
                  }
                }
              }
              return l;
            })(o, s, l, e),
            renderState: t(),
          };
        })(e, t, d, f);
    return c ? m() : (0, u.f)(m);
  };
  var d = e.i(799819);
  let f = c({ scrapeMotionValuesFromProps: t.f, createRenderState: d.f });
  e.s(["f", 0, f], 679895);
  var m = e.i(639190),
    m = m,
    h = e.i(775501);
  let p = c({ scrapeMotionValuesFromProps: m.f, createRenderState: h.f });
  e.s(["f", 0, p], 725692);
};
