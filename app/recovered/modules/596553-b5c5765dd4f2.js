// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    i = e.i(445242),
    n = e.i(426091),
    r = e.i(146695),
    a = e.i(705313),
    s = e.i(574472),
    l = e.i(458310),
    o = e.i(599077);
  e.i(12692);
  var d = e.i(398902),
    c = e.i(869955),
    u = e.i(953283),
    m = e.i(802630),
    x = e.i(897665),
    f = e.i(279602),
    h = e.i(410668),
    b = e.i(918094);
  let p = "/profile/";
  e.s(
    [
      "TopbarUser",
      0,
      function () {
        let e,
          y,
          g,
          v,
          j,
          w,
          _,
          k,
          N,
          z,
          T = (0, i.c)(27),
          { t: C } = (0, d.f)(),
          { address: S, userId: K, user: I } = (0, s.F)(),
          O = (0, o.usePathname)(),
          A = (0, h.f)(),
          B = (0, f.f)(I?.resolved_avatar_decoration);
        T[0] !== S || T[1] !== I || T[2] !== K
          ? ((e =
              (0, b.f)({ address: S, userId: K, user: I }) ??
              (0, r.d)("", I?.username)),
            (T[0] = S),
            (T[1] = I),
            (T[2] = K),
            (T[3] = e))
          : (e = T[3]);
        let F = e,
          P = I?.username;
        T[4] !== S || T[5] !== O || T[6] !== K || T[7] !== P
          ? ((y = (e) => {
              if (
                0 === e.button &&
                !e.metaKey &&
                !e.ctrlKey &&
                !e.shiftKey &&
                !e.altKey
              ) {
                var t;
                let i;
                ((t = { address: S, userId: K, username: P }),
                  (i = ((e) => {
                    if (!e?.startsWith(p)) return null;
                    let t = e.slice(p.length);
                    if (!t || t.includes("/")) return null;
                    try {
                      return decodeURIComponent(t);
                    } catch {
                      return t;
                    }
                  })(O)) &&
                    (0, r.E)(i, t.address ?? "", t.username, t.userId) &&
                    e.preventDefault());
              }
            }),
            (T[4] = S),
            (T[5] = O),
            (T[6] = K),
            (T[7] = P),
            (T[8] = y))
          : (y = T[8]);
        let U = y;
        (T[9] !== C
          ? ((g = C("web.topbar.view_profile")), (T[9] = C), (T[10] = g))
          : (g = T[10]),
          T[11] === Symbol.for("react.memo_cache_sentinel")
            ? ((v = (0, n.c)("group", m.K, m.p)), (T[11] = v))
            : (v = T[11]),
          T[12] === Symbol.for("react.memo_cache_sentinel")
            ? ((j = (0, n.c)(
                m.k,
                "transition-[box-shadow] group-hover:ring-text-quaternary",
              )),
              (T[12] = j))
            : (j = T[12]));
        let E = S ?? void 0;
        return (
          T[13] !== A || T[14] !== E
            ? ((w = (0, t.jsx)("span", {
                className: j,
                "aria-hidden": !0,
                children: (0, t.jsx)(a.f, {
                  className: "size-7 rounded-full object-cover",
                  ipfsPrefix: x.f,
                  isAnonymous: !1,
                  src: A,
                  address: E,
                  width: 56,
                  height: 56,
                }),
              })),
              (T[13] = A),
              (T[14] = E),
              (T[15] = w))
            : (w = T[15]),
          T[16] !== B || T[17] !== w
            ? ((_ = (0, t.jsx)(u.f, {
                decoration: B,
                variant: "list",
                children: w,
              })),
              (T[16] = B),
              (T[17] = w),
              (T[18] = _))
            : (_ = T[18]),
          T[19] === Symbol.for("react.memo_cache_sentinel")
            ? ((k = (0, t.jsx)(c.O, {})), (T[19] = k))
            : (k = T[19]),
          T[20] !== _
            ? ((N = (0, t.jsxs)("span", {
                className:
                  "relative inline-flex size-7 shrink-0 items-center justify-center align-middle",
                children: [_, k],
              })),
              (T[20] = _),
              (T[21] = N))
            : (N = T[21]),
          T[22] !== F || T[23] !== U || T[24] !== g || T[25] !== N
            ? ((z = (0, t.jsx)(l.default, {
                href: F,
                "aria-label": g,
                "data-testid": "topbar-user-trigger",
                onClick: U,
                className: v,
                children: N,
              })),
              (T[22] = F),
              (T[23] = U),
              (T[24] = g),
              (T[25] = N),
              (T[26] = z))
            : (z = T[26]),
          z
        );
      },
    ],
    596553,
  );
};
