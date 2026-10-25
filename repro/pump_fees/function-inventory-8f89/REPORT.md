# Fees current exhaustive static window inventory

This inventory binds the current `8f89dbeb` Fees candidate to all **585 original inferred windows** and **548 candidate symbol windows**. It retains every row, all strict matches, size-only alternatives, normalized/raw comparisons, ambiguities, unmatched rows and immediate call residuals. It does not assign historical names to the original windows, propose handler changes or measure semantic completion.

The newest tracked full Fees inventory is `repro/parallel-work/2026-10-24/results/fees_functions/evidence/catalog.json`, published in commit `278e47e8bd13fc047280bb10faae17ac4e03a12b`. Its candidate is **e501ca2**, not the earlier **a9c4ea9** inventory. The copied prior catalog and its original seal remain unchanged. The verifier re-applies the same strict method to the prior ELF and reproduces **every comparable prior row, match and immediate-call result** before comparing with the current ELF.

## Whole input identities

| Input | Bytes | SHA-256 |
|---|---:|---|
| Captured original | 948,944 | `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` |
| Current stripped candidate | 768,848 | `8f89dbeb0eaef9490a518a97adb50dd8cbf0a21984a2bfca343d6ff5c2fe6c8e` |
| Current symbol ELF | 1,096,528 | `6376e39ed0ac6b9ee7533463db069362c3e538f5ed0e799da7fa84a03020492d` |
| Prior stripped candidate | 768,072 | `e501ca2c744373e5653a5ac7e25a3fd20f6058765808b888c3605fd03adba60f` |
| Prior symbol ELF | 1,095,456 | `173b1310cd99717906797d9253a01d40c56ba6fc8421f93828c49e860d353b78` |

The current candidate and symbols are byte-identical copies from `repro/pump_fees/donation-event-account-v144`; its published manifest SHA-256 is `a544615738c62279f1ebfd9dae4107b1db5640ac55f05d25f65e939933f91340`. Each symbol ELF's entire `.text` and relocation map equal its stripped counterpart. `inputs.json` binds all 21 consumed input copies by complete file hash, size and public origin. The current package's source archive/map retain all 26 exact build inputs and are rechecked without compiling. Preserved build/provenance records establish where the current candidate came from; this task does not replay a build or runtime.

## Method and complete denominator

All addresses are file offsets with exclusive ends. These ELF text virtual addresses equal file offsets. Original windows cover all 799,648 text bytes, and current symbol windows partition all 696,856 candidate text bytes. The 29 eight-byte candidate windows remain included.

The unchanged public ELF reader infers original entries from direct-call targets, code relocation targets, available symbols and the ELF entrypoint. Consecutive entries define windows. These are **inferred intervals, not recovered original functions or source identities**. The terminal window is retained as a row but excluded from the inherited strict index because it has no next known entry.

A strict pair requires equal size, normalized bytes and relocation pattern. Normalization only masks signed internal-call immediates and relocated external-call/LDDW immediates in memory. Neither executable is rewritten. Raw equality is a separate field. Size-only and normalized-byte-only candidate lists retain every alternative and are explicitly not correspondence claims. Candidate symbol names are labeled as belonging to their own candidate; `historical_function_name` is null in every original row.

For each strict pair, every direct call's raw eight bytes, signed operand and computed target are retained. An immediate target is supported only if that original target is among the target candidate window's strict matches. A pair is call-consistent if it has no contradiction from a uniquely mapped target. That condition permits unresolved or ambiguous callees and is weaker than complete immediate target support. None of these flags proves recursive code/data closure.

| Same-method count, all sizes | Prior e501ca2 | Current 8f89dbeb |
|---|---:|---:|
| Candidate windows | 548 | 548 |
| Candidate windows without a unique-call contradiction | 436 | 438 |
| Candidate windows with a raw-equal strict match | 98 | 98 |
| Candidate windows with all immediate target patterns supported | 415 | 411 |
| Candidate unmatched windows | 109 | 107 |
| Candidate windows whose matches all have a unique-call contradiction | 3 | 3 |
| Original windows with a consistent candidate pattern | 435 | 437 |
| Original unattributed windows | 147 | 145 |
| Original windows whose matches all have a unique-call contradiction | 3 | 3 |

The current catalog retains 1,167 strict pairs. **137 candidate windows and 138 original windows have multiple strict matches**. Those alternatives are retained, not resolved by similarity or naming. There are 2,607 paired direct calls across all alternatives, including 272 residual call pairs: 178 contradictory alternatives, 92 unresolved immediate-target patterns, and two terminal-boundary exclusions. These are pair counts, not distinct defective functions. The 1,039 call-consistent pairs retain 92 unresolved call pairs; 27 call-consistent candidate windows lack any pairing with complete immediate target support.

All 122 candidate and 121 original indirect calls, 2,205 candidate and 2,214 original relocated pointers, and external syscall references remain in the per-row dependency records. Pointer addresses are decoded, but full object extents, contents and transitive equivalence are not asserted.

## All status changes and residual limits

`comparison.json` has exactly 585 per-original rows, preserving both candidate versions and every before/after match. `changed-window-evidence.json` contains complete difference and direct-call records for all eight changed original windows.

| Original interval | Prior status | Current status |
|---|---|---|
| [85560, 88552) | Unattributed | Pattern mapped |
| [308352, 315176) | Unattributed | Pattern mapped |
| [425776, 434760) | Unattributed | Pattern mapped |
| [537312, 538040) | Pattern mapped | Unattributed |
| [539488, 540216) | Pattern mapped | Unattributed |
| [575408, 576136) | Pattern mapped | Unattributed |
| [618504, 620112) | Unattributed | Pattern mapped |
| [655904, 656832) | Unattributed | Pattern mapped |

The three newly unmatched 728-byte windows each differ at exactly one normalized instruction slot, offset **+528**. The current immediate is 29 versus original 27 for original starts 537312 and 539488, and 30 versus 28 for original start 575408. Their relocation patterns and all seven immediate target patterns still match. These raw differences are not labeled behavioral regressions, nor do they justify source-coordinate manipulation. The candidate associations are explicitly traced through prior pattern matches and candidate symbol spellings; they do not assign historical source names.

The two Rent-associated candidate symbol windows at 618128 and 618528 retain a +232 target comparison to original 799664. The terminal original window [799664,799936) is raw-identical to current candidate windows [694592,694864) and [696872,697144), but the strict matcher excludes that terminal boundary. Both supplemental matches are retained. Their call-conflict classification is a known boundary artifact, not a claimed behavior defect.

The other call-conflict row is candidate [575888,576816) versus original [681648,682576). At +72, candidate target 593920 has a strict match at original 700528, whereas the actual original call targets 700488. The current candidate symbol identifies its own body as `anchor_spl::associated_token::create_idempotent`. The original source identity and helper semantics are not inferred. This task preserves the unresolved immediate target discrepancy and makes no dependency/source proposal.

`residuals.json` retains all **110 candidate residual rows** and **148 original residual rows**, including the three strict call-conflict rows on each side. Full handler differences, unmatched helper bodies, indirect calls, data extents and recursive closure remain unresolved. The donation business-logic worker owns separate handler analysis; no new donation logic or source proposal is included here. No historical runtime receipt total is treated as proof of this whole-body inventory.

## Portable verification

Run from any directory, using only Python's standard library:

```sh
python3 -B /path/to/fees-current-function-inventory/verify.py
```

The verifier checks the exact file inventory, complete input hashes, selected published manifest bindings, all 26 archived source inputs, symbol/text identity, every prior/current inventory row, all match/call alternatives, every changed-window record and exhaustive residual membership. It executes no ELF, runtime, compiler or network operation. `portability.json` records copied-package positive and deliberate corruption/missing-file checks. All preexisting seals, source files and central status documents were left unchanged.
