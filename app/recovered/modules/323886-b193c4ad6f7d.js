// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617),
    r = e.i(503725),
    s = e.i(416532),
    n = e.i(19648),
    o = e.i(664596),
    i = e.i(300950),
    a = e.i(393547);
  e.s([
    "f",
    0,
    function (e, c = {}) {
      return async (l, u = {}) => {
        let {
            dedupe: h = !1,
            methods: d,
            retryDelay: f = 150,
            retryCount: p = 3,
            uid: g,
          } = { ...c, ...u },
          { method: m } = l;
        if (d?.exclude?.includes(m) || (d?.include && !d.include.includes(m)))
          throw new s.b(Error("method not supported"), { method: m });
        let b = h ? (0, n.B)(`${g}.${(0, a.f)(l)}`) : void 0;
        return (0, o.f)(
          () =>
            (0, i.f)(
              async () => {
                try {
                  return await e(l);
                } catch (e) {
                  switch (e.code) {
                    case s.Q.code:
                      throw new s.Q(e);
                    case s.P.code:
                      throw new s.P(e);
                    case s.X.code:
                      throw new s.X(e, { method: l.method });
                    case s.u.code:
                      throw new s.u(e);
                    case s.D.code:
                      throw new s.D(e);
                    case s.L.code:
                      throw new s.L(e);
                    case s.V.code:
                      throw new s.V(e);
                    case s.j.code:
                      throw new s.j(e);
                    case s.g.code:
                      throw new s.g(e);
                    case s.b.code:
                      throw new s.b(e, { method: l.method });
                    case s.H.code:
                      throw new s.H(e);
                    case s.J.code:
                      throw new s.J(e);
                    case s.k.code:
                      throw new s.k(e);
                    case s.$.code:
                      throw new s.$(e);
                    case s.q.code:
                      throw new s.q(e);
                    case s.p.code:
                      throw new s.p(e);
                    case s.r.code:
                      throw new s.r(e);
                    case s.S.code:
                      throw new s.S(e);
                    case s.E.code:
                      throw new s.E(e);
                    case s.d.code:
                      throw new s.d(e);
                    case s.a.code:
                      throw new s.a(e);
                    case s.s.code:
                      throw new s.s(e);
                    case s.Y.code:
                      throw new s.Y(e);
                    case s.Z.code:
                      throw new s.Z(e);
                    case s.T.code:
                      throw new s.T(e);
                    case 5e3:
                      throw new s.k(e);
                    default:
                      if (e instanceof t.f) throw e;
                      throw new s.U(e);
                  }
                }
              },
              {
                delay: ({ count: e, error: t }) => {
                  if (t && t instanceof r.y) {
                    let e = t?.headers?.get("Retry-After");
                    if (e?.match(/\d/)) return 1e3 * Number.parseInt(e, 10);
                  }
                  return ~~(1 << e) * f;
                },
                retryCount: p,
                shouldRetry: ({ error: e }) => {
                  var t;
                  return "code" in (t = e) && "number" == typeof t.code
                    ? -1 === t.code ||
                        t.code === s.H.code ||
                        t.code === s.D.code
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
                        !1;
                },
              },
            ),
          { enabled: h, id: b },
        );
      };
    },
  ]);
};
