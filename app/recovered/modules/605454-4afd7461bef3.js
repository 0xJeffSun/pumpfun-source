// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(14723),
    a = r.i(181392),
    i = r.i(352386),
    l = r.i(689391),
    n = r.i(995040),
    t = r.i(727472),
    c = r.i(541021),
    d = r.i(25047),
    s = r.i(748117),
    v = r.i(636447),
    u = r.i(679594),
    p = r.i(827432);
  (r.i(252494), r.i(785373), r.i(768820));
  let g =
      "If you've completed your purchase in Coinbase, your funds are on the way and may take a few minutes to appear.",
    h = {
      component: () => {
        let {
            data: r,
            setModalData: o,
            navigate: a,
            navigateBack: l,
          } = (0, v.u)(),
          {
            closePrivyModal: t,
            createAnalyticsEvent: c,
            client: p,
          } = (0, s.u)(),
          [g, h] = (0, i.useState)("pending-in-flow"),
          [f, y] = (0, i.useState)(!1),
          m = (0, i.useRef)(0),
          x = { ...r?.funding, showAlternateFundingMethod: !0 };
        x.usingDefaultFundingMethod && (x.usingDefaultFundingMethod = !1);
        let { partnerUserId: w, popup: k } = r?.coinbaseOnrampStatus ?? {};
        return (
          (0, i.useEffect)(() => {
            if ("pending-in-flow" === g || "pending-after-flow" === g) {
              let e = setInterval(async () => {
                if (w)
                  try {
                    let { status: e } = await p.getCoinbaseOnRampStatus({
                      partnerUserId: w,
                    });
                    if ("success" === e) return void h("success");
                    if ("failure" === e)
                      throw Error(
                        "There was an error completing Coinbase Onramp flow.",
                      );
                    if (m.current >= 3)
                      return (
                        o({
                          funding: x,
                          solanaFundingData: r?.solanaFundingData,
                        }),
                        void a("FundingMethodSelectionScreen")
                      );
                    k?.closed &&
                      ((m.current = m.current + 1), h("pending-after-flow"));
                  } catch (e) {
                    (console.error(e),
                      h("error"),
                      c({
                        eventName: u.O,
                        payload: {
                          status: "failure",
                          provider: "coinbase-onramp",
                          error: e.message,
                        },
                      }),
                      o({
                        funding: {
                          ...x,
                          errorMessage:
                            "Something went wrong adding funds. Please try again or use another method.",
                        },
                        solanaFundingData: r?.solanaFundingData,
                      }),
                      a("FundingMethodSelectionScreen"));
                  }
              }, 1500);
              return () => clearInterval(e);
            }
          }, [w, k, g]),
          (0, i.useEffect)(() => {
            let r = setTimeout(() => y(!0), 3e4);
            return () => clearTimeout(r);
          }, []),
          (0, e.jsxs)(e.Fragment, {
            children: [
              (0, e.jsx)(
                n.M,
                {
                  title: "Fund account",
                  backFn: () => {
                    (o({ funding: x, solanaFundingData: r?.solanaFundingData }),
                      l());
                  },
                },
                "header",
              ),
              (0, e.jsx)(b, {
                status: g,
                hasPendingTimedOut: f,
                onClickCta: t,
              }),
              (0, e.jsx)(d.B, {}),
            ],
          })
        );
      },
    },
    f = (r, e) => {
      switch (r) {
        case "success":
          return {
            title: "You've funded your account!",
            body: "It may take a few minutes for the assets to appear.",
            cta: "Continue",
          };
        case "pending-after-flow":
          return {
            title: "In progress",
            body: e
              ? g
              : "Almost done. Retrieving transaction status from Coinbase",
            cta: "Done",
          };
        case "error":
        case "pending-in-flow":
          return {
            title: "In progress",
            body: e
              ? g
              : "Go back to Coinbase Onramp to finish funding your account.",
            cta: "Done",
          };
      }
    },
    b = ({ status: r, hasPendingTimedOut: o, onClickCta: a }) => {
      let { title: l, body: c, cta: d } = (0, i.useMemo)(() => f(r, o), [r, o]);
      return (0, e.jsxs)(e.Fragment, {
        children: [
          (0, e.jsxs)(x, {
            children: [
              (0, e.jsx)(y, { isSucccess: "success" === r }),
              (0, e.jsxs)(t.a, {
                children: [
                  (0, e.jsx)("h3", { children: l }),
                  (0, e.jsx)(m, { children: c }),
                ],
              }),
            ],
          }),
          d && (0, e.jsx)(n.P, { onClick: a, children: d }),
        ],
      });
    },
    y = ({ isSucccess: r }) => {
      if (!r) {
        let r = "var(--privy-color-foreground-4)";
        return (0, e.jsxs)("div", {
          style: { position: "relative" },
          children: [
            (0, e.jsx)(c.L, { color: r, style: { position: "absolute" } }),
            (0, e.jsx)(c.a, { color: r }),
            (0, e.jsx)(p.v, {
              style: {
                position: "absolute",
                width: "2.8rem",
                height: "2.8rem",
                top: "1.2rem",
                left: "1.2rem",
              },
            }),
          ],
        });
      }
      let i = r
          ? a.f
          : () =>
              (0, e.jsx)(o.f, {
                width: "3rem",
                height: "3rem",
                style: {
                  backgroundColor: "var(--privy-color-foreground-4)",
                  color: "var(--privy-color-background)",
                  borderRadius: "100%",
                  padding: "0.5rem",
                  margin: "0.5rem",
                },
              }),
        l = r
          ? "var(--privy-color-success)"
          : "var(--privy-color-foreground-4)";
      return (0, e.jsx)("div", {
        style: {
          borderColor: l,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "100%",
          borderWidth: 2,
          padding: "0.5rem",
          marginBottom: "0.5rem",
        },
        children:
          i && (0, e.jsx)(i, { width: "4rem", height: "4rem", color: l }),
      });
    },
    m = l.z.p`
  font-size: 1rem;
  color: var(--privy-color-foreground-3);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,
    x = l.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 1.75rem;
  margin-right: 1.75rem;
  padding: 2rem 0;
`;
  r.s([
    "CoinbaseOnrampStatusScreen",
    0,
    h,
    "PENDING_TIMED_OUT_BODY",
    0,
    g,
    "default",
    0,
    h,
    "getStatusCopy",
    0,
    f,
  ]);
};
