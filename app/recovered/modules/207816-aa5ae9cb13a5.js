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
    d = /viewer mismatch/i,
    c = {
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
      let h,
        v,
        g,
        S,
        b,
        k,
        w,
        T = e.now ?? (() => Date.now()),
        y = e.random ?? Math.random,
        _ = e.scheduler ?? c,
        A = e.visibility ?? u,
        E = e.socketFactory ?? ((e, t) => new globalThis.WebSocket(e, t)),
        I = e.log ?? (() => {}),
        M = (t, i, r) => e.onMetric?.({ name: t, value: i, tags: r }),
        N = new Map(),
        C = new Map(),
        O = new Map(),
        D = new Set(),
        L = new Set(),
        R = new Set(),
        $ = new Set(),
        P = new Map(),
        F = new Set(),
        B = new Set(),
        K = "idle",
        q = 0,
        U = 0,
        x = 0,
        H = 0,
        z = new WeakSet(),
        W = !1,
        V = null,
        X = !1,
        J = !A.isVisible(),
        Y = !1,
        j = 0,
        G = !1,
        Q = (e) => {
          if (e !== K) for (let t of ((K = e), D)) t(e);
        },
        Z = () => (X || (V = e.getToken()), V),
        ee = () =>
          [...N.values()].filter(
            (e) =>
              e.holders.size > 0 && !e.unsubscribing && !eo(e, el(e).parts),
          ),
        et = () => {
          v || (v = _.schedule(en, J || !A.isVisible()));
        },
        ei = (e, t) => {
          if ((e.queue.push(t), e.queue.length > 256)) {
            let t = p(e.queue);
            ((e.queue = t.some((e) => "gap" === e.kind)
              ? t
              : [{ kind: "gap" }, ...t]),
              M("queue_coalesced", 1));
          }
          (F.add(e.topic), et());
        },
        er = (e, t, i) => {
          (t.direct.push(i), F.add(e.topic), et());
        },
        ea = (e) => {
          (B.add(e), et());
        };
      function en() {
        ((v = void 0), (z = new WeakSet()));
        let e = 0,
          t = 0,
          i = [...F];
        for (let r of (F.clear(), i)) {
          let i = N.get(r);
          if (!i) continue;
          let a = i.queue;
          i.queue = [];
          let n = C.get(r);
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
                I("error", "uapi-stream listener threw", {
                  topic: r,
                  err: String(e),
                });
              }
            }
          }
        }
        let r = [...B];
        for (let e of (B.clear(), r)) for (let t of [...(O.get(e) ?? [])]) t();
        e && M("flush", t, { topics: String(e) });
      }
      let es = (e) =>
          e.parts.filter((e) => !L.has(e) && !(e === t.Part.POSITION && !Z())),
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
        ed = (e, i) =>
          1 !== i.parts.length ||
          i.parts[0] !== t.Part.MARKET ||
          i.candles.length ||
          i.list ||
          "coin" !== (0, n.topicKind)(e.topic)
            ? void 0
            : ((e) => {
                for (let t of N.values()) {
                  if (t.unsubscribing || !t.holders.size) continue;
                  let i = C.get(t.topic),
                    r = (0, a.isListState)(i) ? i.members.get(e) : void 0;
                  if (r) return r;
                }
              })(e.topic.slice(5)),
        ec = (e) => {
          let t = P.get(e) ?? [];
          (t.push(T() + 5e3), P.set(e, t));
        },
        eu = () => {
          G ||
            ((G = !0),
            queueMicrotask(() => {
              ((G = !1), em());
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
        if (!h || 1 !== h.readyState) return;
        let e = [];
        for (let t of R) {
          if (N.get(t.topic) !== t || t.capped || t.unsubscribing) continue;
          let i = el(t);
          !t.holders.size || eo(t, i.parts) || ed(t, i) || e.push(ep(t));
        }
        R.clear();
        let t = [...$];
        if (($.clear(), e.length || t.length)) {
          for (let i = 0; i < Math.max(e.length, 1); i += 32) {
            let a = e.slice(i, i + 32);
            h.send(
              (0, r.encodeWatch)({
                subscribe: a,
                unsubscribe: 0 === i ? t : [],
              }),
            );
          }
          for (let e of t) ec(e);
        }
      }
      let ef = () =>
          [...N.values()].filter(
            (e) => !e.capped && !e.unsubscribing && !eo(e, el(e).parts),
          ).length,
        eh = (e, t = !1) => {
          if (e.capped || e.unsubscribing || !e.holders.size) return;
          let i = el(e),
            r = ed(e, i);
          if (eo(e, i.parts) || r) {
            (R.delete(e),
              e.sent &&
                ((e.sent = !1), (e.sentKey = void 0), $.add(e.topic), eu()),
              r
                ? ((e.lastBlock = void 0),
                  C.get(e.topic) !== r && (C.set(e.topic, r), ea(e.topic)))
                : ev());
            return;
          }
          (t || !e.sent || i.key !== e.sentKey) &&
            ($.delete(e.topic), R.add(e), eu());
        },
        ev = () => {
          g ||
            ee().length ||
            (g = setTimeout(() => {
              ((g = void 0), ee().length || (eS(), ey("idle")));
            }, 1e4));
        },
        eg = () => {
          (g && clearTimeout(g), (g = void 0));
        },
        eS = () => {
          (S && clearTimeout(S), (S = void 0));
        },
        eb = (e) => {
          for (let t of e) {
            let e = `coin/${t}`;
            !(!t || N.has(e)) &&
              C.has(e) &&
              ([...N.values()].some((e) => {
                let i = C.get(e.topic);
                return (
                  (0, a.isListState)(i) && (i.rank.has(t) || i.members.has(t))
                );
              }) ||
                (C.delete(e), ea(e)));
          }
        },
        ek = () => {
          for (let e of N.values())
            "coin" === (0, n.topicKind)(e.topic) && eh(e);
        },
        ew = (e) => {
          if (
            (e.dropTimer && clearTimeout(e.dropTimer),
            e.retryTimer && clearTimeout(e.retryTimer),
            N.get(e.topic) !== e)
          )
            return;
          (N.delete(e.topic), R.delete(e));
          let t = C.get(e.topic);
          (C.delete(e.topic),
            (0, a.isListState)(t) && (eb(m(t)), ek()),
            ea(e.topic),
            (() => {
              for (let e of N.values()) {
                if (ef() >= 64) return;
                e.capped && e.holders.size && ((e.capped = !1), eh(e, !0));
              }
            })(),
            ev());
        },
        eT = () => {
          (w && clearInterval(w),
            (w = void 0),
            k && clearTimeout(k),
            (k = void 0));
        };
      function ey(e) {
        let t = h;
        if (((h = void 0), eT(), t)) {
          ((t.onopen = null),
            (t.onmessage = null),
            (t.onclose = null),
            (t.onerror = null));
          try {
            t.close(1e3);
          } catch (e) {
            I("debug", "uapi-stream close threw", { err: String(e) });
          }
          M("close", 1e3, { code: "1000" });
        }
        for (let e of (P.clear(), N.values())) e.sent = !1;
        "idle" === e
          ? Q("idle")
          : "paused" === e
            ? Q("paused")
            : "redial" === e && eA();
      }
      let e_ = (e) => {
        (eS(),
          Q("down"),
          (S = setTimeout(() => {
            ((S = void 0), eA());
          }, e)));
      };
      function eA() {
        let c;
        if (h || Y || J || !ee().length) return;
        eS();
        let u = Z(),
          p = e.url + (u ? `?token=${encodeURIComponent(u)}` : "");
        for (let e of ((x = 0), N.values())) e.sent = !1;
        (Q("connecting"), M("connect"), (q = T()));
        try {
          c = E(p, [r.STREAM_PROTOCOL]);
        } catch (e) {
          (I("error", "uapi-stream socket ctor threw", { err: String(e) }),
            e_((0, i.backoffDelay)(H++, y)));
          return;
        }
        ((c.binaryType = "arraybuffer"),
          (h = c),
          (c.onopen = () => {
            if (h !== c) return;
            (Q("open"),
              M("open", T() - q),
              (x = U = T()),
              (w = setInterval(eE, 5e3)),
              (k = setTimeout(() => {
                H = 0;
              }, 1e4)));
            let e = ee().filter((e) => e.lastBlock || e.lastVersion);
            for (let t of (e.length &&
              M("resume", e.length, { topics: String(e.length) }),
            ee()))
              t.capped || R.add(t);
            em();
          }),
          (c.onmessage = (e) => {
            h === c &&
              (function (e) {
                let d, c;
                if (((U = T()), "string" == typeof e)) {
                  (I("warn", "uapi-stream ignored a text message"),
                    M("client_bug", 1, { reason: "text_message" }));
                  return;
                }
                try {
                  d = (0, r.decodeFrame)(e);
                } catch (e) {
                  (I("error", "uapi-stream frame decode failed", {
                    err: String(e),
                  }),
                    M("client_bug", 1, { reason: "decode" }));
                  return;
                }
                let u = d.payload;
                if ("heartbeat" === u.case) {
                  var p,
                    h,
                    v = d;
                  if ("heartbeat" !== v.payload.case) return;
                  let e = v.payload.value;
                  M("heartbeat", e.lagMs, {
                    chain: e.chainId,
                    degraded: String(e.degraded),
                  });
                  let t = C.get(""),
                    i = {
                      topic: "",
                      degradedLanes: e.degraded ? e.degradedLanes : [],
                      lagMsByChain: {
                        ...t?.lagMsByChain,
                        [e.chainId]: e.lagMs,
                      },
                    };
                  (C.set("", i),
                    (t &&
                      t.degradedLanes.join() === i.degradedLanes.join() &&
                      t.lagMsByChain[e.chainId] === e.lagMs) ||
                      ea(""));
                  return;
                }
                if (
                  ((p = d.topic),
                  (c = P.get(p)?.filter((e) => e > T())),
                  c?.length ? (P.set(p, c), !0) : (P.delete(p), !1))
                ) {
                  let e;
                  if ("end" !== u.case) return;
                  ((h = d.topic),
                    (e = P.get(h)),
                    e?.shift(),
                    e?.length || P.delete(h));
                  let t = N.get(d.topic);
                  t?.unsubscribing && ew(t);
                  return;
                }
                let g = N.get(d.topic);
                if (g) {
                  if ("gap" === u.case) {
                    (M("gap"),
                      (g.awaitingSnapshot = !0),
                      ei(g, {
                        kind: "gap",
                        lastDelivered: u.value.lastDelivered,
                        ringFloor: u.value.ringFloor,
                      }));
                    return;
                  }
                  "end" === u.case
                    ? ((e, r, a) => {
                        if (e.unsubscribing) return ew(e);
                        if (r === t.EndReason.NOT_FOUND) {
                          let i,
                            r,
                            n = o.exec(a),
                            s = n?.[1]
                              ? ((i = n[1].replace(/^PART_/, "")),
                                "number" == typeof (r = t.Part[i]) ? r : void 0)
                              : void 0;
                          if (void 0 !== s) {
                            (L.add(s),
                              eI(
                                e,
                                [...e.holders.values()].filter((e) =>
                                  e.parts.includes(s),
                                ),
                                [s],
                                "not-served",
                              ),
                              (e.sent = !1),
                              eh(e, !0));
                            return;
                          }
                        }
                        if (((e.sent = !1), r === t.EndReason.UNAVAILABLE)) {
                          if (e.unavailableEnds++ >= 1)
                            for (let t of [...e.holders.values()])
                              eI(e, [t], es(t), "unavailable");
                          (e.retryTimer && clearTimeout(e.retryTimer),
                            (e.retryTimer = setTimeout(
                              () => {
                                ((e.retryTimer = void 0),
                                  N.get(e.topic) === e && eh(e, !0));
                              },
                              (0, i.backoffDelay)(e.retries++, y),
                            )));
                          return;
                        }
                        ei(e, { kind: "end", reason: r, detail: a });
                      })(g, u.value.reason, u.value.detail)
                    : !g.unsubscribing &&
                      u.case &&
                      ((e, i) => {
                        let r,
                          o = i.payload,
                          d =
                            "coin" === (r = i.payload).case
                              ? r.value.kind === t.FrameKind.SNAPSHOT
                              : "list" === r.case
                                ? "snapshot" === r.value.body.case
                                : "wallet" === r.case &&
                                  r.value.kind === t.WalletFrameKind.SNAPSHOT,
                          c = !1;
                        if (
                          ((e.unavailableEnds = 0),
                          M("frames", 1, {
                            topic_kind: (0, n.topicKind)(i.topic) ?? "unknown",
                          }),
                          d)
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
                              ? (M("seq_skip", 1, {
                                  topic_kind:
                                    (0, n.topicKind)(i.topic) ?? "unknown",
                                }),
                                (c = !0),
                                ei(e, {
                                  kind: "gap",
                                  lastDelivered: e.lastBlock,
                                }),
                                eh(e, !0))
                              : (e.expectedSeq = i.seq + l));
                        let u = T(),
                          p = C.get(e.topic),
                          h = !1;
                        if ("coin" === o.case) {
                          let t = o.value;
                          ((h = t.replayed),
                            C.set(
                              e.topic,
                              (0, a.foldCoin)(
                                (0, a.isCoinState)(p) ? p : void 0,
                                t,
                                e.topic,
                                u,
                              ),
                            ),
                            c || (e.lastBlock = f(e.lastBlock, t.block)),
                            d &&
                              t.unavailable.length &&
                              ei(e, {
                                kind: "unavailable",
                                parts: t.unavailable,
                                why: "snapshot",
                              }));
                        } else if ("list" === o.case) {
                          let i = o.value;
                          h = i.replayed;
                          let r = (0, a.isListState)(p) ? p : void 0,
                            n = (0, a.foldList)(r, i, e.topic, u, z);
                          (C.set(e.topic, n),
                            "member" === i.body.case
                              ? ((e, i, r) => {
                                  if (!i.id) return;
                                  let n = (0, a.memberTopic)(i.id),
                                    s = e.members.get((0, a.refKey)(i.id)),
                                    l = N.get(n);
                                  if (s && (i.market || l || C.has(n))) {
                                    if (l) {
                                      if ((eh(l), !ed(l, el(l)))) return;
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
                                    (C.set(n, s), ea(n));
                                  }
                                })(n, i.body.value, i.replayed)
                              : (r && eb(m(r)), ek()),
                            c || (e.lastBlock = f(e.lastBlock, i.asOf)),
                            i.version > s && (e.lastVersion = i.version));
                        } else if ("wallet" === o.case) {
                          let t = o.value;
                          ((h = t.replayed),
                            C.set(e.topic, { topic: e.topic, wallet: t }),
                            c || (e.lastBlock = f(e.lastBlock, t.asOf)));
                        }
                        (ea(e.topic),
                          ei(e, {
                            kind: "frame",
                            frame: i,
                            snapshot: d,
                            replayed: h,
                          }));
                      })(g, d);
                }
              })(e.data);
          }),
          (c.onclose = (e) => {
            h === c &&
              ((e, t) => {
                for (let e of ((h = void 0), eT(), P.clear(), N.values()))
                  e.sent = !1;
                if ((M("close", e, { code: String(e) }), !Y)) {
                  if ((1001 === e && L.clear(), !ee().length)) return Q("idle");
                  if (J) return Q("paused");
                  if (1008 === e) {
                    if (
                      (M("client_bug", 1, { reason: t || "policy" }),
                      d.test(t) && !W)
                    ) {
                      ((W = !0), (X = !1), e_(0));
                      return;
                    }
                    (I("error", "uapi-stream closed by policy", { reason: t }),
                      Q("down"));
                    return;
                  }
                  if (
                    ((1003 === e || 1007 === e) &&
                      (I("error", "uapi-stream rejected a message", {
                        code: e,
                        reason: t,
                      }),
                      M("client_bug", 1, { reason: `close_${e}` })),
                    1013 === e)
                  ) {
                    (e_(
                      x > 0 && T() - x >= 1e4
                        ? (0, i.drainDelay)(y)
                        : Math.min(i.BACKOFF_MAX_MS, (0, i.backoffDelay)(H, y)),
                    ),
                      H++);
                    return;
                  }
                  e_((0, i.backoffDelay)(H++, y));
                }
              })(e.code, e.reason);
          }),
          (c.onerror = () => {
            h === c && I("warn", "uapi-stream socket error");
          }));
      }
      function eE() {
        h &&
          ee().length &&
          (T() - U < 15e3 ||
            (M("stale_close"),
            I("warn", "uapi-stream stale socket, redialing"),
            ey("redial")));
      }
      let eI = (e, t, i, r) => {
          for (let a of t) er(e, a, { kind: "unavailable", parts: i, why: r });
        },
        eM = () => {
          if (Y) return;
          (b && clearTimeout(b), (b = void 0));
          let e = J;
          ((J = !1),
            !h &&
              (e || "down" === K || "paused" === K) &&
              ((H = 0), eS(), eA()));
        },
        eN = (e) => {
          if (!Y) {
            if (e) {
              (b && clearTimeout(b),
                (b = void 0),
                (J = !0),
                eS(),
                ey("paused"));
              return;
            }
            b ||
              (b = setTimeout(() => {
                ((b = void 0), (J = !0), eS(), ey("paused"));
              }, 15e3));
          }
        },
        eC = A.subscribe((e) => (e ? eM() : eN(!1)));
      return {
        subscribe(e, i, r) {
          if (Y) return () => {};
          let a = (0, n.topicKind)(e),
            s = ++j,
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
            d = N.get(e);
          (d?.unsubscribing &&
            (d.dropTimer && clearTimeout(d.dropTimer),
            d.retryTimer && clearTimeout(d.retryTimer),
            N.delete(e),
            $.delete(e),
            (d = void 0)),
            !d &&
              ((d = {
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
              N.set(e, d),
              d.capped && M("topics_capped", 1)));
          let c = d;
          if ((c.holders.set(s, o), eg(), c.capped))
            eI(c, [o], o.parts, "topic-cap");
          else {
            o.parts.includes(t.Part.POSITION) &&
              !Z() &&
              eI(c, [o], [t.Part.POSITION], "no-viewer");
            let e = o.parts.filter((e) => L.has(e));
            (e.length && eI(c, [o], e, "not-served"), eh(c));
          }
          return (
            h || S || eA(),
            () => {
              if (c.holders.delete(s) && N.get(e) === c)
                if (0 === c.holders.size)
                  !c.capped && c.sent && h && 1 === h.readyState
                    ? ((c.unsubscribing = !0),
                      R.delete(c),
                      $.add(c.topic),
                      eu(),
                      (c.dropTimer = setTimeout(() => ew(c), 5e3)))
                    : ew(c);
                else eh(c);
            }
          );
        },
        getState: (e) => C.get(e),
        onTopic(e, t) {
          let i = O.get(e);
          return (
            i || ((i = new Set()), O.set(e, i)),
            i.add(t),
            () => {
              (i.delete(t), i.size || O.delete(e));
            }
          );
        },
        status: () => K,
        lastFrameAt: () => U,
        onStatus: (e) => (
          D.add(e),
          () => {
            D.delete(e);
          }
        ),
        setToken(e) {
          let t = Z();
          ((V = e), (X = !0), (W = !1), t !== e && h && ey("redial"));
        },
        pause() {
          eN(!0);
        },
        resume() {
          eM();
        },
        close() {
          for (let e of ((Y = !0),
          eC(),
          eg(),
          eS(),
          b && clearTimeout(b),
          v?.(),
          (v = void 0),
          ey("idle"),
          N.values()))
            (e.dropTimer && clearTimeout(e.dropTimer),
              e.retryTimer && clearTimeout(e.retryTimer));
          (N.clear(), C.clear(), L.clear());
        },
        heldTopics: () => [...N.keys()],
      };
    },
  ]);
};
