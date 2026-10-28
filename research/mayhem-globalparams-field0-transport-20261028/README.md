# GlobalParams.field_0 is transport-only in the captured program

Static check of one GlobalParams role that [PR #466](https://github.com/lalalune/pumpfun-source/pull/466)
left open. In the 441-window source, and in the captured Mayhem text that
matches those windows, `field_0` is stored, serialized, and copied into
`GlobalParamsUpdateEvent`. No width-4 load of this word feeds a compare.
This package does not rename the field, patch a binary, or run a program.

`field_3` is not attributed. Displacement 104 has 87 eight-byte loads, which
is the same reason #466 left it alone.

## Problem

`research/mayhem-globalparams-remaining-roles-20261028` lexed the 441-window
tree and found zero business reads of `field_0`. The earlier binary review
(`repro/mayhem/global-params-remaining-field-review`) already had setter,
serializer, and event witnesses for `field_0`. #466 used the width-4 store at
object displacement 232 only as the landmark next to `field_1`. It did not
claim that those `field_0` instructions themselves are transport.

The rule used here is the same one #466 used for `field_1`, pointed at the
other word. A `field_0` access in this image is a width-4 memory operation at
native object displacement 232, on a base that also has the width-4 `field_1`
operation at displacement 236, or a width-4 operation at update-event
displacement 272 (232 + 40) paired with `field_1` at 276. Those four
instructions are the whole set.

## Pins

| Input | SHA-256 |
| --- | --- |
| `evidence/original/mayhem/deployed.so` (777,408 bytes) | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |
| `evidence/original/mayhem/capture.json` (`last_deploy_slot` 452655053, same payload hash) | `fcdd031280b2d85491f3600dd8723134d529d39c7e701df9b91ff80a76e48b64` |
| `research/claude-mayhem-441-20261028/sources/source.tar.gz` (94,829 bytes) | `049ba60cfbc9045ccdb1f9e929aed0111f28e7ac01ef4e96413d836c3e0bf494` |
| `src/lib.rs` inside that archive | `5703fd824d0b8d04a5ff9900fd3b882a850d790cf2eeacb80a09a163549db579` |
| `src/state.rs` | `bbdba89e2ff44fac18dc06a2c75c93718a009ce29c9abdd2b5273886d708c6f0` |
| `src/instructions/admin.rs` | `9683684368debce589e639a5e5ceed47d6bf6d598bcf2e0162fbe4d5e1ecad1e` |
| `research/mayhem-globalparams-field-history/evidence/analysis_timeseries.json` | `c0c3a58fe6a92ba7b4d442159c5e0210441e4cb02266d411c89c29542d09448c` |

`.text` in the captured ELF is file offset `0x120`, virtual address `0x120`,
size `0xac8b8`. Text PCs below are offsets into that section. File offsets
are text PC plus `0x120`, which is the PC the older review printed.

## The four word operations

| Site | Text PC | File offset | Raw | Dataflow |
| --- | ---: | ---: | --- | --- |
| Optional setter store | `0x2bc68` | `0x2bd88` (179592) | `6321e80000000000` | `stxw [r1+232], r2` after `jne r2, 0` lands here; paired with `stxw [r1+236], r5` |
| Account serializer load | `0x66ef0` | `0x67010` (421904) | `6171e80000000000` | `ldxw r1, [r7+232]`, then the same 4-byte copy #466 checked for `field_1` |
| Account decoder store | `0x68198` | `0x682b8` (426680) | `6316e80000000000` | `stxw [r6+232], r1`, immediately before `stxw [r6+236], r9` |
| Update-event load | `0xcce0` | `0xce00` (52736) | `6179100100000000` | `ldxw r9, [r7+272]`, stored at output offset 16; the previous load is `ldxw r1, [r7+276]` |

The setter's option tag is the low bit of `r2` after the pseudo-call at
`0x2b940`. `None` falls through and the jump at `0x2bc58` skips the store.
`Some` jumps to `0x2bc60`, reloads the value saved from that call's `r3`, and
writes it. The stored word is not compared.

The serializer spill is `[r10-16] = r1`, then `r2` points at that slot, `r3 = 4`,
and a call. The branch after the call compares `r0` with zero. It is the
write-status check. The `field_1` word at text PC `0x66f30` uses the same
eight-instruction shape on `r7+236`, so the two `u32`s are the account codec,
not two different consumers.

The event window from the load at `0xcce0` through the second store at
`0xd1b8` contains no `exit`. In that window the only accesses to `r9` are the
load and two stores. Each store is a width-4 write at output offset 16:

- `0xced0`: `stxw [r1+16], r9`
- `0xd1b8`: `stxw [r7+16], r9`

The same buffer receives discriminator `63a75c9898e32629` at `0xcef0`.
One path then uses length immediate 129. The other moves 137 into both `r8`
and `r2` (`0xd1f8`, `0xd208`), which is 8 discriminator bytes plus the
129-byte body. Those two paths are the `emit!` and `emit_cpi!` calls in
`update_global_params`. Borsh order after the discriminator is `old_version`,
`new_version`, `field_0`, `field_1`, so `field_0` sits at offset 16.

The first captured `GlobalParamsUpdateEvent` carries `401f00000a000000`
(8000 then 10) beside that discriminator. Versions 7–10 pass `None` for
`field_0`, and the event still reports 8000.

File offsets `0x2bd88`, `0x67010`, and `0xce00` are the older review's setter,
serializer, and event witnesses. The decoder store was not in that three-column
table; it is the width-4 store immediately before the `field_1` decoder store
#466 already checked.

## Source census

`verify.py` masks comments and string literals, keeps lifetime quotes, and
lexes `\bfield_0\b` in the 22 non-vendor Rust files. A business read is a
non-assignment use through `global_params`, `params`, or `self`.
`field_0: state.field_0` stays an event projection. `field_10` does not match.

| Role | Count | Where |
| --- | ---: | --- |
| Business read | 0 | |
| Transport write | 3 | `initialize_global_params` writes 0, `reset_state` writes 0, `apply_update` writes the `Option` |
| Event read | 1 | `field_0: state.field_0` |
| Declaration or binding | 8 | struct fields, `Option` arguments, the event field name |

`initialize_global_params` is quoted and not executed. That lane stays stopped.
`reset_state` assigns zero in source. The older review's reset witness is an
8-byte stack zero that also covers `field_1`; this package does not re-derive
that stack-copy mapping. The width-4 scan does not include it, because its
displacement is the stack slot, not 232.

## Stored series

The published update-event series for `field_0` is 8000 ten times. Versions
1–6 pass `Some(8000)`. Versions 7–10 pass `None` (four times) and the event
stays 8000. The captured loads do not branch on the word, so this constant is
the same input to this image. The historical name and unit stay unresolved.
An image deployed before slot 452655053 is outside this payload.

## Other instructions whose offset field is 232 or 272

Width-4 operations at these displacements are exactly the four rows above.
`verify.py` records every other hit so the scan is complete:

| Displacement | Opcode | Count | Why it is not this `u32` |
| ---: | --- | ---: | --- |
| 232 | `0x79` `ldxdw` | 14 | Width 8. Copies, pointer dereferences, or the two checked adds below |
| 232 | `0x7b` `stxdw` | 4 | Width 8 stores |
| 232 | `0x05` `ja`, `0x15` `jeq`, `0x3d` `jge` | 3, 2, 1 | Branch offsets |
| 272 | `0x79` `ldxdw`, `0x7b` `stxdw` | 8, 6 | Width 8 |
| 272 | `0x69` `ldxh`, `0x6b` `stxh` | 1 each | Width 2, at `0xf0` and `0x8f910` |
| 272 | `0x05` `ja`, `0x15` `jeq`, `0x5d` `jne`, `0xb5` `jle` | 1, 1, 2, 1 | Branch offsets |

In the update-event body the qword at `r7+232` (`0xcc10`) shares `r7` with the
`field_0` word at `r7+272`. On that pointer, +232 is object offset 192, which
is `field_13`, not `field_0`.

Two width-8 loads are arithmetic, at `0x14dd0` and `0x175d0`. Each one adds the
loaded qword to another qword and then uses `jlt` of the sum against one addend,
which is an unsigned overflow check. The base of each load is defined by the
immediately previous instruction, a qword load from `+88` of a different
pointer. The same base then loads a qword at `+240`. `GlobalParams.field_0` is
the width-4 slot paired with `field_1` at +236, and `version` at +240 is a
`u32`. Those adds are not assigned to `field_0`.

Seven further loads are immediately dereferenced (`ldxdw` through the loaded
register). One more, at `0x163a8`, is left in `r2` and passed to a pseudo-call
whose first instruction is `ldxdw r3, [r2+8]`. Those are addresses. The
remaining loads are spilled or stored as full qwords. None of them is a
width-4 compare of this field.

## Still open

- The historical name and unit of `field_0`. 8000 is compatible with more than one unit, and this image never compares it.
- Whether a Mayhem deployment older than slot 452655053 consumed the word.
- `field_3`. Displacement 104 is too common for this width filter.
- Runtime behavior. No instruction from the stopped initializer lane is run.

## Verify

From the repository root, with the standard library only:

```sh
python3 -B research/mayhem-globalparams-field0-transport-20261028/verify.py
python3 -B research/mayhem-globalparams-field0-transport-20261028/test_verify.py
```

`verify.py` recomputes the ELF and archive digests, checks the four word
sites and their dataflow, checks the displacement histogram, checks the
width-8 sites listed above, re-lexes the 22 files, re-reads the published
`field_0` series, and compares that census with `survey.json`.
`test_verify.py` rejects comments, strings, lifetimes, `field_10` / `field_01`
tokens, a serializer spill changed into a compare, an event store changed into
a compare, and a checked-add overflow test changed into an unconditional jump.
The compare runs on a copy of the section bytes.
