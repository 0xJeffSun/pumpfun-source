# AMM scalar guard integration: independent acceptance review

No substantive finding remains. The frozen scratch handoff and completed main promotion pass their saved-evidence verifiers, including current main inputs. Independent source, original-instruction, signature, transaction-accounting, scalar-diagnostic and central-reference checks also pass. The new candidate is **1,177,512 bytes**, SHA-256 `a6dbd0dc24e28a9459e50858136a2cfabb59fb8aa8399d58499d047a76ec291f`; its whole file equals the tested scratch executable. Neither is equal to the captured original.

The reviewed scratch manifest is `47597f9733ee81e5e01bdaf5b7e44aebbba3960886cdcad281f985b050cfe991`. The completed publication is `repro/pump_amm/scalar-guard-order-v144`, manifest `91303b85c079c8154f13af252a12538e145764756cb8a6d83337771f531eb648` (335 payload files). `final-package.tar.gz` preserves every one of its 336 files byte-for-byte, including the manifest and complete scratch handoff; only transport archive metadata was normalized. The package was inspected only after its owner confirmed it was sealed.

## Source behavior and original evidence

Only `programs/pump-amm/src/lib.rs` changes among the 18 compiled inputs. The proposal preserves recipient validation and restores unsigned scalar checks and successful stores in **LP → protocol → recipients → creator** order. The use of `require_gte!(1000u64, fee, …)` preserves the observed comparison value order. Main compiler inputs equal the approved scratch proposal; the retained main/scratch reports and tool phases remain distinct. v1.44 compilation and the separate unchanged v1.52 stripping phase are recorded without claiming a unique historical pipeline.

Independent raw operand decoding confirms original call sites `121072 → 398896`, `121176 → 399512`, `121248 → 400744`, and `121320 → 400128`. The three scalar targets are complete 616-byte windows. Each uses an unsigned `r7 > 1000` branch, stores only on success, and passes `1000` followed by the supplied fee to the original comparison-value helper. The successful stores use offsets `0x380`, `0x388`, and `0x390` in the compiled account representation; these are not asserted to be serialized wire offsets. No source-line padding, compiler variation or executable editing is involved.

The runtime evidence demonstrates the compared-value correction on the existing corpus. The proposed mixed-invalid recipient/creator precedence remains a static prediction because that combination is absent from the corpus; it was not executed or presented as new runtime coverage.

## Diagnostic and transaction accounting

All **25 existing suites / 17,462 comparison cases** remain successful. The exact 356 fee-config case payloads and mutation labels match the earlier corpus. Exactly **191 existing scalar rejection cases** now produce matching original/candidate logs: `Left: 1000` and the complete supplied `Right` value. The previous candidate lacked the expected pair in all 191 cases. The first invalid argument is LP in 111 cases, protocol in 48, and creator in 32; 115 use 1001 and 76 use `18446744073709551615`. These are stricter assertions on existing cases, not added cases.

Independent decoding and cryptographic verification accounts for **35,074 stored transactions / 35,418 signatures**. There are **34,924 comparison transactions**, exactly two per case, plus **150 original-program `create_pool` setup transactions** confined to the boost suite. All 150 setup ordinals agree with the explicit receipt-binding lists and contribute 150 signatures. Setup transactions are excluded from comparison and handler counts. Every comparison pair maps to the original/candidate loaded AMM hashes and corresponding saved error result. Loaded-program hash records are crosschecked against retained runtime inputs.

All **74 migration transaction observations** are byte-identical to the retained `missing_boost` signed migration payload (SHA-256 `c8c1f14fb616536425efb888eb65eae1b661abe44c101ddbf30e76a64cb0f306`), with valid signatures. Their synthetic starting-state variations and historical blockhash-freshness adaptation retain the existing documented scope. This does not claim historical bank reproduction. The observational wrapper verifies signatures, rejects attempts to disable verification, forwards the original transaction object, and asserts that its bytes remain unchanged. No private keys are stored in the sidecars.

## Static limits are correctly preserved

The 2,296-byte wrapper matches after the documented operand/relocation normalization, but its callee handler does not: **6,096 candidate bytes versus 2,912 original bytes** (the prior candidate was 5,832). The three 616-byte original scalar setters have no standalone complete candidate match.

The actual three scalar error paths call the specialized 1,336-byte helper at `0x340`, which differs at instruction offsets 24, 32, 40 and 48. All eight immediate targets are checked, but the helper itself remains unmatched. The unused generic counterpart is explicitly separate and is not substituted as proof for the called body. Five generic helpers / 94 target checks and the bounded instruction-log literal are retained with appropriate limits; historical paths/line values and arbitrary formatting/panic tables remain unresolved.

The promoted package also freshly checks Pool and GlobalConfig serializer exits at their new symbol locations, with 24 direct targets and the eight-byte discriminator for each. These bounded matches do not establish whole-program equivalence. Full-file equality, exhaustive behavior and security/audit completion remain false or unproven as documented.

## Main and central integration

The final package verifier passes with `--current-main --repo .`, binding source, documentation, helpers, harnesses and runtime inputs. The generic saved-build verifier passes the new AMM entry with 17,462 receipts. No main runtime rerun was needed because complete ELF identity was independently checked. Historical pre-seal verification records and the known accounting/phase-audit mistakes remain preserved; they are not represented as additional builds or suites. Dependency integrity is a retained postbuild check, not a newly performed cache audit or proof of the deployed historical dependency graph.

Pending central status exactly equals the owned AMM proposal. Other programs' status entries are unchanged. All **38 AMM completion rows** reference the new artifact, and the ledger still has **150 unique rows: 140 bounded, five partial, five unrecovered**. Total differential receipts remain **53,735**. CI changes exactly 25 AMM candidate paths and the current package-verifier command; existing flags/output names are preserved. The 191 stricter diagnostics and 150 setup transactions are not added to coverage counts. README/recovery/completion wording continues to distinguish this behavior correction from exact compiler reconstruction.

## Reverification

Run `python3 -B verify.py` using Python with `solders`. It checks this seal, extracts the frozen public package into a temporary directory, recomputes independent checks, verifies saved signatures, runs the package verifier and the unchanged generic verifier against frozen central inputs. It does not run a compiler, Solana program, Surfpool, network request or private-input task. Add `--current-repo /path/to/pumpfun-source` to require the reviewed central bytes still match and recheck current main bindings. Later authorized integrations can make that optional check stale.

Only `work/amm-scalar-integration-review` was written. The already sealed Fees review was untouched. No main edits, staging, commits, builds, runtime replays or network operations were performed. Local acceptance here does not establish a later hosted CI result.
