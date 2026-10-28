// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  Symbol();
  let t = Symbol(),
    i = Object.getPrototypeOf,
    s = new WeakMap(),
    r = (e) => {
      let r;
      return (
        ((r = e) &&
          (s.has(r)
            ? s.get(r)
            : i(r) === Object.prototype || i(r) === Array.prototype) &&
          e[t]) ||
        null
      );
    },
    a = (e, t = !0) => {
      s.set(e, t);
    };
  var n = {
    get url() {
      return e.F(
        "node_modules/.pnpm/valtio@1.13.2_@types+react@19.2.7_react@19.2.3/node_modules/valtio/esm/vanilla.mjs",
      );
    },
    env: { DEV: !1, PROD: !0, MODE: "production", BASE_URL: "/", SSR: !1 },
  };
  let o = (e) => "object" == typeof e && null !== e,
    c = new WeakMap(),
    l = new WeakSet(),
    h = (
      e = Object.is,
      t = (e, t) => new Proxy(e, t),
      i = (e) =>
        o(e) &&
        !l.has(e) &&
        (Array.isArray(e) || !(Symbol.iterator in e)) &&
        !(e instanceof WeakMap) &&
        !(e instanceof WeakSet) &&
        !(e instanceof Error) &&
        !(e instanceof Number) &&
        !(e instanceof Date) &&
        !(e instanceof String) &&
        !(e instanceof RegExp) &&
        !(e instanceof ArrayBuffer),
      s = (e) => {
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
          default:
            throw e;
        }
      },
      h = new WeakMap(),
      u = (e, t, i = s) => {
        let r = h.get(e);
        if ((null == r ? void 0 : r[0]) === t) return r[1];
        let n = Array.isArray(e) ? [] : Object.create(Object.getPrototypeOf(e));
        return (
          a(n, !0),
          h.set(e, [t, n]),
          Reflect.ownKeys(e).forEach((t) => {
            if (Object.getOwnPropertyDescriptor(n, t)) return;
            let s = Reflect.get(e, t),
              { enumerable: r } = Reflect.getOwnPropertyDescriptor(e, t),
              o = { value: s, enumerable: r, configurable: !0 };
            if (l.has(s)) a(s, !1);
            else if (s instanceof Promise)
              (delete o.value, (o.get = () => i(s)));
            else if (c.has(s)) {
              let [e, t] = c.get(s);
              o.value = u(e, t(), i);
            }
            Object.defineProperty(n, t, o);
          }),
          Object.preventExtensions(n)
        );
      },
      d = new WeakMap(),
      p = [1, 1],
      g = (s) => {
        if (!o(s)) throw Error("object required");
        let a = d.get(s);
        if (a) return a;
        let h = p[0],
          f = new Set(),
          m = (e, t = ++p[0]) => {
            h !== t && ((h = t), f.forEach((i) => i(e, t)));
          },
          w = p[1],
          y = (e = ++p[1]) => (
            w === e ||
              f.size ||
              ((w = e),
              v.forEach(([t]) => {
                let i = t[1](e);
                i > h && (h = i);
              })),
            h
          ),
          b = (e) => (t, i) => {
            let s = [...t];
            ((s[1] = [e, ...s[1]]), m(s, i));
          },
          v = new Map(),
          I = (e, t) => {
            if (("production" !== n.env.MODE && v.has(e), f.size)) {
              let i = t[3](b(e));
              v.set(e, [t, i]);
            } else v.set(e, [t]);
          },
          E = (e) => {
            var t;
            let i = v.get(e);
            i && (v.delete(e), null == (t = i[1]) || t.call(i));
          },
          C = (e) => {
            (f.add(e),
              1 === f.size &&
                v.forEach(([e, t], i) => {
                  let s = e[3](b(i));
                  v.set(i, [e, s]);
                }));
            let t = () => {
              (f.delete(e),
                0 === f.size &&
                  v.forEach(([e, t], i) => {
                    t && (t(), v.set(i, [e]));
                  }));
            };
            return t;
          },
          S = Array.isArray(s) ? [] : Object.create(Object.getPrototypeOf(s)),
          A = {
            deleteProperty(e, t) {
              let i = Reflect.get(e, t);
              E(t);
              let s = Reflect.deleteProperty(e, t);
              return (s && m(["delete", [t], i]), s);
            },
            set(t, s, a, n) {
              let h = Reflect.has(t, s),
                u = Reflect.get(t, s, n);
              if (h && (e(u, a) || (d.has(a) && e(u, d.get(a))))) return !0;
              (E(s), o(a) && (a = r(a) || a));
              let p = a;
              if (a instanceof Promise)
                a.then((e) => {
                  ((a.status = "fulfilled"),
                    (a.value = e),
                    m(["resolve", [s], e]));
                }).catch((e) => {
                  ((a.status = "rejected"),
                    (a.reason = e),
                    m(["reject", [s], e]));
                });
              else {
                !c.has(a) && i(a) && (p = g(a));
                let e = !l.has(p) && c.get(p);
                e && I(s, e);
              }
              return (Reflect.set(t, s, p, n), m(["set", [s], a, u]), !0);
            },
          },
          P = t(S, A);
        d.set(s, P);
        let N = [S, y, u, C];
        return (
          c.set(P, N),
          Reflect.ownKeys(s).forEach((e) => {
            let t = Object.getOwnPropertyDescriptor(s, e);
            ("value" in t && ((P[e] = s[e]), delete t.value, delete t.writable),
              Object.defineProperty(S, e, t));
          }),
          P
        );
      },
    ) => [g, c, l, e, t, i, s, h, u, d, p],
    [u] = h();
  e.s(
    [
      "d",
      0,
      function (e) {
        let t = c.get(e);
        return null == t ? void 0 : t[1]();
      },
      "s",
      0,
      function (e = {}) {
        return u(e);
      },
      "C",
      0,
      function (e) {
        return (l.add(e), e);
      },
      "D",
      0,
      function (e, t) {
        let [i, s, r] = c.get(e);
        return r(i, s(), t);
      },
      "i",
      0,
      function (e, t, i) {
        let s,
          r = c.get(e),
          a = [],
          n = r[3],
          o = !1,
          l = n((e) => {
            (a.push(e), i)
              ? t(a.splice(0))
              : s ||
                (s = Promise.resolve().then(() => {
                  ((s = void 0), o && t(a.splice(0)));
                }));
          });
        return (
          (o = !0),
          () => {
            ((o = !1), l());
          }
        );
      },
      "Y",
      0,
      h,
    ],
    359702,
  );
};
