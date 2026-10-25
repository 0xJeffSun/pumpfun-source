# Pinned SDK interface and missing-flow audit

The cited SDK versions are now bound to complete npm archives and publisher SHA-512 integrity records: `@pump-fun/pump-sdk`4.3.1, `@pump-fun/pump-swap-sdk`2.2.0 and the former's exact `@pump-fun/agent-payments-sdk`1.0.7 dependency. Their tarballs total about1.6MB. No npm install, lifecycle script, JavaScript, SDK builder, RPC, validator or transaction was executed. `analyze.py` reads JSON and source text directly from the archives.

The primary acquisition endpoints are the [Pump package version](https://registry.npmjs.org/@pump-fun%2fpump-sdk/4.3.1), [PumpSwap package version](https://registry.npmjs.org/@pump-fun%2fpump-swap-sdk/2.2.0), and [Agent Payments version](https://registry.npmjs.org/@pump-fun%2fagent-payments-sdk/1.0.7). Registry JSON, tarballs and acquisition hashes are retained. This pins the measured clients; it does not prove which SDK revision accompanied the captured deployment.

## Exact interface comparison

The entire Pump instruction, account-discriminator and event-discriminator JSON arrays match the retained upstream Pump IDL:56 instructions,7 account entries and32 event entries. PumpSwap likewise matches38 instructions,7 account entries and27 event entries. The two npm packages carry byte-identical PumpSwap IDL files. Because complete instruction objects match, their argument schemas, declared account metas and PDA descriptions match that retained interface too. This is a comparison of interface declarations, not all compiled parsers or runtime effects.

The type/error declarations are **not identical** to those retained snapshots:

| Program | SDK additions over retained snapshot |
| --- | --- |
| Pump | `TradeEvent` appends `quote_transfer_fee:u64`; error6110 `QuoteMintNotWritable` |
| PumpSwap | `BuyEvent`, `SellEvent`, `DepositEvent`, `WithdrawEvent` each append `quote_transfer_fee:u64`; error6088 `QuoteMintNotWritable` |

Every earlier field is unchanged. Remaining type definitions match, including the declared account layouts. The SDK's final-field name is useful semantic evidence, but it does not prove the reconstruction populates that value correctly for every trade family. Existing zero fields, bounded route attribution and the independently recovered BuyV3 descriptor must still be checked against their own target evidence. PumpSwap deposit/withdraw already implement their named field; this is not newly missing source there.

Fees is a strict SDK subset:30 instructions versus the retained31, with no changed instruction object. The omitted instruction is `withdraw`, together with `WithdrawEvent` and errors `IncompleteTokenAccounts`/`NothingToWithdraw`. All30 SDK instruction names have source wrappers in the frozen Fees source. Wrapper presence alone does not prove account validation, generated code, CPI behavior or byte identity.

## Missing builders and conditional flow boundaries

The frozen Pump source still has53 wrappers against56 SDK declarations. `admin_update_token_incentives`, `claim_token_incentives` and `set_mayhem_virtual_params` are absent. The SDK's `onlineSdk.ts` positively builds both incentive instructions on `offlinePumpProgram`; its combined-program helpers include Pump and AMM legs. `claimTokenIncentives` can return an empty list before building anything when configured mint/account prerequisites are absent. Therefore the precise gap is the emitted Pump instruction's missing dispatch, not an assertion that every invocation of the client helper must fail. No new execution establishes fallback behavior on latest main in this package.

The two optional tokenized-agent creation paths in `sdk.ts` import `PumpAgentOffline` and append its `create(...)` instruction when `isTokenizedAgent` is true. The pinned Agent Payments implementation turns that call into `agentInitialize`, targeting **`pUmPFn9WvfaN2WTVGnCEtJTd2ATTpvpsKRz6jVzu6u4`**. This address is absent from the frozen nine-program localnet plan. It is separate from Pump, PumpSwap, Fees, Mayhem and Donation Relay. That optional client flow therefore needs an explicitly selected deployment capture, loaded program, account prerequisites and its own acceptance evidence before complete SDK coverage can be claimed. This audit does not silently add a different deployment or expand the four-program byte-identity target.

## Dependency and acceptance limits

Pump declares ranges `@coral-xyz/anchor:^0.31.1`, `@solana/web3.js:^1.98.2` and `@solana/spl-token:^0.4.13`; the Agent Payments dependency is exactly1.0.7. These are package declarations. No resolved client lockfile or installed transitive closure is supplied here, so they are not evidence of exact installed Anchor/web3/SPL versions. Rust target dependencies, host proc-macro dependencies and JavaScript client dependencies are separate graphs.

Complete acceptance still needs a chosen resolved client lock, the action→instruction→account→CPI matrix, legitimate account/signature prerequisites, client preflight rules, success/rejection and event decoding fixtures, and all selected external programs. Static agreement of interface arrays and a successful nine-program launcher dry run do not establish those properties.

Run `python3 -B verify.py` for a standard-library-only integrity check and independent recomputation from the saved archives and three hash-bound upstream IDLs. Frozen source observations are copied and sealed; later source improvements do not retroactively change this audit or cause it to claim new runtime coverage.
