// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971370),
    r = e.i(584229),
    n = e.i(306780),
    a = e.i(358052);
  class i extends Error {
    walletName;
    code;
    constructor(e, t) {
      let n = void 0 === t ? "" : `: ${(0, r.A)(t)}`;
      (super(`${e} could not sign a v1 transaction${n}`, { cause: t }),
        (this.name = "V1SigningRefusedError"),
        (this.walletName = e),
        (this.code = (0, r.N)(t)));
    }
  }
  let s = (e) => e instanceof t.VersionedTransaction && 1 === e.version;
  e.s([
    "Z",
    0,
    i,
    "G",
    0,
    (e, f) => {
      let o = async (o) => {
        let c,
          l = (0, n.A)(f);
        if (!l) throw Error("wallet cannot sign v1 transactions");
        let d = f?.name ?? "unknown";
        if (o.some(s) && (0, n.M)(d)) throw new i(d, void 0);
        let u = e.publicKey.toBase58(),
          h = l.accounts.find((e) => e.address === u);
        if (!h) throw Error(`wallet has no account for ${u}`);
        let p = o.map((e) => ({ account: h, transaction: (0, a.f)(e) }));
        try {
          c = await l.signTransaction(...p);
        } catch (e) {
          if (
            (0, r.S)(e) ||
            /simulat|insufficient|blockhash|expired/i.test((0, r.A)(e)) ||
            !o.every(s)
          )
            throw e;
          throw ((0, n.s)(d), new i(d, e));
        }
        return c.map((e) =>
          t.VersionedTransaction.deserialize(e.signedTransaction),
        );
      };
      return {
        ...e,
        signTransaction: async (t) =>
          s(t) ? (await o([t]))[0] : e.signTransaction(t),
        signAllTransactions: async (r) => {
          if (!r.some(s)) return e.signAllTransactions(r);
          let n = (e) => e instanceof t.VersionedTransaction,
            a = await o(r.filter(n)),
            i = r.some((e) => !n(e))
              ? await e.signAllTransactions(r.filter((e) => !n(e)))
              : [],
            f = 0,
            c = 0;
          return r.map((e) => (n(e) ? a[f++] : i[c++]));
        },
      };
    },
  ]);
};
