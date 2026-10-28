// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(970260),
    n = e.i(731110);
  async function a({ solanaClient: e, tx: r }) {
    let i = (0, t.O)().decode((0, n.w)(r)),
      { value: o } = await e.rpc.getFeeForMessage(i).send();
    return o ?? 0n;
  }
  async function r({ solanaClient: e, tx: n, replaceRecentBlockhash: a }) {
    let { value: i } = await e.rpc
      .simulateTransaction((0, t.O)().decode(n), {
        commitment: "confirmed",
        encoding: "base64",
        sigVerify: !1,
        replaceRecentBlockhash: a,
      })
      .send();
    if ("BlockhashNotFound" === i.err && a)
      throw Error("Simulation failed: Blockhash not found");
    return "BlockhashNotFound" === i.err
      ? await r({ solanaClient: e, tx: n, replaceRecentBlockhash: !0 })
      : {
          logs: i.logs ?? [],
          error: i.err,
          hasError: !!i.err,
          hasFunds:
            i.logs?.every(
              (e) =>
                !/insufficient funds/gi.test(e) &&
                !/insufficient lamports/gi.test(e),
            ) ?? !0,
        };
  }
  e.s(["f", 0, a, "s", 0, r]);
};
