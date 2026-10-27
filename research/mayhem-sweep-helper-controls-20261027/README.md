# O0073 fee-recipient helper source controls

Fourteen ordinary Rust source variants isolate timestamp selection, interval
loading, guard nesting and reference lifetimes in the remaining **912-byte
O0073** helper. Every compiled artifact preserves all **432 normalized / 84
raw-local** matches of the independently rebuilt Linux baseline. **No complete
function match or runtime qualification is added.** The qualified parent's 100
raw matches and selected sources remain unchanged.

The 15 artifacts include one unchanged baseline and fourteen single-file source
variants. All use the same 67-file cohort, official Linux v1.54 toolchain and
isolated source tree with sequential incremental root compilations. Dependency
outputs are reused; these controls are not fresh full-dependency builds. Each
folder retains the exact source, patch, compiler command, complete input hashes,
logs and symbol/stripped ELFs. No executable is patched.

Useful constraints from the frozen original:

| Source family | Helper bytes | Same-offset equal slots | Sequence-aligned slots |
| --- | ---: | ---: | ---: |
| Baseline and equivalent guards | 920 | 7 | 82 |
| Load interval before selecting timestamp | 912 | 76 | 83 |
| Load interval inside nested last-timestamp guard | 904 | 8 | 106 |
| Select one mutable timestamp reference | 880 | 6 | 92 |

The nested-guard family reproduces 106 of 114 original slots in ordered
heuristic alignment, but lacks eight original slot matches and has a different
body size. The equal-size interval-first control differs in register choice,
selection and branch placement. Clock binding, direct clock-field access,
selection inversion and an immutable reference do not change the nested
family's size or scores. The full per-control table and all original-window
classification digests are re-derived in `report.json`.

These scores identify compiler effects; equal size, aligned subsequences and
similar control flow are not a complete function or semantic-equivalence proof.
Further recovery must resolve the original shared interval load, timestamp-load
placement and branch orientation through justified source/compiler context.
Calls, typed data, rollback/error ordering and whole-ELF identity remain separate
obligations. No target is executed and no historical runtime evidence is reused.

Verify all saved evidence with the Python standard library:

```sh
python3 -B research/mayhem-sweep-helper-controls-20261027/verify.py
python3 -O -B research/mayhem-sweep-helper-controls-20261027/verify.py
```

For a fresh build of a chosen variant, use Linux x86-64, Python 3.12+, a C
linker and the official v1.54 Linux platform-tools archive (URL/hash in the
manifest). The output must not exist:

```sh
python3 -B research/mayhem-sweep-helper-controls-20261027/reproduce.py \
  --toolchain-archive /path/to/platform-tools-linux-x86_64.tar.bz2 \
  --output /path/to/new-control-build --control sweep-nested-guards
```

The fresh recipe verifies the official archive and complete baseline source,
replaces only the selected retained source file, fetches locked packages and
compiles offline into an empty target. The retained fifteen runs used the
recorded incremental controller, not this fresh-dependency replay recipe.
