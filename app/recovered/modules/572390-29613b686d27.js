// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386),
    i = r.i(768820),
    a = r.i(689391),
    l = r.i(194250),
    t = r.i(541021),
    n = r.i(842287),
    c = r.i(594022),
    s = r.i(933185),
    d = r.i(748117),
    v = r.i(636447),
    p = r.i(335341),
    h = r.i(56322);
  (r.i(698870), r.i(252494));
  let u = "#8a63d2",
    g = ({
      appName: r,
      loading: o,
      success: a,
      errorMessage: s,
      connectUri: d,
      onBack: v,
      onClose: g,
      onOpenFarcaster: j,
    }) =>
      (0, e.jsx)(
        p.S,
        i.isMobile || o
          ? i.isIOS
            ? {
                title: s ? s.message : "Add a signer to Farcaster",
                subtitle: s
                  ? s.detail
                  : `This will allow ${r} to add casts, likes, follows, and more on your behalf.`,
                icon: h.F,
                iconVariant: "loading",
                iconLoadingStatus: { success: a, fail: !!s },
                primaryCta:
                  d && j ? { label: "Open Farcaster app", onClick: j } : void 0,
                onBack: v,
                onClose: g,
                watermark: !0,
              }
            : {
                title: s ? s.message : "Requesting signer from Farcaster",
                subtitle: s ? s.detail : "This should only take a moment",
                icon: h.F,
                iconVariant: "loading",
                iconLoadingStatus: { success: a, fail: !!s },
                onBack: v,
                onClose: g,
                watermark: !0,
                children:
                  d &&
                  i.isMobile &&
                  (0, e.jsx)(x, {
                    children: (0, e.jsx)(n.O, {
                      text: "Take me to Farcaster",
                      url: d,
                      color: u,
                    }),
                  }),
              }
          : {
              title: "Add a signer to Farcaster",
              subtitle: `This will allow ${r} to add casts, likes, follows, and more on your behalf.`,
              onBack: v,
              onClose: g,
              watermark: !0,
              children: (0, e.jsxs)(f, {
                children: [
                  (0, e.jsx)(b, {
                    children: d
                      ? (0, e.jsx)(c.Q, {
                          url: d,
                          size: 275,
                          squareLogoElement: h.F,
                        })
                      : (0, e.jsx)(w, { children: (0, e.jsx)(t.L, {}) }),
                  }),
                  (0, e.jsxs)(m, {
                    children: [
                      (0, e.jsx)(y, {
                        children:
                          "Or copy this link and paste it into a phone browser to open the Farcaster app.",
                      }),
                      d &&
                        (0, e.jsx)(l.C, {
                          text: d,
                          itemName: "link",
                          color: u,
                        }),
                    ],
                  }),
                ],
              }),
            },
      ),
    x = a.z.div`
  margin-top: 24px;
`,
    f = a.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,
    b = a.z.div`
  padding: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 275px;
`,
    m = a.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`,
    y = a.z.div`
  font-size: 0.875rem;
  text-align: center;
  color: var(--privy-color-foreground-2);
`,
    w = a.z.div`
  position: relative;
  width: 82px;
  height: 82px;
`,
    j = {
      component: () => {
        let { lastScreen: r, navigateBack: i, data: a } = (0, v.u)(),
          l = (0, s.a)(),
          { requestFarcasterSignerStatus: t, closePrivyModal: n } = (0, d.u)(),
          [c, p] = (0, o.useState)(void 0),
          [h, u] = (0, o.useState)(!1),
          [x, f] = (0, o.useState)(!1),
          b = (0, o.useRef)([]),
          m = a?.farcasterSigner;
        (0, o.useEffect)(() => {
          let r = Date.now(),
            e = setInterval(async () => {
              if (!m?.public_key)
                return (
                  clearInterval(e),
                  void p({
                    retryable: !0,
                    message: "Connect failed",
                    detail: "Something went wrong. Please try again.",
                  })
                );
              "approved" === m.status &&
                (clearInterval(e),
                u(!1),
                f(!0),
                b.current.push(
                  setTimeout(
                    () => n({ shouldCallAuthOnSuccess: !1, isSuccess: !0 }),
                    s.Q,
                  ),
                ));
              let o = await t(m?.public_key),
                i = Date.now() - r;
              "approved" === o.status
                ? (clearInterval(e),
                  u(!1),
                  f(!0),
                  b.current.push(
                    setTimeout(
                      () => n({ shouldCallAuthOnSuccess: !1, isSuccess: !0 }),
                      s.Q,
                    ),
                  ))
                : i > 3e5
                  ? (clearInterval(e),
                    p({
                      retryable: !0,
                      message: "Connect failed",
                      detail: "The request timed out. Try again.",
                    }))
                  : "revoked" === o.status &&
                    (clearInterval(e),
                    p({
                      retryable: !0,
                      message: "Request rejected",
                      detail: "The request was rejected. Please try again.",
                    }));
            }, 2e3);
          return () => {
            (clearInterval(e), b.current.forEach((r) => clearTimeout(r)));
          };
        }, []);
        let y =
          "pending_approval" === m?.status ? m.signer_approval_url : void 0;
        return (0, e.jsx)(g, {
          appName: l.name,
          loading: h,
          success: x,
          errorMessage: c,
          connectUri: y,
          onBack: r ? i : void 0,
          onClose: n,
          onOpenFarcaster: () => {
            y && (window.location.href = y);
          },
        });
      },
    };
  r.s([
    "FarcasterSignerStatusScreen",
    0,
    j,
    "FarcasterSignerStatusView",
    0,
    g,
    "default",
    0,
    j,
  ]);
};
