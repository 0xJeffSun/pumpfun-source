// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(149502),
    t = e.i(445242),
    r = e.i(30181),
    s = e.i(690877),
    l = e.i(606933),
    i = e.i(448341),
    n = e.i(528600);
  let o =
      (void 0 !== a.default && "https://frontend-api-v3.pump.fun") ||
      "https://frontend-api-v3.pump.fun",
    d = (e, a) =>
      (!(a instanceof n.M) ||
        void 0 === a.status ||
        !(a.status >= 400) ||
        !(a.status < 500)) &&
      e < 1,
    u = (e) => {
      let a = new Map();
      for (let t of e)
        (t?.address && a.set(t.address, t), t?.userId && a.set(t.userId, t));
      return a;
    },
    c = async (e, a) => {
      let t = [...new Set(a)].filter(Boolean);
      return 0 === t.length
        ? []
        : (0, r.K)({ clientServerUrl: e })("POST /users/batch", {
            body: { addresses: t },
            credentials: "same-origin",
            hooks: {
              afterResponse: [
                (e, a, t) => {
                  if (!t.ok)
                    throw new n.M({
                      reason: 404 === t.status ? "not_found" : "http_error",
                      status: t.status,
                    });
                },
              ],
            },
            parseJson: (e) => {
              let a = JSON.parse(e);
              return Array.isArray(a)
                ? a
                : a &&
                    "object" == typeof a &&
                    "users" in a &&
                    Array.isArray(a.users)
                  ? a.users
                  : [];
            },
          });
    },
    m = new Map(),
    f = (e) => ["user-profile-batch", e];
  e.s([
    "H",
    0,
    c,
    "T",
    0,
    (e) => {
      let a,
        r,
        n,
        p,
        h,
        g = (0, t.c)(13),
        { address: x, enabled: v } = e,
        w = (0, l.useQueryClient)(),
        y = x ?? "";
      (g[0] !== y ? ((a = f(y)), (g[0] = y), (g[1] = a)) : (a = g[1]),
        g[2] !== x || g[3] !== w
          ? ((r = async () => {
              let e = await ((e) => {
                let a = m.get(e);
                if (!a) {
                  let t, r, s;
                  ((t = new Map()),
                    (r = null),
                    (s = () => {
                      r = null;
                      let a = t;
                      t = new Map();
                      let s = [...a.keys()];
                      for (let t = 0; t < s.length; t += 100) {
                        let r = s.slice(t, t + 100);
                        c(e, r)
                          .then((e) => {
                            let t = u(e);
                            for (let e of r) {
                              let r = t.get(e) ?? null;
                              for (let t of a.get(e) ?? []) t.resolve(r);
                            }
                          })
                          .catch((e) => {
                            for (let t of r)
                              for (let r of a.get(t) ?? []) r.reject(e);
                          });
                      }
                    }),
                    (a = {
                      fetch: (e) =>
                        new Promise((a, l) => {
                          let i = t.get(e) ?? [];
                          (i.push({ resolve: a, reject: l }),
                            t.set(e, i),
                            null === r && (r = setTimeout(s, 50)));
                        }),
                    }),
                    m.set(e, a));
                }
                return a;
              })(o).fetch(x ?? "");
              if (!e) return null;
              for (let a of [e.address, ...(0, i.i)(e, e.address)])
                a && w.setQueryData((0, i.B)(a), (a) => a ?? e);
              return e;
            }),
            (n = () => (x ? w.getQueryData((0, i.B)(x)) : void 0)),
            (p = () =>
              x ? w.getQueryState((0, i.B)(x))?.dataUpdatedAt : void 0),
            (g[2] = x),
            (g[3] = w),
            (g[4] = r),
            (g[5] = n),
            (g[6] = p))
          : ((r = g[4]), (n = g[5]), (p = g[6])));
      let b = (void 0 === v || v) && !!x;
      return (
        g[7] !== a || g[8] !== r || g[9] !== n || g[10] !== p || g[11] !== b
          ? ((h = {
              queryKey: a,
              queryFn: r,
              initialData: n,
              initialDataUpdatedAt: p,
              enabled: b,
              staleTime: 3e5,
              retry: d,
            }),
            (g[7] = a),
            (g[8] = r),
            (g[9] = n),
            (g[10] = p),
            (g[11] = b),
            (g[12] = h))
          : (h = g[12]),
        (0, s.useQuery)(h)
      );
    },
    "J",
    0,
    f,
    "V",
    0,
    u,
  ]);
};
