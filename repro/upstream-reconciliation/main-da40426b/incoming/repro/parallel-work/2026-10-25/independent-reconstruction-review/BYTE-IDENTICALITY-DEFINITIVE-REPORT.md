# Definitive report: everything remaining for full byte-identicality

_2026-10-25. The comprehensive answer to the goal — what is byte-identical, what is not, why,
and the one remaining path. Backed by CI verifiable builds, local differential oracles, ELF
header/section forensics, and binary version-string fingerprinting. Supersedes the per-item
notes it cites._

## 0. Two measures — never blended
- **Behavioral / ABI identicality** (what local SDK integration testing needs): **complete and
  oracle-validated.** pump dispatches all **56/56** IDL instructions; every SDK-exercised path
  matches the captured original byte-for-byte in state/logs/events/errors.
- **Whole-binary byte identicality**: **2 of 6 artifacts** (the two public-source dependencies).
  The other four are bounded by inputs we do not have, proven below — not by missing effort.

## 1. Behavioral reconstruction — DONE this session (all on main, all oracle-validated)
pump was missing/had-reverted handlers; all recovered and validated vs `evidence/original`
(fresh correct-compiler builds, `e_machine=263`):
- `claim_token_incentives` 60/0 · `admin_update_token_incentives` 98 (44==44) /0
- `create_v2` Mayhem mode + mayhem `initialize_mayhem_state` 17/0 (end-to-end via the genuine
  pump→mayhem `invoke_signed` CPI)
- v3 Token-2022 transfer-fee quote branches (`buy_v3`/`sell_v3`/`buy_exact_quote_in_v3`) 126/0
- `set_mayhem_virtual_params` 84/0 — the dormant CPI-only 56th handler, formula reverse-
  engineered empirically (drive the original through a genuine signer-stub CPI, fit input→output)

**SDK coverage:** all `@pump-fun/pump-sdk` 4.3.1 + `@pump-fun/pump-swap-sdk` 2.2.0 instruction,
account and event discriminators and decoders match; the one prior HARD-FAIL (missing incentive
handlers → `InstructionFallbackNotFound`) is closed. No SDK-built instruction is unimplemented.

## 2. Byte-identicality status per artifact (hard evidence)

| Artifact | source | byte-identical | residual | why |
|---|---|:--:|---:|---|
| SPL Token | public | **✅** | 0 | CI `full_byte_equality:true` — method proof |
| Token-2022 | public | **✅** | 0 | CI `full_byte_equality:true` |
| ATA | public | ❌ | 1,506 B (1.43%) | **provenance-bounded** (below) |
| Metaplex | public | ❌ | 1,509 B (0.19%) | **provenance-bounded** (below) |
| pump / pump_amm / pump_fees | **lost** | ❌ | large | **lost literal source** |
| mayhem | **lost** | ❌ | large | lost literal source + hashbrown pin |
| donation_relay | **lost** | ❌ | ~347 KB (492 windows) | lost source |

## 3. Version-discrepancy research — taken to the bottom (the goal's explicit ask)
- **Compiler: settled by the ELF `e_machine`.** Originals = 263 (EM_SBF). platform-tools v1.43
  emits 247 (EM_BPF) — header-incompatible, so the earlier "v1.43" claim is **retracted**;
  correct is **v1.44** (pump/pump_amm/pump_fees, Rust 1.79/LLVM18) and **v1.52** (mayhem, Rust
  1.89/LLVM20). Dependencies use their verifiable-build images (ATA Rust 1.59 `build-bpf`;
  Metaplex Rust 1.69 `build-sbf`).
- **Std fingerprints corroborate:** `raw_vec.rs` single-file (Rust ≤1.86) in all; Metaplex
  `slice/sort.rs` single-file (Rust ≤1.80) consistent with its Rust-1.69 image.
- **Dependency versions checked against the binaries:** deployed **Metaplex links
  `hashbrown-0.12.3`** and the candidate links the **same** — so Metaplex's residual is NOT a
  dependency-version drift. (The live discrepancy that remains is **mayhem**, whose original
  links `hashbrown 0.15.4` while the reconstruction's `anchor-lang 1.0.0` graph forces `0.17.x`;
  that is a lockfile-provenance gap, not closable by a lone pin.)

## 4. Why ATA + Metaplex are not byte-identical — provenance, not toolchain
Both are now **size-exact** to their captured originals (ATA 105,032==105,032; Metaplex
793,991==793,991) built with the correct verifiable-build image **and** matching dependency
versions. Yet each differs by hundreds of tiny scattered runs (ATA 516 runs ≤14 B; Metaplex 431
runs ≤18 B) — the exact fingerprint of **relocation/address drift from a slightly different
source item-ordering**, i.e. a near-miss on the **exact deployed commit**. This was searched
hard, not assumed: ≥7 ATA source-commit/recipe attempts and **19 Metaplex source variants**
(`token_metadata_*_recovered` in `dependency-build.yml`) were built and compared; none reproduces
the relocations. The committed Metaplex `source.patch` even states it is an "unaccepted,
not historically attributed" hypothesis. So ATA/Metaplex are closable **in principle** (public
source) but **provenance-bounded in practice**: they need the exact upstream commit + `Cargo.lock`
pump.fun deployed, which is not publicly identified.

## 5. Why the four core programs are not byte-identical — lost literal source
Proven, not asserted: **pump_fees has all 31 handlers and the correct v1.44 compiler and still
is not byte-equal** (it even over-emits `.data.rel.ro`); pump_amm is behaviorally complete yet
differs by ~994 calls / 663 relocations no reorder fixes. The deployed `.so` is determined by the
original source *structure* (inlining/factoring/item order) + exact lockfile, and a behaviorally-
and size-faithful reconstruction does not uniquely determine either. donation_relay has no
public/recovered source at all (492 unresolved windows). No decompiler recovers the exact
original item ordering from a stripped binary — this is a property of what was lost, not a tool gap.

## 6. The one remaining path to full byte-identicality
Obtain, from pump.fun's internal records, the **authentic source + `Cargo.lock` + build recipe**
for each artifact (and the exact upstream commit for ATA/Metaplex). With those, each closes the
way SPL Token + Token-2022 already did. Without them, this is the floor:
- SPL Token / Token-2022: 0 B (done)
- Metaplex: 1,509 B · ATA: 1,506 B (toolchain+deps correct; exact commit unknown)
- pump / pump_amm / pump_fees / mayhem / donation_relay: lost-source-bounded

Everything recoverable and *validatable* from the binaries has been recovered. The remainder is
an external-records problem, not a decompilation or compute problem.
