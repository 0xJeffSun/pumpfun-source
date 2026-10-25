# AMM claim CPI/context ownership residual — no new patch

Current accepted6dc claim handler remains7704 bytes versus original4168. Complete parser10344, wrapper1112 and exit952 retain normalized matches. No new natural API/type/ownership correction is proved. The complete root/actual-target rows are preserved; this conclusion does not turn the handler into a successful match or claim full transformed CFG equivalence.

## Original/current CPI chain

Original handler5a570 calls application wrapper727b8 (2400 bytes) at5a950. That wrapper checks zero amount, calls self-transfer predicate6f608 (656 bytes) at72920, then invokes anchor_spl transfer_checked f4a30 (2192 bytes) at730e0 on admitted success. This chain was fully admitted by the frozen earlier claim-transfer proof and is reused without new original scope.

In current handler b5540, the already-reviewed source require! inlines the exact source!=destination OR source.owner==authority predicate before constructing TransferChecked/CpiContext. Its direct transfer target e6560 (943456) is the complete2192-byte normalized instruction/relocation-pattern match to originalf4a30; downstream-match.json records actual candidate symbol attribution. The token_interface public path re-exports the token2022 implementation used here. A different token API/package or AccountLoader substitution is unsupported.

Original wrapper argument provenance remains source=context+158, destination=context+80, global authority key passed at stack-ff8 and amount/decimals from validated members. Wrapper reads source/destination AccountInfo keys and source token owner for admission, then constructs checked transfer. Current source supplies from=global_incentive_token_account,mint=mint,to=user_ata,authority=global_volume_accumulator,token_program and the same signer seed global_volume_accumulator+bump, amount and decimals. Parser match supports those member roles; there is no evidence of omitted remaining accounts or a different authority.

Original wrapper's zero-amount early return is redundant in this caller because Claim returns/logs before its call for amount0. A second zero branch at the CPI source call site is not a necessary semantic restoration. SelfTransferNotAllowed6087 is already restored, with its historical may-be-unreachable-under-valid-ATA constraint caveat; no new failure fixture is added.

## Ownership and cleanup limits

Original Claim performs AccountInfo Rc clones before entering its application wrapper; current source performs its predicate before building inline CpiContext. Their generated clone/drop scheduling and helper boundary differ. The complete downstream transfer body matches and both paths retain cleanup and ProgramError conversion, but that is not proof of full Rc failure/abort lifetime equivalence. The observed clone schedule alone does not identify a different natural wrapper parameter ownership type. Extracting a helper merely to imitate that schedule, moving clones before the predicate or adding artificial scopes/inline annotations would be code-shape steering without original source declaration evidence.

The candidate's enlarged body additionally contains inline accumulator math/reset and panic/error construction rather than the original208-offset call to shared updater6d408. Extra direct calls are therefore not evidence of additional token CPIs or a duplicated transfer. Current handler has29 direct calls versus12 original; full rows preserve all targets, branches, relocations, abort and unresolved metadata rather than comparing counts as equivalence. No scalar specialization or snapshot movement is proposed.

On nonzero success, original token CPI returns before checked total-claimed addition and subsequent state clearing; current retains the accepted pre-mutation addition. Both event logging and event CPI follow mutation. On token failure, source ? propagates before those stores; the candidate error path and generated context cleanup remain in complete admitted windows. The previous exact overflow-order and6087 corrections are preserved; no new mutation-before-error discrepancy was found.

## Decision and remaining gate

No source_patch. A genuine further helper restoration would require independent evidence of original reusable transfer API signature/type ownership and complete caller membership, not a wrapper's byte length or desire to reduce inlining. Exact Rc panic/error/drop data ABI, shared updater source organization, event allocation/serialization and recursive metadata remain open. Prior Claim source diagnostic147→149 is unchanged and must not be spoofed. Existing17462-case corpus is not rerun or promoted to all-input equivalence.

No build/runtime/probe, active source/main/Git/index/branch changes, forced layout/origins or newly opaque body admission occurred. `verify.py --repo .` checks all retained full row hashes, current source/input binding, complete downstream transfer match and matched context claims only.
