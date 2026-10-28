# Lane mayhem-b: Mayhem sweep bodies and sell side

Parallel-lane research packet for the Mayhem program (`evidence/original/mayhem/deployed.so`).

- **Windows:** O0075 and O0076 (the admin and trader sweep handlers), O0079 (AMM Sell), O0082 (Legacy Sell) and O0084 (SellV2).
- **Parent:** `research/mayhem-quotes-current-recovery-20261027`.
  - 432/441 normalized, 100 raw-local.
  - Stripped `73dff97e…`, symbols `440b9281…`.
- **History:** `PROGRESS.md` holds the findings, residuals and negative controls.

## Latest checkpoint: `checkpoints/cp4-q04-o0075/` (O0075 gained, 433/441)

| | parent (432) | cp3 | cp4 |
|---|---|---|---|
| normalized / raw-local windows | 432 / 100 | 432 / 100 | **433 / 100** (`O0075` gained; no losses) |
| positive direct edges / Source records | 4,314 / 456 | 4,314 / 456 | 4,363 / 467 |
| sweep differential (692 cases), non-compute log differences | 58 | 0 | 0 (0 mismatches) |
| 14 trade suites (6,636 cases) | 0 / 0 | 0 / 0 | 0 mismatches, 0 normalized log differences |
| stripped ELF | `73dff97e…` | `352328e2…` | `c1f25d01e61fcfb93f9068ef9a61566a9fd31b61eb37a8d745ca7e49948f5b31` |
| symbols ELF | `440b9281…` | `b278b298…` | `73c28d5e51d16b21868ed975993aaca51ce49ef024ca9f3afbafeaa3c0306e2e` |

### Source changes versus the parent

The changes are in `overrides/` and `source.patch`. Three files change:

- **`src/lib.rs`:**
  - `sweep_fees` and `sweep_fees_admin` delegate to `instructions::fee_recipients`.
  - `SweepEvent` and the old shared `sweep_remaining` loop are removed.
  - The file stays at 488 lines.
- **`src/instructions/fee_recipients.rs`:**
  - `SweepEvent` is at line 13. The trader cap helper `sweepable` is at 205-211.
  - The sweeps are methods: `impl crate::SweepFees { fn sweep }` (264-312) and `impl crate::SweepFeesAdmin { fn sweep }` (340-384). The handlers are at 397 and 429.
  - **cp3** (`edits/q03_columns.py`) changes only whitespace and line placement. It puts every sweep panic site at the original line:column:
    - 276:84, 296:86, 353:84 and 368:86 for `checked_add(..).unwrap()`;
    - 358:37 for the admin lamport subtraction.
  - **cp4** (`edits/q04_o0075.py`) makes two changes for the admin path:
    - The handler takes its accounts reference before the length check: `let accounts = &*ctx.accounts;` on line 398, with `require!` on 399 and `accounts.sweep(..)` on 400.
    - The admin sweep binds the three account infos it uses in the loop before the loop, in this order: `admin`, `admin_quote_ata`, `token_program`, each via `.as_ref()`. They share the `let mut total` line.
- **`src/state.rs`:** `sell_amounts` uses the zero-check idiom `checked_sub(..).and_then(|d| if d == 0 { None } else { Some(..) })`.

### Why cp4 closes O0075

The cause was established with `llc` on rustc's own IR (`tools/prehdr.py`, `tools/irexp/`), before any source search:

- **Accounts pointer in the entry block.** With `ctx.accounts` loaded in the entry block, ISel sees the accounts pointer as a cross-block value. The pre-RA list-ilp scheduler then no longer favours the account-field loads over the `ctx.remaining_accounts.ptr` load. The remaining pointer moves from first to last, matching the original, and the diff drops from 8 instructions to 4.
- **Field-load order.** The scheduler emits the three hoisted field loads in reverse IR order. The original order is token_program, quote_ata, admin, so the IR must hoist them as admin, quote_ata, token_program. The pre-loop bindings produce exactly that order, which leaves 0 differences.
- **Exhaustive check.** All 24 IR orders were tested. Only one is exact: remaining pointer first, then 600 (admin), 160 (admin_quote_ata) and 616 (token_program), with the accounts pointer defined in the entry block.

## Verify

```
python -B research/claude-mayhem-b-20261027/verify.py            # newest checkpoint
python -B research/claude-mayhem-b-20261027/verify.py --checkpoint cp3-q03-sweep-columns
```

`verify.py` uses only the standard library. It passes with `HOME` set to an empty directory, and it checks:

- the manifest;
- the parent source, rebuilt from the committed packet chain (67 files);
- `overrides` and `source.patch`;
- the gzipped ELFs against the build result, with no `Stack offset` warning in the build stderr;
- window progress against the parent symbols, using `progress.compare` from the initializer packet;
- the runtime receipts. It recomputes the sweep log comparison, and checks that the trade summary is bound to the candidate digest.

The full trade reports (about 700 MB per run) are not committed. `runtime/summary.json` records each one's sha256.

## Rebuild

The mixed host/target recipe is the same as `research/mayhem-provider-sharing`:

- Mac v1.54 rustc;
- the 26 Linux v1.54 sbpf target files, hash-checked;
- the qualified `ordered.ld` linker script;
- `-Zremap-cwd-prefix=` and the two `--remap-path-prefix` flags.

```
python3 claude-mayhem-work/sbf_lock.py --slots 6 --name sbf -- \
  python3 claude-mayhem-work/mayhem-b/build/build_lane.py LABEL ROOT TARGET_NAME
```

`ROOT/programs/mayhem` holds the 67 source inputs. The tools in `tools/` are the lane's working copies. Their absolute paths point at the durable lane directory, `/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b`.

Runtime checks:

- `tools/run_trades.py ROOT CANDIDATE OUTDIR` runs the 14 trade suites.
- `scripts/mayhem_validate_sweeps.py` runs the sweep differential.
