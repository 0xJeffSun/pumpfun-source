# AMM accumulator mutation ordering: isolated build and existing corpus

The sole Rust change moves the `init_user_volume_accumulator` user assignment after the event construction's successful `Clock::get()`. The original executes Clock before the user stores. The new compiled candidate does too: Clock at `0xc29f0`, failure branch at `0xc2a00`, user stores at `0xc2ac0..0xc2ad8`. No other Rust input changes. `proposal-evidence/REPORT.md` retains the initial instruction attribution and its limitations; `assignment-after-clock.patch` there is the exact source patch. `README.patch` is the separate documentation proposal.

The single isolated build returned **0** using the accepted v1.44 compile/v1.52 strip recipe. It reported no backend stack or LLVM errors. Candidate SHA-256 is `8ce5f9588bdf7ca3d357a542518ad47aa1376fd8f3d242c37f18f55cef766a0e` (1,199,072 bytes); symbol ELF SHA-256 is `0c301087d7531271589e192c0e2db01dc3a9d5d08643fde80ddd3bcddf10e92a`. Exact build log, command, numeric exit, 22 source hashes, tool/SDK maps, phase record and 254 locked package archive/member witnesses are retained. The full proposed source lives in `source/`; accepted baseline and proposed lib.rs plus README live in `before/` and `proposal/`.

All **25 unchanged suites / 17,462 comparisons** pass with zero mismatches. All 25 suite exits are zero. Saved receipt verification passes **35,418 signatures**, **35,074 transactions** (34,924 comparison transactions plus 150 existing setup transactions), 191 scalar diagnostic cases and 78 recipient diagnostic cases. No new runtime case, initializer-success fixture, signing/history bypass or live transaction was introduced. The existing harness, observer, input controls and dependencies are retained under `runtime-source/`; compressed complete receipts and signed transaction sidecars are under `runtime-01/`. The runtime runner and observer were copied without changing case generation or assertions. Absolute execution paths in receipts are historical provenance, not portable verifier inputs.

The complete original/candidate function/call/data inventories were regenerated both before and after. Both have 785 original and 653 candidate windows, 475 original windows with normalized matches, **310 unmatched original windows**, 197 unmatched candidate windows, 1,136 immediate-call-consistent pairs and 1,083 recursive-direct-graph pairs. All rows and symbols, bounded/unresolved data references, file regions and transitive records are retained in `inventory/`. `before-after-summary.json` preserves every summary field. Whole byte equality remains false: candidate size grows by eight bytes and common-position differences rise from 670,580 to 671,150. These layout-sensitive numbers are not completion percentages. The initializer handler itself is 2,976 bytes versus 2,960 original and 2,968 accepted baseline; no full-handler equality is claimed.

## Portable verification

Python 3.11+ and `solders==0.27.1` are required for the unchanged signature verifier. From any copied package location, run:

```
python -B verify.py
```

This verifies the exact payload allowlist, source/build bindings and all saved signatures, then regenerates both full inventories from retained original/candidate/symbol files using the unchanged accepted analysis methods. It creates temporary analysis files alongside the package and removes them; it does not compile or execute a transaction. To confirm the repository still has the accepted pre-promotion source and README, add `--baseline-main /path/to/repo`. After root executes the prepared promotion, use `--current-main /path/to/repo` to confirm all 22 proposed inputs and the README.

## Prepared main promotion (not executed)

`promote_main_once.py` is an explicit, unexecuted root recipe. It gates the sealed package, all current accepted 22 source hashes, README, tools, helpers and SDK, copies a caller-selected reviewed public registry to a private directory, validates locked dependencies, and changes only lib.rs and README. It then performs one clean main build with the unchanged accepted helper, checks after-source/tool/SDK/dependency identity, and requires complete executable **and** symbol-ELF equality to this tested candidate before receipt reuse. Existing output directories block another attempt. Build failures and nonmatching outputs are retained and stop the script.

Example for root, only after reviewing the proposed files:

```
python -B repro/pump_amm/accumulator-order-v144/promote_main_once.py \
  --repo /path/to/repo \
  --output /path/to/repo/work/amm-accumulator-order-main \
  --cargo-home /path/to/repo/work/amm-residual-next/build/cargo-home
```

The script does not publish, commit, push or change central acceptance records. No main source or README was changed during this isolated work. Verification supports the observed source ordering and this finite corpus only. It does not establish a live Clock-failure environment, committed-state difference on a reverted transaction, historical source spelling, full recursive data closure, authentic `create_config` success, a security sign-off or whole-original identity. All earlier evidence remains immutable.
