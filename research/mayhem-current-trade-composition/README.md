# Current BuyV2 and sell composition

This is a new compiled artifact combining the directly constructed BuyV2 CPI
context with checked sell arithmetic and typed LegacySell pricing. Exactly
three of the pinned 67 source inputs differ: `buy_v2.rs`, `pump_interface.rs`
and `state.rs`. The other 64 inputs, generated account constraints, namespace,
current Source expressions and newer LegacyBuy ownership remain unchanged.
The independent component source is included; unmerged PRs are not dependencies.

The actual matched entry wrappers bind all four caller bodies. The composed
BuyV2, LegacySell, SellV2 and LegacyBuy complete normalized body signatures and
resolved callee sequences equal those in their separately compiled components.
This prevents combining one improvement by reverting another.

| Handler | Original body bytes | Composed body bytes | Ordered original callee matches |
| --- | ---: | ---: | ---: |
| BuyV2 | 18,648 | 18,376 | 46/49 |
| LegacySell | 12,992 | 12,864 | 50/51 |
| SellV2 | 18,096 | 17,960 | 48/49 |
| LegacyBuy | 13,848 | 13,784 | Held complete component signature and call sequence |

All 432 normalized original counterparts, 84 native raw-local windows and 4,383
positive immediate edges retain their exact sets. Each of the four listed
original bodies remains unequal. No new complete window, source identity,
whole-binary identity or global frontier increase is claimed.

Two actual SDK root compilations reproduce both complete outputs:

- Candidate: 766,320 bytes, SHA-256
  `4c77fa48d44282c7b7c97580622bff00f5a570e5ba537d1b43376c70c36e7be4`.
- Symbols: SHA-256
  `7e317f633be8605eed4eedc905e3d7a95edd1a51d635ed2c49503f46ecdfded0`.

Five archived profiles contain the parent, two independent components, the
composition and its exact-source repeat: ten complete outputs and five actual
standard objcopy replays. The two new compilations bind six SDK tools and 26
target libraries before/after execution. Earlier component provenance retains
its actual bounds; the sell component's library observation is explicitly
post-run. Official Linux SDK v1.54 and warmed dependencies are used, without
claiming a clean rebuild of all dependencies.

The relocation-routed Source filename/length/line stores already agree with the
original in LegacySell (58 bytes, line 436), SellV2 (61, line 574) and LegacyBuy
(58, line 313). BuyV2 still differs: original 61/376 versus current 50/101. These
are bounded stored fields, not a complete Source/panic/callback proof. The
original Source data is not substituted. A valid-but-changed Source line is
also rejected by an actual in-memory mutation check.

## Fresh execution of this exact composition

All seven unchanged full families run this exact candidate, yielding 3,654
fresh original/candidate pairs and 7,308 independently verified signed records.
Old component receipts are not reused or relabeled. There are no new unique
cases and no inferred CPI-error callback execution coverage.

| Family | Pairs | Successful pairs | Rejected pairs | Non-compute log differences | Raw log differences |
| --- | ---: | ---: | ---: | ---: | ---: |
| buy_v2 native | 613 | 284 | 329 | 0 | 466 |
| buy_v2 token | 613 | 210 | 403 | 0 | 466 |
| buy_v2 token22 | 613 | 210 | 403 | 0 | 466 |
| sell legacy | 396 | 134 | 262 | 0 | 267 |
| sell native | 473 | 176 | 297 | 0 | 320 |
| sell token | 473 | 121 | 352 | 0 | 317 |
| sell token22 | 473 | 121 | 352 | 0 | 317 |

Unchanged comparisons and independent checkers verify signed transaction bytes,
errors, tracked accounts, CPI, return data, quote/event/state results, and
failed-transaction rollback. The two read-only forwarding observers authenticate
all six real program images before/after every actual signed execution. The
25-file union of frozen public inputs is unchanged; signers, authorities,
signature/blockhash checks, CPI implementations and comparison predicates are
held. The stricter log comparison removes only explicit compute-unit lines.
Raw differences and finite coverage remain explicit; resource identity and
exhaustive behavior are not established.

To bound disk use, the producer losslessly gzips only each newly completed own
receipt and program-observation file after independent verification. It checks
raw/compressed hashes and exact decompression before removing that new raw copy.
Old captures and target binaries are untouched. The private gzip files and
execution storage ledgers retain all original raw bytes. The packager checks
both recorded gzip hashes and exact raw hashes, then losslessly archives the
original raw representation for compact cross-record compression. Offline
verification authenticates those raw records and reruns the frozen checker;
the private gzip payloads are not required or claimed to be independently
rechecked offline. Receipt hashes are never retagged.

## Offline recheck

Use ordinary Python with solders 0.27.1:

```sh
python3 -I -B research/mayhem-current-trade-composition/verify.py
python3 -I -B research/mayhem-current-trade-composition/test_scope.py
```

The default verifier checks every packet/source/output/tool binding, complete
window sets, actual entry/callee routes and component correspondences, then
reruns the independent checkers on saved signed receipts. Three pinned external
inputs are required. It invokes no target VM, compiler, SDK, Git or network.
Scope tests change actual in-memory entry, callee, arithmetic and data bytes to
show what each comparison does and does not establish. Reference files and
comparator masks remain unchanged.

Only this research packet is added. Selected sources, original binaries, frozen
scripts, workflows, ledgers and stopped lanes are unchanged. Originals remain
comparison/VM inputs and never compiler/linker inputs. No Source/path/module
substitutions, padding, assembly or binary patches are introduced.
