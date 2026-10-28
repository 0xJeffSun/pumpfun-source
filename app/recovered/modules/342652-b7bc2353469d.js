// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(313017),
    r = e.i(503630);
  e.i(22675);
  var n = e.i(371047),
    i = e.i(233404);
  let o = (e) => Math.min(600 * 2 ** (e - 1), 1200),
    a = (e) => e >= 500 || 429 === e,
    s = (e) => new Promise((t) => setTimeout(t, e)),
    u = (e, t) => {
      let r = new AbortController(),
        n = setTimeout(
          () =>
            r.abort(
              new DOMException(
                `Request timed out after ${t} ms`,
                "TimeoutError",
              ),
            ),
          t,
        ),
        i = () => r.abort(e?.reason);
      return (
        e?.aborted ? i() : e?.addEventListener("abort", i, { once: !0 }),
        {
          signal: r.signal,
          release: () => {
            (clearTimeout(n), e?.removeEventListener("abort", i));
          },
        }
      );
    };
  async function c(e, t, r = {}) {
    return d({ method: "POST", path: e, json: t, options: r });
  }
  async function l(e, t = {}) {
    return d({ method: "GET", path: e, options: t });
  }
  async function d({ method: e, path: c, json: l, options: f }) {
    let p,
      m = (0, r.t)().replace(/\/+$/, ""),
      h = `${m}/${c.replace(/^\/+/, "")}`,
      y = f.retryLimit ?? 2,
      g = f.timeoutMs ?? 3e4;
    for (let r = 0; r <= y; r++) {
      let c, d;
      if ((r > 0 && (await s(o(r))), f.signal?.aborted)) throw f.signal.reason;
      let m = u(f.signal, g);
      try {
        c = await fetch(h, {
          method: e,
          headers:
            "POST" === e
              ? {
                  "Content-Type": "application/json",
                  ...(0, n.c)(f.txEncoding),
                  ...(0, t.z)(),
                }
              : (0, t.z)(),
          ...("POST" === e ? { body: JSON.stringify((0, i.Y)(l ?? {})) } : {}),
          signal: m.signal,
        });
      } catch (e) {
        if ((m.release(), f.signal?.aborted)) throw e;
        p = e;
        continue;
      }
      if (a(c.status) && r < y) {
        m.release();
        continue;
      }
      try {
        d = await c.json();
      } catch {
        d = void 0;
      } finally {
        m.release();
      }
      return { status: c.status, body: d };
    }
    throw p instanceof Error
      ? p
      : Error("Network error calling blockchain-api-service");
  }
  e.s(["p", 0, l, "b", 0, c]);
};
