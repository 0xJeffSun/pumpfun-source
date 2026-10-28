// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971370),
    n = e.i(584229),
    i = e.i(306780),
    a = e.i(358052);
  class r extends Error {
    walletName;
    code;
    constructor(e, t) {
      let i = void 0 === t ? "" : `: ${(0, n.A)(t)}`;
      (super(`${e} could not sign a v1 transaction${i}`, { cause: t }),
        (this.name = "V1SigningRefusedError"),
        (this.walletName = e),
        (this.code = (0, n.N)(t)));
    }
  }
  let s = (e) => e instanceof t.VersionedTransaction && 1 === e.version;
  e.s([
    "Z",
    0,
    r,
    "G",
    0,
    (e, l) => {
      let o = async (o) => {
        let u,
          d = (0, i.A)(l);
        if (!d) throw Error("wallet cannot sign v1 transactions");
        let c = l?.name ?? "unknown";
        if (o.some(s) && (0, i.M)(c)) throw new r(c, void 0);
        let m = e.publicKey.toBase58(),
          g = d.accounts.find((e) => e.address === m);
        if (!g) throw Error(`wallet has no account for ${m}`);
        let p = o.map((e) => ({ account: g, transaction: (0, a.f)(e) }));
        try {
          u = await d.signTransaction(...p);
        } catch (e) {
          if (
            (0, n.S)(e) ||
            /simulat|insufficient|blockhash|expired/i.test((0, n.A)(e)) ||
            !o.every(s)
          )
            throw e;
          throw ((0, i.s)(c), new r(c, e));
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
          let i = (e) => e instanceof t.VersionedTransaction,
            a = await o(n.filter(i)),
            r = n.some((e) => !i(e))
              ? await e.signAllTransactions(n.filter((e) => !i(e)))
              : [],
            l = 0,
            u = 0;
          return n.map((e) => (i(e) ? a[l++] : r[u++]));
        },
      };
    },
  ]);
};
