// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(944410),
    n = e.i(132838),
    i = e.i(690877),
    o = e.i(606933),
    s = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    l = e.i(63289),
    u = e.i(777683),
    c = e.i(418096),
    d = e.i(613677),
    m = e.i(342463),
    p = e.i(866890),
    g = e.i(297865);
  let f =
      "Add at least one allowed origin (for example https://app.example.com).",
    y = c.z.enum(["PENDING", "APPROVED", "REJECTED"]),
    E = d.z.object({
      issuerId: m.z.string().min(1),
      name: m.z.string(),
      description: m.z.string().optional(),
      homepageUrl: m.z.string().optional(),
      imageUrl: m.z.string().optional(),
      ownerAddress: m.z.string(),
    }),
    b = d.z.object({
      issuerId: m.z.string().min(1),
      name: m.z.string(),
      description: m.z.string().optional(),
      homepageUrl: m.z.string().optional(),
      imageUrl: m.z.string().optional(),
      ownerAddress: m.z.string(),
      allowedOrigins: p.z.array(m.z.string()).default([]),
      reviewStatus: y,
      isLive: g.z.boolean(),
      createdAt: m.z.string().optional(),
      updatedAt: m.z.string().optional(),
      reviewedAt: m.z.string().optional(),
      rejectionReason: m.z.string().optional(),
    }),
    w = d.z.object({
      keyId: m.z.string().min(1),
      createdAt: m.z.string(),
      lastFour: m.z.string(),
    }),
    _ = d.z.object({ apiKey: m.z.string().min(1), key: w }),
    O = d.z.object({
      items: p.z.array(E),
      nextCursor: m.z.string().optional(),
    }),
    v = d.z.object({ imageUrl: m.z.string() }),
    A = p.z.array(b),
    T = p.z.array(w),
    N = d.z.object({
      items: p.z.array(b),
      nextCursor: m.z.string().optional(),
    }),
    C = m.z.string().trim().min(1).max(256);
  (d.z.object({
    name: m.z.string().trim().min(1).max(80),
    description: m.z.string().trim().max(500),
    homepageUrl: m.z.string().trim().max(2048),
    imageUrl: m.z.string().trim().max(2048).optional(),
    allowedOrigins: p.z.array(C).min(1, f).max(20),
  }),
    d.z
      .object({
        name: m.z.string().trim().min(1).max(80),
        description: m.z.string().trim().max(500),
        homepageUrl: m.z.string().trim().max(2048),
        imageUrl: m.z.string().trim().max(2048),
        allowedOrigins: p.z.array(C).min(1, f).max(20),
      })
      .partial());
  let h = (e) => {
    let t = new Set(),
      r = [];
    for (let n of e.split(/[\n,]/)) {
      let e = n.trim();
      0 === e.length || t.has(e) || (t.add(e), r.push(e));
    }
    return r;
  };
  e.s(
    [
      "I",
      0,
      500,
      "p",
      0,
      20,
      "v",
      0,
      2,
      "J",
      0,
      80,
      "g",
      0,
      _,
      "T",
      0,
      b,
      "C",
      0,
      (e) => h(e).length >= 1,
      "m",
      0,
      T,
      "y",
      0,
      N,
      "a",
      0,
      A,
      "G",
      0,
      h,
      "U",
      0,
      O,
      "n",
      0,
      v,
    ],
    815096,
  );
  var R = e.i(886599),
    L = e.i(38279);
  let S = "bounties/integrations",
    z = "bounties/moderation/integrations",
    j = (e) => `${S}/me/${encodeURIComponent(e)}`,
    I = (e) => {
      (e.invalidateQueries({
        queryKey: ["bounties", "moderation", "integrations"],
      }),
        e.invalidateQueries({ queryKey: ["bounties", "integrations"] }));
    };
  e.s(
    [
      "h",
      0,
      (e) => {
        let i,
          s,
          c,
          d,
          m = (0, t.c)(14),
          { t: p } = (0, a.f)(),
          g = (0, r.useLivestreamApiClient)(),
          f = (0, o.useQueryClient)();
        return (
          m[0] !== g
            ? ((i = async (e) => {
                let { issuerId: t } = e;
                await g.post(`${z}/${encodeURIComponent(t)}/approve`).text();
              }),
              (m[0] = g),
              (m[1] = i))
            : (i = m[1]),
          m[2] !== e || m[3] !== f || m[4] !== p
            ? ((s = (t, r, n) => {
                (l.c.success(p("web.bounties.integration_approved")),
                  I(f),
                  e?.onSuccess?.(t, r, n));
              }),
              (m[2] = e),
              (m[3] = f),
              (m[4] = p),
              (m[5] = s))
            : (s = m[5]),
          m[6] !== e || m[7] !== p
            ? ((c = async (t, r, n) => {
                (l.c.error(
                  await (0, u.u)(
                    t,
                    p("web.bounties.integration_approve_failed"),
                  ),
                ),
                  e?.onError?.(t, r, n));
              }),
              (m[6] = e),
              (m[7] = p),
              (m[8] = c))
            : (c = m[8]),
          m[9] !== e || m[10] !== i || m[11] !== s || m[12] !== c
            ? ((d = { ...e, mutationFn: i, onSuccess: s, onError: c }),
              (m[9] = e),
              (m[10] = i),
              (m[11] = s),
              (m[12] = c),
              (m[13] = d))
            : (d = m[13]),
          (0, n.f)(d)
        );
      },
      "_",
      0,
      (e) => {
        let i,
          s,
          c,
          d,
          m = (0, t.c)(14),
          { t: p } = (0, a.f)(),
          g = (0, r.useLivestreamApiClient)(),
          f = (0, o.useQueryClient)();
        return (
          m[0] !== g
            ? ((i = async (e) => {
                let t = await g.post(S, { json: e }).json();
                return b.parse(t);
              }),
              (m[0] = g),
              (m[1] = i))
            : (i = m[1]),
          m[2] !== e || m[3] !== f || m[4] !== p
            ? ((s = (t, r, n) => {
                (l.c.success(p("web.bounties.integration_submitted")),
                  f.invalidateQueries({
                    queryKey: L.Q.BOUNTY_MY_INTEGRATIONS(),
                  }),
                  e?.onSuccess?.(t, r, n));
              }),
              (m[2] = e),
              (m[3] = f),
              (m[4] = p),
              (m[5] = s))
            : (s = m[5]),
          m[6] !== e || m[7] !== p
            ? ((c = async (t, r, n) => {
                (l.c.error(
                  await (0, u.u)(
                    t,
                    p("web.bounties.integration_submit_failed"),
                  ),
                ),
                  e?.onError?.(t, r, n));
              }),
              (m[6] = e),
              (m[7] = p),
              (m[8] = c))
            : (c = m[8]),
          m[9] !== e || m[10] !== i || m[11] !== s || m[12] !== c
            ? ((d = { ...e, mutationFn: i, onSuccess: s, onError: c }),
              (m[9] = e),
              (m[10] = i),
              (m[11] = s),
              (m[12] = c),
              (m[13] = d))
            : (d = m[13]),
          (0, n.f)(d)
        );
      },
      "A",
      0,
      (e) => {
        let i,
          s,
          c,
          d,
          m = (0, t.c)(13),
          { t: p } = (0, a.f)(),
          g = (0, r.useLivestreamApiClient)(),
          f = (0, o.useQueryClient)();
        return (
          m[0] !== g
            ? ((i = async (e) => {
                let { issuerId: t, rotateKeyId: r } = e,
                  n = await g
                    .post(`${j(t)}/keys`, { json: r ? { rotateKeyId: r } : {} })
                    .json();
                return _.parse(n);
              }),
              (m[0] = g),
              (m[1] = i))
            : (i = m[1]),
          m[2] !== e || m[3] !== f
            ? ((s = (t, r, n) => {
                (f.invalidateQueries({
                  queryKey: L.Q.BOUNTY_INTEGRATION_KEYS(r.issuerId),
                }),
                  e?.onSuccess?.(t, r, n));
              }),
              (m[2] = e),
              (m[3] = f),
              (m[4] = s))
            : (s = m[4]),
          m[5] !== e || m[6] !== p
            ? ((c = async (t, r, n) => {
                (l.c.error(
                  await (0, u.u)(t, p("web.bounties.api_key_create_failed")),
                ),
                  e?.onError?.(t, r, n));
              }),
              (m[5] = e),
              (m[6] = p),
              (m[7] = c))
            : (c = m[7]),
          m[8] !== e || m[9] !== i || m[10] !== s || m[11] !== c
            ? ((d = { ...e, mutationFn: i, onSuccess: s, onError: c }),
              (m[8] = e),
              (m[9] = i),
              (m[10] = s),
              (m[11] = c),
              (m[12] = d))
            : (d = m[12]),
          (0, n.f)(d)
        );
      },
      "M",
      0,
      (e) => {
        let i,
          s,
          c,
          d,
          m = (0, t.c)(14),
          { t: p } = (0, a.f)(),
          g = (0, r.useLivestreamApiClient)(),
          f = (0, o.useQueryClient)();
        return (
          m[0] !== g
            ? ((i = async (e) => {
                let { issuerId: t, keyId: r } = e;
                await g.delete(`${j(t)}/keys/${encodeURIComponent(r)}`).text();
              }),
              (m[0] = g),
              (m[1] = i))
            : (i = m[1]),
          m[2] !== e || m[3] !== f || m[4] !== p
            ? ((s = (t, r, n) => {
                (l.c.success(p("web.bounties.api_key_revoked")),
                  f.invalidateQueries({
                    queryKey: L.Q.BOUNTY_INTEGRATION_KEYS(r.issuerId),
                  }),
                  e?.onSuccess?.(t, r, n));
              }),
              (m[2] = e),
              (m[3] = f),
              (m[4] = p),
              (m[5] = s))
            : (s = m[5]),
          m[6] !== e || m[7] !== p
            ? ((c = async (t, r, n) => {
                (l.c.error(
                  await (0, u.u)(t, p("web.bounties.api_key_revoke_failed")),
                ),
                  e?.onError?.(t, r, n));
              }),
              (m[6] = e),
              (m[7] = p),
              (m[8] = c))
            : (c = m[8]),
          m[9] !== e || m[10] !== i || m[11] !== s || m[12] !== c
            ? ((d = { ...e, mutationFn: i, onSuccess: s, onError: c }),
              (m[9] = e),
              (m[10] = i),
              (m[11] = s),
              (m[12] = c),
              (m[13] = d))
            : (d = m[13]),
          (0, n.f)(d)
        );
      },
      "$",
      0,
      (e) => {
        let i,
          s,
          c,
          d,
          m = (0, t.c)(14),
          { t: p } = (0, a.f)(),
          g = (0, r.useLivestreamApiClient)(),
          f = (0, o.useQueryClient)();
        return (
          m[0] !== g
            ? ((i = async (e) => {
                let { issuerId: t, reason: r } = e;
                await g
                  .post(`${z}/${encodeURIComponent(t)}/reject`, {
                    json: { reason: r },
                  })
                  .text();
              }),
              (m[0] = g),
              (m[1] = i))
            : (i = m[1]),
          m[2] !== e || m[3] !== f || m[4] !== p
            ? ((s = (t, r, n) => {
                (l.c.success(p("web.bounties.integration_rejected")),
                  I(f),
                  e?.onSuccess?.(t, r, n));
              }),
              (m[2] = e),
              (m[3] = f),
              (m[4] = p),
              (m[5] = s))
            : (s = m[5]),
          m[6] !== e || m[7] !== p
            ? ((c = async (t, r, n) => {
                (l.c.error(
                  await (0, u.u)(
                    t,
                    p("web.bounties.integration_reject_failed"),
                  ),
                ),
                  e?.onError?.(t, r, n));
              }),
              (m[6] = e),
              (m[7] = p),
              (m[8] = c))
            : (c = m[8]),
          m[9] !== e || m[10] !== i || m[11] !== s || m[12] !== c
            ? ((d = { ...e, mutationFn: i, onSuccess: s, onError: c }),
              (m[9] = e),
              (m[10] = i),
              (m[11] = s),
              (m[12] = c),
              (m[13] = d))
            : (d = m[13]),
          (0, n.f)(d)
        );
      },
      "m",
      0,
      (e) => {
        let i,
          s,
          c,
          d,
          m = (0, t.c)(14),
          { t: p } = (0, a.f)(),
          g = (0, r.useLivestreamApiClient)(),
          f = (0, o.useQueryClient)();
        return (
          m[0] !== g
            ? ((i = async (e) => {
                let { issuerId: t, isLive: r } = e;
                await g
                  .post(`${z}/${encodeURIComponent(t)}/live`, {
                    json: { isLive: r },
                  })
                  .text();
              }),
              (m[0] = g),
              (m[1] = i))
            : (i = m[1]),
          m[2] !== e || m[3] !== f || m[4] !== p
            ? ((s = (t, r, n) => {
                (l.c.success(
                  r.isLive
                    ? p("web.bounties.integration_set_live")
                    : p("web.bounties.integration_suspended"),
                ),
                  I(f),
                  e?.onSuccess?.(t, r, n));
              }),
              (m[2] = e),
              (m[3] = f),
              (m[4] = p),
              (m[5] = s))
            : (s = m[5]),
          m[6] !== e || m[7] !== p
            ? ((c = async (t, r, n) => {
                (l.c.error(
                  await (0, u.u)(
                    t,
                    p("web.bounties.integration_live_update_failed"),
                  ),
                ),
                  e?.onError?.(t, r, n));
              }),
              (m[6] = e),
              (m[7] = p),
              (m[8] = c))
            : (c = m[8]),
          m[9] !== e || m[10] !== i || m[11] !== s || m[12] !== c
            ? ((d = { ...e, mutationFn: i, onSuccess: s, onError: c }),
              (m[9] = e),
              (m[10] = i),
              (m[11] = s),
              (m[12] = c),
              (m[13] = d))
            : (d = m[13]),
          (0, n.f)(d)
        );
      },
      "j",
      0,
      (e) => {
        let i,
          s,
          c,
          d,
          m = (0, t.c)(14),
          { t: p } = (0, a.f)(),
          g = (0, r.useLivestreamApiClient)(),
          f = (0, o.useQueryClient)();
        return (
          m[0] !== g
            ? ((i = async (e) => {
                let { issuerId: t, body: r } = e,
                  n = await g.patch(j(t), { json: r }).json();
                return b.parse(n);
              }),
              (m[0] = g),
              (m[1] = i))
            : (i = m[1]),
          m[2] !== e || m[3] !== f || m[4] !== p
            ? ((s = (t, r, n) => {
                (l.c.success(p("web.bounties.integration_updated")),
                  f.invalidateQueries({
                    queryKey: L.Q.BOUNTY_MY_INTEGRATIONS(),
                  }),
                  e?.onSuccess?.(t, r, n));
              }),
              (m[2] = e),
              (m[3] = f),
              (m[4] = p),
              (m[5] = s))
            : (s = m[5]),
          m[6] !== e || m[7] !== p
            ? ((c = async (t, r, n) => {
                (l.c.error(
                  await (0, u.u)(
                    t,
                    p("web.bounties.integration_update_failed"),
                  ),
                ),
                  e?.onError?.(t, r, n));
              }),
              (m[6] = e),
              (m[7] = p),
              (m[8] = c))
            : (c = m[8]),
          m[9] !== e || m[10] !== i || m[11] !== s || m[12] !== c
            ? ((d = { ...e, mutationFn: i, onSuccess: s, onError: c }),
              (m[9] = e),
              (m[10] = i),
              (m[11] = s),
              (m[12] = c),
              (m[13] = d))
            : (d = m[13]),
          (0, n.f)(d)
        );
      },
      "v",
      0,
      (e) => {
        let n,
          o,
          s,
          a = (0, t.c)(10),
          { issuerId: l, enabled: u, queryOptions: c } = e,
          d = (0, r.useLivestreamApiClient)(),
          m = (void 0 === u || u) && "string" == typeof l && "" !== l;
        return (
          a[0] !== l
            ? ((n = L.Q.BOUNTY_INTEGRATION_KEYS(l ?? "")),
              (a[0] = l),
              (a[1] = n))
            : (n = a[1]),
          a[2] !== d || a[3] !== l
            ? ((o = async () => {
                let e = await d.get(`${j(l ?? "")}/keys`).json();
                return T.parse(e);
              }),
              (a[2] = d),
              (a[3] = l),
              (a[4] = o))
            : (o = a[4]),
          a[5] !== m || a[6] !== c || a[7] !== n || a[8] !== o
            ? ((s = { enabled: m, queryKey: n, queryFn: o, ...c }),
              (a[5] = m),
              (a[6] = c),
              (a[7] = n),
              (a[8] = o),
              (a[9] = s))
            : (s = a[9]),
          (0, i.useQuery)(s)
        );
      },
      "O",
      0,
      (e) => {
        let n,
          o,
          s,
          a,
          l,
          u,
          c = (0, t.c)(16),
          { q: d, limit: m, enabled: p, queryOptions: g } = e,
          f = void 0 === m ? 10 : m,
          y = void 0 === p || p,
          E = (0, r.useLivestreamApiClient)();
        return (
          c[0] !== y || c[1] !== f || c[2] !== d
            ? ((a = d.trim()),
              (s = i.useQuery),
              (n = y && a.length > 0),
              (o = L.Q.BOUNTY_INTEGRATION_SEARCH({ q: a, limit: f })),
              (c[0] = y),
              (c[1] = f),
              (c[2] = d),
              (c[3] = n),
              (c[4] = o),
              (c[5] = s),
              (c[6] = a))
            : ((n = c[3]), (o = c[4]), (s = c[5]), (a = c[6])),
          c[7] !== E || c[8] !== f || c[9] !== a
            ? ((l = async () => {
                let e = await E.get(`${S}/search`, {
                  searchParams: { q: a, limit: String(f) },
                }).json();
                return O.parse(e).items;
              }),
              (c[7] = E),
              (c[8] = f),
              (c[9] = a),
              (c[10] = l))
            : (l = c[10]),
          c[11] !== g || c[12] !== n || c[13] !== o || c[14] !== l
            ? ((u = { enabled: n, queryKey: o, queryFn: l, ...g }),
              (c[11] = g),
              (c[12] = n),
              (c[13] = o),
              (c[14] = l),
              (c[15] = u))
            : (u = c[15]),
          s(u)
        );
      },
      "c",
      0,
      (e) => {
        let n,
          o,
          s,
          a = (0, t.c)(10),
          { status: l, enabled: u, queryOptions: c } = e,
          d = void 0 === u || u,
          m = (0, r.useLivestreamApiClient)();
        return (
          a[0] !== l
            ? ((n = L.Q.BOUNTY_MODERATION_INTEGRATIONS(l)),
              (a[0] = l),
              (a[1] = n))
            : (n = a[1]),
          a[2] !== m || a[3] !== l
            ? ((o = async () => {
                let e = await m.get(z, { searchParams: { status: l } }).json();
                return N.parse(e).items;
              }),
              (a[2] = m),
              (a[3] = l),
              (a[4] = o))
            : (o = a[4]),
          a[5] !== d || a[6] !== c || a[7] !== n || a[8] !== o
            ? ((s = { enabled: d, queryKey: n, queryFn: o, ...c }),
              (a[5] = d),
              (a[6] = c),
              (a[7] = n),
              (a[8] = o),
              (a[9] = s))
            : (s = a[9]),
          (0, i.useQuery)(s)
        );
      },
      "e",
      0,
      (e) => {
        let n,
          o,
          s,
          a = (0, t.c)(6),
          l = (0, r.useLivestreamApiClient)();
        return (
          a[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((n = L.Q.BOUNTY_MY_INTEGRATIONS()), (a[0] = n))
            : (n = a[0]),
          a[1] !== l
            ? ((o = async () => {
                let e = await l.get(`${S}/me`).json();
                return A.parse(e);
              }),
              (a[1] = l),
              (a[2] = o))
            : (o = a[2]),
          a[3] !== e || a[4] !== o
            ? ((s = { queryKey: n, queryFn: o, ...e }),
              (a[3] = e),
              (a[4] = o),
              (a[5] = s))
            : (s = a[5]),
          (0, i.useQuery)(s)
        );
      },
      "f",
      0,
      function () {
        let e = (0, r.useLivestreamApiClient)();
        return (0, s.useCallback)(
          async (t, r) => {
            let n = await (0, R.M)(t.file, r?.signal);
            try {
              let i = await e
                .post(`${S}/me/image`, {
                  json: {
                    filename: t.file.name,
                    contentType: t.contentType,
                    data: n,
                  },
                  signal: r?.signal,
                })
                .json();
              return v.parse(i);
            } catch (t) {
              if (t instanceof DOMException && "AbortError" === t.name) throw t;
              let e = await (0, u.u)(t, "Image upload failed");
              throw new R.K(
                e,
                ((e) => {
                  if ("object" != typeof e || null === e) return;
                  let t = "response" in e ? e.response : void 0;
                  return t instanceof Response ? t.status : void 0;
                })(t),
              );
            }
          },
          [e],
        );
      },
    ],
    147038,
  );
};
