// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(872682),
    i = e.i(168266),
    r = e.i(776238),
    a = e.i(369773),
    n = e.i(163401);
  let s = BigInt(0),
    l = BigInt(1),
    o = /part (\w+) not served/,
    c = /viewer mismatch/i,
    d = {
      schedule(e, t) {
        if (!t && "function" == typeof requestAnimationFrame) {
          let t,
            i = requestAnimationFrame(() => {
              (clearTimeout(t), e());
            });
          return (
            (t = setTimeout(() => {
              (cancelAnimationFrame(i), e());
            }, 250)),
            () => {
              (cancelAnimationFrame(i), clearTimeout(t));
            }
          );
        }
        let i = setTimeout(e, t ? 1e3 : 16);
        return () => clearTimeout(i);
      },
    },
    u = { isVisible: () => !0, subscribe: () => () => {} },
    p = (e) => {
      let t = -1;
      for (let i = e.length - 1; i >= 0; i--)
        if (e[i]?.kind === "frame") {
          t = i;
          break;
        }
      return e.filter((e, i) => "frame" !== e.kind || i === t);
    },
    m = (e) => [...e.rank.keys(), ...e.members.keys()],
    f = (e, t) => (t && (!e || t.blockId > e.blockId) ? t : e);
  e.s([
    "FLUSH_FALLBACK_MS",
    0,
    250,
    "HIDDEN_GRACE_MS",
    0,
    15e3,
    "IDLE_CLOSE_MS",
    0,
    1e4,
    "MAX_QUEUE",
    0,
    256,
    "MAX_SUBSCRIPTIONS_PER_REQUEST",
    0,
    32,
    "MAX_TOPICS",
    0,
    64,
    "STABLE_OPEN_MS",
    0,
    1e4,
    "STALE_MS",
    0,
    15e3,
    "UNSUBSCRIBE_DROP_MS",
    0,
    5e3,
    "WATCHDOG_INTERVAL_MS",
    0,
    5e3,
    "createStreamClient",
    0,
    function (e) {
      let g,
        v,
        h,
        S,
        b,
        k,
        y,
        T = e.now ?? (() => Date.now()),
        w = e.random ?? Math.random,
        A = e.scheduler ?? d,
        E = e.visibility ?? u,
        M = e.socketFactory ?? ((e, t) => new globalThis.WebSocket(e, t)),
        _ = e.log ?? (() => {}),
        O = (t, i, r) => e.onMetric?.({ name: t, value: i, tags: r }),
        C = new Map(),
        I = new Map(),
        L = new Map(),
        P = new Set(),
        R = new Set(),
        D = new Set(),
        B = new Set(),
        F = new Map(),
        q = new Set(),
        K = new Set(),
        U = "idle",
        N = 0,
        x = 0,
        $ = 0,
        V = 0,
        H = new WeakSet(),
        W = !1,
        X = null,
        z = !1,
        j = !E.isVisible(),
        J = !1,
        G = 0,
        Q = !1,
        Y = (e) => {
          if (e !== U) for (let t of ((U = e), P)) t(e);
        },
        Z = () => (z || (X = e.getToken()), X),
        ee = () =>
          [...C.values()].filter(
            (e) =>
              e.holders.size > 0 && !e.unsubscribing && !eo(e, el(e).parts),
          ),
        et = () => {
          v || (v = A.schedule(en, j || !E.isVisible()));
        },
        ei = (e, t) => {
          if ((e.queue.push(t), e.queue.length > 256)) {
            let t = p(e.queue);
            ((e.queue = t.some((e) => "gap" === e.kind)
              ? t
              : [{ kind: "gap" }, ...t]),
              O("queue_coalesced", 1));
          }
          (q.add(e.topic), et());
        },
        er = (e, t, i) => {
          (t.direct.push(i), q.add(e.topic), et());
        },
        ea = (e) => {
          (K.add(e), et());
        };
      function en() {
        ((v = void 0), (H = new WeakSet()));
        let e = 0,
          t = 0,
          i = [...q];
        for (let r of (q.clear(), i)) {
          let i = C.get(r);
          if (!i) continue;
          let a = i.queue;
          i.queue = [];
          let n = I.get(r);
          for (let s of (e++, [...i.holders.values()])) {
            let e = s.direct;
            s.direct = [];
            let i = "all" === s.delivery ? a : p(a),
              l = e.length ? [...e, ...i] : i;
            if (l.length) {
              t += l.length;
              try {
                s.listener(l, n);
              } catch (e) {
                _("error", "uapi-stream listener threw", {
                  topic: r,
                  err: String(e),
                });
              }
            }
          }
        }
        let r = [...K];
        for (let e of (K.clear(), r)) for (let t of [...(L.get(e) ?? [])]) t();
        e && O("flush", t, { topics: String(e) });
      }
      let es = (e) =>
          e.parts.filter((e) => !R.has(e) && !(e === t.Part.POSITION && !Z())),
        el = (e) => {
          let i = [
              ...new Set([...e.holders.values()].flatMap((e) => es(e))),
            ].sort((e, t) => e - t),
            r = [...e.holders.values()],
            a = r.some((e) => e.commitment === t.Commitment.PROCESSED)
              ? t.Commitment.PROCESSED
              : t.Commitment.CONFIRMED,
            n = new Map();
          for (let e of r)
            for (let t of e.candles) n.set(`${t.res}:${t.measure}`, t);
          let s = [...r].reverse().find((e) => e.list)?.list,
            l = JSON.stringify([
              i,
              a,
              [...n.keys()].sort(),
              s
                ? JSON.stringify(s, (e, t) =>
                    "bigint" == typeof t ? String(t) : t,
                  )
                : "",
            ]);
          return {
            parts: i,
            commitment: a,
            candles: [...n.values()],
            list: s,
            key: l,
          };
        },
        eo = (e, t) => !t.length && "coin" === (0, n.topicKind)(e.topic),
        ec = (e, i) =>
          1 !== i.parts.length ||
          i.parts[0] !== t.Part.MARKET ||
          i.candles.length ||
          i.list ||
          "coin" !== (0, n.topicKind)(e.topic)
            ? void 0
            : ((e) => {
                for (let t of C.values()) {
                  if (t.unsubscribing || !t.holders.size) continue;
                  let i = I.get(t.topic),
                    r = (0, a.isListState)(i) ? i.members.get(e) : void 0;
                  if (r) return r;
                }
              })(e.topic.slice(5)),
        ed = (e) => {
          let t = F.get(e) ?? [];
          (t.push(T() + 5e3), F.set(e, t));
        },
        eu = () => {
          Q ||
            ((Q = !0),
            queueMicrotask(() => {
              ((Q = !1), em());
            }));
        },
        ep = (e) => {
          let t = el(e);
          return (
            (e.union = t.parts),
            (e.commitment = t.commitment),
            (e.candles = t.candles),
            (e.list = t.list),
            (e.sentKey = t.key),
            (e.sent = !0),
            e.epoch++,
            (e.expectedSeq = l),
            (e.awaitingSnapshot = !0),
            {
              topic: e.topic,
              parts: t.parts,
              commitment: t.commitment,
              candles: t.candles,
              since: e.lastBlock,
              lastVersion: e.lastVersion ?? s,
              filters: t.list
                ? { case: "list", value: t.list }
                : { case: void 0 },
            }
          );
        };
      function em() {
        if (!g || 1 !== g.readyState) return;
        let e = [];
        for (let t of D) {
          if (C.get(t.topic) !== t || t.capped || t.unsubscribing) continue;
          let i = el(t);
          !t.holders.size || eo(t, i.parts) || ec(t, i) || e.push(ep(t));
        }
        D.clear();
        let t = [...B];
        if ((B.clear(), e.length || t.length)) {
          for (let i = 0; i < Math.max(e.length, 1); i += 32) {
            let a = e.slice(i, i + 32);
            g.send(
              (0, r.encodeWatch)({
                subscribe: a,
                unsubscribe: 0 === i ? t : [],
              }),
            );
          }
          for (let e of t) ed(e);
        }
      }
      let ef = () =>
          [...C.values()].filter(
            (e) => !e.capped && !e.unsubscribing && !eo(e, el(e).parts),
          ).length,
        eg = (e, t = !1) => {
          if (e.capped || e.unsubscribing || !e.holders.size) return;
          let i = el(e),
            r = ec(e, i);
          if (eo(e, i.parts) || r) {
            (D.delete(e),
              e.sent &&
                ((e.sent = !1), (e.sentKey = void 0), B.add(e.topic), eu()),
              r
                ? ((e.lastBlock = void 0),
                  I.get(e.topic) !== r && (I.set(e.topic, r), ea(e.topic)))
                : ev());
            return;
          }
          (t || !e.sent || i.key !== e.sentKey) &&
            (B.delete(e.topic), D.add(e), eu());
        },
        ev = () => {
          h ||
            ee().length ||
            (h = setTimeout(() => {
              ((h = void 0), ee().length || (eS(), ew("idle")));
            }, 1e4));
        },
        eh = () => {
          (h && clearTimeout(h), (h = void 0));
        },
        eS = () => {
          (S && clearTimeout(S), (S = void 0));
        },
        eb = (e) => {
          for (let t of e) {
            let e = `coin/${t}`;
            !(!t || C.has(e)) &&
              I.has(e) &&
              ([...C.values()].some((e) => {
                let i = I.get(e.topic);
                return (
                  (0, a.isListState)(i) && (i.rank.has(t) || i.members.has(t))
                );
              }) ||
                (I.delete(e), ea(e)));
          }
        },
        ek = () => {
          for (let e of C.values())
            "coin" === (0, n.topicKind)(e.topic) && eg(e);
        },
        ey = (e) => {
          if (
            (e.dropTimer && clearTimeout(e.dropTimer),
            e.retryTimer && clearTimeout(e.retryTimer),
            C.get(e.topic) !== e)
          )
            return;
          (C.delete(e.topic), D.delete(e));
          let t = I.get(e.topic);
          (I.delete(e.topic),
            (0, a.isListState)(t) && (eb(m(t)), ek()),
            ea(e.topic),
            (() => {
              for (let e of C.values()) {
                if (ef() >= 64) return;
                e.capped && e.holders.size && ((e.capped = !1), eg(e, !0));
              }
            })(),
            ev());
        },
        eT = () => {
          (y && clearInterval(y),
            (y = void 0),
            k && clearTimeout(k),
            (k = void 0));
        };
      function ew(e) {
        let t = g;
        if (((g = void 0), eT(), t)) {
          ((t.onopen = null),
            (t.onmessage = null),
            (t.onclose = null),
            (t.onerror = null));
          try {
            t.close(1e3);
          } catch (e) {
            _("debug", "uapi-stream close threw", { err: String(e) });
          }
          O("close", 1e3, { code: "1000" });
        }
        for (let e of (F.clear(), C.values())) e.sent = !1;
        "idle" === e
          ? Y("idle")
          : "paused" === e
            ? Y("paused")
            : "redial" === e && eE();
      }
      let eA = (e) => {
        (eS(),
          Y("down"),
          (S = setTimeout(() => {
            ((S = void 0), eE());
          }, e)));
      };
      function eE() {
        let d;
        if (g || J || j || !ee().length) return;
        eS();
        let u = Z(),
          p = e.url + (u ? `?token=${encodeURIComponent(u)}` : "");
        for (let e of (($ = 0), C.values())) e.sent = !1;
        (Y("connecting"), O("connect"), (N = T()));
        try {
          d = M(p, [r.STREAM_PROTOCOL]);
        } catch (e) {
          (_("error", "uapi-stream socket ctor threw", { err: String(e) }),
            eA((0, i.backoffDelay)(V++, w)));
          return;
        }
        ((d.binaryType = "arraybuffer"),
          (g = d),
          (d.onopen = () => {
            if (g !== d) return;
            (Y("open"),
              O("open", T() - N),
              ($ = x = T()),
              (y = setInterval(eM, 5e3)),
              (k = setTimeout(() => {
                V = 0;
              }, 1e4)));
            let e = ee().filter((e) => e.lastBlock || e.lastVersion);
            for (let t of (e.length &&
              O("resume", e.length, { topics: String(e.length) }),
            ee()))
              t.capped || D.add(t);
            em();
          }),
          (d.onmessage = (e) => {
            g === d &&
              (function (e) {
                let c, d;
                if (((x = T()), "string" == typeof e)) {
                  (_("warn", "uapi-stream ignored a text message"),
                    O("client_bug", 1, { reason: "text_message" }));
                  return;
                }
                try {
                  c = (0, r.decodeFrame)(e);
                } catch (e) {
                  (_("error", "uapi-stream frame decode failed", {
                    err: String(e),
                  }),
                    O("client_bug", 1, { reason: "decode" }));
                  return;
                }
                let u = c.payload;
                if ("heartbeat" === u.case) {
                  var p,
                    g,
                    v = c;
                  if ("heartbeat" !== v.payload.case) return;
                  let e = v.payload.value;
                  O("heartbeat", e.lagMs, {
                    chain: e.chainId,
                    degraded: String(e.degraded),
                  });
                  let t = I.get(""),
                    i = {
                      topic: "",
                      degradedLanes: e.degraded ? e.degradedLanes : [],
                      lagMsByChain: {
                        ...t?.lagMsByChain,
                        [e.chainId]: e.lagMs,
                      },
                    };
                  (I.set("", i),
                    (t &&
                      t.degradedLanes.join() === i.degradedLanes.join() &&
                      t.lagMsByChain[e.chainId] === e.lagMs) ||
                      ea(""));
                  return;
                }
                if (
                  ((p = c.topic),
                  (d = F.get(p)?.filter((e) => e > T())),
                  d?.length ? (F.set(p, d), !0) : (F.delete(p), !1))
                ) {
                  let e;
                  if ("end" !== u.case) return;
                  ((g = c.topic),
                    (e = F.get(g)),
                    e?.shift(),
                    e?.length || F.delete(g));
                  let t = C.get(c.topic);
                  t?.unsubscribing && ey(t);
                  return;
                }
                let h = C.get(c.topic);
                if (h) {
                  if ("gap" === u.case) {
                    (O("gap"),
                      (h.awaitingSnapshot = !0),
                      ei(h, {
                        kind: "gap",
                        lastDelivered: u.value.lastDelivered,
                        ringFloor: u.value.ringFloor,
                      }));
                    return;
                  }
                  "end" === u.case
                    ? ((e, r, a) => {
                        if (e.unsubscribing) return ey(e);
                        if (r === t.EndReason.NOT_FOUND) {
                          let i,
                            r,
                            n = o.exec(a),
                            s = n?.[1]
                              ? ((i = n[1].replace(/^PART_/, "")),
                                "number" == typeof (r = t.Part[i]) ? r : void 0)
                              : void 0;
                          if (void 0 !== s) {
                            (R.add(s),
                              e_(
                                e,
                                [...e.holders.values()].filter((e) =>
                                  e.parts.includes(s),
                                ),
                                [s],
                                "not-served",
                              ),
                              (e.sent = !1),
                              eg(e, !0));
                            return;
                          }
                        }
                        if (((e.sent = !1), r === t.EndReason.UNAVAILABLE)) {
                          if (e.unavailableEnds++ >= 1)
                            for (let t of [...e.holders.values()])
                              e_(e, [t], es(t), "unavailable");
                          (e.retryTimer && clearTimeout(e.retryTimer),
                            (e.retryTimer = setTimeout(
                              () => {
                                ((e.retryTimer = void 0),
                                  C.get(e.topic) === e && eg(e, !0));
                              },
                              (0, i.backoffDelay)(e.retries++, w),
                            )));
                          return;
                        }
                        ei(e, { kind: "end", reason: r, detail: a });
                      })(h, u.value.reason, u.value.detail)
                    : !h.unsubscribing &&
                      u.case &&
                      ((e, i) => {
                        let r,
                          o = i.payload,
                          c =
                            "coin" === (r = i.payload).case
                              ? r.value.kind === t.FrameKind.SNAPSHOT
                              : "list" === r.case
                                ? "snapshot" === r.value.body.case
                                : "wallet" === r.case &&
                                  r.value.kind === t.WalletFrameKind.SNAPSHOT,
                          d = !1;
                        if (
                          ((e.unavailableEnds = 0),
                          O("frames", 1, {
                            topic_kind: (0, n.topicKind)(i.topic) ?? "unknown",
                          }),
                          c)
                        )
                          ((e.awaitingSnapshot = !1),
                            (e.expectedSeq = i.seq + l),
                            (e.retries = 0));
                        else if (e.awaitingSnapshot) {
                          let t;
                          i.seq !== s &&
                            ((("coin" === (t = i.payload).case ||
                              "list" === t.case ||
                              "wallet" === t.case) &&
                              t.value.replayed) ||
                              i.seq === e.expectedSeq) &&
                            ((e.awaitingSnapshot = !1),
                            (e.expectedSeq = i.seq + l),
                            (e.retries = 0));
                        } else
                          i.seq !== s &&
                            (i.seq !== e.expectedSeq
                              ? (O("seq_skip", 1, {
                                  topic_kind:
                                    (0, n.topicKind)(i.topic) ?? "unknown",
                                }),
                                (d = !0),
                                ei(e, {
                                  kind: "gap",
                                  lastDelivered: e.lastBlock,
                                }),
                                eg(e, !0))
                              : (e.expectedSeq = i.seq + l));
                        let u = T(),
                          p = I.get(e.topic),
                          g = !1;
                        if ("coin" === o.case) {
                          let t = o.value;
                          ((g = t.replayed),
                            I.set(
                              e.topic,
                              (0, a.foldCoin)(
                                (0, a.isCoinState)(p) ? p : void 0,
                                t,
                                e.topic,
                                u,
                              ),
                            ),
                            d || (e.lastBlock = f(e.lastBlock, t.block)),
                            c &&
                              t.unavailable.length &&
                              ei(e, {
                                kind: "unavailable",
                                parts: t.unavailable,
                                why: "snapshot",
                              }));
                        } else if ("list" === o.case) {
                          let i = o.value;
                          g = i.replayed;
                          let r = (0, a.isListState)(p) ? p : void 0,
                            n = (0, a.foldList)(r, i, e.topic, u, H);
                          (I.set(e.topic, n),
                            "member" === i.body.case
                              ? ((e, i, r) => {
                                  if (!i.id) return;
                                  let n = (0, a.memberTopic)(i.id),
                                    s = e.members.get((0, a.refKey)(i.id)),
                                    l = C.get(n);
                                  if (s && (i.market || l || I.has(n))) {
                                    if (l) {
                                      if ((eg(l), !ec(l, el(l)))) return;
                                      ei(l, {
                                        kind: "frame",
                                        frame: new t.Frame({
                                          topic: n,
                                          payload: { case: "coin", value: i },
                                        }),
                                        snapshot: !1,
                                        replayed: r,
                                      });
                                    }
                                    (I.set(n, s), ea(n));
                                  }
                                })(n, i.body.value, i.replayed)
                              : (r && eb(m(r)), ek()),
                            d || (e.lastBlock = f(e.lastBlock, i.asOf)),
                            i.version > s && (e.lastVersion = i.version));
                        } else if ("wallet" === o.case) {
                          let t = o.value;
                          ((g = t.replayed),
                            I.set(e.topic, { topic: e.topic, wallet: t }),
                            d || (e.lastBlock = f(e.lastBlock, t.asOf)));
                        }
                        (ea(e.topic),
                          ei(e, {
                            kind: "frame",
                            frame: i,
                            snapshot: c,
                            replayed: g,
                          }));
                      })(h, c);
                }
              })(e.data);
          }),
          (d.onclose = (e) => {
            g === d &&
              ((e, t) => {
                for (let e of ((g = void 0), eT(), F.clear(), C.values()))
                  e.sent = !1;
                if ((O("close", e, { code: String(e) }), !J)) {
                  if ((1001 === e && R.clear(), !ee().length)) return Y("idle");
                  if (j) return Y("paused");
                  if (1008 === e) {
                    if (
                      (O("client_bug", 1, { reason: t || "policy" }),
                      c.test(t) && !W)
                    ) {
                      ((W = !0), (z = !1), eA(0));
                      return;
                    }
                    (_("error", "uapi-stream closed by policy", { reason: t }),
                      Y("down"));
                    return;
                  }
                  if (
                    ((1003 === e || 1007 === e) &&
                      (_("error", "uapi-stream rejected a message", {
                        code: e,
                        reason: t,
                      }),
                      O("client_bug", 1, { reason: `close_${e}` })),
                    1013 === e)
                  ) {
                    (eA(
                      $ > 0 && T() - $ >= 1e4
                        ? (0, i.drainDelay)(w)
                        : Math.min(i.BACKOFF_MAX_MS, (0, i.backoffDelay)(V, w)),
                    ),
                      V++);
                    return;
                  }
                  eA((0, i.backoffDelay)(V++, w));
                }
              })(e.code, e.reason);
          }),
          (d.onerror = () => {
            g === d && _("warn", "uapi-stream socket error");
          }));
      }
      function eM() {
        g &&
          ee().length &&
          (T() - x < 15e3 ||
            (O("stale_close"),
            _("warn", "uapi-stream stale socket, redialing"),
            ew("redial")));
      }
      let e_ = (e, t, i, r) => {
          for (let a of t) er(e, a, { kind: "unavailable", parts: i, why: r });
        },
        eO = () => {
          if (J) return;
          (b && clearTimeout(b), (b = void 0));
          let e = j;
          ((j = !1),
            !g &&
              (e || "down" === U || "paused" === U) &&
              ((V = 0), eS(), eE()));
        },
        eC = (e) => {
          if (!J) {
            if (e) {
              (b && clearTimeout(b),
                (b = void 0),
                (j = !0),
                eS(),
                ew("paused"));
              return;
            }
            b ||
              (b = setTimeout(() => {
                ((b = void 0), (j = !0), eS(), ew("paused"));
              }, 15e3));
          }
        },
        eI = E.subscribe((e) => (e ? eO() : eC(!1)));
      return {
        subscribe(e, i, r) {
          if (J) return () => {};
          let a = (0, n.topicKind)(e),
            s = ++G,
            o = {
              parts: i.parts ?? ("coin" === a ? [t.Part.MARKET] : []),
              commitment:
                i.commitment ??
                ("wallet" === a
                  ? t.Commitment.CONFIRMED
                  : t.Commitment.PROCESSED),
              candles: i.candles ?? [],
              list: i.list,
              delivery: i.delivery ?? "latest",
              listener: r,
              direct: [],
            },
            c = C.get(e);
          (c?.unsubscribing &&
            (c.dropTimer && clearTimeout(c.dropTimer),
            c.retryTimer && clearTimeout(c.retryTimer),
            C.delete(e),
            B.delete(e),
            (c = void 0)),
            !c &&
              ((c = {
                topic: e,
                holders: new Map(),
                union: [],
                commitment: o.commitment,
                candles: [],
                epoch: 0,
                expectedSeq: l,
                awaitingSnapshot: !0,
                queue: [],
                sent: !1,
                capped: ef() >= 64,
                unsubscribing: !1,
                retries: 0,
                unavailableEnds: 0,
              }),
              C.set(e, c),
              c.capped && O("topics_capped", 1)));
          let d = c;
          if ((d.holders.set(s, o), eh(), d.capped))
            e_(d, [o], o.parts, "topic-cap");
          else {
            o.parts.includes(t.Part.POSITION) &&
              !Z() &&
              e_(d, [o], [t.Part.POSITION], "no-viewer");
            let e = o.parts.filter((e) => R.has(e));
            (e.length && e_(d, [o], e, "not-served"), eg(d));
          }
          return (
            g || S || eE(),
            () => {
              if (d.holders.delete(s) && C.get(e) === d)
                if (0 === d.holders.size)
                  !d.capped && d.sent && g && 1 === g.readyState
                    ? ((d.unsubscribing = !0),
                      D.delete(d),
                      B.add(d.topic),
                      eu(),
                      (d.dropTimer = setTimeout(() => ey(d), 5e3)))
                    : ey(d);
                else eg(d);
            }
          );
        },
        getState: (e) => I.get(e),
        onTopic(e, t) {
          let i = L.get(e);
          return (
            i || ((i = new Set()), L.set(e, i)),
            i.add(t),
            () => {
              (i.delete(t), i.size || L.delete(e));
            }
          );
        },
        status: () => U,
        lastFrameAt: () => x,
        onStatus: (e) => (
          P.add(e),
          () => {
            P.delete(e);
          }
        ),
        setToken(e) {
          let t = Z();
          ((X = e), (z = !0), (W = !1), t !== e && g && ew("redial"));
        },
        pause() {
          eC(!0);
        },
        resume() {
          eO();
        },
        close() {
          for (let e of ((J = !0),
          eI(),
          eh(),
          eS(),
          b && clearTimeout(b),
          v?.(),
          (v = void 0),
          ew("idle"),
          C.values()))
            (e.dropTimer && clearTimeout(e.dropTimer),
              e.retryTimer && clearTimeout(e.retryTimer));
          (C.clear(), I.clear(), R.clear());
        },
        heldTopics: () => [...C.keys()],
      };
    },
  ]);
};
