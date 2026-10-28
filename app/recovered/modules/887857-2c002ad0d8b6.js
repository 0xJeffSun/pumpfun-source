// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    r = e.i(183249),
    n = e.i(811369),
    a = e.i(612735),
    i = e.i(989494),
    s = e.i(449985),
    o = e.i(108270),
    c = e.i(382772),
    l = e.i(19648);
  function u(e, t = {}) {
    void 0 !== t.size && (0, c.u)(e, { size: t.size });
    let r = (0, l.v)(e, t);
    return (0, c.T)(r, t);
  }
  var f = e.i(590719),
    d = e.i(971860);
  function p(e) {
    let { type: t } = e;
    if ("string" === t || "bytes" === t || t.endsWith("[]")) return !0;
    if ("tuple" === t) return e.components?.some(p);
    let r = (0, d.t)(e.type);
    return !!(r && p({ ...e, type: r[1] }));
  }
  e.s(
    [
      "f",
      0,
      function (e, h) {
        let m = "string" == typeof h ? (0, f.X)(h) : h,
          y = (0, n.f)(m);
        if (0 === (0, a.f)(m) && e.length > 0) throw new t.g();
        if ((0, a.f)(h) && 32 > (0, a.f)(h))
          throw new t.D({
            data: "string" == typeof h ? h : (0, l.v)(h),
            params: e,
            size: (0, a.f)(h),
          });
        let b = 0,
          g = [];
        for (let n = 0; n < e.length; ++n) {
          let a = e[n];
          y.setPosition(b);
          let [f, h] = (function e(n, a, { staticPosition: f }) {
            let h = (0, d.t)(a.type);
            if (h) {
              let [t, r] = h;
              return (function (t, r, { length: n, staticPosition: a }) {
                if (!n) {
                  let n = a + u(t.readBytes(32)),
                    i = n + 32;
                  t.setPosition(n);
                  let s = u(t.readBytes(32)),
                    o = p(r),
                    c = 0,
                    l = [];
                  for (let n = 0; n < s; ++n) {
                    t.setPosition(i + (o ? 32 * n : c));
                    let [a, s] = e(t, r, { staticPosition: i });
                    ((c += s), l.push(a));
                  }
                  return (t.setPosition(a + 32), [l, 32]);
                }
                if (p(r)) {
                  let i = a + u(t.readBytes(32)),
                    s = [];
                  for (let a = 0; a < n; ++a) {
                    t.setPosition(i + 32 * a);
                    let [n] = e(t, r, { staticPosition: i });
                    s.push(n);
                  }
                  return (t.setPosition(a + 32), [s, 32]);
                }
                let i = 0,
                  s = [];
                for (let o = 0; o < n; ++o) {
                  let [n, o] = e(t, r, { staticPosition: a + i });
                  ((i += o), s.push(n));
                }
                return [s, i];
              })(n, { ...a, type: r }, { length: t, staticPosition: f });
            }
            if ("tuple" === a.type)
              return (function (t, r, { staticPosition: n }) {
                let a =
                    0 === r.components.length ||
                    r.components.some(({ name: e }) => !e),
                  i = a ? [] : {},
                  s = 0;
                if (p(r)) {
                  let o = n + u(t.readBytes(32));
                  for (let n = 0; n < r.components.length; ++n) {
                    let c = r.components[n];
                    t.setPosition(o + s);
                    let [l, u] = e(t, c, { staticPosition: o });
                    ((s += u), (i[a ? n : c?.name] = l));
                  }
                  return (t.setPosition(n + 32), [i, 32]);
                }
                for (let o = 0; o < r.components.length; ++o) {
                  let c = r.components[o],
                    [l, u] = e(t, c, { staticPosition: n });
                  ((i[a ? o : c?.name] = l), (s += u));
                }
                return [i, s];
              })(n, a, { staticPosition: f });
            if ("address" === a.type) {
              let e;
              return (
                (e = n.readBytes(32)),
                [(0, r.b)((0, l.v)((0, i.S)(e, -20))), 32]
              );
            }
            if ("bool" === a.type)
              return [
                (function (e, t = {}) {
                  let r = e;
                  if (
                    (void 0 !== t.size &&
                      ((0, c.u)(r, { size: t.size }), (r = (0, s.f)(r))),
                    r.length > 1 || r[0] > 1)
                  )
                    throw new o.C(r);
                  return !!r[0];
                })(n.readBytes(32), { size: 32 }),
                32,
              ];
            if (a.type.startsWith("bytes"))
              return (function (e, t, { staticPosition: r }) {
                let [n, a] = t.type.split("bytes");
                if (!a) {
                  let t = u(e.readBytes(32));
                  e.setPosition(r + t);
                  let n = u(e.readBytes(32));
                  if (0 === n) return (e.setPosition(r + 32), ["0x", 32]);
                  let a = e.readBytes(n);
                  return (e.setPosition(r + 32), [(0, l.v)(a), 32]);
                }
                return [(0, l.v)(e.readBytes(Number.parseInt(a, 10), 32)), 32];
              })(n, a, { staticPosition: f });
            if (a.type.startsWith("uint") || a.type.startsWith("int")) {
              var m, y;
              let e, t, r;
              return (
                (m = n),
                (e = (y = a).type.startsWith("int")),
                (t = Number.parseInt(y.type.split("int")[1] || "256", 10)),
                (r = m.readBytes(32)),
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
            if ("string" === a.type)
              return (function (e, { staticPosition: t }) {
                let r = u(e.readBytes(32));
                e.setPosition(t + r);
                let n = u(e.readBytes(32));
                if (0 === n) return (e.setPosition(t + 32), ["", 32]);
                let a = e.readBytes(n, 32),
                  i = (function (e, t = {}) {
                    let r = e;
                    return (
                      void 0 !== t.size &&
                        ((0, c.u)(r, { size: t.size }),
                        (r = (0, s.f)(r, { dir: "right" }))),
                      new TextDecoder().decode(r)
                    );
                  })((0, s.f)(a));
                return (e.setPosition(t + 32), [i, 32]);
              })(n, { staticPosition: f });
            throw new t.l(a.type, {
              docsPath: "/docs/contract/decodeAbiParameters",
            });
          })(y, a, { staticPosition: 0 });
          ((b += h), g.push(f));
        }
        return g;
      },
    ],
    887857,
  );
};
