// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(30181),
    r = e.i(690877),
    i = e.i(606933),
    a = e.i(136354),
    o = e.i(786480);
  let s = (e) => ["user", e],
    l = (e, t) =>
      (0, o.f)(e.address)
        ? []
        : [e.userId, e.address, e.username].filter((e) => !!e && e !== t);
  e.s(["i", 0, l, "B", 0, s], 448341);
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
    d = (e) =>
      e instanceof u &&
      void 0 !== e.status &&
      e.status >= 400 &&
      e.status < 500,
    f = (e, t) => !d(t) && e < 3,
    h = (e) => {
      let n,
        a,
        o,
        u = (0, t.c)(11),
        {
          clientServerUrl: c,
          enabled: d,
          queryOptions: h,
          userIdentifier: p,
        } = e,
        g = (d ?? !0) && !!p,
        y = (0, i.useQueryClient)();
      return (
        u[0] !== c || u[1] !== y || u[2] !== p
          ? ((n = async () => {
              let e = await m({ clientServerUrl: c, userIdentifier: p });
              for (let t of l(e, p)) y.setQueryData(s(t), (t) => t ?? e);
              return e;
            }),
            (u[0] = c),
            (u[1] = y),
            (u[2] = p),
            (u[3] = n))
          : (n = u[3]),
        u[4] !== p ? ((a = s(p)), (u[4] = p), (u[5] = a)) : (a = u[5]),
        u[6] !== g || u[7] !== h || u[8] !== n || u[9] !== a
          ? ((o = {
              enabled: g,
              queryFn: n,
              queryKey: a,
              refetchOnMount: !1,
              refetchOnWindowFocus: !1,
              retry: f,
              ...h,
            }),
            (u[6] = g),
            (u[7] = h),
            (u[8] = n),
            (u[9] = a),
            (u[10] = o))
          : (o = u[10]),
        (0, r.useQuery)(o)
      );
    },
    p = async (e) => {
      try {
        return (await m(e), "exists");
      } catch (e) {
        return c(e) ? "missing" : "unknown";
      }
    },
    m = async (e) => {
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
      m,
      "r",
      0,
      d,
      "g",
      0,
      c,
      "B",
      0,
      f,
      "U",
      0,
      (e) => {
        let n,
          r = (0, t.c)(5),
          { enabled: i, queryOptions: o, userIdentifier: s } = e,
          { clientServerUrl: l } = (0, a.useUserConfig)();
        return (
          r[0] !== l || r[1] !== i || r[2] !== o || r[3] !== s
            ? ((n = {
                clientServerUrl: l,
                enabled: i,
                queryOptions: o,
                userIdentifier: s,
              }),
              (r[0] = l),
              (r[1] = i),
              (r[2] = o),
              (r[3] = s),
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
