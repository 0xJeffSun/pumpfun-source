# Static SDK action/account matrix — no runtime acceptance

This packet closes the finite **literal instruction-builder inventory** in authenticated public `@pump-fun/pump-sdk@4.3.1` and `@pump-fun/pump-swap-sdk@2.2.0` archive sources: **104 sites (77 + 27), 71 distinct program/instruction pairs**. It does not prove an exhaustive dynamic JavaScript call graph. Public Program factories expose the bundled IDL directly; callbacks, external dependencies, input-dependent guards, and Anchor account resolution extend beyond these literal sites. No JavaScript, SDK builder, RPC, target runtime, VM, compiler, or transaction was executed.

The independent comparison is against frozen Rust **source**, not a second copy of the IDL: source HEAD `ef327155c9a218401b2538193ab1ca4eeeb53b0b`, clean tracked program source directories when observed. `source-observation.json` binds all 68 copied Rust files. This is a snapshot observation, not a claim that a compiled artifact or later HEAD has this interface.

## Read the matrix

- `MATRIX.md` / `instructions.csv`: all **124 bundled instruction declarations** (Pump 56, AMM 38, Fees 30), including the 53 without a production literal SDK helper. Every row names builder owners, frozen Rust wrapper and direct dispatch, passive exclusions, and source disposition.
- `builder-routes.csv` / `sdk-matrix.json`: all 104 actual literal builders, method arguments, source coordinates/hash, direct account expressions, account-chain kind, remaining-account expressions and lexical guards. The one saved `createV2` builder's later conditional `.remainingAccounts(...).instruction()` versus plain `.instruction()` is retained in `compiled-entrypoints.json`.
- `accounts.csv`: **1,134 ordered IDL account rows**, signer/writable/optional flags, IDL address/PDA seed metadata and relations, direct SDK expressions, and independently extracted Rust account fields/types/attributes. Init-implied mutability, non-PDA init signers, and `#[event_cpi]` injected accounts are explicitly identified. Order and these declaration-derived flags agree for all 121 present wrappers. This does not validate the generated Anchor ABI or manual/path-sensitive checks.
- `public-actions.csv`: 277 public non-constructor class methods. Direct builders and a **partial syntactic**, path-insensitive same-class/singleton call graph are retained. It is neither an upper nor lower bound on emitted runtime instructions. Methods with no known edges are not declared inert.
- `supplement.json`: 103 lexical pda-module declaration candidates, 88 general literal return-object candidates, 48 AccountMeta-shaped literal candidates, and 42 external/client instruction-construction sites. These retain original lexical declaration/object candidates, not evaluated addresses or semantic classification. The 103 include `isLegacyQuoteMint`/`normalizeQuoteMint`; the 88 include non-account results such as admission/depth/rate objects. Candidates are not assertions of executed order or complete helper expansion.
- `source-matrix.json`: exact wrapper bodies/context declarations and 226 literal CPI-related call/ID observations in 81 permitted wrapper/direct-handler bodies. These are source anchors, **not** an exhaustive transitive/path-sensitive CPI graph; external leaves are not followed. Client-created token/ATA/System instructions in the SDK are distinguished from on-chain CPI.
- `compiled-entrypoints.json`: both published root CJS/ESM bundles have exactly the same literal builder-name histograms as the corresponding production TS inventory. Other shipped JS bundle hashes/histograms are retained. This is not a bundled/source semantic equivalence proof.

## Supported findings and limits

No new concrete active SDK account discrepancy is established. Every direct literal account key belongs to its selected instruction. Rust ordered account declarations and signer/writable/optional derivation metadata agree with the retained SDK IDL for every present wrapper. **25 builder sites retain nonliteral account arguments/helper expressions**; an absent direct key is not classified as missing because `accountsPartial` resolves omitted accounts through Anchor, and account producers can be indirect. Exact SDK source expressions, IDL PDA metadata, Rust seed attributes, and pda-module declaration candidates are retained side by side without claiming arbitrary expression equivalence.

Three missing Pump source wrappers remain: `admin_update_token_incentives`, `claim_token_incentives`, and `set_mayhem_virtual_params`. The first two have literal public SDK routes. Claim helpers also contain early empty returns for default mint, absent mint account, and absent user accumulator, so their existence does not establish emission on every input. Incentive logic is passive here. `set_mayhem_virtual_params` is IDL/factory-exposed but has no production literal helper in these archives. These are known source-interface gaps, not newly measured execution failures.

Two Pump composition methods optionally append an Agent Payments initializer when `isTokenizedAgent`: `createV2AndBuyInstructions` and `createAndBuyInstructions`. `supplement.json` parses the actual bundled literal Agent IDL and binds the emitted `agentInitialize(...).accountsPartial(...)` chain, full account/PDA metadata, and program `pUmPFn9WvfaN2WTVGnCEtJTd2ATTpvpsKRz6jVzu6u4`; `optional-agent-accounts.csv` provides its ordered accounts. This dependency is outside the retained frozen nine-program target plan. Its optional builder interface is evidence only, without target loading or runtime acceptance. The prior authenticated interface audit already records this boundary.

BuyV3 partial-fill semantics, new sell_v2 probes, incentive admin/claim logic, Mayhem initialization, old token-extension leaves, and Metaplex runtime remain excluded. Their relevant action/interface rows are passive; archived source files can contain unexamined excluded routines. No excluded handler logic or external runtime leaf was analyzed or executed. SDK `createV2` routing/Mayhem account expressions are retained only as static client metadata.

Honest exhaustive extraction is feasible for the **104 literal builder sites and their declared ordered account interfaces**. It is not established for arbitrary public-client execution, recursive dynamic helpers, dependency-resolved account metas/PDA values, remaining-account outputs, or transitive CPI. SDK npm dependency ranges lack a frozen resolved JS dependency closure, as already documented by the upstream interface packet. There is no runtime-readiness, byte-identity, recovered-source percentage, or unique deployed-source claim here.

## Recompute

V2 supersedes initial control seal `c16db7a89cfb3785ad587b3417c4ffb6f1cf341a54d4a86cb34dd33b7c62651b`; see `CORRECTIONS.md`. Eight compiler-free lexical regression tests run inside the verifier, including authentic retained Relay declarations.



Run `python3 /absolute/path/to/verify.py` from any cwd while this packet is located beneath a repository ancestor containing `repro/programs.json`. Python standard library only. The verifier authenticates retained npm archives against their official registry SHA512 integrities and saved receipts, recomputes lexical SDK/source/supplement/compiled observations and rendered matrices, verifies frozen source hashes/account order/flags, and checks the packet manifest. It needs only retained archive inputs under `repro/sdk/interface-audit-20261025`; it does not use a network, mutable working-tree program source, JS installation, or runtime.

## Immutable primary archive references

The saved registry receipts bind version-specific npm metadata and tarball bytes, independently rechecked against SHA512 integrity strings (these URLs were not fetched again in this task):

- [Pump 4.3.1 registry](https://registry.npmjs.org/@pump-fun%2fpump-sdk/4.3.1)
- [PumpSwap 2.2.0 registry](https://registry.npmjs.org/@pump-fun%2fpump-swap-sdk/2.2.0)
- [Agent Payments 1.0.7 registry](https://registry.npmjs.org/@pump-fun%2fagent-payments-sdk/1.0.7)
