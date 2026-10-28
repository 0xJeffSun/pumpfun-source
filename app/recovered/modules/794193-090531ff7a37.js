// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(269722),
    i = r.i(5727);
  let a = (0, r.i(78048).f)("trash-2", [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }],
  ]);
  var n = r.i(352386),
    t = r.i(689391),
    l = r.i(541021),
    c = r.i(19916),
    s = r.i(565530),
    d = r.i(748117),
    p = r.i(636447),
    v = r.i(933185),
    h = r.i(731110),
    u = r.i(335341);
  (r.i(252494), r.i(785373));
  let g = ({
      passkeys: r,
      name: a,
      isLoading: n,
      errorReason: t,
      success: l,
      expanded: c,
      onLinkPasskey: s,
      onUnlinkPasskey: d,
      onExpand: p,
      onBack: v,
      onClose: h,
    }) =>
      l
        ? (0, e.jsx)(u.S, {
            title: "Passkeys updated",
            icon: o.f,
            iconVariant: "success",
            primaryCta: { label: "Done", onClick: h },
            onClose: h,
            watermark: !0,
          })
        : c
          ? (0, e.jsx)(u.S, {
              icon: i.f,
              title: "Your passkeys",
              onBack: v,
              onClose: h,
              watermark: !0,
              children: (0, e.jsx)(m, {
                passkeys: r,
                expanded: c,
                onUnlink: d,
                onExpand: p,
              }),
            })
          : (0, e.jsxs)(u.S, {
              icon: i.f,
              title: "Set up passkey verification",
              subtitle: "Verify with passkey",
              primaryCta: { label: "Add new passkey", onClick: s, loading: n },
              onClose: h,
              watermark: !0,
              helpText: t || void 0,
              children: [
                0 === r.length
                  ? (0, e.jsx)(k, {})
                  : (0, e.jsx)(f, {
                      children: (0, e.jsx)(m, {
                        passkeys: r,
                        expanded: c,
                        onUnlink: d,
                        onExpand: p,
                      }),
                    }),
                a
                  ? (0, e.jsxs)(x, {
                      children: [
                        (0, e.jsx)(y, { children: "New Passkey Name" }),
                        (0, e.jsx)(b, { children: a }),
                      ],
                    })
                  : null,
              ],
            }),
    f = t.z.div`
  margin-bottom: 0.75rem;
`,
    x = t.z.div`
  margin-top: 0.25rem;
`,
    y = t.z.div`
  color: var(--privy-color-foreground-2);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  margin-bottom: 0.25rem;
`,
    b = t.z.div`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
`,
    m = ({ passkeys: r, expanded: o, onUnlink: i, onExpand: t }) => {
      let [c, s] = (0, n.useState)([]),
        d = o ? r.length : 2;
      return (0, e.jsxs)("div", {
        children: [
          (0, e.jsx)(M, { children: "Your passkeys" }),
          (0, e.jsxs)(C, {
            children: [
              r.slice(0, d).map((r) =>
                (0, e.jsxs)(
                  A,
                  {
                    children: [
                      (0, e.jsxs)("div", {
                        children: [
                          (0, e.jsx)(S, {
                            children: r.authenticatorName
                              ? r.createdWithBrowser
                                ? `${r.authenticatorName} on ${r.createdWithBrowser}`
                                : r.authenticatorName
                              : r.createdWithBrowser
                                ? r.createdWithOs
                                  ? `${r.createdWithBrowser} on ${r.createdWithOs}`
                                  : `${r.createdWithBrowser}`
                                : "Unknown device",
                          }),
                          (0, e.jsxs)(E, {
                            children: [
                              "Last used:",
                              " ",
                              (
                                r.latestVerifiedAt ?? r.firstVerifiedAt
                              )?.toLocaleString() ?? "N/A",
                            ],
                          }),
                        ],
                      }),
                      (0, e.jsx)(L, {
                        disabled: c.includes(r.credentialId),
                        onClick: () =>
                          (async (r) => {
                            (s((e) => e.concat([r])),
                              await i(r),
                              s((e) => e.filter((e) => e !== r)));
                          })(r.credentialId),
                        children: c.includes(r.credentialId)
                          ? (0, e.jsx)(l.B, {})
                          : (0, e.jsx)(a, { size: 16 }),
                      }),
                    ],
                  },
                  r.credentialId,
                ),
              ),
              r.length > 2 &&
                !o &&
                (0, e.jsx)($, { onClick: t, children: "View all" }),
            ],
          }),
        ],
      });
    },
    k = () =>
      (0, e.jsxs)(c.T, {
        style: { color: "var(--privy-color-foreground)" },
        children: [
          (0, e.jsx)(c.a, {
            children: "Verify with Touch ID, Face ID, PIN, or hardware key",
          }),
          (0, e.jsx)(c.a, { children: "Takes seconds to set up and use" }),
          (0, e.jsx)(c.a, {
            children:
              "Use your passkey to verify transactions and login to your account",
          }),
        ],
      }),
    w = {
      component: () => {
        let { user: r } = (0, v.u)(),
          { unlink: o } = (0, h.l)(),
          { linkWithPasskey: i, closePrivyModal: a } = (0, d.u)(),
          { data: t } = (0, p.u)(),
          l = r?.linkedAccounts.filter((r) => "passkey" === r.type),
          [c, u] = (0, n.useState)(!1),
          [f, x] = (0, n.useState)(""),
          [y, b] = (0, n.useState)(!1),
          [m, k] = (0, n.useState)(!1);
        return (
          (0, n.useEffect)(() => {
            0 === l.length && k(!1);
          }, [l.length]),
          (0, e.jsx)(g, {
            passkeys: l,
            name: t?.passkeyAuthModalData?.name,
            isLoading: c,
            errorReason: f,
            success: y,
            expanded: m,
            onLinkPasskey: () => {
              (u(!0),
                i({ name: t?.passkeyAuthModalData?.name })
                  .then(() => b(!0))
                  .catch((r) => {
                    if (r instanceof s.b) {
                      if (r.privyErrorCode === s.a.CANNOT_LINK_MORE_OF_TYPE)
                        return void x("Cannot link more passkeys to account.");
                      if (r.privyErrorCode === s.a.PASSKEY_NOT_ALLOWED)
                        return void x(
                          "Passkey request timed out or rejected by user.",
                        );
                    }
                    x("Unknown error occurred.");
                  })
                  .finally(() => {
                    u(!1);
                  }));
            },
            onUnlinkPasskey: async (r) => (
              u(!0),
              await o({ credentialId: r })
                .then(() => b(!0))
                .catch((r) => {
                  r instanceof s.b &&
                  r.privyErrorCode === s.a.MISSING_MFA_CREDENTIALS
                    ? x("Cannot unlink a passkey enrolled in MFA")
                    : x("Unknown error occurred.");
                })
                .finally(() => {
                  u(!1);
                })
            ),
            onExpand: () => k(!0),
            onBack: () => k(!1),
            onClose: () => a(),
          })
        );
      },
    },
    j = t.z.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 90px;
  border-radius: 50%;
  svg + svg {
    margin-left: 12px;
  }
  > svg {
    z-index: 2;
    color: var(--privy-color-accent) !important;
    stroke: var(--privy-color-accent) !important;
    fill: var(--privy-color-accent) !important;
  }
`,
    z = t.m`
  && {
    width: 100%;
    font-size: 0.875rem;
    line-height: 1rem;

    /* Tablet and Up */
    @media (min-width: 440px) {
      font-size: 14px;
    }

    display: flex;
    gap: 12px;
    justify-content: center;

    padding: 6px 8px;
    background-color: var(--privy-color-background);
    transition: background-color 200ms ease;
    color: var(--privy-color-accent) !important;

    :focus {
      outline: none;
      box-shadow: none;
    }
  }
`,
    $ = t.z.button`
  ${z}
`,
    C = t.z.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.8rem;
  padding: 0.5rem 0 0;
  flex-grow: 1;
  width: 100%;
`,
    M = t.z.div`
  line-height: 20px;
  height: 20px;
  font-size: 1em;
  font-weight: 450;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`,
    S = t.z.div`
  font-size: 1em;
  line-height: 1.3em;
  font-weight: 500;
  color: var(--privy-color-foreground-2);
  padding: 0.2em 0;
`,
    E = t.z.div`
  font-size: 0.875rem;
  line-height: 1rem;
  color: var(--privy-color-foreground-2);
  padding: 0.2em 0;
`,
    A = t.z.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  gap: 10px;
  font-size: 0.875rem;
  line-height: 1rem;
  text-align: left;
  border-radius: 8px;
  border: 1px solid var(--privy-color-border-default) !important;
  width: 100%;
  height: 5em;
`,
    B = t.m`
  :focus,
  :hover,
  :active {
    outline: none;
  }
  display: flex;
  width: 2em;
  height: 2em;
  justify-content: center;
  align-items: center;
  svg {
    color: var(--privy-color-error);
  }
  svg:hover {
    color: var(--privy-color-foreground-3);
  }
`,
    L = t.z.button`
  ${B}
`;
  r.s(
    [
      "DoubleIconWrapper",
      0,
      j,
      "LinkButton",
      0,
      $,
      "LinkPasskeyScreen",
      0,
      w,
      "LinkPasskeyView",
      0,
      g,
      "default",
      0,
      w,
    ],
    794193,
  );
};
