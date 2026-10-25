# Pump partial-path gap map — static handoff

Assignment complete as a source/evidence gap inventory. All four handlers remain partial. This is not semantic closure, an exhaustive original-program branch inventory, a security sign-off, or whole-byte recovery.

Inputs were read from checkpoint `80990317bd9c0363e071646b892490886d7bf946`. Accepted Pump candidate SHA-256 is `92575cd082bf76b332044a7d09371a9764db8b2cc40180bf1418f261945bbd6a`; captured original is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. The four inspected Rust files match the accepted package's source manifest. `docs/COMPLETION.md` and `repro/status.json` were read first and are preserved verbatim.

The old Pump/AMM inventory binds Pump `6271a6d5782d350f6d716a91712d283592d4589aa8e9befb9c1f1a0dd3ac7ebe`, before the accepted serializer promotion. Its candidate body addresses/counts are historical. This handoff does not refresh those counts or infer original function identity from matched windows. The retained official IDL is read independently and its prose is treated as a lead, not executable truth.

## Deliverables and status meaning

- `result.json`: per-function gaps, source facts, unresolved semantics, next static steps, fixed/remaining account roles, official argument/account metadata, and lexical decision/error sites.
- `case-index.json`: all 1,919 rows from eight relevant accepted differential suites, each with exact `/cases/N` pointer, original/candidate error and canonical row hash.
- `priority-evidence.json`: reproducible metadata filters for the ordinary-path follow-ups below. A key being present is not branch coverage.
- `evidence/`: verbatim copies of 24 inputs, including the eight compressed raw receipt files. No raw evidence was rewritten.
- `input-manifest.json`: source/evidence SHA-256 and sizes. Source references include inclusive line ranges and half-open byte ranges with slice hashes.
- `verify.py`: portable Python standard-library verifier. `verification.json` records the passing verification.
- `build_map.py`: static generation logic; `artifact-sha256.json` seals deliverables, excluding evolving CLI logs and itself.

`known` means an accepted-source fact or bounded retained result with limits still listed. `needs-evidence` means unresolved semantics or coverage, not a demonstrated bug. `stopped` means no retry or substitute lane. All source decision sites retain `needs-evidence`: lexical presence cannot establish original execution coverage.

| Function | Gap rows | Known | Needs evidence | Stopped | Account roles | Decision/error rows |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| sell_v3 | 16 | 3 | 12 | 1 | 18 | 73 |
| buy_v3 | 19 | 4 | 14 | 1 | 18 | 79 |
| buy_exact_quote_in_v3 | 20 | 6 | 13 | 1 | 18 | 95 |
| create_v2 | 19 | 7 | 11 | 1 | 22 | 83 |

There are 74 gap rows, 76 account-role rows and 330 lexical decision/error rows. Shared helpers occur in several functions; these are not unique branch counts or percentages. Every fixed IDL account is retained, including macro-added event accounts; creation adds five conditional remaining roles and an unresolved tail. Generated Anchor parser, transitive SPL, indirect calls and unknown original branches remain open. The final catch-all gap explicitly preserves that remainder.

## Findings and independent ordinary-path priorities

1. **buy_v3 partial fill and completion.** `programs/pump/src/lib.rs:100` discards `partial_fill`; `trade.rs:123–142` computes the requested amount directly, and `174–179` completes only at zero remaining real tokens. The retained create_v2 IDL prose describes crossing into a pool “as buy_v3 does”, while this accepted handler has no such branch. This discrepancy is not a reproduced mismatch. Start with saved ordinary SOL trailing-byte and reserve-boundary cases, retaining amount/funding differences rather than assuming paired equivalence.
2. **FeeConfig parser compatibility.** `trade.rs:278–291` gates stable/exotic tails at lengths 4073/4097; exact quote uses full deserialization at `193–200`. Both then enforce a 2512-byte minimum. Inspect retained length/error cases before proposing any source change; source differences do not establish which behavior is historical.
3. **Ordinary USDC account validation.** `trade.rs:301–311` checks user quote authority but excludes that role from ATA derivation. Official IDL prose calls the account canonical. Existing mutations are a starting point, not evidence that every noncanonical address is rejected or accepted. Curve-vault authority, recipient authority/membership, owner/mint, ATA and zero-transfer paths all remain separate questions.
4. **Exact-quote funded crossing.** `trade.rs:209–230` separates equality from exceeds, ordinary crossing from Mayhem partial fill, and uses actual base vault balance for post-complete output. `257–274` updates counters and emits ordered trade/completion/post events. Reconstruct arithmetic from existing funded-vault before/after records; do not generate transactions. Mayhem initializer work is not needed or authorized.
5. **Ordinary creation ABI/control/depth-one math.** `create_v2.rs:8` zero-defaults truncated u64 input, `44–84` selects native/whitelist/control/parent routes, and `121–142` computes normal SOL-root reserve composition. The accepted source stops at a depth-zero, incomplete, default-quote, non-Mayhem parent. Deeper chains, nonnative roots and migrated pools need existing evidence; IDL account grammar alone cannot recover behavior. create_v2 always creates a Token-2022 base mint: “ordinary legacy” here applies to eligible quote-side analysis, not a nonexistent Tokenkeg base-creation path.

The filtered saved evidence available for these priorities is:

| Filter | Explicit matching rows |
| --- | ---: |
| buy-partial-and-completion | 44 |
| fee-length-decoding | 41 |
| quote-account-validation | 27 |
| exact-funded-crossing | 57 |
| create-optional-ABI | 78 |

These filters overlap and omit default-valued fixture fields. They establish only which saved rows can be inspected, not independent tests or complete branch coverage.

## Remaining dimensions by function

**sell_v3:** non-USDC/exotic/nested quote routes; native aliases; base and quote parser constraints; canonical user quote account and vault/recipient relationships; fee tier/creator/Mayhem/holder combinations; reserve and fee rounding/overflow/zero denominators; minimum-output and actual-vault boundaries; transfer ordering/zero payouts/rollback; accumulator/cashback rejection precedence; event fields and final-u64 meaning; unused remaining accounts; all transitive and whole-byte gaps. V3 extension semantics stay stopped.

**buy_v3:** all shared trade dimensions above, plus ignored partial-fill argument, real/virtual reserve crossings, requested-output clipping, max-cost rounding, funded completion and lack of post-completion continuation. FeeConfig tail decoding and malformed optional-bool input have explicit entries. No source change is proposed solely because another handler differs.

**buy_exact_quote_in_v3:** all shared trade dimensions, full FeeConfig decode compatibility, gross-fee truncation/net-budget decrement, min-token/spend-zero precedence, real-reserve equality/exceeds, Mayhem partial-fill and slippage exception, ordinary residual pool math, actual vault funding, migration-fee subtraction, existing post counters, total versus first-leg event amounts and ordered completion events. Extensions remain stopped and final-u64 attribution belongs to the event worker.

**create_v2:** native/whitelist/control admission and reserves; owner/program/ATA checks; first-match control parsing and malformed counts; holder creator and configurable fees; optional ABI truncation; metadata/rent/CPI/mint-authority lifecycle; creation extension admission without downstream trade claims; depth caps, normal depth-one pricing and crossing math; deeper ancestor grammar; nonnative root eligibility; complete-but-unmigrated versus migrated parents; canonical pool and vault accounts, virtual pool reserves and error variants; Mayhem creation stopped. Source quotes admission of some extensions; this was recorded from accepted source and accepted creation receipts only.

## Saved evidence and verification

| Accepted suite | Saved rows | Original successes |
| --- | ---: | ---: |
| sell.json.gz | 301 | 227 |
| buy.json.gz | 334 | 233 |
| quote.json.gz | 130 | 107 |
| exact_quote_v3.json.gz | 352 | 195 |
| v3_configured_fee.json.gz | 372 | 290 |
| create_v2.json.gz | 297 | 114 |
| create_control.json.gz | 85 | 42 |
| nested_create.json.gz | 48 | 33 |

All eight raw receipt hashes match accepted receipt-build bindings for Pump `92575cd…`. Their saved comparison fields and original/candidate errors agree. This checks retained claims and bytes, not new execution, signature reverification or exhaustive output equivalence. Repeated inputs and synthetic/rejection fixtures are not promoted to independent semantic proof.

Run from any directory with Python 3.9+:

```sh
python3 /path/to/pump_partials/verify.py
```

Optionally append the main repository root to check current input bytes/source and candidate ELF hash against this snapshot. Verification checks 24 inputs, 544 precise source slices, all 1,919 saved row hashes/outcomes, IDL account/argument mappings, lexical-site completeness within the declared spans, metadata filters, and accepted receipt bindings. It does not build, import a harness, execute a transaction, call a chain, or mutate inputs.

## Boundaries preserved

No main repository edits, commits, pushes, broadcasts, signer bypasses, altered signed messages, binary patches, source padding, compiler/flag/path/version searches, builds, runtime probes, external chats or further workers. Only this assigned directory was written. The stopped sell_v2 transfer-fee correction/security probes, Pump incentive handlers, Mayhem initializer, old unintegrated v3 token-extension scripts and aborted extra Metaplex runtime probe were not resumed. multi_hop_curve_swap belongs to the native worker; final event suffix tracing belongs to the event worker. No stopped lane is proposed as an ordinary-path follow-up.

## Artifact hashes

- `result.json`: `81079acf6c885edbd50e35e572bc6f675e39285059dc4eefa6614656f3277801`
- `case-index.json`: `00848cd3571c38f2710777b1d56c94bd23a52c8b6800abf3ea38626c06b471d4`
- `priority-evidence.json`: `6141b34e037d01a5ca25dbbfea4f41bc2e4fa51db1283451c27dcc7ae93b4997`
- `input-manifest.json`: `2874aa9c7282bbcf7fb6143f015a32dfd37b00fca50717bf41ebe9ef05699f01`
- `verify.py`: `cf56688f45508d27bd59dc619f749f9f022ba5938ac8d3de8b1e6b7f5d9ae5a7`
