# pumpfun-source

Reconstructed Rust source for the Pump.fun Solana programs, plus the captured
on-chain binaries and the evidence used to check the reconstruction against them.

**The four core programs remain byte-unequal. The selected Relay reconstruction
now reproduces its full ELF and loader-allocated payload byte-for-byte.**
Behavior is reconstructed handler by handler and checked with differential tests
that run the captured original and the rebuilt candidate side by side in a local VM.

Mayhem is now the active reconstruction priority. Its [current work plan](docs/MAYHEM-RECONSTRUCTION-PLAN.md) tracks eight unmatched admitted bodies and 245 still-opaque windows. The latest [GlobalParams and shared-helper research](repro/mayhem/global-params-layout-recovery/README.md) reaches 188 normalized matches in its 196-function examined scope; whole-file identity remains unresolved.
The [interval-location correction](research/mayhem-interval-location-recovery/README.md) now reproduces the original overflow location with a one-byte data fix. All 396 Sell cases pass; three known non-compute log differences remain.

For subsequent gains and the latest research frontier, see the
[byte-identity progress log](docs/BYTE-IDENTITY-PROGRESS.md).
The [27 October queue review](docs/PR-QUEUE-REVIEW-2026-10-27.md) covers PRs
#170–#206, including separately verified 399- and 401-pair Fees context candidates and
source-only proposals. Those independent branches are not silently combined
into the inventory below.

The selected Relay reconstruction reproduces **all 818,280 meaningful ELF bytes exactly**,
including **492/492 raw function windows**, headers, calls, data and relocations.
Two Rust builds, including a fresh isolated build, produce the same artifact.
The [exact ELF recipe](repro/donation-relay/linked-elf-reproduction/README.md)
uses ordinary reconstructed Rust and an explicit linker layout; the historical
source/build recipe remains unproved. The [portable source-only recipe](repro/donation-relay/raw-elf-reconstruction/README.md)
retains the same section ordering. Fresh bounded replay passes 536 records.

The captured file also has **12,168 loader-allocated zero bytes**. A fresh local
912-transaction loader deployment reproduces **all 830,448 captured payload bytes**
without padding the compiler output. ProgramData metadata and historical deployment
sequence are outside that equality claim. The [natural source layout recovery](repro/donation-relay/access-control-layout-artifact/README.md)
separately reaches 376 raw-local windows using the default linker layout.
The [canonical Relay source](repro/donation-relay/canonical-exact-selection/README.md)
is now selected after a fresh build from `programs/donation-relay`. The four core
checkpoints remain unchanged and byte-unequal.

The pinned Fees inventory has **411 unique structural pairs, 27 unmatched windows**
(**558/585 normalized counterparts**, including 142 raw-local matches).
The [current AdminCto integration](research/fees-admin-cto-current-integration/README.md) combines
the reviewed math/SyncNative, sharing-context and social-PDA creation recoveries.
It preserves the decoder/composition gains and recovers the complete buyback
initializer wrapper through a single module visibility declaration. It also
recovers the 4,968-byte AdminCto body with the included-handler proposal. It passes 17,331 fresh suite comparisons; earlier strict social-creation evidence retains
its separate candidate binding.
The [configuration-event recovery](research/fees-config-event-recovery/README.md)
adds four complete caller-body matches; the two upsert bodies share a structural
shape and are distinguished by their callees. The [current call ledger](repro/reconstruction-status-2026-10-26/fees-call-attribution.json)
also attributes 69 duplicate-body pairs, giving 480 correspondences.
The [CPI ownership study](research/fees-cpi-adapter-ownership-controls/README.md)
retains the earlier four-byte copy-scheduling residuals. The subsequent
[distribution-helper recovery](repro/pump_fees/distribution-helper-recovery/README.md)
closes both complete helper bodies on the AdminCto baseline: **556/585 normalized,
409 unique pairs, 118 raw-local and 29 unmatched windows**. Its fresh 417-case
review replay matches the retained receipt exactly. The subsequent
[current 558-window integration](research/fees-current-558-integration/README.md)
adds the constant initializer parser and typed Relay encoder while composing
the native-only Crank flow with checked lamport credit. Two builds agree; all
17,331 regression cases and 76 boundary cases pass. Its 304-case strict Crank
matrix retains only compute-log differences. This integration is now pinned; whole-file identity remains
unachieved. The [Crank native-flow study](research/fees-crank-native-order/README.md)
separately improves bounded behavior, retaining 12 compute-log discrepancies;
its older 552-window candidate is not the current composition. The
[checked-credit correction](research/fees-crank-lamport-overflow/README.md)
additionally fixes 15 synthetic overflow cases, with zero proposal mismatches
in a fresh 76-case replay; composing it with the native-flow study remains work. The [exotic-fee growth study](research/fees-exotic-growth-precedence/README.md)
corrects rejection precedence and the realloc flag in new boundary cases;
that caller still has no complete body match. The [optional-account ownership recovery](research/fees-optional-account-ownership/README.md)
adds a complete optional parser and a raw-byte-equal cleanup helper; its enclosing
account parser still differs. The [social-claim seed-vector recovery](research/fees-social-seed-vector/README.md)
adds the complete 296-byte user-ID copy helper; its claim caller still differs.
The [extension-size log recovery](research/fees-extend-size-logs/README.md) restores
the original no-resize messages and a complete 448-byte formatting helper.
The [crank interface-mint recovery](research/fees-crank-interface-mint/README.md)
adds one boxed parser match, removes two structural ambiguities, and corrects
the tested mint owner/length validation. The [shared zero-quote predicate](research/fees-curve-zero-helper/README.md)
now has a complete 504-byte match, including both referenced panic locations.
The [slice-panic location integration](research/fees-slice-origin-integration/README.md)
now carries all four tier-copy records into the latest candidate, changing only
eight data bytes and preserving its entire instruction section. The [buyback context recovery](research/fees-buyback-context-ownership/README.md)
adds the initializer parser, one initialization closure and the exit routine.
The [context-origin recovery](research/fees-buyback-context-origin/README.md)
now closes the second closure and its direct-call mismatch as well. The
[crank event-account recovery](research/fees-crank-event-ownership/README.md)
adds the complete exit routine and dispatch wrapper; later reviewed work also
recovers the account parser, while the business handler remains unmatched. Four [root codegen controls](research/fees-wrapper-codegen-controls/README.md)
add no matches and are retained as rejected experiments. The
[sweep context recovery](research/fees-sweep-context-ownership/README.md)
adds its complete account parser, exit and dispatch wrapper; the sweep business
body remains unmatched. The [buyback-update context recovery](research/fees-buyback-update-ownership/README.md)
now closes the shared update parser and both update dispatch wrappers, with
all 61 direct callee bodies matching. The [event-context integration](research/fees-event-context-ownership/README.md)
adds six parser/dispatch bodies across social claim, social-PDA creation and
withdrawal; the new composition also recovers the social-PDA creation body. The
[unchecked-prefix recovery](research/fees-unchecked-prefix-recovery/README.md)
restores the full-account input convention and closes the 1,144-byte initializer
helper. Its host contract tests and SBF regression evidence have separate scopes.

The [current reconstruction review](docs/RECONSTRUCTION-STATUS.md) lists exact,
normalized, unmatched and opaque function status, Relay provenance limits,
and prioritized behavior/build work. The [refreshed 4,415-row inventory](repro/reconstruction-status-2026-10-26/README.md)
includes every exact local body match and every unresolved window.

The [26 October reconstruction audit](docs/RECONSTRUCTION-AUDIT.md) separates
selected builds from newer research and lists [all 150 handlers](repro/reconstruction-audit-2026-10-26/handlers.md),
[every exact local body-byte match](repro/reconstruction-audit-2026-10-26/raw-body-matches.md)
and [all selected/research function windows](repro/reconstruction-audit-2026-10-26/functions.tsv).

## Current review

The [comprehensive review](repro/reconstruction-status-2026-10-26/review.md)
classifies **all 150 public handlers and all 4,415 selected/research window rows**.
No handler is certified perfectly recreated. The selected core builds contain
140 bounded implementations, five partial handlers and five unaccepted handlers;
“unaccepted” can include existing overlay or static-only source.

| Current build | Exact local bodies | Normalized only | Unmatched | Opaque | Unresolved original text |
| --- | ---: | ---: | ---: | ---: | ---: |
| Pump selected | 98 | 430 | 507 | 0 | 1,391,456 / 1,792,208 bytes (77.6%) |
| PumpSwap selected | 93 | 395 | 297 | 0 | 734,392 / 1,162,040 bytes (63.2%) |
| Fees research | 142 | 416 | 27 | 0 | 189,248 / 799,648 bytes (23.7%) |
| Mayhem selected | 58 | 131 | 7 | 245 | 636,128 / 706,744 bytes (90.0%) |
| Relay selected | 492 | 0 | 0 | 0 | 0; complete meaningful ELF byte-equal |

Unresolved text includes whole unmatched and opaque windows. These are not
differing-byte counts or estimates of effort. For builds without full ELF equality, calls, data, layout and relocations
remain to be verified even where a local body matches. Historical build provenance
and broader behavior remain separate requirements for every build. Fees research remains separate from its selected checkpoint; Relay now has an explicit canonical selection.

The public-handler gaps are concrete:

- **Partial:** Pump `buy_exact_quote_in_v3`, `buy_v3`, `sell_v3`, `create_v2`
  and `multi_hop_curve_swap`.
- **Unaccepted in selected builds:** Pump `admin_update_token_incentives`,
  `claim_token_incentives` and `set_mayhem_virtual_params`; PumpSwap
  `create_config`; Mayhem `initialize_mayhem_state`. Some have overlay or
  static-only source, so this category does not mean no implementation exists.
- **Implemented with bounded evidence:** the other 140 handlers. This includes
  known discrepancies such as Pump `sell_v2` quote transfer-fee behavior;
  passing finite cases does not establish perfect reconstruction.

The [handler ledger](repro/reconstruction-audit-2026-10-26/handlers.md) records
the evidence and missing coverage for each name. The [complete window ledger](repro/reconstruction-status-2026-10-26/functions.tsv)
separately records every raw, normalized, unmatched and opaque machine body.

## Selected checkpoint and historical audit

Handler counts are bounded reconstructions with saved differential comparisons;
they are not counts of exhaustively perfect functions. The unaccepted
[behavioral recovery overlay](repro/behavioral-recovery/README.md) dispatches all
56 Pump and 25 Mayhem instructions for local testing.

| Program | Selected bounded handlers | Saved comparisons | Whole captured file equal |
| --- | ---: | ---: | --- |
| Pump | 48 / 56; 5 partial, 3 unaccepted | 9,269 + 1,024 Surfpool | No |
| PumpSwap (AMM) | 37 / 38 | 17,462 | No |
| Fees | 31 / 31 | 17,461 | No |
| Mayhem | 24 / 25 | 9,595 | No |
| Donation Relay | selected source 15; newer generated-framework source in `repro/donation-relay/` | 12 ordinary | No |

Selected original-window inventories contain **384 windows with equal local
body bytes**, **1,408 additional normalized-only matches**, **1,301 without a
complete body match**, and **245 remaining opaque windows**. These partition
3,338 original windows; matching bytes or normalized instructions does not prove
call/data identity or all behavior. Original boundaries remain inferred.

At the earlier immutable audit snapshot (not the current research frontier), research was separate: Fees had 340 unique structural pairs, 53 additional
call-attributed duplicate pairs, 94 still-unattributed duplicate windows and 98
unmatched windows. Relay's distribution-worker research reached 465/492 normalized
windows (86 raw local matches), leaving 27 unmatched; selected Relay remains at
122/492. These are not source-completion percentages or promoted checkpoints.

Known behavior gaps remain even among bounded handlers, including Pump `sell_v2`
quote transfer fees. See the [remaining-work list](docs/REMAINING-WORK.md).

Dependencies captured alongside the core programs:

| Dependency | Rebuilt from public source |
| --- | --- |
| SPL Token | Byte-identical |
| Token-2022 | Raw ELF matches the captured prefix; generated zero padding reproduces the full allocation ([report](repro/pump/verified-token-2022/README.md)) |
| Associated Token Account | Raw bytes reproduced (105,032 bytes, `6804554e…`) only through two non-historical recipes: a linker symbol order ([report](repro/ata/reconstructed-order/README.md)) and one empty Cargo feature ([report](repro/ata/synthetic-ordering-exact-build/REPORT.md)). The authentic recipe is unknown; `repro/dependency-status.json` still says unresolved |
| Metaplex Token Metadata | 1,509 differing positions in the allocation comparison: 1,477 text bytes in Utilize, 30 source-coordinate bytes and 2 relocation bytes ([report](repro/pump/metaplex-candidate-build-11/README.md)) |

The Token-2022 and Metaplex raw ELFs are shorter than their captured allocations
by 770,960 and 86,543 zero bytes respectively. Allocation-image comparisons are
separate from equality of the unmodified compiler output.

Selections live in [`repro/status.json`](repro/status.json) (the four core
programs), [`repro/donation-relay/current.json`](repro/donation-relay/current.json)
(Relay) and [`repro/dependency-status.json`](repro/dependency-status.json)
(dependencies). [`docs/REMAINING-WORK.md`](docs/REMAINING-WORK.md) lists what is left.

## Quick start

Python 3.12. Evidence checks need only the standard library; local VM execution
needs the pinned packages. Clone with line-ending conversion off, or converted
receipts break the evidence hashes
([checkout integrity](repro/checkout-integrity/README.md)).

```sh
git clone --config core.autocrlf=false https://github.com/lalalune/pumpfun-source.git
cd pumpfun-source
python3 scripts/verify_evidence.py      # captured bytes and manifests
python3 scripts/test_tooling.py         # tooling self-tests
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python scripts/local_validation.py
```

Build a program and compare it with the deployed original:

```sh
cargo build-sbf --manifest-path programs/pump/Cargo.toml --tools-version v1.44 \
  --sbf-out-dir work/pump-build -- --locked
python3 scripts/compare.py pump work/pump-build/pump_recovered.so --output work/comparison-pump
```

Toolchains: Pump, PumpSwap and Fees use platform-tools v1.44 through
`scripts/build_partial_candidate.py`, which wraps `cargo build-sbf` with an
isolated SDK and records a provenance report. Mayhem's selected v1.54 build came
from a one-shot direct Cargo/rustc controller (`repro/mayhem/compiler-v154-main/`);
the repository adapter (`scripts/build_reconstruction_candidate.py --tools-version v1.54`)
reproduces the same bytes (`repro/build-tooling/supported-sbpf-integration/`).

For local SDK testing with every handler present, apply the
[behavioral recovery overlay](repro/behavioral-recovery/README.md) and use the
`@pump-fun/pump-sdk` harness in
`repro/parallel-work/2026-10-25/independent-reconstruction-review/sdk-integration-test/`.

## Layout

| Path | Contents |
| --- | --- |
| `programs/` | Reconstructed Rust crates. CI hash-binds these to the selected checkpoints. |
| `evidence/` | Captured deployed binaries, account payloads and upstream IDLs. Comparison inputs only, never compiler inputs. |
| `repro/` | One evidence package per checkpoint or study: builds, comparison reports, differential receipts, verifiers. |
| `scripts/` | Capture, build, compare and differential tooling ([index](scripts/README.md)). |
| `localnet/` | Surfpool fixtures and transaction tests. |
| `research/` | Imported research lab and provenance studies. |
| `binaries/` | Standalone compiler-experiment objects; never selected candidates. |
| `audit/`, `docs/`, `outputs/` | Validation scope, design notes and per-pass reports. |

## Rules the evidence follows

- Behavioral equivalence and byte identity are reported separately and never combined into one score.
- Raw compiler-byte identity never uses padding or rewriting; allocation-image matches are labeled separately.
- Original binaries are read only after compilation finishes.
- Changing a CI-bound source file means selecting a new checkpoint with fresh build and differential evidence.
- Tests run only against local VMs and simulators; nothing is sent to a live network.

## More detail

- [Current reconstruction review](docs/RECONSTRUCTION-STATUS.md), [selected baseline audit](docs/RECONSTRUCTION-AUDIT.md) and [remaining work](docs/REMAINING-WORK.md)
- [Historical selected-checkpoint completion ledger](docs/COMPLETION.md) and [scope](docs/SCOPE.md)
- [Tooling](docs/TOOLING.md) and [historical build-identity audit](docs/BUILD_IDENTITY_AUDIT.md)
- Per-pass ledgers in `repro/layered-passes/`; historical packages are immutable.
- [Security policy](SECURITY.md) and [audit scope](audit/AUDIT.md)

## License

This repository's own code and documentation are released under the
[MIT License](LICENSE). Third-party and vendored materials (for example the
Apache-2.0 Solana SDK files under `programs/pump-amm/vendor`, imported research
and retained crate archives) keep their original licenses, and upstream Pump IDLs
and binaries remain with their original authors.
