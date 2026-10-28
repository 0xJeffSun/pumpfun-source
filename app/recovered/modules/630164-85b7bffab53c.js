// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(157633),
    a = e.i(745018),
    i = e.i(322315),
    l = e.i(254010),
    o = e.i(938277),
    s = e.i(352386),
    u = e.i(532047),
    d = e.i(252960),
    c = e.i(127864),
    f = e.i(271818),
    m = e.i(33347);
  function h() {
    return () => {};
  }
  var p = "Avatar",
    [x, g] = (0, u.f)(p),
    [y, v] = x(p),
    b = s.forwardRef((e, r) => {
      let { __scopeAvatar: n, ...a } = e,
        [i, l] = s.useState("idle");
      return (0, t.jsx)(y, {
        scope: n,
        imageLoadingStatus: i,
        onImageLoadingStatusChange: l,
        children: (0, t.jsx)(f.f.span, { ...a, ref: r }),
      });
    });
  b.displayName = p;
  var w = "AvatarImage",
    j = s.forwardRef((e, r) => {
      let {
          __scopeAvatar: n,
          src: a,
          onLoadingStatusChange: i = () => {},
          ...l
        } = e,
        o = v(w, n),
        u = (function (e, { referrerPolicy: t, crossOrigin: r }) {
          let n = (0, m.useSyncExternalStore)(
              h,
              () => !0,
              () => !1,
            ),
            a = s.useRef(null),
            i = n
              ? (a.current || (a.current = new window.Image()), a.current)
              : null,
            [l, o] = s.useState(() => N(i, e));
          return (
            (0, c.f)(() => {
              o(N(i, e));
            }, [i, e]),
            (0, c.f)(() => {
              let e = (e) => () => {
                o(e);
              };
              if (!i) return;
              let n = e("loaded"),
                a = e("error");
              return (
                i.addEventListener("load", n),
                i.addEventListener("error", a),
                t && (i.referrerPolicy = t),
                "string" == typeof r && (i.crossOrigin = r),
                () => {
                  (i.removeEventListener("load", n),
                    i.removeEventListener("error", a));
                }
              );
            }, [i, r, t]),
            l
          );
        })(a, l),
        p = (0, d.f)((e) => {
          (i(e), o.onImageLoadingStatusChange(e));
        });
      return (
        (0, c.f)(() => {
          "idle" !== u && p(u);
        }, [u, p]),
        "loaded" === u ? (0, t.jsx)(f.f.img, { ...l, ref: r, src: a }) : null
      );
    });
  j.displayName = w;
  var C = "AvatarFallback",
    _ = s.forwardRef((e, r) => {
      let { __scopeAvatar: n, delayMs: a, ...i } = e,
        l = v(C, n),
        [o, u] = s.useState(void 0 === a);
      return (
        s.useEffect(() => {
          if (void 0 !== a) {
            let e = window.setTimeout(() => u(!0), a);
            return () => window.clearTimeout(e);
          }
        }, [a]),
        o && "loaded" !== l.imageLoadingStatus
          ? (0, t.jsx)(f.f.span, { ...i, ref: r })
          : null
      );
    });
  function N(e, t) {
    return e
      ? t
        ? (e.src !== t && (e.src = t),
          e.complete && e.naturalWidth > 0 ? "loaded" : "loading")
        : "error"
      : "idle";
  }
  _.displayName = C;
  var P = e.i(426091);
  let S = s.forwardRef((e, n) => {
    let a,
      i,
      l,
      o,
      s = (0, r.c)(9);
    return (
      s[0] !== e
        ? (({ className: a, ...i } = e), (s[0] = e), (s[1] = a), (s[2] = i))
        : ((a = s[1]), (i = s[2])),
      s[3] !== a
        ? ((l = (0, P.c)(
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
            a,
          )),
          (s[3] = a),
          (s[4] = l))
        : (l = s[4]),
      s[5] !== i || s[6] !== n || s[7] !== l
        ? ((o = (0, t.jsx)(b, { ref: n, className: l, ...i })),
          (s[5] = i),
          (s[6] = n),
          (s[7] = l),
          (s[8] = o))
        : (o = s[8]),
      o
    );
  });
  S.displayName = b.displayName;
  let M = s.forwardRef((e, n) => {
    let a,
      i,
      l,
      o,
      s = (0, r.c)(9);
    return (
      s[0] !== e
        ? (({ className: a, ...i } = e), (s[0] = e), (s[1] = a), (s[2] = i))
        : ((a = s[1]), (i = s[2])),
      s[3] !== a
        ? ((l = (0, P.c)("aspect-square h-full w-full", a)),
          (s[3] = a),
          (s[4] = l))
        : (l = s[4]),
      s[5] !== i || s[6] !== n || s[7] !== l
        ? ((o = (0, t.jsx)(j, { ref: n, className: l, ...i })),
          (s[5] = i),
          (s[6] = n),
          (s[7] = l),
          (s[8] = o))
        : (o = s[8]),
      o
    );
  });
  M.displayName = j.displayName;
  let k = s.forwardRef((e, n) => {
    let a,
      i,
      l,
      o,
      s = (0, r.c)(9);
    return (
      s[0] !== e
        ? (({ className: a, ...i } = e), (s[0] = e), (s[1] = a), (s[2] = i))
        : ((a = s[1]), (i = s[2])),
      s[3] !== a
        ? ((l = (0, P.c)(
            "flex h-full w-full items-center justify-center rounded-full bg-muted",
            a,
          )),
          (s[3] = a),
          (s[4] = l))
        : (l = s[4]),
      s[5] !== i || s[6] !== n || s[7] !== l
        ? ((o = (0, t.jsx)(_, { ref: n, className: l, ...i })),
          (s[5] = i),
          (s[6] = n),
          (s[7] = l),
          (s[8] = o))
        : (o = s[8]),
      o
    );
  });
  k.displayName = _.displayName;
  var D = e.i(598883);
  let F = (e) => {
      let i,
        l,
        s,
        u,
        d,
        c,
        f,
        m,
        h,
        p,
        x,
        g,
        y,
        v,
        b,
        w,
        j,
        C,
        _,
        N = (0, r.c)(49),
        { view: P } = e,
        F = P.xUsername;
      if (
        N[0] !== P.xDisplayName ||
        N[1] !== P.xProfileImageUrl ||
        N[2] !== P.xUsername
      ) {
        u = Symbol.for("react.early_return_sentinel");
        e: {
          let e;
          if (!(d = F.trim())) {
            u = null;
            break e;
          }
          ((l = P.xDisplayName?.trim() || d),
            N[8] !== P.xProfileImageUrl
              ? ((e = P.xProfileImageUrl?.trim() || null),
                (N[8] = P.xProfileImageUrl),
                (N[9] = e))
              : (e = N[9]),
            (i = e),
            (s = l.slice(0, 2).toUpperCase()));
        }
        ((N[0] = P.xDisplayName),
          (N[1] = P.xProfileImageUrl),
          (N[2] = P.xUsername),
          (N[3] = i),
          (N[4] = l),
          (N[5] = s),
          (N[6] = u),
          (N[7] = d));
      } else ((i = N[3]), (l = N[4]), (s = N[5]), (u = N[6]), (d = N[7]));
      if (u !== Symbol.for("react.early_return_sentinel")) return u;
      let T = s,
        U = `View @${d} on X`,
        R = "number" == typeof P.xFollowingCount,
        A = "number" == typeof P.xFollowersCount,
        W = P.profileUrl;
      (N[10] !== i || N[11] !== l
        ? ((c = i ? (0, t.jsx)(M, { src: i, alt: l }) : null),
          (N[10] = i),
          (N[11] = l),
          (N[12] = c))
        : (c = N[12]),
        N[13] !== T
          ? ((f = (0, t.jsx)(k, {
              className:
                "bg-bg-tertiary text-[11px] font-medium text-text-secondary",
              children: T,
            })),
            (N[13] = T),
            (N[14] = f))
          : (f = N[14]),
        N[15] !== c || N[16] !== f
          ? ((m = (0, t.jsxs)(S, {
              className: "size-8 shrink-0",
              children: [c, f],
            })),
            (N[15] = c),
            (N[16] = f),
            (N[17] = m))
          : (m = N[17]),
        N[18] !== l
          ? ((h = (0, t.jsx)("span", {
              className:
                "truncate text-[13px] font-medium leading-4 text-text-primary",
              children: l,
            })),
            (N[18] = l),
            (N[19] = h))
          : (h = N[19]),
        N[20] !== P.xVerified
          ? ((p = P.xVerified
              ? (0, t.jsx)(n.y$, {
                  className: "size-3.5 shrink-0 text-text-secondary",
                  "aria-label": "Verified account",
                })
              : null),
            (N[20] = P.xVerified),
            (N[21] = p))
          : (p = N[21]),
        N[22] === Symbol.for("react.memo_cache_sentinel")
          ? ((x = (0, t.jsx)(a.Tc, {
              className: "ml-auto size-3 shrink-0 text-text-quaternary",
              "aria-hidden": !0,
            })),
            (N[22] = x))
          : (x = N[22]),
        N[23] !== h || N[24] !== p
          ? ((g = (0, t.jsxs)("div", {
              className: "flex min-w-0 items-center gap-1",
              children: [h, p, x],
            })),
            (N[23] = h),
            (N[24] = p),
            (N[25] = g))
          : (g = N[25]),
        N[26] !== d
          ? ((y = (0, t.jsxs)("div", {
              className:
                "mt-0.5 truncate text-[11px] font-normal leading-4 text-text-quaternary",
              children: ["@", d],
            })),
            (N[26] = d),
            (N[27] = y))
          : (y = N[27]),
        N[28] !== g || N[29] !== y
          ? ((v = (0, t.jsxs)("div", {
              className: "min-w-0 flex-1",
              children: [g, y],
            })),
            (N[28] = g),
            (N[29] = y),
            (N[30] = v))
          : (v = N[30]),
        N[31] !== v || N[32] !== m
          ? ((b = (0, t.jsxs)("div", {
              className: "flex items-start gap-2.5",
              children: [m, v],
            })),
            (N[31] = v),
            (N[32] = m),
            (N[33] = b))
          : (b = N[33]),
        N[34] !== A ||
        N[35] !== R ||
        N[36] !== P.xFollowersCount ||
        N[37] !== P.xFollowingCount
          ? ((w =
              R || A
                ? (0, t.jsxs)("div", {
                    className:
                      "mt-2.5 flex items-center gap-4 border-t border-border-secondary pt-2.5 text-[11px] font-normal leading-4 text-text-quaternary",
                    children: [
                      R
                        ? (0, t.jsxs)("div", {
                            className: "flex items-baseline gap-1",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "text-[13px] font-medium tabular-nums text-text-primary",
                                children: (0, o.J)(P.xFollowingCount),
                              }),
                              (0, t.jsx)("span", { children: "Following" }),
                            ],
                          })
                        : null,
                      A
                        ? (0, t.jsxs)("div", {
                            className: "flex items-baseline gap-1",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "text-[13px] font-medium tabular-nums text-text-primary",
                                children: (0, o.J)(P.xFollowersCount),
                              }),
                              (0, t.jsx)("span", { children: "Followers" }),
                            ],
                          })
                        : null,
                    ],
                  })
                : null),
            (N[34] = A),
            (N[35] = R),
            (N[36] = P.xFollowersCount),
            (N[37] = P.xFollowingCount),
            (N[38] = w))
          : (w = N[38]),
        N[39] !== W
          ? ((j = W
              ? (0, t.jsx)("div", {
                  className:
                    "mt-2.5 inline-flex h-7 w-full items-center justify-center rounded-md bg-bg-tertiary px-2.5 text-[12px] font-medium leading-none text-text-primary transition-colors hover:bg-bg-tertiary/75",
                  children: "See profile on X",
                })
              : null),
            (N[39] = W),
            (N[40] = j))
          : (j = N[40]),
        N[41] !== b || N[42] !== w || N[43] !== j
          ? ((C = (0, t.jsxs)(t.Fragment, { children: [b, w, j] })),
            (N[41] = b),
            (N[42] = w),
            (N[43] = j),
            (N[44] = C))
          : (C = N[44]));
      let E = C;
      return (
        N[45] !== U || N[46] !== E || N[47] !== W
          ? ((_ = (0, t.jsx)(D.P, {
              side: "top",
              align: "center",
              collisionPadding: 12,
              className: "w-[280px] p-3",
              children: W
                ? (0, t.jsx)("a", {
                    href: W,
                    target: "_blank",
                    rel: "noreferrer",
                    onClick: $,
                    "aria-label": U,
                    className:
                      "block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
                    "data-testid": "x-profile-hover-card",
                    children: E,
                  })
                : (0, t.jsx)("div", {
                    "data-testid": "x-profile-hover-card",
                    children: E,
                  }),
            })),
            (N[45] = U),
            (N[46] = E),
            (N[47] = W),
            (N[48] = _))
          : (_ = N[48]),
        _
      );
    },
    T = (e) => {
      let n,
        a,
        i = (0, r.c)(4),
        { xProfile: l } = e;
      if (i[0] !== l)
        ((n = {
          xUsername: l.x_username,
          xDisplayName: null,
          xProfileImageUrl: l.x_profile_image_url,
          xVerified: !1,
          xFollowersCount: l.x_follower_count,
          xFollowingCount: null,
          profileUrl: l.x_profile_url,
        }),
          (i[0] = l),
          (i[1] = n));
      else n = i[1];
      return (
        i[2] !== n
          ? ((a = (0, t.jsx)(F, { view: n })), (i[2] = n), (i[3] = a))
          : (a = i[3]),
        a
      );
    };
  function $(e) {
    return e.stopPropagation();
  }
  e.s(
    [
      "a",
      0,
      (e) => {
        let n,
          a,
          o,
          s = (0, r.c)(9),
          { children: u, xProfile: d } = e,
          c = (0, l.k)(i.D.X_FEATURES);
        if (!d.x_username.trim() || !c) {
          let e;
          return (
            s[0] !== u
              ? ((e = (0, t.jsx)(t.Fragment, { children: u })),
                (s[0] = u),
                (s[1] = e))
              : (e = s[1]),
            e
          );
        }
        return (
          s[2] !== u
            ? ((n = (0, t.jsx)(D.b, { asChild: !0, children: u })),
              (s[2] = u),
              (s[3] = n))
            : (n = s[3]),
          s[4] !== d
            ? ((a = (0, t.jsx)(T, { xProfile: d })), (s[4] = d), (s[5] = a))
            : (a = s[5]),
          s[6] !== n || s[7] !== a
            ? ((o = (0, t.jsxs)(D.c, {
                openDelay: 150,
                closeDelay: 120,
                children: [n, a],
              })),
              (s[6] = n),
              (s[7] = a),
              (s[8] = o))
            : (o = s[8]),
          o
        );
      },
      "z",
      0,
      (e) => {
        let n,
          a,
          i = (0, r.c)(4),
          { seed: l } = e;
        if (i[0] !== l) {
          let e;
          ((e = l.xUsername.trim()),
            (n = {
              xUsername: l.xUsername,
              xDisplayName: l.xDisplayName ?? null,
              xProfileImageUrl: l.xProfileImageUrl ?? null,
              xVerified: !1,
              xFollowersCount: l.xFollowersCount ?? null,
              xFollowingCount: null,
              profileUrl: e ? `https://x.com/${encodeURIComponent(e)}` : null,
            }),
            (i[0] = l),
            (i[1] = n));
        } else n = i[1];
        return (
          i[2] !== n
            ? ((a = (0, t.jsx)(F, { view: n })), (i[2] = n), (i[3] = a))
            : (a = i[3]),
          a
        );
      },
    ],
    630164,
  );
};
