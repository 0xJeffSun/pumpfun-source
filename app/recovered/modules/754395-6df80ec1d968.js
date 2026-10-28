// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(
    [
      "f",
      0,
      {
        user_rejected: "web.auth.wallet_login_user_rejected",
        not_authorized: "web.auth.wallet_login_not_authorized",
        wallet_unavailable: "web.auth.wallet_login_wallet_unavailable",
        privy_session_expired: "web.auth.wallet_login_privy_session_expired",
        privy_wallet_unreachable:
          "web.auth.wallet_login_privy_wallet_unreachable",
        network: "web.auth.wallet_login_network",
        session_cookie_rejected:
          "web.auth.wallet_login_session_cookie_rejected",
        mfa_cancelled: "web.auth.wallet_login_mfa_cancelled",
        mfa_timeout: "web.auth.wallet_login_mfa_timeout",
        mfa_max_attempts: "web.auth.wallet_login_mfa_max_attempts",
        unknown: "web.auth.wallet_login_unknown",
      },
    ],
    754395,
  );
  var t = e.i(445242);
  e.i(12692);
  var r = e.i(398902),
    n = e.i(356647),
    i = e.i(187611);
  e.s(
    [
      "f",
      0,
      () => {
        let e,
          a = (0, t.c)(2),
          { i18n: l } = (0, r.f)();
        return (
          a[0] !== l.language
            ? ((e = (0, i.T)(
                new Intl.DateTimeFormat(l.language, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                }).format(n.A),
                "date-format",
              )),
              (a[0] = l.language),
              (a[1] = e))
            : (e = a[1]),
          e
        );
      },
    ],
    396466,
  );
};
