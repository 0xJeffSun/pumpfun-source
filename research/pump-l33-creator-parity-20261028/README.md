# Pump Main L33 creator parity composition

This additive research packet composes the two previously qualified L32
`AdminCto` corrections from PRs #492 and #496 onto the newer L33 source from
PR #490. It does not change maintained `programs/pump`, historical packets, or
checkpoint selection.

PR #490's L33 commit preceded the later creator-parity integrations. L33 kept
the L32 `AdminCto` source and therefore retained 23 non-filename ordered-log
differences even though it advanced source-only coverage to 1,010/1,035. This
packet ports only those later corrections and requalifies the exact composition.

## Result

| measurement | L33 control | diagnostics stage | combined stage |
|---|---:|---:|---:|
| normalized windows | 1,010/1,035 | 1,010/1,035 | 1,010/1,035 |
| raw source-only windows | 168 | 168 | 168 |
| unmatched windows | 25 | 25 | 25 |
| matched text bytes | 1,541,504 | 1,541,504 | 1,541,504 |
| focused AdminCto non-filename log differences | 23 | 6 | 0 |
| structured runtime differences | 0 | 0 | 0 |

The final 44-suite replay contains 10,468 paired cases and 18,284 verified
signed-transaction occurrences (2,409 distinct serialized transactions). Its
ordered Pump-log matrix contains zero non-filename differences and 27
`source_file_path_only` differences. Numeric source coordinates and volatile
compute measurements are normalized; filenames, message content/order, CPI,
events, return data, errors, rollback, and account state are not.

## Source composition

Only `programs/pump/src/creator/admin_cto.rs` changes.

Stage B restores authenticated messages on their existing predicates:

- cases 41, 56, 241, 344, 345: non-system creator;
- cases 338 and 348-355: frozen quote account;
- cases 231-233: missing canonical Pump pool.

The final stage additionally ports the six-case collection-order correction
(270-275): it caches the native AMM frozen state, creates the destination ATA
at the original point, then performs Pump creator collection, reuses the cache,
and avoids the duplicate native-quote ATA CPI. It is a control-flow correction,
not a moved message.

`source.patch` is checked two ways: directly against L33, and against the
sequential result of the immutable #492 and #496 patches. The final source hash
is `5ba90070245c9d3c97109ef6adbc379abcd27e615d99bf45f5ed70e7ab6e93a5`.

## Build qualification

The authenticated Linux v1.44 SBPF target-library profile is retained in each
build receipt. The untouched Stage A build reproduced packaged L33 exactly:

- stripped: `b20fdec45ba0309840ab50e984c58393116d066f3b31bf2608aa12778d83ac9a`
- unstripped: `9392550f34c084425deb45e3e72e4cd38e047da7685cb2ac4a2ba30851f54740`

The combined source was compiled twice in isolated output trees. Both runs are
byte-identical:

- stripped: `4b838f6015b5235298a6450bcb15a2034454d69b0423f47329847135e30af330`
- unstripped: `377284984eab6852e3f65466475d9c4093a8cd3d919397b2f395d2d5d45976d4`

All four builds emitted the same 64 pre-existing warning records and no stack-
offset warning. The complete 1,035-window inventory is recomputed from each
unstripped ELF under the repository's unchanged normalizer; no normalized or
raw match is lost.

## Runtime qualification

The focused evidence uses fresh isolated LiteSVM executions for all 363
AdminCto cases at every stage. Each stage retains its captured-loader receipt
(726 load records), serialized signed transactions, state, inner instructions,
events, return data, errors, rollback, and ordered logs.

The full final replay covers all 44 captured-loader suites and retains the 44
loader receipts (23,834 load records). `audit_full_runtime.py` authenticates
every transaction signature, both Pump program identities, each loader receipt,
all structured outcomes, and the ordered Pump invocation trace.

| ordered-log family | L33 | final |
|---|---:|---:|
| missing non-system creator notice | 5 | 0 |
| missing frozen quote-account notice | 9 | 0 |
| missing canonical-pool notice | 3 | 0 |
| ordinary message order | 6 | 0 |
| **non-filename total** | **23** | **0** |
| filename-only | 27 | 27 |

## Integrity controls

The verifier is fail-closed and uses explicit exceptions, not Python `assert`.
It validates the exact packet inventory, rejects symlinks and extra files,
reconstructs the source composition, checks build/source hashes, recomputes all
windows, and derives both runtime summaries from the retained receipts.

Fifteen mutation tests reject changed baseline hashes, altered/incomplete source
composition, modified ELF bytes, reordered/missing/duplicated logs, changed case
identity, corrupted signatures, CPI/state/balance/rollback/event changes, extra
files, symlinks, and manifest mismatches. The verifier and tests pass under
normal Python, `-O`, and `-OO`.

## Limitations

- This is research-only source integration, not maintained-source promotion.
- The whole ELF is not equal to the deployed original; 25 function windows
  remain unmatched.
- The 168 raw count is source-only. L33's separately labelled linker-layout
  measurement is not combined with this result.
- Twenty-seven filename-only diagnostics remain and are reported, not hidden.
- The authenticated v1.44 SDK and dependency cache are not duplicated here;
  fresh compilation requires the repository build recipe plus those verified
  local inputs. Retained artifacts and receipts remain independently hash- and
  behavior-verifiable from a checkout.
- Offline bounded differential execution does not establish deployment
  readiness, original compiler provenance, or security assurance.

See [REPRODUCE.md](REPRODUCE.md) for commands.
