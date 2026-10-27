# Parallel AMM fee and helper recovery

This checkpoint integrates the independently recovered FeeConfig decoder, caller-level allocation gates, creator-fee enable guards, original dispatcher declaration order, and shared cashback/pool-v2 helpers. The decoder now matches the original 1,176-byte body; stable/exotic allocation checks remain in their callers. The global creator-fee flag now controls legacy, v2 and AMM multi-hop overrides.

Candidate SHA-256: `2f5dfd029128dd345dfe80a4fc5385fb4624127b5d77ddb3c81a2bba024b08dd`. It has **541/785 normalized original window matches**, **109 raw matches**, and **244 unmatched windows**. Whole-ELF equality remains false.

Validation passes direct comparison of all recorded fields in 17,462 cases, including 15,567 top-level log pairs, plus 72 buyback cases, 91 controlled CPI cases and 1,312 targeted fee/creator-flag cases. All 35,074 corpus transactions have valid signatures and 17,537 identical message pairs; the targeted probes separately verify their signed pairs. Compute lines and exact source coordinates are excluded. Cases without full captured logs retain their scope limits.

Run `work/test-env/bin/python -B repro/pump_amm/parallel-fee-gates-20261027/verify_saved.py --current-source` from the repository root. The verifier authenticates this source/build/corpus and the independent agents' targeted proof packages.

This is an intermediate reconstruction checkpoint. Subsequent probes have exposed remaining exact-buy arithmetic/order, whitelist-exemption and liquidity-overflow differences. Those corrections, additional Pool/GlobalConfig reader recovery, deeper call/data identity and complete byte equality remain ongoing; this checkpoint is not a completion claim.
