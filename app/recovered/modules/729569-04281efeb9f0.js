// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(913719),
    r = e.i(460261);
  let n = () => e.A(489759).then((e) => e.getEvmPublicClient),
    i = BigInt(6e5);
  async function l(e, t = r.a) {
    let a = (await n())(t),
      [s, o] = await Promise.all([
        a.getBalance({ address: e }),
        a.estimateFeesPerGas(),
      ]),
      u = i * o.maxFeePerGas;
    return {
      balanceWei: s,
      requiredWei: u,
      shortfallWei: u > s ? u - s : BigInt(0),
    };
  }
  async function a({
    evmWalletAddress: e,
    requiredWei: t,
    signal: i,
    chainId: l = r.a,
    timeoutMs: o = 9e4,
    pollMs: u = 3e3,
    now: d = Date.now,
    sleep: c = s,
  }) {
    let m = (await n())(l),
      p = d() + o;
    for (;;) {
      if (i?.aborted) return "aborted";
      try {
        if ((await m.getBalance({ address: e })) >= t) return "funded";
      } catch {}
      if (i?.aborted) return "aborted";
      if (d() >= p) return "timed_out";
      await c(Math.min(u, Math.max(0, p - d())), i);
    }
  }
  let s = (e, t) =>
    new Promise((r) => {
      if (t?.aborted) return r();
      let n = setTimeout(i, e);
      function i() {
        (t?.removeEventListener("abort", i), clearTimeout(n), r());
      }
      t?.addEventListener("abort", i, { once: !0 });
    });
  e.s(["b", 0, (e) => (0, t.N)(e, 18, 6), "J", 0, l, "R", 0, a]);
};
