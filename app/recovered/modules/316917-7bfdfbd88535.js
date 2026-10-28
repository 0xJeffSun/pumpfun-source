// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["f", () => eb], 316917);
  var t = e.i(732486),
    l = e.i(445242),
    n = e.i(292686),
    i = e.i(146695),
    a = e.i(365089),
    r = e.i(545063),
    s = e.i(574472),
    o = e.i(528600),
    d = e.i(352386);
  e.i(12692);
  var u = e.i(398902),
    c = e.i(335703),
    m = e.i(950766),
    f = e.i(329657),
    p = e.i(623288),
    h = e.i(599077),
    g = e.i(710416),
    x = e.i(673259),
    b = e.i(690814),
    y = e.i(774388),
    w = e.i(627092),
    v = e.i(462570),
    _ = e.i(408750),
    I = e.i(941006),
    N = e.i(338319);
  function j(e) {
    let n,
      i,
      a,
      r,
      s,
      o,
      c,
      m,
      f,
      p,
      j,
      M,
      C = (0, l.c)(47),
      { t: U } = (0, u.f)(),
      {
        callout: S,
        chainId: P,
        permalinkCalloutId: A,
        hasCommunityThread: F,
        viewerAddress: T,
        viewerCaller: z,
        focusReplyId: W,
        className: D,
      } = e,
      E = (0, h.useSearchParams)();
    C[0] !== E ? ((n = E?.get("reply")), (C[0] = E), (C[1] = n)) : (n = C[1]);
    let B = !!n,
      [L, O] = (0, d.useState)(k);
    C[2] === Symbol.for("react.memo_cache_sentinel")
      ? ((i = (e) => {
          O((t) => {
            let l = new Set(t);
            return (l.has(e) ? l.delete(e) : l.add(e), l);
          });
        }),
        (C[2] = i))
      : (i = C[2]);
    let H = i,
      $ = F ? S.calloutId : void 0;
    C[3] !== S.coinMint || C[4] !== S.userId || C[5] !== F || C[6] !== $
      ? ((a = {
          mint: S.coinMint,
          calloutId: $,
          authorAddress: S.userId,
          enabled: F,
          refetchIntervalMs: 15e3,
        }),
        (C[3] = S.coinMint),
        (C[4] = S.userId),
        (C[5] = F),
        (C[6] = $),
        (C[7] = a))
      : (a = C[7]);
    let { replies: R, isLoading: V } = (0, w.f)(a),
      q = F ? S.calloutId : void 0;
    C[8] !== S.coinMint || C[9] !== S.userId || C[10] !== q || C[11] !== T
      ? ((r = {
          mint: S.coinMint,
          calloutId: q,
          authorAddress: S.userId,
          viewerAddress: T,
        }),
        (C[8] = S.coinMint),
        (C[9] = S.userId),
        (C[10] = q),
        (C[11] = T),
        (C[12] = r))
      : (r = C[12]);
    let { latestAuthorUpdateAtMs: K, latestViewerReplyAtMs: Q } = (0, v.k)(r),
      G = (0, y.i)(),
      J = z ?? G?.viewerCaller,
      X = (0, d.useRef)(!1);
    C[13] !== W || C[14] !== R
      ? ((s = W && R.some((e) => e.replyId === W)),
        (C[13] = W),
        (C[14] = R),
        (C[15] = s))
      : (s = C[15]);
    let Y = !!s;
    return (C[16] !== W || C[17] !== Y
      ? ((o = () => {
          if (!W || !Y || X.current) return;
          let e = document.querySelector(`[data-reply-id="${CSS.escape(W)}"]`);
          if (!e) return;
          ((X.current = !0), e.scrollIntoView({ block: "center" }));
          let t = setTimeout(() => {
            document
              .querySelector(`[data-reply-id="${CSS.escape(W)}"]`)
              ?.scrollIntoView({ block: "center" });
          }, 1200);
          return () => clearTimeout(t);
        }),
        (c = [W, Y]),
        (C[16] = W),
        (C[17] = Y),
        (C[18] = o),
        (C[19] = c))
      : ((o = C[18]), (c = C[19])),
    (0, d.useEffect)(o, c),
    F)
      ? (C[20] !== U
          ? ((m = U("home.alerts_feed.filter_sheet.reply")),
            (C[20] = U),
            (C[21] = m))
          : (m = C[21]),
        C[22] !== D
          ? ((f = (0, N.c)("flex w-full flex-col", D)),
            (C[22] = D),
            (C[23] = f))
          : (f = C[23]),
        C[24] !== B ||
        C[25] !== S.calloutId ||
        C[26] !== S.coinMint ||
        C[27] !== S.userId ||
        C[28] !== P ||
        C[29] !== J ||
        C[30] !== K ||
        C[31] !== Q ||
        C[32] !== A ||
        C[33] !== T
          ? ((p = (0, t.jsx)(b.f, {
              mint: S.coinMint,
              chainId: P,
              calloutId: S.calloutId,
              permalinkCalloutId: A,
              authorAddress: S.userId,
              viewerAddress: T,
              viewerCaller: J,
              latestAuthorUpdateAtMs: K,
              latestViewerReplyAtMs: Q,
              autoFocus: B,
            })),
            (C[24] = B),
            (C[25] = S.calloutId),
            (C[26] = S.coinMint),
            (C[27] = S.userId),
            (C[28] = P),
            (C[29] = J),
            (C[30] = K),
            (C[31] = Q),
            (C[32] = A),
            (C[33] = T),
            (C[34] = p))
          : (p = C[34]),
        C[35] !== S.calloutId ||
        C[36] !== S.coinMint ||
        C[37] !== L ||
        C[38] !== W ||
        C[39] !== V ||
        C[40] !== R
          ? ((j =
              R.length > 0
                ? (0, t.jsx)("div", {
                    className:
                      "flex w-full flex-col border-t border-border-tertiary",
                    children: R.map((e) => {
                      let l = (0, _.O)(e),
                        n = L.has(e.replyId);
                      return (0, t.jsx)(
                        g.f,
                        {
                          reply: e,
                          mint: S.coinMint,
                          calloutId: S.calloutId,
                          focused: W === e.replyId,
                          commentCount: l,
                          commentsExpanded: n,
                          onToggleComments: () => H(e.replyId),
                          commentsSlot: n
                            ? (0, t.jsx)(x.f, {
                                mint: S.coinMint,
                                calloutId: S.calloutId,
                                parentReplyId: e.replyId,
                                commentCount: l,
                                parentAuthorName: (0, I.d)(e),
                              })
                            : null,
                        },
                        e.replyId,
                      );
                    }),
                  })
                : V
                  ? (0, t.jsxs)("div", {
                      "aria-hidden": !0,
                      "data-testid": "callout-replies-skeleton",
                      className:
                        "flex items-start gap-3 border-t border-border-tertiary py-3",
                      children: [
                        (0, t.jsx)("span", {
                          className:
                            "size-9 shrink-0 animate-pulse rounded-full bg-bg-quaternary",
                        }),
                        (0, t.jsxs)("div", {
                          className: "flex flex-1 flex-col gap-2",
                          children: [
                            (0, t.jsx)("span", {
                              className:
                                "h-3.5 w-36 animate-pulse rounded bg-bg-quaternary",
                            }),
                            (0, t.jsx)("span", {
                              className:
                                "h-3.5 w-full animate-pulse rounded bg-bg-tertiary",
                            }),
                            (0, t.jsx)("span", {
                              className:
                                "h-3.5 w-52 animate-pulse rounded bg-bg-tertiary",
                            }),
                          ],
                        }),
                      ],
                    })
                  : (0, t.jsx)("div", {
                      className: "border-t border-border-tertiary",
                    })),
            (C[35] = S.calloutId),
            (C[36] = S.coinMint),
            (C[37] = L),
            (C[38] = W),
            (C[39] = V),
            (C[40] = R),
            (C[41] = j))
          : (j = C[41]),
        C[42] !== f || C[43] !== p || C[44] !== j || C[45] !== m
          ? ((M = (0, t.jsxs)("section", {
              "data-testid": "callout-replies-section",
              "aria-label": m,
              className: f,
              children: [p, j],
            })),
            (C[42] = f),
            (C[43] = p),
            (C[44] = j),
            (C[45] = m),
            (C[46] = M))
          : (M = C[46]),
        M)
      : null;
  }
  function k() {
    return new Set();
  }
  e.s(["f", 0, j], 178175);
  var M = e.i(741084);
  let C = (e, t) => {
    let l = t?.username?.trim(),
      n = (0, M.f)(t?.profile_image),
      i = t?.resolved_avatar_decoration;
    return {
      walletAddress: e,
      ...(l ? { username: l } : {}),
      ...(n ? { avatarUrl: n } : {}),
      ...(i ? { avatarDecoration: i } : {}),
    };
  };
  function U(e) {
    let n,
      i,
      a,
      r,
      o = (0, l.c)(19),
      {
        callout: d,
        permalinkCalloutId: u,
        hasCommunityThread: c,
        chainId: m,
        viewerAddress: f,
        viewerCaller: p,
        children: h,
      } = e,
      g = c ? d.calloutId : void 0;
    o[0] !== d.coinMint || o[1] !== d.userId || o[2] !== g || o[3] !== f
      ? ((n = {
          mint: d.coinMint,
          calloutId: g,
          authorAddress: d.userId,
          viewerAddress: f,
        }),
        (o[0] = d.coinMint),
        (o[1] = d.userId),
        (o[2] = g),
        (o[3] = f),
        (o[4] = n))
      : (n = o[4]);
    let { latestAuthorUpdateAtMs: x, latestViewerReplyAtMs: b } = (0, v.k)(n),
      { user: w } = (0, s.F)();
    e: {
      let e;
      if (p) {
        i = p;
        break e;
      }
      if (!f) {
        i = void 0;
        break e;
      }
      (o[5] !== w || o[6] !== f
        ? ((e = C(f, w)), (o[5] = w), (o[6] = f), (o[7] = e))
        : (e = o[7]),
        (i = e));
    }
    let _ = i;
    o[8] !== d.userId ||
    o[9] !== m ||
    o[10] !== x ||
    o[11] !== b ||
    o[12] !== u ||
    o[13] !== _ ||
    o[14] !== f
      ? ((a = {
          permalinkCalloutId: u,
          chainId: m,
          authorAddress: d.userId,
          viewerAddress: f,
          viewerCaller: _,
          latestAuthorUpdateAtMs: x,
          latestViewerReplyAtMs: b,
        }),
        (o[8] = d.userId),
        (o[9] = m),
        (o[10] = x),
        (o[11] = b),
        (o[12] = u),
        (o[13] = _),
        (o[14] = f),
        (o[15] = a))
      : (a = o[15]);
    let I = a;
    return (
      o[16] !== h || o[17] !== I
        ? ((r = (0, t.jsx)(y.P, { value: I, children: h })),
          (o[16] = h),
          (o[17] = I),
          (o[18] = r))
        : (r = o[18]),
      r
    );
  }
  (e.s(["f", 0, C], 237599), e.s(["f", 0, U], 915625));
  var S = e.i(745018),
    P = e.i(439587),
    A = e.i(730721),
    F = e.i(51206),
    T = e.i(720772);
  function z(e) {
    let n,
      i,
      a,
      r,
      s,
      o,
      d = (0, l.c)(36),
      {
        mint: c,
        walletAddress: m,
        coin: f,
        ownerLabel: p,
        variant: h,
        className: g,
      } = e,
      x = void 0 === h ? "icon" : h,
      { t: b } = (0, u.f)();
    if (!(0, T.B)(f)) return null;
    d[0] !== f || d[1] !== c || d[2] !== p || d[3] !== m
      ? ((n = (e) => {
          (e.preventDefault(),
            e.stopPropagation(),
            (0, A.C)({
              mint: c,
              walletAddress: m,
              coin: f ?? void 0,
              ownerLabel: p,
              initialTab: "replay",
            }));
        }),
        (d[0] = f),
        (d[1] = c),
        (d[2] = p),
        (d[3] = m),
        (d[4] = n))
      : (n = d[4]);
    let y = n;
    if ("ghost" === x) {
      let e, l, n, i, a;
      return (
        d[5] !== b
          ? ((e = b("web.callouts.replay_a11y")), (d[5] = b), (d[6] = e))
          : (e = d[6]),
        d[7] !== b
          ? ((l = b("web.callouts.replay_cta")), (d[7] = b), (d[8] = l))
          : (l = d[8]),
        d[9] !== g
          ? ((n = (0, N.c)(
              (0, F.x)({ density: "terminal", size: 28, variant: "ghost" }),
              g,
            )),
            (d[9] = g),
            (d[10] = n))
          : (n = d[10]),
        d[11] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)(S.WW, { className: "size-3.5" })), (d[11] = i))
          : (i = d[11]),
        d[12] !== y || d[13] !== e || d[14] !== l || d[15] !== n
          ? ((a = (0, t.jsx)("button", {
              type: "button",
              "aria-label": e,
              title: l,
              "data-testid": "replay-position-button",
              className: n,
              onClick: y,
              children: i,
            })),
            (d[12] = y),
            (d[13] = e),
            (d[14] = l),
            (d[15] = n),
            (d[16] = a))
          : (a = d[16]),
        a
      );
    }
    if ("pill" === x) {
      let e, l, n;
      return (
        d[17] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(S.WW, { className: "size-4" })), (d[17] = e))
          : (e = d[17]),
        d[18] !== b
          ? ((l = b("web.callouts.replay_cta")), (d[18] = b), (d[19] = l))
          : (l = d[19]),
        d[20] !== g || d[21] !== y || d[22] !== l
          ? ((n = (0, t.jsx)(P.K, {
              variant: "secondary",
              size: 32,
              iconStart: e,
              onClick: y,
              className: g,
              children: l,
            })),
            (d[20] = g),
            (d[21] = y),
            (d[22] = l),
            (d[23] = n))
          : (n = d[23]),
        n
      );
    }
    return (
      d[24] !== b
        ? ((i = b("web.callouts.replay_a11y")), (d[24] = b), (d[25] = i))
        : (i = d[25]),
      d[26] !== b
        ? ((a = b("web.callouts.replay_cta")), (d[26] = b), (d[27] = a))
        : (a = d[27]),
      d[28] !== g
        ? ((r = (0, N.c)(
            "inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border-secondary bg-bg-secondary text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary",
            g,
          )),
          (d[28] = g),
          (d[29] = r))
        : (r = d[29]),
      d[30] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsx)(S.WW, { className: "size-3.5" })), (d[30] = s))
        : (s = d[30]),
      d[31] !== y || d[32] !== i || d[33] !== a || d[34] !== r
        ? ((o = (0, t.jsx)("button", {
            type: "button",
            "aria-label": i,
            title: a,
            "data-testid": "replay-position-button",
            className: r,
            onClick: y,
            children: s,
          })),
          (d[31] = y),
          (d[32] = i),
          (d[33] = a),
          (d[34] = r),
          (d[35] = o))
        : (o = d[35]),
      o
    );
  }
  var W = e.i(999139),
    D = e.i(154121);
  e.i(107240);
  var E = e.i(693124),
    B = e.i(167958),
    L = e.i(634661),
    O = e.i(116458),
    H = e.i(79631),
    $ = e.i(464154),
    R = e.i(690877),
    V = e.i(68740),
    q = e.i(38279),
    K = e.i(795663),
    Q = e.i(406920),
    G = e.i(759257),
    J = e.i(605587);
  let X = (e) => {
      let t = "number" == typeof e ? e : Number(e ?? 0);
      return Number.isFinite(t) ? t : 0;
    },
    Y = (e, t) => {
      let l = X(e.baseAmount),
        n = X(e.amountUsd),
        i = X(e.amountSol);
      return {
        slotIndexId: e.slotIndexId ?? "",
        tx: e.tx,
        timestamp: e.timestamp,
        userAddress: t,
        type: e.type,
        isBondingCurve: !1,
        priceUSD: l > 0 && n > 0 ? String(n / l) : "0",
        priceSOL: l > 0 && i > 0 ? String(i / l) : "0",
        amountUSD: String(n),
        amountSOL: String(i),
        baseAmount: String(l),
      };
    },
    Z = async (e, t, l, n) => {
      let i,
        a = [];
      for (let r = 0; r < 30; r++) {
        let r = new URLSearchParams({ mint: e.mint, limit: String(200) });
        (null != t && r.set("chainId", String(t)), i && r.set("cursor", i));
        let s = await fetch(
          `${q.C.PROFILE}/v4/pnl/${encodeURIComponent(l)}/trades?${r.toString()}`,
          { signal: n },
        );
        if (!s.ok) throw Error(`Failed to fetch replay trades: ${s.status}`);
        let o = await s.json();
        for (let e of o.trades ?? [])
          "transfer" !== e.kind &&
            ("buy" === e.type || "sell" === e.type) &&
            e.tx &&
            a.push(Y(e, l));
        if (!o.pagination?.hasMore || !o.pagination.nextCursor) break;
        i = o.pagination.nextCursor;
      }
      return a;
    },
    ee = async (e, t, l) => {
      let n,
        i = [];
      for (let a = 0; a < 30; a++) {
        let a = await (0, G.j)()("GET /user-trades/{id}", {
          params: { id: t },
          query: { mint: e.mint, limit: 100, cursor: n },
          signal: l,
        });
        for (let l of a.trades ?? []) {
          if (!l.tx || !l.timestamp) continue;
          let n = (0, Q.r)(l, { program: e.program });
          i.push({
            slotIndexId: n.slotIndexId,
            tx: n.tx,
            timestamp: l.timestamp,
            userAddress: t,
            type: n.type,
            isBondingCurve: !1,
            priceUSD: n.priceUsd || "0",
            priceSOL: n.priceSol || "0",
            amountUSD: n.amountUsd || "0",
            amountSOL: n.amountSol || "0",
            baseAmount: n.baseAmount || void 0,
          });
        }
        if (!a.nextCursor) break;
        n = a.nextCursor;
      }
      return i.sort(
        (e, t) => Date.parse(e.timestamp) - Date.parse(t.timestamp),
      );
    },
    et = async (e) => {
      let { coin: t, walletAddress: l, signal: n } = e,
        i = (0, T.X)(t);
      if (null == i) {
        if (!t.program)
          throw Error(`Coin ${t.mint} has no program to read trades for`);
        let e = await Z(t, null, l, n);
        if (e.length > 0) return { rows: e, baseDecimals: 0, account: l };
        let i = await (0, V.f)(
          t.mint,
          t.program,
          t.created_timestamp ?? null,
          l,
        );
        return i.length > 0
          ? { rows: i, baseDecimals: t.base_decimals ?? null, account: l }
          : { rows: await ee(t, l, n), baseDecimals: 0, account: l };
      }
      let a = (0, J.h)(l) ? l : await (0, K.a)({ solAddress: l, signal: n });
      return a
        ? { rows: await Z(t, i, a, n), baseDecimals: 0, account: a }
        : { rows: [], baseDecimals: 0, account: null };
    };
  var el = e.i(921152),
    en = e.i(250311);
  let ei = ["1s", "15s", "30s", "1m", "5m", "15m", "1h", "4h", "1d"],
    ea = (e) => {
      if (e instanceof Date) return e.getTime();
      if ("number" == typeof e) return e > 1e10 ? e : 1e3 * e;
      let t = Date.parse(e);
      if (Number.isFinite(t)) return t;
      let l = Number(e);
      return Number.isFinite(l) ? (l > 1e10 ? l : 1e3 * l) : 0;
    },
    er = (e, t = {}) => {
      let l = [];
      for (let n of e) {
        if ("buy" !== n.type && "sell" !== n.type) continue;
        let e = Number(n.amountUSD);
        if (!Number.isFinite(e) || e <= 0) continue;
        let i = (0, en.u)(n, e, t.baseDecimals);
        null !== i &&
          l.push({
            tMs: ea(n.timestamp),
            side: n.type,
            usd: e,
            tokens: i,
            priceUsd: e / i,
          });
      }
      return l.sort((e, t) => e.tMs - t.tMs);
    },
    es = (e, t) => {
      let l = 0,
        n = e.length - 1,
        i = -1;
      for (; l <= n; ) {
        let a = (l + n) >> 1;
        e[a].tMs <= t ? ((i = a), (l = a + 1)) : (n = a - 1);
      }
      return i;
    },
    eo = (e, t) => {
      let l = es(e.pnlStates, t);
      if (l < 0) return 0;
      let n = e.pnlStates[l],
        i = ((e, t) => {
          let { candles: l, interval: n } = e;
          if (0 === l.length) return 0;
          let i = es(l, t);
          if (i < 0) return l[0].open;
          let a = l[i],
            r = (0, el.B)(n),
            s = Math.min(1, Math.max(0, (t - a.tMs) / r));
          return a.open + (a.close - a.open) * s;
        })(e, t);
      return n.realizedUsd + n.tokensHeld * i - n.costBasisUsd;
    };
  function ed(e) {
    let t,
      n,
      i,
      a,
      r = (0, l.c)(15),
      { coin: s, walletAddress: o, enabled: d } = e,
      u = void 0 === d || d,
      c = s?.mint ?? "",
      m = o ?? "";
    if (r[0] !== s || r[1] !== c || r[2] !== m)
      ((t = [
        "position-replay-trades",
        c,
        m,
        s?.chain_id ?? null,
        s?.program ?? null,
        s?.created_timestamp ?? null,
      ]),
        (r[0] = s),
        (r[1] = c),
        (r[2] = m),
        (r[3] = t));
    else t = r[3];
    (r[4] !== s || r[5] !== o
      ? ((n = (e) => {
          let { signal: t } = e;
          return et({ coin: s, walletAddress: o, signal: t });
        }),
        (r[4] = s),
        (r[5] = o),
        (r[6] = n))
      : (n = r[6]),
      r[7] !== s || r[8] !== u || r[9] !== o
        ? ((i = u && s && o && (0, T.B)(s)),
          (r[7] = s),
          (r[8] = u),
          (r[9] = o),
          (r[10] = i))
        : (i = r[10]));
    let f = !!i;
    return (
      r[11] !== t || r[12] !== n || r[13] !== f
        ? ((a = { queryKey: t, queryFn: n, enabled: f, staleTime: 3e4 }),
          (r[11] = t),
          (r[12] = n),
          (r[13] = f),
          (r[14] = a))
        : (a = r[14]),
      (0, R.useQuery)(a)
    );
  }
  function eu(e) {
    let t,
      n = (0, l.c)(3),
      i = ed(e);
    return (
      !!i.data &&
      !i.isError &&
      (n[0] !== i.data.baseDecimals || n[1] !== i.data.rows
        ? ((t = er(i.data.rows, { baseDecimals: i.data.baseDecimals })),
          (n[0] = i.data.baseDecimals),
          (n[1] = i.data.rows),
          (n[2] = t))
        : (t = n[2]),
      t.length > 0)
    );
  }
  (e.s(
    [
      "G",
      0,
      1e-6,
      "R",
      0,
      (e) => {
        let { window: t, interval: l, nowMs: n, closedAtMs: i = null } = e;
        if (0 === e.trades.length) return null;
        let a = [...e.trades].sort((e, t) => e.tMs - t.tMs),
          r = e.candles
            .filter(
              (e) =>
                e.tMs >= t.startMs - (0, el.B)(l) &&
                e.tMs <= t.endMs &&
                [e.open, e.high, e.low, e.close].every(
                  (e) => Number.isFinite(e) && e > 0,
                ),
            )
            .sort((e, t) => e.tMs - t.tMs);
        if (0 === r.length) return null;
        let s = e.callouts
            .filter((e) => e.tMs >= t.startMs && e.tMs <= t.endMs)
            .sort((e, t) => e.tMs - t.tMs)
            .slice(0, 3),
          o = ((e) => {
            let t = [],
              l = 0,
              n = 0,
              i = 0;
            for (let a of e) {
              if ("buy" === a.side) ((l += a.tokens), (n += a.usd));
              else if (l <= 0) i += a.usd;
              else {
                let e = Math.min(a.tokens, l),
                  t = (n / l) * e,
                  r = a.usd * (e / a.tokens),
                  s = a.usd - r;
                ((i += r - t + s), (l -= e), (n = Math.max(0, n - t)));
              }
              t.push({
                tMs: a.tMs,
                tokensHeld: l,
                costBasisUsd: n,
                realizedUsd: i,
              });
            }
            return t;
          })(a),
          d = o[o.length - 1],
          u = e.isOpenPosition ?? d.tokensHeld > 1e-6,
          c = 0,
          m = 0,
          f = 0,
          p = 0;
        for (let e of a)
          "buy" === e.side
            ? ((c += e.usd), (f += 1))
            : ((m += e.usd), (p += 1));
        let h = a[a.length - 1].tMs,
          g = Math.max(i ?? h, h),
          x = Math.max(0, (u ? Math.max(n ?? h, h) : g) - a[0].tMs),
          b = 1 / 0,
          y = 0,
          w = 0;
        for (let e of r)
          ((b = Math.min(b, e.low)),
            (y = Math.max(y, e.high)),
            (w = Math.max(w, e.volume)));
        let v = { candles: r, interval: l, pnlStates: o },
          _ = 0,
          I = 0;
        for (let e of r) {
          let t = eo(v, e.tMs + (0, el.B)(l) - 1);
          ((_ = Math.max(_, t)), (I = Math.min(I, t)));
        }
        for (let e of a) {
          let t = eo(v, e.tMs);
          ((_ = Math.max(_, t)), (I = Math.min(I, t)));
        }
        let N = u ? eo(v, t.endMs) : m - c;
        return (
          (_ = Math.max(_, N)),
          (I = Math.min(I, N)),
          {
            window: t,
            interval: l,
            candles: r,
            trades: a,
            callouts: s,
            priceMin: b,
            priceMax: y,
            isOpenPosition: u,
            investedUsd: c,
            proceedsUsd: m,
            finalPnlUsd: N,
            maxPnlUsd: _,
            minPnlUsd: I,
            buyCount: f,
            sellCount: p,
            holdDurationMs: x,
            closedAtMs: u ? null : g,
            volumeMax: w,
            pnlStates: o,
          }
        );
      },
      "c",
      0,
      (e) => {
        let {
          trades: t,
          calloutTimesMs: l = [],
          isOpenPosition: n,
          nowMs: i,
        } = e;
        if (0 === t.length) return null;
        let a = t.map((e) => e.tMs),
          r = Math.min(...a, ...l),
          s = Math.max(...a),
          o = n ? Math.max(i, s) : s,
          d = Math.max(0.06 * Math.max(o - r, 18e5), 6e4);
        return { startMs: r - d, endMs: Math.max(o + d, r + 18e5) };
      },
      "P",
      0,
      er,
      "A",
      0,
      (e) => {
        for (let t of ei) if (e / (0, el.B)(t) <= 180) return t;
        return "1d";
      },
    ],
    555015,
  ),
    e.s(["i", 0, eu, "p", 0, ed], 785783));
  var ec = e.i(384886),
    em = e.i(541710),
    ef = e.i(646908),
    ep = e.i(253623),
    eh = e.i(193504),
    eg = e.i(595673);
  let ex = {
    mine: n.k9.POSITION_MODAL_HEADER,
    other: n.k9.POSITION_MODAL_HEADER,
  };
  function eb(e) {
    let n,
      h,
      g,
      x,
      b,
      y,
      w,
      v,
      _,
      I,
      N,
      k,
      M,
      C,
      S = (0, l.c)(72),
      { t: P } = (0, u.f)(),
      { coin: A, holder: F, onOpenChange: T } = e,
      R = null != F,
      [V, q] = (0, d.useState)(!1);
    S[0] !== A
      ? ((n = (0, ef.e)(A) || null != (0, em.T)(A.chain_id)),
        (S[0] = A),
        (S[1] = n))
      : (n = S[1]);
    let K = n,
      Q = (0, em.l)(),
      { address: G } = (0, s.F)(),
      J = (0, r.$)(),
      X = F?.address ?? "";
    S[2] !== R || S[3] !== X
      ? ((h = { userIdentifier: X, enabled: R }),
        (S[2] = R),
        (S[3] = X),
        (S[4] = h))
      : (h = S[4]);
    let { data: Y } = (0, o.U)(h),
      Z = Y?.userId ?? F?.userId ?? null;
    S[5] !== F?.username || S[6] !== Y?.username
      ? ((g = Y?.username?.trim() || F?.username?.trim() || null),
        (S[5] = F?.username),
        (S[6] = Y?.username),
        (S[7] = g))
      : (g = S[7]);
    let ee = g;
    S[8] !== A.chain_id || S[9] !== F || S[10] !== ee
      ? ((x = ee ?? (F ? (0, ep.j)(F.address, A.chain_id, a.J) : "")),
        (S[8] = A.chain_id),
        (S[9] = F),
        (S[10] = ee),
        (S[11] = x))
      : (x = S[11]);
    let et = x;
    S[12] !== F || S[13] !== Z || S[14] !== J
      ? ((b = null != F && (J(F.address) || (null != Z && J(Z)))),
        (S[12] = F),
        (S[13] = Z),
        (S[14] = J),
        (S[15] = b))
      : (b = S[15]);
    let el = b,
      en = F?.address;
    S[16] !== A || S[17] !== R || S[18] !== en
      ? ((y = { coin: A, walletAddress: en, enabled: R }),
        (S[16] = A),
        (S[17] = R),
        (S[18] = en),
        (S[19] = y))
      : (y = S[19]);
    let ei = eu(y),
      ea = (0, ef.L)(A.chain_id)
        ? ef.J
        : (0, ef.B)(A.chain_id) && (0, em.M)(Q)
          ? ef.d
          : void 0,
      er = F?.address;
    S[20] !== A.mint || S[21] !== R || S[22] !== ea || S[23] !== er
      ? ((w = { mint: A.mint, chain: ea, accountKey: er, enabled: R }),
        (S[20] = A.mint),
        (S[21] = R),
        (S[22] = ea),
        (S[23] = er),
        (S[24] = w))
      : (w = S[24]);
    let { callout: es } = (0, O.W)(w),
      eo = es?.calloutId,
      ed = R && !!es?.calloutId;
    S[25] !== A.mint || S[26] !== eo || S[27] !== ed
      ? ((v = { mint: A.mint, calloutId: eo, enabled: ed }),
        (S[25] = A.mint),
        (S[26] = eo),
        (S[27] = ed),
        (S[28] = v))
      : (v = S[28]);
    let { callout: eb, hasCommunityThread: ey } = (0, $.u)(v),
      ew = (0, ec.h)(A.mint, A.chain_id),
      { summaryFor: ev } = (0, H._)({
        userId: F?.address,
        mints: [ew],
        enabled: R,
      }),
      e_ = F?.address,
      eI = F?.username;
    S[29] !== Y || S[30] !== R || S[31] !== e_ || S[32] !== eI
      ? ((_ = { address: e_, user: Y, fallbackName: eI, enabled: R }),
        (S[29] = Y),
        (S[30] = R),
        (S[31] = e_),
        (S[32] = eI),
        (S[33] = _))
      : (_ = S[33]);
    let eN = (0, D.f)(_),
      ej = ev(ew) ?? ev(A.mint),
      ek = eN
        ? (0, eh.D)({
            mint: A.mint,
            coin: A,
            coinName: A.name,
            coinSymbol: A.symbol,
            coinImageUri: A.image_uri ?? null,
            summary: ej,
            holder: eN,
          })
        : null;
    S[34] !== A ||
    S[35] !== eb ||
    S[36] !== ei ||
    S[37] !== F ||
    S[38] !== et ||
    S[39] !== ee ||
    S[40] !== el ||
    S[41] !== ek ||
    S[42] !== G
      ? ((I = F
          ? (0, t.jsxs)(t.Fragment, {
              children: [
                el
                  ? null
                  : (0, t.jsx)(m.f, {
                      userAddress: F.address,
                      displayName: et,
                      isLoggedIn: !!G,
                      density: "terminal",
                      initialIsFollowing: F.isFollowing,
                      connectSource: "coin_holder_dialog",
                      "data-testid": "holder-position-follow",
                    }),
                !eb && ei
                  ? (0, t.jsx)(z, {
                      variant: "ghost",
                      mint: A.mint,
                      walletAddress: F.address,
                      coin: A,
                      ownerLabel: ee ?? void 0,
                    })
                  : null,
                !eb && ek
                  ? (0, t.jsx)(W.f, {
                      data: ek,
                      sourceElement: ex,
                      iconClassName: "size-3.5",
                    })
                  : null,
              ],
            })
          : void 0),
        (S[34] = A),
        (S[35] = eb),
        (S[36] = ei),
        (S[37] = F),
        (S[38] = et),
        (S[39] = ee),
        (S[40] = el),
        (S[41] = ek),
        (S[42] = G),
        (S[43] = I))
      : (I = S[43]);
    let eM = I;
    return (
      S[44] !== A.chain_id ||
      S[45] !== A.mint ||
      S[46] !== F ||
      S[47] !== Y ||
      S[48] !== Z ||
      S[49] !== ee
        ? ((N = F
            ? (0, t.jsx)(E.S, {
                address: F.address,
                chain: A.chain_id,
                userId: Z,
                href: (0, i.$)({
                  address: F.profileWallet ?? F.address,
                  userId: Z,
                }),
                shallowProfileId: F.profileWallet ?? F.address,
                username: ee,
                profileImage: Y?.profile_image ?? F.profileImage,
                avatarDecoration:
                  Y?.resolved_avatar_decoration ?? F.avatarDecoration,
                xUsername: Y?.x_username ?? F.xUsername,
                size: 24,
                density: "terminal",
                outsideWallet: !!F.outsideWallet && !Y,
                verified: !!F.verified || "lookup",
                hoverCard: !1,
                onClick: () =>
                  (0, eg.em)({ mint: A.mint, profileUserId: F.address }),
              })
            : void 0),
          (S[44] = A.chain_id),
          (S[45] = A.mint),
          (S[46] = F),
          (S[47] = Y),
          (S[48] = Z),
          (S[49] = ee),
          (S[50] = N))
        : (N = S[50]),
      S[51] !== P
        ? ((k = P("coin_details.position")), (S[51] = P), (S[52] = k))
        : (k = S[52]),
      S[53] !== A ||
      S[54] !== eb ||
      S[55] !== ey ||
      S[56] !== F ||
      S[57] !== es ||
      S[58] !== Y ||
      S[59] !== V ||
      S[60] !== K ||
      S[61] !== P ||
      S[62] !== G
        ? ((M = F
            ? (0, t.jsxs)(B.K, {
                className: "flex flex-col gap-3",
                children: [
                  eb
                    ? (0, t.jsx)(U, {
                        callout: eb,
                        permalinkCalloutId: es?.calloutId ?? "",
                        hasCommunityThread: ey,
                        chainId: A.chain_id,
                        viewerAddress: G,
                        children: (0, t.jsxs)("div", {
                          className: "flex flex-col",
                          children: [
                            (0, t.jsx)(f.f, {
                              callout: eb,
                              permalinkCalloutId: es?.calloutId ?? "",
                              coin: A,
                              user: Y ?? void 0,
                              liveMarketCap: null,
                              hasCommunityThread: ey,
                              viewerAddress: G,
                              isLoggedIn: !!G,
                              hideCoinIdentity: !0,
                              className: "border-b border-border-secondary",
                            }),
                            (0, t.jsx)(j, {
                              chainId: A.chain_id,
                              callout: eb,
                              permalinkCalloutId: es?.calloutId ?? "",
                              hasCommunityThread: ey,
                              viewerAddress: G,
                            }),
                          ],
                        }),
                      })
                    : null === es
                      ? (0, t.jsx)(c.f, {
                          mint: A.mint,
                          authorAddress: F.address,
                          symbol: A.symbol,
                          name: A.name,
                          imageUri: A.image_uri,
                          chainId: A.chain_id,
                          variant: "elevated",
                          className: "w-full",
                        })
                      : null,
                  (0, t.jsxs)("section", {
                    "aria-label": P("common.trades"),
                    children: [
                      (0, t.jsx)(L._, {
                        density: "terminal",
                        title: P("common.trades"),
                        titleAs: "h3",
                        bleed: !0,
                        className: "mt-3 mb-0",
                        action: K
                          ? void 0
                          : (0, t.jsx)(p.W, {
                              checked: V,
                              onChange: q,
                              dense: !0,
                            }),
                      }),
                      (0, t.jsx)(p.j, {
                        coin: A,
                        authorAddress: F.address,
                        dense: !0,
                        hostInset: "terminal",
                        includeTransfers: V,
                        onIncludeTransfersChange: q,
                        className: "border-t-0",
                      }),
                    ],
                  }),
                ],
              })
            : null),
          (S[53] = A),
          (S[54] = eb),
          (S[55] = ey),
          (S[56] = F),
          (S[57] = es),
          (S[58] = Y),
          (S[59] = V),
          (S[60] = K),
          (S[61] = P),
          (S[62] = G),
          (S[63] = M))
        : (M = S[63]),
      S[64] !== eM ||
      S[65] !== et ||
      S[66] !== R ||
      S[67] !== T ||
      S[68] !== N ||
      S[69] !== k ||
      S[70] !== M
        ? ((C = (0, t.jsx)(B.N, {
            open: R,
            onOpenChange: T,
            density: "terminal",
            size: "lg",
            title: N,
            truncateTitle: !1,
            "aria-label": et,
            aside: k,
            headerActions: eM,
            "data-testid": "holder-position-dialog",
            children: M,
          })),
          (S[64] = eM),
          (S[65] = et),
          (S[66] = R),
          (S[67] = T),
          (S[68] = N),
          (S[69] = k),
          (S[70] = M),
          (S[71] = C))
        : (C = S[71]),
      C
    );
  }
};
