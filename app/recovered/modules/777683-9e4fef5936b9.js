// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => {
      if ("object" != typeof e || null === e) return null;
      let { response: t } = e;
      return t instanceof Response ? t : null;
    },
    r = (e) => t(e)?.status ?? null,
    n = (e) => ({
      minFollowers: "number" == typeof e.minFollowers ? e.minFollowers : 0,
      currentFollowers:
        "number" == typeof e.currentFollowers ? e.currentFollowers : 0,
    }),
    i = (e, t) =>
      "string" == typeof e && e.length > 0
        ? e
        : Array.isArray(e) && e.length > 0
          ? e.join(", ")
          : t,
    o = async (e) => {
      let r = t(e);
      if (!r) return null;
      try {
        let e = await r.clone().json(),
          t = "string" == typeof e.code ? e.code : null;
        if (!t) return null;
        if ("X_ACCOUNT_NOT_CONNECTED" === t)
          return {
            code: t,
            status: r.status,
            message: i(e.message, "Connect your X account to continue."),
          };
        if ("X_FOLLOWERS_BELOW_THRESHOLD" === t)
          return {
            code: t,
            status: r.status,
            message: i(
              e.message,
              "Your connected X account doesn't have enough followers yet.",
            ),
            ...n(e),
          };
        if ("PUMP_FOLLOWERS_BELOW_THRESHOLD" === t)
          return {
            code: t,
            status: r.status,
            message: i(
              e.message,
              "Your profile doesn't have enough followers yet.",
            ),
            ...n(e),
          };
        return { code: t, status: r.status, message: i(e.message, t) };
      } catch {
        return null;
      }
    },
    s = async (e, r) => {
      let n = t(e);
      if (n) {
        try {
          let e = await n.clone().json();
          if ("string" == typeof e.message) return e.message;
          if (Array.isArray(e.message) && e.message.length > 0)
            return e.message.join(", ");
          if (e.code) return a(e.code, r);
        } catch {}
        if (401 === n.status) return "Sign in again to continue.";
      }
      return (e instanceof Error && e.message) || r;
    },
    a = (e, t) =>
      "DUPLICATE_TOKEN_ACCOUNT" === e
        ? "Each escrow token account address must be unique."
        : "INVALID_TOKEN_ACCOUNT_ADDRESS" === e
          ? "Each escrow address must be a valid Solana token account."
          : "NO_ESCROW_TOKEN_ACCOUNTS" === e
            ? "Add at least one reward escrow token account before verifying funding."
            : "ESCROW_ALREADY_BOUND" === e
              ? "One or more escrow addresses are already reserved by another bounty."
              : "TASK_NOT_DRAFT" === e
                ? "Escrow accounts can only be registered on draft tasks."
                : "X_ACCOUNT_NOT_CONNECTED" === e
                  ? "Connect your X account to continue."
                  : "X_FOLLOWERS_BELOW_THRESHOLD" === e
                    ? "Your connected X account doesn't have enough followers yet."
                    : "PUMP_FOLLOWERS_BELOW_THRESHOLD" === e
                      ? "Your profile doesn't have enough followers yet."
                      : "INTENDED_REWARD_BELOW_MIN_USD" === e
                        ? "The total reward is below the minimum required for this bounty."
                        : "INTENDED_REWARD_VALUE_UNVERIFIABLE" === e
                          ? "We couldn't value your reward tokens. Try a different reward token."
                          : "INTENDED_REWARD_BALANCE_LOOKUP_FAILED" === e
                            ? "We couldn't read your wallet balances to value the reward. Try again."
                            : "NO_INTENDED_POOLS" === e
                              ? "Add at least one reward pool before publishing."
                              : "INVALID_ASSOCIATED_COIN_MINT" === e
                                ? "That associated coin address is not valid."
                                : t,
    l = async (e) => {
      let t = r(e);
      if (429 === t) return { kind: "rate_limited", status: t };
      if (401 === t) return { kind: "unauthenticated", status: t };
      let n = await o(e);
      return n?.code === "COMMENT_REJECTED"
        ? { kind: "restricted", status: n.status }
        : { kind: "other", status: t, code: n?.code ?? null };
    };
  e.s([
    "G",
    0,
    r,
    "s",
    0,
    (e) => e?.code === "PUMP_FOLLOWERS_BELOW_THRESHOLD",
    "y",
    0,
    (e) => e?.code === "X_FOLLOWERS_BELOW_THRESHOLD",
    "A",
    0,
    o,
    "u",
    0,
    s,
    "i",
    0,
    l,
  ]);
};
