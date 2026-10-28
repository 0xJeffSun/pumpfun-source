// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(322315),
    n = e.i(254010),
    r = e.i(914549),
    s = e.i(574472),
    o = e.i(606933),
    a = e.i(352386),
    l = e.i(593035),
    u = e.i(521045),
    d = e.i(85324),
    c = e.i(967936),
    p = e.i(254667),
    m = e.i(584229),
    f = e.i(316069),
    h = e.i(574148),
    w = e.i(781311);
  let g = new Set(),
    _ = (e) => Date.now() - (e.marks[0]?.markedAt ?? Date.now()),
    y = ({ trigger: e }, t, i) => {
      try {
        let n = (0, w.Y)(t);
        if (null === n) return null;
        let r = `${i}:${n.attempts}`;
        if (!(0, w.O)(t, r)) return null;
        let s = (0, w.J)(n);
        p.y.info("perp_payout_resume_skipped", {
          trigger: e,
          reason: i,
          evm_wallet: n.evmWallet,
          coin: s.coin,
          owed_seq: s.seq,
          owed_age_ms: _(n),
          attempts: n.attempts,
        });
      } catch (e) {
        p.y.warn("[perpPayoutResume] skip_log_failed", {
          reason: i,
          error: (0, m.A)(e),
        });
      }
      return null;
    };
  var v = e.i(617938),
    k = e.i(74969);
  let b = ["perps"];
  function S() {
    return !(0, r.F)();
  }
  function P() {
    return !0;
  }
  e.s(
    [
      "PerpPayoutResumeLeaf",
      0,
      function () {
        return (
          (() => {
            let e,
              r,
              x,
              R = (0, t.c)(15),
              A = (0, o.useQueryClient)(),
              { address: C } = (0, s.F)(),
              { signers: U } = (0, k.f)(),
              q = (0, n.k)(i.D.WEB_PERPS_PAYOUT_FAST_SIGN, !1),
              I = (0, n.k)(i.D.WEB_PERPS_BRIDGE_RAIL, !1),
              M = (0, d.p)(),
              O = U?.evmWallet,
              W = `${C ?? ""}|${O ?? ""}`,
              B = (0, a.useRef)(null),
              E = (0, a.useRef)(M);
            R[0] !== C ||
            R[1] !== I ||
            R[2] !== O ||
            R[3] !== q ||
            R[4] !== A ||
            R[5] !== U
              ? ((e = (e) => {
                  if (!C || !O || null === U) return !1;
                  let t = ((e) => {
                    let { walletAddress: t, evmWallet: i } = e;
                    if (!t || !i) return null;
                    if (g.has(t)) return y(e, t, "in_flight");
                    g.add(t);
                    let n = null;
                    try {
                      n = ((e, t, i) => {
                        let n, r;
                        if (!e.isStillSignedIn()) return null;
                        let s = (0, w.Y)(t);
                        if (null === s) return null;
                        let o = (0, w.J)(s);
                        if (Date.now() - o.markedAt > 2592e6)
                          return (
                            (0, w.a)(t),
                            p.y.info("perp_payout_owed_cleared", {
                              evm_wallet: s.evmWallet,
                              reason: "expired",
                              coin: o.coin,
                              denomination: o.denominationOut,
                              owed_seq: o.seq,
                              owed_marks: s.marks.length,
                              owed_left: 0,
                              owed_age_ms: _(s),
                            }),
                            null
                          );
                        if (s.evmWallet.toLowerCase() !== i.toLowerCase())
                          return y(e, t, "evm_wallet_changed");
                        if (s.attempts >= 5)
                          return y(e, t, "attempts_exhausted");
                        if (
                          s.attempts > 0 &&
                          Date.now() - (s.lastAttemptAt ?? 0) <
                            ((r = s.attempts), 6e4 * 2 ** Math.max(0, r - 1))
                        )
                          return y(e, t, "backoff");
                        if ((0, h.e)(i) || e.isPerpMutationRunning())
                          return y(e, t, "flow_running");
                        if (!e.canSignSilently())
                          return y(e, t, "would_prompt");
                        try {
                          n = e.resolveDeps();
                        } catch (n) {
                          return (
                            p.y.warn("[perpPayoutResume] deps_unavailable", {
                              evm_wallet: i,
                              error: (0, m.A)(n),
                            }),
                            y(e, t, "deps_unavailable")
                          );
                        }
                        let a = (0, w.H)(t, Date.now());
                        return null === a
                          ? null
                          : (p.y.info("perp_payout_resume_started", {
                              trigger: e.trigger,
                              evm_wallet: s.evmWallet,
                              coin: o.coin,
                              denomination: o.denominationOut,
                              owed_seq: o.seq,
                              owed_marks: s.marks.length,
                              owed_age_ms: _(s),
                              attempt: a.attempts,
                            }),
                            {
                              attempt: (0, f.a)({
                                coin: o.coin,
                                denominationOut: o.denominationOut,
                                deps: n,
                                payoutFastSign: !0 === e.payoutFastSign,
                                bridgeRail: !0 === e.bridgeRail,
                              }),
                              mark: o,
                            });
                      })(e, t, i);
                    } catch (e) {
                      p.y.warn("[perpPayoutResume] resume_failed", {
                        evm_wallet: i,
                        error: (0, m.A)(e),
                      });
                    }
                    return null === n
                      ? (g.delete(t), null)
                      : (n.attempt.settled.then(() => {
                          g.delete(t);
                        }),
                        n);
                  })({
                    trigger: e,
                    walletAddress: C,
                    evmWallet: O,
                    resolveDeps: () => (0, u.f)(U),
                    isPerpMutationRunning: () =>
                      A.isMutating({ mutationKey: b }) > 0,
                    canSignSilently: S,
                    isStillSignedIn: P,
                    payoutFastSign: q,
                    bridgeRail: I,
                  });
                  if (null !== t) {
                    let { denominationOut: e } = t.mark;
                    t.attempt.settled.then((t) => {
                      ("withdrawn" === t.status &&
                        (0, l.Z)({
                          requestId: t.requestId,
                          outAmount: t.outAmount,
                          denominationOut: (0, c._)(t, e),
                        }),
                        (0, v.f)({ queryClient: A, solanaWallet: C }));
                    });
                  }
                  return !0;
                }),
                (R[0] = C),
                (R[1] = I),
                (R[2] = O),
                (R[3] = q),
                (R[4] = A),
                (R[5] = U),
                (R[6] = e))
              : (e = R[6]);
            let F = e;
            (R[7] !== M || R[8] !== W || R[9] !== F
              ? ((r = () => {
                  !M || (B.current !== W && F("launch") && (B.current = W));
                }),
                (R[7] = M),
                (R[8] = W),
                (R[9] = F),
                (R[10] = r))
              : (r = R[10]),
              (0, a.useEffect)(r),
              R[11] !== M || R[12] !== W || R[13] !== F
                ? ((x = () => {
                    let e = E.current;
                    ((E.current = M),
                      !e && M && B.current === W && F("foreground"));
                  }),
                  (R[11] = M),
                  (R[12] = W),
                  (R[13] = F),
                  (R[14] = x))
                : (x = R[14]),
              (0, a.useEffect)(x));
          })(),
          null
        );
      },
    ],
    525969,
  );
};
