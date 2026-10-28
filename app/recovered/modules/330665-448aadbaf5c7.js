// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971370),
    n = e.i(584229),
    r = e.i(306780),
    i = e.i(358052);
  class a extends Error {
    walletName;
    code;
    constructor(e, t) {
      let r = void 0 === t ? "" : `: ${(0, n.A)(t)}`;
      (super(`${e} could not sign a v1 transaction${r}`, { cause: t }),
        (this.name = "V1SigningRefusedError"),
        (this.walletName = e),
        (this.code = (0, n.N)(t)));
    }
  }
  let s = (e) => e instanceof t.VersionedTransaction && 1 === e.version;
  e.s([
    "Z",
    0,
    a,
    "G",
    0,
    (e, l) => {
      let o = async (o) => {
        let u,
          c = (0, r.A)(l);
        if (!c) throw Error("wallet cannot sign v1 transactions");
        let d = l?.name ?? "unknown";
        if (o.some(s) && (0, r.M)(d)) throw new a(d, void 0);
        let m = e.publicKey.toBase58(),
          p = c.accounts.find((e) => e.address === m);
        if (!p) throw Error(`wallet has no account for ${m}`);
        let f = o.map((e) => ({ account: p, transaction: (0, i.f)(e) }));
        try {
          u = await c.signTransaction(...f);
        } catch (e) {
          if (
            (0, n.S)(e) ||
            /simulat|insufficient|blockhash|expired/i.test((0, n.A)(e)) ||
            !o.every(s)
          )
            throw e;
          throw ((0, r.s)(d), new a(d, e));
        }
        return u.map((e) =>
          t.VersionedTransaction.deserialize(e.signedTransaction),
        );
      };
      return {
        ...e,
        signTransaction: async (t) =>
          s(t) ? (await o([t]))[0] : e.signTransaction(t),
        signAllTransactions: async (n) => {
          if (!n.some(s)) return e.signAllTransactions(n);
          let r = (e) => e instanceof t.VersionedTransaction,
            i = await o(n.filter(r)),
            a = n.some((e) => !r(e))
              ? await e.signAllTransactions(n.filter((e) => !r(e)))
              : [],
            l = 0,
            u = 0;
          return n.map((e) => (r(e) ? i[l++] : a[u++]));
        },
      };
    },
  ]);
};
