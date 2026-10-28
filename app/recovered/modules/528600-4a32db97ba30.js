// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(30181),
    r = e.i(690877),
    i = e.i(606933),
    o = e.i(136354),
    s = e.i(786480);
  let a = (e) => ["user", e],
    l = (e, t) =>
      (0, s.f)(e.address)
        ? []
        : [e.userId, e.address, e.username].filter((e) => !!e && e !== t);
  e.s(["i", 0, l, "B", 0, a], 448341);
  class u extends Error {
    reason;
    status;
    constructor({ reason: e, status: t } = {}) {
      (super("Failed to fetch user"),
        (this.name = "UserFetchError"),
        (this.status = t),
        (this.reason =
          e ??
          (404 === t ? "not_found" : void 0 !== t ? "http_error" : "unknown")));
    }
  }
  let c = (e) => e instanceof u && "not_found" === e.reason,
    f = (e) =>
      e instanceof u &&
      void 0 !== e.status &&
      e.status >= 400 &&
      e.status < 500,
    d = (e, t) => !f(t) && e < 3,
    h = (e) => {
      let n,
        o,
        s,
        u = (0, t.c)(11),
        {
          clientServerUrl: c,
          enabled: f,
          queryOptions: h,
          userIdentifier: p,
        } = e,
        m = (f ?? !0) && !!p,
        y = (0, i.useQueryClient)();
      return (
        u[0] !== c || u[1] !== y || u[2] !== p
          ? ((n = async () => {
              let e = await g({ clientServerUrl: c, userIdentifier: p });
              for (let t of l(e, p)) y.setQueryData(a(t), (t) => t ?? e);
              return e;
            }),
            (u[0] = c),
            (u[1] = y),
            (u[2] = p),
            (u[3] = n))
          : (n = u[3]),
        u[4] !== p ? ((o = a(p)), (u[4] = p), (u[5] = o)) : (o = u[5]),
        u[6] !== m || u[7] !== h || u[8] !== n || u[9] !== o
          ? ((s = {
              enabled: m,
              queryFn: n,
              queryKey: o,
              refetchOnMount: !1,
              refetchOnWindowFocus: !1,
              retry: d,
              ...h,
            }),
            (u[6] = m),
            (u[7] = h),
            (u[8] = n),
            (u[9] = o),
            (u[10] = s))
          : (s = u[10]),
        (0, r.useQuery)(s)
      );
    },
    p = async (e) => {
      try {
        return (await g(e), "exists");
      } catch (e) {
        return c(e) ? "missing" : "unknown";
      }
    },
    g = async (e) => {
      let { clientServerUrl: t, fetchOptions: r, userIdentifier: i } = e;
      try {
        return await (0, n.K)({ clientServerUrl: t })("GET /users/{id}", {
          ...r,
          params: { id: i },
          credentials: r?.credentials ?? "same-origin",
          retry: 0,
          hooks: {
            afterResponse: [
              async (e, t, n) => {
                if (!n.ok)
                  throw new u({
                    reason: 404 === n.status ? "not_found" : "http_error",
                    status: n.status,
                  });
                if ("" === (await n.clone().text()).trim())
                  throw new u({ reason: "empty_body" });
              },
            ],
          },
        });
      } catch (e) {
        if (e instanceof SyntaxError) throw new u({ reason: "invalid_json" });
        throw e;
      }
    };
  e.s(
    [
      "M",
      0,
      u,
      "d",
      0,
      p,
      "e",
      0,
      g,
      "r",
      0,
      f,
      "g",
      0,
      c,
      "B",
      0,
      d,
      "U",
      0,
      (e) => {
        let n,
          r = (0, t.c)(5),
          { enabled: i, queryOptions: s, userIdentifier: a } = e,
          { clientServerUrl: l } = (0, o.useUserConfig)();
        return (
          r[0] !== l || r[1] !== i || r[2] !== s || r[3] !== a
            ? ((n = {
                clientServerUrl: l,
                enabled: i,
                queryOptions: s,
                userIdentifier: a,
              }),
              (r[0] = l),
              (r[1] = i),
              (r[2] = s),
              (r[3] = a),
              (r[4] = n))
            : (n = r[4]),
          h(n)
        );
      },
      "C",
      0,
      h,
    ],
    528600,
  );
};
