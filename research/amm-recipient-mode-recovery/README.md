# Recover the AMM protocol-fee recipient validator

This source patch recovers the complete `validate_protocol_fee_recipient` body
used by ordinary buy, exact-quote buy, legacy sell and protocol-fee sweep.
Review [source.patch](source.patch) and the four files under [proposed](proposed).

| Same native Linux v1.44 / SBPF recipe | Baseline | Candidate |
| --- | ---: | ---: |
| Injective normalized original bodies / 785 | 728 | **729** |
| Raw-equal bodies | 148 | **148** |
| Lost normalized / raw matches | — | **0 / 0** |
| Validator bytes (original 1,536) | 1,528 | **1,536** |

Original `0x58e08` now matches across all **185 instructions**, including the
mode mask, branch destinations, stack operands and error origin. Its **13 direct
calls and seven typed data references** in `.rodata`/`.data.rel.ro` are separately
checked, including vtable function targets and the `swap/mod.rs:164` Source.
All four actual incoming handler edges are recorded in `static.json`.
Normalization alone does not prove these targets; `analyze.py` checks them.
The body is not raw-equal, and this is not full buy/sell/sweep handler identity,
transitive call closure or whole-ELF equality.

## Compiler evidence and source change

The baseline formal parameter is `bool`: frontend and optimized LLVM retain
`i1 noundef zeroext`. Its machine code omits the original `and r4, 255`; return
block placement also differs. Changing the internal boundary to a byte parameter,
with `!= 0` in the validator and explicit `as u8` casts at the three Rust call
sites, reproduces the original mask **and** return-block placement. The ordinary
and exact-quote buy specializations account for two of the four machine callers.
The Pool field and instruction/account formats remain unchanged.

The byte-width control matches every instruction except Source line 20 versus
164. Moving the validator within its module restores line 164 while preserving
all other existing function line coordinates. The final compiler emits
`i8 noundef %is_mayhem_mode`. This is source consistent with the original machine
boundary, not a claim to know the original Rust parameter spelling. There is no
unsafe code, synthetic padding, inline assembly, binary patch or compiler-flag
change. The current bool callers explicitly supply zero or one.

`compiler/` retains qualified frontend/optimized LLVM and machine passes plus
full filtered logs. Diagnostic builds reproduce the corresponding normal
**stripped** ELF; additional IR/MIR emits change unstripped artifacts. An initial
final diagnostic used the old mangled name after the type change and printed
zero selected passes; that private invocation was rejected for IR evidence and
replayed with the new observed symbol. The packet contains the corrected capture.
`experiments.json` records the byte-width control and final Source-placement build.

Latest overlap review includes #381, which changes deposit reserve-value ordering;
its body and source file are distinct from this validator and its callers.

## Same-input build and local validation

Baseline is [PR #379](https://github.com/lalalune/pumpfun-source/pull/379) at
`e351a30bd5be26b0878096c62ab0c9689c442396`, following #374 and the public #319
composition. Both complete 52-input workspaces are included; four source files
change (`swap/mod.rs`, `swap/buy.rs`, `swap/sell.rs`, `sweep.rs`). The retained
baseline build is the actual #379 build, not a new baseline execution. Two fresh
candidate normal root builds produce identical stripped and unstripped outputs,
with unchanged tools, all 393 dependencies and root `--extern` inputs.

Every runtime comparison loads the exact original, 728 baseline and 729 candidate.
The observer verifies signatures and records loaded-program hashes. The controller
also captures full transaction input, pre/post accounts and return data for the
older sweep harness without changing its forwarded transaction.

| Local signed case triples | Cases | Functional differences | Non-compute-log differences before → after |
| --- | ---: | ---: | ---: |
| Existing legacy buy/exact-quote suite | 1,011 | 0 | 78 → 76 |
| Existing legacy sell suite | 575 | 0 | 89 → 88 |
| Existing protocol/creator sweep suite | 254 | 0 | 23 → 16 |
| Focused, fresh VM for every execution | 80 | 0 | 8 → 0 |

The first three use the existing resettable harness: **1,840 triples / 5,520
signed executions**, ten log-match gains and no losses. The separate **80 triples /
240 signed executions** exercise all eight sorted ordinary-recipient positions,
the Mayhem primary recipient and seven reserved positions, rejected recipients,
and pool flag bytes 2/255 through all four callers. They show eight additional
log matches with no losses. Corpora overlap; these are not asserted as 1,920
unique scenarios. This change restores representation and error-origin fidelity;
it does not claim to fix a demonstrated unauthorized transfer in the baseline.

The full 17,462-case corpus was not rerun. Unrelated inherited backend frame
diagnostics for `admin_update_token_incentives` remain in all normal build logs
(Cargo exits zero). The maintained 651-body source selection and previously
sealed evidence are untouched. All execution was local; no live-chain transaction,
coordination comment, automatic merge or deployment was performed.

| Artifact | SHA-256 |
| --- | --- |
| Captured original | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| 728 baseline stripped | `37f3fdbace558971111418e34d539c0786724e9288dfec5f17e18e5452a3a497` |
| 729 candidate stripped | `869b91bb8172a79f8daf3335e0a05c76b973f4a582ed14cff128ca618077285a` |
| 729 candidate symbols | `b9b5722f87b80e8ec9c3e2734b61aa20c144b3f6bac267a3ec7c4e7d484bce8e` |

## Reproduction

```sh
python -I -B research/amm-recipient-mode-recovery/verify.py
python research/amm-recipient-mode-recovery/materialize.py /tmp/amm-recipient-source
python research/amm-recipient-mode-recovery/rebuild.py \
  --source /tmp/amm-recipient-source --sdk /path/to/captured-v144-sdk \
  --cargo-home /path/to/qualified-cargo-home \
  --target-dir /path/to/qualified-build-target --output /tmp/amm-recipient-build
```

Exact offline Docker commands, image/tool/source/dependency hashes and compiler
logs are retained in `builds/`. Replay requires the qualified local SDK/Cargo
inputs. Actual runtime commands are in `runtime/commands.json`; each uses the
existing signature/loading observer. `controllers/` preserves those executed
scripts and their absolute scratch paths. `runtime/inputs.json` binds harness
sources. The verifier recomputes body/call/data and source differences, and
streams the signed runtime receipts; it does not claim fresh execution or a
fresh compilation. `overlap-review.json` records the latest public scope review.
