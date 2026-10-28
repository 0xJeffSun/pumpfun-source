// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(426091),
    n = e.i(365089),
    s = e.i(432626),
    a = e.i(705313),
    o = e.i(409954);
  e.i(107240);
  var l = e.i(693124),
    c = e.i(425890),
    d = e.i(100172);
  let u = {
      positive: "border-positive/20 bg-positive/10 text-positive",
      info: "border-[#60A5FA]/20 bg-[#60A5FA]/10 text-[#60A5FA]",
      warning: "border-[#FBBF24]/20 bg-[#FBBF24]/10 text-[#FBBF24]",
      muted: "border-border-tertiary bg-bg-tertiary text-text-tertiary",
      accent: "border-bg-accent/25 bg-bg-accent/10 text-bg-accent",
    },
    m = {
      positive: "text-positive",
      info: "text-[#60A5FA]",
      warning: "text-[#FBBF24]",
      muted: "text-text-tertiary",
      accent: "text-bg-accent",
    };
  function p(e) {
    return e.stopPropagation();
  }
  function f(e) {
    return e.stopPropagation();
  }
  e.s([
    "L",
    0,
    function (e) {
      let n,
        s,
        a = (0, i.c)(7),
        { icon: o, label: l, tone: c, variant: d } = e,
        p = void 0 === d ? "pill" : d;
      return (
        a[0] !== c || a[1] !== p
          ? ((n = (0, r.c)(
              "inline-flex items-center gap-1 text-[11px] font-medium",
              "pill" === p
                ? (0, r.c)("rounded-full border px-2 py-[3px]", u[c])
                : m[c],
            )),
            (a[0] = c),
            (a[1] = p),
            (a[2] = n))
          : (n = a[2]),
        a[3] !== o || a[4] !== l || a[5] !== n
          ? ((s = (0, t.jsxs)("span", { className: n, children: [o, l] })),
            (a[3] = o),
            (a[4] = l),
            (a[5] = n),
            (a[6] = s))
          : (s = a[6]),
        s
      );
    },
    "Z",
    0,
    function (e) {
      let u,
        m,
        x,
        b,
        h,
        y,
        g,
        v,
        w,
        k,
        j,
        _,
        N = (0, i.c)(53),
        {
          address: I,
          username: C,
          profileImage: S,
          profileHref: A,
          ipfsPrefix: F,
          timeLabel: U,
          badges: T,
          trailing: E,
          avatar: D,
          size: B,
          hideAvatar: L,
          disableProfileHoverCard: P,
        } = e,
        Q = void 0 === B ? "default" : B,
        O = void 0 !== L && L,
        K = void 0 !== P && P,
        M = (0, c.f)();
      N[0] !== I || N[1] !== C
        ? ((u = C?.trim() || (0, n.d)(I) || "Unknown"),
          (N[0] = I),
          (N[1] = C),
          (N[2] = u))
        : (u = N[2]);
      let R = u,
        q = "compact" === Q ? "h-5 w-5" : "h-10 w-10",
        $ = "compact" === Q ? 20 : 40;
      N[3] !== I ||
      N[4] !== D ||
      N[5] !== $ ||
      N[6] !== q ||
      N[7] !== F ||
      N[8] !== S ||
      N[9] !== R
        ? ((m =
            D ??
            (0, t.jsx)(a.f, {
              address: I,
              alt: R,
              className: q,
              height: $,
              ipfsPrefix: F ?? "",
              isAnonymous: !1,
              src: S,
              width: $,
            })),
          (N[3] = I),
          (N[4] = D),
          (N[5] = $),
          (N[6] = q),
          (N[7] = F),
          (N[8] = S),
          (N[9] = R),
          (N[10] = m))
        : (m = N[10]);
      let Y = m,
        H = "compact" === Q && "gap-2.5";
      (N[11] !== H
        ? ((x = (0, r.c)("flex gap-3", H)), (N[11] = H), (N[12] = x))
        : (x = N[12]),
        N[13] !== I ||
        N[14] !== Y ||
        N[15] !== K ||
        N[16] !== O ||
        N[17] !== F ||
        N[18] !== A ||
        N[19] !== S ||
        N[20] !== Q ||
        N[21] !== C
          ? ((b = O
              ? null
              : (0, t.jsx)("div", {
                  className: (0, r.c)(
                    "flex-shrink-0",
                    "default" === Q && "pt-0.5",
                  ),
                  children: (0, t.jsx)(s.f, {
                    disabled: K,
                    fallbackAvatarUrl: S ?? null,
                    fallbackUsername: C ?? null,
                    followSlot: (0, t.jsx)(d.f, { authorAddress: I }),
                    ipfsPrefix: F,
                    userAddress: I,
                    userProfileLink: A,
                    children: A
                      ? (0, t.jsx)(o.o, {
                          profileId: I,
                          href: A,
                          onClick: f,
                          children: Y,
                        })
                      : (0, t.jsx)("span", {
                          className: "inline-flex",
                          children: Y,
                        }),
                  }),
                })),
            (N[13] = I),
            (N[14] = Y),
            (N[15] = K),
            (N[16] = O),
            (N[17] = F),
            (N[18] = A),
            (N[19] = S),
            (N[20] = Q),
            (N[21] = C),
            (N[22] = b))
          : (b = N[22]));
      let W = "compact" === Q && "text-[12px]";
      return (
        N[23] !== W
          ? ((h = (0, r.c)(
              "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px]",
              W,
            )),
            (N[23] = W),
            (N[24] = h))
          : (h = N[24]),
        N[25] !== I ||
        N[26] !== K ||
        N[27] !== F ||
        N[28] !== A ||
        N[29] !== S ||
        N[30] !== R ||
        N[31] !== Q ||
        N[32] !== M ||
        N[33] !== C
          ? ((y = M
              ? (0, t.jsx)(l.S, {
                  address: I,
                  username: C,
                  profileImage: S,
                  href: A,
                  link: !!A,
                  showAvatar: !1,
                  hoverCard: !K && {
                    followSlot: (0, t.jsx)(d.f, { authorAddress: I }),
                  },
                  nameClassName: (0, r.c)(
                    "font-semibold text-white",
                    "compact" === Q
                      ? "max-w-[140px] text-[12px]"
                      : "max-w-[180px] text-sm",
                  ),
                })
              : (0, t.jsx)(s.f, {
                  disabled: K,
                  fallbackAvatarUrl: S ?? null,
                  fallbackUsername: C ?? null,
                  followSlot: (0, t.jsx)(d.f, { authorAddress: I }),
                  ipfsPrefix: F,
                  userAddress: I,
                  userProfileLink: A,
                  children: A
                    ? (0, t.jsx)(o.o, {
                        profileId: I,
                        className: (0, r.c)(
                          "truncate font-semibold text-white transition-opacity hover:opacity-80",
                          "compact" === Q
                            ? "max-w-[140px] text-[12px]"
                            : "max-w-[180px] text-sm",
                        ),
                        href: A,
                        onClick: p,
                        children: R,
                      })
                    : (0, t.jsx)("span", {
                        className: (0, r.c)(
                          "truncate font-semibold text-white",
                          "compact" === Q
                            ? "max-w-[140px] text-[12px]"
                            : "max-w-[180px] text-sm",
                        ),
                        children: R,
                      }),
                })),
            (N[25] = I),
            (N[26] = K),
            (N[27] = F),
            (N[28] = A),
            (N[29] = S),
            (N[30] = R),
            (N[31] = Q),
            (N[32] = M),
            (N[33] = C),
            (N[34] = y))
          : (y = N[34]),
        N[35] !== T
          ? ((g = T
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)("span", {
                      className: "text-text-tertiary",
                      children: "·",
                    }),
                    (0, t.jsx)("div", {
                      className: "flex flex-wrap items-center gap-1.5",
                      children: T,
                    }),
                  ],
                })
              : null),
            (N[35] = T),
            (N[36] = g))
          : (g = N[36]),
        N[37] !== U
          ? ((v = (0, t.jsx)("span", {
              className: "flex-shrink-0 text-text-tertiary",
              children: U,
            })),
            (N[37] = U),
            (N[38] = v))
          : (v = N[38]),
        N[39] !== h || N[40] !== y || N[41] !== g || N[42] !== v
          ? ((w = (0, t.jsxs)("div", { className: h, children: [y, g, v] })),
            (N[39] = h),
            (N[40] = y),
            (N[41] = g),
            (N[42] = v),
            (N[43] = w))
          : (w = N[43]),
        N[44] !== E
          ? ((k = E
              ? (0, t.jsx)("div", {
                  className: "flex flex-shrink-0 items-center gap-1.5",
                  children: E,
                })
              : null),
            (N[44] = E),
            (N[45] = k))
          : (k = N[45]),
        N[46] !== w || N[47] !== k
          ? ((j = (0, t.jsxs)("div", {
              className:
                "flex min-w-0 flex-1 items-start justify-between gap-3",
              children: [w, k],
            })),
            (N[46] = w),
            (N[47] = k),
            (N[48] = j))
          : (j = N[48]),
        N[49] !== j || N[50] !== x || N[51] !== b
          ? ((_ = (0, t.jsxs)("div", { className: x, children: [b, j] })),
            (N[49] = j),
            (N[50] = x),
            (N[51] = b),
            (N[52] = _))
          : (_ = N[52]),
        _
      );
    },
  ]);
};
