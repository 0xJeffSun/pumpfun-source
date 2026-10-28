// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var r = e.i(732486),
    n = e.i(352386),
    i = {};
  let l = (() => {
      try {
        return i.VITE_PROD_HOSTNAME || "embed.deposits.hel.io";
      } catch {
        return "embed.deposits.hel.io";
      }
    })(),
    a = ({ children: e }) =>
      (0, r.jsxs)("div", {
        children: ["Error loading Helio Deposit for React", e ? `: ${e}` : ""],
      }),
    s = (e, t) => {
      let r = document.createElement("script");
      return (
        r.setAttribute("type", "module"),
        r.setAttribute("id", t),
        r.setAttribute("src", e),
        document.body.appendChild(r),
        r
      );
    },
    o = (e) => document.querySelector(`script#${e}`),
    u = ({
      type: e,
      config: t,
      scriptIdentifier: r,
      scriptSrc: i,
      trigger: l,
      manualOpen: a,
    }) => {
      let u,
        d = (0, n.useRef)(null),
        [c, m] = (0, n.useState)(!1);
      (0, n.useEffect)(() => m(!0), []);
      let [p, f] = (0, n.useState)(),
        [_, v] = (0, n.useState)(""),
        g = ((u = i), t.embedScriptSource || u);
      return (
        (0, n.useEffect)(() => {
          let t = !1;
          if (p) return;
          let n = () => {
              let r;
              if (!t) {
                if (
                  !(r =
                    "paylink" === e
                      ? window.helioCheckout
                      : window.moonpayCommerceDeposit)
                )
                  return void v(
                    "paylink" === e
                      ? "Unable to load MoonPay Commerce Checkout - missing init function on window.helioCheckout"
                      : "Unable to load Helio Deposit - missing init function on window.moonpayCommerceDeposit",
                  );
                f(() => r);
              }
            },
            i = (e) => {
              let r = () => v("Error loading script tag");
              return (
                e.addEventListener("load", n),
                e.addEventListener("error", r),
                () => {
                  ((t = !0),
                    e.removeEventListener("load", n),
                    e.removeEventListener("error", r));
                }
              );
            },
            l = o(r);
          return l
            ? ("paylink" === e && window.helioCheckout) ||
              ("deposit" === e && window.moonpayCommerceDeposit)
              ? void n()
              : i(l)
            : i(s(g, r));
        }, [p, g, i, r, e]),
        (0, n.useLayoutEffect)(() => {
          if (!(!p || !c) && !(a || l)) {
            if (!d.current)
              return void v(
                "paylink" === e
                  ? "Missing element to mount MoonPay Commerce Checkout"
                  : "Missing element to mount Helio Deposit",
              );
            p(d.current, t);
          }
        }, [p, c, t, e, l, a]),
        { divRef: d, initFn: p, error: _, type: e }
      );
    },
    d = {
      scriptIdentifier: "deposit-embed-script",
      scriptSrc: `https://${l}/assets/index-v1.js`,
    },
    c = "moonpay-commerce-deposit-trigger",
    m = ({ children: e, onOpen: t, ready: i }) =>
      (0, n.isValidElement)(e) && e.type !== n.Fragment
        ? (0, n.cloneElement)(e, {
            onClick: (r) => {
              var n, i;
              (null == (i = (n = e.props).onClick) || i.call(n, r),
                r.defaultPrevented || t());
            },
            "aria-busy": !i || void 0,
          })
        : (0, r.jsx)("button", {
            type: "button",
            id: c,
            className: "deposit-button",
            "aria-busy": !i || void 0,
            onClick: t,
            children: e,
          }),
    p = ({ trigger: e, onOpen: t }) => {
      let i = (0, n.useRef)(null);
      return (
        (0, n.useEffect)(() => {
          let t = i.current;
          if (t)
            return (
              t.appendChild(e),
              () => {
                t.contains(e) && t.removeChild(e);
              }
            );
        }, [e]),
        (0, r.jsx)("button", {
          type: "button",
          id: c,
          onClick: t,
          className:
            "hel-bg-transparent hel-border-none hel-outline-none hel-p-0 hel-m-0",
          children: (0, r.jsx)("span", { ref: i }),
        })
      );
    },
    f = ({ config: e }) => {
      let { divRef: t, error: n } = u({ type: "deposit", config: e, ...d });
      return n ? (0, r.jsx)(a, { children: n }) : (0, r.jsx)("div", { ref: t });
    },
    _ = ({ config: e, children: t, trigger: i }) => {
      let {
        divRef: l,
        open: s,
        ready: o,
        error: c,
      } = ((e) => {
        let {
            divRef: t,
            initFn: r,
            error: i,
          } = u({ type: "deposit", config: e, manualOpen: !0, ...d }),
          l = (0, n.useRef)(0),
          [a, s] = (0, n.useState)(""),
          o = (0, n.useCallback)(() => {
            if (!r || !t.current) return;
            l.current += 1;
            let n = (t) => {
              var r;
              let n =
                t instanceof Error
                  ? t.message
                  : "Failed to open the deposit modal";
              (s(n), null == (r = e.onError) || r.call(e, { message: n }));
            };
            try {
              let i = r(t.current, {
                ...e,
                display: "modal",
                openSignal: l.current,
              });
              i instanceof Promise && i.catch(n);
            } catch (e) {
              n(e);
            }
          }, [r, e, t]);
        return { divRef: t, open: o, ready: !!r, error: i || a };
      })(e);
      return c
        ? (0, r.jsx)(a, { children: c })
        : (0, r.jsxs)(r.Fragment, {
            children: [
              (0, r.jsx)("div", { ref: l }),
              t
                ? (0, r.jsx)(m, { onOpen: s, ready: o, children: t })
                : (0, r.jsx)(p, { trigger: i, onOpen: s }),
            ],
          });
    };
  var v =
    (((t = v || {}).METAMASK = "METAMASK"),
    (t.OKX = "OKX"),
    (t.PHANTOM = "PHANTOM"),
    (t.RABBY = "RABBY"),
    (t.SOLFLARE = "SOLFLARE"),
    (t.TRUST_WALLET = "TRUST_WALLET"),
    (t.WALLET_CONNECT = "WALLET_CONNECT"),
    (t.E2E_TEST_WALLET = "E2E_TEST_WALLET"),
    t);
  e.s([
    "d",
    0,
    ({ config: e, children: t, trigger: n }) =>
      t || n
        ? (0, r.jsx)(_, { config: e, trigger: n, children: t })
        : (0, r.jsx)(f, { config: e }),
    "W",
    0,
    (e) => (
      (({ scriptIdentifier: e, scriptSrc: t }) => {
        let r,
          i = ((r = t), { embedScriptSource: void 0 }.embedScriptSource || r),
          l = (0, n.useRef)(!1);
        (0, n.useEffect)(() => {
          l.current || ((l.current = !0), o(e) || s(i, e));
        }, [i, e]);
      })(d),
      (0, r.jsx)(r.Fragment, { children: e.children })
    ),
  ]);
};
