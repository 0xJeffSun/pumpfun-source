# Fees initializer scratch implementation and signed replay

The initializer implementation matches the captured Fees program in **30 local comparison cases**: two unchanged genuine historical signed transactions and 28 rejection cases using ordinary test-owned signers. Main program files were not edited. The independently compiled scratch executable is **not byte-identical** to the captured original.

## Source and build

The scratch crate at `crate/` copied the parent's then-current 27-handler Fees source. `base-source-sha256.json` records those inputs. Only three files changed for this lane: the `InitializeFeeConfig` account context, its handler body, and the new event type. `initializer-only.patch` contains exactly those edits; `make_handoff.py` reconstructs each pre-edit file and checks it against the saved source hash before generating the patch. Integrate this patch, not the full scratch crate, because the parent is independently adding three other handlers.

The implementation uses ordinary Anchor initialization with payer/admin, canonical `[fee_config, config_program_id]` seeds, **2512 bytes**, and the fixed admin address constraint with `InvalidAdmin` (6001). It sets only bump/admin, then emits the IDL event as a log and self-CPI. Existing recovered FeeConfig parsing and serialization supply the historical-size compatibility.

Clean-target, locked, offline build command:

```sh
CARGO_HOME="$PWD/work/fees-v144-cargo-home" work/test-env/bin/python scripts/build_partial_candidate.py \
  --manifest work/fees-initializer-static/crate/Cargo.toml \
  --program pump_fees --artifact-name pump_fees_candidate.so \
  --tools-version v1.44 --output work/fees-initializer-static/build1
```

`build1/` retains the actual build attempt, log, compiler metadata, all 16 source hashes and full comparison. The output directory must be fresh for any reproduction. The prepared Cargo home contains the previously checksum-verified locked crates. No original program bytes are compiler inputs.

- Candidate: **702208 bytes**, SHA-256 `5109e48190bb9ee683dc964780e2a3353859605c219f7787c1521f48d4fc6d2d`.
- Original: **948944 bytes**, SHA-256 `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.
- Full-file equality: **false**, first difference at byte 24.
- Build succeeded; no stack-offset errors were emitted. Five ordinary existing deprecation/unused-variable warnings remain.

## Exact signed historical replay

`replay_history.py` consumes the two saved RPC captures identified in `REPORT.md`. It verifies each original Ed25519 signature, keeps all **313 signed transaction bytes unchanged**, and explicitly enables LiteSVM signature verification. It never constructs a substitute signature for the fixed admin and never changes instruction account metas, data or the original message.

The only transaction-validity adjustment is `with_blockhash_check(False)` in the isolated local bank, so the original stale blockhash can be replayed. A separate control uses the same unmodified transaction with freshness checking enabled and observes `BlockhashNotFound`. This control is excluded from the two behavioral comparison cases.

The fixture sets the recorded Clock slot/timestamp and recorded account balances; the new FeeConfig and event authority begin absent. Pump or AMM captured code is loaded as the read-only namespace account; the initializer does not invoke that program. Fees original and candidate run in separate fresh VMs. All initial account fields match between the two runs except the deliberately different Fees executable's size/hash. Those exact hashes remain recorded, and each program account must remain unchanged within its run.

Both original and candidate succeed for both messages and match in:

- newly created FeeConfig bytes, including the 2512-byte allocation, bump, admin and zero fees/vectors;
- all recorded post-balances, including **18,374,400** rent lamports and **5,000** transaction fee;
- exact event log payloads and inner CPI instruction structures;
- all other message-account data, owner, executable and balance fields.

The original historical RPC event/balance results match as well. The original/candidate compute-unit logs differ and are retained, not treated as equal. The historical deployment was from August 2025; replay executes the later captured original and the scratch candidate under the current LiteSVM runtime. Historical account data beyond the absent FeeConfig/admin System-account precondition is not available, so this is not a reconstruction of the complete historical bank or historical program version.

The first comparator mistakenly included the intentionally different loaded executable's size/hash when comparing fixture snapshots. That failed receipt is preserved as `historical-replay-comparison-before-harness-correction.json`. The correction excludes only those two source-image attributes, retains their actual values, and asserts each executable account stays unchanged. It does not hide any state mutation or claim executable equality. The corrected final receipt is `historical-replay-comparison.json`.

## Ordinary-signature rejection comparisons

`negative_differential.py` adds **28 cases**. The fixed privileged admin is never claimed as a signer in these transactions. Two deterministic ordinary test keys sign actual messages, runtime signature verification is explicitly enabled, and each transaction verifies cryptographically.

Cases cover wrong admin, prefunding around rent thresholds, insufficient payer funds, missing signer, read-only accounts, wrong PDA/System/event/program accounts, pre-existing account ownership/data, missing accounts, another namespace, and ignored trailing argument bytes. Every original/candidate error, account state, balance and inner instruction matches; all 28 original results reject. The wrong-admin path returns 6001 after its attempted System initialization, with state changes rolled back. Read-only payer/config cases encounter runtime privilege rejection during CPI before later Anchor writable checks, matching the original. A wrong event/program combined with wrong admin rejects on admin first and does not claim coverage of the later event constraint under valid admin authorization.

These cases supplement the two authentic successes; they cannot vary arbitrary signed admin metas or payloads while preserving the authentic signature, and no such mutation was attempted.

## Verification and integration

```sh
work/test-env/bin/python work/fees-initializer-static/replay_history.py \
  --candidate work/fees-initializer-static/build1/artifacts/pump_fees_candidate.so \
  --output work/fees-initializer-static/historical-replay-comparison.json
work/test-env/bin/python work/fees-initializer-static/negative_differential.py \
  --candidate work/fees-initializer-static/build1/artifacts/pump_fees_candidate.so \
  --output work/fees-initializer-static/negative-differential.json
work/test-env/bin/python work/fees-initializer-static/make_handoff.py
```

`implementation-hashes.json` covers the build, code patch, scripts, historical source captures and receipts. The two final comparison reports use `case_count`, original/candidate hashes and empty `mismatches` lists. Their 30 cases imply 60 compared local transactions, plus the separate freshness control; earlier original-only exploration is retained separately and not added to the comparison count.

The parent still needs to integrate only the three-file patch, rebuild its complete Fees candidate, run this initializer harness against that exact candidate, and run the other-handler regressions. Other scratch handlers were not revalidated here. Full-program source/compiler recovery, byte equality and complete audit remain open.
