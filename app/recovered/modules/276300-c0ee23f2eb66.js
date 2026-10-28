// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    n = e.i(896342),
    i = e.i(526317);
  let a = 3e3,
    r = "quote_unavailable",
    s = (e) => (e instanceof Error ? e.message : String(e)),
    l = (e) => new Promise((t) => setTimeout(t, e)),
    o = (e, t, n) => {
      let i = e.quote_status ?? void 0;
      if ("ready" === i) {
        let i = e.expected_out ?? void 0,
          a = e.min_out ?? void 0;
        if (void 0 === i || void 0 === a || "0" === a)
          return { status: "failed", code: r, source: t, waitMs: n };
        let s = e.slippage_bps ?? void 0;
        return {
          status: "ready",
          expectedOut: i,
          minOut: a,
          ...(void 0 === s ? {} : { slippageBps: s }),
          source: t,
          waitMs: n,
        };
      }
      if ("failed" === i)
        return {
          status: "failed",
          code: e.quote_fail_code ?? r,
          source: t,
          waitMs: n,
        };
    },
    u = (e, t) =>
      null == e.quote_status
        ? {
            status: "failed",
            code: "quote_status_missing",
            source: "get",
            waitMs: t,
          }
        : o(e, "get", t),
    d = async ({ intentId: e, feed: r, signal: d, waitQuoteMs: c = a }) => {
      let m,
        g,
        p = performance.now(),
        f = () => performance.now() - p,
        h = new AbortController(),
        _ = () => h.abort();
      (d?.aborted && _(), d?.addEventListener("abort", _, { once: !0 }));
      let b = new Promise((e) => {
        m = e;
      });
      r?.listen((n) => {
        if (!(0, i.C)(n.intent_id, e)) return;
        let a = o(n, "push", f());
        a &&
          (t.y.info("[bridgeQuoteWait] quote_from_push", {
            intent_id: e,
            quote_status: a.status,
            code: "failed" === a.status ? a.code : void 0,
            seq: n.seq,
          }),
          m?.(a));
      });
      let y = async () => {
          let i = 0;
          for (;;) {
            let a;
            try {
              a = await (0, n.M)(e, { signal: h.signal, waitQuoteMs: c });
            } catch (n) {
              if (h.signal.aborted) {
                if (d?.aborted) throw n;
                return b;
              }
              if (
                ((i += 1),
                t.y.warn("[bridgeQuoteWait] read_failed", {
                  intent_id: e,
                  attempt: i,
                  error: s(n),
                }),
                i >= 3)
              )
                return {
                  status: "failed",
                  code: "quote_unreadable",
                  source: "get",
                  waitMs: f(),
                };
              await l(250);
              continue;
            }
            i = 0;
            let r = u(a, f());
            if (r) return r;
          }
        },
        v = () => {
          (_(), d?.removeEventListener("abort", _));
        };
      try {
        g = await Promise.race([b, y()]);
      } catch (e) {
        throw (v(), e);
      }
      return (v(), g);
    };
  e.s(["f", 0, r, "Z", 0, d]);
};
