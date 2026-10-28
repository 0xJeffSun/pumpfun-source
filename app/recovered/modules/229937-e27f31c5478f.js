// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(63289),
    r = e.i(974246),
    a = e.i(925331),
    i = e.i(396898),
    s = e.i(116549),
    n = e.i(813792),
    o = e.i(350989),
    d = e.i(595673),
    c = e.i(338319),
    u = e.i(198825);
  e.s([
    "f",
    0,
    function (e) {
      let {
          userAddress: p,
          displayName: m,
          isLoggedIn: f,
          initialIsFollowing: x,
          size: h = "md",
          variant: g = "pill",
          rounded: y = "full",
          idle: v = "filled",
          onFollowSuccess: b,
          attribution: w,
          className: j,
        } = e,
        {
          isFollowing: N,
          follow: I,
          unfollow: _,
          showCaptcha: k,
          setShowCaptcha: C,
          handleCaptchaSuccess: S,
          handleCaptchaError: P,
        } = (0, o.f)(p, {
          skipInitialFetch: void 0 !== x,
          initialIsFollowing: x,
          displayName: m,
          attribution: w,
        }),
        { setShowWallet: U } = (0, u.useConnectWallet)(),
        A = (0, s.x)();
      return (0, t.jsxs)(t.Fragment, {
        children: [
          k &&
            f &&
            (0, t.jsx)(r.f, { onClose: () => C(!1), onSuccess: S, onError: P }),
          (0, t.jsx)(n.f, {
            content: (0, a.V)(N),
            density: A,
            children: (0, t.jsxs)("button", {
              type: "button",
              "aria-pressed": N,
              "aria-label": "icon" === g ? (N ? "Unfollow" : "Follow") : void 0,
              onClick: () => {
                if (!f) {
                  ((0, d.Lw)({ source: "recommendations" }), U(!0));
                  return;
                }
                (async () => {
                  try {
                    N ? await _() : (await I(), b?.());
                  } catch {
                    l.c.error(
                      N
                        ? "Could not unfollow. Try again."
                        : "Could not follow. Try again.",
                    );
                  }
                })();
              },
              className: (0, c.c)(
                (0, i.z)(N),
                !N && "ghost" === v && i.$,
                "md" === y ? "rounded-md" : "rounded-full",
                "icon" === g
                  ? "size-6"
                  : "sm" === h
                    ? "h-6 gap-1 px-2 text-[11px] leading-none"
                    : "h-8 gap-1.5 px-3 text-xs",
                j,
              ),
              children: [
                (0, t.jsx)(a.a, {
                  isFollowing: N,
                  className: "sm" === h ? "size-3" : "size-3.5",
                }),
                "icon" === g ? null : (0, t.jsx)(a.H, { isFollowing: N }),
              ],
            }),
          }),
        ],
      });
    },
  ]);
};
