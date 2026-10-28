// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(944410),
    l = e.i(690877),
    n = e.i(779106),
    a = e.i(402030),
    r = e.i(819757),
    s = e.i(890088);
  let o = "GET /users/me/x-link-request",
    c = "POST /users/me/x-link-request",
    d = "DELETE /users/me/socials/twitter",
    u = [o, c, d],
    x = (e) => u.some((t) => (0, a.isContractError)(e, t)),
    m = {
      codes: {
        PROFILE_NOT_MIRRORED: "web.x_link.error_profile_not_ready",
        USER_BANNED: "web.x_link.error_banned",
        WALLET_REQUIRED: "web.x_link.error_wallet_required",
        X_ACCOUNT_NOT_FOUND: "web.x_link.error_account_not_found",
        X_ALREADY_LINKED: "web.x_link.error_already_linked",
        X_BIO_WALLET_NOT_FOUND: "web.x_link.error_bio_wallet_not_found",
        X_HANDLE_INVALID: "web.x_link.error_handle_invalid",
        X_HANDLE_TAKEN: "web.x_link.error_handle_taken",
        X_LINK_REQUEST_COOLDOWN: "web.x_link.error_cooldown",
        X_LINK_REQUEST_PENDING: "web.x_link.error_request_pending",
      },
      statuses: {
        429: "web.x_link.error_rate_limited",
        503: "web.x_link.error_unavailable",
      },
      fallback: "web.x_link.error_unavailable",
    },
    f = new Set([
      "X_HANDLE_INVALID",
      "X_HANDLE_TAKEN",
      "X_ACCOUNT_NOT_FOUND",
      "X_BIO_WALLET_NOT_FOUND",
    ]);
  e.s(
    [
      "O",
      0,
      c,
      "D",
      0,
      o,
      "C",
      0,
      d,
      "h",
      0,
      ({ error: e, t, locale: i, handle: l }) => {
        let n = (0, r.I)(e, u, m);
        if (!x(e)) return t(n);
        switch (e.code) {
          case "X_LINK_REQUEST_COOLDOWN": {
            let l = ((e) => {
              if (void 0 === e) return;
              let t = new Date(e).getTime();
              return Number.isNaN(t) ? void 0 : t;
            })(
              ((e, t) => {
                let i = e.data;
                if ("object" != typeof i || null === i || !(t in i)) return;
                let l = i[t];
                return "string" == typeof l ? l : void 0;
              })(e, "retryAt"),
            );
            return void 0 === l
              ? t("web.x_link.error_cooldown_undated")
              : t("web.x_link.error_cooldown", {
                  date: (0, s.u)({ locale: i, timestampMs: l }),
                });
          }
          case "X_ACCOUNT_NOT_FOUND":
          case "X_BIO_WALLET_NOT_FOUND":
            return t(n, { handle: l ?? "" });
          default:
            return t(n);
        }
      },
      "a",
      0,
      x,
      "f",
      0,
      (e) => x(e) && null !== e.code && f.has(e.code),
    ],
    905208,
  );
  let b = ["x-link"],
    p = (e) => [...b, "request-state", e ?? ""];
  e.s(
    [
      "g",
      0,
      b,
      "L",
      0,
      () => {
        let e,
          a,
          r,
          s = (0, t.c)(8),
          c = (0, i.useClientServerContract)(),
          d = (0, n.f)("x-link");
        s[0] !== d ? ((e = p(d)), (s[0] = d), (s[1] = e)) : (e = s[1]);
        let u = null !== d;
        return (
          s[2] !== c
            ? ((a = (e) => {
                let { signal: t } = e;
                return c(o, { signal: t, retry: 0 });
              }),
              (s[2] = c),
              (s[3] = a))
            : (a = s[3]),
          s[4] !== e || s[5] !== u || s[6] !== a
            ? ((r = {
                queryKey: e,
                enabled: u,
                staleTime: 6e4,
                retry: !1,
                queryFn: a,
              }),
              (s[4] = e),
              (s[5] = u),
              (s[6] = a),
              (s[7] = r))
            : (r = s[7]),
          (0, l.useQuery)(r)
        );
      },
      "X",
      0,
      p,
    ],
    799484,
  );
};
