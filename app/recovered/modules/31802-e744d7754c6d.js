// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(439587),
    l = e.i(7284),
    o = e.i(352386),
    n = e.i(63289),
    s = e.i(974246),
    a = e.i(925331),
    c = e.i(396898),
    d = e.i(116549),
    u = e.i(813792),
    f = e.i(29542),
    p = e.i(350989),
    m = e.i(595673),
    h = e.i(198825);
  let x = o.default.memo((e) => {
    let o,
      x,
      g,
      y,
      w,
      b,
      v,
      j = (0, r.c)(34),
      {
        userAddress: _,
        updatedStyle: I,
        useRetailButton: k,
        isLoggedIn: N,
        initialIsFollowing: F,
        hideUntilReady: C,
        mayhemVariant: O,
        displayName: E,
      } = e,
      L = void 0 !== F;
    j[0] !== E || j[1] !== F || j[2] !== L
      ? ((o = { skipInitialFetch: L, initialIsFollowing: F, displayName: E }),
        (j[0] = E),
        (j[1] = F),
        (j[2] = L),
        (j[3] = o))
      : (o = j[3]);
    let {
        isFollowing: P,
        isReady: T,
        follow: S,
        unfollow: q,
        showCaptcha: z,
        setShowCaptcha: R,
        handleCaptchaSuccess: A,
        handleCaptchaError: U,
      } = (0, p.f)(_, o),
      { setShowWallet: $ } = (0, h.useConnectWallet)(),
      G = (0, a.G)(),
      W = (0, d.x)();
    if (void 0 !== C && C && !T) return null;
    let K = N && P,
      B = K
        ? f.f.PROFILE_PAGE.FOLLOW_BUTTON.UNFOLLOW
        : f.f.PROFILE_PAGE.FOLLOW_BUTTON.FOLLOW;
    j[4] !== K ? ((x = (0, c.r)(K)), (j[4] = K), (j[5] = x)) : (x = j[5]);
    let Q = x;
    j[6] !== S || j[7] !== P || j[8] !== N || j[9] !== $ || j[10] !== q
      ? ((g = () => {
          if (!N) {
            ((0, m.Lw)({ source: "recommendations" }), $(!0));
            return;
          }
          (async () => {
            try {
              P ? await q() : await S();
            } catch {
              n.c.error(
                P
                  ? "Could not unfollow. Try again."
                  : "Could not follow. Try again.",
              );
            }
          })();
        }),
        (j[6] = S),
        (j[7] = P),
        (j[8] = N),
        (j[9] = $),
        (j[10] = q),
        (j[11] = g))
      : (g = j[11]);
    let H = g;
    return (
      j[12] !== U || j[13] !== A || j[14] !== N || j[15] !== R || j[16] !== z
        ? ((y =
            z &&
            N &&
            (0, t.jsx)(s.f, {
              onClose: () => R(!1),
              onSuccess: A,
              onError: U,
            })),
          (j[12] = U),
          (j[13] = A),
          (j[14] = N),
          (j[15] = R),
          (j[16] = z),
          (j[17] = y))
        : (y = j[17]),
      j[18] !== G ||
      j[19] !== Q ||
      j[20] !== H ||
      j[21] !== N ||
      j[22] !== O ||
      j[23] !== K ||
      j[24] !== I ||
      j[25] !== k
        ? ((w = O
            ? (0, t.jsx)("button", {
                type: "button",
                "aria-pressed": K,
                className: (0, l.U)(
                  (0, c.z)(K),
                  "h-[34px] gap-1.5 rounded-full px-4 text-[13px]",
                ),
                onClick: H,
                children: (0, t.jsx)(a.H, { isFollowing: K }),
              })
            : k
              ? (0, t.jsx)(i.K, {
                  size: 32,
                  variant: Q.variant,
                  className: Q.className,
                  "aria-label": N
                    ? (0, a.I)(K)
                    : f.f.PROFILE_PAGE.FOLLOW_BUTTON.LOG_IN,
                  iconStart: N
                    ? (0, t.jsx)(a.a, { isFollowing: K, className: "size-4" })
                    : void 0,
                  onClick: H,
                  ...G.intentProps,
                  children: N
                    ? (0, a.i)({ isFollowing: K, isIntent: G.isIntent })
                    : f.f.PROFILE_PAGE.FOLLOW_BUTTON.LOG_IN,
                })
              : I
                ? (0, t.jsx)("button", {
                    type: "button",
                    "aria-pressed": K,
                    className: (0, l.U)(
                      (0, c.z)(K),
                      "h-6 min-w-[60px] max-w-full gap-1 rounded px-2 py-1 text-center text-xs",
                    ),
                    onClick: H,
                    children: N
                      ? (0, t.jsx)(a.H, { isFollowing: K })
                      : f.f.PROFILE_PAGE.FOLLOW_BUTTON.LOG_IN,
                  })
                : (0, t.jsx)("button", {
                    type: "button",
                    "aria-pressed": K,
                    className: (0, l.U)(
                      (0, c.z)(K),
                      "h-fit min-w-[70px] max-w-full gap-1.5 whitespace-normal rounded-full px-3 py-1 text-center text-xs sm:text-xs",
                    ),
                    onClick: H,
                    children: N
                      ? (0, t.jsx)(a.H, { isFollowing: K })
                      : f.f.PROFILE_PAGE.FOLLOW_BUTTON.LOG_IN,
                  })),
          (j[18] = G),
          (j[19] = Q),
          (j[20] = H),
          (j[21] = N),
          (j[22] = O),
          (j[23] = K),
          (j[24] = I),
          (j[25] = k),
          (j[26] = w))
        : (w = j[26]),
      j[27] !== W || j[28] !== B || j[29] !== w
        ? ((b = (0, t.jsx)(u.f, { content: B, density: W, children: w })),
          (j[27] = W),
          (j[28] = B),
          (j[29] = w),
          (j[30] = b))
        : (b = j[30]),
      j[31] !== y || j[32] !== b
        ? ((v = (0, t.jsxs)(t.Fragment, { children: [y, b] })),
          (j[31] = y),
          (j[32] = b),
          (j[33] = v))
        : (v = j[33]),
      v
    );
  });
  ((x.displayName = "FollowButton"), e.s(["f", 0, x]));
};
