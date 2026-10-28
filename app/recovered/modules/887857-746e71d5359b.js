// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    r = e.i(183249),
    n = e.i(811369),
    o = e.i(612735),
    s = e.i(989494),
    a = e.i(449985),
    i = e.i(108270),
    c = e.i(382772),
    u = e.i(19648);
  function d(e, t = {}) {
    void 0 !== t.size && (0, c.u)(e, { size: t.size });
    let r = (0, u.v)(e, t);
    return (0, c.T)(r, t);
  }
  var l = e.i(590719),
    f = e.i(971860);
  function p(e) {
    let { type: t } = e;
    if ("string" === t || "bytes" === t || t.endsWith("[]")) return !0;
    if ("tuple" === t) return e.components?.some(p);
    let r = (0, f.t)(e.type);
    return !!(r && p({ ...e, type: r[1] }));
  }
  e.s(
    [
      "f",
      0,
      function (e, h) {
        let m = "string" == typeof h ? (0, l.X)(h) : h,
          b = (0, n.f)(m);
        if (0 === (0, o.f)(m) && e.length > 0) throw new t.g();
        if ((0, o.f)(h) && 32 > (0, o.f)(h))
          throw new t.D({
            data: "string" == typeof h ? h : (0, u.v)(h),
            params: e,
            size: (0, o.f)(h),
          });
        let y = 0,
          g = [];
        for (let n = 0; n < e.length; ++n) {
          let o = e[n];
          b.setPosition(y);
          let [l, h] = (function e(n, o, { staticPosition: l }) {
            let h = (0, f.t)(o.type);
            if (h) {
              let [t, r] = h;
              return (function (t, r, { length: n, staticPosition: o }) {
                if (!n) {
                  let n = o + d(t.readBytes(32)),
                    s = n + 32;
                  t.setPosition(n);
                  let a = d(t.readBytes(32)),
                    i = p(r),
                    c = 0,
                    u = [];
                  for (let n = 0; n < a; ++n) {
                    t.setPosition(s + (i ? 32 * n : c));
                    let [o, a] = e(t, r, { staticPosition: s });
                    ((c += a), u.push(o));
                  }
                  return (t.setPosition(o + 32), [u, 32]);
                }
                if (p(r)) {
                  let s = o + d(t.readBytes(32)),
                    a = [];
                  for (let o = 0; o < n; ++o) {
                    t.setPosition(s + 32 * o);
                    let [n] = e(t, r, { staticPosition: s });
                    a.push(n);
                  }
                  return (t.setPosition(o + 32), [a, 32]);
                }
                let s = 0,
                  a = [];
                for (let i = 0; i < n; ++i) {
                  let [n, i] = e(t, r, { staticPosition: o + s });
                  ((s += i), a.push(n));
                }
                return [a, s];
              })(n, { ...o, type: r }, { length: t, staticPosition: l });
            }
            if ("tuple" === o.type)
              return (function (t, r, { staticPosition: n }) {
                let o =
                    0 === r.components.length ||
                    r.components.some(({ name: e }) => !e),
                  s = o ? [] : {},
                  a = 0;
                if (p(r)) {
                  let i = n + d(t.readBytes(32));
                  for (let n = 0; n < r.components.length; ++n) {
                    let c = r.components[n];
                    t.setPosition(i + a);
                    let [u, d] = e(t, c, { staticPosition: i });
                    ((a += d), (s[o ? n : c?.name] = u));
                  }
                  return (t.setPosition(n + 32), [s, 32]);
                }
                for (let i = 0; i < r.components.length; ++i) {
                  let c = r.components[i],
                    [u, d] = e(t, c, { staticPosition: n });
                  ((s[o ? i : c?.name] = u), (a += d));
                }
                return [s, a];
              })(n, o, { staticPosition: l });
            if ("address" === o.type) {
              let e;
              return (
                (e = n.readBytes(32)),
                [(0, r.b)((0, u.v)((0, s.S)(e, -20))), 32]
              );
            }
            if ("bool" === o.type)
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
                })(n.readBytes(32), { size: 32 }),
                32,
              ];
            if (o.type.startsWith("bytes"))
              return (function (e, t, { staticPosition: r }) {
                let [n, o] = t.type.split("bytes");
                if (!o) {
                  let t = d(e.readBytes(32));
                  e.setPosition(r + t);
                  let n = d(e.readBytes(32));
                  if (0 === n) return (e.setPosition(r + 32), ["0x", 32]);
                  let o = e.readBytes(n);
                  return (e.setPosition(r + 32), [(0, u.v)(o), 32]);
                }
                return [(0, u.v)(e.readBytes(Number.parseInt(o, 10), 32)), 32];
              })(n, o, { staticPosition: l });
            if (o.type.startsWith("uint") || o.type.startsWith("int")) {
              var m, b;
              let e, t, r;
              return (
                (m = n),
                (e = (b = o).type.startsWith("int")),
                (t = Number.parseInt(b.type.split("int")[1] || "256", 10)),
                (r = m.readBytes(32)),
                [
                  t > 48
                    ? (function (e, t = {}) {
                        void 0 !== t.size && (0, c.u)(e, { size: t.size });
                        let r = (0, u.v)(e, t);
                        return (0, c.K)(r, t);
                      })(r, { signed: e })
                    : d(r, { signed: e }),
                  32,
                ]
              );
            }
            if ("string" === o.type)
              return (function (e, { staticPosition: t }) {
                let r = d(e.readBytes(32));
                e.setPosition(t + r);
                let n = d(e.readBytes(32));
                if (0 === n) return (e.setPosition(t + 32), ["", 32]);
                let o = e.readBytes(n, 32),
                  s = (function (e, t = {}) {
                    let r = e;
                    return (
                      void 0 !== t.size &&
                        ((0, c.u)(r, { size: t.size }),
                        (r = (0, a.f)(r, { dir: "right" }))),
                      new TextDecoder().decode(r)
                    );
                  })((0, a.f)(o));
                return (e.setPosition(t + 32), [s, 32]);
              })(n, { staticPosition: l });
            throw new t.l(o.type, {
              docsPath: "/docs/contract/decodeAbiParameters",
            });
          })(b, o, { staticPosition: 0 });
          ((y += h), g.push(l));
        }
        return g;
      },
    ],
    887857,
  );
};
