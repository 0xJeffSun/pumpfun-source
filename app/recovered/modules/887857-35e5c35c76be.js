// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    r = e.i(183249),
    o = e.i(811369),
    n = e.i(612735),
    s = e.i(989494),
    a = e.i(449985),
    i = e.i(108270),
    c = e.i(382772),
    l = e.i(19648);
  function u(e, t = {}) {
    void 0 !== t.size && (0, c.u)(e, { size: t.size });
    let r = (0, l.v)(e, t);
    return (0, c.T)(r, t);
  }
  var d = e.i(590719),
    f = e.i(971860);
  function h(e) {
    let { type: t } = e;
    if ("string" === t || "bytes" === t || t.endsWith("[]")) return !0;
    if ("tuple" === t) return e.components?.some(h);
    let r = (0, f.t)(e.type);
    return !!(r && h({ ...e, type: r[1] }));
  }
  e.s(
    [
      "f",
      0,
      function (e, b) {
        let p = "string" == typeof b ? (0, d.X)(b) : b,
          m = (0, o.f)(p);
        if (0 === (0, n.f)(p) && e.length > 0) throw new t.g();
        if ((0, n.f)(b) && 32 > (0, n.f)(b))
          throw new t.D({
            data: "string" == typeof b ? b : (0, l.v)(b),
            params: e,
            size: (0, n.f)(b),
          });
        let g = 0,
          y = [];
        for (let o = 0; o < e.length; ++o) {
          let n = e[o];
          m.setPosition(g);
          let [d, b] = (function e(o, n, { staticPosition: d }) {
            let b = (0, f.t)(n.type);
            if (b) {
              let [t, r] = b;
              return (function (t, r, { length: o, staticPosition: n }) {
                if (!o) {
                  let o = n + u(t.readBytes(32)),
                    s = o + 32;
                  t.setPosition(o);
                  let a = u(t.readBytes(32)),
                    i = h(r),
                    c = 0,
                    l = [];
                  for (let o = 0; o < a; ++o) {
                    t.setPosition(s + (i ? 32 * o : c));
                    let [n, a] = e(t, r, { staticPosition: s });
                    ((c += a), l.push(n));
                  }
                  return (t.setPosition(n + 32), [l, 32]);
                }
                if (h(r)) {
                  let s = n + u(t.readBytes(32)),
                    a = [];
                  for (let n = 0; n < o; ++n) {
                    t.setPosition(s + 32 * n);
                    let [o] = e(t, r, { staticPosition: s });
                    a.push(o);
                  }
                  return (t.setPosition(n + 32), [a, 32]);
                }
                let s = 0,
                  a = [];
                for (let i = 0; i < o; ++i) {
                  let [o, i] = e(t, r, { staticPosition: n + s });
                  ((s += i), a.push(o));
                }
                return [a, s];
              })(o, { ...n, type: r }, { length: t, staticPosition: d });
            }
            if ("tuple" === n.type)
              return (function (t, r, { staticPosition: o }) {
                let n =
                    0 === r.components.length ||
                    r.components.some(({ name: e }) => !e),
                  s = n ? [] : {},
                  a = 0;
                if (h(r)) {
                  let i = o + u(t.readBytes(32));
                  for (let o = 0; o < r.components.length; ++o) {
                    let c = r.components[o];
                    t.setPosition(i + a);
                    let [l, u] = e(t, c, { staticPosition: i });
                    ((a += u), (s[n ? o : c?.name] = l));
                  }
                  return (t.setPosition(o + 32), [s, 32]);
                }
                for (let i = 0; i < r.components.length; ++i) {
                  let c = r.components[i],
                    [l, u] = e(t, c, { staticPosition: o });
                  ((s[n ? i : c?.name] = l), (a += u));
                }
                return [s, a];
              })(o, n, { staticPosition: d });
            if ("address" === n.type) {
              let e;
              return (
                (e = o.readBytes(32)),
                [(0, r.b)((0, l.v)((0, s.S)(e, -20))), 32]
              );
            }
            if ("bool" === n.type)
              return [
                (function (e, t = {}) {
                  let r = e;
                  if (
                    (void 0 !== t.size &&
                      ((0, c.u)(r, { size: t.size }), (r = (0, a.f)(r))),
                    r.length > 1 || r[0] > 1)
                  )
                    throw new i.C(r);
                  return !!r[0];
                })(o.readBytes(32), { size: 32 }),
                32,
              ];
            if (n.type.startsWith("bytes"))
              return (function (e, t, { staticPosition: r }) {
                let [o, n] = t.type.split("bytes");
                if (!n) {
                  let t = u(e.readBytes(32));
                  e.setPosition(r + t);
                  let o = u(e.readBytes(32));
                  if (0 === o) return (e.setPosition(r + 32), ["0x", 32]);
                  let n = e.readBytes(o);
                  return (e.setPosition(r + 32), [(0, l.v)(n), 32]);
                }
                return [(0, l.v)(e.readBytes(Number.parseInt(n, 10), 32)), 32];
              })(o, n, { staticPosition: d });
            if (n.type.startsWith("uint") || n.type.startsWith("int")) {
              var p, m;
              let e, t, r;
              return (
                (p = o),
                (e = (m = n).type.startsWith("int")),
                (t = Number.parseInt(m.type.split("int")[1] || "256", 10)),
                (r = p.readBytes(32)),
                [
                  t > 48
                    ? (function (e, t = {}) {
                        void 0 !== t.size && (0, c.u)(e, { size: t.size });
                        let r = (0, l.v)(e, t);
                        return (0, c.K)(r, t);
                      })(r, { signed: e })
                    : u(r, { signed: e }),
                  32,
                ]
              );
            }
            if ("string" === n.type)
              return (function (e, { staticPosition: t }) {
                let r = u(e.readBytes(32));
                e.setPosition(t + r);
                let o = u(e.readBytes(32));
                if (0 === o) return (e.setPosition(t + 32), ["", 32]);
                let n = e.readBytes(o, 32),
                  s = (function (e, t = {}) {
                    let r = e;
                    return (
                      void 0 !== t.size &&
                        ((0, c.u)(r, { size: t.size }),
                        (r = (0, a.f)(r, { dir: "right" }))),
                      new TextDecoder().decode(r)
                    );
                  })((0, a.f)(n));
                return (e.setPosition(t + 32), [s, 32]);
              })(o, { staticPosition: d });
            throw new t.l(n.type, {
              docsPath: "/docs/contract/decodeAbiParameters",
            });
          })(m, n, { staticPosition: 0 });
          ((g += b), y.push(d));
        }
        return y;
      },
    ],
    887857,
  );
};
