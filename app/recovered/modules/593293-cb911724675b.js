// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(322315),
    n = e.i(254010),
    i = e.i(606933),
    a = e.i(79472),
    o = e.i(86913);
  let s = () => {
    let e = (0, a.m)(),
      t = (0, n.k)(r.D.BRIDGE_STOCK_REGION_ROUTING);
    return e && t;
  };
  e.s(
    [
      "s",
      0,
      () => {
        let e,
          r = (0, t.c)(3),
          n = s(),
          a = (0, i.useQueryClient)();
        return (
          r[0] !== n || r[1] !== a
            ? ((e = (e) =>
                n &&
                ((e, { chainId: t, mint: r }) =>
                  e.getQueryData((0, o.c)(t ?? null, r))?.tokenized_stock ===
                  !0)(a, e)),
              (r[0] = n),
              (r[1] = a),
              (r[2] = e))
            : (e = r[2]),
          e
        );
      },
      "G",
      0,
      (e) => {
        let r,
          n = (0, t.c)(4),
          { chainId: i, mint: a } = e,
          l = s(),
          u = null == i ? null : String(i);
        n[0] !== l || n[1] !== a || n[2] !== u
          ? ((r = { mint: a, chainId: u, enabled: l }),
            (n[0] = l),
            (n[1] = a),
            (n[2] = u),
            (n[3] = r))
          : (r = n[3]);
        let { tokenizedStock: d } = (0, o.Q)(r);
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
      for (let r of d()) r.key === e && (void 0 === t || c(r, t)) && (t = r);
      return t;
    },
    m = new Set(),
    p = (e, t = Date.now()) => {
      let r = Date.parse(e.created.quote.expires_at);
      return Number.isFinite(r) && r - 15e3 <= t;
    },
    y = (e, t = Date.now()) => t - e.signedAt > 12e4;
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
      y,
      "q",
      0,
      p,
      "V",
      0,
      (e, { spotUsdPrice: t, now: r = Date.now() } = {}) => {
        if (0 === d().length) return { miss: "none" };
        let n = f(e);
        return void 0 === n
          ? { miss: "key" }
          : n.consumed
            ? { miss: "consumed" }
            : p(n, r)
              ? { miss: "expired" }
              : y(n, r)
                ? { miss: "stale" }
                : l(n, t)
                  ? { miss: "price" }
                  : ((n.consumed = !0), { hit: n });
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
  var h = e.i(526317);
  let g = new Map(),
    v = ({ mint: e, chainId: t, direction: r }) =>
      [r, t, e.toLowerCase()].join("\x1f");
  e.s(
    [
      "F",
      0,
      (e) =>
        null !==
        (({ mint: e, chainId: t, direction: r, now: n = Date.now() }) => {
          let i = v({ mint: e, chainId: t, direction: r }),
            a = g.get(i);
          return a ? (n - a.at > 15e3 ? (g.delete(i), null) : a) : null;
        })(e),
      "L",
      0,
      ({
        mint: e,
        chainId: t,
        direction: r,
        code: n,
        status: i,
        now: a = Date.now(),
      }) => {
        if (!(void 0 !== i && i >= 400 && i < 500 && 429 !== i) || n === h.s)
          return !1;
        if (g.size >= 64) {
          for (let [e, t] of g) a - t.at > 15e3 && g.delete(e);
          if (g.size >= 64) {
            let e = g.keys().next().value;
            void 0 !== e && g.delete(e);
          }
        }
        return (
          g.set(v({ mint: e, chainId: t, direction: r }), {
            code: n,
            status: i,
            at: a,
          }),
          !0
        );
      },
    ],
    337749,
  );
};
