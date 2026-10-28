// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(342652),
    i = e.i(577696);
  let a = (e) => `Hyperliquid perps request failed: ${e}`,
    s = ({ path: e, error: r, logLevel: i }) => {
      let a = void 0 !== r.status && r.status >= 400 && r.status < 500;
      t.y["warn" === i || ("refusal-warn" === i && a) ? "warn" : "error"](
        `[perps] ${e} failed`,
        {
          path: e,
          code: r.status ?? "network",
          reason: r.reason ?? "unknown",
          retryable: r.retryable,
        },
      );
    },
    n = async ({
      path: e,
      json: t,
      retryLimit: n,
      timeoutMs: o,
      txEncoding: d,
      signal: l,
      logLevel: u = "error",
    }) => {
      let p;
      try {
        p = await (0, r.b)(e, t, {
          retryLimit: n,
          timeoutMs: o,
          txEncoding: d,
          signal: l,
        });
      } catch (r) {
        if (l?.aborted) throw r;
        let t = (0, i.q)({ error: r, fallbackMessage: a(e) });
        throw (s({ path: e, error: t, logLevel: u }), t);
      }
      if (p.status < 200 || p.status >= 300) {
        let t = (0, i.C)({
          status: p.status,
          body: p.body,
          fallbackMessage: a(e),
        });
        throw (s({ path: e, error: t, logLevel: u }), t);
      }
      return p.body;
    };
  e.s([
    "b",
    0,
    {
      openPreview: "transactions/perp-open-preview",
      openBuild: "transactions/perp-open-build",
      relayStatus: "transactions/perp-relay-status",
      actionsBuild: "transactions/perp-actions-build",
      actionsSend: "transactions/perp-actions-send",
      withdrawBuild: "transactions/perp-withdraw-build",
      withdrawSend: "transactions/perp-withdraw-send",
    },
    "t",
    0,
    45e3,
    "E",
    0,
    ({ schema: e, body: r, label: a }) => {
      let s = e.safeParse(r);
      if (!s.success)
        throw (
          t.y.error(`[perps] ${a}: unexpected response shape`, {
            label: a,
            issues: s.error.issues.length,
          }),
          new i.b({
            message: `Failed to ${a}: unexpected response shape`,
            retryable: !1,
          })
        );
      return s.data;
    },
    "m",
    0,
    n,
  ]);
};
