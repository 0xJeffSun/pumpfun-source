# AMM scalar compared-value review after formatter restoration

**No natural compared-value or ownership correction is proved.** The current scalar source already rejects unsigned fees greater than1000, then records the compared values in original order `(1000u64, fee)`. The remaining eight-byte setter difference is a real specialized call convention; changing values, types, ownership, attributes or callsites to alter it would not be source recovery.

This review binds the current formatter-restored candidate `d3dacf1bd54e0b7b825557d01adfe158bc229753fb4b945618c5eabf2bdb1bab` and the original `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`. It uses only admitted complete ledger windows. No build, runtime, main-source edit or compiler experiment occurred.

## Fresh actual calls

All three scalar setters remain616 original versus608 candidate bytes. Their current starts are0xf758,0xf9b8,0xfc18; original starts are0x61630,0x61898,0x61b00. Before offset552, only the success branch displacement and truthful source-line/path-length fields differ under the retained normalization. Original offset552 sets r4=1000; offset560 copies fee to r5; offset568 calls0x1840. Current offset552 copies fee to r4; offset560 calls **0x1308**. The final40-byte return suffix matches after the shift.

The formatter change reordered helper emission. The old candidate report's specialized0x340/generic0x1308 addresses must not be reused. In the current candidate the scalar-specialized helper is0x1308; the generic complete normalized match is **0xdd0**. Helper0x898 serves other current callers and is not the scalar target.

Original0x1840 and actual current0x1308 are1336 bytes. Exactly four normalized instructions differ, at24/32/40/48. Original saves r5 to stack-288 and r4 to-296. Current saves r4 to-288 and immediate1000 to-296, with the stack-pointer setup moved. Under each setter's actual arguments, the resulting pair is the same: stack-296=1000, stack-288=fee. The complete tail from56 onward and relocation pattern match. All **eight actual immediate helper target bodies** match completely under the same normalization, including numeric formatting, unwrap and memcpy targets. This is not a missing/reversed diagnostic value.

The full incoming graph has24 original calls to0x1840, three current calls to0x1308 (the three scalars), and six current calls to0xdd0 (account/IDL contexts). The generic matching helper is not unused globally; it is not called by the scalars. No synthetic call or wrapper is warranted to make the compiler share it.

## Source and ownership

The unchanged pinned Anchor macro expands `require_gte!(a,b,error)` into `if a < b { return Err(error!(error).with_values((a,b))); }`. Current scalars use `1000u64` and a u64 fee. Pinned `with_values` accepts self by value, mutably updates the existing boxed Anchor or Program error's compared-value field with two `to_string()` results, and returns self. The observed helper preserves that branch/tail structure. There is no evidence here of an extra source-level clone, wrong conversion, or missing drop.

The unsigned formatter alias cannot uniquely distinguish u64 from target-width usize in the historical source. Removing the suffix could alter independent macro type inference; swapping operands changes semantics; casting to usize just to encourage generic sharing would be a layout maneuver. None is proposed.

Error metadata and recursive formatting/allocator objects remain incompletely closed, and truthful source coordinates differ. Complete helper-tail correspondence is not full owned-error/data equality. The original21 nonscalar callsites are preserved in `evidence.json`; their existence does not identify a missing original source validation that can safely be added.

## Reproduce

Run `python3 -B work/amm-scalar-next-review/review.py` from the repository root. It rereads the current full ledgers and binary bytes, checks all three caller argument blocks and suffixes, the actual helper's four differences, complete target pairs, incoming graphs and the existing source spelling. It writes only this review's evidence and copied source reference files. No target is executed. The result does not claim a new matched original window or completed AMM behavior.
