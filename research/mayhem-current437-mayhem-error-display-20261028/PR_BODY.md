## Summary

Counts the 20 `MayhemError` Display messages on the qualified437 images. Original owner O0097 is `[196056, 196888)`; the normalized candidate is `[172736, 173568)`. Each source discriminant `0..=19` loads one relocated `.rodata` pointer and one immediate length, then `callx`s the formatter slot captured in the prologue. Tags 8 and 19 share the length mov at offset 680. The 531 bytes were uncovered after unioning the format-piece chain with the account-name intervals.

Package: `research/mayhem-current437-mayhem-error-display-20261028/`.

Upstream review diff, against `lalalune/pumpfun-source` `main`:

https://github.com/lalalune/pumpfun-source/compare/main...harrywu666:pumpfun-source:cursor/mayhem-data-mayhem-error-display-fd43?expand=1

## Evidence

| Input | SHA-256 |
| --- | --- |
| `evidence/original/mayhem/deployed.so` | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |
| `research/mayhem-current437-composition-20261028/builds/first/symbols.so.gz` | `9c8c50857bfe8b80ebf08ebb50c905c6582676cb8e572d39f45de8647f62fbae` |
| archived `src/lib.rs` | `f0ad14df9aa38c59a7b2f97ee77c368ac8041930e9d4df6ef772511a700ab7a6` |

The relation stays **437 normalized / 141 raw / 431 closed windows / 581 pairs**. Payload coverage moves from **18,214** to **18,745 / 26,180**. `.rodata` moves from **11,758** to **12,289 / 18,396**. `.data.rel.ro` stays **6,456 / 7,784**. No relocation-table bytes are added. The counted intervals union to `[709128, 709160)`, `[710600, 710616)`, and `[710924, 711407)`.

The proof stops at `callx r4`. It does not name the callback, and it does not claim output or runtime behavior. Tags outside `0..=19` are rejected.

## Still open

`7,435` payload bytes remain. The largest `.rodata` gaps include `[722392, 723755)`, `[713022, 714341)`, and `[709224, 710440)`. Beside the new strings, `[710712, 710924)` and `[711407, 711412)` are open. The largest `.data.rel.ro` gaps include `[732856, 733048)`, `[727696, 727880)`, `[732648, 732760)`, the trade-descriptor roots `[726592, 726688)` and `[726784, 726880)`, and `[733120, 733216)`. Relocation and section layout are unchanged.

## Test plan

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-mayhem-error-display-20261028/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-mayhem-error-display-20261028/test_verify.py
PYTHONDONTWRITEBYTECODE=1 python3 -B scripts/verify_evidence.py
cd scripts && PYTHONDONTWRITEBYTECODE=1 python3 -B test_tooling.py
```

provider=Cursor model=grok-4.7 client=grok-build

Made via @slopdotcash
