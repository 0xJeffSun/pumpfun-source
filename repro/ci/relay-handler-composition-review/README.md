# Relay handler composition review

The four independently prepared component hypotheses can be composed at the application-body level after two corrections to the standalone distribution packet. The sealed integrated hypothesis already makes both corrections. It remains an **uncompiled, incomplete source hypothesis**, with zero accepted handlers, builds or runtime receipts added by this review.

This review preserves all five input packages in full, with their original manifests and file bytes. It does not edit or supersede those seals. The captured relay ELF is 830,448 bytes, SHA-256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. The components bind public checkpoint `476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40`; the integrated input is the completed, explicitly approved CLI publication, manifest `e6110209c65ccbc5c9f68f654a6b47606a2b7545c68751319a9c5346ea8ab565`. These are frozen inputs, not a claim about later working-source revisions.

## Findings and disposition

1. **Shared helper 108 source/authority labels are reversed in the standalone distribution prose and interface JSON.** The correct K layout is recipient pointer/count at +0/+8, source token `AccountInfo` at +16, mint at +64, token program at +112 and distribution authority at +160. Caller 97 loads C+512 into F-224 and C+376 into F-80 with K=F-240. Caller 98 independently repeats this layout using C+456/C+320. Caller 100 uses K=F-384 with source F-368 and authority F-224. Helper 40 preserves the logical key when cloning; helper 108 copies the +16 and +160 values into their separate CPI roles. The integrated `Settlement`/`distribution108` source uses the correct roles. `proposals/corrected-shared108-interface.json` is an additive correction to the component interface only.
2. **The standalone distribution source sketch omits wrapper return data and substitutes close-only hooks for complete generated exit.** Original wrapper 186 calls set-return-data at 548744→669720 before generated exit 548792→417496; wrapper 187 has the corresponding 550712→669720 then 550760→434280. The integrated body returns an event; its phase layer logs, performs the signed self-CPI, serializes the bare return payload, then explicitly requires generated exit. `account_exit` remains incomplete instead of falsely succeeding. The additive patch demonstrates the component interface correction; it is not a compiled implementation or a new requirement to patch the already-correct integrated source.

`composition-ledger.json` records fifteen reviewed cross-component contracts with original operand witnesses. They include recipient/Jupiter slice separation; share kinds and selected amounts; caller weight admission and allocation; recipient validation before zero-amount skipping; context-before-business ordering; native funding/sync/close ordering; residual burn versus direct output close; actual signer seeds; event/return/exit sequencing; whitelist behavior; and the bounded program-account close primitive. “Consistent” means no contradiction was found in the reviewed contracts under their stated prerequisites. It does not establish complete original-source equivalence.

## Concrete remaining reconstruction units

The integrated source's `Incomplete` boundaries are real application work. `next-reconstruction-units.json` binds each unit to complete original function windows, current source boundaries, required runtime operations and a finite static acceptance target:

| Unit | Required implementation | Main original windows |
| --- | --- | --- |
| N01 | Fallible mint-authority and Token-2022 extension policy, with truthful account data/borrow access rather than an opaque safety callback | 106: 115456–118896 and its decoder helpers |
| N02 | Three token donation context variants: typed accounts, tracker/debouncer fresh and prefunded paths, ATA creation, exact payer roles | 121–125, 135–141 |
| N03 | Two native donation contexts, temporary account initialization and the native-mint/program predicate | 126–134; 103: 113360–114032 |
| N04 | Close-epoch context, unconditional distribution initialization and ATA creation, exact ordered constraints | 142–145 |
| N05 | Whitelist context and existing/fresh/prefunded account branches | 156–158 plus codecs/serializers |
| N06 | Just-swap and combined contexts, exact receipt/output ATA initialization modes and remainder admission | 150–152, 154 |
| N07 | Two standalone distribution contexts, including receipt-to-distribution binding and close destinations | 146, 148 |
| N08 | Full per-context generated exit: owner/closed checks, borrowing, serialization and ordered closes | 125, 130, 141, 145, 147, 149, 153, 155, 158; helper 282 |
| N09 | Selector/fallback/event-recursion dispatch and the complete decode→parse→body→event→return→exit wrapper | 169, 178–188 and adapters |

The JSON gives exact half-open byte ranges and SHA-256 values; ordinals are analysis labels, not recovered historical symbols. Its boundary map is a bounded work assignment, not a claim that every future context branch is already proved. N02–N07 share primitives and should coordinate representation rather than duplicate incompatible runtimes. N08 needs the admitted state/account handles from those contexts. N09 wires the completed phases; a `Result<()>` admission placeholder cannot substitute for admitted accounts and canonical bumps.

Ordinary external premises remain distinct: real account borrowing and aliasing, genuine System/ATA/Token/Jupiter programs, real PDA signing and privileges, rollback, serialization errors, and allocator/panic behavior. Natural normal-value arithmetic and codecs can be proposed without pretending their full allocator failure paths have been recovered. No new guard, blanket mint acceptance, successful no-op exit, synthetic signer or token-program stub is justified by this review.

## Verification and retained inputs

Run from any directory using Python 3 (verified with 3.12 and 3.14):

```sh
python -B /absolute/path/to/relay-handler-composition-review/verify.py
```

Optionally append `--repo /absolute/path/to/pumpfun-source` to compare the retained original ELF against the repository's canonical public ELF. Default verification is self-contained: it validates this review seal, unpacks all five complete archives into a temporary directory, checks the exact original inventories/manifests, runs their existing static verifiers, rederives 78 complete selected operand windows, checks bounded original calls/operands/literals, rebinds all contract witnesses and nine reconstruction-unit ranges, and validates the additive corrections and integrated source observations. It executes no SBF, Rust, compiler, VM or transaction.

A passing verifier establishes integrity and reproducibility of the static evidence. The semantic interpretation is a manual, conditional review; hash and operand equality alone do not prove it. `input-copy-verification.json` retains prior external-copy verifier results. `verification-tests.json` records base-Python and venv portability plus missing/tampered-input rejections without comparing interpreter-dependent diagnostic text.

The donation archive deliberately retains its sealed `__pycache__/disasm.cpython-314.pyc` byte for byte. It must not be silently dropped when publishing the original package. This review verifies that hash and runs source verifiers with `-B`; it does not edit or reseal the historical package.

The same bounded copy and negative checks are reproducible with `python -B /absolute/path/to/review/test_portability.py --alternate-python /absolute/path/to/another/python`. They modify only temporary copies and print their result. The optional second interpreter may be omitted.
