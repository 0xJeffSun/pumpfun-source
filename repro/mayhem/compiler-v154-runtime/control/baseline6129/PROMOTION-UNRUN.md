# UNRUN worker recipe: one clean root main build

This worker has not changed main or run a main build. Intended scratch publication: `repro/mayhem/sell-result-error-twentyfour`; separate root companion: `repro/mayhem/sell-result-error-main-twentyfour`.

Recheck the source/helper/runtime/tool hashes in `gate-before.json` and registry archive checks. Require main Cargo/Rust source to match accepted typed-buy baseline, then apply only `proposal/sell_pump_swap.rs`. Other source files, lockfile and helpers must remain unchanged. Leave README changes until after compilation.

From repository root, exactly once, into a new output path:

```
CARGO_HOME="$PWD/work/mayhem-burn-fixtures/cargo-home" PYTHONDONTWRITEBYTECODE=1 python3 scripts/build_partial_candidate.py --manifest programs/mayhem/Cargo.toml --program mayhem --artifact-name mayhem_recovered.so --tools-version v1.52 --output work/mayhem-sell-result-error-main
```

Require exit0, no compiler/backend errors and source_unchanged=true. Require stripped main SHA256 `7d416f848f03e46d9a514f4c505a8e903cdb908f52280bb961254eed90aebe1f` and size668640; require unstripped SHA256 `948a1a13f9ff947c8a544db7a2241c95e09618c9bb3613d4d2ab900d986329d8`. If either differs, stop rather than changing versions/flags or borrowing scratch acceptance for other bytes. Repeat after-gates. Only complete main/scratch equality permits associating these same finite receipts with main.

Apply the separately reviewed README/status proposals afterward and retain root build/identity/gate proof in the companion publication. The historical compiler remains unresolved; this pinned recipe is not a compiler-identity claim. No new fixture/probe, initializer work, binary modification or excluded scope is part of this recipe.
