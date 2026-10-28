// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(149502),
    r = e.i(445242),
    a = e.i(30181),
    i = e.i(690877),
    s = e.i(606933),
    l = e.i(448341),
    o = e.i(528600);
  let n =
      (void 0 !== t.default && "https://frontend-api-v3.pump.fun") ||
      "https://frontend-api-v3.pump.fun",
    d = (e, t) =>
      (!(t instanceof o.M) ||
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
        o,
        p,
        v,
        h = (0, r.c)(13),
        { address: y, enabled: x } = e,
        g = (0, s.useQueryClient)(),
        w = y ?? "";
      (h[0] !== w ? ((t = m(w)), (h[0] = w), (h[1] = t)) : (t = h[1]),
        h[2] !== y || h[3] !== g
          ? ((a = async () => {
              let e = await ((e) => {
                let t = f.get(e);
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
                          let l = r.get(e) ?? [];
                          (l.push({ resolve: t, reject: s }),
                            r.set(e, l),
                            null === a && (a = setTimeout(i, 50)));
                        }),
                    }),
                    f.set(e, t));
                }
                return t;
              })(n).fetch(y ?? "");
              if (!e) return null;
              for (let t of [e.address, ...(0, l.i)(e, e.address)])
                t && g.setQueryData((0, l.B)(t), (t) => t ?? e);
              return e;
            }),
            (o = () => (y ? g.getQueryData((0, l.B)(y)) : void 0)),
            (p = () =>
              y ? g.getQueryState((0, l.B)(y))?.dataUpdatedAt : void 0),
            (h[2] = y),
            (h[3] = g),
            (h[4] = a),
            (h[5] = o),
            (h[6] = p))
          : ((a = h[4]), (o = h[5]), (p = h[6])));
      let b = (void 0 === x || x) && !!y;
      return (
        h[7] !== t || h[8] !== a || h[9] !== o || h[10] !== p || h[11] !== b
          ? ((v = {
              queryKey: t,
              queryFn: a,
              initialData: o,
              initialDataUpdatedAt: p,
              enabled: b,
              staleTime: 3e5,
              retry: d,
            }),
            (h[7] = t),
            (h[8] = a),
            (h[9] = o),
            (h[10] = p),
            (h[11] = b),
            (h[12] = v))
          : (v = h[12]),
        (0, i.useQuery)(v)
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
