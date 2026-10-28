// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(412296);
  let n = Promise.resolve();
  function i(e) {
    let t = n.then(e, e);
    return (
      (n = t.then(
        () => void 0,
        () => void 0,
      )),
      t
    );
  }
  let a = [],
    r = null;
  async function s(e) {
    await i(async () => {
      let n;
      try {
        let i = e[0].signAllTransactions;
        if (e.length > 1 && i) {
          let a = await Promise.all(
            e.map(async (e) =>
              e.prepareTransaction
                ? e.prepareTransaction(e.transaction)
                : e.transaction,
            ),
          );
          for (let t of e) t.onSigningStarted?.();
          (n = await i(a)).forEach((e, n) => (0, t.s)({ from: a[n], to: e }));
        } else
          for (let i of ((n = []), e)) {
            let e = i.prepareTransaction
              ? await i.prepareTransaction(i.transaction)
              : i.transaction;
            i.onSigningStarted?.();
            let a = await i.signTransaction(e);
            ((0, t.s)({ from: e, to: a }), n.push(a));
          }
      } catch (t) {
        for (let n of e) n.reject(t);
        return;
      }
      await Promise.all(
        e.map((e, t) => {
          let i = n[t];
          return i
            ? e
                .sendSignedTransaction({
                  signedTx: i,
                  frontRunningProtection: e.frontRunningProtection,
                })
                .then(e.resolve, e.reject)
            : (e.reject(Error("Missing signed transaction in batch")),
              Promise.resolve());
        }),
      );
    });
  }
  async function l() {
    r = null;
    let e = a;
    if (((a = []), 0 === e.length)) return;
    let t = new Map();
    for (let n of e) {
      let e = t.get(n.walletKey);
      e ? e.push(n) : t.set(n.walletKey, [n]);
    }
    for (let e of t.values()) await s(e);
  }
  let o = [],
    u = null;
  async function d(e) {
    await i(async () => {
      let t,
        n = e.flatMap((e) => e.transactions);
      try {
        let i = e[0].signAllTransactions;
        if (n.length > 1 && i) {
          for (let t of e) t.onSigningStarted?.();
          t = await i(n);
        } else
          for (let n of ((t = []), e))
            for (let e of (n.onSigningStarted?.(), n.transactions))
              t.push(await n.signTransaction(e));
      } catch (t) {
        for (let n of e) n.reject(t);
        return;
      }
      let i = 0;
      for (let n of e) {
        let e = t.slice(i, i + n.transactions.length);
        ((i += n.transactions.length),
          e.length === n.transactions.length
            ? n.resolve(e)
            : n.reject(Error("Missing signed transaction in batch")));
      }
    });
  }
  async function c() {
    u = null;
    let e = o;
    for (let t of ((o = []),
    ((e) => {
      let t = new Map();
      for (let n of e) {
        let e = t.get(n.walletKey);
        e ? e.push(n) : t.set(n.walletKey, [n]);
      }
      return Array.from(t.values());
    })(e)))
      await d(t);
  }
  e.s([
    "d",
    0,
    function (e) {
      return new Promise((t, n) => {
        (o.push({ ...e, resolve: t, reject: n }),
          null === u &&
            (u = setTimeout(() => {
              c();
            }, 150)));
      });
    },
    "B",
    0,
    function (e) {
      return new Promise((t, n) => {
        (a.push({ ...e, resolve: t, reject: n }),
          null === r &&
            (r = setTimeout(() => {
              l();
            }, 150)));
      });
    },
    "_",
    0,
    i,
  ]);
};
