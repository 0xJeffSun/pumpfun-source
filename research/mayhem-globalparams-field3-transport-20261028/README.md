# GlobalParams.field_3 is transport-only in the captured program

Static check of the GlobalParams role that [PR #466](https://github.com/lalalune/pumpfun-source/pull/466)
and [PR #474](https://github.com/lalalune/pumpfun-source/pull/474) both left open.
In the 441-window source, and in the captured Mayhem text that matches that
source, `field_3` is stored, serialized, and copied into `GlobalParamsUpdateEvent`.
No load of this qword feeds a compare. This package does not rename the field,
patch a binary, or run a program.

## Problem

Object displacement 104 has 87 `ldxdw` and 16 `stxdw` instructions. A width
filter cannot separate `GlobalParams.field_3` from every other 8-byte field
that happens to sit at offset 104. That is why the earlier packages stopped
here.

The rule used here is the same pairing #474 used for `field_0`, pointed at
this qword. A `field_3` access in this image is one of:

- a width-8 memory operation at native object displacement 104, on a base that
  also has the width-4 `field_0` operation at 232 and the `field_2` / `field_4`
  qwords at 96 and 112;
- or a width-8 load at update-event displacement 144 (104 + 40) on the wrapper
  pointer that also has the width-4 `field_0` load at 272.

Those four instructions are the whole set. The other 100 width-8 operations
at displacement 104 fail the pairing. The 441 symbols ELF has the same `.text`
as the captured program, so each of those 100 sits in a named function that
is not a `GlobalParams` method. The source that produced that `.text` has zero
business reads of the name.

## Pins

| Input | SHA-256 |
| --- | --- |
| `evidence/original/mayhem/deployed.so` (777,408 bytes) | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |
| `evidence/original/mayhem/capture.json` (`last_deploy_slot` 452655053, same payload hash) | `fcdd031280b2d85491f3600dd8723134d529d39c7e701df9b91ff80a76e48b64` |
| `research/claude-mayhem-441-20261028/sources/source.tar.gz` (94,829 bytes) | `049ba60cfbc9045ccdb1f9e929aed0111f28e7ac01ef4e96413d836c3e0bf494` |
| `src/lib.rs` inside that archive | `5703fd824d0b8d04a5ff9900fd3b882a850d790cf2eeacb80a09a163549db579` |
| `src/state.rs` | `bbdba89e2ff44fac18dc06a2c75c93718a009ce29c9abdd2b5273886d708c6f0` |
| `src/instructions/admin.rs` | `9683684368debce589e639a5e5ceed47d6bf6d598bcf2e0162fbe4d5e1ecad1e` |
| `research/claude-mayhem-441-20261028/builds/symbols.so.gz` (196,827 bytes) | `8f93fd2e398135ba42086c9ba57c7733f7fc8129c03bd7ff52742c67724ea8f3` |
| that gzip, decompressed (907,776 bytes) | `5fda674541c8a39caf95d304d4cfb14fe5b0493a0c57e16a4dd78447b7169448` |
| `research/mayhem-globalparams-field-history/evidence/analysis_timeseries.json` | `c0c3a58fe6a92ba7b4d442159c5e0210441e4cb02266d411c89c29542d09448c` |

`.text` in the captured ELF is file offset `0x120`, virtual address `0x120`,
size `0xac8b8`. The decompressed symbols ELF has that same `.text`. Text PCs
below are offsets into that section. File offsets are text PC plus `0x120`.

## The four qword operations

| Site | Text PC | File offset | Raw | Dataflow |
| --- | ---: | ---: | --- | --- |
| Optional setter store | `0x2bcc0` | `0x2bde0` (179680) | `7b21680000000000` | `stxdw [r1+104], r2` only when the option tag in `r6` is `Some`; bracketed by `field_2` at +96 and `field_4` at +112 |
| Account serializer load | `0x66fb0` | `0x670d0` (422096) | `7971680000000000` | `ldxdw r1, [r7+104]`, then an 8-byte copy. The branch after the call compares `r0` with zero |
| Account decoder store | `0x681d8` | `0x682f8` (426744) | `7b16680000000000` | `stxdw [r6+104], r1`, between the `field_2` and `field_4` stores |
| Update-event load | `0xccb0` | `0xcdd0` (52688) | `7971900000000000` | `ldxdw r1, [r7+144]`, spilled to `[r10-152]`, then stored at output offset 32 |

The setter's `None` edge is `jeq r6, 0` at `0x2bcb0`, which lands on the next
field's tag test at `0x2bb28`. The `Some` edge is `jne r6, 0` at `0x2bb20`,
which lands on the reload at `0x2bcb8`. The stored qword is that reload. It
is not compared. The same `r1` also has `stxw [r1+232], r2` at `0x2bc68`,
which is the `field_0` landmark from #474.

The serializer spill is `[r10-16] = r1`, then `r2` points at that slot, `r3 = 8`,
and a call. The same shape copies `field_2` at `r7+96` and `field_4` at
`r7+112`. The three qwords are the account codec, not three consumers.

The event window from the load at `0xccb0` through the second store at
`0xd190` contains no `exit`. The stack slot `[r10-152]` is written once and
reloaded twice. Each reload is a width-8 store at output offset 32:

- `0xcea8`: `stxdw [r1+32], r2`
- `0xd190`: `stxdw [r7+32], r1`

The same buffer receives discriminator `63a75c9898e32629` at `0xcef0`.
Borsh order after the discriminator is `old_version`, `new_version`,
`field_0`, `field_1`, `field_2`, `field_3`, so `field_3` sits at offset 32.
The older review's setter, event, and serializer file offsets (`0x2bde0`,
`0xcdd0`, `0x670d0`) are three of these four sites. The decoder store was
not in that table.

Displacement 144 inside the setter, serializer, and decoder (`0x2bd40`,
`0x67208`, `0x68220`) is paired with the width-4 `field_0` slot at 232, not
with the event's 272. That is object offset 144, which the layout comment
calls `field_7`. This package does not reopen `field_7`.

## Reset and initialize zeros

`reset_state` and `initialize_global_params` do not use displacement 104.
Each one writes immediate zero with `stdw` into `r10` slots. Exactly one
stack base makes those slots line up with the fields the source assigns:

| Function | Stack base | `field_3` slot | Text PC |
| --- | ---: | ---: | ---: |
| `initialize_global_params` | `r10-520` | `r10-416` | `0x7e018` |
| `reset_state` | `r10-536` | `r10-432` | `0x7f7c0` |

The matched offsets are 64, 72, 80, 88, 96, 104, 112, 120, 136, 144, 152,
176, 184, 192, 200, 208, 216, and 232. That is `sol_deployed`,
`stable_deployed`, `field_2` through `field_5`, `field_138`, `field_7`,
`field_8`, `field_11` through `field_15`, `field_238`, and the shared
`field_0`/`field_1` qword. `field_9`, `field_10`, and the two sweep caps are
absent, which is the source's reset partition. The `reset_state` slot is the
older review's file offset `0x7f8e0`. Both functions are quoted and not
executed. The initializer lane stays stopped.

## The other 100 operations at displacement 104

`verify.py` records every width-8 operation whose offset field is 104.
Three are the object sites above. The other 100 fail the `field_0` pairing,
and the symbol that contains each one does not mention `GlobalParams`:

| Owner | Loads | Stores |
| --- | ---: | ---: |
| Six trade handlers (`buy_pump_swap`, `sell_pump_swap`, legacy buy/sell, `buy_v2`, `sell_v2`) | 79 | 0 |
| `try_accounts` / `AccountsExit` / `Event::data` / `SellCurve` serialize / `BondingCurve` decode / `InterfaceAccount::try_from` | 5 | 14 |
| `drop_in_place` of `[AccountInfo; 3]` and `[AccountInfo; 6]` | 2 | 0 |

The displacement-104 histogram also contains 14 branch offsets (`ja`, `jeq`,
`jgt`, `jge`, `jne`, `jsgt`). Those are not memory operands.

A trade-handler load often has the shape `ldxdw r1, [rContext+N]` followed
by `ldxdw rX, [r1+104]`. The value is then dereferenced, spilled, or compared.
The base of that second load does not carry `field_0`'s width-4 slot, so the
pairing refuses it. The 441 source has no `global_params.field_3` read for
the compiler to have emitted, and this `.text` is the `.text` of that build.
This package does not give those other offset-104 slots a name.

## Source census

`verify.py` masks comments and string literals, keeps lifetime quotes, and
lexes `\bfield_3\b` in the 22 non-vendor Rust files. A business read is a
non-assignment use through `global_params`, `params`, or `self`.
`field_3: state.field_3` stays an event projection. `field_13` and `field_30`
do not match.

| Role | Count | Where |
| --- | ---: | --- |
| Business read | 0 | |
| Transport write | 3 | `initialize_global_params` writes 0, `reset_state` writes 0, `apply_update` writes the `Option` |
| Event read | 1 | `field_3: state.field_3` |
| Declaration or binding | 8 | struct fields, `Option` arguments, the event field name |

## Stored series

The published update-event series for `field_3` is `20000000000` ten times.
Versions 1–6 pass `Some(20000000000)`. Versions 7–10 pass `None` (four times)
and the event stays `20000000000`. The little-endian wire bytes are
`00c817a804000000`. The captured loads do not branch on the qword, so this
constant is the same input to this image. The historical name and unit stay
unresolved. An image deployed before slot 452655053 is outside this payload.

## Still open

- The historical name and unit of `field_3`. `20000000000` is compatible with more than one unit, and this image never compares it.
- Whether a Mayhem deployment older than slot 452655053 consumed the qword.
- The names of the other displacement-104 slots in the trade handlers. They are not this field.
- Runtime behavior. No instruction from the stopped initializer lane is run.

## Verify

From the repository root, with the standard library only:

```sh
python3 -B research/mayhem-globalparams-field3-transport-20261028/verify.py
python3 -B research/mayhem-globalparams-field3-transport-20261028/test_verify.py
```

`verify.py` recomputes the ELF, symbols, and archive digests, checks that
the symbols `.text` equals the captured `.text`, checks the four qword sites
and their dataflow, checks the displacement histogram, checks the stack-zero
bases, re-lexes the 22 files, re-reads the published `field_3` series, and
compares that census with `survey.json`. `test_verify.py` rejects comments,
strings, lifetimes, `field_30` / `field_13` tokens, a serializer spill changed
into a compare, an event store changed into a compare, and a setter whose
`field_0` landmark was removed. The compare runs on a copy of the section
bytes.
