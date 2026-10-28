// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(402030),
    l = e.i(690877),
    n = e.i(759257),
    a = e.i(779106);
  let r = ["linked-x-social"],
    s = (e) => {
      let t = e.socials.find((e) => "twitter" === e.provider);
      return t?.username.trim()
        ? {
            username: t.username,
            profileImageUrl: t.profileImageUrl,
            followerCount: t.followerCount,
            url: t.url,
            linkedAt: t.linkedAt,
          }
        : null;
    },
    o = async ({ profileId: e, signal: t }) => {
      try {
        let i = await (0, n.j)()("GET /users/{id}/socials", {
          params: { id: e },
          credentials: "include",
          signal: t,
        });
        return s(i);
      } catch (e) {
        if ((0, i.isContractError)(e)) return null;
        throw e;
      }
    };
  e.s([
    "V",
    0,
    r,
    "A",
    0,
    s,
    "Q",
    0,
    (e) => {
      let i,
        n,
        s,
        c = (0, t.c)(9),
        { profileId: d, enabled: u } = e,
        x = (0, a.f)("linked-x-social"),
        m = d ?? "",
        f = x ?? "";
      c[0] !== m || c[1] !== f
        ? ((i = [...r, m, f]), (c[0] = m), (c[1] = f), (c[2] = i))
        : (i = c[2]);
      let b = (void 0 === u || u) && !!d && !!x;
      return (
        c[3] !== d
          ? ((n = (e) => {
              let { signal: t } = e;
              return o({ profileId: d ?? "", signal: t });
            }),
            (c[3] = d),
            (c[4] = n))
          : (n = c[4]),
        c[5] !== i || c[6] !== b || c[7] !== n
          ? ((s = {
              queryKey: i,
              enabled: b,
              staleTime: 6e4,
              retry: !1,
              queryFn: n,
            }),
            (c[5] = i),
            (c[6] = b),
            (c[7] = n),
            (c[8] = s))
          : (s = c[8]),
        (0, l.useQuery)(s)
      );
    },
  ]);
};
