# Mayhem: complete static window audit

This scan compares **every one of the 441 original windows**, covering all
706,744 `.text` bytes without gaps or overlaps, against the existing AMM-source
candidate. It discovers no new compiled recovery: it exposes strict comparisons
that the narrower source-interpreted ledger had retained under an opaque label.

| Full static body status | Windows |
| --- | ---: |
| Literal raw-local body match | 58 |
| Normalized-only body match | 269 |
| No complete counterpart | 114 |
| Total | 441 |

The matched window extents cover 210,808 original text bytes. Unmatched extents
cover **495,936 bytes**. This is not a completion percentage: matching bodies
can still have different callees, referenced data, interfaces or semantics.
Full ELF/capture equality remains false. The compiled candidate is unchanged:
`fa4f9894cdecf2dd1528fe09e25aa8b762fea5771a8b32827ccff5f8c0b24da7`.

## How this relates to the previous ledger

The preceding 198-window source-interpreted cohort retains 188 matches and ten
unmatched bodies. Its 243 opaque rows contain another **139 structural matches
and 104 unmatched windows**. A full static scan does not establish the semantics
of those 243 rows or silently promote them into recovered source functions.
`previous_scope` preserves this distinction in each output row.

The ten source-interpreted unmatched extents total 101,480 bytes. They are only
part of the 495,936-byte complete static remainder. The [full unmatched list](unmatched.json)
includes all 114 extents, ordered by size, including large unclassified parser
or framework candidates. Their original source roles remain unproved.

## Counterpart ambiguity, calls and data

Of the 327 matched windows, 234 have one candidate counterpart and 93 have more
than one. Candidate symbols are retained in [functions.tsv](functions.tsv), but
are not authenticated original names. This makes generic/helper duplication
visible instead of picking a convenient counterpart.

For each candidate, [audit.json](audit.json) records every direct call edge and
whether its destination's complete normalized shape agrees. Among the 234
unique counterparts, 207 have agreement for all direct edges (including those
with no direct calls); 27 have at least one disagreement. Their direct edges
contain 1,016 matching and 47 different destination shapes. This is a one-step
structural check, not transitive closure or numeric call-target identity.

138 unique counterparts have relocated data references. Data extents/content
remain unproved here. Indirect calls, external calls and branches leaving a
window are counted separately. Even a raw-local match is not a claim that the
whole callable interface or execution is perfect.

The matcher requires equal window lengths, normalized instruction hashes and
identical relocation patterns. Normalization is unchanged: only direct-call
displacements and declared relocations are masked. Original boundaries remain
inferred next-entry extents; equality does not authenticate historical debug
function boundaries.

## Root compiler controls

Three real root compilations keep the same sixteen source inputs, SDK and cached
dependencies while overriding only the root's MIR optimization level. Their
commands, logs and artifacts are retained under `controls/`.

| MIR level | Full static matches | Accounting body bytes | Quote body bytes |
| --- | ---: | ---: | ---: |
| 0 | 298 | 2,672 | 1,192 |
| 1 | 299 | 2,672 | 1,192 |
| 3 | 326 | 2,528 | 1,144 |
| Existing candidate | 327 | 2,536 | 1,120 |
| Original reference | — | 2,544 | 1,256 |

None recovers the original accounting or quote body. These are negative controls,
not a new selected toolchain or runtime-tested candidates. They do not identify
the historical compiler. The existing default candidate remains the research
baseline. No source or generated ELF bytes were patched.

## Recheck

```
python3 -B research/mayhem-full-window-audit/audit.py --check
```

The check recomputes all 441 comparisons and call maps from pinned original and
candidate artifacts, then authenticates the three compiler controls. It runs
neither a compiler nor a target. The saved runtime evidence stays with the
[AMM source-origin packet](../mayhem-amm-source-origins/README.md): 5,382 signatures
and bounded trade/admin/Burn lanes. Initializers are not executed by this audit.
