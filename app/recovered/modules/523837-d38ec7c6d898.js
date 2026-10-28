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
  var n = e.i(503725),
    o = e.i(393547);
  let s = {
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
                body: a,
                fetchFn: i = t.fetchFn ?? fetch,
                onRequest: c = t.onRequest,
                onResponse: u = t.onResponse,
                timeout: d = t.timeout ?? 1e4,
              } = r,
              l = { ...(t.fetchOptions ?? {}), ...(r.fetchOptions ?? {}) },
              { headers: f, method: p, signal: h } = l;
            try {
              let t,
                r = await (function (
                  e,
                  {
                    errorInstance: t = Error("timed out"),
                    timeout: r,
                    signal: n,
                  },
                ) {
                  return new Promise((o, s) => {
                    (async () => {
                      let a;
                      try {
                        let i = new AbortController();
                        (r > 0 &&
                          (a = setTimeout(() => {
                            n ? i.abort() : s(t);
                          }, r)),
                          o(await e({ signal: i?.signal || null })));
                      } catch (e) {
                        (e?.name === "AbortError" && s(t), s(e));
                      } finally {
                        clearTimeout(a);
                      }
                    })();
                  });
                })(
                  async ({ signal: t }) => {
                    let r = {
                        ...l,
                        body: Array.isArray(a)
                          ? (0, o.f)(
                              a.map((e) => ({
                                jsonrpc: "2.0",
                                id: e.id ?? s.take(),
                                ...e,
                              })),
                            )
                          : (0, o.f)({
                              jsonrpc: "2.0",
                              id: a.id ?? s.take(),
                              ...a,
                            }),
                        headers: { "Content-Type": "application/json", ...f },
                        method: p || "POST",
                        signal: h || (d > 0 ? t : null),
                      },
                      n = new Request(e, r),
                      u = (await c?.(n, r)) ?? { ...r, url: e };
                    return await i(u.url ?? e, u);
                  },
                  {
                    errorInstance: new n.t({ body: a, url: e }),
                    timeout: d,
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
                throw new n.y({
                  body: a,
                  details: (0, o.f)(t.error) || r.statusText,
                  headers: r.headers,
                  status: r.status,
                  url: e,
                });
              return t;
            } catch (t) {
              if (t instanceof n.y || t instanceof n.t) throw t;
              throw new n.y({ body: a, cause: t, url: e });
            }
          },
        };
      },
    ],
    443481,
  );
};
