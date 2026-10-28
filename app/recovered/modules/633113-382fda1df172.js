// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    n = e.i(759257);
  let i = ["follow-count"],
    a = (e, t) => [...i, e, t],
    o = (e, t, r) =>
      (0, n.j)()(
        "following" === e
          ? "GET /following/v3/following/count/{userId}"
          : "GET /following/v3/followers/count/{userId}",
        { params: { userId: t }, signal: r },
      ),
    s = (e, n, i) => {
      let s,
        l,
        d,
        u,
        m = (0, t.c)(14),
        c = e ?? "";
      m[0] !== c || m[1] !== n
        ? ((s = a(n, c)), (m[0] = c), (m[1] = n), (m[2] = s))
        : (s = m[2]);
      let f = !!e && (void 0 === i || i);
      (m[3] !== n || m[4] !== e
        ? ((l = async (t) => {
            let r,
              { signal: i } = t;
            return "number" == typeof (r = await o(n, e ?? "", i)).count &&
              Number.isFinite(r.count)
              ? r.count
              : null;
          }),
          (m[3] = n),
          (m[4] = e),
          (m[5] = l))
        : (l = m[5]),
        m[6] !== s || m[7] !== f || m[8] !== l
          ? ((d = {
              queryKey: s,
              enabled: f,
              queryFn: l,
              staleTime: 6e4,
              refetchOnWindowFocus: !1,
            }),
            (m[6] = s),
            (m[7] = f),
            (m[8] = l),
            (m[9] = d))
          : (d = m[9]));
      let p = (0, r.useQuery)(d),
        h = p.data ?? null;
      return (
        m[10] !== p.isLoading || m[11] !== p.refetch || m[12] !== h
          ? ((u = { count: h, loading: p.isLoading, refetch: p.refetch }),
            (m[10] = p.isLoading),
            (m[11] = p.refetch),
            (m[12] = h),
            (m[13] = u))
          : (u = m[13]),
        u
      );
    };
  e.s([
    "c",
    0,
    i,
    "U",
    0,
    ({ queryClient: e, type: t, userId: r, delta: n }) => {
      e.setQueryData(a(t, r), (e) =>
        "number" == typeof e ? Math.max(0, e + n) : e,
      );
    },
    "H",
    0,
    o,
    "h",
    0,
    a,
    "D",
    0,
    (e, t) => s(e, "followers", void 0 === t || t),
    "q",
    0,
    (e, t) => s(e, "following", void 0 === t || t),
  ]);
};
