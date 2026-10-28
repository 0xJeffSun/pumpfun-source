// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(313017),
    r = e.i(371047),
    n = e.i(233404),
    i = e.i(25572),
    l = e.i(54567);
  class a extends Error {
    status;
    data;
    constructor(e, t, r) {
      (super(e),
        (this.name = "LimitApiError"),
        (this.status = t),
        (this.data = r));
    }
  }
  let o = (e) => {
      let t;
      if (null === e) return null;
      let r = e.trim();
      if (!r) return null;
      try {
        t = JSON.parse(r);
      } catch {
        return null;
      }
      return !t || "object" != typeof t || Array.isArray(t) ? null : t;
    },
    s = (e) => {
      if (null === e) return null;
      let t = e.trim();
      if (!t) return null;
      let r = o(t);
      return null === r
        ? t
        : "string" == typeof r.message
          ? r.message
          : Array.isArray(r.message)
            ? r.message.join(", ")
            : "string" == typeof r.error
              ? r.error
              : t;
    },
    u = (e) => {
      let t = o(e),
        r = t?.data;
      if (!r || "object" != typeof r || Array.isArray(r)) return;
      let { reason: n, retryable: i } = r;
      return {
        ...("string" == typeof n ? { reason: n } : {}),
        ...("boolean" == typeof i ? { retryable: i } : {}),
      };
    },
    d = new Set([429, 500, 502, 503, 504]),
    c = (e) => new Promise((t) => setTimeout(t, e)),
    p = async (e, i, l) => {
      let o,
        p = l?.retries ?? 0;
      for (let l = 0; l <= p; l += 1) {
        let f;
        l > 0 && (await c(400 * l));
        try {
          f = await fetch(`/api/blockchain-limit/transactions/${e}`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              ...(0, r.c)(),
              ...(0, t.z)(),
            },
            body: JSON.stringify((0, n.Y)(i)),
          });
        } catch (e) {
          o = e;
          continue;
        }
        if (!f.ok) {
          let e = null;
          try {
            e = await f.text();
          } catch {}
          let t = new a(s(e) ?? `request failed (${f.status})`, f.status, u(e));
          if (d.has(f.status) && l < p) {
            o = t;
            continue;
          }
          throw t;
        }
        return await f.json();
      }
      throw o instanceof Error ? o : new a("network error", 0);
    },
    f = async (e) => {
      try {
        return await p(
          "limit-eligibility",
          { user: e.user, mint: e.mint },
          { retries: 2 },
        );
      } catch (t) {
        throw (
          l.logger.error("[limit-orders] eligibility_failed", {
            mint: e.mint,
            error: t,
          }),
          t
        );
      }
    };
  e.s([
    "Z",
    0,
    a,
    "h",
    0,
    f,
    "P",
    0,
    (e) => p("cancel-limit", { order_id: e.orderId }, { retries: 1 }),
    "O",
    0,
    p,
    "v",
    0,
    (e) => p("send-limit", { transaction: e.transaction }),
    "A",
    0,
    (e) =>
      p("swap-build-limit", {
        user: e.user,
        mint: e.mint,
        quote_mint: e.quoteMint,
        order_type: e.orderType,
        amount_in: e.amountInAtoms,
        trigger_mcap: e.triggerMcapUsd,
        nonce_account: e.nonceAccount,
        ...(0, i.n)(e.user),
        ...(null != e.nonceLandedSlot
          ? { nonce_landed_slot: e.nonceLandedSlot }
          : {}),
      }),
  ]);
};
