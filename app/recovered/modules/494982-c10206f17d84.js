// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(352386);
  let o = i.forwardRef(function ({ title: e, titleId: r, ...o }, n) {
      return i.createElement(
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
            ref: n,
            "aria-labelledby": r,
          },
          o,
        ),
        e ? i.createElement("title", { id: r }, e) : null,
        i.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
        }),
      );
    }),
    n = i.forwardRef(function ({ title: e, titleId: r, ...o }, n) {
      return i.createElement(
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
            ref: n,
            "aria-labelledby": r,
          },
          o,
        ),
        e ? i.createElement("title", { id: r }, e) : null,
        i.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3",
        }),
      );
    });
  var t = e.i(84410),
    t = t,
    a = e.i(689391),
    s = e.i(42799),
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
  var p = e.i(39174),
    x = e.i(294882),
    u = e.i(744894),
    g = e.i(205212),
    v = e.i(850876),
    m = e.i(950268),
    f = e.i(440527),
    j = e.i(933185),
    y = e.i(315430),
    b = e.i(949894),
    w = e.i(858042),
    k = e.i(691416),
    z = e.i(105928),
    T = e.i(746549),
    L = e.i(446356),
    C = e.i(171762);
  let A = i.forwardRef(function ({ title: e, titleId: r, ...o }, n) {
    return i.createElement(
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
          ref: n,
          "aria-labelledby": r,
        },
        o,
      ),
      e ? i.createElement("title", { id: r }, e) : null,
      i.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z",
      }),
    );
  });
  var S = e.i(924568),
    $ = e.i(256260),
    E = e.i(748117),
    R = ({
      iconUrl: e,
      value: i,
      symbol: o,
      usdValue: n,
      nftName: t,
      nftCount: a,
      decimals: s,
      $isLoading: l,
    }) => {
      if (l) return (0, r.jsx)(I, { $isLoading: l });
      let c =
        i && n && s
          ? (function (e, r, i) {
              let o = parseFloat(e),
                n = parseFloat(i);
              if (0 === o || 0 === n || Number.isNaN(o) || Number.isNaN(n))
                return e;
              let t = Math.ceil(-Math.log10(0.01 / (n / o))),
                a = Math.pow(10, (t = Math.max((t = Math.min(t, r)), 1))),
                s = +(Math.floor(o * a) / a).toFixed(t).replace(/\.?0+$/, "");
              return Intl.NumberFormat(void 0, {
                maximumFractionDigits: r,
              }).format(s);
            })(i, s, n)
          : i;
      return (0, r.jsxs)("div", {
        children: [
          (0, r.jsxs)(I, {
            $isLoading: l,
            children: [
              e && (0, r.jsx)(M, { src: e, alt: "Token icon" }),
              a && a > 1 ? a + "x" : void 0,
              " ",
              t,
              c,
              " ",
              o,
            ],
          }),
          n && (0, r.jsxs)(V, { $isLoading: l, children: ["$", n] }),
        ],
      });
    };
  let I = a.z.span`
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

  ${b.L}
`,
    V = a.z.span`
  color: var(--privy-color-foreground-2);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  word-break: break-all;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  ${b.L}
`,
    M = a.z.img`
  height: 14px;
  width: 14px;
  margin-right: 4px;
  object-fit: contain;
`,
    N = (e) => {
      let {
          chain: i,
          transactionDetails: o,
          isTokenContractInfoLoading: n,
          symbol: t,
        } = e,
        { action: a, functionName: s } = o;
      return (0, r.jsx)(k.B, {
        children: (0, r.jsxs)(p.a, {
          children: [
            "transaction" !== a &&
              (0, r.jsxs)(p.R, {
                children: [
                  (0, r.jsx)(d.L, { children: "Action" }),
                  (0, r.jsx)(d.V, { children: s }),
                ],
              }),
            "mint" === s &&
              "args" in o &&
              o.args
                .filter((e) => e)
                .map((e, o) =>
                  (0, r.jsxs)(
                    p.R,
                    {
                      children: [
                        (0, r.jsx)(d.L, { children: `Param ${o}` }),
                        (0, r.jsx)(d.V, {
                          children:
                            "string" == typeof e && (0, w.f)(e)
                              ? (0, r.jsx)(m.A, {
                                  address: e,
                                  url: i?.blockExplorers?.default?.url,
                                  showCopyIcon: !1,
                                })
                              : e?.toString(),
                        }),
                      ],
                    },
                    o,
                  ),
                ),
            "setApprovalForAll" === s &&
              o.operator &&
              (0, r.jsxs)(p.R, {
                children: [
                  (0, r.jsx)(d.L, { children: "Operator" }),
                  (0, r.jsx)(d.V, {
                    children: (0, r.jsx)(m.A, {
                      address: o.operator,
                      url: i?.blockExplorers?.default?.url,
                      showCopyIcon: !1,
                    }),
                  }),
                ],
              }),
            "setApprovalForAll" === s &&
              void 0 !== o.approved &&
              (0, r.jsxs)(p.R, {
                children: [
                  (0, r.jsx)(d.L, { children: "Set approval to" }),
                  (0, r.jsx)(d.V, { children: o.approved ? "true" : "false" }),
                ],
              }),
            "transfer" === s ||
            "transferWithMemo" === s ||
            "transferFrom" === s ||
            "safeTransferFrom" === s ||
            "approve" === s
              ? (0, r.jsxs)(r.Fragment, {
                  children: [
                    "formattedAmount" in o &&
                      o.formattedAmount &&
                      (0, r.jsxs)(p.R, {
                        children: [
                          (0, r.jsx)(d.L, { children: "Amount" }),
                          (0, r.jsxs)(d.V, {
                            $isLoading: n,
                            children: [o.formattedAmount, " ", t],
                          }),
                        ],
                      }),
                    "tokenId" in o &&
                      o.tokenId &&
                      (0, r.jsxs)(p.R, {
                        children: [
                          (0, r.jsx)(d.L, { children: "Token ID" }),
                          (0, r.jsx)(d.V, { children: o.tokenId.toString() }),
                        ],
                      }),
                  ],
                })
              : null,
            "safeBatchTransferFrom" === s &&
              (0, r.jsxs)(r.Fragment, {
                children: [
                  "amounts" in o &&
                    o.amounts &&
                    (0, r.jsxs)(p.R, {
                      children: [
                        (0, r.jsx)(d.L, { children: "Amounts" }),
                        (0, r.jsx)(d.V, { children: o.amounts.join(", ") }),
                      ],
                    }),
                  "tokenIds" in o &&
                    o.tokenIds &&
                    (0, r.jsxs)(p.R, {
                      children: [
                        (0, r.jsx)(d.L, { children: "Token IDs" }),
                        (0, r.jsx)(d.V, { children: o.tokenIds.join(", ") }),
                      ],
                    }),
                ],
              }),
            "approve" === s &&
              o.spender &&
              (0, r.jsxs)(p.R, {
                children: [
                  (0, r.jsx)(d.L, { children: "Spender" }),
                  (0, r.jsx)(d.V, {
                    children: (0, r.jsx)(m.A, {
                      address: o.spender,
                      url: i?.blockExplorers?.default?.url,
                      showCopyIcon: !1,
                    }),
                  }),
                ],
              }),
            ("transferFrom" === s ||
              "safeTransferFrom" === s ||
              "safeBatchTransferFrom" === s) &&
              o.transferFrom &&
              (0, r.jsxs)(p.R, {
                children: [
                  (0, r.jsx)(d.L, { children: "Transferring from" }),
                  (0, r.jsx)(d.V, {
                    children: (0, r.jsx)(m.A, {
                      address: o.transferFrom,
                      url: i?.blockExplorers?.default?.url,
                      showCopyIcon: !1,
                    }),
                  }),
                ],
              }),
            ("transferFrom" === s ||
              "safeTransferFrom" === s ||
              "safeBatchTransferFrom" === s) &&
              o.transferTo &&
              (0, r.jsxs)(p.R, {
                children: [
                  (0, r.jsx)(d.L, { children: "Transferring to" }),
                  (0, r.jsx)(d.V, {
                    children: (0, r.jsx)(m.A, {
                      address: o.transferTo,
                      url: i?.blockExplorers?.default?.url,
                      showCopyIcon: !1,
                    }),
                  }),
                ],
              }),
          ],
        }),
      });
    },
    F = ({
      variant: e,
      setPreventMaliciousTransaction: i,
      colorScheme: o = "light",
      preventMaliciousTransaction: n,
    }) =>
      "warn" === e
        ? (0, r.jsx)(O, {
            children: (0, r.jsxs)(L.W, {
              theme: o,
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
              children: (0, r.jsxs)(O, {
                children: [
                  (0, r.jsx)(T.E, {
                    theme: o,
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
                  (0, r.jsxs)(B, {
                    children: [
                      (0, r.jsx)(z.C, {
                        color: "var(--privy-color-error)",
                        checked: !n,
                        readOnly: !0,
                        onClick: () => i(!n),
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
    O = a.z.div`
  margin-top: 1.5rem;
`,
    B = a.z.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
`,
    P = ({ transactionIndex: e, maxIndex: r }) =>
      "number" != typeof e || 0 === r ? "" : ` (${e + 1} / ${r + 1})`,
    D = (0, a.z)(f.W)`
  ${(e) => (e.$useSmallMargins ? "margin-top: 0.5rem;" : "margin-top: 2rem;")}
`,
    H = (0, a.z)(p.a)`
  margin-top: 0.5rem;
  border: 1px solid var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-sm);
  padding: 0.5rem;
`,
    W =
      "There was an error preparing your transaction. Your transaction request will likely fail.",
    Z = a.z.div`
  display: flex;
  width: 100%;
  justify-content: center;
  max-height: 40px;

  > img {
    object-fit: contain;
    border-radius: var(--privy-border-radius-sm);
  }
`,
    _ = a.z.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`,
    U = a.z.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,
    q = (e) => e?.code === $.$.COMPLIANCE_BLOCKED,
    G = () =>
      (0, r.jsxs)(Y, { children: [(0, r.jsx)(ee, {}), (0, r.jsx)(X, {})] }),
    J = a.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,
    K = a.z.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.25rem; /* 111.111% */
  text-align: center;
  margin: 10px;
`,
    Q = a.z.span`
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
    Y = a.z.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`,
    X = (0, a.z)(S.f)`
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
    ei = a.z.span`
  width: 100%;
  text-align: left;
  font-size: 0.825rem;
  color: var(--privy-color-foreground);
  padding: 4px;
`,
    eo = a.z.div`
  width: 100%;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`,
    en = a.z.text`
  position: relative;
  width: 100%;
  padding: 5px;
  font-size: 0.8rem;
  color: var(--privy-color-foreground-3);
  text-align: left;
  overflow-wrap: break-word;
`,
    et = a.z.span`
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
    ea = (0, a.z)(A)`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 24px;
  height: 24px;
`,
    es = (0, a.z)(C.f)`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 24px;
  height: 24px;
`,
    el = ({ clicked: e }) => (0, r.jsx)(e ? es : ea, {});
  e.s(
    [
      "S",
      0,
      ({
        img: e,
        submitError: a,
        prepareError: s,
        onClose: u,
        action: f,
        title: b,
        subtitle: w,
        to: k,
        tokenAddress: z,
        network: T,
        missingFunds: L,
        fee: C,
        from: A,
        cta: S,
        disabled: $,
        chain: E,
        isSubmitting: I,
        isPreparing: V,
        isTokenPriceLoading: M,
        isTokenContractInfoLoading: O,
        isSponsored: B,
        symbol: H,
        balance: q,
        onClick: G,
        transactionDetails: J,
        transactionIndex: K,
        maxIndex: Q,
        onBack: Y,
        chainName: X,
        validation: ee,
        hasScanDetails: er,
        setIsScanDetailsOpen: ei,
        preventMaliciousTransaction: eo,
        setPreventMaliciousTransaction: en,
        tokensSent: et,
        tokensReceived: ea,
        isScanning: es,
        isCancellable: el,
        functionName: ec,
      }) => {
        let {
            showTransactionDetails: ed,
            setShowTransactionDetails: eh,
            hasMoreDetails: ep,
            isErc20Ish: ex,
          } = ((e) => {
            let [r, o] = (0, i.useState)(!1),
              n = !0,
              t = !1;
            return (
              (!e || e.isErc20Ish || "transaction" === e.action) && (n = !1),
              n &&
                (t = Object.entries(e || {}).some(
                  ([e, r]) =>
                    r && !["action", "isErc20Ish", "isNFTIsh"].includes(e),
                )),
              {
                showTransactionDetails: r,
                setShowTransactionDetails: o,
                hasMoreDetails: n && t,
                isErc20Ish: e?.isErc20Ish,
              }
            );
          })(J),
          eu = (0, j.a)(),
          eg = (ex && O) || V || M || es;
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(l.M, { onClose: u, backFn: Y }),
            e && (0, r.jsx)(Z, { children: e }),
            (0, r.jsxs)(v.T, {
              style: { marginTop: e ? "1.5rem" : 0 },
              children: [
                b,
                (0, r.jsx)(P, { maxIndex: Q, transactionIndex: K }),
              ],
            }),
            (0, r.jsx)(g.S, { children: w }),
            (0, r.jsxs)(p.a, {
              style: { marginTop: "2rem" },
              children: [
                (!!et[0] || eg) &&
                  (0, r.jsxs)(p.R, {
                    children: [
                      ea.length > 0
                        ? (0, r.jsx)(d.L, { children: "Send" })
                        : (0, r.jsx)(d.L, {
                            children:
                              "approve" === f ? "Approval amount" : "Amount",
                          }),
                      (0, r.jsx)("div", {
                        className: "flex flex-col",
                        children: et.map((e, i) =>
                          (0, r.jsx)(
                            R,
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
                            i,
                          ),
                        ),
                      }),
                    ],
                  }),
                ea.length > 0 &&
                  (0, r.jsxs)(p.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "Receive" }),
                      (0, r.jsx)("div", {
                        className: "flex flex-col",
                        children: ea.map((e, i) =>
                          (0, r.jsx)(
                            R,
                            {
                              iconUrl: e.iconUrl,
                              value: e.value,
                              usdValue: e.usdValue,
                              symbol: e.symbol,
                              nftName: e.nftName,
                              nftCount: e.nftCount,
                              decimals: e.decimals,
                            },
                            i,
                          ),
                        ),
                      }),
                    ],
                  }),
                J && "spender" in J && J?.spender
                  ? (0, r.jsxs)(p.R, {
                      children: [
                        (0, r.jsx)(d.L, { children: "Spender" }),
                        (0, r.jsx)(d.V, {
                          children: (0, r.jsx)(m.A, {
                            address: J.spender,
                            url: E?.blockExplorers?.default?.url,
                          }),
                        }),
                      ],
                    })
                  : null,
                k &&
                  (0, r.jsxs)(p.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "To" }),
                      (0, r.jsx)(d.V, {
                        children: (0, r.jsx)(m.A, {
                          address: k,
                          url: E?.blockExplorers?.default?.url,
                          showCopyIcon: !0,
                        }),
                      }),
                    ],
                  }),
                z &&
                  (0, r.jsxs)(p.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "Token address" }),
                      (0, r.jsx)(d.V, {
                        children: (0, r.jsx)(m.A, {
                          address: z,
                          url: E?.blockExplorers?.default?.url,
                        }),
                      }),
                    ],
                  }),
                (0, r.jsxs)(p.R, {
                  children: [
                    (0, r.jsx)(d.L, { children: "Network" }),
                    (0, r.jsx)(d.V, { children: T }),
                  ],
                }),
                (0, r.jsxs)(p.R, {
                  children: [
                    (0, r.jsx)(d.L, { children: "Estimated fee" }),
                    (0, r.jsx)(d.V, {
                      $isLoading: V || M || void 0 === B,
                      children: B
                        ? (0, r.jsxs)(_, {
                            children: [
                              (0, r.jsxs)(U, {
                                children: ["Sponsored by ", eu.name],
                              }),
                              (0, r.jsx)(o, { height: 16, width: 16 }),
                            ],
                          })
                        : C,
                    }),
                  ],
                }),
                ep &&
                  !er &&
                  (0, r.jsxs)(r.Fragment, {
                    children: [
                      (0, r.jsx)(p.R, {
                        className: "cursor-pointer",
                        onClick: () => eh(!ed),
                        children: (0, r.jsxs)(d.a, {
                          className: "flex items-center gap-x-1",
                          children: [
                            "Details",
                            " ",
                            (0, r.jsx)(t.f, {
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
                        J &&
                        (0, r.jsx)(N, {
                          action: f,
                          chain: E,
                          transactionDetails: J,
                          isTokenContractInfoLoading: O,
                          symbol: H,
                        }),
                    ],
                  }),
                er &&
                  (0, r.jsx)(p.R, {
                    children: (0, r.jsxs)(h, {
                      onClick: () => ei(!0),
                      children: [
                        (0, r.jsx)("span", {
                          className: "text-color-primary",
                          children: "Details",
                        }),
                        (0, r.jsx)(n, {
                          height: "14px",
                          width: "14px",
                          strokeWidth: "2",
                        }),
                      ],
                    }),
                  }),
              ],
            }),
            (0, r.jsx)(y.G, {}),
            a
              ? (0, r.jsx)(x.E, {
                  style: { marginTop: "2rem" },
                  children: a.message,
                })
              : s && 0 === K
                ? (0, r.jsx)(x.E, {
                    style: { marginTop: "2rem" },
                    children: s.shortMessage ?? W,
                  })
                : null,
            (0, r.jsx)(F, {
              variant: ee,
              preventMaliciousTransaction: eo,
              setPreventMaliciousTransaction: en,
            }),
            (0, r.jsx)(D, {
              $useSmallMargins: !(!s && !a && "warn" !== ee && "error" !== ee),
              address: A,
              balance: q,
              errMsg:
                V || s || a || !L
                  ? void 0
                  : `Add funds on ${E?.name ?? X} to complete transaction.`,
            }),
            (0, r.jsx)(l.P, {
              style: { marginTop: "1rem" },
              loading: I,
              disabled: $ || V,
              onClick: G,
              children: S,
            }),
            el &&
              (0, r.jsx)(l.E, {
                style: { marginTop: "1rem" },
                onClick: u,
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
        chainId: o,
        onClose: n,
        onRetry: t,
        chainType: a,
        transactionHash: s,
      }) => {
        let { chains: d } = (0, E.u)(),
          [h, p] = (0, i.useState)(!1),
          { errorCode: x, errorMessage: u } = ((e, r) => {
            if ("ethereum" === r)
              return q(e)
                ? { errorCode: "Transaction blocked", errorMessage: e.message }
                : {
                    errorCode: e.details ?? e.message,
                    errorMessage: e.shortMessage,
                  };
            let i = e.txSignature,
              o = e?.transactionMessage || "Something went wrong.";
            if (Array.isArray(e.logs)) {
              let r = e.logs.find((e) =>
                /insufficient (lamports|funds)/gi.test(e),
              );
              r && (o = r);
            }
            return { transactionHash: i, errorMessage: o };
          })(e, a),
          g = q(e),
          v = (({
            chains: e,
            chainId: r,
            chainType: i,
            transactionHash: o,
          }) => {
            var n;
            return "ethereum" === i
              ? (e.find((e) => e.id === r)?.blockExplorers?.default.url ??
                  "https://etherscan.io")
              : ((n = o || ""),
                `https://explorer.solana.com/tx/${n}?chain=${r}`);
          })({ chains: d, chainId: o, chainType: a, transactionHash: s });
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(l.M, { onClose: n }),
            (0, r.jsxs)(J, {
              children: [
                (0, r.jsx)(G, {}),
                (0, r.jsx)(K, { children: x }),
                (0, r.jsx)(Q, {
                  children: g
                    ? "This transaction cannot be completed."
                    : "Please try again.",
                }),
                (0, r.jsxs)(eo, {
                  children: [
                    (0, r.jsx)(ei, { children: "Error message" }),
                    (0, r.jsx)(et, { $clickable: !1, children: u }),
                  ],
                }),
                s &&
                  (0, r.jsxs)(eo, {
                    children: [
                      (0, r.jsx)(ei, { children: "Transaction hash" }),
                      (0, r.jsxs)(en, {
                        children: [
                          "Copy this hash to view details about the transaction on a",
                          " ",
                          (0, r.jsx)("u", {
                            children: (0, r.jsx)("a", {
                              href: v,
                              children: "block explorer",
                            }),
                          }),
                          ".",
                        ],
                      }),
                      (0, r.jsxs)(et, {
                        $clickable: !0,
                        onClick: async () => {
                          (await navigator.clipboard.writeText(s), p(!0));
                        },
                        children: [s, (0, r.jsx)(el, { clicked: h })],
                      }),
                    ],
                  }),
                !g &&
                  (0, r.jsx)(er, {
                    onClick: () => t({ resetNonce: !!s }),
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
        title: n,
        subtitle: a,
        cta: f,
        instructions: b,
        network: w,
        blockExplorerUrl: k,
        isMissingFunds: z,
        submitError: T,
        parseError: L,
        total: C,
        swap: A,
        transactingWalletAddress: S,
        fee: $,
        balance: E,
        disabled: R,
        isSubmitting: I,
        isPreparing: V,
        isTokenPriceLoading: M,
        onClick: N,
        onClose: F,
        onBack: O,
        isSponsored: B,
      }) => {
        let P = V || M,
          [q, G] = (0, i.useState)(!1),
          J = (0, j.a)();
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(l.M, { onClose: F, backFn: O }),
            e && (0, r.jsx)(Z, { children: e }),
            (0, r.jsx)(v.T, {
              style: { marginTop: e ? "1.5rem" : 0 },
              children: n,
            }),
            (0, r.jsx)(g.S, { children: a }),
            (0, r.jsxs)(p.a, {
              style: { marginTop: "2rem", marginBottom: ".5rem" },
              children: [
                (C || P) &&
                  (0, r.jsxs)(p.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "Amount" }),
                      (0, r.jsx)(d.V, { $isLoading: P, children: C }),
                    ],
                  }),
                A &&
                  (0, r.jsxs)(p.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "Swap" }),
                      (0, r.jsx)(d.V, { children: A }),
                    ],
                  }),
                w &&
                  (0, r.jsxs)(p.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "Network" }),
                      (0, r.jsx)(d.V, { children: w }),
                    ],
                  }),
                ($ || P || void 0 !== B) &&
                  (0, r.jsxs)(p.R, {
                    children: [
                      (0, r.jsx)(d.L, { children: "Estimated fee" }),
                      (0, r.jsx)(d.V, {
                        $isLoading: P,
                        children:
                          B && !P
                            ? (0, r.jsxs)(_, {
                                children: [
                                  (0, r.jsxs)(U, {
                                    children: ["Sponsored by ", J.name],
                                  }),
                                  (0, r.jsx)(o, { height: 16, width: 16 }),
                                ],
                              })
                            : $,
                      }),
                    ],
                  }),
              ],
            }),
            (0, r.jsx)(p.R, {
              children: (0, r.jsxs)(h, {
                onClick: () => G((e) => !e),
                children: [
                  (0, r.jsx)("span", { children: "Advanced" }),
                  (0, r.jsx)(t.f, {
                    height: "16px",
                    width: "16px",
                    strokeWidth: "2",
                    style: {
                      transition: "all 300ms",
                      transform: q ? "rotate(180deg)" : void 0,
                    },
                  }),
                ],
              }),
            }),
            q &&
              (0, r.jsx)(r.Fragment, {
                children: b.map((e, i) =>
                  "sol-transfer" === e.type
                    ? (0, r.jsxs)(
                        H,
                        {
                          children: [
                            (0, r.jsx)(p.R, {
                              children: (0, r.jsxs)(u.L, {
                                children: [
                                  "Transfer ",
                                  e.withSeed ? "with seed" : "",
                                ],
                              }),
                            }),
                            (0, r.jsxs)(p.R, {
                              children: [
                                (0, r.jsx)(d.L, { children: "Amount" }),
                                (0, r.jsxs)(d.V, {
                                  children: [
                                    (0, s.e)({
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
                              (0, r.jsxs)(p.R, {
                                children: [
                                  (0, r.jsx)(d.L, { children: "Destination" }),
                                  (0, r.jsx)(d.V, {
                                    children: (0, r.jsx)(m.A, {
                                      address: e.toAccount,
                                      url: k,
                                    }),
                                  }),
                                ],
                              }),
                          ],
                        },
                        i,
                      )
                    : "spl-transfer" === e.type
                      ? (0, r.jsxs)(
                          H,
                          {
                            children: [
                              (0, r.jsx)(p.R, {
                                children: (0, r.jsxs)(u.L, {
                                  children: ["Transfer ", e.token.symbol],
                                }),
                              }),
                              (0, r.jsxs)(p.R, {
                                children: [
                                  (0, r.jsx)(d.L, { children: "Amount" }),
                                  (0, r.jsx)(d.V, {
                                    children: e.value.toString(),
                                  }),
                                ],
                              }),
                              !!e.fromAta &&
                                (0, r.jsxs)(p.R, {
                                  children: [
                                    (0, r.jsx)(d.L, { children: "Source" }),
                                    (0, r.jsx)(d.V, {
                                      children: (0, r.jsx)(m.A, {
                                        address: e.fromAta,
                                        url: k,
                                      }),
                                    }),
                                  ],
                                }),
                              !!e.toAta &&
                                (0, r.jsxs)(p.R, {
                                  children: [
                                    (0, r.jsx)(d.L, {
                                      children: "Destination",
                                    }),
                                    (0, r.jsx)(d.V, {
                                      children: (0, r.jsx)(m.A, {
                                        address: e.toAta,
                                        url: k,
                                      }),
                                    }),
                                  ],
                                }),
                              !!e.token.address &&
                                (0, r.jsxs)(p.R, {
                                  children: [
                                    (0, r.jsx)(d.L, { children: "Token" }),
                                    (0, r.jsx)(d.V, {
                                      children: (0, r.jsx)(m.A, {
                                        address: e.token.address,
                                        url: k,
                                      }),
                                    }),
                                  ],
                                }),
                            ],
                          },
                          i,
                        )
                      : "ata-creation" === e.type
                        ? (0, r.jsxs)(
                            H,
                            {
                              children: [
                                (0, r.jsx)(p.R, {
                                  children: (0, r.jsx)(u.L, {
                                    children: "Create token account",
                                  }),
                                }),
                                (0, r.jsxs)(p.R, {
                                  children: [
                                    (0, r.jsx)(d.L, { children: "Program ID" }),
                                    (0, r.jsx)(d.V, {
                                      children: (0, r.jsx)(m.A, {
                                        address: e.program,
                                        url: k,
                                      }),
                                    }),
                                  ],
                                }),
                                !!e.owner &&
                                  (0, r.jsxs)(p.R, {
                                    children: [
                                      (0, r.jsx)(d.L, { children: "Owner" }),
                                      (0, r.jsx)(d.V, {
                                        children: (0, r.jsx)(m.A, {
                                          address: e.owner,
                                          url: k,
                                        }),
                                      }),
                                    ],
                                  }),
                              ],
                            },
                            i,
                          )
                        : "create-account" === e.type
                          ? (0, r.jsxs)(
                              H,
                              {
                                children: [
                                  (0, r.jsx)(p.R, {
                                    children: (0, r.jsxs)(u.L, {
                                      children: [
                                        "Create account ",
                                        e.withSeed ? "with seed" : "",
                                      ],
                                    }),
                                  }),
                                  !!e.account &&
                                    (0, r.jsxs)(p.R, {
                                      children: [
                                        (0, r.jsx)(d.L, {
                                          children: "Account",
                                        }),
                                        (0, r.jsx)(d.V, {
                                          children: (0, r.jsx)(m.A, {
                                            address: e.account,
                                            url: k,
                                          }),
                                        }),
                                      ],
                                    }),
                                  (0, r.jsxs)(p.R, {
                                    children: [
                                      (0, r.jsx)(d.L, { children: "Amount" }),
                                      (0, r.jsxs)(d.V, {
                                        children: [
                                          (0, s.e)({
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
                              i,
                            )
                          : "spl-init-account" === e.type
                            ? (0, r.jsxs)(
                                H,
                                {
                                  children: [
                                    (0, r.jsx)(p.R, {
                                      children: (0, r.jsx)(u.L, {
                                        children: "Initialize token account",
                                      }),
                                    }),
                                    !!e.account &&
                                      (0, r.jsxs)(p.R, {
                                        children: [
                                          (0, r.jsx)(d.L, {
                                            children: "Account",
                                          }),
                                          (0, r.jsx)(d.V, {
                                            children: (0, r.jsx)(m.A, {
                                              address: e.account,
                                              url: k,
                                            }),
                                          }),
                                        ],
                                      }),
                                    !!e.mint &&
                                      (0, r.jsxs)(p.R, {
                                        children: [
                                          (0, r.jsx)(d.L, { children: "Mint" }),
                                          (0, r.jsx)(d.V, {
                                            children: (0, r.jsx)(m.A, {
                                              address: e.mint,
                                              url: k,
                                            }),
                                          }),
                                        ],
                                      }),
                                    !!e.owner &&
                                      (0, r.jsxs)(p.R, {
                                        children: [
                                          (0, r.jsx)(d.L, {
                                            children: "Owner",
                                          }),
                                          (0, r.jsx)(d.V, {
                                            children: (0, r.jsx)(m.A, {
                                              address: e.owner,
                                              url: k,
                                            }),
                                          }),
                                        ],
                                      }),
                                  ],
                                },
                                i,
                              )
                            : "spl-close-account" === e.type
                              ? (0, r.jsxs)(
                                  H,
                                  {
                                    children: [
                                      (0, r.jsx)(p.R, {
                                        children: (0, r.jsx)(u.L, {
                                          children: "Close token account",
                                        }),
                                      }),
                                      !!e.source &&
                                        (0, r.jsxs)(p.R, {
                                          children: [
                                            (0, r.jsx)(d.L, {
                                              children: "Source",
                                            }),
                                            (0, r.jsx)(d.V, {
                                              children: (0, r.jsx)(m.A, {
                                                address: e.source,
                                                url: k,
                                              }),
                                            }),
                                          ],
                                        }),
                                      !!e.destination &&
                                        (0, r.jsxs)(p.R, {
                                          children: [
                                            (0, r.jsx)(d.L, {
                                              children: "Destination",
                                            }),
                                            (0, r.jsx)(d.V, {
                                              children: (0, r.jsx)(m.A, {
                                                address: e.destination,
                                                url: k,
                                              }),
                                            }),
                                          ],
                                        }),
                                      !!e.owner &&
                                        (0, r.jsxs)(p.R, {
                                          children: [
                                            (0, r.jsx)(d.L, {
                                              children: "Owner",
                                            }),
                                            (0, r.jsx)(d.V, {
                                              children: (0, r.jsx)(m.A, {
                                                address: e.owner,
                                                url: k,
                                              }),
                                            }),
                                          ],
                                        }),
                                    ],
                                  },
                                  i,
                                )
                              : "spl-sync-native" === e.type
                                ? (0, r.jsxs)(
                                    H,
                                    {
                                      children: [
                                        (0, r.jsx)(p.R, {
                                          children: (0, r.jsx)(u.L, {
                                            children: "Sync native",
                                          }),
                                        }),
                                        (0, r.jsxs)(p.R, {
                                          children: [
                                            (0, r.jsx)(d.L, {
                                              children: "Program ID",
                                            }),
                                            (0, r.jsx)(d.V, {
                                              children: (0, r.jsx)(m.A, {
                                                address: e.program,
                                                url: k,
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    i,
                                  )
                                : "raydium-swap-base-input" === e.type
                                  ? (0, r.jsxs)(
                                      H,
                                      {
                                        children: [
                                          (0, r.jsx)(p.R, {
                                            children: (0, r.jsxs)(u.L, {
                                              children: [
                                                "Raydium swap",
                                                " ",
                                                e.tokenIn && e.tokenOut
                                                  ? `${e.tokenIn.symbol} → ${e.tokenOut.symbol}`
                                                  : "",
                                              ],
                                            }),
                                          }),
                                          (0, r.jsxs)(p.R, {
                                            children: [
                                              (0, r.jsx)(d.L, {
                                                children: "Amount in",
                                              }),
                                              (0, r.jsx)(d.V, {
                                                children: e.amountIn.toString(),
                                              }),
                                            ],
                                          }),
                                          (0, r.jsxs)(p.R, {
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
                                            (0, r.jsxs)(p.R, {
                                              children: [
                                                (0, r.jsx)(d.L, {
                                                  children: "Token in",
                                                }),
                                                (0, r.jsx)(d.V, {
                                                  children: (0, r.jsx)(m.A, {
                                                    address: e.mintIn,
                                                    url: k,
                                                  }),
                                                }),
                                              ],
                                            }),
                                          e.mintOut &&
                                            (0, r.jsxs)(p.R, {
                                              children: [
                                                (0, r.jsx)(d.L, {
                                                  children: "Token out",
                                                }),
                                                (0, r.jsx)(d.V, {
                                                  children: (0, r.jsx)(m.A, {
                                                    address: e.mintOut,
                                                    url: k,
                                                  }),
                                                }),
                                              ],
                                            }),
                                        ],
                                      },
                                      i,
                                    )
                                  : "raydium-swap-base-output" === e.type
                                    ? (0, r.jsxs)(
                                        H,
                                        {
                                          children: [
                                            (0, r.jsx)(p.R, {
                                              children: (0, r.jsxs)(u.L, {
                                                children: [
                                                  "Raydium swap",
                                                  " ",
                                                  e.tokenIn && e.tokenOut
                                                    ? `${e.tokenIn.symbol} → ${e.tokenOut.symbol}`
                                                    : "",
                                                ],
                                              }),
                                            }),
                                            (0, r.jsxs)(p.R, {
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
                                            (0, r.jsxs)(p.R, {
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
                                              (0, r.jsxs)(p.R, {
                                                children: [
                                                  (0, r.jsx)(d.L, {
                                                    children: "Token in",
                                                  }),
                                                  (0, r.jsx)(d.V, {
                                                    children: (0, r.jsx)(m.A, {
                                                      address: e.mintIn,
                                                      url: k,
                                                    }),
                                                  }),
                                                ],
                                              }),
                                            e.mintOut &&
                                              (0, r.jsxs)(p.R, {
                                                children: [
                                                  (0, r.jsx)(d.L, {
                                                    children: "Token out",
                                                  }),
                                                  (0, r.jsx)(d.V, {
                                                    children: (0, r.jsx)(m.A, {
                                                      address: e.mintOut,
                                                      url: k,
                                                    }),
                                                  }),
                                                ],
                                              }),
                                          ],
                                        },
                                        i,
                                      )
                                    : "jupiter-swap-shared-accounts-route" ===
                                        e.type
                                      ? (0, r.jsxs)(
                                          H,
                                          {
                                            children: [
                                              (0, r.jsx)(p.R, {
                                                children: (0, r.jsxs)(u.L, {
                                                  children: [
                                                    "Jupiter swap",
                                                    " ",
                                                    e.tokenIn && e.tokenOut
                                                      ? `${e.tokenIn.symbol} → ${e.tokenOut.symbol}`
                                                      : "",
                                                  ],
                                                }),
                                              }),
                                              (0, r.jsxs)(p.R, {
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
                                              (0, r.jsxs)(p.R, {
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
                                                (0, r.jsxs)(p.R, {
                                                  children: [
                                                    (0, r.jsx)(d.L, {
                                                      children: "Token in",
                                                    }),
                                                    (0, r.jsx)(d.V, {
                                                      children: (0, r.jsx)(
                                                        m.A,
                                                        {
                                                          address: e.mintIn,
                                                          url: k,
                                                        },
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              e.mintOut &&
                                                (0, r.jsxs)(p.R, {
                                                  children: [
                                                    (0, r.jsx)(d.L, {
                                                      children: "Token out",
                                                    }),
                                                    (0, r.jsx)(d.V, {
                                                      children: (0, r.jsx)(
                                                        m.A,
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
                                          i,
                                        )
                                      : "jupiter-swap-exact-out-route" ===
                                          e.type
                                        ? (0, r.jsxs)(
                                            H,
                                            {
                                              children: [
                                                (0, r.jsx)(p.R, {
                                                  children: (0, r.jsxs)(u.L, {
                                                    children: [
                                                      "Jupiter swap",
                                                      " ",
                                                      e.tokenIn && e.tokenOut
                                                        ? `${e.tokenIn.symbol} → ${e.tokenOut.symbol}`
                                                        : "",
                                                    ],
                                                  }),
                                                }),
                                                (0, r.jsxs)(p.R, {
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
                                                (0, r.jsxs)(p.R, {
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
                                                  (0, r.jsxs)(p.R, {
                                                    children: [
                                                      (0, r.jsx)(d.L, {
                                                        children: "Token in",
                                                      }),
                                                      (0, r.jsx)(d.V, {
                                                        children: (0, r.jsx)(
                                                          m.A,
                                                          {
                                                            address: e.mintIn,
                                                            url: k,
                                                          },
                                                        ),
                                                      }),
                                                    ],
                                                  }),
                                                e.mintOut &&
                                                  (0, r.jsxs)(p.R, {
                                                    children: [
                                                      (0, r.jsx)(d.L, {
                                                        children: "Token out",
                                                      }),
                                                      (0, r.jsx)(d.V, {
                                                        children: (0, r.jsx)(
                                                          m.A,
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
                                            i,
                                          )
                                        : (0, r.jsxs)(
                                            H,
                                            {
                                              children: [
                                                (0, r.jsxs)(p.R, {
                                                  children: [
                                                    (0, r.jsx)(d.L, {
                                                      children: "Program ID",
                                                    }),
                                                    (0, r.jsx)(d.V, {
                                                      children: (0, r.jsx)(
                                                        m.A,
                                                        {
                                                          address: e.program,
                                                          url: k,
                                                        },
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                                (0, r.jsxs)(p.R, {
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
                                            i,
                                          ),
                ),
              }),
            (0, r.jsx)(y.G, {}),
            T
              ? (0, r.jsx)(x.E, {
                  style: { marginTop: "2rem" },
                  children: T.message,
                })
              : L
                ? (0, r.jsx)(x.E, { style: { marginTop: "2rem" }, children: W })
                : null,
            (0, r.jsx)(D, {
              $useSmallMargins: !(!L && !T),
              title: "",
              address: S,
              balance: E,
              errMsg:
                V || L || T || !z
                  ? void 0
                  : "Add funds on Solana to complete transaction.",
            }),
            (0, r.jsx)(l.P, {
              style: { marginTop: "1rem" },
              loading: I,
              disabled: R || V,
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
