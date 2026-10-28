# Independent AMM reserved-account error helper recovery

**The current upstream union7 already reaches 780/785 and includes this window. This packet is an independent recovery on an earlier source cohort, not an advance of the selected project frontier.** It retains complete per-case receipts and sixteen focused signed diagnostic pairs.

This source-only continuation of [the 771-window fee-flag recovery](../amm-multi-hop-fee-flags-20261028/README.md) adds the complete **232-byte normalized window at `0x2288`**. The candidate reaches **772 / 785**, retaining all **163 raw-equal bodies**, with **zero normalized or raw losses**. Thirteen windows remain in this earlier candidate; whole-ELF equality is false. Maintained checkpoints are unchanged.

The original reserved-recipient handler calls a String-specialized account-name error helper. The candidate previously inlined that operation. A private, ordinary `#[inline(never)]` helper now attaches the same formatted name through Anchor's existing `Error::with_account_name` implementation. Both executable-recipient and rent-exemption error paths use it. Existing source-error positions are preserved; the helper is appended after the existing source.

All 232 helper bytes match after masking only the two direct-call displacements. There are no helper relocations. Both calls resolve to the same complete `String::clone` body as the original, and incoming calls originate in the real reserved-fee-recipient handler. This is a used program boundary, not an unused matching function. There is no assembly, embedded binary data, added positioning padding, original-derived linker layout or binary editing. The spelling and outlining attribute are reconstruction choices, not historical-source attribution.

## Qualification

Two AMM root recompiles produce identical complete ELFs. Unchanged dependencies are cached; this is not a fresh toolchain bootstrap.

- Candidate SHA-256: `f9c60f6d939a483ae1c2204c741ba109ba8597892c2c93eefa744c0c58a5eed9`
- Unstripped SHA-256: `0e25df4fe36dee2006eddf6e75cca92333525a832c003b5f79e9a95f89318393`

All **25 existing suites / 17,462 cases** pass their compared state, error, event and CPI observations. Complete receipts retain **35,074 transactions / 35,418 signatures**. An additional **16 focused pairs / 32 signed executions** exercise executable-recipient and rent-exemption rejection at every recipient index. Their account-name diagnostics and all other logs agree after excluding only runtime compute-meter lines. The additional fixtures use ordinary verified test-owned signatures; they do not fabricate PDA signatures or bypass checks.

The five inherited incentive error-order controls also pass. Both the 1,192-byte raw scanner and the 704-byte normalized fee-flag helper remain matched; their resolved calls and the scanner's three companion functions are rechecked.

Raw ordered logs differ in **3,222** broad-corpus cases; existing comparators exclude those fields. The inherited incentive stack-frame diagnostic remains. These are bounded synthetic local executions, not exhaustive equivalence, live-chain validation or a warning-free maintained build.

```sh
python3 -I -B research/amm-reserved-account-name-20261028/verify.py
python3 -I -B research/amm-reserved-account-name-20261028/test_verify.py
# Requires solders 0.27.1 in this interpreter:
python3 -B research/amm-reserved-account-name-20261028/verify.py --signatures
```

The offline verifier recomputes all window counts, the single-file source patch, repeat equality, incoming calls, both resolved String clones, every compared corpus observation, focused diagnostics and optional transaction signatures. Counterexamples reject resealed false counts, changed source patches and falsified case observations. Optimized Python is rejected because it disables assertions.

Builds initially record gains against union4's 769-window baseline; the verifier separately proves **771 -> 772** against the selected parent. Complete source, compiler receipts, exact controllers and runtime records are retained. Recorded build/replay controllers include their original workspace paths; adapting those paths requires new receipts. The focused producer discovers its repository root and can be rerun with `--candidate PATH_TO_ELF --output NEW_RECEIPT.json.gz`.

Hashes and receipts are reproducibility evidence, not cryptographic execution attestation.

`input-snapshots/` freezes the exact repository harness and fixture inputs used by these runs. Offline verification checks those snapshots, so later upstream harness changes do not silently change this packet’s evidence.
