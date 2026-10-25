# Pump.fun source reconstruction — status & remaining-work report

_Prepared 2026-10-25. Independent review of the reconstruction state, grounded in
the repo's own evidence plus fresh verification run this session. Every number
below was either re-derived here or cited from a committed artifact._

---

## 1. Headline (read this first)

**Behavioral reconstruction is strong. Whole-binary byte-identicality of the four
core programs is *not* close, and the premise "just a few byte differences remain"
does not hold for them.**

Two independent measures tell two different stories, and they must not be blended:

| Measure | Result |
| --- | --- |
| **Instruction-handler reconstruction** (bounded, saved differential receipts) | **140 / 150 (93.3%)** — strong |
| **Whole-binary byte equality vs. captured on-chain ELF** | **0 / 4 core programs (0%)** |

The gap between those two numbers is the whole story. The handler work proves the
*behavior* of individual instructions matches the deployed program on tens of
thousands of differential cases. It does **not** mean the compiled `.so` is byte-identical.

**Measured this session**, each core candidate differs from its captured original
in roughly **half of all overlapping bytes**:

| Program | Candidate bytes | Original ELF extent | Candidate is smaller by | Overlapping bytes that differ |
| --- | ---: | ---: | ---: | ---: |
| pump | 1,576,744 | 1,934,800 | 358,056 | 879,945 (**55.8%**) |
| pump_amm (PumpSwap) | 1,199,296 | 1,268,504 | 69,208 | 671,202 (**56.0%**) |
| pump_fees | 768,848 | 873,256 | 104,408 | 419,822 (**54.6%**) |
| mayhem | 667,552 | 775,416 | 107,864 | 361,719 (**54.2%**) |

In every case the **first differing byte is offset 24** — the ELF entry-point field —
i.e. the binaries diverge from the header onward. These are fundamentally different
builds, not near-matches with residual relocations.

### The important reframe for your actual goal

You said the end goal is **"byte identicality so we can locally test our new SDK
integration."** Those two things are separable, and the good news is the second one
does **not** require the first:

- **For SDK integration testing you need ABI/behavioral identicality** — same
  instruction discriminators, account layouts, events, error codes, CPI shapes.
  That is exactly what the 140/150 handler work already delivers, and it is
  **deployable to a localnet today**.
- **Byte-identicality of the compiled `.so`** is a much harder, separate goal
  (matching the exact historical compiler build, dependency lockfile, flags, and
  complete source). The team has been at 0/4 on this for many commits, and — per
  the repo's own rules — has deliberately *not* taken the shortcuts (compiler/flag
  brute-force, binary patching) that would fake it.

**Recommendation:** proceed with SDK integration testing against the current
behavioral builds now (see §6), and treat whole-binary byte-identicality as a
longer-horizon research track rather than a blocker. One of the dispatched agents
is verifying the localnet path end-to-end.

---

## 2. What I verified this session (not just read)

- `scripts/verify_evidence.py` → **9/9 captures OK** (4 core + 5 dependencies).
- `scripts/test_tooling.py` → **6/6 OK**.
- **Build loop is real and deterministic**: a clean offline rebuild of the Fees
  candidate reproduced the committed hash **exactly**
  (`8f89dbeb0eaef9490a518a97adb50dd8cbf0a21984a2bfca343d6ff5c2fe6c8e`),
  using platform-tools **v1.44** compile + recorded SDK **v1.52** strip.
- **Behavioral differential harness works**: `fees_initialize_differential.py`
  against the committed candidate → **180 cases, 0 mismatches** (LiteSVM, original
  `.so` as the oracle).
- **Toolchain present locally**: platform-tools v1.43 / v1.44 / v1.45 / v1.46 / v1.52,
  `cargo-build-sbf`, host rustc 1.94; per-toolchain rustc 1.79.
- **Reproducibility caveat found**: the committed `Cargo.lock` pins
  `solana-zk-sdk 2.2.0`, which was absent from the local cargo cache; the SBF
  toolchain's older cargo could not resolve it offline until I warmed the index
  with one online build. The build is reproducible, but a clean machine needs a
  cache-warming step first. This is an environment/provenance gap, not a source bug.

---

## 3. Finished / solid

- **SPL Token dependency — byte-identical from fresh source.** A Linux source build
  matches the entire captured 108,600-byte payload. This is the proof-of-method:
  byte-identicality *is* achievable for non-Anchor targets.
- **Token-2022 dependency — byte-identical from fresh source**, including
  regenerated zero allocation padding.
- **All 4 core captures + 5 dependency captures verified** with SHA-256, finalized
  slots, loader metadata (immutable comparison inputs, never build inputs).
- **Behavioral handler coverage: 140/150 bounded implementations** with
  **53,735 saved differential receipts** + 1,024 Surfpool comparisons for Pump.
  By program: Pump 48/56, PumpSwap 37/38, Fees 31/31, Mayhem 24/25.
- **Deterministic, provenance-tracked build pipeline** (`build_partial_candidate.py`)
  that records source hashes, SDK snapshot, toolchain identity and an honest
  whole-file comparison on every build.
- **Rich differential + Surfpool test infrastructure** (~95 runner scripts), one
  per instruction family, each using the real on-chain program as the oracle.

---

## 4. Not finished — per-program remaining work

### Pump (48/56 handlers; candidate 55.8% byte-different)
- **Unrecovered (3):** `admin_update_token_incentives`, `claim_token_incentives`,
  `set_mayhem_virtual_params`. _These are STOPPED lanes in the repo and must not be
  reassigned as a workaround — I am honoring that._
- **Partial (5):** `buy_v3`, `sell_v3`, `buy_exact_quote_in_v3`, `create_v2`,
  `multi_hop_curve_swap` — missing nested routes, transfer-fee/Token-2022 extension
  paths, exhaustive account validation; final TradeEvent u64 suffix semantics
  uninterpreted.
- **Known confirmed defect:** current `sell_v2` has a quote transfer-fee
  minimum-output + event mismatch (corrective probe lane is STOPPED).
- Whole binary: candidate is 358 KB smaller than the original ELF; broad final-event
  semantics, data/call attribution and layout unresolved.

### PumpSwap / pump_amm (37/38 handlers; candidate 56.0% byte-different)
- **`create_config`** is static-only: compiled source + normalized wrapper/handler/
  context/event matches, but **no authentic positive initializer replay**, so it is
  not counted as bounded. (No synthetic-signer bypass permitted.)
- Update handler is 3,160 B vs original 2,912 B; scalar methods, source coordinates,
  transitive data differ. Unmatched windows + admin source-location differences remain.

### Fees / pump_fees (31/31 handlers; candidate 54.6% byte-different) — most complete
- **Donation handler incomplete:** 10,584 B vs original 13,800 B — missing the
  reserve-dependent BondingCurve branch and two early log messages.
- Parser details, transitive helpers/data, source line/file coordinates, compute
  usage and full-ELF identity unresolved.
- Build recipe not historically unique: v1.44 compile + v1.52 strip is *a* working
  recipe, not *the* proven original recipe. Two Linux source-build attempts stopped
  before compilation; no successful Linux candidate yet.

### Mayhem (24/25 handlers; candidate 54.2% byte-different)
- **`initialize_mayhem_state`** unrecovered (STOPPED lane).
- Non-initializer error-return ABI / codegen differences; 5 unknown GlobalParams
  field roles (2 now statically attributed); 26 panic-diagnostic differences
  (8 unwrap-detail). Compiler/stdlib provenance differs.

---

## 5. Not finished — dependencies & the core blocker

### Dependencies (closest to byte-identical, non-core)
- **Metaplex Token Metadata:** 1,250 / 1,251 windows match. Remaining: the
  **`Utilize` 5,104-byte body**; 1,509 total differing bytes (text + source-coord +
  relocation). 86,543-byte zero tail verified.
- **Associated Token Account:** authentic historical build recipe missing; **307
  bytes differ** (304 text, 3 relocation); 159 windows correspond under address mapping.
- **Donation relay:** no recovered source candidate; 492 windows source-unattributed,
  11 IDL dispatch branches mapped; upstream repo unavailable.

### The core blocker for byte-identicality (all 4 programs)
The binaries differ ~55% because **the historical build recipe is unresolved**, and
recipe = *(exact compiler/platform-tools build) × (exact dependency lockfile) ×
(exact flags/linker order) × (complete source)*. Evidence is suggestive but not
unique:
- Path strings show `library/alloc/src/raw_vec.rs` (Pump/PumpSwap/Fees) vs
  `raw_vec/mod.rs` + `hashbrown-0.15.4` (Mayhem) — hints, not a lockfile.
- Controlled comparison favors **v1.44** for Fees (two runtime helper bodies match
  exactly), but the official Linux SDK defaults to v1.43 for the strip phase, so the
  recorded Darwin pipeline (v1.44 compile / v1.52 strip) is not yet proven original.
- **Repo rule (honored):** _"No version/flag/path brute-force search or binary
  patching is authorized."_ So closing the recipe must come from genuine evidence,
  not search. This is why 0/4 persists despite strong handler work — and it's the
  right call for integrity.

**Honest feasibility:** full byte-identicality of the 4 core Anchor programs is a
genuine open research problem, not a last-mile cleanup. It may not be reachable
without recovering the exact original toolchain+lockfile. The dependencies
(Metaplex `Utilize`, ATA) are genuinely close and are the tractable byte-level wins.

---

## 6. Path to your real goal (local SDK integration testing)

You can likely start **now**, without byte-identicality:
1. Deploy the current behavioral candidates (`repro/*/candidate.so`) to a local
   validator / LiteSVM / Surfpool — same program IDs, same IDLs, same discriminators.
2. Point the new SDK at localnet and exercise create → buy → sell → migrate →
   fee-collection flows.
3. Where a handler is only *partial* (§4), those specific edge paths may diverge;
   the differential suites already map exactly which paths are covered.

An agent is verifying this end-to-end and will produce a runnable setup + a list of
which SDK flows are safe vs. which hit partial/unrecovered handlers.

---

## 7. Parallel agents dispatched this session

All agents operate under the repo's integrity rules (originals never become build
inputs; no brute-force recipe search; no binary patching; STOPPED lanes untouched;
reviewable evidence only). See `AGENT_DISPATCH.md` in this folder for briefs, and
each agent's output directory under `work/reconstruction-review-2026-10-25/`.

| Agent | Scope | Deliverable |
| --- | --- | --- |
| A | Reproduce all 4 core builds offline + fresh honest comparison | reproduction table, confirmed hashes |
| B | Run the full differential + Surfpool regression vs current candidates | pass/mismatch tally across all suites |
| C | Dependency byte-level closure: Metaplex `Utilize` + ATA recipe | genuine recovery evidence |
| D | Localnet SDK-integration readiness | runnable localnet + safe-flow matrix |

_This report distinguishes observed evidence from unresolved work throughout. A
handler "implemented" means bounded differential coverage, not proven whole-binary
or exhaustive-input equality._
