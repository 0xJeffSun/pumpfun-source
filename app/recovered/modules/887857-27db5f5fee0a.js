// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    r = e.i(183249),
    n = e.i(811369),
    s = e.i(612735),
    o = e.i(989494),
    i = e.i(449985),
    a = e.i(108270),
    c = e.i(382772),
    u = e.i(19648);
  function l(e, t = {}) {
    void 0 !== t.size && (0, c.u)(e, { size: t.size });
    let r = (0, u.v)(e, t);
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
      function (e, p) {
        let b = "string" == typeof p ? (0, d.X)(p) : p,
          m = (0, n.f)(b);
        if (0 === (0, s.f)(b) && e.length > 0) throw new t.g();
        if ((0, s.f)(p) && 32 > (0, s.f)(p))
          throw new t.D({
            data: "string" == typeof p ? p : (0, u.v)(p),
            params: e,
            size: (0, s.f)(p),
          });
        let y = 0,
          g = [];
        for (let n = 0; n < e.length; ++n) {
          let s = e[n];
          m.setPosition(y);
          let [d, p] = (function e(n, s, { staticPosition: d }) {
            let p = (0, f.t)(s.type);
            if (p) {
              let [t, r] = p;
              return (function (t, r, { length: n, staticPosition: s }) {
                if (!n) {
                  let n = s + l(t.readBytes(32)),
                    o = n + 32;
                  t.setPosition(n);
                  let i = l(t.readBytes(32)),
                    a = h(r),
                    c = 0,
                    u = [];
                  for (let n = 0; n < i; ++n) {
                    t.setPosition(o + (a ? 32 * n : c));
                    let [s, i] = e(t, r, { staticPosition: o });
                    ((c += i), u.push(s));
                  }
                  return (t.setPosition(s + 32), [u, 32]);
                }
                if (h(r)) {
                  let o = s + l(t.readBytes(32)),
                    i = [];
                  for (let s = 0; s < n; ++s) {
                    t.setPosition(o + 32 * s);
                    let [n] = e(t, r, { staticPosition: o });
                    i.push(n);
                  }
                  return (t.setPosition(s + 32), [i, 32]);
                }
                let o = 0,
                  i = [];
                for (let a = 0; a < n; ++a) {
                  let [n, a] = e(t, r, { staticPosition: s + o });
                  ((o += a), i.push(n));
                }
                return [i, o];
              })(n, { ...s, type: r }, { length: t, staticPosition: d });
            }
            if ("tuple" === s.type)
              return (function (t, r, { staticPosition: n }) {
                let s =
                    0 === r.components.length ||
                    r.components.some(({ name: e }) => !e),
                  o = s ? [] : {},
                  i = 0;
                if (h(r)) {
                  let a = n + l(t.readBytes(32));
                  for (let n = 0; n < r.components.length; ++n) {
                    let c = r.components[n];
                    t.setPosition(a + i);
                    let [u, l] = e(t, c, { staticPosition: a });
                    ((i += l), (o[s ? n : c?.name] = u));
                  }
                  return (t.setPosition(n + 32), [o, 32]);
                }
                for (let a = 0; a < r.components.length; ++a) {
                  let c = r.components[a],
                    [u, l] = e(t, c, { staticPosition: n });
                  ((o[s ? a : c?.name] = u), (i += l));
                }
                return [o, i];
              })(n, s, { staticPosition: d });
            if ("address" === s.type) {
              let e;
              return (
                (e = n.readBytes(32)),
                [(0, r.b)((0, u.v)((0, o.S)(e, -20))), 32]
              );
            }
            if ("bool" === s.type)
              return [
                (function (e, t = {}) {
                  let r = e;
                  if (
                    (void 0 !== t.size &&
                      ((0, c.u)(r, { size: t.size }), (r = (0, i.f)(r))),
                    r.length > 1 || r[0] > 1)
                  )
                    throw new a.C(r);
                  return !!r[0];
                })(n.readBytes(32), { size: 32 }),
                32,
              ];
            if (s.type.startsWith("bytes"))
              return (function (e, t, { staticPosition: r }) {
                let [n, s] = t.type.split("bytes");
                if (!s) {
                  let t = l(e.readBytes(32));
                  e.setPosition(r + t);
                  let n = l(e.readBytes(32));
                  if (0 === n) return (e.setPosition(r + 32), ["0x", 32]);
                  let s = e.readBytes(n);
                  return (e.setPosition(r + 32), [(0, u.v)(s), 32]);
                }
                return [(0, u.v)(e.readBytes(Number.parseInt(s, 10), 32)), 32];
              })(n, s, { staticPosition: d });
            if (s.type.startsWith("uint") || s.type.startsWith("int")) {
              var b, m;
              let e, t, r;
              return (
                (b = n),
                (e = (m = s).type.startsWith("int")),
                (t = Number.parseInt(m.type.split("int")[1] || "256", 10)),
                (r = b.readBytes(32)),
                [
                  t > 48
                    ? (function (e, t = {}) {
                        void 0 !== t.size && (0, c.u)(e, { size: t.size });
                        let r = (0, u.v)(e, t);
                        return (0, c.K)(r, t);
                      })(r, { signed: e })
                    : l(r, { signed: e }),
                  32,
                ]
              );
            }
            if ("string" === s.type)
              return (function (e, { staticPosition: t }) {
                let r = l(e.readBytes(32));
                e.setPosition(t + r);
                let n = l(e.readBytes(32));
                if (0 === n) return (e.setPosition(t + 32), ["", 32]);
                let s = e.readBytes(n, 32),
                  o = (function (e, t = {}) {
                    let r = e;
                    return (
                      void 0 !== t.size &&
                        ((0, c.u)(r, { size: t.size }),
                        (r = (0, i.f)(r, { dir: "right" }))),
                      new TextDecoder().decode(r)
                    );
                  })((0, i.f)(s));
                return (e.setPosition(t + 32), [o, 32]);
              })(n, { staticPosition: d });
            throw new t.l(s.type, {
              docsPath: "/docs/contract/decodeAbiParameters",
            });
          })(m, s, { staticPosition: 0 });
          ((y += p), g.push(d));
        }
        return g;
      },
    ],
    887857,
  );
};
