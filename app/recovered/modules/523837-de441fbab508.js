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
    a = e.i(393547);
  let i = {
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
                body: s,
                fetchFn: o = t.fetchFn ?? fetch,
                onRequest: c = t.onRequest,
                onResponse: l = t.onResponse,
                timeout: u = t.timeout ?? 1e4,
              } = r,
              f = { ...(t.fetchOptions ?? {}), ...(r.fetchOptions ?? {}) },
              { headers: d, method: p, signal: h } = f;
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
                  return new Promise((a, i) => {
                    (async () => {
                      let s;
                      try {
                        let o = new AbortController();
                        (r > 0 &&
                          (s = setTimeout(() => {
                            n ? o.abort() : i(t);
                          }, r)),
                          a(await e({ signal: o?.signal || null })));
                      } catch (e) {
                        (e?.name === "AbortError" && i(t), i(e));
                      } finally {
                        clearTimeout(s);
                      }
                    })();
                  });
                })(
                  async ({ signal: t }) => {
                    let r = {
                        ...f,
                        body: Array.isArray(s)
                          ? (0, a.f)(
                              s.map((e) => ({
                                jsonrpc: "2.0",
                                id: e.id ?? i.take(),
                                ...e,
                              })),
                            )
                          : (0, a.f)({
                              jsonrpc: "2.0",
                              id: s.id ?? i.take(),
                              ...s,
                            }),
                        headers: { "Content-Type": "application/json", ...d },
                        method: p || "POST",
                        signal: h || (u > 0 ? t : null),
                      },
                      n = new Request(e, r),
                      l = (await c?.(n, r)) ?? { ...r, url: e };
                    return await o(l.url ?? e, l);
                  },
                  {
                    errorInstance: new n.t({ body: s, url: e }),
                    timeout: u,
                    signal: !0,
                  },
                );
              if (
                (l && (await l(r)),
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
                  body: s,
                  details: (0, a.f)(t.error) || r.statusText,
                  headers: r.headers,
                  status: r.status,
                  url: e,
                });
              return t;
            } catch (t) {
              if (t instanceof n.y || t instanceof n.t) throw t;
              throw new n.y({ body: s, cause: t, url: e });
            }
          },
        };
      },
    ],
    443481,
  );
};
