// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(78436),
    n = e.i(634103);
  let r = {
      progressByWallet: {},
      active: null,
      refused: null,
      pendingLogin: null,
      explicitSignIn: null,
      autoOpenFor: null,
    },
    i = (0, t.$)()(
      (0, n.V)(
        (e) => ({
          ...r,
          begin: (t) =>
            e({
              active: { wallet: t, startedAt: Date.now() },
              explicitSignIn: null,
            }),
          end: () => e({ active: null }),
          setProgress: (t, n) =>
            e((e) => ({ progressByWallet: { ...e.progressByWallet, [t]: n } })),
          clearProgress: (t) =>
            e((e) => {
              let { [t]: n, ...r } = e.progressByWallet;
              return { progressByWallet: r };
            }),
          refuse: (t) =>
            e({ refused: { privyUserId: t, refusedAt: Date.now() } }),
          clearRefused: (t) =>
            e((e) =>
              void 0 === t || e.refused?.privyUserId === t
                ? { refused: null }
                : {},
            ),
          beginLogin: (t, n) =>
            e({
              pendingLogin: { wallet: t, method: n, startedAt: Date.now() },
            }),
          endLogin: () => e({ pendingLogin: null }),
          beginExplicitSignIn: (t) =>
            e({
              explicitSignIn: { startedAt: Date.now(), authenticatedBefore: t },
              pendingLogin: null,
              active: null,
            }),
          endExplicitSignIn: () => e({ explicitSignIn: null }),
          requestAutoOpen: (t) => e({ autoOpenFor: t }),
          clearAutoOpen: () => e({ autoOpenFor: null }),
        }),
        {
          name: "pump-privy-link-v1",
          storage: (0, n.j)(() => localStorage),
          partialize: (e) => ({
            progressByWallet: e.progressByWallet,
            active: e.active,
            refused: e.refused,
            pendingLogin: e.pendingLogin,
            explicitSignIn: e.explicitSignIn,
            autoOpenFor: e.autoOpenFor,
          }),
        },
      ),
    ),
    a = (e, t) => null !== e && t - e.startedAt < 18e5,
    o = (e, t) => null !== e && t - e.startedAt < 6e5,
    s = (e, t) => null !== e && t - e.startedAt < 6e5;
  e.s([
    "d",
    0,
    (e) => {
      let {
          active: t,
          progressByWallet: n,
          refused: r,
          pendingLogin: l,
          explicitSignIn: u,
        } = i.getState(),
        c = Date.now();
      return (
        !!(a(t, c) || o(l, c)) ||
        (!!e &&
          (!(
            null === r ||
            !(c - r.refusedAt < 9e5) ||
            r?.privyUserId !== e ||
            (s(u, c) && u.authenticatedBefore !== e)
          ) ||
            Object.values(n).some(
              (t) => "sso_linked" === t.step && t.privyUserId === e,
            )))
      );
    },
    "J",
    0,
    ({ privyUserId: e, solanaAddress: t }) => {
      let { active: n, progressByWallet: r } = i.getState();
      return (
        (!!(null !== n && a(n, Date.now())) &&
          (null === t || n.wallet === t)) ||
        Object.values(r).some(
          (t) => "sso_linked" === t.step && t.privyUserId === e,
        )
      );
    },
    "B",
    0,
    () => o(i.getState().pendingLogin, Date.now()),
    "Z",
    0,
    i,
    "h",
    0,
    (e = Date.now()) => {
      let { explicitSignIn: t } = i.getState();
      return s(t, e) ? t : null;
    },
    "S",
    0,
    (e) => i.getState().progressByWallet[e],
    "i",
    0,
    i,
  ]);
};
