# PumpSwap arithmetic and account error origins

The maintained AMM source matches the retained 30-file source snapshot in
`results/source`. Its compiled candidate is `results/build/candidate.so`, SHA-256
`f2e3d0971611c15092aac85eb2b9dbd36094cc96335fb182ab9b38e2b0bda4f6`.
The build uses the recorded v1.44 Darwin compiler and v1.52 stripping tool.
Original program bytes were read for comparison after compilation.

## Recovered behavior

The four trade source files now retain the original kind of error origin on
the tested arithmetic failures. Targeted `error!` construction replaces plain
enum conversion at observed reserve, fee, division, missing-account and
cashback arithmetic sites. Other unobserved conversions are preserved.
The buyback conversion panic now has the original message, `buyback fee is at
most protocol_fee`, including the conversion error's Debug output.

For the legacy token-account owner failure, the reconstruction uses Anchor's
standard `CheckOwner::check_owner` contract. It checks the same accepted owner
set and attaches the actual owner public key as the account name to error 3007.
It does not substitute a source line or fabricate an account name.

The sibling `legacy-origin-recovery-20261026` package binds 4,024 original
instruction bytes, the pinned framework behavior, and the 99 source-origin plus
two owner-origin witnesses. This package binds another 1,936 original bytes and
nine distinct arithmetic origins. These are bounded instruction/runtime facts,
not complete call-graph or historical-source recovery.

## Verified results

- All 25 maintained suites pass: 17,462 comparisons, 35,074 submitted transactions
  and 35,418 independently verified signature fields.
- All 870 trade-v2 and 735 multi-hop cases match complete logs and effects.
- All 1,011 legacy buy and 575 legacy sell cases match complete logs and effects.
- The earlier 285 focused cases pass on this same candidate.
- Nine malformed legacy-origin receipts are rejected by the independent checker.

The 3,191 trade cases are part of the maintained corpus, not additional cases.
Full-log comparisons exclude only compute consumption and exact reviewed source
or panic coordinates. Error names, codes, messages, numeric/key values, account
names, events, CPI data and committed state remain checked. No `occurred` versus
`thrown in` difference or incorrect panic message is excluded.

```sh
work/test-env/bin/python -B repro/pump_amm/arithmetic-origin-recovery-20261026/verify_evidence.py
work/test-env/bin/python -B repro/pump_amm/arithmetic-origin-recovery-20261026/verify_saved.py --current-source
```

The saved verifier checks the fixed publication manifest, actual build/source
identity, all raw signatures, the full trade/route/legacy assertions and prior
focused checks without executing SBF. `results` preserves the exact stripped
and unstripped outputs, source snapshot, commands, logs, every full-corpus
receipt, enhanced trade/route observations and focused replays. Large JSON is
losslessly compressed; existing gzip sidecars retain their original bytes.

The first local build deliberately remains separate under
`work/amm-arithmetic-origin-recovery-20261026/build`: it established the changes
but still missed three effective-virtual-overflow origins and two market-cap
division origins. The accepted combined build closes those five gaps and adds
the separately verified legacy source. No failed or partial result is relabelled.

## Remaining completion requirements

Exact reconstruction is still incomplete. The current candidate is 1,237,520
bytes versus the original complete ELF extent of 1,268,504; their bytes differ.
The separately verified unused allocation suffix is 9,217,211 zero bytes.
Normalized function matching remains 503/785 with 113 raw matches and 282 unmatched
original windows. The previous error-helper specialization loss remains open.

Next work must establish the unmatched AMM/helper bodies, recursive data and
indirect-call identity, original build/layout provenance, and authentic successful
fixed-administrator `create_config` behavior. Full-log equality here covers the
3,191 retained trade cases, not every program input or all remaining handlers.
This checkpoint does not assert deployability, whole-original equality or a
completed goal.
