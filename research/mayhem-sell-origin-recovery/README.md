# Mayhem Sell arithmetic and source-origin recovery

This artifact-backed successor to the interval-location correction fixes the
three remaining Sell diagnostic differences in the retained matrix. The source
uses a checked arithmetic result carrying `MayhemError::PumpCpiMathOverflow`,
rather than unwrapping an `Option`, and recreates the subtraction and unwrap
source origins. The expiry/reserve checks use the previously investigated
shared state method. This method is still not a complete original body match.

The original failure builds error variant 9 at offset 129320, uses the recovered Mayhem error
Debug table, and unwraps that Result at state.rs 398:90. The reconstructed helper
now follows that error contract. The retained-rate subtraction is at 321:26,
interval overflow at 562:32, and Clock unwrap at 578:49. Formatting and helper
organization are reconstructed inputs, not claims about historical source text.

Two clean root builds produce the same 625,600-byte candidate:
`669fe92c30299d9b2fee1ac42815d3a6cfadb3c747ef361e5b917c19c3073c3b`.
Symbols hash: `2861e2cb3630c9582965655ee5fc6865a7eebbbcfe6a360ca44a3f06b3abd52b`.
All 15 compiler inputs and the three measured stages are retained. Only state.rs
and the Sell caller change from the interval-location baseline. The builds use
the pinned Darwin v1.54 compiler, v1.52 strip and private copied dependencies;
these are root rebuilds, not fresh all-dependency compilations.

Fresh verification:

- 396 signed Sell cases: 134 successful and 262 rejected pairs; no compared state,
 event, return, CPI, error or transaction mismatch. Every log line agrees after
 removing only explicit compute-consumption lines. 337 pairs still differ in raw
 compute logs, so resource-equivalent execution is not claimed.
- 1,032 admin transport/update/reset cases; 2,064 signatures and complete expected
 account bytes for 624 successes verify independently. Initializers are excluded.
- Three sequential Burn families, 12 signed transactions; complete byte/state,
 rollback and signature checks pass under the prior documented log comparison.

The prior 188 examined body matches and 58 raw-local windows remain. O0095 and
seven trade/Burn bodies remain unmatched; 245 windows remain opaque. No new
complete body match, canonical promotion or whole-ELF equality is claimed.

Run with Python and solders installed:
`python3 -B research/mayhem-sell-origin-recovery/verify.py`.
It rechecks source/artifact bindings, complete-body correspondence, every saved
Sell log line, and independent Sell/admin/Burn receipt verifiers. It executes no
compiler, target program or network request. The recorded build commands use
original absolute locators; adapt them to owned source/cache/tool paths. No
mainnet transaction was sent.

The refreshed [441-window inventory](functions.tsv) keeps 196 examined windows
separate from 245 opaque windows. Its 188 matches comprise 46 literal and
142 normalized-only bodies; twelve additional literal matches remain opaque.
No opaque window is silently counted as a recovered function.
