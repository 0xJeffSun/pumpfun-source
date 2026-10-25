# Official Linux v1.44 sysroot provenance

The official Linux x86_64 v1.44 archive contains the exact alloc/string.rs filename embedded in the captured Fees program: `/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs`. The locally used Darwin arm64 v1.44 liballoc contains `/Users/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs`, matching the retained candidate. This independently connects the observed filename difference to distributed sysroot artifacts. It is not an instruction to patch filenames or proof of a unique historical toolchain.

[Official release](https://github.com/anza-xyz/platform-tools/releases/tag/v1.44) metadata identifies tag v1.44, commit `fe5617c48364a0cdfd0c91c6d5a30f1dd6d6bb90`, and the Linux asset at490,710,349bytes. Download SHA256 is `6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`. The publisher supplies no digest in the retrieved API metadata; this hash records downloaded content, not independent publisher attestation. Exact metadata, URL, asset ID, retrieval time, selected member names and hashes are saved in archive-evidence.json.

| Artifact | Bytes | SHA256 |
|---|---:|---|
| Linux liballoc | 5404552 | `132997410250190766570cc7d88389cf55385c77c0865466b65f5bc6f0b98ba4` |
| Darwin liballoc | 5404640 | `7b0f8a73431f6982a8d30c62e560fcbe8bbe6e54fc15aee901235db45aa41e33` |
| Captured Fees | 948944 | `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` |
| Retained Fees closure candidate | 769000 | `a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa` |

Core/std library hashes also differ between the two host distributions. The suffixes in their rlib filenames differ. Neither difference alone attributes compiler flags or source revisions; exact members remain separately bound. The retained candidate is a named static-closure input, not an assertion about the latest dirty Fees source.

Only archive extraction and byte inspection were performed. No compiler execution, rebuild, runtime probe, source edit, binary patch or remapping occurred. Main/source ownership remains with the coordinator. This evidence supports selecting the actual official Linux sysroot for a future controlled source build; it does not predict whole-file equality or resolve missing source/dependency inputs.

Reproduce the inspection using inspect-archive.py and compare-libraries.py from the repository root. The downloaded archive remains in this work directory and selected files in selected/. Large binaries should not be committed merely to publish this report; their metadata/hashes and official URLs suffice for provenance.

## Archive member structure

Independent ar/ELF parsing confirms that the selected target rlibs contain machine263 ELF objects, not Linux host objects. Linux and Darwin liballoc/core/std each have matching section counts in their main object (256/1643/1133 respectively), but Rust-hash-bearing member names and most named sections differ. This means host-distribution differences extend beyond a visible path literal into metadata and symbol identity. The small intersection of exact section names has identical executable bytes (2/1/8 sections respectively); this is a limited raw-section observation and does not compare the many differently named sections or prove linked-image equivalence. No symbol normalization or relocation patching was used. Full member/section hashes are recorded in rlib-members.json and rlib-section-comparison.json.

## Local execution readiness

Read-only environment checks found an arm64 macOS host. Docker CLI is installed but its daemon socket is unavailable; Podman's existing default VM reports Running=false. Neither service was started, and no VM/container or workflow was created. A Linux x86_64 build therefore still needs a selected execution environment. The coordinator owns that next controlled experiment; this artifact comparison has not executed any Linux compiler.
