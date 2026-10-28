// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(365089),
    a = e.i(528600),
    i = e.i(179736),
    s = e.i(741084),
    l = e.i(860787);
  e.s([
    "f",
    0,
    function (e) {
      let n,
        o,
        c,
        d,
        u = (0, t.c)(16),
        {
          address: m,
          user: x,
          fallbackName: p,
          fallbackAvatarUrl: f,
          fallbackXUsername: g,
          enabled: b,
        } = e,
        h = void 0 === b || b,
        y = m ?? "",
        v = h && !!m && null == x;
      u[0] !== y || u[1] !== v
        ? ((n = { userIdentifier: y, enabled: v }),
          (u[0] = y),
          (u[1] = v),
          (u[2] = n))
        : (n = u[2]);
      let { data: w } = (0, a.U)(n),
        _ = (0, i.s)(h ? (x?.userId ?? m) : void 0);
      if (!m) return null;
      let j = x ?? w;
      (u[3] !== m || u[4] !== p || u[5] !== j?.username
        ? ((o = j?.username?.trim() || p?.trim() || (0, r.d)(m, 4, 4)),
          (u[3] = m),
          (u[4] = p),
          (u[5] = j?.username),
          (u[6] = o))
        : (o = u[6]),
        u[7] !== f || u[8] !== j?.profile_image
          ? ((c =
              (0, l.Z)({
                sourceUrl: (0, s.f)(j?.profile_image) ?? (0, s.f)(f ?? void 0),
                width: l.z.list,
              }) ?? null),
            (u[7] = f),
            (u[8] = j?.profile_image),
            (u[9] = c))
          : (c = u[9]));
      let N = j?.x_username ?? g ?? null;
      return (
        u[10] !== m || u[11] !== _ || u[12] !== o || u[13] !== c || u[14] !== N
          ? ((d = {
              address: m,
              displayName: o,
              avatarUrl: c,
              isVerified: _,
              xUsername: N,
            }),
            (u[10] = m),
            (u[11] = _),
            (u[12] = o),
            (u[13] = c),
            (u[14] = N),
            (u[15] = d))
          : (d = u[15]),
        d
      );
    },
  ]);
};
