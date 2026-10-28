// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(944410),
    r = e.i(690877),
    s = e.i(418096),
    i = e.i(342463),
    a = e.i(319440),
    o = e.i(613677),
    l = e.i(866890),
    c = e.i(303413),
    c = c,
    u = e.i(38279);
  let d = s.z.enum(["moderator", "platform"]),
    m = i.z
      .string()
      .nullish()
      .transform((e) => e ?? void 0),
    b = a.z.union([
      o.z.object({
        address: i.z.string(),
        userId: m,
        name: i.z.string(),
        roles: l.z.array(d).min(1),
      }),
      o.z.object({ address: i.z.string(), userId: m, roles: c.tuple([]) }),
    ]);
  e.s(
    [
      "f",
      0,
      () => {
        let e,
          s,
          i = (0, t.c)(3),
          a = (0, n.useLivestreamApiClient)();
        return (
          i[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = u.Q.BOUNTIES_MODERATOR_ME()), (i[0] = e))
            : (e = i[0]),
          i[1] !== a
            ? ((s = {
                queryKey: e,
                queryFn: async () => {
                  let e = await a.get("bounties/moderation/me").json();
                  return b.parse(e);
                },
                staleTime: 6e4,
              }),
              (i[1] = a),
              (i[2] = s))
            : (s = i[2]),
          (0, r.useQuery)(s)
        );
      },
    ],
    536361,
  );
};
