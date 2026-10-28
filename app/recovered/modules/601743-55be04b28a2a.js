// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(574472),
    n = e.i(971370),
    a = e.i(111740),
    i = e.i(701082),
    o = e.i(762193);
  e.i(753134);
  var l = e.i(679925),
    s = e.i(593284),
    c = e.i(545177),
    u = e.i(769469),
    m = e.i(412296),
    d = e.i(480133),
    f = e.i(456753),
    p = e.i(51954),
    h = e.i(443618);
  function y(e) {
    let t = e.serialize().length;
    if (t > n.PACKET_DATA_SIZE)
      throw Error(
        `Transaction too large: ${t} bytes exceeds the ${n.PACKET_DATA_SIZE}-byte limit`,
      );
  }
  async function x(e) {
    try {
      return await (0, o.k)({
        promise: e.getBlockHeight("confirmed"),
        ms: 5e3,
        label: "the block height check",
      });
    } catch {
      return null;
    }
  }
  async function b({
    connection: e,
    lastValidBlockHeight: t,
    transactionCount: r,
  }) {
    if (!e || void 0 === t) return;
    let n = await x(e);
    if (null !== n && n > t)
      throw new s.H({
        blockHeight: n,
        lastValidBlockHeight: t,
        transactionCount: r,
      });
  }
  function g({ connection: e, signedTxs: t }) {
    let r = performance.now(),
      n = (0, u.h)({ signedTxs: t, options: { nonTradeTx: !0 } }),
      a = async (t, r, n) => {
        if (await (0, c._)(t, e)) return { err: null };
        if (t.confirmed) throw Error(r);
        let a = await x(e);
        if (
          null !== a &&
          void 0 !== n &&
          a > n &&
          !(await (0, c._)(t, e, { pollTimeoutMs: 0 }))
        )
          throw Error(
            `Signature ${t.signature} has expired: block height exceeded.`,
          );
        throw Error(r);
      };
    return n.map((e, n) => {
      let i = (0, d.w)(t[n]),
        o = (0, m.Q)(t[n])?.lastValidBlockHeight;
      return {
        signature: i,
        signedTimestamp: r,
        confirmTxPromise: e.then(
          (e) =>
            a(
              e,
              e.error ??
                (e.confirmed
                  ? "Transaction failed"
                  : "Transaction not confirmed within the send window"),
              o,
            ),
          (e) => {
            if (e.message === u.X) throw e;
            return a(
              { signature: i, confirmed: !1, succeeded: !1 },
              `Transaction failed to send: ${e.message}`,
              o,
            );
          },
        ),
      };
    });
  }
  function v(e) {
    console.warn("[signAndSendBatchTxs] background confirm rejected", e);
  }
  function w(e) {
    return void 0 !== e;
  }
  function _(e) {
    return (0, m.Q)(e)?.lastValidBlockHeight;
  }
  function j() {
    return null;
  }
  function k(e) {
    return e.connection;
  }
  function N(e) {
    return e.signAndSendTransaction;
  }
  e.s([
    "f",
    0,
    function () {
      let e,
        n,
        s,
        c,
        u,
        d = (0, t.c)(28),
        { priorityLevel: x } = (0, i.f)(),
        { frontRunningProtection: E } = (0, a.f)(),
        { getCurrentBatchId: A } = (0, f.j)(),
        { wallet: S } = (0, r.F)(),
        D = (0, p.f)(N),
        C = (0, p.f)(k);
      d[0] !== C ||
      d[1] !== E ||
      d[2] !== A ||
      d[3] !== x ||
      d[4] !== D ||
      d[5] !== S
        ? ((e = async (e) => {
            let {
              instructions: t,
              defaultUnits: r,
              signBlock: n,
              frontRunningProtection: a,
              viaSendService: i,
            } = e;
            if (!S) return null;
            let o = a ?? E,
              s = A().id,
              c = await (0, l.c)(C, S.publicKey, t, r, 1.05, x, o),
              u = await (0, h.w)(C);
            if (!u)
              throw (
                console.error(
                  "[useFrontendSendTx] No blockhash available for transaction",
                ),
                Error("No blockhash available")
              );
            let d = (0, m.x)({
              transaction: (0, l.t)(S.publicKey, c, u.blockhash),
            });
            if ((y(d), void 0 !== i && i && C)) {
              let e = await (0, m.c)({ connection: C, transaction: d }),
                t = n ? await n(e) : e;
              (0, m.s)({ from: e, to: t });
              let r = await S.signTransaction(t);
              (0, m.s)({ from: t, to: r });
              let [a] = g({ connection: C, signedTxs: [r] });
              return a ?? null;
            }
            return D({
              transaction: d,
              coSignTransaction: n,
              wallet: S,
              frontRunningProtection: o,
              batchId: s,
            });
          }),
          (d[0] = C),
          (d[1] = E),
          (d[2] = A),
          (d[3] = x),
          (d[4] = D),
          (d[5] = S),
          (d[6] = e))
        : (e = d[6]);
      let O = e;
      d[7] !== E || d[8] !== A || d[9] !== D || d[10] !== S
        ? ((n = async (e) => {
            let { transaction: t } = e;
            return S
              ? D({
                  transaction: t,
                  wallet: S,
                  frontRunningProtection: E,
                  batchId: A().id,
                })
              : null;
          }),
          (d[7] = E),
          (d[8] = A),
          (d[9] = D),
          (d[10] = S),
          (d[11] = n))
        : (n = d[11]);
      let M = n;
      d[12] !== C || d[13] !== E || d[14] !== A || d[15] !== D || d[16] !== S
        ? ((s = async (e) => {
            let { instructions: t } = e;
            if (!S) return null;
            let r = A().id,
              n = await (0, h.w)(C);
            if (!n)
              throw (
                console.error(
                  "[useFrontendSendTx] No blockhash available for transaction",
                ),
                Error("No blockhash available")
              );
            return D({
              transaction: (0, m.x)({
                transaction: (0, l.t)(S.publicKey, t, n.blockhash),
              }),
              wallet: S,
              frontRunningProtection: E,
              batchId: r,
            });
          }),
          (d[12] = C),
          (d[13] = E),
          (d[14] = A),
          (d[15] = D),
          (d[16] = S),
          (d[17] = s))
        : (s = d[17]);
      let T = s;
      d[18] !== C || d[19] !== E || d[20] !== x || d[21] !== S
        ? ((c = async (e) => {
            let {
              batches: t,
              defaultUnitsForBatch: r,
              frontRunningProtection: n,
            } = e;
            if (0 === t.length) return [];
            if (!S) return t.map(j);
            let a = n ?? E,
              i = await (0, h.w)(C);
            if (!i)
              throw (
                console.error(
                  "[useFrontendSendTx] No blockhash available for batch transactions",
                ),
                Error("No blockhash available")
              );
            let s = await (0, o.k)({
                promise: Promise.all(
                  t.map((e) => (0, l.c)(C, S.publicKey, e, r(e), 1.05, x, a)),
                ),
                ms: 6e4,
                label: "building the transaction batch",
              }),
              c = C ? await (0, h.R)(C) : i,
              u = s.map((e) =>
                (0, m.x)({
                  transaction: (0, l.t)(S.publicKey, e, c.blockhash),
                  blockhash: c,
                }),
              );
            for (let e of u) y(e);
            C &&
              (await Promise.all(
                u.map((e) => (0, m.c)({ connection: C, transaction: e })),
              ));
            let d = await S.signAllTransactions(u);
            d.forEach((e, t) => (0, m.s)({ from: u[t], to: e }));
            let f = d.map(_),
              p = f.every(w) ? Math.min(...f) : void 0;
            await b({
              connection: C,
              lastValidBlockHeight: p,
              transactionCount: d.length,
            });
            let k = g({ connection: C, signedTxs: d });
            for (let e of k) e.confirmTxPromise.catch(v);
            return k;
          }),
          (d[18] = C),
          (d[19] = E),
          (d[20] = x),
          (d[21] = S),
          (d[22] = c))
        : (c = d[22]);
      let F = c;
      return (
        d[23] !== F || d[24] !== O || d[25] !== T || d[26] !== M
          ? ((u = {
              signAndSendTx: O,
              signAndSendVersionedTx: M,
              signAndSendTxWithoutComputeBudgetInstructions: T,
              signAndSendBatchTxs: F,
            }),
            (d[23] = F),
            (d[24] = O),
            (d[25] = T),
            (d[26] = M),
            (d[27] = u))
          : (u = d[27]),
        u
      );
    },
  ]);
};
