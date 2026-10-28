// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    o = e.i(352386),
    t = e.i(42799),
    i = e.i(852714),
    a = e.i(636447),
    n = e.i(933185),
    l = e.i(768820),
    s = e.i(689391),
    c = e.i(164923),
    d = e.i(586539),
    u = e.i(335341),
    p = e.i(572280),
    v = e.i(447362);
  let h = (0, e.i(78048).f)("user-check", [
    ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ]);
  var g = e.i(653327),
    f = e.i(176862),
    y = e.i(124528);
  (e.i(252494), e.i(785373));
  let m = ({ data: e, onClose: o }) =>
      (0, r.jsx)(u.S, {
        showClose: !0,
        onClose: o,
        title: "Initiate bank transfer",
        subtitle:
          "Use the details below to complete a bank transfer from your bank.",
        primaryCta: { label: "Done", onClick: o },
        watermark: !1,
        footerText:
          "Exchange rates and fees are set when you authorize and determine the amount you receive. You'll see the applicable rates and fees for your transaction separately",
        children: (0, r.jsx)(b, {
          children: (d.D[e.deposit_instructions.asset] || []).map(
            ([o, t], i) => {
              let a = e.deposit_instructions[o];
              if (!a || Array.isArray(a)) return null;
              let n = "asset" === o ? a.toUpperCase() : a,
                s = n.length > 100 ? `${n.slice(0, 9)}...${n.slice(-9)}` : n;
              return (0, r.jsxs)(
                x,
                {
                  children: [
                    (0, r.jsx)(k, { children: t }),
                    (0, r.jsx)(c.a, {
                      value: n,
                      includeChildren: l.isMobile,
                      children: (0, r.jsx)(w, { children: s }),
                    }),
                  ],
                },
                i,
              );
            },
          ),
        }),
      }),
    b = s.z.ol`
  border-color: var(--privy-color-border-default);
  border-width: 1px;
  border-radius: var(--privy-border-radius-mdlg);
  border-style: solid;
  display: flex;
  flex-direction: column;

  && {
    padding: 0 1rem;
  }
`,
    x = s.z.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;

  &:not(:first-of-type) {
    border-top: 1px solid var(--privy-color-border-default);
  }

  & > {
    :nth-child(1) {
      flex-basis: 30%;
    }

    :nth-child(2) {
      flex-basis: 60%;
    }
  }
`,
    k = s.z.span`
  color: var(--privy-color-foreground);
  font-kerning: none;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: 'calt' off;

  /* text-xs/font-regular */
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem; /* 150% */

  text-align: left;
  flex-shrink: 0;
`,
    w = s.z.span`
  color: var(--privy-color-foreground);
  font-kerning: none;
  font-feature-settings: 'calt' off;

  /* text-sm/font-medium */
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 157.143% */

  text-align: right;
  word-break: break-all;
`,
    j = ({ onClose: e }) =>
      (0, r.jsx)(u.S, {
        showClose: !0,
        onClose: e,
        icon: p.f,
        iconVariant: "error",
        title: "Something went wrong",
        subtitle:
          "We couldn't complete account setup. This isn't caused by anything you did.",
        primaryCta: { label: "Close", onClick: e },
        watermark: !0,
      }),
    z = ({ onClose: e, reason: o }) => {
      let t = o ? o.charAt(0).toLowerCase() + o.slice(1) : void 0;
      return (0, r.jsx)(u.S, {
        showClose: !0,
        onClose: e,
        icon: p.f,
        iconVariant: "error",
        title: "Identity verification failed",
        subtitle: t
          ? `We can't complete identity verification because ${t}. Please try again or contact support for assistance.`
          : "We couldn't verify your identity. Please try again or contact support for assistance.",
        primaryCta: { label: "Close", onClick: e },
        watermark: !0,
      });
    },
    C = ({ onClose: e, email: o }) =>
      (0, r.jsx)(u.S, {
        showClose: !0,
        onClose: e,
        icon: v.f,
        title: "Identity verification in progress",
        subtitle:
          "We're waiting for Persona to approve your identity verification. This usually takes a few minutes, but may take up to 24 hours.",
        primaryCta: { label: "Done", onClick: e },
        watermark: !0,
        children: (0, r.jsxs)(f.I, {
          theme: "light",
          children: [
            "You'll receive an email at ",
            o,
            " once approved with instructions for completing your deposit.",
          ],
        }),
      }),
    $ = ({ onClose: e, onAcceptTerms: o, isLoading: t }) =>
      (0, r.jsx)(u.S, {
        showClose: !0,
        onClose: e,
        icon: h,
        title: "Verify your identity to continue",
        subtitle:
          "Finish verification with Persona — it takes just a few minutes and requires a government ID.",
        helpText: (0, r.jsxs)(r.Fragment, {
          children: [
            'This app uses Bridge to securely connect accounts and move funds. By clicking "Accept," you agree to Bridge\'s',
            " ",
            (0, r.jsx)("a", {
              href: "https://www.bridge.xyz/legal",
              target: "_blank",
              rel: "noopener noreferrer",
              children: "Terms of Service",
            }),
            " ",
            "and",
            " ",
            (0, r.jsx)("a", {
              href: "https://www.bridge.xyz/legal/row-privacy-policy/bridge-building-limited",
              target: "_blank",
              rel: "noopener noreferrer",
              children: "Privacy Policy",
            }),
            ".",
          ],
        }),
        primaryCta: { label: "Accept and continue", onClick: o, loading: t },
        watermark: !0,
      }),
    S = ({ onClose: e }) =>
      (0, r.jsx)(u.S, {
        showClose: !0,
        onClose: e,
        icon: g.f,
        iconVariant: "success",
        title: "Identity verified successfully",
        subtitle:
          "We've successfully verified your identity. Now initiate a bank transfer to view instructions.",
        primaryCta: {
          label: "Initiate bank transfer",
          onClick: () => {},
          loading: !0,
        },
        watermark: !0,
      }),
    A = ({
      opts: e,
      onClose: o,
      onBack: t,
      onEditSourceAsset: i,
      onSelectAmount: a,
      isLoading: n,
    }) =>
      (0, r.jsxs)(u.S, {
        showClose: !0,
        onClose: o,
        showBack: !!t,
        onBack: t,
        headerTitle: `Buy ${e.destination.asset.toLocaleUpperCase()}`,
        primaryCta: { label: "Continue", onClick: a, loading: n },
        watermark: !0,
        children: [
          (0, r.jsx)(y.A, {
            currency: e.source.selectedAsset,
            inputMode: "decimal",
            autoFocus: !0,
          }),
          (0, r.jsx)(y.C, {
            selectedAsset: e.source.selectedAsset,
            onEditSourceAsset: i,
          }),
        ],
      }),
    B = ({
      onClose: e,
      onBack: o,
      onAcceptTerms: t,
      onSelectAmount: i,
      onSelectSource: a,
      onEditSourceAsset: n,
      opts: l,
      state: s,
      email: c,
      isLoading: d,
    }) =>
      "select-amount" === s.status
        ? (0, r.jsx)(A, {
            onClose: e,
            onBack: o,
            onSelectAmount: i,
            onEditSourceAsset: n,
            opts: l,
            isLoading: d,
          })
        : "select-source-asset" === s.status
          ? (0, r.jsx)(y.S, { onSelectSource: a, opts: l, isLoading: d })
          : "kyc-prompt" === s.status
            ? (0, r.jsx)($, {
                onClose: e,
                onAcceptTerms: t,
                opts: l,
                isLoading: d,
              })
            : "kyc-incomplete" === s.status
              ? (0, r.jsx)(C, { onClose: e, email: c })
              : "kyc-success" === s.status
                ? (0, r.jsx)(S, { onClose: e })
                : "kyc-error" === s.status
                  ? (0, r.jsx)(z, { onClose: e, reason: s.reason })
                  : "account-details" === s.status
                    ? (0, r.jsx)(m, { onClose: e, data: s.data })
                    : "create-customer-error" === s.status ||
                        "get-customer-error" === s.status
                      ? (0, r.jsx)(j, { onClose: e })
                      : null,
    E = {
      component: () => {
        let { user: e } = (0, n.u)(),
          l = (0, a.u)().data;
        if (!l?.FundWithBankDepositScreen) throw Error("Missing data");
        let {
            onSuccess: s,
            onFailure: c,
            onBack: d,
            opts: u,
            createOrUpdateCustomer: p,
            getCustomer: v,
            getOrCreateVirtualAccount: h,
          } = l.FundWithBankDepositScreen,
          [g, f] = (0, o.useState)(u),
          [y, m] = (0, o.useState)({ status: "select-amount" }),
          [b, x] = (0, o.useState)(null),
          [k, w] = (0, o.useState)(!1),
          j = (0, o.useRef)(null),
          z = (0, o.useCallback)(async () => {
            let e;
            (w(!0), x(null));
            try {
              e = await v({ kycRedirectUrl: window.location.origin });
            } catch (e) {
              if (
                !e ||
                "object" != typeof e ||
                !("status" in e) ||
                404 !== e.status
              )
                return (m({ status: "get-customer-error" }), x(e), void w(!1));
            }
            if (!e)
              try {
                e = await p({
                  hasAcceptedTerms: !1,
                  kycRedirectUrl: window.location.origin,
                });
              } catch (e) {
                return (
                  m({ status: "create-customer-error" }),
                  x(e),
                  void w(!1)
                );
              }
            if (!e)
              return (
                m({ status: "create-customer-error" }),
                x(Error("Unable to create customer")),
                void w(!1)
              );
            if ("not_started" === e.status && e.kyc_url)
              return (
                m({ status: "kyc-prompt", kycUrl: e.kyc_url }),
                void w(!1)
              );
            if ("not_started" === e.status)
              return (
                m({ status: "get-customer-error" }),
                x(Error("Unexpected user state")),
                void w(!1)
              );
            if ("rejected" === e.status)
              return (
                m({
                  status: "kyc-error",
                  reason: e.rejection_reasons?.[0]?.reason,
                }),
                x(Error("User KYC rejected.")),
                void w(!1)
              );
            if ("incomplete" === e.status)
              return (m({ status: "kyc-incomplete" }), void w(!1));
            if ("active" !== e.status)
              return (
                m({ status: "get-customer-error" }),
                x(Error("Unexpected user state")),
                void w(!1)
              );
            e.status;
            try {
              let e = await h({
                destination: g.destination,
                provider: g.provider,
                source: { asset: g.source.selectedAsset },
              });
              m({ status: "account-details", data: e });
            } catch (e) {
              return (m({ status: "create-customer-error" }), x(e), void w(!1));
            }
          }, [g]),
          C = (0, o.useCallback)(async () => {
            if ((x(null), w(!0), "kyc-prompt" !== y.status))
              return (x(Error("Unexpected state")), void w(!1));
            let e = (0, i.f)({ location: y.kycUrl });
            if ((await p({ hasAcceptedTerms: !0 }), !e))
              return (
                x(Error("Unable to begin kyc flow.")),
                w(!1),
                void m({ status: "create-customer-error" })
              );
            j.current = new AbortController();
            let r = await (async (e, r) => {
              let o = await (0, t.Z)({
                operation: async () => ({
                  done:
                    ((e) => {
                      try {
                        return e.location.origin;
                      } catch {
                        return;
                      }
                    })(e) === window.location.origin,
                  closed: e.closed,
                }),
                until: ({ done: e, closed: r }) => e || r,
                delay: 0,
                interval: 500,
                attempts: 360,
                signal: r,
              });
              return "aborted" === o.status
                ? (e.close(), { status: "aborted" })
                : "max_attempts" === o.status
                  ? { status: "timeout" }
                  : o.result.done
                    ? (e.close(), { status: "redirected" })
                    : { status: "closed" };
            })(e, j.current.signal);
            if ("aborted" === r.status) return;
            if ("closed" === r.status) return void w(!1);
            r.status;
            let o = await (0, t.Z)({
              operation: () => v({}),
              until: (e) => "active" === e.status || "rejected" === e.status,
              delay: 0,
              interval: 2e3,
              attempts: 60,
              signal: j.current.signal,
            });
            if ("aborted" !== o.status) {
              if ("max_attempts" === o.status)
                return (m({ status: "kyc-incomplete" }), void w(!1));
              if ((o.status, "rejected" === o.result.status))
                return (
                  m({
                    status: "kyc-error",
                    reason: o.result.rejection_reasons?.[0]?.reason,
                  }),
                  x(Error("User KYC rejected.")),
                  void w(!1)
                );
              if ("active" !== o.result.status)
                return (m({ status: "kyc-incomplete" }), void w(!1));
              (e.closed || e.close(), o.result.status);
              try {
                m({ status: "kyc-success" });
                let e = await h({
                  destination: g.destination,
                  provider: g.provider,
                  source: { asset: g.source.selectedAsset },
                });
                m({ status: "account-details", data: e });
              } catch (e) {
                (m({ status: "create-customer-error" }), x(e));
              } finally {
                w(!1);
              }
            }
          }, [m, x, w, p, h, y, g, j]),
          $ = (0, o.useCallback)(
            (e) => {
              (m({ status: "select-amount" }),
                f({ ...g, source: { ...g.source, selectedAsset: e } }));
            },
            [m, f],
          ),
          S = (0, o.useCallback)(() => {
            m({ status: "select-source-asset" });
          }, [m]);
        return (0, r.jsx)(B, {
          onClose: (0, o.useCallback)(async () => {
            (j.current?.abort(),
              g.showBackButton &&
              ("select-amount" === y.status ||
                "select-source-asset" === y.status)
                ? c(Error("User cancelled funding"))
                : b
                  ? c(b)
                  : await s());
          }, [b, j, c, s, g.showBackButton, y.status]),
          onBack: d,
          opts: g,
          state: y,
          isLoading: k,
          email: e.email.address,
          onAcceptTerms: C,
          onSelectAmount: z,
          onSelectSource: $,
          onEditSourceAsset: S,
        });
      },
    };
  e.s(["FundWithBankDepositScreen", 0, E, "default", 0, E], 511510);
};
