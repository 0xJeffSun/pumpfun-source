# AMM SBF → SBPF target proof

With the same frozen Rust source, selecting `sbpf-solana-solana` instead of
`sbf-solana-solana` raises exact normalized coverage from **572/785 to 577/785**
and raw matches from **115 to 124**, with no lost windows. The five gained
windows at `0xa9b0`, `0xf8ca0`, `0x1016a8`, `0x10efd8`, and `0x111b38` are
56-byte TypeId functions. Their constants are produced naturally by the selected
sysroot; no source constants, source coordinates, or executable bytes were patched.

The original-matching TypeId bodies are present in the official Linux v1.44
distribution's SBPF `alloc`, `core`, and `std` libraries. The SBF libraries from
that same distribution produce the previous candidate constants. The compiler
supports both targets and prints identical complete target specifications.
The TypeId types are the sysroot-owned `alloc` private `StringError(String)`
and `core::fmt::Error`, not types defined by the recovered Pump crate.

| Artifact | SHA256 |
| --- | --- |
| Original captured program | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| Same-source SBF baseline | `4e92463b170186f499a47be5424543af38aad88cc1a04db27de0aa35dae31d70` |
| SBPF candidate | `5e91f702680c96b35f00feffd0ad98cbda7724867536273b3b3e2827c2775377` |
| SBPF unstripped candidate | `7bc2aae7ed40f22506faaeadbad97131c1a9439cbb414f181a8a6ffeb2961686` |
| Linux v1.44 archive | `6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9` |

The packet contains both frozen ELF pairs, the 41 identical source files, complete
prime/strict build records and logs, and target/library/archive provenance.
No target cache or SDK archive is copied into this packet. The archive record
retains the official release URL and downloaded archive digest; the publisher
did not supply an independent digest.

The priming build added 252 dependency artifacts while preserving every existing
artifact. The subsequent root-only rebuild took 30.55 seconds, changed no
dependency artifacts, and reproduced the candidate and unstripped ELF hashes
exactly. Both builds used two jobs, two container CPUs, 4 GiB, locked offline
dependencies, and the same pinned Linux amd64 container. Only the private root
crate fingerprint was invalidated between the builds.

## Verify

From the repository root, with the retained SDK/archive available at the paths
in the build record:

```sh
work/test-env/bin/python repro/pump_amm/sbpf-target-recovery-20261027/verify.py
```

The verifier checks every packet file, all source and artifact hashes, the
recorded dependency invariants, the compiler and SBPF library hashes, the archive
hash, all three original-matching archive members, and recomputes all 785 original
windows for both candidates. It checks the exact five gains and zero losses.
`--sdk` and `--archive` can supply relocated copies with identical hashes.
For a quicker repeat, `--skip-archive-member-replay` skips only decompression of
the three archive members and reports the omission explicitly. It still hashes
the SDK libraries and archive.

`scripts/build_sbpf.py` preserves the build adapter with packet-local provenance
lookup. It requires a caller-owned source tree, output path and target cache;
it never reuses or modifies a coordinator cache implicitly. This proof packet's
verifier does not build or contact the network.

## Limits

Whole-file identity remains false: complete original ELF 1,268,504 bytes versus
candidate 1,303,848 bytes. The captured original additionally contains 9,217,211
trailing allocation-zero bytes, reported separately in `measurement.json`.
The target proof does not close other source, layout, readonly data, indirect
call, or runtime gaps. No runtime corpus or authentic create-config success was
run, and no candidate promotion occurred as part of this experiment.
