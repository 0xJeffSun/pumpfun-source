# Direct recorded-output parity and cashback exit order

This checkpoint closes 70 diagnostic differences exposed by comparing recorded original/candidate outputs directly: missing overflow origins in liquidity and boost paths, differing incentive panic messages, and an extra period in error 6088. It also restores the original eager overflow-error construction and early UserVolumeAccumulator serialization on the legacy-buy cashback path. `order-evidence.json` verifies the serializer identity and its position before the subsequent pool-v2 validation path; this is static control-flow evidence, not an observation of intermediate memory.

Three additional apparent log differences came from different generated event-authority addresses on the two sides of the administration harness. The harness now uses deterministic invalid event/config addresses. Its before/after source and patch are retained. This does not alter contract behavior.

The fresh source-built candidate passes direct comparison of **all recorded fields in 17,462 cases**, including **15,567 top-level log pairs**, after removing only compute lines and exact source coordinates. There are **35,074 signed transactions**, **35,418 valid signature fields**, and **17,537 identical message pairs**. Those pairs include 75 pairs of original-program setup transactions used by the boost harness. The 1,895 cases without top-level full logs retain their original capture limits; this is not a claim of exhaustive runtime coverage.

All 72 buyback-recipient regressions and 91 controlled CPI cases also pass. Unlike earlier regression-only checks, `verify_saved.py` compares each candidate observation directly with the deployed-program observation and verifies equal signed-message inputs. The 70 former diagnostic failures and 3 former fixture failures are retained as a negative-evidence subset.

Candidate SHA-256: `fe3c75511a1499b496649313dc57a8fce0cacc88ceb23406a59be522dae458bf`, 1,257,048 bytes. It has **540/785 normalized original window matches**, **109 raw matches** and **245 unmatched windows**. No normalized windows were gained or lost relative to the preceding source. Raw matches decrease by four as layout/reference operands move. Whole-ELF identity remains false.

`results` binds source, actual Linux v1.44 build records, ELF files, runtime observations, signed sidecars, the harness scripts, focused observations and the negative subset. The source patch includes only the recovered behaviors. No padding, copied bytecode, fabricated source coordinates or forced compiler layout is used.

```sh
work/test-env/bin/python -B repro/pump_amm/diagnostic-parity-20261027/verify_saved.py --current-source
```

Remaining obligations include the 245 unmatched windows, complete referenced-data and deeper/indirect call identity, historical source/build provenance, and untested behavior such as authentic fixed-admin create_config success.
