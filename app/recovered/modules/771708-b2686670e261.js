// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(705313),
    r = e.i(458310);
  e.i(12692);
  var a = e.i(398902),
    n = e.i(741084),
    o = e.i(813792),
    s = e.i(69399),
    d = e.i(338319),
    u = e.i(369091);
  let c = { 16: "size-4", 20: "size-5" },
    m = { 16: "size-3", 20: "size-4" },
    p = { 16: 12, 20: 16 };
  function f(e) {
    return e.stopPropagation();
  }
  (e.s(
    [
      "f",
      0,
      function (e) {
        let I,
          h,
          y,
          g,
          x,
          v,
          b,
          C,
          w = (0, i.c)(30),
          { squad: M, size: k, density: U, className: _, testId: j } = e,
          N = void 0 === k ? 20 : k,
          A = void 0 === U ? "comfortable" : U,
          P = void 0 === j ? "squad-badge-chip" : j,
          { t: E } = (0, a.f)(),
          { ipfsPrefix: q } = (0, u.useIpfsPrefix)();
        if (w[0] !== M.username || w[1] !== E) {
          let e = M.username || E("profile.squads.profile.pill");
          ((I = E("web.profile.squad_badge_label", { name: e })),
            (w[0] = M.username),
            (w[1] = E),
            (w[2] = I));
        } else I = w[2];
        let T = I,
          B = c[N];
        (w[3] !== _ || w[4] !== B
          ? ((h = (0, d.c)(
              "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm bg-bg-tertiary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
              B,
              _,
            )),
            (w[3] = _),
            (w[4] = B),
            (w[5] = h))
          : (h = w[5]),
          w[6] !== M.userId || w[7] !== M.username
            ? ((y = (0, s.Z)({ groupId: M.userId, username: M.username })),
              (w[6] = M.userId),
              (w[7] = M.username),
              (w[8] = y))
            : (y = w[8]));
        let R = M.userId,
          S = m[N];
        w[9] !== S
          ? ((g = (0, d.c)(S, "rounded-sm object-cover")),
            (w[9] = S),
            (w[10] = g))
          : (g = w[10]);
        let z = p[N];
        w[11] !== M.profileImage
          ? ((x = (0, n.f)(M.profileImage)),
            (w[11] = M.profileImage),
            (w[12] = x))
          : (x = w[12]);
        let F = p[N];
        return (
          w[13] !== q ||
          w[14] !== M.userId ||
          w[15] !== g ||
          w[16] !== z ||
          w[17] !== x ||
          w[18] !== F
            ? ((v = (0, t.jsx)(l.f, {
                address: R,
                alt: "",
                className: g,
                height: z,
                ipfsPrefix: q,
                isAnonymous: !1,
                src: x,
                width: F,
              })),
              (w[13] = q),
              (w[14] = M.userId),
              (w[15] = g),
              (w[16] = z),
              (w[17] = x),
              (w[18] = F),
              (w[19] = v))
            : (v = w[19]),
          w[20] !== T ||
          w[21] !== v ||
          w[22] !== h ||
          w[23] !== y ||
          w[24] !== P
            ? ((b = (0, t.jsx)(r.default, {
                "aria-label": T,
                className: h,
                "data-testid": P,
                href: y,
                onClick: f,
                prefetch: !1,
                children: v,
              })),
              (w[20] = T),
              (w[21] = v),
              (w[22] = h),
              (w[23] = y),
              (w[24] = P),
              (w[25] = b))
            : (b = w[25]),
          w[26] !== A || w[27] !== T || w[28] !== b
            ? ((C = (0, t.jsx)(o.f, { content: T, density: A, children: b })),
              (w[26] = A),
              (w[27] = T),
              (w[28] = b),
              (w[29] = C))
            : (C = w[29]),
          C
        );
      },
    ],
    771708,
  ),
    e.s(
      [
        "f",
        0,
        (e) => {
          let t = e?.find((e) => e.group_id);
          return t
            ? {
                userId: t.group_id,
                username: t.username,
                profileImage: t.profile_image_url,
              }
            : null;
        },
      ],
      585750,
    ));
};
