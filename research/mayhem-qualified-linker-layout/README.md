# Qualified Mayhem linker-order control

This source-unchanged control orders all 456 input function sections through qualified object/archive-member selectors. It preserves **428/441 normalized original windows** and raises raw-local matches from **70 to 100**, with no prior raw, normalized, positive-callee or typed-Source loss. Thirteen original windows remain unmatched. Whole-file identity with the deployed original is not established.

## What the control proves

The source archive and all 66 source hashes are byte-identical to [the trade-source-origin baseline](../mayhem-trade-source-origins/README.md). `config/default.ld` and `config/ordered.ld` differ only in the text-section selector list. The wrapper records forwarding every linker argument unchanged except that script substitution. No instruction padding, new normalization masks or output patching is used.

Two original-controller builds reproduce:

- Baseline candidate: `8b11b4a471b61c734e8e803b2901d7d39050253d7f5f73ac1409fed36369b0e7`
- Baseline symbols: `c29b81a84b4308170d65eb9a0d602e6246c7a1ba9ec98dc71fcbf6fee3944333`
- Reordered candidate: `dffea119edb8ce5033dc9e41c167ec082a2488310db2283442a250b47a3e6c73`
- Reordered symbols: `14325ed294f3c11cbe43795cd71f83ed1d55a65df32ed31e9b53d5acebc7017f`

`translation.py` derives the function permutation independently from both maps. For stripped and symbol ELFs it predicts every text byte after adjusting the actual 4,929 direct calls and 1,967 text relocation sites. All 10,352 local branch targets are also checked; none crosses a function section. Forty-eight relocated code literals move. The complete 664,384-byte text section is covered exactly once; no function is added, removed or resized.

The same check verifies all 2,542 relocation records, including 2,412 relative-pointer and 130 imported-call records. Relocation records reorder, but their full translated multiset is equal. All 445 pointers in the 7,968-byte `.data.rel.ro` section are checked; only 74 code targets move. The 18,604-byte `.rodata` section is byte-identical. All other allocated-data bytes, both exported symbol values, 568 ordinary symbol-table values, and the entrypoint translation from 436,728 to 483,016 are accounted for. Program and section headers remain identical apart from the entrypoint field in the ELF header. The checker uses temporary in-memory comparison buffers and never writes an ELF.

`analysis.py` independently recomputes all 441 original windows. `progress.py` retains every prior body, raw-local match, positive edge, matching Source observation and observed Source profile. The 30 new raw-local matches remain local-window facts; they do not establish data, relocation or whole-function identity with the original. The translation proof instead establishes preservation of the rebuilt baseline.

## Original-placement limits

`config/plan.json` contains **hypotheses** for 441 original positions plus 15 extra sections. Qualified selectors identify actual candidate inputs, not authenticated original source ownership. See `MAPPING-REVIEW.md` and the regenerated `mapping-review.json`.

The inherited 13 conflict observations collapse to four distinct conflicts. Unique matched callers already require original O0232 to correspond to two distinct candidate `Error::new` copies; O0246 similarly receives incompatible `grow_one` identities. A different greedy tie-break cannot remove those constraints.

Original O0209 and O0237 both need a 328-byte `finish_grow`, but only one candidate section has that shape. No candidate 640-byte reserve helper calls that 328-byte child; their children are 656/312/312/312 bytes. Thus the maximum injective original-shape assignment is 427 even though the inventory covers 428 original windows by shape. The plan has 14 unequal body assignments: the 13 unmatched windows plus this one multiplicity deficit. Ordering does not recover the missing specialization or original sharing graph.

## Runtime and verification

Fresh validation of this reordered artifact covers all **6,636 trade cases in fourteen suites**, with **13,272 signed transaction records**, plus **301 extension cases and 602 signed records**. Every recorded signature is reverified. All checked effects, errors, events, inner instructions and return data match the original. Non-compute logs are also unchanged from the fixed baseline, retaining its seven known trade diagnostic differences.

These are **6,937 comparisons and 13,874 signed transaction records**, not unique transaction counts or exhaustive branch coverage. Parent receipts remain separately attributed; they are not relabeled as executions of this artifact.

From a repository with its prepared Python environment:

```sh
python3 -B research/mayhem-qualified-linker-layout/verify.py
python3 -B research/mayhem-qualified-linker-layout/test_scope.py
python3 -B research/mayhem-qualified-linker-layout/analysis.py --check
```

Use `--repository-root /absolute/repository` when reviewing this packet outside the normal `research/` directory. `verify.py --skip-runtime` works with `python3 -I -S -B`. Verification is read-only and performs no compiler, target-VM, network or live-chain operation. The saved build wrapper is historical build evidence; its local SDK paths are not required by the verifier.
