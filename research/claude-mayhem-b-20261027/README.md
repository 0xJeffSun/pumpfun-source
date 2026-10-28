# Lane mayhem-b: Mayhem sweep bodies and sell side

Parallel-lane research packet for the Mayhem program (`evidence/original/mayhem/deployed.so`).

- **Windows:** O0075 and O0076 (the admin and trader sweep handlers), O0079 (AMM Sell), O0082 (Legacy Sell) and O0084 (SellV2).
- **Parent:** `research/mayhem-quotes-current-recovery-20261027`.
  - 432/441 normalized, 100 raw-local.
  - Stripped `73dff97e…`, symbols `440b9281…`.
- **History:** `PROGRESS.md` holds the findings, residuals and negative controls.

## Latest checkpoint: `checkpoints/cp3-q03-sweep-columns/`

| | parent (432) | cp3 |
|---|---|---|
| normalized / raw-local windows | 432 / 100 | 432 / 100 (no losses of any kind) |
| sweep differential (692 cases) | 0 mismatches, **58** non-compute log differences | 0 mismatches, **0** log differences |
| 14 trade suites (6,636 cases) | 0 / 0 | 0 mismatches, 0 normalized log differences |
| stripped ELF | `73dff97e…` | `352328e2c316255d3c3bd208c94c1abe2c16530b283a0e7faffcfdfc74795587` |
| symbols ELF | `440b9281…` | `b278b298f5816d16ca469dab30e359d3ddaa6c14ebfe4228426cc4ef7ecc695e` |

### Source changes

The source changes are in `overrides/` and `source.patch`, against the parent. They touch three files:

- **`src/lib.rs`:**
  - `sweep_fees` and `sweep_fees_admin` delegate to `instructions::fee_recipients`.
  - `SweepEvent` and the old shared `sweep_remaining` loop are removed.
  - The line count stays at 488.
- **`src/instructions/fee_recipients.rs`:**
  - `SweepEvent` is at line 13.
  - The trader cap helper `sweepable` is at lines 205-211.
  - The sweeps are methods: `impl crate::SweepFees { fn sweep }` (264-312) and `impl crate::SweepFeesAdmin { fn sweep }` (340-384).
  - The handlers are at 397 and 429. Their `require!(remaining_accounts.len() == 16)` checks sit at lines 399 and 431.
  - The cp3 step (`edits/q03_columns.py`) changes only whitespace and line placement. It puts every sweep panic site at the original `line:column`:
    - 276:84, 296:86, 353:84 and 368:86 for the `checked_add(..).unwrap()` calls;
    - 358:37 for the admin lamport subtraction.
- **`src/state.rs`:** `sell_amounts` uses the `checked_sub(..).and_then(|d| if d == 0 { None } else { Some(..) })` zero-check idiom. It is shared by Legacy Sell and SellV2.

The O0075 body is at the original 8,008 bytes with an exact frame. Only 8 preheader instructions differ (load order).

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

The full trade reports (about 700 MB) are not committed. `runtime/summary.json` records each one's sha256.

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
