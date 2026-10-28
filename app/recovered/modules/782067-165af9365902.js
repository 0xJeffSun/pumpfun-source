// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(149502),
    r = e.i(445242),
    l = e.i(30181),
    a = e.i(690877),
    i = e.i(606933),
    s = e.i(448341),
    n = e.i(528600);
  let o =
      (void 0 !== t.default && "https://frontend-api-v3.pump.fun") ||
      "https://frontend-api-v3.pump.fun",
    u = (e, t) =>
      (!(t instanceof n.M) ||
        void 0 === t.status ||
        !(t.status >= 400) ||
        !(t.status < 500)) &&
      e < 1,
    c = (e) => {
      let t = new Map();
      for (let r of e)
        (r?.address && t.set(r.address, r), r?.userId && t.set(r.userId, r));
      return t;
    },
    d = async (e, t) => {
      let r = [...new Set(t)].filter(Boolean);
      return 0 === r.length
        ? []
        : (0, l.K)({ clientServerUrl: e })("POST /users/batch", {
            body: { addresses: r },
            credentials: "same-origin",
            hooks: {
              afterResponse: [
                (e, t, r) => {
                  if (!r.ok)
                    throw new n.M({
                      reason: 404 === r.status ? "not_found" : "http_error",
                      status: r.status,
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
    m = new Map(),
    f = (e) => ["user-profile-batch", e];
  e.s([
    "H",
    0,
    d,
    "T",
    0,
    (e) => {
      let t,
        l,
        n,
        p,
        h,
        g = (0, r.c)(13),
        { address: x, enabled: b } = e,
        w = (0, i.useQueryClient)(),
        y = x ?? "";
      (g[0] !== y ? ((t = f(y)), (g[0] = y), (g[1] = t)) : (t = g[1]),
        g[2] !== x || g[3] !== w
          ? ((l = async () => {
              let e = await ((e) => {
                let t = m.get(e);
                if (!t) {
                  let r, l, a;
                  ((r = new Map()),
                    (l = null),
                    (a = () => {
                      l = null;
                      let t = r;
                      r = new Map();
                      let a = [...t.keys()];
                      for (let r = 0; r < a.length; r += 100) {
                        let l = a.slice(r, r + 100);
                        d(e, l)
                          .then((e) => {
                            let r = c(e);
                            for (let e of l) {
                              let l = r.get(e) ?? null;
                              for (let r of t.get(e) ?? []) r.resolve(l);
                            }
                          })
                          .catch((e) => {
                            for (let r of l)
                              for (let l of t.get(r) ?? []) l.reject(e);
                          });
                      }
                    }),
                    (t = {
                      fetch: (e) =>
                        new Promise((t, i) => {
                          let s = r.get(e) ?? [];
                          (s.push({ resolve: t, reject: i }),
                            r.set(e, s),
                            null === l && (l = setTimeout(a, 50)));
                        }),
                    }),
                    m.set(e, t));
                }
                return t;
              })(o).fetch(x ?? "");
              if (!e) return null;
              for (let t of [e.address, ...(0, s.i)(e, e.address)])
                t && w.setQueryData((0, s.B)(t), (t) => t ?? e);
              return e;
            }),
            (n = () => (x ? w.getQueryData((0, s.B)(x)) : void 0)),
            (p = () =>
              x ? w.getQueryState((0, s.B)(x))?.dataUpdatedAt : void 0),
            (g[2] = x),
            (g[3] = w),
            (g[4] = l),
            (g[5] = n),
            (g[6] = p))
          : ((l = g[4]), (n = g[5]), (p = g[6])));
      let v = (void 0 === b || b) && !!x;
      return (
        g[7] !== t || g[8] !== l || g[9] !== n || g[10] !== p || g[11] !== v
          ? ((h = {
              queryKey: t,
              queryFn: l,
              initialData: n,
              initialDataUpdatedAt: p,
              enabled: v,
              staleTime: 3e5,
              retry: u,
            }),
            (g[7] = t),
            (g[8] = l),
            (g[9] = n),
            (g[10] = p),
            (g[11] = v),
            (g[12] = h))
          : (h = g[12]),
        (0, a.useQuery)(h)
      );
    },
    "J",
    0,
    f,
    "V",
    0,
    c,
  ]);
};
