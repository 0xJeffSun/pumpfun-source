// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(132838),
    i = e.i(606933),
    r = e.i(339179),
    s = e.i(485759);
  let o = ({ queryClient: e, owner: t, chainId: n, token: i }) => {
    (e.invalidateQueries({ queryKey: s.f.byOwner(t) }),
      e.invalidateQueries({
        queryKey: s.f.byOwnerChainToken({ owner: t, chainId: n, token: i }),
      }),
      e.invalidateQueries({
        queryKey: s.f.eligibilityForToken({ owner: t, chainId: n, token: i }),
      }));
  };
  e.s(["f", 0, o], 140569);
  var a = e.i(54567);
  let u = ["limit-orders", "cancel-evm"];
  function c(e) {
    let { chainId: t, orderAddress: n, orderId: i } = e;
    return (0, r.b)({ chainId: t, orderAddress: n, orderId: i });
  }
  function l(e, t) {
    a.logger.error("[useCancelEvmLimitOrderMutation] cancel_failed", {
      chainId: t.chainId,
      orderAddress: t.orderAddress,
      orderId: t.orderId,
      status: (0, r.$)(e) ? e.status : void 0,
      reason: (0, r.$)(e) ? e.reason : void 0,
      error: e,
    });
  }
  e.s(
    [
      "k",
      0,
      (e) => (0, r.f)({ error: e, reason: r.Y.notCancellable }),
      "O",
      0,
      () => {
        let e,
          r = (0, t.c)(2),
          s = (0, i.useQueryClient)();
        return (
          r[0] !== s
            ? ((e = {
                mutationKey: u,
                mutationFn: c,
                onError: l,
                onSettled: (e, t, n) => {
                  o({
                    queryClient: s,
                    owner: n.owner,
                    chainId: n.chainId,
                    token: n.token,
                  });
                },
              }),
              (r[0] = s),
              (r[1] = e))
            : (e = r[1]),
          (0, n.f)(e)
        );
      },
    ],
    393608,
  );
};
