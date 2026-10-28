// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(702232),
    n = e.i(352386),
    r = e.i(617821),
    i = e.i(593260),
    o = e.i(132232);
  e.i(786437);
  var l = e.i(143611),
    s = e.i(719878),
    u = e.i(765671),
    a = e.i(309899),
    c = e.i(297454);
  let f = Symbol.for("react.lazy");
  e.s([
    "f",
    0,
    function (e, d, p = {}) {
      let g = d.render,
        h = (function (e, t = {}) {
          let { className: n, style: f, render: d } = e,
            {
              state: p = c.w,
              ref: g,
              props: h,
              stateAttributesMapping: m,
              enabled: v = !0,
            } = t,
            y = v ? (0, s.f)(n, p) : void 0,
            b = v ? (0, u.f)(f, p) : void 0,
            w = v ? (0, l.f)(p, m) : c.w,
            E = v
              ? ((0, o.f)(w, Array.isArray(h) ? (0, a.b)(h) : h) ?? c.w)
              : c.w;
          return ("u" > typeof document &&
            (v
              ? Array.isArray(g)
                ? (E.ref = (0, r.f)([E.ref, (0, i.f)(d), ...g]))
                : (E.ref = (0, r.A)(E.ref, (0, i.f)(d), g))
              : (0, r.A)(null, null)),
          v)
            ? (void 0 !== y && (E.className = (0, a.c)(E.className, y)),
              void 0 !== b && (E.style = (0, o.f)(E.style, b)),
              E)
            : c.w;
        })(d, p);
      return !1 === p.enabled
        ? null
        : (function (e, r, i, o) {
            if (r) {
              if ("function" == typeof r) return r(i, o);
              let e = (0, a.w)(i, r.props);
              e.ref = i.ref;
              let t = r;
              return (
                t?.$$typeof === f && (t = n.Children.toArray(r)[0]),
                n.cloneElement(t, e)
              );
            }
            if (e && "string" == typeof e) {
              var l, s;
              return (
                (l = e),
                (s = i),
                "button" === l
                  ? (0, n.createElement)("button", {
                      type: "button",
                      ...s,
                      key: s.key,
                    })
                  : "img" === l
                    ? (0, n.createElement)("img", { alt: "", ...s, key: s.key })
                    : n.createElement(l, s)
              );
            }
            throw Error((0, t.f)(8));
          })(e, g, h, p.state ?? c.w);
    },
  ]);
};
