# Historical function inventories and preserved follow-up research

This portable bundle preserves three immutable function inventories from the `374fcf01a33a7665e0508a218e3566afc55e132f` baseline, plus seven completed static studies or unexecuted build proposals. The baseline hashes remain unchanged. **These tables do not give a source-completion percentage.** Original entry windows are inferred from ELF metadata and calls; candidate named ranges come from retained symbols. Neither is a count of independently identified semantic source functions. Raw equality, normalized shape, direct-call consistency, data consumption and runtime coverage remain separate claims.

Later Pump and Fees checkpoints supersede two specific source-correction leads. Their README snapshots are retained under `later-checkpoint-notes/`; the baseline function tables have not been recomputed against those newer executables. All four core programs still lack complete original-ELF identity. No source build, program execution, fixture, signer or new acceptance case was produced by this publication.

| Baseline | Denominator | Raw matches | Normalized matches | Direct-call-consistent matches |
| --- | --- | ---: | ---: | ---: |
| Pump `6271a6d5…` | 1,035 original inferred windows | 97 | 522 | 479 |
| AMM `5a68db39…` | 785 original inferred windows | 92 | 466 | 442 |
| Fees `a9c4ea9e…` | 539 candidate symbol ranges | 95 | 426 | 425 |
| Mayhem `9e4e19df…` | 409 candidate symbol ranges | 40 | 172 | 172 |

The different denominator directions must not be combined. Fees includes 27 eight-byte ranges and Mayhem includes 13; their saved tables also provide the separate ≥16-byte counts. A matched direct callee does not prove recursive closure or referenced data equivalence. Original-range matching is ambiguous where several identical bodies exist. The stopped Mayhem initializer wrapper remains metadata-only excluded; its body and following calls are not reconstructed by this bundle.

The dependency inventory has 159 ATA inferred windows, of which 153 are raw-identical under the saved address correspondence; six differ in moved-specialization/caller displacements and whole files still differ at 307 positions. Metaplex has 1,250 raw-identical windows out of 1,251; Utilize, 29 source-coordinate records and relocation bytes remain unresolved. The donation relay has 492 inferred windows without attributable source or a source-built candidate. These are method-bound inventories, not equivalence probabilities.

The preserved evidence index is:

| Package | Contents and status |
| --- | --- |
| [Pump/AMM inventory](work/pump-amm-current-body-inventory/REPORT.md) | Every saved original/candidate range, match status, call/data boundary and baseline source binding. |
| [Fees/Mayhem inventory](work/fees-mayhem-function-inventory/REPORT.md) | Every saved named/inferred range, unresolved helpers/data and historical source-correction leads. |
| [Dependency inventory](work/dependency-function-gap-inventory/REPORT.md) | Exhaustive ATA, Metaplex and relay rows under the stated entry-detection method. |
| [Native-only multi-curve finding](work/pump-native-multicurve-static/REPORT.md) | Static reachability limit and interpretation of existing caller receipts; no new runtime acceptance. |
| [Ordinary Tokenkeg two-curve study](work/pump-tokenkeg-two-curve-static/REPORT.md) | Preserved static route/account/transfer evidence and implementation boundary; no implemented or tested extension. |
| [Mayhem burn codec review](research/mayhem-burn-codec-followup/REPORT.md) | No justified codec correction from the selected bodies and dataflow; initializer excluded. |
| [Mayhem error ABI review](research/mayhem-error-abi-provenance/REPORT.md) | Return-convention and tool-family evidence; no uniquely identified historical compiler or Error-type correction. |
| [Initial Linux Mayhem proposal](research/mayhem-linux-v152-build-plan/REPORT.md) | Unexecuted; preserves the official SDK post-processing blocker. |
| [Darwin post-processing review](research/darwin-sbf-postprocessing-provenance/REPORT.md) | Static evidence distinguishing compilation from stripping in existing builds. |
| [Corrected fixed Fees Linux proposal](research/fees-linux-recorded-pipeline-plan/RECIPE.md) | Unexecuted v1.44-compile/v1.52-strip recipe, authentic Criterion v2.3.3 and exact recorded SDK; pending execution review. |

`gap-summary.json` gives the bounded remaining categories and links each to its complete machine-readable row table. The significant gaps include partial Pump routes and creation/trade scopes, static-only authority routes, unresolved account/framework/helper and rodata closure, historical tool/dependency/source provenance, ATA ordering, Metaplex Utilize, and the relay's missing source. Stopped lanes remain stopped. The later BondingCurve serializer and Fees social-v2 layout corrections are recorded as superseding their particular old leads, not as establishing whole-program completeness.

`publication-index.json` lists every original seal and baseline ELF binding. `owned-files.json` is the exact repository-relative file list for publication. The internal `work/`, `programs/`, `evidence/` and `repro/` trees deliberately reproduce the old repository-relative input closure **inside this bundle**; they are frozen evidence, not live workspace dependencies or instructions to replace current source. The original scripts and seals are unchanged. The Pump/AMM verifier intercepts the saved generator's final table writes, checks the exact would-be bytes against the frozen tables, and writes nothing.

Run `python3 -B verify.py` from any directory. It verifies the publication seal, all preserved package seals and input closures, then runs ten static verifiers. Add `--audit` to deny file opens outside the bundle and the Python standard-library installation in every child verifier. No proposed build helper, installer, compiler, ELF or runtime harness is executed. Large external platform-tool archives are hash-pinned in the research proposals; only their recorded provenance and selected source/member evidence are bundled, and eventual execution must verify the actual archives again.
