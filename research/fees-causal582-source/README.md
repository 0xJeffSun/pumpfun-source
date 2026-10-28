# Fees: two safe causal corrections on a reproducible source snapshot

This is a **source-only research packet**, not a new complete-function recovery
or a selected-checkpoint update. It contains a complete **48-input reconstructed
source snapshot** and one reversible **two-file patch**. The materializer can
reproduce both the exact prerequisite and the corrected source without private
files, downloading anything, or executing a compiler or target program.

Only two ordinary safe-Rust source regions change. **46 of 48 inputs remain
byte-identical.** The snapshot and ownership formulation are inferred; original
historical source spelling is not established. Inherited `core_intrinsics` and
`try_blocks` feature declarations and the existing reload-helper inline hint
are unchanged. No unsafe code, allocator helper, optimizer setting, assembly,
captured-byte template, linker ordering or post-link patch is introduced.

## The two changes

1. **Crank, physical line 17:** replace the explicit CPI-result match with a typed
   `Result<()>` try region. ProgramError conversion still occurs before the same
   three sequential `AccountInfo` drops. The outer `?` then propagates that owned
   result. The invocation, account clones, reload helper and event are unchanged.
2. **CreateDonation, lines 199, 204, 213–215:** keep deserialization outside a
   directly returned validation try region. Preserve owned errors, compared-key
   diagnostics and lexical Config-before-Ref destruction. Evaluate the pure
   payer-key comparison in payer-first order; return the same owned pair.

The patch keeps physical line counts and diagnostic coordinates. The public
source verifier checks both patch directions, all before/after source hashes,
exact change paths, line coordinates, and the stated ownership-related source
tokens. These checks are not a substitute for native or runtime verification.

## Prerequisite and attribution

The included prerequisite is our independently qualified **native composition**,
not an invented claim that it equals upstream's 46-input workspace. The public
[Extend integration](https://github.com/lalalune/pumpfun-source/tree/2310e96d94868bb0a57fb7231a4eae13d8f87d01/research/fees-extend-integration)
uses 46 workspace inputs plus inherited vendor and linker files. This snapshot
has **29 equal common files, 17 differing common files, and two extra include
files**. `provenance.json` lists every path and both hashes, explains the inherited
distinctions, and pins six exact public Git blobs read at upstream commit
`2310e96d94868bb0a57fb7231a4eae13d8f87d01`. The public text is read as evidence,
not executed during source materialization.

Credits include [ATA Result-region recovery](https://github.com/lalalune/pumpfun-source/tree/2310e96d94868bb0a57fb7231a4eae13d8f87d01/research/fees-ata-prefix-integration),
[Extend #278](https://github.com/lalalune/pumpfun-source/pull/278),
[safe Crank context #271](https://github.com/lalalune/pumpfun-source/pull/271),
[Social #262](https://github.com/lalalune/pumpfun-source/pull/262), and
[Withdraw #259](https://github.com/lalalune/pumpfun-source/pull/259).
Those inherited recoveries and the public **582/585, 200-raw** ordered-layout
checkpoint are not discoveries made by this packet. No public layout or vendor
recipe is silently imported. The two-file patch is relative to the included
native prerequisite, not directly applicable to an arbitrary upstream checkout.

## Locally observed native/static effects — artifacts not included

Two root-clean builds produced directly identical complete stripped and symbol
ELFs. Their entire root machine object also repeated; 455 nonallocated Rust
metadata bytes differed, so the complete root archive did **not** repeat.
Neither executable artifacts nor build receipts are distributed here.

Actual generated-wrapper call edges bind both business bodies. Crank retains the
individual source control's **24-byte ProgramError payload copy** through six
load/store instructions. Donation retains separate deserialize cleanup, common
validation cleanup, direct success-payload construction, and no extra 48-byte
result copy. Its six witnessed payer-comparison argument rows match the original
raw instruction block. All 77 complete Donation callee shapes match in order;
that is not a whole-CFG or sitewise execution correspondence proof.

| Body | Prerequisite bytes | Corrected bytes | Original bytes |
|---|---:|---:|---:|
| Crank | 15,688 | 15,736 | 15,976 |
| CreateDonation | 13,888 | 13,864 | 13,800 |

The original complete bodies remain unequal. Both causal control shapes compose
without another normalized-body change. Eight duplicate-name groups retain exact
name/shape/size multiplicities; no new individual identity is inferred from rank.
Against the actual 582-function native prerequisite, checks preserve **582/585
normalized and 143 raw matches**, **185 Location uses**, and **4,098 previously
equal actual direct-callee observations** (4,101 total; the same three remain
open). Ten Crank used operands and 49 Donation data uses/19 typed objects retain
their scoped values and consumer checks.

Whole-file equality is **false**. Corrected `.text` is 799,496 bytes versus
799,648 original; `.rodata` is 21,083 versus 21,079. The 873,112-byte compiler ELF
has 436,517 differing common-position bytes against the original capture.
These size gaps are not a completion percentage or a near-identity claim.

The exact corrected candidate locally passed **17,331 cases across 18 suites**,
**359 focused Crank cases**, **14 supplementary commands**, and **nine local
gate-verifier tests** (one positive and eight rejecting mutations). These scopes
overlap and must not be summed. Declared fields and serialized program
log/data/return lines retain their finite checks, including the 17 inherited
sharing-log repairs; no new diagnostic repair is claimed. The fixtures are
synthetic, normally signed and offline. Full VM/compute logs, exhaustive
behavior and authentic fixed-admin success are not established; the reviewed
SocialV2 fixture omits executable-account snapshot bytes. No public script here
verifies runtime, native build outputs or original whole-binary equality. These
local observations are prose, not downloadable evidence or embedded receipts.

## Verify and materialize either exact stage

```sh
python3 -B research/fees-causal582-source/source_tools.py
python3 -B -m unittest discover -s research/fees-causal582-source -p 'test_*.py'
python3 -B research/fees-causal582-source/source_tools.py \
  --stage before --materialize /absolute/new-fees-before
python3 -B research/fees-causal582-source/source_tools.py \
  --stage after --materialize /absolute/new-fees-after
```

Both stages contain exactly 48 text inputs. Outputs must be new and outside the
packet. Symlinks, special files, unsafe paths, extra packet entries, source
mutations, stale maps and false native/runtime verification flags are rejected.
`source/` stores only the corrected copy; reversing the patch reconstructs the
prerequisite, avoiding a duplicate full snapshot. For optional public-source
attribution verification, add `--public-root /absolute/pinned-repository` to
authenticate the six cited text files by SHA-256 and complete Git blob SHA-1.

## Build procedure, not an empty-cache or fresh-host reproduction claim

Use official Linux Anza platform-tools **v1.44**, rustc SHA-256
`c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97`.
Set `RUSTC`, `RUSTDOC`, `CC`, `AR`, `PATH` to its Rust/LLVM tools, `CARGO_HOME` to an
authenticated unchanged cache for the included lockfile,
`CARGO_NET_OFFLINE=true`, `RUSTFLAGS=-Zremap-cwd-prefix=`, and a separate target.
Keep all manifests, profiles and features unchanged. Remove only the root
package's cached outputs before each build, not the authenticated dependency
cache, and require an actual root compiler invocation.

```sh
cd /absolute/new-fees-after
"$SDK/rust/bin/cargo" clean --manifest-path programs/pump-fees/Cargo.toml \
  --release --target sbpf-solana-solana --package pump-fun-fees-candidate \
  --locked --offline
"$SDK/rust/bin/cargo" rustc --release --target sbpf-solana-solana \
  --locked --offline --verbose --manifest-path programs/pump-fees/Cargo.toml --lib -- \
  "--remap-path-prefix=$PWD/programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/" \
  "--remap-path-prefix=$PWD/pump-fees-math/=pump-fees-math/" \
  --remap-path-prefix=programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/
```

Preserve the symbol ELF; strip only a separate copy with official v1.48
`llvm-objcopy --strip-all`. Locally observed repeats reused verified dependency
outputs. Dependencies, toolchains, compiled artifacts and any runtime fixtures
remain external to this source-only packet. No binary/IR/archive, build/runtime
receipt, transaction/signature record, encoded executable payload, live RPC,
deployment or merge is included or requested.
