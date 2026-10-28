// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(445242),
    n = t.i(574472),
    r = t.i(971370),
    s = t.i(111740),
    a = t.i(701082),
    i = t.i(762193);
  t.i(753134);
  var o = t.i(679925),
    c = t.i(593284),
    l = t.i(545177),
    u = t.i(769469),
    d = t.i(412296),
    m = t.i(480133),
    f = t.i(456753),
    h = t.i(51954),
    g = t.i(443618);
  function b(t) {
    let e = t.serialize().length;
    if (e > r.PACKET_DATA_SIZE)
      throw Error(
        `Transaction too large: ${e} bytes exceeds the ${r.PACKET_DATA_SIZE}-byte limit`,
      );
  }
  async function p(t) {
    try {
      return await (0, i.k)({
        promise: t.getBlockHeight("confirmed"),
        ms: 5e3,
        label: "the block height check",
      });
    } catch {
      return null;
    }
  }
  async function w({
    connection: t,
    lastValidBlockHeight: e,
    transactionCount: n,
  }) {
    if (!t || void 0 === e) return;
    let r = await p(t);
    if (null !== r && r > e)
      throw new c.H({
        blockHeight: r,
        lastValidBlockHeight: e,
        transactionCount: n,
      });
  }
  function y({ connection: t, signedTxs: e }) {
    let n = performance.now(),
      r = (0, u.h)({ signedTxs: e, options: { nonTradeTx: !0 } }),
      s = async (e, n, r) => {
        if (await (0, l._)(e, t)) return { err: null };
        if (e.confirmed) throw Error(n);
        let s = await p(t);
        if (
          null !== s &&
          void 0 !== r &&
          s > r &&
          !(await (0, l._)(e, t, { pollTimeoutMs: 0 }))
        )
          throw Error(
            `Signature ${e.signature} has expired: block height exceeded.`,
          );
        throw Error(n);
      };
    return r.map((t, r) => {
      let a = (0, m.w)(e[r]),
        i = (0, d.Q)(e[r])?.lastValidBlockHeight;
      return {
        signature: a,
        signedTimestamp: n,
        confirmTxPromise: t.then(
          (t) =>
            s(
              t,
              t.error ??
                (t.confirmed
                  ? "Transaction failed"
                  : "Transaction not confirmed within the send window"),
              i,
            ),
          (t) => {
            if (t.message === u.X) throw t;
            return s(
              { signature: a, confirmed: !1, succeeded: !1 },
              `Transaction failed to send: ${t.message}`,
              i,
            );
          },
        ),
      };
    });
  }
  function _(t) {
    console.warn("[signAndSendBatchTxs] background confirm rejected", t);
  }
  function x(t) {
    return void 0 !== t;
  }
  function v(t) {
    return (0, d.Q)(t)?.lastValidBlockHeight;
  }
  function j() {
    return null;
  }
  function k(t) {
    return t.connection;
  }
  function $(t) {
    return t.signAndSendTransaction;
  }
  t.s([
    "f",
    0,
    function () {
      let t,
        r,
        c,
        l,
        u,
        m = (0, e.c)(28),
        { priorityLevel: p } = (0, a.f)(),
        { frontRunningProtection: S } = (0, s.f)(),
        { getCurrentBatchId: T } = (0, f.j)(),
        { wallet: E } = (0, n.F)(),
        I = (0, h.f)($),
        A = (0, h.f)(k);
      m[0] !== A ||
      m[1] !== S ||
      m[2] !== T ||
      m[3] !== p ||
      m[4] !== I ||
      m[5] !== E
        ? ((t = async (t) => {
            let {
              instructions: e,
              defaultUnits: n,
              signBlock: r,
              frontRunningProtection: s,
              viaSendService: a,
            } = t;
            if (!E) return null;
            let i = s ?? S,
              c = T().id,
              l = await (0, o.c)(A, E.publicKey, e, n, 1.05, p, i),
              u = await (0, g.w)(A);
            if (!u)
              throw (
                console.error(
                  "[useFrontendSendTx] No blockhash available for transaction",
                ),
                Error("No blockhash available")
              );
            let m = (0, d.x)({
              transaction: (0, o.t)(E.publicKey, l, u.blockhash),
            });
            if ((b(m), void 0 !== a && a && A)) {
              let t = await (0, d.c)({ connection: A, transaction: m }),
                e = r ? await r(t) : t;
              (0, d.s)({ from: t, to: e });
              let n = await E.signTransaction(e);
              (0, d.s)({ from: e, to: n });
              let [s] = y({ connection: A, signedTxs: [n] });
              return s ?? null;
            }
            return I({
              transaction: m,
              coSignTransaction: r,
              wallet: E,
              frontRunningProtection: i,
              batchId: c,
            });
          }),
          (m[0] = A),
          (m[1] = S),
          (m[2] = T),
          (m[3] = p),
          (m[4] = I),
          (m[5] = E),
          (m[6] = t))
        : (t = m[6]);
      let P = t;
      m[7] !== S || m[8] !== T || m[9] !== I || m[10] !== E
        ? ((r = async (t) => {
            let { transaction: e } = t;
            return E
              ? I({
                  transaction: e,
                  wallet: E,
                  frontRunningProtection: S,
                  batchId: T().id,
                })
              : null;
          }),
          (m[7] = S),
          (m[8] = T),
          (m[9] = I),
          (m[10] = E),
          (m[11] = r))
        : (r = m[11]);
      let F = r;
      m[12] !== A || m[13] !== S || m[14] !== T || m[15] !== I || m[16] !== E
        ? ((c = async (t) => {
            let { instructions: e } = t;
            if (!E) return null;
            let n = T().id,
              r = await (0, g.w)(A);
            if (!r)
              throw (
                console.error(
                  "[useFrontendSendTx] No blockhash available for transaction",
                ),
                Error("No blockhash available")
              );
            return I({
              transaction: (0, d.x)({
                transaction: (0, o.t)(E.publicKey, e, r.blockhash),
              }),
              wallet: E,
              frontRunningProtection: S,
              batchId: n,
            });
          }),
          (m[12] = A),
          (m[13] = S),
          (m[14] = T),
          (m[15] = I),
          (m[16] = E),
          (m[17] = c))
        : (c = m[17]);
      let C = c;
      m[18] !== A || m[19] !== S || m[20] !== p || m[21] !== E
        ? ((l = async (t) => {
            let {
              batches: e,
              defaultUnitsForBatch: n,
              frontRunningProtection: r,
            } = t;
            if (0 === e.length) return [];
            if (!E) return e.map(j);
            let s = r ?? S,
              a = await (0, g.w)(A);
            if (!a)
              throw (
                console.error(
                  "[useFrontendSendTx] No blockhash available for batch transactions",
                ),
                Error("No blockhash available")
              );
            let c = await (0, i.k)({
                promise: Promise.all(
                  e.map((t) => (0, o.c)(A, E.publicKey, t, n(t), 1.05, p, s)),
                ),
                ms: 6e4,
                label: "building the transaction batch",
              }),
              l = A ? await (0, g.R)(A) : a,
              u = c.map((t) =>
                (0, d.x)({
                  transaction: (0, o.t)(E.publicKey, t, l.blockhash),
                  blockhash: l,
                }),
              );
            for (let t of u) b(t);
            A &&
              (await Promise.all(
                u.map((t) => (0, d.c)({ connection: A, transaction: t })),
              ));
            let m = await E.signAllTransactions(u);
            m.forEach((t, e) => (0, d.s)({ from: u[e], to: t }));
            let f = m.map(v),
              h = f.every(x) ? Math.min(...f) : void 0;
            await w({
              connection: A,
              lastValidBlockHeight: h,
              transactionCount: m.length,
            });
            let k = y({ connection: A, signedTxs: m });
            for (let t of k) t.confirmTxPromise.catch(_);
            return k;
          }),
          (m[18] = A),
          (m[19] = S),
          (m[20] = p),
          (m[21] = E),
          (m[22] = l))
        : (l = m[22]);
      let X = l;
      return (
        m[23] !== X || m[24] !== P || m[25] !== C || m[26] !== F
          ? ((u = {
              signAndSendTx: P,
              signAndSendVersionedTx: F,
              signAndSendTxWithoutComputeBudgetInstructions: C,
              signAndSendBatchTxs: X,
            }),
            (m[23] = X),
            (m[24] = P),
            (m[25] = C),
            (m[26] = F),
            (m[27] = u))
          : (u = m[27]),
        u
      );
    },
  ]);
};
