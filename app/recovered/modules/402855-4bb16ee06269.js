// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(462378),
    r = e.i(619290),
    n = e.i(824425),
    a = e.i(575281),
    i = e.i(959719),
    o = e.i(971370),
    s = e.i(424509),
    l = e.i(344048),
    u = e.i(949879);
  let c = (e, t, r) => {
    let n = new o.Transaction();
    ((n.feePayer = e), (n.recentBlockhash = t), n.add(...r));
    let a = n.serializeMessage(),
      i = n.signatures.length;
    return a.length + (i < 128 ? 1 : 2) + 64 * i;
  };
  class d extends Error {
    mintAddress;
    needed;
    actual;
    tokenProgramId;
    sourceTokenAccount;
    constructor(e, t, r, n, a) {
      (super(`Insufficient balance for mint ${e}: need ${t}, have ${r}.`),
        (this.mintAddress = e),
        (this.needed = t),
        (this.actual = r),
        (this.tokenProgramId = n),
        (this.sourceTokenAccount = a),
        (this.name = "InsufficientRewardBalanceError"));
    }
  }
  let f = "INSUFFICIENT_BALANCE";
  class m extends Error {
    cause;
    completedSignatures;
    constructor(e, t) {
      (super(
        e instanceof Error
          ? e.message
          : "Bounty publish send interrupted after partial progress.",
      ),
        (this.cause = e),
        (this.completedSignatures = t),
        (this.name = "BountyPublishSendInterruptedError"));
    }
  }
  class h extends Error {
    cause;
    code;
    constructor(e) {
      (super(
        "Insufficient SOL in the fee-payer wallet to cover transaction fees + rent.",
      ),
        (this.cause = e),
        (this.code = f),
        (this.name = "InsufficientPayerLamportsError"));
    }
  }
  class p extends Error {
    expected;
    actual;
    constructor(e, t) {
      (super(
        t
          ? `Active wallet ${t} does not match bounty creator ${e}.`
          : `Active wallet is missing; expected bounty creator ${e}.`,
      ),
        (this.expected = e),
        (this.actual = t),
        (this.name = "BountyPosterMismatchError"));
    }
  }
  let w = ({ expected: e, actual: t }) => {
      let r = t?.toBase58() ?? null;
      if (r !== e) throw new p(e, r);
    },
    y = (e) => {
      let t = e instanceof Error ? e.message : "string" == typeof e ? e : "";
      return (
        !!t &&
        (/Attempt to debit an account but found no record of a prior credit/i.test(
          t,
        ) ||
          /insufficient lamports/i.test(t))
      );
    };
  class b extends Error {
    bountyPda;
    onChainMetadataHashHex;
    draftMetadataHashHex;
    constructor(e, t, r) {
      (super(`On-chain metadata hash ${t} does not match draft hash ${r}.`),
        (this.bountyPda = e),
        (this.onChainMetadataHashHex = t),
        (this.draftMetadataHashHex = r),
        (this.name = "DraftDivergedError"));
    }
  }
  let g = async (e, t) => {
      let r = await e.getAccountInfo(t, "confirmed");
      if (!r) throw Error(`Mint ${t.toBase58()} not found on chain.`);
      if (!r.owner.equals(i.z) && !r.owner.equals(i.S))
        throw Error(
          `Mint ${t.toBase58()} is not owned by SPL Token or Token-2022.`,
        );
      return r.owner;
    },
    x = t._.toBase58(),
    v = (e) => e === x,
    _ = (e) =>
      Array.from(e instanceof Uint8Array ? e : Uint8Array.from(e), (e) =>
        e.toString(16).padStart(2, "0"),
      ).join(""),
    k = async (e, r, n, l, u) => {
      let c = [];
      for (let d of u) {
        let u = new s.default(d.amountAtomic);
        if (u.lten(0))
          throw Error(
            `Pool amount for ${d.mintAddress} must be greater than zero.`,
          );
        let f = new o.PublicKey(d.mintAddress),
          m = v(d.mintAddress),
          h = m ? i.z : await g(e, f),
          p = (0, a.h)(f, r, !1, h),
          [w] = (0, t.b)(l, f, n),
          y = (0, a.h)(f, w, !0, h);
        c.push({
          pool: d,
          mint: f,
          isWsol: m,
          amountBn: u,
          tokenProgramId: h,
          sourceTokenAccount: p,
          rewardTokenVault: y,
          rewardVaultPda: w,
        });
      }
      return c;
    },
    E = async (e, t, r) => {
      let a = BigInt(0),
        o = null;
      for (let t of r) {
        let r = BigInt(t.amountBn.toString());
        if (t.isWsol) {
          ((a += r), (o = t.sourceTokenAccount));
          continue;
        }
        try {
          let a = await (0, n.l)(
            e,
            t.sourceTokenAccount,
            "confirmed",
            t.tokenProgramId,
          );
          if (a.amount < r)
            throw new d(
              t.pool.mintAddress,
              r,
              a.amount,
              t.tokenProgramId,
              t.sourceTokenAccount,
            );
        } catch (e) {
          if (e instanceof d) throw e;
          throw new d(
            t.pool.mintAddress,
            r,
            BigInt(0),
            t.tokenProgramId,
            t.sourceTokenAccount,
          );
        }
      }
      if (a > BigInt(0) && null !== o) {
        let r = await (0, n.l)(e, o, "confirmed", i.z).catch(() => null),
          s =
            (r?.amount ?? BigInt(0)) +
            BigInt(await e.getBalance(t, "confirmed"));
        if (s < a) throw new d(x, a, s, i.z, o);
      }
    },
    N = (e) => ({
      mint: e.mint,
      sourceTokenAccount: e.sourceTokenAccount,
      rewardTokenVault: e.rewardTokenVault,
      tokenProgramId: e.tokenProgramId,
    }),
    S = (e, n) => {
      let a = [];
      if (n.isWsol) {
        let { instructions: r } = (0, t.o)(e, e, BigInt(n.amountBn.toString()));
        a.push(...r);
      }
      return (
        a.push(
          (0, r.f)(
            e,
            n.rewardTokenVault,
            n.rewardVaultPda,
            n.mint,
            n.tokenProgramId,
          ),
        ),
        a
      );
    },
    P = async (e, t, r) => {
      let n;
      try {
        n = await e.fetchBounty(t);
      } catch {
        return { kind: "missing" };
      }
      let a = [];
      for (let n of r) {
        let r = e.findRewardVaultPda(e.findBountyPda(t), n.mint),
          i = null;
        try {
          i = await e.fetchRewardVault(t, n.mint);
        } catch {
          i = null;
        }
        a.push({ resolved: n, rewardVaultPda: r, vault: i });
      }
      return { kind: "present", bounty: n, pools: a };
    },
    R = async (e) => {
      let {
        connection: r,
        wallet: n,
        expectedPoster: a,
        response: i,
        pools: l,
        expiresAtIso: u,
      } = e;
      if ((w({ expected: a, actual: n.publicKey }), 0 === l.length))
        throw Error("At least one reward pool is required to publish.");
      let d = new o.PublicKey(i.pumpBountiesProgramId),
        f = new o.PublicKey(i.publishFeeVault),
        m = new s.default(i.onChainBountyId),
        [h] = (0, t.h)(m, d),
        p = ((e) => {
          let t = e.startsWith("0x") ? e.slice(2) : e;
          if (64 !== t.length)
            throw Error("metadataHash must be a 32-byte hex string.");
          let r = new Uint8Array(32);
          for (let e = 0; e < 32; e += 1) {
            let n = Number.parseInt(t.slice(2 * e, 2 * e + 2), 16);
            if (Number.isNaN(n)) throw Error("metadataHash is not valid hex.");
            r[e] = n;
          }
          return r;
        })(i.metadataHash),
        y = new s.default(
          ((e) => {
            if (!e) return 0;
            let t = Date.parse(e);
            return Number.isNaN(t) ? 0 : Math.floor(t / 1e3);
          })(u),
        ),
        g = await k(r, n.publicKey, d, h, l),
        x = t.i.fromConnection({ connection: r, wallet: n, programId: d }),
        { program: v } = x,
        R = await P(x, m, g),
        C =
          "present" === R.kind
            ? R.pools
                .filter(({ vault: e }) => null === e)
                .map((e) => e.resolved)
            : g;
      await E(r, n.publicKey, C);
      let I = C.find((e) => e.isWsol)?.sourceTokenAccount,
        j = void 0 !== I && (await r.getAccountInfo(I, "confirmed")) !== null;
      if ("present" === R.kind) {
        let e = _(p),
          t = _(R.bounty.metadataHash);
        if (e !== t) throw new b(h, t, e);
      }
      let A = [],
        T = [],
        { blockhash: M, lastValidBlockHeight: $ } =
          await r.getLatestBlockhash("confirmed"),
        B = (e) => {
          e.length > 0 && A.push(e);
        },
        F = (e, t) => {
          let r;
          if (0 === e.length) return;
          let a = [...T, ...e];
          if (1232 >= c(n.publicKey, M, a)) {
            T = a;
            return;
          }
          if ((T.length > 0 && B(T), (r = T = e), c(n.publicKey, M, r) > 1232))
            throw Error(`${t} exceeds transaction size limit.`);
        };
      if ("missing" === R.kind) {
        let e = g[0],
          { instruction: r } = await (0, t.t)(v, {
            poster: n.publicKey,
            publishFeeVault: f,
            bountyId: m,
            metadataHash: p,
            metadataUri: i.metadataUri,
            expiryTs: y,
            initialRewardAmount: e.amountBn,
            rewardMintAccounts: N(e),
          });
        F([...S(n.publicKey, e), r], "create_bounty_and_publish");
        for (let e = 1; e < g.length; e += 1) {
          let r = g[e],
            { instruction: a } = await (0, t.N)(v, {
              creator: n.publicKey,
              bountyId: m,
              initialAmount: r.amountBn,
              rewardMintAccounts: N(r),
            });
          F(
            [...S(n.publicKey, r), a],
            `create_reward_pool for ${r.pool.mintAddress}`,
          );
        }
      } else
        for (let { resolved: e, vault: r } of R.pools) {
          if (null !== r) continue;
          let { instruction: a } = await (0, t.N)(v, {
            creator: n.publicKey,
            bountyId: m,
            initialAmount: e.amountBn,
            rewardMintAccounts: N(e),
          });
          F(
            [...S(n.publicKey, e), a],
            `create_reward_pool for ${e.pool.mintAddress}`,
          );
        }
      return (C.some((e) => e.isWsol) &&
        !j &&
        F([(0, t.$)(n.publicKey)], "unwrap residual wSOL"),
      T.length > 0 && B(T),
      0 === A.length)
        ? {
            transactions: [],
            resolvedPools: g,
            bountyPda: h,
            blockhash: null,
            lastValidBlockHeight: null,
          }
        : {
            transactions: A.map((e) => {
              let t = new o.Transaction();
              return (
                (t.feePayer = n.publicKey),
                (t.recentBlockhash = M),
                t.add(...e),
                t
              );
            }),
            resolvedPools: g,
            bountyPda: h,
            blockhash: M,
            lastValidBlockHeight: $,
          };
    },
    C = (e) => {
      let t = e.signatures[0]?.signature;
      return t ? l.f.encode(Uint8Array.from(t)) : null;
    },
    I = (e) => {
      let t = e instanceof Error ? e.message : "string" == typeof e ? e : "";
      return /already been processed|AlreadyProcessed/i.test(t);
    },
    j = async (e) => {
      let { connection: t, wallet: r, expectedPoster: n, plan: a } = e;
      if (
        (w({ expected: n, actual: r.publicKey }), 0 === a.transactions.length)
      )
        return { primarySignature: null, signatures: [] };
      if (null === a.blockhash || null === a.lastValidBlockHeight)
        throw Error("Missing blockhash on a non-empty publish plan.");
      for (let e of a.transactions) w({ expected: n, actual: e.feePayer });
      let { blockhash: i, lastValidBlockHeight: s } = a,
        l = await r.signAllTransactions(a.transactions),
        c = [];
      for (let e of l) {
        let r,
          n = e.serialize();
        try {
          r = await t.sendRawTransaction(n, {
            skipPreflight: !1,
            maxRetries: 3,
          });
        } catch (n) {
          if (!I(n)) {
            if (c.length > 0) throw new m(n, c);
            if (y(n)) throw new h(n);
            throw n;
          }
          let t = C(e);
          if (!t)
            throw n instanceof o.SendTransactionError
              ? n
              : Error(
                  "Transaction reported as already processed but signed tx has no signature to confirm.",
                );
          r = t;
        }
        try {
          await (0, u.O)({
            connection: t,
            signature: r,
            blockhash: i,
            lastValidBlockHeight: s,
          });
        } catch (e) {
          throw new m(e, [...c, r]);
        }
        c.push(r);
      }
      return { primarySignature: c[0], signatures: c };
    };
  e.s(
    [
      "p",
      0,
      p,
      "M",
      0,
      class extends Error {
        cause;
        fundingSignature;
        constructor(e, t) {
          (super(
            e instanceof Error
              ? e.message
              : "Bounty publish rejected after the reward was escrowed on-chain.",
          ),
            (this.cause = e),
            (this.fundingSignature = t),
            (this.name = "BountyPublishRejectedAfterFundingError"));
        }
      },
      "W",
      0,
      m,
      "B",
      0,
      b,
      "t",
      0,
      f,
      "K",
      0,
      h,
      "H",
      0,
      d,
      "c",
      0,
      R,
      "P",
      0,
      N,
      "D",
      0,
      c,
      "w",
      0,
      y,
      "V",
      0,
      S,
      "a",
      0,
      E,
      "x",
      0,
      k,
      "T",
      0,
      j,
    ],
    402855,
  );
  var A = e.i(279383),
    T = e.i(232453),
    M = e.i(352386),
    $ = e.i(63289);
  e.s(
    [
      "Q",
      0,
      "You need more SOL in your wallet to escrow the dispute fee and open a dispute. Add funds, then try again.",
      "$",
      0,
      "You need more SOL in your wallet to publish this bounty (fees, rent, and rewards). Add funds, then try again.",
      "G",
      0,
      "You need more SOL in your wallet to pay the submission fee and network costs. Add funds, then try again.",
      "D",
      0,
      "Reclaiming rent needs about 0.001 SOL free for network fees. Solana keeps ~0.00089 SOL locked as your wallet's minimum balance, so that part can't pay them.",
      "i",
      0,
      "add ~0.001 SOL for network fees",
      "t",
      0,
      (e) => {
        $.c.custom(
          (t) =>
            (0, M.createElement)(A.f, {
              message: e,
              onAddFunds: () => {
                (window.dispatchEvent(new CustomEvent(T.f)), $.c.dismiss(t));
              },
            }),
          { id: "bounty-wallet-top-up", duration: 8e3 },
        );
      },
    ],
    800792,
  );
};
