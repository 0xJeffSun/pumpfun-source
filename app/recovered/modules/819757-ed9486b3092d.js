// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030);
  let r = {
      400: "web.errors.http.bad_request",
      401: "web.errors.http.unauthenticated",
      403: "web.errors.http.forbidden",
      404: "web.errors.http.not_found",
      409: "web.errors.http.conflict",
      413: "web.errors.http.payload_too_large",
      422: "web.errors.http.unprocessable",
      429: "web.errors.http.rate_limited",
      503: "web.errors.http.unavailable",
    },
    n = (e, t) =>
      void 0 !== e && null !== t && Object.hasOwn(e, t) ? e[t] : void 0;
  e.s([
    "M",
    0,
    (e) =>
      (0, t.isContractError)(e)
        ? { route: e.route, status: e.status, code: e.code ?? "none" }
        : {},
    "I",
    0,
    (e, o, i) => {
      let s = i.fallback ?? "web.errors.http.unknown";
      if (
        !(0, t.isContractError)(e) ||
        !(Array.isArray(o) ? o : [o]).includes(e.route)
      )
        return s;
      let a = n(i.codes, e.code);
      if (void 0 !== a) return a;
      let l = n(i.statuses, e.status);
      return void 0 !== l ? l : Object.hasOwn(r, e.status) ? r[e.status] : s;
    },
    "v",
    0,
    (e) =>
      null != e && Object.hasOwn(r, e) ? r[e] : "web.errors.http.unknown",
  ]);
};
