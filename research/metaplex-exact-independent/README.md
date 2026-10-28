# Independent Metaplex compiler and loader reproduction

The public [Metaplex source recovery](../claude-deps-metaplex-20261027/README.md)
already produces the exact meaningful ELF. This packet independently closes two
remaining evidence gaps: preserving the actual unstripped outputs of fresh
dependency builds, and creating the captured payload through signed loader
instructions instead of appending zeros in a packaging script.

This is an independent reproduction of that source recovery, not a new Utilize
fix or an increase in recovered functions. The source repair, its compiler
branch-order explanation, and the existing 147-case runtime qualification remain
credited to the public packet. No selected-build manifest or contract source is
changed here. The earlier failed Utilize expression experiments are preserved.

## Results and scope

| Evidence | Before this independent run | Fresh result |
| --- | --- | --- |
| Unstripped compiler output | Public build receipts retained its hash, not the file | Three retained, identical 707,544-byte outputs, SHA-256 `d38edf7b5c03c25b9c323568932ac6e9c593c0e141bcea3781ee13132d88c6b0` |
| Meaningful ELF | Public recovery already exact | Three independent empty-target builds reproduce all 707,448 bytes, SHA-256 `99ee61a5159e15a359b01298b52c9f9f912eb19e47bdfe83987c16de52a4b1ff` |
| Allocation tail | Public packaging manually padded 86,543 zero bytes | Local upgradeable loader itself creates the tail during signed deployment |
| Captured payload | 793,991-byte reference | Actual local loader payload equals every reference byte, SHA-256 `31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011` |

The ELF comparison is unnormalized whole-file equality through the section-table
extent, including calls, relocations and data, not masked instruction-window
equality. `verify.py` derives that extent from both ELF headers/section tables.
It also confirms that ordinary `llvm-objcopy --strip-all` preserves every
allocated section between the retained compiler output and candidate.

**Only the ProgramData payload equals the capture.** The local executable uses
public test keys, a synthetic program address, slot zero and a synthetic upgrade
authority. Its entire 794,036-byte ProgramData account differs from the captured
account (which has historical slot/authority metadata). Local account SHA-256:
`4fe940395d1b8bb4b0af0ad9ab208d3e3cfe9ec08066d41a8092e6dbd10b7e23`.
The maximum deployment length is chosen from the captured ProgramData extent;
this does **not** independently recover the original deployment/extension history.

## Compiler inputs and execution

Starting repository revision: `0cc61d636` (Pump Round36). `source.tar.xz` retains
all 812 regular source files, including their upstream license, after applying
the public source snapshot to Metaplex revision
`17e99434af5ead3e989c08f32af33609821d0bc0`. Every file matches that packet's
`source-manifest.json`; no new source rewrite is involved. Source and SDK tool
hashes are checked before and after compilation.

The first and repeat builds use separate new source, Cargo-home and completely
empty target directories. A third fresh target validates the published,
path-parameterized `reproduce.py` against the retained full source archive.
All three output pairs are byte-identical. No original binary is mounted into
the compiler container. The exact Docker argv, source hashes, five tool hashes,
controller hash, strip command, timings and full build logs accompany each run.

- Docker image: `solanafoundation/solana-verifiable-build@sha256:43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467`.
- Historical platform-tools v1.37 archive SHA-256: `8d5153589dbe19635affe937663cf4555a7e69a62d91ab4a1df064aaa8d5f066` (checked by the original controller).
- Rust compiler SHA-256: `7194df9c12e893cfa88fff5dd821d02d45910b4d375e13677b4723f45769a384`.
- Container network disabled; source, SDK and registry cache mounted read-only.
- Cargo `--locked --offline`, target `sbf-solana-solana`, release, three build jobs,
  `CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS=-Zremap-cwd-prefix=`.
- Cached registry sources and a private copy of the existing Git dependency cache
  supply offline dependencies. This is fresh compilation, **not** a fresh network
  dependency acquisition. Git-cache file inventories are retained; this packet
  does not independently audit every cached crate or every SDK library.

Compile command inside the container:

```sh
cargo rustc --package token_metadata --lib --release \
  --target sbf-solana-solana --locked --offline \
  --manifest-path /build/programs/token-metadata/Cargo.toml -- --emit=link
llvm-objcopy --strip-all /out/compiler-output.so /out/candidate.so
```

Portable reproduction requires Linux, Python 3.12+, Docker, the pinned image,
the v1.37 SDK, and populated Cargo registry **and Git** caches. It refuses an
existing output directory. Example (replace these paths with local ones):

```sh
python3 -B research/metaplex-exact-independent/reproduce.py \
  --output /tmp/metaplex-fresh-build \
  --sdk /path/to/platform-tools-v137 \
  --cargo-home /path/to/offline-cargo-cache
```

Actual original commands, including absolute paths, remain in
`builds/{first,repeat,portable}/launch.json` and `strip-command.json`.
The initial controller and both failed setup variants are retained in
`controllers/`. Failure 0: Docker exit125, nested target mountpoint missing under
the read-only source mount; fixed by creating the empty mountpoint beforehand.
Failure 1: Cargo exit101, offline `rooster` Git dependency unavailable in the new
Cargo home; fixed by copying the Git cache into each private Cargo home.
Their launch receipts, logs and partial results remain under `failed/`.
Neither was a failed source-fidelity hypothesis. No failed run is presented as
a successful build.

## Local signed loader evidence

`loader_replay.py` executes in Solders0.27.1 LiteSVM, with signature and recent
blockhash verification enabled. Each of two preserved runs loads its own fresh
build candidate through **789 signed transactions / 791 signature fields**:
buffer creation/initialization, 787 writes of at most900 bytes, then program
creation and `DeployWithMaxDataLen`. Every serialized transaction fits1232 bytes;
deployment requests the ordinary1,400,000-unit limit. There is no `add_program`,
`set_account`, network call or manual candidate padding in this execution.
The VM's local airdrop funds only the synthetic payer.

Both full signed-message receipts and actual loader-created ProgramData account
bytes are retained, losslessly gzip-compressed. The loaded compiler bytes are
checked in the buffer before deployment and in the resulting account afterward.
The verifier independently reconstructs every expected instruction, including
account privileges, chunk offsets/content and capacity; verifies every signature;
and checks the resulting account bytes and metadata. Signatures authenticate the
test messages, not the separately recorded logs/state; `--execute` reruns the
local VM and compares the complete fresh receipts and state to the saved ones.
No original-network transaction or historical Metaplex program-ID deployment is
claimed. The two repeated deployments are one scenario, not new contract cases.

From the repository root, with `requirements.txt` installed:

```sh
python -B research/metaplex-exact-independent/verify.py
python -B research/metaplex-exact-independent/verify.py --execute
python -B research/metaplex-exact-independent/test_verify.py
```

The default checks packet membership/hashes and ten external inputs before
checking saved build and loader evidence. It never compiles or downloads missing
evidence. The optional execution uses only a temporary local VM and candidate
file. CI runs the fresh local loader replay and falsification controls, not the
historical compiler build. Use these commands without Python optimization.

Five controls reject an actual corrupted signature, a **validly re-signed wrong
ELF write**, a **validly re-signed wrong deployment capacity**, a rehashed nonzero
allocation tail, and a claim that synthetic metadata equals the captured account.
Controls do not mutate any preserved file.

Remaining limits: this reproduces the public source and artifact; it does not
establish the historical author's exact source, original chain deployment
sequence, arbitrary future runtime behavior, or full reconstruction of other
Pump programs. Existing runtime cases are not re-counted as new evidence here.
