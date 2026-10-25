# A-reproduction: fresh whole-binary reproduction review (2026-10-25)

**Builder:** `scripts/build_partial_candidate.py` (forces `--offline --locked`, isolates SDK + `RUSTUP_HOME`; the captured original is read only after compilation and is never a build input).
**Toolchain (identical across committed and fresh runs):** `solana-cargo-build-sbf 2.1.21`, platform-tools runtime `v1.43`, `rustc 1.79.0-dev` (LLVM 18.1.7), rustc binary sha256 `1f26338cc2cabd0a6057dcbd0528bba262b23ca1296d357a55304ee31d1d9e5a`.
Each program needed a one-time online cache warm to fetch crates missing from the offline cache (`solana-instruction 2.3.3`/pump, `mpl-token-metadata 5.1.1`/pump_amm, `spl-associated-token-account-interface 2.0.0`/mayhem). After warming, every build ran offline with `returncode=0`, `source_unchanged=True`.

## Summary table

Two distinct comparisons — (1) does a fresh from-source build equal the **committed candidate**; (2) does that candidate equal `evidence/original/<prog>/deployed.so`.

| program | tools | reproduced-hash-matches-committed | candidate bytes | original bytes | candidate smaller-by | first_difference | overlapping bytes differ (count / %) |
|---|---|---|---|---|---|---|---|
| pump | v1.44 | **Y** | 1,576,744 | 10,485,715 | 8,908,971 | 24 | 879,945 / 55.81% |
| pump_amm | v1.44 | **N (stale committed artifact)** | 1,199,048 | 10,485,715 | 9,286,667 | 24 | 670,956 / 55.96% |
| mayhem | v1.52 | **Y** | 667,552 | 777,408 | 109,856 | 24 | 361,719 / 54.19% |
| pump_fees | v1.44 | **Y** | 768,848 | 948,944 | 180,096 | 24 | 419,822 / 54.60% |

`full_byte_equality` vs the captured original is **false for all four**. pump/pump_amm originals are zero-padded to a fixed 10,485,715-byte allocation.

## Per-program hashes (committed candidate → fresh build)

- **pump** `5c1c1c2d1cd2c334b3e054b6a8fb5ac0638d80d13495c1c18d935ad20bfd62bb` → same — **MATCH**
- **pump_amm** `807010828fe3b4124b5e20c34ca627582e1718e9c5849bf0c15309983d4088b2` → `d27be7e97d00a5f4ce249bd0f9bceec697db3d6e43a2264ec159d9de5a0013d1` — **MISMATCH**
- **mayhem** `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b` → same — **MATCH**
- **pump_fees** `8f89dbeb0eaef9490a518a97adb50dd8cbf0a21984a2bfca343d6ff5c2fe6c8e` → same — **MATCH**

## Verdicts

**Deterministically reproducible from current source (fresh == committed):** pump (v1.44), mayhem (v1.52), pump_fees (v1.44).

**NOT reproducible from current source — pump_amm (v1.44):**
- Fresh `d27be7e9…` (1,199,048 B) vs committed `80701082…` (1,199,296 B); fresh is 248 B smaller. Build is deterministic (two independent fresh builds both produced `d27be7e9…`).
- **Cause: the pump_amm source changed after the committed candidate was built.** 21/22 source files + toolchain + rustc hash are identical between the committed build's recorded `source_sha256` and the fresh build's. The single differing input is `programs/pump-amm/src/lib.rs`: committed build used `93b703e8…` (lib.rs at commit `476ecf0`); current source is `c3f981d5…`, changed by commit `f0c80ca` ("Recover AMM event borrowing…") **without regenerating `candidate.so`**. The committed pump_amm candidate is therefore **stale** — it reproduces from historical source, not current source. (No patching/brute-forcing/source edits used to determine this.)

## Caveat on "reproduced"

"Reproduced" means the fresh source build matches the committed candidate file — NOT that the candidate matches the deployed original. All four candidates diverge from `evidence/original/<prog>/deployed.so` at byte 24, differ across ~54–56% of overlapping real bytes, and are substantially smaller than their originals. These are partial/bounded reconstructions, not byte-equal rebuilds of the deployed binaries.

## Persisted evidence (under this folder)
- `compare-{pump,pump_amm,mayhem,pump_fees}/comparison.json` (+ padded `candidate.deployed.so`) — whole-binary comparisons vs captured originals.
- `build-{pump,pump_amm,mayhem,pump_fees}/{build-comparison.json,build-attempt.json,build.log}` — fresh-build provenance.
- `build-pump_amm/build-comparison.determinism-rerun.json` — second pump_amm build confirming determinism.

_Report body authored by the parent session from agent A's returned text (the harness blocks subagents from writing `.md` files); all `.json` evidence files were written by the agent directly._
