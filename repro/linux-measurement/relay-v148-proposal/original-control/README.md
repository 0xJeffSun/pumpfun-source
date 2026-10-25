# Source-only proposal: authentic Linux v1.48 Relay12 measurement

**Not installed or dispatched. No Linux distribution was downloaded, native tool invoked, Cargo fetch/build performed, or workflow started by this proposal.** The only network reads were the two official fixed release metadata records. All proposed code/workflow/tests live here under work; tracked scripts, workflows, source, status and accepted artifacts remain untouched.

After review, the proposed new files are `scripts/measure_relay_linux_v148.py` and `.github/workflows/measure-relay-linux-v148.yml`. The workflow has only workflow_dispatch, no push/PR/schedule trigger or variant inputs. It runs on Ubuntu24.04 x86_64, uses read-only repository permission and nonpersistent checkout credentials, and uploads only the explicit publication subdirectory. No secret is supplied to the measurement process. The script requires `--execute`; `--dry-run` only reads the sealed23-input source and prints a plan without creating its output, fetching data or invoking tools.

## Concrete hypothesis and provenance pins

The existing genuine Darwin v1.48 source-build12 graph closes the original608-byte driftsort scratch constants, while a bounded diagnostic prefix still names `/Users/runner/…`; the captured path uses `/home/runner/…`, both915:9. An authentic Linux distribution is a distinct, source-backed data experiment. Its path may or may not match. The proposal never rewrites source coordinates, fabricates descriptor bytes or forces a path string.

| Role | Release / asset | Exact bytes | Publisher digest |
|---|---|---:|---|
|Compiler/sysroot|v1.48 /218636077 /254652416 /platform-tools-linux-x86_64.tar.bz2|516,334,851|None in saved API; measure hash and qualify official-origin acquisition|
|Fixed strip role|v1.52 /258591601 /310634197 /platform-tools-linux-x86_64.tar.bz2|519,270,959|SHA-2568b3861e93daf085ec12b65c4fac374d9bec4587a3de16871da6b08ab0c1d907e; must match|

Asset ID/name/size/digest/tag URL are checked against freshly saved official release metadata before acquisition. Every selected compiler/runtime/backend/linker and stock target sysroot byte is checked against its actual extracted archive member. Linux v1.52 llvm-objcopy is similarly bound to the authenticated official archive. Publisher qualification differs deliberately: v1.48 has no publisher digest; v1.52 does. Root version.md must identify Rust293a1b6c60a0b8d92593843c373539e21e3ba087.

Linux OS, native tools and strip executable bytes differ from Darwin. The fixed *role/version* of v1.52 strip is held; its Darwin hash is not substituted for a Linux executable. This is **not the same full recipe**, a unique historical compiler/OS proof, or application-source recovery. Actual host release/uname, tool identities, stock target cfg/spec/libdir, native version output and both archive measurements are retained.

## One future measurement and its stop boundaries

The old source-build12 immutable seal, exact23-file map and original232-crate archive/member map are pinned. Only those frozen source/lock bytes are copied. Profile stays release opt-level3, abort panic, overflow checks, noLTO and one codegen unit; the original empty cwd-remap flag remains exact. No source, profile, feature, lock, target-CPU or source-coordinate variant is exposed as an option.

The future execution requires a new private output outside the checkout and never deletes existing evidence. Compiler/strip tools, source, registry/cache, target and RUSTUP_HOME are private. A neutral temporary cwd rejects ancestor Cargo configs. The subprocess environment is built explicitly, so credentials, RUSTFLAGS, wrappers, registry settings and loader overrides are not inherited. No Solana driver, installer, rustup/Solana alias or VM/chain operation is used.

Before the graph build, the selected compiler prints cfg/spec/target-libdir and both native tool versions. Legacy sbf-solana-solana must work with stock `+store-imm,+jmp-ext`, Solana target family and no dynamic-frames. No fallback target, flag or sysroot repair is attempted. These are print/version capability calls, not extra program compilation probes.

Fresh CI may run one `cargo fetch --locked` network cache-preparation command. Its exact command, return code and lock/all-source before/after hashes are retained. Fetch failure or changed input stops before program compilation. All232 lock packages,7,607 authenticated members and checksum/source-byte equality must then match the original sealed maps. Cargo-only extraction markers are explicit. The one program command is direct selected Cargo `build --release --target sbf-solana-solana --locked --offline --verbose`.

Every actual compile/strip exit and anchored backend Error line remains unmodified. No attempt label can be run twice. Compilation/MSRV/setup failure stops without a second build; strip is skipped after failed compilation or changed source. Postbuild source/cache/tool authentication is required. Actual successful root flags and positively observed compiled registry roots are linked from real verbose rustc command lines; host/target command evidence remains visible. Strip failure skips target comparison. A zero Cargo exit with backend diagnostics remains a failed diagnostic gate, with its artifacts/logs retained and no readiness claim.

Target bytes are first read for comparison only after compile and strip both succeed and provenance checks pass. The unchanged full-ledger method and existing Darwin artifact hashes are fixed controls. The result retains all inferred functions, calls, data-prefix bounds and negatives; additionally it records the complete608-byte scratch comparison, actual named multiply edge, bounded descriptor bytes/path and actual pointer flow ending at the custom_panic import when provable. Complete descriptor extent, external consumer semantics, recursive ABI/runtime behavior and historical OS uniqueness remain unproved. Raw target/Darwin differences are measurements, not recovery percentages.

Publication uses an exact file allowlist: source23 only, known receipts/logs, selected metadata, stripped/unstripped artifacts, fixed full-ledger outputs and static results. Full distribution archives/tools, Cargo caches/credentials and targets are never uploaded, including on failures. There is no branch, status/default, deployment, accepted-artifact or promotion operation.

## Local review evidence

`dry-plan.json` is read-only output; its unused output directory remains absent. `synthetic-tests.stderr.txt` records20 passing tests:19 synthetic guard/failure/security-boundary cases and one saved-Darwin-byte analysis regression. All network and native process APIs are mocked in tests; the saved control test reads existing bytes only and makes no Linux-build claim. The initial saved-control test exposed an analysis-bound issue: __multi3 is the final candidate text function, so there is no next candidate entry. The correction uses authentic unstripped candidate symbol bounds while retaining exact original entry/next-entry checks. That initial QA failure is preserved in `qa-initial-failure.stderr.txt`; it involved no program build.

Run `python3 -B test_measure_relay_linux_v148.py` from this packet to repeat source-only QA, or `python3 -B measure_relay_linux_v148.py --repo /repo --output /fresh/private/path --dry-run`. No future execution is authorized merely by these tests passing. Root review and a separate manual dispatch remain the next steps.
