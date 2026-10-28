// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(149502),
    n = e.i(254667),
    i = e.i(313017),
    a = e.i(641947);
  e.i(22675);
  var r = e.i(371047),
    s = e.i(25572),
    l = e.i(526317);
  let o = { "x-pump-platform": "web" },
    u = () => {
      let e = t.default.env.NEXT_PUBLIC_BRIDGE_API_URL?.trim();
      return void 0 !== e && "" !== e
        ? e.replace(/\/+$/, "")
        : a.A
          ? "https://intents.pump.fun"
          : "";
    },
    d = async (e) => {
      let t;
      try {
        t = await e.json();
      } catch {
        t = void 0;
      }
      return new l.b({
        status: e.status,
        code: t?.code,
        message: t?.message ?? `Bridge request failed (${e.status})`,
      });
    },
    c = async ({ request: e, schema: t, label: a }) => {
      let r,
        s,
        c = u();
      if ("" === c)
        throw new l.b({
          code: "bridge_disabled",
          retryable: !1,
          message: "the bridge is not configured for this network",
        });
      let m = new URL(`${c}/${e.path.replace(/^\/+/, "")}`);
      for (let [t, n] of Object.entries(e.searchParams ?? {}))
        m.searchParams.set(t, n);
      try {
        r = await fetch(m, {
          method: e.method,
          credentials: "include",
          headers: {
            ...o,
            ...(0, i.z)(),
            ...(e.json ? { "content-type": "application/json" } : {}),
            ...e.headers,
          },
          body: e.json ? JSON.stringify(e.json) : void 0,
          signal: e.signal ?? AbortSignal.timeout(6e4),
        });
      } catch (e) {
        if (
          e instanceof DOMException
            ? "AbortError" === e.name || "TimeoutError" === e.name
            : e instanceof Error && "AbortError" === e.name
        )
          throw e;
        throw new l.b({
          retryable: !0,
          message:
            e instanceof Error ? e.message : "Network error calling the bridge",
        });
      }
      if (!r.ok) throw await d(r);
      try {
        s = await r.json();
      } catch {
        throw new l.b({ message: `malformed ${a} response` });
      }
      let g = t.safeParse(s);
      if (!g.success)
        throw (
          n.y.error(`[bridgeApi] Unexpected ${a} response shape`, {
            issues: g.error.issues,
          }),
          new l.b({ message: `malformed ${a} response` })
        );
      return g.data;
    };
  e.s([
    "f",
    0,
    (e, t = {}) =>
      c({
        request: {
          method: "POST",
          path: "v1/intents",
          json: { ...e, ...(0, s.c)() },
          headers: {
            ...(0, r.c)(),
            ...(t.idempotencyKey
              ? { "idempotency-key": t.idempotencyKey }
              : {}),
          },
          signal: t.signal,
        },
        schema: l.Z,
        label: "create-intent",
      }),
    "x",
    0,
    (e, t, n = {}) =>
      c({
        request: {
          method: "POST",
          path: "v1/intents/execute",
          json: { intent_id: e, ...t },
          signal: n.signal,
        },
        schema: l.P,
        label: "execute-intent",
      }),
    "M",
    0,
    (e, t = {}) =>
      c({
        request: {
          method: "GET",
          path: `v1/intents/${encodeURIComponent(e)}`,
          searchParams:
            void 0 === t.waitQuoteMs
              ? void 0
              : { wait_quote_ms: String(t.waitQuoteMs) },
          signal: t.signal,
        },
        schema: l.u,
        label: "intent",
      }),
    "o",
    0,
    (e, t = {}) =>
      c({
        request: {
          method: "POST",
          path: "v1/quotes",
          json: { ...e, ...(0, s.c)() },
          signal: t.signal,
        },
        schema: l.O,
        label: "quote",
      }),
    "l",
    0,
    ({ evmChainId: e, evmToken: t }, n = {}) =>
      c({
        request: {
          method: "GET",
          path: `v1/tokens/${e}/${encodeURIComponent(t)}`,
          signal: n.signal,
        },
        schema: l.m,
        label: "token-tradability",
      }),
    "z",
    0,
    () => `${u().replace(/^http/, "ws")}/v1/ws`,
    "_",
    0,
    () => "" !== u(),
  ]);
};
