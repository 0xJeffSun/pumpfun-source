// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(149502),
    r = e.i(445242),
    n = e.i(30181),
    a = e.i(690877);
  let i =
      (void 0 !== t.default && "https://frontend-api-v3.pump.fun") ||
      "https://frontend-api-v3.pump.fun",
    l = async (e, t) => {
      let r = [...new Set(t)].filter(Boolean);
      return 0 === r.length
        ? {}
        : (0, n.K)({ clientServerUrl: e })("POST /profiles/verified", {
            body: { ids: r },
            credentials: "same-origin",
            hooks: {
              afterResponse: [
                (e, t, r) => {
                  if (!r.ok) throw Error("Failed to fetch verified profiles");
                },
              ],
            },
          });
    },
    o = async (e, t) => {
      try {
        return await l(e, t);
      } catch {
        return {};
      }
    },
    s = new Map(),
    u = (e) => ["user-verified", e];
  e.s([
    "s",
    0,
    (e, t) => {
      let n,
        l,
        d,
        c,
        f = (0, r.c)(10);
      f[0] !== t
        ? ((n = void 0 === t ? {} : t), (f[0] = t), (f[1] = n))
        : (n = f[1]);
      let { enabled: m } = n,
        h = e ?? "";
      (f[2] !== h ? ((l = u(h)), (f[2] = h), (f[3] = l)) : (l = f[3]),
        f[4] !== e
          ? ((d = () =>
              ((e) => {
                let t = s.get(e);
                if (!t) {
                  let r, n, a;
                  ((r = new Map()),
                    (n = null),
                    (a = () => {
                      n = null;
                      let t = r;
                      r = new Map();
                      let a = [...t.keys()];
                      for (let r = 0; r < a.length; r += 100) {
                        let n = a.slice(r, r + 100);
                        o(e, n)
                          .then((e) => {
                            for (let r of n) {
                              let n = e[r] ?? !1;
                              for (let e of t.get(r) ?? []) e.resolve(n);
                            }
                          })
                          .catch(() => {
                            for (let e of n)
                              for (let r of t.get(e) ?? []) r.resolve(!1);
                          });
                      }
                    }),
                    (t = {
                      fetch: (e) =>
                        new Promise((t) => {
                          let i = r.get(e) ?? [];
                          (i.push({ resolve: t }),
                            r.set(e, i),
                            null === n && (n = setTimeout(a, 50)));
                        }),
                    }),
                    s.set(e, t));
                }
                return t;
              })(i).fetch(e ?? "")),
            (f[4] = e),
            (f[5] = d))
          : (d = f[5]));
      let p = (void 0 === m || m) && !!e;
      f[6] !== l || f[7] !== d || f[8] !== p
        ? ((c = {
            queryKey: l,
            queryFn: d,
            enabled: p,
            staleTime: 18e5,
            retry: !1,
          }),
          (f[6] = l),
          (f[7] = d),
          (f[8] = p),
          (f[9] = c))
        : (c = f[9]);
      let { data: x } = (0, a.useQuery)(c);
      return !0 === x;
    },
    "B",
    0,
    u,
  ]);
};
