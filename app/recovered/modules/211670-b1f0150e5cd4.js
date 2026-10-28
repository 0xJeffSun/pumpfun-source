// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(38279);
  let n = async (e) => {
      if (!e.ok)
        throw Error(`PnL v2 request failed: ${e.status} ${e.statusText}`);
      let t = await e.json();
      if (!t.success) throw Error("PnL v2 request returned success=false");
      return t.data;
    },
    r = async ({ wallet: e, mints: r }) => {
      let i = `${t.C.PROFILE}/v2/pnl/batch/${e}?version=v2`;
      return n(
        await fetch(i, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokens: r.map((e) => ({ mint: e })) }),
        }),
      );
    },
    i = async ({ wallet: e, mints: t }) => {
      if (0 === t.length) return [];
      let n = [];
      for (let e = 0; e < t.length; e += 50) n.push(t.slice(e, e + 50));
      return (
        await Promise.all(n.map((t) => r({ wallet: e, mints: t })))
      ).flat();
    },
    l = async ({ wallet: e, mint: r, signal: i }) => {
      let l = await fetch(`${t.C.PROFILE}/v3/pnl/token/${e}/${r}`, {
        signal: ((e) => {
          let t =
            "function" == typeof AbortSignal.timeout
              ? AbortSignal.timeout(8e3)
              : void 0;
          if (!t) return e;
          if (!e) return t;
          if ("function" == typeof AbortSignal.any)
            return AbortSignal.any([e, t]);
          let n = new AbortController(),
            r = (e) => () => n.abort(e.reason);
          return (
            e.aborted
              ? n.abort(e.reason)
              : e.addEventListener("abort", r(e), { once: !0 }),
            t.addEventListener("abort", r(t), { once: !0 }),
            n.signal
          );
        })(i),
      });
      return 404 === l.status ? null : n(l);
    };
  e.s([
    "V",
    0,
    {
      batch: (e, t) => ["pnlBatch", e, t],
      batchPrefix: (e) => ["pnlBatch", e],
      token: (e, t) => ["pnlTokenV2", e, t],
    },
    "B",
    0,
    (e) => ({
      mint: e.mint,
      cost_basis_usd: e.unrealized?.cost_basis?.usd ?? null,
      cost_basis_sol: e.unrealized?.cost_basis?.sol ?? null,
      unrealized_pnl_usd: e.unrealized?.pnl?.usd ?? null,
      unrealized_pnl_sol: e.unrealized?.pnl?.sol ?? null,
      percentage_usd: e.unrealized?.percentage?.usd ?? null,
      percentage_sol: e.unrealized?.percentage?.sol ?? null,
      realized_pnl_usd: e.realized?.pnl?.usd ?? null,
      realized_pnl_sol: e.realized?.pnl?.sol ?? null,
      amount_held: e.unrealized?.amount_held ?? null,
      last_slot_index_id: e.last_slot_index_id,
      has_transfers: e.has_transfers,
      has_untrusted_usd_basis: e.has_untrusted_usd_basis,
      has_untrusted_sol_basis: e.has_untrusted_sol_basis,
    }),
    "Z",
    0,
    i,
    "$",
    0,
    l,
  ]);
};
