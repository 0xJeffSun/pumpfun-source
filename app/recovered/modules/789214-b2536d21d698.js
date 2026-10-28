// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(812768);
  let r = "x-privy-id-token",
    n = ["google", "apple", "twitter", "email", "privy"],
    i = async (e) => {
      if (!(e instanceof t.f) || 409 !== e.response.status) return null;
      try {
        let t,
          r = await e.response.clone().json();
        if ("PRIVY_LINK_WALLET_ALREADY_LINKED" !== r.error) return null;
        return ((t = r.provider), "string" == typeof t && n.includes(t))
          ? r.provider
          : "privy";
      } catch {
        return null;
      }
    },
    l = "PRIVY_LINK_MFA_ENROLLED",
    a = async (e) => {
      if (!(e instanceof t.f) || 409 !== e.response.status) return null;
      try {
        let t = await e.response.clone().json();
        if (t.error !== l && t.code !== l) return null;
        let r = t.mfaMethods ?? t.data?.mfaMethods;
        return Array.isArray(r) ? r.filter((e) => "string" == typeof e) : [];
      } catch {
        return null;
      }
    };
  e.s([
    "T",
    0,
    r,
    "i",
    0,
    ({ client: e }) => e.get("privy-link/status", { timeout: 15e3 }).json(),
    "X",
    0,
    ({ client: e, body: t, privyIdentityToken: n }) =>
      e
        .post("privy-link/finalize", {
          json: t,
          headers: { [r]: n },
          timeout: 15e3,
        })
        .then(() => void 0),
    "q",
    0,
    ({ client: e, body: t }) =>
      e.post("privy-link/import/init", { json: t, timeout: 15e3 }).json(),
    "e",
    0,
    i,
    "f",
    0,
    a,
    "b",
    0,
    ({ client: e, body: t, privyIdentityToken: n }) =>
      e
        .post("privy-link/import/submit", {
          json: t,
          headers: { [r]: n },
          timeout: 15e3,
        })
        .json(),
  ]);
};
