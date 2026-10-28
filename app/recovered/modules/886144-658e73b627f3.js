// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(745018),
    a = e.i(439587),
    n = e.i(365089),
    l = e.i(352386);
  e.i(12692);
  var s = e.i(117466),
    o = e.i(398902),
    c = e.i(20077),
    d = e.i(230579),
    u = e.i(73945),
    p = e.i(595673),
    h = e.i(187611);
  let f = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function y(e) {
    let d,
      p,
      y,
      b,
      v,
      k,
      x,
      _,
      E,
      K,
      A,
      j,
      z,
      U,
      C = (0, r.c)(105),
      { flow: N, onClose: I } = e,
      { t: F } = (0, o.f)(),
      [S, L] = (0, l.useState)(""),
      [P, T] = (0, l.useState)(""),
      [M, D] = (0, l.useState)(""),
      [H, q] = (0, l.useState)(""),
      B = (0, l.useId)(),
      R = (0, l.useId)(),
      V = (0, l.useId)(),
      O = (0, l.useId)();
    (C[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((d = []), (C[0] = d))
      : (d = C[0]),
      (0, l.useEffect)(m, d));
    let W = N.wallet ?? "";
    if (
      C[1] !== I ||
      C[2] !== P ||
      C[3] !== R ||
      C[4] !== S ||
      C[5] !== B ||
      C[6] !== O ||
      C[7] !== N ||
      C[8] !== V ||
      C[9] !== H ||
      C[10] !== M ||
      C[11] !== F ||
      C[12] !== W
    ) {
      let e,
        r,
        l,
        o,
        d,
        m,
        z,
        U,
        $,
        G,
        J = (0, h.T)((0, n.d)(W), "wallet-address"),
        X = (0, h.T)(
          N.mappedEvmAddress ? (0, n.d)(N.mappedEvmAddress) : "",
          "wallet-address",
        );
      C[24] !== S || C[25] !== N
        ? ((e = (e) => {
            (e.preventDefault(), f.test(S.trim()) && N.pickEmail(S.trim()));
          }),
          (C[24] = S),
          (C[25] = N),
          (C[26] = e))
        : (e = C[26]);
      let Z = e;
      C[27] !== P || C[28] !== N
        ? ((r = (e) => {
            (e.preventDefault(), 6 === P.length && N.submitEmailCode(P));
          }),
          (C[27] = P),
          (C[28] = N),
          (C[29] = r))
        : (r = C[29]);
      let Y = r;
      C[30] !== N || C[31] !== M
        ? ((l = (e) => {
            (e.preventDefault(), D(""), N.importKey(M));
          }),
          (C[30] = N),
          (C[31] = M),
          (C[32] = l))
        : (l = C[32]);
      let Q = l;
      C[33] !== N || C[34] !== H
        ? ((o = (e) => {
            (e.preventDefault(), q(""), N.importEvmKey(H));
          }),
          (C[33] = N),
          (C[34] = H),
          (C[35] = o))
        : (o = C[35]);
      let ee = o,
        et = N.error ? w(N.error, F, J, X) : null;
      ((v = "flex flex-col gap-5 p-5 text-left"),
        C[36] !== N.phase || C[37] !== F
          ? ((d = F(
              "done" === N.phase
                ? "account.privy_link.success_title"
                : "finalize_failed" === N.phase
                  ? "web.wallet_deprecation.link_finalize_failed_title"
                  : "already_linked" === N.phase
                    ? "web.wallet_deprecation.link_already_linked_title"
                    : "paste_evm_key" === N.phase
                      ? "web.wallet_deprecation.link_evm_key_title"
                      : "paste_key" === N.phase || "importing" === N.phase
                        ? "web.wallet_deprecation.link_key_title"
                        : "account.privy_link.title",
            )),
            (C[36] = N.phase),
            (C[37] = F),
            (C[38] = d))
          : (d = C[38]),
        C[39] !== d
          ? ((m = (0, t.jsx)("h2", {
              className: "text-text-primary text-lg font-semibold",
              children: d,
            })),
            (C[39] = d),
            (C[40] = m))
          : (m = C[40]));
      let er =
        "consent" === N.phase
          ? (0, t.jsx)("p", {
              className: "text-text-tertiary text-sm",
              children: F("web.wallet_deprecation.link_intro", { address: J }),
            })
          : null;
      (C[41] !== m || C[42] !== er
        ? ((z = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-col gap-1",
            children: [m, er],
          })),
          (C[41] = m),
          (C[42] = er),
          (C[43] = z))
        : (z = C[43]),
        C[44] !== F
          ? ((U = F("common.close")), (C[44] = F), (C[45] = U))
          : (U = C[45]),
        C[46] === Symbol.for("react.memo_cache_sentinel")
          ? (($ = (0, t.jsx)(i.x6, { size: 16 })), (C[46] = $))
          : ($ = C[46]),
        C[47] !== I || C[48] !== U
          ? ((G = (0, t.jsx)("button", {
              type: "button",
              onClick: I,
              "aria-label": U,
              className:
                "hover:bg-bg-secondary shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors",
              children: $,
            })),
            (C[47] = I),
            (C[48] = U),
            (C[49] = G))
          : (G = C[49]),
        C[50] !== z || C[51] !== G
          ? ((k = (0, t.jsxs)("div", {
              className: "flex items-start justify-between gap-3",
              children: [z, G],
            })),
            (C[50] = z),
            (C[51] = G),
            (C[52] = k))
          : (k = C[52]),
        (x = et
          ? (0, t.jsx)("p", {
              className:
                "rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200",
              role: "alert",
              "data-testid": "link-login-error",
              children: et,
            })
          : null),
        C[53] !== N.phase || C[54] !== N.start || C[55] !== F
          ? ((_ =
              "consent" === N.phase
                ? (0, t.jsxs)("div", {
                    className: "flex flex-col gap-4",
                    children: [
                      (0, t.jsx)("p", {
                        className: "text-text-secondary text-sm",
                        children: F("account.privy_link.consent_benefit"),
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-tertiary text-xs",
                        children: F("account.privy_link.consent_custody"),
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-tertiary text-xs",
                        children: F(
                          "web.wallet_deprecation.link_hardware_hint",
                        ),
                      }),
                      (0, t.jsx)(a.K, {
                        isFullWidth: !0,
                        size: 40,
                        onClick: N.start,
                        "data-testid": "link-login-start",
                        children: F("common.continue"),
                      }),
                    ],
                  })
                : null),
            (C[53] = N.phase),
            (C[54] = N.start),
            (C[55] = F),
            (C[56] = _))
          : (_ = C[56]),
        C[57] !== S || C[58] !== B || C[59] !== N || C[60] !== Z || C[61] !== F
          ? ((E =
              "pick_login" === N.phase ||
              ("authorizing" === N.phase && "email" !== N.method)
                ? (0, t.jsxs)("div", {
                    className: "flex flex-col gap-3",
                    children: [
                      (0, t.jsx)("span", {
                        className: "text-text-tertiary text-xs font-semibold",
                        children: F("account.privy_link.picker_title"),
                      }),
                      (0, t.jsxs)("div", {
                        className: "grid grid-cols-2 gap-2",
                        role: "group",
                        "aria-label": F("account.privy_link.picker_title"),
                        children: [
                          (0, t.jsxs)("button", {
                            type: "button",
                            onClick: () => void N.pickOAuth("google"),
                            disabled: "authorizing" === N.phase,
                            "data-testid": "link-login-google",
                            className:
                              "flex h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-border-tertiary bg-white px-3 text-sm font-medium text-zinc-900 shadow-sm transition-all duration-150 hover:-translate-y-px hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "flex size-[18px] shrink-0 items-center justify-center",
                                children:
                                  "authorizing" === N.phase &&
                                  "google" === N.method
                                    ? (0, t.jsx)(i.Wh, {
                                        size: 18,
                                        className: "animate-spin",
                                        "aria-hidden": !0,
                                      })
                                    : (0, t.jsx)(c.y, { size: 18 }),
                              }),
                              (0, t.jsx)("span", { children: "Google" }),
                            ],
                          }),
                          (0, t.jsxs)("button", {
                            type: "button",
                            onClick: () => void N.pickOAuth("apple"),
                            disabled: "authorizing" === N.phase,
                            "data-testid": "link-login-apple",
                            className:
                              "flex h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-border-tertiary bg-black px-3 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:-translate-y-px hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "flex size-[18px] shrink-0 items-center justify-center",
                                children:
                                  "authorizing" === N.phase &&
                                  "apple" === N.method
                                    ? (0, t.jsx)(i.Wh, {
                                        size: 18,
                                        className: "animate-spin",
                                        "aria-hidden": !0,
                                      })
                                    : (0, t.jsx)(i.Te, {
                                        size: 18,
                                        "aria-hidden": !0,
                                      }),
                              }),
                              (0, t.jsx)("span", { children: "Apple" }),
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsxs)("form", {
                        className: "flex flex-col gap-2",
                        onSubmit: Z,
                        children: [
                          (0, t.jsx)("label", {
                            htmlFor: B,
                            className:
                              "text-text-tertiary text-xs font-semibold",
                            children: F(
                              "web.wallet_deprecation.link_email_label",
                            ),
                          }),
                          (0, t.jsxs)("div", {
                            className: "flex gap-2",
                            children: [
                              (0, t.jsx)("input", {
                                id: B,
                                type: "email",
                                autoComplete: "email",
                                inputMode: "email",
                                value: S,
                                onChange: (e) => L(e.target.value),
                                placeholder: F("web.auth.email_placeholder"),
                                className:
                                  "border-border-secondary bg-bg-secondary text-text-primary h-10 min-w-0 flex-1 rounded-lg border px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                "data-testid": "link-login-email",
                              }),
                              (0, t.jsx)(a.K, {
                                type: "submit",
                                size: 40,
                                isDisabled:
                                  "authorizing" === N.phase ||
                                  !f.test(S.trim()),
                                "data-testid": "link-login-send-code",
                                children: F(
                                  "web.wallet_deprecation.link_send_code",
                                ),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                : null),
            (C[57] = S),
            (C[58] = B),
            (C[59] = N),
            (C[60] = Z),
            (C[61] = F),
            (C[62] = E))
          : (E = C[62]),
        C[63] !== P ||
        C[64] !== R ||
        C[65] !== N.emailAddress ||
        C[66] !== N.method ||
        C[67] !== N.phase ||
        C[68] !== Y ||
        C[69] !== F
          ? ((K =
              "email_code" === N.phase ||
              ("authorizing" === N.phase && "email" === N.method)
                ? (0, t.jsxs)("form", {
                    className: "flex flex-col gap-2",
                    onSubmit: Y,
                    children: [
                      (0, t.jsx)("label", {
                        htmlFor: R,
                        className: "text-text-tertiary text-xs font-semibold",
                        children: F("web.wallet_deprecation.link_code_label"),
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-tertiary text-xs",
                        children: (0, t.jsx)(s.f, {
                          t: F,
                          i18nKey: "web.auth.code_sent_to",
                          values: { email: N.emailAddress },
                          components: {
                            email: (0, t.jsx)("span", {
                              className: "text-text-primary font-medium",
                            }),
                          },
                        }),
                      }),
                      (0, t.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                          (0, t.jsx)("input", {
                            id: R,
                            inputMode: "numeric",
                            autoComplete: "one-time-code",
                            maxLength: 6,
                            value: P,
                            onChange: (e) =>
                              T(e.target.value.replace(/\D+/g, "")),
                            className:
                              "border-border-secondary bg-bg-secondary text-text-primary min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm tracking-[0.3em] outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            "data-testid": "link-login-code",
                          }),
                          (0, t.jsx)(a.K, {
                            type: "submit",
                            size: 40,
                            isDisabled:
                              "authorizing" === N.phase || 6 !== P.length,
                            isLoading: "authorizing" === N.phase,
                            "data-testid": "link-login-verify-code",
                            children: F(
                              "web.wallet_deprecation.link_verify_code",
                            ),
                          }),
                        ],
                      }),
                    ],
                  })
                : null),
            (C[63] = P),
            (C[64] = R),
            (C[65] = N.emailAddress),
            (C[66] = N.method),
            (C[67] = N.phase),
            (C[68] = Y),
            (C[69] = F),
            (C[70] = K))
          : (K = C[70]),
        (A =
          "paste_key" === N.phase
            ? (0, t.jsxs)("form", {
                className: "flex flex-col gap-3",
                onSubmit: Q,
                children: [
                  (0, t.jsx)("p", {
                    className: "text-text-secondary text-sm",
                    children:
                      N.evmKeyRequired && N.mappedEvmAddress
                        ? F("web.wallet_deprecation.link_key_evm_again_body", {
                            evmAddress: X,
                          })
                        : F("web.wallet_deprecation.link_key_body", {
                            address: J,
                          }),
                  }),
                  (0, t.jsx)("label", {
                    htmlFor: V,
                    className: "sr-only",
                    children: F("web.wallet_deprecation.link_key_placeholder"),
                  }),
                  (0, t.jsx)("textarea", {
                    id: V,
                    value: M,
                    onChange: (e) => D(e.target.value),
                    autoComplete: "off",
                    autoCapitalize: "off",
                    autoCorrect: "off",
                    spellCheck: !1,
                    rows: 3,
                    placeholder: F(
                      "web.wallet_deprecation.link_key_placeholder",
                    ),
                    className:
                      "border-border-secondary bg-bg-secondary text-text-primary w-full resize-none rounded-lg border px-3 py-2 font-mono text-sm outline-none [-webkit-text-security:disc] focus-visible:ring-2 focus-visible:ring-primary [@supports_not_(-webkit-text-security:disc)]:text-transparent [@supports_not_(-webkit-text-security:disc)]:caret-text-primary",
                    "data-testid": "link-login-key",
                  }),
                  (0, t.jsx)("p", {
                    className: "text-text-tertiary text-xs",
                    children: F("web.wallet_deprecation.link_key_safety"),
                  }),
                  (0, t.jsx)("p", {
                    className: "text-text-tertiary text-xs",
                    children: F("web.wallet_deprecation.link_hardware_hint"),
                  }),
                  (0, t.jsx)(a.K, {
                    type: "submit",
                    isFullWidth: !0,
                    size: 40,
                    isDisabled: "" === M.trim(),
                    "data-testid": "link-login-import",
                    children: F("web.wallet_deprecation.link_import_cta"),
                  }),
                ],
              })
            : null),
        C[71] !== N.phase || C[72] !== F
          ? ((j =
              "importing" === N.phase
                ? (0, t.jsxs)("div", {
                    className:
                      "flex flex-col items-center gap-3 py-6 text-center",
                    role: "status",
                    "data-testid": "link-login-importing",
                    children: [
                      (0, t.jsx)(i.Wh, {
                        size: 28,
                        className: "text-primary animate-spin",
                        "aria-hidden": !0,
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-primary text-sm font-medium",
                        children: F("account.privy_link.progress_importing"),
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-tertiary text-xs",
                        children: F(
                          "account.privy_link.progress_importing_hint",
                        ),
                      }),
                    ],
                  })
                : null),
            (C[71] = N.phase),
            (C[72] = F),
            (C[73] = j))
          : (j = C[73]),
        C[74] !== I ||
        C[75] !== N.identifier ||
        C[76] !== N.method ||
        C[77] !== N.phase ||
        C[78] !== F
          ? ((p =
              "done" === N.phase
                ? (0, t.jsxs)("div", {
                    className:
                      "flex flex-col items-center gap-3 py-2 text-center",
                    "data-testid": "link-login-done",
                    children: [
                      (0, t.jsx)(i.y$, {
                        size: 32,
                        className: "text-primary",
                        "aria-hidden": !0,
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-secondary text-sm",
                        children: F(
                          "web.wallet_deprecation.link_success_body",
                          {
                            identifier: (0, h.T)(
                              N.identifier ?? g(N.method),
                              "user-name",
                            ),
                          },
                        ),
                      }),
                      (0, t.jsx)(a.K, {
                        isFullWidth: !0,
                        size: 40,
                        onClick: I,
                        "data-testid": "link-login-done-close",
                        children: F("common.done"),
                      }),
                    ],
                  })
                : null),
            (C[74] = I),
            (C[75] = N.identifier),
            (C[76] = N.method),
            (C[77] = N.phase),
            (C[78] = F),
            (C[79] = p))
          : (p = C[79]),
        C[80] !== I ||
        C[81] !== N.alreadyLinkedProvider ||
        C[82] !== N.phase ||
        C[83] !== F
          ? ((y =
              "already_linked" === N.phase
                ? (0, t.jsxs)("div", {
                    className:
                      "flex flex-col items-center gap-3 py-2 text-center",
                    "data-testid": "link-login-already-linked",
                    children: [
                      (0, t.jsx)(i.ck, {
                        size: 32,
                        className: "text-yellow-400",
                        "aria-hidden": !0,
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-secondary text-sm",
                        children:
                          N.alreadyLinkedProvider &&
                          "privy" !== N.alreadyLinkedProvider
                            ? F("web.wallet_deprecation.privy_owned", {
                                provider: (0, h.T)(
                                  (0, u.c)(N.alreadyLinkedProvider),
                                  "brand-name",
                                ),
                              })
                            : F("web.wallet_deprecation.privy_owned_generic"),
                      }),
                      (0, t.jsx)(a.K, {
                        isFullWidth: !0,
                        size: 40,
                        onClick: I,
                        "data-testid": "link-login-already-linked-close",
                        children: F("common.done"),
                      }),
                    ],
                  })
                : null),
            (C[80] = I),
            (C[81] = N.alreadyLinkedProvider),
            (C[82] = N.phase),
            (C[83] = F),
            (C[84] = y))
          : (y = C[84]),
        (b =
          "paste_evm_key" === N.phase
            ? (0, t.jsxs)("form", {
                className: "flex flex-col gap-3",
                onSubmit: ee,
                children: [
                  (0, t.jsx)("p", {
                    className: "text-text-secondary text-sm",
                    children: F("web.wallet_deprecation.link_evm_key_body", {
                      evmAddress: X,
                    }),
                  }),
                  (0, t.jsx)("label", {
                    htmlFor: O,
                    className: "sr-only",
                    children: F(
                      "web.wallet_deprecation.link_evm_key_placeholder",
                    ),
                  }),
                  (0, t.jsx)("textarea", {
                    id: O,
                    value: H,
                    onChange: (e) => q(e.target.value),
                    autoComplete: "off",
                    autoCapitalize: "off",
                    autoCorrect: "off",
                    spellCheck: !1,
                    rows: 3,
                    placeholder: F(
                      "web.wallet_deprecation.link_evm_key_placeholder",
                    ),
                    className:
                      "border-border-secondary bg-bg-secondary text-text-primary w-full resize-none rounded-lg border px-3 py-2 font-mono text-sm outline-none [-webkit-text-security:disc] focus-visible:ring-2 focus-visible:ring-primary [@supports_not_(-webkit-text-security:disc)]:text-transparent [@supports_not_(-webkit-text-security:disc)]:caret-text-primary",
                    "data-testid": "link-login-evm-key",
                  }),
                  (0, t.jsx)("p", {
                    className: "text-text-tertiary text-xs",
                    children: F("web.wallet_deprecation.link_key_safety"),
                  }),
                  (0, t.jsx)(a.K, {
                    type: "submit",
                    isFullWidth: !0,
                    size: 40,
                    isDisabled: "" === H.trim(),
                    "data-testid": "link-login-import-evm",
                    children: F("web.wallet_deprecation.link_import_cta"),
                  }),
                ],
              })
            : null),
        (C[1] = I),
        (C[2] = P),
        (C[3] = R),
        (C[4] = S),
        (C[5] = B),
        (C[6] = O),
        (C[7] = N),
        (C[8] = V),
        (C[9] = H),
        (C[10] = M),
        (C[11] = F),
        (C[12] = W),
        (C[13] = p),
        (C[14] = y),
        (C[15] = b),
        (C[16] = v),
        (C[17] = k),
        (C[18] = x),
        (C[19] = _),
        (C[20] = E),
        (C[21] = K),
        (C[22] = A),
        (C[23] = j));
    } else
      ((p = C[13]),
        (y = C[14]),
        (b = C[15]),
        (v = C[16]),
        (k = C[17]),
        (x = C[18]),
        (_ = C[19]),
        (E = C[20]),
        (K = C[21]),
        (A = C[22]),
        (j = C[23]));
    return (
      C[85] !== I ||
      C[86] !== N.identifier ||
      C[87] !== N.method ||
      C[88] !== N.phase ||
      C[89] !== N.retryFinalize ||
      C[90] !== F
        ? ((z =
            "finalize_failed" === N.phase
              ? (0, t.jsxs)("div", {
                  className:
                    "flex flex-col items-center gap-3 py-2 text-center",
                  "data-testid": "link-login-finalize-failed",
                  children: [
                    (0, t.jsx)(i.ck, {
                      size: 32,
                      className: "text-yellow-400",
                      "aria-hidden": !0,
                    }),
                    (0, t.jsx)("p", {
                      className: "text-text-secondary text-sm",
                      children: F(
                        "web.wallet_deprecation.link_finalize_failed_body",
                        {
                          identifier: (0, h.T)(
                            N.identifier ?? g(N.method),
                            "user-name",
                          ),
                        },
                      ),
                    }),
                    (0, t.jsx)(a.K, {
                      isFullWidth: !0,
                      size: 40,
                      onClick: N.retryFinalize,
                      "data-testid": "link-login-finalize-retry",
                      children: F("web.common.try_again"),
                    }),
                    (0, t.jsx)(a.K, {
                      isFullWidth: !0,
                      size: 40,
                      variant: "secondary",
                      onClick: I,
                      "data-testid": "link-login-finalize-close",
                      children: F("common.done"),
                    }),
                  ],
                })
              : null),
          (C[85] = I),
          (C[86] = N.identifier),
          (C[87] = N.method),
          (C[88] = N.phase),
          (C[89] = N.retryFinalize),
          (C[90] = F),
          (C[91] = z))
        : (z = C[91]),
      C[92] !== p ||
      C[93] !== y ||
      C[94] !== b ||
      C[95] !== z ||
      C[96] !== v ||
      C[97] !== k ||
      C[98] !== x ||
      C[99] !== _ ||
      C[100] !== E ||
      C[101] !== K ||
      C[102] !== A ||
      C[103] !== j
        ? ((U = (0, t.jsxs)("div", {
            className: v,
            children: [k, x, _, E, K, A, j, p, y, b, z],
          })),
          (C[92] = p),
          (C[93] = y),
          (C[94] = b),
          (C[95] = z),
          (C[96] = v),
          (C[97] = k),
          (C[98] = x),
          (C[99] = _),
          (C[100] = E),
          (C[101] = K),
          (C[102] = A),
          (C[103] = j),
          (C[104] = U))
        : (U = C[104]),
      U
    );
  }
  function m() {
    (0, p.yt)({ surface: "link_dialog", interactionType: "seen" });
  }
  let g = (e) =>
      "google" === e ? "Google" : "apple" === e ? "Apple" : "email",
    w = (e, t, r, i) => {
      switch (e) {
        case "wallet_exists":
          return t("web.wallet_deprecation.link_wallet_exists");
        case "not_session_wallet":
        case "pubkey_mismatch":
          return t("web.wallet_deprecation.link_key_mismatch", { address: r });
        case "invalid_format":
        case "wrong_length":
          return t("web.wallet_deprecation.link_key_invalid");
        case "evm_key_invalid":
          return t("web.wallet_deprecation.link_evm_key_invalid");
        case "evm_key_mismatch":
          return t("web.wallet_deprecation.link_evm_key_mismatch", {
            evmAddress: i,
          });
        case "mfa_enrolled":
          return t("web.account.two_factor.import_blocked");
        case "sso":
        case "evm_check":
        case "import":
        case "finalize":
          return t("account.privy_link.error_generic");
      }
    };
  e.s([
    "LinkLoginDialog",
    0,
    function (e) {
      let i,
        n,
        l,
        s,
        o,
        c = (0, r.c)(14),
        { open: u, onOpenChange: p } = e;
      c[0] !== u ? ((i = { open: u }), (c[0] = u), (c[1] = i)) : (i = c[1]);
      let h = (0, d.f)(i);
      return (
        c[2] !== p ? ((n = (e) => p(e)), (c[2] = p), (c[3] = n)) : (n = c[3]),
        c[4] !== h || c[5] !== p || c[6] !== u
          ? ((l = u ? (0, t.jsx)(y, { flow: h, onClose: () => p(!1) }) : null),
            (c[4] = h),
            (c[5] = p),
            (c[6] = u),
            (c[7] = l))
          : (l = c[7]),
        c[8] !== l
          ? ((s = (0, t.jsx)(a.s, {
              className: "w-full max-w-[440px] p-0",
              "data-testid": "link-login-dialog",
              children: l,
            })),
            (c[8] = l),
            (c[9] = s))
          : (s = c[9]),
        c[10] !== u || c[11] !== n || c[12] !== s
          ? ((o = (0, t.jsx)(a.v, {
              isOpen: u,
              onIsOpenChange: n,
              children: s,
            })),
            (c[10] = u),
            (c[11] = n),
            (c[12] = s),
            (c[13] = o))
          : (o = c[13]),
        o
      );
    },
  ]);
};
