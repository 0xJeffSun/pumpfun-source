// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(313017),
    n = t.i(503630),
    r = t.i(22675),
    s = t.i(371047),
    a = t.i(233404);
  async function i(t, r, c = 6e4) {
    let l,
      u = (0, n.t)().replace(/\/+$/, ""),
      d = `${u}/${t.replace(/^\/+/, "")}`;
    try {
      l = await fetch(d, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(0, s.c)(),
          ...(0, e.z)(),
        },
        body: JSON.stringify((0, a.Y)(r)),
        signal: AbortSignal.timeout(c),
      });
    } catch (t) {
      return {
        kind: "error",
        message: t instanceof Error ? t.message : "network error",
      };
    }
    if (!l.ok) return { kind: "error", message: await o(l) };
    try {
      return { kind: "ok", data: await l.json() };
    } catch {
      return { kind: "error", message: "invalid JSON response" };
    }
  }
  async function o(t) {
    try {
      let e = await t.json();
      if (e?.error) return e.error;
    } catch {}
    return `request failed (${t.status})`;
  }
  let c = (t) =>
    Array.isArray(t) && t.every((t) => "string" == typeof t) ? t : [];
  async function l(t) {
    let e,
      n = await i("transactions/creator-fees", {
        wallet: t.wallet,
        mint: t.mint,
      });
    if ("error" === n.kind) return { kind: "error", message: n.message };
    let s = n.data.fees?.claim_transaction;
    if (!s || n.data.fees?.is_claimable === !1) return { kind: "none" };
    try {
      e = (0, r.m)(s);
    } catch {
      return { kind: "error", message: "could not decode claim transaction" };
    }
    return { kind: "tx", tx: e, transactions: c(n.data.fees?.transactions) };
  }
  async function u(t) {
    let e,
      n = await i("transactions/creator-fees/vault", { wallet: t.wallet });
    if ("error" === n.kind) return { kind: "error", message: n.message };
    let s = n.data.collect_transaction;
    if (!s || !1 === n.data.is_claimable) return { kind: "none" };
    try {
      e = (0, r.m)(s);
    } catch {
      return { kind: "error", message: "could not decode collect transaction" };
    }
    return { kind: "tx", tx: e, transactions: c(n.data.transactions) };
  }
  async function d(t, e, n) {
    if (t.confirmed) return t.succeeded;
    if (!t.signature) return !1;
    let r = Date.now() + (n?.pollTimeoutMs ?? 3e4),
      s = n?.pollIntervalMs ?? 2e3;
    for (;;) {
      let n = !1;
      try {
        let { value: r } = await e.getSignatureStatuses([t.signature]),
          s = r[0];
        if (s?.err) n = !0;
        else if (
          s?.confirmationStatus === "confirmed" ||
          s?.confirmationStatus === "finalized"
        )
          return !0;
      } catch {}
      if (n) throw Error("Claim transaction reverted on-chain");
      if (Date.now() >= r) return !1;
      await new Promise((t) => setTimeout(t, s));
    }
  }
  async function m(t, e) {
    return h({ transaction: (0, r.r)(t) }, e);
  }
  async function f(t, e) {
    return h({ transactions: t.map(r.r) }, e, 6e4 * t.length);
  }
  async function h(t, e, n) {
    (e?.route && (t.route = e.route),
      e?.options && (t.options = e.options),
      e?.nonTradeTx && (t.non_trade_tx = !0));
    let r = await i("transactions/send", t, n);
    return "ok" !== r.kind || r.data.signature
      ? r
      : { kind: "error", message: "send response missing signature" };
  }
  t.s([
    "_",
    0,
    d,
    "q",
    0,
    l,
    "i",
    0,
    u,
    "S",
    0,
    i,
    "M",
    0,
    function (t) {
      return t.confirmed && t.succeeded;
    },
    "s",
    0,
    m,
    "l",
    0,
    f,
  ]);
};
