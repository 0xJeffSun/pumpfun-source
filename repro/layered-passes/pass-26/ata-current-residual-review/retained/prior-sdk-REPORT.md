# ATA exact-build recipe audit

Audit baseline: `origin/main` at `3c5b492be7ed793e062bc14f57c7abf3b3823c61`. All work in this directory. No repository sources, global toolchains, executable bytes, chain accounts or published artifacts were changed.

The 307-byte ATA residual is real, but the newer dependency report misidentifies its cause. Downloading the Solana 1.10.33 BPF toolchain is not, by itself, a new candidate recipe: the retained best candidate already used that SDK and its bpf-tools v1.27 compiler.

## Verified artifact differences

The captured ATA has 105,032 bytes, SHA256 `6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d`. Candidate2 has the same length and SHA256 `ba8dd8a42ca7bff4b668c72e1b5614e9363b271924d520253f5724760ba2d65b`. There are 304 differing `.text` positions and three `.rel.dyn` positions; all other bytes agree. Whole-byte identity remains false.

I reran `repro/parallel-work/2026-10-24/results/ata_recipe/evidence/verify.py`: all 67 sealed inputs and 159 inferred windows verify. That verifier derives instruction boundaries and mapping from the binary, rather than trusting just the report. The six affected windows are:

| Ordinal | Original file offsets | Candidate file offsets | Same-address differing positions |
|---|---|---|---:|
|38|28592–29032|28944–29384|181|
|39|29032–29384|28592–28944|101|
|41|29704–31160|same|9|
|44|34296–34840|same|2|
|46|35936–37968|same|5|
|47|37968–40512|same|6|

The first two windows exchange order; the remaining differences are associated direct-call displacements. The two changed relocation records map with the same address correspondence. All instructions agree under this precisely checked correspondence. This does not prove source identity or exhaustive behavior, and does not permit patching/reordering executable bytes. The earlier report attributes the first two to RawVec specializations based on candidate symbol evidence. The newer `C-dependencies/REPORT.md` claim that all differences lie in a single `custom_panic` function is contradicted by this six-window evidence.

## Compiler claim corrected from primary sources

The official Solana `v1.10.33` tag resolves to commit `fcb85858485170219eb80887837afd08940f816d`. Its [immutable BPF installer](https://github.com/solana-labs/solana/blob/fcb85858485170219eb80887837afd08940f816d/sdk/bpf/scripts/install.sh#L104-L115) selects `version=v1.27` and downloads `solana-bpf-tools-$machine.tar.bz2`. The file is saved in `official/solana-1.10.33-install.sh`; API tag metadata is retained alongside it.

The candidate2 build log begins `BPF SDK: /root/.local/share/solana/install/releases/1.10.33/solana-release/bin/sdk/bpf`. The recorded tool metadata resolves the compiler to `/root/.cache/solana/v1.27/bpf-tools/rust/bin/rustc`, SHA256 `1f070433db37406c128936f1b5baa734a7d4f4c94c6db31d07b890a649ed7a39`, Rust1.59.0-dev / LLVM13.0.0. Therefore the report's contrast “candidate v1.27 versus earlier tools from Solana1.10.33” is false. Both select v1.27. An actual target-versus-candidate compiler mismatch remains unproved.

The official [v1.27 distribution](https://github.com/anza-xyz/platform-tools/releases/tag/v1.27) is retrievable now; missing offline cache is not an external-access blocker. Its Linux asset is 287,441,567 bytes. The freshly downloaded asset has SHA256 `8a2d6a7d8b498202d2ae37062dad94be0c33ca37444e35ab7732927d3fe9a8ff`. Its 9,152-byte `rust/bin/rustc` loader hashes exactly to the candidate's recorded `1f070433…` value. This is compiler-loader identity only: the candidate did not retain hashes for the complete shared-library/sysroot/LLVM closure. `asset-assessment.json` records the distinction. A present-day release download supplies recorded integrity evidence, not publisher attestation of which bytes the historical uploader actually used.

## Actual unresolved recipe inputs

The best retained source revision is `f5ce86d43dd31ddefb96d4e8cdd67dd073dc5dca`, with resolved lockfile SHA256 `3c8f402f40488908503e9cc088388c1f95848d79da5141b5cb1a14006d74428b`. Five preserved candidates were already tested, producing1199/307/1506/307/1506 differing positions. Candidate4's warnings flag duplicates candidate2; candidate5's chronology-supported source duplicates candidate3. None closes the gap.

The original release advertises an Anchor verification recipe (`--solana-version1.10.33`, Debian bootstrap, Ubuntu20.04). The corresponding Anchor0.24.2 bootstrap installed then-current Rust through unpinned rustup; the recorded candidate instead uses a pinned verifiable-build container and host Rust1.59.0. The exact original host/Cargo bootstrap, source/lock selection, feature graph, unit metadata and full BPF rustc invocations—particularly `spl_token_2022 -Cmetadata`—are not attributed to the release asset. Those inputs can influence monomorphization ordering. This is a narrowed hypothesis, not a proof of which input caused the swap.

Next discriminating evidence should be an archived upload/build record, original lockfile/unit graph, or original intermediate library that links the asset hash to those inputs. If obtained, rebuild from source with the authentic inputs and compare full bytes. A new version/path/flag sweep or an arbitrary metadata override would not establish historical identity. It is not proven that no authentic recipe can ever be recovered.

## Current execution capability

`docker` is installed but `docker info` fails: `/Users/shawwalters/.docker/run/docker.sock` does not exist. I did not start/alter the global daemon. No new Linux source build was performed. Native tool downloads and static verification were available and used. The inability to execute a build locally does not make the SDK unavailable or justify the wrong-version explanation.

Run `python3 work/ata-toolchain-audit/verify.py` for the independent local checks. It hashes the immutable installer, checks the recorded compiler version and exact artifact deltas, and verifies every retained input hash. It never modifies an ELF or executes a contract.
