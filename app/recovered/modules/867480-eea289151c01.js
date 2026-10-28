// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => !0 === e.standardWallet.isPrivyWallet;
  e.s(["f", 0, t], 23729);
  let n = {
      google_oauth: "google",
      apple_oauth: "apple",
      twitter_oauth: "twitter",
      github_oauth: "github",
      email: "email",
    },
    r = ({ user: e, walletAddress: t }) =>
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
    o = (e) => ("string" == typeof e && "" !== e ? e : void 0),
    s = (e, t) => {
      if ("email" === t) {
        let t = o(e.address);
        return t ? { value: t, kind: "email" } : void 0;
      }
      if ("twitter" === t || "github" === t) {
        let t = o(e.username);
        return t ? { value: `@${t}`, kind: "handle" } : void 0;
      }
      let n = o(e.email);
      return n ? { value: n, kind: "email" } : void 0;
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
        for (let r of e.linkedAccounts ?? []) {
          let e = n[r.type];
          e && t.push(e);
        }
        return t;
      },
      "E",
      0,
      (e) => {
        let t = [];
        for (let r of e.linkedAccounts ?? []) {
          let e = n[r.type];
          if (!e) continue;
          let i = s(r, e);
          t.push({ provider: e, ...(i ? { identifier: i } : {}) });
        }
        return t;
      },
      "d",
      0,
      (e) => {
        let t = !1,
          n = !1;
        for (let r of e.linkedAccounts ?? [])
          "wallet" === r.type &&
            "privy" === r.walletClientType &&
            ("solana" === r.chainType && (t = !0),
            "ethereum" === r.chainType && (n = !0));
        return { solana: t, evm: n };
      },
      "F",
      0,
      (e, n) => {
        let r = e.filter(t);
        if (n) {
          let e = r.find((e) => e.address === n);
          if (e) return e;
        }
        return r[0];
      },
      "R",
      0,
      ({ user: e, walletAddress: t, sessionAddress: n }) =>
        e
          ? r({ user: e, walletAddress: t })
            ? n === t
              ? { action: "hydrate" }
              : { action: "sign_in", ...(n ? { reboundFromAddress: n } : {}) }
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
      r,
    ],
    867480,
  );
};
