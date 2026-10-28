// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(732486),
    t = e.i(445242),
    r = e.i(705313),
    s = e.i(458310);
  e.i(12692);
  var l = e.i(398902),
    i = e.i(741084),
    n = e.i(813792),
    o = e.i(69399),
    d = e.i(338319),
    u = e.i(369091);
  let c = { 16: "size-4", 20: "size-5" },
    m = { 16: "size-3", 20: "size-4" },
    f = { 16: 12, 20: 16 };
  function p(e) {
    return e.stopPropagation();
  }
  (e.s(
    [
      "f",
      0,
      function (e) {
        let h,
          g,
          x,
          v,
          w,
          y,
          b,
          j,
          N = (0, t.c)(30),
          { squad: _, size: A, density: k, className: I, testId: C } = e,
          E = void 0 === A ? 20 : A,
          F = void 0 === k ? "comfortable" : k,
          P = void 0 === C ? "squad-badge-chip" : C,
          { t: S } = (0, l.f)(),
          { ipfsPrefix: T } = (0, u.useIpfsPrefix)();
        if (N[0] !== _.username || N[1] !== S) {
          let e = _.username || S("profile.squads.profile.pill");
          ((h = S("web.profile.squad_badge_label", { name: e })),
            (N[0] = _.username),
            (N[1] = S),
            (N[2] = h));
        } else h = N[2];
        let U = h,
          L = c[E];
        (N[3] !== I || N[4] !== L
          ? ((g = (0, d.c)(
              "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm bg-bg-tertiary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
              L,
              I,
            )),
            (N[3] = I),
            (N[4] = L),
            (N[5] = g))
          : (g = N[5]),
          N[6] !== _.userId || N[7] !== _.username
            ? ((x = (0, o.Z)({ groupId: _.userId, username: _.username })),
              (N[6] = _.userId),
              (N[7] = _.username),
              (N[8] = x))
            : (x = N[8]));
        let M = _.userId,
          z = m[E];
        N[9] !== z
          ? ((v = (0, d.c)(z, "rounded-sm object-cover")),
            (N[9] = z),
            (N[10] = v))
          : (v = N[10]);
        let R = f[E];
        N[11] !== _.profileImage
          ? ((w = (0, i.f)(_.profileImage)),
            (N[11] = _.profileImage),
            (N[12] = w))
          : (w = N[12]);
        let B = f[E];
        return (
          N[13] !== T ||
          N[14] !== _.userId ||
          N[15] !== v ||
          N[16] !== R ||
          N[17] !== w ||
          N[18] !== B
            ? ((y = (0, a.jsx)(r.f, {
                address: M,
                alt: "",
                className: v,
                height: R,
                ipfsPrefix: T,
                isAnonymous: !1,
                src: w,
                width: B,
              })),
              (N[13] = T),
              (N[14] = _.userId),
              (N[15] = v),
              (N[16] = R),
              (N[17] = w),
              (N[18] = B),
              (N[19] = y))
            : (y = N[19]),
          N[20] !== U ||
          N[21] !== y ||
          N[22] !== g ||
          N[23] !== x ||
          N[24] !== P
            ? ((b = (0, a.jsx)(s.default, {
                "aria-label": U,
                className: g,
                "data-testid": P,
                href: x,
                onClick: p,
                prefetch: !1,
                children: y,
              })),
              (N[20] = U),
              (N[21] = y),
              (N[22] = g),
              (N[23] = x),
              (N[24] = P),
              (N[25] = b))
            : (b = N[25]),
          N[26] !== F || N[27] !== U || N[28] !== b
            ? ((j = (0, a.jsx)(n.f, { content: U, density: F, children: b })),
              (N[26] = F),
              (N[27] = U),
              (N[28] = b),
              (N[29] = j))
            : (j = N[29]),
          j
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
          let a = e?.find((e) => e.group_id);
          return a
            ? {
                userId: a.group_id,
                username: a.username,
                profileImage: a.profile_image_url,
              }
            : null;
        },
      ],
      585750,
    ));
};
