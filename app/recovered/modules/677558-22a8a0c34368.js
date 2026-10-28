// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(970260),
    o = r.i(731110);
  async function i({ solanaClient: r, tx: a }) {
    let n = (0, e.O)().decode((0, o.w)(a)),
      { value: t } = await r.rpc.getFeeForMessage(n).send();
    return t ?? 0n;
  }
  async function a({ solanaClient: r, tx: o, replaceRecentBlockhash: i }) {
    let { value: n } = await r.rpc
      .simulateTransaction((0, e.O)().decode(o), {
        commitment: "confirmed",
        encoding: "base64",
        sigVerify: !1,
        replaceRecentBlockhash: i,
      })
      .send();
    if ("BlockhashNotFound" === n.err && i)
      throw Error("Simulation failed: Blockhash not found");
    return "BlockhashNotFound" === n.err
      ? await a({ solanaClient: r, tx: o, replaceRecentBlockhash: !0 })
      : {
          logs: n.logs ?? [],
          error: n.err,
          hasError: !!n.err,
          hasFunds:
            n.logs?.every(
              (r) =>
                !/insufficient funds/gi.test(r) &&
                !/insufficient lamports/gi.test(r),
            ) ?? !0,
        };
  }
  r.s(["f", 0, i, "s", 0, a]);
};
