// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(745018),
    i = e.i(439587),
    n = e.i(292686),
    l = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    o = e.i(63289),
    c = e.i(850956),
    d = e.i(865229),
    u = e.i(258861),
    m = e.i(54065),
    f = e.i(595673);
  function p(e) {
    let p,
      h,
      b,
      x,
      g,
      y,
      v,
      w,
      _,
      j,
      C,
      N,
      S,
      k,
      E,
      A,
      I,
      T,
      R,
      L,
      O,
      M,
      D,
      F,
      P,
      z,
      K,
      B,
      H,
      q,
      W,
      U,
      V,
      G = (0, r.c)(75),
      { isOpen: $, userAddress: Q, initialCode: Z, onClose: Y } = e,
      { t: X } = (0, s.f)(),
      [J, ee] = (0, l.useState)(Z),
      et = (0, d.b)(J);
    G[0] !== Z
      ? ((p = (e) =>
          Z.length > 0 && e.toLowerCase() === Z.toLowerCase()
            ? n.ow.AUTO_APPLIED
            : n.ow.MANUAL),
        (G[0] = Z),
        (G[1] = p))
      : (p = G[1]);
    let er = p;
    (G[2] !== er || G[3] !== X
      ? ((h = (e, t) => {
          (0, f.rE)({
            code: t,
            outcome: e.outcome,
            entryType: er(t),
            source: "onboarding",
          });
          let r = (0, m.f)(X, e.outcome);
          "recorded" === r.kind
            ? o.c.success(X("web.profile.referral_code_applied"))
            : o.c.error(r.message);
        }),
        (b = (e, t) => {
          ((0, f.rE)({
            code: t,
            outcome: "requestFailed",
            entryType: er(t),
            source: "onboarding",
          }),
            o.c.error(X("web.profile.referral_apply_failed")));
        }),
        (G[2] = er),
        (G[3] = X),
        (G[4] = h),
        (G[5] = b))
      : ((h = G[4]), (b = G[5])),
      G[6] !== h || G[7] !== b || G[8] !== Q
        ? ((x = { userAddress: Q, onSuccess: h, onError: b }),
          (G[6] = h),
          (G[7] = b),
          (G[8] = Q),
          (G[9] = x))
        : (x = G[9]));
    let ea = (0, c.y)(x),
      ei = (0, l.useRef)(!1),
      en = (0, l.useRef)(!1),
      el = et.canSubmit && !ea.isPending;
    G[10] === Symbol.for("react.memo_cache_sentinel")
      ? ((g = () => !ei.current && ((ei.current = !0), !0)), (G[10] = g))
      : (g = G[10]);
    let es = g;
    G[11] === Symbol.for("react.memo_cache_sentinel")
      ? ((y = (e) => {
          ee(e.replace(/\s/g, ""));
        }),
        (G[11] = y))
      : (y = G[11]);
    let eo = y;
    G[12] === Symbol.for("react.memo_cache_sentinel")
      ? ((v = () => {
          en.current || ((en.current = !0), (0, f.EO)());
        }),
        (G[12] = v))
      : (v = G[12]);
    let ec = v;
    G[13] !== ea || G[14] !== el || G[15] !== Y || G[16] !== et.trimmedCode
      ? ((w = () => {
          if (!el || !es()) return;
          let e = et.trimmedCode;
          ((0, f.jV)({ code: e, source: "onboarding" }),
            ea.mutate(e),
            (0, u.S)(),
            Y("submitted"));
        }),
        (G[13] = ea),
        (G[14] = el),
        (G[15] = Y),
        (G[16] = et.trimmedCode),
        (G[17] = w))
      : (w = G[17]);
    let ed = w;
    G[18] !== Y
      ? ((_ = () => {
          es() && ((0, f.vT)(), (0, u.S)(), Y("skipped"));
        }),
        (G[18] = Y),
        (G[19] = _))
      : (_ = G[19]);
    let eu = _;
    (G[20] !== eu
      ? ((j = (e) => {
          e || eu();
        }),
        (G[20] = eu),
        (G[21] = j))
      : (j = G[21]),
      G[22] === Symbol.for("react.memo_cache_sentinel")
        ? ((C = (0, t.jsx)("div", {
            className:
              "flex size-16 items-center justify-center rounded-3xl bg-bg-tertiary",
            children: (0, t.jsx)(a.Dz, {
              size: 32,
              className: "text-text-primary",
              "aria-hidden": !0,
            }),
          })),
          (N = (0, t.jsx)(i.k, { height: 16 })),
          (G[22] = C),
          (G[23] = N))
        : ((C = G[22]), (N = G[23])),
      G[24] !== X
        ? ((S = X("onboarding.referral_code.title")), (G[24] = X), (G[25] = S))
        : (S = G[25]),
      G[26] !== S
        ? ((k = (0, t.jsx)("h2", {
            className: "font-semibold text-2xl text-text-primary",
            children: S,
          })),
          (G[26] = S),
          (G[27] = k))
        : (k = G[27]),
      G[28] === Symbol.for("react.memo_cache_sentinel")
        ? ((E = (0, t.jsx)(i.k, { height: 8 })), (G[28] = E))
        : (E = G[28]),
      G[29] !== X
        ? ((A = X("onboarding.referral_code.description")),
          (G[29] = X),
          (G[30] = A))
        : (A = G[30]),
      G[31] !== A
        ? ((I = (0, t.jsx)("p", {
            className: "text-text-tertiary",
            children: A,
          })),
          (G[31] = A),
          (G[32] = I))
        : (I = G[32]),
      G[33] !== k || G[34] !== I
        ? ((T = (0, t.jsxs)("div", {
            className: "flex flex-col items-center text-center",
            children: [C, N, k, E, I],
          })),
          (G[33] = k),
          (G[34] = I),
          (G[35] = T))
        : (T = G[35]),
      G[36] === Symbol.for("react.memo_cache_sentinel")
        ? ((R = (0, t.jsx)(i.k, { height: 24 })), (G[36] = R))
        : (R = G[36]),
      G[37] === Symbol.for("react.memo_cache_sentinel")
        ? ((L = (e) => eo(e.target.value)), (G[37] = L))
        : (L = G[37]),
      G[38] !== ed
        ? ((O = (e) => {
            "Enter" === e.key && ed();
          }),
          (G[38] = ed),
          (G[39] = O))
        : (O = G[39]),
      G[40] !== X
        ? ((M = X("onboarding.referral_code.placeholder")),
          (G[40] = X),
          (G[41] = M))
        : (M = G[41]),
      G[42] !== X
        ? ((D = X("onboarding.referral_code.placeholder")),
          (G[42] = X),
          (G[43] = D))
        : (D = G[43]));
    let em = !!et.message || void 0;
    (G[44] !== J || G[45] !== O || G[46] !== M || G[47] !== D || G[48] !== em
      ? ((F = (0, t.jsx)(i.e, {
          value: J,
          onChange: L,
          onFocus: ec,
          onKeyDown: O,
          maxLength: d.x,
          autoCapitalize: "none",
          autoCorrect: "off",
          autoComplete: "off",
          spellCheck: !1,
          placeholder: M,
          "aria-label": D,
          "aria-invalid": em,
          "data-testid": "referral-onboarding-input",
        })),
        (G[44] = J),
        (G[45] = O),
        (G[46] = M),
        (G[47] = D),
        (G[48] = em),
        (G[49] = F))
      : (F = G[49]),
      G[50] !== et.message
        ? ((P = (0, t.jsx)("p", {
            className: "min-h-4 text-xs leading-4 text-loss",
            "data-testid": "referral-onboarding-message",
            children: et.message,
          })),
          (G[50] = et.message),
          (G[51] = P))
        : (P = G[51]),
      G[52] === Symbol.for("react.memo_cache_sentinel")
        ? ((z = (0, t.jsx)(i.k, { height: 16 })), (G[52] = z))
        : (z = G[52]));
    let ef = !el;
    return (
      G[53] !== X
        ? ((K = X("common.submit")), (G[53] = X), (G[54] = K))
        : (K = G[54]),
      G[55] !== ed || G[56] !== ef || G[57] !== K
        ? ((B = (0, t.jsx)(i.K, {
            isFullWidth: !0,
            size: 48,
            isDisabled: ef,
            onClick: ed,
            "data-testid": "referral-onboarding-submit",
            children: K,
          })),
          (G[55] = ed),
          (G[56] = ef),
          (G[57] = K),
          (G[58] = B))
        : (B = G[58]),
      G[59] === Symbol.for("react.memo_cache_sentinel")
        ? ((H = (0, t.jsx)(i.k, { height: 8 })), (G[59] = H))
        : (H = G[59]),
      G[60] !== X
        ? ((q = X("common.skip")), (G[60] = X), (G[61] = q))
        : (q = G[61]),
      G[62] !== eu || G[63] !== q
        ? ((W = (0, t.jsx)(i.K, {
            isFullWidth: !0,
            size: 48,
            variant: "secondary",
            onClick: eu,
            "data-testid": "referral-onboarding-skip",
            children: q,
          })),
          (G[62] = eu),
          (G[63] = q),
          (G[64] = W))
        : (W = G[64]),
      G[65] !== T || G[66] !== F || G[67] !== P || G[68] !== B || G[69] !== W
        ? ((U = (0, t.jsxs)(i.s, {
            className: "w-full max-w-md",
            "data-testid": "referral-onboarding-dialog",
            children: [T, R, F, P, z, B, H, W],
          })),
          (G[65] = T),
          (G[66] = F),
          (G[67] = P),
          (G[68] = B),
          (G[69] = W),
          (G[70] = U))
        : (U = G[70]),
      G[71] !== $ || G[72] !== U || G[73] !== j
        ? ((V = (0, t.jsx)(i.v, { isOpen: $, onIsOpenChange: j, children: U })),
          (G[71] = $),
          (G[72] = U),
          (G[73] = j),
          (G[74] = V))
        : (V = G[74]),
      V
    );
  }
  var h = e.i(322315),
    b = e.i(254010),
    x = e.i(574472),
    g = e.i(298358),
    y = e.i(411657),
    v = e.i(592209);
  let w = "pump-referral-onboarding-seen";
  var _ = e.i(875429),
    j = e.i(619155),
    C = e.i(54567);
  let N = ["onboarding", "common", "web.profile"],
    S = [
      "onboarding.referral_code.title",
      "common.submit",
      "web.profile.referral_apply_invalid_code",
    ];
  function k() {
    return j.f.getState().setOnboardingOpen(!1);
  }
  function E(e) {
    return e.isIntroPlaying;
  }
  e.s(
    [
      "ReferralCodeOnboardingHost",
      0,
      function () {
        let e,
          a = (0, r.c)(4),
          { prompt: i, dismiss: n } = (function () {
            let e,
              t,
              a,
              i,
              n,
              o,
              c,
              d,
              m,
              f,
              p,
              A,
              I,
              T = (0, r.c)(33),
              R = (0, b.k)(h.D.WEB_REFERRAL_CODE_ONBOARDING),
              {
                address: L,
                decodedJwt: O,
                user: M,
                authReady: D,
                loginLoading: F,
              } = (0, x.F)(),
              { i18n: P } = (0, s.f)(),
              [z, K] = (0, l.useState)(!1),
              [B, H] = (0, l.useState)(!0);
            (T[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = () => (
                  K((0, _.P)()),
                  H(
                    (() => {
                      try {
                        return null !== localStorage.getItem(w);
                      } catch {
                        return !0;
                      }
                    })(),
                  ),
                  (0, _.a)(() => K((0, _.P)()))
                )),
                (t = []),
                (T[0] = e),
                (T[1] = t))
              : ((e = T[0]), (t = T[1])),
              (0, l.useEffect)(e, t));
            let q = !!L && null !== O && D && !F,
              W = R && q && z && !B,
              U = (0, j.f)(E),
              V = L ?? "";
            (T[2] !== W
              ? ((a = { enabled: W }), (T[2] = W), (T[3] = a))
              : (a = T[3]),
              T[4] !== V || T[5] !== a
                ? ((i = { userAddress: V, queryOptions: a }),
                  (T[4] = V),
                  (T[5] = a),
                  (T[6] = i))
                : (i = T[6]));
            let G = (0, g.f)(i),
              $ = W && G.data?.eligibleReferee === !0 && !G.data.referrer,
              Q = G.data?.referralWindowEndsAt;
            T[7] === Symbol.for("react.memo_cache_sentinel")
              ? ((n = { status: "idle" }), (T[7] = n))
              : (n = T[7]);
            let [Z, Y] = (0, l.useState)(n),
              X = void 0 !== M,
              J = M?.username;
            (T[8] !== L ||
            T[9] !== P ||
            T[10] !== $ ||
            T[11] !== U ||
            T[12] !== X ||
            T[13] !== J ||
            T[14] !== Z.status ||
            T[15] !== Q
              ? ((o = () => {
                  if (!$ || !X || !L || U || "idle" !== Z.status) return;
                  let e = !1,
                    t = (0, v.v)(P.language) ?? "en";
                  return (
                    (0, y.k)(P, t, N)
                      .then(() => {
                        if (e) return;
                        let r = S.filter((e) => !P.exists(e, { lng: t }));
                        r.length > 0
                          ? C.logger.warn(
                              "referral onboarding: strings missing, step stays closed",
                              { locale: t, missing: r },
                            )
                          : (function () {
                              let e = (0, u.t)(),
                                t =
                                  null !== e &&
                                  null != J &&
                                  e.code.toLowerCase() === J.toLowerCase();
                              t && (0, u.S)();
                              let r = j.f.getState();
                              if (!r.isIntroPlaying) {
                                r.setOnboardingOpen(!0);
                                try {
                                  localStorage.setItem(
                                    w,
                                    new Date().toISOString(),
                                  );
                                } catch {}
                                (H(!0),
                                  Y({
                                    status: "open",
                                    userAddress: L,
                                    initialCode: e && !t ? e.code : "",
                                    windowEndsAt: Q,
                                  }));
                              }
                            })();
                      })
                      .catch((r) => {
                        e ||
                          C.logger.warn(
                            "referral onboarding: catalog load failed, step stays closed",
                            { locale: t, error: r },
                          );
                      }),
                    () => {
                      e = !0;
                    }
                  );
                }),
                (c = [$, X, L, U, Z.status, P, J, Q]),
                (T[8] = L),
                (T[9] = P),
                (T[10] = $),
                (T[11] = U),
                (T[12] = X),
                (T[13] = J),
                (T[14] = Z.status),
                (T[15] = Q),
                (T[16] = o),
                (T[17] = c))
              : ((o = T[16]), (c = T[17])),
              (0, l.useEffect)(o, c));
            let ee = O?.address;
            (T[18] !== L ||
            T[19] !== Z.status ||
            T[20] !== Z.userAddress ||
            T[21] !== ee
              ? ((d = () => {
                  "open" !== Z.status ||
                    ((L !== Z.userAddress || ee !== Z.userAddress) &&
                      Y({ status: "idle" }));
                }),
                (T[18] = L),
                (T[19] = Z.status),
                (T[20] = Z.userAddress),
                (T[21] = ee),
                (T[22] = d))
              : (d = T[22]),
              T[23] !== L || T[24] !== Z || T[25] !== ee
                ? ((m = [Z, L, ee]),
                  (T[23] = L),
                  (T[24] = Z),
                  (T[25] = ee),
                  (T[26] = m))
                : (m = T[26]),
              (0, l.useEffect)(d, m));
            let et = "open" === Z.status;
            (T[27] !== et
              ? ((f = () => {
                  if (et) return k;
                }),
                (p = [et]),
                (T[27] = et),
                (T[28] = f),
                (T[29] = p))
              : ((f = T[28]), (p = T[29])),
              (0, l.useEffect)(f, p),
              T[30] === Symbol.for("react.memo_cache_sentinel")
                ? ((A = () => Y({ status: "idle" })), (T[30] = A))
                : (A = T[30]));
            let er = A;
            return (
              T[31] !== Z
                ? ((I = { prompt: Z, dismiss: er }), (T[31] = Z), (T[32] = I))
                : (I = T[32]),
              I
            );
          })();
        return "open" !== i.status
          ? null
          : (a[0] !== n || a[1] !== i.initialCode || a[2] !== i.userAddress
              ? ((e = (0, t.jsx)(p, {
                  isOpen: !0,
                  userAddress: i.userAddress,
                  initialCode: i.initialCode,
                  onClose: n,
                })),
                (a[0] = n),
                (a[1] = i.initialCode),
                (a[2] = i.userAddress),
                (a[3] = e))
              : (e = a[3]),
            e);
      },
    ],
    308425,
  );
};
