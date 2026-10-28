// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(149502),
    i = e.i(445242),
    a = e.i(30181),
    n = e.i(690877),
    r = e.i(606933),
    s = e.i(448341),
    l = e.i(528600);
  let o =
      (void 0 !== t.default && "https://frontend-api-v3.pump.fun") ||
      "https://frontend-api-v3.pump.fun",
    c = (e, t) =>
      (!(t instanceof l.M) ||
        void 0 === t.status ||
        !(t.status >= 400) ||
        !(t.status < 500)) &&
      e < 1,
    d = (e) => {
      let t = new Map();
      for (let i of e)
        (i?.address && t.set(i.address, i), i?.userId && t.set(i.userId, i));
      return t;
    },
    m = async (e, t) => {
      let i = [...new Set(t)].filter(Boolean);
      return 0 === i.length
        ? []
        : (0, a.K)({ clientServerUrl: e })("POST /users/batch", {
            body: { addresses: i },
            credentials: "same-origin",
            hooks: {
              afterResponse: [
                (e, t, i) => {
                  if (!i.ok)
                    throw new l.M({
                      reason: 404 === i.status ? "not_found" : "http_error",
                      status: i.status,
                    });
                },
              ],
            },
            parseJson: (e) => {
              let t = JSON.parse(e);
              return Array.isArray(t)
                ? t
                : t &&
                    "object" == typeof t &&
                    "users" in t &&
                    Array.isArray(t.users)
                  ? t.users
                  : [];
            },
          });
    },
    u = new Map(),
    p = (e) => ["user-profile-batch", e];
  e.s([
    "H",
    0,
    m,
    "T",
    0,
    (e) => {
      let t,
        a,
        l,
        f,
        x,
        g = (0, i.c)(13),
        { address: h, enabled: b } = e,
        y = (0, r.useQueryClient)(),
        v = h ?? "";
      (g[0] !== v ? ((t = p(v)), (g[0] = v), (g[1] = t)) : (t = g[1]),
        g[2] !== h || g[3] !== y
          ? ((a = async () => {
              let e = await ((e) => {
                let t = u.get(e);
                if (!t) {
                  let i, a, n;
                  ((i = new Map()),
                    (a = null),
                    (n = () => {
                      a = null;
                      let t = i;
                      i = new Map();
                      let n = [...t.keys()];
                      for (let i = 0; i < n.length; i += 100) {
                        let a = n.slice(i, i + 100);
                        m(e, a)
                          .then((e) => {
                            let i = d(e);
                            for (let e of a) {
                              let a = i.get(e) ?? null;
                              for (let i of t.get(e) ?? []) i.resolve(a);
                            }
                          })
                          .catch((e) => {
                            for (let i of a)
                              for (let a of t.get(i) ?? []) a.reject(e);
                          });
                      }
                    }),
                    (t = {
                      fetch: (e) =>
                        new Promise((t, r) => {
                          let s = i.get(e) ?? [];
                          (s.push({ resolve: t, reject: r }),
                            i.set(e, s),
                            null === a && (a = setTimeout(n, 50)));
                        }),
                    }),
                    u.set(e, t));
                }
                return t;
              })(o).fetch(h ?? "");
              if (!e) return null;
              for (let t of [e.address, ...(0, s.i)(e, e.address)])
                t && y.setQueryData((0, s.B)(t), (t) => t ?? e);
              return e;
            }),
            (l = () => (h ? y.getQueryData((0, s.B)(h)) : void 0)),
            (f = () =>
              h ? y.getQueryState((0, s.B)(h))?.dataUpdatedAt : void 0),
            (g[2] = h),
            (g[3] = y),
            (g[4] = a),
            (g[5] = l),
            (g[6] = f))
          : ((a = g[4]), (l = g[5]), (f = g[6])));
      let w = (void 0 === b || b) && !!h;
      return (
        g[7] !== t || g[8] !== a || g[9] !== l || g[10] !== f || g[11] !== w
          ? ((x = {
              queryKey: t,
              queryFn: a,
              initialData: l,
              initialDataUpdatedAt: f,
              enabled: w,
              staleTime: 3e5,
              retry: c,
            }),
            (g[7] = t),
            (g[8] = a),
            (g[9] = l),
            (g[10] = f),
            (g[11] = w),
            (g[12] = x))
          : (x = g[12]),
        (0, n.useQuery)(x)
      );
    },
    "J",
    0,
    p,
    "V",
    0,
    d,
  ]);
};
