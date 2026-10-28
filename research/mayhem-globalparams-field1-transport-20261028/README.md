# GlobalParams.field_1 is transport-only in the captured program

Static check of one GlobalParams role that [PR #461](https://github.com/lalalune/pumpfun-source/pull/461)
left open. In the 441-window source, and in the captured Mayhem text that
matches those windows, `field_1` is stored, serialized, and copied into
`GlobalParamsUpdateEvent`. No width-4 load of this word feeds a compare.
This package does not rename the field, patch a binary, or run a program.

## Problem

`research/mayhem-globalparams-remaining-roles-20261028` lexed the 441-window
tree and found zero business reads of `field_0`, `field_1`, and `field_3`.
The earlier binary review
(`repro/mayhem/global-params-remaining-field-review`) already had setter,
serializer, and event witnesses for `field_1`, and it left
`all_binary_uses_proven` false: numeric displacement 236 also hits
instructions that are not this `u32`.

The rule used here is narrower than "every instruction whose offset field
equals 236." A `field_1` access in this image is a width-4 memory operation
at native object displacement 236, on a base that also has the width-4
`field_0` operation at displacement 232, or a width-4 operation at update-event
displacement 276 (236 + 40) paired with `field_0` at 272. Those four
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
| Optional setter store | `0x2bc80` | `0x2bda0` (179616) | `6351ec0000000000` | `stxw [r1+236], r5`, after `stxw [r1+232], r2` and `and r4, 1; jeq r4, 0` |
| Account serializer load | `0x66f30` | `0x67050` (421968) | `6171ec0000000000` | `ldxw r1, [r7+236]`, then the same 4-byte copy as the `field_0` load at `0x66ef0` |
| Account decoder store | `0x681a0` | `0x682c0` (426688) | `6396ec0000000000` | `stxw [r6+236], r9`, immediately after `stxw [r6+232], r1` |
| Update-event load | `0xccd0` | `0xcdf0` (52720) | `6171140100000000` | `ldxw r1, [r7+276]`, spilled to `[r10-136]`; the next load is `ldxw r9, [r7+272]` |

The setter gate tests `r4`. The stored word is `r5`. `None` skips the store;
`Some` writes the value through.

The serializer spill is `[r10-16] = r1`, then `r2` points at that slot, `r3 = 4`,
and a call. The branch after the call compares `r0` with zero. It is the
write-status check. The `field_0` word at text PC `0x66ef0` uses the same
eight-instruction shape on `r7+232`, so the two `u32`s are the account codec,
not two different consumers.

The event window from the spill at `0xccd8` through the second reload at
`0xd1b0` contains one `exit`-free stretch. In that stretch the only accesses
to `[r10-136]` are the spill and two reloads. Each reload is a width-4 store
at output offset 20:

- `0xcec8`: `stxw [r1+20], r2`
- `0xd1b0`: `stxw [r7+20], r1`

The same buffer receives discriminator `63a75c9898e32629` at `0xcef0`.
One path then uses length immediate 129. The other moves 137 into both `r8`
and `r2` (`0xd1f8`, `0xd208`), which is 8 discriminator bytes plus the
129-byte body. Those two paths are the `emit!` and `emit_cpi!` calls in
`update_global_params`. Borsh order after the discriminator is `old_version`,
`new_version`, `field_0`, `field_1`, so `field_1` sits at offset 20.

The first captured `GlobalParamsUpdateEvent` carries `401f00000a000000`
(8000 then 10) beside that discriminator. Version 7's argument for `field_1`
is `None`, and the event still reports 0.

## Source census

`verify.py` masks comments and string literals, keeps lifetime quotes, and
lexes `\bfield_1\b` in the 22 non-vendor Rust files. A business read is a
non-assignment use through `global_params`, `params`, or `self`.
`field_1: state.field_1` stays an event projection. `field_10` and the later
`field_1N` names do not match.

| Role | Count | Where |
| --- | ---: | --- |
| Business read | 0 | |
| Transport write | 3 | `initialize_global_params` writes 0, `reset_state` writes 0, `apply_update` writes the `Option` |
| Event read | 1 | `field_1: state.field_1` |
| Declaration or binding | 8 | struct fields, `Option` arguments, the event field name |

`initialize_global_params` is quoted and not executed. That lane stays stopped.

## Stored series

The published update-event series for `field_1` is
`10, 100, 100, 100, 50, 0, 0, 0, 0, 0`. Versions 1–6 pass `Some` with those
values. Versions 7–10 pass `None` (four times) and the event stays 0.
The captured loads do not branch on the word, so these integers are the same
input to this image. The historical name, and the reason operators stored
10, then 100, then 50, then 0, stay unresolved. An image deployed before
slot 452655053 is outside this payload.

## Other instructions whose offset field is 236 or 276

Width-4 operations at these displacements are exactly the four rows above.
The remaining hits are a different width or a branch. `verify.py` records
them so the scan is complete:

| Displacement | Opcode | Count | Why it is not this `u32` |
| ---: | --- | ---: | --- |
| 236 | `0x6a` `sth` | 6 | Width 2, immediates 257, 257, 256, 256, 256, 256 |
| 236 | `0x55` `jne` | 2 | Branch offset, not a memory operand |
| 236 | `0xbd` `jle` | 1 | Branch offset |
| 276 | `0x05` `ja`, `0xb5` `jle`, `0xbd` `jle` | 1 each | Branch offsets |
| 276 | `0x71` `ldxb`, `0x73` `stxb` | 1 each | Width 1 |

Eight-byte loads at displacement 232 are a different protocol. In the
update-event body the qword at `+232` belongs to the `u64` walk on the
object-plus-40 pointer; the `u32` itself is the separate load at `+276`.
This package does not assign those qword sites to `field_1`.

## Still open

- The historical name and unit of `field_1`.
- Whether a Mayhem deployment older than slot 452655053 consumed the word.
- `field_0` and `field_3`. `field_0` is only the adjacent landmark in the
  pairing above. Displacement 104, where `field_3` lives, is too common for
  this width filter, so `field_3` is left untouched.
- Runtime behavior. No instruction from the stopped initializer lane is run.

## Verify

From the repository root, with the standard library only:

```sh
python3 -B research/mayhem-globalparams-field1-transport-20261028/verify.py
python3 -B research/mayhem-globalparams-field1-transport-20261028/test_verify.py
```

`verify.py` recomputes the ELF and archive digests, checks the four word
sites and their dataflow, checks the displacement histogram, re-lexes the
22 files, re-reads the published `field_1` series, and compares that census
with `survey.json`. `test_verify.py` rejects comments, strings, lifetimes,
`field_10` / `field_11` tokens, and a serializer spill changed into a
compare. The compare runs on a copy of the section bytes.
