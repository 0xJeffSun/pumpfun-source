// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(745018),
    l = e.i(292686),
    r = e.i(365089),
    a = e.i(574472),
    s = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    u = e.i(63289),
    d = e.i(924631),
    c = e.i(256272),
    m = e.i(51206),
    f = e.i(607122);
  e.i(70833);
  var p = e.i(102824),
    g = e.i(593293),
    b = e.i(254667),
    _ = e.i(426091),
    y = e.i(914549),
    h = e.i(536925),
    x = e.i(777887),
    v = e.i(896342),
    k = e.i(895492),
    w = e.i(618119),
    S = e.i(203941),
    A = e.i(769953),
    I = e.i(474294),
    P = e.i(276300),
    U = e.i(170356),
    q = e.i(486813),
    R = e.i(526317),
    M = e.i(541710),
    j = e.i(252911),
    C = e.i(480133),
    B = e.i(923427);
  let F = { ok: !1, reason: "superseded", retryable: !1, quiet: !0 },
    D = (e, t = !1) => ({ ok: !1, reason: e, retryable: t }),
    L = (e) => (e instanceof Error ? e.message : String(e)),
    N = async ({
      identity: e,
      key: t,
      lane: n,
      signTransaction: i,
      solPriceUsd: l,
      spotUsdPrice: r,
      wanted: a,
      tapWaiting: s,
      signFloor: o,
    }) => {
      let u,
        d,
        c,
        m,
        f,
        p = (0, A.h)({ identity: e, solPriceUsd: l });
      if (null === p) return D("no_sol_price", !0);
      let g = performance.now(),
        b = Date.now();
      try {
        u = await (0, B.x)(
          "create",
          (0, v.f)(p, {
            idempotencyKey: `presign-${((e) => {
              let t = 0x811c9dc5;
              for (let n = 0; n < e.length; n += 1)
                ((t ^= e.charCodeAt(n)), (t = Math.imul(t, 0x1000193) >>> 0));
              return t.toString(16).padStart(8, "0");
            })(t)}-${Date.now()}`,
          }),
        );
      } catch (e) {
        return D(L(e), !((0, R.v)(e) && !e.retryable));
      }
      let h = performance.now() - g;
      if ((0, R.W)(u)) return D("held_for_review");
      let I = u.unsigned_tx;
      if ("solana" !== I.chain) return D("unexpected_tx");
      let U = "pending" === u.quote.quote_status;
      if (!U && null == u.quote.expected_out) return D("no_expected_out");
      let M = u.intent_id,
        N = {
          mint: e.mint,
          chainId: e.chainId,
          funding: e.funding.kind,
          intentId: M,
          lane: n,
        };
      try {
        d = (0, k.H)(I);
      } catch (e) {
        return (
          (0, q.f)({
            error: e,
            operation: "buy_presign",
            context: { ...N, encoding: I.encoding ?? "base58" },
          }),
          D("decode_failed")
        );
      }
      let T = (0, S.o)() ?? (0, w.r)();
      U &&
        T?.listen((e) => {
          if (!(0, R.C)(e.intent_id, M)) return;
          let t = ((e) => {
            let t = e.quote_status ?? void 0;
            if ("ready" === t) {
              let t = e.expected_out ?? void 0,
                n = e.min_out ?? void 0;
              if (void 0 === t || void 0 === n || "0" === n)
                return { status: "failed", code: P.f };
              let i = e.slippage_bps ?? void 0;
              return {
                status: "ready",
                expectedOut: t,
                minOut: n,
                ...(void 0 === i ? {} : { slippageBps: i }),
              };
            }
            if ("failed" === t)
              return { status: "failed", code: e.quote_fail_code ?? P.f };
          })(e);
          if (void 0 !== t) {
            if (void 0 === c) {
              m = t;
              return;
            }
            (0, A.T)(c, t);
          }
        });
      let W = (e) => (T?.close(), e);
      if (
        !a() ||
        (void 0 !== o &&
          (await (0, B.R)(o.nextAllowedAt(), () => s() || !a()), !a()))
      )
        return W(F);
      let $ = (0, j.U)(d),
        E = performance.now();
      try {
        let e = await (0, x._)(async () =>
          a()
            ? (0, y.F)()
              ? "would_prompt"
              : (0, B.x)("sign", i(d))
            : "superseded",
        );
        if ("superseded" === e) return W(F);
        if ("would_prompt" === e) return W(D("would_prompt"));
        f = e;
        let t = (0, j._)($, f);
        "rebuilt-unsigned" === t.kind &&
          (0, q.f)({
            error: Error("wallet rebuilt an unsigned bridge deposit message"),
            operation: "buy_presign",
            context: {
              ...N,
              walletName: (0, _.Y)(),
              messageMutation: t.report.kinds.join(","),
              messageMutationSummary: t.report.summary,
            },
          });
      } catch (e) {
        if (e instanceof j.e)
          return (
            (0, q.f)({
              error: e,
              operation: "buy_presign",
              context: {
                ...N,
                walletName: (0, _.Y)(),
                messageMutation: e.kinds.join(","),
              },
            }),
            W(D(L(e)))
          );
        return W(D(L(e), !0));
      }
      let Q = performance.now() - E,
        z = Date.now();
      if (
        (o?.noteSigned(z),
        (c = {
          key: t,
          lane: n,
          identity: e,
          request: p,
          created: u,
          signedTx: f,
          depositSignature: (0, C.w)(f),
          quoteStatus: U ? "pending" : "ready",
          feed: T,
          createdAt: b,
          signedAt: z,
          createMs: h,
          signMs: Q,
          spotUsdPrice: r,
          solPriceUsd: "sol" === e.funding.kind ? l : null,
          consumed: !1,
        }),
        void 0 !== m)
      ) {
        if ("failed" === m.status) return W(D(`quote_${m.code}`, !0));
        (0, A.T)(c, m);
      }
      return { ok: !0, entry: c };
    },
    T = () => !(0, y.F)(),
    W = () => !1,
    $ = (e) => {
      let t,
        i,
        l,
        r,
        o,
        u,
        d,
        c,
        m,
        f,
        p,
        _,
        x = (0, n.c)(51),
        {
          enabled: k,
          lane: w,
          mint: S,
          chainId: P,
          solanaWallet: q,
          evmWalletAddress: R,
          funding: j,
          slippageBps: C,
          solPriceUsd: F,
          spotUsdPrice: L,
          typedPolicy: $,
          calloutUser: Q,
        } = e,
        { wallet: z, shouldUsePrivy: O, privyMfaEnrolled: G } = (0, a.F)(),
        K = (0, M.l)();
      x[0] !== P || x[1] !== S
        ? ((t = { chainId: P, mint: S }), (x[0] = P), (x[1] = S), (x[2] = t))
        : (t = x[2]);
      let H = (0, g.G)(t);
      x[3] !== O || x[4] !== z
        ? ((i = O && z?.signTransaction ? (e) => z.signTransaction(e) : void 0),
          (x[3] = O),
          (x[4] = z),
          (x[5] = i))
        : (i = x[5]);
      let X = i,
        V = (0, s.useSyncExternalStore)(y.R, T, W);
      if (x[6] !== j)
        ((l =
          null === j
            ? ""
            : `${j.kind}:${"usdc" === j.kind ? j.amountIn : j.lamports}`),
          (x[6] = j),
          (x[7] = l));
      else l = x[7];
      let Y = l,
        [Z] = (0, h.r)(Y, $?.debounceMs ?? 0),
        J = void 0 === $ || Z === Y ? j : null;
      if (
        x[8] !== H ||
        x[9] !== Q ||
        x[10] !== K ||
        x[11] !== P ||
        x[12] !== k ||
        x[13] !== R ||
        x[14] !== S ||
        x[15] !== G ||
        x[16] !== J ||
        x[17] !== X ||
        x[18] !== V ||
        x[19] !== C ||
        x[20] !== q
      ) {
        let e;
        ((o =
          null ===
          (r =
            k &&
            V &&
            !G &&
            void 0 !== X &&
            "number" == typeof P &&
            P > 0 &&
            (0, v._)() &&
            (0, U.X)(P, K) &&
            !H &&
            "string" == typeof q &&
            q.length > 0 &&
            "string" == typeof R &&
            R.length > 0 &&
            null !== J &&
            ((e = "usdc" === J.kind ? J.amountIn : J.lamports),
            /^\d+$/.test(e) && !/^0+$/.test(e))
              ? {
                  solanaWallet: q,
                  evmWallet: R,
                  chainId: P,
                  mint: S,
                  slippageBps: C,
                  funding: J,
                  ...(Q ? { calloutUser: Q } : {}),
                }
              : null)
            ? null
            : (0, A.n)(r)),
          (x[8] = H),
          (x[9] = Q),
          (x[10] = K),
          (x[11] = P),
          (x[12] = k),
          (x[13] = R),
          (x[14] = S),
          (x[15] = G),
          (x[16] = J),
          (x[17] = X),
          (x[18] = V),
          (x[19] = C),
          (x[20] = q),
          (x[21] = r),
          (x[22] = o));
      } else ((r = x[21]), (o = x[22]));
      let ee = o,
        et = "number" == typeof F && F > 0 ? F : null,
        en = "number" == typeof L && L > 0 ? L : null,
        ei = (0, s.useRef)(r),
        el = (0, s.useRef)(X),
        er = (0, s.useRef)(et),
        ea = (0, s.useRef)(en),
        es = (0, s.useRef)($),
        eo = (0, s.useRef)(0);
      (x[23] !== r || x[24] !== X || x[25] !== et || x[26] !== en || x[27] !== $
        ? ((u = () => {
            ((ei.current = r),
              (el.current = X),
              (er.current = et),
              (ea.current = en),
              (es.current = $));
          }),
          (x[23] = r),
          (x[24] = X),
          (x[25] = et),
          (x[26] = en),
          (x[27] = $),
          (x[28] = u))
        : (u = x[28]),
        (0, s.useEffect)(u),
        x[29] !== w
          ? ((d = (e) => {
              let t = ei.current,
                n = el.current;
              if (null === t || void 0 === n)
                return Promise.resolve(D("no_input"));
              let i = es.current;
              return N({
                identity: t,
                key: (0, A.n)(t),
                lane: w,
                signTransaction: n,
                solPriceUsd: er.current,
                spotUsdPrice: ea.current,
                wanted: e.wanted,
                tapWaiting: e.tapWaiting,
                signFloor:
                  void 0 === i
                    ? void 0
                    : {
                        nextAllowedAt: () => eo.current + i.signSpacingMs,
                        noteSigned: (e) => {
                          eo.current = e;
                        },
                      },
              });
            }),
            (x[29] = w),
            (x[30] = d))
          : (d = x[30]),
        x[31] !== ee
          ? ((c = () => (null === ee ? null : (0, A.m)(ee))),
            (x[31] = ee),
            (x[32] = c))
          : (c = x[32]),
        x[33] === Symbol.for("react.memo_cache_sentinel")
          ? ((m = (e) => (0, I.r)(e, ea.current) || (0, A.D)(e, er.current)),
            (x[33] = m))
          : (m = x[33]),
        x[34] !== P || x[35] !== S
          ? ((f = (e, t) => {
              b.y.info("[presignBuy] ready", {
                reason: t,
                lane: e.lane,
                mint: S,
                chain_id: P,
                intent_id: e.created.intent_id,
                funding: e.identity.funding.kind,
                amount_in: e.request.amount_in,
                create_ms: Math.round(e.createMs),
                sign_ms: Math.round(e.signMs),
                quote_status: e.quoteStatus,
              });
            }),
            (x[34] = P),
            (x[35] = S),
            (x[36] = f))
          : (f = x[36]),
        x[37] !== P || x[38] !== w || x[39] !== S
          ? ((p = (e, t, n) => {
              b.y.warn("[presignBuy] failed; the tap keeps its own path", {
                reason: e,
                lane: w,
                why: t,
                mint: S,
                chain_id: P,
                funding: ei.current?.funding.kind,
                elapsed_ms: n,
              });
            }),
            (x[37] = P),
            (x[38] = w),
            (x[39] = S),
            (x[40] = p))
          : (p = x[40]));
      let eu = void 0 === $ ? void 0 : 0;
      (x[41] !== ee ||
      x[42] !== w ||
      x[43] !== S ||
      x[44] !== en ||
      x[45] !== p ||
      x[46] !== eu ||
      x[47] !== d ||
      x[48] !== c ||
      x[49] !== f
        ? ((_ = {
            namespace: "buy",
            lane: w,
            key: ee,
            mint: S,
            make: d,
            peek: c,
            store: A.p,
            expiring: E,
            priceMoved: m,
            priceSignal: en,
            onReady: f,
            onFailed: p,
            keyChangeSpacingMs: eu,
          }),
          (x[41] = ee),
          (x[42] = w),
          (x[43] = S),
          (x[44] = en),
          (x[45] = p),
          (x[46] = eu),
          (x[47] = d),
          (x[48] = c),
          (x[49] = f),
          (x[50] = _))
        : (_ = x[50]),
        (0, B.G)(_));
    };
  function E(e, t) {
    return (0, A.b)(e, t);
  }
  var Q = e.i(198285),
    z = e.i(130379),
    O = e.i(51121);
  let G = (e) => "string" == typeof e && /^\d+$/.test(e) && !/^0+$/.test(e),
    K = (e, t = !1, n) => ({ ok: !1, reason: e, retryable: t, code: n }),
    H = { ok: !1, reason: "superseded", retryable: !1, quiet: !0 },
    X = async ({
      input: e,
      key: t,
      lane: n,
      mint: i,
      spotUsdPrice: l,
      signers: r,
      context: a,
      signFloor: s,
    }) => {
      let { request: o, evmWalletAddress: u, payoutDenomination: d } = e,
        { wanted: c, tapWaiting: m } = a,
        f = performance.now();
      try {
        let e,
          a,
          p = await (0, B.x)(
            "create",
            (0, v.f)(o, {
              idempotencyKey: `presign-${((e) => {
                let t = 0x811c9dc5;
                for (let n = 0; n < e.length; n += 1)
                  ((t ^= e.charCodeAt(n)), (t = Math.imul(t, 0x1000193) >>> 0));
                return t.toString(16).padStart(8, "0");
              })(t)}-${Date.now()}`,
            }),
          ),
          g = performance.now() - f;
        if ((0, R.W)(p)) return K("held_for_review");
        let b = p.unsigned_tx;
        if ("evm_calibur" !== b.chain) return K("unexpected_tx");
        if (null == p.quote.expected_out) return K("no_expected_out");
        if ("sol" === d && !(Number(p.quote.sol_min_out) > 0))
          return K("no_sol_min_out");
        try {
          e = (0, O.q)({ unsigned: b, expectedWallet: u });
        } catch (e) {
          return (
            (0, q.f)({
              error: e,
              operation: "sell_presign",
              context: {
                mint: i,
                chainId: o.evm_chain_id,
                evmWalletAddress: u,
                intentId: p.intent_id,
                reason: "malformed_typed_data",
              },
            }),
            K("malformed_typed_data")
          );
        }
        if (
          !c() ||
          (void 0 !== s &&
            (await (0, B.R)(s.nextAllowedAt(), () => m() || !c()), !c()))
        )
          return H;
        if ((0, y.F)()) return K("would_prompt");
        let _ = performance.now();
        if (!b.delegated) {
          let e = b.authorization;
          if (!e) return K("no_authorization");
          let t = await (0, B.x)(
            "sign_authorization",
            r.signAuthorization(
              {
                contractAddress: e.address,
                chainId: e.chain_id,
                nonce: e.nonce,
              },
              { address: u },
            ),
          );
          try {
            a = (0, O.L)(t);
          } catch {
            return K("no_y_parity");
          }
          if (!c()) return H;
        }
        let h = await (0, B.x)(
            "sign",
            r.signTypedData(e, {
              address: u,
              uiOptions: { showWalletUIs: !1 },
            }),
          ),
          x = Date.now();
        return (
          s?.noteSigned(x),
          {
            ok: !0,
            entry: {
              key: t,
              lane: n,
              request: o,
              created: p,
              signature: h.signature,
              authorization: a,
              delegated: b.delegated,
              signedAt: x,
              createMs: g,
              signMs: performance.now() - _,
              spotUsdPrice: l,
              consumed: !1,
            },
          }
        );
      } catch (t) {
        let e = !((0, R.v)(t) && !t.retryable);
        return K(
          t instanceof Error ? t.message : String(t),
          e,
          (0, R.v)(t) ? t.code : void 0,
        );
      }
    },
    V = () => !(0, y.F)(),
    Y = () => !1,
    Z = (e) => {
      let t,
        i,
        l,
        r,
        o,
        u,
        d,
        c,
        m,
        f,
        p,
        _,
        x,
        k = (0, n.c)(54),
        {
          enabled: w,
          mint: S,
          chainId: A,
          tokenBalanceRaw: P,
          tokenAmountRaw: q,
          settlementAsset: R,
          slippageBps: j,
          solanaWallet: C,
          evmWalletAddress: F,
          spotUsdPrice: D,
          lane: L,
          typedPolicy: N,
        } = e,
        T = void 0 === L ? "max" : L,
        { signTypedData: W } = (0, Q.f)(),
        $ = (0, z.f)(),
        { signAuthorization: E } = $,
        { privyMfaEnrolled: H } = (0, a.F)(),
        Z = (0, M.l)();
      k[0] !== A || k[1] !== S
        ? ((t = { chainId: A, mint: S }), (k[0] = A), (k[1] = S), (k[2] = t))
        : (t = k[2]);
      let ee = (0, g.G)(t),
        et = (0, s.useSyncExternalStore)(y.R, V, Y),
        en = "typed" === T ? (q ?? null) : null,
        [ei] = (0, h.r)(en, N?.debounceMs ?? 0);
      e: {
        if ("max" === T) {
          i = G(P) ? P : null;
          break e;
        }
        let e = G(ei) && G(P) && BigInt(ei) < BigInt(P);
        i = ei === en && e ? ei : null;
      }
      let el = i;
      k[3] !== $ || k[4] !== F
        ? ((l = $.isReadyFor(F)), (k[3] = $), (k[4] = F), (k[5] = l))
        : (l = k[5]);
      let er = l;
      if (
        k[6] !== el ||
        k[7] !== ee ||
        k[8] !== Z ||
        k[9] !== A ||
        k[10] !== w ||
        k[11] !== F ||
        k[12] !== S ||
        k[13] !== H ||
        k[14] !== R ||
        k[15] !== er ||
        k[16] !== et ||
        k[17] !== j ||
        k[18] !== C
      ) {
        let e = (0, O._)(R);
        ((o =
          null ===
          (r =
            w &&
            et &&
            !H &&
            er &&
            "number" == typeof A &&
            A > 0 &&
            (0, v._)() &&
            (0, U.X)(A, Z) &&
            !ee &&
            "string" == typeof C &&
            C.length > 0 &&
            "string" == typeof F &&
            null !== el
              ? {
                  request: (0, O.C)({
                    solanaWallet: C,
                    evmWallet: F,
                    chainId: A,
                    mint: S,
                    amountAtomic: BigInt(el),
                    slippageBps: j,
                    payoutDenomination: e,
                  }),
                  evmWalletAddress: F,
                  payoutDenomination: e,
                }
              : null)
            ? null
            : (0, I.n)(r.request)),
          (k[6] = el),
          (k[7] = ee),
          (k[8] = Z),
          (k[9] = A),
          (k[10] = w),
          (k[11] = F),
          (k[12] = S),
          (k[13] = H),
          (k[14] = R),
          (k[15] = er),
          (k[16] = et),
          (k[17] = j),
          (k[18] = C),
          (k[19] = r),
          (k[20] = o));
      } else ((r = k[19]), (o = k[20]));
      let ea = o,
        es = "number" == typeof D && D > 0 ? D : null,
        eo = (0, s.useRef)(r);
      k[21] !== E || k[22] !== W
        ? ((u = { signAuthorization: E, signTypedData: W }),
          (k[21] = E),
          (k[22] = W),
          (k[23] = u))
        : (u = k[23]);
      let eu = (0, s.useRef)(u),
        ed = (0, s.useRef)(es),
        ec = (0, s.useRef)(N);
      (k[24] !== r || k[25] !== E || k[26] !== W || k[27] !== es || k[28] !== N
        ? ((d = () => {
            ((eo.current = r),
              (eu.current = { signAuthorization: E, signTypedData: W }),
              (ed.current = es),
              (ec.current = N));
          }),
          (k[24] = r),
          (k[25] = E),
          (k[26] = W),
          (k[27] = es),
          (k[28] = N),
          (k[29] = d))
        : (d = k[29]),
        (0, s.useEffect)(d));
      let em = (0, s.useRef)(0),
        ef = (0, s.useRef)(null);
      (k[30] !== ea || k[31] !== T || k[32] !== S
        ? ((c = (e) => {
            let t = eo.current;
            if (null === t || (0, I.n)(t.request) !== ea)
              return Promise.resolve(K("no_input"));
            let n = ec.current;
            return X({
              input: t,
              key: (0, I.n)(t.request),
              lane: T,
              mint: S,
              spotUsdPrice: ed.current,
              signers: eu.current,
              context: e,
              signFloor:
                "typed" === T && void 0 !== n
                  ? {
                      nextAllowedAt: () => em.current + n.signSpacingMs,
                      noteSigned: (e) => {
                        em.current = e;
                      },
                    }
                  : void 0,
            }).then((e) => ((ef.current = e), e));
          }),
          (k[30] = ea),
          (k[31] = T),
          (k[32] = S),
          (k[33] = c))
        : (c = k[33]),
        k[34] !== ea
          ? ((m = () => (null === ea ? null : (0, I.Q)(ea))),
            (k[34] = ea),
            (k[35] = m))
          : (m = k[35]),
        k[36] === Symbol.for("react.memo_cache_sentinel")
          ? ((f = (e) => (0, I.r)(e, ed.current)), (k[36] = f))
          : (f = k[36]),
        k[37] !== A || k[38] !== S
          ? ((p = (e, t) => {
              b.y.info("[presignFullSell] ready", {
                reason: t,
                lane: e.lane,
                mint: S,
                chain_id: A,
                intent_id: e.created.intent_id,
                create_ms: Math.round(e.createMs),
                sign_ms: Math.round(e.signMs),
                delegated: e.delegated,
              });
            }),
            (k[37] = A),
            (k[38] = S),
            (k[39] = p))
          : (p = k[39]),
        k[40] !== A || k[41] !== T || k[42] !== S
          ? ((_ = (e, t, n) => {
              b.y.warn("[presignFullSell] failed; the tap keeps its own path", {
                reason: e,
                lane: T,
                why: t,
                retryable:
                  ef.current?.ok === !1 ? ef.current.retryable : void 0,
                mint: S,
                chain_id: A,
                elapsed_ms: n,
              });
            }),
            (k[40] = A),
            (k[41] = T),
            (k[42] = S),
            (k[43] = _))
          : (_ = k[43]));
      let ep = "typed" === T ? 0 : void 0;
      (k[44] !== ea ||
      k[45] !== T ||
      k[46] !== S ||
      k[47] !== es ||
      k[48] !== p ||
      k[49] !== _ ||
      k[50] !== ep ||
      k[51] !== c ||
      k[52] !== m
        ? ((x = {
            namespace: "sell",
            lane: T,
            key: ea,
            mint: S,
            make: c,
            peek: m,
            store: I.o,
            expiring: J,
            priceMoved: f,
            priceSignal: es,
            onReady: p,
            onFailed: _,
            keyChangeSpacingMs: ep,
          }),
          (k[44] = ea),
          (k[45] = T),
          (k[46] = S),
          (k[47] = es),
          (k[48] = p),
          (k[49] = _),
          (k[50] = ep),
          (k[51] = c),
          (k[52] = m),
          (k[53] = x))
        : (x = k[53]),
        (0, B.G)(x));
    };
  function J(e, t) {
    return (0, I.q)(e, t) || (0, I.s)(e, t);
  }
  var ee = e.i(86913),
    et = e.i(363250),
    en = e.i(707138),
    ei = e.i(107956),
    el = e.i(690877),
    er = e.i(4911),
    ea = e.i(729569),
    es = e.i(460261),
    eo = e.i(331043),
    eu = e.i(605085),
    ed = e.i(515529),
    ec = e.i(892994),
    em = e.i(159071),
    ef = e.i(632817),
    ep = e.i(101181),
    eg = e.i(97326),
    eb = e.i(152584),
    e_ = e.i(778593),
    ey = e.i(257004),
    eh = e.i(913719),
    ex = e.i(751651),
    ev = e.i(690230),
    ek = e.i(299092),
    ew = e.i(544380),
    eS = e.i(84976),
    eA = e.i(969673),
    eI = e.i(337749),
    eP = e.i(396364);
  let eU = new Map(),
    eq = new Map(),
    eR = (e, t, n) => {
      let i = e.get(t);
      if (void 0 !== i && n - i < 1e4) return !1;
      if (e.size >= 64) {
        for (let [t, i] of e) n - i >= 1e4 && e.delete(t);
        e.size >= 64 && e.clear();
      }
      return (e.set(t, n), !0);
    };
  var eM = e.i(844469),
    ej = e.i(214957),
    eC = e.i(427140),
    eB = e.i(63225),
    eF = e.i(595673),
    eD = e.i(569526),
    eL = e.i(367310),
    eN = e.i(605587),
    eT = e.i(955332),
    eW = e.i(280838),
    e$ = e.i(505563),
    eE = e.i(811433),
    eQ = e.i(182040),
    ez = e.i(514029),
    eO = e.i(427081),
    eG = e.i(793987),
    eK = e.i(693885),
    eH = e.i(858133),
    eX = e.i(158928),
    eV = e.i(165816),
    eY = e.i(743211),
    eZ = e.i(541917),
    eJ = e.i(72768),
    e0 = e.i(862507),
    e1 = e.i(304234),
    e3 = e.i(743141),
    e2 = e.i(429675),
    e4 = e.i(782421),
    e5 = e.i(18075),
    e6 = e.i(592054),
    e9 = e.i(431340);
  let e8 = { debounceMs: 500, signSpacingMs: 3e3 },
    e7 = (e) => e - (e % 1e4);
  function te(e) {
    let l,
      r,
      a,
      s,
      u = (0, n.c)(10),
      { onClose: d } = e,
      { t: f } = (0, o.f)();
    return (
      u[0] !== d || u[1] !== f
        ? ((l =
            d &&
            (0, t.jsx)("div", {
              className: "flex justify-end",
              children: (0, t.jsx)(m._, {
                density: "terminal",
                onClick: d,
                "aria-label": f("web.trade.close_trade_box"),
                children: (0, t.jsx)(i.x6, {}),
              }),
            })),
          (u[0] = d),
          (u[1] = f),
          (u[2] = l))
        : (l = u[2]),
      u[3] !== f
        ? ((r = f("web.trade.ignix_curve_pending")), (u[3] = f), (u[4] = r))
        : (r = u[4]),
      u[5] !== r
        ? ((a = (0, t.jsx)("p", {
            className: "px-1 text-center text-sm leading-5 text-text-secondary",
            children: r,
          })),
          (u[5] = r),
          (u[6] = a))
        : (a = u[6]),
      u[7] !== l || u[8] !== a
        ? ((s = (0, t.jsxs)(c.g, {
            className: "relative min-w-0 gap-3 overflow-hidden p-3",
            "data-testid": "launchpad-curve-pending",
            children: [l, a],
          })),
          (u[7] = l),
          (u[8] = a),
          (u[9] = s))
        : (s = u[9]),
      s
    );
  }
  function tt(e) {
    let b,
      _,
      y,
      h,
      x,
      k,
      w,
      A,
      I,
      P,
      q,
      j,
      C,
      B,
      F,
      D,
      L,
      N,
      T,
      W,
      E,
      Q,
      z,
      O,
      G,
      K,
      H,
      X,
      V,
      Y,
      J,
      te,
      tt,
      ti,
      tl,
      tr,
      ta,
      ts,
      to,
      tu,
      td,
      tc,
      tm,
      tf,
      tp = (0, n.c)(145),
      { coin: tg, onClose: tb } = e,
      { t: t_ } = (0, o.f)(),
      [ty, th] = (0, s.useState)("buy"),
      [tx, tv] = (0, s.useState)(""),
      [tk, tw] = (0, s.useState)(null),
      [tS, tA] = (0, s.useState)(null),
      { address: tI, userId: tP, isPrivyEmbeddedSigner: tU } = (0, a.F)(),
      { lastClickImpression: tq } = (0, eD.y)(),
      tR = (0, M.l)(),
      { evmWalletAddress: tM, isReady: tj, mappedEvmAddress: tC } = (0, ei.f)(),
      { solBalance: tB, solBalanceLoaded: tF, usdcBalance: tD } = (0, p.f)(),
      { slippage: tL } = (0, eg.f)(),
      { presets: tN, activeIndex: tT, setActiveIndex: tW } = (0, e_.f)();
    tp[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((b = {}), (tp[0] = b))
      : (b = tp[0]);
    let { data: t$ } = (0, et.f)(b),
      tE = void 0 === t$ ? 0 : t$,
      tQ = (0, eL.k)() ? "usdc" : "sol",
      tz = "usdc" === tQ,
      tO = (0, ey.$)({
        lastClickImpression: tq,
        mint: tg.mint,
        sponsored: tz,
        isPrivyEmbeddedSigner: tU,
      }),
      tG = (0, eb.f)(tg.mint),
      tK = (0, eC.f)(tg, tG),
      tH = tK.tokenUsdPrice,
      tX = !tz && tE <= 0,
      { mode: tV, cycle: tY } = (0, eV.f)("buy", tz, tX, !1, !1),
      { mode: tZ, cycle: tJ } = (0, eV.f)("sell", tz, !1, !1, !1),
      t0 = "token" === tV && tH <= 0 ? (tX ? "sol" : "usd") : tV,
      t1 = tH > 0,
      t3 = t1 ? ("sol" === tZ && tE <= 0 ? "token" : tZ) : "token",
      t2 = "buy" === ty ? t0 : t3,
      t4 = (0, eG.G)(t2),
      t5 = "sol" === t0 ? "sol" : "usd",
      t6 = (0, eN.n)(tg.chain_id) ?? "EVM",
      t9 = (0, e6.I)(tg.symbol),
      [t8, t7] = (0, s.useState)(null),
      [ne, nt] = (0, s.useState)(null),
      [nn, ni] = (0, s.useState)(null),
      nl = t8 === tg.mint,
      nr = nn === tg.mint;
    tp[1] !== tg.chain_id || tp[2] !== tg.mint
      ? ((_ = { mint: tg.mint, chainId: tg.chain_id }),
        (tp[1] = tg.chain_id),
        (tp[2] = tg.mint),
        (tp[3] = _))
      : (_ = tp[3]);
    let na = (0, ee.Q)(_);
    tp[4] !== tg.chain_id || tp[5] !== tg.mint || tp[6] !== tM
      ? ((y = { mint: tg.mint, chainId: tg.chain_id, walletAddress: tM }),
        (tp[4] = tg.chain_id),
        (tp[5] = tg.mint),
        (tp[6] = tM),
        (tp[7] = y))
      : (y = tp[7]);
    let ns = (0, en.R)(y),
      no = ns.data?.balanceRaw ?? null,
      nu = null !== no && no > BigInt(0),
      nd = "sell" === ty && nu;
    tp[8] !== tg.chain_id || tp[9] !== tM || tp[10] !== nd
      ? ((h = { chainId: tg.chain_id, walletAddress: tM, enabled: nd }),
        (tp[8] = tg.chain_id),
        (tp[9] = tM),
        (tp[10] = nd),
        (tp[11] = h))
      : (h = tp[11]);
    let nc = (function (e) {
        let t,
          i,
          l,
          r,
          a = (0, n.c)(12),
          { chainId: s, walletAddress: o, enabled: u } = e,
          d = void 0 === u || u;
        a[0] !== s || a[1] !== d || a[2] !== o
          ? ((t = d && (0, es.J)(s) && o && (0, er.f)(o ?? "")),
            (a[0] = s),
            (a[1] = d),
            (a[2] = o),
            (a[3] = t))
          : (t = a[3]);
        let c = !!t;
        return (
          a[4] !== o
            ? ((i = ["hypeGasRequirement", o]), (a[4] = o), (a[5] = i))
            : (i = a[5]),
          a[6] !== o
            ? ((l = () => (0, ea.J)(o)), (a[6] = o), (a[7] = l))
            : (l = a[7]),
          a[8] !== c || a[9] !== i || a[10] !== l
            ? ((r = {
                queryKey: i,
                queryFn: l,
                enabled: c,
                refetchInterval: 15e3,
                staleTime: 5e3,
                retry: 1,
              }),
              (a[8] = c),
              (a[9] = i),
              (a[10] = l),
              (a[11] = r))
            : (r = a[11]),
          (0, el.useQuery)(r)
        );
      })(h),
      nm =
        "sell" === ty && nc.data && nc.data.shortfallWei > BigInt(0)
          ? nc.data
          : null,
      nf = ns.data?.decimals ?? tg.base_decimals ?? es._,
      np = tz ? "USDC" : "SOL",
      ng = (0, eS.q)(tQ),
      nb = (0, eS.n)(tQ, tE);
    tp[12] !== nb
      ? ((x = (e) => Math.round(e * nb * 1e6) / 1e6),
        (tp[12] = nb),
        (tp[13] = x))
      : (x = tp[13]);
    let n_ = x,
      ny = "buy" === ty ? (tg.symbol ?? "token") : np,
      nh = "buy" === ty ? nf : ng;
    tp[14] !== tE || tp[15] !== nf || tp[16] !== tH
      ? ((k = (e, t) => {
          if ("token" === t) return (0, eh.x)(e, nf, 6);
          let n = (0, ej.o)({
            atomicAmount: e,
            tokenUsdPrice: tH,
            tokenDecimals: nf,
          });
          return "usd" === t
            ? (0, ej.L)(n)
            : tE > 0
              ? (0, eh.f)((n / tE).toFixed(4))
              : "";
        }),
        (tp[14] = tE),
        (tp[15] = nf),
        (tp[16] = tH),
        (tp[17] = k))
      : (k = tp[17]);
    let nx = k;
    tp[18] !== t2 || tp[19] !== ty
      ? ((w = { side: ty, mode: t2 }),
        (tp[18] = t2),
        (tp[19] = ty),
        (tp[20] = w))
      : (w = tp[20]);
    let [nv, nk] = (0, s.useState)(w);
    if (
      (nv.side !== ty || nv.mode !== t2) &&
      (nk({ side: ty, mode: t2 }), nv.side === ty)
    ) {
      let e = (0, eW.p)(tx) ?? 0;
      if ("sell" === ty) {
        if (tk) tv(nx(tk.rawAmount, t2));
        else if (e > 0 && tH > 0) {
          let t = "usd" === nv.mode ? e : "sol" === nv.mode ? e * tE : e * tH;
          "usd" === t2
            ? tv((0, ej.L)(t))
            : "sol" === t2
              ? tv(tE > 0 ? (0, eh.f)((t / tE).toFixed(4)) : "")
              : tv((0, eh.f)((t / tH).toFixed(Math.min(nf, 6))));
        }
      } else {
        var nw, nS;
        e > 0 &&
          tv(
            ((nS =
              "usd" === (nw = nv.mode) ? e : "sol" === nw ? e * tE : e * tH),
            "usd" === t2
              ? (0, ej.L)(nS)
              : "sol" === t2
                ? tE > 0
                  ? (0, eh.f)((nS / tE).toFixed(4))
                  : ""
                : tH > 0
                  ? (0, eh.f)((nS / tH).toFixed(Math.min(nf, 6)))
                  : ""),
          );
      }
    }
    e: {
      if ("sell" !== ty) {
        A = null;
        break e;
      }
      if (tk) {
        A = { atomicAmount: tk.rawAmount, isSellAll: tk.isSellAll };
        break e;
      }
      if ("token" !== t3) {
        let e = Number(tx);
        A = (0, ej.R)({
          usd: "usd" === t3 ? e : n_(e),
          tokenUsdPrice: tH,
          tokenDecimals: nf,
          balanceRaw: no,
        });
        break e;
      }
      let e = (0, eh.v)(tx, nf);
      A = null === e ? null : { atomicAmount: e, isSellAll: !1 };
    }
    let nA = A;
    tp[21] !== t5 ||
    tp[22] !== t0 ||
    tp[23] !== tQ ||
    tp[24] !== tE ||
    tp[25] !== tH ||
    tp[26] !== tx
      ? ((I = () => {
          if ("token" !== t0)
            return (0, ek.W)({
              value: tx,
              paymentAsset: tQ,
              buyInputUnit: t5,
              solUsdPrice: tE,
            });
          let e = (0, eW.p)(tx);
          return null === e || e <= 0 || tH <= 0
            ? null
            : (0, ek.W)({
                value: (e * tH).toFixed(6),
                paymentAsset: tQ,
                buyInputUnit: "usd",
                solUsdPrice: tE,
              });
        }),
        (tp[21] = t5),
        (tp[22] = t0),
        (tp[23] = tQ),
        (tp[24] = tE),
        (tp[25] = tH),
        (tp[26] = tx),
        (tp[27] = I))
      : (I = tp[27]);
    let nI = I,
      nP = "sell" === ty ? (nA?.atomicAmount ?? null) : nI(),
      nU = (0, eM.f)(tL),
      nq = (0, es.b)(tg.chain_id),
      nR = (0, g.G)({ chainId: nq, mint: tg.mint }),
      nM = (0, v._)() && (0, U.X)(nq, tR) && !nR && !!tP && !!tM,
      nj = (0, v._)() && (0, U.X)(nq, tR) && !nR && !!tP;
    (0, s.useEffect)(() => {
      if (((0, S.k)(tP), !nj)) return;
      let e = (0, S.o)();
      return () => e?.close();
    }, [nj, tP]);
    let nC = {
      mint: tg.mint,
      chainId: nq,
      tokenBalanceRaw: null === no ? null : no.toString(),
      settlementAsset: tQ,
      slippageBps: nU,
      solanaWallet: tI,
      evmWalletAddress: tM,
      spotUsdPrice: tK.tokenUsdPrice,
    };
    Z({ enabled: nM && nu, ...nC });
    let nB = "sell" === ty ? (nA?.atomicAmount ?? null) : null,
      nF = "sell" === ty && !tk && "token" !== t3;
    Z({
      enabled:
        "sell" === ty &&
        nM &&
        !nF &&
        null !== no &&
        null !== nB &&
        nB > BigInt(0) &&
        nB < no,
      ...nC,
      lane: "typed",
      tokenAmountRaw: null === nB ? void 0 : nB.toString(),
      typedPolicy: e8,
    });
    let nD = (0, ed.f)(),
      nL = (0, ec._)(),
      nN = nD.isPending || nL.isPending,
      nT = nN && ne?.kind === "form",
      nW =
        nN && ne?.kind === "quick"
          ? { tone: ne.tone, value: ne.value, sourceElement: ne.sourceElement }
          : null,
      { isBlocked: n$, tier: nE } = (0, em.M)(tg.mint, tg.chain_id),
      nQ = "safe_mode" === nE,
      nz = (0, eK.f)();
    tp[28] !== nz
      ? ((P = () => nz.openSetting("trading.safeModeDisabled")),
        (tp[28] = nz),
        (tp[29] = P))
      : (P = tp[29]);
    let nO = P,
      { paused: nG, targetProps: nK } = (0, ep.f)(),
      nH = (0, eo.f)({
        mint: tg.mint,
        chainId: tg.chain_id,
        direction: ty,
        atomicAmount: nP,
        calloutUser: tO,
        solanaAsset: tQ,
        solanaWalletAddress: tI,
        evmWalletAddress: tM,
        slippageBps: nU,
        solUsdPrice: tE,
        spotUsdPrice: tK.tokenUsdPrice,
        enabled: !nl && !nr && !na.isLoading,
        pausePreview: nG,
      }),
      { quote: nX, errorReason: nV } = nH,
      nY = (0, es.P)(nD.error)
        ? nD.variables?.quoteRequest.mint
        : (0, es.P)(nL.error)
          ? nL.variables?.quoteRequest.mint
          : null;
    nl || (nV !== es.q && nY !== tg.mint) || t7(tg.mint);
    let nZ = (0, es.$)(nD.error)
      ? nD.variables?.quoteRequest.mint
      : (0, es.$)(nL.error)
        ? nL.variables?.quoteRequest.mint
        : null;
    nr || (nV !== es.f && nZ !== tg.mint && !1 !== na.tradable) || ni(tg.mint);
    let nJ = nl || nr,
      n0 = tB / ek.Z,
      n1 = tD?.balance ?? null;
    tp[30] !== tQ || tp[31] !== tB || tp[32] !== tF || tp[33] !== tD?.balanceRaw
      ? ((q = (e) =>
          (0, ex.f)({
            atomicAmount: e,
            paymentAsset: tQ,
            solBalanceLamports: tB,
            solBalanceLoaded: tF,
            usdcBalanceRaw: tD?.balanceRaw ?? null,
          })),
        (tp[30] = tQ),
        (tp[31] = tB),
        (tp[32] = tF),
        (tp[33] = tD?.balanceRaw),
        (tp[34] = q))
      : (q = tp[34]);
    let n3 = q,
      n2 = "buy" === ty && n3(nP),
      n4 = "sell" === ty && null !== no && null !== nP && nP > no,
      n5 = (0, ev.f)(tg.chain_id, tQ),
      n6 = {
        paymentAsset: tQ,
        usdcBalanceUi: n1,
        solBalanceLamports: tB,
        buyInputUnit: t5,
        solUsdPrice: tE,
        skimReserveUi: n5,
      },
      n9 = (e) => {
        if ("buy" !== ty || "token" === t0) return;
        let t = (0, ek.m)({ ...n6, sharePercent: e });
        null !== t && tv(t);
      };
    tp[35] !== nu ||
    tp[36] !== no ||
    tp[37] !== nx ||
    tp[38] !== t3 ||
    tp[39] !== ty
      ? ((j = (e) => {
          if ("sell" !== ty || null === no || !nu) return;
          let t = e >= 100,
            n = t ? no : (no * BigInt(e)) / BigInt(100);
          (tw({ rawAmount: n, isSellAll: t }), tv(nx(n, t3)));
        }),
        (tp[35] = nu),
        (tp[36] = no),
        (tp[37] = nx),
        (tp[38] = t3),
        (tp[39] = ty),
        (tp[40] = j))
      : (j = tp[40]);
    let n8 = j;
    tp[41] !== n8
      ? ((C = () => n8(100)), (tp[41] = n8), (tp[42] = C))
      : (C = tp[42]);
    let n7 = C,
      ie = "buy" === ty && "token" !== t0 ? (0, ek.q)(n6) : null,
      it = "buy" === ty ? null === ie || 0 >= Number(ie) : !nu,
      ii = "token" === t0,
      il = (0, ek.j)(n6),
      ir = (0, ek.I)({ paymentAsset: tQ, atomicAmount: il }),
      ia = {
        mint: tg.mint,
        chainId: nq,
        solanaWallet: tI,
        evmWalletAddress: tM,
        slippageBps: nU,
        solPriceUsd: tE,
        spotUsdPrice: tK.tokenUsdPrice,
        calloutUser: tO,
      };
    $({
      enabled: "buy" === ty && !ii && nM && null !== ir,
      lane: "max",
      ...ia,
      funding: ir,
    });
    let is = "buy" === ty ? nP : null,
      io = null !== is && is > BigInt(0) && (null === il || is < il);
    ($({
      enabled: "buy" === ty && !ii && nM && io,
      lane: "typed",
      ...ia,
      funding: (0, ek.I)({ paymentAsset: tQ, atomicAmount: is }),
      typedPolicy: e8,
    }),
      tp[43] !== ty
        ? ((B = (e) => {
            e !== ty &&
              ((0, eF._i)({ fromValue: ty, toValue: e }),
              th(e),
              tv(""),
              tw(null));
          }),
          (tp[43] = ty),
          (tp[44] = B))
        : (B = tp[44]));
    let iu = B,
      id = !!(!nJ && !nN && tg.chain_id && tI && tM),
      ic = (0, ef.H)(e7, tK.tokenUsdPrice > 0),
      im =
        tK.tokenUsdPrice > 0
          ? {
              tokenUsdPrice: tK.tokenUsdPrice,
              tokenDecimals: nf,
              settlementUsdPrice: nb,
              settlementDecimals: ng,
              observedAtMs: tK.observedAtMs,
            }
          : null,
      ip = {
        poolAddress: tg.pool_address ?? null,
        settlementUsdPrice: nb,
        settlementDecimals: ng,
      },
      ig = nX
        ? (0, ew.f)({ quote: nX, direction: ty, spotReference: im, nowMs: ic })
        : null,
      ib = (0, eu.n)({
        preview: nH,
        direction: ty,
        chainId: tg.chain_id,
        outputSymbol: ny,
        outputDecimals: nh,
        tokenDecimals: nf,
        coin: tg,
        slippageBps: nU,
        spotReference: im,
        nowMs: ic,
        regionRestricted: nr,
        assetRefused: nl,
      }),
      i_ = tn,
      iy = null !== nP && nP > BigInt(0);
    t: {
      if (!iy) {
        F = { usd: 0, funding: 0, token: 0 };
        break t;
      }
      if ("buy" === ty) {
        let e = Number(nP) / 10 ** ng,
          t = tz ? e : tE > 0 ? e * tE : 0,
          n = nX ? Number(nX.toAmount) / 10 ** nf : 0;
        F = { usd: i_(t), funding: i_(e), token: i_(n) };
        break t;
      }
      let e = Number(nP) / 10 ** nf,
        t = tH > 0 ? e * tH : (ig?.fromAmountUsd ?? 0),
        n = tz ? t : tE > 0 ? t / tE : 0;
      F = { usd: i_(t), funding: i_(n), token: i_(e) };
    }
    let ih = F,
      ix = ib.quote,
      iv = ix
        ? (0, eB.f)(
            null === ix.impactPercent ? null : -ix.impactPercent,
            (0, eB.H)({ paidUsd: ix.inputUsd, receivedUsd: ix.outputUsd }),
          )
        : null,
      ik = (0, eY.Z)({
        hasAmount: iy,
        tradeSizeUsd: ih.usd > 0 ? ih.usd : void 0,
        marketCapUsd: (0, eY.y)(tG, tg),
        valueLostPercent: iv,
      });
    tp[45] !== no || tp[46] !== tE || tp[47] !== nf || tp[48] !== tH
      ? ((D = (e, t, n) => {
          if ("sell" === e) {
            if (null === no || tH <= 0) return;
            return (t / 100) * (Number(no) / 10 ** nf) * tH;
          }
          return "usd" === n ? t : tE > 0 ? t * tE : void 0;
        }),
        (tp[45] = no),
        (tp[46] = tE),
        (tp[47] = nf),
        (tp[48] = tH),
        (tp[49] = D))
      : (D = tp[49]);
    let iw = D,
      iS = (e, t, n, i, l, r, a) => {
        let s = void 0 === r ? null : r,
          o = void 0 === a ? null : a;
        if (!id || t === BigInt(0)) return;
        if ("buy" === e && n$)
          return nQ
            ? void (0, u.c)(t_("coin_details.safe_mode_buy_blocked"), {
                action: { label: t_("web.trade.trade_settings"), onClick: nO },
              })
            : void u.c.error(t_("coin_details.scam_buy_blocked"));
        nt(
          void 0 === i || null === s
            ? { kind: "form" }
            : { kind: "quick", tone: e, value: s, sourceElement: i },
        );
        let d = {
            sourceElement: i,
            usdMarketCap: tg.usd_market_cap,
            isLivestreamActive: tg.is_currently_live,
            tokenDecimals: nf,
          },
          c = {
            direction: e,
            mint: tg.mint,
            chainId: tg.chain_id,
            atomicAmount: t,
            solanaAsset: tQ,
            solanaWalletAddress: tI,
            evmWalletAddress: tM,
            slippageBps: nU,
          },
          m = () => {
            (tv(""), tw(null), tA({ side: e, key: Date.now() }));
          };
        "sell" === e
          ? nL.mutate(
              {
                quoteRequest: c,
                coinSymbol: tg.symbol ?? "token",
                coin: tg,
                isSellAll: n,
                spotReference: im,
                spotRefresh: ip,
                usdIntent: void 0 === l ? null : l,
                impactConsent: o,
                analytics: d,
              },
              { onSuccess: m },
            )
          : nD.mutate(
              {
                quoteRequest: c,
                coinSymbol: tg.symbol ?? "token",
                coin: tg,
                tokenDecimals: nf,
                spotReference: im,
                spotRefresh: ip,
                impactConsent: o,
                analytics: d,
              },
              { onSuccess: m },
            );
      },
      iA = (e, t) =>
        "usd" === t
          ? tz
            ? (0, eh.v)(e.toFixed(2), ng)
            : tE <= 0
              ? null
              : (0, eh.v)((e / tE).toFixed(9), eS.f)
          : (0, eh.v)(String(e), eS.f),
      iI = (e, t) => {
        let n = iA(e, t);
        return null === n || n3(n);
      },
      iP = (e, t, n) => {
        let i = iA(e, t);
        null !== i && iS("buy", i, !1, n, null, e);
      },
      iU = (e, t) => {
        null !== no &&
          nu &&
          iS("sell", (no * BigInt(e)) / BigInt(100), 100 === e, t, null, e);
      };
    tp[50] !== ik || tp[51] !== iw
      ? ((L = (e, t, n) => ik.requiresHoldForQuickSize(iw(e, t, n))),
        (tp[50] = ik),
        (tp[51] = iw),
        (tp[52] = L))
      : (L = tp[52]);
    let iq = (0, eX.f)({
        state: {
          isUsdcQuote: tz,
          isUsdDenomUnavailable: tX,
          isUsdcPayment: tz,
          isPaymentRouted: !1,
          healStoredDisplayMode: !1,
          hasTokenBalance: nu,
          isTradeLoading: nN,
          immediateTradeInFlight: !1,
          spamQuickTrade: !1,
          activeQuickTrade: nW,
          executeQuickBuyPreset: (e, t) => iP(e, t, l.k9.QUICK_TRADE),
          executeQuickSellPreset: (e) => iU(e, l.k9.QUICK_TRADE),
          isQuickBuyPresetInsufficient: iI,
          previewQuickBuyPreset: (e, t) => {
            if (!tI || !tM || !tg.chain_id || !id || n$ || iI(e, t)) return;
            let n = iA(e, t);
            if (null === n) return;
            let i = {
              direction: "buy",
              mint: tg.mint,
              solanaAsset: tQ,
              chainId: tg.chain_id,
              atomicAmount: n,
              solanaWalletAddress: tI,
              evmWalletAddress: tM,
              slippageBps: nU,
              calloutUser: tO,
            };
            ((0, U.x)(nq) ||
              (function (e, t = Date.now()) {
                eR(
                  eU,
                  [
                    e.mint,
                    e.chainId,
                    e.atomicAmount.toString(),
                    e.solanaAsset ?? "sol",
                    e.solanaWalletAddress,
                    e.evmWalletAddress,
                    e.slippageBps,
                    e.calloutUser ?? "",
                  ].join("\x1f"),
                  t,
                ) && (0, eP.f)(e);
              })(i),
              tP &&
                (function ({
                  request: e,
                  solUsdPrice: t,
                  exposure: n,
                  regionBlocked: i,
                  now: l = Date.now(),
                }) {
                  let r = (0, es.b)(e.chainId);
                  if (null === r || !(0, v._)() || i || !(0, U.X)(r, n)) return;
                  let a =
                    "usdc" === e.solanaAsset
                      ? e.atomicAmount.toString()
                      : (0, eA.G)({ lamports: e.atomicAmount, solPriceUsd: t });
                  if ("0" === a) return;
                  let s = { mint: e.mint, chainId: r, direction: "buy" };
                  !(0, eI.F)({ ...s, now: l }) &&
                    eR(eq, [e.mint, r, a].join("\x1f"), l) &&
                    (0, v.o)({
                      direction: "buy",
                      evm_chain_id: r,
                      evm_token: e.mint,
                      amount_in: a,
                    }).catch((e) => {
                      (0, R.v)(e) &&
                        (0, eI.L)({ ...s, code: e.code, status: e.status });
                    });
                })({
                  request: i,
                  solUsdPrice: tE,
                  exposure: tR,
                  regionBlocked: nR,
                }));
          },
          isQuickTradeUnavailable: !id,
          isQuickBuyBlocked: n$,
        },
        requiresHold: L,
      }),
      iR = (0, eH.N)(),
      iM = {
        mint: tg.mint,
        chainId: tg.chain_id,
        isUsdcPayment: tz,
        canDenominateUsd: tz || tE > 0,
        quickBuyAtomic: iA,
        isQuickBuyInsufficient: iI,
        submitQuickBuy: iP,
        submitQuickSell: iU,
        canSubmitTrade: id,
        isUntradeable: nJ || !tg.chain_id || !tI || !tM,
        isBuyBlocked: n$,
        isSubmitting: nN,
        activeQuickTrade: nW,
        sellBalanceRaw: no,
        tokenDecimals: nf,
        tokenUsdPrice: tH,
        spend: {
          balanceUi: tz ? n1 : tF ? tB / ek.Z : null,
          balanceUsd: tz ? n1 : tF && tE > 0 ? (tB / ek.Z) * tE : null,
          ticker: tz ? "USDC" : "SOL",
        },
        quotePreview: {
          solanaAsset: tQ,
          solanaWalletAddress: tI,
          evmWalletAddress: tM,
          slippageBps: nU,
          solUsdPrice: tE,
          spotUsdPrice: tK.tokenUsdPrice,
          buyCalloutUser: tO,
        },
      };
    (0, e9.l)(iM);
    let ij = tg.mint,
      iC = tg.chain_id,
      iB = !!tb;
    tp[53] !== tg.chain_id ||
    tp[54] !== tg.mint ||
    tp[55] !== ty ||
    tp[56] !== iB
      ? ((N = { mint: ij, chainId: iC, side: ty, isFullScreen: iB }),
        (tp[53] = tg.chain_id),
        (tp[54] = tg.mint),
        (tp[55] = ty),
        (tp[56] = iB),
        (tp[57] = N))
      : (N = tp[57]);
    let iF = (0, eE.U)(N);
    if (tj && !tM && tC) {
      let e,
        n,
        i,
        l = t_("web.trade.evm_wallet_in_app_title", { chain_name: t6 });
      return (
        tp[58] !== tg.mint || tp[59] !== tg.symbol || tp[60] !== t_
          ? ((e = t_("web.callouts.upsell_trade_title", {
              symbol: tg.symbol ?? (0, d.e)(tg.mint),
            })),
            (tp[58] = tg.mint),
            (tp[59] = tg.symbol),
            (tp[60] = t_),
            (tp[61] = e))
          : (e = tp[61]),
        tp[62] !== tg.mint
          ? ((n = () => {
              window.open(
                (0, eT.d)(null, "evm_trade", tg.mint),
                "_blank",
                "noopener,noreferrer",
              );
            }),
            (tp[62] = tg.mint),
            (tp[63] = n))
          : (n = tp[63]),
        tp[64] !== e || tp[65] !== n
          ? ((i = { label: e, onClick: n }),
            (tp[64] = e),
            (tp[65] = n),
            (tp[66] = i))
          : (i = tp[66]),
        (0, t.jsx)(eO.f, {
          coin: tg,
          reason: l,
          explanation: [
            t_("web.trade.evm_wallet_in_app_description", {
              chain_name: t6,
              address: (0, r.d)(tC, 8, 4),
            }),
          ],
          primaryAction: i,
          onClose: tb,
          chain: "evm",
        })
      );
    }
    tp[67] !== tM || tp[68] !== tC
      ? ((T = tM && tC && tM.toLowerCase() !== tC.toLowerCase() ? tC : null),
        (tp[67] = tM),
        (tp[68] = tC),
        (tp[69] = T))
      : (T = tp[69]);
    let iD = T;
    tp[70] === Symbol.for("react.memo_cache_sentinel")
      ? ((W = (e) => {
          (tv(e), tw(null));
        }),
        (tp[70] = W))
      : (W = tp[70]);
    let iL = {
        value: tx,
        setValue: W,
        mode: t4,
        cycleMode: "buy" === ty ? tY : tJ,
        canCycleMode: "buy" === ty || t1,
        funding: { symbol: np, decimals: ng, isUsdPegged: tz },
        token: { symbol: t9, decimals: nf },
        conversions: ih,
        disabled: nT,
      },
      iN = {
        isLoggedIn: !0,
        side: ty,
        funding: tz
          ? { amount: n1 ?? 0, symbol: "USDC", maxFractionDigits: 2, usd: null }
          : {
              amount: n0,
              symbol: "SOL",
              maxFractionDigits: 3,
              usd: tE > 0 ? n0 * tE : null,
            },
        token: {
          amount: null === no ? null : Number(no) / 10 ** nf,
          symbol: t9,
        },
        selector: {
          value: tQ,
          solBalanceUi: n0,
          usdcBalanceUi: n1 ?? 0,
          solUsdPrice: tE,
        },
        suffix: t_("web.trade.on_chain", { chain: t6 }),
      },
      iT = [];
    (nr && iT.push("region_restricted"),
      nl && iT.push("asset_refused"),
      n$ && iT.push("buy_blocked"),
      tM || iT.push(tj ? "needs_authorization" : "wallet_loading"),
      n2 && iT.push("funding_insufficient"),
      n4 && iT.push("token_insufficient"));
    let iW = {
      side: ty,
      isLoggedIn: !0,
      isSubmitting: nT,
      isTradeInFlight: nN,
      isMigrationTrade: !1,
      prompt: null,
      blocks: iT,
      amount: {
        mode: t4,
        typed: iy ? ((0, eW.p)(tx) ?? 0) : 0,
        usd: ih.usd,
        funding: ih.funding,
        token: ih.token,
      },
      token: { symbol: t9 },
      funding: { symbol: np },
    };
    (tp[71] !== tS || tp[72] !== tg
      ? ((E = (0, t.jsx)(e2.f, { trigger: tS, coin: tg })),
        (tp[71] = tS),
        (tp[72] = tg),
        (tp[73] = E))
      : (E = tp[73]),
      tp[74] !== t_
        ? ((Q = t_("web.trade.side_aria")), (tp[74] = t_), (tp[75] = Q))
        : (Q = tp[75]),
      tp[76] !== t_
        ? ((z = t_("web.trade.buy")), (tp[76] = t_), (tp[77] = z))
        : (z = tp[77]),
      tp[78] !== z
        ? ((O = { value: "buy", label: z, tone: "mint" }),
          (tp[78] = z),
          (tp[79] = O))
        : (O = tp[79]),
      tp[80] !== t_
        ? ((G = t_("web.trade.sell")), (tp[80] = t_), (tp[81] = G))
        : (G = tp[81]),
      tp[82] !== G
        ? ((K = { value: "sell", label: G, tone: "loss" }),
          (tp[82] = G),
          (tp[83] = K))
        : (K = tp[83]),
      tp[84] !== O || tp[85] !== K
        ? ((H = [O, K]), (tp[84] = O), (tp[85] = K), (tp[86] = H))
        : (H = tp[86]),
      tp[87] !== iu || tp[88] !== ty || tp[89] !== Q || tp[90] !== H
        ? ((X = (0, t.jsx)(f.X, {
            density: "terminal",
            size: 32,
            fullWidth: !0,
            "aria-label": Q,
            value: ty,
            onValueChange: iu,
            options: H,
            className: "min-w-0 flex-1 shrink",
          })),
          (tp[87] = iu),
          (tp[88] = ty),
          (tp[89] = Q),
          (tp[90] = H),
          (tp[91] = X))
        : (X = tp[91]),
      tp[92] !== tb
        ? ((V = tb ? null : (0, t.jsx)(ez.f, {})), (tp[92] = tb), (tp[93] = V))
        : (V = tp[93]));
    let i$ = iq.settingsPresets,
      iE = nz.sheet.open,
      iQ = nz.onOpenChange,
      iz = nz.sheet.focusSettingId;
    (tp[94] !== t_
      ? ((Y = t_("web.trade.trade_settings")), (tp[94] = t_), (tp[95] = Y))
      : (Y = tp[95]),
      tp[96] === Symbol.for("react.memo_cache_sentinel")
        ? ((J = (0, t.jsx)(i.xF, {})), (tp[96] = J))
        : (J = tp[96]),
      tp[97] !== Y
        ? ((te = (0, t.jsx)(m._, {
            density: "terminal",
            "aria-label": Y,
            children: J,
          })),
          (tp[97] = Y),
          (tp[98] = te))
        : (te = tp[98]),
      tp[99] !== iq.settingsPresets ||
      tp[100] !== te ||
      tp[101] !== nz.onOpenChange ||
      tp[102] !== nz.sheet.focusSettingId ||
      tp[103] !== nz.sheet.open
        ? ((tt = (0, t.jsx)(e0.m, {
            quickPresets: i$,
            chain: "evm",
            open: iE,
            onOpenChange: iQ,
            focusSettingId: iz,
            trigger: te,
          })),
          (tp[99] = iq.settingsPresets),
          (tp[100] = te),
          (tp[101] = nz.onOpenChange),
          (tp[102] = nz.sheet.focusSettingId),
          (tp[103] = nz.sheet.open),
          (tp[104] = tt))
        : (tt = tp[104]),
      tp[105] !== tb || tp[106] !== t_
        ? ((ti =
            tb &&
            (0, t.jsx)(m._, {
              density: "terminal",
              onClick: tb,
              "aria-label": t_("web.trade.close_trade_box"),
              children: (0, t.jsx)(i.x6, {}),
            })),
          (tp[105] = tb),
          (tp[106] = t_),
          (tp[107] = ti))
        : (ti = tp[107]),
      tp[108] !== X || tp[109] !== V || tp[110] !== tt || tp[111] !== ti
        ? ((tl = (0, t.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [X, V, tt, ti],
          })),
          (tp[108] = X),
          (tp[109] = V),
          (tp[110] = tt),
          (tp[111] = ti),
          (tp[112] = tl))
        : (tl = tp[112]),
      tp[113] !== tT || tp[114] !== tW || tp[115] !== tN
        ? ((tr =
            tN.length > 1
              ? (0, t.jsx)(e5.f, { presets: tN, activeIndex: tT, onSelect: tW })
              : void 0),
          (tp[113] = tT),
          (tp[114] = tW),
          (tp[115] = tN),
          (tp[116] = tr))
        : (tr = tp[116]),
      tp[117] !== nK || tp[118] !== nG || tp[119] !== ib
        ? ((ta = (0, t.jsx)(eZ.f, {
            preview: ib,
            pauseTargetProps: nK,
            paused: nG,
            showAppFee: !1,
          })),
          (tp[117] = nK),
          (tp[118] = nG),
          (tp[119] = ib),
          (tp[120] = ta))
        : (ta = tp[120]),
      tp[121] !== nm || tp[122] !== t_
        ? ((ts =
            nm &&
            (0, t.jsx)("p", {
              role: "note",
              "data-testid": "hype-gas-low-notice",
              className:
                "rounded-md bg-bg-tertiary px-2.5 py-2 text-[11px] leading-4 text-text-secondary",
              children: t_("web.trade.hype_gas_low_notice", {
                balance: (0, ea.b)(nm.balanceWei),
                amount: (0, ea.b)(nm.requiredWei),
              }),
            })),
          (tp[121] = nm),
          (tp[122] = t_),
          (tp[123] = ts))
        : (ts = tp[123]),
      tp[124] !== n$ || tp[125] !== nQ || tp[126] !== ty || tp[127] !== t_
        ? ((to =
            "buy" === ty &&
            n$ &&
            !nQ &&
            (0, t.jsx)("p", {
              role: "note",
              "data-testid": "scam-buy-blocked-notice",
              className:
                "rounded-md bg-bg-tertiary px-2.5 py-2 text-[11px] leading-4 text-text-error",
              children: t_("coin_details.scam_buy_blocked"),
            })),
          (tp[124] = n$),
          (tp[125] = nQ),
          (tp[126] = ty),
          (tp[127] = t_),
          (tp[128] = to))
        : (to = tp[128]),
      tp[129] !== nQ || tp[130] !== nO || tp[131] !== ty || tp[132] !== t_
        ? ((tu =
            "buy" === ty &&
            nQ &&
            (0, t.jsx)("button", {
              type: "button",
              "data-testid": "safe-mode-buy-blocked-notice",
              onClick: nO,
              className:
                "rounded-md bg-bg-tertiary px-2.5 py-2 text-left text-[11px] leading-4 text-text-error underline-offset-2 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent",
              children: t_("coin_details.safe_mode_buy_blocked"),
            })),
          (tp[129] = nQ),
          (tp[130] = nO),
          (tp[131] = ty),
          (tp[132] = t_),
          (tp[133] = tu))
        : (tu = tp[133]),
      tp[134] !== ik.guard || tp[135] !== ik.holdRequired
        ? ((td = (0, t.jsx)(e4.f, {
            guard: ik.guard,
            holdRequired: ik.holdRequired,
          })),
          (tp[134] = ik.guard),
          (tp[135] = ik.holdRequired),
          (tp[136] = td))
        : (td = tp[136]),
      tp[137] === Symbol.for("react.memo_cache_sentinel")
        ? ((tc = (0, t.jsx)(e1.$, { note: (0, e1.K)({ chain: "evm" }) })),
          (tp[137] = tc))
        : (tc = tp[137]));
    let iO = `${tg.mint}:${ty}`;
    return (
      tp[138] !== nz
        ? ((tm = (e) => {
            e.settingId && nz.openSetting(e.settingId);
          }),
          (tp[138] = nz),
          (tp[139] = tm))
        : (tm = tp[139]),
      tp[140] !== iq || tp[141] !== ty || tp[142] !== iO || tp[143] !== tm
        ? ((tf = (0, t.jsx)(eJ.f, {
            quick: iq,
            resetKey: iO,
            side: ty,
            onEditPresets: tm,
          })),
          (tp[140] = iq),
          (tp[141] = ty),
          (tp[142] = iO),
          (tp[143] = tm),
          (tp[144] = tf))
        : (tf = tp[144]),
      (0, t.jsxs)(c.g, {
        className: "relative min-w-0 gap-3 overflow-hidden p-3",
        onPointerDownCapture: iF,
        onFocusCapture: iF,
        children: [
          E,
          tl,
          (0, t.jsx)(eW.k, {
            model: iL,
            footer: (0, t.jsx)(e$.Q, {
              selector: tr,
              shares: {
                percents: iR.values,
                disabled: it,
                onSelect: (e) => {
                  ((0, eF.h4)({
                    mint: tg.mint,
                    tradeDirection: ty,
                    amountLabel: `${e}%`,
                  }),
                    "buy" === ty ? n9(e) : n8(e));
                },
              },
            }),
          }),
          (0, t.jsx)("div", {
            className: "flex items-center gap-2",
            children: (0, t.jsx)(eQ.f, {
              model: iN,
              onMax:
                "buy" === ty
                  ? "token" !== t0
                    ? () => {
                        "buy" === ty &&
                          "token" !== t0 &&
                          ((0, eF.h4)({
                            mint: tg.mint,
                            tradeDirection: "buy",
                            amountLabel: "max",
                          }),
                          n9(100));
                      }
                    : void 0
                  : nu
                    ? n7
                    : void 0,
              className: "min-w-0 flex-1",
            }),
          }),
          ta,
          ts,
          iD &&
            tM &&
            (0, t.jsx)("p", {
              role: "note",
              className:
                "rounded-md bg-bg-tertiary px-2.5 py-2 text-[11px] leading-4 text-text-secondary",
              children: t_("web.trade.evm_wallet_diverged_notice", {
                chain_name: t6,
                address: (0, r.d)(tM, 8, 4),
                mapped_address: (0, r.d)(iD, 8, 4),
              }),
            }),
          to,
          tu,
          td,
          (0, t.jsx)(e3.H, {
            input: iW,
            onSubmit: (e) => {
              if (null === nP) return;
              let t = ik.guard,
                n =
                  e?.held &&
                  t?.reasons.includes("extreme_impact") &&
                  null != t.valueLostPercent
                    ? { shownLossPercent: t.valueLostPercent }
                    : null,
                i = (0, eW.p)(tx) ?? 0,
                l =
                  "sell" === ty && "token" !== t3 && !tk && nA
                    ? {
                        typedUsd: "usd" === t3 ? i : n_(i),
                        sizingTokenUsdPrice: tH,
                        sizingObservedAtMs: tK.observedAtMs,
                        settlementUsdPrice: nb,
                        snappedToSellAll: nA.isSellAll,
                      }
                    : null;
              iS(ty, nP, nA?.isSellAll ?? !1, void 0, l, null, n);
            },
            holdRequired: ik.holdRequired,
          }),
          tc,
          tf,
        ],
      })
    );
  }
  function tn(e) {
    return Number.isFinite(e) ? e : 0;
  }
  e.s(
    [
      "PRESIGN_TYPED_POLICY",
      0,
      e8,
      "RelayTradeBox",
      0,
      function (e) {
        let i,
          l = (0, n.c)(5),
          { coin: r, onClose: a } = e;
        if (
          "196" === (0, eN.w)(r.chain_id) &&
          r.protocol?.trim().toLowerCase() === "ignix" &&
          !1 === r.complete
        ) {
          let e;
          return (
            l[0] !== a
              ? ((e = (0, t.jsx)(te, { onClose: a })), (l[0] = a), (l[1] = e))
              : (e = l[1]),
            e
          );
        }
        return (
          l[2] !== r || l[3] !== a
            ? ((i = (0, t.jsx)(tt, { coin: r, onClose: a })),
              (l[2] = r),
              (l[3] = a),
              (l[4] = i))
            : (i = l[4]),
          i
        );
      },
    ],
    333146,
  );
};
