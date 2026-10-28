// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(705313),
    l = e.i(458310);
  e.i(12692);
  var s = e.i(398902),
    i = e.i(741084),
    n = e.i(813792),
    o = e.i(69399),
    d = e.i(338319),
    u = e.i(369091);
  let c = { 16: "size-4", 20: "size-5" },
    f = { 16: "size-3", 20: "size-4" },
    m = { 16: 12, 20: 16 };
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
          b,
          w,
          y,
          v,
          x,
          j,
          _ = (0, r.c)(30),
          { squad: A, size: k, density: N, className: I, testId: C } = e,
          P = void 0 === k ? 20 : k,
          S = void 0 === N ? "comfortable" : N,
          E = void 0 === C ? "squad-badge-chip" : C,
          { t: F } = (0, s.f)(),
          { ipfsPrefix: U } = (0, u.useIpfsPrefix)();
        if (_[0] !== A.username || _[1] !== F) {
          let e = A.username || F("profile.squads.profile.pill");
          ((h = F("web.profile.squad_badge_label", { name: e })),
            (_[0] = A.username),
            (_[1] = F),
            (_[2] = h));
        } else h = _[2];
        let T = h,
          z = c[P];
        (_[3] !== I || _[4] !== z
          ? ((g = (0, d.c)(
              "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm bg-bg-tertiary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
              z,
              I,
            )),
            (_[3] = I),
            (_[4] = z),
            (_[5] = g))
          : (g = _[5]),
          _[6] !== A.userId || _[7] !== A.username
            ? ((b = (0, o.Z)({ groupId: A.userId, username: A.username })),
              (_[6] = A.userId),
              (_[7] = A.username),
              (_[8] = b))
            : (b = _[8]));
        let K = A.userId,
          M = f[P];
        _[9] !== M
          ? ((w = (0, d.c)(M, "rounded-sm object-cover")),
            (_[9] = M),
            (_[10] = w))
          : (w = _[10]);
        let R = m[P];
        _[11] !== A.profileImage
          ? ((y = (0, i.f)(A.profileImage)),
            (_[11] = A.profileImage),
            (_[12] = y))
          : (y = _[12]);
        let L = m[P];
        return (
          _[13] !== U ||
          _[14] !== A.userId ||
          _[15] !== w ||
          _[16] !== R ||
          _[17] !== y ||
          _[18] !== L
            ? ((v = (0, t.jsx)(a.f, {
                address: K,
                alt: "",
                className: w,
                height: R,
                ipfsPrefix: U,
                isAnonymous: !1,
                src: y,
                width: L,
              })),
              (_[13] = U),
              (_[14] = A.userId),
              (_[15] = w),
              (_[16] = R),
              (_[17] = y),
              (_[18] = L),
              (_[19] = v))
            : (v = _[19]),
          _[20] !== T ||
          _[21] !== v ||
          _[22] !== g ||
          _[23] !== b ||
          _[24] !== E
            ? ((x = (0, t.jsx)(l.default, {
                "aria-label": T,
                className: g,
                "data-testid": E,
                href: b,
                onClick: p,
                prefetch: !1,
                children: v,
              })),
              (_[20] = T),
              (_[21] = v),
              (_[22] = g),
              (_[23] = b),
              (_[24] = E),
              (_[25] = x))
            : (x = _[25]),
          _[26] !== S || _[27] !== T || _[28] !== x
            ? ((j = (0, t.jsx)(n.f, { content: T, density: S, children: x })),
              (_[26] = S),
              (_[27] = T),
              (_[28] = x),
              (_[29] = j))
            : (j = _[29]),
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
