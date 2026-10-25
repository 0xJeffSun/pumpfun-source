# AMM accumulator initialization: defer account mutation until Clock succeeds

The isolated proposal moves one existing assignment in `init_user_volume_accumulator` below the `InitUserVolumeAccumulatorEvent` construction. The original obtains Clock successfully before writing the accumulator's user field. Current source writes that field before obtaining Clock. The change restores this observed operation order without changing the event, account definitions, emitted values, or any other handler.

`assignment-after-clock.patch` is the minimal actionable diff. `before/` and `proposal/` contain exact full before/after `programs/pump-amm/src/lib.rs`. Main source was not edited. No compiler, VM, transaction, signer, network, or new runtime fixture was used.

## Exact evidence

The original SHA-256 is `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`. Current candidate is `2a8a69f1e2f91f470b9742fe1c7caa129fa9ea126d54588473e8e3d490b7e706`. `input-bindings.json` also pins source, symbols, captured IDL, state declarations and the pass-07-referenced complete residual ledger. The latter's original row `0x5d090..0x5dc20` and candidate symbol range `0xc2928..0xc34c0` are retained in `ledger-excerpts.json`, along with the original wrapper and both Clock helper rows. Ledger original boundaries are inferred entry windows, not recovered historical symbols.

Instruction attribution is independent of a guessed nearby string: the captured IDL discriminator is `5e06ca73ff60e8b7`. The original loads it at `0xdbef8`, compares at `0xdbf08`, and the encoded true target is `0xdc938`. At `0xdc988` it calls wrapper `0xe6710`. That wrapper calls `0x5d090` at `0xe68c8`. The exact bytes and complete original handler/wrapper ranges are saved in `instructions.json` and the corresponding `.asm` files. Objdump's printed `.text+...` labels are section-relative; all addresses in this report are absolute ELF text addresses computed from instruction bytes.

Original handler:

- `0x5d150` calls `0x106e38`, the Clock getter. The current getter at `0xf7ad8` is named `solana_sysvar::clock::<impl Sysvar for Clock>::get` by retained symbols and is a complete normalized ledger match for `0x106e38`.
- `0x5d158` reads the result tag; `0x5d160` branches on failure to `0x5d2e8`. This path converts the error and `0x5d350` branches to result return at `0x5dbf8`, bypassing the user stores.
- On success, `0x5d168..0x5d1e0` copies payer/user event fields to the event buffer. `0x5d1e8` loads the timestamp.
- `0x5d1f0` reloads the same user-key pointer used at `0x5d0f8`. `0x5d1f8..0x5d210` loads its four words. Only then do `0x5d218`, `0x5d220`, `0x5d228`, and `0x5d230` write those words into the accumulator representation. They precede emission.

Current candidate:

- `0xc2940..0xc2968` loads the user key and its four words.
- `0xc2970`, `0xc2978`, `0xc2980`, and `0xc2988` write those words to the accumulator representation.
- Only afterward, `0xc2a38` calls Clock helper `0xf7ad8`; `0xc2a48` checks failure.

These are in-memory layout offsets, not serialized account offsets. The proposal does not encode any inferred offsets. It retains typed field access. The current source makes the same ordering explicit: the assignment precedes the struct literal whose timestamp expression uses `Clock::get()?`. Moving the assignment immediately below that literal ensures Clock errors precede the mutation, while successful execution still assigns before either event emission. The existing clone is deliberately outside this change.

## Validation and limitations

`python3 -B work/amm-residual-next/verify.py` passes. It rechecks all original/current input hashes, the exact one-statement diff, all retained raw instruction windows, encoded dispatch/call/error targets, and user-store instructions. It performs no build or runtime execution. `manifest.json` seals package files except itself.

This is an evidence-supported source-order correction, not proof of historical Rust spelling or byte equality. A compiler can choose different registers/layout/lowering, and the original source syntax is not uniquely recoverable. No post-patch executable exists and no shrinking/matching claim is made. In normal successful execution the observable final account and event values should be unchanged. Solana transaction rollback also means this analysis does not claim that a Clock failure would commit the old intermediate mutation; the difference established is the ordering of operations on the handler error path. No new failure fixture or feasible Clock-failure environment was established.

The 310 unmatched original windows, other recursive/data/diagnostic gaps, scalar specialization, authentic `create_config` success, and whole ELF identity remain unresolved. Existing acceptance counts and all stopped scopes remain unchanged. This proposal concerns `init_user_volume_accumulator`, not `create_config`, and uses no signer substitution or initializer-success replay.
