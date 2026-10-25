# Fees initializer recovery: static body and genuine signed history

`initialize_fee_config` is now statically mapped, and **two authentic successful initialization transactions have been recovered with intact, cryptographically verified admin signatures**. The initial static phase executed no transactions and edited no main source. The subsequently authorized scratch implementation and local replay are documented in `IMPLEMENTATION.md`.

The captured initializer creates a **2,512-byte** FeeConfig account, writes its canonical PDA bump and the fixed admin key, then emits `InitializeFeeConfigEvent` through both a log and self-CPI. It does not populate fee schedules or nonzero fees. The currently captured executable is later than the historical transactions: historical success is evidence for the signed inputs and their recorded execution, not by itself a comparison against the captured original or a reconstructed candidate. The later local comparisons are recorded separately in `IMPLEMENTATION.md`.

## Inputs and locations

- Original: `evidence/original/pump_fees/deployed.so`, 948,944 bytes, SHA-256 `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.
- Official captured IDL: `evidence/upstream/pump_fees.json`; selector `3ea214857941911b`, no arguments.
- Wrapper: ELF file offsets `0x96b90..0x97008`.
- Account parser: `0x48378..0x49bd0`; initialization helper `0x49bd0..0x4b480`.
- Handler: `0x14308..0x14e38`.
- Exit serializer: `0x5e80..0x6260`.

Function ends are inferred from internal call entries; the reviewed extracts also terminate in an exit or terminal allocation-error call. `static-evidence.json` records original-byte hashes, 19 supporting byte windows, the IDL subset, and all direct internal call targets for the selected functions. The extractor excludes relocated R10 syscalls from internal-call inference. Rendered disassembler branch labels are offset in this input; the appended `branch` annotations use the raw instruction displacement and actual file offset.

## Accounts and validation order

Account order matches the IDL:

1. `admin`: ordinary Signer, writable, fixed address `8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8`.
2. `fee_config`: initialized writable FeeConfig, payer `admin`, space **2512**, canonical PDA `[b"fee_config", config_program_id.key()]` under Fees.
3. `system_program`: `Program<System>`.
4. `config_program_id`: unchecked namespace key. No direct owner/executable restriction is visible in this parser.
5. `event_authority`: canonical `[b"__event_authority"]` PDA.
6. `program`: unchecked account consumed by the generated event-CPI context; the actual self invocation still depends on a valid program account.

`admin` signer validation is first: `0x483b0 → 0x10e30 → 0xacb80`; the final helper checks AccountInfo byte `0x28` and returns Anchor **3010** if false. The parser then consumes the remaining accounts, validates the System program, obtains Rent, finds/checks the FeeConfig PDA, and invokes the account-creation helper. Canonical PDA mismatch is **2006** (`0x48c70`), attached to `fee_config`.

The creation helper uses ordinary Anchor `init` behavior, not `init_if_needed`: it branches on target lamports, calls System create-account for a zero-lamport account, and uses the rent top-up/allocate/assign path for an already funded account. Both rent computations (`0x49c28`, `0x49d98`) and create-account space (`0x4a3d0`) use **0x9d0 = 2512**. The init payer/target equality guard constructs **4101** (`TryingToInitPayerAsProgramAccount`, `0x4a588`). Once assigned to Fees, the helper calls the unchecked FeeConfig deserializer at `0x47d0`.

After initialization, the parser checks `fee_config` writable and rent exemption, then `admin` writable. These produce **2000** and **2005** where shown. Only afterward does the fixed admin comparison run (`0x49618`, key bytes at `0xc36e0`). The mismatch path passes custom enum index 1 to `0x46c58`, which adds 6000: **6001 / InvalidAdmin**, with compared public keys. It is not the generic Anchor address error. Event-authority seeds are checked last, yielding **2006** on mismatch. A source reconstruction should retain this generated constraint ordering; moving the admin check into the handler or before initialization would change failing-path logs/errors.

System CPIs occurring before a later validation error do not establish a persistent state change: transaction failure rolls those mutations back. This is an ordering observation, not an authorization bypass finding.

## State and events

Handler context memory is not Borsh layout. The handler at `0x14318` reads the computed FeeConfig bump from Context memory `+0x20` and writes it to the FeeConfig Rust field at `+0x80`. It then copies `admin.key()` into FeeConfig memory `+0x30..+0x50` (`0x14330..0x14378`). There are no subsequent fee-state writes; remaining stores prepare event serialization and CPI arguments.

The unchecked deserializer removes the 8-byte discriminator and calls `0x3ecf0`, whose minimum data check is 2504 bytes after the discriminator. For the new 2512-byte allocation it parses bump/admin/flat fees and the fee-tier vector from zero-initialized account data. The legacy-length branch explicitly initializes stable tiers to an empty vector and exotic fees to zero (`0x3eee0..0x3ef08`). The exit serializer writes the discriminator, bump, admin, flat fees, both vector lengths/bodies, and exotic fees.

Thus the **static prediction for a freshly created successful account**, not yet a locally observed result, is:

- bytes 0..8: `8f3492bbdb7b4c9b`;
- byte 8: canonical bump;
- bytes 9..41: fixed admin key;
- bytes 41..65: three zero u64 flat-fee values;
- bytes 65..69 and 69..73: zero-length fee/stable-tier vectors;
- bytes 73..97: three zero u64 exotic-fee values;
- remaining allocation: zero.

`Clock::get()` runs after the two field assignments and its error propagates. `InitializeFeeConfigEvent` is an 80-byte log payload: discriminator `598af4e60a38e27e`, signed i64 timestamp, admin pubkey, FeeConfig pubkey. Self-CPI prepends `e445a52e51cb9a1d`, making 88 instruction bytes, with one event-authority account and the program's own event-authority signer seeds. Both payloads match the historical records exactly.

A source-equivalent starting point is:

```rust
#[event_cpi]
#[derive(Accounts)]
pub struct InitializeFeeConfig<'info> {
    #[account(mut, address = pubkey!("8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8") @ FeeError::InvalidAdmin)]
    pub admin: Signer<'info>,
    #[account(init, payer = admin, space = 2512,
              seeds = [b"fee_config", config_program_id.key().as_ref()], bump)]
    pub fee_config: Account<'info, FeeConfig>,
    pub system_program: Program<'info, System>,
    /// CHECK: key is only the PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}

pub fn initialize_fee_config(ctx: Context<InitializeFeeConfig>) -> Result<()> {
    ctx.accounts.fee_config.bump = ctx.bumps.fee_config;
    ctx.accounts.fee_config.admin = ctx.accounts.admin.key();
    let event = InitializeFeeConfigEvent {
        timestamp: Clock::get()?.unix_timestamp,
        admin: ctx.accounts.admin.key(),
        fee_config: ctx.accounts.fee_config.key(),
    };
    emit!(event);
    emit_cpi!(event);
    Ok(())
}
```

This is an implementation blueprint, not a compiled or behavior-verified replacement. Reuse the existing recovered FeeConfig deserializer so the historical allocation is accepted. The event type must match the IDL field order above. Adding explicit nonzero default fees or allocating 4097 would contradict the evidence.

## Genuine signed initialization evidence

A finalized `getSignaturesForAddress` read for the fixed admin returned 289 records, including 18 successful transactions. Read-only `getTransaction` requests recovered the following two direct Fees initializer transactions:

| Namespace | Slot | Signature | Bump |
|---|---:|---|---:|
| Pump | 363106032 | `2Wq4uEecMJaT8wqKQWb4M1CiBBbAyFgAN9qhDNxpu4Na4JURH9oLZV9kWnsSccwWVb6iY7YxQCSUZu2qMF7qkWuu` | 253 |
| AMM | 363106036 | `3hfUzGg3UN2BBoXPjCHPigW3d1r3pewkK9aYvBrJysYVFncnZe59ELwVJxDivwr2Db9hjQEQxHdGK9tktntsD3hP` | 255 |

Saved complete RPC records: `transactions/admin-success-81.json` and `transactions/admin-success-80.json`. Each contains the unmodified 313-byte version-0 transaction in base64, metadata and logs. `analyze_history.py` verifies the Ed25519 signature, the fixed signer, the sole instruction/selector, all six account positions, both canonical PDAs, no address-table lookups, the System CreateAccount inner instruction, both event encodings and lamport changes. Results and exact SHA-256s are in `historical-init-evidence.json`.

Both targets had zero pre-balance, and each System CPI created a Fees-owned account of **2512 bytes with 18,374,400 lamports**. The admin balance fell by this amount plus a 5,000-lamport transaction fee. The Pump initialization timestamp is 1756397479; the AMM timestamp is 1756397481. Historical account data is not returned by this RPC, so its zero-default state is inferred from the current captured code and normal fresh-account semantics, not falsely presented as captured post-account data.

For a later isolated offline replay, preserve each signed message and signature byte-for-byte. Supply its original blockhash through the local bank's historical replay support, keep signature verification enabled, and use the recorded signer balance/Clock and absent target state. Do not replace the admin key, rewrite signed account metas, mark an unsigned account as signer, or use a patched executable. The namespace program is read-only here; the later captured Fees program is the execution subject, not a claim to reproduce the historical deployment. No broadcast is needed or authorized by this lane.

## Reproduce and remaining gaps

From the repository root:

```sh
work/test-env/bin/python repro/pump_fees/initializer-history/summarize.py
work/test-env/bin/python repro/pump_fees/initializer-history/analyze_history.py
```

`summarize.py` reads the unchanged original and either the existing `work/disassembly/pump_fees.asm` or the bundled byte-checked selected assembly excerpts; it regenerates selected extracts and hashes. `analyze_history.py` needs only the two saved RPC records, `solders`, and the standard library; it makes no network call. The read-only discovery used finalized `getSignaturesForAddress` for the fixed admin, then `getTransaction` with base64 encoding for successful entries. Only the two relevant complete RPC captures are published; unrelated transaction history is excluded. Re-fetching is unnecessary for verification.

The initial handoff called for a compiled scratch source, exact signed-message replay against original/candidate, state/balance/event comparison, and ordinary-signed rejection cases. Those scratch checks are now recorded in `IMPLEMENTATION.md`; integration into the complete main candidate and its regression checks remain with the parent. These two historical successful cases cannot establish all initializer error behavior or whole-program byte equality. Exact historical source/compiler, full reconstruction and security-audit completion remain unresolved.
