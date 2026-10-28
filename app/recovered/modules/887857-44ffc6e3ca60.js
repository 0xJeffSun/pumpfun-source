// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    n = e.i(183249),
    r = e.i(811369),
    s = e.i(612735),
    i = e.i(989494),
    a = e.i(449985),
    o = e.i(108270),
    u = e.i(382772),
    p = e.i(19648);
  function y(e, t = {}) {
    void 0 !== t.size && (0, u.u)(e, { size: t.size });
    let n = (0, p.v)(e, t);
    return (0, u.T)(n, t);
  }
  var c = e.i(590719),
    d = e.i(971860);
  function l(e) {
    let { type: t } = e;
    if ("string" === t || "bytes" === t || t.endsWith("[]")) return !0;
    if ("tuple" === t) return e.components?.some(l);
    let n = (0, d.t)(e.type);
    return !!(n && l({ ...e, type: n[1] }));
  }
  e.s(
    [
      "f",
      0,
      function (e, m) {
        let f = "string" == typeof m ? (0, c.X)(m) : m,
          h = (0, r.f)(f);
        if (0 === (0, s.f)(f) && e.length > 0) throw new t.g();
        if ((0, s.f)(m) && 32 > (0, s.f)(m))
          throw new t.D({
            data: "string" == typeof m ? m : (0, p.v)(m),
            params: e,
            size: (0, s.f)(m),
          });
        let b = 0,
          g = [];
        for (let r = 0; r < e.length; ++r) {
          let s = e[r];
          h.setPosition(b);
          let [c, m] = (function e(r, s, { staticPosition: c }) {
            let m = (0, d.t)(s.type);
            if (m) {
              let [t, n] = m;
              return (function (t, n, { length: r, staticPosition: s }) {
                if (!r) {
                  let r = s + y(t.readBytes(32)),
                    i = r + 32;
                  t.setPosition(r);
                  let a = y(t.readBytes(32)),
                    o = l(n),
                    u = 0,
                    p = [];
                  for (let r = 0; r < a; ++r) {
                    t.setPosition(i + (o ? 32 * r : u));
                    let [s, a] = e(t, n, { staticPosition: i });
                    ((u += a), p.push(s));
                  }
                  return (t.setPosition(s + 32), [p, 32]);
                }
                if (l(n)) {
                  let i = s + y(t.readBytes(32)),
                    a = [];
                  for (let s = 0; s < r; ++s) {
                    t.setPosition(i + 32 * s);
                    let [r] = e(t, n, { staticPosition: i });
                    a.push(r);
                  }
                  return (t.setPosition(s + 32), [a, 32]);
                }
                let i = 0,
                  a = [];
                for (let o = 0; o < r; ++o) {
                  let [r, o] = e(t, n, { staticPosition: s + i });
                  ((i += o), a.push(r));
                }
                return [a, i];
              })(r, { ...s, type: n }, { length: t, staticPosition: c });
            }
            if ("tuple" === s.type)
              return (function (t, n, { staticPosition: r }) {
                let s =
                    0 === n.components.length ||
                    n.components.some(({ name: e }) => !e),
                  i = s ? [] : {},
                  a = 0;
                if (l(n)) {
                  let o = r + y(t.readBytes(32));
                  for (let r = 0; r < n.components.length; ++r) {
                    let u = n.components[r];
                    t.setPosition(o + a);
                    let [p, y] = e(t, u, { staticPosition: o });
                    ((a += y), (i[s ? r : u?.name] = p));
                  }
                  return (t.setPosition(r + 32), [i, 32]);
                }
                for (let o = 0; o < n.components.length; ++o) {
                  let u = n.components[o],
                    [p, y] = e(t, u, { staticPosition: r });
                  ((i[s ? o : u?.name] = p), (a += y));
                }
                return [i, a];
              })(r, s, { staticPosition: c });
            if ("address" === s.type) {
              let e;
              return (
                (e = r.readBytes(32)),
                [(0, n.b)((0, p.v)((0, i.S)(e, -20))), 32]
              );
            }
            if ("bool" === s.type)
              return [
                (function (e, t = {}) {
                  let n = e;
                  if (
                    (void 0 !== t.size &&
                      ((0, u.u)(n, { size: t.size }), (n = (0, a.f)(n))),
                    n.length > 1 || n[0] > 1)
                  )
                    throw new o.C(n);
                  return !!n[0];
                })(r.readBytes(32), { size: 32 }),
                32,
              ];
            if (s.type.startsWith("bytes"))
              return (function (e, t, { staticPosition: n }) {
                let [r, s] = t.type.split("bytes");
                if (!s) {
                  let t = y(e.readBytes(32));
                  e.setPosition(n + t);
                  let r = y(e.readBytes(32));
                  if (0 === r) return (e.setPosition(n + 32), ["0x", 32]);
                  let s = e.readBytes(r);
                  return (e.setPosition(n + 32), [(0, p.v)(s), 32]);
                }
                return [(0, p.v)(e.readBytes(Number.parseInt(s, 10), 32)), 32];
              })(r, s, { staticPosition: c });
            if (s.type.startsWith("uint") || s.type.startsWith("int")) {
              var f, h;
              let e, t, n;
              return (
                (f = r),
                (e = (h = s).type.startsWith("int")),
                (t = Number.parseInt(h.type.split("int")[1] || "256", 10)),
                (n = f.readBytes(32)),
                [
                  t > 48
                    ? (function (e, t = {}) {
                        void 0 !== t.size && (0, u.u)(e, { size: t.size });
                        let n = (0, p.v)(e, t);
                        return (0, u.K)(n, t);
                      })(n, { signed: e })
                    : y(n, { signed: e }),
                  32,
                ]
              );
            }
            if ("string" === s.type)
              return (function (e, { staticPosition: t }) {
                let n = y(e.readBytes(32));
                e.setPosition(t + n);
                let r = y(e.readBytes(32));
                if (0 === r) return (e.setPosition(t + 32), ["", 32]);
                let s = e.readBytes(r, 32),
                  i = (function (e, t = {}) {
                    let n = e;
                    return (
                      void 0 !== t.size &&
                        ((0, u.u)(n, { size: t.size }),
                        (n = (0, a.f)(n, { dir: "right" }))),
                      new TextDecoder().decode(n)
                    );
                  })((0, a.f)(s));
                return (e.setPosition(t + 32), [i, 32]);
              })(r, { staticPosition: c });
            throw new t.l(s.type, {
              docsPath: "/docs/contract/decodeAbiParameters",
            });
          })(h, s, { staticPosition: 0 });
          ((b += m), g.push(c));
        }
        return g;
      },
    ],
    887857,
  );
};
