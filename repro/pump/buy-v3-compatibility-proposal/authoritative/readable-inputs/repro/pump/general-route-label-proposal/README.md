# Natural hop-parser account-label correction — source proposal only

Rename the two `CurveHop` fields and their existing references from `base_vault` / `quote_vault` to **`associated_base_bonding_curve` / `associated_quote_bonding_curve`**. The exact one-file patch is `source.patch`; the complete proposed module is `proposed.rs`, SHA256 **f8091a092a7974c1f33e53ff65113e48c628435ffaa266c5de5a12bc0447a92d**. Its baseline is the approved isolated route module `55c64413…`, not moving main. No build, runtime execution or main edit has occurred.

This is a field-identifier substitution only. Account declaration order, types, attributes, constraints, operations, lifetime/borrowing, amounts, seeds, callbacks and every use stay in place. The verifier reverses the two exact identifier substitutions and requires whole-source equality with `before.rs`. It does not rewrite a comparison, swap registers, introduce padding, align coordinates or change compiler settings.

The identity-admitted original five-account parser at **0xdd700**, compared with fresh candidate at **627744**, is 3,512 bytes on both sides. The prior complete comparison found all 33 direct callee bodies matching and seven normalized instruction differences. Four correspond to the pointer-plus-length operands retained here:

| Parser-relative pointer site | Original consumed name | Candidate consumed name |
|---:|---|---|
| 1344 | associated_base_bonding_curve (29 bytes) | base_vault (10 bytes) |
| 2976 | associated_quote_bonding_curve (30 bytes) | quote_vault (11 bytes) |
| 3248 | associated_base_bonding_curve (29 bytes) | base_vault (10 bytes) |
| 3392 | associated_quote_bonding_curve (30 bytes) | quote_vault (11 bytes) |

`label-evidence.json` binds each actual lddw pointer, the following `r5` length instruction and exactly those consumed UTF-8 bytes; no trailing preview is treated as consumed. Complete original/candidate parser windows are retained. Full-input hashes and optional repository comparison re-establish each slice's membership in its full ELF. The original range and role were already established through the instruction dispatch/route parser chain in the unchanged prior build handoff.

The pinned, observed Anchor-syn **0.31.2** implementation directly supports this source correction. `try_accounts.rs:69–75` converts each field identifier to a string and calls `with_account_name` on reader errors. `constraints.rs:286–295` passes the field identifier into the mutable-constraint error builder; `1692–1717` converts it to a string and attaches it with `with_account_name`. These are complete copied source files, matched to the previously recorded expanded-source SHA and authentic crate checksum `99f085a9…` in `macro-provenance.json`. Both retained cache copies have those same file bytes; this is source-contract evidence, not a newly inferred historical compiler version.

The other three normalized differences at 2544/2552/2560 exchange memcmp argument registers. This proposal intentionally makes no change based on those instructions and makes no new equivalence claim about the caller. Existing parser/context/handler layout, framework, source-coordinate, full transitive helper/data and whole-ELF differences remain. The natural name correction is expected to repair these account-name payloads, but exact rebuilt bytes and runtime diagnostics are untested until a separately authorized combined build/validation. Historical full-source spelling is not claimed from these two labels alone.

Run `python3 -B verify.py`, optionally `--repo REPOSITORY`. The portable verifier checks all sealed files, exact source substitution/diff, complete window hashes against the retained prior evidence, all four pointer/length/literal witnesses and macro-source provenance. Optional repository verification reads the original candidate/source inputs without modifying them. No compiler or target executes. This proposal is separate from the V3 harness binding correction and from the nested-source lane; no prior package seal is changed.

Evidence revision 2 preserves the initial proposal seal and adds the complete previously sealed route-window ledger. The portable verifier now directly compares both 3,512-byte raw parser windows with that ledger and checks its hash against the prior build seal, rather than relying only on the new extraction seal. The proposed source and patch are unchanged.
