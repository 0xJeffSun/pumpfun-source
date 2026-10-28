// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    n = e.i(157633),
    i = e.i(745018),
    a = e.i(352386);
  e.i(12692);
  var r = e.i(398902),
    s = e.i(63289),
    o = e.i(974246),
    d = e.i(925331),
    u = e.i(51206),
    c = e.i(813792),
    m = e.i(350989),
    f = e.i(595673),
    p = e.i(198825);
  e.s([
    "f",
    0,
    function (e) {
      let h,
        g,
        x,
        b,
        y,
        w,
        v,
        _,
        I,
        N,
        j = (0, l.c)(44),
        {
          userAddress: k,
          displayName: M,
          isLoggedIn: C,
          density: U,
          size: S,
          initialIsFollowing: P,
          skipInitialFetch: A,
          connectSource: F,
          className: T,
          "data-testid": z,
        } = e,
        { t: W } = (0, r.f)(),
        { setShowWallet: D } = (0, p.useConnectWallet)(),
        [E, B] = (0, a.useState)(!1);
      j[0] !== M || j[1] !== P || j[2] !== A
        ? ((h = { initialIsFollowing: P, displayName: M, skipInitialFetch: A }),
          (j[0] = M),
          (j[1] = P),
          (j[2] = A),
          (j[3] = h))
        : (h = j[3]);
      let {
          isFollowing: L,
          isReady: O,
          follow: H,
          unfollow: $,
          showCaptcha: R,
          setShowCaptcha: V,
          handleCaptchaSuccess: q,
          handleCaptchaError: K,
        } = (0, m.f)(k, h),
        Q = C && L,
        G = C && !O,
        J = E || G;
      j[4] !== F ||
      j[5] !== H ||
      j[6] !== J ||
      j[7] !== L ||
      j[8] !== C ||
      j[9] !== D ||
      j[10] !== W ||
      j[11] !== $
        ? ((g = async () => {
            if (!C) {
              ((0, f.Lw)({ source: F }), D(!0));
              return;
            }
            if (!J) {
              B(!0);
              try {
                L ? await $() : await H();
              } catch {
                s.c.error(
                  W(
                    L
                      ? "profile.follow.failed_to_unfollow"
                      : "profile.follow.failed_to_follow",
                  ),
                );
              }
              B(!1);
            }
          }),
          (j[4] = F),
          (j[5] = H),
          (j[6] = J),
          (j[7] = L),
          (j[8] = C),
          (j[9] = D),
          (j[10] = W),
          (j[11] = $),
          (j[12] = g))
        : (g = j[12]);
      let X = g;
      (j[13] !== K || j[14] !== q || j[15] !== C || j[16] !== V || j[17] !== R
        ? ((x =
            R && C
              ? (0, t.jsx)(o.f, {
                  onClose: () => V(!1),
                  onSuccess: q,
                  onError: K,
                })
              : null),
          (j[13] = K),
          (j[14] = q),
          (j[15] = C),
          (j[16] = V),
          (j[17] = R),
          (j[18] = x))
        : (x = j[18]),
        j[19] !== Q
          ? ((b = (0, d.V)(Q)), (j[19] = Q), (j[20] = b))
          : (b = j[20]),
        j[21] !== Q
          ? ((y = (0, d.I)(Q)), (j[21] = Q), (j[22] = y))
          : (y = j[22]));
      let Y = J || void 0,
        Z = Q ? "following" : "follow";
      return (
        j[23] !== X
          ? ((w = (e) => {
              (e.stopPropagation(), X());
            }),
            (j[23] = X),
            (j[24] = w))
          : (w = j[24]),
        j[25] !== Q
          ? ((v = Q
              ? (0, t.jsx)(i.TS, { "aria-hidden": !0 })
              : (0, t.jsx)(n.yC, { "aria-hidden": !0 })),
            (j[25] = Q),
            (j[26] = v))
          : (v = j[26]),
        j[27] !== T ||
        j[28] !== U ||
        j[29] !== S ||
        j[30] !== y ||
        j[31] !== Y ||
        j[32] !== Z ||
        j[33] !== w ||
        j[34] !== v ||
        j[35] !== z
          ? ((_ = (0, t.jsx)(u._, {
              density: U,
              size: S,
              "aria-label": y,
              "aria-busy": Y,
              "data-state": Z,
              "data-testid": z,
              onClick: w,
              className: T,
              children: v,
            })),
            (j[27] = T),
            (j[28] = U),
            (j[29] = S),
            (j[30] = y),
            (j[31] = Y),
            (j[32] = Z),
            (j[33] = w),
            (j[34] = v),
            (j[35] = z),
            (j[36] = _))
          : (_ = j[36]),
        j[37] !== U || j[38] !== b || j[39] !== _
          ? ((I = (0, t.jsx)(c.f, {
              content: b,
              density: U,
              delay: 0,
              children: _,
            })),
            (j[37] = U),
            (j[38] = b),
            (j[39] = _),
            (j[40] = I))
          : (I = j[40]),
        j[41] !== I || j[42] !== x
          ? ((N = (0, t.jsxs)(t.Fragment, { children: [x, I] })),
            (j[41] = I),
            (j[42] = x),
            (j[43] = N))
          : (N = j[43]),
        N
      );
    },
  ]);
};
