Static review complete; authentic unified BuyV3 remains unresolved. No Rust patch, main change, build, fixture or runtime test.

- Current Pump731003 wrapper/parser/body/exit rebound to exact symbols; all four differ from original raw and call-immediate-normalized bodies.
- Original requires one typed parser, early full FeeConfig decode plus stored bump, owned volume init/exit, and asymmetric typed quote admission. Compatibility mux is not original evidence.
- Original passes optional-fill flag into body; accepted and proposed wrappers discard it. This is a separate source-contract gap.
- All117 current saved BuyV3 rows/105successes retained. All117 have equal137-byte nonzero-user volume post-state; not evidence for zero-user/init behavior. No token extensions decoded.
- REPORT.md names minimal correction bundles, missing source evidence and exact next static windows. contracts.json has17account rows and117preservation rows; analysis.json contains every call/branch/LDDW in the four original/current windows.
- verify.py is standalone/offline. Copy the entire publication and run `python3 -B verify.py`. Manifest and owned-map define the entire public handoff; do not export worker telemetry.
