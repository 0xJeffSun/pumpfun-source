# Mayhem composed recovery: 411 of 441 original windows

This integrates the independently tested account, trade and interface recoveries
on the published 375-window source. The complete inventory now contains **59
raw-local matches, 352 normalized-only matches and 30 unmatched windows**.
The 36 newly matched windows cover 112,480 original text bytes. The unmatched
windows cover **155,520 of 706,744 original text bytes (22.0%)**.
These are body-window measurements, not a completion estimate. Whole ELF and
capture equality, all referenced data and transitive behavior remain unresolved.

## What changed

| Original windows | Recovered source/body |
| --- | --- |
| O0003, O0004 | Explicit zero/default layouts for external account codecs |
| O0025, O0027, O0030 | External program ownership values loaded from static Pubkeys |
| O0068, O0069 | Native and quote withdrawal execution wrappers |
| O0070, O0087, O0184 | Flat global-update arguments, helper and dispatch |
| O0116, O0118 | Fee-recipient parser and conditional ATA initialization |
| O0126, O0128, O0130, O0132, O0135, O0137 | Six trade account exit routines |
| O0133 | Complete SellEvent data routine with recovered memory and wire layouts |
| O0146, O0147, O0148, O0166, O0185 | Mayhem-state initialization closures, exit, drop and dispatch |
| O0160–O0165 | Both AMM CPI bodies and their account-info/meta builders |
| O0202, O0212, O0213, O0220, O0221 | Shared decoder-error helper and checked/unchecked external account codecs |
| O0222 | Serializer used by the actual BuyV2 CPI wrapper |

All prior normalized and raw-local matches survive, along with every previously
matching direct-call observation. Thirty-four new windows have matching immediate
callee shapes for all counterparts. O0166 still calls unmatched O0167; O0185
still calls unmatched O0145 and O0193. The 301 uniquely paired windows contain
3,535 matching and 13 different immediate-callee observations. None of this
establishes indirect or transitive closure.

The source also restores the shared post-buy accounting calls reviewed in PR233
and the non-admin sweep rate check. Neither is counted as a complete body gain.
The sweep helper still differs by one instruction. The 150-case rate matrix
retains the parent's 34 failures and records zero on the composed candidate.

## Data and remaining gaps

Portable checks recompute exact-width data observations from both binaries:

- Account recoveries: 156 references across 30 counterpart instances; 34 typed
  equal, 63 typed different and 59 with unresolved extents. Counts include repeated
  counterpart observations and are not unique data-object counts.
- Seven interface bodies: all 297 immediate callees match; 46 of 48 Source
  records match. Two SDK iterator paths remain `/Users/runner` versus `/home/runner`.
- Both withdrawal wrappers and SellEvent: all 31 immediate callees and three
  referenced items match, including the event's `197:1` source coordinate.

The account differences include source filenames/coordinates and two formatter
vtables. Those vtables select nonmatching `String::write_str` and
`String::write_char` targets despite matching enclosing decoder bodies; matching
implementations also exist elsewhere in the candidate, so selection remains the gap. Other
unresolved data, remaining instruction bodies, relocation/layout recovery and
the complete build provenance still require work. `unmatched.json` enumerates
all 30 remaining windows; `functions.tsv` covers every original window.

## Build and execution evidence

The 64-input source is materialized from the authenticated 375-window parent
plus 16 added/changed files. It uses ordinary Rust, a local external-account
crate, the existing Pump V2 interface dependency and a shared macro callsite for
the two AMM interfaces. Two builds recompile the root, Anchor and both local
interface/account crates and produce identical artifacts:

- Candidate SHA-256: `17869439c63dd10e06a87252b770ff7041654768d7b419e014d09a0b4422ba97`
- Symbol ELF SHA-256: `aca40470915f5b1e7fd30a9bb658ffdade9871e3a4ff32956ae03ec7c0df6146`

Other cached dependencies are reused. This is not an all-dependency-clean build
or proof of the historical build recipe. No original ELF is a compiler/linker
input; no compiler output is patched or padded. Selected canonical sources and
artifacts are unchanged.

Fresh execution on this exact candidate passes 6,636 trade comparisons, 1,032
admin cases, 1,601 fee-recipient/sweep/withdrawal cases, three two-step Burn
families and the 150-case sweep-rate matrix. The initializer passes 53 standalone
rejection cases and 16 captured-Pump CPI cases, including ten successes. The
original Pump is the caller on both sides; genuine `invoke_signed` supplies its
PDA signature. The misleading inherited zero-creator fixture is excluded because
it does not put zero in the payload. Arbitrary production-authority initialization
and exhaustive behavior are not claimed.

All transactions use local synthetic fixtures or explicitly retained Burn
snapshots with ordinary signature/blockhash checks. No live RPC or mainnet
transactions occur. The saved-receipt verifier rederives account, rollback,
event, CPI, return and signature predicates. Existing diagnostic differences
remain explicit; finite passing cases do not establish perfect recreation.

```sh
python3 -B research/mayhem-composed-recovery/analysis.py --check
python3 -B research/mayhem-composed-recovery/verify.py
python3 -B research/mayhem-composed-recovery/test_scope.py
```

Verification needs the prepared `solders` environment. These commands recheck
saved evidence and do not execute a compiler or target VM. Three negative
controls reject unsealed source, substituted parent artifacts and duplicate
runtime cases.
