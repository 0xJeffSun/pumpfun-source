// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    n = e.i(352386);
  let i = n.forwardRef(function ({ title: e, titleId: r, ...i }, t) {
      return n.createElement(
        "svg",
        Object.assign(
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            "data-slot": "icon",
            ref: t,
            "aria-labelledby": r,
          },
          i,
        ),
        e ? n.createElement("title", { id: r }, e) : null,
        n.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
        }),
      );
    }),
    t = n.forwardRef(function ({ title: e, titleId: r, ...i }, t) {
      return n.createElement(
        "svg",
        Object.assign(
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            "data-slot": "icon",
            ref: t,
            "aria-labelledby": r,
          },
          i,
        ),
        e ? n.createElement("title", { id: r }, e) : null,
        n.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3",
        }),
      );
    });
  var s = e.i(84410),
    s = s,
    a = e.i(689391),
    o = e.i(42799),
    l = e.i(995040),
    c = e.i(25047),
    d = e.i(635164);
  let h = (0, a.z)(d.L)`
  cursor: pointer;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: var(--privy-color-accent);
  svg {
    fill: var(--privy-color-accent);
  }
`;
  var x = e.i(39174),
    u = e.i(294882),
    p = e.i(744894),
    m = e.i(205212),
    j = e.i(850876),
    g = e.i(950268),
    f = e.i(440527),
    y = e.i(933185),
    v = e.i(315430),
    w = e.i(949894),
    b = e.i(858042),
    k = e.i(691416),
    T = e.i(105928),
    L = e.i(746549),
    A = e.i(446356),
    R = e.i(171762);
  let S = n.forwardRef(function ({ title: e, titleId: r, ...i }, t) {
    return n.createElement(
      "svg",
      Object.assign(
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          "aria-hidden": "true",
          "data-slot": "icon",
          ref: t,
          "aria-labelledby": r,
        },
        i,
      ),
      e ? n.createElement("title", { id: r }, e) : null,
      n.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z",
      }),
    );
  });
  var C = e.i(924568),
    I = e.i(256260),
    E = e.i(748117),
    V = ({
      iconUrl: e,
      value: n,
      symbol: i,
      usdValue: t,
      nftName: s,
      nftCount: a,
      decimals: o,
      $isLoading: l,
    }) => {
      if (l) return (0, r.jsx)(z, { $isLoading: l });
      let c =
        n && t && o
          ? (function (e, r, n) {
              let i = parseFloat(e),
                t = parseFloat(n);
              if (0 === i || 0 === t || Number.isNaN(i) || Number.isNaN(t))
                return e;
              let s = Math.ceil(-Math.log10(0.01 / (t / i))),
                a = Math.pow(10, (s = Math.max((s = Math.min(s, r)), 1))),
                o = +(Math.floor(i * a) / a).toFixed(s).replace(/\.?0+$/, "");
              return Intl.NumberFormat(void 0, {
                maximumFractionDigits: r,
              }).format(o);
            })(n, o, t)
          : n;
      return (0, r.jsxs)("div", {
        children: [
          (0, r.jsxs)(z, {
            $isLoading: l,
            children: [
              e && (0, r.jsx)(O, { src: e, alt: "Token icon" }),
              a && a > 1 ? a + "x" : void 0,
              " ",
              s,
              c,
              " ",
              i,
            ],
          }),
          t && (0, r.jsxs)(M, { $isLoading: l, children: ["$", t] }),
        ],
      });
    };
  let z = a.z.span`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.375rem;
  word-break: break-all;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  /**
   * @NOTE This is a code smell anti-pattern for styling components.
   * We are mixing JSX definitions with styled-components CSS definitions.
   * This is not ideal and should be refactored in the future to separate concerns.
   * This is also hard to read, as it makes it difficult to understand the structure
   * of the component and its styles by viewing the JSX.
   */

  ${w.L}
`,
    M = a.z.span`
  color: var(--privy-color-foreground-2);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  word-break: break-all;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  ${w.L}
`,
    O = a.z.img`
  height: 14px;
  width: 14px;
  margin-right: 4px;
  object-fit: contain;
`,
    N = (e) => {
      let {
          chain: n,
          transactionDetails: i,
          isTokenContractInfoLoading: t,
          symbol: s,
        } = e,
        { action: a, functionName: o } = i;
      return (0, r.jsx)(k.B, {
        children: (0, r.jsxs)(x.a, {
          children: [
            "transaction" !== a &&
              (0, r.jsxs)(x.R, {
                children: [
                  (0, r.jsx)(d.L, { children: "Action" }),
                  (0, r.jsx)(d.V, { children: o }),
                ],
              }),
            "mint" === o &&
              "args" in i &&
              i.args
                .filter((e) => e)
                .map((e, i) =>
                  (0, r.jsxs)(
                    x.R,
                    {
                      children: [
                        (0, r.jsx)(d.L, { children: `Param ${i}` }),
                        (0, r.jsx)(d.V, {
                          children:
                            "string" == typeof e && (0, b.f)(e)
                              ? (0, r.jsx)(g.A, {
                                  address: e,
                                  url: n?.blockExplorers?.default?.url,
                                  showCopyIcon: !1,
                                })
                              : e?.toString(),
                        }),
                      ],
                    },
                    i,
                  ),
                ),
            "setApprovalForAll" === o &&
              i.operator &&
              (0, r.jsxs)(x.R, {
                children: [
                  (0, r.jsx)(d.L, { children: "Operator" }),
                  (0, r.jsx)(d.V, {
                    children: (0, r.jsx)(g.A, {
                      address: i.operator,
                      url: n?.blockExplorers?.default?.url,
                      showCopyIcon: !1,
                    }),
                  }),
                ],
              }),
            "setApprovalForAll" === o &&
              void 0 !== i.approved &&
              (0, r.jsxs)(x.R, {
                children: [
                  (0, r.jsx)(d.L, { children: "Set approval to" }),
                  (0, r.jsx)(d.V, { children: i.approved ? "true" : "false" }),
                ],
              }),
            "transfer" === o ||
            "transferWithMemo" === o ||
            "transferFrom" === o ||
            "safeTransferFrom" === o ||
            "approve" === o
              ? (0, r.jsxs)(r.Fragment, {
                  children: [
                    "formattedAmount" in i &&
                      i.formattedAmount &&
                      (0, r.jsxs)(x.R, {
                        children: [
                          (0, r.jsx)(d.L, { children: "Amount" }),
                          (0, r.jsxs)(d.V, {
                            $isLoading: t,
                            children: [i.formattedAmount, " ", s],
                          }),
                        ],
                      }),
                    "tokenId" in i &&
                      i.tokenId &&
                      (0, r.jsxs)(x.R, {
                        children: [
                          (0, r.jsx)(d.L, { children: "Token ID" }),
                          (0, r.jsx)(d.V, { children: i.tokenId.toString() }),
                        ],
                      }),
                  ],
                })
              : null,
            "safeBatchTransferFrom" === o &&
              (0, r.jsxs)(r.Fragment, {
                children: [
                  "amounts" in i &&
                    i.amounts &&
                    (0, r.jsxs)(x.R, {
                      children: [
                        (0, r.jsx)(d.L, { children: "Amounts" }),
                        (0, r.jsx)(d.V, { children: i.amounts.join(", ") }),
                      ],
                    }),
                  "tokenIds" in i &&
                    i.tokenIds &&
                    (0, r.jsxs)(x.R, {
                      children: [
                        (0, r.jsx)(d.L, { children: "Token IDs" }),
                        (0, r.jsx)(d.V, { children: i.tokenIds.join(", ") }),
                      ],
                    }),
                ],
              }),
            "approve" === o &&
              i.spender &&
              (0, r.jsxs)(x.R, {
                children: [
                  (0, r.jsx)(d.L, { children: "Spender" }),
                  (0, r.jsx)(d.V, {
                    children: (0, r.jsx)(g.A, {
                      address: i.spender,
                      url: n?.blockExplorers?.default?.url,
                      showCopyIcon: !1,
                    }),
                  }),
                ],
              }),
            ("transferFrom" === o ||
              "safeTransferFrom" === o ||
              "safeBatchTransferFrom" === o) &&
              i.transferFrom &&
              (0, r.jsxs)(x.R, {
                children: [
                  (0, r.jsx)(d.L, { children: "Transferring from" }),
                  (0, r.jsx)(d.V, {
                    children: (0, r.jsx)(g.A, {
                      address: i.transferFrom,
                      url: n?.blockExplorers?.default?.url,
                      showCopyIcon: !1,
                    }),
                  }),
                ],
              }),
            ("transferFrom" === o ||
              "safeTransferFrom" === o ||
              "safeBatchTransferFrom" === o) &&
              i.transferTo &&
              (0, r.jsxs)(x.R, {
                children: [
                  (0, r.jsx)(d.L, { children: "Transferring to" }),
                  (0, r.jsx)(d.V, {
                    children: (0, r.jsx)(g.A, {
                      address: i.transferTo,
                      url: n?.blockExplorers?.default?.url,
                      showCopyIcon: !1,
                    }),
                  }),
                ],
              }),
          ],
        }),
      });
    },
    $ = ({
      variant: e,
      setPreventMaliciousTransaction: n,
      colorScheme: i = "light",
      preventMaliciousTransaction: t,
    }) =>
      "warn" === e
        ? (0, r.jsx)(F, {
            children: (0, r.jsxs)(A.W, {
              theme: i,
              children: [
                (0, r.jsx)("span", {
                  style: { fontWeight: "500" },
                  children: "Warning: Suspicious transaction",
                }),
                (0, r.jsx)("br", {}),
                "This has been flagged as a potentially deceptive request. Approving could put your assets or funds at risk.",
              ],
            }),
          })
        : "error" === e
          ? (0, r.jsx)(r.Fragment, {
              children: (0, r.jsxs)(F, {
                children: [
                  (0, r.jsx)(L.E, {
                    theme: i,
                    children: (0, r.jsxs)("div", {
                      children: [
                        (0, r.jsx)("strong", {
                          children: "This is a malicious transaction",
                        }),
                        (0, r.jsx)("br", {}),
                        "This transaction transfers tokens to a known malicious address. Proceeding may result in the loss of valuable assets.",
                      ],
                    }),
                  }),
                  (0, r.jsxs)(D, {
                    children: [
                      (0, r.jsx)(T.C, {
                        color: "var(--privy-color-error)",
                        checked: !t,
                        readOnly: !0,
                        onClick: () => n(!t),
                      }),
                      (0, r.jsx)("span", {
                        children: "I understand and want to proceed anyways.",
                      }),
                    ],
                  }),
                ],
              }),
            })
          : null,
    F = a.z.div`
  margin-top: 1.5rem;
`,
    D = a.z.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
`,
    P = ({ transactionIndex: e, maxIndex: r }) =>
      "number" != typeof e || 0 === r ? "" : ` (${e + 1} / ${r + 1})`,
    _ = (0, a.z)(f.W)`
  ${(e) => (e.$useSmallMargins ? "margin-top: 0.5rem;" : "margin-top: 2rem;")}
`,
    H = (0, a.z)(x.a)`
  margin-top: 0.5rem;
  border: 1px solid var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-sm);
  padding: 0.5rem;
`,
    B =
      "There was an error preparing your transaction. Your transaction request will likely fail.",
    U = a.z.div`
  display: flex;
  width: 100%;
  justify-content: center;
  max-height: 40px;

  > img {
    object-fit: contain;
    border-radius: var(--privy-border-radius-sm);
  }
`,
    W = a.z.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`,
    q = a.z.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,
    J = (e) => e?.code === I.$.COMPLIANCE_BLOCKED,
    G = () =>
      (0, r.jsxs)(X, { children: [(0, r.jsx)(ee, {}), (0, r.jsx)(Z, {})] }),
    K = a.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,
    Q = a.z.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.25rem; /* 111.111% */
  text-align: center;
  margin: 10px;
`,
    Y = a.z.span`
  margin-top: 4px;
  margin-bottom: 10px;
  color: var(--privy-color-foreground-3);
  text-align: center;

  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.008px;
`,
    X = a.z.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`,
    Z = (0, a.z)(C.f)`
  position: absolute;
  width: 35px;
  height: 35px;
  color: var(--privy-color-error);
`,
    ee = a.z.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--privy-color-error);
  opacity: 0.1;
`,
    er = (0, a.z)(l.P)`
  && {
    margin-top: 24px;
  }
  transition:
    color 350ms ease,
    background-color 350ms ease;
`,
    en = a.z.span`
  width: 100%;
  text-align: left;
  font-size: 0.825rem;
  color: var(--privy-color-foreground);
  padding: 4px;
`,
    ei = a.z.div`
  width: 100%;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`,
    et = a.z.text`
  position: relative;
  width: 100%;
  padding: 5px;
  font-size: 0.8rem;
  color: var(--privy-color-foreground-3);
  text-align: left;
  overflow-wrap: break-word;
`,
    es = a.z.span`
  position: relative;
  width: 100%;
  background-color: var(--privy-color-background-2);
  padding: 8px 12px;
  border-radius: 10px;
  margin-top: 5px;
  font-size: 14px;
  color: var(--privy-color-foreground-3);
  text-align: left;
  overflow-wrap: break-word;
  ${(e) => e.$clickable && "cursor: pointer;\n  transition: background-color 0.3s;\n  padding-right: 45px;\n\n  &:hover {\n    background-color: var(--privy-color-foreground-4);\n  }"}
`,
    ea = (0, a.z)(S)`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 24px;
  height: 24px;
`,
    eo = (0, a.z)(R.f)`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 24px;
  height: 24px;
`,
    el = ({ clicked: e }) => (0, r.jsx)(e ? eo : ea, {});
  e.s(
    [
      "S",
      0,
      ({
        img: e,
        submitError: a,
        prepareError: o,
        onClose: p,
        action: f,
        title: w,
        subtitle: b,
        to: k,
        tokenAddress: T,
        network: L,
        missingFunds: A,
        fee: R,
        from: S,
        cta: C,
        disabled: I,
        chain: E,
        isSubmitting: z,
        isPreparing: M,
        isTokenPriceLoading: O,
        isTokenContractInfoLoading: F,
        isSponsored: D,
        symbol: H,
        balance: J,
        onClick: G,
        transactionDetails: K,
        transactionIndex: Q,
        maxIndex: Y,
        onBack: X,
        chainName: Z,
        validation: ee,
        hasScanDetails: er,
        setIsScanDetailsOpen: en,
        preventMaliciousTransaction: ei,
        setPreventMaliciousTransaction: et,
        tokensSent: es,
        tokensReceived: ea,
        isScanning: eo,
        isCancellable: el,
        functionName: ec,
      }) => {
        let {
            showTransactionDetails: ed,
            setShowTransactionDetails: eh,
            hasMoreDetails: ex,
            isErc20Ish: eu,
          } = ((e) => {
            let [r, i] = (0, n.useState)(!1),
              t = !0,
              s = !1;
            return (
              (!e || e.isErc20Ish || "transaction" === e.action) && (t = !1),
              t &&
                (s = Object.entries(e || {}).some(
                  ([e, r]) =>
                    r && !["action", "isErc20Ish", "isNFTIsh"].includes(e),
                )),
              {
                showTransactionDetails: r,
                setShowTransactionDetails: i,
                hasMoreDetails: t && s,
                isErc20Ish: e?.isErc20Ish,
              }
            );
          })(K),
          ep = (0, y.a)(),
          em = (eu && F) || M || O || eo;
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(l.M, { onClose: p, backFn: X }),
            e && (0, r.jsx)(U, { children: e }),
            (0, r.jsxs)(j.T, {
              style: { marginTop: e ? "1.5rem" : 0 },
              children: [
                w,
                (0, r.jsx)(P, { maxIndex: Y, transactionIndex: Q }),
              ],
            }),
            (0, r.jsx)(m.S, { children: b }),
            (0, r.jsxs)(x.a, {
              style: { marginTop: "2rem" },
              children: [
                (!!es[0] || em) &&
                  (0, r.jsxs)(x.R, {
                    children: [
                      ea.length > 0
                        ? (0, r.jsx)(d.L, { children: "Send" })
                        : (0, r.jsx)(d.L, {
                            children:
                              "approve" === f ? "Approval amount" : "Amount",
                          }),
                      (0, r.jsx)("div", {
                        className: "flex flex-col",
                        children: es.map((e, n) =>
                          (0, r.jsx)(
                            V,
                            {
                              iconUrl: e.iconUrl,
                              value:
                                "setApprovalForAll" === ec ? "All" : e.value,
                              usdValue: e.usdValue,
                              symbol: e.symbol,
                              nftName: e.nftName,
                              nftCount: e.nftCount,
                              decimals: e.decimals,
                            },
                            n,
                          ),
                        ),
                      }),
                    ],
                  }),
                ea.length > 0 &&
                  (0, r.jsxs)(x.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "Receive" }),
                      (0, r.jsx)("div", {
                        className: "flex flex-col",
                        children: ea.map((e, n) =>
                          (0, r.jsx)(
                            V,
                            {
                              iconUrl: e.iconUrl,
                              value: e.value,
                              usdValue: e.usdValue,
                              symbol: e.symbol,
                              nftName: e.nftName,
                              nftCount: e.nftCount,
                              decimals: e.decimals,
                            },
                            n,
                          ),
                        ),
                      }),
                    ],
                  }),
                K && "spender" in K && K?.spender
                  ? (0, r.jsxs)(x.R, {
                      children: [
                        (0, r.jsx)(d.L, { children: "Spender" }),
                        (0, r.jsx)(d.V, {
                          children: (0, r.jsx)(g.A, {
                            address: K.spender,
                            url: E?.blockExplorers?.default?.url,
                          }),
                        }),
                      ],
                    })
                  : null,
                k &&
                  (0, r.jsxs)(x.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "To" }),
                      (0, r.jsx)(d.V, {
                        children: (0, r.jsx)(g.A, {
                          address: k,
                          url: E?.blockExplorers?.default?.url,
                          showCopyIcon: !0,
                        }),
                      }),
                    ],
                  }),
                T &&
                  (0, r.jsxs)(x.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "Token address" }),
                      (0, r.jsx)(d.V, {
                        children: (0, r.jsx)(g.A, {
                          address: T,
                          url: E?.blockExplorers?.default?.url,
                        }),
                      }),
                    ],
                  }),
                (0, r.jsxs)(x.R, {
                  children: [
                    (0, r.jsx)(d.L, { children: "Network" }),
                    (0, r.jsx)(d.V, { children: L }),
                  ],
                }),
                (0, r.jsxs)(x.R, {
                  children: [
                    (0, r.jsx)(d.L, { children: "Estimated fee" }),
                    (0, r.jsx)(d.V, {
                      $isLoading: M || O || void 0 === D,
                      children: D
                        ? (0, r.jsxs)(W, {
                            children: [
                              (0, r.jsxs)(q, {
                                children: ["Sponsored by ", ep.name],
                              }),
                              (0, r.jsx)(i, { height: 16, width: 16 }),
                            ],
                          })
                        : R,
                    }),
                  ],
                }),
                ex &&
                  !er &&
                  (0, r.jsxs)(r.Fragment, {
                    children: [
                      (0, r.jsx)(x.R, {
                        className: "cursor-pointer",
                        onClick: () => eh(!ed),
                        children: (0, r.jsxs)(d.a, {
                          className: "flex items-center gap-x-1",
                          children: [
                            "Details",
                            " ",
                            (0, r.jsx)(s.f, {
                              style: {
                                width: "0.75rem",
                                marginLeft: "0.25rem",
                                transform: ed ? "rotate(180deg)" : void 0,
                              },
                            }),
                          ],
                        }),
                      }),
                      ed &&
                        K &&
                        (0, r.jsx)(N, {
                          action: f,
                          chain: E,
                          transactionDetails: K,
                          isTokenContractInfoLoading: F,
                          symbol: H,
                        }),
                    ],
                  }),
                er &&
                  (0, r.jsx)(x.R, {
                    children: (0, r.jsxs)(h, {
                      onClick: () => en(!0),
                      children: [
                        (0, r.jsx)("span", {
                          className: "text-color-primary",
                          children: "Details",
                        }),
                        (0, r.jsx)(t, {
                          height: "14px",
                          width: "14px",
                          strokeWidth: "2",
                        }),
                      ],
                    }),
                  }),
              ],
            }),
            (0, r.jsx)(v.G, {}),
            a
              ? (0, r.jsx)(u.E, {
                  style: { marginTop: "2rem" },
                  children: a.message,
                })
              : o && 0 === Q
                ? (0, r.jsx)(u.E, {
                    style: { marginTop: "2rem" },
                    children: o.shortMessage ?? B,
                  })
                : null,
            (0, r.jsx)($, {
              variant: ee,
              preventMaliciousTransaction: ei,
              setPreventMaliciousTransaction: et,
            }),
            (0, r.jsx)(_, {
              $useSmallMargins: !(!o && !a && "warn" !== ee && "error" !== ee),
              address: S,
              balance: J,
              errMsg:
                M || o || a || !A
                  ? void 0
                  : `Add funds on ${E?.name ?? Z} to complete transaction.`,
            }),
            (0, r.jsx)(l.P, {
              style: { marginTop: "1rem" },
              loading: z,
              disabled: I || M,
              onClick: G,
              children: C,
            }),
            el &&
              (0, r.jsx)(l.E, {
                style: { marginTop: "1rem" },
                onClick: p,
                isSubmitting: !1,
                children: "Not now",
              }),
            (0, r.jsx)(c.B, {}),
          ],
        });
      },
      "T",
      0,
      ({
        transactionError: e,
        chainId: i,
        onClose: t,
        onRetry: s,
        chainType: a,
        transactionHash: o,
      }) => {
        let { chains: d } = (0, E.u)(),
          [h, x] = (0, n.useState)(!1),
          { errorCode: u, errorMessage: p } = ((e, r) => {
            if ("ethereum" === r)
              return J(e)
                ? { errorCode: "Transaction blocked", errorMessage: e.message }
                : {
                    errorCode: e.details ?? e.message,
                    errorMessage: e.shortMessage,
                  };
            let n = e.txSignature,
              i = e?.transactionMessage || "Something went wrong.";
            if (Array.isArray(e.logs)) {
              let r = e.logs.find((e) =>
                /insufficient (lamports|funds)/gi.test(e),
              );
              r && (i = r);
            }
            return { transactionHash: n, errorMessage: i };
          })(e, a),
          m = J(e),
          j = (({
            chains: e,
            chainId: r,
            chainType: n,
            transactionHash: i,
          }) => {
            var t;
            return "ethereum" === n
              ? (e.find((e) => e.id === r)?.blockExplorers?.default.url ??
                  "https://etherscan.io")
              : ((t = i || ""),
                `https://explorer.solana.com/tx/${t}?chain=${r}`);
          })({ chains: d, chainId: i, chainType: a, transactionHash: o });
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(l.M, { onClose: t }),
            (0, r.jsxs)(K, {
              children: [
                (0, r.jsx)(G, {}),
                (0, r.jsx)(Q, { children: u }),
                (0, r.jsx)(Y, {
                  children: m
                    ? "This transaction cannot be completed."
                    : "Please try again.",
                }),
                (0, r.jsxs)(ei, {
                  children: [
                    (0, r.jsx)(en, { children: "Error message" }),
                    (0, r.jsx)(es, { $clickable: !1, children: p }),
                  ],
                }),
                o &&
                  (0, r.jsxs)(ei, {
                    children: [
                      (0, r.jsx)(en, { children: "Transaction hash" }),
                      (0, r.jsxs)(et, {
                        children: [
                          "Copy this hash to view details about the transaction on a",
                          " ",
                          (0, r.jsx)("u", {
                            children: (0, r.jsx)("a", {
                              href: j,
                              children: "block explorer",
                            }),
                          }),
                          ".",
                        ],
                      }),
                      (0, r.jsxs)(es, {
                        $clickable: !0,
                        onClick: async () => {
                          (await navigator.clipboard.writeText(o), x(!0));
                        },
                        children: [o, (0, r.jsx)(el, { clicked: h })],
                      }),
                    ],
                  }),
                !m &&
                  (0, r.jsx)(er, {
                    onClick: () => s({ resetNonce: !!o }),
                    children: "Retry transaction",
                  }),
              ],
            }),
            (0, r.jsx)(c.M, {}),
          ],
        });
      },
      "a",
      0,
      ({
        img: e,
        title: t,
        subtitle: a,
        cta: f,
        instructions: w,
        network: b,
        blockExplorerUrl: k,
        isMissingFunds: T,
        submitError: L,
        parseError: A,
        total: R,
        swap: S,
        transactingWalletAddress: C,
        fee: I,
        balance: E,
        disabled: V,
        isSubmitting: z,
        isPreparing: M,
        isTokenPriceLoading: O,
        onClick: N,
        onClose: $,
        onBack: F,
        isSponsored: D,
      }) => {
        let P = M || O,
          [J, G] = (0, n.useState)(!1),
          K = (0, y.a)();
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(l.M, { onClose: $, backFn: F }),
            e && (0, r.jsx)(U, { children: e }),
            (0, r.jsx)(j.T, {
              style: { marginTop: e ? "1.5rem" : 0 },
              children: t,
            }),
            (0, r.jsx)(m.S, { children: a }),
            (0, r.jsxs)(x.a, {
              style: { marginTop: "2rem", marginBottom: ".5rem" },
              children: [
                (R || P) &&
                  (0, r.jsxs)(x.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "Amount" }),
                      (0, r.jsx)(d.V, { $isLoading: P, children: R }),
                    ],
                  }),
                S &&
                  (0, r.jsxs)(x.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "Swap" }),
                      (0, r.jsx)(d.V, { children: S }),
                    ],
                  }),
                b &&
                  (0, r.jsxs)(x.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "Network" }),
                      (0, r.jsx)(d.V, { children: b }),
                    ],
                  }),
                (I || P || void 0 !== D) &&
                  (0, r.jsxs)(x.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "Estimated fee" }),
                      (0, r.jsx)(d.V, {
                        $isLoading: P,
                        children:
                          D && !P
                            ? (0, r.jsxs)(W, {
                                children: [
                                  (0, r.jsxs)(q, {
                                    children: ["Sponsored by ", K.name],
                                  }),
                                  (0, r.jsx)(i, { height: 16, width: 16 }),
                                ],
                              })
                            : I,
                      }),
                    ],
                  }),
              ],
            }),
            (0, r.jsx)(x.R, {
              children: (0, r.jsxs)(h, {
                onClick: () => G((e) => !e),
                children: [
                  (0, r.jsx)("span", { children: "Advanced" }),
                  (0, r.jsx)(s.f, {
                    height: "16px",
                    width: "16px",
                    strokeWidth: "2",
                    style: {
                      transition: "all 300ms",
                      transform: J ? "rotate(180deg)" : void 0,
                    },
                  }),
                ],
              }),
            }),
            J &&
              (0, r.jsx)(r.Fragment, {
                children: w.map((e, n) =>
                  "sol-transfer" === e.type
                    ? (0, r.jsxs)(
                        H,
                        {
                          children: [
                            (0, r.jsx)(x.R, {
                              children: (0, r.jsxs)(p.L, {
                                children: [
                                  "Transfer ",
                                  e.withSeed ? "with seed" : "",
                                ],
                              }),
                            }),
                            (0, r.jsxs)(x.R, {
                              children: [
                                (0, r.jsx)(d.L, { children: "Amount" }),
                                (0, r.jsxs)(d.V, {
                                  children: [
                                    (0, o.e)({
                                      amount: e.value,
                                      decimals: e.token.decimals,
                                    }),
                                    " ",
                                    e.token.symbol,
                                  ],
                                }),
                              ],
                            }),
                            !!e.toAccount &&
                              (0, r.jsxs)(x.R, {
                                children: [
                                  (0, r.jsx)(d.L, { children: "Destination" }),
                                  (0, r.jsx)(d.V, {
                                    children: (0, r.jsx)(g.A, {
                                      address: e.toAccount,
                                      url: k,
                                    }),
                                  }),
                                ],
                              }),
                          ],
                        },
                        n,
                      )
                    : "spl-transfer" === e.type
                      ? (0, r.jsxs)(
                          H,
                          {
                            children: [
                              (0, r.jsx)(x.R, {
                                children: (0, r.jsxs)(p.L, {
                                  children: ["Transfer ", e.token.symbol],
                                }),
                              }),
                              (0, r.jsxs)(x.R, {
                                children: [
                                  (0, r.jsx)(d.L, { children: "Amount" }),
                                  (0, r.jsx)(d.V, {
                                    children: e.value.toString(),
                                  }),
                                ],
                              }),
                              !!e.fromAta &&
                                (0, r.jsxs)(x.R, {
                                  children: [
                                    (0, r.jsx)(d.L, { children: "Source" }),
                                    (0, r.jsx)(d.V, {
                                      children: (0, r.jsx)(g.A, {
                                        address: e.fromAta,
                                        url: k,
                                      }),
                                    }),
                                  ],
                                }),
                              !!e.toAta &&
                                (0, r.jsxs)(x.R, {
                                  children: [
                                    (0, r.jsx)(d.L, {
                                      children: "Destination",
                                    }),
                                    (0, r.jsx)(d.V, {
                                      children: (0, r.jsx)(g.A, {
                                        address: e.toAta,
                                        url: k,
                                      }),
                                    }),
                                  ],
                                }),
                              !!e.token.address &&
                                (0, r.jsxs)(x.R, {
                                  children: [
                                    (0, r.jsx)(d.L, { children: "Token" }),
                                    (0, r.jsx)(d.V, {
                                      children: (0, r.jsx)(g.A, {
                                        address: e.token.address,
                                        url: k,
                                      }),
                                    }),
                                  ],
                                }),
                            ],
                          },
                          n,
                        )
                      : "ata-creation" === e.type
                        ? (0, r.jsxs)(
                            H,
                            {
                              children: [
                                (0, r.jsx)(x.R, {
                                  children: (0, r.jsx)(p.L, {
                                    children: "Create token account",
                                  }),
                                }),
                                (0, r.jsxs)(x.R, {
                                  children: [
                                    (0, r.jsx)(d.L, { children: "Program ID" }),
                                    (0, r.jsx)(d.V, {
                                      children: (0, r.jsx)(g.A, {
                                        address: e.program,
                                        url: k,
                                      }),
                                    }),
                                  ],
                                }),
                                !!e.owner &&
                                  (0, r.jsxs)(x.R, {
                                    children: [
                                      (0, r.jsx)(d.L, { children: "Owner" }),
                                      (0, r.jsx)(d.V, {
                                        children: (0, r.jsx)(g.A, {
                                          address: e.owner,
                                          url: k,
                                        }),
                                      }),
                                    ],
                                  }),
                              ],
                            },
                            n,
                          )
                        : "create-account" === e.type
                          ? (0, r.jsxs)(
                              H,
                              {
                                children: [
                                  (0, r.jsx)(x.R, {
                                    children: (0, r.jsxs)(p.L, {
                                      children: [
                                        "Create account ",
                                        e.withSeed ? "with seed" : "",
                                      ],
                                    }),
                                  }),
                                  !!e.account &&
                                    (0, r.jsxs)(x.R, {
                                      children: [
                                        (0, r.jsx)(d.L, {
                                          children: "Account",
                                        }),
                                        (0, r.jsx)(d.V, {
                                          children: (0, r.jsx)(g.A, {
                                            address: e.account,
                                            url: k,
                                          }),
                                        }),
                                      ],
                                    }),
                                  (0, r.jsxs)(x.R, {
                                    children: [
                                      (0, r.jsx)(d.L, { children: "Amount" }),
                                      (0, r.jsxs)(d.V, {
                                        children: [
                                          (0, o.e)({
                                            amount: e.value,
                                            decimals: 9,
                                          }),
                                          " SOL",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              n,
                            )
                          : "spl-init-account" === e.type
                            ? (0, r.jsxs)(
                                H,
                                {
                                  children: [
                                    (0, r.jsx)(x.R, {
                                      children: (0, r.jsx)(p.L, {
                                        children: "Initialize token account",
                                      }),
                                    }),
                                    !!e.account &&
                                      (0, r.jsxs)(x.R, {
                                        children: [
                                          (0, r.jsx)(d.L, {
                                            children: "Account",
                                          }),
                                          (0, r.jsx)(d.V, {
                                            children: (0, r.jsx)(g.A, {
                                              address: e.account,
                                              url: k,
                                            }),
                                          }),
                                        ],
                                      }),
                                    !!e.mint &&
                                      (0, r.jsxs)(x.R, {
                                        children: [
                                          (0, r.jsx)(d.L, { children: "Mint" }),
                                          (0, r.jsx)(d.V, {
                                            children: (0, r.jsx)(g.A, {
                                              address: e.mint,
                                              url: k,
                                            }),
                                          }),
                                        ],
                                      }),
                                    !!e.owner &&
                                      (0, r.jsxs)(x.R, {
                                        children: [
                                          (0, r.jsx)(d.L, {
                                            children: "Owner",
                                          }),
                                          (0, r.jsx)(d.V, {
                                            children: (0, r.jsx)(g.A, {
                                              address: e.owner,
                                              url: k,
                                            }),
                                          }),
                                        ],
                                      }),
                                  ],
                                },
                                n,
                              )
                            : "spl-close-account" === e.type
                              ? (0, r.jsxs)(
                                  H,
                                  {
                                    children: [
                                      (0, r.jsx)(x.R, {
                                        children: (0, r.jsx)(p.L, {
                                          children: "Close token account",
                                        }),
                                      }),
                                      !!e.source &&
                                        (0, r.jsxs)(x.R, {
                                          children: [
                                            (0, r.jsx)(d.L, {
                                              children: "Source",
                                            }),
                                            (0, r.jsx)(d.V, {
                                              children: (0, r.jsx)(g.A, {
                                                address: e.source,
                                                url: k,
                                              }),
                                            }),
                                          ],
                                        }),
                                      !!e.destination &&
                                        (0, r.jsxs)(x.R, {
                                          children: [
                                            (0, r.jsx)(d.L, {
                                              children: "Destination",
                                            }),
                                            (0, r.jsx)(d.V, {
                                              children: (0, r.jsx)(g.A, {
                                                address: e.destination,
                                                url: k,
                                              }),
                                            }),
                                          ],
                                        }),
                                      !!e.owner &&
                                        (0, r.jsxs)(x.R, {
                                          children: [
                                            (0, r.jsx)(d.L, {
                                              children: "Owner",
                                            }),
                                            (0, r.jsx)(d.V, {
                                              children: (0, r.jsx)(g.A, {
                                                address: e.owner,
                                                url: k,
                                              }),
                                            }),
                                          ],
                                        }),
                                    ],
                                  },
                                  n,
                                )
                              : "spl-sync-native" === e.type
                                ? (0, r.jsxs)(
                                    H,
                                    {
                                      children: [
                                        (0, r.jsx)(x.R, {
                                          children: (0, r.jsx)(p.L, {
                                            children: "Sync native",
                                          }),
                                        }),
                                        (0, r.jsxs)(x.R, {
                                          children: [
                                            (0, r.jsx)(d.L, {
                                              children: "Program ID",
                                            }),
                                            (0, r.jsx)(d.V, {
                                              children: (0, r.jsx)(g.A, {
                                                address: e.program,
                                                url: k,
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    n,
                                  )
                                : "raydium-swap-base-input" === e.type
                                  ? (0, r.jsxs)(
                                      H,
                                      {
                                        children: [
                                          (0, r.jsx)(x.R, {
                                            children: (0, r.jsxs)(p.L, {
                                              children: [
                                                "Raydium swap",
                                                " ",
                                                e.tokenIn && e.tokenOut
                                                  ? `${e.tokenIn.symbol} → ${e.tokenOut.symbol}`
                                                  : "",
                                              ],
                                            }),
                                          }),
                                          (0, r.jsxs)(x.R, {
                                            children: [
                                              (0, r.jsx)(d.L, {
                                                children: "Amount in",
                                              }),
                                              (0, r.jsx)(d.V, {
                                                children: e.amountIn.toString(),
                                              }),
                                            ],
                                          }),
                                          (0, r.jsxs)(x.R, {
                                            children: [
                                              (0, r.jsx)(d.L, {
                                                children: "Minimum amount out",
                                              }),
                                              (0, r.jsx)(d.V, {
                                                children:
                                                  e.minimumAmountOut.toString(),
                                              }),
                                            ],
                                          }),
                                          e.mintIn &&
                                            (0, r.jsxs)(x.R, {
                                              children: [
                                                (0, r.jsx)(d.L, {
                                                  children: "Token in",
                                                }),
                                                (0, r.jsx)(d.V, {
                                                  children: (0, r.jsx)(g.A, {
                                                    address: e.mintIn,
                                                    url: k,
                                                  }),
                                                }),
                                              ],
                                            }),
                                          e.mintOut &&
                                            (0, r.jsxs)(x.R, {
                                              children: [
                                                (0, r.jsx)(d.L, {
                                                  children: "Token out",
                                                }),
                                                (0, r.jsx)(d.V, {
                                                  children: (0, r.jsx)(g.A, {
                                                    address: e.mintOut,
                                                    url: k,
                                                  }),
                                                }),
                                              ],
                                            }),
                                        ],
                                      },
                                      n,
                                    )
                                  : "raydium-swap-base-output" === e.type
                                    ? (0, r.jsxs)(
                                        H,
                                        {
                                          children: [
                                            (0, r.jsx)(x.R, {
                                              children: (0, r.jsxs)(p.L, {
                                                children: [
                                                  "Raydium swap",
                                                  " ",
                                                  e.tokenIn && e.tokenOut
                                                    ? `${e.tokenIn.symbol} → ${e.tokenOut.symbol}`
                                                    : "",
                                                ],
                                              }),
                                            }),
                                            (0, r.jsxs)(x.R, {
                                              children: [
                                                (0, r.jsx)(d.L, {
                                                  children: "Max amount in",
                                                }),
                                                (0, r.jsx)(d.V, {
                                                  children:
                                                    e.maxAmountIn.toString(),
                                                }),
                                              ],
                                            }),
                                            (0, r.jsxs)(x.R, {
                                              children: [
                                                (0, r.jsx)(d.L, {
                                                  children: "Amount out",
                                                }),
                                                (0, r.jsx)(d.V, {
                                                  children:
                                                    e.amountOut.toString(),
                                                }),
                                              ],
                                            }),
                                            e.mintIn &&
                                              (0, r.jsxs)(x.R, {
                                                children: [
                                                  (0, r.jsx)(d.L, {
                                                    children: "Token in",
                                                  }),
                                                  (0, r.jsx)(d.V, {
                                                    children: (0, r.jsx)(g.A, {
                                                      address: e.mintIn,
                                                      url: k,
                                                    }),
                                                  }),
                                                ],
                                              }),
                                            e.mintOut &&
                                              (0, r.jsxs)(x.R, {
                                                children: [
                                                  (0, r.jsx)(d.L, {
                                                    children: "Token out",
                                                  }),
                                                  (0, r.jsx)(d.V, {
                                                    children: (0, r.jsx)(g.A, {
                                                      address: e.mintOut,
                                                      url: k,
                                                    }),
                                                  }),
                                                ],
                                              }),
                                          ],
                                        },
                                        n,
                                      )
                                    : "jupiter-swap-shared-accounts-route" ===
                                        e.type
                                      ? (0, r.jsxs)(
                                          H,
                                          {
                                            children: [
                                              (0, r.jsx)(x.R, {
                                                children: (0, r.jsxs)(p.L, {
                                                  children: [
                                                    "Jupiter swap",
                                                    " ",
                                                    e.tokenIn && e.tokenOut
                                                      ? `${e.tokenIn.symbol} → ${e.tokenOut.symbol}`
                                                      : "",
                                                  ],
                                                }),
                                              }),
                                              (0, r.jsxs)(x.R, {
                                                children: [
                                                  (0, r.jsx)(d.L, {
                                                    children: "In amount",
                                                  }),
                                                  (0, r.jsx)(d.V, {
                                                    children:
                                                      e.inAmount.toString(),
                                                  }),
                                                ],
                                              }),
                                              (0, r.jsxs)(x.R, {
                                                children: [
                                                  (0, r.jsx)(d.L, {
                                                    children:
                                                      "Quoted out amount",
                                                  }),
                                                  (0, r.jsx)(d.V, {
                                                    children:
                                                      e.quotedOutAmount.toString(),
                                                  }),
                                                ],
                                              }),
                                              e.mintIn &&
                                                (0, r.jsxs)(x.R, {
                                                  children: [
                                                    (0, r.jsx)(d.L, {
                                                      children: "Token in",
                                                    }),
                                                    (0, r.jsx)(d.V, {
                                                      children: (0, r.jsx)(
                                                        g.A,
                                                        {
                                                          address: e.mintIn,
                                                          url: k,
                                                        },
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              e.mintOut &&
                                                (0, r.jsxs)(x.R, {
                                                  children: [
                                                    (0, r.jsx)(d.L, {
                                                      children: "Token out",
                                                    }),
                                                    (0, r.jsx)(d.V, {
                                                      children: (0, r.jsx)(
                                                        g.A,
                                                        {
                                                          address: e.mintOut,
                                                          url: k,
                                                        },
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                            ],
                                          },
                                          n,
                                        )
                                      : "jupiter-swap-exact-out-route" ===
                                          e.type
                                        ? (0, r.jsxs)(
                                            H,
                                            {
                                              children: [
                                                (0, r.jsx)(x.R, {
                                                  children: (0, r.jsxs)(p.L, {
                                                    children: [
                                                      "Jupiter swap",
                                                      " ",
                                                      e.tokenIn && e.tokenOut
                                                        ? `${e.tokenIn.symbol} → ${e.tokenOut.symbol}`
                                                        : "",
                                                    ],
                                                  }),
                                                }),
                                                (0, r.jsxs)(x.R, {
                                                  children: [
                                                    (0, r.jsx)(d.L, {
                                                      children:
                                                        "Quoted in amount",
                                                    }),
                                                    (0, r.jsx)(d.V, {
                                                      children:
                                                        e.quotedInAmount.toString(),
                                                    }),
                                                  ],
                                                }),
                                                (0, r.jsxs)(x.R, {
                                                  children: [
                                                    (0, r.jsx)(d.L, {
                                                      children: "Amount out",
                                                    }),
                                                    (0, r.jsx)(d.V, {
                                                      children:
                                                        e.outAmount.toString(),
                                                    }),
                                                  ],
                                                }),
                                                e.mintIn &&
                                                  (0, r.jsxs)(x.R, {
                                                    children: [
                                                      (0, r.jsx)(d.L, {
                                                        children: "Token in",
                                                      }),
                                                      (0, r.jsx)(d.V, {
                                                        children: (0, r.jsx)(
                                                          g.A,
                                                          {
                                                            address: e.mintIn,
                                                            url: k,
                                                          },
                                                        ),
                                                      }),
                                                    ],
                                                  }),
                                                e.mintOut &&
                                                  (0, r.jsxs)(x.R, {
                                                    children: [
                                                      (0, r.jsx)(d.L, {
                                                        children: "Token out",
                                                      }),
                                                      (0, r.jsx)(d.V, {
                                                        children: (0, r.jsx)(
                                                          g.A,
                                                          {
                                                            address: e.mintOut,
                                                            url: k,
                                                          },
                                                        ),
                                                      }),
                                                    ],
                                                  }),
                                              ],
                                            },
                                            n,
                                          )
                                        : (0, r.jsxs)(
                                            H,
                                            {
                                              children: [
                                                (0, r.jsxs)(x.R, {
                                                  children: [
                                                    (0, r.jsx)(d.L, {
                                                      children: "Program ID",
                                                    }),
                                                    (0, r.jsx)(d.V, {
                                                      children: (0, r.jsx)(
                                                        g.A,
                                                        {
                                                          address: e.program,
                                                          url: k,
                                                        },
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                                (0, r.jsxs)(x.R, {
                                                  children: [
                                                    (0, r.jsx)(d.L, {
                                                      children: "Data",
                                                    }),
                                                    (0, r.jsx)(d.V, {
                                                      children: e.discriminator,
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            },
                                            n,
                                          ),
                ),
              }),
            (0, r.jsx)(v.G, {}),
            L
              ? (0, r.jsx)(u.E, {
                  style: { marginTop: "2rem" },
                  children: L.message,
                })
              : A
                ? (0, r.jsx)(u.E, { style: { marginTop: "2rem" }, children: B })
                : null,
            (0, r.jsx)(_, {
              $useSmallMargins: !(!A && !L),
              title: "",
              address: C,
              balance: E,
              errMsg:
                M || A || L || !T
                  ? void 0
                  : "Add funds on Solana to complete transaction.",
            }),
            (0, r.jsx)(l.P, {
              style: { marginTop: "1rem" },
              loading: z,
              disabled: V || M,
              onClick: N,
              children: f,
            }),
            (0, r.jsx)(c.B, {}),
          ],
        });
      },
    ],
    494982,
  );
};
