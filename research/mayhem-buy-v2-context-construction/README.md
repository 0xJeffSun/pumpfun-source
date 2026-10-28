# BuyV2 direct CPI context construction

Passing the same 27 ordered accounts directly into `CpiContext::new_with_signer`
changes the missing flag-copy code generation. The previous typed-price/owned
error composition has 27 fewer of each selected load/store opcode than the
original. This direct-construction artifact has the same counts as the original:

| Opcode | Previous composition | Original and direct construction |
| --- | ---: | ---: |
| 32-bit load `0x61` | 4 | 31 |
| 32-bit store `0x63` | 3 | 30 |
| Byte load `0x71` | 83 | 110 |
| Byte store `0x73` | 82 | 109 |

These are actual instruction counts, not a proof of every data-flow route.
The ordinary Rust change removes a separately bound account-structure value;
it adds no explicit flag/padding writes, extra clones, assembly or binary edits.
Only `src/instructions/buy_v2.rs` differs from the qualified 67-input source.
All other 66 inputs, generated prefix, namespace and current Source 101:2 stay
unchanged.

## Exact bounds and controls

The matched entry wrapper's offset 760 identifies the actual BuyV2 bodies.
The direct body is 18,376 bytes versus original 18,648 and the previous 17,376.
Its 49-callee multiset agrees with the original, with ordered-call LCS 46/49.
The full strict body remains unmatched. All 432 normalized original counterparts,
84 native raw-local windows and 4,383 positive immediate edges are preserved by
exact set comparison. No new complete window or global frontier gain is claimed.

Two real root compilations reproduce both complete direct outputs. Candidate:
`cbe7daa9cd9a0ea087acac203e80b9a3fd9953a0376cdd83253bd6009fc6589a`
(766,440 bytes). Symbols:
`17f9a80b5819ebd715c1744605b4e2eadcde85f51d3b8abbc6a68116926a381b`.

| Profile | Body bytes | Ordered original callee matches | Scope |
| --- | ---: | ---: | --- |
| Previous composition | 17,376 | 46/49 | Earlier artifact/provenance retained |
| Direct context | 18,376 | 46/49 | New source and fresh replay |
| Actual root repeat | 18,376 | 46/49 | Both complete outputs byte-identical |
| Local quote checks | 18,560 | 39/49 | Static control; no VM qualification |
| Pre-CPI quote flags | 18,672 | 39/49 | Static control; no VM qualification |

The two quote controls have closer lengths but worse ordered correspondence.
They remain controls. Counts, size and a callee multiset do not replace complete
body comparison. Original Source filename length 61/line 376 still differ from
the current length 50/line 101. Modules/files and Source fields are not renamed or
substituted to pursue identity.

## Fresh direct-artifact replay

Only this new direct artifact runs the three complete frozen 613-case BuyV2
families:1,839 fresh original/candidate pairs and 3,678 independently verified
signed records. Previous parent/proposed receipts retain their own artifact
hashes and are not retagged as execution of this candidate.

| Quote family | Pairs | Successful pairs | Rejected pairs | Non-compute log differences | Raw log differences |
| --- | ---: | ---: | ---: | ---: | ---: |
| Native SOL | 613 | 284 | 329 | 0 | 466 |
| SPL Token | 613 | 210 | 403 | 0 | 466 |
| Token-2022 | 613 | 210 | 403 | 0 | 466 |

The unchanged comparison and independent verifier check errors, tracked accounts,
events, return data, CPI, transaction bytes/signatures, successful state and
failed-transaction rollback. A read-only forwarding observer checks actual six
loaded program data hashes before/after every signed VM execution. Signature,
blockhash, signer, authority and CPI checks remain enabled; all seventeen frozen
input files remain unchanged.

There are no new unique cases. The 1,398 raw log differences and finite coverage
remain explicit. These results do not establish exhaustive behavior, resource
identity, CPI-error callback execution coverage, a complete call/data graph or
whole-ELF identity. Five archived profiles include four new root compilations
and the earlier parent's actual provenance. These use the recorded official
Linux SDK v1.54 and warmed dependencies, not an all-dependency-clean rebuild.

## Recheck offline

Use ordinary Python 3 with solders 0.27.1:

```sh
python 3 -I -B research/mayhem-buy-v 2-context-construction/verify.py
python 3 -I -B research/mayhem-buy-v 2-context-construction/test_scope.py
```

The verifier authenticates packet/source/tool bindings, all complete outputs and
standard objcopy replays, then recomputes the observations with the unchanged
matcher. It unpacks the lossless fresh runtime records and reruns the frozen
independent checker. It executes no target VM, compiler, Git or network request.
Three external inputs are pinned; no unsealed cache is required. Scope tests
mutate actual in-memory Source/callee bytes without changing reference files.

Only this research packet is added. Original binaries remain read-only
comparison/VM inputs and never compiler/linker inputs. Selected sources, frozen
scripts, workflows, ledgers and stopped lanes are unchanged.
