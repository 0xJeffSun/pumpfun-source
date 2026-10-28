// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(149502),
    i = e.i(254667),
    n = e.i(313017),
    s = e.i(641947);
  e.i(22675);
  var l = e.i(371047),
    r = e.i(25572),
    a = e.i(526317);
  let o = { "x-pump-platform": "web" },
    u = () => {
      let e = t.default.env.NEXT_PUBLIC_BRIDGE_API_URL?.trim();
      return void 0 !== e && "" !== e
        ? e.replace(/\/+$/, "")
        : s.A
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
      return new a.b({
        status: e.status,
        code: t?.code,
        message: t?.message ?? `Bridge request failed (${e.status})`,
      });
    },
    c = async ({ request: e, schema: t, label: s }) => {
      let l,
        r,
        c = u();
      if ("" === c)
        throw new a.b({
          code: "bridge_disabled",
          retryable: !1,
          message: "the bridge is not configured for this network",
        });
      let m = new URL(`${c}/${e.path.replace(/^\/+/, "")}`);
      for (let [t, i] of Object.entries(e.searchParams ?? {}))
        m.searchParams.set(t, i);
      try {
        l = await fetch(m, {
          method: e.method,
          credentials: "include",
          headers: {
            ...o,
            ...(0, n.z)(),
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
        throw new a.b({
          retryable: !0,
          message:
            e instanceof Error ? e.message : "Network error calling the bridge",
        });
      }
      if (!l.ok) throw await d(l);
      try {
        r = await l.json();
      } catch {
        throw new a.b({ message: `malformed ${s} response` });
      }
      let _ = t.safeParse(r);
      if (!_.success)
        throw (
          i.y.error(`[bridgeApi] Unexpected ${s} response shape`, {
            issues: _.error.issues,
          }),
          new a.b({ message: `malformed ${s} response` })
        );
      return _.data;
    };
  e.s([
    "f",
    0,
    (e, t = {}) =>
      c({
        request: {
          method: "POST",
          path: "v1/intents",
          json: { ...e, ...(0, r.c)() },
          headers: {
            ...(0, l.c)(),
            ...(t.idempotencyKey
              ? { "idempotency-key": t.idempotencyKey }
              : {}),
          },
          signal: t.signal,
        },
        schema: a.Z,
        label: "create-intent",
      }),
    "x",
    0,
    (e, t, i = {}) =>
      c({
        request: {
          method: "POST",
          path: "v1/intents/execute",
          json: { intent_id: e, ...t },
          signal: i.signal,
        },
        schema: a.P,
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
        schema: a.u,
        label: "intent",
      }),
    "o",
    0,
    (e, t = {}) =>
      c({
        request: {
          method: "POST",
          path: "v1/quotes",
          json: { ...e, ...(0, r.c)() },
          signal: t.signal,
        },
        schema: a.O,
        label: "quote",
      }),
    "l",
    0,
    ({ evmChainId: e, evmToken: t }, i = {}) =>
      c({
        request: {
          method: "GET",
          path: `v1/tokens/${e}/${encodeURIComponent(t)}`,
          signal: i.signal,
        },
        schema: a.m,
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
