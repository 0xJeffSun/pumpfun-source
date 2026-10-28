// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    i = r.i(269722),
    o = r.i(5727);
  let t = (0, r.i(78048).f)("trash-2", [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }],
  ]);
  var a = r.i(352386),
    n = r.i(689391),
    l = r.i(541021),
    s = r.i(19916),
    c = r.i(565530),
    d = r.i(748117),
    p = r.i(636447),
    h = r.i(933185),
    v = r.i(731110),
    g = r.i(335341);
  (r.i(252494), r.i(785373));
  let u = ({
      passkeys: r,
      name: t,
      isLoading: a,
      errorReason: n,
      success: l,
      expanded: s,
      onLinkPasskey: c,
      onUnlinkPasskey: d,
      onExpand: p,
      onBack: h,
      onClose: v,
    }) =>
      l
        ? (0, e.jsx)(g.S, {
            title: "Passkeys updated",
            icon: i.f,
            iconVariant: "success",
            primaryCta: { label: "Done", onClick: v },
            onClose: v,
            watermark: !0,
          })
        : s
          ? (0, e.jsx)(g.S, {
              icon: o.f,
              title: "Your passkeys",
              onBack: h,
              onClose: v,
              watermark: !0,
              children: (0, e.jsx)(b, {
                passkeys: r,
                expanded: s,
                onUnlink: d,
                onExpand: p,
              }),
            })
          : (0, e.jsxs)(g.S, {
              icon: o.f,
              title: "Set up passkey verification",
              subtitle: "Verify with passkey",
              primaryCta: { label: "Add new passkey", onClick: c, loading: a },
              onClose: v,
              watermark: !0,
              helpText: n || void 0,
              children: [
                0 === r.length
                  ? (0, e.jsx)(w, {})
                  : (0, e.jsx)(x, {
                      children: (0, e.jsx)(b, {
                        passkeys: r,
                        expanded: s,
                        onUnlink: d,
                        onExpand: p,
                      }),
                    }),
                t
                  ? (0, e.jsxs)(f, {
                      children: [
                        (0, e.jsx)(y, { children: "New Passkey Name" }),
                        (0, e.jsx)(m, { children: t }),
                      ],
                    })
                  : null,
              ],
            }),
    x = n.z.div`
  margin-bottom: 0.75rem;
`,
    f = n.z.div`
  margin-top: 0.25rem;
`,
    y = n.z.div`
  color: var(--privy-color-foreground-2);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  margin-bottom: 0.25rem;
`,
    m = n.z.div`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
`,
    b = ({ passkeys: r, expanded: i, onUnlink: o, onExpand: n }) => {
      let [s, c] = (0, a.useState)([]),
        d = i ? r.length : 2;
      return (0, e.jsxs)("div", {
        children: [
          (0, e.jsx)(M, { children: "Your passkeys" }),
          (0, e.jsxs)(L, {
            children: [
              r.slice(0, d).map((r) =>
                (0, e.jsxs)(
                  F,
                  {
                    children: [
                      (0, e.jsxs)("div", {
                        children: [
                          (0, e.jsx)($, {
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
                          (0, e.jsxs)(S, {
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
                      (0, e.jsx)(E, {
                        disabled: s.includes(r.credentialId),
                        onClick: () =>
                          (async (r) => {
                            (c((e) => e.concat([r])),
                              await o(r),
                              c((e) => e.filter((e) => e !== r)));
                          })(r.credentialId),
                        children: s.includes(r.credentialId)
                          ? (0, e.jsx)(l.B, {})
                          : (0, e.jsx)(t, { size: 16 }),
                      }),
                    ],
                  },
                  r.credentialId,
                ),
              ),
              r.length > 2 &&
                !i &&
                (0, e.jsx)(C, { onClick: n, children: "View all" }),
            ],
          }),
        ],
      });
    },
    w = () =>
      (0, e.jsxs)(s.T, {
        style: { color: "var(--privy-color-foreground)" },
        children: [
          (0, e.jsx)(s.a, {
            children: "Verify with Touch ID, Face ID, PIN, or hardware key",
          }),
          (0, e.jsx)(s.a, { children: "Takes seconds to set up and use" }),
          (0, e.jsx)(s.a, {
            children:
              "Use your passkey to verify transactions and login to your account",
          }),
        ],
      }),
    j = {
      component: () => {
        let { user: r } = (0, h.u)(),
          { unlink: i } = (0, v.l)(),
          { linkWithPasskey: o, closePrivyModal: t } = (0, d.u)(),
          { data: n } = (0, p.u)(),
          l = r?.linkedAccounts.filter((r) => "passkey" === r.type),
          [s, g] = (0, a.useState)(!1),
          [x, f] = (0, a.useState)(""),
          [y, m] = (0, a.useState)(!1),
          [b, w] = (0, a.useState)(!1);
        return (
          (0, a.useEffect)(() => {
            0 === l.length && w(!1);
          }, [l.length]),
          (0, e.jsx)(u, {
            passkeys: l,
            name: n?.passkeyAuthModalData?.name,
            isLoading: s,
            errorReason: x,
            success: y,
            expanded: b,
            onLinkPasskey: () => {
              (g(!0),
                o({ name: n?.passkeyAuthModalData?.name })
                  .then(() => m(!0))
                  .catch((r) => {
                    if (r instanceof c.b) {
                      if (r.privyErrorCode === c.a.CANNOT_LINK_MORE_OF_TYPE)
                        return void f("Cannot link more passkeys to account.");
                      if (r.privyErrorCode === c.a.PASSKEY_NOT_ALLOWED)
                        return void f(
                          "Passkey request timed out or rejected by user.",
                        );
                    }
                    f("Unknown error occurred.");
                  })
                  .finally(() => {
                    g(!1);
                  }));
            },
            onUnlinkPasskey: async (r) => (
              g(!0),
              await i({ credentialId: r })
                .then(() => m(!0))
                .catch((r) => {
                  r instanceof c.b &&
                  r.privyErrorCode === c.a.MISSING_MFA_CREDENTIALS
                    ? f("Cannot unlink a passkey enrolled in MFA")
                    : f("Unknown error occurred.");
                })
                .finally(() => {
                  g(!1);
                })
            ),
            onExpand: () => w(!0),
            onBack: () => w(!1),
            onClose: () => t(),
          })
        );
      },
    },
    k = n.z.div`
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
    z = n.m`
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
    C = n.z.button`
  ${z}
`,
    L = n.z.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.8rem;
  padding: 0.5rem 0 0;
  flex-grow: 1;
  width: 100%;
`,
    M = n.z.div`
  line-height: 20px;
  height: 20px;
  font-size: 1em;
  font-weight: 450;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`,
    $ = n.z.div`
  font-size: 1em;
  line-height: 1.3em;
  font-weight: 500;
  color: var(--privy-color-foreground-2);
  padding: 0.2em 0;
`,
    S = n.z.div`
  font-size: 0.875rem;
  line-height: 1rem;
  color: var(--privy-color-foreground-2);
  padding: 0.2em 0;
`,
    F = n.z.div`
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
    V = n.m`
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
    E = n.z.button`
  ${V}
`;
  r.s(
    [
      "DoubleIconWrapper",
      0,
      k,
      "LinkButton",
      0,
      C,
      "LinkPasskeyScreen",
      0,
      j,
      "LinkPasskeyView",
      0,
      u,
      "default",
      0,
      j,
    ],
    794193,
  );
};
