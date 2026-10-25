# Layered reconstruction pass 07

The preceding review identified a concrete legacy payout error-model gap.
This pass applies its one-check source correction and repeats the analysis.
The [accepted Fees checkpoint](../../pump_fees/legacy-value-v144/README.md)
retains account availability/equality checks, authorization, executable filtering,
early serialization and payout order while using owned formatted comparison
values for the mismatch error. Historical source coordinates remain natural.

The 828,184-byte c177acab candidate and its symbol file are byte-identical between
the isolated tested build and a clean main rebuild. All 17,461 existing
comparisons and ten separate sequence steps pass. Independent saved verification
checks 17,204 baseline signature fields and 80 focused signatures, plus the
unchanged historical signed transactions. No cases or handlers were added.

The formatting code inlines into the 26,128-byte legacy handler. Four actual
formatting call sites reach a raw-identical 40-byte Pubkey formatter. Unrelated
named with_values specializations are not treated as that caller. The full
585-original/562-candidate inventory retains 448 mapped, 135 unattributed and
two conflicting original windows. No normalized-match improvement is claimed.
Complete original helper/handler CFGs, diagnostics and transitive data/calls
remain unresolved.

The [remaining-work report](REMAINING.md), [current ledger index](current-analysis-index.json)
and complete [before](before-corrections/summary.json)/[after](after-corrections/summary.json)
byte ledgers retain every mismatch. Other accepted program and dependency
artifacts are unchanged from pass06. Exact acceptance remains **0/4 core
programs and 2/5 dependency captures**. The next open source work includes Fees
V2 independent account mapping and composition; Pump whitelist/mode,
settlement and event integration; Relay full error/serializer closure;
non-excluded AMM/Mayhem residuals; and authentic ATA/Metaplex build provenance.
All stopped scopes remain stopped. The security audit remains incomplete.

The first main-package verification found one omitted prebuild check script;
the exact recorded file was added. This packaging correction did not change
source, executable bytes, test assertions or the build. Its record is retained
in the package.
