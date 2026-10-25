# Complete Fees error enum

The rebuilt 31-handler candidate is 771,048 bytes, SHA-256
`ee634139df8b234a16057024ceb71b6c72a7dd738c61307a70acc298a7ec8d55`.
It still differs from the captured original at byte 24. Full source identity,
complete account validation and original-program security remain unresolved.

This source change restores all 37 official IDL error variants in numeric order.
The previous enum omitted `UnauthorizedProgram`, `UnsupportedQuoteMint`,
`InvalidRemainingAccounts` and `PoolCreatorFeesNotSwept`. The messages for errors
6003 and 6011 are the literal string `format` in both the IDL and the captured
runtime. The previous reconstruction substituted descriptive messages. The new
two-case receipt retains before/original/after logs and compares error names,
numbers and messages as well as state, balances, events and inner calls. Source
file/line locations and compute logs still differ and remain visible.

The candidate passes **17,363 comparisons**: 17,331 existing regression cases,
two genuine historical initializer replays, 28 initializer rejections and two
targeted message checks. The ten-step donation sequence also passes with 20
normally signed transactions. The initial isolated build and subsequent clean
main-source build are byte identical; the regression receipt applies to those
exact artifact bytes. No executable was edited. Prior independent Surfpool
receipts remain attached to the [previous executable](../all-thirtyone-v144/README.md);
they were not rerun or relabeled for this enum-only change.

The diagnostic function matcher now locates the complete 8,904-byte error-name
function at original offset 280976 and the 1,480-byte display function at 290384.
Both match after masking relocation/call immediates in memory, with consistent
mapped callees. Raw bytes differ. The total becomes 387 matching bounded ranges
of 512 inspected; overlapping Anchor/crate categories are not confidence scores.
Relocated data and unmapped callees remain outside this comparison. See the
[method](../framework-matching/README.md).

The package contains the compiler's unstripped symbol source, build inputs/log,
source and local harness snapshots, receipts and hashes. `enum-inputs.json` is the
initial scratch-experiment record, before promotion to main. Reproduce the message
check with `scripts/fees_error_messages_differential.py --candidate <rebuilt.so>
--baseline repro/pump_fees/all-thirtyone-v144/pump_fees_candidate.so --output <receipt.json>`.
The standard regression and initializer runners accept the same candidate path.
