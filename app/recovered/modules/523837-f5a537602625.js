// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617);
  class r extends t.f {
    constructor() {
      super(
        "No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.",
        { docsPath: "/docs/clients/intro", name: "UrlRequiredError" },
      );
    }
  }
  e.s(["f", 0, r], 523837);
  var s = e.i(503725),
    n = e.i(393547);
  let o = {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    },
  };
  e.s(
    [
      "f",
      0,
      function (e, t = {}) {
        return {
          async request(r) {
            let {
                body: i,
                fetchFn: a = t.fetchFn ?? fetch,
                onRequest: c = t.onRequest,
                onResponse: u = t.onResponse,
                timeout: l = t.timeout ?? 1e4,
              } = r,
              d = { ...(t.fetchOptions ?? {}), ...(r.fetchOptions ?? {}) },
              { headers: h, method: f, signal: p } = d;
            try {
              let t,
                r = await (function (
                  e,
                  {
                    errorInstance: t = Error("timed out"),
                    timeout: r,
                    signal: s,
                  },
                ) {
                  return new Promise((n, o) => {
                    (async () => {
                      let i;
                      try {
                        let a = new AbortController();
                        (r > 0 &&
                          (i = setTimeout(() => {
                            s ? a.abort() : o(t);
                          }, r)),
                          n(await e({ signal: a?.signal || null })));
                      } catch (e) {
                        (e?.name === "AbortError" && o(t), o(e));
                      } finally {
                        clearTimeout(i);
                      }
                    })();
                  });
                })(
                  async ({ signal: t }) => {
                    let r = {
                        ...d,
                        body: Array.isArray(i)
                          ? (0, n.f)(
                              i.map((e) => ({
                                jsonrpc: "2.0",
                                id: e.id ?? o.take(),
                                ...e,
                              })),
                            )
                          : (0, n.f)({
                              jsonrpc: "2.0",
                              id: i.id ?? o.take(),
                              ...i,
                            }),
                        headers: { "Content-Type": "application/json", ...h },
                        method: f || "POST",
                        signal: p || (l > 0 ? t : null),
                      },
                      s = new Request(e, r),
                      u = (await c?.(s, r)) ?? { ...r, url: e };
                    return await a(u.url ?? e, u);
                  },
                  {
                    errorInstance: new s.t({ body: i, url: e }),
                    timeout: l,
                    signal: !0,
                  },
                );
              if (
                (u && (await u(r)),
                r.headers.get("Content-Type")?.startsWith("application/json"))
              )
                t = await r.json();
              else {
                t = await r.text();
                try {
                  t = JSON.parse(t || "{}");
                } catch (e) {
                  if (r.ok) throw e;
                  t = { error: t };
                }
              }
              if (!r.ok)
                throw new s.y({
                  body: i,
                  details: (0, n.f)(t.error) || r.statusText,
                  headers: r.headers,
                  status: r.status,
                  url: e,
                });
              return t;
            } catch (t) {
              if (t instanceof s.y || t instanceof s.t) throw t;
              throw new s.y({ body: i, cause: t, url: e });
            }
          },
        };
      },
    ],
    443481,
  );
};
