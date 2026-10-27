# Mayhem shared errors and typed Sell CPI

Evidence for the reconstructed `repro/mayhem/shared-errors-typed-cpi` candidate. This is a reconstructed Rust improvement, not canonical promotion or complete binary identity. The original20-error-only `publication-errors` packet is unchanged.

The selected baseline's177admitted normalized matches,46admitted raw matches and58all-row literal matches are retained. Six additional complete original bodies match strictly normalized instructions and relocation patterns: the shared error name, Display and Debug helpers, and typed Sell CPI, account-meta and account-info helpers. The newly admitted token-burn helper already matched baseline and is not a source-caused gain. Explicit expanded scope:191admitted,184matched,7unmatched,250opaque. Twelve semantically opaque windows are literal-equal both before and after; literal equality and semantic admission are separate axes. The stopped initializer stays excluded.

## Source and compile inputs

`sources/baseline` retains the exact14input selected tree. `sources/recovered` retains all15inputs including the real `idls/pump.json` compiler input. Every file is losslessly gzip-compressed, including original whitespace. `source-inputs.json` pins uncompressed names/hashes; `source.patch.gz` shows the complete difference. No current dirty canonical source is used.

A unified Rust enum preserves all16previously known names/messages/numbers and adds four names/messages recovered from original indexed data plus dispatch:9PumpCpiMathOverflow,13PumpSwapCpiSlippage,18InvalidBump and19SweepFeeRateLimit. All20values are checked independently against original tables and Display dispatch in the verifier. The recovered Burn source path and original source positions are preserved through documented source layout and a root-crate path remap. This does not recover the full Burn body.

The typed Sell CPI is produced by `declare_program!(pump)`. Its IDL is a documented projection of saved `evidence/upstream/pump.json`: retain address/metadata and the entire sell instruction verbatim; omit other top-level sections. `builds/recovered/idl-provenance.json` and `macro-input-bindings.json` bind the upstream input, projected input, and installed macro sources. The14field order, signer and writable flags are independently checked against original instruction bytes. Existing typed account values are mapped to those IDL fields; bonding_curve_v2 and buyback_recipient remain the same two remaining accounts.

Original CPI has an owned744-byte CpiContext:24-byte remaining Vec,14AccountInfos of48bytes,16-byte signer slice and32-byte program ID. It allocates serialization capacity256, emits the exact discriminator and two u64s, builds core metas/infos, appends the remaining values, invokes signed and drops owned values. Complete original bodies and admission evidence are retained losslessly in `legacy-sell-cpi-*.gz`. The bounds remain inferred historical next-entry boundaries, not original debug symbols.

Baseline599784-byte ELF SHA256: `ca5d4f54b14e2f67c4eca56fcac29b54801906cecf23c463801916fd9d6b6621`. Recovered624240-byte ELF: `46b6a660c35868ac3821bc3edac5817e6ceb640679e5e9538e6004dc1a5e31e8`. Recovered symbols: `2e5acc7beed21099fd4154195a93259c9f1e9f17ec18c007faf67b93a9f51ec3`. Original777408-byte ELF: `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.

The baseline reproduced both selected outputs before controls. Actual commands, logs, input hashes and SDK/private dependency provenance are retained. Official Darwin arm64SDKv1.54, fixedv1.52strip and a private dependency copy were used; source and executables remained unchanged during compilation. No emitted byte patches or artificial assembly/linker controls were applied.

## Runtime and remaining gaps

The unchanged trusted legacy Sell differential passes396cases/792signed transactions:134successful and262rejected pairs, with complete compared state, error, event, inner instruction and return data equality. Independent verification checks all792signatures,268successful quote/CPI and event/state checks and524rollback checks. Four normalized-log differences remain: interval_overflow, retained10001, retained65535 and quote_extreme_1_0_1. Those panic/overflow log differences are explicit and retained.

The prior three-family Burn regression passes12signed transactions, including second-burn6004errors with continued VM state, and an independent saved-receipt verifier. No stopped initializer or privileged path was executed. All804signatures are independently checked by the default packet verifier; no compiler, VM, network or RPC is needed to verify the saved packet.

Legacy Sell remains unmatched: original12992bytes/50calls/149branches versus recovered8712bytes/82calls/114branches. Seventeen candidate out-of-line AccountInfo clones versus one original clone and two candidate typed-CPI sites versus one original site remain. Burn and the other five admitted trade handlers also remain unmatched. These results establish neither full-handler nor whole-ELF equivalence.

```sh
python3 -I -B repro/mayhem/shared-errors-typed-cpi/verify.py
python3 -I -B repro/mayhem/shared-errors-typed-cpi/test_verify.py
```

The verifier locates the repository dynamically, so these commands can target the proposed public directory after review. It requires the pinned repository parent artifacts and Python environment with solders. `crypto=False` is only a static subset for mutation tests and does not claim signature verification. Tests cover extra/changed source, changed IDL, corrupted instruction with outer artifact hashes repinned, altered error mapping, forged metas, false runtime differences and missing log differences. Source names, uncompressed hashes, artifact hashes, all-body measurements and runtime outcomes remain strict.
