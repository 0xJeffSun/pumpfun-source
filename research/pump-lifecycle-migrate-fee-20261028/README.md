# Pump migrate fee boundary: 1011/1035 normalized

The L33 legacy migration handler now matches original window `0x3fb70` in all 5440 bytes after the existing official relocation normalization. This research packet changes only `migrate.rs`; it does not update the maintained source or global counts.

The handler binds the already-migrated predicate before testing it and calls a real `#[inline(always)] pay_migration_fee` helper. Its parameters are `&Account<BondingCurve>` and `&UncheckedAccount`. Keeping the authority typed delays conversion to `AccountInfo` until after the curve debit, restoring the original load boundary, return block placement, and register allocation. The helper executes the same checked debit followed by the same checked credit and is called by the actual handler. There is no new unsafe code, synthetic padding, binary patch, unused matching body, or normalizer change.

| Build | Normalized | Raw | Unmatched |
|---|---:|---:|---:|
| Published L33 host cohort |1010|168|25|
| Unchanged L33 native control in this packet |1010|166|25|
| This native candidate |**1011**|166|24|

The gain is `0x3fb70`; normalized and raw losses versus the native control are empty. Raw counts are compared within the same native host cohort. The candidate body is at `0x4efd8`; whole-ELF equality remains false.

`source/` is the complete Cargo workspace actually compiled. Its profile is in the workspace root and the main crate is at `programs/pump`. `source.patch` is the exact logic-source diff against L33's archived crate. L33's existing synthetic Source positioning and layout-pad blocks are inherited unchanged; this change neither moves an existing Source site nor introduces a placement-only match. The helper is appended after existing declarations and contains no new Source error sites.

The clean confirmation build rebuilt **both** `pump-token-ext` and `pump-recovered` using the native Linux v1.44 SDK, `sbpf-solana-solana`, the unchanged physical-source wrapper, locked offline dependencies, and `-Zremap-cwd-prefix=`. It reproduced the discovery ELF exactly. `build-record.json` binds the exact Cargo command/environment, before/after source hashes, compiler tools, all SBPF standard libraries, and reused external dependency artifact hashes; `compiler-commands.json` preserves the two actual rustc commands. `rebuild_record.py` is the session controller (its absolute workspace paths are recorded, so adapt them when replaying elsewhere).

Unstripped SHA256: `43f2ea0fd11fe9613f877d524ba846461bcd5a207fa8a2bf3078fe525deec783`.
Stripped candidate SHA256: `2faf3b53718e4ab7fdc052092bec4ae30bca4f0ba09b974e0faf02a367f94f63`.

Static checks verify that the actual Anchor migrate dispatcher calls this function and all 43 outgoing direct callees match their corresponding original normalized bodies. The unchanged captured-loader legacy migration differential passes **228 signed paired cases**, with 0 state/error/event/CPI/return mismatches, 0 diagnostic mismatches, and0 ordered-log mismatches after excluding compute-consumption lines. That report is bound to this exact unstripped ELF; stripping removes symbols without changing executable code. Full 44-suite composition/qualification is left to the coordinator.

```sh
python3 research/pump-lifecycle-migrate-fee-20261028/verify.py
```

`control/` preserves the unchanged L33 native ELF, complete-window census, and initial Cargo command/log. Its source is exactly the referenced immutable L33 archive under the same workspace transformation; only the accepted candidate has the stronger before/after clean-build receipt.
