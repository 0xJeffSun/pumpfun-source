// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "mfa_timeout",
    r = "mfa_verification_max_attempts_reached",
    n = new Set([t, r, "missing_or_invalid_mfa"]),
    i = (e) => {
      if ("string" == typeof e) return a(e, !1);
      if ("object" != typeof e || null === e) return "none";
      let i = "string" == typeof e.type ? e.type : void 0;
      return i === t
        ? "timeout"
        : i === r
          ? "max_attempts"
          : a(
              "string" == typeof e.message
                ? e.message
                : "string" == typeof e.error
                  ? e.error
                  : "",
              void 0 !== i && n.has(i),
            );
    },
    a = (e, t) => {
      let r = e.toLowerCase();
      return r.includes("mfa cancel")
        ? "cancelled"
        : r.includes("timed out waiting for mfa code")
          ? "timeout"
          : r.includes("max mfa verification attempts")
            ? "max_attempts"
            : r.includes("code 429") && (t || r.includes("mfa"))
              ? "rate_limited"
              : "none";
    };
  e.s(
    [
      "n",
      0,
      function (e) {
        let t = ((e) => {
          let t = e;
          for (let e = 0; e <= 4 && null != t; e += 1) {
            let e = i(t);
            if ("none" !== e) return e;
            if ("object" != typeof t) break;
            let r = t,
              n = r.cause ?? r.error;
            if ("string" == typeof n) return a(n, !1);
            t = n;
          }
          return "none";
        })(e);
        if ("cancelled" === t) return "mfa_cancelled";
        if ("timeout" === t) return "mfa_timeout";
        if ("max_attempts" === t || "rate_limited" === t)
          return "mfa_max_attempts";
        let r = { haystack: "", codes: [] };
        !(function e(t, r, n) {
          if (null == t || n > 4) return;
          if ("string" == typeof t) {
            r.haystack += ` ${t}`;
            return;
          }
          if ("object" != typeof t) return;
          for (let e of ["name", "message", "errorName"]) {
            let n = t[e];
            "string" == typeof n && (r.haystack += ` ${n}`);
          }
          let { code: i } = t;
          ("number" == typeof i
            ? r.codes.push(i)
            : "string" == typeof i &&
              /^-?\d+$/.test(i) &&
              r.codes.push(Number(i)),
            e(t.cause, r, n + 1),
            e(t.error, r, n + 1));
        })(e, r, 0);
        let n = r.haystack.toLowerCase();
        return /session_cookie_rejected/.test(n)
          ? "session_cookie_rejected"
          : r.codes.includes(4001) ||
              /user rejected|user denied|user cancel|rejected the request|rejected the signing|request rejected|\bcancell?ed\b|declin|dismiss/.test(
                n,
              )
            ? "user_rejected"
            : /must be authenticated to use their embedded wallet|must be authenticated before signing/.test(
                  n,
                )
              ? "privy_session_expired"
              : /failed to initialize embedded wallet proxy|unable to connect to wallet/.test(
                    n,
                  )
                ? "privy_wallet_unreachable"
                : /not been authorized|not authorized by|method and\/or account/.test(
                      n,
                    )
                  ? "not_authorized"
                  : /keyring|wallet is locked|is locked|please unlock|no active account|account not found|wallet not connected|does not support signmessage/.test(
                        n,
                      )
                    ? "wallet_unavailable"
                    : /failed to fetch|timed out|timeout|network ?error|load failed|err_|offline|connection (failed|refused|reset)|\bnetwork\b/.test(
                          n,
                        )
                      ? "network"
                      : "unknown";
      },
      "_",
      0,
      (e) =>
        "mfa_cancelled" === e ||
        "mfa_timeout" === e ||
        "mfa_max_attempts" === e,
    ],
    932177,
  );
};
