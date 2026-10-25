# Parallel agent dispatch — 2026-10-25

Four subagents launched concurrently. **Shared integrity rules (all agents):**

1. Captured originals under `evidence/` are comparison inputs **only** — never build
   inputs. Never copy original bytes into a candidate. A hash match without a clean
   source build proves nothing.
2. **No brute-force** over compiler versions / flags / paths. **No binary patching.**
   **No synthetic-signer bypass.** These are repo rules; violating them is fabrication.
3. **STOPPED lanes stay stopped** — do not attempt or "work around":
   `pump.admin_update_token_incentives`, `pump.claim_token_incentives`,
   `pump.set_mayhem_virtual_params`, `mayhem.initialize_mayhem_state`,
   and the `pump.sell_v2` transfer-fee corrective probe.
4. Report failures honestly. A negative result with evidence is valuable; a faked
   positive is not. Distinguish observed evidence from inference everywhere.
5. Write all output under `work/reconstruction-review-2026-10-25/<agent>/`. Use the
   scratchpad for heavy build temp. Do **not** commit, push, or edit tracked source
   outside your output dir unless the brief says so. Network is available.

## Build recipes (current candidates)

| Program | manifest | tools | artifact (.so) | committed candidate |
| --- | --- | --- | --- | --- |
| pump | programs/pump/Cargo.toml | v1.44 | pump_recovered.so | repro/pump/tokenkeg-two-curve-fortyeight/candidate.so |
| pump_amm | programs/pump-amm/Cargo.toml | v1.44 | pump_amm_recovered.so | repro/pump_amm/create-config-shared-methods-v144/candidate.so |
| pump_fees | programs/pump-fees/Cargo.toml | v1.44 | pump_fees_candidate.so | repro/pump_fees/donation-event-account-v144/pump_fees_candidate.so |
| mayhem | programs/mayhem/Cargo.toml | v1.52 | mayhem_recovered.so | repro/mayhem/twentyfour/mayhem_recovered.so |

Build helper: `PYTHONPATH=scripts python3 scripts/build_partial_candidate.py --manifest <m> --program <p> --artifact-name <a> --tools-version <v> --output <dir>`.
Offline resolution needs a warm cargo cache; if a build fails on a missing crate,
warm it once with `cargo build-sbf --manifest-path <m> --tools-version <v> --sbf-out-dir <tmp>` (online), then rerun the helper.

## Agents

- **A — reproduction + fresh comparison** → `A-reproduction/`
- **B — full differential/Surfpool regression** → `B-differential/`
- **C — dependency byte closure (Metaplex Utilize, ATA)** → `C-dependencies/`
- **D — localnet SDK-integration readiness** → `D-sdk-localnet/`
