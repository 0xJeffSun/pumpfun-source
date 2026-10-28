// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(574472),
    r = e.i(132838),
    n = e.i(606933),
    i = e.i(66961),
    a = e.i(777887),
    s = e.i(426091),
    o = e.i(635234),
    c = e.i(466931),
    d = e.i(22675),
    u = e.i(358052),
    m = e.i(54567);
  let f = async (e, t, l) => {
      let r, n;
      try {
        r = (0, d.m)(t);
      } catch (t) {
        return (
          m.logger.warn("[cancelLimitOrder] close_nonce_tx_invalid", {
            orderId: e,
            error: t,
          }),
          "failed"
        );
      }
      try {
        n = await l.signTransaction(r);
      } catch (t) {
        return (
          m.logger.warn("[cancelLimitOrder] close_nonce_sign_declined", {
            orderId: e,
            error: t,
          }),
          "declined"
        );
      }
      try {
        let t = await l.connection.sendRawTransaction((0, u.f)(n), {
          skipPreflight: !1,
        });
        return (
          m.logger.info("[cancelLimitOrder] nonce_close_submitted", {
            orderId: e,
            signature: t,
          }),
          "submitted"
        );
      } catch (t) {
        return (
          m.logger.warn("[cancelLimitOrder] close_nonce_send_failed", {
            orderId: e,
            error: t,
          }),
          "failed"
        );
      }
    },
    x = async (e, t, l) => {
      if ("closed" === t.nonce_status) return !0;
      let r = t.close_nonce_transaction;
      if (r) {
        let t = await f(e.orderId, r, l);
        if ("submitted" === t) return !0;
        if ("declined" === t) return !1;
      }
      try {
        let t = await (0, o.P)({ orderId: e.orderId });
        if ("closed" === t.nonce_status) return !0;
        let r = t.close_nonce_transaction;
        if (!r)
          return (
            m.logger.warn("[cancelLimitOrder] close_nonce_tx_missing", {
              orderId: e.orderId,
              nonceStatus: t.nonce_status,
            }),
            !1
          );
        let n = await f(e.orderId, r, l);
        return "submitted" === n;
      } catch (t) {
        return (
          m.logger.warn("[cancelLimitOrder] close_nonce_failed", {
            orderId: e.orderId,
            error: t,
          }),
          (0, c.l)({
            error: t,
            feature: "limit-orders",
            operation: "nonce-close",
            context: {
              mint: e.mint,
              orderId: e.orderId,
              walletName: (0, s.Y)(),
            },
          }),
          !1
        );
      }
    };
  async function h(e) {
    try {
      return await (0, o.P)({ orderId: e.orderId });
    } catch (t) {
      throw (
        m.logger.error("[cancelLimitOrder] cancel_limit_failed", {
          orderId: e.orderId,
          error: t,
        }),
        (0, c.l)({
          error: t,
          feature: "limit-orders",
          operation: "cancel-limit",
          context: { mint: e.mint, orderId: e.orderId, walletName: (0, s.Y)() },
        }),
        t
      );
    }
  }
  async function p(e, t) {
    let l = await h(e);
    return { success: !0, nonceCloseSubmitted: await x(e, l, t) };
  }
  e.s(["d", 0, x, "L", 0, p, "C", 0, h], 416200);
  var g = e.i(440072);
  function b(e, t) {
    m.logger.error("[useCancelLimitOrderMutation] cancel_failed", {
      orderId: t.orderId,
      error: e,
    });
  }
  e.s(
    [
      "f",
      0,
      () => {
        let e,
          s,
          o,
          c,
          d = (0, t.c)(9),
          u = (0, n.useQueryClient)(),
          { wallet: m } = (0, l.F)(),
          { connection: f } = (0, i.f)();
        return (
          d[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = ["limit-orders", "cancel"]), (d[0] = e))
            : (e = d[0]),
          d[1] !== f || d[2] !== m
            ? ((s = (e) => {
                if (!m) throw Error("Wallet not connected");
                return p(e, {
                  connection: f,
                  signTransaction: (e) => (0, a._)(() => m.signTransaction(e)),
                });
              }),
              (d[1] = f),
              (d[2] = m),
              (d[3] = s))
            : (s = d[3]),
          d[4] !== u
            ? ((o = (e, t, l) => {
                (u.invalidateQueries({ queryKey: g.f.byUser(l.user) }),
                  u.invalidateQueries({
                    queryKey: g.f.byUserAndMint(l.user, l.mint),
                  }));
              }),
              (d[4] = u),
              (d[5] = o))
            : (o = d[5]),
          d[6] !== s || d[7] !== o
            ? ((c = {
                mutationKey: e,
                mutationFn: s,
                onError: b,
                onSettled: o,
              }),
              (d[6] = s),
              (d[7] = o),
              (d[8] = c))
            : (c = d[8]),
          (0, r.f)(c)
        );
      },
    ],
    144050,
  );
};
