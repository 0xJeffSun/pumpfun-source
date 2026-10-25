# Fees short-handler source evidence

The captured bodies support three `require_gt!(8u8, index, FeeError::InvalidBuybackIndex)` guards and a boxed `UpdateBuyback.buyback_vault`. Three controlled clean v1.44 builds isolate the macro, account layout, and integer type changes. No source lines were padded, functions relocated, flags searched, or executable bytes modified.

All offsets below are decimal ELF code addresses. Original boundaries are independently inferred entries; the specified dispatch wrapper directly calls each original entry. Candidate boundaries also have unstripped function symbols.

| Handler | Original entry / bytes | Published candidate entry / bytes | Typed boxed scratch entry / bytes | Remaining instruction offsets |
|---|---:|---:|---:|---|
| revoke_fee_sharing_authority | 659640 / 520 | 462592 / 520 | 464624 / 520 | 416: line 153 vs 183 |
| transfer_fee_sharing_authority | 660160 / 520 | 490888 / 520 | 492920 / 520 | 416: line 222 vs 188 |
| initialize_buyback | 120216 / 600 | 456192 / 544 | 458168 / 600 | 448: line 5 vs 94; 456: filename length 33 vs 50 |
| update_buyback_authority | 96896 / 696 | 494208 / 624 | 496240 / 696 | 544: line 6 vs 36; 552: filename length 33 vs 69 |
| update_buyback_claim_rate_limit | 97592 / 640 | 494832 / 568 | 496936 / 640 | 488: line 7 vs 47; 496: filename length 33 vs 69 |

These are differences after normalizing address relocations and direct-call immediates, retaining every instruction's other fields, source line, and filename length. Every final body has the exact original relocation pattern. Each of the four deprecated or five buyback direct callees maps to the observed original callee through an entry-bounded normalized body. The newly introduced `Error::with_values` specialization is 1,864 bytes, candidate 1008 → original 2312, with exact normalized instructions and no relocations. Its 12 direct calls also map to observed original targets; the two possible original `String::push` matches are retained rather than treated as a unique attribution (`with-values-calls.json`). Raw bodies and full ELFs remain unequal, and referenced rodata/vtables are not recursively equated.

The macro-only trial makes initialize exactly 600 bytes, but updates remain one instruction short (688/632). Its success paths access inline vault fields. Boxing only `UpdateBuyback.buyback_vault` supplies the original pointer load at accounts+0x160 and stores authority at boxed-account offsets 0x88–0xa0, and claim rate at 0xc8. The resulting bodies match except source location. An untyped `8` in `require_gt!` independently defaults to i32 in the macro's `with_values` expression; its 1,976-byte helper is a negative result. Changing only that bound expression to `8u8` yields the original 1,864-byte helper, which formats constant byte 56 (`8`) and the u8 index directly. A historical typed constant is another source-equivalent possibility; the original spelling/name is unknown.

Original error locations recovered from R8 pointer, exact slice length, and stored line are:

- Deprecated handlers: `programs/pump-fees/src/lib.rs:183` and `:188` (29 bytes).
- Initialize: `programs/pump-fees/src/instructions/buyback/mod.rs:94` (50 bytes).
- Both updates: `programs/pump-fees/src/instructions/admin/update_buyback_authority.rs:36` and `:47` (69 bytes).

The two adjacent deprecated line records constrain original ordering but do not reconstruct intervening items. The buyback paths establish original module/file separation. A future source-layout reconstruction should group the two updates with their shared context in the evidenced admin file, and initialization in the buyback module, using independently recovered surrounding declarations. Exact original formatting, comments, imports, constant name, and line placement remain unknown. No padding or `#[path]` trick was used to manufacture these line records.

`existing-log-evidence.json` independently binds three retained index-8 examples from the published regression: original `Left: 8` / `Right: 8` logs were absent from the old candidate. That suite compared errors, state, balances, inner instructions, return values, and event payloads, not all raw logs; its prior pass remains within that stated bound.

Builds, all 22 source/IDL/workspace inputs per build, exact build environment and compiler hash are retained under `*-build/build-attempt.json` and `build-comparison.json`. `trial-provenance.json` records the original archive, helper snapshots, dependency macro source hashes, and each hypothesis. Run `analyze.py` for the read-only comparisons; `reproduce.sh NEW_OUTPUT_DIRECTORY` reruns clean builds after verifying source/helper hashes. The source/archive lineage does not establish historical source identity. Runtime validation authorized subsequently is recorded separately.
