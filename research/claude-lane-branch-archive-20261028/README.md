# Claude lane branch archive (2026-10-28)

The work below was pushed to remote lane branches on 2026-10-27 but never merged. This directory keeps that work so the branches can be deleted.

Each `<branch>/` subdirectory holds that branch's research files that main lacked or had in a different version. Paths are relative to `research/`. `inventory.json` records each branch head SHA, the merge base, and every archived file with its git blob id.

**No existing file on main is changed.** Several live packets on main are sealed by a `manifest.json` (for example `claude-mayhem-a-20261027`), or are pinned by other packets (`amm-event-capture-*` pins `claude-amm-mid-20261027` files). Copying into those packets would break their seals and pins. Files marked `differs-from-main` are the lane's own version. Main's version may be newer: mayhem-a's README and verify.py on main were revised after review.

The archive is research only. Lane edits to `programs/` are left out. Main's current sources already supersede them: the Pump r37/Round40 checkpoints, and the AMM frontier, which has moved well past the 623 frontier these AMM lanes measured on.

| branch | head | new | differs |
|---|---|---|---|
| claude/pump-hi-20261027-latest | 5c9663982 | 59 | 2 |
| claude/pump-lo-20261027-latest | 73389e7fb | 2 | 2 |
| claude/pump-mid-20261027-latest | 20d7ea26a | 55 | 2 |
| claude/pump-big-mid-20261027-latest | 245024cd0 | 26 | 3 |
| claude/mayhem-a-20261027-latest | b4ca5856e | 92 | 3 |
| claude/mayhem-b-20261027-latest | 095bba4fb | 5 | 2 |
| claude/mayhem-o79-20261027 | 2fa030af2 | 8 | 0 |
| claude/amm2-v2-20261027-latest | a8267bdf8 | 1 | 0 |
| claude/amm2-multihop-20261027 | babc575d9 | 1 | 0 |
| claude/amm-hi-20261027 | d92fefba8 | 53 | 6 |
| claude/amm-mid-20261027 | b49edd851 | 20 | 16 |
| claude/amm-lo-20261027 | dda784ddc | 14 | 6 |

Before archiving, these verifiers were run on a materialized tree with the lane files in place, using `python -I -B` and an empty HOME. Only mayhem-a failed: its `verify.py` seal check and its `test_verify.py` ("unmodified copy must verify"). Both failures had the same cause, the lane files added inside its sealed packet, and that is why this archive uses a separate root. The checks that passed:
- `claude-amm-mid-20261027/verify.py`: OK (600 normalized, +0x52c58, 0 lost)
- `claude-mayhem-b-20261027/verify.py`: 0 normalized log differences over 6636 trade cases
- `claude-pump-lo-20261027/verify.py` passed
- `claude-pump-mid-20261027/verify.py`: verified (724 normalized, 0 lost)
- `claude-pump-mid-mayhem-o0084/verify.py`: verified (434 matched)

These verifiers expect to run from their original directory, so run them from a copy restored to `research/<path>`.

## deleted-branch-residue/

`deleted-branch-residue/` holds every file version that no part of main's history contains, taken from the other branches deleted in the 2026-10-28 cleanup. Those files are listed in `deleted-branch-residue/inventory.json`. Apart from these, every file on every deleted branch is a blob that already appears in main's history.
