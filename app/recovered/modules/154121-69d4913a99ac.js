// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(365089),
    a = e.i(528600),
    l = e.i(179736),
    r = e.i(741084),
    n = e.i(860787);
  e.s([
    "f",
    0,
    function (e) {
      let o,
        s,
        d,
        c,
        u = (0, t.c)(16),
        {
          address: m,
          user: f,
          fallbackName: p,
          fallbackAvatarUrl: h,
          fallbackXUsername: b,
          enabled: y,
        } = e,
        x = void 0 === y || y,
        v = m ?? "",
        g = x && !!m && null == f;
      u[0] !== v || u[1] !== g
        ? ((o = { userIdentifier: v, enabled: g }),
          (u[0] = v),
          (u[1] = g),
          (u[2] = o))
        : (o = u[2]);
      let { data: w } = (0, a.U)(o),
        k = (0, l.s)(x ? (f?.userId ?? m) : void 0);
      if (!m) return null;
      let C = f ?? w;
      (u[3] !== m || u[4] !== p || u[5] !== C?.username
        ? ((s = C?.username?.trim() || p?.trim() || (0, i.d)(m, 4, 4)),
          (u[3] = m),
          (u[4] = p),
          (u[5] = C?.username),
          (u[6] = s))
        : (s = u[6]),
        u[7] !== h || u[8] !== C?.profile_image
          ? ((d =
              (0, n.Z)({
                sourceUrl: (0, r.f)(C?.profile_image) ?? (0, r.f)(h ?? void 0),
                width: n.z.list,
              }) ?? null),
            (u[7] = h),
            (u[8] = C?.profile_image),
            (u[9] = d))
          : (d = u[9]));
      let N = C?.x_username ?? b ?? null;
      return (
        u[10] !== m || u[11] !== k || u[12] !== s || u[13] !== d || u[14] !== N
          ? ((c = {
              address: m,
              displayName: s,
              avatarUrl: d,
              isVerified: k,
              xUsername: N,
            }),
            (u[10] = m),
            (u[11] = k),
            (u[12] = s),
            (u[13] = d),
            (u[14] = N),
            (u[15] = c))
          : (c = u[15]),
        c
      );
    },
  ]);
};
