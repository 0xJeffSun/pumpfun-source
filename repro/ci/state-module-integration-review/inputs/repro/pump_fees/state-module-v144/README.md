# Fees state-module source checkpoint

The clean main build places four byte-preserved account declarations in `programs/pump-fees/src/state.rs`, with public reexports from their former modules. BuybackVault, SocialFeePda, DonationFeePda and FeeProgramGlobal now reproduce the original checked codecs' filename literals. The accepted inline Pump Global context, dependencies, lock, profile and build flags remain unchanged. This is a source-fidelity improvement with the existing 31-handler count, not whole-program source recovery.

The 768,024-byte main ELF has SHA-256 `d5b8f885942ee0d54519e4330941b5e034cfcdcf271eb286d0b4cc81165bee13`. It is byte-for-byte identical to the single scratch candidate that freshly passed all 17,441 existing comparison receipts and the separate ten-step donation sequence. `main-scratch-identity.json` preserves both actual build reports and source maps. Only this program README differs between their 23 source/workspace/IDL input sets. Main runtime execution was not repeated; receipt transfer rests on entire ELF identity. Both scratch and main builds completed once without source, flag or version variants.

## Original-byte evidence and remaining gaps

The four complete checked codec windows total 2,928 bytes. After internal-call and relocation address normalization, each differs only at the historical source-line immediate (+528). Natural declaration lines are 3, 6, 9 and 12, while the original records 50, 113, 135 and 154. No padding, line alignment or source-path fabrication is used. Account-name literals match. SharingConfig remains in donation.rs; its original filename and line still differ.

Including SharingConfig, the five full checked codec windows total 3,672 bytes. All 35 immediate call sites resolve through raw signed operands to 11 unique complete normalized/relocation-matching target bodies. These checks do not establish arbitrary descendants, vtables or relocated-data closure. The accepted inline initializer handler/parser/wrapper, social exit and six Pubkey helper windows also remain supported: ten full bodies, 26 immediate calls and five known literal extents. Raw function bytes and the complete captured original still differ.

The original has 948,944 bytes. The main candidate has 420,108 differing positions in their shared length, first difference at byte 24, and is 180,920 bytes shorter. This layout-sensitive comparison is not a semantic coverage percentage or proof of a unique historical source/compiler/dependency recipe.

## Build and runtime provenance

Compilation used the established Darwin platform-tools v1.44 recipe with an isolated target, SDK and rustup home. The unchanged recorded SDK installer selected v1.52 `llvm-objcopy` for stripping. All 53 SDK sources, four build helpers, 23 actual source inputs, logs and before/after tool hashes are bound. Shared allocated ELF payloads, including `.text`, remain unchanged by stripping. Retained file/phase evidence does not establish a complete process-level invocation trace or unique historical pipeline.

All nine comparison receipt gzip files and `donation-sequence.json.gz` are exposed directly, byte-identical to their frozen scratch archive members. `status-proposal.json` is a complete compatible Pump Fees status entry for the parent's integration; it is not an edit to the central status. It supplies nine validation reports totaling 17,441, the donation sequence, and the authentic-history report/captures. The 18-suite aggregate contributes 17,331 comparisons. Sixty-nine comparisons repeat existing inputs; no new unique cases or handlers are claimed.

Saved verification rechecks 8,644 encoded transaction fields containing 17,204 signatures. These counts are distinct from unique transactions and total aggregate executions. Two genuine historical FeeConfig initializer messages retain their original signed bytes, signatures and runtime signature verification; a stale-blockhash rejection control is retained. They are not historical FeeProgramGlobal initializer messages. Nine malformed external-codec rows retain exact raw AnchorError log equality. Prior Surfpool results remain attached to their prior executable.

The scratch package is frozen inside `scratch-handoff.tar.gz`, with original seal `89f54a19ff7d3846d9ba6189975e1877a2833bbeebfcb10c4997a363489bd671`. Its prebuild source seal, original proposal, corrected analysis history, all fixtures and frozen harnesses remain intact. Historical work paths are retained as records only. The canonical map resolves all 46 harness-origin records to 44 byte-identical published files; current binding checks never require work paths or the historical Darwin runtime binary to be installed.

## Verification

Run `python3 -B repro/pump_fees/state-module-v144/verify.py` for portable saved-evidence checks. The full directory can be copied outside the repository. It verifies source moves, archived inputs, both builds, entire ELF identity, direct receipt copies, full focused static windows and saved signatures. It requires Python with `solders`, and does not build code or replay program transactions.

Run `python3 -B repro/pump_fees/state-module-v144/verify_current_bindings.py --repo .` separately to verify all current tracked source, helper, documentation, runtime and canonical harness files. The new state.rs must be tracked before that check passes. Root's `scripts/verify_recovered_builds.py --program pump_fees` can consume the proposed central status entry directly.

Bounded fixtures and function windows do not establish exhaustive behavior, security coverage, deployment readiness or whole-original equivalence.
