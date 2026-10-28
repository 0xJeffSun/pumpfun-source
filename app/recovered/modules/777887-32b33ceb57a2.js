// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(412296);
  let n = Promise.resolve();
  function r(e) {
    let t = n.then(e, e);
    return (
      (n = t.then(
        () => void 0,
        () => void 0,
      )),
      t
    );
  }
  let i = [],
    a = null;
  async function s(e) {
    await r(async () => {
      let n;
      try {
        let r = e[0].signAllTransactions;
        if (e.length > 1 && r) {
          let i = await Promise.all(
            e.map(async (e) =>
              e.prepareTransaction
                ? e.prepareTransaction(e.transaction)
                : e.transaction,
            ),
          );
          for (let t of e) t.onSigningStarted?.();
          (n = await r(i)).forEach((e, n) => (0, t.s)({ from: i[n], to: e }));
        } else
          for (let r of ((n = []), e)) {
            let e = r.prepareTransaction
              ? await r.prepareTransaction(r.transaction)
              : r.transaction;
            r.onSigningStarted?.();
            let i = await r.signTransaction(e);
            ((0, t.s)({ from: e, to: i }), n.push(i));
          }
      } catch (t) {
        for (let n of e) n.reject(t);
        return;
      }
      await Promise.all(
        e.map((e, t) => {
          let r = n[t];
          return r
            ? e
                .sendSignedTransaction({
                  signedTx: r,
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
    a = null;
    let e = i;
    if (((i = []), 0 === e.length)) return;
    let t = new Map();
    for (let n of e) {
      let e = t.get(n.walletKey);
      e ? e.push(n) : t.set(n.walletKey, [n]);
    }
    for (let e of t.values()) await s(e);
  }
  let o = [],
    u = null;
  async function c(e) {
    await r(async () => {
      let t,
        n = e.flatMap((e) => e.transactions);
      try {
        let r = e[0].signAllTransactions;
        if (n.length > 1 && r) {
          for (let t of e) t.onSigningStarted?.();
          t = await r(n);
        } else
          for (let n of ((t = []), e))
            for (let e of (n.onSigningStarted?.(), n.transactions))
              t.push(await n.signTransaction(e));
      } catch (t) {
        for (let n of e) n.reject(t);
        return;
      }
      let r = 0;
      for (let n of e) {
        let e = t.slice(r, r + n.transactions.length);
        ((r += n.transactions.length),
          e.length === n.transactions.length
            ? n.resolve(e)
            : n.reject(Error("Missing signed transaction in batch")));
      }
    });
  }
  async function d() {
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
      await c(t);
  }
  e.s([
    "d",
    0,
    function (e) {
      return new Promise((t, n) => {
        (o.push({ ...e, resolve: t, reject: n }),
          null === u &&
            (u = setTimeout(() => {
              d();
            }, 150)));
      });
    },
    "B",
    0,
    function (e) {
      return new Promise((t, n) => {
        (i.push({ ...e, resolve: t, reject: n }),
          null === a &&
            (a = setTimeout(() => {
              l();
            }, 150)));
      });
    },
    "_",
    0,
    r,
  ]);
};
