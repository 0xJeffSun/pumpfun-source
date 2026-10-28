// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(944410),
    r = e.i(418096),
    i = e.i(613677),
    o = e.i(342463),
    a = e.i(637782),
    u = e.i(866890),
    l = e.i(297865);
  let c = r.z.enum([
      "uploading",
      "processing",
      "moderating",
      "published",
      "rejected",
      "failed",
      "removed",
    ]),
    s = ["spam", "sexual", "violence", "illegal", "hate", "other"];
  r.z.enum(s);
  let f = i.z.object({
      videoId: o.z.string(),
      ownerAddress: o.z.string(),
      ownerUserId: o.z.string().optional(),
      title: o.z.string(),
      description: o.z.string().optional(),
      featuredCoinMint: o.z.string().optional(),
      status: c,
      duration: a.z.number().optional(),
      playbackId: o.z.string().optional(),
      hlsUrl: o.z.string().optional(),
      mp4Url: o.z.string().optional(),
      posterUrl: o.z.string().optional(),
      thumbnailUrl: o.z.string().optional(),
      viewCount: a.z.number(),
      createdAt: o.z.string(),
      publishedAt: o.z.string().optional(),
      rejectionReason: o.z.string().optional(),
      reportCount: a.z.number().optional(),
    }),
    p = i.z.object({
      videos: u.z.array(f),
      nextCursor: o.z.string().optional(),
    }),
    d = i.z.object({ videoId: o.z.string(), uploadUrl: o.z.string().url() }),
    m = i.z.object({
      success: l.z.boolean(),
      message: o.z.string().optional(),
    });
  (e.s(["r", 0, s, "I", 0, d, "Q", 0, m, "G", 0, p, "L", 0, f], 66537),
    e.s(
      [
        "f",
        0,
        function () {
          let e,
            r = (0, t.c)(2),
            i = (0, n.useLivestreamApiClient)();
          return (
            r[0] !== i
              ? ((e = async (e, t) => {
                  let n = await i
                    .post("user-videos/uploads", { json: e, signal: t?.signal })
                    .json();
                  return d.parse(n);
                }),
                (r[0] = i),
                (r[1] = e))
              : (e = r[1]),
            e
          );
        },
      ],
      334903,
    ));
  var v = e.i(132838),
    g = e.i(606933);
  let y = ({ userId: e, address: t }) => e?.trim() || t?.trim() || "",
    b = {
      root: ["user-videos"],
      byUser: (e, t) => ["user-videos", "byUser", "v2", e, t ?? null],
      byCoin: (e, t) => ["user-videos", "byCoin", e, t ?? null],
      detail: (e) => ["user-videos", "detail", e],
    };
  (e.s(["J", 0, b, "K", 0, y], 567341),
    e.s(
      [
        "f",
        0,
        function (e) {
          let r,
            i,
            o,
            a,
            u,
            l,
            c = (0, t.c)(14);
          c[0] !== e
            ? ((r = void 0 === e ? {} : e), (c[0] = e), (c[1] = r))
            : (r = c[1]);
          let s = r;
          c[2] !== s
            ? (({ onSuccess: i, ...o } = s), (c[2] = s), (c[3] = i), (c[4] = o))
            : ((i = c[3]), (o = c[4]));
          let f = (0, n.useLivestreamApiClient)(),
            p = (0, g.useQueryClient)();
          return (
            c[5] !== f
              ? ((a = async (e) => {
                  let { videoId: t } = e,
                    n = await f
                      .delete(`user-videos/${encodeURIComponent(t)}`)
                      .json();
                  return m.parse(n);
                }),
                (c[5] = f),
                (c[6] = a))
              : (a = c[6]),
            c[7] !== i || c[8] !== p
              ? ((u = (e, t, n) => {
                  (p.invalidateQueries({ queryKey: b.root }), i?.(e, t, n));
                }),
                (c[7] = i),
                (c[8] = p),
                (c[9] = u))
              : (u = c[9]),
            c[10] !== o || c[11] !== a || c[12] !== u
              ? ((l = { ...o, mutationFn: a, onSuccess: u }),
                (c[10] = o),
                (c[11] = a),
                (c[12] = u),
                (c[13] = l))
              : (l = c[13]),
            (0, v.f)(l)
          );
        },
      ],
      731566,
    ));
  var h = e.i(761459);
  function w(e) {
    return e.nextCursor ?? void 0;
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let r,
          i,
          o,
          a,
          u,
          l,
          c,
          s = (0, t.c)(22),
          {
            userId: f,
            address: d,
            limit: m,
            enabled: v,
            refetchInterval: x,
          } = e,
          j = void 0 === v || v,
          D = (0, n.useLivestreamApiClient)(),
          A = (0, g.useQueryClient)();
        if (s[0] !== d || s[1] !== j || s[2] !== m || s[3] !== f) {
          let e;
          ((r = y({ userId: f, address: d })),
            s[9] !== f
              ? ((e = f?.trim()), (s[9] = f), (s[10] = e))
              : (e = s[10]),
            (i = !e),
            (u = h.useInfiniteQuery),
            (o = j && !!r),
            (a = b.byUser(r, m)),
            (s[0] = d),
            (s[1] = j),
            (s[2] = m),
            (s[3] = f),
            (s[4] = r),
            (s[5] = i),
            (s[6] = o),
            (s[7] = a),
            (s[8] = u));
        } else ((r = s[4]), (i = s[5]), (o = s[6]), (a = s[7]), (u = s[8]));
        return (
          s[11] !== D ||
          s[12] !== r ||
          s[13] !== i ||
          s[14] !== m ||
          s[15] !== A
            ? ((l = async (e) => {
                let { pageParam: t } = e,
                  n = {};
                (null != m && (n.limit = String(m)), t && (n.cursor = t));
                let o = await D.get(
                    `user-videos/users/${encodeURIComponent(r)}`,
                    { searchParams: n },
                  ).json(),
                  a = p.parse(o),
                  u = a.videos[0]?.ownerUserId;
                return (
                  i &&
                    !t &&
                    u &&
                    A.setQueryData(
                      b.byUser(u, m),
                      (e) => e ?? { pages: [a], pageParams: [void 0] },
                    ),
                  a
                );
              }),
              (s[11] = D),
              (s[12] = r),
              (s[13] = i),
              (s[14] = m),
              (s[15] = A),
              (s[16] = l))
            : (l = s[16]),
          s[17] !== x || s[18] !== o || s[19] !== a || s[20] !== l
            ? ((c = {
                enabled: o,
                queryKey: a,
                refetchInterval: x,
                initialPageParam: void 0,
                queryFn: l,
                getNextPageParam: w,
              }),
              (s[17] = x),
              (s[18] = o),
              (s[19] = a),
              (s[20] = l),
              (s[21] = c))
            : (c = s[21]),
          u(c)
        );
      },
    ],
    599640,
  );
  var x = e.i(254667);
  (e.s(
    [
      "f",
      0,
      function () {
        let e,
          r = (0, t.c)(2),
          i = (0, n.useLivestreamApiClient)();
        return (
          r[0] !== i
            ? ((e = async (e) => {
                try {
                  await i.post(`user-videos/${encodeURIComponent(e)}/view`);
                } catch (e) {
                  x.y.warn("Failed to record user video view", {
                    error: e instanceof Error ? e.message : String(e),
                  });
                }
              }),
              (r[0] = i),
              (r[1] = e))
            : (e = r[1]),
          e
        );
      },
    ],
    172492,
  ),
    e.i(12692));
  var j = e.i(398902),
    D = e.i(63289);
  (e.s(
    [
      "f",
      0,
      function (e) {
        let r,
          i,
          o,
          a,
          u,
          l,
          c,
          s,
          f,
          p = (0, t.c)(22);
        p[0] !== e
          ? ((r = void 0 === e ? {} : e), (p[0] = e), (p[1] = r))
          : (r = p[1]);
        let d = r;
        p[2] !== d
          ? (({ onSuccess: o, onError: i, showToasts: u, ...a } = d),
            (p[2] = d),
            (p[3] = i),
            (p[4] = o),
            (p[5] = a),
            (p[6] = u))
          : ((i = p[3]), (o = p[4]), (a = p[5]), (u = p[6]));
        let g = void 0 === u || u,
          { t: y } = (0, j.f)(),
          b = (0, n.useLivestreamApiClient)();
        return (
          p[7] !== b
            ? ((l = async (e) => {
                let { videoId: t, reason: n, description: r } = e,
                  i = await b
                    .post(`user-videos/${encodeURIComponent(t)}/report`, {
                      json: { reason: n, description: r },
                    })
                    .json();
                return m.parse(i);
              }),
              (p[7] = b),
              (p[8] = l))
            : (l = p[8]),
          p[9] !== o || p[10] !== g || p[11] !== y
            ? ((c = (e, t, n) => {
                (g && D.c.success(y("web.report.video_report_submitted")),
                  o?.(e, t, n));
              }),
              (p[9] = o),
              (p[10] = g),
              (p[11] = y),
              (p[12] = c))
            : (c = p[12]),
          p[13] !== i || p[14] !== g || p[15] !== y
            ? ((s = (e, t, n) => {
                (g && D.c.error(y("web.report.submit_failed")), i?.(e, t, n));
              }),
              (p[13] = i),
              (p[14] = g),
              (p[15] = y),
              (p[16] = s))
            : (s = p[16]),
          p[17] !== a || p[18] !== l || p[19] !== c || p[20] !== s
            ? ((f = { ...a, mutationFn: l, onSuccess: c, onError: s }),
              (p[17] = a),
              (p[18] = l),
              (p[19] = c),
              (p[20] = s),
              (p[21] = f))
            : (f = p[21]),
          (0, v.f)(f)
        );
      },
    ],
    638914,
  ),
    e.s(
      [
        "f",
        0,
        function (e) {
          let r,
            i,
            o,
            a,
            u,
            l,
            c = (0, t.c)(14);
          c[0] !== e
            ? ((r = void 0 === e ? {} : e), (c[0] = e), (c[1] = r))
            : (r = c[1]);
          let s = r;
          c[2] !== s
            ? (({ onSuccess: i, ...o } = s), (c[2] = s), (c[3] = i), (c[4] = o))
            : ((i = c[3]), (o = c[4]));
          let p = (0, n.useLivestreamApiClient)(),
            d = (0, g.useQueryClient)();
          return (
            c[5] !== p
              ? ((a = async (e) => {
                  let { videoId: t, ...n } = e,
                    r = await p
                      .post(`user-videos/${encodeURIComponent(t)}/thumbnail`, {
                        json: n,
                      })
                      .json();
                  return f.parse(r);
                }),
                (c[5] = p),
                (c[6] = a))
              : (a = c[6]),
            c[7] !== i || c[8] !== d
              ? ((u = (e, t, n) => {
                  (d.invalidateQueries({ queryKey: b.root }), i?.(e, t, n));
                }),
                (c[7] = i),
                (c[8] = d),
                (c[9] = u))
              : (u = c[9]),
            c[10] !== o || c[11] !== a || c[12] !== u
              ? ((l = { ...o, mutationFn: a, onSuccess: u }),
                (c[10] = o),
                (c[11] = a),
                (c[12] = u),
                (c[13] = l))
              : (l = c[13]),
            (0, v.f)(l)
          );
        },
      ],
      623478,
    ),
    e.s(
      [
        "f",
        0,
        function (e) {
          let r,
            i,
            o,
            a,
            u,
            l,
            c = (0, t.c)(14);
          c[0] !== e
            ? ((r = void 0 === e ? {} : e), (c[0] = e), (c[1] = r))
            : (r = c[1]);
          let s = r;
          c[2] !== s
            ? (({ onSuccess: i, ...o } = s), (c[2] = s), (c[3] = i), (c[4] = o))
            : ((i = c[3]), (o = c[4]));
          let p = (0, n.useLivestreamApiClient)(),
            d = (0, g.useQueryClient)();
          return (
            c[5] !== p
              ? ((a = async (e) => {
                  let { videoId: t, ...n } = e,
                    r = await p
                      .patch(`user-videos/${encodeURIComponent(t)}`, {
                        json: n,
                      })
                      .json();
                  return f.parse(r);
                }),
                (c[5] = p),
                (c[6] = a))
              : (a = c[6]),
            c[7] !== i || c[8] !== d
              ? ((u = (e, t, n) => {
                  (d.invalidateQueries({ queryKey: b.root }), i?.(e, t, n));
                }),
                (c[7] = i),
                (c[8] = d),
                (c[9] = u))
              : (u = c[9]),
            c[10] !== o || c[11] !== a || c[12] !== u
              ? ((l = { ...o, mutationFn: a, onSuccess: u }),
                (c[10] = o),
                (c[11] = a),
                (c[12] = u),
                (c[13] = l))
              : (l = c[13]),
            (0, v.f)(l)
          );
        },
      ],
      302301,
    ));
  var A = e.i(690877);
  (e.s(
    [
      "f",
      0,
      function (e) {
        let r,
          i,
          o,
          a = (0, t.c)(11),
          { mintId: u, limit: l, enabled: c } = e,
          s = (0, n.useLivestreamApiClient)(),
          f = (void 0 === c || c) && !!u;
        return (
          a[0] !== l || a[1] !== u
            ? ((r = b.byCoin(u, l)), (a[0] = l), (a[1] = u), (a[2] = r))
            : (r = a[2]),
          a[3] !== s || a[4] !== l || a[5] !== u
            ? ((i = async () => {
                let e = {};
                null != l && (e.limit = String(l));
                let t = await s
                  .get(`user-videos/coins/${encodeURIComponent(u)}`, {
                    searchParams: e,
                  })
                  .json();
                return p.parse(t);
              }),
              (a[3] = s),
              (a[4] = l),
              (a[5] = u),
              (a[6] = i))
            : (i = a[6]),
          a[7] !== f || a[8] !== r || a[9] !== i
            ? ((o = { enabled: f, queryKey: r, queryFn: i }),
              (a[7] = f),
              (a[8] = r),
              (a[9] = i),
              (a[10] = o))
            : (o = a[10]),
          (0, A.useQuery)(o)
        );
      },
    ],
    118285,
  ),
    e.s([], 260985));
};
