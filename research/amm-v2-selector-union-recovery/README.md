# Compose the recovered selector into PumpSwap union2: 759 -> 760

This source composition adds the complete original `0x14088` fee selector to
the [759-window union](../claude-amm-union2-20261028/README.md), preserving every
previous normalized match and all 159 raw matches. It also imports the existing
maintained H11 schedule guard so the final artifact does not retain the parent's
documented premature `SupplyUpdateForFinishedRange` error.

| Same pinned Linux v1.44 recipe | Normalized / 785 | Raw | Stripped SHA-256 |
| --- | ---: | ---: | --- |
| Rebuilt union2 baseline | 759 | 159 | `1eb1ce0502159081cf928abdeaf8d2f2e56cbaf4c241d8e649c82b790e56218f` |
| Selector-only intermediate | 760 | 159 | `663901e20359f3f0c9bcbb1fef199272e983fa7974cca6f3ec149ffb71537f56` |
| **Final selector + H11 integration** | **760** | **159** | `e708c278cdda90f08f0aafb8739d857c69b5878bca78ab16d62af820ca3c7231` |

The original selector is **1,656 bytes / 195 instructions**; the union2 baseline
body is 1,760 bytes. `analyze.py` rechecks the complete normalized body, the 13
actual direct callee bodies, 12 typed data references and six vtable method
targets. The preserved `apply_hop_fees` at original `0x44ab0` actually calls this
selector. Source record `fees.rs:184`, error 6083, and its filename are checked.
The selector is not raw-byte identical. Normalization masks designated address
and call operands; the separately checked references do not prove complete
recursive call closure or whole-ELF equality.

## Source changes and attribution

`source.patch` changes two files in the complete 57-input workspace. Expanded
proposals are in `proposed/`; portable source archives are in `sources/`.

- `curve/fees.rs` composes the ordinary Rust recovery already merged in
  [PR #431](https://github.com/lalalune/pumpfun-source/pull/431): scoped PDA
  lifetime, owned fee selection, a complete success consumer, and guarded quote
  matching. The prior compiler/MIR/codegen investigation and rejected hypotheses
  remain in [its packet](../amm-v2-fee-selector-recovery/README.md). This packet
  establishes that the recovery survives the newer union, rather than counting
  the earlier 736 -> 737 recovery a second time. The earlier functions and the
  union's previously recovered legacy selector remain unchanged.
- `state/volume_accumulator.rs` imports the **already-maintained H11 condition**
  `current_timestamp >= self.start_time` around the finished-range guard. This
  restores original error ordering when `stored_end < now < stored_start` and
  supply is positive. The single-line insertion retains the existing source
  coordinates; it is integration of an upstream fix, not a new discovery.

The helper's blank lines retain original `fees.rs:184`; the other inherited
positioning devices are documented in the parent union. No new inline attribute,
assembly, patched ELF, dependency version, or compiler flag was introduced.
The maintained `programs/` tree and `repro/status.json` are not replaced by this
research source proposal.

During final review, [PR #434](https://github.com/lalalune/pumpfun-source/pull/434)
published a separate 763-window source union. Its actual source archive changes
neither of these two files, and its saved ELF still lacks `0x14088`
(`pr434-overlap-review.json`). The scopes do not duplicate each other. This
packet measures union2 **759 -> 760**; combining it with #434 to reach 764 has
not been built and is not claimed. No generated linker layout is used here.

## Reproducible builds and local execution

The 755 and 759 baselines were rebuilt before composition. Both reproduce the
upstream symbol-bearing and stripped artifacts exactly. The final build and its
repeat are also byte-identical. All 396 non-root dependency artifacts remain
unchanged across the 759/intermediate/final builds. Commands, 57 source hashes,
tools, logs and both ELF forms are retained under `builds/`. The existing admin
incentive stack-frame diagnostic remains; this is not a warning-free build.

All following counts refer to newly executed **final `e708c278…`** evidence:

- **735 original/baseline/final triples**, 2,205 observed transactions, 2,217
  cryptographically verified signature fields, 306 original successes. No
  error, recorded account-state, event, return-data or inner-CPI differences.
  Only two baseline/final non-compute log changes occur: the short-fee-account
  error's line 181 becomes the original line 184. Original non-compute log
  mismatches decrease **99 -> 97**, not to zero. `audit_runtime.py` joins each
  receipt to its actual signed transaction and loaded program hash.
- **25 maintained suites / 17,462 cases**, 35,074 observed transactions,
  35,418 verified signature fields. No compared non-log field differences.
  All per-case receipts and observer sidecars are included, rather than only
  summary hash declarations. `audit_all.py` recounts them and verifies signatures.
  Most broad-suite receipts lack transaction bytes: their account snapshots
  are not cryptographically joined to each transaction. Some suite log outputs
  are already filtered by their harnesses; neither complete logs nor exhaustive
  behavior equivalence is claimed.
- The parent's **five malformed-schedule controls** are rerun on both the
  selector-only intermediate and the final artifact. Errors differ in **2/5
  before and 0/5 after**; all committed states agree. Each run records ten signed
  executions and the actual executable-account hash. The historical 128-case
  finding is not counted as an execution in this packet.

The focused and broad suites overlap and must not be summed as unique scenarios.
The earlier selector-only runs remain separately labelled `runtime-selector-only/`
and `runtime-all-selector-only/`; they are never relabelled as final validation.
All executions use synthetic local accounts, with no RPC or live transaction.

## Review and replay

Requires Python with `solders==0.27.1` for saved signature checks:

```sh
python -I -B -X pycache_prefix=/tmp/amm-selector-union-unused research/amm-v2-selector-union-recovery/verify.py
python -I -B -X pycache_prefix=/tmp/amm-selector-union-unused research/amm-v2-selector-union-recovery/test_runtime_controls.py
python -I -B research/amm-v2-selector-union-recovery/materialize.py /tmp/amm-selector-union-source
```

`rebuild.py --help` accepts explicit SDK, Cargo cache and isolated target paths;
it runs the recorded pinned container with network disabled and locked/offline
Cargo. `replay.py` accepts explicit baseline/candidate/output paths for focused
triples; use the bound observer and exact command in `runtime/command.json` to
also capture actual transactions. `replay_all.py` accepts explicit candidate and
output paths for the 25 suites. Runtime producers use an absent bytecode-cache
prefix as well as `-I -B`, so previously cached Python cannot replace the bound
producer source. Raw executions, setup failure, commands and limits are retained.

**25 original windows remain unmatched**, along with whole-ELF layout, unproved
references and untested behavior. This compiled source integration is one real
window improvement over union2; it does not establish deployability or completion.
