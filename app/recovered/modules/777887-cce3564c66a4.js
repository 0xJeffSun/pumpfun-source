// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(412296);
  let i = Promise.resolve();
  function n(e) {
    let t = i.then(e, e);
    return (
      (i = t.then(
        () => void 0,
        () => void 0,
      )),
      t
    );
  }
  let r = [],
    s = null;
  async function o(e) {
    await n(async () => {
      let i;
      try {
        let n = e[0].signAllTransactions;
        if (e.length > 1 && n) {
          let r = await Promise.all(
            e.map(async (e) =>
              e.prepareTransaction
                ? e.prepareTransaction(e.transaction)
                : e.transaction,
            ),
          );
          for (let t of e) t.onSigningStarted?.();
          (i = await n(r)).forEach((e, i) => (0, t.s)({ from: r[i], to: e }));
        } else
          for (let n of ((i = []), e)) {
            let e = n.prepareTransaction
              ? await n.prepareTransaction(n.transaction)
              : n.transaction;
            n.onSigningStarted?.();
            let r = await n.signTransaction(e);
            ((0, t.s)({ from: e, to: r }), i.push(r));
          }
      } catch (t) {
        for (let i of e) i.reject(t);
        return;
      }
      await Promise.all(
        e.map((e, t) => {
          let n = i[t];
          return n
            ? e
                .sendSignedTransaction({
                  signedTx: n,
                  frontRunningProtection: e.frontRunningProtection,
                })
                .then(e.resolve, e.reject)
            : (e.reject(Error("Missing signed transaction in batch")),
              Promise.resolve());
        }),
      );
    });
  }
  async function a() {
    s = null;
    let e = r;
    if (((r = []), 0 === e.length)) return;
    let t = new Map();
    for (let i of e) {
      let e = t.get(i.walletKey);
      e ? e.push(i) : t.set(i.walletKey, [i]);
    }
    for (let e of t.values()) await o(e);
  }
  let l = [],
    u = null;
  async function d(e) {
    await n(async () => {
      let t,
        i = e.flatMap((e) => e.transactions);
      try {
        let n = e[0].signAllTransactions;
        if (i.length > 1 && n) {
          for (let t of e) t.onSigningStarted?.();
          t = await n(i);
        } else
          for (let i of ((t = []), e))
            for (let e of (i.onSigningStarted?.(), i.transactions))
              t.push(await i.signTransaction(e));
      } catch (t) {
        for (let i of e) i.reject(t);
        return;
      }
      let n = 0;
      for (let i of e) {
        let e = t.slice(n, n + i.transactions.length);
        ((n += i.transactions.length),
          e.length === i.transactions.length
            ? i.resolve(e)
            : i.reject(Error("Missing signed transaction in batch")));
      }
    });
  }
  async function c() {
    u = null;
    let e = l;
    for (let t of ((l = []),
    ((e) => {
      let t = new Map();
      for (let i of e) {
        let e = t.get(i.walletKey);
        e ? e.push(i) : t.set(i.walletKey, [i]);
      }
      return Array.from(t.values());
    })(e)))
      await d(t);
  }
  e.s([
    "d",
    0,
    function (e) {
      return new Promise((t, i) => {
        (l.push({ ...e, resolve: t, reject: i }),
          null === u &&
            (u = setTimeout(() => {
              c();
            }, 150)));
      });
    },
    "B",
    0,
    function (e) {
      return new Promise((t, i) => {
        (r.push({ ...e, resolve: t, reject: i }),
          null === s &&
            (s = setTimeout(() => {
              a();
            }, 150)));
      });
    },
    "_",
    0,
    n,
  ]);
};
