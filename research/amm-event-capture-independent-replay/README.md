# Independent AMM event-capture reproduction

The published [amm-mid proposal](../claude-amm-mid-20261027/README.md), merged in
[PR #264](https://github.com/lalalune/pumpfun-source/pull/264), omitted its candidate
ELF and still needed rebasing and independent artifact verification. This packet
reproduces that exact historical artifact and applies **the same public patch**
to the later 623- and 638-window parents. The source recovery and MachineSink
diagnosis belong to the original proposal's authors; this is independent
reproduction and integration evidence, not a new discovery.

The 638-window parent is frozen from `98ab7349b` main, specifically
[`guard-data-recovery-20261027`](../../repro/pump_amm/guard-data-recovery-20261027/README.md).
Before submission, main advanced again to `7aa2dae3f` and selected a separate
640-window source/ABI checkpoint. This packet keeps its tested 638-window parent
explicit: the 639 result is **not the current main total**, and composition with
that subsequent 640-window source has not been built or replayed here.
The candidate reaches **639/785 complete normalized windows**, retains all
**128 raw-equal windows**, and covers **784,560/1,162,040 original text bytes**.
The sole new window is **`0x52c58`, 1,784 bytes, `create_sell_event`**. No previously
matched normalized or raw window is lost. The three actual direct callees also
match their complete normalized bodies. The event window has no relocations;
its three call operands differ, so its raw body is not equal.

This remains an unpromoted research artifact. Maintained source, selected
checkpoint totals and all earlier sealed evidence are unchanged. **146 windows
and whole-ELF identity remain unresolved in this frozen candidate.**

## Reproduced results

| Frozen parent | Parent windows/raw | Public patch windows/raw | Matched text after |
| --- | ---: | ---: | ---: |
| Historical native-fee CPI | 599 / 125 | 600 / 125 | 665,624 |
| Account context | 623 / 128 | 624 / 128 | 729,136 |
| Guard/data | 638 / 128 | 639 / 128 | 784,560 |

All three controls reproduce their published stripped **and unstripped** hashes.
The historical proposal reproduces `5e853b8419b7836af219551b3277040e584c9bae50c2222efcf8a9447337086e`
and unstripped `dbe8b0bc65d5646b3f87b5988c69ef3d25575af6099e89bce7bbc67614d59068`.
The retained artifacts close the older packet's missing-artifact limitation.

The latest proposal and its repeated root build both produce:

- stripped: `2dc29037a69daa41e6482094ac4acc1ce0530c22a03c9e1feed6b1513ac92bc0`
- unstripped: `32520a6f694a57a43ec303444dbc68dea058733cf29c9c0b1f2ea5f89754ffaa`

The intermediate 623-parent proposal and its repeat also agree. Exact commands,
logs, source manifests, both compiler artifacts and all 785 measurement rows are
retained under `builds/`. `static.json` is independently recomputed from those
ELFs, including loss detection and the actual three direct-call targets.
The portable reproducer was also executed with an initially empty target:
it rebuilt all dependencies and produced those same latest stripped/unstripped
hashes in 90.66 seconds. `portable-build/` retains its commands, SDK/169 registry
input checks, log, source manifest and both artifacts.

## Source and local execution

`source.patch` is byte-for-byte the public proposal. It captures the three user
keys before the fallible clock read in the sell builder and before checked
addition in the buy builder. No IR, object or executable bytes are edited. The
only post-link operation is the recorded standard `llvm-objcopy --strip-all`.

The verifier stages each frozen canonical parent using the existing workspace
recipe and applies that exact patch in a temporary directory. It then checks
every compiler input hash: 46 historical, 48 intermediate and 49 latest workspace
files. Only `instructions/swap/trade_v2.rs` changes for each parent. Complete
changed source files are retained under `source/`.

Both the intermediate and latest candidates received fresh runs of all **25
maintained suites / 17,462 cases** in local LiteSVM. Their independent direct
audits each check **35,074 serialized transactions, 35,418 signature fields and
17,537 pairs of identical signed messages**, with no result differences. The
latest run is in `runtime/`; the superseded run remains in `intermediate-runtime/`.
Commands, exit codes, raw receipt hashes and program-hash bindings are retained.

Each candidate also received 10 sell-event and 16 buy-event focused comparisons,
including mayhem, holder rewards, capped transfer fees, existing volume,
zero/full buyback and virtual reserve modes. The verifier compares all recorded
result fields, verifies signatures and equal input messages, and binds logs to
the observer receipts. These cases overlap the main corpus; do not sum them as
unique coverage. Source-coordinate and compute-consumption log differences are
normalized by the existing comparator. Other recorded fields are compared.

## Verify and reproduce

From the repository root, with the repository requirements installed:

```sh
python -B research/amm-event-capture-independent-replay/verify.py
python -B research/amm-event-capture-independent-replay/test_verify.py
```

These commands verify saved evidence; they do not execute the compiler or VM.
The negative controls reseal mutated copies to test semantic checks, including
changed source, changed ELF, invented gain and a removed signed transaction.
Extra files, a nested manifest and disabled assertions are rejected too.

To materialize the 49 exact latest inputs without compiling:

```sh
python -B research/amm-event-capture-independent-replay/reproduce.py \
  --stage-only --output /tmp/amm-event-stage
```

For a new Linux build, provide the authenticated v1.44 SDK and populated Cargo
cache used by the parent recipe, plus the recorded strip tool. The helper checks
the SDK tool/target hashes and all 169 authenticated inputs from the eight Solana
registry revisions before building. Other dependency resolution remains bound
to the frozen Cargo.lock and offline cache; this is not a new historical
provenance proof for every dependency.

```sh
python -B research/amm-event-capture-independent-replay/reproduce.py \
  --output /tmp/amm-event-build --sdk /path/to/v144-sdk \
  --strip-sdk /path/to/strip-sdk --cargo-home /path/to/prepared-cargo-home
python -B repro/pump_amm/guard-data-recovery-20261027/replay_parallel.py \
  --candidate /tmp/amm-event-build/candidate.so --output /tmp/amm-event-runtime
python -B repro/pump_amm/guard-data-recovery-20261027/compare_direct_cached.py \
  /tmp/amm-event-runtime 2dc29037a69daa41e6482094ac4acc1ce0530c22a03c9e1feed6b1513ac92bc0
```

Docker uses the parent's pinned image and compiler-visible paths. Compiler
networking is disabled and Cargo uses `--locked --offline`. Source and SDK are
read-only mounts. The Cargo cache is writable; the initial series shares cached
dependency artifacts and forces root recompilation between builds. The portable
helper creates a fresh target directory. Host paths in retained commands describe
the actual local execution, not required paths on another machine.

## Attempts and limits

The first cache-fetch command had an incorrect SDK mount and exited before
compilation; the corrected fetch succeeded. The first focused run used the wrong
working directory and failed before transactions; its log and empty sidecar are
preserved in `failed-focus-attempt/`. The corrected run used the repository root.
The parent source verifier needed explicit artifact paths; its successful output
is retained in `provenance/`. An initial saved-packet check incorrectly assumed
48 historical inputs; inspecting the recorded manifest corrected this to 46.
None of these setup failures changed the original data or a selected artifact.

This patch also changes the still-unmatched buy event builder; no new buy-window
match is claimed. The three immediate callee matches are not transitive code/data
closure. Finite synthetic tests do not establish exhaustive behavior or live-chain
acceptance. The parent's malformed-recipient-array gap and other remaining work
stay open. Its supplemental matrices beyond the 25 maintained suites and the
26 focused event cases were not newly replayed here. No live transactions or
coordination comments were submitted.

`scope-review.json` records the latest PR review used for scope selection. The
638-window control was rebuilt after main advanced during this investigation;
the 623-parent results are retained as superseded evidence, not labeled current.
