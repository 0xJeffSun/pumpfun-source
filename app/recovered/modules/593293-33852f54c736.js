// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(322315),
    r = e.i(254010),
    i = e.i(606933),
    s = e.i(79472),
    o = e.i(86913);
  let a = () => {
    let e = (0, s.m)(),
      t = (0, r.k)(n.D.BRIDGE_STOCK_REGION_ROUTING);
    return e && t;
  };
  e.s(
    [
      "s",
      0,
      () => {
        let e,
          n = (0, t.c)(3),
          r = a(),
          s = (0, i.useQueryClient)();
        return (
          n[0] !== r || n[1] !== s
            ? ((e = (e) =>
                r &&
                ((e, { chainId: t, mint: n }) =>
                  e.getQueryData((0, o.c)(t ?? null, n))?.tokenized_stock ===
                  !0)(s, e)),
              (n[0] = r),
              (n[1] = s),
              (n[2] = e))
            : (e = n[2]),
          e
        );
      },
      "G",
      0,
      (e) => {
        let n,
          r = (0, t.c)(4),
          { chainId: i, mint: s } = e,
          l = a(),
          u = null == i ? null : String(i);
        r[0] !== l || r[1] !== s || r[2] !== u
          ? ((n = { mint: s, chainId: u, enabled: l }),
            (r[0] = l),
            (r[1] = s),
            (r[2] = u),
            (r[3] = n))
          : (n = r[3]);
        let { tokenizedStock: d } = (0, o.Q)(n);
        return l && !0 === d;
      },
    ],
    593293,
  );
  let l = (e, t) =>
      null !== e.spotUsdPrice &&
      !!(e.spotUsdPrice > 0) &&
      null != t &&
      !!(t > 0) &&
      1e4 * Math.abs(t / e.spotUsdPrice - 1) >
        (e.created.quote.slippage_bps ?? 300) / 2,
    u = { max: null, typed: null },
    d = () => [u.max, u.typed].filter((e) => null !== e),
    c = (e, t) =>
      t.consumed !== e.consumed ? !e.consumed : e.signedAt > t.signedAt,
    f = (e) => {
      let t;
      for (let n of d()) n.key === e && (void 0 === t || c(n, t)) && (t = n);
      return t;
    },
    m = new Set(),
    p = (e, t = Date.now()) => {
      let n = Date.parse(e.created.quote.expires_at);
      return Number.isFinite(n) && n - 15e3 <= t;
    },
    _ = (e, t = Date.now()) => t - e.signedAt > 12e4;
  e.s(
    [
      "x",
      0,
      (e) => {
        for (let t of d()) t.created.intent_id === e && (t.consumed = !0);
      },
      "Q",
      0,
      (e) => f(e) ?? null,
      "s",
      0,
      _,
      "q",
      0,
      p,
      "V",
      0,
      (e, { spotUsdPrice: t, now: n = Date.now() } = {}) => {
        if (0 === d().length) return { miss: "none" };
        let r = f(e);
        return void 0 === r
          ? { miss: "key" }
          : r.consumed
            ? { miss: "consumed" }
            : p(r, n)
              ? { miss: "expired" }
              : _(r, n)
                ? { miss: "stale" }
                : l(r, t)
                  ? { miss: "price" }
                  : ((r.consumed = !0), { hit: r });
      },
      "S",
      0,
      (e) => {
        for (let t of d()) t.created.intent_id === e && (t.consumed = !1);
      },
      "n",
      0,
      (e) =>
        JSON.stringify([
          e.solana_wallet,
          e.evm_wallet.toLowerCase(),
          e.evm_chain_id,
          e.evm_token.toLowerCase(),
          e.amount_in,
          e.slippage_bps ?? null,
          e.payout_denomination ?? "stable",
        ]),
      "r",
      0,
      l,
      "o",
      0,
      (e) => {
        for (let t of ((u[e.lane] = e), m)) t();
      },
      "B",
      0,
      (e) => (
        m.add(e),
        () => {
          m.delete(e);
        }
      ),
    ],
    474294,
  );
  var g = e.i(526317);
  let h = new Map(),
    v = ({ mint: e, chainId: t, direction: n }) =>
      [n, t, e.toLowerCase()].join("\x1f");
  e.s(
    [
      "F",
      0,
      (e) =>
        null !==
        (({ mint: e, chainId: t, direction: n, now: r = Date.now() }) => {
          let i = v({ mint: e, chainId: t, direction: n }),
            s = h.get(i);
          return s ? (r - s.at > 15e3 ? (h.delete(i), null) : s) : null;
        })(e),
      "L",
      0,
      ({
        mint: e,
        chainId: t,
        direction: n,
        code: r,
        status: i,
        now: s = Date.now(),
      }) => {
        if (!(void 0 !== i && i >= 400 && i < 500 && 429 !== i) || r === g.s)
          return !1;
        if (h.size >= 64) {
          for (let [e, t] of h) s - t.at > 15e3 && h.delete(e);
          if (h.size >= 64) {
            let e = h.keys().next().value;
            void 0 !== e && h.delete(e);
          }
        }
        return (
          h.set(v({ mint: e, chainId: t, direction: n }), {
            code: r,
            status: i,
            at: s,
          }),
          !0
        );
      },
    ],
    337749,
  );
};
