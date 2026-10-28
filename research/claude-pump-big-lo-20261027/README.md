# Main Pump: lane pump-big-lo

This lane recovers ordinary Rust source for large unmatched main-Pump handler bodies. Its range is the original windows of at least 3,000 B that start below 0x3a7b8, from `claude-pump-work/targets/big-lo.json`. The coordinator also assigned 0x3a7b8 `set_metaplex_creator` to this lane. **Whole-ELF identity remains false.**

- **Baseline:** g04, the Pump session's genuine composite (806 normalized / 165 raw, unstripped `5a13b87f…`). Rebuilt here bit-for-bit with `claude-pump-work/harness/fastbuild.py` (identity recipe).
- **Scoring:** `harness/score.py --baseline base/g04/inventory.json`. Only gains beyond 806 count.
- **Patches:** every patch applies with `git apply -p1` inside a copy of `base/g04/pump`.

## Results so far

**Current: g04 806 → 809** (+0x38fc0, +0x3a7b8, +0x746a8; no losses). On L06 the patches give 899 → 902.

| window | handler | state | where |
|---|---|---|---|
| 0x38fc0 | `set_creator` (6,136 B) | **matched** | `gain01-set_creator/` |
| 0x3a7b8 | `set_metaplex_creator` (3,552 B) | **matched** | `gain01-set_creator/` |
| 0x746a8 | `admin_update_token_incentives` (3,168 B) | **matched** | `gain02-incentives/` |
| 0x37e08 | `migrate_bonding_curve_creator` (4,536 B) | body fixed; only Source lines 46/53 differ (layout integrator) | `body-only/0x37e08-migrate_bonding_curve_creator.patch` |

### 0x37e08: the body form

The original keeps `bonding_curve.creator` and the event's `new_creator` tied to two separate `sharing_config.key()` reads, both made after the curve write, so the event struct is materialised with two key copies:

```rust
let old_creator = a.bonding_curve.creator;
a.bonding_curve.creator = a.sharing_config.key();
let event = MigrateBondingCurveCreatorEvent { timestamp: Clock::get()?.unix_timestamp, mint: a.mint.key(),
    bonding_curve: a.bonding_curve.key(), sharing_config: a.sharing_config.key(), old_creator,
    new_creator: a.sharing_config.key() };
emit!(event); emit_cpi!(event);
```

g04 instead took `let new_creator = a.sharing_config.key()` before the write.

With only this change on g04 (`body-only/0x37e08-evidence/`, unstripped `71c98aa8…`), all 4,536 bytes match except the two `stw [r10-0x158], <line>` immediates. Those are 0x2e/0x35 in the original and 0x10 in the build. Score: 806/165, no losses, runtime_valid, no stack-offset warnings. Placing the two lines is the layout integrator's job.

## Tools (`tools/`; absolute paths to the shared work roots)

| tool | what it does |
|---|---|
| `trial.py` | Builds one trial tree with fastbuild and scores it against g04. |
| `status.py` | Prints the per-window state of the lane targets. |
| `rank.py`, `ident.py` | Rank windows by candidate similarity; list a window's calls and strings. |
| `irbuild.py` | Emits the crate's optimised IR (`cargo rustc -- --emit=llvm-ir,link`). The functions in its ELF are byte-identical to the fastbuild output. |
| `llx.py` | Extracts one function and other defines become declares. Runs `llc` (v1.44: sbf, generic, `+store-imm,+jmp-ext`, O3, pic) and compares with the original window, masking call and lddw immediates. It reproduces the build's function bytes exactly. |
| `frame.py` | Prints the frame-object table after prologue/epilogue insertion. |

`fastbuild.py` takes one of the six shared `sbf` slots in `claude-pump-work/locks` itself. These are the same lock files `sbf_lock.py --name sbf` uses, so builds are not wrapped a second time.
