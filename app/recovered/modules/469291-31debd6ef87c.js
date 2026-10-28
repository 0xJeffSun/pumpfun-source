// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(970358),
    r = e.i(262548),
    n = e.i(225587);
  let i = ["size", "totalDifficulty", "transactions", "uncles", "withdrawals"];
  e.s(
    [
      "f",
      0,
      function (e, { onBlockHeader: a, onError: s }) {
        let o,
          u = (0, n.f)(["watchBlockHeaders", e.uid]);
        return (0, r.f)(u, { onBlockHeader: a, onError: s }, (r) => {
          let n = !0,
            a = !1,
            s = () => (n = !1);
          return (
            (async () => {
              try {
                let u = (() => {
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
                  { unsubscribe: l } = await u.subscribe({
                    params: ["newHeads"],
                    onData(a) {
                      if (!n) return;
                      let s = (e.chain?.formatters?.block?.format || t.f)(
                        a.result,
                        "watchBlockHeaders",
                      );
                      for (let e of i) delete s[e];
                      (r.onBlockHeader(s, o), (o = s));
                    },
                    onError(e) {
                      a && r.onError?.(e);
                    },
                  });
                ((a = !0), (s = l), n || s());
              } catch (e) {
                r.onError?.(e);
              }
            })(),
            () => s()
          );
        });
      },
    ],
    469291,
  );
  var a = e.i(586844),
    s = e.i(369155),
    o = e.i(95285);
  e.s(
    [
      "f",
      0,
      function (
        e,
        {
          blockTag: t = e.experimental_blockTag ?? "latest",
          emitMissed: i = !1,
          emitOnBegin: u = !1,
          onBlock: l,
          onError: c,
          includeTransactions: f,
          poll: d,
          pollingInterval: p = e.pollingInterval,
        },
      ) {
        let y,
          h,
          m,
          g,
          b,
          w =
            void 0 !== d
              ? d
              : "webSocket" !== e.transport.type &&
                "ipc" !== e.transport.type &&
                ("fallback" !== e.transport.type ||
                  ("webSocket" !== e.transport.transports[0].config.type &&
                    "ipc" !== e.transport.transports[0].config.type)),
          v = f ?? !1;
        return w
          ? ((h = (0, n.f)(["watchBlocks", e.uid, t, i, u, v, p])),
            (0, r.f)(h, { onBlock: l, onError: c }, (r) =>
              (0, s.f)(
                async () => {
                  try {
                    let n = await (0, a.f)(
                      e,
                      o.f,
                      "getBlock",
                    )({ blockTag: t, includeTransactions: v });
                    if (null !== n.number && y?.number != null) {
                      if (n.number === y.number) return;
                      if (n.number - y.number > 1 && i)
                        for (let t = y?.number + 1n; t < n.number; t++) {
                          let n = await (0, a.f)(
                            e,
                            o.f,
                            "getBlock",
                          )({ blockNumber: t, includeTransactions: v });
                          (r.onBlock(n, y), (y = n));
                        }
                    }
                    (y?.number == null ||
                      ("pending" === t && n?.number == null) ||
                      (null !== n.number && n.number > y.number)) &&
                      (r.onBlock(n, y), (y = n));
                  } catch (e) {
                    r.onError?.(e);
                  }
                },
                { emitOnBegin: u, interval: p },
              ),
            ))
          : ((m = !0),
            (g = !0),
            (b = () => (m = !1)),
            (async () => {
              try {
                u &&
                  (0, a.f)(
                    e,
                    o.f,
                    "getBlock",
                  )({ blockTag: t, includeTransactions: v })
                    .then((e) => {
                      !m || (g && (l(e, void 0), (g = !1)));
                    })
                    .catch(c);
                let r = (() => {
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
                  { unsubscribe: n } = await r.subscribe({
                    params: ["newHeads"],
                    async onData(t) {
                      if (!m) return;
                      let r = await (0, a.f)(
                        e,
                        o.f,
                        "getBlock",
                      )({
                        blockNumber: t.result?.number,
                        includeTransactions: v,
                      }).catch(() => {});
                      m && (l(r, y), (g = !1), (y = r));
                    },
                    onError(e) {
                      c?.(e);
                    },
                  });
                ((b = n), m || b());
              } catch (e) {
                c?.(e);
              }
            })(),
            () => b());
      },
    ],
    387237,
  );
  var u = e.i(641802),
    l = e.i(214721),
    c = e.i(224008),
    f = e.i(50569),
    d = e.i(548291),
    p = e.i(413417),
    y = e.i(274994),
    h = e.i(201033),
    m = e.i(336934),
    g = e.i(336122);
  e.s(
    [
      "f",
      0,
      function (e, t) {
        let i,
          o,
          b,
          w,
          v,
          {
            abi: x,
            address: P,
            args: k,
            batch: A = !0,
            eventName: I,
            fromBlock: B,
            onError: E,
            onLogs: N,
            poll: T,
            pollingInterval: S = e.pollingInterval,
            strict: M,
          } = t;
        return (
          void 0 !== T
            ? T
            : "bigint" == typeof B ||
              ("webSocket" !== e.transport.type &&
                "ipc" !== e.transport.type &&
                ("fallback" !== e.transport.type ||
                  ("webSocket" !== e.transport.transports[0].config.type &&
                    "ipc" !== e.transport.transports[0].config.type)))
        )
          ? ((i = M ?? !1),
            (o = (0, n.f)(["watchContractEvent", P, k, A, e.uid, I, S, i, B])),
            (0, r.f)(o, { onLogs: N, onError: E }, (t) => {
              let r, n;
              void 0 !== B && (r = B - 1n);
              let o = !1,
                u = (0, s.f)(
                  async () => {
                    if (!o) {
                      try {
                        n = await (0, a.f)(
                          e,
                          p.f,
                          "createContractEventFilter",
                        )({
                          abi: x,
                          address: P,
                          args: k,
                          eventName: I,
                          strict: i,
                          fromBlock: B,
                        });
                      } catch {}
                      o = !0;
                      return;
                    }
                    try {
                      let s;
                      if (n)
                        s = await (0, a.f)(
                          e,
                          m.f,
                          "getFilterChanges",
                        )({ filter: n });
                      else {
                        let t = await (0, a.f)(e, y.f, "getBlockNumber")({});
                        ((s =
                          r && r < t
                            ? await (0, a.f)(
                                e,
                                h.f,
                                "getContractEvents",
                              )({
                                abi: x,
                                address: P,
                                args: k,
                                eventName: I,
                                fromBlock: r + 1n,
                                toBlock: t,
                                strict: i,
                              })
                            : []),
                          (r = t));
                      }
                      if (0 === s.length) return;
                      if (A) t.onLogs(s);
                      else for (let e of s) t.onLogs([e]);
                    } catch (e) {
                      (n && e instanceof l.L && (o = !1), t.onError?.(e));
                    }
                  },
                  { emitOnBegin: !0, interval: S },
                );
              return async () => {
                (n &&
                  (await (0, a.f)(e, g.f, "uninstallFilter")({ filter: n })),
                  u());
              };
            }))
          : ((b = (0, n.f)([
              "watchContractEvent",
              P,
              k,
              A,
              e.uid,
              I,
              S,
              M ?? !1,
            ])),
            (w = !0),
            (v = () => (w = !1)),
            (0, r.f)(
              b,
              { onLogs: N, onError: E },
              (t) => (
                (async () => {
                  try {
                    let r = (() => {
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
                      n = I ? (0, f.f)({ abi: x, eventName: I, args: k }) : [],
                      { unsubscribe: i } = await r.subscribe({
                        params: ["logs", { address: P, topics: n }],
                        onData(e) {
                          if (!w) return;
                          let r = e.result;
                          try {
                            let { eventName: e, args: n } = (0, c.f)({
                                abi: x,
                                data: r.data,
                                topics: r.topics,
                                strict: M,
                              }),
                              i = (0, d.f)(r, { args: n, eventName: e });
                            t.onLogs([i]);
                          } catch (a) {
                            let e, n;
                            if (a instanceof u.t || a instanceof u.s) {
                              if (M) return;
                              ((e = a.abiItem.name),
                                (n = a.abiItem.inputs?.some(
                                  (e) => !("name" in e && e.name),
                                )));
                            }
                            let i = (0, d.f)(r, {
                              args: n ? [] : {},
                              eventName: e,
                            });
                            t.onLogs([i]);
                          }
                        },
                        onError(e) {
                          t.onError?.(e);
                        },
                      });
                    ((v = i), w || v());
                  } catch (e) {
                    E?.(e);
                  }
                })(),
                () => v()
              ),
            ));
      },
    ],
    131461,
  );
  var b = e.i(344997),
    w = e.i(262425);
  e.s(
    [
      "f",
      0,
      function (
        e,
        {
          address: t,
          args: i,
          batch: o = !0,
          event: p,
          events: h,
          fromBlock: v,
          onError: x,
          onLogs: P,
          poll: k,
          pollingInterval: A = e.pollingInterval,
          strict: I,
        },
      ) {
        let B,
          E,
          N,
          T =
            void 0 !== k
              ? k
              : "bigint" == typeof v ||
                ("webSocket" !== e.transport.type &&
                  "ipc" !== e.transport.type &&
                  ("fallback" !== e.transport.type ||
                    ("webSocket" !== e.transport.transports[0].config.type &&
                      "ipc" !== e.transport.transports[0].config.type))),
          S = I ?? !1;
        return T
          ? ((B = (0, n.f)(["watchEvent", t, i, o, e.uid, p, A, v])),
            (0, r.f)(B, { onLogs: P, onError: x }, (r) => {
              let n, u;
              void 0 !== v && (n = v - 1n);
              let c = !1,
                f = (0, s.f)(
                  async () => {
                    if (!c) {
                      try {
                        u = await (0, a.f)(
                          e,
                          b.f,
                          "createEventFilter",
                        )({
                          address: t,
                          args: i,
                          event: p,
                          events: h,
                          strict: S,
                          fromBlock: v,
                        });
                      } catch {}
                      c = !0;
                      return;
                    }
                    try {
                      let s;
                      if (u)
                        s = await (0, a.f)(
                          e,
                          m.f,
                          "getFilterChanges",
                        )({ filter: u });
                      else {
                        let r = await (0, a.f)(e, y.f, "getBlockNumber")({});
                        ((s =
                          n && n !== r
                            ? await (0, a.f)(
                                e,
                                w.f,
                                "getLogs",
                              )({
                                address: t,
                                args: i,
                                event: p,
                                events: h,
                                fromBlock: n + 1n,
                                toBlock: r,
                              })
                            : []),
                          (n = r));
                      }
                      if (0 === s.length) return;
                      if (o) r.onLogs(s);
                      else for (let e of s) r.onLogs([e]);
                    } catch (e) {
                      (u && e instanceof l.L && (c = !1), r.onError?.(e));
                    }
                  },
                  { emitOnBegin: !0, interval: A },
                );
              return async () => {
                (u &&
                  (await (0, a.f)(e, g.f, "uninstallFilter")({ filter: u })),
                  f());
              };
            }))
          : ((E = !0),
            (N = () => (E = !1)),
            (async () => {
              try {
                let r = (() => {
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
                  n = h ?? (p ? [p] : void 0),
                  a = [];
                n &&
                  ((a = [
                    n.flatMap((e) =>
                      (0, f.f)({ abi: [e], eventName: e.name, args: i }),
                    ),
                  ]),
                  p && (a = a[0]));
                let { unsubscribe: s } = await r.subscribe({
                  params: ["logs", { address: t, topics: a }],
                  onData(e) {
                    if (!E) return;
                    let t = e.result;
                    try {
                      let { eventName: e, args: r } = (0, c.f)({
                          abi: n ?? [],
                          data: t.data,
                          topics: t.topics,
                          strict: S,
                        }),
                        i = (0, d.f)(t, { args: r, eventName: e });
                      P([i]);
                    } catch (n) {
                      let e, r;
                      if (n instanceof u.t || n instanceof u.s) {
                        if (I) return;
                        ((e = n.abiItem.name),
                          (r = n.abiItem.inputs?.some(
                            (e) => !("name" in e && e.name),
                          )));
                      }
                      P([(0, d.f)(t, { args: r ? [] : {}, eventName: e })]);
                    }
                  },
                  onError(e) {
                    x?.(e);
                  },
                });
                ((N = s), E || N());
              } catch (e) {
                x?.(e);
              }
            })(),
            () => N());
      },
    ],
    682581,
  );
  var v = e.i(600934);
  e.s(
    [
      "f",
      0,
      function (
        e,
        {
          batch: t = !0,
          onError: i,
          onTransactions: o,
          poll: u,
          pollingInterval: l = e.pollingInterval,
        },
      ) {
        let c, f, d;
        return (
          void 0 !== u
            ? u
            : "webSocket" !== e.transport.type && "ipc" !== e.transport.type
        )
          ? ((c = (0, n.f)(["watchPendingTransactions", e.uid, t, l])),
            (0, r.f)(c, { onTransactions: o, onError: i }, (r) => {
              let n,
                i = (0, s.f)(
                  async () => {
                    try {
                      if (!n)
                        try {
                          n = await (0, a.f)(
                            e,
                            v.f,
                            "createPendingTransactionFilter",
                          )({});
                          return;
                        } catch (e) {
                          throw (i(), e);
                        }
                      let s = await (0, a.f)(
                        e,
                        m.f,
                        "getFilterChanges",
                      )({ filter: n });
                      if (0 === s.length) return;
                      if (t) r.onTransactions(s);
                      else for (let e of s) r.onTransactions([e]);
                    } catch (e) {
                      r.onError?.(e);
                    }
                  },
                  { emitOnBegin: !0, interval: l },
                );
              return async () => {
                (n &&
                  (await (0, a.f)(e, g.f, "uninstallFilter")({ filter: n })),
                  i());
              };
            }))
          : ((f = !0),
            (d = () => (f = !1)),
            (async () => {
              try {
                let { unsubscribe: t } = await e.transport.subscribe({
                  params: ["newPendingTransactions"],
                  onData(e) {
                    f && o([e.result]);
                  },
                  onError(e) {
                    i?.(e);
                  },
                });
                ((d = t), f || d());
              } catch (e) {
                i?.(e);
              }
            })(),
            () => d());
      },
    ],
    757704,
  );
  var x = e.i(810186);
  let P = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
  function k(e) {
    return new Date(
      !P.test(e) || Number.isNaN(new Date(e).getTime()) ? 0 / 0 : e,
    );
  }
  let A =
      /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/,
    I =
      /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;
  var B = e.i(858042),
    E = e.i(954982),
    N = e.i(278133);
  async function T(e, t) {
    let {
        address: r,
        domain: n,
        message: i,
        nonce: a,
        scheme: s,
        signature: o,
        time: u = new Date(),
        ...l
      } = t,
      c = (function (e) {
        let { scheme: t, statement: r, ...n } = e.match(A)?.groups ?? {},
          {
            chainId: i,
            expirationTime: a,
            issuedAt: s,
            notBefore: o,
            requestId: u,
            ...l
          } = e.match(I)?.groups ?? {},
          c = e.split("Resources:")[1]?.split("\n- ").slice(1);
        return {
          ...n,
          ...l,
          ...(i ? { chainId: Number(i) } : {}),
          ...(a ? { expirationTime: k(a) } : {}),
          ...(s ? { issuedAt: k(s) } : {}),
          ...(o ? { notBefore: k(o) } : {}),
          ...(u ? { requestId: u } : {}),
          ...(c ? { resources: c } : {}),
          ...(t ? { scheme: t } : {}),
          ...(r ? { statement: r } : {}),
        };
      })(i);
    if (
      !c.address ||
      !(function (e) {
        let {
          address: t,
          domain: r,
          message: n,
          nonce: i,
          scheme: a,
          time: s = new Date(),
        } = e;
        if (
          (r && n.domain !== r) ||
          (i && n.nonce !== i) ||
          (a && n.scheme !== a) ||
          Number.isNaN(s.getTime()) ||
          (n.expirationTime &&
            (Number.isNaN(n.expirationTime.getTime()) ||
              s >= n.expirationTime)) ||
          (n.notBefore &&
            (Number.isNaN(n.notBefore.getTime()) || s < n.notBefore))
        )
          return !1;
        try {
          if (
            !n.address ||
            !(0, B.f)(n.address, { strict: !1 }) ||
            (t && !(0, E.f)(n.address, t))
          )
            return !1;
        } catch {
          return !1;
        }
        return !0;
      })({ address: r, domain: n, message: c, nonce: a, scheme: s, time: u })
    )
      return !1;
    let f = (0, x.f)(i);
    return (0, N.f)(e, { address: c.address, hash: f, signature: o, ...l });
  }
  e.s(["f", 0, T], 637255);
};
