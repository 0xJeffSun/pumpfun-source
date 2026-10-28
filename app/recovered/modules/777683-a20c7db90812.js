// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let n = (t) => {
      if ("object" != typeof t || null === t) return null;
      let { response: n } = t;
      return n instanceof Response ? n : null;
    },
    e = (t) => n(t)?.status ?? null,
    o = (t) => ({
      minFollowers: "number" == typeof t.minFollowers ? t.minFollowers : 0,
      currentFollowers:
        "number" == typeof t.currentFollowers ? t.currentFollowers : 0,
    }),
    i = (t, n) =>
      "string" == typeof t && t.length > 0
        ? t
        : Array.isArray(t) && t.length > 0
          ? t.join(", ")
          : n,
    r = async (t) => {
      let e = n(t);
      if (!e) return null;
      try {
        let t = await e.clone().json(),
          n = "string" == typeof t.code ? t.code : null;
        if (!n) return null;
        if ("X_ACCOUNT_NOT_CONNECTED" === n)
          return {
            code: n,
            status: e.status,
            message: i(t.message, "Connect your X account to continue."),
          };
        if ("X_FOLLOWERS_BELOW_THRESHOLD" === n)
          return {
            code: n,
            status: e.status,
            message: i(
              t.message,
              "Your connected X account doesn't have enough followers yet.",
            ),
            ...o(t),
          };
        if ("PUMP_FOLLOWERS_BELOW_THRESHOLD" === n)
          return {
            code: n,
            status: e.status,
            message: i(
              t.message,
              "Your profile doesn't have enough followers yet.",
            ),
            ...o(t),
          };
        return { code: n, status: e.status, message: i(t.message, n) };
      } catch {
        return null;
      }
    },
    a = async (t, e) => {
      let o = n(t);
      if (o) {
        try {
          let t = await o.clone().json();
          if ("string" == typeof t.message) return t.message;
          if (Array.isArray(t.message) && t.message.length > 0)
            return t.message.join(", ");
          if (t.code) return s(t.code, e);
        } catch {}
        if (401 === o.status) return "Sign in again to continue.";
      }
      return (t instanceof Error && t.message) || e;
    },
    s = (t, n) =>
      "DUPLICATE_TOKEN_ACCOUNT" === t
        ? "Each escrow token account address must be unique."
        : "INVALID_TOKEN_ACCOUNT_ADDRESS" === t
          ? "Each escrow address must be a valid Solana token account."
          : "NO_ESCROW_TOKEN_ACCOUNTS" === t
            ? "Add at least one reward escrow token account before verifying funding."
            : "ESCROW_ALREADY_BOUND" === t
              ? "One or more escrow addresses are already reserved by another bounty."
              : "TASK_NOT_DRAFT" === t
                ? "Escrow accounts can only be registered on draft tasks."
                : "X_ACCOUNT_NOT_CONNECTED" === t
                  ? "Connect your X account to continue."
                  : "X_FOLLOWERS_BELOW_THRESHOLD" === t
                    ? "Your connected X account doesn't have enough followers yet."
                    : "PUMP_FOLLOWERS_BELOW_THRESHOLD" === t
                      ? "Your profile doesn't have enough followers yet."
                      : "INTENDED_REWARD_BELOW_MIN_USD" === t
                        ? "The total reward is below the minimum required for this bounty."
                        : "INTENDED_REWARD_VALUE_UNVERIFIABLE" === t
                          ? "We couldn't value your reward tokens. Try a different reward token."
                          : "INTENDED_REWARD_BALANCE_LOOKUP_FAILED" === t
                            ? "We couldn't read your wallet balances to value the reward. Try again."
                            : "NO_INTENDED_POOLS" === t
                              ? "Add at least one reward pool before publishing."
                              : "INVALID_ASSOCIATED_COIN_MINT" === t
                                ? "That associated coin address is not valid."
                                : n,
    l = async (t) => {
      let n = e(t);
      if (429 === n) return { kind: "rate_limited", status: n };
      if (401 === n) return { kind: "unauthenticated", status: n };
      let o = await r(t);
      return o?.code === "COMMENT_REJECTED"
        ? { kind: "restricted", status: o.status }
        : { kind: "other", status: n, code: o?.code ?? null };
    };
  t.s([
    "G",
    0,
    e,
    "s",
    0,
    (t) => t?.code === "PUMP_FOLLOWERS_BELOW_THRESHOLD",
    "y",
    0,
    (t) => t?.code === "X_FOLLOWERS_BELOW_THRESHOLD",
    "A",
    0,
    r,
    "u",
    0,
    a,
    "i",
    0,
    l,
  ]);
};
