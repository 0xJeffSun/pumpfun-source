// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(149502),
    r = e.i(445242),
    a = e.i(30181),
    i = e.i(690877),
    n = e.i(606933),
    l = e.i(448341),
    s = e.i(528600);
  let o =
      (void 0 !== t.default && "https://frontend-api-v3.pump.fun") ||
      "https://frontend-api-v3.pump.fun",
    c = (e, t) =>
      (!(t instanceof s.M) ||
        void 0 === t.status ||
        !(t.status >= 400) ||
        !(t.status < 500)) &&
      e < 1,
    d = (e) => {
      let t = new Map();
      for (let r of e)
        (r?.address && t.set(r.address, r), r?.userId && t.set(r.userId, r));
      return t;
    },
    m = async (e, t) => {
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
                    throw new s.M({
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
    u = new Map(),
    f = (e) => ["user-profile-batch", e];
  e.s([
    "H",
    0,
    m,
    "T",
    0,
    (e) => {
      let t,
        a,
        s,
        h,
        p,
        x = (0, r.c)(13),
        { address: g, enabled: b } = e,
        v = (0, n.useQueryClient)(),
        y = g ?? "";
      (x[0] !== y ? ((t = f(y)), (x[0] = y), (x[1] = t)) : (t = x[1]),
        x[2] !== g || x[3] !== v
          ? ((a = async () => {
              let e = await ((e) => {
                let t = u.get(e);
                if (!t) {
                  let r, a, i;
                  ((r = new Map()),
                    (a = null),
                    (i = () => {
                      a = null;
                      let t = r;
                      r = new Map();
                      let i = [...t.keys()];
                      for (let r = 0; r < i.length; r += 100) {
                        let a = i.slice(r, r + 100);
                        m(e, a)
                          .then((e) => {
                            let r = d(e);
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
                        new Promise((t, n) => {
                          let l = r.get(e) ?? [];
                          (l.push({ resolve: t, reject: n }),
                            r.set(e, l),
                            null === a && (a = setTimeout(i, 50)));
                        }),
                    }),
                    u.set(e, t));
                }
                return t;
              })(o).fetch(g ?? "");
              if (!e) return null;
              for (let t of [e.address, ...(0, l.i)(e, e.address)])
                t && v.setQueryData((0, l.B)(t), (t) => t ?? e);
              return e;
            }),
            (s = () => (g ? v.getQueryData((0, l.B)(g)) : void 0)),
            (h = () =>
              g ? v.getQueryState((0, l.B)(g))?.dataUpdatedAt : void 0),
            (x[2] = g),
            (x[3] = v),
            (x[4] = a),
            (x[5] = s),
            (x[6] = h))
          : ((a = x[4]), (s = x[5]), (h = x[6])));
      let j = (void 0 === b || b) && !!g;
      return (
        x[7] !== t || x[8] !== a || x[9] !== s || x[10] !== h || x[11] !== j
          ? ((p = {
              queryKey: t,
              queryFn: a,
              initialData: s,
              initialDataUpdatedAt: h,
              enabled: j,
              staleTime: 3e5,
              retry: c,
            }),
            (x[7] = t),
            (x[8] = a),
            (x[9] = s),
            (x[10] = h),
            (x[11] = j),
            (x[12] = p))
          : (p = x[12]),
        (0, i.useQuery)(p)
      );
    },
    "J",
    0,
    f,
    "V",
    0,
    d,
  ]);
};
