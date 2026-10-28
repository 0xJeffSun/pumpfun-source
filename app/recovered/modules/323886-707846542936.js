// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617),
    r = e.i(503725),
    n = e.i(416532),
    o = e.i(19648),
    s = e.i(664596),
    a = e.i(300950),
    i = e.i(393547);
  e.s([
    "f",
    0,
    function (e, c = {}) {
      return async (u, d = {}) => {
        let {
            dedupe: l = !1,
            methods: f,
            retryDelay: p = 150,
            retryCount: h = 3,
            uid: m,
          } = { ...c, ...d },
          { method: b } = u;
        if (f?.exclude?.includes(b) || (f?.include && !f.include.includes(b)))
          throw new n.b(Error("method not supported"), { method: b });
        let y = l ? (0, o.B)(`${m}.${(0, i.f)(u)}`) : void 0;
        return (0, s.f)(
          () =>
            (0, a.f)(
              async () => {
                try {
                  return await e(u);
                } catch (e) {
                  switch (e.code) {
                    case n.Q.code:
                      throw new n.Q(e);
                    case n.P.code:
                      throw new n.P(e);
                    case n.X.code:
                      throw new n.X(e, { method: u.method });
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
                      throw new n.b(e, { method: u.method });
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
                    if (e?.match(/\d/)) return 1e3 * Number.parseInt(e, 10);
                  }
                  return ~~(1 << e) * p;
                },
                retryCount: h,
                shouldRetry: ({ error: e }) => {
                  var t;
                  return "code" in (t = e) && "number" == typeof t.code
                    ? -1 === t.code ||
                        t.code === n.H.code ||
                        t.code === n.D.code
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
          { enabled: l, id: y },
        );
      };
    },
  ]);
};
