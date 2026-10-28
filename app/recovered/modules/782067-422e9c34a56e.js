// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(149502),
    r = e.i(445242),
    a = e.i(30181),
    l = e.i(690877),
    s = e.i(606933),
    i = e.i(448341),
    n = e.i(528600);
  let o =
      (void 0 !== t.default && "https://frontend-api-v3.pump.fun") ||
      "https://frontend-api-v3.pump.fun",
    d = (e, t) =>
      (!(t instanceof n.M) ||
        void 0 === t.status ||
        !(t.status >= 400) ||
        !(t.status < 500)) &&
      e < 1,
    u = (e) => {
      let t = new Map();
      for (let r of e)
        (r?.address && t.set(r.address, r), r?.userId && t.set(r.userId, r));
      return t;
    },
    c = async (e, t) => {
      let r = [...new Set(t)].filter(Boolean);
      return 0 === r.length
        ? []
        : (0, a.K)({ clientServerUrl: e })("POST /users/batch", {
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
    f = new Map(),
    m = (e) => ["user-profile-batch", e];
  e.s([
    "H",
    0,
    c,
    "T",
    0,
    (e) => {
      let t,
        a,
        n,
        p,
        h,
        g = (0, r.c)(13),
        { address: b, enabled: w } = e,
        y = (0, s.useQueryClient)(),
        v = b ?? "";
      (g[0] !== v ? ((t = m(v)), (g[0] = v), (g[1] = t)) : (t = g[1]),
        g[2] !== b || g[3] !== y
          ? ((a = async () => {
              let e = await ((e) => {
                let t = f.get(e);
                if (!t) {
                  let r, a, l;
                  ((r = new Map()),
                    (a = null),
                    (l = () => {
                      a = null;
                      let t = r;
                      r = new Map();
                      let l = [...t.keys()];
                      for (let r = 0; r < l.length; r += 100) {
                        let a = l.slice(r, r + 100);
                        c(e, a)
                          .then((e) => {
                            let r = u(e);
                            for (let e of a) {
                              let a = r.get(e) ?? null;
                              for (let r of t.get(e) ?? []) r.resolve(a);
                            }
                          })
                          .catch((e) => {
                            for (let r of a)
                              for (let a of t.get(r) ?? []) a.reject(e);
                          });
                      }
                    }),
                    (t = {
                      fetch: (e) =>
                        new Promise((t, s) => {
                          let i = r.get(e) ?? [];
                          (i.push({ resolve: t, reject: s }),
                            r.set(e, i),
                            null === a && (a = setTimeout(l, 50)));
                        }),
                    }),
                    f.set(e, t));
                }
                return t;
              })(o).fetch(b ?? "");
              if (!e) return null;
              for (let t of [e.address, ...(0, i.i)(e, e.address)])
                t && y.setQueryData((0, i.B)(t), (t) => t ?? e);
              return e;
            }),
            (n = () => (b ? y.getQueryData((0, i.B)(b)) : void 0)),
            (p = () =>
              b ? y.getQueryState((0, i.B)(b))?.dataUpdatedAt : void 0),
            (g[2] = b),
            (g[3] = y),
            (g[4] = a),
            (g[5] = n),
            (g[6] = p))
          : ((a = g[4]), (n = g[5]), (p = g[6])));
      let x = (void 0 === w || w) && !!b;
      return (
        g[7] !== t || g[8] !== a || g[9] !== n || g[10] !== p || g[11] !== x
          ? ((h = {
              queryKey: t,
              queryFn: a,
              initialData: n,
              initialDataUpdatedAt: p,
              enabled: x,
              staleTime: 3e5,
              retry: d,
            }),
            (g[7] = t),
            (g[8] = a),
            (g[9] = n),
            (g[10] = p),
            (g[11] = x),
            (g[12] = h))
          : (h = g[12]),
        (0, l.useQuery)(h)
      );
    },
    "J",
    0,
    m,
    "V",
    0,
    u,
  ]);
};
