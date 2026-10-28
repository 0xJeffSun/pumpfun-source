// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(574472),
    r = e.i(971370),
    a = e.i(111740),
    n = e.i(701082),
    s = e.i(762193);
  e.i(753134);
  var l = e.i(679925),
    o = e.i(593284),
    c = e.i(545177),
    m = e.i(769469),
    d = e.i(412296),
    h = e.i(480133),
    u = e.i(456753),
    f = e.i(51954),
    x = e.i(443618);
  function p(e) {
    let t = e.serialize().length;
    if (t > r.PACKET_DATA_SIZE)
      throw Error(
        `Transaction too large: ${t} bytes exceeds the ${r.PACKET_DATA_SIZE}-byte limit`,
      );
  }
  async function g(e) {
    try {
      return await (0, s.k)({
        promise: e.getBlockHeight("confirmed"),
        ms: 5e3,
        label: "the block height check",
      });
    } catch {
      return null;
    }
  }
  async function y({
    connection: e,
    lastValidBlockHeight: t,
    transactionCount: i,
  }) {
    if (!e || void 0 === t) return;
    let r = await g(e);
    if (null !== r && r > t)
      throw new o.H({
        blockHeight: r,
        lastValidBlockHeight: t,
        transactionCount: i,
      });
  }
  function b({ connection: e, signedTxs: t }) {
    let i = performance.now(),
      r = (0, m.h)({ signedTxs: t, options: { nonTradeTx: !0 } }),
      a = async (t, i, r) => {
        if (await (0, c._)(t, e)) return { err: null };
        if (t.confirmed) throw Error(i);
        let a = await g(e);
        if (
          null !== a &&
          void 0 !== r &&
          a > r &&
          !(await (0, c._)(t, e, { pollTimeoutMs: 0 }))
        )
          throw Error(
            `Signature ${t.signature} has expired: block height exceeded.`,
          );
        throw Error(i);
      };
    return r.map((e, r) => {
      let n = (0, h.w)(t[r]),
        s = (0, d.Q)(t[r])?.lastValidBlockHeight;
      return {
        signature: n,
        signedTimestamp: i,
        confirmTxPromise: e.then(
          (e) =>
            a(
              e,
              e.error ??
                (e.confirmed
                  ? "Transaction failed"
                  : "Transaction not confirmed within the send window"),
              s,
            ),
          (e) => {
            if (e.message === m.X) throw e;
            return a(
              { signature: n, confirmed: !1, succeeded: !1 },
              `Transaction failed to send: ${e.message}`,
              s,
            );
          },
        ),
      };
    });
  }
  function w(e) {
    console.warn("[signAndSendBatchTxs] background confirm rejected", e);
  }
  function v(e) {
    return void 0 !== e;
  }
  function _(e) {
    return (0, d.Q)(e)?.lastValidBlockHeight;
  }
  function j() {
    return null;
  }
  function N(e) {
    return e.connection;
  }
  function k(e) {
    return e.signAndSendTransaction;
  }
  e.s([
    "f",
    0,
    function () {
      let e,
        r,
        o,
        c,
        m,
        h = (0, t.c)(28),
        { priorityLevel: g } = (0, n.f)(),
        { frontRunningProtection: E } = (0, a.f)(),
        { getCurrentBatchId: S } = (0, u.j)(),
        { wallet: T } = (0, i.F)(),
        C = (0, f.f)(k),
        $ = (0, f.f)(N);
      h[0] !== $ ||
      h[1] !== E ||
      h[2] !== S ||
      h[3] !== g ||
      h[4] !== C ||
      h[5] !== T
        ? ((e = async (e) => {
            let {
              instructions: t,
              defaultUnits: i,
              signBlock: r,
              frontRunningProtection: a,
              viaSendService: n,
            } = e;
            if (!T) return null;
            let s = a ?? E,
              o = S().id,
              c = await (0, l.c)($, T.publicKey, t, i, 1.05, g, s),
              m = await (0, x.w)($);
            if (!m)
              throw (
                console.error(
                  "[useFrontendSendTx] No blockhash available for transaction",
                ),
                Error("No blockhash available")
              );
            let h = (0, d.x)({
              transaction: (0, l.t)(T.publicKey, c, m.blockhash),
            });
            if ((p(h), void 0 !== n && n && $)) {
              let e = await (0, d.c)({ connection: $, transaction: h }),
                t = r ? await r(e) : e;
              (0, d.s)({ from: e, to: t });
              let i = await T.signTransaction(t);
              (0, d.s)({ from: t, to: i });
              let [a] = b({ connection: $, signedTxs: [i] });
              return a ?? null;
            }
            return C({
              transaction: h,
              coSignTransaction: r,
              wallet: T,
              frontRunningProtection: s,
              batchId: o,
            });
          }),
          (h[0] = $),
          (h[1] = E),
          (h[2] = S),
          (h[3] = g),
          (h[4] = C),
          (h[5] = T),
          (h[6] = e))
        : (e = h[6]);
      let R = e;
      h[7] !== E || h[8] !== S || h[9] !== C || h[10] !== T
        ? ((r = async (e) => {
            let { transaction: t } = e;
            return T
              ? C({
                  transaction: t,
                  wallet: T,
                  frontRunningProtection: E,
                  batchId: S().id,
                })
              : null;
          }),
          (h[7] = E),
          (h[8] = S),
          (h[9] = C),
          (h[10] = T),
          (h[11] = r))
        : (r = h[11]);
      let A = r;
      h[12] !== $ || h[13] !== E || h[14] !== S || h[15] !== C || h[16] !== T
        ? ((o = async (e) => {
            let { instructions: t } = e;
            if (!T) return null;
            let i = S().id,
              r = await (0, x.w)($);
            if (!r)
              throw (
                console.error(
                  "[useFrontendSendTx] No blockhash available for transaction",
                ),
                Error("No blockhash available")
              );
            return C({
              transaction: (0, d.x)({
                transaction: (0, l.t)(T.publicKey, t, r.blockhash),
              }),
              wallet: T,
              frontRunningProtection: E,
              batchId: i,
            });
          }),
          (h[12] = $),
          (h[13] = E),
          (h[14] = S),
          (h[15] = C),
          (h[16] = T),
          (h[17] = o))
        : (o = h[17]);
      let I = o;
      h[18] !== $ || h[19] !== E || h[20] !== g || h[21] !== T
        ? ((c = async (e) => {
            let {
              batches: t,
              defaultUnitsForBatch: i,
              frontRunningProtection: r,
            } = e;
            if (0 === t.length) return [];
            if (!T) return t.map(j);
            let a = r ?? E,
              n = await (0, x.w)($);
            if (!n)
              throw (
                console.error(
                  "[useFrontendSendTx] No blockhash available for batch transactions",
                ),
                Error("No blockhash available")
              );
            let o = await (0, s.k)({
                promise: Promise.all(
                  t.map((e) => (0, l.c)($, T.publicKey, e, i(e), 1.05, g, a)),
                ),
                ms: 6e4,
                label: "building the transaction batch",
              }),
              c = $ ? await (0, x.R)($) : n,
              m = o.map((e) =>
                (0, d.x)({
                  transaction: (0, l.t)(T.publicKey, e, c.blockhash),
                  blockhash: c,
                }),
              );
            for (let e of m) p(e);
            $ &&
              (await Promise.all(
                m.map((e) => (0, d.c)({ connection: $, transaction: e })),
              ));
            let h = await T.signAllTransactions(m);
            h.forEach((e, t) => (0, d.s)({ from: m[t], to: e }));
            let u = h.map(_),
              f = u.every(v) ? Math.min(...u) : void 0;
            await y({
              connection: $,
              lastValidBlockHeight: f,
              transactionCount: h.length,
            });
            let N = b({ connection: $, signedTxs: h });
            for (let e of N) e.confirmTxPromise.catch(w);
            return N;
          }),
          (h[18] = $),
          (h[19] = E),
          (h[20] = g),
          (h[21] = T),
          (h[22] = c))
        : (c = h[22]);
      let M = c;
      return (
        h[23] !== M || h[24] !== R || h[25] !== I || h[26] !== A
          ? ((m = {
              signAndSendTx: R,
              signAndSendVersionedTx: A,
              signAndSendTxWithoutComputeBudgetInstructions: I,
              signAndSendBatchTxs: M,
            }),
            (h[23] = M),
            (h[24] = R),
            (h[25] = I),
            (h[26] = A),
            (h[27] = m))
          : (m = h[27]),
        m
      );
    },
  ]);
};
