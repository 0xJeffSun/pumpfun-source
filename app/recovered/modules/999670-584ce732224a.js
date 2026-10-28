// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(353110);
  var n = e.i(648470),
    a = e.i(728141),
    i = e.i(439587),
    o = e.i(292686),
    l = e.i(574472),
    s = e.i(959719),
    c = e.i(928529),
    u = e.i(599077),
    m = e.i(352386),
    d = e.i(179236);
  e.i(12692);
  var f = e.i(398902),
    p = e.i(63289),
    h = e.i(267951),
    y = e.i(275799),
    x = e.i(745018),
    b = e.i(618860),
    g = e.i(338319);
  let v = [
      {
        kind: "Auto",
        icon: (0, t.jsx)(() => {
          let e,
            n = (0, r.c)(1);
          return (
            n[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, t.jsxs)("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: 1.8,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "size-5",
                  "aria-hidden": !0,
                  children: [
                    (0, t.jsx)("path", { d: "M8 3 4 7l4 4" }),
                    (0, t.jsx)("path", { d: "M4 7h16" }),
                    (0, t.jsx)("path", { d: "m16 21 4-4-4-4" }),
                    (0, t.jsx)("path", { d: "M20 17H4" }),
                  ],
                })),
                (n[0] = e))
              : (e = n[0]),
            e
          );
        }, {}),
        iconClass: "text-text-accent",
        bulletClass: "bg-positive",
        subtitle: "The agent runs itself.",
        bullets: [
          "Self-exciting trade cadence. The more you trade, the more activity from the agent.",
          "The agent buys and sells at random, with different trade sizes.",
          "The agent trades for 24 hours as long as there's enough liquidity to keep it running.",
        ],
      },
      {
        kind: "Manual",
        icon: (0, t.jsx)(() => {
          let e,
            n = (0, r.c)(1);
          return (
            n[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, t.jsxs)("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: 1.8,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "size-5",
                  "aria-hidden": !0,
                  children: [
                    (0, t.jsx)("path", { d: "m9 9 5 12 1.8-5.2L21 14Z" }),
                    (0, t.jsx)("path", { d: "M7.2 2.2 8 5.1" }),
                    (0, t.jsx)("path", { d: "m5.1 8-2.9-.8" }),
                    (0, t.jsx)("path", { d: "M14 4.1 12 6" }),
                    (0, t.jsx)("path", { d: "m6 12-1.9 2" }),
                  ],
                })),
                (n[0] = e))
              : (e = n[0]),
            e
          );
        }, {}),
        iconClass: "text-text-secondary",
        bulletClass: "bg-bg-quaternary",
        subtitle: "You fire each trade.",
        bullets: [
          "The agent only trades when prompted by the coin creator.",
          "Same as Auto: trade direction and trade sizes are random.",
          "Have the agent trade once, or not at all. It's up to you.",
        ],
      },
    ],
    w = {
      kind: "Party",
      icon: (0, t.jsx)(x.xI, { size: 20, "aria-hidden": !0 }),
      iconClass: "text-text-accent",
      bulletClass: "bg-positive",
      subtitle: "Any holder can fire a trade.",
      bullets: [
        "Any holder with enough tokens can trigger the agent.",
        "Same as Manual: trade direction and trade sizes are random.",
        "Mode cannot be changed after creation.",
      ],
    };
  function _(e) {
    let n,
      a,
      i,
      o = (0, r.c)(6),
      { showParty: l } = e,
      s = void 0 !== l && l;
    return (
      o[0] !== s
        ? ((n = "grid grid-cols-1 gap-3.5"),
          (a = (s ? [...v, w] : v).map(j)),
          (o[0] = s),
          (o[1] = n),
          (o[2] = a))
        : ((n = o[1]), (a = o[2])),
      o[3] !== n || o[4] !== a
        ? ((i = (0, t.jsx)("div", { className: n, children: a })),
          (o[3] = n),
          (o[4] = a),
          (o[5] = i))
        : (i = o[5]),
      i
    );
  }
  function j(e) {
    return (0, t.jsxs)(
      "section",
      {
        className: (0, g.c)(b.O, "flex flex-col gap-4 px-6 py-[22px]"),
        "data-testid": `mayhem-mode-card-${e.kind.toLowerCase()}`,
        children: [
          (0, t.jsxs)("div", {
            className: "flex items-center gap-3.5",
            children: [
              (0, t.jsx)("span", {
                className: (0, g.c)(
                  "flex size-11 items-center justify-center rounded-[14px]",
                  b.M,
                  e.iconClass,
                ),
                children: e.icon,
              }),
              (0, t.jsxs)("div", {
                className: "flex flex-col gap-0.5",
                children: [
                  (0, t.jsx)("h3", {
                    className:
                      "text-[17px] font-semibold leading-6 tracking-[-0.01em] text-text-primary",
                    children: e.kind,
                  }),
                  (0, t.jsx)("span", {
                    className: "text-[13px] leading-[18px] text-text-tertiary",
                    children: e.subtitle,
                  }),
                ],
              }),
            ],
          }),
          (0, t.jsx)("ul", {
            className:
              "flex flex-col gap-2.5 text-sm leading-[21px] text-text-tertiary",
            children: e.bullets.map((r) =>
              (0, t.jsxs)(
                "li",
                {
                  className: "flex gap-3",
                  children: [
                    (0, t.jsx)("span", {
                      className: (0, g.c)(
                        "mt-2 size-[5px] flex-shrink-0 rounded-full",
                        e.bulletClass,
                      ),
                      "aria-hidden": !0,
                    }),
                    r,
                  ],
                },
                r,
              ),
            ),
          }),
        ],
      },
      e.kind,
    );
  }
  var k = e.i(974658),
    N = e.i(240763),
    E = e.i(586090),
    A = e.i(401605),
    S = e.i(498826),
    D = e.i(205073),
    C = e.i(705672),
    O = e.i(503630),
    M = e.i(595673),
    T = e.i(198825),
    F = e.i(51954),
    P = e.i(729047),
    z = e.i(655397),
    R = e.i(421159),
    I = e.i(449597);
  let L = ["auto", "manual"],
    B = ["auto", "manual", "multiplayer"],
    $ = ["SOL", "USDC"],
    H = () => {
      let e,
        n = (0, r.c)(1);
      return (
        n[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsxs)("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 1.75,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: "size-5",
              "aria-hidden": !0,
              children: [
                (0, t.jsx)("rect", {
                  x: "3",
                  y: "3",
                  width: "18",
                  height: "18",
                  rx: "3",
                }),
                (0, t.jsx)("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
                (0, t.jsx)("path", { d: "m21 15-5-5L5 21" }),
              ],
            })),
            (n[0] = e))
          : (e = n[0]),
        e
      );
    };
  function K(e) {
    return e.global.feeConfig?.decodedAccount ?? null;
  }
  function U(e) {
    return e.global.global?.decodedAccount ?? null;
  }
  function W(e) {
    return e.setIsQuoteMintEnabled;
  }
  e.s(
    [
      "MayhemLaunchCtaInner",
      0,
      function () {
        let e,
          x,
          v,
          w,
          j,
          G,
          q,
          V,
          X,
          Y,
          J,
          Z,
          Q,
          ee,
          et,
          er,
          en,
          ea,
          ei,
          eo,
          el,
          es,
          ec,
          eu,
          em,
          ed,
          ef,
          ep,
          eh,
          ey,
          ex,
          eb,
          eg,
          ev,
          ew,
          e_,
          ej,
          ek,
          eN,
          eE,
          eA,
          eS,
          eD,
          eC,
          eO,
          eM,
          eT,
          eF,
          eP,
          ez,
          eR,
          eI,
          eL,
          eB,
          e$,
          eH,
          eK,
          eU,
          eW,
          eG,
          eq,
          eV,
          eX,
          eY,
          eJ,
          eZ,
          eQ,
          e0,
          e1,
          e2,
          e5,
          e4,
          e3,
          e6 = (0, r.c)(187),
          { t: e7 } = (0, f.f)(),
          { push: e8 } = (0, u.useRouter)(),
          { wallet: e9, address: te } = (0, l.F)(),
          { setShowWallet: tt } = (0, T.useConnectWallet)(),
          { signSendCreateBuyTx: tr } = (0, A.f)(),
          tn = (0, S.e)(),
          { data: ta } = (0, D.f)(),
          ti = ta?.coinsCreated?.["24h"],
          to = (0, C.f)(),
          tl = to ? B : L,
          [ts, tc] = (0, m.useState)("auto"),
          [tu, tm] = (0, m.useState)("SOL"),
          [td, tf] = (0, m.useState)(""),
          [tp, th] = (0, m.useState)(""),
          [ty, tx] = (0, m.useState)(null),
          [tb, tg] = (0, m.useState)(null),
          [tv, tw] = (0, m.useState)(null),
          [t_, tj] = (0, m.useState)(!1),
          tk = "USDC" === tu,
          tN = tk ? (0, z.p)() : s.w,
          tE = (0, z.W)(tN),
          tA = tk ? I.J : I.K,
          tS = tk ? h.R : h.x,
          tD = tk ? 1 : 0.05,
          [tC, tO] = (0, m.useState)(h.x),
          tM = (0, y.g)(W);
        (e6[0] !== tk || e6[1] !== tM
          ? ((e = () => (tM(tk), () => tM(!1))),
            (x = [tk, tM]),
            (e6[0] = tk),
            (e6[1] = tM),
            (e6[2] = e),
            (e6[3] = x))
          : ((e = e6[2]), (x = e6[3])),
          (0, m.useEffect)(e, x));
        let tT = (0, F.f)(U),
          tF = (0, F.f)(K);
        (e6[4] !== tb
          ? ((v = () => () => {
              tb && URL.revokeObjectURL(tb);
            }),
            (w = [tb]),
            (e6[4] = tb),
            (e6[5] = v),
            (e6[6] = w))
          : ((v = e6[5]), (w = e6[6])),
          (0, m.useEffect)(v, w),
          e6[7] === Symbol.for("react.memo_cache_sentinel")
            ? ((j = (e) => {
                let t = e[0];
                t && (tw(null), tx(t), tg(URL.createObjectURL(t)));
              }),
              (e6[7] = j))
            : (j = e6[7]));
        let tP = j;
        e6[8] !== e7
          ? ((G = (e) => {
              tw(
                "file-too-large" === e[0]?.errors[0]?.code
                  ? e7("web.mayhem.image_too_large")
                  : e7("web.mayhem.image_wrong_type"),
              );
            }),
            (e6[8] = e7),
            (e6[9] = G))
          : (G = e6[9]);
        let tz = G;
        e6[10] !== tz
          ? ((q = {
              accept: E.G,
              maxSize: E.O.IMAGE,
              maxFiles: 1,
              multiple: !1,
              onDrop: tP,
              onDropRejected: tz,
            }),
            (e6[10] = tz),
            (e6[11] = q))
          : (q = e6[11]);
        let {
            getRootProps: tR,
            getInputProps: tI,
            isDragActive: tL,
          } = (0, d.B)(q),
          tB = td.trim(),
          t$ = tp.trim(),
          tH = !!te,
          tK = !t_ && !!ty && !!tB && !!t$ && tC >= tS,
          tU = async () => {
            let e = "auto" === ts ? "auto" : "manual",
              t = "multiplayer" === ts && to;
            if (!e9?.signTransaction || !te) return void tt(!0);
            if (!ty) return void tw(e7("web.mayhem.add_coin_image"));
            if (!tB || !t$)
              return void p.c.error(e7("web.mayhem.add_name_and_ticker"));
            let r = new n.BN(Math.floor((tC || 0) * 10 ** tA));
            if (r.lt(new n.BN(tS * 10 ** tA)))
              return void p.c.error(
                e7("web.mayhem.enter_quote_amount", { quote_symbol: tE }),
                {
                  description: e7("web.mayhem.min_quote_required_description", {
                    min_amount: tS,
                    quote_symbol: tE,
                  }),
                },
              );
            tj(!0);
            try {
              let i;
              try {
                i = (await (0, P.w)(ty)).cid;
              } catch {
                (p.c.error(e7("web.mayhem.failed_to_upload_image")), tj(!1));
                return;
              }
              let l = {
                  video: void 0,
                  videoUploaded: !1,
                  selectedPreview: void 0,
                  name: tB,
                  ticker: t$,
                  description: "",
                  showName: !0,
                  videoFileName: "",
                  twitter: "",
                  telegram: "",
                  website: "",
                  imageIpfsHash: i,
                },
                s = await (0, R.f)({
                  clientServerUrl: (0, O.R)(),
                  metadata: l,
                }),
                c = s.preResolvedMint,
                u = s.metadataUri;
              if (!u) {
                (p.c.error(e7("web.mayhem.metadata_unavailable"), {
                  description: e7("web.mayhem.could_not_build_metadata"),
                }),
                  tj(!1));
                return;
              }
              let m = e9.publicKey;
              if (!tT) {
                (p.c.error(e7("web.mayhem.could_not_price_launch_buy"), {
                  description: e7("web.mayhem.try_again_in_a_moment"),
                }),
                  tj(!1));
                return;
              }
              let d = new n.BN(
                (0, a.Y)({
                  global: tT,
                  feeConfig: tF,
                  mintSupply: null,
                  bondingCurve: null,
                  amount: r,
                  quoteMint: tN,
                }).toString(),
              );
              if (d.lte(new n.BN(0))) {
                (p.c.error(e7("web.mayhem.could_not_price_launch_buy"), {
                  description: e7("web.mayhem.try_again_in_a_moment"),
                }),
                  tj(!1));
                return;
              }
              let { interval: f, toastId: h } = (0, k.E)(tB, t$);
              if ("auto" !== ts) {
                let e = (t) => {
                  tn.mutate(
                    {
                      mint: c.mint.toBase58(),
                      mode: "manual",
                      ...(t ? { multiplayer: !0 } : {}),
                    },
                    {
                      onSuccess: (r) => {
                        if (!r.ok) {
                          if (t) {
                            (p.c.error(
                              e7("web.mayhem.multiplayer_unavailable", {
                                multiplayer: e7("web.mayhem.mode_multiplayer"),
                                mode: e7("mayhem_mode.filters.manual"),
                              }),
                            ),
                              e(!1));
                            return;
                          }
                          p.c.error(
                            e7("web.mayhem.could_not_set_manual_mode"),
                            {
                              description: e7(
                                "web.mayhem.could_not_set_manual_mode_description",
                              ),
                            },
                          );
                        }
                      },
                      onError: () => {
                        if (t) {
                          (p.c.error(
                            e7("web.mayhem.multiplayer_unavailable", {
                              multiplayer: e7("web.mayhem.mode_multiplayer"),
                              mode: e7("mayhem_mode.filters.manual"),
                            }),
                          ),
                            e(!1));
                          return;
                        }
                        p.c.error(e7("web.mayhem.could_not_set_manual_mode"), {
                          description: e7(
                            "web.mayhem.could_not_set_manual_mode_description",
                          ),
                        });
                      },
                    },
                  );
                };
                e(t);
              }
              let y = await tr({
                name: tB,
                symbol: t$,
                uri: u,
                creator: m,
                user: m,
                amount: d,
                solAmount: r,
                mayhemMode: !0,
                preResolvedMint: c,
              });
              if (!y) {
                ((0, M.$X)({
                  isFree: !1,
                  tokensBought: d.toNumber(),
                  solPaid: r.toNumber(),
                  isMayhemMode: !0,
                  isTokenizedAgent: !1,
                  error: "Failed to create coin",
                  assetType: o.Vx.IMAGE,
                }),
                  p.c.error(e7("coin_create.buy.could_not_create_coin")),
                  tj(!1));
                return;
              }
              let {
                mint: x,
                signature: b,
                confirmTxPromise: g,
                signedTimestamp: v,
              } = y;
              (g
                .then(() => {
                  ((0, M.vR)({
                    mint: x.toBase58(),
                    isFree: !1,
                    tokensBought: 0,
                    solPaid: r.toNumber(),
                    isMayhemMode: !0,
                    mayhemTriggerMode: e,
                    isTokenizedAgent: !1,
                    signature: b,
                    assetType: o.Vx.IMAGE,
                    timeToConfirm: performance.now() - v,
                  }),
                    setTimeout(() => e8(`/coin/${x.toBase58()}`), 3e3));
                })
                .catch((t) => {
                  (console.error(t),
                    (0, M.$X)({
                      isFree: !1,
                      tokensBought: d.toNumber(),
                      solPaid: r.toNumber(),
                      isMayhemMode: !0,
                      mayhemTriggerMode: e,
                      error:
                        t instanceof Error ? t.message : "Confirmation failed",
                      signature: b,
                      assetType: o.Vx.IMAGE,
                    }));
                })
                .finally(() => tj(!1)),
                (0, N.a)(x, tB, t$, b, f, h, g, !1));
            } catch (r) {
              console.error(r);
              let t = r instanceof Error ? r.message : "Could not create coin";
              (p.c.error(e7("coin_create.buy.could_not_create_coin"), {
                description: t,
              }),
                (0, M.$X)({
                  isFree: !1,
                  tokensBought: 0,
                  solPaid: 0,
                  isMayhemMode: !0,
                  mayhemTriggerMode: e,
                  isTokenizedAgent: !1,
                  error: t,
                  assetType: o.Vx.IMAGE,
                }),
                tj(!1));
            }
          };
        (e6[12] !== e7
          ? ((V = e7("web.mayhem.launch_cta_title")),
            (e6[12] = e7),
            (e6[13] = V))
          : (V = e6[13]),
          e6[14] !== V
            ? ((X = (0, t.jsx)("h2", {
                className:
                  "text-[28px] font-semibold leading-8 tracking-[-0.03em] text-text-primary md:text-[32px] md:leading-9",
                children: V,
              })),
              (e6[14] = V),
              (e6[15] = X))
            : (X = e6[15]),
          e6[16] !== e7
            ? ((Y = e7("web.mayhem.launch_cta_subtitle")),
              (e6[16] = e7),
              (e6[17] = Y))
            : (Y = e6[17]),
          e6[18] !== Y
            ? ((J = (0, t.jsx)("p", {
                className: "max-w-prose text-base text-text-tertiary",
                children: Y,
              })),
              (e6[18] = Y),
              (e6[19] = J))
            : (J = e6[19]),
          e6[20] !== X || e6[21] !== J
            ? ((Z = (0, t.jsxs)("div", {
                className: "flex flex-col gap-2",
                children: [X, J],
              })),
              (e6[20] = X),
              (e6[21] = J),
              (e6[22] = Z))
            : (Z = e6[22]),
          e6[23] !== ti || e6[24] !== e7
            ? ((Q =
                null != ti
                  ? (0, t.jsxs)("p", {
                      className: "text-sm tabular-nums text-text-tertiary",
                      children: [
                        (0, t.jsx)("span", {
                          className:
                            "font-semibold tabular-nums text-text-accent",
                          children: ti.toLocaleString("en-US"),
                        }),
                        " ",
                        e7("web.mayhem.coins_minted_24h", { count: ti }),
                      ],
                    })
                  : null),
              (e6[23] = ti),
              (e6[24] = e7),
              (e6[25] = Q))
            : (Q = e6[25]),
          e6[26] !== Z || e6[27] !== Q
            ? ((ee = (0, t.jsxs)("div", {
                className:
                  "flex flex-wrap items-end justify-between gap-6 px-2",
                children: [Z, Q],
              })),
              (e6[26] = Z),
              (e6[27] = Q),
              (e6[28] = ee))
            : (ee = e6[28]),
          e6[29] === Symbol.for("react.memo_cache_sentinel")
            ? ((et = (0, g.c)(b.O, "flex flex-col gap-[18px] p-6 @container")),
              (e6[29] = et))
            : (et = e6[29]),
          e6[30] !== tR
            ? ((er = tR()), (e6[30] = tR), (e6[31] = er))
            : (er = e6[31]));
        let tW = tL && "border-positive text-positive";
        (e6[32] !== tW
          ? ((en = (0, g.c)(
              "flex size-[124px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-dashed border-border-tertiary bg-bg-tertiary text-text-tertiary transition-colors hover:bg-bg-quaternary hover:text-text-secondary",
              tW,
            )),
            (e6[32] = tW),
            (e6[33] = en))
          : (en = e6[33]),
          e6[34] !== e7
            ? ((ea = e7("web.mayhem.upload_coin_image")),
              (e6[34] = e7),
              (e6[35] = ea))
            : (ea = e6[35]),
          e6[36] !== tI
            ? ((ei = tI()), (e6[36] = tI), (e6[37] = ei))
            : (ei = e6[37]),
          e6[38] !== ei
            ? ((eo = (0, t.jsx)("input", { ...ei })),
              (e6[38] = ei),
              (e6[39] = eo))
            : (eo = e6[39]),
          e6[40] !== tb || e6[41] !== e7
            ? ((el = tb
                ? (0, t.jsx)("img", {
                    src: tb,
                    alt: e7("web.mayhem.coin_preview_alt"),
                    className: "h-full w-full rounded-[18px] object-cover",
                  })
                : (0, t.jsx)(H, {})),
              (e6[40] = tb),
              (e6[41] = e7),
              (e6[42] = el))
            : (el = e6[42]),
          e6[43] !== er ||
          e6[44] !== en ||
          e6[45] !== ea ||
          e6[46] !== eo ||
          e6[47] !== el
            ? ((es = (0, t.jsxs)("button", {
                type: "button",
                ...er,
                className: en,
                "aria-label": ea,
                children: [eo, el],
              })),
              (e6[43] = er),
              (e6[44] = en),
              (e6[45] = ea),
              (e6[46] = eo),
              (e6[47] = el),
              (e6[48] = es))
            : (es = e6[48]),
          e6[49] === Symbol.for("react.memo_cache_sentinel")
            ? ((ec = (e) => tf(e.target.value)), (e6[49] = ec))
            : (ec = e6[49]),
          e6[50] !== e7
            ? ((eu = e7("web.mayhem.coin_name_placeholder")),
              (e6[50] = e7),
              (e6[51] = eu))
            : (eu = e6[51]),
          e6[52] === Symbol.for("react.memo_cache_sentinel")
            ? ((em = (0, g.c)(
                b.e,
                "h-12 w-full px-4 text-sm text-text-primary outline-none placeholder:text-text-tertiary",
              )),
              (e6[52] = em))
            : (em = e6[52]),
          e6[53] !== td || e6[54] !== eu
            ? ((ed = (0, t.jsx)("input", {
                type: "text",
                value: td,
                onChange: ec,
                maxLength: E.f.NAME_MAX_LENGTH,
                placeholder: eu,
                className: em,
              })),
              (e6[53] = td),
              (e6[54] = eu),
              (e6[55] = ed))
            : (ed = e6[55]),
          e6[56] === Symbol.for("react.memo_cache_sentinel")
            ? ((ef = (0, g.c)(b.e, "flex h-12 items-center px-4")),
              (ep = (0, t.jsx)("span", {
                className: "text-sm text-text-tertiary",
                children: "$",
              })),
              (e6[56] = ef),
              (e6[57] = ep))
            : ((ef = e6[56]), (ep = e6[57])),
          e6[58] === Symbol.for("react.memo_cache_sentinel")
            ? ((eh = (e) => th(e.target.value.toUpperCase())), (e6[58] = eh))
            : (eh = e6[58]),
          e6[59] !== e7
            ? ((ey = e7("web.mayhem.ticker_placeholder")),
              (e6[59] = e7),
              (e6[60] = ey))
            : (ey = e6[60]),
          e6[61] !== ey || e6[62] !== tp
            ? ((ex = (0, t.jsxs)("div", {
                className: ef,
                children: [
                  ep,
                  (0, t.jsx)("input", {
                    type: "text",
                    value: tp,
                    onChange: eh,
                    maxLength: E.f.TICKER_MAX_LENGTH,
                    placeholder: ey,
                    className:
                      "h-full w-full bg-transparent pl-1.5 text-sm uppercase text-text-primary outline-none placeholder:text-text-tertiary",
                  }),
                ],
              })),
              (e6[61] = ey),
              (e6[62] = tp),
              (e6[63] = ex))
            : (ex = e6[63]),
          e6[64] !== ed || e6[65] !== ex
            ? ((eb = (0, t.jsxs)("div", {
                className:
                  "flex min-w-0 flex-1 flex-col justify-between gap-2 self-stretch",
                children: [ed, ex],
              })),
              (e6[64] = ed),
              (e6[65] = ex),
              (e6[66] = eb))
            : (eb = e6[66]),
          e6[67] === Symbol.for("react.memo_cache_sentinel")
            ? ((eg = (0, g.c)(b.e, "flex h-12 items-center px-4")),
              (e6[67] = eg))
            : (eg = e6[67]));
        let tG = tC > 0 ? tC : "";
        e6[68] !== tO
          ? ((ev = (e) => {
              let t = Number.parseFloat(e.target.value);
              tO(Number.isFinite(t) ? t : 0);
            }),
            (e6[68] = tO),
            (e6[69] = ev))
          : (ev = e6[69]);
        let tq = String(tS),
          tV = e7("web.mayhem.initial_buy_in_aria", { quote_symbol: tE });
        (e6[70] !== tD ||
        e6[71] !== tS ||
        e6[72] !== tG ||
        e6[73] !== ev ||
        e6[74] !== tq ||
        e6[75] !== tV
          ? ((ew = (0, t.jsx)("input", {
              id: "mayhem-initial-buy",
              type: "number",
              inputMode: "decimal",
              min: tS,
              step: tD,
              value: tG,
              onChange: ev,
              placeholder: tq,
              "aria-label": tV,
              className:
                "h-full w-full min-w-0 bg-transparent text-sm tabular-nums text-text-primary outline-none [appearance:textfield] placeholder:text-text-tertiary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            })),
            (e6[70] = tD),
            (e6[71] = tS),
            (e6[72] = tG),
            (e6[73] = ev),
            (e6[74] = tq),
            (e6[75] = tV),
            (e6[76] = ew))
          : (ew = e6[76]),
          e6[77] !== tE
            ? ((e_ = (0, t.jsx)("span", {
                className: "pl-1.5 text-[11px] text-text-tertiary",
                children: tE,
              })),
              (e6[77] = tE),
              (e6[78] = e_))
            : (e_ = e6[78]),
          e6[79] !== eg || e6[80] !== ew || e6[81] !== e_
            ? ((ej = (0, t.jsxs)("div", { className: eg, children: [ew, e_] })),
              (e6[79] = eg),
              (e6[80] = ew),
              (e6[81] = e_),
              (e6[82] = ej))
            : (ej = e6[82]));
        let tX = tC >= tS ? void 0 : "text-negative";
        if (
          (e6[83] !== tX
            ? ((ek = (0, g.c)(b.k, "whitespace-nowrap", tX)),
              (e6[83] = tX),
              (e6[84] = ek))
            : (ek = e6[84]),
          e6[85] !== tS || e6[86] !== e7
            ? ((eN = e7("web.mayhem.initial_buy_min", { min_amount: tS })),
              (e6[85] = tS),
              (e6[86] = e7),
              (e6[87] = eN))
            : (eN = e6[87]),
          e6[88] !== ek || e6[89] !== eN
            ? ((eE = (0, t.jsx)("span", { className: ek, children: eN })),
              (e6[88] = ek),
              (e6[89] = eN),
              (e6[90] = eE))
            : (eE = e6[90]),
          e6[91] !== ej || e6[92] !== eE
            ? ((eA = (0, t.jsxs)("div", {
                className:
                  "flex w-full flex-shrink-0 flex-col gap-2 @[480px]:w-32",
                children: [ej, eE],
              })),
              (e6[91] = ej),
              (e6[92] = eE),
              (e6[93] = eA))
            : (eA = e6[93]),
          e6[94] !== es || e6[95] !== eb || e6[96] !== eA
            ? ((eS = (0, t.jsxs)("div", {
                className:
                  "flex flex-wrap items-start gap-3 @[480px]:flex-nowrap",
                children: [es, eb, eA],
              })),
              (e6[94] = es),
              (e6[95] = eb),
              (e6[96] = eA),
              (e6[97] = eS))
            : (eS = e6[97]),
          e6[98] !== tv
            ? ((eD = tv
                ? (0, t.jsx)("p", {
                    className: "text-xs text-negative",
                    children: tv,
                  })
                : null),
              (e6[98] = tv),
              (e6[99] = eD))
            : (eD = e6[99]),
          e6[100] !== e7
            ? ((eC = e7("web.mayhem.pair_with")),
              (e6[100] = e7),
              (e6[101] = eC))
            : (eC = e6[101]),
          e6[102] !== eC
            ? ((eO = (0, t.jsx)("span", { className: b.r, children: eC })),
              (e6[102] = eC),
              (e6[103] = eO))
            : (eO = e6[103]),
          e6[104] === Symbol.for("react.memo_cache_sentinel")
            ? ((eM = (0, g.c)(b.M, "flex rounded-full p-[3px]")),
              (e6[104] = eM))
            : (eM = e6[104]),
          e6[105] !== t_ || e6[106] !== tu || e6[107] !== tO || e6[108] !== e7
            ? ((eT = $.map((e) =>
                (0, t.jsxs)(
                  "button",
                  {
                    type: "button",
                    disabled: t_,
                    onClick: () => {
                      ((0, M.gh)({
                        tabName: `quote:${e.toLowerCase()}`,
                        sourceElement: o.k9.MAYHEM_LAUNCH_FORM,
                      }),
                        tm(e),
                        tO("USDC" === e ? h.R : h.x));
                    },
                    className: (0, g.c)(
                      "flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full text-[13px] font-medium transition-colors",
                      tu === e ? b.i : b.R,
                    ),
                    children: [
                      "USDC" === e
                        ? (0, t.jsx)(c.default, {
                            alt: e7("web.mayhem.usdc_logo_alt"),
                            className: "size-4 rounded-full object-cover",
                            height: 16,
                            src: "/usdc2.png",
                            width: 16,
                          })
                        : null,
                      e,
                    ],
                  },
                  e,
                ),
              )),
              (e6[105] = t_),
              (e6[106] = tu),
              (e6[107] = tO),
              (e6[108] = e7),
              (e6[109] = eT))
            : (eT = e6[109]),
          e6[110] !== eT
            ? ((eF = (0, t.jsx)("div", { className: eM, children: eT })),
              (e6[110] = eT),
              (e6[111] = eF))
            : (eF = e6[111]),
          e6[112] !== eO || e6[113] !== eF
            ? ((eP = (0, t.jsxs)("div", {
                className: "flex flex-col gap-2",
                children: [eO, eF],
              })),
              (e6[112] = eO),
              (e6[113] = eF),
              (e6[114] = eP))
            : (eP = e6[114]),
          e6[115] !== e7
            ? ((ez = e7("web.mayhem.agent_trigger_mode")),
              (e6[115] = e7),
              (e6[116] = ez))
            : (ez = e6[116]),
          e6[117] !== ez
            ? ((eR = (0, t.jsx)("span", { className: b.r, children: ez })),
              (e6[117] = ez),
              (e6[118] = eR))
            : (eR = e6[118]),
          e6[119] === Symbol.for("react.memo_cache_sentinel")
            ? ((eI = (0, g.c)(b.M, "flex rounded-full p-[3px]")),
              (e6[119] = eI))
            : (eI = e6[119]),
          e6[120] !== tl || e6[121] !== t_ || e6[122] !== ts || e6[123] !== e7)
        ) {
          let e;
          (e6[125] !== t_ || e6[126] !== ts || e6[127] !== e7
            ? ((e = (e) =>
                (0, t.jsxs)(
                  "button",
                  {
                    type: "button",
                    disabled: t_,
                    onClick: () => {
                      ((0, M.gh)({
                        tabName: `mode:${e}`,
                        sourceElement: o.k9.MAYHEM_LAUNCH_FORM,
                      }),
                        tc(e));
                    },
                    className: (0, g.c)(
                      "flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full text-[13px] font-medium capitalize transition-colors",
                      ts === e ? b.i : b.R,
                    ),
                    children: [
                      ts === e
                        ? (0, t.jsx)("span", {
                            className: "size-1.5 rounded-full bg-positive",
                          })
                        : null,
                      "multiplayer" === e
                        ? e7("web.mayhem.mode_multiplayer")
                        : "manual" === e
                          ? e7("web.mayhem.agent_mode_manual")
                          : e7("web.mayhem.agent_mode_auto"),
                    ],
                  },
                  e,
                )),
              (e6[125] = t_),
              (e6[126] = ts),
              (e6[127] = e7),
              (e6[128] = e))
            : (e = e6[128]),
            (eL = tl.map(e)),
            (e6[120] = tl),
            (e6[121] = t_),
            (e6[122] = ts),
            (e6[123] = e7),
            (e6[124] = eL));
        } else eL = e6[124];
        (e6[129] !== eL
          ? ((eB = (0, t.jsx)("div", { className: eI, children: eL })),
            (e6[129] = eL),
            (e6[130] = eB))
          : (eB = e6[130]),
          e6[131] !== eR || e6[132] !== eB
            ? ((e$ = (0, t.jsxs)("div", {
                className: "flex flex-col gap-2",
                children: [eR, eB],
              })),
              (e6[131] = eR),
              (e6[132] = eB),
              (e6[133] = e$))
            : (e$ = e6[133]),
          e6[134] === Symbol.for("react.memo_cache_sentinel")
            ? ((eH = (0, g.c)(
                "flex items-center justify-between border-t pt-3.5 text-sm",
                b.N,
              )),
              (e6[134] = eH))
            : (eH = e6[134]),
          e6[135] !== e7
            ? ((eK = e7("web.mayhem.cycle_length")),
              (e6[135] = e7),
              (e6[136] = eK))
            : (eK = e6[136]),
          e6[137] !== eK
            ? ((eU = (0, t.jsx)("span", {
                className: "text-text-tertiary",
                children: eK,
              })),
              (e6[137] = eK),
              (e6[138] = eU))
            : (eU = e6[138]),
          e6[139] !== e7
            ? ((eW = e7("web.mayhem.cycle_length_value")),
              (e6[139] = e7),
              (e6[140] = eW))
            : (eW = e6[140]),
          e6[141] !== eW
            ? ((eG = (0, t.jsx)("span", {
                className: "font-semibold text-text-secondary",
                children: eW,
              })),
              (e6[141] = eW),
              (e6[142] = eG))
            : (eG = e6[142]),
          e6[143] !== eU || e6[144] !== eG
            ? ((eq = (0, t.jsxs)("div", { className: eH, children: [eU, eG] })),
              (e6[143] = eU),
              (e6[144] = eG),
              (e6[145] = eq))
            : (eq = e6[145]));
        let tY = t_ || (tH && !tK);
        return (
          e6[146] !== tU || e6[147] !== tH
            ? ((eV = () => {
                ((0, M.V4)({
                  buttonName: tH ? "launch_with_mayhem" : "connect_wallet",
                  sourceElement: o.k9.MAYHEM_LAUNCH_FORM,
                }),
                  tU());
              }),
              (e6[146] = tU),
              (e6[147] = tH),
              (e6[148] = eV))
            : (eV = e6[148]),
          e6[149] !== tH || e6[150] !== t_ || e6[151] !== e7
            ? ((eX = t_
                ? e7("web.mayhem.launching")
                : tH
                  ? e7("web.mayhem.launch_with_mayhem")
                  : e7("web.mayhem.connect_wallet_to_launch")),
              (e6[149] = tH),
              (e6[150] = t_),
              (e6[151] = e7),
              (e6[152] = eX))
            : (eX = e6[152]),
          e6[153] !== t_ || e6[154] !== tY || e6[155] !== eV || e6[156] !== eX
            ? ((eY = (0, t.jsx)(i.K, {
                isFullWidth: !0,
                isRounded: !0,
                size: 48,
                variant: "primary",
                isLoading: t_,
                isDisabled: tY,
                onClick: eV,
                children: eX,
              })),
              (e6[153] = t_),
              (e6[154] = tY),
              (e6[155] = eV),
              (e6[156] = eX),
              (e6[157] = eY))
            : (eY = e6[157]),
          e6[158] !== e7
            ? ((eJ = e7("web.mayhem.activity_disclaimer_prefix")),
              (e6[158] = e7),
              (e6[159] = eJ))
            : (eJ = e6[159]),
          e6[160] !== e7
            ? ((eZ = e7("web.mayhem.activity_disclaimer_emphasis")),
              (e6[160] = e7),
              (e6[161] = eZ))
            : (eZ = e6[161]),
          e6[162] !== eZ
            ? ((eQ = (0, t.jsx)("strong", {
                className: "font-semibold text-text-secondary",
                children: eZ,
              })),
              (e6[162] = eZ),
              (e6[163] = eQ))
            : (eQ = e6[163]),
          e6[164] !== e7
            ? ((e0 = e7("web.mayhem.activity_disclaimer_suffix")),
              (e6[164] = e7),
              (e6[165] = e0))
            : (e0 = e6[165]),
          e6[166] !== eJ || e6[167] !== eQ || e6[168] !== e0
            ? ((e1 = (0, t.jsxs)("p", {
                className: "text-xs leading-[18px] text-text-tertiary",
                children: [eJ, " ", eQ, e0],
              })),
              (e6[166] = eJ),
              (e6[167] = eQ),
              (e6[168] = e0),
              (e6[169] = e1))
            : (e1 = e6[169]),
          e6[170] !== et ||
          e6[171] !== eS ||
          e6[172] !== eD ||
          e6[173] !== eP ||
          e6[174] !== e$ ||
          e6[175] !== eq ||
          e6[176] !== eY ||
          e6[177] !== e1
            ? ((e2 = (0, t.jsxs)("section", {
                className: et,
                children: [eS, eD, eP, e$, eq, eY, e1],
              })),
              (e6[170] = et),
              (e6[171] = eS),
              (e6[172] = eD),
              (e6[173] = eP),
              (e6[174] = e$),
              (e6[175] = eq),
              (e6[176] = eY),
              (e6[177] = e1),
              (e6[178] = e2))
            : (e2 = e6[178]),
          e6[179] !== to
            ? ((e5 = (0, t.jsx)(_, { showParty: to })),
              (e6[179] = to),
              (e6[180] = e5))
            : (e5 = e6[180]),
          e6[181] !== e2 || e6[182] !== e5
            ? ((e4 = (0, t.jsxs)("div", {
                className:
                  "grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]",
                children: [e2, e5],
              })),
              (e6[181] = e2),
              (e6[182] = e5),
              (e6[183] = e4))
            : (e4 = e6[183]),
          e6[184] !== ee || e6[185] !== e4
            ? ((e3 = (0, t.jsxs)("div", {
                className: "flex flex-col gap-6",
                children: [ee, e4],
              })),
              (e6[184] = ee),
              (e6[185] = e4),
              (e6[186] = e3))
            : (e3 = e6[186]),
          e3
        );
      },
    ],
    999670,
  );
};
