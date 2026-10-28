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
    d = e.i(532047),
    c = e.i(252960),
    f = e.i(127864),
    u = e.i(271818),
    m = e.i(33347);
  function p() {
    return () => {};
  }
  var x = "Avatar",
    [h, y] = (0, d.f)(x),
    [g, v] = h(x),
    w = s.forwardRef((e, r) => {
      let { __scopeAvatar: n, ...a } = e,
        [i, l] = s.useState("idle");
      return (0, t.jsx)(g, {
        scope: n,
        imageLoadingStatus: i,
        onImageLoadingStatusChange: l,
        children: (0, t.jsx)(u.f.span, { ...a, ref: r }),
      });
    });
  w.displayName = x;
  var b = "AvatarImage",
    j = s.forwardRef((e, r) => {
      let {
          __scopeAvatar: n,
          src: a,
          onLoadingStatusChange: i = () => {},
          ...l
        } = e,
        o = v(b, n),
        d = (function (e, { referrerPolicy: t, crossOrigin: r }) {
          let n = (0, m.useSyncExternalStore)(
              p,
              () => !0,
              () => !1,
            ),
            a = s.useRef(null),
            i = n
              ? (a.current || (a.current = new window.Image()), a.current)
              : null,
            [l, o] = s.useState(() => P(i, e));
          return (
            (0, f.f)(() => {
              o(P(i, e));
            }, [i, e]),
            (0, f.f)(() => {
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
        x = (0, c.f)((e) => {
          (i(e), o.onImageLoadingStatusChange(e));
        });
      return (
        (0, f.f)(() => {
          "idle" !== d && x(d);
        }, [d, x]),
        "loaded" === d ? (0, t.jsx)(u.f.img, { ...l, ref: r, src: a }) : null
      );
    });
  j.displayName = b;
  var N = "AvatarFallback",
    C = s.forwardRef((e, r) => {
      let { __scopeAvatar: n, delayMs: a, ...i } = e,
        l = v(N, n),
        [o, d] = s.useState(void 0 === a);
      return (
        s.useEffect(() => {
          if (void 0 !== a) {
            let e = window.setTimeout(() => d(!0), a);
            return () => window.clearTimeout(e);
          }
        }, [a]),
        o && "loaded" !== l.imageLoadingStatus
          ? (0, t.jsx)(u.f.span, { ...i, ref: r })
          : null
      );
    });
  function P(e, t) {
    return e
      ? t
        ? (e.src !== t && (e.src = t),
          e.complete && e.naturalWidth > 0 ? "loaded" : "loading")
        : "error"
      : "idle";
  }
  C.displayName = N;
  var S = e.i(426091);
  let R = s.forwardRef((e, n) => {
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
        ? ((l = (0, S.c)(
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
            a,
          )),
          (s[3] = a),
          (s[4] = l))
        : (l = s[4]),
      s[5] !== i || s[6] !== n || s[7] !== l
        ? ((o = (0, t.jsx)(w, { ref: n, className: l, ...i })),
          (s[5] = i),
          (s[6] = n),
          (s[7] = l),
          (s[8] = o))
        : (o = s[8]),
      o
    );
  });
  R.displayName = w.displayName;
  let _ = s.forwardRef((e, n) => {
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
        ? ((l = (0, S.c)("aspect-square h-full w-full", a)),
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
  _.displayName = j.displayName;
  let E = s.forwardRef((e, n) => {
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
        ? ((l = (0, S.c)(
            "flex h-full w-full items-center justify-center rounded-full bg-muted",
            a,
          )),
          (s[3] = a),
          (s[4] = l))
        : (l = s[4]),
      s[5] !== i || s[6] !== n || s[7] !== l
        ? ((o = (0, t.jsx)(C, { ref: n, className: l, ...i })),
          (s[5] = i),
          (s[6] = n),
          (s[7] = l),
          (s[8] = o))
        : (o = s[8]),
      o
    );
  });
  E.displayName = C.displayName;
  var F = e.i(598883);
  let $ = (e) => {
      let i,
        l,
        s,
        d,
        c,
        f,
        u,
        m,
        p,
        x,
        h,
        y,
        g,
        v,
        w,
        b,
        j,
        N,
        C,
        P = (0, r.c)(49),
        { view: S } = e,
        $ = S.xUsername;
      if (
        P[0] !== S.xDisplayName ||
        P[1] !== S.xProfileImageUrl ||
        P[2] !== S.xUsername
      ) {
        d = Symbol.for("react.early_return_sentinel");
        e: {
          let e;
          if (!(c = $.trim())) {
            d = null;
            break e;
          }
          ((l = S.xDisplayName?.trim() || c),
            P[8] !== S.xProfileImageUrl
              ? ((e = S.xProfileImageUrl?.trim() || null),
                (P[8] = S.xProfileImageUrl),
                (P[9] = e))
              : (e = P[9]),
            (i = e),
            (s = l.slice(0, 2).toUpperCase()));
        }
        ((P[0] = S.xDisplayName),
          (P[1] = S.xProfileImageUrl),
          (P[2] = S.xUsername),
          (P[3] = i),
          (P[4] = l),
          (P[5] = s),
          (P[6] = d),
          (P[7] = c));
      } else ((i = P[3]), (l = P[4]), (s = P[5]), (d = P[6]), (c = P[7]));
      if (d !== Symbol.for("react.early_return_sentinel")) return d;
      let A = s,
        O = `View @${c} on X`,
        U = "number" == typeof S.xFollowingCount,
        I = "number" == typeof S.xFollowersCount,
        k = S.profileUrl;
      (P[10] !== i || P[11] !== l
        ? ((f = i ? (0, t.jsx)(_, { src: i, alt: l }) : null),
          (P[10] = i),
          (P[11] = l),
          (P[12] = f))
        : (f = P[12]),
        P[13] !== A
          ? ((u = (0, t.jsx)(E, {
              className:
                "bg-bg-tertiary text-[11px] font-medium text-text-secondary",
              children: A,
            })),
            (P[13] = A),
            (P[14] = u))
          : (u = P[14]),
        P[15] !== f || P[16] !== u
          ? ((m = (0, t.jsxs)(R, {
              className: "size-8 shrink-0",
              children: [f, u],
            })),
            (P[15] = f),
            (P[16] = u),
            (P[17] = m))
          : (m = P[17]),
        P[18] !== l
          ? ((p = (0, t.jsx)("span", {
              className:
                "truncate text-[13px] font-medium leading-4 text-text-primary",
              children: l,
            })),
            (P[18] = l),
            (P[19] = p))
          : (p = P[19]),
        P[20] !== S.xVerified
          ? ((x = S.xVerified
              ? (0, t.jsx)(n.y$, {
                  className: "size-3.5 shrink-0 text-text-secondary",
                  "aria-label": "Verified account",
                })
              : null),
            (P[20] = S.xVerified),
            (P[21] = x))
          : (x = P[21]),
        P[22] === Symbol.for("react.memo_cache_sentinel")
          ? ((h = (0, t.jsx)(a.Tc, {
              className: "ml-auto size-3 shrink-0 text-text-quaternary",
              "aria-hidden": !0,
            })),
            (P[22] = h))
          : (h = P[22]),
        P[23] !== p || P[24] !== x
          ? ((y = (0, t.jsxs)("div", {
              className: "flex min-w-0 items-center gap-1",
              children: [p, x, h],
            })),
            (P[23] = p),
            (P[24] = x),
            (P[25] = y))
          : (y = P[25]),
        P[26] !== c
          ? ((g = (0, t.jsxs)("div", {
              className:
                "mt-0.5 truncate text-[11px] font-normal leading-4 text-text-quaternary",
              children: ["@", c],
            })),
            (P[26] = c),
            (P[27] = g))
          : (g = P[27]),
        P[28] !== y || P[29] !== g
          ? ((v = (0, t.jsxs)("div", {
              className: "min-w-0 flex-1",
              children: [y, g],
            })),
            (P[28] = y),
            (P[29] = g),
            (P[30] = v))
          : (v = P[30]),
        P[31] !== v || P[32] !== m
          ? ((w = (0, t.jsxs)("div", {
              className: "flex items-start gap-2.5",
              children: [m, v],
            })),
            (P[31] = v),
            (P[32] = m),
            (P[33] = w))
          : (w = P[33]),
        P[34] !== I ||
        P[35] !== U ||
        P[36] !== S.xFollowersCount ||
        P[37] !== S.xFollowingCount
          ? ((b =
              U || I
                ? (0, t.jsxs)("div", {
                    className:
                      "mt-2.5 flex items-center gap-4 border-t border-border-secondary pt-2.5 text-[11px] font-normal leading-4 text-text-quaternary",
                    children: [
                      U
                        ? (0, t.jsxs)("div", {
                            className: "flex items-baseline gap-1",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "text-[13px] font-medium tabular-nums text-text-primary",
                                children: (0, o.J)(S.xFollowingCount),
                              }),
                              (0, t.jsx)("span", { children: "Following" }),
                            ],
                          })
                        : null,
                      I
                        ? (0, t.jsxs)("div", {
                            className: "flex items-baseline gap-1",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "text-[13px] font-medium tabular-nums text-text-primary",
                                children: (0, o.J)(S.xFollowersCount),
                              }),
                              (0, t.jsx)("span", { children: "Followers" }),
                            ],
                          })
                        : null,
                    ],
                  })
                : null),
            (P[34] = I),
            (P[35] = U),
            (P[36] = S.xFollowersCount),
            (P[37] = S.xFollowingCount),
            (P[38] = b))
          : (b = P[38]),
        P[39] !== k
          ? ((j = k
              ? (0, t.jsx)("div", {
                  className:
                    "mt-2.5 inline-flex h-7 w-full items-center justify-center rounded-md bg-bg-tertiary px-2.5 text-[12px] font-medium leading-none text-text-primary transition-colors hover:bg-bg-tertiary/75",
                  children: "See profile on X",
                })
              : null),
            (P[39] = k),
            (P[40] = j))
          : (j = P[40]),
        P[41] !== w || P[42] !== b || P[43] !== j
          ? ((N = (0, t.jsxs)(t.Fragment, { children: [w, b, j] })),
            (P[41] = w),
            (P[42] = b),
            (P[43] = j),
            (P[44] = N))
          : (N = P[44]));
      let D = N;
      return (
        P[45] !== O || P[46] !== D || P[47] !== k
          ? ((C = (0, t.jsx)(F.P, {
              side: "top",
              align: "center",
              collisionPadding: 12,
              className: "w-[280px] p-3",
              children: k
                ? (0, t.jsx)("a", {
                    href: k,
                    target: "_blank",
                    rel: "noreferrer",
                    onClick: T,
                    "aria-label": O,
                    className:
                      "block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
                    "data-testid": "x-profile-hover-card",
                    children: D,
                  })
                : (0, t.jsx)("div", {
                    "data-testid": "x-profile-hover-card",
                    children: D,
                  }),
            })),
            (P[45] = O),
            (P[46] = D),
            (P[47] = k),
            (P[48] = C))
          : (C = P[48]),
        C
      );
    },
    A = (e) => {
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
          ? ((a = (0, t.jsx)($, { view: n })), (i[2] = n), (i[3] = a))
          : (a = i[3]),
        a
      );
    };
  function T(e) {
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
          { children: d, xProfile: c } = e,
          f = (0, l.k)(i.D.X_FEATURES);
        if (!c.x_username.trim() || !f) {
          let e;
          return (
            s[0] !== d
              ? ((e = (0, t.jsx)(t.Fragment, { children: d })),
                (s[0] = d),
                (s[1] = e))
              : (e = s[1]),
            e
          );
        }
        return (
          s[2] !== d
            ? ((n = (0, t.jsx)(F.b, { asChild: !0, children: d })),
              (s[2] = d),
              (s[3] = n))
            : (n = s[3]),
          s[4] !== c
            ? ((a = (0, t.jsx)(A, { xProfile: c })), (s[4] = c), (s[5] = a))
            : (a = s[5]),
          s[6] !== n || s[7] !== a
            ? ((o = (0, t.jsxs)(F.c, {
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
            ? ((a = (0, t.jsx)($, { view: n })), (i[2] = n), (i[3] = a))
            : (a = i[3]),
          a
        );
      },
    ],
    630164,
  );
};
