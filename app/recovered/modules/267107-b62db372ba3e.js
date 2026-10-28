// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(462378),
    r = e.i(575281),
    n = e.i(959719),
    a = e.i(971370),
    i = e.i(424509),
    o = e.i(466931),
    l = e.i(367036);
  class u extends Error {
    constructor(
      e = "Couldn't load the platform fee. Check your connection and try again.",
    ) {
      (super(e), (this.name = "BountyFeeQuoteUnavailableError"));
    }
  }
  let s = async ({
      connection: e,
      wallet: t,
      plan: r,
      percentageFeesEnabled: n,
      pumpBountiesProgramId: a,
      onChainBountyId: i,
      ensureFreshQuote: l,
      intendedPools: s,
      rumContext: c,
    }) => {
      if (!n) return { plan: r };
      if (!i || !a)
        throw new u(
          "Missing on-chain bounty identifiers required to pay the platform fee.",
        );
      try {
        let n = ((e) => {
            if (null == e) throw new u();
            return e;
          })(await l(s)),
          { instructions: o } = await d({
            connection: e,
            wallet: t,
            pumpBountiesProgramId: a,
            onChainBountyId: i,
            quote: n,
          });
        return {
          plan: await f({
            connection: e,
            wallet: t,
            plan: r,
            feeInstructions: o,
          }),
          feeQuoteNonce: n.quoteNonce,
          feePayerAddress: t.publicKey.toBase58(),
        };
      } catch (e) {
        throw (
          c &&
            (0, o.l)({
              error: e,
              feature: "bounties",
              operation: e instanceof u ? "fee-quote" : "fee-pay",
              context: { taskId: c.taskId, purpose: c.purpose },
            }),
          e
        );
      }
    },
    c = async (e, t) => {
      let r = await e.getAccountInfo(t, "confirmed");
      if (!r) throw Error(`Fee mint ${t.toBase58()} not found on chain.`);
      if (!r.owner.equals(n.z) && !r.owner.equals(n.S))
        throw Error(
          `Fee mint ${t.toBase58()} is not owned by SPL Token or Token-2022.`,
        );
      return r.owner;
    },
    d = async ({
      connection: e,
      wallet: o,
      pumpBountiesProgramId: u,
      onChainBountyId: s,
      quote: d,
    }) => {
      let f = new a.PublicKey(u),
        m = t.i.fromConnection({ connection: e, wallet: o, programId: f }),
        p = new a.PublicKey(d.feeMint),
        h = p.equals(t._),
        b = h ? n.z : await c(e, p),
        v = (0, r.h)(p, o.publicKey, !1, b),
        g = BigInt(d.feeAmountAtomic),
        y = [];
      if (h) {
        let { instructions: e } = (0, t.o)(o.publicKey, o.publicKey, g);
        y.push(...e);
      }
      let x = await (0, t.q)(m.program, {
        payer: o.publicKey,
        bountyId: new i.default(s),
        quoteNonce: new i.default(d.quoteNonce),
        purpose: (0, l.S)(d.purpose),
        amount: g,
        feeMintAccounts: { mint: p, sourceTokenAccount: v, tokenProgramId: b },
      });
      return {
        instructions: [...y, ...x.prefixInstructions, x.mainInstruction],
        escrowPda: x.pdas.bountyFeeEscrowPda,
      };
    },
    f = async ({ connection: e, wallet: t, plan: r, feeInstructions: n }) => {
      let i = r.blockhash,
        o = r.lastValidBlockHeight;
      (null === i || null === o) &&
        ({ blockhash: i, lastValidBlockHeight: o } =
          await e.getLatestBlockhash("confirmed"));
      let l = new a.Transaction();
      return (
        (l.feePayer = t.publicKey),
        (l.recentBlockhash = i),
        l.add(...n),
        {
          ...r,
          transactions: [...r.transactions, l],
          blockhash: i,
          lastValidBlockHeight: o,
        }
      );
    };
  e.s([
    "c",
    0,
    u,
    "v",
    0,
    ({ percentageFeesEnabled: e, feeQuoteNonce: t }) => {
      if (e && null == t) throw new u();
    },
    "C",
    0,
    s,
    "t",
    0,
    ({
      percentageFeesEnabled: e,
      quote: t,
      isQuoting: r,
      selectedFeeMintAddress: n,
    }) => !e || (!r && null != t && t.feeMint === n),
  ]);
};
