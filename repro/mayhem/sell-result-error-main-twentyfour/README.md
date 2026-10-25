# Main identity for SellPumpSwap typed-result refinement

The root controller performed one clean pinned v1.52 build after applying only the reviewed SellPumpSwap expression. The complete stripped executable and complete symbol ELF equal the validated scratch output, byte for byte:

- Candidate SHA256 `7d416f848f03e46d9a514f4c505a8e903cdb908f52280bb961254eed90aebe1f`.
- Symbol ELF SHA256 `948a1a13f9ff947c8a544db7a2241c95e09618c9bb3613d4d2ab900d986329d8`.

The scratch manifest is bound in `acceptance-inputs.json`; its selected source, build, gate, static-domain, verification and summary files are copied under `reference/`. Complete original/candidate identity is false. The associated9595 comparisons are functional finite evidence, with all known diagnostic limits;26500 verified signatures belong only to the13284 retained transaction strings, not all19190 recorded/derived signed executions.

## Verification

```
python3 -B verify.py
python3 -B verify.py --current-main /path/to/repository
```

Default verification is portable and reads only this package. It checks the seal; selected scratch references against their copied full manifest; entire executable/symbol identity; normalized source-path correspondence; actual source bytes; source-unchanged build records; compiler/SDK identity; all root build/dependency exit records; before/after dependency equality; and scratch functional/signature counts. Optional `--current-main` additionally checks the current Cargo/Rust sources, README and unchanged build helpers.

`main/build-time-README.md` preserves the unchanged README at build time. The reviewed new README was applied afterward and is preserved in `source/programs/mayhem/README.md`. README is not a compiler input; both distinct hashes are recorded rather than rewriting history.

`main/controls/` contains the root controller, exit records, before/after gates and dependency evidence. `main/build.log` retains warnings. `packaging-observations.json` records rechecked helper/runtime/tool hashes; it is not a per-process trace. No extra build, runtime case, probe or source edit was performed to make this package. No initializer was implemented or exercised.

Intended publication: `repro/mayhem/sell-result-error-main-twentyfour`. The immutable scratch evidence remains separately published as `repro/mayhem/sell-result-error-twentyfour`; source-only review, raw runtime receipts, full ledgers and limitations remain there.
