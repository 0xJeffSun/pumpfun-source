// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971370),
    n = e.i(344048),
    i = e.i(949879);
  let r = async (e) => {
    let r,
      {
        connection: a,
        wallet: s,
        transaction: o,
        blockhash: u,
        lastValidBlockHeight: l,
      } = e,
      [c] = await s.signAllTransactions([o]);
    if (!c) throw Error("Wallet returned no signed transaction.");
    let m = (c instanceof t.VersionedTransaction, c.serialize());
    try {
      r = await a.sendRawTransaction(m, { skipPreflight: !1, maxRetries: 3 });
    } catch (o) {
      let e, i, a;
      if (
        ((e = o instanceof Error ? o.message : "string" == typeof o ? o : ""),
        !/already been processed|AlreadyProcessed/i.test(e))
      )
        throw o;
      let s =
        c instanceof t.VersionedTransaction
          ? (i = c.signatures[0]) && i.length > 0
            ? n.f.encode(i)
            : null
          : (a = c.signatures[0]?.signature)
            ? n.f.encode(Uint8Array.from(a))
            : null;
      if (!s)
        throw o instanceof t.SendTransactionError
          ? o
          : Error(
              "Tx reported as already processed but signed tx has no signature to confirm.",
            );
      r = s;
    }
    return (
      await (0, i.O)({
        connection: a,
        signature: r,
        blockhash: u,
        lastValidBlockHeight: l,
      }),
      { signature: r }
    );
  };
  e.s(["f", 0, r]);
};
