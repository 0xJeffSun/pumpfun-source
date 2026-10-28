// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(445242),
    t = e.i(944410),
    s = e.i(690877),
    n = e.i(812768),
    o = e.i(867175),
    a = e.i(54567),
    i = e.i(508695);
  let d = "get-banned-users";
  function l(e, r) {
    if (r instanceof n.f) {
      let e = r.response.status;
      if (401 === e || 403 === e) return !1;
    }
    return e < 3;
  }
  e.s([
    "A",
    0,
    d,
    "Y",
    0,
    (e, n) => {
      let u,
        c,
        m,
        g,
        f,
        v = (0, r.c)(15);
      v[0] !== n
        ? ((u = void 0 === n ? {} : n), (v[0] = n), (v[1] = u))
        : (u = v[1]);
      let { enabled: y } = u,
        h = void 0 === y || y,
        { user: p } = (0, o.X)(),
        I = (0, t.useLivechatApiClient)();
      return (
        v[2] !== e ? ((c = [d, e]), (v[2] = e), (v[3] = c)) : (c = v[3]),
        v[4] !== I || v[5] !== e
          ? ((m = async () => {
              if (!e)
                return (
                  a.logger.debug(
                    "[useGetBannedUsers] Skipping fetch: roomId is missing",
                  ),
                  []
                );
              a.logger.debug(
                `[useGetBannedUsers] Fetching banned users for room: ${e}`,
              );
              try {
                let r = await I.get(`chat/moderation/rooms/${e}/bans`).json();
                return (
                  a.logger.debug(
                    `[useGetBannedUsers] Fetched ${r.length} banned users for room: ${e}`,
                  ),
                  r
                );
              } catch (t) {
                let r = t instanceof Error ? t.message : String(t);
                throw (
                  a.logger.error(
                    `[useGetBannedUsers] Failed to fetch banned users for room: ${e}`,
                    { error: r },
                  ),
                  t
                );
              }
            }),
            (v[4] = I),
            (v[5] = e),
            (v[6] = m))
          : (m = v[6]),
        v[7] !== h || v[8] !== e || v[9] !== p
          ? ((g = !!e && (0, i.T)(p) && h),
            (v[7] = h),
            (v[8] = e),
            (v[9] = p),
            (v[10] = g))
          : (g = v[10]),
        v[11] !== c || v[12] !== m || v[13] !== g
          ? ((f = {
              queryKey: c,
              queryFn: m,
              enabled: g,
              staleTime: 6e4,
              refetchOnWindowFocus: !1,
              retry: l,
            }),
            (v[11] = c),
            (v[12] = m),
            (v[13] = g),
            (v[14] = f))
          : (f = v[14]),
        (0, s.useQuery)(f)
      );
    },
  ]);
};
