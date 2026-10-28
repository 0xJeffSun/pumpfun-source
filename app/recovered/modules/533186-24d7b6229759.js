// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = (t, e) => (e && "number" == typeof t ? e.transform(t) : t);
  var i = t.i(878124),
    s = t.i(59778),
    r = t.i(995905);
  let n = {
      x: "translateX",
      y: "translateY",
      z: "translateZ",
      transformPerspective: "perspective",
    },
    a = s.$.length;
  function o(t, o, l) {
    let { style: h, vars: u, transformOrigin: f } = t,
      d = !1,
      p = !1;
    for (let t in o) {
      let n = o[t];
      if (s.P.has(t)) {
        d = !0;
        continue;
      }
      if ((0, r.A)(t)) {
        u[t] = n;
        continue;
      }
      {
        let s = e(n, i.f[t]);
        t.startsWith("origin") ? ((p = !0), (f[t] = s)) : (h[t] = s);
      }
    }
    if (
      (!o.transform &&
        (d || l
          ? (h.transform = (function (t, r, o) {
              let l = "",
                h = !0;
              for (let u = 0; u < a; u++) {
                let a = s.$[u],
                  f = t[a];
                if (void 0 === f) continue;
                let d = !0;
                if ("number" == typeof f) d = f === +!!a.startsWith("scale");
                else {
                  let t = parseFloat(f);
                  d = a.startsWith("scale") ? 1 === t : 0 === t;
                }
                if (!d || o) {
                  let t = e(f, i.f[a]);
                  if (!d) {
                    h = !1;
                    let e = n[a] || a;
                    l += `${e}(${t}) `;
                  }
                  o && (r[a] = t);
                }
              }
              let u = t.pathRotation;
              return (
                u && ((h = !1), (l += `rotate(${e(u, i.f.pathRotation)}) `)),
                (l = l.trim()),
                o ? (l = o(r, h ? "" : l)) : h && (l = "none"),
                l
              );
            })(o, t.transform, l))
          : h.transform && (h.transform = "none")),
      p)
    ) {
      let { originX: t = "50%", originY: e = "50%", originZ: i = 0 } = f;
      h.transformOrigin = `${t} ${e} ${i}`;
    }
  }
  t.s(["f", 0, o], 6778);
  let l = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
    h = { offset: "strokeDashoffset", array: "strokeDasharray" },
    u = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];
  (t.s(
    [
      "f",
      0,
      function (
        t,
        {
          attrX: e,
          attrY: i,
          attrScale: s,
          pathLength: r,
          pathSpacing: n = 1,
          pathOffset: a = 0,
          ...f
        },
        d,
        p,
        c,
      ) {
        if ((o(t, f, p), d)) {
          t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
          return;
        }
        ((t.attrs = t.style), (t.style = {}));
        let { attrs: m, style: g } = t;
        for (let t of (m.transform &&
          ((g.transform = m.transform), delete m.transform),
        (g.transform || m.transformOrigin) &&
          ((g.transformOrigin = m.transformOrigin ?? "50% 50%"),
          delete m.transformOrigin),
        g.transform &&
          ((g.transformBox = c?.transformBox ?? "fill-box"),
          delete m.transformBox),
        u))
          void 0 !== m[t] && ((g[t] = m[t]), delete m[t]);
        (void 0 !== e && (m.x = e),
          void 0 !== i && (m.y = i),
          void 0 !== s && (m.scale = s),
          void 0 !== r &&
            (function (t, e, i = 1, s = 0, r = !0) {
              t.pathLength = 1;
              let n = r ? l : h;
              ((t[n.offset] = `${-s}`), (t[n.array] = `${e} ${i}`));
            })(m, r, n, a, !1));
      },
    ],
    533186,
  ),
    t.s(
      ["f", 0, (t) => "string" == typeof t && "svg" === t.toLowerCase()],
      140109,
    ));
};
