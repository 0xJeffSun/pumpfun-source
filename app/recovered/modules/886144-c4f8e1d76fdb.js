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
    f = e.i(20077),
    c = e.i(230579),
    d = e.i(73945),
    u = e.i(595673),
    p = e.i(187611);
  let h = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function y(e) {
    let c,
      u,
      y,
      w,
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
      I = (0, r.c)(105),
      { flow: C, onClose: N } = e,
      { t: S } = (0, o.f)(),
      [F, P] = (0, l.useState)(""),
      [L, B] = (0, l.useState)(""),
      [T, M] = (0, l.useState)(""),
      [D, H] = (0, l.useState)(""),
      q = (0, l.useId)(),
      R = (0, l.useId)(),
      V = (0, l.useId)(),
      O = (0, l.useId)();
    (I[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((c = []), (I[0] = c))
      : (c = I[0]),
      (0, l.useEffect)(m, c));
    let W = C.wallet ?? "";
    if (
      I[1] !== N ||
      I[2] !== L ||
      I[3] !== R ||
      I[4] !== F ||
      I[5] !== q ||
      I[6] !== O ||
      I[7] !== C ||
      I[8] !== V ||
      I[9] !== D ||
      I[10] !== T ||
      I[11] !== S ||
      I[12] !== W
    ) {
      let e,
        r,
        l,
        o,
        c,
        m,
        z,
        U,
        $,
        G,
        X = (0, p.T)((0, n.d)(W), "wallet-address"),
        J = (0, p.T)(
          C.mappedEvmAddress ? (0, n.d)(C.mappedEvmAddress) : "",
          "wallet-address",
        );
      I[24] !== F || I[25] !== C
        ? ((e = (e) => {
            (e.preventDefault(), h.test(F.trim()) && C.pickEmail(F.trim()));
          }),
          (I[24] = F),
          (I[25] = C),
          (I[26] = e))
        : (e = I[26]);
      let Z = e;
      I[27] !== L || I[28] !== C
        ? ((r = (e) => {
            (e.preventDefault(), 6 === L.length && C.submitEmailCode(L));
          }),
          (I[27] = L),
          (I[28] = C),
          (I[29] = r))
        : (r = I[29]);
      let Y = r;
      I[30] !== C || I[31] !== T
        ? ((l = (e) => {
            (e.preventDefault(), M(""), C.importKey(T));
          }),
          (I[30] = C),
          (I[31] = T),
          (I[32] = l))
        : (l = I[32]);
      let Q = l;
      I[33] !== C || I[34] !== D
        ? ((o = (e) => {
            (e.preventDefault(), H(""), C.importEvmKey(D));
          }),
          (I[33] = C),
          (I[34] = D),
          (I[35] = o))
        : (o = I[35]);
      let ee = o,
        et = C.error ? b(C.error, S, X, J) : null;
      ((v = "flex flex-col gap-5 p-5 text-left"),
        I[36] !== C.phase || I[37] !== S
          ? ((c = S(
              "done" === C.phase
                ? "account.privy_link.success_title"
                : "finalize_failed" === C.phase
                  ? "web.wallet_deprecation.link_finalize_failed_title"
                  : "already_linked" === C.phase
                    ? "web.wallet_deprecation.link_already_linked_title"
                    : "paste_evm_key" === C.phase
                      ? "web.wallet_deprecation.link_evm_key_title"
                      : "paste_key" === C.phase || "importing" === C.phase
                        ? "web.wallet_deprecation.link_key_title"
                        : "account.privy_link.title",
            )),
            (I[36] = C.phase),
            (I[37] = S),
            (I[38] = c))
          : (c = I[38]),
        I[39] !== c
          ? ((m = (0, t.jsx)("h2", {
              className: "text-text-primary text-lg font-semibold",
              children: c,
            })),
            (I[39] = c),
            (I[40] = m))
          : (m = I[40]));
      let er =
        "consent" === C.phase
          ? (0, t.jsx)("p", {
              className: "text-text-tertiary text-sm",
              children: S("web.wallet_deprecation.link_intro", { address: X }),
            })
          : null;
      (I[41] !== m || I[42] !== er
        ? ((z = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-col gap-1",
            children: [m, er],
          })),
          (I[41] = m),
          (I[42] = er),
          (I[43] = z))
        : (z = I[43]),
        I[44] !== S
          ? ((U = S("common.close")), (I[44] = S), (I[45] = U))
          : (U = I[45]),
        I[46] === Symbol.for("react.memo_cache_sentinel")
          ? (($ = (0, t.jsx)(i.x6, { size: 16 })), (I[46] = $))
          : ($ = I[46]),
        I[47] !== N || I[48] !== U
          ? ((G = (0, t.jsx)("button", {
              type: "button",
              onClick: N,
              "aria-label": U,
              className:
                "hover:bg-bg-secondary shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors",
              children: $,
            })),
            (I[47] = N),
            (I[48] = U),
            (I[49] = G))
          : (G = I[49]),
        I[50] !== z || I[51] !== G
          ? ((k = (0, t.jsxs)("div", {
              className: "flex items-start justify-between gap-3",
              children: [z, G],
            })),
            (I[50] = z),
            (I[51] = G),
            (I[52] = k))
          : (k = I[52]),
        (x = et
          ? (0, t.jsx)("p", {
              className:
                "rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200",
              role: "alert",
              "data-testid": "link-login-error",
              children: et,
            })
          : null),
        I[53] !== C.phase || I[54] !== C.start || I[55] !== S
          ? ((_ =
              "consent" === C.phase
                ? (0, t.jsxs)("div", {
                    className: "flex flex-col gap-4",
                    children: [
                      (0, t.jsx)("p", {
                        className: "text-text-secondary text-sm",
                        children: S("account.privy_link.consent_benefit"),
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-tertiary text-xs",
                        children: S("account.privy_link.consent_custody"),
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-tertiary text-xs",
                        children: S(
                          "web.wallet_deprecation.link_hardware_hint",
                        ),
                      }),
                      (0, t.jsx)(a.K, {
                        isFullWidth: !0,
                        size: 40,
                        onClick: C.start,
                        "data-testid": "link-login-start",
                        children: S("common.continue"),
                      }),
                    ],
                  })
                : null),
            (I[53] = C.phase),
            (I[54] = C.start),
            (I[55] = S),
            (I[56] = _))
          : (_ = I[56]),
        I[57] !== F || I[58] !== q || I[59] !== C || I[60] !== Z || I[61] !== S
          ? ((E =
              "pick_login" === C.phase ||
              ("authorizing" === C.phase && "email" !== C.method)
                ? (0, t.jsxs)("div", {
                    className: "flex flex-col gap-3",
                    children: [
                      (0, t.jsx)("span", {
                        className: "text-text-tertiary text-xs font-semibold",
                        children: S("account.privy_link.picker_title"),
                      }),
                      (0, t.jsxs)("div", {
                        className: "grid grid-cols-2 gap-2",
                        role: "group",
                        "aria-label": S("account.privy_link.picker_title"),
                        children: [
                          (0, t.jsxs)("button", {
                            type: "button",
                            onClick: () => void C.pickOAuth("google"),
                            disabled: "authorizing" === C.phase,
                            "data-testid": "link-login-google",
                            className:
                              "flex h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-border-tertiary bg-white px-3 text-sm font-medium text-zinc-900 shadow-sm transition-all duration-150 hover:-translate-y-px hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "flex size-[18px] shrink-0 items-center justify-center",
                                children:
                                  "authorizing" === C.phase &&
                                  "google" === C.method
                                    ? (0, t.jsx)(i.Wh, {
                                        size: 18,
                                        className: "animate-spin",
                                        "aria-hidden": !0,
                                      })
                                    : (0, t.jsx)(f.y, { size: 18 }),
                              }),
                              (0, t.jsx)("span", { children: "Google" }),
                            ],
                          }),
                          (0, t.jsxs)("button", {
                            type: "button",
                            onClick: () => void C.pickOAuth("apple"),
                            disabled: "authorizing" === C.phase,
                            "data-testid": "link-login-apple",
                            className:
                              "flex h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-border-tertiary bg-black px-3 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:-translate-y-px hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
                            children: [
                              (0, t.jsx)("span", {
                                className:
                                  "flex size-[18px] shrink-0 items-center justify-center",
                                children:
                                  "authorizing" === C.phase &&
                                  "apple" === C.method
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
                            htmlFor: q,
                            className:
                              "text-text-tertiary text-xs font-semibold",
                            children: S(
                              "web.wallet_deprecation.link_email_label",
                            ),
                          }),
                          (0, t.jsxs)("div", {
                            className: "flex gap-2",
                            children: [
                              (0, t.jsx)("input", {
                                id: q,
                                type: "email",
                                autoComplete: "email",
                                inputMode: "email",
                                value: F,
                                onChange: (e) => P(e.target.value),
                                placeholder: S("web.auth.email_placeholder"),
                                className:
                                  "border-border-secondary bg-bg-secondary text-text-primary h-10 min-w-0 flex-1 rounded-lg border px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                "data-testid": "link-login-email",
                              }),
                              (0, t.jsx)(a.K, {
                                type: "submit",
                                size: 40,
                                isDisabled:
                                  "authorizing" === C.phase ||
                                  !h.test(F.trim()),
                                "data-testid": "link-login-send-code",
                                children: S(
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
            (I[57] = F),
            (I[58] = q),
            (I[59] = C),
            (I[60] = Z),
            (I[61] = S),
            (I[62] = E))
          : (E = I[62]),
        I[63] !== L ||
        I[64] !== R ||
        I[65] !== C.emailAddress ||
        I[66] !== C.method ||
        I[67] !== C.phase ||
        I[68] !== Y ||
        I[69] !== S
          ? ((K =
              "email_code" === C.phase ||
              ("authorizing" === C.phase && "email" === C.method)
                ? (0, t.jsxs)("form", {
                    className: "flex flex-col gap-2",
                    onSubmit: Y,
                    children: [
                      (0, t.jsx)("label", {
                        htmlFor: R,
                        className: "text-text-tertiary text-xs font-semibold",
                        children: S("web.wallet_deprecation.link_code_label"),
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-tertiary text-xs",
                        children: (0, t.jsx)(s.f, {
                          t: S,
                          i18nKey: "web.auth.code_sent_to",
                          values: { email: C.emailAddress },
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
                            value: L,
                            onChange: (e) =>
                              B(e.target.value.replace(/\D+/g, "")),
                            className:
                              "border-border-secondary bg-bg-secondary text-text-primary min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm tracking-[0.3em] outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            "data-testid": "link-login-code",
                          }),
                          (0, t.jsx)(a.K, {
                            type: "submit",
                            size: 40,
                            isDisabled:
                              "authorizing" === C.phase || 6 !== L.length,
                            isLoading: "authorizing" === C.phase,
                            "data-testid": "link-login-verify-code",
                            children: S(
                              "web.wallet_deprecation.link_verify_code",
                            ),
                          }),
                        ],
                      }),
                    ],
                  })
                : null),
            (I[63] = L),
            (I[64] = R),
            (I[65] = C.emailAddress),
            (I[66] = C.method),
            (I[67] = C.phase),
            (I[68] = Y),
            (I[69] = S),
            (I[70] = K))
          : (K = I[70]),
        (A =
          "paste_key" === C.phase
            ? (0, t.jsxs)("form", {
                className: "flex flex-col gap-3",
                onSubmit: Q,
                children: [
                  (0, t.jsx)("p", {
                    className: "text-text-secondary text-sm",
                    children:
                      C.evmKeyRequired && C.mappedEvmAddress
                        ? S("web.wallet_deprecation.link_key_evm_again_body", {
                            evmAddress: J,
                          })
                        : S("web.wallet_deprecation.link_key_body", {
                            address: X,
                          }),
                  }),
                  (0, t.jsx)("label", {
                    htmlFor: V,
                    className: "sr-only",
                    children: S("web.wallet_deprecation.link_key_placeholder"),
                  }),
                  (0, t.jsx)("textarea", {
                    id: V,
                    value: T,
                    onChange: (e) => M(e.target.value),
                    autoComplete: "off",
                    autoCapitalize: "off",
                    autoCorrect: "off",
                    spellCheck: !1,
                    rows: 3,
                    placeholder: S(
                      "web.wallet_deprecation.link_key_placeholder",
                    ),
                    className:
                      "border-border-secondary bg-bg-secondary text-text-primary w-full resize-none rounded-lg border px-3 py-2 font-mono text-sm outline-none [-webkit-text-security:disc] focus-visible:ring-2 focus-visible:ring-primary [@supports_not_(-webkit-text-security:disc)]:text-transparent [@supports_not_(-webkit-text-security:disc)]:caret-text-primary",
                    "data-testid": "link-login-key",
                  }),
                  (0, t.jsx)("p", {
                    className: "text-text-tertiary text-xs",
                    children: S("web.wallet_deprecation.link_key_safety"),
                  }),
                  (0, t.jsx)("p", {
                    className: "text-text-tertiary text-xs",
                    children: S("web.wallet_deprecation.link_hardware_hint"),
                  }),
                  (0, t.jsx)(a.K, {
                    type: "submit",
                    isFullWidth: !0,
                    size: 40,
                    isDisabled: "" === T.trim(),
                    "data-testid": "link-login-import",
                    children: S("web.wallet_deprecation.link_import_cta"),
                  }),
                ],
              })
            : null),
        I[71] !== C.phase || I[72] !== S
          ? ((j =
              "importing" === C.phase
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
                        children: S("account.privy_link.progress_importing"),
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-tertiary text-xs",
                        children: S(
                          "account.privy_link.progress_importing_hint",
                        ),
                      }),
                    ],
                  })
                : null),
            (I[71] = C.phase),
            (I[72] = S),
            (I[73] = j))
          : (j = I[73]),
        I[74] !== N ||
        I[75] !== C.identifier ||
        I[76] !== C.method ||
        I[77] !== C.phase ||
        I[78] !== S
          ? ((u =
              "done" === C.phase
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
                        children: S(
                          "web.wallet_deprecation.link_success_body",
                          {
                            identifier: (0, p.T)(
                              C.identifier ?? g(C.method),
                              "user-name",
                            ),
                          },
                        ),
                      }),
                      (0, t.jsx)(a.K, {
                        isFullWidth: !0,
                        size: 40,
                        onClick: N,
                        "data-testid": "link-login-done-close",
                        children: S("common.done"),
                      }),
                    ],
                  })
                : null),
            (I[74] = N),
            (I[75] = C.identifier),
            (I[76] = C.method),
            (I[77] = C.phase),
            (I[78] = S),
            (I[79] = u))
          : (u = I[79]),
        I[80] !== N ||
        I[81] !== C.alreadyLinkedProvider ||
        I[82] !== C.phase ||
        I[83] !== S
          ? ((y =
              "already_linked" === C.phase
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
                          C.alreadyLinkedProvider &&
                          "privy" !== C.alreadyLinkedProvider
                            ? S("web.wallet_deprecation.privy_owned", {
                                provider: (0, p.T)(
                                  (0, d.c)(C.alreadyLinkedProvider),
                                  "brand-name",
                                ),
                              })
                            : S("web.wallet_deprecation.privy_owned_generic"),
                      }),
                      (0, t.jsx)(a.K, {
                        isFullWidth: !0,
                        size: 40,
                        onClick: N,
                        "data-testid": "link-login-already-linked-close",
                        children: S("common.done"),
                      }),
                    ],
                  })
                : null),
            (I[80] = N),
            (I[81] = C.alreadyLinkedProvider),
            (I[82] = C.phase),
            (I[83] = S),
            (I[84] = y))
          : (y = I[84]),
        (w =
          "paste_evm_key" === C.phase
            ? (0, t.jsxs)("form", {
                className: "flex flex-col gap-3",
                onSubmit: ee,
                children: [
                  (0, t.jsx)("p", {
                    className: "text-text-secondary text-sm",
                    children: S("web.wallet_deprecation.link_evm_key_body", {
                      evmAddress: J,
                    }),
                  }),
                  (0, t.jsx)("label", {
                    htmlFor: O,
                    className: "sr-only",
                    children: S(
                      "web.wallet_deprecation.link_evm_key_placeholder",
                    ),
                  }),
                  (0, t.jsx)("textarea", {
                    id: O,
                    value: D,
                    onChange: (e) => H(e.target.value),
                    autoComplete: "off",
                    autoCapitalize: "off",
                    autoCorrect: "off",
                    spellCheck: !1,
                    rows: 3,
                    placeholder: S(
                      "web.wallet_deprecation.link_evm_key_placeholder",
                    ),
                    className:
                      "border-border-secondary bg-bg-secondary text-text-primary w-full resize-none rounded-lg border px-3 py-2 font-mono text-sm outline-none [-webkit-text-security:disc] focus-visible:ring-2 focus-visible:ring-primary [@supports_not_(-webkit-text-security:disc)]:text-transparent [@supports_not_(-webkit-text-security:disc)]:caret-text-primary",
                    "data-testid": "link-login-evm-key",
                  }),
                  (0, t.jsx)("p", {
                    className: "text-text-tertiary text-xs",
                    children: S("web.wallet_deprecation.link_key_safety"),
                  }),
                  (0, t.jsx)(a.K, {
                    type: "submit",
                    isFullWidth: !0,
                    size: 40,
                    isDisabled: "" === D.trim(),
                    "data-testid": "link-login-import-evm",
                    children: S("web.wallet_deprecation.link_import_cta"),
                  }),
                ],
              })
            : null),
        (I[1] = N),
        (I[2] = L),
        (I[3] = R),
        (I[4] = F),
        (I[5] = q),
        (I[6] = O),
        (I[7] = C),
        (I[8] = V),
        (I[9] = D),
        (I[10] = T),
        (I[11] = S),
        (I[12] = W),
        (I[13] = u),
        (I[14] = y),
        (I[15] = w),
        (I[16] = v),
        (I[17] = k),
        (I[18] = x),
        (I[19] = _),
        (I[20] = E),
        (I[21] = K),
        (I[22] = A),
        (I[23] = j));
    } else
      ((u = I[13]),
        (y = I[14]),
        (w = I[15]),
        (v = I[16]),
        (k = I[17]),
        (x = I[18]),
        (_ = I[19]),
        (E = I[20]),
        (K = I[21]),
        (A = I[22]),
        (j = I[23]));
    return (
      I[85] !== N ||
      I[86] !== C.identifier ||
      I[87] !== C.method ||
      I[88] !== C.phase ||
      I[89] !== C.retryFinalize ||
      I[90] !== S
        ? ((z =
            "finalize_failed" === C.phase
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
                      children: S(
                        "web.wallet_deprecation.link_finalize_failed_body",
                        {
                          identifier: (0, p.T)(
                            C.identifier ?? g(C.method),
                            "user-name",
                          ),
                        },
                      ),
                    }),
                    (0, t.jsx)(a.K, {
                      isFullWidth: !0,
                      size: 40,
                      onClick: C.retryFinalize,
                      "data-testid": "link-login-finalize-retry",
                      children: S("web.common.try_again"),
                    }),
                    (0, t.jsx)(a.K, {
                      isFullWidth: !0,
                      size: 40,
                      variant: "secondary",
                      onClick: N,
                      "data-testid": "link-login-finalize-close",
                      children: S("common.done"),
                    }),
                  ],
                })
              : null),
          (I[85] = N),
          (I[86] = C.identifier),
          (I[87] = C.method),
          (I[88] = C.phase),
          (I[89] = C.retryFinalize),
          (I[90] = S),
          (I[91] = z))
        : (z = I[91]),
      I[92] !== u ||
      I[93] !== y ||
      I[94] !== w ||
      I[95] !== z ||
      I[96] !== v ||
      I[97] !== k ||
      I[98] !== x ||
      I[99] !== _ ||
      I[100] !== E ||
      I[101] !== K ||
      I[102] !== A ||
      I[103] !== j
        ? ((U = (0, t.jsxs)("div", {
            className: v,
            children: [k, x, _, E, K, A, j, u, y, w, z],
          })),
          (I[92] = u),
          (I[93] = y),
          (I[94] = w),
          (I[95] = z),
          (I[96] = v),
          (I[97] = k),
          (I[98] = x),
          (I[99] = _),
          (I[100] = E),
          (I[101] = K),
          (I[102] = A),
          (I[103] = j),
          (I[104] = U))
        : (U = I[104]),
      U
    );
  }
  function m() {
    (0, u.yt)({ surface: "link_dialog", interactionType: "seen" });
  }
  let g = (e) =>
      "google" === e ? "Google" : "apple" === e ? "Apple" : "email",
    b = (e, t, r, i) => {
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
        f = (0, r.c)(14),
        { open: d, onOpenChange: u } = e;
      f[0] !== d ? ((i = { open: d }), (f[0] = d), (f[1] = i)) : (i = f[1]);
      let p = (0, c.f)(i);
      return (
        f[2] !== u ? ((n = (e) => u(e)), (f[2] = u), (f[3] = n)) : (n = f[3]),
        f[4] !== p || f[5] !== u || f[6] !== d
          ? ((l = d ? (0, t.jsx)(y, { flow: p, onClose: () => u(!1) }) : null),
            (f[4] = p),
            (f[5] = u),
            (f[6] = d),
            (f[7] = l))
          : (l = f[7]),
        f[8] !== l
          ? ((s = (0, t.jsx)(a.s, {
              className: "w-full max-w-[440px] p-0",
              "data-testid": "link-login-dialog",
              children: l,
            })),
            (f[8] = l),
            (f[9] = s))
          : (s = f[9]),
        f[10] !== d || f[11] !== n || f[12] !== s
          ? ((o = (0, t.jsx)(a.v, {
              isOpen: d,
              onIsOpenChange: n,
              children: s,
            })),
            (f[10] = d),
            (f[11] = n),
            (f[12] = s),
            (f[13] = o))
          : (o = f[13]),
        o
      );
    },
  ]);
};
