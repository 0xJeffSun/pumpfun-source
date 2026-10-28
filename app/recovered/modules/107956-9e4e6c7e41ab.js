// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(110134),
    r = e.i(509836),
    n = e.i(124452),
    i = e.i(254667),
    a = e.i(682455),
    o = e.i(352386),
    s = e.i(466931),
    l = e.i(741963),
    u = e.i(779642),
    d = e.i(873445);
  let c = (e) =>
      "wallet" === e.type &&
      "privy" === e.walletClientType &&
      "ethereum" === e.chainType,
    p = "idle",
    f = null,
    m = null,
    g = null,
    y = 0,
    h = new Set(),
    v = { userId: null, solanaAddress: null, embeddedEvmAddress: null },
    w = null,
    E = async ({
      userId: e,
      solanaAddress: t,
      evmAddress: r,
      identityStillCurrent: n,
    }) => {
      let a = await new Promise((e) => {
          let t = Date.now() + 1e4,
            n = () => {
              v.embeddedEvmAddress?.toLowerCase() === r.toLowerCase()
                ? e(!0)
                : Date.now() >= t
                  ? e(!1)
                  : setTimeout(n, 100);
            };
          n();
        }),
        o = w,
        u = a && o && n() ? await o({ solAddress: t, evmAddress: r }) : null;
      n()
        ? (a ||
            (0, s.l)({
              error: Error(
                "Minted EVM wallet did not surface before the mapping write",
              ),
              feature: "funding",
              operation: "evm-mapping-wallet-never-surfaced",
              context: { solanaAddress: t, evmAddress: r },
            }),
          null === u)
          ? i.y.warn(
              "[useEvmWalletAddress] mapping registration deferred to the next trade — EVM proof unavailable",
              { userId: e, solanaAddress: t, evmAddress: r, surfaced: a },
            )
          : await (0, l.i)({ solAddress: t, evmAddress: r, signature: u })
        : i.y.warn(
            "[useEvmWalletAddress] skipped mapping registration — account changed before the proof settled",
            { plannedUserId: e, currentUserId: v.userId },
          );
    },
    b = null,
    x = null,
    A = null,
    I = !1,
    $ = null;
  function S() {
    for (let e of ((y += 1), h)) e();
  }
  function M(e) {
    return (
      h.add(e),
      () => {
        h.delete(e);
      }
    );
  }
  let _ = () => y;
  e.s([
    "f",
    0,
    function () {
      let { ready: e, authenticated: y, user: h } = (0, r.f)(),
        { createWallet: N } = (0, t.f)(),
        { refreshUser: L } = (0, n.f)(),
        V = (0, d.f)(),
        C = (0, o.useSyncExternalStore)(M, _, _),
        k = (h?.linkedAccounts ?? []).filter(c),
        T = k[0],
        P = k.filter((e) => "address" in e).map((e) => e.address),
        O = P.length > 1,
        z = h?.linkedAccounts.find(
          (e) =>
            "wallet" === e.type &&
            "privy" === e.walletClientType &&
            "solana" === e.chainType,
        ),
        B = z && "address" in z ? z.address : null,
        D =
          e && y && h?.id && O && B
            ? `${h.id}:${B}:${[...P]
                .map((e) => e.toLowerCase())
                .sort()
                .join(",")}`
            : null,
        W = null !== D && A === D && I,
        j = null;
      O
        ? W &&
          (j =
            (null === $ ? void 0 : P.find((e) => e.toLowerCase() === $)) ??
            P[0] ??
            null)
        : (j = T && "address" in T ? T.address : null);
      let R = h?.id ?? null,
        K = (0, u.i)((e) => e.active),
        U = (0, u.i)((e) => e.progressByWallet),
        F = null !== R && (0, u.J)({ privyUserId: R, solanaAddress: B }),
        G = e && y && null !== R && !T,
        H =
          e && y && null !== R && j && B
            ? `${R}:${B}:${j.toLowerCase()}`
            : null,
        J = ("failed" === p || "mapped_elsewhere" === p) && f === R;
      return (
        (0, o.useEffect)(() => {
          ((v = { userId: R, solanaAddress: B, embeddedEvmAddress: j }),
            (w = V));
        }),
        (0, o.useEffect)(() => {
          if (!G) return;
          if (F)
            return void i.y.info(
              "[useEvmWalletAddress] provisioning deferred — a link flow owns this account",
              { userId: R, solanaAddress: B },
            );
          if ("pending" === p || J || g === R || !B) return;
          ((p = "pending"), S());
          let e = () => v.userId === R && v.solanaAddress === B,
            t = () => {
              ((p = "idle"),
                i.y.warn(
                  "[useEvmWalletAddress] provision aborted — account changed mid-flight",
                  { plannedUserId: R, currentUserId: v.userId },
                ),
                S());
            };
          (async () => {
            let r;
            try {
              if (((r = await (0, l.h)(B)), !e())) return void t();
            } catch (e) {
              ((p = "failed"),
                (f = R),
                i.y.error("[useEvmWalletAddress] EVM mapping check failed", {
                  userId: R,
                  solanaAddress: B,
                  error: String(e),
                }),
                (0, s.l)({
                  error: e,
                  feature: "funding",
                  operation: "evm-mapping-check-failed",
                  context: { solanaAddress: B },
                }),
                S());
              return;
            }
            if (null !== r) {
              ((p = "mapped_elsewhere"),
                (f = R),
                (m = r),
                i.y.warn(
                  "[useEvmWalletAddress] account maps to a non-Privy EVM wallet — refusing to mint",
                  { userId: R, solanaAddress: B, mappedEvmAddress: r },
                ),
                (0, s.l)({
                  error: Error(
                    "EVM wallet mint refused: account already maps to a different EVM wallet",
                  ),
                  feature: "funding",
                  operation: "evm-wallet-mapped-elsewhere",
                  context: { solanaAddress: B, mappedEvmAddress: r },
                }),
                S());
              return;
            }
            try {
              let r = await L();
              if (!e()) return void t();
              let n = r.linkedAccounts.find(c);
              if (n) {
                let e = "address" in n ? n.address : null;
                ((p = "idle"),
                  (g = R),
                  e && (0, a.U)({ userId: R, address: e }),
                  i.y.warn(
                    "[useEvmWalletAddress] account already carries an EVM wallet the render missed — skipping mint",
                    { userId: R, solanaAddress: B, evmAddress: e },
                  ),
                  S());
                return;
              }
            } catch (e) {
              ((p = "failed"),
                (f = R),
                i.y.error("[useEvmWalletAddress] Privy user refresh failed", {
                  userId: R,
                  solanaAddress: B,
                  error: String(e),
                }),
                (0, s.l)({
                  error: e,
                  feature: "funding",
                  operation: "evm-wallet-user-refresh-failed",
                  context: { solanaAddress: B },
                }),
                S());
              return;
            }
            try {
              let t = await (0, a.S)({ userId: R, mint: N, isStillCurrent: e });
              if (((p = "idle"), e() && (g = R), S(), !e()))
                return void i.y.warn(
                  "[useEvmWalletAddress] skipped mapping registration — account changed during createWallet",
                  { plannedUserId: R, currentUserId: v.userId },
                );
              t &&
                E({
                  userId: R,
                  solanaAddress: B,
                  evmAddress: t,
                  identityStillCurrent: e,
                }).catch((e) => {
                  i.y.warn(
                    "[useEvmWalletAddress] failed to register wallet mapping",
                    { solanaAddress: B, evmAddress: t, error: String(e) },
                  );
                });
            } catch (e) {
              ((p = "failed"),
                (f = R),
                i.y.error(
                  "[useEvmWalletAddress] EVM wallet provisioning failed",
                  { userId: R, error: String(e) },
                ),
                S());
            }
          })();
        }, [G, F, K, U, J, N, L, R, B, C]),
        (0, o.useEffect)(() => {
          null === D ||
            null === B ||
            (A !== D &&
              ((A = D),
              (I = !1),
              ($ = null),
              i.y.error(
                "[useEvmWalletAddress] multiple Privy EVM wallets on user — fork state",
                { userId: R, solanaAddress: B, candidateCount: P.length },
              ),
              (0, s.l)({
                error: Error("Privy user carries multiple EVM wallets"),
                feature: "funding",
                operation: "evm-wallet-fork-detected",
                context: { solanaAddress: B, candidateCount: P.length },
              }),
              (0, l.h)(B).then(
                (e) => {
                  A === D &&
                    (($ = null === e ? null : e.toLowerCase()), (I = !0), S());
                },
                (e) => {
                  A === D &&
                    (i.y.warn(
                      "[useEvmWalletAddress] fork mapping lookup failed — first candidate wins",
                      { userId: R, solanaAddress: B, error: String(e) },
                    ),
                    ($ = null),
                    (I = !0),
                    S());
                },
              )));
        }, [D, B, R]),
        (0, o.useEffect)(() => {
          null === H ||
            null === j ||
            null === B ||
            (b !== H &&
              ((b = H),
              (x = null),
              (0, l.E)({ solAddress: B, evmWalletAddress: j }).then((e) => {
                b === H && ((x = e), null !== e && S());
              })));
        }, [H, j, B]),
        {
          evmWalletAddress: j,
          isReady: e && (!G || J) && (!O || W),
          mappedEvmAddress:
            "mapped_elsewhere" === p && f === R
              ? m
              : null !== H && b === H
                ? x
                : null,
        }
      );
    },
  ]);
};
