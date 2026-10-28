// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(574472);
  e.s(
    [
      "f",
      0,
      () => {
        let e,
          i = (0, t.c)(8),
          { wallet: r } = (0, n.F)();
        e: {
          let t, n, a;
          if (
            !r?.publicKey ||
            "function" != typeof r.signTransaction ||
            "function" != typeof r.signAllTransactions
          ) {
            e = null;
            break e;
          }
          let s = r.publicKey;
          i[0] !== r
            ? ((t = r.signTransaction.bind(r)), (i[0] = r), (i[1] = t))
            : (t = i[1]);
          let o = t;
          i[2] !== r
            ? ((n = r.signAllTransactions.bind(r)), (i[2] = r), (i[3] = n))
            : (n = i[3]);
          let u = n;
          (i[4] !== o || i[5] !== u || i[6] !== r.publicKey
            ? ((a = {
                publicKey: s,
                signTransaction: o,
                signAllTransactions: u,
              }),
              (i[4] = o),
              (i[5] = u),
              (i[6] = r.publicKey),
              (i[7] = a))
            : (a = i[7]),
            (e = a));
        }
        return e;
      },
    ],
    431768,
  );
  var i = e.i(462378),
    r = e.i(619290),
    a = e.i(47446),
    s = e.i(824425),
    o = e.i(575281),
    u = e.i(959719),
    l = e.i(521492),
    c = e.i(971370),
    m = e.i(424509),
    d = e.i(565070),
    f = e.i(679925),
    b = e.i(478227);
  let p = async (e) => {
      let { connection: t, payer: n, instructions: i } = e,
        r = new c.VersionedTransaction(
          new c.TransactionMessage({
            payerKey: n,
            recentBlockhash: "11111111111111111111111111111111",
            instructions: [
              c.ComputeBudgetProgram.setComputeUnitLimit({ units: b.J }),
              c.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1 }),
              ...i,
            ],
          }).compileToV0Message(),
        ),
        [a, s] = await Promise.all([
          (0, f.g)(t, r, 2e5, { throwOnSimulationError: !1 }),
          (0, f.s)(t, r, "High"),
        ]),
        o = Math.min(b.J, Math.ceil(1.2 * a));
      return [
        c.ComputeBudgetProgram.setComputeUnitLimit({ units: o }),
        c.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: s }),
      ];
    },
    y = async (e, t) => {
      let n = await e.getAccountInfo(t, "confirmed");
      if (!n) throw Error(`Mint ${t.toBase58()} not found on chain.`);
      if (!n.owner.equals(u.z) && !n.owner.equals(u.S))
        throw Error(
          `Mint ${t.toBase58()} is not owned by SPL Token or Token-2022.`,
        );
      return n.owner;
    };
  async function w(e, t, n, i) {
    if (!i.equals(u.w) || !n.equals(u.z)) return !1;
    try {
      return (await (0, s.l)(e, t, "confirmed", n)).amount === BigInt(0);
    } catch (e) {
      if (e instanceof l.z) return !0;
      throw e;
    }
  }
  let h = async (e) => {
    let { connection: t, payer: n, coreInstructions: i } = e,
      r = await p({ connection: t, payer: n, instructions: i }),
      { blockhash: a, lastValidBlockHeight: s } =
        await t.getLatestBlockhash("confirmed"),
      o = new c.Transaction();
    return (
      (o.feePayer = n),
      (o.recentBlockhash = a),
      o.add(...r, ...i),
      { transaction: o, blockhash: a, lastValidBlockHeight: s }
    );
  };
  function g(e) {
    let t = (0, o.h)(u.w, e, !0, u.z);
    return (0, a.f)(t, e, e, [], u.z);
  }
  let C = async (e) => {
      let {
          connection: t,
          wallet: n,
          onChainBountyId: a,
          pumpBountiesProgramId: s,
          mint: u,
          submissionCommitmentHex: l,
        } = e,
        f = new c.PublicKey(s),
        b = await y(t, u),
        p = (0, o.h)(u, n.publicKey, !1, b),
        [C] = (0, i.h)(new m.default(a), f),
        [A] = (0, i.b)(C, u, f),
        K = (0, o.h)(u, A, !0, b),
        x = i.i.fromConnection({ connection: t, wallet: n, programId: f }),
        { instruction: v } = await x.buildClaimAward({
          claimant: n.publicKey,
          bountyId: new m.default(a),
          submissionCommitment: (0, d.B)(l),
          rewardMintAccounts: {
            mint: u,
            destinationTokenAccount: p,
            rewardTokenVault: K,
            tokenProgramId: b,
          },
        }),
        P = [(0, r.f)(n.publicKey, p, n.publicKey, u, b), v];
      return (
        (await w(t, p, b, u)) && P.push(g(n.publicKey)),
        h({ connection: t, payer: n.publicKey, coreInstructions: P })
      );
    },
    A = async (e) => {
      let {
          connection: t,
          wallet: n,
          onChainBountyId: a,
          pumpBountiesProgramId: s,
          mint: u,
        } = e,
        l = new c.PublicKey(s),
        d = await y(t, u),
        f = (0, o.h)(u, n.publicKey, !1, d),
        [b] = (0, i.h)(new m.default(a), l),
        [p] = (0, i.b)(b, u, l),
        C = (0, o.h)(u, p, !0, d),
        A = i.i.fromConnection({ connection: t, wallet: n, programId: l }),
        { instruction: K } = await A.buildClaimRefund({
          depositor: n.publicKey,
          bountyId: new m.default(a),
          rewardMintAccounts: {
            mint: u,
            destinationTokenAccount: f,
            rewardTokenVault: C,
            tokenProgramId: d,
          },
        }),
        x = [(0, r.f)(n.publicKey, f, n.publicKey, u, d), K];
      return (
        (await w(t, f, d, u)) && x.push(g(n.publicKey)),
        h({ connection: t, payer: n.publicKey, coreInstructions: x })
      );
    },
    K = async (e) => {
      let {
          connection: t,
          wallet: n,
          onChainBountyId: r,
          pumpBountiesProgramId: a,
        } = e,
        s = new c.PublicKey(a),
        o = i.i.fromConnection({ connection: t, wallet: n, programId: s }),
        { instruction: u } = await o.buildClaimDisputeRefund({
          opener: n.publicKey,
          bountyId: new m.default(r),
        });
      return h({ connection: t, payer: n.publicKey, coreInstructions: [u] });
    },
    x = async (e) => {
      let {
        connection: t,
        wallet: n,
        onChainBountyId: a,
        pumpBountiesProgramId: s,
        needsFinalize: u,
        entries: l,
      } = e;
      if (0 === l.length) throw Error("Nothing to refund for this bounty.");
      let d = new c.PublicKey(s),
        f = new m.default(a),
        b = i.i.fromConnection({ connection: t, wallet: n, programId: d }),
        p = [];
      if (u) {
        let { instruction: e } = await b.buildFinalizeExpired({
          payer: n.publicKey,
          bountyId: f,
        });
        p.push(e);
      }
      let C = !1;
      for (let e of l) {
        let i = await y(t, e.mint),
          a = (0, o.h)(e.mint, n.publicKey, !1, i),
          s = (0, o.h)(e.mint, e.rewardVaultPda, !0, i),
          { instruction: u } = await b.buildClaimRefund({
            depositor: n.publicKey,
            bountyId: f,
            rewardMintAccounts: {
              mint: e.mint,
              destinationTokenAccount: a,
              rewardTokenVault: s,
              tokenProgramId: i,
            },
          });
        (p.push((0, r.f)(n.publicKey, a, n.publicKey, e.mint, i), u),
          !C && (await w(t, a, i, e.mint)) && (C = !0));
      }
      return (
        C && p.push(g(n.publicKey)),
        h({ connection: t, payer: n.publicKey, coreInstructions: p })
      );
    };
  e.s(["t", 0, C, "H", 0, K, "L", 0, A, "f", 0, x], 505683);
};
