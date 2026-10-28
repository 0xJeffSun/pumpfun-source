// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486);
  e.i(353110);
  var r = e.i(648470),
    a = e.i(745018),
    i = e.i(439587),
    s = e.i(292686),
    n = e.i(574472),
    o = e.i(959719),
    l = e.i(971370),
    c = e.i(606933),
    d = e.i(599077),
    m = e.i(352386);
  e.i(12692);
  var u = e.i(398902),
    p = e.i(63289),
    x = e.i(157633),
    h = e.i(867013),
    f = e.i(464649),
    b = e.i(441374),
    _ = e.i(445242);
  let g = (e) => {
    let r,
      a = (0, _.c)(2),
      { children: i } = e;
    return (
      a[0] !== i
        ? ((r = (0, t.jsx)("div", {
            className: "rounded border border-red-300 p-2 text-red-300",
            children: i,
          })),
          (a[0] = i),
          (a[1] = r))
        : (r = a[1]),
      r
    );
  };
  var y = e.i(78436),
    v = e.i(275799),
    w = e.i(630782),
    E = e.i(200165),
    N = e.i(29542);
  let j = /^\d*\.?\d{0,2}$/,
    C = (0, y.$)((e) => ({
      creatorFeePercent: "",
      setCreatorFeePercent: (t) => e({ creatorFeePercent: t }),
    })),
    T = (e) => !e || (j.test(e) && Number(e) >= 0.01 && 3 >= Number(e)),
    I = ({ creatorFeePercent: e, tokenQuotePair: t }) => {
      if (!t) return;
      let r = Math.round(100 * Number(e));
      return r > 0 ? r : void 0;
    },
    k = "create-coin-creator-fee-percent",
    A = `${k}-error`;
  function S() {
    let e,
      r,
      i,
      s,
      n,
      o,
      l,
      c,
      d,
      m,
      p,
      x = (0, _.c)(39),
      { t: h } = (0, u.f)(),
      f = (0, v.g)(O),
      { creatorFeePercent: b, setCreatorFeePercent: g } = C();
    if (!f) return null;
    x[0] !== b ? ((e = T(b)), (x[0] = b), (x[1] = e)) : (e = x[1]);
    let y = !e;
    if (x[2] !== b || x[3] !== y || x[4] !== g || x[5] !== h) {
      let e,
        m,
        u,
        p,
        f,
        _,
        v = { min_percent: 0.01, max_percent: 3 };
      ((i = w.Y),
        (c = !0),
        x[14] !== h
          ? ((e = h("web.create.advanced")), (x[14] = h), (x[15] = e))
          : (e = x[15]),
        x[16] !== e
          ? ((m = (0, t.jsx)("p", { className: "text-xs", children: e })),
            (x[16] = e),
            (x[17] = m))
          : (m = x[17]),
        x[18] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = (0, t.jsx)(a.J0, { size: 16, strokeWidth: 1 })), (x[18] = u))
          : (u = x[18]),
        x[19] !== m
          ? ((d = (0, t.jsx)(w.v, {
              asChild: !0,
              children: (0, t.jsxs)("button", {
                type: "button",
                className:
                  "flex items-center gap-2 text-text-primary [&>svg]:transition-transform [&>svg]:duration-200 data-[state=open]:[&>svg]:rotate-180",
                children: [m, u],
              }),
            })),
            (x[19] = m),
            (x[20] = d))
          : (d = x[20]),
        (r = w.C),
        (s = "mt-4 flex flex-col gap-2 sm:max-w-[calc(50%-6px)]"),
        x[21] !== h
          ? ((p = h("web.create.creator_fee_label")), (x[21] = h), (x[22] = p))
          : (p = x[22]),
        x[23] === Symbol.for("react.memo_cache_sentinel")
          ? ((f = (0, t.jsx)("span", {
              className: "text-[#9da3ae]",
              children: N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.OPTIONAL,
            })),
            (x[23] = f))
          : (f = x[23]),
        x[24] !== p
          ? ((n = (0, t.jsxs)("label", {
              htmlFor: k,
              className: "text-xs font-semibold text-text-primary",
              children: [p, " ", f],
            })),
            (x[24] = p),
            (x[25] = n))
          : (n = x[25]),
        x[26] !== g
          ? ((_ = (e) => g(e.target.value)), (x[26] = g), (x[27] = _))
          : (_ = x[27]),
        (o = (0, t.jsx)(E.f, {
          id: k,
          className:
            "rounded-lg border-border-secondary bg-transparent text-white dark:border-border-secondary dark:bg-transparent",
          type: "text",
          inputMode: "decimal",
          maxLength: 4,
          autoComplete: "off",
          placeholder: h("web.create.creator_fee_placeholder", v),
          value: b,
          onChange: _,
          "aria-invalid": y || void 0,
          "aria-describedby": y ? A : void 0,
        })),
        (l = y
          ? (0, t.jsx)("p", {
              id: A,
              className: "text-xs text-red-500",
              children: h("web.create.creator_fee_invalid", v),
            })
          : null),
        (x[2] = b),
        (x[3] = y),
        (x[4] = g),
        (x[5] = h),
        (x[6] = r),
        (x[7] = i),
        (x[8] = s),
        (x[9] = n),
        (x[10] = o),
        (x[11] = l),
        (x[12] = c),
        (x[13] = d));
    } else
      ((r = x[6]),
        (i = x[7]),
        (s = x[8]),
        (n = x[9]),
        (o = x[10]),
        (l = x[11]),
        (c = x[12]),
        (d = x[13]));
    return (
      x[28] !== r || x[29] !== s || x[30] !== n || x[31] !== o || x[32] !== l
        ? ((m = (0, t.jsxs)(r, { className: s, children: [n, o, l] })),
          (x[28] = r),
          (x[29] = s),
          (x[30] = n),
          (x[31] = o),
          (x[32] = l),
          (x[33] = m))
        : (m = x[33]),
      x[34] !== i || x[35] !== c || x[36] !== d || x[37] !== m
        ? ((p = (0, t.jsxs)(i, { defaultOpen: c, children: [d, m] })),
          (x[34] = i),
          (x[35] = c),
          (x[36] = d),
          (x[37] = m),
          (x[38] = p))
        : (p = x[38]),
      p
    );
  }
  function O(e) {
    return (0, v.Q)(e.pair);
  }
  var P = e.i(267951),
    R = e.i(789087),
    L = e.i(182119),
    M = e.i(292032);
  e.i(70833);
  var D = e.i(840585),
    F = e.i(595673),
    B = e.i(198825),
    U = e.i(51954),
    G = e.i(90832),
    q = e.i(655397),
    z = e.i(449597);
  function H(e) {
    let { t: a } = (0, u.f)(),
      { create: s, name: c, preview: d, symbol: p, validate: _ } = e,
      [y, w] = (0, m.useState)(!1),
      [j, T] = (0, m.useState)(!1),
      [k, A] = (0, m.useState)(),
      { wallet: S } = (0, n.F)(),
      { setShowWallet: O } = (0, B.useConnectWallet)(),
      H = (0, v.g)((e) => e.pair),
      V = "usdc" === H.kind,
      W = (0, v.Q)(H),
      $ = "stock" === H.kind ? H.stock : void 0,
      K = !!S && (y || !c || ("stock" === H.kind && !$)),
      X =
        $?.minimumSolBuy === void 0 ? 0 : $.minimumSolBuy / l.LAMPORTS_PER_SOL,
      Q = V ? (0, q.p)() : o.w,
      J = (0, q.W)(Q),
      Y = (0, U.f)((e) => e.setCoinMint),
      Z = (0, U.f)((e) => e.touchLease),
      { heartbeatMs: ee } = (0, U.f)((e) => e.leaseGcConfig),
      [et] = (0, m.useState)(() => l.Keypair.generate().publicKey.toBase58());
    (0, m.useEffect)(() => {
      let e = Y(et);
      if (!e) return;
      let { release: t, token: r } = e,
        a = setInterval(() => {
          Z(r);
        }, ee);
      return () => {
        (clearInterval(a), t());
      };
    }, [et, Y, Z, ee]);
    let er = (0, m.useMemo)(
        () => ({ mint: et, initialized: !1, quote_mint: Q.toBase58() }),
        [et, Q],
      ),
      {
        amount: ea,
        setAmount: ei,
        solAmount: es,
        setSolAmount: en,
        nativeSelected: eo,
        setNativeSelected: el,
      } = (0, D.f)({ isBuySelected: !0, coin: er, slippagePercentage: 0 });
    (0, m.useEffect)(() => {
      W && !eo && el(!0);
    }, [W, eo, el]);
    let ec = (0, m.useCallback)((e) => {
        ("-" === e.key || "e" === e.key) && e.preventDefault();
      }, []),
      ed = async () => {
        (w(!0), A(void 0));
        let e = V ? z.J : z.K;
        try {
          let t = {
            amount: new r.BN(Math.floor(1e6 * (ea || 0))),
            solAmount: new r.BN(Math.floor((es || 0) * 10 ** e)),
            nativeSelected: eo,
          };
          (await s(t), T(!1), ei(0), en(0), w(!1));
        } catch (e) {
          (console.error(e),
            e instanceof Error
              ? A(e.message)
              : A("an unexpected error occurred"),
            w(!1));
        }
      },
      em = (0, m.useCallback)(async () => {
        try {
          if (!S) {
            ((0, F.Lw)({ source: "create" }), O(!0));
            return;
          }
          (_(), T(!0), A(void 0));
        } catch (e) {
          (console.log(e),
            e instanceof Error
              ? A(e.message)
              : A("an unexpected error occurred"));
        }
      }, [S, _, O]),
      { isMayhemEnabled: eu, isHolderReward: ep } = (0, R.i)(),
      ex =
        void 0 !==
        I({
          creatorFeePercent: C((e) => e.creatorFeePercent),
          tokenQuotePair: W,
        }),
      eh = V ? P.R : P.x,
      ef = es < eh,
      eb = y;
    return (
      eu && (eb = eb || ef),
      W && (eb = eb || !(es > 0) || es < X),
      (ex || ep) && (eb = eb || !(es > 0 || ea > 0)),
      (0, t.jsxs)(L.N, {
        open: j,
        onOpenChange: T,
        children: [
          (0, t.jsx)(i.K, {
            isDisabled: K,
            onClick: em,
            children: S
              ? N.f.CREATE_COIN_PAGE.SECTION.DETAIL.BUTTON.CREATE
              : N.f.CREATE_COIN_PAGE.SECTION.DETAIL.BUTTON.LOGIN,
          }),
          (0, t.jsxs)(L.d, {
            className: "max-w-[352px] bg-bg-primary text-center text-white",
            children: [
              (0, t.jsx)(h.F, {
                className: "absolute h-0 w-0",
                children: (0, t.jsx)(M.f, {
                  children:
                    N.f.CREATE_COIN_PAGE.SECTION.DETAIL.CREATE.CHOOSE_HOW_MANY,
                }),
              }),
              (0, t.jsxs)("div", {
                className: "grid gap-3",
                children: [
                  eu
                    ? (0, t.jsx)("div", {
                        children: a("web.create.buy_symbol_during_creation", {
                          symbol: p,
                        }),
                      })
                    : (0, t.jsxs)("div", {
                        children: [
                          N.f.CREATE_COIN_PAGE.SECTION.DETAIL.CREATE
                            .CHOOSE_HOW_MANY,
                          " [",
                          p,
                          "]",
                          " ",
                          N.f.CREATE_COIN_PAGE.SECTION.DETAIL.CREATE
                            .YOU_WANT_TO_BUY,
                        ],
                      }),
                  !eu &&
                    (0, t.jsx)("div", {
                      className: "text-xs",
                      children: N.f.CREATE_COIN_PAGE.SECTION.DETAIL.CREATE.TIP,
                    }),
                  W &&
                    (0, t.jsxs)("div", {
                      className:
                        "flex gap-x-1.5 rounded-[6px] bg-bg-secondary p-2",
                      children: [
                        (0, t.jsx)(x.wB, {
                          className: "mt-0.5 shrink-0 text-bg-accent",
                          size: 14,
                        }),
                        (0, t.jsxs)("p", {
                          className: "text-start text-sm text-text-primary",
                          children: [
                            a(
                              "pump" === H.kind
                                ? "web.create.initial_buy_required_pump_description"
                                : "web.create.initial_buy_required_stock_description",
                            ),
                            X > 0
                              ? (0, t.jsxs)(t.Fragment, {
                                  children: [
                                    " ",
                                    a("web.create.pair_stock_min_buy", {
                                      amount: (0, G.m)(X),
                                    }),
                                  ],
                                })
                              : null,
                          ],
                        }),
                      ],
                    }),
                  ep &&
                    !W &&
                    (0, t.jsxs)("div", {
                      className:
                        "flex gap-x-1.5 rounded-[6px] bg-bg-secondary p-2",
                      children: [
                        (0, t.jsx)(x.wB, {
                          className: "mt-0.5 shrink-0 text-bg-accent",
                          size: 14,
                        }),
                        (0, t.jsx)("p", {
                          className: "text-start text-sm text-text-primary",
                          children: a(
                            "web.create.initial_buy_required_holder_rewards_description",
                          ),
                        }),
                      ],
                    }),
                  ex &&
                    !W &&
                    !ep &&
                    (0, t.jsxs)("div", {
                      className:
                        "flex gap-x-1.5 rounded-[6px] bg-bg-secondary p-2",
                      children: [
                        (0, t.jsx)(x.wB, {
                          className: "mt-0.5 shrink-0 text-bg-accent",
                          size: 14,
                        }),
                        (0, t.jsx)("p", {
                          className: "text-start text-sm text-text-primary",
                          children: a(
                            "web.create.initial_buy_required_creator_fee_description",
                          ),
                        }),
                      ],
                    }),
                  eu &&
                    (0, t.jsxs)("div", {
                      className:
                        "flex gap-x-1.5 rounded-[6px] bg-bg-secondary p-2",
                      children: [
                        (0, t.jsx)(x.wB, {
                          className: "mt-0.5 shrink-0 text-bg-accent",
                          size: 14,
                        }),
                        (0, t.jsx)("p", {
                          className: "text-start text-sm text-text-primary",
                          children: a("web.create.mayhem_min_buy", {
                            amount: `${eh} ${J}`,
                          }),
                        }),
                      ],
                    }),
                  !W &&
                    (0, t.jsxs)("button", {
                      type: "button",
                      onClick: () => el(!eo),
                      className:
                        "w-fit justify-self-end rounded bg-bg-primary px-2 py-1 text-xs text-text-tertiary hover:bg-bg-secondary hover:text-text-secondary",
                      children: [
                        N.f.CREATE_COIN_PAGE.SECTION.DETAIL.CREATE.SWITCH_TO,
                        " ",
                        eo ? p : J,
                      ],
                    }),
                  (0, t.jsxs)("div", {
                    className:
                      "relative flex items-center rounded-md bg-bg-quaternary",
                    children: [
                      (0, t.jsx)(E.f, {
                        className:
                          "w-full bg-transparent pl-3 text-white outline-none",
                        id: "amount",
                        placeholder: "0.0 (optional)",
                        type: "number",
                        value: eo ? es : ea,
                        onKeyDown: ec,
                        onChange: eo
                          ? (e) => {
                              let t = parseFloat(e.target.value);
                              isNaN(t) ? en("") : en(t);
                            }
                          : (e) => {
                              let t = parseFloat(e.target.value);
                              isNaN(t) ? ei("") : ei(t);
                            },
                      }),
                      (0, t.jsxs)("div", {
                        className: "absolute right-2 ml-2 flex items-center",
                        children: [
                          (0, t.jsx)("span", {
                            className: "mr-2 text-white",
                            children: eo ? J : p,
                          }),
                          (0, t.jsx)("img", {
                            className: "h-8 w-8 rounded-full",
                            alt: eo ? J : c,
                            src: eo
                              ? V
                                ? "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                                : f.T.solana
                              : d,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    className:
                      "min-h-5 w-fit justify-self-start text-sm text-text-tertiary",
                    children:
                      !W && (ea || es)
                        ? eo
                          ? `You receive: ${ea || 0} ${p}`
                          : `Cost: ${es || 0} ${J}`
                        : "",
                  }),
                  (0, t.jsx)(i.K, {
                    isFullWidth: !0,
                    isDisabled: eb,
                    isLoading: y,
                    onClick: () => ed(),
                    size: 40,
                    variant: "primary",
                    children: N.f.CREATE_COIN_PAGE.SECTION.DETAIL.BUTTON.CREATE,
                  }),
                  k ? (0, t.jsx)(g, { children: k }) : null,
                  (0, t.jsx)(b.f, { solAmount: es, quoteMint: Q }),
                  y
                    ? (0, t.jsx)("span", {
                        className: "text-sm text-text-tertiary",
                        children:
                          N.f.CREATE_COIN_PAGE.SECTION.DETAIL.CREATE.LOADING,
                      })
                    : null,
                ],
              }),
            ],
          }),
        ],
      })
    );
  }
  var V = e.i(871999);
  function W(e) {
    let r,
      a,
      i,
      s,
      n = (0, _.c)(9),
      { t: o } = (0, u.f)(),
      { coin: l, preview: c } = e;
    n[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((r = {
          platform: "pump",
          program: "pump",
          initialized: !1,
          name: "Name",
          symbol: "Ticker",
          description: "Description",
          image_uri: "",
          video_uri: "",
          metadata_uri: "",
          bonding_curve: "",
          associated_bonding_curve: "",
          mint: "preview",
          creator: "",
          created_timestamp: new Date().getTime(),
          raydium_pool: "",
          complete: !1,
          hidden: null,
          virtual_sol_reserves: 0,
          virtual_token_reserves: 0,
          total_supply: 0,
          show_name: !0,
          market_cap: 0,
          usd_market_cap: 0,
          king_of_the_hill_timestamp: 0,
          nsfw: !1,
          livestream_ban_expiry: 0,
          is_currently_live: !1,
          is_banned: !1,
          last_trade_timestamp: null,
          hide_banner: !1,
        }),
        (n[0] = r))
      : (r = n[0]);
    let d = r;
    n[1] !== c
      ? ((a = c && (c.startsWith("blob:") || c.startsWith("data:"))),
        (n[1] = c),
        (n[2] = a))
      : (a = n[2]);
    let m = a;
    return (
      n[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)("h5", {
            className: "font-bold leading-5 text-text-primary",
            children: N.f.CREATE_COIN_PAGE.SECTION.DETAIL.PREVIEW.TITLE,
          })),
          (n[3] = i))
        : (i = n[3]),
      n[4] !== l || n[5] !== m || n[6] !== c || n[7] !== o
        ? ((s = (0, t.jsxs)("div", {
            className:
              "hidden w-right-col flex-shrink-0 flex-col gap-4 text-start lg:flex",
            children: [
              i,
              (0, t.jsx)("div", {
                className:
                  "sticky top-0 flex w-56 flex-col items-center justify-center gap-4 rounded-xl border border-border-secondary bg-bg-secondary p-4",
                children: c
                  ? m
                    ? (0, t.jsx)("div", {
                        className:
                          "flex h-64 w-full items-center justify-center overflow-hidden rounded-lg",
                        children: (0, t.jsx)("img", {
                          src: c,
                          alt: o("web.create.preview_alt"),
                          className: "h-full w-full object-contain",
                        }),
                      })
                    : (0, t.jsx)("div", {
                        className: "pointer-events-none w-full",
                        children: (0, t.jsx)(V.f, {
                          sort: "featured",
                          coin: {
                            ...d,
                            ...l,
                            name: l.name || "Name",
                            symbol: l.symbol || "Ticker",
                            description: l.description || "Description",
                            image_uri: c,
                            video_uri: l.video_uri ? c : "",
                            creator: l.creator || "",
                          },
                        }),
                      })
                  : (0, t.jsx)("div", {
                      className: "flex h-64 items-center justify-center",
                      children: (0, t.jsx)("span", {
                        className: "text-center text-sm text-[#9da3ae]",
                        children:
                          N.f.CREATE_COIN_PAGE.SECTION.DETAIL.PREVIEW
                            .DESCRIPTION,
                      }),
                    }),
              }),
            ],
          })),
          (n[4] = l),
          (n[5] = m),
          (n[6] = c),
          (n[7] = o),
          (n[8] = s))
        : (s = n[8]),
      s
    );
  }
  let $ = (0, m.lazy)(() =>
      e.A(320853).then((e) => ({ default: e.FileDropzoneInner })),
    ),
    K = (e) => {
      let r,
        a,
        i,
        s = (0, _.c)(7),
        n = e.isBanner ? "min-h-32" : "h-80 min-h-44",
        o = `w-full ${n} animate-pulse rounded-lg border border-dashed border-white/30 bg-transparent`;
      return (
        s[0] !== o
          ? ((r = (0, t.jsx)("div", { className: o })), (s[0] = o), (s[1] = r))
          : (r = s[1]),
        s[2] !== e
          ? ((a = (0, t.jsx)($, { ...e })), (s[2] = e), (s[3] = a))
          : (a = s[3]),
        s[4] !== r || s[5] !== a
          ? ((i = (0, t.jsx)(m.Suspense, { fallback: r, children: a })),
            (s[4] = r),
            (s[5] = a),
            (s[6] = i))
          : (i = s[6]),
        i
      );
    };
  var X = e.i(426091);
  let Q = (e) => {
    let r,
      a,
      i,
      s,
      n,
      o,
      l,
      c,
      d,
      u,
      p,
      x,
      h,
      f,
      b,
      g,
      y,
      v,
      w,
      E,
      j,
      C,
      T,
      I = (0, _.c)(48),
      {
        telegram: k,
        website: A,
        twitter: S,
        setTelegram: O,
        setWebsite: P,
        setTwitter: R,
      } = e;
    I[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((r = { telegram: "", website: "", twitter: "" }), (I[0] = r))
      : (r = I[0]);
    let [L, M] = (0, m.useState)(r);
    I[1] !== O || I[2] !== R || I[3] !== P
      ? ((a = (e, t) => {
          let r = e.target.value;
          ("telegram" === t && O(r),
            "website" === t && P(r),
            "twitter" === t && R(r),
            M((e) => ({ ...e, [t]: "" })));
        }),
        (I[1] = O),
        (I[2] = R),
        (I[3] = P),
        (I[4] = a))
      : (a = I[4]);
    let D = a;
    I[5] === Symbol.for("react.memo_cache_sentinel")
      ? ((i = (e, t) => {
          let r = e.target.value;
          M((e) => ({
            ...e,
            [t]: (function (e, t) {
              if ("" === t || void 0 === t) return "";
              let r = "";
              switch (e) {
                case "telegram":
                  X.q.telegram.test(t) ||
                    (r =
                      "Please enter a valid Telegram link (e.g. https://t.me/username)");
                  break;
                case "website":
                  /^http:\/\//.test(t)
                    ? (r =
                        "Website link cannot use 'http'. Please use 'https'.")
                    : /^https:\/\//.test(t)
                      ? X.q.website.test(t) ||
                        (r =
                          "Please enter a valid website link (e.g. https://example.com)")
                      : (r = "Website must start with 'https://'.");
                  break;
                case "twitter":
                  X.q.twitter.test(t) ||
                    (r = "Please enter a valid Twitter/X username format");
              }
              return r;
            })(t, r),
          }));
        }),
        (I[5] = i))
      : (i = I[5]);
    let F = i;
    return (
      console.log(L),
      I[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsx)("label", {
            className: "text-xs font-semibold text-text-primary",
            htmlFor: "website",
            children: N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.WEBSITE.LABEL,
          })),
          (I[6] = s))
        : (s = I[6]),
      I[7] !== D
        ? ((n = (e) => D(e, "website")), (I[7] = D), (I[8] = n))
        : (n = I[8]),
      I[9] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (e) => F(e, "website")), (I[9] = o))
        : (o = I[9]),
      I[10] !== n || I[11] !== A
        ? ((l = (0, t.jsx)("input", {
            className:
              "w-full rounded-lg border border-border-secondary bg-transparent p-2 text-sm text-white",
            id: "website",
            placeholder:
              N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.WEBSITE.PLACEHOLDER,
            type: "text",
            value: A,
            onChange: n,
            onBlur: o,
          })),
          (I[10] = n),
          (I[11] = A),
          (I[12] = l))
        : (l = I[12]),
      I[13] !== L.website
        ? ((c =
            L.website &&
            (0, t.jsx)("span", {
              className: "text-xs text-red-500",
              children: L.website,
            })),
          (I[13] = L.website),
          (I[14] = c))
        : (c = I[14]),
      I[15] !== l || I[16] !== c
        ? ((d = (0, t.jsxs)("div", {
            className: "flex max-w-[300px] flex-1 flex-col gap-2",
            children: [
              s,
              (0, t.jsxs)("div", {
                className: "flex flex-col gap-1",
                children: [l, c],
              }),
            ],
          })),
          (I[15] = l),
          (I[16] = c),
          (I[17] = d))
        : (d = I[17]),
      I[18] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = (0, t.jsx)("label", {
            className: "text-xs font-semibold text-text-primary",
            htmlFor: "twitter",
            children: N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.X.LABEL,
          })),
          (I[18] = u))
        : (u = I[18]),
      I[19] !== D
        ? ((p = (e) => D(e, "twitter")), (I[19] = D), (I[20] = p))
        : (p = I[20]),
      I[21] === Symbol.for("react.memo_cache_sentinel")
        ? ((x = (e) => F(e, "twitter")), (I[21] = x))
        : (x = I[21]),
      I[22] !== p || I[23] !== S
        ? ((h = (0, t.jsx)("input", {
            className:
              "w-full rounded-lg border border-border-secondary bg-transparent p-2 text-sm text-white",
            id: "twitter",
            placeholder:
              N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.X.PLACEHOLDER,
            type: "text",
            value: S,
            onChange: p,
            onBlur: x,
          })),
          (I[22] = p),
          (I[23] = S),
          (I[24] = h))
        : (h = I[24]),
      I[25] !== L.twitter
        ? ((f =
            L.twitter &&
            (0, t.jsx)("span", {
              className: "text-xs text-red-500",
              children: L.twitter,
            })),
          (I[25] = L.twitter),
          (I[26] = f))
        : (f = I[26]),
      I[27] !== h || I[28] !== f
        ? ((b = (0, t.jsxs)("div", {
            className: "flex max-w-[300px] flex-1 flex-col gap-2",
            children: [
              u,
              (0, t.jsxs)("div", {
                className: "flex flex-col gap-1",
                children: [h, f],
              }),
            ],
          })),
          (I[27] = h),
          (I[28] = f),
          (I[29] = b))
        : (b = I[29]),
      I[30] !== b || I[31] !== d
        ? ((g = (0, t.jsxs)("div", {
            className: "flex w-full gap-4",
            children: [d, b],
          })),
          (I[30] = b),
          (I[31] = d),
          (I[32] = g))
        : (g = I[32]),
      I[33] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = (0, t.jsx)("label", {
            className: "text-xs font-semibold text-text-primary",
            htmlFor: "telegram",
            children: N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.TELEGRAM.LABEL,
          })),
          (I[33] = y))
        : (y = I[33]),
      I[34] !== D
        ? ((v = (e) => D(e, "telegram")), (I[34] = D), (I[35] = v))
        : (v = I[35]),
      I[36] === Symbol.for("react.memo_cache_sentinel")
        ? ((w = (e) => F(e, "telegram")), (I[36] = w))
        : (w = I[36]),
      I[37] !== v || I[38] !== k
        ? ((E = (0, t.jsx)("input", {
            className:
              "w-full rounded-lg border border-border-secondary bg-transparent p-2 text-sm text-white",
            id: "telegram",
            placeholder:
              N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.TELEGRAM.PLACEHOLDER,
            type: "text",
            value: k,
            onChange: v,
            onBlur: w,
          })),
          (I[37] = v),
          (I[38] = k),
          (I[39] = E))
        : (E = I[39]),
      I[40] !== L.telegram
        ? ((j =
            L.telegram &&
            (0, t.jsx)("span", {
              className: "text-xs text-red-500",
              children: L.telegram,
            })),
          (I[40] = L.telegram),
          (I[41] = j))
        : (j = I[41]),
      I[42] !== E || I[43] !== j
        ? ((C = (0, t.jsx)("div", {
            className: "flex w-full max-w-[300px] gap-4",
            children: (0, t.jsxs)("div", {
              className: "flex flex-1 flex-col gap-2",
              children: [
                y,
                (0, t.jsxs)("div", {
                  className: "flex flex-col gap-1",
                  children: [E, j],
                }),
              ],
            }),
          })),
          (I[42] = E),
          (I[43] = j),
          (I[44] = C))
        : (C = I[44]),
      I[45] !== g || I[46] !== C
        ? ((T = (0, t.jsxs)(t.Fragment, { children: [g, C] })),
          (I[45] = g),
          (I[46] = C),
          (I[47] = T))
        : (T = I[47]),
      T
    );
  };
  var J = e.i(458310);
  function Y() {
    let e,
      r,
      i,
      s,
      n,
      o,
      l,
      c,
      d,
      m,
      p,
      h,
      f = (0, _.c)(26),
      { t: b } = (0, u.f)(),
      g = (0, v.g)(Z);
    f[0] !== g ? ((e = (0, v.Q)(g)), (f[0] = g), (f[1] = e)) : (e = f[1]);
    let y = e;
    return (
      f[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsx)("div", {
            className:
              "flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-tertiary",
            children: (0, t.jsx)(a.Jd, { size: 20, strokeWidth: 1 }),
          })),
          (f[2] = r))
        : (r = f[2]),
      f[3] !== b
        ? ((i = b("creator_fees.charity.editor_title")), (f[3] = b), (f[4] = i))
        : (i = f[4]),
      f[5] !== i
        ? ((s = (0, t.jsx)("p", {
            className: "text-xs font-semibold text-text-primary",
            children: i,
          })),
          (f[5] = i),
          (f[6] = s))
        : (s = f[6]),
      f[7] !== b
        ? ((n = b("common.learn_more")), (f[7] = b), (f[8] = n))
        : (n = f[8]),
      f[9] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, t.jsx)(x.wB, { className: "shrink-0", size: 14 })),
          (f[9] = o))
        : (o = f[9]),
      f[10] !== n
        ? ((l = (0, t.jsx)(J.default, {
            "aria-label": n,
            className:
              "shrink-0 text-text-tertiary transition-colors hover:text-text-primary",
            href: "/docs/charitycoins",
            rel: "noopener noreferrer",
            target: "_blank",
            children: o,
          })),
          (f[10] = n),
          (f[11] = l))
        : (l = f[11]),
      f[12] !== s || f[13] !== l
        ? ((c = (0, t.jsxs)("div", {
            className: "flex items-center gap-x-1.5",
            children: [s, l],
          })),
          (f[12] = s),
          (f[13] = l),
          (f[14] = c))
        : (c = f[14]),
      f[15] !== b
        ? ((d = b("web.creator.share_rewards_card_subtitle")),
          (f[15] = b),
          (f[16] = d))
        : (d = f[16]),
      f[17] !== d
        ? ((m = (0, t.jsx)("p", {
            className: "text-xs text-text-tertiary",
            children: d,
          })),
          (f[17] = d),
          (f[18] = m))
        : (m = f[18]),
      f[19] !== y || f[20] !== b
        ? ((p =
            y &&
            (0, t.jsxs)("div", {
              className: "mt-1 flex flex-col gap-y-px",
              "data-testid": "create-coin-charity-unsupported",
              children: [
                (0, t.jsx)("p", {
                  className: "text-xs text-text-secondary",
                  children: b("web.creator.charity_unsupported_pair"),
                }),
                (0, t.jsx)("p", {
                  className: "text-xs text-text-tertiary",
                  children: b("web.creator.charity_unsupported_pair_explainer"),
                }),
              ],
            })),
          (f[19] = y),
          (f[20] = b),
          (f[21] = p))
        : (p = f[21]),
      f[22] !== p || f[23] !== c || f[24] !== m
        ? ((h = (0, t.jsxs)("div", {
            className:
              "flex items-center gap-x-2 rounded-xl border border-border-secondary bg-bg-secondary p-3",
            children: [
              r,
              (0, t.jsxs)("div", {
                className: "flex w-full min-w-0 flex-col gap-y-px",
                children: [c, m, p],
              }),
            ],
          })),
          (f[22] = p),
          (f[23] = c),
          (f[24] = m),
          (f[25] = h))
        : (h = f[25]),
      h
    );
  }
  function Z(e) {
    return e.pair;
  }
  var ee = e.i(704604),
    et = e.i(759257);
  async function er() {
    try {
      let e = await (0, et.j)()("GET /vanity/random-mint-public-key", {
        credentials: "include",
        throwHttpErrors: !1,
      });
      return new l.PublicKey(e.pubkey);
    } catch {
      return null;
    }
  }
  let ea = (0, y.$)((e, t) => ({
    enabled: !1,
    setEnabled: (r) => {
      r
        ? (e({ enabled: !0 }), t().ensureReservedMint())
        : e({
            enabled: !1,
            reservedMint: null,
            reservedMintKeypair: null,
            isVanityMint: !1,
          });
    },
    reservedMint: null,
    reservedMintKeypair: null,
    isVanityMint: !1,
    reserveInFlight: !1,
    ensureReservedMint: async () => {
      if (!t().reservedMint && !t().reserveInFlight) {
        e({ reserveInFlight: !0 });
        try {
          let r = await er();
          if (!t().enabled) return void e({ reserveInFlight: !1 });
          if (r)
            return void e({
              reservedMint: r,
              reservedMintKeypair: null,
              isVanityMint: !0,
              reserveInFlight: !1,
            });
          let a = l.Keypair.generate();
          e({
            reservedMint: a.publicKey,
            reservedMintKeypair: a,
            isVanityMint: !1,
            reserveInFlight: !1,
          });
        } catch {
          e({ reserveInFlight: !1 });
        }
      }
    },
    resetAfterCreate: () => {
      e({
        enabled: !1,
        reservedMint: null,
        reservedMintKeypair: null,
        isVanityMint: !1,
        reserveInFlight: !1,
      });
    },
  }));
  var ei = e.i(700903),
    es = e.i(928529),
    en = e.i(114081),
    eo = e.i(951425);
  let el = { rwa: "stocks", crypto: "crypto", meme: "memes" },
    ec = (e) => (void 0 === e.assetType ? void 0 : el[e.assetType]);
  var ed = e.i(896024);
  function em(e) {
    let r,
      a,
      i,
      s,
      n,
      o,
      l,
      c,
      d,
      m,
      p = (0, _.c)(25),
      { value: x, onValueChange: h } = e,
      { t: f } = (0, u.f)();
    (p[0] !== f
      ? ((r = f("web.create.pair_category_all")), (p[0] = f), (p[1] = r))
      : (r = p[1]),
      p[2] !== r
        ? ((a = { value: "all", label: r }), (p[2] = r), (p[3] = a))
        : (a = p[3]),
      p[4] !== f
        ? ((i = f("web.create.pair_category_stocks")), (p[4] = f), (p[5] = i))
        : (i = p[5]),
      p[6] !== i
        ? ((s = { value: "stocks", label: i }), (p[6] = i), (p[7] = s))
        : (s = p[7]),
      p[8] !== f
        ? ((n = f("web.create.pair_category_crypto")), (p[8] = f), (p[9] = n))
        : (n = p[9]),
      p[10] !== n
        ? ((o = { value: "crypto", label: n }), (p[10] = n), (p[11] = o))
        : (o = p[11]),
      p[12] !== f
        ? ((l = f("web.create.pair_category_memes")), (p[12] = f), (p[13] = l))
        : (l = p[13]),
      p[14] !== l
        ? ((c = { value: "memes", label: l }), (p[14] = l), (p[15] = c))
        : (c = p[15]),
      p[16] !== a || p[17] !== s || p[18] !== o || p[19] !== c
        ? ((d = [a, s, o, c]),
          (p[16] = a),
          (p[17] = s),
          (p[18] = o),
          (p[19] = c),
          (p[20] = d))
        : (d = p[20]));
    let b = d;
    return (
      p[21] !== b || p[22] !== h || p[23] !== x
        ? ((m = (0, t.jsx)("div", {
            className: "px-4 pt-3",
            children: (0, t.jsx)(ed.f, {
              items: b,
              value: x,
              onValueChange: h,
            }),
          })),
          (p[21] = b),
          (p[22] = h),
          (p[23] = x),
          (p[24] = m))
        : (m = p[24]),
      m
    );
  }
  var eu = e.i(213618),
    ep = e.i(690877),
    ex = e.i(536925),
    eh = e.i(997887),
    ef = e.i(47938),
    eb = e.i(466931),
    e_ = e.i(369091),
    eg = e.i(358893),
    ey = e.i(493025);
  let ev = new Set(),
    ew = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  function eE(e, t, r) {
    if (!r.ok) throw Error(`Pump coin search failed: ${r.status}`);
  }
  function eN(e) {
    return e.mint;
  }
  e.i(12641);
  var ej = e.i(34011),
    eC = e.i(116830),
    eT = e.i(967694),
    eI = e.i(248496),
    ek = e.i(338319),
    eA = e.i(187611);
  let eS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
    eO = "comfortable",
    eP = eo.s[eO],
    eR = (e) => {
      "mouse" === e.pointerType && e.stopPropagation();
    };
  function eL(e) {
    let r,
      a,
      s,
      n,
      o = (0, _.c)(15),
      {
        isOpen: l,
        isLoading: c,
        stocks: d,
        onSelect: m,
        onSelectPumpCoin: u,
        onClose: p,
      } = e;
    return (
      o[0] !== p
        ? ((r = (e) => {
            e || p();
          }),
          (o[0] = p),
          (o[1] = r))
        : (r = o[1]),
      o[2] !== c ||
      o[3] !== l ||
      o[4] !== p ||
      o[5] !== m ||
      o[6] !== u ||
      o[7] !== d
        ? ((a = l
            ? (0, t.jsx)(eM, {
                isLoading: c,
                stocks: d,
                onSelect: m,
                onSelectPumpCoin: u,
                onClose: p,
              })
            : null),
          (o[2] = c),
          (o[3] = l),
          (o[4] = p),
          (o[5] = m),
          (o[6] = u),
          (o[7] = d),
          (o[8] = a))
        : (a = o[8]),
      o[9] !== a
        ? ((s = (0, t.jsx)(i.s, {
            className:
              "w-full max-h-[92dvh] overflow-hidden p-0 sm:max-w-[440px]",
            children: a,
          })),
          (o[9] = a),
          (o[10] = s))
        : (s = o[10]),
      o[11] !== l || o[12] !== r || o[13] !== s
        ? ((n = (0, t.jsx)(i.v, { isOpen: l, onIsOpenChange: r, children: s })),
          (o[11] = l),
          (o[12] = r),
          (o[13] = s),
          (o[14] = n))
        : (n = o[14]),
      n
    );
  }
  function eM(e) {
    let r,
      i,
      s,
      n,
      o,
      l,
      c,
      d,
      p,
      x,
      h,
      f,
      b,
      g,
      y,
      v,
      w,
      E,
      N,
      j = (0, _.c)(54),
      {
        isLoading: C,
        stocks: T,
        onSelect: I,
        onSelectPumpCoin: k,
        onClose: A,
      } = e,
      { t: S } = (0, u.f)(),
      [O, R] = (0, m.useState)(""),
      [L, M] = (0, m.useState)("all");
    j[0] !== T
      ? ((r = T.some((e) => void 0 !== ec(e))), (j[0] = T), (j[1] = r))
      : (r = j[1]);
    let D = r,
      F = eU("all" === L ? T : T.filter((e) => ec(e) === L), O),
      B = O.trim(),
      U = (function (e) {
        let t,
          r,
          a,
          i,
          s,
          n,
          o,
          l,
          c,
          d,
          u,
          p = (0, _.c)(34),
          { term: x } = e;
        p[0] !== x ? ((t = x.trim()), (p[0] = x), (p[1] = t)) : (t = p[1]);
        let [h] = (0, ex.r)(t, 250),
          { ipfsPrefix: f } = (0, e_.useIpfsPrefix)(),
          b = (0, eg.M)(),
          g = (0, ef.u)();
        p[2] !== g.data
          ? ((r = g.data ? new Set(g.data.map(eN)) : ev),
            (p[2] = g.data),
            (p[3] = r))
          : (r = p[3]);
        let y = r;
        p[4] !== h || p[5] !== b || p[6] !== f
          ? ((a = ["create", "pump-quote-coin-search", h, 1, b, f]),
            (p[4] = h),
            (p[5] = b),
            (p[6] = f),
            (p[7] = a))
          : (a = p[7]);
        let v = "" !== h;
        (p[8] !== y
          ? ((i = (e) =>
              e.filter(
                (t, r) =>
                  !!(t.name && t.symbol) &&
                  "pump" === t.program &&
                  !t.raydium_pool &&
                  (t.depth ?? 0) <= 1 &&
                  !(0, P.z)(t) &&
                  !0 !== t.is_banned &&
                  void 0 !== t.base_decimals &&
                  !y.has(t.mint) &&
                  ((t.depth ?? 0) > 0 ||
                    (0, z.Q)(t.quote_mint) ||
                    (0, z.Y)(t.quote_mint) ||
                    y.has(t.quote_mint ?? "")) &&
                  e.findIndex((e) => e.mint === t.mint) === r,
              )),
            (p[8] = y),
            (p[9] = i))
          : (i = p[9]),
          p[10] !== h || p[11] !== b || p[12] !== f
            ? ((s = async (e) => {
                let { signal: t } = e,
                  r = await (0, et.j)()("GET /coins/search-unrestricted", {
                    query: {
                      searchTerm: h,
                      limit: 20,
                      offset: 0,
                      includeNsfw: b,
                      sort: "market_cap",
                      order: "DESC",
                      program: "pump",
                      maxDepth: 1,
                    },
                    credentials: "include",
                    signal: t,
                    hooks: { afterResponse: [eE] },
                  });
                return (0, ey.f)((0, eh.l)(r), f);
              }),
              (p[10] = h),
              (p[11] = b),
              (p[12] = f),
              (p[13] = s))
            : (s = p[13]),
          p[14] !== a || p[15] !== v || p[16] !== i || p[17] !== s
            ? ((n = {
                queryKey: a,
                enabled: v,
                staleTime: 3e4,
                placeholderData: eu.y,
                select: i,
                queryFn: s,
              }),
              (p[14] = a),
              (p[15] = v),
              (p[16] = i),
              (p[17] = s),
              (p[18] = n))
            : (n = p[18]));
        let w = (0, ep.useQuery)(n),
          E = w.isError && !w.isFetching ? w.error : null;
        (p[19] !== h || p[20] !== E
          ? ((o = () => {
              E &&
                (0, eb.l)({
                  error: E,
                  feature: "coin-creation",
                  operation: "pair-search",
                  context: { mint: ew.test(h) ? h : void 0 },
                });
            }),
            (l = [E, h]),
            (p[19] = h),
            (p[20] = E),
            (p[21] = o),
            (p[22] = l))
          : ((o = p[21]), (l = p[22])),
          (0, m.useEffect)(o, l));
        let N = w.isError ? void 0 : w.data;
        p[23] !== h || p[24] !== w.isFetching || p[25] !== x
          ? ((c = w.isFetching || x.trim() !== h),
            (p[23] = h),
            (p[24] = w.isFetching),
            (p[25] = x),
            (p[26] = c))
          : (c = p[26]);
        let j = null !== E;
        return (
          p[27] !== w
            ? ((d = () => {
                w.refetch();
              }),
              (p[27] = w),
              (p[28] = d))
            : (d = p[28]),
          p[29] !== N || p[30] !== c || p[31] !== j || p[32] !== d
            ? ((u = { data: N, isSearching: c, isError: j, refetch: d }),
              (p[29] = N),
              (p[30] = c),
              (p[31] = j),
              (p[32] = d),
              (p[33] = u))
            : (u = p[33]),
          u
        );
      })({ term: B }),
      G = "" !== B && ("all" === L || "memes" === L);
    j[2] !== G || j[3] !== U
      ? ((i = G && !U.isError ? (U.data ?? []) : []),
        (j[2] = G),
        (j[3] = U),
        (j[4] = i))
      : (i = j[4]);
    let q = i,
      H = 0 === F.length && 0 === q.length,
      V = G && U.isSearching,
      W = G && U.isError,
      $ = H && (C || V);
    (j[5] !== S
      ? ((s = S("web.create.pair_stock_dialog_title")), (j[5] = S), (j[6] = s))
      : (s = j[6]),
      j[7] !== s
        ? ((n = (0, t.jsx)("p", {
            className: "min-w-0 flex-1 text-base font-bold text-text-primary",
            children: s,
          })),
          (j[7] = s),
          (j[8] = n))
        : (n = j[8]),
      j[9] !== S
        ? ((o = S("common.close")), (j[9] = S), (j[10] = o))
        : (o = j[10]),
      j[11] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsx)(a.AD, { className: "size-4" })), (j[11] = l))
        : (l = j[11]),
      j[12] !== A || j[13] !== o
        ? ((c = (0, t.jsx)("button", {
            type: "button",
            "aria-label": o,
            onClick: A,
            className:
              "flex size-7 shrink-0 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-bg-quaternary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30",
            children: l,
          })),
          (j[12] = A),
          (j[13] = o),
          (j[14] = c))
        : (c = j[14]),
      j[15] !== n || j[16] !== c
        ? ((d = (0, t.jsxs)("div", {
            className:
              "flex items-start gap-3 border-b border-solid border-border-secondary px-4 pb-3 pt-4",
            children: [n, c],
          })),
          (j[15] = n),
          (j[16] = c),
          (j[17] = d))
        : (d = j[17]),
      j[18] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = (0, t.jsx)(a.L3, {
            "aria-hidden": !0,
            className:
              "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-tertiary",
          })),
          (j[18] = p))
        : (p = j[18]),
      j[19] === Symbol.for("react.memo_cache_sentinel")
        ? ((x = (e) => R(e.target.value)), (j[19] = x))
        : (x = j[19]),
      j[20] !== S
        ? ((h = S("web.create.pair_stock_search_placeholder")),
          (j[20] = S),
          (j[21] = h))
        : (h = j[21]),
      j[22] !== S
        ? ((f = S("web.create.pair_stock_search_placeholder")),
          (j[22] = S),
          (j[23] = f))
        : (f = j[23]),
      j[24] !== O || j[25] !== h || j[26] !== f
        ? ((b = (0, t.jsx)("div", {
            className: "px-4 pt-3",
            children: (0, t.jsxs)("div", {
              className: "relative",
              children: [
                p,
                (0, t.jsx)("input", {
                  autoFocus: !0,
                  type: "text",
                  value: O,
                  onChange: x,
                  placeholder: h,
                  "aria-label": f,
                  className:
                    "w-full rounded-lg border border-solid border-border-secondary bg-bg-primary py-2 pl-9 pr-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary hover:border-border-tertiary focus-visible:border-white/30",
                }),
              ],
            }),
          })),
          (j[24] = O),
          (j[25] = h),
          (j[26] = f),
          (j[27] = b))
        : (b = j[27]),
      j[28] !== L || j[29] !== D
        ? ((g = D ? (0, t.jsx)(em, { value: L, onValueChange: M }) : null),
          (j[28] = L),
          (j[29] = D),
          (j[30] = g))
        : (g = j[30]),
      j[31] !== S
        ? ((y = S("web.create.pair_stock_dialog_title")),
          (j[31] = S),
          (j[32] = y))
        : (y = j[32]));
    let K = $
      ? (0, t.jsx)(eF, {})
      : H && !W
        ? (0, t.jsx)("li", {
            className: "px-2.5 py-8 text-center text-sm text-text-tertiary",
            children: S(
              G && eS.test(B)
                ? "web.create.pair_pump_not_eligible"
                : "common.no_results",
            ),
          })
        : F.map((e) =>
            (0, t.jsx)(
              eD,
              {
                coin: { mint: e.mint, name: e.symbol, symbol: e.ticker },
                art: (0, t.jsx)(en.f, {
                  stock: e,
                  className: "size-full rounded-none",
                }),
                name: (0, eA.T)(e.symbol, "coin-symbol"),
                meta: (0, eA.T)(e.ticker, "coin-symbol"),
                marketCapUsd: e.marketCapUsd,
                liquidityUsd: e.liquidityUsd,
                onClick: () => I(e),
              },
              e.mint,
            ),
          );
    if (j[33] !== k || j[34] !== q) {
      let e;
      (j[36] !== k
        ? ((e = (e) =>
            (0, t.jsx)(
              eD,
              {
                coin: e,
                name: (0, eA.T)(e.name ?? e.mint, "coin-name"),
                meta: (0, eA.T)(e.symbol ?? e.mint, "coin-symbol"),
                marketCapUsd: e.usd_market_cap || void 0,
                liquidityUsd: e.canonical_pool_liquidity_usd || void 0,
                onClick: () => k(e),
              },
              e.mint,
            )),
          (j[36] = k),
          (j[37] = e))
        : (e = j[37]),
        (v = q.map(e)),
        (j[33] = k),
        (j[34] = q),
        (j[35] = v));
    } else v = j[35];
    return (
      j[38] !== U || j[39] !== W || j[40] !== $ || j[41] !== S
        ? ((w =
            W && !$
              ? (0, t.jsx)("li", {
                  children: (0, t.jsx)(eT.f, {
                    density: eO,
                    onRetry: U.refetch,
                    children: S("web.create.pair_search_unavailable"),
                  }),
                })
              : null),
          (j[38] = U),
          (j[39] = W),
          (j[40] = $),
          (j[41] = S),
          (j[42] = w))
        : (w = j[42]),
      j[43] !== y || j[44] !== K || j[45] !== v || j[46] !== w
        ? ((E = (0, t.jsxs)("ul", {
            "aria-label": y,
            className:
              "custom-scrollbar flex max-h-[60vh] min-h-[160px] flex-col gap-1 overflow-y-auto p-2",
            children: [K, v, w],
          })),
          (j[43] = y),
          (j[44] = K),
          (j[45] = v),
          (j[46] = w),
          (j[47] = E))
        : (E = j[47]),
      j[48] !== d || j[49] !== b || j[50] !== g || j[51] !== E || j[52] !== eR
        ? ((N = (0, t.jsxs)("div", {
            className: "flex flex-col",
            onPointerDown: eR,
            children: [d, b, g, E],
          })),
          (j[48] = d),
          (j[49] = b),
          (j[50] = g),
          (j[51] = E),
          (j[52] = eR),
          (j[53] = N))
        : (N = j[53]),
      N
    );
  }
  function eD(e) {
    let r,
      a,
      i,
      s,
      n,
      o,
      l,
      c,
      d,
      m,
      p,
      x,
      h,
      f = (0, _.c)(31),
      {
        coin: b,
        art: g,
        name: y,
        meta: v,
        marketCapUsd: w,
        liquidityUsd: E,
        onClick: N,
      } = e,
      { t: j } = (0, u.f)();
    return (
      f[0] !== g || f[1] !== b
        ? ((r = (0, t.jsx)(ej.CoinAvatar, { coin: b, size: eP, children: g })),
          (f[0] = g),
          (f[1] = b),
          (f[2] = r))
        : (r = f[2]),
      f[3] !== b || f[4] !== y
        ? ((a = (0, t.jsx)("span", {
            className: eo.x[eO],
            children: (0, t.jsx)(eC.f, {
              coin: b,
              nameClassName: eo.n[eO],
              children: y,
            }),
          })),
          (f[3] = b),
          (f[4] = y),
          (f[5] = a))
        : (a = f[5]),
      f[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, ek.c)("truncate", eo.B[eO])), (f[6] = i))
        : (i = f[6]),
      f[7] !== v
        ? ((s = (0, t.jsx)("span", { className: i, children: v })),
          (f[7] = v),
          (f[8] = s))
        : (s = f[8]),
      f[9] !== a || f[10] !== s
        ? ((n = (0, t.jsxs)("span", {
            className: "flex min-w-0 flex-1 flex-col",
            children: [a, s],
          })),
          (f[9] = a),
          (f[10] = s),
          (f[11] = n))
        : (n = f[11]),
      f[12] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, ek.c)("flex h-5 items-center", eo.e[eO])), (f[12] = o))
        : (o = f[12]),
      f[13] !== w
        ? ((l = void 0 === w ? null : (0, G.N)(w)), (f[13] = w), (f[14] = l))
        : (l = f[14]),
      f[15] !== l
        ? ((c = (0, t.jsx)("span", { className: o, children: l })),
          (f[15] = l),
          (f[16] = c))
        : (c = f[16]),
      f[17] === Symbol.for("react.memo_cache_sentinel")
        ? ((d = (0, ek.c)(eo.N, eo.C[eO], "text-text-quaternary")), (f[17] = d))
        : (d = f[17]),
      f[18] !== E || f[19] !== j
        ? ((m =
            void 0 === E
              ? null
              : `${j("mayhem_mode.summary_pills.liquidity")} • ${(0, G.N)(E)}`),
          (f[18] = E),
          (f[19] = j),
          (f[20] = m))
        : (m = f[20]),
      f[21] !== m
        ? ((p = (0, t.jsx)("span", { className: d, children: m })),
          (f[21] = m),
          (f[22] = p))
        : (p = f[22]),
      f[23] !== p || f[24] !== c
        ? ((x = (0, t.jsxs)("span", {
            className: "flex shrink-0 flex-col items-end",
            children: [c, p],
          })),
          (f[23] = p),
          (f[24] = c),
          (f[25] = x))
        : (x = f[25]),
      f[26] !== N || f[27] !== r || f[28] !== x || f[29] !== n
        ? ((h = (0, t.jsx)("li", {
            children: (0, t.jsxs)("button", {
              type: "button",
              className:
                "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-bg-tertiary focus-visible:bg-bg-tertiary focus-visible:outline-none",
              onClick: N,
              children: [r, n, x],
            }),
          })),
          (f[26] = N),
          (f[27] = r),
          (f[28] = x),
          (f[29] = n),
          (f[30] = h))
        : (h = f[30]),
      h
    );
  }
  function eF() {
    let e,
      r = (0, _.c)(1);
    return (
      r[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)(t.Fragment, {
            children: Array.from({ length: 4 }, eB),
          })),
          (r[0] = e))
        : (e = r[0]),
      e
    );
  }
  function eB(e, r) {
    return (0, t.jsxs)(
      "li",
      {
        "aria-hidden": !0,
        className: "flex items-center gap-3 px-2.5 py-2",
        children: [
          (0, t.jsx)(eI.l, { variant: "art", size: eP }),
          (0, t.jsxs)("span", {
            className: "flex flex-1 flex-col gap-1 py-0.5",
            children: [
              (0, t.jsx)(eI.l, { height: 14, width: 112 }),
              (0, t.jsx)(eI.l, { height: 12, width: 48 }),
            ],
          }),
          (0, t.jsxs)("span", {
            className: "flex shrink-0 flex-col items-end gap-1 py-0.5",
            children: [
              (0, t.jsx)(eI.l, { height: 14, width: 48 }),
              (0, t.jsx)(eI.l, { height: 12, width: 64 }),
            ],
          }),
        ],
      },
      r,
    );
  }
  let eU = (e, t) => {
    let r = t.trim().toLowerCase();
    return r
      ? e.filter(
          (e) =>
            e.symbol.toLowerCase().includes(r) ||
            e.ticker.toLowerCase().includes(r),
        )
      : e;
  };
  var eG = e.i(656846);
  function eq() {
    let e,
      r,
      i,
      s,
      n,
      o,
      l,
      c,
      d,
      x,
      h,
      b,
      g,
      y,
      w,
      E,
      N,
      j,
      C,
      T,
      I,
      k,
      A,
      S = (0, _.c)(62),
      { t: O } = (0, u.f)(),
      { pair: P, setPair: L } = (0, v.g)(),
      [M, D] = (0, m.useState)(!1),
      F = (0, ef.s)();
    S[0] !== F.data
      ? ((e = F.data ?? []), (S[0] = F.data), (S[1] = e))
      : (e = S[1]);
    let B = e,
      U = "stock" === P.kind ? P.stock : void 0,
      G = "pump" === P.kind ? P.coin : void 0,
      q = "stock" === P.kind || "pump" === P.kind,
      z = B.length > 0 || q;
    S[2] !== O
      ? ((r = () => {
          let e = R.i.getState();
          e.isMayhemEnabled &&
            (e.setIsMayhemEnabled(!1),
            p.c.info(O("web.create.pair_stock_mayhem_unsupported")));
          let t = ea.getState();
          t.enabled &&
            (t.setEnabled(!1),
            p.c.info(O("web.create.pair_stock_fee_sharing_unsupported")));
        }),
        (S[2] = O),
        (S[3] = r))
      : (r = S[3]);
    let H = r;
    S[4] !== H || S[5] !== P.kind || S[6] !== L
      ? ((i = (e) => {
          e !== P.kind && ("stock" === e && H(), L({ kind: e }));
        }),
        (S[4] = H),
        (S[5] = P.kind),
        (S[6] = L),
        (S[7] = i))
      : (i = S[7]);
    let V = i;
    (S[8] !== O
      ? ((s = O("web.create.pair_asset_label")), (S[8] = O), (S[9] = s))
      : (s = S[9]),
      S[10] !== s
        ? ((n = (0, t.jsx)("p", {
            className: "text-xs font-semibold text-text-primary",
            children: s,
          })),
          (S[10] = s),
          (S[11] = n))
        : (n = S[11]),
      S[12] !== O
        ? ((o = O("web.create.pair_asset_label")), (S[12] = O), (S[13] = o))
        : (o = S[13]));
    let W = z ? "grid-cols-3" : "grid-cols-2";
    (S[14] !== W
      ? ((l = (0, ek.c)("grid gap-2", W)), (S[14] = W), (S[15] = l))
      : (l = S[15]),
      S[16] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = (0, eA.T)("SOL", "brand-name")), (S[16] = c))
        : (c = S[16]));
    let $ = "sol" === P.kind;
    (S[17] !== V
      ? ((d = () => V("sol")), (S[17] = V), (S[18] = d))
      : (d = S[18]),
      S[19] === Symbol.for("react.memo_cache_sentinel")
        ? ((x = (0, t.jsx)(es.default, {
            alt: "",
            className: "size-6 rounded-full",
            height: 24,
            src: f.T.solana,
            width: 24,
          })),
          (S[19] = x))
        : (x = S[19]),
      S[20] !== d || S[21] !== $
        ? ((h = (0, t.jsx)(eH, {
            label: c,
            isSelected: $,
            onSelect: d,
            children: x,
          })),
          (S[20] = d),
          (S[21] = $),
          (S[22] = h))
        : (h = S[22]),
      S[23] === Symbol.for("react.memo_cache_sentinel")
        ? ((b = (0, eA.T)("USDC", "brand-name")), (S[23] = b))
        : (b = S[23]));
    let K = "usdc" === P.kind;
    return (
      S[24] !== V
        ? ((g = () => V("usdc")), (S[24] = V), (S[25] = g))
        : (g = S[25]),
      S[26] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = (0, t.jsx)(es.default, {
            alt: "",
            className: "size-6 rounded-full object-cover",
            height: 24,
            src: eG.f.imageUri,
            width: 24,
          })),
          (S[26] = y))
        : (y = S[26]),
      S[27] !== K || S[28] !== g
        ? ((w = (0, t.jsx)(eH, {
            label: b,
            isSelected: K,
            onSelect: g,
            children: y,
          })),
          (S[27] = K),
          (S[28] = g),
          (S[29] = w))
        : (w = S[29]),
      S[30] !== q || S[31] !== V || S[32] !== z || S[33] !== O
        ? ((E = z
            ? (0, t.jsx)(eH, {
                label: O("web.create.pair_stocks"),
                isSelected: q,
                onSelect: () => {
                  q || V("stock");
                },
                children: (0, t.jsx)(ez, { className: "size-8" }),
              })
            : null),
          (S[30] = q),
          (S[31] = V),
          (S[32] = z),
          (S[33] = O),
          (S[34] = E))
        : (E = S[34]),
      S[35] !== h || S[36] !== w || S[37] !== E || S[38] !== o || S[39] !== l
        ? ((N = (0, t.jsxs)("div", {
            role: "radiogroup",
            "aria-label": o,
            className: l,
            children: [h, w, E],
          })),
          (S[35] = h),
          (S[36] = w),
          (S[37] = E),
          (S[38] = o),
          (S[39] = l),
          (S[40] = N))
        : (N = S[40]),
      S[41] !== q || S[42] !== M || S[43] !== G || S[44] !== U || S[45] !== O
        ? ((j = q
            ? (0, t.jsxs)("button", {
                type: "button",
                "aria-haspopup": "dialog",
                "aria-expanded": M,
                onClick: () => D(!0),
                className:
                  "flex h-12 w-full items-center gap-2 rounded-xl border border-border-secondary bg-bg-secondary px-3 text-start text-xs font-semibold text-text-primary transition-colors hover:bg-bg-tertiary",
                children: [
                  G
                    ? (0, t.jsxs)(t.Fragment, {
                        children: [
                          (0, t.jsx)("span", {
                            "aria-hidden": !0,
                            className: "flex shrink-0",
                            children: (0, t.jsx)(ej.CoinAvatar, {
                              coin: G,
                              size: 32,
                              shape: "round",
                              hideCorner: !0,
                            }),
                          }),
                          (0, t.jsx)("span", {
                            className: "min-w-0 flex-1 truncate",
                            children: O("web.create.pair_with_stock", {
                              symbol: G.symbol,
                              ticker: G.name,
                            }),
                          }),
                          (0, t.jsx)("span", {
                            className: "font-normal text-text-tertiary",
                            children: O("web.create.pair_change"),
                          }),
                        ],
                      })
                    : U
                      ? (0, t.jsxs)(t.Fragment, {
                          children: [
                            (0, t.jsx)(en.f, { stock: U, className: "size-8" }),
                            (0, t.jsx)("span", {
                              className: "min-w-0 flex-1 truncate",
                              children: O("web.create.pair_with_stock", {
                                symbol: U.symbol,
                                ticker: U.ticker,
                              }),
                            }),
                            (0, t.jsx)("span", {
                              className: "font-normal text-text-tertiary",
                              children: O("web.create.pair_change"),
                            }),
                          ],
                        })
                      : (0, t.jsx)("span", {
                          className: "min-w-0 flex-1 truncate",
                          children: O("web.create.pair_select_stock"),
                        }),
                  (0, t.jsx)(a.kK, {
                    className: "shrink-0 text-text-tertiary",
                    size: 16,
                  }),
                ],
              })
            : null),
          (S[41] = q),
          (S[42] = M),
          (S[43] = G),
          (S[44] = U),
          (S[45] = O),
          (S[46] = j))
        : (j = S[46]),
      S[47] === Symbol.for("react.memo_cache_sentinel")
        ? ((C = () => D(!1)), (S[47] = C))
        : (C = S[47]),
      S[48] !== L
        ? ((T = (e) => {
            (L({ kind: "stock", stock: e }), D(!1));
          }),
          (I = (e) => {
            (L({
              kind: "pump",
              coin: {
                ...e,
                name: e.name ?? e.mint,
                symbol: e.symbol ?? e.mint,
              },
            }),
              D(!1));
          }),
          (S[48] = L),
          (S[49] = T),
          (S[50] = I))
        : ((T = S[49]), (I = S[50])),
      S[51] !== M ||
      S[52] !== B ||
      S[53] !== F.isPending ||
      S[54] !== T ||
      S[55] !== I
        ? ((k = (0, t.jsx)(eL, {
            isOpen: M,
            isLoading: F.isPending,
            stocks: B,
            onClose: C,
            onSelect: T,
            onSelectPumpCoin: I,
          })),
          (S[51] = M),
          (S[52] = B),
          (S[53] = F.isPending),
          (S[54] = T),
          (S[55] = I),
          (S[56] = k))
        : (k = S[56]),
      S[57] !== N || S[58] !== j || S[59] !== k || S[60] !== n
        ? ((A = (0, t.jsxs)("div", {
            className: "flex flex-col gap-2",
            children: [n, N, j, k],
          })),
          (S[57] = N),
          (S[58] = j),
          (S[59] = k),
          (S[60] = n),
          (S[61] = A))
        : (A = S[61]),
      A
    );
  }
  function ez(e) {
    let r,
      a,
      i,
      s,
      n,
      o = (0, _.c)(6),
      { className: l } = e;
    return (
      o[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsx)("rect", {
            fill: "#1B1B1F",
            height: "32",
            rx: "16",
            width: "32",
          })),
          (o[0] = r))
        : (r = o[0]),
      o[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)("defs", {
            children: (0, t.jsxs)("linearGradient", {
              gradientUnits: "userSpaceOnUse",
              id: "stocks-pair-gradient",
              x1: "16",
              x2: "16",
              y1: "8",
              y2: "24",
              children: [
                (0, t.jsx)("stop", {
                  stopColor: "#FFFFFF",
                  stopOpacity: "0.9",
                }),
                (0, t.jsx)("stop", { offset: "1", stopColor: "#9AF2B8" }),
              ],
            }),
          })),
          (i = (0, t.jsx)("path", {
            d: "M12.8 8.8C12.8 8.35817 12.4418 8 12 8C11.5582 8 11.2 8.35817 11.2 8.8V13.6H10.4C9.51634 13.6 8.8 14.3163 8.8 15.2V20C8.8 20.8837 9.51634 21.6 10.4 21.6H11.2V23.2C11.2 23.6418 11.5582 24 12 24C12.4418 24 12.8 23.6418 12.8 23.2V21.6H13.6C14.4837 21.6 15.2 20.8837 15.2 20V15.2C15.2 14.3163 14.4837 13.6 13.6 13.6H12.8V8.8Z",
            fill: "url(#stocks-pair-gradient)",
          })),
          (s = (0, t.jsx)("path", {
            d: "M20.8 8.8C20.8 8.35817 20.4418 8 20 8C19.5582 8 19.2 8.35817 19.2 8.8V10.4H18.4C17.5163 10.4 16.8 11.1163 16.8 12V20C16.8 20.8837 17.5163 21.6 18.4 21.6H19.2V23.2C19.2 23.6418 19.5582 24 20 24C20.4418 24 20.8 23.6418 20.8 23.2V21.6H21.6C22.4837 21.6 23.2 20.8837 23.2 20V12C23.2 11.1163 22.4837 10.4 21.6 10.4H20.8V8.8Z",
            fill: "url(#stocks-pair-gradient)",
          })),
          (o[1] = a),
          (o[2] = i),
          (o[3] = s))
        : ((a = o[1]), (i = o[2]), (s = o[3])),
      o[4] !== l
        ? ((n = (0, t.jsxs)("svg", {
            "aria-hidden": !0,
            className: l,
            fill: "none",
            viewBox: "0 0 32 32",
            xmlns: "http://www.w3.org/2000/svg",
            children: [r, a, i, s],
          })),
          (o[4] = l),
          (o[5] = n))
        : (n = o[5]),
      n
    );
  }
  function eH(e) {
    let r,
      a,
      i,
      s = (0, _.c)(10),
      { label: n, isSelected: o, onSelect: l, children: c } = e,
      d = o
        ? "border-positive bg-positive/10"
        : "border-border-secondary bg-bg-secondary hover:bg-bg-tertiary";
    return (
      s[0] !== d
        ? ((r = (0, ek.c)(
            "flex h-12 items-center justify-center gap-2 rounded-xl border text-xs font-semibold text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-accent",
            d,
          )),
          (s[0] = d),
          (s[1] = r))
        : (r = s[1]),
      s[2] !== n
        ? ((a = (0, t.jsx)("span", { children: n })), (s[2] = n), (s[3] = a))
        : (a = s[3]),
      s[4] !== c || s[5] !== o || s[6] !== l || s[7] !== r || s[8] !== a
        ? ((i = (0, t.jsxs)("button", {
            type: "button",
            role: "radio",
            "aria-checked": o,
            onClick: l,
            className: r,
            children: [c, a],
          })),
          (s[4] = c),
          (s[5] = o),
          (s[6] = l),
          (s[7] = r),
          (s[8] = a),
          (s[9] = i))
        : (i = s[9]),
      i
    );
  }
  var eV = e.i(256272),
    eW = e.i(974658),
    e$ = e.i(16004),
    eK = e.i(240763),
    eX = e.i(586090),
    eQ = e.i(609926),
    eJ = e.i(66094),
    eY = e.i(807757),
    eZ = e.i(729047),
    e0 = e.i(421813),
    e1 = e.i(414571),
    e2 = e.i(921514),
    e3 = e.i(401605),
    e4 = e.i(503630);
  let e5 = eX.O.BANNER,
    e8 = e5 / 1e6,
    e6 = {
      targetBytes: 1e6,
      jpegLadder: [
        { maxEdgePx: 3e3, quality: 0.85 },
        { maxEdgePx: 3e3, quality: 0.7 },
        { maxEdgePx: 1500, quality: 0.8 },
        { maxEdgePx: 1500, quality: 0.6 },
      ],
      pngLadder: [
        { maxEdgePx: 3e3, quality: 1 },
        { maxEdgePx: 1500, quality: 1 },
      ],
    },
    e9 = async (e) => {
      if (e.type in eX.G) return e.type;
      let t = await (0, eY.x)(e);
      return "image/jpg" === t ? "image/jpeg" : t && t in eX.G ? t : void 0;
    },
    e7 = async (e) => {
      let t,
        r = await e9(e);
      if (!r) return { ok: !1, reason: "unsupported_type" };
      if ("image/gif" === r || (await (0, eJ.q)(e)))
        return e.size <= e5
          ? { ok: !0, file: e, type: r, resized: !1 }
          : { ok: !1, reason: "too_large" };
      try {
        t = await (0, eJ.$)(e);
      } catch {
        return { ok: !1, reason: "unreadable" };
      }
      let { width: a, height: i } = (0, eJ.H)(t);
      try {
        if (!(e.size > 1e6 || Math.max(a, i) > 3e3))
          return e.size <= e5
            ? { ok: !0, file: e, type: r, width: a, height: i, resized: !1 }
            : { ok: !1, reason: "too_large" };
        let s = await (0, eJ.I)({ file: e, source: t, profile: e6 });
        if (!s)
          return e.size <= e5
            ? { ok: !0, file: e, type: r, width: a, height: i, resized: !1 }
            : { ok: !1, reason: "too_large" };
        if (!(s.size <= e5)) return { ok: !1, reason: "too_large" };
        return {
          ok: !0,
          file: s,
          type: "image/png" === s.type ? "image/png" : "image/jpeg",
          width: a,
          height: i,
          resized: !0,
        };
      } catch {
        return e.size <= e5
          ? { ok: !0, file: e, type: r, width: a, height: i, resized: !1 }
          : { ok: !1, reason: "too_large" };
      } finally {
        "close" in t && t.close();
      }
    },
    te = (e) => {
      try {
        return JSON.parse(e);
      } catch {
        return;
      }
    },
    tt = (e) => {
      if (!e || "object" != typeof e) return;
      let { message: t, error: r } = e,
        a = t ?? r;
      return "string" == typeof a
        ? a
        : Array.isArray(a) && a.every((e) => "string" == typeof e)
          ? a.join(" ")
          : void 0;
    },
    tr = (e) => new Promise((t) => setTimeout(t, e)),
    ta = (e) => (e ? { fetch: (t, r) => e(t, r) } : {}),
    ti = async ({
      mint: e,
      fileUri: t,
      retries: r = 4,
      retryDelayMs: a = 1e3,
      fetchImpl: i,
    }) => {
      let s = 0;
      for (;;) {
        let n;
        try {
          let r = 0,
            a = await (0, et.j)({
              ...ta(i),
              throwHttpErrors: !1,
              parseJson: te,
              hooks: {
                afterResponse: [
                  (e, t, a) => {
                    r = a.status;
                  },
                ],
              },
            })("POST /coins/add-banner", {
              body: { mint: e, banner: t },
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            });
          if (r >= 200 && r < 300) return { ok: !0 };
          if (413 === r) return { ok: !1, reason: "too_large", status: 413 };
          let s = tt(a);
          if (404 === r)
            n = { ok: !1, reason: "rejected", status: r, message: s };
          else {
            if (r >= 400 && r < 500)
              return { ok: !1, reason: "rejected", status: r, message: s };
            n = { ok: !1, reason: "unavailable", status: r, message: s };
          }
        } catch (e) {
          n = {
            ok: !1,
            reason: "unavailable",
            message: e instanceof Error ? e.message : String(e),
          };
        }
        if (s >= r) return n;
        ((s += 1), await tr(a));
      }
    },
    ts = `Banner image too large: it must be under ${e8} MB`,
    tn = ({
      decodedJwt: e,
      name: t,
      ticker: r,
      description: a,
      image: i,
      video: s,
      banner: n,
      videoUploaded: o,
      previewStatus: l,
      selectedPreview: c,
      telegram: d,
      website: m,
      twitter: u,
    }) => {
      if (!e) throw Error("Connect your wallet and sign in to create a coin");
      if (!t) throw Error("Coin needs a name");
      if ((0, eY.W)(t) > eX.f.NAME_MAX_LENGTH)
        throw Error("Name too long: it must be less than 32 characters");
      if (!r) throw Error("Coin needs a ticker");
      if ((0, eY.W)(r) > eX.f.TICKER_MAX_LENGTH)
        throw Error("Ticker cannot be more than 10 characters");
      if (a && a.length > eX.f.DESCRIPTION_MAX_LENGTH)
        throw Error("Description too long");
      if (i && i.size > eX.O.IMAGE)
        throw Error("Image too large: it must be less than 4.3 megabytes");
      if (s && s.size > eX.O.VIDEO)
        throw Error("Video too large: it must be less than 10 megabytes");
      if (n && n.size > e5) throw Error(ts);
      if (!i && !s) throw Error("Image or video required");
      if (s && !o) throw Error("Video not uploaded yet");
      if (o && 2 !== l && (!c || !c.length))
        throw Error("Please select a thumbnail");
      if (d && !X.q.telegram.test(d))
        throw Error("Invalid Telegram link format");
      if (m) {
        if (/^http:\/\//.test(m)) throw Error("Website must use HTTPS");
        if (!/^https?:\/\//.test(m))
          throw Error("Website must include protocol (https://)");
        if (!X.q.website.test(m)) throw Error("Invalid Website link format");
      }
      if (u && !X.q.twitter.test(u))
        throw Error("Invalid Twitter/X link format");
    };
  var to = e.i(778435),
    tl = e.i(421159);
  e.s(
    [
      "default",
      0,
      function () {
        let { t: e } = (0, u.f)(),
          x = (0, d.useRouter)(),
          h = (0, d.usePathname)(),
          f = (0, d.useSearchParams)(),
          {
            isMayhemEnabled: b,
            setIsMayhemEnabled: g,
            setIsMayhemManualMode: y,
          } = (0, R.i)(),
          E = (0, v.g)((e) => e.pair),
          j = (0, v.Q)(E),
          k = (0, v._)(E)?.mint,
          {
            image: A,
            video: O,
            preview: P,
            fileType: L,
            videoFileName: M,
            videoS3Url: D,
            imageIpfsHash: U,
            uploading: G,
            videoUploaded: q,
            previewImages: z,
            selectedPreview: V,
            previewStatus: $,
            uploadedBanner: X,
            bannerFileType: J,
            coverProgress: Z,
            handleFileUpload: er,
            handleThumbnailSelection: es,
            uploadToIpfs: en,
            setImage: eo,
            setVideo: el,
            setUploadedFile: ec,
            setFileType: ed,
            setVideoUploaded: em,
            setBanner: eu,
            setUploadedBanner: ep,
            setBannerFileType: ex,
            setPreview: eh,
            reset: ef,
          } = (() => {
            let [e, t] = (0, m.useState)(void 0),
              [r, a] = (0, m.useState)(void 0),
              [i, s] = (0, m.useState)(void 0),
              [n, o] = (0, m.useState)(void 0),
              [l, c] = (0, m.useState)(void 0),
              [d, u] = (0, m.useState)(""),
              [p, x] = (0, m.useState)(void 0),
              [h, f] = (0, m.useState)(void 0),
              [b, g] = (0, m.useState)(!1),
              [y, v] = (0, m.useState)(!1),
              [w, E] = (0, m.useState)([]),
              [N, j] = (0, m.useState)(void 0),
              [C, T] = (0, m.useState)(0),
              [I, k] = (0, m.useState)(void 0),
              [A, S] = (0, m.useState)(void 0),
              [O, P] = (0, m.useState)(void 0),
              R = (() => {
                let e,
                  t,
                  r,
                  a,
                  i,
                  s,
                  n = (0, _.c)(7);
                n[0] === Symbol.for("react.memo_cache_sentinel")
                  ? ((e = { progress: 0, timeRemaining: null }), (n[0] = e))
                  : (e = n[0]);
                let [o, l] = (0, m.useState)(e),
                  c = (0, m.useRef)(null);
                n[1] === Symbol.for("react.memo_cache_sentinel")
                  ? ((t = Date.now()), (n[1] = t))
                  : (t = n[1]);
                let d = (0, m.useRef)(t);
                n[2] === Symbol.for("react.memo_cache_sentinel")
                  ? ((r = []), (n[2] = r))
                  : (r = n[2]);
                let u = (0, m.useRef)(r);
                n[3] === Symbol.for("react.memo_cache_sentinel")
                  ? ((a = (e) => {
                      let t = Date.now();
                      (u.current.push({ time: t, progress: e }),
                        u.current.length > 10 && u.current.shift());
                      let r = u.current.slice(-5);
                      if (r.length >= 2) {
                        let t = r[0],
                          a = r[r.length - 1],
                          i = (a.time - t.time) / 1e3,
                          s = (a.progress - t.progress) / i,
                          n = 100 - e;
                        l({ progress: e, timeRemaining: s > 0 ? n / s : null });
                      } else l({ progress: e, timeRemaining: null });
                      d.current = t;
                    }),
                    (n[3] = a))
                  : (a = n[3]);
                let p = a;
                n[4] === Symbol.for("react.memo_cache_sentinel")
                  ? ((i = (e) => {
                      (null === c.current && (c.current = Date.now()), p(e));
                    }),
                    (n[4] = i))
                  : (i = n[4]);
                let x = i;
                return (
                  n[5] !== o
                    ? ((s = { data: o, setProgress: x }),
                      (n[5] = o),
                      (n[6] = s))
                    : (s = n[6]),
                  s
                );
              })(),
              L = (0, m.useRef)(null),
              M = async (e) => {
                let t = await (0, eZ.w)(await (0, eJ.v)(e));
                return (f(t.cid), t.cid);
              },
              D = async (e) => {
                try {
                  (console.log("handleFileUpload called with file:", e),
                    n && n.startsWith("blob:") && URL.revokeObjectURL(n),
                    o(void 0));
                  let r = await (0, eY.x)(e);
                  if (!r) throw Error("Invalid file type");
                  let i = r.split("/")[0],
                    l = r.split("/")[1];
                  if (
                    (console.log("File type determined:", {
                      category: i,
                      extension: l,
                    }),
                    c({ category: i, extension: l }),
                    "image" === i)
                  ) {
                    let r = URL.createObjectURL(e);
                    (o(r),
                      s(e),
                      t(e),
                      a(void 0),
                      f(void 0),
                      x(void 0),
                      v(!1),
                      E([]),
                      j(void 0));
                  } else if ("video" === i) {
                    let r, i;
                    (console.log("Processing video file"),
                      a(e),
                      s(e),
                      t(void 0),
                      x(void 0),
                      f(void 0));
                    let n = URL.createObjectURL(e);
                    (o(n),
                      g(!0),
                      console.log("Getting signed URL for video upload"));
                    let c = await (0, et.j)()("GET /videos/get-signed-url", {
                      query: { extension: l },
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                      throwHttpErrors: !1,
                      hooks: {
                        afterResponse: [
                          (e, t, r) => {
                            if (!r.ok)
                              throw Error(
                                `Failed to get signed URL: ${r.statusText}`,
                              );
                          },
                        ],
                      },
                    });
                    (console.log("Got signed URL, starting upload"),
                      await ((r = c.url),
                      (i = (e) => {
                        R.setProgress(e);
                      }),
                      new Promise((t, a) => {
                        console.log("Setting up XHR for S3 upload");
                        let s = new XMLHttpRequest();
                        ((s.upload.onprogress = (e) => {
                          if (e.lengthComputable) {
                            let t = (e.loaded / e.total) * 100;
                            (console.log("Upload progress event:", t), i(t));
                          }
                        }),
                          (s.onload = () => {
                            (console.log(
                              "XHR upload complete, status:",
                              s.status,
                            ),
                              s.status >= 200 && s.status < 300
                                ? t(s.response)
                                : a(
                                    Error(
                                      `Upload failed with status ${s.status}`,
                                    ),
                                  ));
                          }),
                          (s.onerror = () => {
                            (console.error("XHR upload error"),
                              a(Error("Network error occurred during upload")));
                          }),
                          (s.onabort = () => {
                            (console.error("XHR upload aborted"),
                              a(Error("Upload was aborted")));
                          }),
                          console.log("Opening XHR connection to:", r.url),
                          s.open("POST", r.url, !0));
                        let n = new FormData();
                        return (
                          Object.entries(r.fields).forEach(([e, t]) => {
                            (console.log("Adding form field:", e),
                              n.append(e, t));
                          }),
                          n.append("file", e),
                          console.log("Sending XHR request"),
                          s.send(n),
                          { cancel: () => s.abort() }
                        );
                      })));
                    let d = eX.z + "videos/" + c.filename;
                    (x(d),
                      u(c.filename),
                      v(!0),
                      g(!1),
                      console.log("Generating thumbnails"));
                    let m = await (0, eY.b)(e, 3);
                    (console.log("Thumbnails generated:", m.length),
                      E(m),
                      j(m[0]));
                  }
                } catch (e) {
                  throw (console.error("Error handling file upload:", e), e);
                }
              },
              F = async (e) => {
                try {
                  j(e);
                } catch (e) {
                  throw (console.error("Error selecting thumbnail:", e), e);
                }
              };
            return (
              (0, m.useEffect)(
                () => () => {
                  n && n.startsWith("blob:") && URL.revokeObjectURL(n);
                },
                [n],
              ),
              {
                image: e,
                video: r,
                uploadedFile: i,
                preview: n,
                fileType: l,
                videoFileName: d,
                videoS3Url: p,
                imageIpfsHash: h,
                uploading: b,
                videoUploaded: y,
                previewImages: w,
                selectedPreview: N,
                previewStatus: C,
                banner: I,
                uploadedBanner: A,
                bannerFileType: O,
                coverProgress: R,
                handleFileUpload: D,
                handleThumbnailSelection: F,
                uploadToIpfs: M,
                setImage: t,
                setVideo: a,
                setUploadedFile: s,
                setFileType: c,
                setVideoUploaded: v,
                setBanner: k,
                setUploadedBanner: S,
                setBannerFileType: P,
                setPreview: o,
                setVideoFileName: u,
                xhrRef: L,
                reset: () => {
                  (t(void 0),
                    a(void 0),
                    s(void 0),
                    o(void 0),
                    c(void 0),
                    u(""),
                    x(void 0),
                    f(void 0),
                    g(!1),
                    v(!1),
                    E([]),
                    j(void 0),
                    T(0),
                    k(void 0),
                    S(void 0),
                    P(void 0),
                    R.setProgress(0),
                    n && n.startsWith("blob:") && URL.revokeObjectURL(n));
                },
              }
            );
          })(),
          [e_, eg] = (0, m.useState)(""),
          [ey, ev] = (0, m.useState)(""),
          [ew, eE] = (0, m.useState)(""),
          eN = (0, m.useMemo)(() => !0, []),
          [ej, eC] = (0, m.useState)(""),
          [eT, eI] = (0, m.useState)(""),
          [ek, eA] = (0, m.useState)(""),
          [eS, eO] = (0, m.useState)(""),
          { setShowWallet: eP } = (0, B.useConnectWallet)(),
          { address: eR, wallet: eL } = (0, n.F)(),
          [, eM] = (0, m.useState)(!1),
          { decodedJwt: eD } = (0, n.F)(),
          { signSendCreateBuyTx: eF } = (0, e3.f)(),
          eB = (0, c.useQueryClient)(),
          eU = ea(),
          eG = C((e) => e.creatorFeePercent),
          { hasPendingDraft: ez } = (function (e) {
            let t = (0, c.useQueryClient)(),
              { t: r } = (0, u.f)(),
              {
                setIsMayhemEnabled: a,
                setIsMayhemManualMode: i,
                setIsMultiplayer: s,
              } = (0, R.i)(),
              n = (0, v.g)((e) => e.setIsQuoteMintEnabled),
              o = (0, m.useRef)(void 0);
            void 0 === o.current && (o.current = (0, e0.u)(t) ?? null);
            let l = o.current,
              d = (0, m.useRef)(e);
            (0, m.useEffect)(() => {
              d.current = e;
            });
            let x = (0, m.useRef)(r);
            (0, m.useEffect)(() => {
              x.current = r;
            });
            let h = (0, m.useRef)(!1);
            return (
              (0, m.useEffect)(() => {
                if (!l || h.current) return;
                ((h.current = !0), (0, e0.q)(t));
                let e = d.current;
                (e.setName(l.name),
                  e.setTicker(l.ticker),
                  e.setDescription(l.description ?? ""),
                  e.setTwitter(l.twitter ?? ""),
                  e.setTelegram(l.telegram ?? ""),
                  e.setWebsite(l.website ?? ""),
                  a(!0),
                  i(l.mayhemManualMode),
                  l.mayhemMultiplayer && s(!0),
                  n(l.isUsdcQuote));
                let r = !1;
                return (
                  l.imageUri &&
                    (0, e1.f)({ imageUri: l.imageUri, mint: l.imageMint })
                      .then((e) => {
                        if (!r && !d.current.hasMediaSelected)
                          return d.current.handleFileUpload(e);
                      })
                      .catch(() => {
                        r ||
                          p.c.error(
                            x.current("web.mayhem.reuse_image_failed"),
                            {
                              description: x.current(
                                "web.mayhem.reuse_image_failed_description",
                              ),
                            },
                          );
                      }),
                  () => {
                    ((r = !0), (0, e0.q)(t), n(!1));
                  }
                );
              }, [l, t, a, i, s, n]),
              { hasPendingDraft: null !== l }
            );
          })({
            setName: eg,
            setTicker: ev,
            setDescription: eE,
            setTwitter: eC,
            setTelegram: eI,
            setWebsite: eA,
            handleFileUpload: er,
            hasMediaSelected: !!(A || O),
          });
        (0, m.useEffect)(() => {
          let e = "true" === f.get("mayhem");
          (g(e), e && !ez && y(!1));
        }, [f, ez, g, y]);
        let eH = (0, m.useCallback)(() => {
          if ("true" !== f.get("mayhem")) return;
          let e = new URLSearchParams(f.toString());
          e.delete("mayhem");
          let t = e.toString();
          x.replace(t ? `${h}?${t}` : h, { scroll: !1 });
        }, [h, x, f]);
        (0, m.useEffect)(() => {
          (async () => {
            U && !O
              ? eh(`https://pump.mypinata.cloud/ipfs/${U}`)
              : !O ||
                (P && P.startsWith("blob:")) ||
                eh(URL.createObjectURL(O));
          })();
        }, [U, O]);
        let e6 = (0, m.useCallback)(
            async (t) => {
              let r;
              if (!X) return;
              let a = eD
                ? X && X.size > e5
                  ? ts
                  : void 0
                : "connect your wallet and sign in to upload a file";
              if (a)
                return void p.c.error(e("web.create.banner_upload_failed"), {
                  description: a,
                });
              try {
                let e = await (0, eZ.w)(X);
                r = `https://ipfs.io/ipfs/${e.cid}`;
              } catch (r) {
                ((0, eb.l)({
                  error: r,
                  feature: "coin-creation",
                  operation: "pin-banner",
                  context: {
                    mint: t.toBase58(),
                    fileSize: X.size,
                    fileType: X.type,
                  },
                }),
                  p.c.error(e("web.create.banner_upload_failed"), {
                    description: e("web.create.unexpected_error"),
                  }));
                return;
              }
              let i = await ti({ mint: t.toBase58(), fileUri: r });
              i.ok ||
                ((0, eb.l)({
                  error: Error(i.message ?? `add-banner ${i.reason}`),
                  feature: "coin-creation",
                  operation: "attach-banner",
                  context: {
                    mint: t.toBase58(),
                    reason: i.reason,
                    status: i.status,
                  },
                }),
                p.c.error(e("web.create.banner_upload_failed"), {
                  description:
                    "too_large" === i.reason
                      ? e("web.create.banner_too_large_description", {
                          max_mb: e8,
                        })
                      : (i.message ?? e("web.create.unexpected_error")),
                }));
            },
            [eD, X, e],
          ),
          e9 = (0, ei.f)({ resetSelectionOnSuccess: !1 }),
          te = (0, m.useCallback)(
            async ({ metadata: t, metadataUri: r }) => {
              try {
                let a = await (0, et.j)()("POST /coins/create-v2", {
                  credentials: "include",
                  throwHttpErrors: !1,
                  body: {
                    name: e_,
                    ticker: ey,
                    description: ew,
                    twitter: ej,
                    telegram: eT,
                    website: ek,
                    showName: eN,
                    metadataUri: r,
                    image: t.image,
                    video: t.video,
                    tokenProgram: o.S.toBase58(),
                  },
                });
                if ("error" in a && "string" == typeof a.error && a.error)
                  throw Error(a.error);
                if (!("mint" in a) || !a.mint)
                  throw Error("could not create coin");
                let { mint: i } = a;
                await e6(new l.PublicKey(i));
                let n = t.video ? s.Vx.VIDEO : s.Vx.IMAGE;
                return (
                  (0, F.vR)({
                    mint: i.toString(),
                    isFree: !0,
                    tokensBought: 0,
                    solPaid: 0,
                    isMayhemMode: !1,
                    assetType: n,
                  }),
                  eg(""),
                  ev(""),
                  eE(""),
                  eA(""),
                  eo(void 0),
                  ec(void 0),
                  el(void 0),
                  em(!1),
                  eM(!1),
                  ef(),
                  p.c.success(e("web.create.created_new_coin"), {
                    action: {
                      label: e("web.create.view_coin_action"),
                      onClick: () => window.open(`/coin/${i}`, "_blank"),
                    },
                  }),
                  i?.toString()
                );
              } catch (i) {
                console.error("could not create", i);
                let r = t.video ? s.Vx.VIDEO : s.Vx.IMAGE,
                  a = i instanceof Error ? i.message : "could not create coin";
                ((0, F.$X)({
                  isFree: !0,
                  tokensBought: 0,
                  solPaid: 0,
                  isMayhemMode: !1,
                  error: a,
                  assetType: r,
                }),
                  p.c.error(e("web.create.could_not_create"), {
                    description: i?.message,
                  }));
              }
            },
            [ew, e6, e_, eN, eT, ey, ej, ek, ef],
          ),
          tt = async (t) => {
            let a = R.i.getState(),
              i = (({ isMayhemEnabled: e, isMayhemManualMode: t }) => {
                if (e) return t ? "manual" : "auto";
              })(a),
              n = j ? t.solAmount.gt(new r.BN(0)) : t.amount.gt(new r.BN(0)),
              o = I({ creatorFeePercent: eG, tokenQuotePair: j }),
              c = null;
            try {
              let d, m, u, x, h;
              (eM(!0), console.log("create", t));
              try {
                tn({
                  decodedJwt: eD,
                  name: e_,
                  ticker: ey,
                  description: ew,
                  image: A,
                  video: O,
                  banner: X,
                  videoUploaded: q,
                  previewStatus: $,
                  selectedPreview: V,
                  telegram: eT,
                  website: ek,
                  twitter: ej,
                });
              } catch (t) {
                p.c.error(e("web.create.validation_error"), {
                  description: t instanceof Error ? t.message : String(t),
                });
                return;
              }
              if ((0, eY.W)(e_) > 32)
                return void p.c.error(e("web.create.name_too_long"), {
                  description: e("web.create.name_too_long_description"),
                });
              if (!q && !A)
                return void p.c.error(e("web.create.no_media_uploaded"), {
                  description: e("web.create.no_media_uploaded_description"),
                });
              if (!ey)
                return void p.c.error(e("web.create.no_ticker"), {
                  description: e("web.create.no_ticker_description"),
                });
              if (ew && ew.length > 2e3)
                return void p.c.error(e("web.create.description_too_long"), {
                  description: e("web.create.description_too_long_description"),
                });
              if ("sol" !== E.kind && !n)
                return void p.c.error(e("web.create.initial_buy_required"), {
                  description: e(
                    "usdc" === E.kind
                      ? "web.create.initial_buy_required_usdc_description"
                      : "pump" === E.kind
                        ? "web.create.initial_buy_required_pump_description"
                        : "web.create.initial_buy_required_stock_description",
                  ),
                });
              if ("stock" === E.kind && !E.stock)
                return void p.c.error(e("web.create.pair_select_stock"));
              if (j && a.isMayhemEnabled)
                return void p.c.error(
                  e("web.create.pair_stock_mayhem_unsupported"),
                );
              if (j && eU.enabled)
                return void p.c.error(
                  e("web.create.pair_stock_fee_sharing_unsupported"),
                );
              if (eU.enabled && !n)
                return void p.c.error(e("web.create.initial_buy_required"), {
                  description: e(
                    "web.create.initial_buy_required_fee_sharing_description",
                  ),
                });
              if (a.isHolderReward && !n)
                return void p.c.error(e("web.create.initial_buy_required"), {
                  description: e(
                    "web.create.initial_buy_required_holder_rewards_description",
                  ),
                });
              if (
                (({ creatorFeePercent: e, tokenQuotePair: t }) => t && !T(e))({
                  creatorFeePercent: eG,
                  tokenQuotePair: j,
                })
              )
                return void p.c.error(
                  e("web.create.creator_fee_invalid", {
                    min_percent: 0.01,
                    max_percent: 3,
                  }),
                );
              if (void 0 !== o && !n)
                return void p.c.error(e("web.create.initial_buy_required"), {
                  description: e(
                    "web.create.initial_buy_required_creator_fee_description",
                  ),
                });
              if (n && (!eL || !eL.signTransaction || !eR))
                return void p.c.error(
                  e("funding.deposit_flow.wallet_not_connected"),
                  { description: e("web.create.connect_wallet_to_proceed") },
                );
              let f = O ? s.Vx.VIDEO : s.Vx.IMAGE;
              try {
                if (A) {
                  if (!(d = await en(A))) {
                    ((0, F.$X)({
                      isFree: !n,
                      tokensBought: t.amount.toNumber(),
                      solPaid: t.solAmount.toNumber(),
                      isMayhemMode: b,
                      error: "Failed to upload image",
                      assetType: f,
                    }),
                      p.c.error(e("web.create.upload_image_failed"), {
                        description: e("web.create.please_try_again"),
                      }));
                    return;
                  }
                } else if (O && q && V) {
                  let r = await fetch(V),
                    a = await r.blob(),
                    i = new File([a], "thumbnail.jpg", { type: "image/jpeg" });
                  if (!(d = await en(i))) {
                    ((0, F.$X)({
                      isFree: !n,
                      tokensBought: t.amount.toNumber(),
                      solPaid: t.solAmount.toNumber(),
                      isMayhemMode: b,
                      error: "Failed to upload thumbnail",
                      assetType: f,
                    }),
                      p.c.error(e("web.create.upload_thumbnail_failed"), {
                        description: e("web.create.please_try_again"),
                      }));
                    return;
                  }
                }
              } catch (a) {
                console.error("Upload error:", a);
                let r =
                  a instanceof Error ? a.message : "Failed to upload media";
                ((0, F.$X)({
                  isFree: !n,
                  tokensBought: t.amount.toNumber(),
                  solPaid: t.solAmount.toNumber(),
                  isMayhemMode: b,
                  error: r,
                  assetType: f,
                }),
                  p.c.error(e("web.create.upload_media_failed"), {
                    description:
                      a instanceof Error
                        ? a.message
                        : e("web.create.please_try_again"),
                  }));
                return;
              }
              if (n && eU.enabled) {
                if (eU.reserveInFlight)
                  return void p.c.error(
                    e("web.create.fee_distribution_preparing"),
                    {
                      description: e(
                        "web.create.fee_distribution_preparing_description",
                      ),
                    },
                  );
                if (!eU.reservedMint)
                  return void p.c.error(
                    e("web.create.fee_distribution_not_ready"),
                    {
                      description: e(
                        "web.create.fee_distribution_not_ready_description",
                      ),
                    },
                  );
              }
              try {
                if (n) {
                  let e = await (0, tl.f)({
                    clientServerUrl: (0, e4.R)(),
                    reservedMint: eU.enabled ? eU.reservedMint : null,
                    reservedMintKeypair: eU.reservedMintKeypair,
                    isVanityMint: eU.isVanityMint,
                    metadata: {
                      video: O,
                      videoUploaded: q,
                      selectedPreview: V,
                      image: A,
                      name: e_,
                      ticker: ey,
                      description: ew,
                      showName: eN,
                      videoFileName: M,
                      twitter: ej,
                      telegram: eT,
                      website: ek,
                      imageIpfsHash: d,
                    },
                  });
                  ((m = e.preResolvedMint),
                    (u = e.metadata),
                    (x = e.metadataUri));
                } else {
                  let e = await (0, to.f)({
                    video: O,
                    videoUploaded: q,
                    selectedPreview: V,
                    image: A,
                    name: e_,
                    ticker: ey,
                    description: ew,
                    showName: eN,
                    videoFileName: M,
                    twitter: ej,
                    telegram: eT,
                    website: ek,
                    imageIpfsHash: d,
                  });
                  ((u = e.metadata), (x = e.metadataUri));
                }
              } catch (a) {
                console.error("Metadata error:", a);
                let r =
                  a instanceof Error ? a.message : "Failed to setup metadata";
                ((0, F.$X)({
                  isFree: !n,
                  tokensBought: t.amount.toNumber(),
                  solPaid: t.solAmount.toNumber(),
                  isMayhemMode: b,
                  error: r,
                  assetType: f,
                }),
                  p.c.error(e("web.create.metadata_setup_failed"), {
                    description:
                      a instanceof Error
                        ? a.message
                        : e("web.create.please_try_again"),
                  }));
                return;
              }
              if (!n) return void (await te({ metadata: u, metadataUri: x }));
              if (!eL || !eL.signTransaction || !eR)
                return void p.c.error(
                  e("funding.deposit_flow.wallet_not_connected"),
                  { description: e("web.create.connect_wallet_to_proceed") },
                );
              let { interval: _, toastId: g } = (c = (0, eW.E)(e_, ey)),
                y = eL.publicKey,
                v = t.amount,
                w = t.solAmount;
              if (
                (!j &&
                  t.solAmount.eq(new r.BN(0.05 * l.LAMPORTS_PER_SOL)) &&
                  ((v = new r.BN(1788384e6)),
                  (w = w.add(new r.BN(625e-6 * l.LAMPORTS_PER_SOL)))),
                eU.enabled)
              ) {
                if (eU.reserveInFlight)
                  return void p.c.error(
                    e("web.create.fee_distribution_preparing"),
                    {
                      description: e(
                        "web.create.fee_distribution_preparing_description",
                      ),
                    },
                  );
                if (!eU.reservedMint)
                  return void p.c.error(
                    e("web.create.fee_distribution_not_ready"),
                    {
                      description: e(
                        "web.create.fee_distribution_not_ready_description",
                      ),
                    },
                  );
              }
              let N =
                eU.enabled && eU.reservedMint && eR ? eU.reservedMint : null;
              if (N && eR) {
                let t = ["creator-reward-recipients", N.toBase58()],
                  r = eB.getQueryData(t),
                  a =
                    void 0 !== r
                      ? r
                      : await eB.ensureQueryData({
                          queryKey: t,
                          queryFn: () => (0, ee.a)(eR),
                        });
                h = a;
                let i = a.reduce((e, t) => e + t.shareBps, 0);
                if ((0, ee.D)(a, eR) && 1e4 !== i)
                  return void p.c.error(
                    e("web.create.fee_recipients_total_error"),
                    {
                      description: e(
                        "web.create.fee_recipients_total_error_description",
                      ),
                    },
                  );
              }
              let C =
                eU.enabled && eU.reservedMint && eR && h
                  ? {
                      reservedMint: eU.reservedMint,
                      reservedMintKeypair: eU.reservedMintKeypair,
                      isVanityMint: eU.isVanityMint,
                      creatorWallet: eR,
                      queryClient: eB,
                      recipientsSnapshot: h,
                    }
                  : void 0;
              void 0 !== m &&
                e9({ mintAddress: m.mint.toBase58(), mayhemStateAtCreate: a });
              let I = await eF({
                name: e_,
                symbol: ey,
                uri: x,
                creator: y,
                user: y,
                amount: v,
                solAmount: w,
                mayhemMode: a.isMayhemEnabled,
                preResolvedMint: m,
                feeDistribution: C,
                creatorFeeBps: o,
                holderReward: a.isHolderReward,
              });
              if (!I) throw Error("Failed to create coin");
              let {
                mint: S,
                signature: P,
                confirmTxPromise: L,
                signedTimestamp: D,
              } = I;
              if (a.isMayhemEnabled && a.isMayhemManualMode) {
                let e = R.i.getState();
                (e.setIsMayhemEnabled(!1), e.setIsMayhemManualMode(!1), eH());
              }
              let B = (({ confirmation: e, attachBanner: t }) =>
                e.then(async (e) => (await t(), e)))({
                confirmation: L,
                attachBanner: () => e6(S),
              });
              (L.then(() => {
                let e = performance.now() - D,
                  r = t.nativeSelected ? w.toNumber() : 0,
                  s = t.nativeSelected ? 0 : v.toNumber();
                ((0, F.vR)({
                  mint: S.toBase58(),
                  isFree: !1,
                  tokensBought: s,
                  solPaid: r,
                  isMayhemMode: a.isMayhemEnabled,
                  mayhemTriggerMode: i,
                  signature: P,
                  assetType: f,
                  timeToConfirm: e,
                }),
                  eU.resetAfterCreate(),
                  eB.removeQueries({
                    queryKey: ["creator-reward-recipients", S.toBase58()],
                  }),
                  eg(""),
                  ev(""),
                  eE(""),
                  eA(""),
                  eo(void 0),
                  ep(void 0),
                  eu(void 0),
                  ec(void 0),
                  el(void 0),
                  em(!1),
                  ef());
              })
                .catch((e) => {
                  console.error("Transaction confirmation failed", e);
                  let t =
                    e instanceof Error
                      ? e.message
                      : "An unexpected error occurred";
                  (0, F.$X)({
                    isFree: !1,
                    tokensBought: v.toNumber(),
                    solPaid: w.toNumber(),
                    isMayhemMode: a.isMayhemEnabled,
                    mayhemTriggerMode: i,
                    error: t,
                    signature: P,
                    assetType: f,
                    quoteMint: k,
                    prepSignature: e instanceof e2.u ? e.prepSignature : void 0,
                  });
                })
                .finally(() => {
                  eM(!1);
                }),
                (0, eK.a)(S, e_, ey, P, _, g, B));
              return;
            } catch (u) {
              (console.error("could not create", u),
                c && (clearInterval(c.interval), p.c.dismiss(c.toastId)));
              let a = (0, F.gW)(u),
                o = t.amount,
                d = t.solAmount;
              !j &&
                t.solAmount.eq(new r.BN(0.05 * l.LAMPORTS_PER_SOL)) &&
                ((o = new r.BN(1788384e6)),
                (d = d.add(new r.BN(625e-6 * l.LAMPORTS_PER_SOL))));
              let m =
                u instanceof Error ? u.message : "An unexpected error occurred";
              ((0, F.$X)({
                isFree: !n,
                tokensBought: o.toNumber(),
                solPaid: d.toNumber(),
                isMayhemMode: b,
                error: m,
                mayhemTriggerMode: i,
                signature: a,
                assetType: O ? s.Vx.VIDEO : s.Vx.IMAGE,
                quoteMint: k,
              }),
                m.includes(eQ.l)
                  ? p.c.error(e("web.create.holder_rewards_not_available"))
                  : p.c.error(e("coin_create.buy.could_not_create_coin"), {
                      description: m,
                    }));
            } finally {
              eM(!1);
            }
          },
          tr = (t) => {
            switch (t) {
              case "unsupported_type":
                p.c.error(e("web.create.banner_unsupported_type"), {
                  description: e(
                    "web.create.banner_unsupported_type_description",
                  ),
                });
                return;
              case "unreadable":
                p.c.error(e("web.create.banner_unreadable"), {
                  description: e("web.create.banner_unreadable_description"),
                });
                return;
              case "too_large":
                p.c.error(e("web.create.banner_too_large"), {
                  description: e("web.create.banner_too_large_description", {
                    max_mb: e8,
                  }),
                });
                return;
            }
          },
          ta = async (t) => {
            if (!eD)
              return void p.c.error(e("web.create.connect_wallet_to_upload"));
            let r = t?.[0];
            if (!r) return void ep(void 0);
            let a = await e7(r);
            a.ok ? ep(a.file) : tr(a.reason);
          };
        return (
          (0, m.useEffect)(() => {
            (async () => {
              if (!X) return null;
              let e = await (0, eY.x)(X);
              (e || ex(void 0),
                ex({
                  category: e?.split("/")[0],
                  extension: e?.split("/")[1],
                }));
            })();
          }, [X]),
          (0, m.useEffect)(() => {
            if (X && J) {
              eu(X);
              let e = URL.createObjectURL(X);
              return (eO(e), () => URL.revokeObjectURL(e));
            }
          }, [X, J]),
          (0, t.jsxs)("div", {
            className: "mb-4 flex w-full flex-col gap-4 lg:flex-row lg:gap-3",
            children: [
              (0, t.jsxs)("div", {
                className: "flex min-w-0 flex-1 flex-col gap-4 text-start",
                children: [
                  (0, t.jsx)("h5", {
                    className: "font-semibold leading-5 text-text-primary",
                    children: N.f.CREATE_COIN_PAGE.TITLE,
                  }),
                  (0, t.jsxs)("span", {
                    className: "flex flex-col gap-1",
                    children: [
                      (0, t.jsx)("h5", {
                        className: "text-sm font-semibold text-text-primary",
                        children: N.f.CREATE_COIN_PAGE.SECTION.DETAIL.TITLE,
                      }),
                      (0, t.jsx)("p", {
                        className: "text-xs text-[#9da3ae]",
                        children:
                          N.f.CREATE_COIN_PAGE.SECTION.DETAIL.DESCRIPTION,
                      }),
                    ],
                  }),
                  (0, t.jsxs)(eV.g, {
                    children: [
                      (0, t.jsxs)("div", {
                        className: "flex flex-col gap-4 sm:flex-row",
                        children: [
                          (0, t.jsxs)("div", {
                            className: "flex w-full flex-col gap-2",
                            children: [
                              (0, t.jsx)("label", {
                                className:
                                  "text-xs font-semibold text-text-primary",
                                htmlFor: "name",
                                children:
                                  N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.NAME
                                    .LABEL,
                              }),
                              (0, t.jsx)("input", {
                                className:
                                  "w-full rounded-lg border border-border-secondary bg-transparent p-2 text-sm text-white",
                                id: "name",
                                placeholder:
                                  N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.NAME
                                    .PLACEHOLDER,
                                value: e_,
                                onChange: (e) => {
                                  e.target.value.length <= 32 &&
                                    eg(e.target.value);
                                },
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className: "flex w-full flex-col gap-2",
                            children: [
                              (0, t.jsx)("label", {
                                className:
                                  "text-xs font-semibold text-text-primary",
                                htmlFor: "ticker",
                                children:
                                  N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                    .TICKER.LABEL,
                              }),
                              (0, t.jsx)("input", {
                                className:
                                  "w-full rounded-lg border border-border-secondary bg-transparent p-2 text-sm text-white",
                                id: "ticker",
                                placeholder:
                                  N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                    .TICKER.PLACEHOLDER,
                                value: ey,
                                onChange: (e) => {
                                  e.target.value.length <= 10 &&
                                    ev(e.target.value);
                                },
                                maxLength: 10,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsx)(i.k, { height: 16 }),
                      (0, t.jsxs)("div", {
                        className: "flex flex-1 flex-col gap-2",
                        children: [
                          (0, t.jsxs)("label", {
                            className:
                              "text-xs font-semibold text-text-primary",
                            children: [
                              N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                .DESCRIPTION.LABEL,
                              " ",
                              (0, t.jsx)("span", {
                                className: "text-[#9da3ae]",
                                children:
                                  N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                    .OPTIONAL,
                              }),
                            ],
                          }),
                          (0, t.jsx)("textarea", {
                            className:
                              "h-24 w-full rounded-lg border border-border-secondary bg-transparent p-2 text-sm text-white",
                            placeholder:
                              N.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                .DESCRIPTION.PLACEHOLDER,
                            value: ew,
                            onChange: (e) => eE(e.target.value),
                          }),
                        ],
                      }),
                      (0, t.jsx)(i.k, { height: 16 }),
                      (0, t.jsxs)(w.Y, {
                        children: [
                          (0, t.jsx)(w.v, {
                            asChild: !0,
                            children: (0, t.jsxs)("button", {
                              className:
                                "flex items-center gap-2 text-text-primary [&>#chevron]:transition-transform [&>#chevron]:duration-200 [&>#chevron]:data-[state=open]:rotate-180",
                              children: [
                                (0, t.jsx)(a.HU, { size: 18, strokeWidth: 1 }),
                                (0, t.jsxs)("p", {
                                  className: "text-xs",
                                  children: [
                                    N.f.CREATE_COIN_PAGE.SECTION.DETAIL.LABEL
                                      .SOCIAL_LINKS,
                                    " ",
                                    (0, t.jsx)("span", {
                                      className: "text-[#9da3ae]",
                                      children:
                                        N.f.CREATE_COIN_PAGE.SECTION.DETAIL
                                          .INPUT.OPTIONAL,
                                    }),
                                  ],
                                }),
                                (0, t.jsx)(a.J0, {
                                  size: 16,
                                  strokeWidth: 1,
                                  id: "chevron",
                                }),
                              ],
                            }),
                          }),
                          (0, t.jsx)(w.C, {
                            className: "mt-4 flex flex-col gap-4",
                            children: (0, t.jsx)(Q, {
                              website: ek,
                              setWebsite: eA,
                              twitter: ej,
                              setTwitter: eC,
                              telegram: eT,
                              setTelegram: eI,
                            }),
                          }),
                          (0, t.jsx)(i.k, { height: 16 }),
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        className: "flex flex-col gap-3 sm:flex-row",
                        children: [
                          (0, t.jsx)("div", {
                            className: "flex-1",
                            children: (0, t.jsx)(eq, {}),
                          }),
                          (0, t.jsx)("div", { className: "flex-1" }),
                        ],
                      }),
                      (0, t.jsx)(i.k, { height: 16 }),
                      (0, t.jsx)(i.k, { height: 8 }),
                      (0, t.jsx)(Y, {}),
                      (0, t.jsx)(i.k, { height: 8 }),
                      (0, t.jsx)(R.o, {}),
                      (0, t.jsx)(i.k, { height: 16 }),
                      (0, t.jsxs)("div", {
                        className: "flex flex-col gap-3",
                        children: [
                          (0, t.jsxs)("div", {
                            className: "flex flex-col gap-3 sm:flex-row",
                            children: [
                              (0, t.jsx)("div", {
                                className: "flex-1",
                                children: (0, t.jsx)(R.U, { isDisabled: j }),
                              }),
                              (0, t.jsx)("div", { className: "flex-1" }),
                            ],
                          }),
                          (0, t.jsx)(R.G, {}),
                        ],
                      }),
                      (0, t.jsx)(i.k, { height: 16 }),
                      (0, t.jsx)(S, {}),
                    ],
                  }),
                  (0, t.jsxs)(eV.g, {
                    children: [
                      (0, t.jsx)(K, {
                        onDrop: (e) => er(e[0]),
                        accept: eX.v,
                        maxFiles: 1,
                        noClick: 1 === $,
                        uploading: G,
                        progress: Z.data.progress,
                        preview: P,
                        fileType: L,
                        onReplace: () => {
                          (eo(void 0), ec(void 0), ed(void 0), em(!1));
                        },
                        showWallet: () => {
                          ((0, F.Lw)({ source: "coin_creation_form" }), eP(!0));
                        },
                        isLoggedIn: !!eL,
                      }),
                      (0, t.jsxs)(w.Y, {
                        children: [
                          (0, t.jsx)(w.v, {
                            asChild: !0,
                            children: (0, t.jsxs)("button", {
                              className:
                                "flex items-center gap-2 text-text-primary [&>#chevron]:transition-transform [&>#chevron]:duration-200 [&>#chevron]:data-[state=open]:rotate-180",
                              children: [
                                (0, t.jsx)(a.CC, { size: 18, strokeWidth: 1 }),
                                (0, t.jsxs)("p", {
                                  className: "text-xs",
                                  children: [
                                    N.f.CREATE_COIN_PAGE.SECTION.DETAIL.LABEL
                                      .BANNER,
                                    " ",
                                    (0, t.jsx)("span", {
                                      className: "text-[#9da3ae]",
                                      children:
                                        N.f.CREATE_COIN_PAGE.SECTION.DETAIL
                                          .INPUT.OPTIONAL,
                                    }),
                                  ],
                                }),
                                (0, t.jsx)(a.J0, {
                                  size: 16,
                                  strokeWidth: 1,
                                  id: "chevron",
                                }),
                              ],
                            }),
                          }),
                          (0, t.jsx)(w.C, {
                            children: (0, t.jsxs)("div", {
                              className: "flex flex-col gap-4 px-3 py-2",
                              children: [
                                (0, t.jsxs)("span", {
                                  className: "flex flex-col gap-0.5",
                                  children: [
                                    (0, t.jsx)("p", {
                                      className:
                                        "text-sm font-semibold text-text-primary",
                                      children:
                                        N.f.CREATE_COIN_PAGE.SECTION.DETAIL
                                          .INPUT.BANNER.LABEL,
                                    }),
                                    (0, t.jsx)("p", {
                                      className: "text-xs text-[#9da3ae]",
                                      children:
                                        N.f.CREATE_COIN_PAGE.SECTION.DETAIL
                                          .INPUT.BANNER.DESCRIPTION,
                                    }),
                                  ],
                                }),
                                (0, t.jsx)(K, {
                                  onDrop: (e) => ta(e),
                                  onDropRejected: (t) => {
                                    "too-many-files" === t[0]?.errors[0]?.code
                                      ? p.c.error(
                                          e("web.create.banner_one_file"),
                                        )
                                      : tr("unsupported_type");
                                  },
                                  accept: eX.G,
                                  maxFiles: 1,
                                  preview: eS,
                                  fileType: J,
                                  onReplace: () => {
                                    (ep(void 0), eu(void 0), ex(void 0));
                                  },
                                  isBanner: !0,
                                  showWallet: () => {
                                    ((0, F.Lw)({
                                      source: "coin_creation_form",
                                    }),
                                      eP(!0));
                                  },
                                  isLoggedIn: !!eL,
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  O &&
                    z.length > 0 &&
                    (0, t.jsxs)(t.Fragment, {
                      children: [
                        (0, t.jsxs)("span", {
                          className: "flex flex-col gap-1",
                          children: [
                            (0, t.jsx)("h5", {
                              className:
                                "text-sm font-semibold text-text-primary",
                              children: e("web.create.cover"),
                            }),
                            (0, t.jsx)("p", {
                              className: "text-xs text-[#9da3ae]",
                              children: e("web.create.cover_description"),
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className:
                            "flex w-full flex-col gap-4 rounded-xl border border-border-secondary bg-bg-secondary px-4 py-6",
                          children: [
                            (0, t.jsx)("div", {
                              className:
                                "flex h-44 flex-row items-center justify-center overflow-hidden py-2",
                              children: z.map((r) =>
                                (0, t.jsx)(
                                  "button",
                                  {
                                    type: "button",
                                    className: `h-full w-1/3 cursor-pointer rounded-md px-1 ${r === V ? "border border-[#86EFAC]" : "opacity-70"}`,
                                    onClick: () => es(r),
                                    children: (0, t.jsx)("img", {
                                      alt: e(
                                        "web.create.video_cover_preview_alt",
                                      ),
                                      src: r,
                                      className: "size-full object-cover",
                                    }),
                                  },
                                  r,
                                ),
                              ),
                            }),
                            G &&
                              (0, t.jsx)("div", {
                                className: "flex items-center justify-center",
                                children: (0, t.jsxs)("div", {
                                  className: "flex w-96 flex-col gap-2",
                                  children: [
                                    (0, t.jsx)(e$.f, {
                                      className: "w-full bg-black",
                                      value: Z.data.progress,
                                      barColor: "bg-bg-accent",
                                    }),
                                    (0, t.jsxs)("div", {
                                      className:
                                        "flex flex-row items-stretch justify-between text-sm text-text-secondary sm:text-base",
                                      children: [
                                        (0, t.jsx)("div", {
                                          children: e("web.create.time_left", {
                                            time: ((t) => {
                                              if (
                                                !t ||
                                                Number.isNaN(t) ||
                                                t < 0 ||
                                                !isFinite(t)
                                              )
                                                return e(
                                                  "web.create.calculating",
                                                );
                                              let r = Math.floor(t / 60),
                                                a = Math.round(t % 60);
                                              return 0 === r
                                                ? e("common.second", {
                                                    count: a,
                                                  })
                                                : 0 === a
                                                  ? e(
                                                      "web.create.eta_minutes",
                                                      { count: r },
                                                    )
                                                  : e(
                                                      "web.create.eta_minutes_seconds",
                                                      {
                                                        minutes: e(
                                                          "web.create.eta_minutes",
                                                          { count: r },
                                                        ),
                                                        seconds: e(
                                                          "common.second",
                                                          { count: a },
                                                        ),
                                                      },
                                                    );
                                            })(Z.data.timeRemaining),
                                          }),
                                        }),
                                        (0, t.jsxs)("div", {
                                          children: [
                                            Z.data.progress.toFixed(0),
                                            "%",
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                          ],
                        }),
                      ],
                    }),
                  (0, t.jsx)(eV.g, {
                    children: (0, t.jsxs)("div", {
                      className: "flex items-center gap-x-2",
                      children: [
                        (0, t.jsx)(a.Jd, { size: 20 }),
                        (0, t.jsx)("p", {
                          className: "text-xs text-text-secondary",
                          children:
                            N.f.CREATE_COIN_PAGE.SECTION.DETAIL.LABEL.COIN_DATA,
                        }),
                      ],
                    }),
                  }),
                  (0, t.jsx)(H, {
                    symbol: ey,
                    name: e_,
                    preview: P ?? "",
                    create: tt,
                    validate: () => {
                      try {
                        return tn({
                          decodedJwt: eD,
                          name: e_,
                          ticker: ey,
                          description: ew,
                          image: A,
                          video: O,
                          banner: X,
                          videoUploaded: q,
                          previewStatus: $,
                          selectedPreview: V,
                          telegram: eT,
                          website: ek,
                          twitter: ej,
                        });
                      } catch (t) {
                        return (
                          p.c.error(e("web.create.validation_error"), {
                            description:
                              t instanceof Error ? t.message : String(t),
                          }),
                          !1
                        );
                      }
                    },
                  }),
                ],
              }),
              (0, t.jsx)(W, {
                preview: O ? (V ?? P ?? "") : (P ?? ""),
                coin: {
                  name: e_,
                  symbol: ey,
                  description: ew,
                  image_uri: U ? `https://pump.mypinata.cloud/ipfs/${U}` : "",
                  video_uri: D || "",
                },
              }),
            ],
          })
        );
      },
    ],
    734638,
  );
};
