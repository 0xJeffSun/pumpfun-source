// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(574472),
    n = e.i(599077),
    s = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    o = e.i(63289),
    l = e.i(367643),
    c = e.i(832705),
    d = e.i(640821),
    u = e.i(777683),
    m = e.i(711902),
    p = e.i(429285),
    f = e.i(198825),
    x = e.i(128054),
    b = e.i(410718),
    h = e.i(280667),
    y = e.i(86406),
    g = e.i(887800),
    v = e.i(745018),
    w = e.i(426091),
    k = e.i(974246),
    j = e.i(375670),
    _ = e.i(350989);
  let N =
    "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-white transition-colors hover:bg-bg-tertiary";
  function I(e) {
    let r,
      n,
      l,
      c,
      d,
      u,
      m,
      p,
      x,
      b,
      h,
      y,
      g,
      I,
      C,
      S,
      A = (0, i.c)(46);
    A[0] !== e
      ? (({
          authorAddress: r,
          authorUsername: n,
          isLoggedIn: u,
          initialIsFollowing: d,
          className: c,
          onClick: m,
          ...l
        } = e),
        (A[0] = e),
        (A[1] = r),
        (A[2] = n),
        (A[3] = l),
        (A[4] = c),
        (A[5] = d),
        (A[6] = u),
        (A[7] = m))
      : ((r = A[1]),
        (n = A[2]),
        (l = A[3]),
        (c = A[4]),
        (d = A[5]),
        (u = A[6]),
        (m = A[7]));
    let { t: F } = (0, a.f)(),
      U = void 0 !== d;
    A[8] !== d || A[9] !== U
      ? ((p = { skipInitialFetch: U, initialIsFollowing: d }),
        (A[8] = d),
        (A[9] = U),
        (A[10] = p))
      : (p = A[10]);
    let {
        isFollowing: T,
        isReady: E,
        follow: D,
        unfollow: B,
        showCaptcha: L,
        setShowCaptcha: P,
        handleCaptchaSuccess: Q,
        handleCaptchaError: O,
      } = (0, _.f)(r, p),
      { setShowWallet: K } = (0, f.useConnectWallet)(),
      [M, R] = (0, s.useState)(!1);
    if (!E || M) {
      let e, i;
      return (
        A[11] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, w.c)(N, "pointer-events-none")), (A[11] = e))
          : (e = A[11]),
        A[12] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)("div", {
              "aria-hidden": !0,
              className: e,
              "data-testid": "follow-author-menu-item-skeleton",
              children: (0, t.jsx)(j.f, {
                className: "h-4 w-full bg-bg-quaternary",
              }),
            })),
            (A[12] = i))
          : (i = A[12]),
        i
      );
    }
    A[13] !== D ||
    A[14] !== T ||
    A[15] !== u ||
    A[16] !== m ||
    A[17] !== K ||
    A[18] !== F ||
    A[19] !== B
      ? ((x = async function (e) {
          if ((m?.(e), !e.defaultPrevented)) {
            if (!u) return void K(!0);
            R(!0);
            try {
              T ? await B() : await D();
            } catch {
              o.c.error(F("web.bounties.follow_status_error"));
            }
            R(!1);
          }
        }),
        (A[13] = D),
        (A[14] = T),
        (A[15] = u),
        (A[16] = m),
        (A[17] = K),
        (A[18] = F),
        (A[19] = B),
        (A[20] = x))
      : (x = A[20]);
    let q = x;
    if (A[21] !== n || A[22] !== T || A[23] !== F) {
      let e = "string" == typeof n ? n.trim() : "";
      ((b = e
        ? T
          ? F("web.bounties.unfollow_user", { username: e })
          : F("web.bounties.follow_user", { username: e })
        : T
          ? F("web.bounties.unfollow")
          : F("web.bounties.follow")),
        (A[21] = n),
        (A[22] = T),
        (A[23] = F),
        (A[24] = b));
    } else b = A[24];
    let $ = b;
    return (
      A[25] !== O || A[26] !== Q || A[27] !== u || A[28] !== P || A[29] !== L
        ? ((h =
            L && u
              ? (0, t.jsx)(k.f, {
                  onClose: () => P(!1),
                  onError: O,
                  onSuccess: Q,
                })
              : null),
          (A[25] = O),
          (A[26] = Q),
          (A[27] = u),
          (A[28] = P),
          (A[29] = L),
          (A[30] = h))
        : (h = A[30]),
      A[31] !== c
        ? ((y = (0, w.c)(N, c)), (A[31] = c), (A[32] = y))
        : (y = A[32]),
      A[33] !== T
        ? ((g = T
            ? (0, t.jsx)(v.so, {
                className: "h-4 w-4 shrink-0 text-text-secondary",
              })
            : (0, t.jsx)(v.i8, {
                className: "h-4 w-4 shrink-0 text-text-secondary",
              })),
          (A[33] = T),
          (A[34] = g))
        : (g = A[34]),
      A[35] !== $
        ? ((I = (0, t.jsx)("span", {
            className: "min-w-0 truncate",
            children: $,
          })),
          (A[35] = $),
          (A[36] = I))
        : (I = A[36]),
      A[37] !== l || A[38] !== q || A[39] !== y || A[40] !== g || A[41] !== I
        ? ((C = (0, t.jsxs)("button", {
            ...l,
            className: y,
            onClick: q,
            type: "button",
            children: [g, I],
          })),
          (A[37] = l),
          (A[38] = q),
          (A[39] = y),
          (A[40] = g),
          (A[41] = I),
          (A[42] = C))
        : (C = A[42]),
      A[43] !== h || A[44] !== C
        ? ((S = (0, t.jsxs)(t.Fragment, { children: [h, C] })),
          (A[43] = h),
          (A[44] = C),
          (A[45] = S))
        : (S = A[45]),
      S
    );
  }
  e.s(["f", 0, I], 559210);
  var C = e.i(405493),
    S = e.i(716704);
  e.s(
    [
      "f",
      0,
      function (e) {
        let v,
          w,
          k,
          j,
          _,
          N,
          A,
          F,
          U,
          T,
          E,
          D,
          B,
          L = (0, i.c)(49),
          {
            bounty: P,
            isDraft: Q,
            triggerClassName: O,
            triggerIconClassName: K,
          } = e,
          M = void 0 !== Q && Q,
          { t: R } = (0, a.f)(),
          { address: q } = (0, r.F)(),
          $ = (0, n.useRouter)(),
          { openWithDraft: Y } = (0, b.useBountyCreateDialog)(),
          { setShowWallet: H } = (0, f.useConnectWallet)(),
          W = (0, d.f)(),
          [V, z] = (0, s.useState)(!1),
          [G, X] = (0, s.useState)(null);
        (L[0] !== R
          ? ((v = () => {
              (X(null), o.c.success(R("web.bounties.draft_deleted")));
            }),
            (L[0] = R),
            (L[1] = v))
          : (v = L[1]),
          L[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((w = async (e, t) => {
                let i = await (0, u.A)(e);
                i?.code === "BOUNTY_FUNDED_ON_CHAIN" && X(t.taskId);
              }),
              (L[2] = w))
            : (w = L[2]),
          L[3] !== v
            ? ((k = { onSuccess: v, onError: w }), (L[3] = v), (L[4] = k))
            : (k = L[4]));
        let Z = (0, l.f)(k);
        L[5] !== Y || L[6] !== $ || L[7] !== R
          ? ((j = {
              onSuccess: (e) => {
                if ((X(null), "NEEDS_FUNDING" === e.status)) {
                  (o.c.success(R("web.bounties.draft_restored")), Y(e.taskId));
                  return;
                }
                (o.c.success(R("web.bounties.bounty_recovered")),
                  $.push((0, p.$)({ taskId: e.taskId })));
              },
            }),
            (L[5] = Y),
            (L[6] = $),
            (L[7] = R),
            (L[8] = j))
          : (j = L[8]);
        let J = (0, c.f)(j);
        L[9] !== q
          ? ((_ = q?.toLowerCase()), (L[9] = q), (L[10] = _))
          : (_ = L[10]);
        let ee = P.creator.address ?? "";
        L[11] !== ee
          ? ((N = ee.toLowerCase()), (L[11] = ee), (L[12] = N))
          : (N = L[12]);
        let et = _ === N,
          ei = !et && !M,
          er = !et && !M && !!P.creator.address;
        if (!(M || ei || er || W)) return null;
        let en = Z.isPending && Z.variables?.taskId === P.id,
          es = J.isPending && J.variables?.taskId === P.id;
        return (
          L[13] !== q || L[14] !== ei || L[15] !== H
            ? ((A = ei
                ? () => {
                    q ? z(!0) : H(!0);
                  }
                : void 0),
              (L[13] = q),
              (L[14] = ei),
              (L[15] = H),
              (L[16] = A))
            : (A = L[16]),
          L[17] !== q ||
          L[18] !== P.creator.address ||
          L[19] !== P.creator.username ||
          L[20] !== er
            ? ((F = er
                ? (0, t.jsx)(I, {
                    authorAddress: P.creator.address,
                    authorUsername: P.creator.username,
                    isLoggedIn: !!q,
                  })
                : null),
              (L[17] = q),
              (L[18] = P.creator.address),
              (L[19] = P.creator.username),
              (L[20] = er),
              (L[21] = F))
            : (F = L[21]),
          L[22] !== P.id ||
          L[23] !== P.title ||
          L[24] !== Z ||
          L[25] !== G ||
          L[26] !== en ||
          L[27] !== M ||
          L[28] !== es ||
          L[29] !== J
            ? ((U = M
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(y.f, { taskId: P.id }),
                      (0, t.jsx)(h.f, {
                        draftTitle: P.title,
                        isDeleting: en,
                        isFundedOnChain: G === P.id,
                        isRecovering: es,
                        onConfirm: () => Z.mutate({ taskId: P.id }),
                        onConfirmForce: () =>
                          Z.mutate({ taskId: P.id, force: !0 }),
                        onFinishPublishing: () => J.mutate({ taskId: P.id }),
                      }),
                    ],
                  })
                : null),
              (L[22] = P.id),
              (L[23] = P.title),
              (L[24] = Z),
              (L[25] = G),
              (L[26] = en),
              (L[27] = M),
              (L[28] = es),
              (L[29] = J),
              (L[30] = U))
            : (U = L[30]),
          L[31] !== P || L[32] !== W || L[33] !== M
            ? ((T =
                !M && W
                  ? (0, t.jsxs)(t.Fragment, {
                      children: [
                        (0, t.jsx)(C.f, {
                          isBanned: (0, m.S)(P),
                          banInfo: P.banInfo,
                          unbanInfo: P.unbanInfo,
                          taskId: P.id,
                          title: P.title,
                        }),
                        (0, t.jsx)(S.f, {
                          isNsfw: (0, m.e)(P),
                          taskId: P.id,
                          title: P.title,
                        }),
                      ],
                    })
                  : null),
              (L[31] = P),
              (L[32] = W),
              (L[33] = M),
              (L[34] = T))
            : (T = L[34]),
          L[35] !== F ||
          L[36] !== U ||
          L[37] !== T ||
          L[38] !== A ||
          L[39] !== O ||
          L[40] !== K
            ? ((E = (0, t.jsxs)(g.f, {
                onReport: A,
                triggerClassName: O,
                triggerIconClassName: K,
                children: [F, U, T],
              })),
              (L[35] = F),
              (L[36] = U),
              (L[37] = T),
              (L[38] = A),
              (L[39] = O),
              (L[40] = K),
              (L[41] = E))
            : (E = L[41]),
          L[42] !== P.id || L[43] !== ei || L[44] !== V
            ? ((D =
                ei && V
                  ? (0, t.jsx)(x.f, {
                      onOpenChange: z,
                      open: V,
                      target: { type: "task", taskId: P.id },
                    })
                  : null),
              (L[42] = P.id),
              (L[43] = ei),
              (L[44] = V),
              (L[45] = D))
            : (D = L[45]),
          L[46] !== E || L[47] !== D
            ? ((B = (0, t.jsxs)(t.Fragment, { children: [E, D] })),
              (L[46] = E),
              (L[47] = D),
              (L[48] = B))
            : (B = L[48]),
          B
        );
      },
    ],
    392089,
  );
};
