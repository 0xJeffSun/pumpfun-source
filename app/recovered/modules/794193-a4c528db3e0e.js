// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(269722),
    n = e.i(5727);
  let r = (0, e.i(78048).f)("trash-2", [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }],
  ]);
  var a = e.i(352386),
    s = e.i(689391),
    o = e.i(541021),
    l = e.i(19916),
    d = e.i(565530),
    c = e.i(748117),
    h = e.i(636447),
    u = e.i(933185),
    p = e.i(731110),
    f = e.i(335341);
  (e.i(252494), e.i(785373));
  let g = ({
      passkeys: e,
      name: r,
      isLoading: a,
      errorReason: s,
      success: o,
      expanded: l,
      onLinkPasskey: d,
      onUnlinkPasskey: c,
      onExpand: h,
      onBack: u,
      onClose: p,
    }) =>
      o
        ? (0, t.jsx)(f.S, {
            title: "Passkeys updated",
            icon: i.f,
            iconVariant: "success",
            primaryCta: { label: "Done", onClick: p },
            onClose: p,
            watermark: !0,
          })
        : l
          ? (0, t.jsx)(f.S, {
              icon: n.f,
              title: "Your passkeys",
              onBack: u,
              onClose: p,
              watermark: !0,
              children: (0, t.jsx)(w, {
                passkeys: e,
                expanded: l,
                onUnlink: c,
                onExpand: h,
              }),
            })
          : (0, t.jsxs)(f.S, {
              icon: n.f,
              title: "Set up passkey verification",
              subtitle: "Verify with passkey",
              primaryCta: { label: "Add new passkey", onClick: d, loading: a },
              onClose: p,
              watermark: !0,
              helpText: s || void 0,
              children: [
                0 === e.length
                  ? (0, t.jsx)(j, {})
                  : (0, t.jsx)(x, {
                      children: (0, t.jsx)(w, {
                        passkeys: e,
                        expanded: l,
                        onUnlink: c,
                        onExpand: h,
                      }),
                    }),
                r
                  ? (0, t.jsxs)(v, {
                      children: [
                        (0, t.jsx)(m, { children: "New Passkey Name" }),
                        (0, t.jsx)(y, { children: r }),
                      ],
                    })
                  : null,
              ],
            }),
    x = s.z.div`
  margin-bottom: 0.75rem;
`,
    v = s.z.div`
  margin-top: 0.25rem;
`,
    m = s.z.div`
  color: var(--privy-color-foreground-2);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  margin-bottom: 0.25rem;
`,
    y = s.z.div`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
`,
    w = ({ passkeys: e, expanded: i, onUnlink: n, onExpand: s }) => {
      let [l, d] = (0, a.useState)([]),
        c = i ? e.length : 2;
      return (0, t.jsxs)("div", {
        children: [
          (0, t.jsx)(F, { children: "Your passkeys" }),
          (0, t.jsxs)(L, {
            children: [
              e.slice(0, c).map((e) =>
                (0, t.jsxs)(
                  T,
                  {
                    children: [
                      (0, t.jsxs)("div", {
                        children: [
                          (0, t.jsx)(I, {
                            children: e.authenticatorName
                              ? e.createdWithBrowser
                                ? `${e.authenticatorName} on ${e.createdWithBrowser}`
                                : e.authenticatorName
                              : e.createdWithBrowser
                                ? e.createdWithOs
                                  ? `${e.createdWithBrowser} on ${e.createdWithOs}`
                                  : `${e.createdWithBrowser}`
                                : "Unknown device",
                          }),
                          (0, t.jsxs)(z, {
                            children: [
                              "Last used:",
                              " ",
                              (
                                e.latestVerifiedAt ?? e.firstVerifiedAt
                              )?.toLocaleString() ?? "N/A",
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsx)(M, {
                        disabled: l.includes(e.credentialId),
                        onClick: () =>
                          (async (e) => {
                            (d((t) => t.concat([e])),
                              await n(e),
                              d((t) => t.filter((t) => t !== e)));
                          })(e.credentialId),
                        children: l.includes(e.credentialId)
                          ? (0, t.jsx)(o.B, {})
                          : (0, t.jsx)(r, { size: 16 }),
                      }),
                    ],
                  },
                  e.credentialId,
                ),
              ),
              e.length > 2 &&
                !i &&
                (0, t.jsx)(S, { onClick: s, children: "View all" }),
            ],
          }),
        ],
      });
    },
    j = () =>
      (0, t.jsxs)(l.T, {
        style: { color: "var(--privy-color-foreground)" },
        children: [
          (0, t.jsx)(l.a, {
            children: "Verify with Touch ID, Face ID, PIN, or hardware key",
          }),
          (0, t.jsx)(l.a, { children: "Takes seconds to set up and use" }),
          (0, t.jsx)(l.a, {
            children:
              "Use your passkey to verify transactions and login to your account",
          }),
        ],
      }),
    C = {
      component: () => {
        let { user: e } = (0, u.u)(),
          { unlink: i } = (0, p.l)(),
          { linkWithPasskey: n, closePrivyModal: r } = (0, c.u)(),
          { data: s } = (0, h.u)(),
          o = e?.linkedAccounts.filter((e) => "passkey" === e.type),
          [l, f] = (0, a.useState)(!1),
          [x, v] = (0, a.useState)(""),
          [m, y] = (0, a.useState)(!1),
          [w, j] = (0, a.useState)(!1);
        return (
          (0, a.useEffect)(() => {
            0 === o.length && j(!1);
          }, [o.length]),
          (0, t.jsx)(g, {
            passkeys: o,
            name: s?.passkeyAuthModalData?.name,
            isLoading: l,
            errorReason: x,
            success: m,
            expanded: w,
            onLinkPasskey: () => {
              (f(!0),
                n({ name: s?.passkeyAuthModalData?.name })
                  .then(() => y(!0))
                  .catch((e) => {
                    if (e instanceof d.b) {
                      if (e.privyErrorCode === d.a.CANNOT_LINK_MORE_OF_TYPE)
                        return void v("Cannot link more passkeys to account.");
                      if (e.privyErrorCode === d.a.PASSKEY_NOT_ALLOWED)
                        return void v(
                          "Passkey request timed out or rejected by user.",
                        );
                    }
                    v("Unknown error occurred.");
                  })
                  .finally(() => {
                    f(!1);
                  }));
            },
            onUnlinkPasskey: async (e) => (
              f(!0),
              await i({ credentialId: e })
                .then(() => y(!0))
                .catch((e) => {
                  e instanceof d.b &&
                  e.privyErrorCode === d.a.MISSING_MFA_CREDENTIALS
                    ? v("Cannot unlink a passkey enrolled in MFA")
                    : v("Unknown error occurred.");
                })
                .finally(() => {
                  f(!1);
                })
            ),
            onExpand: () => j(!0),
            onBack: () => j(!1),
            onClose: () => r(),
          })
        );
      },
    },
    b = s.z.div`
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
    k = s.m`
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
    S = s.z.button`
  ${k}
`,
    L = s.z.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.8rem;
  padding: 0.5rem 0 0;
  flex-grow: 1;
  width: 100%;
`,
    F = s.z.div`
  line-height: 20px;
  height: 20px;
  font-size: 1em;
  font-weight: 450;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`,
    I = s.z.div`
  font-size: 1em;
  line-height: 1.3em;
  font-weight: 500;
  color: var(--privy-color-foreground-2);
  padding: 0.2em 0;
`,
    z = s.z.div`
  font-size: 0.875rem;
  line-height: 1rem;
  color: var(--privy-color-foreground-2);
  padding: 0.2em 0;
`,
    T = s.z.div`
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
    E = s.m`
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
    M = s.z.button`
  ${E}
`;
  e.s(
    [
      "DoubleIconWrapper",
      0,
      b,
      "LinkButton",
      0,
      S,
      "LinkPasskeyScreen",
      0,
      C,
      "LinkPasskeyView",
      0,
      g,
      "default",
      0,
      C,
    ],
    794193,
  );
};
