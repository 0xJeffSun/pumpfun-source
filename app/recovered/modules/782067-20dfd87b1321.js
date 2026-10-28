// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(149502),
    a = e.i(445242),
    i = e.i(30181),
    n = e.i(690877),
    r = e.i(606933),
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
      for (let a of e)
        (a?.address && t.set(a.address, a), a?.userId && t.set(a.userId, a));
      return t;
    },
    m = async (e, t) => {
      let a = [...new Set(t)].filter(Boolean);
      return 0 === a.length
        ? []
        : (0, i.K)({ clientServerUrl: e })("POST /users/batch", {
            body: { addresses: a },
            credentials: "same-origin",
            hooks: {
              afterResponse: [
                (e, t, a) => {
                  if (!a.ok)
                    throw new s.M({
                      reason: 404 === a.status ? "not_found" : "http_error",
                      status: a.status,
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
    h = (e) => ["user-profile-batch", e];
  e.s([
    "H",
    0,
    m,
    "T",
    0,
    (e) => {
      let t,
        i,
        s,
        p,
        f,
        x = (0, a.c)(13),
        { address: _, enabled: g } = e,
        y = (0, r.useQueryClient)(),
        v = _ ?? "";
      (x[0] !== v ? ((t = h(v)), (x[0] = v), (x[1] = t)) : (t = x[1]),
        x[2] !== _ || x[3] !== y
          ? ((i = async () => {
              let e = await ((e) => {
                let t = u.get(e);
                if (!t) {
                  let a, i, n;
                  ((a = new Map()),
                    (i = null),
                    (n = () => {
                      i = null;
                      let t = a;
                      a = new Map();
                      let n = [...t.keys()];
                      for (let a = 0; a < n.length; a += 100) {
                        let i = n.slice(a, a + 100);
                        m(e, i)
                          .then((e) => {
                            let a = d(e);
                            for (let e of i) {
                              let i = a.get(e) ?? null;
                              for (let a of t.get(e) ?? []) a.resolve(i);
                            }
                          })
                          .catch((e) => {
                            for (let a of i)
                              for (let i of t.get(a) ?? []) i.reject(e);
                          });
                      }
                    }),
                    (t = {
                      fetch: (e) =>
                        new Promise((t, r) => {
                          let l = a.get(e) ?? [];
                          (l.push({ resolve: t, reject: r }),
                            a.set(e, l),
                            null === i && (i = setTimeout(n, 50)));
                        }),
                    }),
                    u.set(e, t));
                }
                return t;
              })(o).fetch(_ ?? "");
              if (!e) return null;
              for (let t of [e.address, ...(0, l.i)(e, e.address)])
                t && y.setQueryData((0, l.B)(t), (t) => t ?? e);
              return e;
            }),
            (s = () => (_ ? y.getQueryData((0, l.B)(_)) : void 0)),
            (p = () =>
              _ ? y.getQueryState((0, l.B)(_))?.dataUpdatedAt : void 0),
            (x[2] = _),
            (x[3] = y),
            (x[4] = i),
            (x[5] = s),
            (x[6] = p))
          : ((i = x[4]), (s = x[5]), (p = x[6])));
      let b = (void 0 === g || g) && !!_;
      return (
        x[7] !== t || x[8] !== i || x[9] !== s || x[10] !== p || x[11] !== b
          ? ((f = {
              queryKey: t,
              queryFn: i,
              initialData: s,
              initialDataUpdatedAt: p,
              enabled: b,
              staleTime: 3e5,
              retry: c,
            }),
            (x[7] = t),
            (x[8] = i),
            (x[9] = s),
            (x[10] = p),
            (x[11] = b),
            (x[12] = f))
          : (f = x[12]),
        (0, n.useQuery)(f)
      );
    },
    "J",
    0,
    h,
    "V",
    0,
    d,
  ]);
};
