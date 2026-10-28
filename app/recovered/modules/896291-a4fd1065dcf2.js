// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  class t extends Error {
    kind;
    status;
    retryAfterSec;
    constructor(e, t, n = null) {
      (super(`relay ${e}${null == t ? "" : ` (${t})`}`),
        (this.kind = e),
        (this.status = t),
        (this.retryAfterSec = n),
        (this.name = "RelayFailure"));
    }
  }
  let n = async (e) => {
    try {
      let t = await e.clone().json();
      if (t && "object" == typeof t && "error" in t) {
        let { error: e } = t;
        return { error: "string" == typeof e ? e : void 0 };
      }
      return null;
    } catch {
      return null;
    }
  };
  async function r(e) {
    let r = e.status,
      i = await n(e);
    if (401 === r && i?.error === "unauthenticated")
      return new t("relay_unauthenticated", 401);
    if (401 === r || 403 === r) return new t("upstream_401", r);
    if (429 === r) {
      let n = Number(e.headers.get("retry-after"));
      return new t("rate_limited", 429, Number.isFinite(n) && n > 0 ? n : null);
    }
    return 404 === r
      ? new t("not_found", 404)
      : 502 === r && i?.error === "relay_upstream_unavailable"
        ? new t("relay_unavailable", 502)
        : r >= 500
          ? new t("upstream_5xx", r)
          : new t("bad_request", r);
  }
  e.s([
    "o",
    0,
    (e) =>
      e instanceof t &&
      ("relay_unauthenticated" === e.kind || "upstream_401" === e.kind),
    "t",
    0,
    (e) =>
      e instanceof t &&
      ("upstream_5xx" === e.kind ||
        "relay_unavailable" === e.kind ||
        "timeout" === e.kind ||
        "network" === e.kind),
    "k",
    0,
    r,
    "T",
    0,
    function (e) {
      return e instanceof t
        ? e
        : e instanceof DOMException &&
            ("AbortError" === e.name || "TimeoutError" === e.name)
          ? new t("timeout", null)
          : new t("network", null);
    },
  ]);
};
