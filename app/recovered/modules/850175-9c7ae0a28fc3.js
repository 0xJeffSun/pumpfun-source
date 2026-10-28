// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(322315),
    r = e.i(254010),
    i = e.i(606933),
    l = e.i(352386),
    a = e.i(334076),
    o = e.i(666880),
    s = e.i(997887),
    u = e.i(898360),
    d = e.i(689943);
  let c = (e, t) =>
    null == t || t === `/coin/${e}` || t.startsWith(`/coin/${e}?`);
  e.s(["f", 0, c], 687505);
  var f = e.i(246224),
    m = e.i(620268),
    p = e.i(646908),
    h = e.i(958083),
    y = e.i(12345);
  let g = /^\d+(\.\d+)?$/,
    v = (e, t) => {
      if ("string" != typeof e || !g.test(e)) return;
      let n = new h.U(e);
      if (!(!n.isFinite() || n.lessThanOrEqualTo(0)))
        return n.mul(h.U.pow(10, t)).toFixed(0);
    };
  function b(e, t = {}) {
    let n =
        null != t.usdMarketCap &&
        Number.isFinite(t.usdMarketCap) &&
        t.usdMarketCap > 0
          ? t.usdMarketCap
          : 0,
      r = {};
    if (
      "number" == typeof e.decimals &&
      Number.isInteger(e.decimals) &&
      e.decimals >= 0
    ) {
      let t = v(e.totalSupply, e.decimals),
        n = v(e.circulatingSupply, e.decimals);
      (t && (r.total_supply_str = t), n && (r.circulating_supply_str = n));
    }
    return {
      mint: e.address,
      chain_id: p.H[e.chain],
      name: e.name,
      symbol: e.symbol,
      image_uri: (0, y.I)(e) ?? "",
      banner_uri: e.bannerImageUri ?? void 0,
      description: e.description ?? void 0,
      twitter: e.twitter ?? void 0,
      telegram: e.telegram ?? void 0,
      website: e.website ?? void 0,
      creator: e.creatorAddress ?? void 0,
      created_timestamp: e.createdAt ?? void 0,
      updated_at: Date.now(),
      base_decimals: e.decimals ?? void 0,
      pool_address: e.poolAddress ?? void 0,
      ...r,
      usd_market_cap: n,
      market_cap: n,
      initialized: !1,
      show_name: !0,
      nsfw: !1,
      is_banned: !1,
      is_multichain_fallback: !0,
    };
  }
  e.s(["f", 0, b], 841303);
  let w = (e) => {
    let t =
      Number(e.price) *
      ("token1" === e.quoteToken
        ? Number(e.token1?.circulatingSupply ?? 0)
        : "token0" === e.quoteToken
          ? Number(e.token0?.circulatingSupply ?? 0)
          : 0);
    return Number.isFinite(t) && t > 0 ? t : 0;
  };
  e.s(["f", 0, w], 591200);
  var k = e.i(880783),
    S = e.i(652853),
    C = e.i(605587);
  let A = new Map(),
    x = new Map(),
    M = (e) => {
      let t = A.get(e);
      return t && Date.now() - t.at < 3e4 ? t : null;
    },
    _ = async (e, t, n) => {
      if (!t.poolAddress) return null;
      try {
        return await e.fetchQuery(
          (0, f.H)({
            poolAddress: t.poolAddress,
            chain: n,
            tokenAddress: t.address,
            sessionAddress: null,
          }),
        );
      } catch {
        return null;
      }
    },
    T = async (e, t) => {
      let n = await _(e, t, "solana");
      return (0, k.H)(t, { usdMarketCap: (0, k.S)(n?.price, (0, k.Q)(t)) });
    },
    D = async (e, t) => {
      let n,
        r = ((n = t.chain), p.c.includes(n)) ? await _(e, t, t.chain) : null;
      return b(t, { usdMarketCap: r ? w(r) : 0 });
    },
    P = async (e, t) => {
      let n = (0, C.h)(t);
      if (!n && !(0, S.f)(t)) return null;
      let r = await (0, m.W)(t);
      if (!r) return null;
      if (!n) return "solana" === r.chain && r.address === t ? T(e, r) : null;
      let i = r.chain;
      return i ? D(e, { ...r, chain: i }) : null;
    };
  var j = e.i(835894);
  let L = null,
    F = (e, t) =>
      e
        .fetchQuery({
          queryKey: d.o.coin(t),
          queryFn: () => (0, s.k)({ coinAddress: t }),
          staleTime: 3e4,
        })
        .then((e) => e)
        .catch((n) =>
          n instanceof s.V
            ? ((e, t) => {
                let n = M(t);
                if (n) return Promise.resolve(n.coin);
                let r = x.get(t);
                if (r) return r;
                let i = P(e, t)
                  .then(
                    (e) => (A.set(t, { at: Date.now(), coin: e }), e),
                    () => null,
                  )
                  .finally(() => x.delete(t));
                return (x.set(t, i), i);
              })(e, t)
            : null,
        );
  function N(e) {
    return (0, a.h)({ coin: e });
  }
  function O(e, t) {
    j.x.getState().requestPreboot(e, { speculative: void 0 !== t && t });
  }
  function $(e) {
    return e.enabled;
  }
  e.s(
    [
      "e",
      0,
      (e) => ({ mint: e, mintOnly: !0 }),
      "b",
      0,
      F,
      "W",
      0,
      function (e) {
        let a,
          s,
          f,
          m,
          p,
          h,
          y,
          g,
          v,
          b,
          w = (0, t.c)(41),
          k = (0, i.useQueryClient)(),
          S = (0, r.k)(n.D.WEB_INSTANT_COIN_CHART),
          C = (0, j.x)($),
          A = !e || "mintOnly" in e ? null : e,
          x = e?.mint ?? null;
        (w[0] !== S || w[1] !== C || w[2] !== A
          ? ((a = () => {
              A && S && C && (0, o.f)(A) && j.x.getState().noteSeenCoin(A);
            }),
            (s = [A, S, C]),
            (w[0] = S),
            (w[1] = C),
            (w[2] = A),
            (w[3] = a),
            (w[4] = s))
          : ((a = w[3]), (s = w[4])),
          (0, l.useEffect)(a, s),
          w[5] !== x || w[6] !== k || w[7] !== A
            ? ((f = (e) => {
                A
                  ? e(A)
                  : x &&
                    F(k, x).then((t) => {
                      t && e(t);
                    });
              }),
              (w[5] = x),
              (w[6] = k),
              (w[7] = A),
              (w[8] = f))
            : (f = w[8]));
        let _ = f;
        w[9] !== x || w[10] !== k
          ? ((m = () => {
              if (!x) return null;
              let e = k.getQueryData(d.o.coin(x));
              return e && void 0 !== e.quote_mint ? e : (M(x)?.coin ?? null);
            }),
            (w[9] = x),
            (w[10] = k),
            (w[11] = m))
          : (m = w[11]);
        let T = m;
        w[12] !== x || w[13] !== T || w[14] !== k
          ? ((p = (e, t) => {
              let n = void 0 !== t && t;
              if (!x) return;
              let r = T();
              (r && O(r, n),
                F(k, x).then((t) => {
                  t && e() && (r ? j.x.getState().refreshPending(t) : O(t, n));
                }));
            }),
            (w[12] = x),
            (w[13] = T),
            (w[14] = k),
            (w[15] = p))
          : (p = w[15]);
        let D = p;
        return (
          w[16] !== x
            ? ((h = (e) =>
                null !== x &&
                e instanceof HTMLAnchorElement &&
                c(x, e.getAttribute("href") ?? "")),
              (w[16] = x),
              (w[17] = h))
            : (h = w[17]),
          w[18] !== D ||
          w[19] !== S ||
          w[20] !== C ||
          w[21] !== x ||
          w[22] !== k ||
          w[23] !== A
            ? ((y = () => {
                if ((A && (0, d.a)(k, A), !x || !S || !C)) return;
                let { hasChart: e, pending: t } = j.x.getState();
                e ||
                  null !== t ||
                  D(() => {
                    let e = j.x.getState();
                    return null === e.pending
                      ? !e.hasChart
                      : (0, j.a)(e.pending.mint, x);
                  }, !0);
              }),
              (w[18] = D),
              (w[19] = S),
              (w[20] = C),
              (w[21] = x),
              (w[22] = k),
              (w[23] = A),
              (w[24] = y))
            : (y = w[24]),
          w[25] !== S ||
          w[26] !== C ||
          w[27] !== x ||
          w[28] !== k ||
          w[29] !== _
            ? ((g = () => {
                x && S && (_(N), C && F(k, x));
              }),
              (w[25] = S),
              (w[26] = C),
              (w[27] = x),
              (w[28] = k),
              (w[29] = _),
              (w[30] = g))
            : (g = w[30]),
          w[31] !== D || w[32] !== S || w[33] !== C || w[34] !== x
            ? ((v = () => {
                x && S && C && ((L = x), D(() => L === x));
              }),
              (w[31] = D),
              (w[32] = S),
              (w[33] = C),
              (w[34] = x),
              (w[35] = v))
            : (v = w[35]),
          w[36] !== h || w[37] !== y || w[38] !== g || w[39] !== v
            ? ((b = { navigatesVia: h, onIntent: y, onArm: g, onPress: v }),
              (w[36] = h),
              (w[37] = y),
              (w[38] = g),
              (w[39] = v),
              (w[40] = b))
            : (b = w[40]),
          (0, u.Q)(b)
        );
      },
    ],
    850175,
  );
};
