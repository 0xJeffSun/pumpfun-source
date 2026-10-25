# Admin CTO typed-curve checkpoint

This isolated candidate applies only the reviewed admin_cto.rs correction and a reviewed borrow-scope-only repair to the f8d6 full-curve baseline. The first pinned build failed with E0502 at emit_cpi; it is preserved. A second pinned build succeeded using the same compiler/strip/dependency/helper recipe. No blind source or compiler search occurred.

Candidate is5d35884bf79de90850e23ac5e6781b328430b8748f62e4c1381cb77b9f2e0a6c (1580712bytes); symbols9f74f5cf77c959999064695c046a41b70c497db02d98e80742eb11edc2c34305 (2161808bytes). Full typed decoder/serializer and mutation-before-pool-CPI/AdminCto Clock checks passed, including restored6080 ordering. Source37, tools/SDK/helpers and252packages/14281files were gated. Whole original identity remains false.

All unchanged permitted9269 differential and1024Surfpool comparisons passed with zero functional mismatches. Final saved receipt checks reverify signatures, effects and exact37source bindings. No new fixture or probe was added. The source proof and borrow repair are separately sealed; all other source and helper bytes remain unchanged. Existing provenance, diagnostics, indirect/data and broader source/SDK-completeness limits remain.

The CTO-specific unchanged363 differential and24Surfpool cases passed. They include25short-curve differential inputs (17original successes) and one successful short Surfpool input. They contain no holder+old-cashback combination, no fee+effective-cashback/6080 case, and no exact123byte/nonzero-fee case. Those refinements remain static-source/CFG supported, not directly runtime-covered. No exhaustive behavior or security-completion claim is made.
