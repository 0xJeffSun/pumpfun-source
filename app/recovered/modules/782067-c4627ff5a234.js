// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(149502),
    r = e.i(445242),
    a = e.i(30181),
    n = e.i(690877),
    s = e.i(606933),
    i = e.i(448341),
    o = e.i(528600);
  let l =
      (void 0 !== t.default && "https://frontend-api-v3.pump.fun") ||
      "https://frontend-api-v3.pump.fun",
    u = (e, t) =>
      (!(t instanceof o.M) ||
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
        : (0, a.K)({ clientServerUrl: e })("POST /users/batch", {
            body: { addresses: r },
            credentials: "same-origin",
            hooks: {
              afterResponse: [
                (e, t, r) => {
                  if (!r.ok)
                    throw new o.M({
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
    p = new Map(),
    m = (e) => ["user-profile-batch", e];
  e.s([
    "H",
    0,
    d,
    "T",
    0,
    (e) => {
      let t,
        a,
        o,
        h,
        f,
        g = (0, r.c)(13),
        { address: y, enabled: b } = e,
        v = (0, s.useQueryClient)(),
        w = y ?? "";
      (g[0] !== w ? ((t = m(w)), (g[0] = w), (g[1] = t)) : (t = g[1]),
        g[2] !== y || g[3] !== v
          ? ((a = async () => {
              let e = await ((e) => {
                let t = p.get(e);
                if (!t) {
                  let r, a, n;
                  ((r = new Map()),
                    (a = null),
                    (n = () => {
                      a = null;
                      let t = r;
                      r = new Map();
                      let n = [...t.keys()];
                      for (let r = 0; r < n.length; r += 100) {
                        let a = n.slice(r, r + 100);
                        d(e, a)
                          .then((e) => {
                            let r = c(e);
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
                            null === a && (a = setTimeout(n, 50)));
                        }),
                    }),
                    p.set(e, t));
                }
                return t;
              })(l).fetch(y ?? "");
              if (!e) return null;
              for (let t of [e.address, ...(0, i.i)(e, e.address)])
                t && v.setQueryData((0, i.B)(t), (t) => t ?? e);
              return e;
            }),
            (o = () => (y ? v.getQueryData((0, i.B)(y)) : void 0)),
            (h = () =>
              y ? v.getQueryState((0, i.B)(y))?.dataUpdatedAt : void 0),
            (g[2] = y),
            (g[3] = v),
            (g[4] = a),
            (g[5] = o),
            (g[6] = h))
          : ((a = g[4]), (o = g[5]), (h = g[6])));
      let E = (void 0 === b || b) && !!y;
      return (
        g[7] !== t || g[8] !== a || g[9] !== o || g[10] !== h || g[11] !== E
          ? ((f = {
              queryKey: t,
              queryFn: a,
              initialData: o,
              initialDataUpdatedAt: h,
              enabled: E,
              staleTime: 3e5,
              retry: u,
            }),
            (g[7] = t),
            (g[8] = a),
            (g[9] = o),
            (g[10] = h),
            (g[11] = E),
            (g[12] = f))
          : (f = g[12]),
        (0, n.useQuery)(f)
      );
    },
    "J",
    0,
    m,
    "V",
    0,
    c,
  ]);
};
