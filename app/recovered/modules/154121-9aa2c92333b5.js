// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(365089),
    r = e.i(528600),
    a = e.i(179736),
    n = e.i(741084),
    l = e.i(860787);
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
          address: p,
          user: m,
          fallbackName: x,
          fallbackAvatarUrl: b,
          fallbackXUsername: f,
          enabled: h,
        } = e,
        v = void 0 === h || h,
        y = p ?? "",
        g = v && !!p && null == m;
      u[0] !== y || u[1] !== g
        ? ((o = { userIdentifier: y, enabled: g }),
          (u[0] = y),
          (u[1] = g),
          (u[2] = o))
        : (o = u[2]);
      let { data: _ } = (0, r.U)(o),
        w = (0, a.s)(v ? (m?.userId ?? p) : void 0);
      if (!p) return null;
      let k = m ?? _;
      (u[3] !== p || u[4] !== x || u[5] !== k?.username
        ? ((s = k?.username?.trim() || x?.trim() || (0, i.d)(p, 4, 4)),
          (u[3] = p),
          (u[4] = x),
          (u[5] = k?.username),
          (u[6] = s))
        : (s = u[6]),
        u[7] !== b || u[8] !== k?.profile_image
          ? ((d =
              (0, l.Z)({
                sourceUrl: (0, n.f)(k?.profile_image) ?? (0, n.f)(b ?? void 0),
                width: l.z.list,
              }) ?? null),
            (u[7] = b),
            (u[8] = k?.profile_image),
            (u[9] = d))
          : (d = u[9]));
      let N = k?.x_username ?? f ?? null;
      return (
        u[10] !== p || u[11] !== w || u[12] !== s || u[13] !== d || u[14] !== N
          ? ((c = {
              address: p,
              displayName: s,
              avatarUrl: d,
              isVerified: w,
              xUsername: N,
            }),
            (u[10] = p),
            (u[11] = w),
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
