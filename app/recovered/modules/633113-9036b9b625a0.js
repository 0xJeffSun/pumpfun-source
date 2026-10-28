// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    i = e.i(759257);
  let l = ["follow-count"],
    o = (e, t) => [...l, e, t],
    n = (e, t, r) =>
      (0, i.j)()(
        "following" === e
          ? "GET /following/v3/following/count/{userId}"
          : "GET /following/v3/followers/count/{userId}",
        { params: { userId: t }, signal: r },
      ),
    s = (e, i, l) => {
      let s,
        a,
        c,
        d,
        u = (0, t.c)(14),
        f = e ?? "";
      u[0] !== f || u[1] !== i
        ? ((s = o(i, f)), (u[0] = f), (u[1] = i), (u[2] = s))
        : (s = u[2]);
      let p = !!e && (void 0 === l || l);
      (u[3] !== i || u[4] !== e
        ? ((a = async (t) => {
            let r,
              { signal: l } = t;
            return "number" == typeof (r = await n(i, e ?? "", l)).count &&
              Number.isFinite(r.count)
              ? r.count
              : null;
          }),
          (u[3] = i),
          (u[4] = e),
          (u[5] = a))
        : (a = u[5]),
        u[6] !== s || u[7] !== p || u[8] !== a
          ? ((c = {
              queryKey: s,
              enabled: p,
              queryFn: a,
              staleTime: 6e4,
              refetchOnWindowFocus: !1,
            }),
            (u[6] = s),
            (u[7] = p),
            (u[8] = a),
            (u[9] = c))
          : (c = u[9]));
      let m = (0, r.useQuery)(c),
        h = m.data ?? null;
      return (
        u[10] !== m.isLoading || u[11] !== m.refetch || u[12] !== h
          ? ((d = { count: h, loading: m.isLoading, refetch: m.refetch }),
            (u[10] = m.isLoading),
            (u[11] = m.refetch),
            (u[12] = h),
            (u[13] = d))
          : (d = u[13]),
        d
      );
    };
  e.s([
    "c",
    0,
    l,
    "U",
    0,
    ({ queryClient: e, type: t, userId: r, delta: i }) => {
      e.setQueryData(o(t, r), (e) =>
        "number" == typeof e ? Math.max(0, e + i) : e,
      );
    },
    "H",
    0,
    n,
    "h",
    0,
    o,
    "D",
    0,
    (e, t) => s(e, "followers", void 0 === t || t),
    "q",
    0,
    (e, t) => s(e, "following", void 0 === t || t),
  ]);
};
