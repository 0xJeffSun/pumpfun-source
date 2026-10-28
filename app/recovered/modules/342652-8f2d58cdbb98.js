// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(313017),
    r = e.i(503630);
  e.i(22675);
  var n = e.i(371047),
    i = e.i(233404);
  let a = (e) => Math.min(600 * 2 ** (e - 1), 1200),
    o = (e) => e >= 500 || 429 === e,
    s = (e) => new Promise((t) => setTimeout(t, e)),
    l = (e, t) => {
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
  async function u(e, t, r = {}) {
    return c({ method: "POST", path: e, json: t, options: r });
  }
  async function d(e, t = {}) {
    return c({ method: "GET", path: e, options: t });
  }
  async function c({ method: e, path: u, json: d, options: f }) {
    let m,
      p = (0, r.t)().replace(/\/+$/, ""),
      y = `${p}/${u.replace(/^\/+/, "")}`,
      h = f.retryLimit ?? 2,
      g = f.timeoutMs ?? 3e4;
    for (let r = 0; r <= h; r++) {
      let u, c;
      if ((r > 0 && (await s(a(r))), f.signal?.aborted)) throw f.signal.reason;
      let p = l(f.signal, g);
      try {
        u = await fetch(y, {
          method: e,
          headers:
            "POST" === e
              ? {
                  "Content-Type": "application/json",
                  ...(0, n.c)(f.txEncoding),
                  ...(0, t.z)(),
                }
              : (0, t.z)(),
          ...("POST" === e ? { body: JSON.stringify((0, i.Y)(d ?? {})) } : {}),
          signal: p.signal,
        });
      } catch (e) {
        if ((p.release(), f.signal?.aborted)) throw e;
        m = e;
        continue;
      }
      if (o(u.status) && r < h) {
        p.release();
        continue;
      }
      try {
        c = await u.json();
      } catch {
        c = void 0;
      } finally {
        p.release();
      }
      return { status: u.status, body: c };
    }
    throw m instanceof Error
      ? m
      : Error("Network error calling blockchain-api-service");
  }
  e.s(["p", 0, d, "b", 0, u]);
};
