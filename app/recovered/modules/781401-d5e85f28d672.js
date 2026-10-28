// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(934429),
    r = e.i(147864),
    n = e.i(586844),
    i = e.i(262548),
    a = e.i(966348),
    s = e.i(591774),
    o = e.i(225587),
    u = e.i(95285),
    l = e.i(897161),
    c = e.i(611933),
    f = e.i(339513),
    d = e.i(369155),
    p = e.i(274994);
  function y(
    e,
    {
      emitOnBegin: t = !1,
      emitMissed: r = !1,
      onBlockNumber: a,
      onError: s,
      poll: u,
      pollingInterval: l = e.pollingInterval,
    },
  ) {
    let c, h, m;
    return (
      void 0 !== u
        ? u
        : "webSocket" !== e.transport.type &&
          "ipc" !== e.transport.type &&
          ("fallback" !== e.transport.type ||
            ("webSocket" !== e.transport.transports[0].config.type &&
              "ipc" !== e.transport.transports[0].config.type))
    )
      ? ((h = (0, o.f)(["watchBlockNumber", e.uid, t, r, l])),
        (0, i.f)(h, { onBlockNumber: a, onError: s }, (i) =>
          (0, d.f)(
            async () => {
              try {
                let t = await (0, n.f)(
                  e,
                  p.f,
                  "getBlockNumber",
                )({ cacheTime: 0 });
                if (void 0 !== c) {
                  if (t === c) return;
                  if (t - c > 1 && r)
                    for (let e = c + 1n; e < t; e++)
                      (i.onBlockNumber(e, c), (c = e));
                }
                (void 0 === c || t > c) && (i.onBlockNumber(t, c), (c = t));
              } catch (e) {
                i.onError?.(e);
              }
            },
            { emitOnBegin: t, interval: l },
          ),
        ))
      : ((m = (0, o.f)(["watchBlockNumber", e.uid, t, r])),
        (0, i.f)(m, { onBlockNumber: a, onError: s }, (t) => {
          let r = !0,
            n = () => (r = !1);
          return (
            (async () => {
              try {
                let i = (() => {
                    if ("fallback" === e.transport.type) {
                      let t = e.transport.transports.find(
                        (e) =>
                          "webSocket" === e.config.type ||
                          "ipc" === e.config.type,
                      );
                      return t ? t.value : e.transport;
                    }
                    return e.transport;
                  })(),
                  { unsubscribe: a } = await i.subscribe({
                    params: ["newHeads"],
                    onData(e) {
                      if (!r) return;
                      let n = (0, f.K)(e.result?.number);
                      (t.onBlockNumber(n, c), (c = n));
                    },
                    onError(e) {
                      t.onError?.(e);
                    },
                  });
                ((n = a), r || n());
              } catch (e) {
                s?.(e);
              }
            })(),
            () => n()
          );
        }));
  }
  async function h(e, f) {
    let d,
      p,
      h,
      m,
      g,
      {
        checkReplacement: b = e.chain
          ?.supportsTransactionReplacementDetection ?? !0,
        confirmations: w = 1,
        hash: v,
        onReplaced: x,
        retryCount: P = 6,
        retryDelay: k = ({ count: e }) => 200 * ~~(1 << e),
        timeout: A = 18e4,
      } = f,
      I = (0, o.f)(["waitForTransactionReceipt", e.uid, v]),
      B = f.pollingInterval
        ? f.pollingInterval
        : e.chain?.experimental_preconfirmationTime
          ? e.chain.experimental_preconfirmationTime
          : e.pollingInterval,
      E = !1,
      { promise: N, resolve: T, reject: S } = (0, a.f)(),
      M = A
        ? setTimeout(() => {
            (g?.(), m?.(), S(new r.K({ hash: v })));
          }, A)
        : void 0;
    return (
      (m = (0, i.f)(I, { onReplaced: x, resolve: T, reject: S }, async (i) => {
        if (
          (h = await (0, n.f)(
            e,
            c.f,
            "getTransactionReceipt",
          )({ hash: v }).catch(() => void 0)) &&
          w <= 1
        ) {
          (clearTimeout(M), i.resolve(h), m?.());
          return;
        }
        g = (0, n.f)(
          e,
          y,
          "watchBlockNumber",
        )({
          emitMissed: !0,
          emitOnBegin: !0,
          poll: !0,
          pollingInterval: B,
          async onBlockNumber(a) {
            let o = (e) => {
                (clearTimeout(M), g?.(), e(), m?.());
              },
              f = a;
            if (!E)
              try {
                if (h) {
                  if (w > 1 && (!h.blockNumber || f - h.blockNumber + 1n < w))
                    return;
                  o(() => i.resolve(h));
                  return;
                }
                if (
                  (b &&
                    !d &&
                    ((E = !0),
                    await (0, s.f)(
                      async () => {
                        (d = await (0, n.f)(
                          e,
                          l.f,
                          "getTransaction",
                        )({ hash: v })).blockNumber && (f = d.blockNumber);
                      },
                      { delay: k, retryCount: P },
                    ),
                    (E = !1)),
                  (h = await (0, n.f)(
                    e,
                    c.f,
                    "getTransactionReceipt",
                  )({ hash: v })),
                  w > 1 && (!h.blockNumber || f - h.blockNumber + 1n < w))
                )
                  return;
                o(() => i.resolve(h));
              } catch (a) {
                if (a instanceof r.z || a instanceof r.r) {
                  if (!d) {
                    E = !1;
                    return;
                  }
                  try {
                    ((p = d), (E = !0));
                    let r = await (0, s.f)(
                      () =>
                        (0, n.f)(
                          e,
                          u.f,
                          "getBlock",
                        )({ blockNumber: f, includeTransactions: !0 }),
                      {
                        delay: k,
                        retryCount: P,
                        shouldRetry: ({ error: e }) => e instanceof t.f,
                      },
                    );
                    E = !1;
                    let a = r.transactions.find(
                      ({ from: e, nonce: t }) => e === p.from && t === p.nonce,
                    );
                    if (
                      !a ||
                      ((h = await (0, n.f)(
                        e,
                        c.f,
                        "getTransactionReceipt",
                      )({ hash: a.hash })),
                      w > 1 && (!h.blockNumber || f - h.blockNumber + 1n < w))
                    )
                      return;
                    let l = "replaced";
                    (a.to === p.to && a.value === p.value && a.input === p.input
                      ? (l = "repriced")
                      : a.from === a.to && 0n === a.value && (l = "cancelled"),
                      o(() => {
                        (i.onReplaced?.({
                          reason: l,
                          replacedTransaction: p,
                          transaction: a,
                          transactionReceipt: h,
                        }),
                          i.resolve(h));
                      }));
                  } catch (e) {
                    o(() => i.reject(e));
                  }
                } else o(() => i.reject(a));
              }
          },
        });
      })),
      N
    );
  }
  (e.s(["f", 0, y], 612180), e.s(["f", 0, h], 781401));
};
