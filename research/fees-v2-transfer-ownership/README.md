# Fees: independent native reproduction and audit of the 570-window source

Upstream PR #222 published the V2 adapter recovery during these independent
experiments and owns that source milestone. **This packet adds no coverage beyond
#222.** It adds a portable native SDK controller, successful replay from another
workspace path, complete local provenance, signed differential receipts and
adversarial audits. Both outputs reproduce #222's container-built ELFs raw-byte
exactly using the same 43 captured inputs. No container or Git history is needed
by the new native controller.

Recover the entire **3096-byte original function at 240088** on exact PR #220's
current source. Its payer is a borrowed `AccountInfo`; cloning that payer before
the program account produces the original stack/register/branch layout. The
caller passes the signer's existing `AccountInfo` reference. Only three lines
in sharing_update.rs change. All other 42 inputs and subsequent source lines
stay unchanged, including the actual program namespace and generated types.
This is sufficient reconstructed Rust organization, not authenticated historical
source spelling or identifier ownership.

The build reaches **570/585 normalized original windows, 423 unique structural
pairs and 15 unmatched windows**. Every previous normalized counterpart,
143 raw-local counterparts, 72 unique raw pairs and 168 Location uses survive.
This adds one normalized complete body and **zero raw-local coverage**.
Normalization masks only encoded local CALL operands and actual relocated LDDW
addresses; registers, stack slots, scalar values, branches and import names remain.

All 13 local call sites (three distinct callee bodies) and the abort import match.
The sole relocated data object is independently read at its complete 32-byte
extent and equals the System program ID. The actual incoming call is bound to
original update_fee_shares_v2 at 211408+6032; that business caller still differs.
There are no indirect calls in this adapter. All 3656 previously equal direct
callee observations survive in the expanded 3680-edge cohort. Decoder, slice,
common, buyback, relay-error and SyncNative contracts remain checked. This is
one-hop instruction/data evidence, not unrestricted transitive semantics.

Four actual canonical Linux v1.44 builds retain all 43 input maps, eight ELFs,
compiler logs and strip replays. A fresh control reproduces both PR #220 outputs
raw-byte exactly. A borrowed-payer control with the previous clone order retains
569 counterparts. The proposal and its separate root compilation reproduce both
outputs exactly. The build uses canonical sbpf-solana-solana, all three math-path
remappings and the pinned v1.52 stripper. Dependency caches are reused; no clean
all-dependency build is claimed. Originals are never compiler/linker inputs, and
no compiler output is patched, padded or rewritten. A fifth actual compilation
through `reproduce.py` materializes those same inputs in a different workspace
and independently reproduces both accepted artifacts. Its actual command,
environment, logs, result and outputs are retained under `portable/`. Five SDK
executables are hash-pinned; this is not authentication of every host library.

```sh
python3 research/fees-v2-transfer-ownership/reproduce.py \
  --sdk /path/to/platform-tools-v1.44 \
  --strip-tool /path/to/v1.52/llvm/bin/llvm-objcopy \
  --cargo-home /path/to/locked-cargo-cache \
  --target-dir /path/to/shared-target \
  --workspace /path/to/new-workspace --output /path/to/new-output
```

The controller requires fresh workspace/output directories and an already
prepared locked cache. Serialize builds sharing a target directory. It performs
no download, compiler installation, target execution or source/artifact rewriting.

The proposal freshly passes 17331 comparisons across 18 suites, 1542 exact query
outcome/log/compute comparisons, the existing 24/32/20/8/30 matrices, 16 relay
cases and 157 strict social-creation cases. A separate fresh 417-case sharing
replay passes its six listed outcome/state/event/CPI/return fields. Both raw logs
and signed transaction payloads are retained. Offline checks verify 1668 signed
transaction records in that focused receipt. These finite tests do not prove
unrecorded account behavior, exhaustive semantics or complete raw log/compute
equality. Authentic fixed-admin FeeConfig initialization is not claimed.

```sh
python3 -I -B research/fees-v2-transfer-ownership/verify.py
python3 -I -B research/fees-v2-transfer-ownership/test_scope.py
python3 research/fees-v2-transfer-ownership/verify_signatures.py
```

The first two use only the standard library and saved evidence. Signature checks
use pinned solders0.27.1 without VM/RPC. Fresh execution needs the frozen harness
and all its recorded fixtures; build paths in launch records are observed local
locators. The packet seals the unchanged 187 harness hashes. No selected source,
checkpoint, status ledger or workflow changes. Earlier P27 guard passes retain
their exact f8582fbd1 scope; this packet makes no later branch guard-pass claim.

The final unmodified compiler output is 877768 bytes, SHA-256
`fb5d4251dfe349660fa6b69a2f355045efbf46b334560064f4c7473021130bd8`.
Capture and meaningful ELF comparisons remain false. The four stored selected
core artifacts are independently compared without normalization, along with this
fresh Fees output: **whole core identity remains 0/4**. The other three programs
were not freshly compiled. Relay is a dependency, not a fifth core completion.
