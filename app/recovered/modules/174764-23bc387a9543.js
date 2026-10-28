// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  async function t(e) {
    let t, n, i;
    try {
      n = await e("GET /auth/my-profile", {
        credentials: "include",
        headers: { "Cache-Control": "no-cache" },
        throwHttpErrors: !1,
        hooks: {
          afterResponse: [
            (e, n, i) => {
              t = i;
            },
          ],
        },
      });
    } catch (e) {
      i = e;
    }
    let r = t?.status ?? null;
    return {
      verdict:
        null === r
          ? "inconclusive"
          : (r >= 200 && r < 300) || 304 === r
            ? "ok"
            : 401 === r
              ? "rejected"
              : "inconclusive",
      status: r,
      payload: n,
      error: i,
    };
  }
  e.s(["f", 0, t]);
};
