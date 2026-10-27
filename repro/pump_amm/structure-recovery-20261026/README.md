# PumpSwap account layout and helper recovery

This source-derived checkpoint recovers nine additional complete normalized
original function windows without losing prior matches. It is a partial AMM
reconstruction, not a byte-identical or historically proven source recovery.

## Source changes and binary evidence

Both legacy contexts now store protocol fee recipient, event authority and
creator vault authority as owned `AccountInfo`, and store the fee configuration
as an inline `Account` rather than a boxed account. The pool remains boxed.
These changes restore both full account parsers, both exits, two initialization
closures and the sell instruction wrapper. The controlled ownership experiments
and immediate-call evidence are retained in
[context-ownership-20261026](../context-ownership-20261026/README.md).

Legacy buy checks base and quote zero amounts separately in the exact-quote and
ordinary branches. The predicates and order stay the same, but compilation can
specialize the shared error helper for constant zero operands. This restores
the 1,336-byte original helper at `0x340`. The isolated trial and caller analysis
are retained in [zero-guard-branch-recovery-20261026](../zero-guard-branch-recovery-20261026/).

The incentive diagnostic formats the actual account through dereferencing its
box. This restores the 224-byte account Debug body at `0xf978`; the prior Box
Debug body had an additional pointer load. Replayed diagnostic output remains
unchanged. No binary bytes, source coordinates or padding were fabricated.

`source.patch` contains the three-file change against the preceding arithmetic
checkpoint. `delta.json` binds all nine gained original windows and their
candidate symbol matches. Direct-call destinations and relocation operands are
normalized by the retained reader; matching bodies do not establish recursive
callee or referenced-data identity.

## Verified checkpoint

- Stripped candidate SHA-256: `5a18dd61d26fba038cec4321558312430901b92afbb81fbb7bda34a2ff0343bd`.
- Actual pinned compiler build, 30 stable source inputs; exact source, compiler
  command, build log, stripped and unstripped outputs retained under `results`.
- 512/785 normalized windows, 113 raw matches, 273 unmatched; nine gains, no losses.
- All 25 maintained suites pass: 17,462 cases, 35,074 transactions and 35,418
  independently verified signature fields.
- All 285 earlier focused cases pass on this same candidate.
- Every recorded effect and available log field matches the verified preceding
  checkpoint after compute lines and exact source-coordinate mapping. Some
  older suites do not retain complete logs; no additional full-log claim is made
  for those suites. The preceding checkpoint's 3,191 complete-log trade cases
  remain covered by this comparison.

The compatibility verifier maps source lines through the actual source diff.
The split zero guards are mapped by instruction and error kind. It does not
ignore changed error codes, messages, values, account origins, events, CPI or
state. Raw observed transactions are reparsed and every signature verified.

```sh
work/test-env/bin/python -B repro/pump_amm/structure-recovery-20261026/verify_saved.py --current-source
```

The saved verifier checks the fixed manifest, rebuild evidence, predecessor
receipts, fresh body measurement, complete recorded behavior and focused
receipts. It does not rerun SBF; original execution receipts are retained.
Large JSON files are losslessly compressed. Previous sealed checkpoints remain
unchanged.

## Actual call destinations

`static-graph.json` audits every matched window against its actual candidate
call targets, including ambiguous body matches as separate pairs. Of the 512
matched original windows, 487 have at least one candidate pairing whose immediate
direct callees match; 461 retain that property recursively. Only 68 have a
recursive matched subgraph free of relocated references and indirect calls.
These are instruction/direct-edge facts, not semantic or data-identity claims.
The verifier recomputes this report. Unmatched targets are ranked by distinct
original call sites to guide the next work.

## Remaining work

The candidate is 1,242,568 bytes versus the original complete ELF extent of
1,268,504 bytes. Whole-ELF equality is false. The separate 9,217,211-byte original
allocation suffix is zero and is not appended to the reconstruction.

The 273 unmatched windows, recursive call/data equivalence, historical compiler
and source-layout provenance, and authentic successful fixed-administrator
`create_config` execution remain open. The workspace-layout experiment restored
the original path prefix but gained no function matches and remains unpromoted.
