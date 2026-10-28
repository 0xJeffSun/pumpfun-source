// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(198285),
    i = e.i(914549),
    a = e.i(574472),
    s = e.i(777887),
    n = e.i(130379),
    o = e.i(107956),
    d = e.i(466931),
    l = e.i(495717);
  function u(e) {
    let { signature: t } = e;
    return t;
  }
  function p(e) {
    let { signature: t } = e;
    return t;
  }
  e.s([
    "f",
    0,
    () => {
      let e,
        _ = (0, t.c)(35),
        {
          address: c,
          wallet: m,
          shouldUsePrivy: w,
          privyMfaEnrolled: g,
        } = (0, a.F)(),
        { evmWalletAddress: h, isReady: f } = (0, o.f)(),
        y = (0, n.f)(),
        { signTypedData: b } = (0, r.f)();
      if (
        _[0] !== y ||
        _[1] !== h ||
        _[2] !== f ||
        _[3] !== g ||
        _[4] !== c ||
        _[5] !== w ||
        _[6] !== b ||
        _[7] !== m
      ) {
        e: {
          let t,
            r,
            a,
            n,
            o,
            v,
            z,
            k,
            x = y.describe(h),
            q = (e) => ({
              readiness: { ready: !1, reason: e, evmSigner: x },
              signers: null,
            });
          if (!f) {
            e = q("evm_wallet_resolving");
            break e;
          }
          if (null === h) {
            e = q("evm_wallet_missing");
            break e;
          }
          if (!y.isReadyFor(h)) {
            e = q("evm_signer_not_ready");
            break e;
          }
          if (!w || !m || !c) {
            e = q("solana_signer_missing");
            break e;
          }
          if (m.publicKey?.toBase58() !== c) {
            e = q("solana_signer_mismatch");
            break e;
          }
          (_[9] !== h || _[10] !== b
            ? ((t = (e) =>
                (0, s._)(() =>
                  b(e, {
                    address: h,
                    uiOptions: { showWalletUIs: (0, i.F)() },
                  }),
                ).then(u)),
              (r = (e) =>
                (0, s._)(() =>
                  Promise.allSettled(
                    e.map((e) =>
                      b(e, {
                        address: h,
                        uiOptions: { showWalletUIs: (0, i.F)() },
                      }).then(p),
                    ),
                  ),
                )),
              (_[9] = h),
              (_[10] = b),
              (_[11] = t),
              (_[12] = r))
            : ((t = _[11]), (r = _[12])),
            _[13] !== g
              ? ((a = () => !(0, i.F)() && !0 !== g), (_[13] = g), (_[14] = a))
              : (a = _[14]),
            _[15] !== c || _[16] !== m
              ? ((n = async (e) => (
                  (({ signerAddress: e, sessionAddress: t }) => {
                    if (e === t) return;
                    let r = Error(
                      "Signing wallet does not match the session identity",
                    );
                    throw (
                      (0, d.l)({
                        error: r,
                        feature: "perps",
                        operation: "signer-mismatch",
                        context: { signerAddress: e, sessionAddress: t },
                      }),
                      r
                    );
                  })({
                    signerAddress: m.publicKey?.toBase58(),
                    sessionAddress: c,
                  }),
                  (0, s._)(() => m.signTransaction(e))
                )),
                (_[15] = c),
                (_[16] = m),
                (_[17] = n))
              : (n = _[17]),
            _[18] !== y || _[19] !== h
              ? ((o = () =>
                  y.isReadyFor(h)
                    ? Promise.resolve()
                    : Promise.reject(new l.L(h))),
                (_[18] = y),
                (_[19] = h),
                (_[20] = o))
              : (o = _[20]),
            _[21] !== h ||
            _[22] !== c ||
            _[23] !== t ||
            _[24] !== r ||
            _[25] !== a ||
            _[26] !== n ||
            _[27] !== o
              ? ((v = {
                  evmWallet: h,
                  solanaWallet: c,
                  signTypedData: t,
                  signTypedDataBatch: r,
                  signsSilently: a,
                  signSolanaTransaction: n,
                  preflightEvmSigner: o,
                }),
                (_[21] = h),
                (_[22] = c),
                (_[23] = t),
                (_[24] = r),
                (_[25] = a),
                (_[26] = n),
                (_[27] = o),
                (_[28] = v))
              : (v = _[28]));
          let A = v;
          (_[29] !== h || _[30] !== c
            ? ((z = { ready: !0, evmWallet: h, solanaWallet: c }),
              (_[29] = h),
              (_[30] = c),
              (_[31] = z))
            : (z = _[31]),
            _[32] !== A || _[33] !== z
              ? ((k = { readiness: z, signers: A }),
                (_[32] = A),
                (_[33] = z),
                (_[34] = k))
              : (k = _[34]),
            (e = k));
        }
        ((_[0] = y),
          (_[1] = h),
          (_[2] = f),
          (_[3] = g),
          (_[4] = c),
          (_[5] = w),
          (_[6] = b),
          (_[7] = m),
          (_[8] = e));
      } else e = _[8];
      return e;
    },
  ]);
};
