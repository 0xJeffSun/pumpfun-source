// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => !0 === e.standardWallet.isPrivyWallet;
  e.s(["f", 0, t], 23729);
  let r = {
      google_oauth: "google",
      apple_oauth: "apple",
      twitter_oauth: "twitter",
      github_oauth: "github",
      email: "email",
    },
    n = ({ user: e, walletAddress: t }) =>
      (e.linkedAccounts ?? []).some(
        (e) =>
          "wallet" === e.type &&
          "privy" === e.walletClientType &&
          "solana" === e.chainType &&
          e.address === t,
      ),
    i = (e) =>
      (e.linkedAccounts ?? []).some(
        (e) =>
          "wallet" === e.type &&
          "privy" === e.walletClientType &&
          "solana" === e.chainType,
      ),
    l = (e) => ("string" == typeof e && "" !== e ? e : void 0),
    a = (e, t) => {
      if ("email" === t) {
        let t = l(e.address);
        return t ? { value: t, kind: "email" } : void 0;
      }
      if ("twitter" === t || "github" === t) {
        let t = l(e.username);
        return t ? { value: `@${t}`, kind: "handle" } : void 0;
      }
      let r = l(e.email);
      return r ? { value: r, kind: "email" } : void 0;
    };
  e.s(
    [
      "n",
      0,
      (e) => {
        let t = (e.linkedAccounts ?? []).find(
          (e) =>
            "wallet" === e.type &&
            "privy" === e.walletClientType &&
            "ethereum" === e.chainType,
        );
        return t && "address" in t ? t.address : null;
      },
      "b",
      0,
      (e) => {
        let t = [];
        for (let n of e.linkedAccounts ?? []) {
          let e = r[n.type];
          e && t.push(e);
        }
        return t;
      },
      "E",
      0,
      (e) => {
        let t = [];
        for (let n of e.linkedAccounts ?? []) {
          let e = r[n.type];
          if (!e) continue;
          let i = a(n, e);
          t.push({ provider: e, ...(i ? { identifier: i } : {}) });
        }
        return t;
      },
      "d",
      0,
      (e) => {
        let t = !1,
          r = !1;
        for (let n of e.linkedAccounts ?? [])
          "wallet" === n.type &&
            "privy" === n.walletClientType &&
            ("solana" === n.chainType && (t = !0),
            "ethereum" === n.chainType && (r = !0));
        return { solana: t, evm: r };
      },
      "F",
      0,
      (e, r) => {
        let n = e.filter(t);
        if (r) {
          let e = n.find((e) => e.address === r);
          if (e) return e;
        }
        return n[0];
      },
      "R",
      0,
      ({ user: e, walletAddress: t, sessionAddress: r }) =>
        e
          ? n({ user: e, walletAddress: t })
            ? r === t
              ? { action: "hydrate" }
              : { action: "sign_in", ...(r ? { reboundFromAddress: r } : {}) }
            : { action: "none", reason: "wallet_not_owned" }
          : { action: "none", reason: "no_privy_user" },
      "z",
      0,
      i,
      "J",
      0,
      (e) =>
        (e.linkedAccounts ?? []).some(
          (e) => "wallet" === e.type && "solana" === e.chainType,
        ) && !i(e),
      "H",
      0,
      n,
    ],
    867480,
  );
};
