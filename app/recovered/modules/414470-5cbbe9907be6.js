// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(344048),
    r = e.i(613677),
    n = e.i(418096),
    i = e.i(342463),
    l = e.i(637782),
    a = e.i(297865),
    s = e.i(313017),
    o = e.i(371047),
    u = e.i(233404);
  let d = r.z.object({
      status: n.z.enum(["charge_required", "already_funded"]),
      transaction: i.z.string().nullish(),
      balance_wei: i.z.string(),
      target_wei: i.z.string(),
      shortfall_wei: i.z.string(),
      gas_price_wei: i.z.string(),
      charge_usd: i.z.string().nullish(),
      charge_lamports: l.z.number().nullish(),
      charge_usdc_atomic: l.z.number().nullish(),
      hype_usd: i.z.string().nullish(),
      sol_usd: i.z.string().nullish(),
      ttl_seconds: l.z.number(),
      expires_at: l.z.number(),
    }),
    c = r.z.object({
      error: i.z.string().optional(),
      data: r.z
        .object({
          reason: i.z.string().optional(),
          retryable: a.z.boolean().optional(),
        })
        .optional(),
    }),
    m = async (e) => {
      try {
        let t = c.safeParse(await e.json());
        return t.success ? t.data : void 0;
      } catch {
        return;
      }
    },
    p = (e) => e >= 500 || 429 === e;
  class f extends Error {
    status;
    reason;
    retryable;
    constructor(e) {
      (super(e.message ?? e.reason ?? "Hype gas build failed"),
        (this.name = "HypeGasBuildError"),
        (this.status = e.status),
        (this.reason = e.reason),
        (this.retryable = e.retryable ?? (void 0 !== e.status && p(e.status))));
    }
  }
  let _ = async (e, t, r) => {
    var n, i;
    let l, a, d;
    return fetch(`/api/blockchain-gas/transactions/${e}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(0, o.c)(),
        ...(0, s.z)(),
      },
      body: JSON.stringify((0, u.Y)(t)),
      signal:
        ((n = r.timeoutMs),
        (i = r.signal),
        (l = new AbortController()),
        (a = setTimeout(() => l.abort(), n)),
        (d = () => l.abort(i?.reason)),
        i && (i.aborted ? d() : i.addEventListener("abort", d, { once: !0 })),
        l.signal.addEventListener(
          "abort",
          () => {
            (clearTimeout(a), i?.removeEventListener("abort", d));
          },
          { once: !0 },
        ),
        l.signal),
    });
  };
  async function v(t, r = {}) {
    let n, i;
    try {
      n = await _(
        "hype-gas-build",
        { ...t },
        { signal: r.signal, timeoutMs: 3e4 },
      );
    } catch (e) {
      if (e instanceof Error && "AbortError" === e.name) throw e;
      throw new f({
        message: e instanceof Error ? e.message : "Network error building gas",
      });
    }
    if (!n.ok) {
      let e = await m(n);
      throw new f({
        status: n.status,
        reason: e?.data?.reason,
        retryable: e?.data?.retryable,
        message: e?.error ?? `hype-gas-build failed (${n.status})`,
      });
    }
    try {
      i = await n.json();
    } catch {
      i = void 0;
    }
    let l = d.safeParse(i);
    if (!l.success)
      throw new f({
        message: "hype-gas-build returned an unexpected response shape",
      });
    let a = l.data.transaction,
      s = a ? (await e.A(277871)).versionedTxFromWire(a) : null;
    return {
      status: l.data.status,
      transaction: s,
      balanceWei: BigInt(l.data.balance_wei),
      targetWei: BigInt(l.data.target_wei),
      shortfallWei: BigInt(l.data.shortfall_wei),
      gasPriceWei: BigInt(l.data.gas_price_wei),
      chargeUsd: l.data.charge_usd ?? null,
      chargeLamports: l.data.charge_lamports ?? null,
      chargeUsdcAtomic: l.data.charge_usdc_atomic ?? null,
      ttlSeconds: l.data.ttl_seconds,
    };
  }
  let g = r.z.object({
      status: n.z.enum(["funded", "already_funded"]),
      signature: i.z.string(),
      drip_tx_hash: i.z.string().nullish(),
      drip_amount_wei: i.z.string().nullish(),
    }),
    h = new Set([
      "CHARGE_UNCONFIRMED",
      "TOPUP_IN_FLIGHT",
      "GAS_TOPUP_FAILED",
      "TOPUP_FLOAT_LOW",
      "GAS_TOPUP_CAPPED",
    ]),
    w = new Set([
      "CHARGE_INSUFFICIENT",
      "CHARGE_TX_REVERTED",
      "TREASURY_FLOAT_LOW",
      "GAS_QUOTE_FAILED",
      "HYPE_PRICE_UNAVAILABLE",
      "SOL_PRICE_UNAVAILABLE",
    ]);
  class y extends Error {
    status;
    reason;
    retryable;
    constructor(e) {
      (super(e.message ?? e.reason ?? "Hype gas claim failed"),
        (this.name = "HypeGasClaimError"),
        (this.status = e.status),
        (this.reason = e.reason),
        (this.retryable = e.retryable ?? (void 0 !== e.status && p(e.status))));
    }
  }
  async function b(t, r = {}) {
    let n,
      i,
      l =
        "transaction" in t
          ? {
              user: t.user,
              recipient_evm: t.recipientEvm,
              transaction: (await e.A(277871)).versionedTxToWire(t.transaction),
            }
          : {
              user: t.user,
              recipient_evm: t.recipientEvm,
              signature: t.signature,
            };
    try {
      n = await _("hype-gas-claim", l, { signal: r.signal, timeoutMs: 9e4 });
    } catch (e) {
      throw new y({
        message: e instanceof Error ? e.message : "Network error claiming gas",
      });
    }
    if (!n.ok) {
      let e = await m(n);
      throw new y({
        status: n.status,
        reason: e?.data?.reason,
        retryable: e?.data?.retryable,
        message: e?.error ?? `hype-gas-claim failed (${n.status})`,
      });
    }
    try {
      i = await n.json();
    } catch {
      i = void 0;
    }
    let a = g.safeParse(i);
    if (!a.success)
      throw new y({
        message: "hype-gas-claim returned an unexpected response shape",
      });
    return {
      status: a.data.status,
      signature: a.data.signature,
      dripTxHash: a.data.drip_tx_hash ?? null,
      dripAmountWei:
        null == a.data.drip_amount_wei ? null : BigInt(a.data.drip_amount_wei),
    };
  }
  e.s([
    "C",
    0,
    y,
    "q",
    0,
    (e) => t.f.encode(e.signatures[0] ?? new Uint8Array(64)),
    "z",
    0,
    v,
    "l",
    0,
    b,
    "_",
    0,
    (e) => "CHARGE_NOT_FOUND" === e,
    "F",
    0,
    (e) => "CHARGE_TX_REVERTED" === e,
    "A",
    0,
    (e) => void 0 !== e && w.has(e),
    "S",
    0,
    (e) => void 0 !== e && h.has(e),
    "j",
    0,
    (e) => void 0 === e || h.has(e),
    "f",
    0,
    (e) =>
      "CHARGE_EXPIRED" === e ||
      "CHARGE_INVALID" === e ||
      "GAS_TOPUP_REJECTED" === e,
  ]);
};
