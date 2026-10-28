# Independent Fees causal-source reproduction

[PR #302](https://github.com/lalalune/pumpfun-source/pull/302) publishes a complete
48-input before/after source reconstruction for safe Crank and CreateDonation
corrections, but its native/runtime observations are prose only. This packet
independently compiles those exact inputs, retains the actual outputs and
compiler IR, and records normally signed original/candidate executions.
The source corrections are credited to #302; this is not another implementation.

This is the **native 582-normalized / 143-raw** composition. It is not the
qualified 583/200 Sweep frontier in #301, and does not compete with the separate
residual experiments in #304. No contract source, maintained selection or global
progress count is changed. Neither residual function matches its entire original
body. Whole ELF and captured-payload identity remain false.

## Reproduced compiler effects

| Complete body | Original bytes | Before | After |
| --- | ---: | ---: | ---: |
| CrankDonationFeePda | 15,976 | 15,688 | 15,736 |
| CreateDonationFeePda | 13,800 | 13,888 | 13,864 |

Both stages retain all 582 prior normalized windows, 143 raw-local matches,
185 equal Location uses and 4,098 previously equal direct-callee observations.
Three previously unequal direct-callee observations remain open. Changed
signatures of the two unequal bodies are recorded, not treated as regressions
of already matched callees.

The public generated wrappers actually call the examined bodies: original
Crank wrapper656832 at offset464 calls147944; Create wrapper655904 at offset424
calls163920. The independent reader follows their mapped candidate call operands,
rather than finding an unused function with a convenient name.

For Crank, the fresh optimized LLVM IR gains one explicit 24-byte memcpy feeding
ProgramError conversion before AccountInfo cleanup. The generated eighth of
nine matching conversion-call sites has six frame load/store instructions
copying three u64 words and passes that destination through r2. The original has
the same bounded copy mechanism; the prerequisite lacks it at the corresponding
ordered conversion call. Stack locations differ and are reported separately.
This checks the actual copy and callee, not a whole-CFG correspondence proof.

For CreateDonation, the complete body shrinks by24 bytes and the optimized IR
has one fewer32-byte memcpy. This report does not equate that single IR change
with the author's complete48-byte result-copy/cleanup explanation. Complete
before/after IR is retained for further analysis; finite runtime checks below
cover the observed outcomes. No full residual-body recovery is inferred from size.

## Fresh outputs and provenance

| Stage | Stripped SHA-256 | Symbol ELF SHA-256 |
| --- | --- | --- |
| Before | `a6c604519704b04ddac659104aaca3fa438f5a27ba584c7531707172041e004a` | `d8d7905097fa4fde8ac3e55762d0f024bb226581f2902eda789861a62af999c9` |
| After | `7f12e1313a5c6f028f9d124563109a02a6ac630f52d83203f65764c640ab3025` | `aa039a96a1dcbbce069c2b11446566daa8cf04051474e062ac580e29963bbb7a` |

Before and after each use a new, empty dependency target and private Cargo home.
A third empty-target build executes the included path-parameterized recipe and
repeats **both complete after outputs**. The source archive retains the exact
55-file public #302 packet, including its two-file reversible patch and all48
workspace inputs. Its source-only verifier authenticates and reconstructs both
stages; we do not substitute the different46-input public Extend workspace.
`public-origin.json` identifies the reviewed PR head.

The compiler runs in a pinned Linux amd64 Docker image, with network disabled,
read-only source/SDK/registry mounts, locked offline Cargo and unchanged profiles.
Cached registry archives match Cargo.lock checksums; their unpacked files are
compared with the archives before and after each build. This is fresh compilation
from authenticated cached sources, not a new network dependency acquisition.
Source/tool hashes, exact argv, registry audit, actual root invocation, timing,
logs and actual artifacts are retained for each build.

- Image: `solanafoundation/solana-verifiable-build@sha256:6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50`.
- Official Linux v1.44 rustc: `c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97`.
- Separate official v1.48 llvm-objcopy: `3a871eab7279dee53f2580e8a022c980305738b575755b7d3529a6230ec4f672`.
- No original executable is mounted in the compiler container.

The root rustc invocation is also replayed with LLVM IR emission. Both replayed
outputs have different unstripped symbol tables; they are explicitly **not**
claimed to be identical symbol ELFs. Their allocated sections match, and ordinary
`llvm-objcopy --strip-all` reproduces the **entire corresponding native candidate**
byte for byte. Thus the retained IR is tied to the exact executed candidate,
not borrowed from an earlier source or another code-generation variant.

Preserved setup/analysis failures: the first direct rustc replay omitted
Cargo's manifest environment and failed before emission. The next replay
correctly compiled but failed an overstrong unstripped-file equality check;
inspection isolated the difference to nonallocated symbol information, followed
by the separate exact stripped-output qualification. An initial no-loss check
incorrectly required unchanged signatures even for already unequal callees;
the corrected gate preserves every prior positive observation and records the
changed open edges. No failed source-expression search was repeated or hidden.

## Signed local execution

The unchanged18 canonical suites freshly run against the after artifact:
**17,331 original/candidate cases**. The unchanged Crank357 and CreateDonation356
subsets also run against the before artifact (**713 cases**, overlapping the
after matrix; not an additional distinct coverage claim).

The417 sharing-update cases each include **two original-program bootstrap
transactions** before the original/candidate update comparison. The observer
retains those extra834 transactions, checks the bootstrap pair independently,
and binds both main transactions to the canonical case. They are not labeled
candidate creation executions or counted as extra cases. This inherited fixture
does not prove a candidate-creation/candidate-update composition.

An observer forwards each original transaction unchanged, cryptographically
verifies every signature, records the program hashes actually loaded by each VM,
and refuses requests to disable signature/blockhash checking. It additionally
captures every message-account snapshot except executable accounts, raw logs,
inner instructions and return data. The verifier compares identical signed
transactions, errors, before/after account bytes/owners/lamports, inner calls,
return data and serialized program log/data/return lines. Saved canonical
pass/fail flags alone cannot satisfy these checks.

Raw compute/runtime logs are retained separately and can differ; their exact
per-suite difference counts and signature totals are in `summary.json`. They
are not normalized away or described as wholly equal. Executable-account
snapshots are excluded; actual loaded file hashes are recorded separately.
Accounts outside the transaction message, arbitrary OOM/aliasing behavior,
exhaustive semantics and authentic historical fixed-admin success are outside
this finite synthetic fixture scope. There are no network calls or live-chain
transactions. No old runtime receipt is relabeled as an execution of this build.

The after run retains35,496 transactions and49,962 verified signature fields,
including the834 original bootstrap transactions. The before subset retains
1,426 transactions and2,836 signature fields. All compared state/program-log
fields agree. Raw complete logs differ in671 after cases and470 before cases;
the scopes differ and those counts must not be treated as a before/after gain.

## Reproduction and checks

From the repository root, with `requirements.txt` installed:

```sh
python -B research/fees-causal-independent/verify.py
python -B research/fees-causal-independent/test_verify.py
```

Verification authenticates packet membership and40 external inputs before
loading the existing ELF readers. It derives the static/IR/call observations
again and checks every recorded signature/state pair. Five in-memory controls
reject a corrupted signature, forged candidate identity, changed final balance,
an actual machine-code copy-destination mutation and an IR conversion that
bypasses the copied error. Original evidence is never modified. CI runs these
saved-evidence checks, not a historical compiler or the full VM matrix.

To rebuild, supply the pinned tools/cache and a new output directory:

```sh
python3 -B research/fees-causal-independent/reproduce.py \
  --output /tmp/new-fees-causal --stage both \
  --sdk /path/to/platform-tools-v144 \
  --strip-sdk /path/to/platform-tools-v148 \
  --cargo-home /path/to/offline-cargo-home --public-root "$PWD"
```

The tested portable invocation used `--stage after`; default `both` applies the
same recipe separately to both stages. Output directories must not exist.
Use ordinary Python without `-O`. After rebuilding, the unchanged canonical
execution command is:

```sh
python -B scripts/fees_validate_all.py \
  --candidate /tmp/new-fees-causal/after/candidate.so \
  --output /tmp/new-fees-causal/runtime.json
```

`controllers/` retains the actually executed local observer and orchestration
scripts with their recorded absolute paths; `runtime/*/commands.json` records
every observed invocation. Those controllers are provenance, not silently
rewritten portable scripts. The build recipe is path-parameterized. Original
uncompressed local evidence remains preserved outside the repository.
