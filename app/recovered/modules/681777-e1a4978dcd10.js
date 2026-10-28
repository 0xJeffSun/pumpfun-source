// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(927974),
    r = e.i(982405),
    n = e.i(214721),
    i = e.i(690651);
  let a = new (e.i(971816).f)(8192);
  var s = e.i(591774),
    o = e.i(225587),
    u = e.i(351260);
  e.s(
    [
      "f",
      0,
      function (
        {
          key: e,
          methods: l,
          name: c,
          request: f,
          retryCount: d = 3,
          retryDelay: p = 150,
          timeout: y,
          type: h,
        },
        m,
      ) {
        return {
          config: {
            key: e,
            methods: l,
            name: c,
            request: f,
            retryCount: d,
            retryDelay: p,
            timeout: y,
            type: h,
          },
          request: (function (e, u = {}) {
            return async (l, c = {}) => {
              let {
                  dedupe: f = !1,
                  methods: d,
                  retryDelay: p = 150,
                  retryCount: y = 3,
                  signal: h,
                  uid: m,
                } = { ...u, ...c },
                { method: g } = l;
              if (
                d?.exclude?.includes(g) ||
                (d?.include && !d.include.includes(g))
              )
                throw new n.b(Error("method not supported"), { method: g });
              if (h?.aborted) throw (0, i.l)(h);
              let b = f
                ? (function (e, t = 0) {
                    let r = 0xdeadbeef ^ t,
                      n = 0x41c6ce57 ^ t;
                    for (let t = 0; t < e.length; t++) {
                      let i = e.charCodeAt(t);
                      ((r = Math.imul(r ^ i, 0x9e3779b1)),
                        (n = Math.imul(n ^ i, 0x5f356495)));
                    }
                    return (
                      (r =
                        Math.imul(r ^ (r >>> 16), 0x85ebca6b) ^
                        Math.imul(n ^ (n >>> 16), 0xc2b2ae35)),
                      (
                        0x100000000 *
                          (2097151 &
                            (n =
                              Math.imul(n ^ (n >>> 16), 0x85ebca6b) ^
                              Math.imul(r ^ (r >>> 16), 0xc2b2ae35))) +
                        (r >>> 0)
                      ).toString(36)
                    );
                  })(`${m}.${(0, o.f)(l)}`)
                : void 0;
              return (function (e, { enabled: t = !0, id: r }) {
                if (!t || !r) return e();
                if (a.get(r)) return a.get(r);
                let n = e().finally(() => a.delete(r));
                return (a.set(r, n), n);
              })(
                () =>
                  (0, s.f)(
                    async () => {
                      try {
                        return await e(l, h ? { signal: h } : void 0);
                      } catch (e) {
                        if (h?.aborted) throw (0, i.l)(h);
                        if ((0, i.c)(e)) throw e;
                        switch (e.code) {
                          case n.Q.code:
                            throw new n.Q(e);
                          case n.P.code:
                            throw new n.P(e);
                          case n.X.code:
                            throw new n.X(e, { method: l.method });
                          case n.u.code:
                            throw new n.u(e);
                          case n.D.code:
                            throw new n.D(e);
                          case n.L.code:
                            throw new n.L(e);
                          case n.V.code:
                            throw new n.V(e);
                          case n.j.code:
                            throw new n.j(e);
                          case n.g.code:
                            throw new n.g(e);
                          case n.b.code:
                            throw new n.b(e, { method: l.method });
                          case n.H.code:
                            throw new n.H(e);
                          case n.J.code:
                            throw new n.J(e);
                          case n.k.code:
                            throw new n.k(e);
                          case n.$.code:
                            throw new n.$(e);
                          case n.q.code:
                            throw new n.q(e);
                          case n.p.code:
                            throw new n.p(e);
                          case n.r.code:
                            throw new n.r(e);
                          case n.S.code:
                            throw new n.S(e);
                          case n.E.code:
                            throw new n.E(e);
                          case n.d.code:
                            throw new n.d(e);
                          case n.a.code:
                            throw new n.a(e);
                          case n.s.code:
                            throw new n.s(e);
                          case n.Y.code:
                            throw new n.Y(e);
                          case n.Z.code:
                            throw new n.Z(e);
                          case n.T.code:
                            throw new n.T(e);
                          case 5e3:
                            throw new n.k(e);
                          case n.B.code:
                            throw new n.B(e);
                          default:
                            if (e instanceof t.f) throw e;
                            throw new n.U(e);
                        }
                      }
                    },
                    {
                      delay: ({ count: e, error: t }) => {
                        if (t && t instanceof r.y) {
                          let e = t?.headers?.get("Retry-After");
                          if (e?.match(/\d/))
                            return 1e3 * Number.parseInt(e, 10);
                        }
                        return ~~(1 << e) * p;
                      },
                      retryCount: y,
                      signal: h,
                      shouldRetry: ({ error: e }) => {
                        var t;
                        return (
                          (t = e),
                          !(0, i.c)(t) &&
                            ("code" in t && "number" == typeof t.code
                              ? -1 === t.code ||
                                t.code === n.H.code ||
                                t.code === n.D.code ||
                                429 === t.code
                              : !(t instanceof r.y) ||
                                !t.status ||
                                403 === t.status ||
                                408 === t.status ||
                                413 === t.status ||
                                429 === t.status ||
                                500 === t.status ||
                                502 === t.status ||
                                503 === t.status ||
                                504 === t.status ||
                                !1)
                        );
                      },
                    },
                  ),
                { enabled: f, id: b },
              );
            };
          })(f, { methods: l, retryCount: d, retryDelay: p, uid: (0, u.f)() }),
          value: m,
        };
      },
    ],
    681777,
  );
};
