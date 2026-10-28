// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(110134),
    n = e.i(509836),
    r = e.i(124452),
    a = e.i(254667),
    i = e.i(682455),
    o = e.i(352386),
    l = e.i(466931),
    s = e.i(741963),
    d = e.i(779642),
    u = e.i(873445);
  let c = (e) =>
      "wallet" === e.type &&
      "privy" === e.walletClientType &&
      "ethereum" === e.chainType,
    p = "idle",
    f = null,
    g = null,
    h = null,
    m = 0,
    v = new Set(),
    w = { userId: null, solanaAddress: null, embeddedEvmAddress: null },
    E = null,
    y = async ({
      userId: e,
      solanaAddress: t,
      evmAddress: n,
      identityStillCurrent: r,
    }) => {
      let i = await new Promise((e) => {
          let t = Date.now() + 1e4,
            r = () => {
              w.embeddedEvmAddress?.toLowerCase() === n.toLowerCase()
                ? e(!0)
                : Date.now() >= t
                  ? e(!1)
                  : setTimeout(r, 100);
            };
          r();
        }),
        o = E,
        d = i && o && r() ? await o({ solAddress: t, evmAddress: n }) : null;
      r()
        ? (i ||
            (0, l.l)({
              error: Error(
                "Minted EVM wallet did not surface before the mapping write",
              ),
              feature: "funding",
              operation: "evm-mapping-wallet-never-surfaced",
              context: { solanaAddress: t, evmAddress: n },
            }),
          null === d)
          ? a.y.warn(
              "[useEvmWalletAddress] mapping registration deferred to the next trade — EVM proof unavailable",
              { userId: e, solanaAddress: t, evmAddress: n, surfaced: i },
            )
          : await (0, s.i)({ solAddress: t, evmAddress: n, signature: d })
        : a.y.warn(
            "[useEvmWalletAddress] skipped mapping registration — account changed before the proof settled",
            { plannedUserId: e, currentUserId: w.userId },
          );
    },
    b = null,
    S = null,
    C = null,
    _ = !1,
    x = null;
  function k() {
    for (let e of ((m += 1), v)) e();
  }
  function A(e) {
    return (
      v.add(e),
      () => {
        v.delete(e);
      }
    );
  }
  let M = () => m;
  e.s([
    "f",
    0,
    function () {
      let { ready: e, authenticated: m, user: v } = (0, n.f)(),
        { createWallet: I } = (0, t.f)(),
        { refreshUser: V } = (0, r.f)(),
        L = (0, u.f)(),
        T = (0, o.useSyncExternalStore)(A, M, M),
        P = (v?.linkedAccounts ?? []).filter(c),
        U = P[0],
        N = P.filter((e) => "address" in e).map((e) => e.address),
        $ = N.length > 1,
        W = v?.linkedAccounts.find(
          (e) =>
            "wallet" === e.type &&
            "privy" === e.walletClientType &&
            "solana" === e.chainType,
        ),
        O = W && "address" in W ? W.address : null,
        D =
          e && m && v?.id && $ && O
            ? `${v.id}:${O}:${[...N]
                .map((e) => e.toLowerCase())
                .sort()
                .join(",")}`
            : null,
        R = null !== D && C === D && _,
        F = null;
      $
        ? R &&
          (F =
            (null === x ? void 0 : N.find((e) => e.toLowerCase() === x)) ??
            N[0] ??
            null)
        : (F = U && "address" in U ? U.address : null);
      let j = v?.id ?? null,
        K = (0, d.i)((e) => e.active),
        z = (0, d.i)((e) => e.progressByWallet),
        B = null !== j && (0, d.J)({ privyUserId: j, solanaAddress: O }),
        G = e && m && null !== j && !U,
        H =
          e && m && null !== j && F && O
            ? `${j}:${O}:${F.toLowerCase()}`
            : null,
        q = ("failed" === p || "mapped_elsewhere" === p) && f === j;
      return (
        (0, o.useEffect)(() => {
          ((w = { userId: j, solanaAddress: O, embeddedEvmAddress: F }),
            (E = L));
        }),
        (0, o.useEffect)(() => {
          if (!G) return;
          if (B)
            return void a.y.info(
              "[useEvmWalletAddress] provisioning deferred — a link flow owns this account",
              { userId: j, solanaAddress: O },
            );
          if ("pending" === p || q || h === j || !O) return;
          ((p = "pending"), k());
          let e = () => w.userId === j && w.solanaAddress === O,
            t = () => {
              ((p = "idle"),
                a.y.warn(
                  "[useEvmWalletAddress] provision aborted — account changed mid-flight",
                  { plannedUserId: j, currentUserId: w.userId },
                ),
                k());
            };
          (async () => {
            let n;
            try {
              if (((n = await (0, s.h)(O)), !e())) return void t();
            } catch (e) {
              ((p = "failed"),
                (f = j),
                a.y.error("[useEvmWalletAddress] EVM mapping check failed", {
                  userId: j,
                  solanaAddress: O,
                  error: String(e),
                }),
                (0, l.l)({
                  error: e,
                  feature: "funding",
                  operation: "evm-mapping-check-failed",
                  context: { solanaAddress: O },
                }),
                k());
              return;
            }
            if (null !== n) {
              ((p = "mapped_elsewhere"),
                (f = j),
                (g = n),
                a.y.warn(
                  "[useEvmWalletAddress] account maps to a non-Privy EVM wallet — refusing to mint",
                  { userId: j, solanaAddress: O, mappedEvmAddress: n },
                ),
                (0, l.l)({
                  error: Error(
                    "EVM wallet mint refused: account already maps to a different EVM wallet",
                  ),
                  feature: "funding",
                  operation: "evm-wallet-mapped-elsewhere",
                  context: { solanaAddress: O, mappedEvmAddress: n },
                }),
                k());
              return;
            }
            try {
              let n = await V();
              if (!e()) return void t();
              let r = n.linkedAccounts.find(c);
              if (r) {
                let e = "address" in r ? r.address : null;
                ((p = "idle"),
                  (h = j),
                  e && (0, i.U)({ userId: j, address: e }),
                  a.y.warn(
                    "[useEvmWalletAddress] account already carries an EVM wallet the render missed — skipping mint",
                    { userId: j, solanaAddress: O, evmAddress: e },
                  ),
                  k());
                return;
              }
            } catch (e) {
              ((p = "failed"),
                (f = j),
                a.y.error("[useEvmWalletAddress] Privy user refresh failed", {
                  userId: j,
                  solanaAddress: O,
                  error: String(e),
                }),
                (0, l.l)({
                  error: e,
                  feature: "funding",
                  operation: "evm-wallet-user-refresh-failed",
                  context: { solanaAddress: O },
                }),
                k());
              return;
            }
            try {
              let t = await (0, i.S)({ userId: j, mint: I, isStillCurrent: e });
              if (((p = "idle"), e() && (h = j), k(), !e()))
                return void a.y.warn(
                  "[useEvmWalletAddress] skipped mapping registration — account changed during createWallet",
                  { plannedUserId: j, currentUserId: w.userId },
                );
              t &&
                y({
                  userId: j,
                  solanaAddress: O,
                  evmAddress: t,
                  identityStillCurrent: e,
                }).catch((e) => {
                  a.y.warn(
                    "[useEvmWalletAddress] failed to register wallet mapping",
                    { solanaAddress: O, evmAddress: t, error: String(e) },
                  );
                });
            } catch (e) {
              ((p = "failed"),
                (f = j),
                a.y.error(
                  "[useEvmWalletAddress] EVM wallet provisioning failed",
                  { userId: j, error: String(e) },
                ),
                k());
            }
          })();
        }, [G, B, K, z, q, I, V, j, O, T]),
        (0, o.useEffect)(() => {
          null === D ||
            null === O ||
            (C !== D &&
              ((C = D),
              (_ = !1),
              (x = null),
              a.y.error(
                "[useEvmWalletAddress] multiple Privy EVM wallets on user — fork state",
                { userId: j, solanaAddress: O, candidateCount: N.length },
              ),
              (0, l.l)({
                error: Error("Privy user carries multiple EVM wallets"),
                feature: "funding",
                operation: "evm-wallet-fork-detected",
                context: { solanaAddress: O, candidateCount: N.length },
              }),
              (0, s.h)(O).then(
                (e) => {
                  C === D &&
                    ((x = null === e ? null : e.toLowerCase()), (_ = !0), k());
                },
                (e) => {
                  C === D &&
                    (a.y.warn(
                      "[useEvmWalletAddress] fork mapping lookup failed — first candidate wins",
                      { userId: j, solanaAddress: O, error: String(e) },
                    ),
                    (x = null),
                    (_ = !0),
                    k());
                },
              )));
        }, [D, O, j]),
        (0, o.useEffect)(() => {
          null === H ||
            null === F ||
            null === O ||
            (b !== H &&
              ((b = H),
              (S = null),
              (0, s.E)({ solAddress: O, evmWalletAddress: F }).then((e) => {
                b === H && ((S = e), null !== e && k());
              })));
        }, [H, F, O]),
        {
          evmWalletAddress: F,
          isReady: e && (!G || q) && (!$ || R),
          mappedEvmAddress:
            "mapped_elsewhere" === p && f === j
              ? g
              : null !== H && b === H
                ? S
                : null,
        }
      );
    },
  ]);
};
